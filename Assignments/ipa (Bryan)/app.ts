// TODO everything required in the IPA
import {
    Engine,
    Scene,
    MeshBuilder,
    Vector3,
    StandardMaterial,
    Texture,
    HemisphericLight,
    Color3,
    GroundMesh,
    PointLight,
    FreeCamera,
    SceneLoader,
    PointerDragBehavior,
    CubeTexture
  } from '@babylonjs/core';
  import { AdvancedDynamicTexture, Button } from "@babylonjs/gui";
  import '@babylonjs/loaders';

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
  
    async createScene() {
        const scene = new Scene(this.engine);
        scene.useDelayedTextureLoading = true;
        // Create skybox
        const skybox = MeshBuilder.CreateBox('skybox', { size: 1000 }, scene);
        const skyboxMaterial = new StandardMaterial('skyboxMaterial', scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new CubeTexture("assets/textures/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;

        // Create ground
        const ground = MeshBuilder.CreateGround('ground', { width: 1600, height: 1600 }, scene) as GroundMesh;
        const groundMaterial = new StandardMaterial('groundMaterial', scene);
        groundMaterial.diffuseTexture = new Texture('assets/textures/grass.png', scene);
        const groundTexture = new Texture('assets/textures/grass.png', scene);
        groundMaterial.diffuseTexture = groundTexture as Texture;
        (groundMaterial.diffuseTexture as Texture).uScale = 320;
        (groundMaterial.diffuseTexture as Texture).vScale = 320;

        ground.material = groundMaterial;

        // Create hemispheric light
        const hemiLight = new HemisphericLight('hemispheric light', new Vector3(-1, 1, 0), scene);
        hemiLight.intensity = 0.5;
        hemiLight.diffuse = new Color3(0.6, 0.6, 1);
        hemiLight.groundColor = new Color3(128 / 255, 128 / 255, 32 / 255);

        // Create point light
        const pointLight = new PointLight('point light', new Vector3(0, 0.2, 0), scene);
        pointLight.intensity = 0.9;
        pointLight.diffuse = new Color3(1, 0.5, 0.5);
        pointLight.specular = new Color3(1, 0, 0);
        pointLight.setEnabled(true);

        // Create camera
        const camera = new FreeCamera('user camera', new Vector3(0, 1.6, -6), scene);
        scene.activeCamera = camera;
        camera.attachControl(this.engine.getRenderingCanvas(), true);

        // Create a cylinder
        const cylinder = MeshBuilder.CreateCylinder('cylinder', {
            height: 1,
            diameterTop: 0.5,
            diameterBottom: 1,
            tessellation: 36
        }, scene)
        cylinder.position = new Vector3(0, 0.75, 0);
        cylinder.isPickable = true;

        // Create a plane for the button
        const plane = MeshBuilder.CreatePlane('button plane', { width: 1, height: 0.5 }, scene);
        plane.position = new Vector3(2, 1, 0);

        // Create an AdvancedDynamicTexture for the button
        const advancedTexture = AdvancedDynamicTexture.CreateForMesh(plane, 400, 200, true);
        advancedTexture.name = 'button texture';

        // Create a button control
        const button = Button.CreateSimpleButton('button control', 'Hit!');
        button.width = "400px";
        button.height = "200px";
        button.color = "white";
        button.background = "green";
        button.cornerRadius = 360;
        button.fontSize = "100px";
        advancedTexture.addControl(button);

        // Add drag behavior to the cylinder
        const dragBehavior = new PointerDragBehavior({ dragPlaneNormal: new Vector3(0, 0, 1) });
        cylinder.addBehavior(dragBehavior);

        // Add a flag to control the light's state
        let buttonPressed = true;
        // Add a scene.onBeforeRenderObservable to detect the "button press" event
        scene.onBeforeRenderObservable.add(() => {
            if (plane.intersectsMesh(cylinder, true)) {
                if (!buttonPressed) {
                    // Change the flag only if the button was not already pressed
                    buttonPressed = true;
                    pointLight.intensity = 0; // Turn off the light
                }
            } else {
                if (buttonPressed) {
                    // Change the flag only if the button was previously pressed
                    buttonPressed = false;
                    pointLight.intensity = 0.9; // Turn on the light
                }
            }
        });
        
        let hasTapped = false; // Flag to detect if a tap has occurred
        // Add a scene.onBeforeRenderObservable to detect the "tap" event
        scene.onBeforeRenderObservable.add(() => {
            // Calculate the distance between the cylinder and the ground
            const distance = cylinder.position.y - ground.position.y;

            // When the cylinder is close enough to the ground to be considered a "tap"
            if (distance < 0.5 && !hasTapped) {
                // Change the dragon's color to a random color
                if (dragon.material && dragon.material instanceof StandardMaterial) {
                dragon.material.diffuseColor = Color3.Random();
                hasTapped = true; // Set the flag to true as the tap has occurred
                }
            }

            // If the cylinder moves away from the ground reset the hasTapped flag
            if (distance >= 0.5 && hasTapped) {
                hasTapped = false; // Reset the flag as the cylinder is no longer tapping the ground
            }
        });
        

        // Load a custom "dragon" object
        // The direct URL to the dragon.glb file
        const dragonUrl = "https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/Georgia-Tech-Dragon/dragon.glb";

        // Using SceneLoader to load the model directly from the URL
        const result = await SceneLoader.ImportMeshAsync("", dragonUrl, "", scene);
        const dragon = result.meshes[0];
        dragon.name = 'dragon';
        dragon.position = new Vector3(0, 0, 5);
        dragon.scaling = new Vector3(50, 50, 50);
        const dragonMaterial = new StandardMaterial('dragonMat', scene);
        dragonMaterial.diffuseColor = new Color3(1, 0, 0); // Initial color
        result.meshes.forEach((mesh) => {
            mesh.material = dragonMaterial;
        });
    

        return scene;
    }
  }
  
