import type { Nullable } from "../types";
import type { Scene } from "../scene";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import { Mesh } from "../Meshes/mesh";
import { Vector3 } from "../Maths/math.vector";
import type { IPhysicsEnginePlugin as IPhysicsEnginePluginV1 } from "../Physics/v1/IPhysicsEnginePlugin";
import type { IPhysicsEnginePluginV2 } from "../Physics/v2/IPhysicsEnginePlugin";
import { PhysicsImpostor } from "../Physics/v1/physicsImpostor";
import type { PhysicsBody } from "../Physics/v2/physicsBody";
import type { PhysicsConstraint } from "../Physics/v2/physicsConstraint";
/**
 * Used to show the physics impostor around the specific mesh
 */
export declare class PhysicsViewer {
    /** @internal */
    protected _impostors: Array<Nullable<PhysicsImpostor>>;
    /** @internal */
    protected _meshes: Array<Nullable<AbstractMesh>>;
    /** @internal */
    protected _bodies: Array<Nullable<PhysicsBody>>;
    /** @internal */
    protected _inertiaBodies: Array<Nullable<PhysicsBody>>;
    /** @internal */
    protected _constraints: Array<Nullable<PhysicsConstraint>>;
    /** @internal */
    protected _bodyMeshes: Array<Nullable<AbstractMesh>>;
    /** @internal */
    protected _inertiaMeshes: Array<Nullable<AbstractMesh>>;
    /** @internal */
    protected _constraintMeshes: Array<Nullable<AbstractMesh>>;
    /** @internal */
    protected _scene: Nullable<Scene>;
    /** @internal */
    protected _numMeshes: number;
    /** @internal */
    protected _numBodies: number;
    /** @internal */
    protected _numInertiaBodies: number;
    /** @internal */
    protected _numConstraints: number;
    /** @internal */
    protected _physicsEnginePlugin: IPhysicsEnginePluginV1 | IPhysicsEnginePluginV2 | null;
    private _renderFunction;
    private _inertiaRenderFunction;
    private _constraintRenderFunction;
    private _utilityLayer;
    private _debugBoxMesh;
    private _debugSphereMesh;
    private _debugCapsuleMesh;
    private _debugCylinderMesh;
    private _debugMaterial;
    private _debugInertiaMaterial;
    private _debugMeshMeshes;
    private _constraintAxesSize;
    /**
     * Creates a new PhysicsViewer
     * @param scene defines the hosting scene
     */
    constructor(scene?: Scene);
    /**
     * Updates the debug meshes of the physics engine.
     *
     * This code is useful for synchronizing the debug meshes of the physics engine with the physics impostor and mesh.
     * It checks if the impostor is disposed and if the plugin version is 1, then it syncs the mesh with the impostor.
     * This ensures that the debug meshes are up to date with the physics engine.
     */
    protected _updateDebugMeshes(): void;
    /**
     * Updates the debug meshes of the physics engine.
     *
     * This method is useful for synchronizing the debug meshes with the physics impostors.
     * It iterates through the impostors and meshes, and if the plugin version is 1, it syncs the mesh with the impostor.
     * This ensures that the debug meshes accurately reflect the physics impostors, which is important for debugging the physics engine.
     */
    protected _updateDebugMeshesV1(): void;
    /**
     * Updates the debug meshes of the physics engine for V2 plugin.
     *
     * This method is useful for synchronizing the debug meshes of the physics engine with the current state of the bodies.
     * It iterates through the bodies array and updates the debug meshes with the current transform of each body.
     * This ensures that the debug meshes accurately reflect the current state of the physics engine.
     */
    protected _updateDebugMeshesV2(): void;
    protected _updateInertiaMeshes(): void;
    protected _updateDebugInertia(body: PhysicsBody, inertiaMesh: AbstractMesh): void;
    protected _updateDebugConstraints(): void;
    /**
     * Given a scaling vector, make all of its components
     * 1, preserving the sign
     * @param scaling
     */
    protected _makeScalingUnitInPlace(scaling: Vector3): void;
    protected _updateDebugConstraint(constraint: PhysicsConstraint, parentingMesh: AbstractMesh): void;
    /**
     * Renders a specified physic impostor
     * @param impostor defines the impostor to render
     * @param targetMesh defines the mesh represented by the impostor
     * @returns the new debug mesh used to render the impostor
     */
    showImpostor(impostor: PhysicsImpostor, targetMesh?: Mesh): Nullable<AbstractMesh>;
    /**
     * Shows a debug mesh for a given physics body.
     * @param body The physics body to show.
     * @returns The debug mesh, or null if the body is already shown.
     *
     * This function is useful for visualizing the physics body in the scene.
     * It creates a debug mesh for the given body and adds it to the scene.
     * It also registers a before render function to update the debug mesh position and rotation.
     */
    showBody(body: PhysicsBody): Nullable<AbstractMesh>;
    /**
     * Shows a debug box corresponding to the inertia of a given body
     * @param body
     */
    showInertia(body: PhysicsBody): Nullable<AbstractMesh>;
    /**
     * Shows a debug mesh for a given physics constraint.
     * @param constraint the physics constraint to show
     * @returns the debug mesh, or null if the constraint is already shown
     */
    showConstraint(constraint: PhysicsConstraint): Nullable<AbstractMesh>;
    /**
     * Hides an impostor from the scene.
     * @param impostor - The impostor to hide.
     *
     * This method is useful for hiding an impostor from the scene. It removes the
     * impostor from the utility layer scene, disposes the mesh, and removes the
     * impostor from the list of impostors. If the impostor is the last one in the
     * list, it also unregisters the render function.
     */
    hideImpostor(impostor: Nullable<PhysicsImpostor>): void;
    /**
     * Hides a body from the physics engine.
     * @param body - The body to hide.
     *
     * This function is useful for hiding a body from the physics engine.
     * It removes the body from the utility layer scene and disposes the mesh associated with it.
     * It also unregisters the render function if the number of bodies is 0.
     * This is useful for hiding a body from the physics engine without deleting it.
     */
    hideBody(body: Nullable<PhysicsBody>): void;
    hideInertia(body: Nullable<PhysicsBody>): void;
    /**
     * Hide a physics constraint from the viewer utility layer
     * @param constraint the constraint to hide
     */
    hideConstraint(constraint: Nullable<PhysicsConstraint>): void;
    private _getDebugMaterial;
    private _getDebugInertiaMaterial;
    private _getDebugBoxMesh;
    private _getDebugSphereMesh;
    private _getDebugCapsuleMesh;
    private _getDebugCylinderMesh;
    private _getDebugMeshMesh;
    private _getDebugMesh;
    /**
     * Creates a debug mesh for a given physics body
     * @param body The physics body to create the debug mesh for
     * @returns The created debug mesh or null if the utility layer is not available
     *
     * This code is useful for creating a debug mesh for a given physics body.
     * It creates a Mesh object with a VertexData object containing the positions and indices
     * of the geometry of the body. The mesh is then assigned a debug material from the utility layer scene.
     * This allows for visualizing the physics body in the scene.
     */
    private _getDebugBodyMesh;
    private _getMeshDebugInertiaMatrixToRef;
    private _getDebugInertiaMesh;
    private _getTransformFromBodyToRef;
    private _getDebugConstraintMesh;
    /**
     * Clean up physics debug display
     */
    dispose(): void;
}
