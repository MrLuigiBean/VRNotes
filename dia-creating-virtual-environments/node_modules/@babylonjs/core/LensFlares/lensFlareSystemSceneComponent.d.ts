import type { Nullable } from "../types";
import type { Scene } from "../scene";
import type { ISceneSerializableComponent } from "../sceneComponent";
import { AbstractScene } from "../abstractScene";
import { LensFlareSystem } from "./lensFlareSystem";
declare module "../abstractScene" {
    interface AbstractScene {
        /**
         * The list of lens flare system added to the scene
         * @see https://doc.babylonjs.com/features/featuresDeepDive/environment/lenseFlare
         */
        lensFlareSystems: Array<LensFlareSystem>;
        /**
         * Removes the given lens flare system from this scene.
         * @param toRemove The lens flare system to remove
         * @returns The index of the removed lens flare system
         */
        removeLensFlareSystem(toRemove: LensFlareSystem): number;
        /**
         * Adds the given lens flare system to this scene
         * @param newLensFlareSystem The lens flare system to add
         */
        addLensFlareSystem(newLensFlareSystem: LensFlareSystem): void;
        /**
         * Gets a lens flare system using its name
         * @param name defines the name to look for
         * @returns the lens flare system or null if not found
         */
        getLensFlareSystemByName(name: string): Nullable<LensFlareSystem>;
        /**
         * Gets a lens flare system using its Id
         * @param id defines the Id to look for
         * @returns the lens flare system or null if not found
         * @deprecated Please use getLensFlareSystemById instead
         */
        getLensFlareSystemByID(id: string): Nullable<LensFlareSystem>;
        /**
         * Gets a lens flare system using its Id
         * @param id defines the Id to look for
         * @returns the lens flare system or null if not found
         */
        getLensFlareSystemById(id: string): Nullable<LensFlareSystem>;
    }
}
/**
 * Defines the lens flare scene component responsible to manage any lens flares
 * in a given scene.
 */
export declare class LensFlareSystemSceneComponent implements ISceneSerializableComponent {
    /**
     * The component name helpful to identify the component in the list of scene components.
     */
    readonly name = "LensFlareSystem";
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
     * Adds all the elements from the container to the scene
     * @param container the container holding the elements
     */
    addFromContainer(container: AbstractScene): void;
    /**
     * Removes all the elements in the container from the scene
     * @param container contains the elements to remove
     * @param dispose if the removed element should be disposed (default: false)
     */
    removeFromContainer(container: AbstractScene, dispose?: boolean): void;
    /**
     * Serializes the component data to the specified json object
     * @param serializationObject The object to serialize to
     */
    serialize(serializationObject: any): void;
    /**
     * Disposes the component and the associated resources.
     */
    dispose(): void;
    private _draw;
}
