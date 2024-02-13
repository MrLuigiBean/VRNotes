import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial.js";
import { GLTFLoader } from "../glTFLoader.js";
const NAME = "KHR_materials_translucency";
/**
 * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1825)
 * !!! Experimental Extension Subject to Changes !!!
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export class KHR_materials_translucency {
    /**
     * @internal
     */
    constructor(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        this.order = 174;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
        if (this.enabled) {
            loader.parent.transparencyAsCoverage = true;
        }
    }
    /** @internal */
    dispose() {
        this._loader = null;
    }
    /**
     * @internal
     */
    loadMaterialPropertiesAsync(context, material, babylonMaterial) {
        return GLTFLoader.LoadExtensionAsync(context, material, this.name, (extensionContext, extension) => {
            const promises = new Array();
            promises.push(this._loader.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));
            promises.push(this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
            promises.push(this._loadTranslucentPropertiesAsync(extensionContext, material, babylonMaterial, extension));
            return Promise.all(promises).then(() => { });
        });
    }
    _loadTranslucentPropertiesAsync(context, material, babylonMaterial, extension) {
        if (!(babylonMaterial instanceof PBRMaterial)) {
            throw new Error(`${context}: Material type not supported`);
        }
        const pbrMaterial = babylonMaterial;
        // Enables "translucency" texture which represents diffusely-transmitted light.
        pbrMaterial.subSurface.isTranslucencyEnabled = true;
        // Since this extension models thin-surface transmission only, we must make the
        // internal IOR == 1.0 and set the thickness to 0.
        pbrMaterial.subSurface.volumeIndexOfRefraction = 1.0;
        pbrMaterial.subSurface.minimumThickness = 0.0;
        pbrMaterial.subSurface.maximumThickness = 0.0;
        // Albedo colour will tint transmission.
        pbrMaterial.subSurface.useAlbedoToTintTranslucency = true;
        if (extension.translucencyFactor !== undefined) {
            pbrMaterial.subSurface.translucencyIntensity = extension.translucencyFactor;
        }
        else {
            pbrMaterial.subSurface.translucencyIntensity = 0.0;
            pbrMaterial.subSurface.isTranslucencyEnabled = false;
            return Promise.resolve();
        }
        if (extension.translucencyTexture) {
            extension.translucencyTexture.nonColorData = true;
            return this._loader.loadTextureInfoAsync(`${context}/translucencyTexture`, extension.translucencyTexture).then((texture) => {
                pbrMaterial.subSurface.translucencyIntensityTexture = texture;
            });
        }
        else {
            return Promise.resolve();
        }
    }
}
GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_materials_translucency(loader));
//# sourceMappingURL=KHR_materials_translucency.js.map