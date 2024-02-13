import type { Nullable } from "../types";
import { Observable } from "../Misc/observable";
import type { Vector3 } from "../Maths/math.vector";
import type { ISceneComponent } from "../sceneComponent";
import { Scene } from "../scene";
import type { IPhysicsEngine } from "./IPhysicsEngine";
import type { IPhysicsEnginePlugin as IPhysicsEnginePluginV1 } from "./v1/IPhysicsEnginePlugin";
import type { IPhysicsEnginePluginV2 } from "./v2/IPhysicsEnginePlugin";
declare module "../scene" {
    /**
     *
     */
    interface Scene {
        /** @internal (Backing field) */
        _physicsEngine: Nullable<IPhysicsEngine>;
        /** @internal */
        _physicsTimeAccumulator: number;
        /**
         * Gets the current physics engine
         * @returns a IPhysicsEngine or null if none attached
         */
        getPhysicsEngine(): Nullable<IPhysicsEngine>;
        /**
         * Enables physics to the current scene
         * @param gravity defines the scene's gravity for the physics engine. defaults to real earth gravity : (0, -9.81, 0)
         * @param plugin defines the physics engine to be used. defaults to CannonJS.
         * @returns a boolean indicating if the physics engine was initialized
         */
        enablePhysics(gravity?: Nullable<Vector3>, plugin?: IPhysicsEnginePluginV1 | IPhysicsEnginePluginV2): boolean;
        /**
         * Disables and disposes the physics engine associated with the scene
         */
        disablePhysicsEngine(): void;
        /**
         * Gets a boolean indicating if there is an active physics engine
         * @returns a boolean indicating if there is an active physics engine
         */
        isPhysicsEnabled(): boolean;
        /**
         * Deletes a physics compound impostor
         * @param compound defines the compound to delete
         */
        deleteCompoundImpostor(compound: any): void;
        /**
         * An event triggered when physic simulation is about to be run
         */
        onBeforePhysicsObservable: Observable<Scene>;
        /**
         * An event triggered when physic simulation has been done
         */
        onAfterPhysicsObservable: Observable<Scene>;
    }
}
/**
 * Defines the physics engine scene component responsible to manage a physics engine
 */
export declare class PhysicsEngineSceneComponent implements ISceneComponent {
    /**
     * The component name helpful to identify the component in the list of scene components.
     */
    readonly name = "PhysicsEngine";
    /**
     * The scene the component belongs to.
     */
    scene: Scene;
    /**
     * Creates a new instance of the component for the given scene
     * @param scene Defines the scene to register the component in
     */
    constructor(scene: Scene);
    /**
     * Registers the component in a given scene
     */
    register(): void;
    /**
     * Rebuilds the elements related to this component in case of
     * context lost for instance.
     */
    rebuild(): void;
    /**
     * Disposes the component and the associated resources
     */
    dispose(): void;
}
