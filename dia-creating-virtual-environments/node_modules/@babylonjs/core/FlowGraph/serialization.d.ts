import type { Scene } from "../scene";
/**
 * The default function that serializes values in a context object to a serialization object
 * @param key the key where the value should be stored in the serialization object
 * @param value the value to store
 * @param serializationObject the object where the value will be stored
 */
export declare function defaultValueSerializationFunction(key: string, value: any, serializationObject: any): void;
/**
 * The default function that parses values stored in a serialization object
 * @param key the key to the value that will be parsed
 * @param serializationObject the object that will be parsed
 * @param scene
 * @returns
 */
export declare function defaultValueParseFunction(key: string, serializationObject: any, scene: Scene): any;
/**
 * Given a name of a flow graph block class, return if this
 * class needs to be created with a path converter. Used in
 * parsing.
 * @param className the name of the flow graph block class
 * @returns a boolean indicating if the class needs a path converter
 */
export declare function needsPathConverter(className: string): boolean;
