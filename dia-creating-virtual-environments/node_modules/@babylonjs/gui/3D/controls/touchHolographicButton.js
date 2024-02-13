import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { CreatePlane } from "@babylonjs/core/Meshes/Builders/planeBuilder.js";
import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder.js";
import { FadeInOutBehavior } from "@babylonjs/core/Behaviors/Meshes/fadeInOutBehavior.js";
import { FluentMaterial } from "../materials/fluent/fluentMaterial.js";
import { FluentButtonMaterial } from "../materials/fluentButton/fluentButtonMaterial.js";
import { StackPanel } from "../../2D/controls/stackPanel.js";
import { Image } from "../../2D/controls/image.js";
import { TextBlock } from "../../2D/controls/textBlock.js";
import { AdvancedDynamicTexture } from "../../2D/advancedDynamicTexture.js";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
import { TouchButton3D } from "./touchButton3D.js";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader.js";
import { IsDocumentAvailable } from "@babylonjs/core/Misc/domManagement.js";
import { Scalar } from "@babylonjs/core/Maths/math.scalar.js";
/**
 * Class used to create a holographic button in 3D
 * @since 5.0.0
 */
export class TouchHolographicButton extends TouchButton3D {
    _disposeTooltip() {
        this._tooltipFade = null;
        if (this._tooltipTextBlock) {
            this._tooltipTextBlock.dispose();
        }
        if (this._tooltipTexture) {
            this._tooltipTexture.dispose();
        }
        if (this._tooltipMesh) {
            this._tooltipMesh.dispose();
        }
        this.onPointerEnterObservable.remove(this._tooltipHoverObserver);
        this.onPointerOutObservable.remove(this._tooltipOutObserver);
    }
    /**
     * Rendering ground id of all the mesh in the button
     */
    set renderingGroupId(id) {
        this._backPlate.renderingGroupId = id;
        this._textPlate.renderingGroupId = id;
        this._frontPlate.renderingGroupId = id;
        if (this._tooltipMesh) {
            this._tooltipMesh.renderingGroupId = id;
        }
    }
    get renderingGroupId() {
        return this._backPlate.renderingGroupId;
    }
    /**
     * Gets the mesh used to render this control
     */
    get mesh() {
        return this._backPlate;
    }
    /**
     * Text to be displayed on the tooltip shown when hovering on the button. When set to null tooltip is disabled. (Default: null)
     */
    set tooltipText(text) {
        if (!text) {
            this._disposeTooltip();
            return;
        }
        if (!this._tooltipFade) {
            const rightHandedScene = this._backPlate._scene.useRightHandedSystem;
            // Create tooltip with mesh and text
            this._tooltipMesh = CreatePlane("", { size: 1 }, this._backPlate._scene);
            const tooltipBackground = CreatePlane("", { size: 1, sideOrientation: Mesh.DOUBLESIDE }, this._backPlate._scene);
            const mat = new StandardMaterial("", this._backPlate._scene);
            mat.diffuseColor = Color3.FromHexString("#212121");
            tooltipBackground.material = mat;
            tooltipBackground.isPickable = false;
            this._tooltipMesh.addChild(tooltipBackground);
            tooltipBackground.position = Vector3.Forward(rightHandedScene).scale(0.05);
            this._tooltipMesh.scaling.y = 1 / 3;
            this._tooltipMesh.position = Vector3.Up().scale(0.7).add(Vector3.Forward(rightHandedScene).scale(-0.15));
            this._tooltipMesh.isPickable = false;
            this._tooltipMesh.parent = this._backPlate;
            // Create text texture for the tooltip
            this._tooltipTexture = AdvancedDynamicTexture.CreateForMesh(this._tooltipMesh);
            this._tooltipTextBlock = new TextBlock();
            this._tooltipTextBlock.scaleY = 3;
            this._tooltipTextBlock.color = "white";
            this._tooltipTextBlock.fontSize = 130;
            this._tooltipTexture.addControl(this._tooltipTextBlock);
            // Add hover action to tooltip
            this._tooltipFade = new FadeInOutBehavior();
            this._tooltipFade.delay = 500;
            this._tooltipMesh.addBehavior(this._tooltipFade);
            this._tooltipHoverObserver = this.onPointerEnterObservable.add(() => {
                if (this._tooltipFade) {
                    this._tooltipFade.fadeIn(true);
                }
            });
            this._tooltipOutObserver = this.onPointerOutObservable.add(() => {
                if (this._tooltipFade) {
                    this._tooltipFade.fadeIn(false);
                }
            });
        }
        if (this._tooltipTextBlock) {
            this._tooltipTextBlock.text = text;
        }
    }
    get tooltipText() {
        if (this._tooltipTextBlock) {
            return this._tooltipTextBlock.text;
        }
        return null;
    }
    /**
     * Gets or sets text for the button
     */
    get text() {
        return this._text;
    }
    set text(value) {
        if (this._text === value) {
            return;
        }
        this._text = value;
        this._rebuildContent();
    }
    /**
     * Gets or sets the image url for the button
     */
    get imageUrl() {
        return this._imageUrl;
    }
    set imageUrl(value) {
        if (this._imageUrl === value) {
            return;
        }
        this._imageUrl = value;
        this._rebuildContent();
    }
    /**
     * Gets the back material used by this button
     */
    get backMaterial() {
        return this._backMaterial;
    }
    /**
     * Gets the front material used by this button
     */
    get frontMaterial() {
        return this._frontMaterial;
    }
    /**
     * Gets the plate material used by this button
     */
    get plateMaterial() {
        return this._plateMaterial;
    }
    /**
     * Gets a boolean indicating if this button shares its material with other HolographicButtons
     */
    get shareMaterials() {
        return this._shareMaterials;
    }
    /**
     * Sets whether the backplate is visible or hidden. Hiding the backplate is not recommended without some sort of replacement
     */
    set isBackplateVisible(isVisible) {
        if (this.mesh && !!this._backMaterial) {
            if (isVisible && !this._isBackplateVisible) {
                this._backPlate.visibility = 1;
            }
            else if (!isVisible && this._isBackplateVisible) {
                this._backPlate.visibility = 0;
            }
        }
        this._isBackplateVisible = isVisible;
    }
    /**
     * Creates a new button
     * @param name defines the control name
     * @param shareMaterials
     */
    constructor(name, shareMaterials = true) {
        super(name);
        this._shareMaterials = true;
        this._isBackplateVisible = true;
        this._frontPlateDepth = 0.5;
        this._backPlateDepth = 0.04;
        this._backplateColor = new Color3(0.08, 0.15, 0.55);
        this._backplateToggledColor = new Color3(0.25, 0.4, 0.95);
        this._shareMaterials = shareMaterials;
        this.pointerEnterAnimation = () => {
            this._frontMaterial.leftBlobEnable = true;
            this._frontMaterial.rightBlobEnable = true;
        };
        this.pointerOutAnimation = () => {
            this._frontMaterial.leftBlobEnable = false;
            this._frontMaterial.rightBlobEnable = false;
        };
        this.pointerDownAnimation = () => {
            if (this._frontPlate && !this.isActiveNearInteraction) {
                this._frontPlate.scaling.z = this._frontPlateDepth * 0.2;
                this._frontPlate.position = Vector3.Forward(this._frontPlate._scene.useRightHandedSystem).scale((this._frontPlateDepth - 0.2 * this._frontPlateDepth) / 2);
                this._textPlate.position = Vector3.Forward(this._textPlate._scene.useRightHandedSystem).scale(-(this._backPlateDepth + 0.2 * this._frontPlateDepth) / 2);
            }
        };
        this.pointerUpAnimation = () => {
            if (this._frontPlate) {
                this._frontPlate.scaling.z = this._frontPlateDepth;
                this._frontPlate.position = Vector3.Forward(this._frontPlate._scene.useRightHandedSystem).scale((this._frontPlateDepth - this._frontPlateDepth) / 2);
                this._textPlate.position = Vector3.Forward(this._textPlate._scene.useRightHandedSystem).scale(-(this._backPlateDepth + this._frontPlateDepth) / 2);
            }
        };
        this.onPointerMoveObservable.add((position) => {
            if (this._frontPlate && this.isActiveNearInteraction) {
                const scale = Vector3.Zero();
                if (this._backPlate.getWorldMatrix().decompose(scale, undefined, undefined)) {
                    let interactionHeight = this._getInteractionHeight(position, this._backPlate.getAbsolutePosition()) / scale.z;
                    interactionHeight = Scalar.Clamp(interactionHeight - this._backPlateDepth / 2, 0.2 * this._frontPlateDepth, this._frontPlateDepth);
                    this._frontPlate.scaling.z = interactionHeight;
                    this._frontPlate.position = Vector3.Forward(this._frontPlate._scene.useRightHandedSystem).scale((this._frontPlateDepth - interactionHeight) / 2);
                    this._textPlate.position = Vector3.Forward(this._textPlate._scene.useRightHandedSystem).scale(-(this._backPlateDepth + interactionHeight) / 2);
                }
            }
        });
        this._pointerHoverObserver = this.onPointerMoveObservable.add((hoverPosition) => {
            this._frontMaterial.globalLeftIndexTipPosition = hoverPosition;
        });
    }
    _getTypeName() {
        return "TouchHolographicButton";
    }
    _rebuildContent() {
        this._disposeFacadeTexture();
        const panel = new StackPanel();
        panel.isVertical = true;
        if (IsDocumentAvailable() && !!document.createElement) {
            if (this._imageUrl) {
                const image = new Image();
                image.source = this._imageUrl;
                image.paddingTop = "40px";
                image.height = "180px";
                image.width = "100px";
                image.paddingBottom = "40px";
                panel.addControl(image);
            }
        }
        if (this._text) {
            const text = new TextBlock();
            text.text = this._text;
            text.color = "white";
            text.height = "30px";
            text.fontSize = 24;
            panel.addControl(text);
        }
        this.content = panel;
    }
    // Mesh association
    _createNode(scene) {
        this.name = this.name ?? "TouchHolographicButton";
        const collisionMesh = CreateBox(`${this.name}_collisionMesh`, {
            width: 1.0,
            height: 1.0,
            depth: this._frontPlateDepth,
        }, scene);
        collisionMesh.isPickable = true;
        collisionMesh.isNearPickable = true;
        collisionMesh.visibility = 0;
        collisionMesh.position = Vector3.Forward(scene.useRightHandedSystem).scale(-this._frontPlateDepth / 2);
        SceneLoader.ImportMeshAsync(undefined, TouchHolographicButton.MODEL_BASE_URL, TouchHolographicButton.MODEL_FILENAME, scene).then((result) => {
            const alphaMesh = CreateBox("${this.name}_alphaMesh", {
                width: 1.0,
                height: 1.0,
                depth: 1.0,
            }, scene);
            alphaMesh.isPickable = false;
            alphaMesh.material = new StandardMaterial("${this.name}_alphaMesh_material", scene);
            alphaMesh.material.alpha = 0.15;
            const importedFrontPlate = result.meshes[1];
            importedFrontPlate.name = `${this.name}_frontPlate`;
            importedFrontPlate.isPickable = false;
            importedFrontPlate.scaling.z = this._frontPlateDepth;
            alphaMesh.parent = importedFrontPlate;
            importedFrontPlate.parent = collisionMesh;
            if (this._frontMaterial) {
                importedFrontPlate.material = this._frontMaterial;
            }
            this._frontPlate = importedFrontPlate;
        });
        this._backPlate = CreateBox(`${this.name}_backPlate`, {
            width: 1.0,
            height: 1.0,
            depth: this._backPlateDepth,
        }, scene);
        this._backPlate.position = Vector3.Forward(scene.useRightHandedSystem).scale(this._backPlateDepth / 2);
        this._backPlate.isPickable = false;
        this._textPlate = super._createNode(scene);
        this._textPlate.name = `${this.name}_textPlate`;
        this._textPlate.isPickable = false;
        this._textPlate.position = Vector3.Forward(scene.useRightHandedSystem).scale(-this._frontPlateDepth / 2);
        this._backPlate.addChild(collisionMesh);
        this._backPlate.addChild(this._textPlate);
        const tn = new TransformNode(`{this.name}_root`, scene);
        this._backPlate.setParent(tn);
        this.collisionMesh = collisionMesh;
        this.collidableFrontDirection = this._backPlate.forward.negate(); // Mesh is facing the wrong way
        return tn;
    }
    _applyFacade(facadeTexture) {
        this._plateMaterial.emissiveTexture = facadeTexture;
        this._plateMaterial.opacityTexture = facadeTexture;
        this._plateMaterial.diffuseColor = new Color3(0.4, 0.4, 0.4);
    }
    _createBackMaterial(mesh) {
        this._backMaterial = new FluentMaterial(this.name + "backPlateMaterial", mesh.getScene());
        this._backMaterial.albedoColor = this._backplateColor;
        this._backMaterial.renderBorders = true;
        this._backMaterial.renderHoverLight = false;
    }
    _createFrontMaterial(mesh) {
        this._frontMaterial = new FluentButtonMaterial(this.name + "Front Material", mesh.getScene());
    }
    _createPlateMaterial(mesh) {
        this._plateMaterial = new StandardMaterial(this.name + "Plate Material", mesh.getScene());
        this._plateMaterial.specularColor = Color3.Black();
    }
    _onToggle(newState) {
        if (this._backMaterial) {
            if (newState) {
                this._backMaterial.albedoColor = this._backplateToggledColor;
            }
            else {
                this._backMaterial.albedoColor = this._backplateColor;
            }
        }
        super._onToggle(newState);
    }
    _affectMaterial(mesh) {
        if (this._shareMaterials) {
            // Back
            if (!this._host._touchSharedMaterials["backFluentMaterial"]) {
                this._createBackMaterial(mesh);
                this._host._touchSharedMaterials["backFluentMaterial"] = this._backMaterial;
            }
            else {
                this._backMaterial = this._host._touchSharedMaterials["backFluentMaterial"];
            }
            // Front
            if (!this._host._touchSharedMaterials["frontFluentMaterial"]) {
                this._createFrontMaterial(mesh);
                this._host._touchSharedMaterials["frontFluentMaterial"] = this._frontMaterial;
            }
            else {
                this._frontMaterial = this._host._touchSharedMaterials["frontFluentMaterial"];
            }
        }
        else {
            this._createBackMaterial(mesh);
            this._createFrontMaterial(mesh);
        }
        this._createPlateMaterial(mesh);
        this._backPlate.material = this._backMaterial;
        this._textPlate.material = this._plateMaterial;
        if (!this._isBackplateVisible) {
            this._backPlate.visibility = 0;
        }
        if (this._frontPlate) {
            this._frontPlate.material = this._frontMaterial;
        }
        this._rebuildContent();
    }
    /**
     * Releases all associated resources
     */
    dispose() {
        super.dispose(); // will dispose main mesh ie. back plate
        this._disposeTooltip();
        this.onPointerMoveObservable.remove(this._pointerHoverObserver);
        if (!this.shareMaterials) {
            this._backMaterial.dispose();
            this._frontMaterial.dispose();
            this._plateMaterial.dispose();
            if (this._pickedPointObserver) {
                this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver);
                this._pickedPointObserver = null;
            }
        }
    }
}
/**
 * Base Url for the button model.
 */
TouchHolographicButton.MODEL_BASE_URL = "https://assets.babylonjs.com/meshes/MRTK/";
/**
 * File name for the button model.
 */
TouchHolographicButton.MODEL_FILENAME = "mrtk-fluent-button.glb";
//# sourceMappingURL=touchHolographicButton.js.map