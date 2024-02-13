import type { IDrawContext } from "../Engines/IDrawContext";
import type { IMaterialContext } from "../Engines/IMaterialContext";
import type { Nullable } from "../types";
import type { ThinEngine } from "../Engines/thinEngine";
import type { Effect } from "./effect";
import type { MaterialDefines } from "./materialDefines";
/** @internal */
export declare class DrawWrapper {
    effect: Nullable<Effect>;
    defines: Nullable<string | MaterialDefines>;
    materialContext?: IMaterialContext;
    drawContext?: IDrawContext;
    static IsWrapper(effect: Effect | DrawWrapper): effect is DrawWrapper;
    static GetEffect(effect: Effect | DrawWrapper): Nullable<Effect>;
    constructor(engine: ThinEngine, createMaterialContext?: boolean);
    setEffect(effect: Nullable<Effect>, defines?: Nullable<string | MaterialDefines>, resetContext?: boolean): void;
    dispose(): void;
}
