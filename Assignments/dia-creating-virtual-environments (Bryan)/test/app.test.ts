/**
 * @fileoverview Tests for the App class.
 * @author your instructors
 * @lastUpdated 2024-01-19
 */

import { expect, test, describe, vi } from 'vitest';
import { Mesh, MeshBuilder, NullEngine, Scene } from '@babylonjs/core';
import { AdvancedDynamicTexture, TextBlock } from '@babylonjs/gui';
import { App } from '../src/app';
import * as hello from '../src/hello';

// create a new App instance with a NullEngine
const engine = new NullEngine();
const app = new App(engine);

// tests whether:
// - the App class has a "createScene()" method
// - the "createScene()" method returns a promise
// - the promise resolves to an instance of Scene
// - the Scene instance has a camera, a light, and a mesh
describe('"createScene()" method on App instance returns a promise which will resolve to:', async () => {
    const scenePromise = app.createScene();
    // resolve the promise here so that it can be used in
    // multiple tests and not will not be blocking other test suites
    const scene = await scenePromise;

    test('an instance of Scene, which at least has', () => {
        expect(scene).toBeInstanceOf(Scene);
    });
    test('a camera,', () => {
        expect(scene).toHaveProperty('cameras');
        expect(scene.cameras.length).toBeGreaterThanOrEqual(1);
    });
    test('a light,', () => {
        expect(scene).toHaveProperty('lights');
        expect(scene.lights.length).toBeGreaterThanOrEqual(1);
    });
    test('and a mesh.', () => {
        expect(scene).toHaveProperty('meshes');
        expect(scene.meshes.length).toBeGreaterThanOrEqual(1);
    });
});

// tests whether the scene:
// - has a sphere mesh named "sphere"
// - has a plane mesh named "hello plane"
// - has a texture named "hello texture"
// - has a text control named "hello text" containing the text created
//   by the "createHelloMessage()" function
//
describe('The Scene instance should have:', async () => {
    const sphereSpy = vi.spyOn(MeshBuilder, 'CreateSphere');
    const planeSpy = vi.spyOn(MeshBuilder, 'CreatePlane');
    const helloSpy = vi.spyOn(hello, 'createHelloMessage');

    const scene = await app.createScene();

    describe('primitive meshes created by "MeshBuilder", including:', () => {
        test('a sphere mesh named "sphere"', () => {
            const sphere = scene.getMeshByName('sphere') as Mesh;
            expect(sphere).not.toBeNull();
            expect(sphereSpy).toHaveBeenCalled();
            expect(sphereSpy).toHaveReturnedWith(sphere);
        });
        test('and a plane mesh named "hello plane",', () => {
            const plane = scene.getMeshByName('hello plane') as Mesh;
            expect(plane).not.toBeNull();
            expect(planeSpy).toHaveBeenCalled();
            expect(planeSpy).toHaveReturnedWith(plane);
        });
    });
    describe('showing a message of "Hello, XR!" using:', () => {
        test('an "AdvancedDynamicTexture" named "hello texture",', () => {
            const texture = scene.getTextureByName('hello texture') as AdvancedDynamicTexture;
            expect(texture).not.toBeNull();
        });
        test('a "TextBlock" named "hello text"', () => {
            const texture = scene.getTextureByName('hello texture') as AdvancedDynamicTexture;
            expect(texture).not.toBeNull();
            const control = texture.getControlByName('hello text') as TextBlock;
            expect(control).not.toBeNull();
            expect(control).toHaveProperty('text', 'Hello, XR!');
        });
        test('and a string created by the "createHelloMessage()" function', () => {
            expect(helloSpy).toHaveBeenCalled();
            expect(helloSpy).toHaveBeenLastCalledWith('XR');
        });
    });
});
