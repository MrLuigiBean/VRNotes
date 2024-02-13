/**
 * Enum defining the type of animations supported by InputBlock
 */
export declare enum AnimatedInputBlockTypes {
    /** No animation */
    None = 0,
    /** Time based animation (is incremented by 0.6 each second). Will only work for floats */
    Time = 1,
    /** Time elapsed (in seconds) since the engine was initialized. Will only work for floats */
    RealTime = 2
}
