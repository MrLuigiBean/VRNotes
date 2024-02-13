/**
 * Checks if the window object exists
 * @returns true if the window object exists
 */
export declare function IsWindowObjectExist(): boolean;
/**
 * Checks if the navigator object exists
 * @returns true if the navigator object exists
 */
export declare function IsNavigatorAvailable(): boolean;
/**
 * Check if the document object exists
 * @returns true if the document object exists
 */
export declare function IsDocumentAvailable(): boolean;
/**
 * Extracts text content from a DOM element hierarchy
 * @param element defines the root element
 * @returns a string
 */
export declare function GetDOMTextContent(element: HTMLElement): string;
/**
 * Sets of helpers dealing with the DOM and some of the recurrent functions needed in
 * Babylon.js
 */
export declare const DomManagement: {
    /**
     * Checks if the window object exists
     * @returns true if the window object exists
     */
    IsWindowObjectExist: typeof IsWindowObjectExist;
    /**
     * Checks if the navigator object exists
     * @returns true if the navigator object exists
     */
    IsNavigatorAvailable: typeof IsNavigatorAvailable;
    /**
     * Check if the document object exists
     * @returns true if the document object exists
     */
    IsDocumentAvailable: typeof IsDocumentAvailable;
    /**
     * Extracts text content from a DOM element hierarchy
     * @param element defines the root element
     * @returns a string
     */
    GetDOMTextContent: typeof GetDOMTextContent;
};
