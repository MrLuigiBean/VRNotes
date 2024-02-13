import type { Nullable } from "../types";
import { Scene } from "../scene";
import type { ISceneSerializableComponent } from "../sceneComponent";
import { SubSurfaceConfiguration } from "./subSurfaceConfiguration";
declare module "../abstractScene" {
    interface AbstractScene {
        /** @internal (Backing field) */
        _subSurfaceConfiguration: Nullable<SubSurfaceConfiguration>;
        /**
         * Gets or Sets the current prepass renderer associated to the scene.
         */
        subSurfaceConfiguration: Nullable<SubSurfaceConfiguration>;
        /**
         * Enables the subsurface effect for prepass
         * @returns the SubSurfaceConfiguration
         */
        enableSubSurfaceForPrePass(): Nullable<SubSurfaceConfiguration>;
        /**
         * Disables the subsurface effect for prepass
         */
        disableSubSurfaceForPrePass(): void;
    }
}
/**
 * Defines the Geometry Buffer scene component responsible to manage a G-Buffer useful
 * in several rendering techniques.
 */
export declare class SubSurfaceSceneComponent implements ISceneSerializableComponent {
    /**
     * The component name helpful to identify the component in the list of scene components.
     */
    readonly name = "PrePassRenderer";
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
     * Serializes the component data to the specified json object
     * @param serializationObject The object to serialize to
     */
    serialize(serializationObject: any): void;
    /**
     * Adds all the elements from the container to the scene
     */
    addFromContainer(): void;
    /**
     * Removes all the elements in the container from the scene
     */
    removeFromContainer(): void;
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
