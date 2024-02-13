import { __decorate } from "../../tslib.es6.js";
import { serialize, SerializationHelper, serializeAsColor3, expandToProperty, serializeAsTexture } from "../../Misc/decorators.js";
import { PBRBaseSimpleMaterial } from "./pbrBaseSimpleMaterial.js";
import { RegisterClass } from "../../Misc/typeStore.js";
/**
 * The PBR material of BJS following the specular glossiness convention.
 *
 * This fits to the PBR convention in the GLTF definition:
 * https://github.com/KhronosGroup/glTF/tree/2.0/extensions/Khronos/KHR_materials_pbrSpecularGlossiness
 */
export class PBRSpecularGlossinessMaterial extends PBRBaseSimpleMaterial {
    /**
     * Specifies if the reflectivity texture contains the glossiness information in its alpha channel.
     */
    get useMicroSurfaceFromReflectivityMapAlpha() {
        return this._useMicroSurfaceFromReflectivityMapAlpha;
    }
    /**
     * Instantiates a new PBRSpecularGlossinessMaterial instance.
     *
     * @param name The material name
     * @param scene The scene the material will be use in.
     */
    constructor(name, scene) {
        super(name, scene);
        this._useMicroSurfaceFromReflectivityMapAlpha = true;
    }
    /**
     * Return the current class name of the material.
     */
    getClassName() {
        return "PBRSpecularGlossinessMaterial";
    }
    /**
     * Makes a duplicate of the current material.
     * @param name - name to use for the new material.
     */
    clone(name) {
        const clone = SerializationHelper.Clone(() => new PBRSpecularGlossinessMaterial(name, this.getScene()), this);
        clone.id = name;
        clone.name = name;
        this.clearCoat.copyTo(clone.clearCoat);
        this.anisotropy.copyTo(clone.anisotropy);
        this.brdf.copyTo(clone.brdf);
        this.sheen.copyTo(clone.sheen);
        this.subSurface.copyTo(clone.subSurface);
        return clone;
    }
    /**
     * Serialize the material to a parsable JSON object.
     */
    serialize() {
        const serializationObject = SerializationHelper.Serialize(this);
        serializationObject.customType = "BABYLON.PBRSpecularGlossinessMaterial";
        serializationObject.clearCoat = this.clearCoat.serialize();
        serializationObject.anisotropy = this.anisotropy.serialize();
        serializationObject.brdf = this.brdf.serialize();
        serializationObject.sheen = this.sheen.serialize();
        serializationObject.subSurface = this.subSurface.serialize();
        serializationObject.iridescence = this.iridescence.serialize();
        return serializationObject;
    }
    /**
     * Parses a JSON object corresponding to the serialize function.
     * @param source
     * @param scene
     * @param rootUrl
     */
    static Parse(source, scene, rootUrl) {
        const material = SerializationHelper.Parse(() => new PBRSpecularGlossinessMaterial(source.name, scene), source, scene, rootUrl);
        if (source.clearCoat) {
            material.clearCoat.parse(source.clearCoat, scene, rootUrl);
        }
        if (source.anisotropy) {
            material.anisotropy.parse(source.anisotropy, scene, rootUrl);
        }
        if (source.brdf) {
            material.brdf.parse(source.brdf, scene, rootUrl);
        }
        if (source.sheen) {
            material.sheen.parse(source.sheen, scene, rootUrl);
        }
        if (source.subSurface) {
            material.subSurface.parse(source.subSurface, scene, rootUrl);
        }
        if (source.iridescence) {
            material.iridescence.parse(source.iridescence, scene, rootUrl);
        }
        return material;
    }
}
__decorate([
    serializeAsColor3("diffuse"),
    expandToProperty("_markAllSubMeshesAsTexturesDirty", "_albedoColor")
], PBRSpecularGlossinessMaterial.prototype, "diffuseColor", void 0);
__decorate([
    serializeAsTexture(),
    expandToProperty("_markAllSubMeshesAsTexturesDirty", "_albedoTexture")
], PBRSpecularGlossinessMaterial.prototype, "diffuseTexture", void 0);
__decorate([
    serializeAsColor3("specular"),
    expandToProperty("_markAllSubMeshesAsTexturesDirty", "_reflectivityColor")
], PBRSpecularGlossinessMaterial.prototype, "specularColor", void 0);
__decorate([
    serialize(),
    expandToProperty("_markAllSubMeshesAsTexturesDirty", "_microSurface")
], PBRSpecularGlossinessMaterial.prototype, "glossiness", void 0);
__decorate([
    serializeAsTexture(),
    expandToProperty("_markAllSubMeshesAsTexturesDirty", "_reflectivityTexture")
], PBRSpecularGlossinessMaterial.prototype, "specularGlossinessTexture", void 0);
RegisterClass("BABYLON.PBRSpecularGlossinessMaterial", PBRSpecularGlossinessMaterial);
//# sourceMappingURL=pbrSpecularGlossinessMaterial.js.map