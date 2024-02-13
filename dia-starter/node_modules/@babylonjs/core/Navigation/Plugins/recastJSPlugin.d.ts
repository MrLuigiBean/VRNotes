import type { INavigationEnginePlugin, ICrowd, IAgentParameters, INavMeshParameters, IObstacle } from "../../Navigation/INavigationEngine";
import { Mesh } from "../../Meshes/mesh";
import type { Scene } from "../../scene";
import { Vector3 } from "../../Maths/math";
import type { TransformNode } from "../../Meshes/transformNode";
import { Observable } from "../../Misc/observable";
/**
 * RecastJS navigation plugin
 */
export declare class RecastJSPlugin implements INavigationEnginePlugin {
    /**
     * Reference to the Recast library
     */
    bjsRECAST: any;
    /**
     * plugin name
     */
    name: string;
    /**
     * the first navmesh created. We might extend this to support multiple navmeshes
     */
    navMesh: any;
    private _maximumSubStepCount;
    private _timeStep;
    private _timeFactor;
    private _tempVec1;
    private _tempVec2;
    private _worker;
    /**
     * Initializes the recastJS plugin
     * @param recastInjection can be used to inject your own recast reference
     */
    constructor(recastInjection?: any);
    /**
     * Set worker URL to be used when generating a new navmesh
     * @param workerURL url string
     * @returns boolean indicating if worker is created
     */
    setWorkerURL(workerURL: string): boolean;
    /**
     * Set the time step of the navigation tick update.
     * Default is 1/60.
     * A value of 0 will disable fixed time update
     * @param newTimeStep the new timestep to apply to this world.
     */
    setTimeStep(newTimeStep?: number): void;
    /**
     * Get the time step of the navigation tick update.
     * @returns the current time step
     */
    getTimeStep(): number;
    /**
     * If delta time in navigation tick update is greater than the time step
     * a number of sub iterations are done. If more iterations are need to reach deltatime
     * they will be discarded.
     * A value of 0 will set to no maximum and update will use as many substeps as needed
     * @param newStepCount the maximum number of iterations
     */
    setMaximumSubStepCount(newStepCount?: number): void;
    /**
     * Get the maximum number of iterations per navigation tick update
     * @returns the maximum number of iterations
     */
    getMaximumSubStepCount(): number;
    /**
     * Time factor applied when updating crowd agents (default 1). A value of 0 will pause crowd updates.
     * @param value the time factor applied at update
     */
    set timeFactor(value: number);
    /**
     * Get the time factor used for crowd agent update
     * @returns the time factor
     */
    get timeFactor(): number;
    /**
     * Creates a navigation mesh
     * @param meshes array of all the geometry used to compute the navigation mesh
     * @param parameters bunch of parameters used to filter geometry
     * @param completion callback when data is available from the worker. Not used without a worker
     */
    createNavMesh(meshes: Array<Mesh>, parameters: INavMeshParameters, completion?: (navmeshData: Uint8Array) => void): void;
    /**
     * Create a navigation mesh debug mesh
     * @param scene is where the mesh will be added
     * @returns debug display mesh
     */
    createDebugNavMesh(scene: Scene): Mesh;
    /**
     * Get a navigation mesh constrained position, closest to the parameter position
     * @param position world position
     * @returns the closest point to position constrained by the navigation mesh
     */
    getClosestPoint(position: Vector3): Vector3;
    /**
     * Get a navigation mesh constrained position, closest to the parameter position
     * @param position world position
     * @param result output the closest point to position constrained by the navigation mesh
     */
    getClosestPointToRef(position: Vector3, result: Vector3): void;
    /**
     * Get a navigation mesh constrained position, within a particular radius
     * @param position world position
     * @param maxRadius the maximum distance to the constrained world position
     * @returns the closest point to position constrained by the navigation mesh
     */
    getRandomPointAround(position: Vector3, maxRadius: number): Vector3;
    /**
     * Get a navigation mesh constrained position, within a particular radius
     * @param position world position
     * @param maxRadius the maximum distance to the constrained world position
     * @param result output the closest point to position constrained by the navigation mesh
     */
    getRandomPointAroundToRef(position: Vector3, maxRadius: number, result: Vector3): void;
    /**
     * Compute the final position from a segment made of destination-position
     * @param position world position
     * @param destination world position
     * @returns the resulting point along the navmesh
     */
    moveAlong(position: Vector3, destination: Vector3): Vector3;
    /**
     * Compute the final position from a segment made of destination-position
     * @param position world position
     * @param destination world position
     * @param result output the resulting point along the navmesh
     */
    moveAlongToRef(position: Vector3, destination: Vector3, result: Vector3): void;
    /**
     * Compute a navigation path from start to end. Returns an empty array if no path can be computed
     * @param start world position
     * @param end world position
     * @returns array containing world position composing the path
     */
    computePath(start: Vector3, end: Vector3): Vector3[];
    /**
     * Create a new Crowd so you can add agents
     * @param maxAgents the maximum agent count in the crowd
     * @param maxAgentRadius the maximum radius an agent can have
     * @param scene to attach the crowd to
     * @returns the crowd you can add agents to
     */
    createCrowd(maxAgents: number, maxAgentRadius: number, scene: Scene): ICrowd;
    /**
     * Set the Bounding box extent for doing spatial queries (getClosestPoint, getRandomPointAround, ...)
     * The queries will try to find a solution within those bounds
     * default is (1,1,1)
     * @param extent x,y,z value that define the extent around the queries point of reference
     */
    setDefaultQueryExtent(extent: Vector3): void;
    /**
     * Get the Bounding box extent specified by setDefaultQueryExtent
     * @returns the box extent values
     */
    getDefaultQueryExtent(): Vector3;
    /**
     * build the navmesh from a previously saved state using getNavmeshData
     * @param data the Uint8Array returned by getNavmeshData
     */
    buildFromNavmeshData(data: Uint8Array): void;
    /**
     * returns the navmesh data that can be used later. The navmesh must be built before retrieving the data
     * @returns data the Uint8Array that can be saved and reused
     */
    getNavmeshData(): Uint8Array;
    /**
     * Get the Bounding box extent result specified by setDefaultQueryExtent
     * @param result output the box extent values
     */
    getDefaultQueryExtentToRef(result: Vector3): void;
    /**
     * Disposes
     */
    dispose(): void;
    /**
     * Creates a cylinder obstacle and add it to the navigation
     * @param position world position
     * @param radius cylinder radius
     * @param height cylinder height
     * @returns the obstacle freshly created
     */
    addCylinderObstacle(position: Vector3, radius: number, height: number): IObstacle;
    /**
     * Creates an oriented box obstacle and add it to the navigation
     * @param position world position
     * @param extent box size
     * @param angle angle in radians of the box orientation on Y axis
     * @returns the obstacle freshly created
     */
    addBoxObstacle(position: Vector3, extent: Vector3, angle: number): IObstacle;
    /**
     * Removes an obstacle created by addCylinderObstacle or addBoxObstacle
     * @param obstacle obstacle to remove from the navigation
     */
    removeObstacle(obstacle: IObstacle): void;
    /**
     * If this plugin is supported
     * @returns true if plugin is supported
     */
    isSupported(): boolean;
}
/**
 * Recast detour crowd implementation
 */
export declare class RecastJSCrowd implements ICrowd {
    /**
     * Recast/detour plugin
     */
    bjsRECASTPlugin: RecastJSPlugin;
    /**
     * Link to the detour crowd
     */
    recastCrowd: any;
    /**
     * One transform per agent
     */
    transforms: TransformNode[];
    /**
     * All agents created
     */
    agents: number[];
    /**
     * agents reach radius
     */
    reachRadii: number[];
    /**
     * true when a destination is active for an agent and notifier hasn't been notified of reach
     */
    private _agentDestinationArmed;
    /**
     * agent current target
     */
    private _agentDestination;
    /**
     * Link to the scene is kept to unregister the crowd from the scene
     */
    private _scene;
    /**
     * Observer for crowd updates
     */
    private _onBeforeAnimationsObserver;
    /**
     * Fires each time an agent is in reach radius of its destination
     */
    onReachTargetObservable: Observable<{
        agentIndex: number;
        destination: Vector3;
    }>;
    /**
     * Constructor
     * @param plugin recastJS plugin
     * @param maxAgents the maximum agent count in the crowd
     * @param maxAgentRadius the maximum radius an agent can have
     * @param scene to attach the crowd to
     * @returns the crowd you can add agents to
     */
    constructor(plugin: RecastJSPlugin, maxAgents: number, maxAgentRadius: number, scene: Scene);
    /**
     * Add a new agent to the crowd with the specified parameter a corresponding transformNode.
     * You can attach anything to that node. The node position is updated in the scene update tick.
     * @param pos world position that will be constrained by the navigation mesh
     * @param parameters agent parameters
     * @param transform hooked to the agent that will be update by the scene
     * @returns agent index
     */
    addAgent(pos: Vector3, parameters: IAgentParameters, transform: TransformNode): number;
    /**
     * Returns the agent position in world space
     * @param index agent index returned by addAgent
     * @returns world space position
     */
    getAgentPosition(index: number): Vector3;
    /**
     * Returns the agent position result in world space
     * @param index agent index returned by addAgent
     * @param result output world space position
     */
    getAgentPositionToRef(index: number, result: Vector3): void;
    /**
     * Returns the agent velocity in world space
     * @param index agent index returned by addAgent
     * @returns world space velocity
     */
    getAgentVelocity(index: number): Vector3;
    /**
     * Returns the agent velocity result in world space
     * @param index agent index returned by addAgent
     * @param result output world space velocity
     */
    getAgentVelocityToRef(index: number, result: Vector3): void;
    /**
     * Returns the agent next target point on the path
     * @param index agent index returned by addAgent
     * @returns world space position
     */
    getAgentNextTargetPath(index: number): Vector3;
    /**
     * Returns the agent next target point on the path
     * @param index agent index returned by addAgent
     * @param result output world space position
     */
    getAgentNextTargetPathToRef(index: number, result: Vector3): void;
    /**
     * Gets the agent state
     * @param index agent index returned by addAgent
     * @returns agent state
     */
    getAgentState(index: number): number;
    /**
     * returns true if the agent in over an off mesh link connection
     * @param index agent index returned by addAgent
     * @returns true if over an off mesh link connection
     */
    overOffmeshConnection(index: number): boolean;
    /**
     * Asks a particular agent to go to a destination. That destination is constrained by the navigation mesh
     * @param index agent index returned by addAgent
     * @param destination targeted world position
     */
    agentGoto(index: number, destination: Vector3): void;
    /**
     * Teleport the agent to a new position
     * @param index agent index returned by addAgent
     * @param destination targeted world position
     */
    agentTeleport(index: number, destination: Vector3): void;
    /**
     * Update agent parameters
     * @param index agent index returned by addAgent
     * @param parameters agent parameters
     */
    updateAgentParameters(index: number, parameters: IAgentParameters): void;
    /**
     * remove a particular agent previously created
     * @param index agent index returned by addAgent
     */
    removeAgent(index: number): void;
    /**
     * get the list of all agents attached to this crowd
     * @returns list of agent indices
     */
    getAgents(): number[];
    /**
     * Tick update done by the Scene. Agent position/velocity/acceleration is updated by this function
     * @param deltaTime in seconds
     */
    update(deltaTime: number): void;
    /**
     * Set the Bounding box extent for doing spatial queries (getClosestPoint, getRandomPointAround, ...)
     * The queries will try to find a solution within those bounds
     * default is (1,1,1)
     * @param extent x,y,z value that define the extent around the queries point of reference
     */
    setDefaultQueryExtent(extent: Vector3): void;
    /**
     * Get the Bounding box extent specified by setDefaultQueryExtent
     * @returns the box extent values
     */
    getDefaultQueryExtent(): Vector3;
    /**
     * Get the Bounding box extent result specified by setDefaultQueryExtent
     * @param result output the box extent values
     */
    getDefaultQueryExtentToRef(result: Vector3): void;
    /**
     * Get the next corner points composing the path (max 4 points)
     * @param index agent index returned by addAgent
     * @returns array containing world position composing the path
     */
    getCorners(index: number): Vector3[];
    /**
     * Release all resources
     */
    dispose(): void;
}
