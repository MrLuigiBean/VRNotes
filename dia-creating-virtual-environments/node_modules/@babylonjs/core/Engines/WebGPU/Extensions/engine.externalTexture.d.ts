import type { ExternalTexture } from "../../../Materials/Textures/externalTexture";
import type { Nullable } from "../../../types";
declare module "../../../Materials/effect" {
    interface Effect {
        /**
         * Sets an external texture on the engine to be used in the shader.
         * @param name Name of the external texture variable.
         * @param texture Texture to set.
         */
        setExternalTexture(name: string, texture: Nullable<ExternalTexture>): void;
    }
}
