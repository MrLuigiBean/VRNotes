import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial.js";
import { Color3, TmpColors } from "@babylonjs/core/Maths/math.color.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import "./shaders/handle.vertex.js";
import "./shaders/handle.fragment.js";
/**
 * Class used to render gizmo handles with fluent design
 */
export class HandleMaterial extends ShaderMaterial {
    /**
     * Is the material indicating hovering state
     */
    get hover() {
        return this._hover;
    }
    set hover(b) {
        this._hover = b;
        this._updateInterpolationTarget();
    }
    /**
     * Is the material indicating drag state
     */
    get drag() {
        return this._drag;
    }
    set drag(b) {
        this._drag = b;
        this._updateInterpolationTarget();
    }
    /**
     * Creates a handle material
     * @param name Name of the material
     * @param scene Scene
     */
    constructor(name, scene) {
        super(name, scene, "handle", {
            attributes: ["position"],
            uniforms: ["worldViewProjection", "color", "scale", "positionOffset"],
            needAlphaBlending: false,
            needAlphaTesting: false,
        });
        this._hover = false;
        this._drag = false;
        this._color = new Color3();
        this._scale = 1;
        this._lastTick = -1;
        /**
         * Length of animation
         */
        this.animationLength = 100;
        /**
         * Color of the handle when hovered
         */
        this.hoverColor = new Color3(0, 0.467, 0.84);
        /**
         * Color of the handle when idle
         */
        this.baseColor = new Color3(1, 1, 1);
        /**
         * Scale of the handle when hovered
         */
        this.hoverScale = 0.75;
        /**
         * Scale of the handle when idle
         */
        this.baseScale = 0.35;
        /**
         * Scale of the handle when dragged
         */
        this.dragScale = 0.55;
        /**
         * @internal
         */
        this._positionOffset = Vector3.Zero();
        this._updateInterpolationTarget();
        // Register callback for scene after render
        this._lastTick = Date.now();
        this._onBeforeRender = this.getScene().onBeforeRenderObservable.add(() => {
            const tick = Date.now();
            const delta = tick - this._lastTick;
            const scaleDiff = this._targetScale - this._scale;
            const colorDiff = TmpColors.Color3[0].copyFrom(this._targetColor).subtractToRef(this._color, TmpColors.Color3[0]);
            this._scale = this._scale + (scaleDiff * delta) / this.animationLength;
            colorDiff.scaleToRef(delta / this.animationLength, colorDiff);
            this._color.addToRef(colorDiff, this._color);
            this.setColor3("color", this._color);
            this.setFloat("scale", this._scale);
            this.setVector3("positionOffset", this._positionOffset);
            this._lastTick = tick;
        });
    }
    _updateInterpolationTarget() {
        if (this.drag) {
            this._targetColor = this.hoverColor;
            this._targetScale = this.dragScale;
        }
        else if (this.hover) {
            this._targetColor = this.hoverColor;
            this._targetScale = this.hoverScale;
        }
        else {
            this._targetColor = this.baseColor;
            this._targetScale = this.baseScale;
        }
    }
    /**
     * Disposes the handle material
     */
    dispose() {
        super.dispose();
        this.getScene().onBeforeRenderObservable.remove(this._onBeforeRender);
    }
}
//# sourceMappingURL=handleMaterial.js.map