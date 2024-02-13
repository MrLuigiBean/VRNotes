import type { Scene } from "@babylonjs/core/scene.js";
import type { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import type { Nullable } from "@babylonjs/core/types.js";
import { DefaultBehavior } from "../behaviors/defaultBehavior";
import { TouchHolographicMenu } from "./touchHolographicMenu";
/**
 * NearMenu that displays buttons and follows the camera
 * @since 5.0.0
 */
export declare class NearMenu extends TouchHolographicMenu {
    /**
     * Base Url for the assets.
     */
    private static _ASSETS_BASE_URL;
    /**
     * File name for the close icon.
     */
    private static _PIN_ICON_FILENAME;
    private _pinButton;
    private _dragObserver;
    private _defaultBehavior;
    /**
     * Regroups all mesh behaviors for the near menu
     */
    get defaultBehavior(): DefaultBehavior;
    private _isPinned;
    /**
     * Indicates if the near menu is world-pinned
     */
    get isPinned(): boolean;
    set isPinned(value: boolean);
    private _createPinButton;
    protected _createNode(scene: Scene): Nullable<TransformNode>;
    protected _finalProcessing(): void;
    /**
     * Creates a near menu GUI 3D control
     * @param name name of the near menu
     */
    constructor(name?: string);
    /**
     * Disposes the near menu
     */
    dispose(): void;
}
