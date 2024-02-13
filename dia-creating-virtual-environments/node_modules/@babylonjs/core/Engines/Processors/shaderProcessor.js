/* eslint-disable @typescript-eslint/no-unused-vars */
import { ShaderCodeNode } from "./shaderCodeNode.js";
import { ShaderCodeCursor } from "./shaderCodeCursor.js";
import { ShaderCodeConditionNode } from "./shaderCodeConditionNode.js";
import { ShaderCodeTestNode } from "./shaderCodeTestNode.js";
import { ShaderDefineIsDefinedOperator } from "./Expressions/Operators/shaderDefineIsDefinedOperator.js";
import { ShaderDefineOrOperator } from "./Expressions/Operators/shaderDefineOrOperator.js";
import { ShaderDefineAndOperator } from "./Expressions/Operators/shaderDefineAndOperator.js";
import { ShaderDefineExpression } from "./Expressions/shaderDefineExpression.js";
import { ShaderDefineArithmeticOperator } from "./Expressions/Operators/shaderDefineArithmeticOperator.js";
import { _WarnImport } from "../../Misc/devTools.js";
import { ShaderLanguage } from "../../Materials/shaderLanguage.js";
const regexSE = /defined\s*?\((.+?)\)/g;
const regexSERevert = /defined\s*?\[(.+?)\]/g;
const regexShaderInclude = /#include\s?<(.+)>(\((.*)\))*(\[(.*)\])*/g;
const regexShaderDecl = /__decl__/;
const regexLightX = /light\{X\}.(\w*)/g;
const regexX = /\{X\}/g;
const reusableMatches = [];
/** @internal */
export class ShaderProcessor {
    static Initialize(options) {
        if (options.processor && options.processor.initializeShaders) {
            options.processor.initializeShaders(options.processingContext);
        }
    }
    static Process(sourceCode, options, callback, engine) {
        var _a;
        if ((_a = options.processor) === null || _a === void 0 ? void 0 : _a.preProcessShaderCode) {
            sourceCode = options.processor.preProcessShaderCode(sourceCode, options.isFragment);
        }
        this._ProcessIncludes(sourceCode, options, (codeWithIncludes) => {
            if (options.processCodeAfterIncludes) {
                codeWithIncludes = options.processCodeAfterIncludes(options.isFragment ? "fragment" : "vertex", codeWithIncludes);
            }
            const migratedCode = this._ProcessShaderConversion(codeWithIncludes, options, engine);
            callback(migratedCode, codeWithIncludes);
        });
    }
    static PreProcess(sourceCode, options, callback, engine) {
        var _a;
        if ((_a = options.processor) === null || _a === void 0 ? void 0 : _a.preProcessShaderCode) {
            sourceCode = options.processor.preProcessShaderCode(sourceCode, options.isFragment);
        }
        this._ProcessIncludes(sourceCode, options, (codeWithIncludes) => {
            if (options.processCodeAfterIncludes) {
                codeWithIncludes = options.processCodeAfterIncludes(options.isFragment ? "fragment" : "vertex", codeWithIncludes);
            }
            const migratedCode = this._ApplyPreProcessing(codeWithIncludes, options, engine);
            callback(migratedCode, codeWithIncludes);
        });
    }
    static Finalize(vertexCode, fragmentCode, options) {
        if (!options.processor || !options.processor.finalizeShaders) {
            return { vertexCode, fragmentCode };
        }
        return options.processor.finalizeShaders(vertexCode, fragmentCode, options.processingContext);
    }
    static _ProcessPrecision(source, options) {
        var _a;
        if ((_a = options.processor) === null || _a === void 0 ? void 0 : _a.noPrecision) {
            return source;
        }
        const shouldUseHighPrecisionShader = options.shouldUseHighPrecisionShader;
        if (source.indexOf("precision highp float") === -1) {
            if (!shouldUseHighPrecisionShader) {
                source = "precision mediump float;\n" + source;
            }
            else {
                source = "precision highp float;\n" + source;
            }
        }
        else {
            if (!shouldUseHighPrecisionShader) {
                // Moving highp to mediump
                source = source.replace("precision highp float", "precision mediump float");
            }
        }
        return source;
    }
    static _ExtractOperation(expression) {
        const regex = /defined\((.+)\)/;
        const match = regex.exec(expression);
        if (match && match.length) {
            return new ShaderDefineIsDefinedOperator(match[1].trim(), expression[0] === "!");
        }
        const operators = ["==", "!=", ">=", "<=", "<", ">"];
        let operator = "";
        let indexOperator = 0;
        for (operator of operators) {
            indexOperator = expression.indexOf(operator);
            if (indexOperator > -1) {
                break;
            }
        }
        if (indexOperator === -1) {
            return new ShaderDefineIsDefinedOperator(expression);
        }
        const define = expression.substring(0, indexOperator).trim();
        const value = expression.substring(indexOperator + operator.length).trim();
        return new ShaderDefineArithmeticOperator(define, operator, value);
    }
    static _BuildSubExpression(expression) {
        expression = expression.replace(regexSE, "defined[$1]");
        const postfix = ShaderDefineExpression.infixToPostfix(expression);
        const stack = [];
        for (const c of postfix) {
            if (c !== "||" && c !== "&&") {
                stack.push(c);
            }
            else if (stack.length >= 2) {
                let v1 = stack[stack.length - 1], v2 = stack[stack.length - 2];
                stack.length -= 2;
                const operator = c == "&&" ? new ShaderDefineAndOperator() : new ShaderDefineOrOperator();
                if (typeof v1 === "string") {
                    v1 = v1.replace(regexSERevert, "defined($1)");
                }
                if (typeof v2 === "string") {
                    v2 = v2.replace(regexSERevert, "defined($1)");
                }
                operator.leftOperand = typeof v2 === "string" ? this._ExtractOperation(v2) : v2;
                operator.rightOperand = typeof v1 === "string" ? this._ExtractOperation(v1) : v1;
                stack.push(operator);
            }
        }
        let result = stack[stack.length - 1];
        if (typeof result === "string") {
            result = result.replace(regexSERevert, "defined($1)");
        }
        // note: stack.length !== 1 if there was an error in the parsing
        return typeof result === "string" ? this._ExtractOperation(result) : result;
    }
    static _BuildExpression(line, start) {
        const node = new ShaderCodeTestNode();
        const command = line.substring(0, start);
        let expression = line.substring(start);
        expression = expression.substring(0, (expression.indexOf("//") + 1 || expression.length + 1) - 1).trim();
        if (command === "#ifdef") {
            node.testExpression = new ShaderDefineIsDefinedOperator(expression);
        }
        else if (command === "#ifndef") {
            node.testExpression = new ShaderDefineIsDefinedOperator(expression, true);
        }
        else {
            node.testExpression = this._BuildSubExpression(expression);
        }
        return node;
    }
    static _MoveCursorWithinIf(cursor, rootNode, ifNode) {
        let line = cursor.currentLine;
        while (this._MoveCursor(cursor, ifNode)) {
            line = cursor.currentLine;
            const first5 = line.substring(0, 5).toLowerCase();
            if (first5 === "#else") {
                const elseNode = new ShaderCodeNode();
                rootNode.children.push(elseNode);
                this._MoveCursor(cursor, elseNode);
                return;
            }
            else if (first5 === "#elif") {
                const elifNode = this._BuildExpression(line, 5);
                rootNode.children.push(elifNode);
                ifNode = elifNode;
            }
        }
    }
    static _MoveCursor(cursor, rootNode) {
        while (cursor.canRead) {
            cursor.lineIndex++;
            const line = cursor.currentLine;
            if (line.indexOf("#") >= 0) {
                const matches = ShaderProcessor._MoveCursorRegex.exec(line);
                if (matches && matches.length) {
                    const keyword = matches[0];
                    switch (keyword) {
                        case "#ifdef": {
                            const newRootNode = new ShaderCodeConditionNode();
                            rootNode.children.push(newRootNode);
                            const ifNode = this._BuildExpression(line, 6);
                            newRootNode.children.push(ifNode);
                            this._MoveCursorWithinIf(cursor, newRootNode, ifNode);
                            break;
                        }
                        case "#else":
                        case "#elif":
                            return true;
                        case "#endif":
                            return false;
                        case "#ifndef": {
                            const newRootNode = new ShaderCodeConditionNode();
                            rootNode.children.push(newRootNode);
                            const ifNode = this._BuildExpression(line, 7);
                            newRootNode.children.push(ifNode);
                            this._MoveCursorWithinIf(cursor, newRootNode, ifNode);
                            break;
                        }
                        case "#if": {
                            const newRootNode = new ShaderCodeConditionNode();
                            const ifNode = this._BuildExpression(line, 3);
                            rootNode.children.push(newRootNode);
                            newRootNode.children.push(ifNode);
                            this._MoveCursorWithinIf(cursor, newRootNode, ifNode);
                            break;
                        }
                    }
                    continue;
                }
            }
            const newNode = new ShaderCodeNode();
            newNode.line = line;
            rootNode.children.push(newNode);
            // Detect additional defines
            if (line[0] === "#" && line[1] === "d") {
                const split = line.replace(";", "").split(" ");
                newNode.additionalDefineKey = split[1];
                if (split.length === 3) {
                    newNode.additionalDefineValue = split[2];
                }
            }
        }
        return false;
    }
    static _EvaluatePreProcessors(sourceCode, preprocessors, options) {
        const rootNode = new ShaderCodeNode();
        const cursor = new ShaderCodeCursor();
        cursor.lineIndex = -1;
        cursor.lines = sourceCode.split("\n");
        // Decompose (We keep it in 2 steps so it is easier to maintain and perf hit is insignificant)
        this._MoveCursor(cursor, rootNode);
        // Recompose
        return rootNode.process(preprocessors, options);
    }
    static _PreparePreProcessors(options, engine) {
        var _a;
        const defines = options.defines;
        const preprocessors = {};
        for (const define of defines) {
            const keyValue = define.replace("#define", "").replace(";", "").trim();
            const split = keyValue.split(" ");
            preprocessors[split[0]] = split.length > 1 ? split[1] : "";
        }
        if (((_a = options.processor) === null || _a === void 0 ? void 0 : _a.shaderLanguage) === ShaderLanguage.GLSL) {
            preprocessors["GL_ES"] = "true";
        }
        preprocessors["__VERSION__"] = options.version;
        preprocessors[options.platformName] = "true";
        engine._getGlobalDefines(preprocessors);
        return preprocessors;
    }
    static _ProcessShaderConversion(sourceCode, options, engine) {
        let preparedSourceCode = this._ProcessPrecision(sourceCode, options);
        if (!options.processor) {
            return preparedSourceCode;
        }
        // Already converted
        if (options.processor.shaderLanguage === ShaderLanguage.GLSL && preparedSourceCode.indexOf("#version 3") !== -1) {
            preparedSourceCode = preparedSourceCode.replace("#version 300 es", "");
            if (!options.processor.parseGLES3) {
                return preparedSourceCode;
            }
        }
        const defines = options.defines;
        const preprocessors = this._PreparePreProcessors(options, engine);
        // General pre processing
        if (options.processor.preProcessor) {
            preparedSourceCode = options.processor.preProcessor(preparedSourceCode, defines, options.isFragment, options.processingContext);
        }
        preparedSourceCode = this._EvaluatePreProcessors(preparedSourceCode, preprocessors, options);
        // Post processing
        if (options.processor.postProcessor) {
            preparedSourceCode = options.processor.postProcessor(preparedSourceCode, defines, options.isFragment, options.processingContext, engine);
        }
        // Inline functions tagged with #define inline
        if (engine._features.needShaderCodeInlining) {
            preparedSourceCode = engine.inlineShaderCode(preparedSourceCode);
        }
        return preparedSourceCode;
    }
    static _ApplyPreProcessing(sourceCode, options, engine) {
        var _a, _b;
        let preparedSourceCode = sourceCode;
        const defines = options.defines;
        const preprocessors = this._PreparePreProcessors(options, engine);
        // General pre processing
        if ((_a = options.processor) === null || _a === void 0 ? void 0 : _a.preProcessor) {
            preparedSourceCode = options.processor.preProcessor(preparedSourceCode, defines, options.isFragment, options.processingContext);
        }
        preparedSourceCode = this._EvaluatePreProcessors(preparedSourceCode, preprocessors, options);
        // Post processing
        if ((_b = options.processor) === null || _b === void 0 ? void 0 : _b.postProcessor) {
            preparedSourceCode = options.processor.postProcessor(preparedSourceCode, defines, options.isFragment, options.processingContext, engine);
        }
        // Inline functions tagged with #define inline
        if (engine._features.needShaderCodeInlining) {
            preparedSourceCode = engine.inlineShaderCode(preparedSourceCode);
        }
        return preparedSourceCode;
    }
    /** @internal */
    static _ProcessIncludes(sourceCode, options, callback) {
        reusableMatches.length = 0;
        let match;
        // stay back-compat to the old matchAll syntax
        while ((match = regexShaderInclude.exec(sourceCode)) !== null) {
            reusableMatches.push(match);
        }
        let returnValue = String(sourceCode);
        let parts = [sourceCode];
        let keepProcessing = false;
        for (const match of reusableMatches) {
            let includeFile = match[1];
            // Uniform declaration
            if (includeFile.indexOf("__decl__") !== -1) {
                includeFile = includeFile.replace(regexShaderDecl, "");
                if (options.supportsUniformBuffers) {
                    includeFile = includeFile.replace("Vertex", "Ubo").replace("Fragment", "Ubo");
                }
                includeFile = includeFile + "Declaration";
            }
            if (options.includesShadersStore[includeFile]) {
                // Substitution
                let includeContent = options.includesShadersStore[includeFile];
                if (match[2]) {
                    const splits = match[3].split(",");
                    for (let index = 0; index < splits.length; index += 2) {
                        const source = new RegExp(splits[index], "g");
                        const dest = splits[index + 1];
                        includeContent = includeContent.replace(source, dest);
                    }
                }
                if (match[4]) {
                    const indexString = match[5];
                    if (indexString.indexOf("..") !== -1) {
                        const indexSplits = indexString.split("..");
                        const minIndex = parseInt(indexSplits[0]);
                        let maxIndex = parseInt(indexSplits[1]);
                        let sourceIncludeContent = includeContent.slice(0);
                        includeContent = "";
                        if (isNaN(maxIndex)) {
                            maxIndex = options.indexParameters[indexSplits[1]];
                        }
                        for (let i = minIndex; i < maxIndex; i++) {
                            if (!options.supportsUniformBuffers) {
                                // Ubo replacement
                                sourceIncludeContent = sourceIncludeContent.replace(regexLightX, (str, p1) => {
                                    return p1 + "{X}";
                                });
                            }
                            includeContent += sourceIncludeContent.replace(regexX, i.toString()) + "\n";
                        }
                    }
                    else {
                        if (!options.supportsUniformBuffers) {
                            // Ubo replacement
                            includeContent = includeContent.replace(regexLightX, (str, p1) => {
                                return p1 + "{X}";
                            });
                        }
                        includeContent = includeContent.replace(regexX, indexString);
                    }
                }
                // Replace
                // Split all parts on match[0] and intersperse the parts with the include content
                const newParts = [];
                for (const part of parts) {
                    const splitPart = part.split(match[0]);
                    for (let i = 0; i < splitPart.length - 1; i++) {
                        newParts.push(splitPart[i]);
                        newParts.push(includeContent);
                    }
                    newParts.push(splitPart[splitPart.length - 1]);
                }
                parts = newParts;
                keepProcessing = keepProcessing || includeContent.indexOf("#include<") >= 0 || includeContent.indexOf("#include <") >= 0;
            }
            else {
                const includeShaderUrl = options.shadersRepository + "ShadersInclude/" + includeFile + ".fx";
                ShaderProcessor._FileToolsLoadFile(includeShaderUrl, (fileContent) => {
                    options.includesShadersStore[includeFile] = fileContent;
                    this._ProcessIncludes(parts.join(""), options, callback);
                });
                return;
            }
        }
        reusableMatches.length = 0;
        returnValue = parts.join("");
        if (keepProcessing) {
            this._ProcessIncludes(returnValue.toString(), options, callback);
        }
        else {
            callback(returnValue);
        }
    }
    /**
     * Loads a file from a url
     * @param url url to load
     * @param onSuccess callback called when the file successfully loads
     * @param onProgress callback called while file is loading (if the server supports this mode)
     * @param offlineProvider defines the offline provider for caching
     * @param useArrayBuffer defines a boolean indicating that date must be returned as ArrayBuffer
     * @param onError callback called when the file fails to load
     * @returns a file request object
     * @internal
     */
    static _FileToolsLoadFile(url, onSuccess, onProgress, offlineProvider, useArrayBuffer, onError) {
        throw _WarnImport("FileTools");
    }
}
ShaderProcessor._MoveCursorRegex = /(#ifdef)|(#else)|(#elif)|(#endif)|(#ifndef)|(#if)/;
//# sourceMappingURL=shaderProcessor.js.map