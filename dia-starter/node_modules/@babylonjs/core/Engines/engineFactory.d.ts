import { Engine } from "./engine";
/**
 * Helper class to create the best engine depending on the current hardware
 */
export declare class EngineFactory {
    /**
     * Creates an engine based on the capabilities of the underlying hardware
     * @param canvas Defines the canvas to use to display the result
     * @param options Defines the options passed to the engine to create the context dependencies
     * @returns a promise that resolves with the created engine
     */
    static CreateAsync(canvas: HTMLCanvasElement, options: any): Promise<Engine>;
}
