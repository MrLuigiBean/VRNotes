import { GetClass } from "@babylonjs/core/Misc/typeStore.js";
const XmlLoaderError = "XmlLoader Exception : XML file is malformed or corrupted.";
/**
 * Class used to load GUI via XML.
 */
export class XmlLoader {
    /**
     * Create a new xml loader
     * @param parentClass Sets the class context. Used when the loader is instanced inside a class and not in a global context
     */
    constructor(parentClass = null) {
        this._nodes = {};
        this._nodeTypes = {
            element: 1,
            attribute: 2,
            text: 3,
        };
        this._isLoaded = false;
        this._objectAttributes = {
            textHorizontalAlignment: 1,
            textVerticalAlignment: 2,
            horizontalAlignment: 3,
            verticalAlignment: 4,
            stretch: 5,
        };
        if (parentClass) {
            this._parentClass = parentClass;
        }
    }
    _getChainElement(attributeValue) {
        let element = window;
        if (this._parentClass) {
            element = this._parentClass;
        }
        let value = attributeValue;
        value = value.split(".");
        for (let i = 0; i < value.length; i++) {
            element = element[value[i]];
        }
        return element;
    }
    _getClassAttribute(attributeName) {
        const attribute = attributeName.split(".");
        const className = GetClass("BABYLON.GUI." + attribute[0]);
        return className[attribute[1]];
    }
    _createGuiElement(node, parent, linkParent = true) {
        try {
            const className = GetClass("BABYLON.GUI." + node.nodeName);
            const guiNode = new className();
            if (parent && linkParent) {
                parent.addControl(guiNode);
            }
            for (let i = 0; i < node.attributes.length; i++) {
                if (node.attributes[i].name.toLowerCase().includes("datasource")) {
                    continue;
                }
                if (node.attributes[i].name.toLowerCase().includes("observable")) {
                    const element = this._getChainElement(node.attributes[i].value);
                    guiNode[node.attributes[i].name].add(element);
                    continue;
                }
                else if (node.attributes[i].name == "linkWithMesh") {
                    if (this._parentClass) {
                        guiNode.linkWithMesh(this._parentClass[node.attributes[i].value]);
                    }
                    else {
                        guiNode.linkWithMesh(window[node.attributes[i].value]);
                    }
                }
                else if (node.attributes[i].value.startsWith("{{") && node.attributes[i].value.endsWith("}}")) {
                    const element = this._getChainElement(node.attributes[i].value.substring(2, node.attributes[i].value.length - 2));
                    guiNode[node.attributes[i].name] = element;
                }
                else if (!this._objectAttributes[node.attributes[i].name]) {
                    if (node.attributes[i].value == "true" || node.attributes[i].value == "false") {
                        guiNode[node.attributes[i].name] = node.attributes[i].value == "true";
                    }
                    else {
                        guiNode[node.attributes[i].name] = !isNaN(Number(node.attributes[i].value)) ? Number(node.attributes[i].value) : node.attributes[i].value;
                    }
                }
                else {
                    guiNode[node.attributes[i].name] = this._getClassAttribute(node.attributes[i].value);
                }
            }
            if (!node.attributes.getNamedItem("id")) {
                this._nodes[node.nodeName + Object.keys(this._nodes).length + "_gen"] = guiNode;
                return guiNode;
            }
            let id = node.attributes.getNamedItem("id").value;
            if (id.startsWith("{{") && id.endsWith("}}")) {
                id = this._getChainElement(id.substring(2, id.length - 2));
            }
            if (!this._nodes[id]) {
                this._nodes[id] = guiNode;
            }
            else {
                throw "XmlLoader Exception : Duplicate ID, every element should have an unique ID attribute";
            }
            return guiNode;
        }
        catch (exception) {
            throw "XmlLoader Exception : Error parsing Control " + node.nodeName + "," + exception + ".";
        }
    }
    _parseGrid(node, guiNode, parent) {
        let width;
        let height;
        let columns;
        const rows = node.children;
        let cells;
        let isPixel = false;
        let cellNode;
        let rowNumber = -1;
        let columnNumber = -1;
        let totalColumnsNumber = 0;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].nodeType != this._nodeTypes.element) {
                continue;
            }
            if (rows[i].nodeName != "Row") {
                throw "XmlLoader Exception : Expecting Row node, received " + rows[i].nodeName;
            }
            rowNumber += 1;
            columns = rows[i].children;
            if (!rows[i].attributes.getNamedItem("height")) {
                throw "XmlLoader Exception : Height must be defined for grid rows";
            }
            height = Number(rows[i].attributes.getNamedItem("height").nodeValue);
            isPixel = rows[i].attributes.getNamedItem("isPixel") ? JSON.parse(rows[i].attributes.getNamedItem("isPixel").nodeValue) : false;
            guiNode.addRowDefinition(height, isPixel);
            for (let j = 0; j < columns.length; j++) {
                if (columns[j].nodeType != this._nodeTypes.element) {
                    continue;
                }
                if (columns[j].nodeName != "Column") {
                    throw "XmlLoader Exception : Expecting Column node, received " + columns[j].nodeName;
                }
                columnNumber += 1;
                if (rowNumber > 0 && columnNumber > totalColumnsNumber) {
                    throw "XmlLoader Exception : In the Grid element, the number of columns is defined in the first row, do not add more columns in the subsequent rows.";
                }
                if (rowNumber == 0) {
                    if (!columns[j].attributes.getNamedItem("width")) {
                        throw "XmlLoader Exception : Width must be defined for all the grid columns in the first row";
                    }
                    width = Number(columns[j].attributes.getNamedItem("width").nodeValue);
                    isPixel = columns[j].attributes.getNamedItem("isPixel") ? JSON.parse(columns[j].attributes.getNamedItem("isPixel").nodeValue) : false;
                    guiNode.addColumnDefinition(width, isPixel);
                }
                cells = columns[j].children;
                for (let k = 0; k < cells.length; k++) {
                    if (cells[k].nodeType != this._nodeTypes.element) {
                        continue;
                    }
                    cellNode = this._createGuiElement(cells[k], guiNode, false);
                    guiNode.addControl(cellNode, rowNumber, columnNumber);
                    if (cells[k].firstChild) {
                        this._parseXml(cells[k].firstChild, cellNode);
                    }
                }
            }
            if (rowNumber == 0) {
                totalColumnsNumber = columnNumber;
            }
            columnNumber = -1;
        }
        if (node.nextSibling) {
            this._parseXml(node.nextSibling, parent);
        }
    }
    _parseElement(node, guiNode, parent) {
        if (node.firstChild) {
            this._parseXml(node.firstChild, guiNode);
        }
        if (node.nextSibling) {
            this._parseXml(node.nextSibling, parent);
        }
    }
    _prepareSourceElement(node, guiNode, variable, source, iterator) {
        if (this._parentClass) {
            this._parentClass[variable] = source[iterator];
        }
        else {
            window[variable] = source[iterator];
        }
        if (node.firstChild) {
            this._parseXml(node.firstChild, guiNode, true);
        }
    }
    _parseElementsFromSource(node, guiNode, parent) {
        const dataSource = node.attributes.getNamedItem("dataSource").value;
        if (!dataSource.includes(" in ")) {
            throw "XmlLoader Exception : Malformed XML, Data Source must include an in";
        }
        else {
            let isArray = true;
            const splittedSource = dataSource.split(" in ");
            if (splittedSource.length < 2) {
                throw "XmlLoader Exception : Malformed XML, Data Source must have an iterator and a source";
            }
            let source = splittedSource[1];
            if (source.startsWith("{") && source.endsWith("}")) {
                isArray = false;
            }
            if (!isArray || (source.startsWith("[") && source.endsWith("]"))) {
                source = source.substring(1, source.length - 1);
            }
            if (this._parentClass) {
                source = this._parentClass[source];
            }
            else {
                source = window[source];
            }
            if (isArray) {
                for (let i = 0; i < source.length; i++) {
                    this._prepareSourceElement(node, guiNode, splittedSource[0], source, i);
                }
            }
            else {
                for (const i in source) {
                    this._prepareSourceElement(node, guiNode, splittedSource[0], source, i);
                }
            }
            if (node.nextSibling) {
                this._parseXml(node.nextSibling, parent);
            }
        }
    }
    _parseXml(node, parent, generated = false) {
        if (node.nodeType != this._nodeTypes.element) {
            if (node.nextSibling) {
                this._parseXml(node.nextSibling, parent, generated);
            }
            return;
        }
        if (generated) {
            node.setAttribute("id", parent.id + (parent._children.length + 1));
        }
        const guiNode = this._createGuiElement(node, parent);
        if (!this._rootNode) {
            this._rootNode = guiNode;
        }
        if (node.nodeName == "Grid") {
            this._parseGrid(node, guiNode, parent);
        }
        else if (!node.attributes.getNamedItem("dataSource")) {
            this._parseElement(node, guiNode, parent);
        }
        else {
            this._parseElementsFromSource(node, guiNode, parent);
        }
    }
    /**
     * Gets if the loading has finished.
     * @returns whether the loading has finished or not
     */
    isLoaded() {
        return this._isLoaded;
    }
    /**
     * Gets a loaded node / control by id.
     * @param id the Controls id set in the xml
     * @returns element of type Control
     */
    getNodeById(id) {
        return this._nodes[id];
    }
    /**
     * Gets all loaded nodes / controls
     * @returns Array of controls
     */
    getNodes() {
        return this._nodes;
    }
    /**
     * Disposes the loaded layout
     */
    dispose() {
        if (this._rootNode) {
            this._rootNode.dispose();
            this._rootNode = null;
            this._nodes = {};
        }
    }
    /**
     * Initiates the xml layout loading
     * @param xmlFile defines the xml layout to load
     * @param rootNode defines the node / control to use as a parent for the loaded layout controls.
     * @param onSuccess defines the callback called on layout load successfully.
     * @param onError defines the callback called on layout load failure.
     */
    loadLayout(xmlFile, rootNode, onSuccess = null, onError = null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                if (!xhttp.responseXML) {
                    if (onError) {
                        onError(XmlLoaderError);
                        return;
                    }
                    else {
                        throw XmlLoaderError;
                    }
                }
                const xmlDoc = xhttp.responseXML.documentElement;
                this._parseXml(xmlDoc.firstChild, rootNode);
                this._isLoaded = true;
                if (onSuccess) {
                    onSuccess();
                }
            }
        };
        xhttp.onerror = function () {
            if (onError) {
                onError("an error occurred during loading the layout");
            }
        };
        xhttp.open("GET", xmlFile, true);
        xhttp.send();
    }
    /**
     * Initiates the xml layout loading asynchronously
     * @param xmlFile defines the xml layout to load
     * @param rootNode defines the node / control to use as a parent for the loaded layout controls.
     * @returns Promise
     */
    async loadLayoutAsync(xmlFile, rootNode) {
        return new Promise((resolve, reject) => {
            this.loadLayout(xmlFile, rootNode, resolve, reject);
        });
    }
}
//# sourceMappingURL=xmlLoader.js.map