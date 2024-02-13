import { Observable } from "../Misc/observable";
import type { Nullable } from "../types";
import type { Engine } from "./engine";
import type { Scene } from "../scene";
/**
 * The engine store class is responsible to hold all the instances of Engine and Scene created
 * during the life time of the application.
 */
export declare class EngineStore {
    /** Gets the list of created engines */
    static Instances: Engine[];
    /**
     * Notifies when an engine was disposed.
     * Mainly used for static/cache cleanup
     */
    static OnEnginesDisposedObservable: Observable<Engine>;
    /** @internal */
    static _LastCreatedScene: Nullable<Scene>;
    /**
     * Gets the latest created engine
     */
    static get LastCreatedEngine(): Nullable<Engine>;
    /**
     * Gets the latest created scene
     */
    static get LastCreatedScene(): Nullable<Scene>;
    /**
     * Gets or sets a global variable indicating if fallback texture must be used when a texture cannot be loaded
     * @ignorenaming
     */
    static UseFallbackTexture: boolean;
    /**
     * Texture content used if a texture cannot loaded
     * @ignorenaming
     */
    static FallbackTexture: string;
}
