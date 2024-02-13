/**
 * Base class of the scene acting as a container for the different elements composing a scene.
 * This class is dynamically extended by the different components of the scene increasing
 * flexibility and reducing coupling
 */
export class AbstractScene {
    constructor() {
        /**
         * Gets the list of root nodes (ie. nodes with no parent)
         */
        this.rootNodes = [];
        /** All of the cameras added to this scene
         * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras
         */
        this.cameras = [];
        /**
         * All of the lights added to this scene
         * @see https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
         */
        this.lights = [];
        /**
         * All of the (abstract) meshes added to this scene
         */
        this.meshes = [];
        /**
         * The list of skeletons added to the scene
         * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/bonesSkeletons
         */
        this.skeletons = [];
        /**
         * All of the particle systems added to this scene
         * @see https://doc.babylonjs.com/features/featuresDeepDive/particles/particle_system/particle_system_intro
         */
        this.particleSystems = [];
        /**
         * Gets a list of Animations associated with the scene
         */
        this.animations = [];
        /**
         * All of the animation groups added to this scene
         * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/groupAnimations
         */
        this.animationGroups = [];
        /**
         * All of the multi-materials added to this scene
         * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/multiMaterials
         */
        this.multiMaterials = [];
        /**
         * All of the materials added to this scene
         * In the context of a Scene, it is not supposed to be modified manually.
         * Any addition or removal should be done using the addMaterial and removeMaterial Scene methods.
         * Note also that the order of the Material within the array is not significant and might change.
         * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/materials_introduction
         */
        this.materials = [];
        /**
         * The list of morph target managers added to the scene
         * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/dynamicMeshMorph
         */
        this.morphTargetManagers = [];
        /**
         * The list of geometries used in the scene.
         */
        this.geometries = [];
        /**
         * All of the transform nodes added to this scene
         * In the context of a Scene, it is not supposed to be modified manually.
         * Any addition or removal should be done using the addTransformNode and removeTransformNode Scene methods.
         * Note also that the order of the TransformNode within the array is not significant and might change.
         * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/transforms/parent_pivot/transform_node
         */
        this.transformNodes = [];
        /**
         * ActionManagers available on the scene.
         * @deprecated
         */
        this.actionManagers = [];
        /**
         * Textures to keep.
         */
        this.textures = [];
        /** @internal */
        this._environmentTexture = null;
        /**
         * The list of postprocesses added to the scene
         */
        this.postProcesses = [];
    }
    /**
     * Adds a parser in the list of available ones
     * @param name Defines the name of the parser
     * @param parser Defines the parser to add
     */
    static AddParser(name, parser) {
        this._BabylonFileParsers[name] = parser;
    }
    /**
     * Gets a general parser from the list of available ones
     * @param name Defines the name of the parser
     * @returns the requested parser or null
     */
    static GetParser(name) {
        if (this._BabylonFileParsers[name]) {
            return this._BabylonFileParsers[name];
        }
        return null;
    }
    /**
     * Adds n individual parser in the list of available ones
     * @param name Defines the name of the parser
     * @param parser Defines the parser to add
     */
    static AddIndividualParser(name, parser) {
        this._IndividualBabylonFileParsers[name] = parser;
    }
    /**
     * Gets an individual parser from the list of available ones
     * @param name Defines the name of the parser
     * @returns the requested parser or null
     */
    static GetIndividualParser(name) {
        if (this._IndividualBabylonFileParsers[name]) {
            return this._IndividualBabylonFileParsers[name];
        }
        return null;
    }
    /**
     * Parser json data and populate both a scene and its associated container object
     * @param jsonData Defines the data to parse
     * @param scene Defines the scene to parse the data for
     * @param container Defines the container attached to the parsing sequence
     * @param rootUrl Defines the root url of the data
     */
    static Parse(jsonData, scene, container, rootUrl) {
        for (const parserName in this._BabylonFileParsers) {
            if (Object.prototype.hasOwnProperty.call(this._BabylonFileParsers, parserName)) {
                this._BabylonFileParsers[parserName](jsonData, scene, container, rootUrl);
            }
        }
    }
    /**
     * Texture used in all pbr material as the reflection texture.
     * As in the majority of the scene they are the same (exception for multi room and so on),
     * this is easier to reference from here than from all the materials.
     */
    get environmentTexture() {
        return this._environmentTexture;
    }
    set environmentTexture(value) {
        this._environmentTexture = value;
    }
    /**
     * @returns all meshes, lights, cameras, transformNodes and bones
     */
    getNodes() {
        let nodes = [];
        nodes = nodes.concat(this.meshes);
        nodes = nodes.concat(this.lights);
        nodes = nodes.concat(this.cameras);
        nodes = nodes.concat(this.transformNodes); // dummies
        this.skeletons.forEach((skeleton) => (nodes = nodes.concat(skeleton.bones)));
        return nodes;
    }
}
/**
 * Stores the list of available parsers in the application.
 */
AbstractScene._BabylonFileParsers = {};
/**
 * Stores the list of available individual parsers in the application.
 */
AbstractScene._IndividualBabylonFileParsers = {};
//# sourceMappingURL=abstractScene.js.map