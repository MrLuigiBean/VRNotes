/**
 * Defines the kind of connection point for node geometry
 */
export declare enum NodeGeometryBlockConnectionPointTypes {
    /** Int */
    Int = 1,
    /** Float */
    Float = 2,
    /** Vector2 */
    Vector2 = 4,
    /** Vector3 */
    Vector3 = 8,
    /** Vector4 */
    Vector4 = 16,
    /** Matrix */
    Matrix = 32,
    /** Geometry */
    Geometry = 64,
    /** Texture */
    Texture = 128,
    /** Detect type based on connection */
    AutoDetect = 1024,
    /** Output type that will be defined by input type */
    BasedOnInput = 2048,
    /** Undefined */
    Undefined = 4096,
    /** Bitmask of all types */
    All = 4095
}
