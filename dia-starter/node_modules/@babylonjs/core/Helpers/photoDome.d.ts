import type { Scene } from "../scene";
import { Texture } from "../Materials/Textures/texture";
import { TextureDome } from "./textureDome";
/**
 * Display a 360 degree photo on an approximately spherical surface, useful for VR applications or skyboxes.
 * As a subclass of TransformNode, this allow parenting to the camera with different locations in the scene.
 * This class achieves its effect with a Texture and a correctly configured BackgroundMaterial on an inverted sphere.
 * Potential additions to this helper include zoom and and non-infinite distance rendering effects.
 */
export declare class PhotoDome extends TextureDome<Texture> {
    /**
     * Define the image as a Monoscopic panoramic 360 image.
     */
    static readonly MODE_MONOSCOPIC = 0;
    /**
     * Define the image as a Stereoscopic TopBottom/OverUnder panoramic 360 image.
     */
    static readonly MODE_TOPBOTTOM = 1;
    /**
     * Define the image as a Stereoscopic Side by Side panoramic 360 image.
     */
    static readonly MODE_SIDEBYSIDE = 2;
    /**
     * Gets or sets the texture being displayed on the sphere
     */
    get photoTexture(): Texture;
    /**
     * sets the texture being displayed on the sphere
     */
    set photoTexture(value: Texture);
    /**
     * Gets the current video mode for the video. It can be:
     * * TextureDome.MODE_MONOSCOPIC : Define the texture source as a Monoscopic panoramic 360.
     * * TextureDome.MODE_TOPBOTTOM  : Define the texture source as a Stereoscopic TopBottom/OverUnder panoramic 360.
     * * TextureDome.MODE_SIDEBYSIDE : Define the texture source as a Stereoscopic Side by Side panoramic 360.
     */
    get imageMode(): number;
    /**
     * Sets the current video mode for the video. It can be:
     * * TextureDome.MODE_MONOSCOPIC : Define the texture source as a Monoscopic panoramic 360.
     * * TextureDome.MODE_TOPBOTTOM  : Define the texture source as a Stereoscopic TopBottom/OverUnder panoramic 360.
     * * TextureDome.MODE_SIDEBYSIDE : Define the texture source as a Stereoscopic Side by Side panoramic 360.
     */
    set imageMode(value: number);
    protected _initTexture(urlsOrElement: string, scene: Scene, options: any): Texture;
}
