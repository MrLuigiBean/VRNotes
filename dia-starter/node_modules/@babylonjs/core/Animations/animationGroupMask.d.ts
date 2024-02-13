/**
 * Enum used to define the mode for an animation group mask
 */
export declare enum AnimationGroupMaskMode {
    /**
     * The mask defines the animatable target names that should be included
     */
    Include = 0,
    /**
     * The mask defines the animatable target names in a "exclude" mode: all animatable targets will be animated except the ones defined in the mask
     */
    Exclude = 1
}
/**
 * Defines a mask used to filter animation targets.
 * If you apply a mask to an animation group (see the AnimationGroup.mask property), only the animations whose target names match the mask will play.
 * Note that a target is defined by its name (string). This means that the same mask can be used for several animation groups, provided that their targets are named in the same way.
 */
export declare class AnimationGroupMask {
    /**
     * Defines the mode for the mask
     */
    mode: AnimationGroupMaskMode;
    /**
     * The set of target names included in the mask. If mode is AnimationGroupMaskMode.Exclude, the targets in this set will be excluded from the mask instead.
     */
    private _targetNames;
    /**
     * Gets or sets a boolean indicating if the mask is disabled (default is false)
     */
    disabled: boolean;
    /**
     * Creates a new mask
     * @param names The list of target names to add to the mask (optional)
     * @param mode Defines the mode for the mask (default: AnimationGroupMaskMode.Include)
     */
    constructor(names?: string[], 
    /**
     * Defines the mode for the mask
     */
    mode?: AnimationGroupMaskMode);
    /**
     * Adds one or several target names to the mask
     * @param name The name(s) to add to the mask
     */
    addTargetName(name: string | string[]): void;
    /**
     * Removes one or several target names from the mask
     * @param name The name(s) to remove from the mask
     */
    removeTargetName(name: string | string[]): void;
    /**
     * Checks if the mask includes a target name.
     * This method is intended to know if a given target name is included in the mask, not if the name is actually retained by the mask (see retainsTarget() instead).
     * @param name The name to check with the mask
     * @returns True if the mask includes the name, false otherwise
     */
    hasTarget(name: string): boolean;
    /**
     * Checks if the mask retains a target name.
     * Note that in the "Exclude" mode, this will return false if the mask includes the name, and true otherwise!
     * This method is intended to know if a given target name is retained by the mask, not if the name is in the list of target names.
     * @param name The name to check with the mask
     * @returns True if the mask retains the name, false otherwise
     */
    retainsTarget(name: string): boolean;
}
