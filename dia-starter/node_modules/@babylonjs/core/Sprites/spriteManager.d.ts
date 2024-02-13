import type { IDisposable, Scene } from "../scene";
import type { Nullable } from "../types";
import { Observable } from "../Misc/observable";
import { Sprite } from "./sprite";
import { PickingInfo } from "../Collisions/pickingInfo";
import type { Camera } from "../Cameras/camera";
import { Texture } from "../Materials/Textures/texture";
import type { Ray } from "../Culling/ray";
/**
 * Defines the minimum interface to fulfill in order to be a sprite manager.
 */
export interface ISpriteManager extends IDisposable {
    /**
     * Gets manager's name
     */
    name: string;
    /**
     * Restricts the camera to viewing objects with the same layerMask.
     * A camera with a layerMask of 1 will render spriteManager.layerMask & camera.layerMask!== 0
     */
    layerMask: number;
    /**
     * Gets or sets a boolean indicating if the mesh can be picked (by scene.pick for instance or through actions). Default is true
     */
    isPickable: boolean;
    /**
     * Gets the hosting scene
     */
    scene: Scene;
    /**
     * Specifies the rendering group id for this mesh (0 by default)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/advanced/transparent_rendering#rendering-groups
     */
    renderingGroupId: number;
    /**
     * Defines the list of sprites managed by the manager.
     */
    sprites: Array<Sprite>;
    /**
     * Gets or sets the spritesheet texture
     */
    texture: Texture;
    /** Defines the default width of a cell in the spritesheet */
    cellWidth: number;
    /** Defines the default height of a cell in the spritesheet */
    cellHeight: number;
    /** @internal */
    _wasDispatched: boolean;
    /**
     * Tests the intersection of a sprite with a specific ray.
     * @param ray The ray we are sending to test the collision
     * @param camera The camera space we are sending rays in
     * @param predicate A predicate allowing excluding sprites from the list of object to test
     * @param fastCheck defines if the first intersection will be used (and not the closest)
     * @returns picking info or null.
     */
    intersects(ray: Ray, camera: Camera, predicate?: (sprite: Sprite) => boolean, fastCheck?: boolean): Nullable<PickingInfo>;
    /**
     * Intersects the sprites with a ray
     * @param ray defines the ray to intersect with
     * @param camera defines the current active camera
     * @param predicate defines a predicate used to select candidate sprites
     * @returns null if no hit or a PickingInfo array
     */
    multiIntersects(ray: Ray, camera: Camera, predicate?: (sprite: Sprite) => boolean): Nullable<PickingInfo[]>;
    /**
     * Renders the list of sprites on screen.
     */
    render(): void;
    /**
     * Rebuilds the manager (after a context lost, for eg)
     */
    rebuild(): void;
}
/**
 * Class used to manage multiple sprites on the same spritesheet
 * @see https://doc.babylonjs.com/features/featuresDeepDive/sprites
 */
export declare class SpriteManager implements ISpriteManager {
    /** defines the manager's name */
    name: string;
    /** Define the Url to load snippets */
    static SnippetUrl: string;
    /** Snippet ID if the manager was created from the snippet server */
    snippetId: string;
    /** Gets the list of sprites */
    sprites: Sprite[];
    /** Gets or sets the rendering group id (0 by default) */
    renderingGroupId: number;
    /** Gets or sets camera layer mask */
    layerMask: number;
    /** Gets or sets a boolean indicating if the sprites are pickable */
    isPickable: boolean;
    /**
     * Gets or sets an object used to store user defined information for the sprite manager
     */
    metadata: any;
    /** @internal */
    _wasDispatched: boolean;
    /**
     * An event triggered when the manager is disposed.
     */
    onDisposeObservable: Observable<SpriteManager>;
    /**
     * Callback called when the manager is disposed
     */
    set onDispose(callback: () => void);
    /**
     * Gets or sets the unique id of the sprite
     */
    uniqueId: number;
    /**
     * Gets the array of sprites
     */
    get children(): Sprite[];
    /**
     * Gets the hosting scene
     */
    get scene(): Scene;
    /**
     * Gets the capacity of the manager
     */
    get capacity(): number;
    /**
     * Gets or sets the spritesheet texture
     */
    get texture(): Texture;
    set texture(value: Texture);
    /** Defines the default width of a cell in the spritesheet */
    get cellWidth(): number;
    set cellWidth(value: number);
    /** Defines the default height of a cell in the spritesheet */
    get cellHeight(): number;
    set cellHeight(value: number);
    /** Gets or sets a boolean indicating if the manager must consider scene fog when rendering */
    get fogEnabled(): boolean;
    set fogEnabled(value: boolean);
    /**
     * Blend mode use to render the particle, it can be any of
     * the static Constants.ALPHA_x properties provided in this class.
     * Default value is Constants.ALPHA_COMBINE
     */
    get blendMode(): number;
    set blendMode(blendMode: number);
    private _disableDepthWrite;
    /** Disables writing to the depth buffer when rendering the sprites.
     *  It can be handy to disable depth writing when using textures without alpha channel
     *  and setting some specific blend modes.
     */
    get disableDepthWrite(): boolean;
    set disableDepthWrite(value: boolean);
    /**
     * Gets or sets a boolean indicating if the renderer must render sprites with pixel perfect rendering
     * In this mode, sprites are rendered as "pixel art", which means that they appear as pixelated but remain stable when moving or when rotated or scaled.
     * Note that for this mode to work as expected, the sprite texture must use the BILINEAR sampling mode, not NEAREST!
     */
    get pixelPerfect(): boolean;
    set pixelPerfect(value: boolean);
    private _spriteRenderer;
    /** Associative array from JSON sprite data file */
    private _cellData;
    /** Array of sprite names from JSON sprite data file */
    private _spriteMap;
    /** True when packed cell data from JSON file is ready*/
    private _packedAndReady;
    private _textureContent;
    private _onDisposeObserver;
    private _fromPacked;
    private _scene;
    /**
     * Creates a new sprite manager
     * @param name defines the manager's name
     * @param imgUrl defines the sprite sheet url
     * @param capacity defines the maximum allowed number of sprites
     * @param cellSize defines the size of a sprite cell
     * @param scene defines the hosting scene
     * @param epsilon defines the epsilon value to align texture (0.01 by default)
     * @param samplingMode defines the sampling mode to use with spritesheet
     * @param fromPacked set to false; do not alter
     * @param spriteJSON null otherwise a JSON object defining sprite sheet data; do not alter
     */
    constructor(
    /** defines the manager's name */
    name: string, imgUrl: string, capacity: number, cellSize: any, scene: Scene, epsilon?: number, samplingMode?: number, fromPacked?: boolean, spriteJSON?: any | null);
    /**
     * Returns the string "SpriteManager"
     * @returns "SpriteManager"
     */
    getClassName(): string;
    private _makePacked;
    private _checkTextureAlpha;
    /**
     * Intersects the sprites with a ray
     * @param ray defines the ray to intersect with
     * @param camera defines the current active camera
     * @param predicate defines a predicate used to select candidate sprites
     * @param fastCheck defines if a fast check only must be done (the first potential sprite is will be used and not the closer)
     * @returns null if no hit or a PickingInfo
     */
    intersects(ray: Ray, camera: Camera, predicate?: (sprite: Sprite) => boolean, fastCheck?: boolean): Nullable<PickingInfo>;
    /**
     * Intersects the sprites with a ray
     * @param ray defines the ray to intersect with
     * @param camera defines the current active camera
     * @param predicate defines a predicate used to select candidate sprites
     * @returns null if no hit or a PickingInfo array
     */
    multiIntersects(ray: Ray, camera: Camera, predicate?: (sprite: Sprite) => boolean): Nullable<PickingInfo[]>;
    /**
     * Render all child sprites
     */
    render(): void;
    private _customUpdate;
    /**
     * Rebuilds the manager (after a context lost, for eg)
     */
    rebuild(): void;
    /**
     * Release associated resources
     */
    dispose(): void;
    /**
     * Serializes the sprite manager to a JSON object
     * @param serializeTexture defines if the texture must be serialized as well
     * @returns the JSON object
     */
    serialize(serializeTexture?: boolean): any;
    /**
     * Parses a JSON object to create a new sprite manager.
     * @param parsedManager The JSON object to parse
     * @param scene The scene to create the sprite manager
     * @param rootUrl The root url to use to load external dependencies like texture
     * @returns the new sprite manager
     */
    static Parse(parsedManager: any, scene: Scene, rootUrl: string): SpriteManager;
    /**
     * Creates a sprite manager from a snippet saved in a remote file
     * @param name defines the name of the sprite manager to create (can be null or empty to use the one from the json data)
     * @param url defines the url to load from
     * @param scene defines the hosting scene
     * @param rootUrl defines the root URL to use to load textures and relative dependencies
     * @returns a promise that will resolve to the new sprite manager
     */
    static ParseFromFileAsync(name: Nullable<string>, url: string, scene: Scene, rootUrl?: string): Promise<SpriteManager>;
    /**
     * Creates a sprite manager from a snippet saved by the sprite editor
     * @param snippetId defines the snippet to load (can be set to _BLANK to create a default one)
     * @param scene defines the hosting scene
     * @param rootUrl defines the root URL to use to load textures and relative dependencies
     * @returns a promise that will resolve to the new sprite manager
     */
    static ParseFromSnippetAsync(snippetId: string, scene: Scene, rootUrl?: string): Promise<SpriteManager>;
    /**
     * Creates a sprite manager from a snippet saved by the sprite editor
     * @deprecated Please use ParseFromSnippetAsync instead
     * @param snippetId defines the snippet to load (can be set to _BLANK to create a default one)
     * @param scene defines the hosting scene
     * @param rootUrl defines the root URL to use to load textures and relative dependencies
     * @returns a promise that will resolve to the new sprite manager
     */
    static CreateFromSnippetAsync: typeof SpriteManager.ParseFromSnippetAsync;
}
