import { Engine } from "../Engines/engine.js";

/**
 * This groups all the flags used to control the materials channel.
 */
export class MaterialFlags {
    /**
     * Are diffuse textures enabled in the application.
     */
    static get DiffuseTextureEnabled() {
        return this._DiffuseTextureEnabled;
    }
    static set DiffuseTextureEnabled(value) {
        if (this._DiffuseTextureEnabled === value) {
            return;
        }
        this._DiffuseTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are detail textures enabled in the application.
     */
    static get DetailTextureEnabled() {
        return this._DetailTextureEnabled;
    }
    static set DetailTextureEnabled(value) {
        if (this._DetailTextureEnabled === value) {
            return;
        }
        this._DetailTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are decal maps enabled in the application.
     */
    static get DecalMapEnabled() {
        return this._DecalMapEnabled;
    }
    static set DecalMapEnabled(value) {
        if (this._DecalMapEnabled === value) {
            return;
        }
        this._DecalMapEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are ambient textures enabled in the application.
     */
    static get AmbientTextureEnabled() {
        return this._AmbientTextureEnabled;
    }
    static set AmbientTextureEnabled(value) {
        if (this._AmbientTextureEnabled === value) {
            return;
        }
        this._AmbientTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are opacity textures enabled in the application.
     */
    static get OpacityTextureEnabled() {
        return this._OpacityTextureEnabled;
    }
    static set OpacityTextureEnabled(value) {
        if (this._OpacityTextureEnabled === value) {
            return;
        }
        this._OpacityTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are reflection textures enabled in the application.
     */
    static get ReflectionTextureEnabled() {
        return this._ReflectionTextureEnabled;
    }
    static set ReflectionTextureEnabled(value) {
        if (this._ReflectionTextureEnabled === value) {
            return;
        }
        this._ReflectionTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are emissive textures enabled in the application.
     */
    static get EmissiveTextureEnabled() {
        return this._EmissiveTextureEnabled;
    }
    static set EmissiveTextureEnabled(value) {
        if (this._EmissiveTextureEnabled === value) {
            return;
        }
        this._EmissiveTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are specular textures enabled in the application.
     */
    static get SpecularTextureEnabled() {
        return this._SpecularTextureEnabled;
    }
    static set SpecularTextureEnabled(value) {
        if (this._SpecularTextureEnabled === value) {
            return;
        }
        this._SpecularTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are bump textures enabled in the application.
     */
    static get BumpTextureEnabled() {
        return this._BumpTextureEnabled;
    }
    static set BumpTextureEnabled(value) {
        if (this._BumpTextureEnabled === value) {
            return;
        }
        this._BumpTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are lightmap textures enabled in the application.
     */
    static get LightmapTextureEnabled() {
        return this._LightmapTextureEnabled;
    }
    static set LightmapTextureEnabled(value) {
        if (this._LightmapTextureEnabled === value) {
            return;
        }
        this._LightmapTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are refraction textures enabled in the application.
     */
    static get RefractionTextureEnabled() {
        return this._RefractionTextureEnabled;
    }
    static set RefractionTextureEnabled(value) {
        if (this._RefractionTextureEnabled === value) {
            return;
        }
        this._RefractionTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are color grading textures enabled in the application.
     */
    static get ColorGradingTextureEnabled() {
        return this._ColorGradingTextureEnabled;
    }
    static set ColorGradingTextureEnabled(value) {
        if (this._ColorGradingTextureEnabled === value) {
            return;
        }
        this._ColorGradingTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are fresnels enabled in the application.
     */
    static get FresnelEnabled() {
        return this._FresnelEnabled;
    }
    static set FresnelEnabled(value) {
        if (this._FresnelEnabled === value) {
            return;
        }
        this._FresnelEnabled = value;
        Engine.MarkAllMaterialsAsDirty(4);
    }
    /**
     * Are clear coat textures enabled in the application.
     */
    static get ClearCoatTextureEnabled() {
        return this._ClearCoatTextureEnabled;
    }
    static set ClearCoatTextureEnabled(value) {
        if (this._ClearCoatTextureEnabled === value) {
            return;
        }
        this._ClearCoatTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are clear coat bump textures enabled in the application.
     */
    static get ClearCoatBumpTextureEnabled() {
        return this._ClearCoatBumpTextureEnabled;
    }
    static set ClearCoatBumpTextureEnabled(value) {
        if (this._ClearCoatBumpTextureEnabled === value) {
            return;
        }
        this._ClearCoatBumpTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are clear coat tint textures enabled in the application.
     */
    static get ClearCoatTintTextureEnabled() {
        return this._ClearCoatTintTextureEnabled;
    }
    static set ClearCoatTintTextureEnabled(value) {
        if (this._ClearCoatTintTextureEnabled === value) {
            return;
        }
        this._ClearCoatTintTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are sheen textures enabled in the application.
     */
    static get SheenTextureEnabled() {
        return this._SheenTextureEnabled;
    }
    static set SheenTextureEnabled(value) {
        if (this._SheenTextureEnabled === value) {
            return;
        }
        this._SheenTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are anisotropic textures enabled in the application.
     */
    static get AnisotropicTextureEnabled() {
        return this._AnisotropicTextureEnabled;
    }
    static set AnisotropicTextureEnabled(value) {
        if (this._AnisotropicTextureEnabled === value) {
            return;
        }
        this._AnisotropicTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are thickness textures enabled in the application.
     */
    static get ThicknessTextureEnabled() {
        return this._ThicknessTextureEnabled;
    }
    static set ThicknessTextureEnabled(value) {
        if (this._ThicknessTextureEnabled === value) {
            return;
        }
        this._ThicknessTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are refraction intensity textures enabled in the application.
     */
    static get RefractionIntensityTextureEnabled() {
        return this._ThicknessTextureEnabled;
    }
    static set RefractionIntensityTextureEnabled(value) {
        if (this._RefractionIntensityTextureEnabled === value) {
            return;
        }
        this._RefractionIntensityTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are translucency intensity textures enabled in the application.
     */
    static get TranslucencyIntensityTextureEnabled() {
        return this._ThicknessTextureEnabled;
    }
    static set TranslucencyIntensityTextureEnabled(value) {
        if (this._TranslucencyIntensityTextureEnabled === value) {
            return;
        }
        this._TranslucencyIntensityTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
    /**
     * Are translucency intensity textures enabled in the application.
     */
    static get IridescenceTextureEnabled() {
        return this._IridescenceTextureEnabled;
    }
    static set IridescenceTextureEnabled(value) {
        if (this._IridescenceTextureEnabled === value) {
            return;
        }
        this._IridescenceTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
    }
}
// Flags used to enable or disable a type of texture for all Standard Materials
MaterialFlags._DiffuseTextureEnabled = true;
MaterialFlags._DetailTextureEnabled = true;
MaterialFlags._DecalMapEnabled = true;
MaterialFlags._AmbientTextureEnabled = true;
MaterialFlags._OpacityTextureEnabled = true;
MaterialFlags._ReflectionTextureEnabled = true;
MaterialFlags._EmissiveTextureEnabled = true;
MaterialFlags._SpecularTextureEnabled = true;
MaterialFlags._BumpTextureEnabled = true;
MaterialFlags._LightmapTextureEnabled = true;
MaterialFlags._RefractionTextureEnabled = true;
MaterialFlags._ColorGradingTextureEnabled = true;
MaterialFlags._FresnelEnabled = true;
MaterialFlags._ClearCoatTextureEnabled = true;
MaterialFlags._ClearCoatBumpTextureEnabled = true;
MaterialFlags._ClearCoatTintTextureEnabled = true;
MaterialFlags._SheenTextureEnabled = true;
MaterialFlags._AnisotropicTextureEnabled = true;
MaterialFlags._ThicknessTextureEnabled = true;
MaterialFlags._RefractionIntensityTextureEnabled = true;
MaterialFlags._TranslucencyIntensityTextureEnabled = true;
MaterialFlags._IridescenceTextureEnabled = true;
//# sourceMappingURL=materialFlags.js.map