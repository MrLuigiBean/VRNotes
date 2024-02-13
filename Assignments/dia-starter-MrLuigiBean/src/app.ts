/**
 * @fileoverview The main application class for the project.
 * @author your instructors
 * @lastUpdated 2024-01-04
 */

import {
	Engine,
	Scene,
	UniversalCamera,
	Vector3,
	PointLight,
	MeshBuilder
} from "@babylonjs/core"

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
		new UniversalCamera("Camera", new Vector3(0, 5, -10), scene)

		// create light
		new PointLight("PointLight", new Vector3(0, 10, 0), scene)

		// create primitive mesh
		var options = { radius: 2, subdivisions: 3 }
		MeshBuilder.CreateIcoSphere("IcoSphere", options, scene)

		// return modified scene
		return scene
	}

	/**
	 * Makes the first mesh in a scene rotate on changing axes over time.
	 */	
	async updateScene() {
		this.appTimer += this.engine.getTimeStep()

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
}
