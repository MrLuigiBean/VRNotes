/**
 * Babylon.js Web Application
 * 
 * This TypeScript file defines a simple web application using the Babylon.js library.
 * It creates a 3D scene with a camera, light, and various meshes, including an IcoSphere,
 * a sphere, and a plane with dynamic text. The application continuously updates the scene
 * to make the IcoSphere rotate and the sphere spin in circles.
 * 
 * The code structure follows the Babylon.js framework and uses asynchronous functions
 * to create and update the scene. The main class, `App`, encapsulates the application's
 * functionality, including scene creation and updates.
 * 
 * @version 1.0
 * @author Prashanth Subrahmanyam Sharma
 */
// Import Babylon.js modules and external dependencies
import {
	Engine,
	Scene,
	UniversalCamera,
	Vector3,
	PointLight,
	MeshBuilder
} from "@babylonjs/core"

import {
	AdvancedDynamicTexture,
	TextBlock
} from "@babylonjs/gui"

import { createHelloMessage } from "./hello"

// App class
// - this is the main class for the web application
export class App {
	// the BabylonJS engine
	private engine: Engine
	private appTimer: number = 0

	/**
	 * Constructor to create the App object with an engine.
	 * @param engine The Babylon engine to use for the application.
	 */
	constructor(engine: Engine) {
		this.engine = engine
	}

	/**
	 * Create the scene.
	 * @returns A promise that resolves when the application is done running.
	 * @remarks This is the main entry point for the application.
	 */
	async createScene() {
		// thanks to https://doc.babylonjs.com/journey/theFirstStep#the-babylonjs-playground

		// create an empty scene
		var scene = new Scene(this.engine)

		// create camera
		new UniversalCamera("Camera", new Vector3(0, 0, -15), scene)

		// create light
		new PointLight("PointLight", new Vector3(0, 10, 0), scene)

		// create icoSphere mesh (for fun :D)
		var options = { radius: 2, subdivisions: 3 }
		MeshBuilder.CreateIcoSphere("IcoSphere", options, scene)

		// =================================================================================

		// create sphere
		var sphere = MeshBuilder.CreateSphere("sphere", {}, scene)
		sphere.position = Vector3.Forward()

		// create plane
		var plane = MeshBuilder.CreatePlane("hello plane", {}, scene)
		plane.addRotation(0, Math.PI / 2, 0)

		// create texture (for plane)
		var texture = AdvancedDynamicTexture.CreateForMesh(plane)
		texture.name = "hello texture"

		// create text block
		var textBlock = new TextBlock("hello text", createHelloMessage("XR"))

		// add the text to the texture
		texture.addControl(textBlock)

		// return modified scene
		return scene
	}

	/**
	 * Makes the first mesh in a scene rotate on changing axes over time.
	 */
	async updateScene() {
		this.appTimer += this.engine.getTimeStep()

		// #region Make IcoSphere rotate
		{
			var meshArray = this.engine.scenes[0].getActiveMeshes()
			var firstMesh = meshArray.data[0]

			const start: Vector3 = new Vector3(-0.5, 0.5, 0)
			const end: Vector3 = new Vector3(0.5, 0.5, 0)

			const period: number = 350
			const lerpValue: number = Math.sin(this.appTimer / period)
			const rotAxis: Vector3 = Vector3.Lerp(start, end, lerpValue)

			const rotSpeed: number = -0.05
			firstMesh.rotate(rotAxis, rotSpeed)
		}
		// #endregion

		// #region Make sphere spin in circles
		{
			var sphere = this.engine.scenes[0].getMeshByName("sphere")
			if (sphere) {
				const radius: number = 3
				const period: number = 350
				sphere.position.x = radius * Math.cos(this.appTimer / period)
				sphere.position.y = radius * Math.cos(this.appTimer / period) // ORBIT!!!
				sphere.position.z = radius * Math.sin(this.appTimer / period)
			}
		}
		// #endregion
	}
}
