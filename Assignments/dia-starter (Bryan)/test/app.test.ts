/**
 * @fileoverview Tests for the App class.
 * @author your instructors
 * @lastUpdated 2024-01-04
 */

import { expect, test, describe } from 'vitest';
import { NullEngine, Scene } from '@babylonjs/core';
import { App } from '../src/app';

// create an App instance with a NullEngine
const engine = new NullEngine();
const app = new App(engine);

// create a scene with the App instance
// and store the promise for use in tests
const scenePromise = app.createScene();

// tests whether:
// - scene is created
// - scene has exactly 1 camera
// - scene has exactly 1 light
// - scene has exactly 1 mesh
describe('createScene() method on App instance returns a promise which will resolve to: ', () => {
    test('an instance of Scene', async () => {
        await expect(scenePromise).resolves.toBeInstanceOf(Scene);
    });
    test('which has a camera,', async () => {
        await expect(scenePromise).resolves.toHaveProperty('cameras.length', 1);
    });
    test('a light,', async () => {
        await expect(scenePromise).resolves.toHaveProperty('lights.length', 1);
    });
    test('and a mesh.', async () => {
        await expect(scenePromise).resolves.toHaveProperty('meshes.length', 1);
    });
});
