import type { Nullable } from "../types";
import { Observable } from "../Misc/observable";
import { Scene } from "../scene";
import type { Sprite } from "./sprite";
import type { ISpriteManager } from "./spriteManager";
import { Ray } from "../Culling/ray";
import type { Camera } from "../Cameras/camera";
import { PickingInfo } from "../Collisions/pickingInfo";
import type { ISceneComponent } from "../sceneComponent";
declare module "../scene" {
    interface Scene {
        /** @internal */
        _pointerOverSprite: Nullable<Sprite>;
        /** @internal */
        _pickedDownSprite: Nullable<Sprite>;
        /** @internal */
        _tempSpritePickingRay: Nullable<Ray>;
        /**
         * All of the sprite managers added to this scene
         * @see https://doc.babylonjs.com/features/featuresDeepDive/sprites
         */
        spriteManagers?: Array<ISpriteManager>;
        /**
         * An event triggered when sprites rendering is about to start
         * Note: This event can be trigger more than once per frame (because sprites can be rendered by render target textures as well)
         */
        onBeforeSpritesRenderingObservable: Observable<Scene>;
        /**
         * An event triggered when sprites rendering is done
         * Note: This event can be trigger more than once per frame (because sprites can be rendered by render target textures as well)
         */
        onAfterSpritesRenderingObservable: Observable<Scene>;
        /** @internal */
        _internalPickSprites(ray: Ray, predicate?: (sprite: Sprite) => boolean, fastCheck?: boolean, camera?: Camera): Nullable<PickingInfo>;
        /** Launch a ray to try to pick a sprite in the scene
         * @param x position on screen
         * @param y position on screen
         * @param predicate Predicate function used to determine eligible sprites. Can be set to null. In this case, a sprite must have isPickable set to true
         * @param fastCheck defines if the first intersection will be used (and not the closest)
         * @param camera camera to use for computing the picking ray. Can be set to null. In this case, the scene.activeCamera will be used
         * @returns a PickingInfo
         */
        pickSprite(x: number, y: number, predicate?: (sprite: Sprite) => boolean, fastCheck?: boolean, camera?: Camera): Nullable<PickingInfo>;
        /** Use the given ray to pick a sprite in the scene
         * @param ray The ray (in world space) to use to pick meshes
         * @param predicate Predicate function used to determine eligible sprites. Can be set to null. In this case, a sprite must have isPickable set to true
         * @param fastCheck defines if the first intersection will be used (and not the closest)
         * @param camera camera to use. Can be set to null. In this case, the scene.activeCamera will be used
         * @returns a PickingInfo
         */
        pickSpriteWithRay(ray: Ray, predicate?: (sprite: Sprite) => boolean, fastCheck?: boolean, camera?: Camera): Nullable<PickingInfo>;
        /** @internal */
        _internalMultiPickSprites(ray: Ray, predicate?: (sprite: Sprite) => boolean, camera?: Camera): Nullable<PickingInfo[]>;
        /** Launch a ray to try to pick sprites in the scene
         * @param x position on screen
         * @param y position on screen
         * @param predicate Predicate function used to determine eligible sprites. Can be set to null. In this case, a sprite must have isPickable set to true
         * @param camera camera to use for computing the picking ray. Can be set to null. In this case, the scene.activeCamera will be used
         * @returns a PickingInfo array
         */
        multiPickSprite(x: number, y: number, predicate?: (sprite: Sprite) => boolean, camera?: Camera): Nullable<PickingInfo[]>;
        /** Use the given ray to pick sprites in the scene
         * @param ray The ray (in world space) to use to pick meshes
         * @param predicate Predicate function used to determine eligible sprites. Can be set to null. In this case, a sprite must have isPickable set to true
         * @param camera camera to use. Can be set to null. In this case, the scene.activeCamera will be used
         * @returns a PickingInfo array
         */
        multiPickSpriteWithRay(ray: Ray, predicate?: (sprite: Sprite) => boolean, camera?: Camera): Nullable<PickingInfo[]>;
        /**
         * Force the sprite under the pointer
         * @param sprite defines the sprite to use
         */
        setPointerOverSprite(sprite: Nullable<Sprite>): void;
        /**
         * Gets the sprite under the pointer
         * @returns a Sprite or null if no sprite is under the pointer
         */
        getPointerOverSprite(): Nullable<Sprite>;
    }
}
/**
 * Defines the sprite scene component responsible to manage sprites
 * in a given scene.
 */
export declare class SpriteSceneComponent implements ISceneComponent {
    /**
     * The component name helpfull to identify the component in the list of scene components.
     */
    readonly name = "Sprite";
    /**
     * The scene the component belongs to.
     */
    scene: Scene;
    /** @internal */
    private _spritePredicate;
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
    private _pickSpriteButKeepRay;
    private _pointerMove;
    private _pointerDown;
    private _pointerUp;
}
