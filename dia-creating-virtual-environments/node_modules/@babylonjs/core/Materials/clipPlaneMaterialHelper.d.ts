import type { Effect } from "./effect";
import type { IClipPlanesHolder } from "../Misc/interfaces/iClipPlanesHolder";
/** @internal */
export declare function addClipPlaneUniforms(uniforms: string[]): void;
/** @internal */
export declare function prepareStringDefinesForClipPlanes(primaryHolder: IClipPlanesHolder, secondaryHolder: IClipPlanesHolder, defines: string[]): void;
/** @internal */
export declare function prepareDefinesForClipPlanes(primaryHolder: IClipPlanesHolder, secondaryHolder: IClipPlanesHolder, defines: Record<string, any>): boolean;
/** @internal */
export declare function bindClipPlane(effect: Effect, primaryHolder: IClipPlanesHolder, secondaryHolder: IClipPlanesHolder): void;
