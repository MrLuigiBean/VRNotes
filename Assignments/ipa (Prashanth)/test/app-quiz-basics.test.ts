/**
 * @fileoverview Tests for creating the basic scene.
 * @author your instructors
 * @lastUpdated 2024-03-13
 */

import { expect, test, describe } from 'vitest';
import { Color3, FreeCamera, GroundMesh, HemisphericLight, Mesh, NullEngine, PointLight, Scene, StandardMaterial, Texture, Vector3 } from '@babylonjs/core';
import { App } from '../src/app';

const engine = new NullEngine();
const app = new App(engine);

/**
 * The following tests are for the basic scene:
 * - a skybox with the given skybox textures in the `assets` folder
 * - a large ground plane with the given grass texture in the assets folder
 * - a hemispheric light source
 * - a point light source to illuminate the center of the ground
 * - a camera that represents the user
 *
 * Note that you'd need to ensure the properties of the objects are as expected,
 * e.g., the position, size, and texture of the objects.
 */
describe('First, create a *basic scene*, which should be:', async () => {
    const scene = await app.createScene();

    test('an instance of Scene,', () => {
        expect(scene).toBeInstanceOf(Scene);
    });
    describe('with:', () => {
        test('- a "skybox" with the given skybox textures in the `assets` folder,', () => {
            // should be named "skybox"
            const skybox = scene.getMeshByName('skybox')! as Mesh;
            expect(skybox).not.toBeNull();
            expect(skybox).toBeInstanceOf(Mesh);
            // the skybox is at the world origin
            expect(skybox.position.toString()).toEqual(Vector3.Zero().toString());
            // extendSize is the half of the size of the box
            expect(skybox.getBoundingInfo().boundingBox.extendSize.scale(2).toString()).toEqual(new Vector3(1000, 1000, 1000).toString());
            // use the StandardMaterial, the default material in babylon.js
            const material = skybox.material! as StandardMaterial;
            expect(material).not.toBeNull();
            // it can be some other material, but we are going to use the StandardMaterial
            expect(material).toBeInstanceOf(StandardMaterial);
            // to see the texture from the inside
            expect(material.backFaceCulling).toBe(false);
            // the reflection texture is used to create the skybox
            expect(material.reflectionTexture).not.toBeNull();
            // check if the correct url/path is used
            expect(material.reflectionTexture).toHaveProperty('url', 'assets/textures/skybox');
            // check the texture mapping mode
            expect(material.reflectionTexture).toHaveProperty('coordinatesMode', Texture.SKYBOX_MODE);
            // no need for lighting, otherwise the skybox will look like a textured cube
            expect(material.disableLighting).toBe(true);
        });
        test('- a large "ground" plane with the given grass texture in the assets folder,', () => {
            // should be named "ground"
            const ground = scene.getMeshByName('ground')! as GroundMesh;
            expect(ground).not.toBeNull();
            expect(ground).toBeInstanceOf(GroundMesh);
            // the ground is at the world origin
            expect(ground.position.toString()).toEqual(Vector3.Zero().toString());
            // should be large enough to cover the skybox
            expect(ground._width).toBe(1600);
            expect(ground._height).toBe(1600);
            // use the StandardMaterial, the default material in babylon.js
            const material = ground.material! as StandardMaterial;
            expect(material).not.toBeNull();
            // it can be some other material, but we are going to use the StandardMaterial
            expect(material).toBeInstanceOf(StandardMaterial);
            // no need to see the texture from the back side
            expect(material.backFaceCulling).toBe(true);
            // the diffuse texture is used to create the ground
            expect(material.diffuseTexture).not.toBeNull();
            // check if the correct url/path is used
            expect(material.diffuseTexture).toHaveProperty('url', 'assets/textures/grass.png');
            // check tiling: the texture should be repeated n times in both directions
            expect(material.diffuseTexture).toHaveProperty('uScale', 320);
            expect(material.diffuseTexture).toHaveProperty('vScale', 320);
        });
        test('- a "hemispheric light" source,', () => {
            // should be named "hemispheric light"
            const light = scene.getLightByName('hemispheric light')! as HemisphericLight;
            expect(light).not.toBeNull();
            expect(light).toBeInstanceOf(HemisphericLight);
            // ambient light from the top left
            expect(light.direction.toString()).toEqual(new Vector3(-1, 1, 0).toString());
            // dimmer the ambient light
            expect(light.intensity).toBe(0.5);
            // purple diffuse light
            expect(light.diffuse).toEqual(new Color3(0.6, 0.6, 1));
            // greenish color from the ground, since we use a grass texture
            // hex color: #808020
            // rgb color: rgb(128, 128, 32)
            // babylon.js color: new Color3(128/255, 128/255, 32/255)
            expect(light.groundColor.toHexString()).toEqual('#808020');
        });
        test('- a "point light" source to illuminate the center of the ground,', () => {
            // should be named "point light"
            const light = scene.getLightByName('point light')! as PointLight;
            expect(light).not.toBeNull();
            // a point light like a light bulb
            expect(light).toBeInstanceOf(PointLight);
            // to illuminate the center of the ground
            // a bit above the ground to see the diffuse color
            expect(light.position.toString()).toEqual(new Vector3(0, 0.2, 0).toString());
            // brighter than the ambient light
            expect(light.intensity).toBe(0.9);
            // a bit reddish diffuse color
            expect(light.diffuse).toEqual(new Color3(1, 0.5, 0.5));
            // red specular color to see a light reflection on the ground
            expect(light.specular).toEqual(new Color3(1, 0, 0));
        });
        test('- a camera that represents the user,', () => {
            // the current active camera is the user camera
            const camera = scene.activeCamera!;
            expect(camera).not.toBeNull();
            // should be named "user camera"
            expect(camera.name).toBe('user camera');
            // y: eye level, z: backward from the world origin
            expect(camera.position.toString()).toEqual(new Vector3(0, 1.6, -6).toString());
            // need a free camera to move around
            expect(camera).toBeInstanceOf(FreeCamera);
            // check if any attached controls to the camera, such as mouse, keyboard, touch, etc.
            expect(camera.inputs.attached).not.toBeNull();
        });
    });
});
