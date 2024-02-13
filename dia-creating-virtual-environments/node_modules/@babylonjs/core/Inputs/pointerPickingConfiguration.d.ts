import type { AbstractMesh } from "../Meshes/abstractMesh";
/**
 * Class used to store configuration data associated with pointer picking
 */
export declare class PointerPickingConfiguration {
    /**
     * Gets or sets a predicate used to select candidate meshes for a pointer down event
     */
    pointerDownPredicate: (Mesh: AbstractMesh) => boolean;
    /**
     * Gets or sets a predicate used to select candidate meshes for a pointer up event
     */
    pointerUpPredicate: (Mesh: AbstractMesh) => boolean;
    /**
     * Gets or sets a predicate used to select candidate meshes for a pointer move event
     */
    pointerMovePredicate: (Mesh: AbstractMesh) => boolean;
    /**
     * Gets or sets a predicate used to select candidate meshes for a pointer down event
     */
    pointerDownFastCheck: boolean;
    /**
     * Gets or sets a predicate used to select candidate meshes for a pointer up event
     */
    pointerUpFastCheck: boolean;
    /**
     * Gets or sets a predicate used to select candidate meshes for a pointer move event
     */
    pointerMoveFastCheck: boolean;
    /**
     * Gets or sets a boolean indicating if the user want to entirely skip the picking phase when a pointer move event occurs.
     */
    skipPointerMovePicking: boolean;
    /**
     * Gets or sets a boolean indicating if the user want to entirely skip the picking phase when a pointer down event occurs.
     */
    skipPointerDownPicking: boolean;
    /**
     * Gets or sets a boolean indicating if the user want to entirely skip the picking phase when a pointer up event occurs.  Off by default.
     */
    skipPointerUpPicking: boolean;
}
