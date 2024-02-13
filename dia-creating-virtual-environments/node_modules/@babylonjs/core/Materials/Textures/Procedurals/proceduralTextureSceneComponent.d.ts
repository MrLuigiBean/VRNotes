import type { Scene } from "../../../scene";
import type { ISceneComponent } from "../../../sceneComponent";
import type { ProceduralTexture } from "./proceduralTexture";
declare module "../../../abstractScene" {
    interface AbstractScene {
        /**
         * The list of procedural textures added to the scene
         * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/proceduralTextures
         */
        proceduralTextures: Array<ProceduralTexture>;
    }
}
/**
 * Defines the Procedural Texture scene component responsible to manage any Procedural Texture
 * in a given scene.
 */
export declare class ProceduralTextureSceneComponent implements ISceneComponent {
    /**
     * The component name helpful to identify the component in the list of scene components.
     */
    readonly name = "ProceduralTexture";
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
     * Disposes the component and the associated resources.
     */
    dispose(): void;
    private _beforeClear;
}
