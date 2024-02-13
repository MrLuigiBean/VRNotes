import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder.js";
import { FluentBackplateMaterial } from "../materials/fluentBackplate/fluentBackplateMaterial.js";
import { Control3D } from "./control3D.js";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader.js";
/**
 * Class used to create a holographic backplate in 3D
 * @since 5.0.0
 */
export class HolographicBackplate extends Control3D {
    /**
     * Rendering ground id of the backplate mesh.
     */
    set renderingGroupId(id) {
        this._model.renderingGroupId = id;
    }
    get renderingGroupId() {
        return this._model.renderingGroupId;
    }
    /**
     * Gets the material used by the backplate
     */
    get material() {
        return this._material;
    }
    /**
     * Gets a boolean indicating if this backplate shares its material with other HolographicBackplates
     */
    get shareMaterials() {
        return this._shareMaterials;
    }
    /**
     * Creates a new holographic backplate
     * @param name defines the control name
     * @param _shareMaterials
     */
    constructor(name, _shareMaterials = true) {
        super(name);
        this._shareMaterials = _shareMaterials;
    }
    _getTypeName() {
        return "HolographicBackplate";
    }
    // Mesh association
    _createNode(scene) {
        const collisionMesh = CreateBox((this.name ?? "HolographicBackplate") + "_CollisionMesh", {
            width: 1.0,
            height: 1.0,
            depth: 1.0,
        }, scene);
        collisionMesh.isPickable = true;
        collisionMesh.visibility = 0;
        SceneLoader.ImportMeshAsync(undefined, HolographicBackplate.MODEL_BASE_URL, HolographicBackplate.MODEL_FILENAME, scene).then((result) => {
            const importedModel = result.meshes[1];
            importedModel.name = `${this.name}_frontPlate`;
            importedModel.isPickable = false;
            importedModel.parent = collisionMesh;
            if (this._material) {
                importedModel.material = this._material;
            }
            this._model = importedModel;
        });
        return collisionMesh;
    }
    _createMaterial(mesh) {
        this._material = new FluentBackplateMaterial(this.name + " Material", mesh.getScene());
    }
    _affectMaterial(mesh) {
        // Back
        if (this._shareMaterials) {
            if (!this._host._touchSharedMaterials["fluentBackplateMaterial"]) {
                this._createMaterial(mesh);
                this._host._touchSharedMaterials["fluentBackplateMaterial"] = this._material;
            }
            else {
                this._material = this._host._touchSharedMaterials["fluentBackplateMaterial"];
            }
        }
        else {
            this._createMaterial(mesh);
        }
    }
    /**
     * Releases all associated resources
     */
    dispose() {
        super.dispose(); // will dispose main mesh ie. back plate
        if (!this.shareMaterials) {
            this._material.dispose();
        }
        this._model.dispose();
    }
}
/**
 * Base Url for the button model.
 */
HolographicBackplate.MODEL_BASE_URL = "https://assets.babylonjs.com/meshes/MRTK/";
/**
 * File name for the button model.
 */
HolographicBackplate.MODEL_FILENAME = "mrtk-fluent-backplate.glb";
//# sourceMappingURL=holographicBackplate.js.map