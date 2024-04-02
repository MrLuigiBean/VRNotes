// Import Babylon.js modules and external dependencies
import {
	Engine,
	Scene,
	Vector3,
	PointLight,
	MeshBuilder,
	StandardMaterial,
	CubeTexture,
	Texture,
	Color3,
	HemisphericLight,
	FreeCamera,
	SceneLoader,
	PointerDragBehavior,
	Observable,
	SphereBlock,
} from "@babylonjs/core"

import {
	AdvancedDynamicTexture,
	Button,
	TextBlock,
} from "@babylonjs/gui"

import '@babylonjs/loaders'

// App class
// - this is the main class for the web application
export class App {
	// the BabylonJS engine
	private engine: Engine

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
		scene.useDelayedTextureLoading = true

		// const xr = await scene.createDefaultXRExperienceAsync({
		// 	uiOptions: {
		// 		sessionMode: 'immersive-vr'
		// 	}
		// })
		// (window as any).xr = xr

		this.createSkyBox(scene)

		this.createGround(scene)

		var hemiLight = new HemisphericLight("hemispheric light", new Vector3(-1, 1, 0), scene);
		hemiLight.intensity = 0.5
		hemiLight.diffuse = new Color3(0.6, 0.6, 1)
		hemiLight.groundColor = new Color3(128 / 255, 128 / 255, 32 / 255)

		var pointLight = new PointLight("point light", Vector3.Zero(), scene);
		pointLight.position = new Vector3(0, 0.2, 0)
		pointLight.intensity = 0.9
		pointLight.diffuse = new Color3(1, 0.5, 0.5)
		pointLight.specular = new Color3(1, 0, 0)

		// I NEED THE CAMERA TO SEE THINGSSSSS
		var camera = new FreeCamera("user camera", new Vector3(0, 0, -15), scene)
		camera.position = new Vector3(0, 1.6, -6)

		var cylinder = MeshBuilder.CreateCylinder("cylinder", { height: 1, diameterTop: 0.5, diameterBottom: 1, tessellation: 36 }, scene)
		cylinder.position = new Vector3(0, 0.75, 0)
		cylinder.addBehavior(new PointerDragBehavior())

		var buttonPlane = this.createButton(scene)
		
		const onIntersectObservable = new Observable<boolean>
		scene.registerBeforeRender(function () {
			const isIntersecting = cylinder.intersectsMesh(buttonPlane, true, true)
			onIntersectObservable.notifyObservers(isIntersecting)
		})
		
		this.createDragon(scene) // SO CLOSE...

		for (let index = 0; index < scene.meshes.length; index++) {
			const element = scene.meshes[index];
			console.log(element.name)
		}

		return scene
	}

	createSkyBox(scene: Scene) {
		const skybox = MeshBuilder.CreateBox("skybox", { size: 1000 }, scene)
		skybox.position = Vector3.Zero()

		const skyboxMaterial = new StandardMaterial("skyboxMaterial")
		skyboxMaterial.backFaceCulling = false
		skyboxMaterial.reflectionTexture = new CubeTexture("assets/textures/skybox", scene)
		skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE
		skyboxMaterial.diffuseColor = new Color3(0, 0, 0)
		skyboxMaterial.specularColor = new Color3(0, 0, 0)
		skyboxMaterial.disableLighting = true
		skybox.material = skyboxMaterial
	}

	createGround(scene: Scene) {
		var groundPlane = MeshBuilder.CreateGround("ground", { width: 1600, height: 1600 }, scene)
		groundPlane.position = Vector3.Zero()

		var groundMat = new StandardMaterial("groundMat", scene)
		groundMat.backFaceCulling = true

		var texture = new Texture("assets/textures/grass.png", scene)
		texture.uScale = 320
		texture.vScale = 320

		groundMat.diffuseTexture = texture

		groundPlane.material = groundMat
	}

	createButton(scene: Scene) {
		var buttonPlane = MeshBuilder.CreatePlane("button plane", { width: 1, height: 0.5 }, scene)
		buttonPlane.position = new Vector3(2, 1, 0)

		var texture = AdvancedDynamicTexture.CreateForMesh(buttonPlane)
		texture.name = "button texture"

		var control = new Button("button control")
		control.background = "green"

		texture.addControl(control)

		// create text block
		var textBlock = new TextBlock("hello text", "Hit!")
		texture.addControl(textBlock)		

		return buttonPlane
	}

	createDragon(scene: Scene) {
		const meshURL = "https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/Georgia-Tech-Dragon/dragon.glb"
		const string1 = ""
		const string2 = "https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/Georgia-Tech-Dragon/"
		const string3 = "dragon.glb"

		SceneLoader.ImportMesh("", string2, string3, scene, function (newMeshes) {
			var mesh = newMeshes[0]
			newMeshes[0].position = new Vector3(0, 0, 5)
			newMeshes[0].scaling = new Vector3(50, 50, 50)
			newMeshes[0].name = "dragon"
			console.log("hi " + newMeshes[0])
			scene.addMesh(mesh)

			for (let index = 0; index < scene.meshes.length; index++) {
				const element = scene.meshes[index];
				console.log(element.name)
			}

		}, undefined, undefined, ".glb", "dragon")

		// https://forum.babylonjs.com/t/i-want-to-ask-how-to-load-the-model-that-is-on-the-server-that-is-the-model-returned-from-the-back-end-to-the-front-end-is-a-url-without-a-model-name-so-i-don-t-know-how-to-load-it/36547/9
		// SceneLoader.ImportMesh(
		// 	"",
		// 	"",
		// 	"https://shuquan-static.oss-cn-hangzhou.aliyuncs.com/u/pi/AYBlkLZDR4eHdiJHKI5SLQ/SZuRYxYWx7IR/0",
		// 	scene,
		// 	function (meshes: any) {
		// 	  console.log(meshes);
		// 	},
		// 	undefined,
		// 	undefined,
		// 	".glb"
		//   );
		//   return scene;
		// };

	}
}
