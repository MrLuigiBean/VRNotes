import type { Scene } from "../scene";
import { TransformNode } from "../Meshes/transformNode";
import { Mesh } from "../Meshes/mesh";
import { Texture } from "../Materials/Textures/texture";
import { BackgroundMaterial } from "../Materials/Background/backgroundMaterial";
import type { Nullable } from "../types";
import { Observable } from "../Misc/observable";
/**
 * Display a 360/180 degree texture on an approximately spherical surface, useful for VR applications or skyboxes.
 * As a subclass of TransformNode, this allow parenting to the camera or multiple textures with different locations in the scene.
 * This class achieves its effect with a Texture and a correctly configured BackgroundMaterial on an inverted sphere.
 * Potential additions to this helper include zoom and and non-infinite distance rendering effects.
 */
export declare abstract class TextureDome<T extends Texture> extends TransformNode {
    protected onError: Nullable<(message?: string, exception?: any) => void>;
    /**
     * Define the source as a Monoscopic panoramic 360/180.
     */
    static readonly MODE_MONOSCOPIC = 0;
    /**
     * Define the source as a Stereoscopic TopBottom/OverUnder panoramic 360/180.
     */
    static readonly MODE_TOPBOTTOM = 1;
    /**
     * Define the source as a Stereoscopic Side by Side panoramic 360/180.
     */
    static readonly MODE_SIDEBYSIDE = 2;
    private _halfDome;
    private _crossEye;
    protected _useDirectMapping: boolean;
    /**
     * The texture being displayed on the sphere
     */
    protected _texture: T;
    /**
     * Gets the texture being displayed on the sphere
     */
    get texture(): T;
    /**
     * Sets the texture being displayed on the sphere
     */
    set texture(newTexture: T);
    /**
     * The skybox material
     */
    protected _material: BackgroundMaterial;
    /**
     * The surface used for the dome
     */
    protected _mesh: Mesh;
    /**
     * Gets the mesh used for the dome.
     */
    get mesh(): Mesh;
    /**
     * A mesh that will be used to mask the back of the dome in case it is a 180 degree movie.
     */
    private _halfDomeMask;
    /**
     * The current fov(field of view) multiplier, 0.0 - 2.0. Defaults to 1.0. Lower values "zoom in" and higher values "zoom out".
     * Also see the options.resolution property.
     */
    get fovMultiplier(): number;
    set fovMultiplier(value: number);
    protected _textureMode: number;
    /**
     * Gets or set the current texture mode for the texture. It can be:
     * * TextureDome.MODE_MONOSCOPIC : Define the texture source as a Monoscopic panoramic 360.
     * * TextureDome.MODE_TOPBOTTOM  : Define the texture source as a Stereoscopic TopBottom/OverUnder panoramic 360.
     * * TextureDome.MODE_SIDEBYSIDE : Define the texture source as a Stereoscopic Side by Side panoramic 360.
     */
    get textureMode(): number;
    /**
     * Sets the current texture mode for the texture. It can be:
     * * TextureDome.MODE_MONOSCOPIC : Define the texture source as a Monoscopic panoramic 360.
     * * TextureDome.MODE_TOPBOTTOM  : Define the texture source as a Stereoscopic TopBottom/OverUnder panoramic 360.
     * * TextureDome.MODE_SIDEBYSIDE : Define the texture source as a Stereoscopic Side by Side panoramic 360.
     */
    set textureMode(value: number);
    /**
     * Is it a 180 degrees dome (half dome) or 360 texture (full dome)
     */
    get halfDome(): boolean;
    /**
     * Set the halfDome mode. If set, only the front (180 degrees) will be displayed and the back will be blacked out.
     */
    set halfDome(enabled: boolean);
    /**
     * Set the cross-eye mode. If set, images that can be seen when crossing eyes will render correctly
     */
    set crossEye(enabled: boolean);
    /**
     * Is it a cross-eye texture?
     */
    get crossEye(): boolean;
    /**
     * The background material of this dome.
     */
    get material(): BackgroundMaterial;
    /**
     * Oberserver used in Stereoscopic VR Mode.
     */
    private _onBeforeCameraRenderObserver;
    /**
     * Observable raised when an error occurred while loading the texture
     */
    onLoadErrorObservable: Observable<string>;
    /**
     * Observable raised when the texture finished loading
     */
    onLoadObservable: Observable<void>;
    /**
     * Create an instance of this class and pass through the parameters to the relevant classes- Texture, StandardMaterial, and Mesh.
     * @param name Element's name, child elements will append suffixes for their own names.
     * @param textureUrlOrElement defines the url(s) or the (video) HTML element to use
     * @param options An object containing optional or exposed sub element properties
     * @param options.resolution
     * @param options.clickToPlay
     * @param options.autoPlay
     * @param options.loop
     * @param options.size
     * @param options.poster
     * @param options.faceForward
     * @param options.useDirectMapping
     * @param options.halfDomeMode
     * @param options.crossEyeMode
     * @param options.generateMipMaps
     * @param options.mesh
     * @param scene
     * @param onError
     */
    constructor(name: string, textureUrlOrElement: string | string[] | HTMLVideoElement, options: {
        resolution?: number;
        clickToPlay?: boolean;
        autoPlay?: boolean;
        loop?: boolean;
        size?: number;
        poster?: string;
        faceForward?: boolean;
        useDirectMapping?: boolean;
        halfDomeMode?: boolean;
        crossEyeMode?: boolean;
        generateMipMaps?: boolean;
        mesh?: Mesh;
    }, scene: Scene, onError?: Nullable<(message?: string, exception?: any) => void>);
    protected abstract _initTexture(urlsOrElement: string | string[] | HTMLElement, scene: Scene, options: any): T;
    protected _changeTextureMode(value: number): void;
    /**
     * Releases resources associated with this node.
     * @param doNotRecurse Set to true to not recurse into each children (recurse into each children by default)
     * @param disposeMaterialAndTextures Set to true to also dispose referenced materials and textures (false by default)
     */
    dispose(doNotRecurse?: boolean, disposeMaterialAndTextures?: boolean): void;
}
