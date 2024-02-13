import type { Nullable } from "../types";
import type { IMatrixLike } from "../Maths/math.like";
import type { ThinEngine } from "../Engines/thinEngine";
import type { ThinSprite } from "./thinSprite";
import type { ISize } from "../Maths/math.size";
import type { ThinTexture } from "../Materials/Textures/thinTexture";
import type { Scene } from "../scene";
import "../Engines/Extensions/engine.alpha";
import "../Engines/Extensions/engine.dynamicBuffer";
import "../Shaders/sprites.fragment";
import "../Shaders/sprites.vertex";
/**
 * Class used to render sprites.
 *
 * It can be used either to render Sprites or ThinSprites with ThinEngine only.
 */
export declare class SpriteRenderer {
    /**
     * Defines the texture of the spritesheet
     */
    texture: Nullable<ThinTexture>;
    /**
     * Defines the default width of a cell in the spritesheet
     */
    cellWidth: number;
    /**
     * Defines the default height of a cell in the spritesheet
     */
    cellHeight: number;
    /**
     * Blend mode use to render the particle, it can be any of
     * the static Constants.ALPHA_x properties provided in this class.
     * Default value is Constants.ALPHA_COMBINE
     */
    blendMode: number;
    /**
     * Gets or sets a boolean indicating if alpha mode is automatically
     * reset.
     */
    autoResetAlpha: boolean;
    /**
     * Disables writing to the depth buffer when rendering the sprites.
     * It can be handy to disable depth writing when using textures without alpha channel
     * and setting some specific blend modes.
     */
    disableDepthWrite: boolean;
    /**
     * Gets or sets a boolean indicating if the manager must consider scene fog when rendering
     */
    fogEnabled: boolean;
    /**
     * Gets the capacity of the manager
     */
    get capacity(): number;
    private _pixelPerfect;
    /**
     * Gets or sets a boolean indicating if the renderer must render sprites with pixel perfect rendering
     * Note that pixel perfect mode is not supported in WebGL 1
     */
    get pixelPerfect(): boolean;
    set pixelPerfect(value: boolean);
    private readonly _engine;
    private readonly _useVAO;
    private readonly _useInstancing;
    private readonly _scene;
    private readonly _capacity;
    private readonly _epsilon;
    private _vertexBufferSize;
    private _vertexData;
    private _buffer;
    private _vertexBuffers;
    private _spriteBuffer;
    private _indexBuffer;
    private _drawWrapperBase;
    private _drawWrapperFog;
    private _drawWrapperDepth;
    private _drawWrapperFogDepth;
    private _vertexArrayObject;
    /**
     * Creates a new sprite Renderer
     * @param engine defines the engine the renderer works with
     * @param capacity defines the maximum allowed number of sprites
     * @param epsilon defines the epsilon value to align texture (0.01 by default)
     * @param scene defines the hosting scene
     */
    constructor(engine: ThinEngine, capacity: number, epsilon?: number, scene?: Nullable<Scene>);
    private _createEffects;
    /**
     * Render all child sprites
     * @param sprites defines the list of sprites to render
     * @param deltaTime defines the time since last frame
     * @param viewMatrix defines the viewMatrix to use to render the sprites
     * @param projectionMatrix defines the projectionMatrix to use to render the sprites
     * @param customSpriteUpdate defines a custom function to update the sprites data before they render
     */
    render(sprites: ThinSprite[], deltaTime: number, viewMatrix: IMatrixLike, projectionMatrix: IMatrixLike, customSpriteUpdate?: Nullable<(sprite: ThinSprite, baseSize: ISize) => void>): void;
    private _appendSpriteVertex;
    private _buildIndexBuffer;
    /**
     * Rebuilds the renderer (after a context lost, for eg)
     */
    rebuild(): void;
    /**
     * Release associated resources
     */
    dispose(): void;
}
