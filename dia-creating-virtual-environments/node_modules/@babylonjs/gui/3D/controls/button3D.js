import { Vector4 } from "@babylonjs/core/Maths/math.vector.js";
import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import { AbstractButton3D } from "./abstractButton3D.js";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
/**
 * Class used to create a button in 3D
 */
export class Button3D extends AbstractButton3D {
    /**
     * Creates a new button
     * @param name defines the control name
     */
    constructor(name, options) {
        super(name);
        this._options = {
            width: 1,
            height: 1,
            depth: 0.08,
            ...options,
        };
        // Default animations
        this.pointerEnterAnimation = () => {
            if (!this.mesh) {
                return;
            }
            this._currentMaterial.emissiveColor = Color3.Red();
        };
        this.pointerOutAnimation = () => {
            this._currentMaterial.emissiveColor = Color3.Black();
        };
        this.pointerDownAnimation = () => {
            if (!this.mesh) {
                return;
            }
            this.mesh.scaling.scaleInPlace(0.95);
        };
        this.pointerUpAnimation = () => {
            if (!this.mesh) {
                return;
            }
            this.mesh.scaling.scaleInPlace(1.0 / 0.95);
        };
    }
    /**
     * Apply the facade texture (created from the content property).
     * @param facadeTexture defines the AdvancedDynamicTexture to use
     */
    _applyFacade(facadeTexture) {
        this._currentMaterial.emissiveTexture = facadeTexture;
    }
    _getTypeName() {
        return "Button3D";
    }
    // Mesh association
    _createNode(scene) {
        const faceUV = new Array(6);
        for (let i = 0; i < 6; i++) {
            faceUV[i] = new Vector4(0, 0, 0, 0);
        }
        if (scene.useRightHandedSystem) {
            // Flip the u on the texture
            faceUV[0].copyFromFloats(1, 0, 0, 1);
        }
        else {
            faceUV[1].copyFromFloats(0, 0, 1, 1);
        }
        const mesh = CreateBox(this.name + "_rootMesh", {
            width: this._options.width,
            height: this._options.height,
            depth: this._options.depth,
            faceUV: faceUV,
            wrap: true,
        }, scene);
        this._contentScaleRatioY = (this._contentScaleRatio * this._options.width) / this._options.height;
        this._setFacadeTextureScaling();
        return mesh;
    }
    _affectMaterial(mesh) {
        const material = new StandardMaterial(this.name + "Material", mesh.getScene());
        material.specularColor = Color3.Black();
        mesh.material = material;
        this._currentMaterial = material;
        this._resetContent();
    }
    /**
     * Releases all associated resources
     */
    dispose() {
        super.dispose();
        this._disposeFacadeTexture();
        if (this._currentMaterial) {
            this._currentMaterial.dispose();
        }
    }
}
//# sourceMappingURL=button3D.js.map