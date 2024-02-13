import type { HardwareTextureWrapper } from "../../Materials/Textures/hardwareTextureWrapper";
import type { Nullable } from "../../types";
import type { INativeEngine, NativeTexture } from "./nativeInterfaces";
/** @internal */
export declare class NativeHardwareTexture implements HardwareTextureWrapper {
    private readonly _engine;
    private _nativeTexture;
    get underlyingResource(): Nullable<NativeTexture>;
    constructor(existingTexture: NativeTexture, engine: INativeEngine);
    setUsage(): void;
    set(hardwareTexture: NativeTexture): void;
    reset(): void;
    release(): void;
}
