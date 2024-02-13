import type { Camera } from "../Cameras/camera";
import type { DirectionalLight } from "../Lights/directionalLight";
import { Matrix } from "../Maths/math.vector";
/**
 * Class used to render a debug view of the frustum for a directional light
 * @see https://playground.babylonjs.com/#7EFGSG#4
 * @since 5.0.0
 */
export declare class DirectionalLightFrustumViewer {
    private _scene;
    private _light;
    private _camera;
    private _inverseViewMatrix;
    private _visible;
    private _rootNode;
    private _lightHelperFrustumMeshes;
    private _nearLinesPoints;
    private _farLinesPoints;
    private _trLinesPoints;
    private _brLinesPoints;
    private _tlLinesPoints;
    private _blLinesPoints;
    private _nearPlaneVertices;
    private _farPlaneVertices;
    private _rightPlaneVertices;
    private _leftPlaneVertices;
    private _topPlaneVertices;
    private _bottomPlaneVertices;
    private _oldPosition;
    private _oldDirection;
    private _oldAutoCalc;
    private _oldMinZ;
    private _oldMaxZ;
    private _transparency;
    /**
     * Gets or sets the transparency of the frustum planes
     */
    get transparency(): number;
    set transparency(alpha: number);
    private _showLines;
    /**
     * true to display the edges of the frustum
     */
    get showLines(): boolean;
    set showLines(show: boolean);
    private _showPlanes;
    /**
     * true to display the planes of the frustum
     */
    get showPlanes(): boolean;
    set showPlanes(show: boolean);
    /**
     * Creates a new frustum viewer
     * @param light directional light to display the frustum for
     * @param camera camera used to retrieve the minZ / maxZ values if the shadowMinZ/shadowMaxZ values of the light are not setup
     */
    constructor(light: DirectionalLight, camera: Camera);
    /**
     * Shows the frustum
     */
    show(): void;
    /**
     * Hides the frustum
     */
    hide(): void;
    /**
     * Updates the frustum.
     * Call this method to update the frustum view if the light has changed position/direction
     */
    update(): void;
    /**
     * Dispose of the class / remove the frustum view
     */
    dispose(): void;
    protected _createGeometry(): void;
    protected _getInvertViewMatrix(): Matrix;
}
