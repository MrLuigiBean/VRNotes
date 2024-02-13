import { Scene } from "../../scene.js";
import type { FloatArray, Nullable } from "../../types.js";
import type { Camera } from "../../Cameras/camera.js";
import type { IParticleSystem } from "../../Particles/IParticleSystem.js";
import type { ISceneComponent } from "../../sceneComponent.js";
import type { FluidRenderingObject } from "./fluidRenderingObject";
import { FluidRenderingTargetRenderer } from "./fluidRenderingTargetRenderer";
import "../../Shaders/fluidRenderingParticleDepth.vertex";
import "../../Shaders/fluidRenderingParticleDepth.fragment";
import "../../Shaders/fluidRenderingParticleThickness.vertex";
import "../../Shaders/fluidRenderingParticleThickness.fragment";
import "../../Shaders/fluidRenderingParticleDiffuse.vertex";
import "../../Shaders/fluidRenderingParticleDiffuse.fragment";
import "../../Shaders/fluidRenderingBilateralBlur.fragment";
import "../../Shaders/fluidRenderingStandardBlur.fragment";
import "../../Shaders/fluidRenderingRender.fragment";
declare module "../../abstractScene" {
    interface AbstractScene {
        /** @internal (Backing field) */
        _fluidRenderer: Nullable<FluidRenderer>;
        /**
         * Gets or Sets the fluid renderer associated to the scene.
         */
        fluidRenderer: Nullable<FluidRenderer>;
        /**
         * Enables the fluid renderer and associates it with the scene
         * @returns the FluidRenderer
         */
        enableFluidRenderer(): Nullable<FluidRenderer>;
        /**
         * Disables the fluid renderer associated with the scene
         */
        disableFluidRenderer(): void;
    }
}
/**
 * Defines the fluid renderer scene component responsible to render objects as fluids
 */
export declare class FluidRendererSceneComponent implements ISceneComponent {
    /**
     * The component name helpful to identify the component in the list of scene components.
     */
    readonly name = "FluidRenderer";
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
    private _gatherActiveCameraRenderTargets;
    private _afterCameraDraw;
    /**
     * Rebuilds the elements related to this component in case of
     * context lost for instance.
     */
    rebuild(): void;
    /**
     * Disposes the component and the associated resources
     */
    dispose(): void;
}
/**
 * An object rendered as a fluid.
 * It consists of the object itself as well as the render target renderer (which is used to generate the textures (render target) needed for fluid rendering)
 */
export interface IFluidRenderingRenderObject {
    /** object rendered as a fluid */
    object: FluidRenderingObject;
    /** target renderer used to render the fluid object */
    targetRenderer: FluidRenderingTargetRenderer;
}
/**
 * Class responsible for fluid rendering.
 * It is implementing the method described in https://developer.download.nvidia.com/presentations/2010/gdc/Direct3D_Effects.pdf
 */
export declare class FluidRenderer {
    /** @internal */
    static _SceneComponentInitialization(scene: Scene): void;
    private _scene;
    private _engine;
    private _onEngineResizeObserver;
    private _cameras;
    /** Retrieves all the render objects managed by the class */
    readonly renderObjects: Array<IFluidRenderingRenderObject>;
    /** Retrieves all the render target renderers managed by the class */
    readonly targetRenderers: FluidRenderingTargetRenderer[];
    /**
     * Initializes the class
     * @param scene Scene in which the objects are part of
     */
    constructor(scene: Scene);
    /**
     * Reinitializes the class
     * Can be used if you change the object priority (FluidRenderingObject.priority), to make sure the objects are rendered in the right order
     */
    recreate(): void;
    /**
     * Gets the render object corresponding to a particle system (null if the particle system is not rendered as a fluid)
     * @param ps The particle system
     * @returns the render object corresponding to this particle system if any, otherwise null
     */
    getRenderObjectFromParticleSystem(ps: IParticleSystem): Nullable<IFluidRenderingRenderObject>;
    /**
     * Adds a particle system to the fluid renderer.
     * @param ps particle system
     * @param generateDiffuseTexture True if you want to generate a diffuse texture from the particle system and use it as part of the fluid rendering (default: false)
     * @param targetRenderer The target renderer used to display the particle system as a fluid. If not provided, the method will create a new one
     * @param camera The camera used by the target renderer (if the target renderer is created by the method)
     * @returns the render object corresponding to the particle system
     */
    addParticleSystem(ps: IParticleSystem, generateDiffuseTexture?: boolean, targetRenderer?: FluidRenderingTargetRenderer, camera?: Camera): IFluidRenderingRenderObject;
    /**
     * Adds a custom particle set to the fluid renderer.
     * @param buffers The list of buffers (should contain at least a "position" buffer!)
     * @param numParticles Number of particles in each buffer
     * @param generateDiffuseTexture True if you want to generate a diffuse texture from buffers and use it as part of the fluid rendering (default: false). For the texture to be generated correctly, you need a "color" buffer in the set!
     * @param targetRenderer The target renderer used to display the particle system as a fluid. If not provided, the method will create a new one
     * @param camera The camera used by the target renderer (if the target renderer is created by the method)
     * @returns the render object corresponding to the custom particle set
     */
    addCustomParticles(buffers: {
        [key: string]: FloatArray;
    }, numParticles: number, generateDiffuseTexture?: boolean, targetRenderer?: FluidRenderingTargetRenderer, camera?: Camera): IFluidRenderingRenderObject;
    /**
     * Removes a render object from the fluid renderer
     * @param renderObject the render object to remove
     * @param removeUnusedTargetRenderer True to remove/dispose of the target renderer if it's not used anymore (default: true)
     * @returns True if the render object has been found and released, else false
     */
    removeRenderObject(renderObject: IFluidRenderingRenderObject, removeUnusedTargetRenderer?: boolean): boolean;
    private _sortRenderingObjects;
    private _removeUnusedTargetRenderers;
    private _getParticleSystemIndex;
    private _initialize;
    private _setParticleSizeForRenderTargets;
    private _setUseVelocityForRenderObject;
    /** @internal */
    _prepareRendering(): void;
    /** @internal */
    _render(forCamera?: Camera): void;
    /**
     * Disposes of all the ressources used by the class
     */
    dispose(): void;
}
