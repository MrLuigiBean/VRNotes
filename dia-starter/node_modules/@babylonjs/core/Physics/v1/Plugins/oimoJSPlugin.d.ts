import { PhysicsImpostor } from "../physicsImpostor";
import type { IMotorEnabledJoint } from "../physicsJoint";
import { PhysicsJoint } from "../physicsJoint";
import type { AbstractMesh } from "../../../Meshes/abstractMesh";
import { Vector3, Quaternion } from "../../../Maths/math.vector";
import type { Nullable } from "../../../types";
import { PhysicsRaycastResult } from "../../physicsRaycastResult";
import type { IPhysicsEnginePlugin, PhysicsImpostorJoint } from "../IPhysicsEnginePlugin";
/** @internal */
export declare class OimoJSPlugin implements IPhysicsEnginePlugin {
    private _useDeltaForWorldStep;
    world: any;
    name: string;
    BJSOIMO: any;
    private _raycastResult;
    private _fixedTimeStep;
    constructor(_useDeltaForWorldStep?: boolean, iterations?: number, oimoInjection?: any);
    /**
     *
     * @returns plugin version
     */
    getPluginVersion(): number;
    setGravity(gravity: Vector3): void;
    setTimeStep(timeStep: number): void;
    getTimeStep(): number;
    private _tmpImpostorsArray;
    executeStep(delta: number, impostors: Array<PhysicsImpostor>): void;
    applyImpulse(impostor: PhysicsImpostor, force: Vector3, contactPoint: Vector3): void;
    applyForce(impostor: PhysicsImpostor, force: Vector3, contactPoint: Vector3): void;
    generatePhysicsBody(impostor: PhysicsImpostor): void;
    private _tmpPositionVector;
    removePhysicsBody(impostor: PhysicsImpostor): void;
    generateJoint(impostorJoint: PhysicsImpostorJoint): void;
    removeJoint(impostorJoint: PhysicsImpostorJoint): void;
    isSupported(): boolean;
    setTransformationFromPhysicsBody(impostor: PhysicsImpostor): void;
    setPhysicsBodyTransformation(impostor: PhysicsImpostor, newPosition: Vector3, newRotation: Quaternion): void;
    setLinearVelocity(impostor: PhysicsImpostor, velocity: Vector3): void;
    setAngularVelocity(impostor: PhysicsImpostor, velocity: Vector3): void;
    getLinearVelocity(impostor: PhysicsImpostor): Nullable<Vector3>;
    getAngularVelocity(impostor: PhysicsImpostor): Nullable<Vector3>;
    setBodyMass(impostor: PhysicsImpostor, mass: number): void;
    getBodyMass(impostor: PhysicsImpostor): number;
    getBodyFriction(impostor: PhysicsImpostor): number;
    setBodyFriction(impostor: PhysicsImpostor, friction: number): void;
    getBodyRestitution(impostor: PhysicsImpostor): number;
    setBodyRestitution(impostor: PhysicsImpostor, restitution: number): void;
    sleepBody(impostor: PhysicsImpostor): void;
    wakeUpBody(impostor: PhysicsImpostor): void;
    updateDistanceJoint(joint: PhysicsJoint, maxDistance: number, minDistance?: number): void;
    setMotor(joint: IMotorEnabledJoint, speed: number, force?: number, motorIndex?: number): void;
    setLimit(joint: IMotorEnabledJoint, upperLimit: number, lowerLimit?: number, motorIndex?: number): void;
    syncMeshWithImpostor(mesh: AbstractMesh, impostor: PhysicsImpostor): void;
    getRadius(impostor: PhysicsImpostor): number;
    getBoxSizeToRef(impostor: PhysicsImpostor, result: Vector3): void;
    dispose(): void;
    /**
     * Does a raycast in the physics world
     * @param from when should the ray start?
     * @param to when should the ray end?
     * @returns PhysicsRaycastResult
     */
    raycast(from: Vector3, to: Vector3): PhysicsRaycastResult;
    /**
     * Does a raycast in the physics world
     * @param from when should the ray start?
     * @param to when should the ray end?
     * @param result resulting PhysicsRaycastResult
     */
    raycastToRef(from: Vector3, to: Vector3, result: PhysicsRaycastResult): void;
}
