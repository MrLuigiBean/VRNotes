import type { Scene } from "../../scene";
/**
 * Defines the general structure of what is necessary for a collection strategy.
 */
export interface IPerfViewerCollectionStrategy {
    /**
     * The id of the strategy.
     */
    id: string;
    /**
     * Function which gets the data for the strategy.
     */
    getData: () => number;
    /**
     * Function which does any necessary cleanup. Called when performanceViewerCollector.dispose() is called.
     */
    dispose: () => void;
}
/**
 * Initializer callback for a strategy
 */
export type PerfStrategyInitialization = (scene: Scene) => IPerfViewerCollectionStrategy;
/**
 * Defines the predefined strategies used in the performance viewer.
 */
export declare class PerfCollectionStrategy {
    /**
     * Gets the initializer for the strategy used for collection of fps metrics
     * @returns the initializer for the fps strategy
     */
    static FpsStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of thermal utilization metrics.
     * Needs the experimental pressure API.
     * @returns the initializer for the thermal utilization strategy
     */
    static ThermalStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of power supply utilization metrics.
     * Needs the experimental pressure API.
     * @returns the initializer for the power supply utilization strategy
     */
    static PowerSupplyStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of pressure metrics.
     * Needs the experimental pressure API.
     * @returns the initializer for the pressure strategy
     */
    static PressureStrategy(): PerfStrategyInitialization;
    private static _PressureStrategy;
    /**
     * Gets the initializer for the strategy used for collection of total meshes metrics.
     * @returns the initializer for the total meshes strategy
     */
    static TotalMeshesStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of active meshes metrics.
     * @returns the initializer for the active meshes strategy
     */
    static ActiveMeshesStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of active indices metrics.
     * @returns the initializer for the active indices strategy
     */
    static ActiveIndicesStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of active faces metrics.
     * @returns the initializer for the active faces strategy
     */
    static ActiveFacesStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of active bones metrics.
     * @returns the initializer for the active bones strategy
     */
    static ActiveBonesStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of active particles metrics.
     * @returns the initializer for the active particles strategy
     */
    static ActiveParticlesStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of draw calls metrics.
     * @returns the initializer for the draw calls strategy
     */
    static DrawCallsStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of total lights metrics.
     * @returns the initializer for the total lights strategy
     */
    static TotalLightsStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of total vertices metrics.
     * @returns the initializer for the total vertices strategy
     */
    static TotalVerticesStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of total materials metrics.
     * @returns the initializer for the total materials strategy
     */
    static TotalMaterialsStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of total textures metrics.
     * @returns the initializer for the total textures strategy
     */
    static TotalTexturesStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of absolute fps metrics.
     * @returns the initializer for the absolute fps strategy
     */
    static AbsoluteFpsStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of meshes selection time metrics.
     * @returns the initializer for the meshes selection time strategy
     */
    static MeshesSelectionStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of render targets time metrics.
     * @returns the initializer for the render targets time strategy
     */
    static RenderTargetsStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of particles time metrics.
     * @returns the initializer for the particles time strategy
     */
    static ParticlesStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of sprites time metrics.
     * @returns the initializer for the sprites time strategy
     */
    static SpritesStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of animations time metrics.
     * @returns the initializer for the animations time strategy
     */
    static AnimationsStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of physics time metrics.
     * @returns the initializer for the physics time strategy
     */
    static PhysicsStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of render time metrics.
     * @returns the initializer for the render time strategy
     */
    static RenderStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of total frame time metrics.
     * @returns the initializer for the total frame time strategy
     */
    static FrameTotalStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of inter-frame time metrics.
     * @returns the initializer for the inter-frame time strategy
     */
    static InterFrameStrategy(): PerfStrategyInitialization;
    /**
     * Gets the initializer for the strategy used for collection of gpu frame time metrics.
     * @returns the initializer for the gpu frame time strategy
     */
    static GpuFrameTimeStrategy(): PerfStrategyInitialization;
}
