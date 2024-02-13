import type { Nullable } from "@babylonjs/core/types.js";
/**
 * Class used to load GUI via XML.
 */
export declare class XmlLoader {
    private _nodes;
    private _nodeTypes;
    private _isLoaded;
    private _objectAttributes;
    private _rootNode;
    private _parentClass;
    /**
     * Create a new xml loader
     * @param parentClass Sets the class context. Used when the loader is instanced inside a class and not in a global context
     */
    constructor(parentClass?: any);
    private _getChainElement;
    private _getClassAttribute;
    private _createGuiElement;
    private _parseGrid;
    private _parseElement;
    private _prepareSourceElement;
    private _parseElementsFromSource;
    private _parseXml;
    /**
     * Gets if the loading has finished.
     * @returns whether the loading has finished or not
     */
    isLoaded(): boolean;
    /**
     * Gets a loaded node / control by id.
     * @param id the Controls id set in the xml
     * @returns element of type Control
     */
    getNodeById(id: string): any;
    /**
     * Gets all loaded nodes / controls
     * @returns Array of controls
     */
    getNodes(): any;
    /**
     * Disposes the loaded layout
     */
    dispose(): void;
    /**
     * Initiates the xml layout loading
     * @param xmlFile defines the xml layout to load
     * @param rootNode defines the node / control to use as a parent for the loaded layout controls.
     * @param onSuccess defines the callback called on layout load successfully.
     * @param onError defines the callback called on layout load failure.
     */
    loadLayout(xmlFile: any, rootNode: any, onSuccess?: Nullable<() => void>, onError?: Nullable<(error: string) => void>): void;
    /**
     * Initiates the xml layout loading asynchronously
     * @param xmlFile defines the xml layout to load
     * @param rootNode defines the node / control to use as a parent for the loaded layout controls.
     * @returns Promise
     */
    loadLayoutAsync(xmlFile: any, rootNode: any): Promise<any>;
}
