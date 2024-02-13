import type { WebXRAbstractMotionController } from "./webXRAbstractMotionController";
import type { Scene } from "../../scene";
/**
 * A construction function type to create a new controller based on an xrInput object
 */
export type MotionControllerConstructor = (xrInput: XRInputSource, scene: Scene) => WebXRAbstractMotionController;
/**
 * Motion controller manager is managing the different webxr profiles and makes sure the right
 * controller is being loaded.
 */
export declare class WebXRMotionControllerManager {
    private static _AvailableControllers;
    private static _Fallbacks;
    private static _ProfileLoadingPromises;
    private static _ProfilesList;
    /**
     * The base URL of the online controller repository. Can be changed at any time.
     */
    static BaseRepositoryUrl: string;
    /**
     * Which repository gets priority - local or online
     */
    static PrioritizeOnlineRepository: boolean;
    /**
     * Use the online repository, or use only locally-defined controllers
     */
    static UseOnlineRepository: boolean;
    /**
     * Disable the controller cache and load the models each time a new WebXRProfileMotionController is loaded.
     * Defaults to true.
     */
    static DisableControllerCache: boolean;
    /**
     * Clear the cache used for profile loading and reload when requested again
     */
    static ClearProfilesCache(): void;
    /**
     * Register the default fallbacks.
     * This function is called automatically when this file is imported.
     */
    static DefaultFallbacks(): void;
    /**
     * Find a fallback profile if the profile was not found. There are a few predefined generic profiles.
     * @param profileId the profile to which a fallback needs to be found
     * @returns an array with corresponding fallback profiles
     */
    static FindFallbackWithProfileId(profileId: string): string[];
    /**
     * When acquiring a new xrInput object (usually by the WebXRInput class), match it with the correct profile.
     * The order of search:
     *
     * 1) Iterate the profiles array of the xr input and try finding a corresponding motion controller
     * 2) (If not found) search in the gamepad id and try using it (legacy versions only)
     * 3) search for registered fallbacks (should be redundant, nonetheless it makes sense to check)
     * 4) return the generic trigger controller if none were found
     *
     * @param xrInput the xrInput to which a new controller is initialized
     * @param scene the scene to which the model will be added
     * @param forceProfile force a certain profile for this controller
     * @returns A promise that fulfils with the motion controller class for this profile id or the generic standard class if none was found
     */
    static GetMotionControllerWithXRInput(xrInput: XRInputSource, scene: Scene, forceProfile?: string): Promise<WebXRAbstractMotionController>;
    /**
     * Register a new controller based on its profile. This function will be called by the controller classes themselves.
     *
     * If you are missing a profile, make sure it is imported in your source, otherwise it will not register.
     *
     * @param type the profile type to register
     * @param constructFunction the function to be called when loading this profile
     */
    static RegisterController(type: string, constructFunction: MotionControllerConstructor): void;
    /**
     * Register a fallback to a specific profile.
     * @param profileId the profileId that will receive the fallbacks
     * @param fallbacks A list of fallback profiles
     */
    static RegisterFallbacksForProfileId(profileId: string, fallbacks: string[]): void;
    /**
     * Will update the list of profiles available in the repository
     * @returns a promise that resolves to a map of profiles available online
     */
    static UpdateProfilesList(): Promise<{
        [profile: string]: string;
    }>;
    /**
     * Clear the controller's cache (usually happens at the end of a session)
     */
    static ClearControllerCache(): void;
    private static _LoadProfileFromRepository;
    private static _LoadProfilesFromAvailableControllers;
}
