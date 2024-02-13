import type { Nullable } from "@babylonjs/core/types.js";
import type { AnimationGroup } from "@babylonjs/core/Animations/animationGroup.js";
import type { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import type { IScene, INode, IAnimation } from "../glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
/**
 * [Specification](https://github.com/najadojo/glTF/blob/MSFT_audio_emitter/extensions/2.0/Vendor/MSFT_audio_emitter/README.md)
 * !!! Experimental Extension Subject to Changes !!!
 */
export declare class MSFT_audio_emitter implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "MSFT_audio_emitter";
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    private _clips;
    private _emitters;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /** @internal */
    onLoading(): void;
    /**
     * @internal
     */
    loadSceneAsync(context: string, scene: IScene): Nullable<Promise<void>>;
    /**
     * @internal
     */
    loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
    /**
     * @internal
     */
    loadAnimationAsync(context: string, animation: IAnimation): Nullable<Promise<AnimationGroup>>;
    private _loadClipAsync;
    private _loadEmitterAsync;
    private _getEventAction;
    private _loadAnimationEventAsync;
}
