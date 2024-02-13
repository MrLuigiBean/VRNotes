import type { Color3 } from "../Maths/math.color";
import { Color4 } from "../Maths/math.color";
/** Interface used by value gradients (color, factor, ...) */
export interface IValueGradient {
    /**
     * Gets or sets the gradient value (between 0 and 1)
     */
    gradient: number;
}
/** Class used to store color4 gradient */
export declare class ColorGradient implements IValueGradient {
    /**
     * Gets or sets the gradient value (between 0 and 1)
     */
    gradient: number;
    /**
     * Gets or sets first associated color
     */
    color1: Color4;
    /**
     * Gets or sets second associated color
     */
    color2?: Color4 | undefined;
    /**
     * Creates a new color4 gradient
     * @param gradient gets or sets the gradient value (between 0 and 1)
     * @param color1 gets or sets first associated color
     * @param color2 gets or sets first second color
     */
    constructor(
    /**
     * Gets or sets the gradient value (between 0 and 1)
     */
    gradient: number, 
    /**
     * Gets or sets first associated color
     */
    color1: Color4, 
    /**
     * Gets or sets second associated color
     */
    color2?: Color4 | undefined);
    /**
     * Will get a color picked randomly between color1 and color2.
     * If color2 is undefined then color1 will be used
     * @param result defines the target Color4 to store the result in
     */
    getColorToRef(result: Color4): void;
}
/** Class used to store color 3 gradient */
export declare class Color3Gradient implements IValueGradient {
    /**
     * Gets or sets the gradient value (between 0 and 1)
     */
    gradient: number;
    /**
     * Gets or sets the associated color
     */
    color: Color3;
    /**
     * Creates a new color3 gradient
     * @param gradient gets or sets the gradient value (between 0 and 1)
     * @param color gets or sets associated color
     */
    constructor(
    /**
     * Gets or sets the gradient value (between 0 and 1)
     */
    gradient: number, 
    /**
     * Gets or sets the associated color
     */
    color: Color3);
}
/** Class used to store factor gradient */
export declare class FactorGradient implements IValueGradient {
    /**
     * Gets or sets the gradient value (between 0 and 1)
     */
    gradient: number;
    /**
     * Gets or sets first associated factor
     */
    factor1: number;
    /**
     * Gets or sets second associated factor
     */
    factor2?: number | undefined;
    /**
     * Creates a new factor gradient
     * @param gradient gets or sets the gradient value (between 0 and 1)
     * @param factor1 gets or sets first associated factor
     * @param factor2 gets or sets second associated factor
     */
    constructor(
    /**
     * Gets or sets the gradient value (between 0 and 1)
     */
    gradient: number, 
    /**
     * Gets or sets first associated factor
     */
    factor1: number, 
    /**
     * Gets or sets second associated factor
     */
    factor2?: number | undefined);
    /**
     * Will get a number picked randomly between factor1 and factor2.
     * If factor2 is undefined then factor1 will be used
     * @returns the picked number
     */
    getFactor(): number;
}
/**
 * Helper used to simplify some generic gradient tasks
 */
export declare class GradientHelper {
    /**
     * Gets the current gradient from an array of IValueGradient
     * @param ratio defines the current ratio to get
     * @param gradients defines the array of IValueGradient
     * @param updateFunc defines the callback function used to get the final value from the selected gradients
     */
    static GetCurrentGradient(ratio: number, gradients: IValueGradient[], updateFunc: (current: IValueGradient, next: IValueGradient, scale: number) => void): void;
}
