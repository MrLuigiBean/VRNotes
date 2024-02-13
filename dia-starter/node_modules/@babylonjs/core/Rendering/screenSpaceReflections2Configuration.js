
/**
 * Contains all parameters needed for the prepass to perform
 * screen space reflections
 */
export class ScreenSpaceReflections2Configuration {
    constructor() {
        /**
         * Is ssr enabled
         */
        this.enabled = false;
        /**
         * Name of the configuration
         */
        this.name = "screenSpaceReflections2";
        /**
         * Textures that should be present in the MRT for this effect to work
         */
        this.texturesRequired = [6, 3, 5];
    }
}
//# sourceMappingURL=screenSpaceReflections2Configuration.js.map