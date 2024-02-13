import type { Scene } from "../scene";
/**
 * Class used to record delta files between 2 scene states
 */
export declare class SceneRecorder {
    private _trackedScene;
    private _savedJSON;
    /**
     * Track a given scene. This means the current scene state will be considered the original state
     * @param scene defines the scene to track
     */
    track(scene: Scene): void;
    /**
     * Get the delta between current state and original state
     * @returns a any containing the delta
     */
    getDelta(): any;
    private _compareArray;
    private _compareObjects;
    private _compareCollections;
    private static GetShadowGeneratorById;
    /**
     * Apply a given delta to a given scene
     * @param deltaJSON defines the JSON containing the delta
     * @param scene defines the scene to apply the delta to
     */
    static ApplyDelta(deltaJSON: any | string, scene: Scene): void;
    private static _ApplyPropertiesToEntity;
    private static _ApplyDeltaForEntity;
}
