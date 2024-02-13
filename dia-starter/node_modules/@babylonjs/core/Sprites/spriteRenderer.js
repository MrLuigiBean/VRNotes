
import { Buffer, VertexBuffer } from "../Buffers/buffer.js";
import { DrawWrapper } from "../Materials/drawWrapper.js";
import "../Engines/Extensions/engine.alpha.js";
import "../Engines/Extensions/engine.dynamicBuffer.js";
import "../Shaders/sprites.fragment.js";
import "../Shaders/sprites.vertex.js";
/**
 * Class used to render sprites.
 *
 * It can be used either to render Sprites or ThinSprites with ThinEngine only.
 */
export class SpriteRenderer {
    /**
     * Gets the capacity of the manager
     */
    get capacity() {
        return this._capacity;
    }
    /**
     * Gets or sets a boolean indicating if the renderer must render sprites with pixel perfect rendering
     * Note that pixel perfect mode is not supported in WebGL 1
     */
    get pixelPerfect() {
        return this._pixelPerfect;
    }
    set pixelPerfect(value) {
        if (this._pixelPerfect === value) {
            return;
        }
        this._pixelPerfect = value;
        this._createEffects();
    }
    /**
     * Creates a new sprite Renderer
     * @param engine defines the engine the renderer works with
     * @param capacity defines the maximum allowed number of sprites
     * @param epsilon defines the epsilon value to align texture (0.01 by default)
     * @param scene defines the hosting scene
     */
    constructor(engine, capacity, epsilon = 0.01, scene = null) {
        /**
         * Blend mode use to render the particle, it can be any of
         * the static undefined properties provided in this class.
         * Default value is 2
         */
        this.blendMode = 2;
        /**
         * Gets or sets a boolean indicating if alpha mode is automatically
         * reset.
         */
        this.autoResetAlpha = true;
        /**
         * Disables writing to the depth buffer when rendering the sprites.
         * It can be handy to disable depth writing when using textures without alpha channel
         * and setting some specific blend modes.
         */
        this.disableDepthWrite = false;
        /**
         * Gets or sets a boolean indicating if the manager must consider scene fog when rendering
         */
        this.fogEnabled = true;
        this._pixelPerfect = false;
        this._useVAO = false;
        this._useInstancing = false;
        this._vertexBuffers = {};
        this._capacity = capacity;
        this._epsilon = epsilon;
        this._engine = engine;
        this._useInstancing = engine.getCaps().instancedArrays && engine._features.supportSpriteInstancing;
        this._useVAO = engine.getCaps().vertexArrayObject && !engine.disableVertexArrayObjects;
        this._scene = scene;
        if (!this._useInstancing) {
            this._buildIndexBuffer();
        }
        // VBO
        // 18 floats per sprite (x, y, z, angle, sizeX, sizeY, offsetX, offsetY, invertU, invertV, cellLeft, cellTop, cellWidth, cellHeight, color r, color g, color b, color a)
        // 16 when using instances
        this._vertexBufferSize = this._useInstancing ? 16 : 18;
        this._vertexData = new Float32Array(capacity * this._vertexBufferSize * (this._useInstancing ? 1 : 4));
        this._buffer = new Buffer(engine, this._vertexData, true, this._vertexBufferSize);
        const positions = this._buffer.createVertexBuffer(VertexBuffer.PositionKind, 0, 4, this._vertexBufferSize, this._useInstancing);
        const options = this._buffer.createVertexBuffer("options", 4, 2, this._vertexBufferSize, this._useInstancing);
        let offset = 6;
        let offsets;
        if (this._useInstancing) {
            const spriteData = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
            this._spriteBuffer = new Buffer(engine, spriteData, false, 2);
            offsets = this._spriteBuffer.createVertexBuffer("offsets", 0, 2);
        }
        else {
            offsets = this._buffer.createVertexBuffer("offsets", offset, 2, this._vertexBufferSize, this._useInstancing);
            offset += 2;
        }
        const inverts = this._buffer.createVertexBuffer("inverts", offset, 2, this._vertexBufferSize, this._useInstancing);
        const cellInfo = this._buffer.createVertexBuffer("cellInfo", offset + 2, 4, this._vertexBufferSize, this._useInstancing);
        const colors = this._buffer.createVertexBuffer(VertexBuffer.ColorKind, offset + 6, 4, this._vertexBufferSize, this._useInstancing);
        this._vertexBuffers[VertexBuffer.PositionKind] = positions;
        this._vertexBuffers["options"] = options;
        this._vertexBuffers["offsets"] = offsets;
        this._vertexBuffers["inverts"] = inverts;
        this._vertexBuffers["cellInfo"] = cellInfo;
        this._vertexBuffers[VertexBuffer.ColorKind] = colors;
        this._createEffects();
    }
    _createEffects() {
        var _a, _b, _c, _d;
        (_a = this._drawWrapperBase) === null || _a === void 0 ? void 0 : _a.dispose();
        (_b = this._drawWrapperFog) === null || _b === void 0 ? void 0 : _b.dispose();
        (_c = this._drawWrapperDepth) === null || _c === void 0 ? void 0 : _c.dispose();
        (_d = this._drawWrapperFogDepth) === null || _d === void 0 ? void 0 : _d.dispose();
        this._drawWrapperBase = new DrawWrapper(this._engine);
        this._drawWrapperFog = new DrawWrapper(this._engine);
        this._drawWrapperDepth = new DrawWrapper(this._engine, false);
        this._drawWrapperFogDepth = new DrawWrapper(this._engine, false);
        if (this._drawWrapperBase.drawContext) {
            this._drawWrapperBase.drawContext.useInstancing = this._useInstancing;
        }
        if (this._drawWrapperFog.drawContext) {
            this._drawWrapperFog.drawContext.useInstancing = this._useInstancing;
        }
        if (this._drawWrapperDepth.drawContext) {
            this._drawWrapperDepth.drawContext.useInstancing = this._useInstancing;
        }
        if (this._drawWrapperFogDepth.drawContext) {
            this._drawWrapperFogDepth.drawContext.useInstancing = this._useInstancing;
        }
        const defines = this._pixelPerfect ? "#define PIXEL_PERFECT\n" : "";
        this._drawWrapperBase.effect = this._engine.createEffect("sprites", [VertexBuffer.PositionKind, "options", "offsets", "inverts", "cellInfo", VertexBuffer.ColorKind], ["view", "projection", "textureInfos", "alphaTest"], ["diffuseSampler"], defines);
        this._drawWrapperDepth.effect = this._drawWrapperBase.effect;
        this._drawWrapperDepth.materialContext = this._drawWrapperBase.materialContext;
        if (this._scene) {
            this._drawWrapperFog.effect = this._scene
                .getEngine()
                .createEffect("sprites", [VertexBuffer.PositionKind, "options", "offsets", "inverts", "cellInfo", VertexBuffer.ColorKind], ["view", "projection", "textureInfos", "alphaTest", "vFogInfos", "vFogColor"], ["diffuseSampler"], defines + "#define FOG");
            this._drawWrapperFogDepth.effect = this._drawWrapperFog.effect;
            this._drawWrapperFogDepth.materialContext = this._drawWrapperFog.materialContext;
        }
    }
    /**
     * Render all child sprites
     * @param sprites defines the list of sprites to render
     * @param deltaTime defines the time since last frame
     * @param viewMatrix defines the viewMatrix to use to render the sprites
     * @param projectionMatrix defines the projectionMatrix to use to render the sprites
     * @param customSpriteUpdate defines a custom function to update the sprites data before they render
     */
    render(sprites, deltaTime, viewMatrix, projectionMatrix, customSpriteUpdate = null) {
        if (!this.texture || !this.texture.isReady() || !sprites.length) {
            return;
        }
        let drawWrapper = this._drawWrapperBase;
        let drawWrapperDepth = this._drawWrapperDepth;
        let shouldRenderFog = false;
        if (this.fogEnabled && this._scene && this._scene.fogEnabled && this._scene.fogMode !== 0) {
            drawWrapper = this._drawWrapperFog;
            drawWrapperDepth = this._drawWrapperFogDepth;
            shouldRenderFog = true;
        }
        const effect = drawWrapper.effect;
        // Check
        if (!effect.isReady()) {
            return;
        }
        const engine = this._engine;
        const useRightHandedSystem = !!(this._scene && this._scene.useRightHandedSystem);
        const baseSize = this.texture.getBaseSize();
        // Sprites
        const max = Math.min(this._capacity, sprites.length);
        let offset = 0;
        let noSprite = true;
        for (let index = 0; index < max; index++) {
            const sprite = sprites[index];
            if (!sprite || !sprite.isVisible) {
                continue;
            }
            noSprite = false;
            sprite._animate(deltaTime);
            this._appendSpriteVertex(offset++, sprite, 0, 0, baseSize, useRightHandedSystem, customSpriteUpdate);
            if (!this._useInstancing) {
                this._appendSpriteVertex(offset++, sprite, 1, 0, baseSize, useRightHandedSystem, customSpriteUpdate);
                this._appendSpriteVertex(offset++, sprite, 1, 1, baseSize, useRightHandedSystem, customSpriteUpdate);
                this._appendSpriteVertex(offset++, sprite, 0, 1, baseSize, useRightHandedSystem, customSpriteUpdate);
            }
        }
        if (noSprite) {
            return;
        }
        this._buffer.update(this._vertexData);
        const culling = !!engine.depthCullingState.cull;
        const zOffset = engine.depthCullingState.zOffset;
        const zOffsetUnits = engine.depthCullingState.zOffsetUnits;
        engine.setState(culling, zOffset, false, false, undefined, undefined, zOffsetUnits);
        // Render
        engine.enableEffect(drawWrapper);
        effect.setTexture("diffuseSampler", this.texture);
        effect.setMatrix("view", viewMatrix);
        effect.setMatrix("projection", projectionMatrix);
        // Scene Info
        if (shouldRenderFog) {
            const scene = this._scene;
            // Fog
            effect.setFloat4("vFogInfos", scene.fogMode, scene.fogStart, scene.fogEnd, scene.fogDensity);
            effect.setColor3("vFogColor", scene.fogColor);
        }
        if (this._useVAO) {
            if (!this._vertexArrayObject) {
                this._vertexArrayObject = engine.recordVertexArrayObject(this._vertexBuffers, this._indexBuffer, effect);
            }
            engine.bindVertexArrayObject(this._vertexArrayObject, this._indexBuffer);
        }
        else {
            // VBOs
            engine.bindBuffers(this._vertexBuffers, this._indexBuffer, effect);
        }
        // Draw order
        engine.depthCullingState.depthFunc = engine.useReverseDepthBuffer ? 518 : 515;
        if (!this.disableDepthWrite) {
            effect.setBool("alphaTest", true);
            engine.setColorWrite(false);
            engine.enableEffect(drawWrapperDepth);
            if (this._useInstancing) {
                engine.drawArraysType(7, 0, 4, offset);
            }
            else {
                engine.drawElementsType(0, 0, (offset / 4) * 6);
            }
            engine.enableEffect(drawWrapper);
            engine.setColorWrite(true);
            effect.setBool("alphaTest", false);
        }
        engine.setAlphaMode(this.blendMode);
        if (this._useInstancing) {
            engine.drawArraysType(7, 0, 4, offset);
        }
        else {
            engine.drawElementsType(0, 0, (offset / 4) * 6);
        }
        if (this.autoResetAlpha) {
            engine.setAlphaMode(0);
        }
        // Restore Right Handed
        if (useRightHandedSystem) {
            this._scene.getEngine().setState(culling, zOffset, false, true, undefined, undefined, zOffsetUnits);
        }
        engine.unbindInstanceAttributes();
    }
    _appendSpriteVertex(index, sprite, offsetX, offsetY, baseSize, useRightHandedSystem, customSpriteUpdate) {
        let arrayOffset = index * this._vertexBufferSize;
        if (offsetX === 0) {
            offsetX = this._epsilon;
        }
        else if (offsetX === 1) {
            offsetX = 1 - this._epsilon;
        }
        if (offsetY === 0) {
            offsetY = this._epsilon;
        }
        else if (offsetY === 1) {
            offsetY = 1 - this._epsilon;
        }
        if (customSpriteUpdate) {
            customSpriteUpdate(sprite, baseSize);
        }
        else {
            if (!sprite.cellIndex) {
                sprite.cellIndex = 0;
            }
            const rowSize = baseSize.width / this.cellWidth;
            const offset = (sprite.cellIndex / rowSize) >> 0;
            sprite._xOffset = ((sprite.cellIndex - offset * rowSize) * this.cellWidth) / baseSize.width;
            sprite._yOffset = (offset * this.cellHeight) / baseSize.height;
            sprite._xSize = this.cellWidth;
            sprite._ySize = this.cellHeight;
        }
        // Positions
        this._vertexData[arrayOffset] = sprite.position.x;
        this._vertexData[arrayOffset + 1] = sprite.position.y;
        this._vertexData[arrayOffset + 2] = sprite.position.z;
        this._vertexData[arrayOffset + 3] = sprite.angle;
        // Options
        this._vertexData[arrayOffset + 4] = sprite.width;
        this._vertexData[arrayOffset + 5] = sprite.height;
        if (!this._useInstancing) {
            this._vertexData[arrayOffset + 6] = offsetX;
            this._vertexData[arrayOffset + 7] = offsetY;
        }
        else {
            arrayOffset -= 2;
        }
        // Inverts according to Right Handed
        if (useRightHandedSystem) {
            this._vertexData[arrayOffset + 8] = sprite.invertU ? 0 : 1;
        }
        else {
            this._vertexData[arrayOffset + 8] = sprite.invertU ? 1 : 0;
        }
        this._vertexData[arrayOffset + 9] = sprite.invertV ? 1 : 0;
        this._vertexData[arrayOffset + 10] = sprite._xOffset;
        this._vertexData[arrayOffset + 11] = sprite._yOffset;
        this._vertexData[arrayOffset + 12] = sprite._xSize / baseSize.width;
        this._vertexData[arrayOffset + 13] = sprite._ySize / baseSize.height;
        // Color
        this._vertexData[arrayOffset + 14] = sprite.color.r;
        this._vertexData[arrayOffset + 15] = sprite.color.g;
        this._vertexData[arrayOffset + 16] = sprite.color.b;
        this._vertexData[arrayOffset + 17] = sprite.color.a;
    }
    _buildIndexBuffer() {
        const indices = [];
        let index = 0;
        for (let count = 0; count < this._capacity; count++) {
            indices.push(index);
            indices.push(index + 1);
            indices.push(index + 2);
            indices.push(index);
            indices.push(index + 2);
            indices.push(index + 3);
            index += 4;
        }
        this._indexBuffer = this._engine.createIndexBuffer(indices);
    }
    /**
     * Rebuilds the renderer (after a context lost, for eg)
     */
    rebuild() {
        var _a;
        if (this._indexBuffer) {
            this._buildIndexBuffer();
        }
        if (this._useVAO) {
            this._vertexArrayObject = undefined;
        }
        this._buffer._rebuild();
        for (const key in this._vertexBuffers) {
            const vertexBuffer = this._vertexBuffers[key];
            vertexBuffer._rebuild();
        }
        (_a = this._spriteBuffer) === null || _a === void 0 ? void 0 : _a._rebuild();
    }
    /**
     * Release associated resources
     */
    dispose() {
        if (this._buffer) {
            this._buffer.dispose();
            this._buffer = null;
        }
        if (this._spriteBuffer) {
            this._spriteBuffer.dispose();
            this._spriteBuffer = null;
        }
        if (this._indexBuffer) {
            this._engine._releaseBuffer(this._indexBuffer);
            this._indexBuffer = null;
        }
        if (this._vertexArrayObject) {
            this._engine.releaseVertexArrayObject(this._vertexArrayObject);
            this._vertexArrayObject = null;
        }
        if (this.texture) {
            this.texture.dispose();
            this.texture = null;
        }
        this._drawWrapperBase.dispose();
        this._drawWrapperFog.dispose();
        this._drawWrapperDepth.dispose();
        this._drawWrapperFogDepth.dispose();
    }
}
//# sourceMappingURL=spriteRenderer.js.map