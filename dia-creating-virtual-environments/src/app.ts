// TODO everything required for the App class to pass the tests in app.test.ts
/**
 * @fileoverview The main application class for the project.
 * @author your instructors
 * @lastUpdated 2024-01-04
 */

import {
    Engine,
    FreeCamera,
    HemisphericLight,
    MeshBuilder,
    Scene,
    Vector3,
} from "@babylonjs/core";
import { AdvancedDynamicTexture, TextBlock } from "@babylonjs/gui";
import { createHelloMessage } from "./hello";

// App class
// - this is the main class for the web application
export class App {
    // the BabylonJS engine
    private engine: Engine;

    /**
     * Constructor to create the App object with an engine.
     * @param engine The Babylon engine to use for the application.
     */
    constructor(engine: Engine) {
        this.engine = engine;
    }

    /**
     * Create the scene.
     * @returns A promise that resolves when the application is done running.
     * @remarks This is the main entry point for the application.
     *
     * TODO the necessary code to create and return a scene with the following:
     *      1. Exactly 1 camera
     *      2. Exactly 1 light
     *      3. Exactly 1 primitive mesh (sphere, box, etc.)
     *      See BabylonJS documentation for more information:
     *      https://doc.babylonjs.com/
     */
    async createScene() {

        // Create a BabylonJS scene
        const scene = new Scene(this.engine);
        // Create a BabylonJS free camera in the scene
        const camera = new FreeCamera('camera', new Vector3(0, 5, -10), scene);
        // Create a BabylonJS light in the scene
        const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
        // Create a BabylonJS box in the scene
        const box = MeshBuilder.CreateBox('box', { size: 2 }, scene);
        // Create a sphere mesh
        const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
        // Create a plane mesh
        const plane = MeshBuilder.CreatePlane('hello plane', { width: 5, height: 5 }, scene);
        // Create a Texture
        const texture = AdvancedDynamicTexture.CreateFullscreenUI('hello texture');
        // Create a Textbox
        const textBlock = new TextBlock('hello text', 'Hello, XR!');
        // add textbox to texture
        texture.addControl(textBlock);
        //create hello xr message
        createHelloMessage('XR')

        return scene;
    }
}
