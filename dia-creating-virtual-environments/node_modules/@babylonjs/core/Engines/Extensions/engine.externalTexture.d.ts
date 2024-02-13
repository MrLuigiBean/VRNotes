import type { ExternalTexture } from "../../Materials/Textures/externalTexture";
import type { Nullable } from "../../types";
declare module "../../Engines/thinEngine" {
    interface ThinEngine {
        /**
         * Creates an external texture
         * @param video video element
         * @returns the external texture, or null if external textures are not supported by the engine
         */
        createExternalTexture(video: HTMLVideoElement): Nullable<ExternalTexture>;
        /**
         * Sets an internal texture to the according uniform.
         * @param name The name of the uniform in the effect
         * @param texture The texture to apply
         */
        setExternalTexture(name: string, texture: Nullable<ExternalTexture>): void;
    }
}
