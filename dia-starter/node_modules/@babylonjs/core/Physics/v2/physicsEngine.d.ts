import type { Nullable } from "../../types";
import { Vector3 } from "../../Maths/math.vector";
import type { IPhysicsEngine } from "../IPhysicsEngine";
import type { IPhysicsEnginePluginV2 } from "./IPhysicsEnginePlugin";
import type { IRaycastQuery } from "../physicsRaycastResult";
import { PhysicsRaycastResult } from "../physicsRaycastResult";
import type { PhysicsBody } from "./physicsBody";
/**
 * Class used to control physics engine
 * @see https://doc.babylonjs.com/features/featuresDeepDive/physics/usingPhysicsEngine
 */
export declare class PhysicsEngine implements IPhysicsEngine {
    private _physicsPlugin;
    /** @internal */
    private _physicsBodies;
    private _subTimeStep;
    /**
     * Gets the gravity vector used by the simulation
     */
    gravity: Vector3;
    /**
     *
     * @returns physics plugin version
     */
    getPluginVersion(): number;
    /**
     * Factory used to create the default physics plugin.
     * @returns The default physics plugin
     */
    static DefaultPluginFactory(): IPhysicsEnginePluginV2;
    /**
     * Creates a new Physics Engine
     * @param gravity defines the gravity vector used by the simulation
     * @param _physicsPlugin defines the plugin to use (CannonJS by default)
     */
    constructor(gravity: Nullable<Vector3>, _physicsPlugin?: IPhysicsEnginePluginV2);
    /**
     * Sets the gravity vector used by the simulation
     * @param gravity defines the gravity vector to use
     */
    setGravity(gravity: Vector3): void;
    /**
     * Set the time step of the physics engine.
     * Default is 1/60.
     * To slow it down, enter 1/600 for example.
     * To speed it up, 1/30
     * @param newTimeStep defines the new timestep to apply to this world.
     */
    setTimeStep(newTimeStep?: number): void;
    /**
     * Get the time step of the physics engine.
     * @returns the current time step
     */
    getTimeStep(): number;
    /**
     * Set the sub time step of the physics engine.
     * Default is 0 meaning there is no sub steps
     * To increase physics resolution precision, set a small value (like 1 ms)
     * @param subTimeStep defines the new sub timestep used for physics resolution.
     */
    setSubTimeStep(subTimeStep?: number): void;
    /**
     * Get the sub time step of the physics engine.
     * @returns the current sub time step
     */
    getSubTimeStep(): number;
    /**
     * Release all resources
     */
    dispose(): void;
    /**
     * Gets the name of the current physics plugin
     * @returns the name of the plugin
     */
    getPhysicsPluginName(): string;
    /**
     * Adding a new impostor for the impostor tracking.
     * This will be done by the impostor itself.
     * @param impostor the impostor to add
     */
    /**
     * Called by the scene. No need to call it.
     * @param delta defines the timespan between frames
     */
    _step(delta: number): void;
    /**
     * Add a body as an active component of this engine
     * @param body
     */
    addBody(physicsBody: PhysicsBody): void;
    /**
     * Removes a particular body from this engine
     */
    removeBody(physicsBody: PhysicsBody): void;
    /**
     * Returns an array of bodies added to this engine

     */
    getBodies(): Array<PhysicsBody>;
    /**
     * Gets the current plugin used to run the simulation
     * @returns current plugin
     */
    getPhysicsPlugin(): IPhysicsEnginePluginV2;
    /**
     * Does a raycast in the physics world
     * @param from when should the ray start?
     * @param to when should the ray end?
     * @param result resulting PhysicsRaycastResult
     */
    raycastToRef(from: Vector3, to: Vector3, result: PhysicsRaycastResult, query?: IRaycastQuery): void;
    /**
     * Does a raycast in the physics world
     * @param from when should the ray start?
     * @param to when should the ray end?
     * @returns PhysicsRaycastResult
     */
    raycast(from: Vector3, to: Vector3, query?: IRaycastQuery): PhysicsRaycastResult;
}
