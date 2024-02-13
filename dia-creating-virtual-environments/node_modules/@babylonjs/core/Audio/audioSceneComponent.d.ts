import { Sound } from "./sound";
import { SoundTrack } from "./soundTrack";
import type { Nullable } from "../types";
import { Vector3 } from "../Maths/math.vector";
import type { ISceneSerializableComponent } from "../sceneComponent";
import { Scene } from "../scene";
import { AbstractScene } from "../abstractScene";
import "./audioEngine";
declare module "../abstractScene" {
    interface AbstractScene {
        /**
         * The list of sounds used in the scene.
         */
        sounds: Nullable<Array<Sound>>;
    }
}
declare module "../scene" {
    interface Scene {
        /**
         * @internal
         * Backing field
         */
        _mainSoundTrack: SoundTrack;
        /**
         * The main sound track played by the scene.
         * It contains your primary collection of sounds.
         */
        mainSoundTrack: SoundTrack;
        /**
         * The list of sound tracks added to the scene
         * @see https://doc.babylonjs.com/features/featuresDeepDive/audio/playingSoundsMusic
         */
        soundTracks: Nullable<Array<SoundTrack>>;
        /**
         * Gets a sound using a given name
         * @param name defines the name to search for
         * @returns the found sound or null if not found at all.
         */
        getSoundByName(name: string): Nullable<Sound>;
        /**
         * Gets or sets if audio support is enabled
         * @see https://doc.babylonjs.com/features/featuresDeepDive/audio/playingSoundsMusic
         */
        audioEnabled: boolean;
        /**
         * Gets or sets if audio will be output to headphones
         * @see https://doc.babylonjs.com/features/featuresDeepDive/audio/playingSoundsMusic
         */
        headphone: boolean;
        /**
         * Gets or sets custom audio listener position provider
         * @see https://doc.babylonjs.com/features/featuresDeepDive/audio/playingSoundsMusic
         */
        audioListenerPositionProvider: Nullable<() => Vector3>;
        /**
         * Gets or sets custom audio listener rotation provider
         * @see https://doc.babylonjs.com/features/featuresDeepDive/audio/playingSoundsMusic
         */
        audioListenerRotationProvider: Nullable<() => Vector3>;
        /**
         * Gets or sets a refresh rate when using 3D audio positioning
         */
        audioPositioningRefreshRate: number;
    }
}
/**
 * Defines the sound scene component responsible to manage any sounds
 * in a given scene.
 */
export declare class AudioSceneComponent implements ISceneSerializableComponent {
    private static _CameraDirection;
    /**
     * The component name helpful to identify the component in the list of scene components.
     */
    readonly name = "Audio";
    /**
     * The scene the component belongs to.
     */
    scene: Scene;
    private _audioEnabled;
    /**
     * Gets whether audio is enabled or not.
     * Please use related enable/disable method to switch state.
     */
    get audioEnabled(): boolean;
    private _headphone;
    /**
     * Gets whether audio is outputting to headphone or not.
     * Please use the according Switch methods to change output.
     */
    get headphone(): boolean;
    /**
     * Gets or sets a refresh rate when using 3D audio positioning
     */
    audioPositioningRefreshRate: number;
    /**
     * Gets or Sets a custom listener position for all sounds in the scene
     * By default, this is the position of the first active camera
     */
    audioListenerPositionProvider: Nullable<() => Vector3>;
    /**
     * Gets or Sets a custom listener rotation for all sounds in the scene
     * By default, this is the rotation of the first active camera
     */
    audioListenerRotationProvider: Nullable<() => Vector3>;
    /**
     * Creates a new instance of the component for the given scene
     * @param scene Defines the scene to register the component in
     */
    constructor(scene?: Nullable<Scene>);
    /**
     * Registers the component in a given scene
     */
    register(): void;
    /**
     * Rebuilds the elements related to this component in case of
     * context lost for instance.
     */
    rebuild(): void;
    /**
     * Serializes the component data to the specified json object
     * @param serializationObject The object to serialize to
     */
    serialize(serializationObject: any): void;
    /**
     * Adds all the elements from the container to the scene
     * @param container the container holding the elements
     */
    addFromContainer(container: AbstractScene): void;
    /**
     * Removes all the elements in the container from the scene
     * @param container contains the elements to remove
     * @param dispose if the removed element should be disposed (default: false)
     */
    removeFromContainer(container: AbstractScene, dispose?: boolean): void;
    /**
     * Disposes the component and the associated resources.
     */
    dispose(): void;
    /**
     * Disables audio in the associated scene.
     */
    disableAudio(): void;
    /**
     * Enables audio in the associated scene.
     */
    enableAudio(): void;
    /**
     * Switch audio to headphone output.
     */
    switchAudioModeForHeadphones(): void;
    /**
     * Switch audio to normal speakers.
     */
    switchAudioModeForNormalSpeakers(): void;
    private _cachedCameraDirection;
    private _cachedCameraPosition;
    private _lastCheck;
    private _invertMatrixTemp;
    private _cameraDirectionTemp;
    private _afterRender;
}
