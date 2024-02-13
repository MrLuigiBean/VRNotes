import { AdvancedDynamicTexture } from "../../../2D/advancedDynamicTexture.js";
import { Animation } from "@babylonjs/core/Animations/animation.js";
import { AnimationGroup } from "@babylonjs/core/Animations/animationGroup.js";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color.js";
import { Control } from "../../../2D/controls/control.js";
import { CreatePlane } from "@babylonjs/core/Meshes/Builders/planeBuilder.js";
import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder.js";
import { IsDocumentAvailable } from "@babylonjs/core/Misc/domManagement.js";
import { FadeInOutBehavior } from "@babylonjs/core/Behaviors/Meshes/fadeInOutBehavior.js";
import { Grid } from "../../../2D/controls/grid.js";
import { Image } from "../../../2D/controls/image.js";
import { MRDLBackglowMaterial } from "../../materials/mrdl/mrdlBackglowMaterial.js";
import { MRDLBackplateMaterial } from "../../materials/mrdl/mrdlBackplateMaterial.js";
import { MRDLFrontplateMaterial } from "../../materials/mrdl/mrdlFrontplateMaterial.js";
import { MRDLInnerquadMaterial } from "../../materials/mrdl/mrdlInnerquadMaterial.js";
import { Rectangle } from "../../../2D/controls/rectangle.js";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader.js";
import { StackPanel } from "../../../2D/controls/stackPanel.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import { TextBlock } from "../../../2D/controls/textBlock.js";
import { TouchButton3D } from "../touchButton3D.js";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
/**
 * Class used to create the mrtkv3 button
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
        this._backGlow.renderingGroupId = id;
        this._innerQuad.renderingGroupId = id;
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
     * Set this property after adding the button to the GUI3DManager
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
            this._tooltipMesh.position = Vector3.Down().scale(0.7).add(Vector3.Forward(rightHandedScene).scale(-0.15));
            this._tooltipMesh.isPickable = false;
            this._tooltipMesh.parent = this._frontPlateCollisionMesh;
            // Create text texture for the tooltip
            this._tooltipTexture = AdvancedDynamicTexture.CreateForMesh(this._tooltipMesh);
            const tooltipBackground = new Rectangle();
            tooltipBackground.height = 0.25;
            tooltipBackground.width = 0.8;
            tooltipBackground.cornerRadius = 25;
            tooltipBackground.color = "#ffffff";
            tooltipBackground.thickness = 20;
            tooltipBackground.background = "#060668";
            this._tooltipTexture.addControl(tooltipBackground);
            this._tooltipTextBlock = new TextBlock();
            this._tooltipTextBlock.color = "white";
            this._tooltipTextBlock.fontSize = 100;
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
        return this._tooltipTextBlock?.text || null;
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
     * Gets or sets subtext for a button with larger width
     */
    get subtext() {
        return this._subtext;
    }
    set subtext(value) {
        if (this._subtext === value) {
            return;
        }
        this._subtext = value;
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
     * Gets the back glow material used by this button
     */
    get backGlowMaterial() {
        return this._backGlowMaterial;
    }
    /**
     * Gets the inner quad material used by this button
     */
    get innerQuadMaterial() {
        return this._innerQuadMaterial;
    }
    /**
     * Gets the plate material used by this button
     */
    get plateMaterial() {
        return this._plateMaterial;
    }
    /**
     * Gets a boolean indicating if this button shares its material with other V3 Buttons
     */
    get shareMaterials() {
        return this._shareMaterials;
    }
    /**
     * Sets whether the backplate is visible or hidden. Hiding the backplate is not recommended without some sort of replacement
     */
    set isBackplateVisible(isVisible) {
        if (this.mesh && this._backMaterial) {
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
        /**
         * Gets or sets the horizontal scaling for the button.
         */
        this.width = 1;
        /**
         * Gets or sets the vertical scaling for the button.
         */
        this.height = 1;
        /**
         * Gets or sets the bevel radius for the button.
         */
        this.radius = 0.14;
        /**
         * Gets or sets the font size of the button text in pixels.
         * This is only adjustable for a button with width to height ratio greater than 1.
         */
        this.textSizeInPixels = 18;
        /**
         * Gets or sets the size of the button image in pixels.
         * This is only adjustable for a button with width to height ratio greater than 1.
         */
        this.imageSizeInPixels = 40;
        /**
         * Gets or sets the color of the button plate.
         */
        this.plateMaterialColor = new Color3(0.4, 0.4, 0.4);
        // Shared variables for meshes
        /**
         * Gets or sets the depth of the button's front plate.
         * This variable determines the z scaling and z position for some of the button's meshes.
         */
        this.frontPlateDepth = 0.2;
        /**
         * Gets or sets the depth of the button's back plate.
         * This variable determines the z scaling and z position for some of the button's meshes.
         */
        this.backPlateDepth = 0.04;
        /**
         * Gets or sets the offset value for button's back glow.
         * This variable determines the x, y scaling of the button's meshes.
         */
        this.backGlowOffset = 0.1;
        /**
         * Gets or sets the value that determines the z scaling and z position for the innerQuad and BackGlow meshes.
         */
        this.flatPlaneDepth = 0.001;
        /**
         * Gets or sets the radius for FrontMaterial and innerQuadMaterial.
         */
        this.innerQuadRadius = this.radius - 0.04;
        /**
         * Gets or sets the color for innerQuadMaterial.
         */
        this.innerQuadColor = new Color4(0, 0, 0, 0);
        /**
         * Gets or sets the color for innerQuadMaterial for when it is toggled.
         */
        this.innerQuadToggledColor = new Color4(0.5197843, 0.6485234, 0.9607843, 0.6);
        /**
         * Gets or sets the color for innerQuadMaterial for when it is hovered.
         */
        this.innerQuadHoverColor = new Color4(1, 1, 1, 0.05);
        /**
         * Gets or sets the color for innerQuadMaterial for when it is toggled and hovered.
         */
        this.innerQuadToggledHoverColor = new Color4(0.5197843, 0.6485234, 0.9607843, 1);
        this._isBackplateVisible = true;
        // Materials
        this._shareMaterials = true;
        this._shareMaterials = shareMaterials;
        this.pointerEnterAnimation = () => {
            if (this._frontPlate && this._textPlate && !this.isToggleButton) {
                this._performEnterExitAnimation(1);
            }
            if (this.isToggleButton && this._innerQuadMaterial) {
                if (this.isToggled) {
                    this._innerQuadMaterial.color = this.innerQuadToggledHoverColor;
                }
                else {
                    this._innerQuadMaterial.color = this.innerQuadHoverColor;
                }
            }
        };
        this.pointerOutAnimation = () => {
            if (this._frontPlate && this._textPlate && !this.isToggleButton) {
                this._performEnterExitAnimation(-0.8);
            }
            if (this.isToggleButton && this._innerQuadMaterial) {
                this._onToggle(this.isToggled);
            }
        };
        this.pointerDownAnimation = () => {
            // Do nothing
        };
        this.pointerUpAnimation = () => {
            // Do nothing
        };
        this._pointerClickObserver = this.onPointerClickObservable.add(() => {
            if (this._frontPlate && this._backGlow && !this.isActiveNearInteraction) {
                this._performClickAnimation();
            }
            if (this.isToggleButton && this._innerQuadMaterial) {
                this._onToggle(this.isToggled);
            }
        });
        this._pointerEnterObserver = this.onPointerEnterObservable.add(() => {
            this.pointerEnterAnimation();
        });
        this._pointerOutObserver = this.onPointerOutObservable.add(() => {
            this.pointerOutAnimation();
        });
        this._toggleObserver = this.onToggleObservable.add((isToggled) => {
            if (isToggled) {
                this._innerQuadMaterial.color = this.innerQuadToggledColor;
            }
            else {
                this._innerQuadMaterial.color = this.innerQuadColor;
            }
        });
    }
    _getTypeName() {
        return "TouchHolographicButton";
    }
    _rebuildContent() {
        let content;
        if (this._getAspectRatio() <= 1) {
            // align text and image vertically
            content = this._alignContentVertically();
        }
        else {
            // align text and image horizontally
            content = this._alignContentHorizontally();
        }
        this.content = content;
    }
    _getAspectRatio() {
        return this.width / this.height;
    }
    _alignContentVertically() {
        const panel = new StackPanel();
        panel.isVertical = true;
        if (IsDocumentAvailable() && !!document.createElement) {
            if (this._imageUrl) {
                const image = new Image();
                image.source = this._imageUrl;
                image.heightInPixels = 180;
                image.widthInPixels = 100;
                image.paddingTopInPixels = 40;
                image.paddingBottomInPixels = 40;
                panel.addControl(image);
            }
        }
        if (this._text) {
            const text = new TextBlock();
            text.text = this._text;
            text.color = "white";
            text.heightInPixels = 30;
            text.fontSize = 24;
            panel.addControl(text);
        }
        return panel;
    }
    _alignContentHorizontally() {
        let totalPanelWidthInPixels = 240;
        const padding = 15;
        const contentContainer = new Rectangle();
        contentContainer.widthInPixels = totalPanelWidthInPixels;
        contentContainer.heightInPixels = totalPanelWidthInPixels;
        contentContainer.color = "transparent";
        contentContainer.setPaddingInPixels(padding, padding, padding, padding);
        totalPanelWidthInPixels -= padding * 2;
        const panel = new StackPanel();
        panel.isVertical = false;
        panel.scaleY = this._getAspectRatio();
        if (IsDocumentAvailable() && !!document.createElement) {
            if (this._imageUrl) {
                const imageContainer = new Rectangle(`${this.name}_image`);
                imageContainer.widthInPixels = this.imageSizeInPixels;
                imageContainer.heightInPixels = this.imageSizeInPixels;
                imageContainer.color = "transparent";
                totalPanelWidthInPixels -= this.imageSizeInPixels;
                const image = new Image();
                image.source = this._imageUrl;
                imageContainer.addControl(image);
                panel.addControl(imageContainer);
            }
        }
        if (this._text) {
            const text = new TextBlock(`${this.name}_text`);
            text.text = this._text;
            text.color = "white";
            text.fontSize = this.textSizeInPixels;
            text.widthInPixels = totalPanelWidthInPixels;
            if (this._imageUrl) {
                text.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                text.paddingLeftInPixels = padding;
            }
            if (this._subtext) {
                const textContainer = new Grid();
                textContainer.addColumnDefinition(1);
                textContainer.addRowDefinition(0.5);
                textContainer.addRowDefinition(0.5);
                textContainer.widthInPixels = totalPanelWidthInPixels;
                textContainer.heightInPixels = 45;
                const subtext = new TextBlock(`${this.name}_subtext`);
                subtext.text = this._subtext;
                subtext.color = "#EEEEEEAB";
                subtext.fontSize = this.textSizeInPixels * 0.75;
                subtext.fontWeight = "600";
                if (this._imageUrl) {
                    subtext.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    subtext.paddingLeftInPixels = padding;
                }
                textContainer.addControl(text, 0);
                textContainer.addControl(subtext, 1);
                panel.addControl(textContainer);
            }
            else {
                panel.addControl(text);
            }
        }
        contentContainer.addControl(panel);
        return contentContainer;
    }
    // Mesh association
    _createNode(scene) {
        this.name = this.name ?? "TouchHolographicButton";
        const backPlateMesh = this._createBackPlate(scene);
        const collisionMesh = this._createFrontPlate(scene);
        const innerQuadMesh = this._createInnerQuad(scene);
        const backGlowMesh = this._createBackGlow(scene);
        this._frontPlateCollisionMesh = collisionMesh;
        this._textPlate = super._createNode(scene);
        this._textPlate.name = `${this.name}_textPlate`;
        this._textPlate.isPickable = false;
        this._textPlate.scaling.x = this.width;
        this._textPlate.parent = collisionMesh;
        this._backPlate = backPlateMesh;
        this._backPlate.position = Vector3.Forward(scene.useRightHandedSystem).scale(this.backPlateDepth / 2);
        this._backPlate.isPickable = false;
        this._backPlate.addChild(collisionMesh);
        this._backPlate.addChild(innerQuadMesh);
        if (backGlowMesh) {
            this._backPlate.addChild(backGlowMesh);
        }
        const tn = new TransformNode(`${this.name}_root`, scene);
        this._backPlate.setParent(tn);
        this.collisionMesh = collisionMesh;
        this.collidableFrontDirection = this._backPlate.forward.negate(); // Mesh is facing the wrong way
        return tn;
    }
    _createBackPlate(scene) {
        const backPlateMesh = CreateBox(`${this.name}_backPlate`, {}, scene);
        backPlateMesh.isPickable = false;
        backPlateMesh.visibility = 0;
        backPlateMesh.scaling.z = 0.2;
        SceneLoader.ImportMeshAsync(undefined, TouchHolographicButton.MRTK_ASSET_BASE_URL, TouchHolographicButton.BACKPLATE_MODEL_FILENAME, scene).then((result) => {
            const backPlateModel = result.meshes[1];
            backPlateModel.visibility = 0;
            if (this._isBackplateVisible) {
                backPlateModel.visibility = 1;
                backPlateModel.name = `${this.name}_backPlate`;
                backPlateModel.isPickable = false;
                backPlateModel.scaling.x = this.width;
                backPlateModel.scaling.y = this.height;
                backPlateModel.parent = backPlateMesh;
            }
            if (this._backMaterial) {
                backPlateModel.material = this._backMaterial;
            }
            this._backPlate = backPlateModel;
        });
        return backPlateMesh;
    }
    _createFrontPlate(scene) {
        const collisionMesh = CreateBox(`${this.name}_frontPlate`, {
            width: this.width,
            height: this.height,
            depth: this.frontPlateDepth,
        }, scene);
        collisionMesh.isPickable = true;
        collisionMesh.isNearPickable = true;
        collisionMesh.visibility = 0;
        collisionMesh.position = Vector3.Forward(scene.useRightHandedSystem).scale((this.backPlateDepth - this.frontPlateDepth) / 2);
        SceneLoader.ImportMeshAsync(undefined, TouchHolographicButton.MRTK_ASSET_BASE_URL, TouchHolographicButton.FRONTPLATE_MODEL_FILENAME, scene).then((result) => {
            const collisionPlate = CreateBox(`${this.name}_collisionPlate`, {
                width: this.width,
                height: this.height,
            }, scene);
            collisionPlate.isPickable = false;
            collisionPlate.scaling.z = this.frontPlateDepth;
            collisionPlate.visibility = 0;
            collisionPlate.parent = collisionMesh;
            this._collisionPlate = collisionPlate;
            const frontPlateModel = result.meshes[1];
            frontPlateModel.name = `${this.name}_frontPlate`;
            frontPlateModel.isPickable = false;
            frontPlateModel.scaling.x = this.width - this.backGlowOffset;
            frontPlateModel.scaling.y = this.height - this.backGlowOffset;
            frontPlateModel.position = Vector3.Forward(scene.useRightHandedSystem).scale(-0.5);
            frontPlateModel.parent = collisionPlate;
            if (this.isToggleButton) {
                frontPlateModel.visibility = 0;
            }
            if (this._frontMaterial) {
                frontPlateModel.material = this._frontMaterial;
            }
            this._textPlate.scaling.x = 1;
            this._textPlate.parent = frontPlateModel;
            this._frontPlate = frontPlateModel;
        });
        return collisionMesh;
    }
    _createInnerQuad(scene) {
        const innerQuadMesh = CreateBox(`${this.name}_innerQuad`, {}, scene);
        innerQuadMesh.isPickable = false;
        innerQuadMesh.visibility = 0;
        innerQuadMesh.scaling.z = this.flatPlaneDepth;
        innerQuadMesh.position.z += this.backPlateDepth / 2 - this.flatPlaneDepth;
        SceneLoader.ImportMeshAsync(undefined, TouchHolographicButton.MRTK_ASSET_BASE_URL, TouchHolographicButton.INNERQUAD_MODEL_FILENAME, scene).then((result) => {
            const innerQuadModel = result.meshes[1];
            innerQuadModel.name = `${this.name}_innerQuad`;
            innerQuadModel.isPickable = false;
            innerQuadModel.scaling.x = this.width - this.backGlowOffset;
            innerQuadModel.scaling.y = this.height - this.backGlowOffset;
            innerQuadModel.parent = innerQuadMesh;
            if (this._innerQuadMaterial) {
                innerQuadModel.material = this._innerQuadMaterial;
            }
            this._innerQuad = innerQuadModel;
        });
        return innerQuadMesh;
    }
    _createBackGlow(scene) {
        if (this.isToggleButton) {
            return;
        }
        const backGlowMesh = CreateBox(`${this.name}_backGlow`, {}, scene);
        backGlowMesh.isPickable = false;
        backGlowMesh.visibility = 0;
        backGlowMesh.scaling.z = this.flatPlaneDepth;
        backGlowMesh.position.z += this.backPlateDepth / 2 - this.flatPlaneDepth * 2;
        SceneLoader.ImportMeshAsync(undefined, TouchHolographicButton.MRTK_ASSET_BASE_URL, TouchHolographicButton.BACKGLOW_MODEL_FILENAME, scene).then((result) => {
            const backGlowModel = result.meshes[1];
            backGlowModel.name = `${this.name}_backGlow`;
            backGlowModel.isPickable = false;
            backGlowModel.scaling.x = this.width - this.backGlowOffset;
            backGlowModel.scaling.y = this.height - this.backGlowOffset;
            backGlowModel.parent = backGlowMesh;
            if (this._backGlowMaterial) {
                backGlowModel.material = this._backGlowMaterial;
            }
            this._backGlow = backGlowModel;
        });
        return backGlowMesh;
    }
    _applyFacade(facadeTexture) {
        this._plateMaterial.emissiveTexture = facadeTexture;
        this._plateMaterial.opacityTexture = facadeTexture;
        this._plateMaterial.diffuseColor = this.plateMaterialColor;
    }
    _performClickAnimation() {
        const frameRate = 60;
        const animationGroup = new AnimationGroup("Click Animation Group");
        const animations = [
            {
                name: "backGlowMotion",
                mesh: this._backGlow,
                property: "material.motion",
                keys: [
                    {
                        frame: 0,
                        values: [0, 0, 0],
                    },
                    {
                        frame: 20,
                        values: [1, 0.0144, 0.0144],
                    },
                    {
                        frame: 40,
                        values: [0.0027713229489760476, 0, 0],
                    },
                    {
                        frame: 45,
                        values: [0.0027713229489760476],
                    },
                ],
            },
            {
                name: "_collisionPlateZSlide",
                mesh: this._collisionPlate,
                property: "position.z",
                keys: [
                    {
                        frame: 0,
                        values: [0.0, 0.0, 0.0],
                    },
                    {
                        frame: 20,
                        values: [Vector3.Forward(this._collisionPlate._scene.useRightHandedSystem).scale(this.frontPlateDepth / 2).z, 0.0, 0.0],
                    },
                    {
                        frame: 40,
                        values: [0.0, 0.005403332496794331],
                    },
                    {
                        frame: 45,
                        values: [0.0],
                    },
                ],
            },
            {
                name: "_collisionPlateZScale",
                mesh: this._collisionPlate,
                property: "scaling.z",
                keys: [
                    {
                        frame: 0,
                        values: [this.frontPlateDepth, 0.0, 0.0],
                    },
                    {
                        frame: 20,
                        values: [this.backPlateDepth, 0.0, 0.0],
                    },
                    {
                        frame: 40,
                        values: [this.frontPlateDepth, 0.0054],
                    },
                    {
                        frame: 45,
                        values: [this.frontPlateDepth],
                    },
                ],
            },
        ];
        for (const animation of animations) {
            const anim = new Animation(animation.name, animation.property, frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
            const animkeyFrames = [];
            for (const key of animation.keys) {
                animkeyFrames.push({
                    frame: key.frame,
                    value: key.values[0],
                    inTangent: key.values[1],
                    outTangent: key.values[2],
                    interpolation: key.values[3],
                });
            }
            anim.setKeys(animkeyFrames);
            if (!animation.mesh) {
                continue;
            }
            animationGroup.addTargetedAnimation(anim, animation.mesh);
        }
        animationGroup.normalize(0, 45);
        animationGroup.speedRatio = 1;
        animationGroup.play();
    }
    _performEnterExitAnimation(speedRatio) {
        const frameRate = 60;
        const animationGroup = new AnimationGroup("Enter Exit Animation Group");
        const animations = [
            {
                name: "frontPlateFadeOut",
                mesh: this._frontPlate,
                property: "material.fadeOut",
                keys: [
                    {
                        frame: 0,
                        values: [0, 0, 0.025045314830017686, 0],
                    },
                    {
                        frame: 40,
                        values: [1.00205599570012, 0.025045314830017686, 0, 0],
                    },
                ],
            },
            {
                name: "textPlateZSlide",
                mesh: this._textPlate,
                property: "position.z",
                keys: [
                    {
                        frame: 0,
                        values: [0, 0.0, 0.0],
                    },
                    {
                        frame: 40,
                        values: [Vector3.Forward(this._textPlate._scene.useRightHandedSystem).scale(-0.15).z, 0.0, 0.0],
                    },
                ],
            },
        ];
        for (const animation of animations) {
            const anim = new Animation(animation.name, animation.property, frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
            const animkeyFrames = [];
            for (const key of animation.keys) {
                animkeyFrames.push({
                    frame: key.frame,
                    value: key.values[0],
                    inTangent: key.values[1],
                    outTangent: key.values[2],
                    interpolation: key.values[3],
                });
            }
            anim.setKeys(animkeyFrames);
            if (!animation.mesh) {
                continue;
            }
            animationGroup.addTargetedAnimation(anim, animation.mesh);
        }
        animationGroup.normalize(0, 45);
        animationGroup.speedRatio = speedRatio;
        animationGroup.play();
    }
    _createBackMaterial(mesh) {
        this._backMaterial = this._backMaterial ?? new MRDLBackplateMaterial(this.name + "backPlateMaterial", mesh.getScene());
        this._backMaterial.absoluteSizes = true;
        this._backMaterial.radius = this.radius;
        this._backMaterial.lineWidth = 0.02;
    }
    _createFrontMaterial(mesh) {
        this._frontMaterial = this._frontMaterial ?? new MRDLFrontplateMaterial(this.name + "Front Material", mesh.getScene());
        this.frontMaterial.radius = this.innerQuadRadius;
        this.frontMaterial.fadeOut = 0.0;
    }
    _createBackGlowMaterial(mesh) {
        const glowRadius = this.radius + 0.04;
        this._backGlowMaterial = this._backGlowMaterial ?? new MRDLBackglowMaterial(this.name + "Back Glow Material", mesh.getScene());
        this._backGlowMaterial.bevelRadius = glowRadius;
        this._backGlowMaterial.lineWidth = glowRadius;
        this._backGlowMaterial.motion = 0.0;
    }
    _createInnerQuadMaterial(mesh) {
        this._innerQuadMaterial = this._innerQuadMaterial ?? new MRDLInnerquadMaterial("inner_quad", mesh.getScene());
        this._innerQuadMaterial.radius = this.innerQuadRadius;
        if (this.isToggleButton) {
            this._innerQuadMaterial.color = this.innerQuadColor;
        }
    }
    _createPlateMaterial(mesh) {
        this._plateMaterial = this._plateMaterial ?? new StandardMaterial(this.name + "Plate Material", mesh.getScene());
        this._plateMaterial.specularColor = Color3.Black();
    }
    _onToggle(newState) {
        super._onToggle(newState);
    }
    _affectMaterial(mesh) {
        if (this._shareMaterials) {
            // Back
            if (!this._host._touchSharedMaterials["mrdlBackplateMaterial"]) {
                this._createBackMaterial(mesh);
                this._host._touchSharedMaterials["mrdlBackplateMaterial"] = this._backMaterial;
            }
            else {
                this._backMaterial = this._host._touchSharedMaterials["mrdlBackplateMaterial"];
            }
            // Front
            if (!this._host._touchSharedMaterials["mrdlFrontplateMaterial"]) {
                this._createFrontMaterial(mesh);
                this._host._touchSharedMaterials["mrdlFrontplateMaterial"] = this._frontMaterial;
            }
            else {
                this._frontMaterial = this._host._touchSharedMaterials["mrdlFrontplateMaterial"];
            }
            // Back glow
            if (!this._host._touchSharedMaterials["mrdlBackglowMaterial"]) {
                this._createBackGlowMaterial(mesh);
                this._host._touchSharedMaterials["mrdlBackglowMaterial"] = this._backGlowMaterial;
            }
            else {
                this._backGlowMaterial = this._host._touchSharedMaterials["mrdlBackglowMaterial"];
            }
            // Inner quad
            if (!this._host._touchSharedMaterials["mrdlInnerQuadMaterial"]) {
                this._createInnerQuadMaterial(mesh);
                this._host._touchSharedMaterials["mrdlInnerQuadMaterial"] = this._innerQuadMaterial;
            }
            else {
                this._innerQuadMaterial = this._host._touchSharedMaterials["mrdlInnerQuadMaterial"];
            }
        }
        else {
            this._createBackMaterial(mesh);
            this._createFrontMaterial(mesh);
            this._createBackGlowMaterial(mesh);
            this._createInnerQuadMaterial(mesh);
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
        if (this._backGlow) {
            this._backGlow.material = this._backGlowMaterial;
        }
        if (this._innerQuad) {
            this._innerQuad.material = this._innerQuadMaterial;
        }
        this._rebuildContent();
    }
    /**
     * Releases all associated resources
     */
    dispose() {
        super.dispose(); // will dispose main mesh ie. back plate
        this._disposeTooltip();
        this.onPointerClickObservable.remove(this._pointerClickObserver);
        this.onPointerEnterObservable.remove(this._pointerEnterObserver);
        this.onPointerOutObservable.remove(this._pointerOutObserver);
        this.onToggleObservable.remove(this._toggleObserver);
        if (!this.shareMaterials) {
            this._backMaterial.dispose();
            this._frontMaterial.dispose();
            this._plateMaterial.dispose();
            this._backGlowMaterial.dispose();
            this._innerQuadMaterial.dispose();
            if (this._pickedPointObserver) {
                this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver);
                this._pickedPointObserver = null;
            }
        }
    }
}
/**
 * Base Url for the frontplate model.
 */
TouchHolographicButton.MRTK_ASSET_BASE_URL = "https://assets.babylonjs.com/meshes/MRTK/";
/**
 * File name for the frontplate model.
 */
TouchHolographicButton.FRONTPLATE_MODEL_FILENAME = "mrtk-fluent-frontplate.glb";
/**
 * File name for the backplate model.
 */
TouchHolographicButton.BACKPLATE_MODEL_FILENAME = "mrtk-fluent-backplate.glb";
/**
 * File name for the backglow model.
 */
TouchHolographicButton.BACKGLOW_MODEL_FILENAME = "mrtk-fluent-button.glb";
/**
 * File name for the innerquad model.
 */
TouchHolographicButton.INNERQUAD_MODEL_FILENAME = "SlateProximity.glb";
//# sourceMappingURL=touchHolographicButton.js.map