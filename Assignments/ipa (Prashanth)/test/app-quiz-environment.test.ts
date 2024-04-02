/**
 * @fileoverview Tests for populating creatingthe virtual environment.
 * @author your instructors
 * @lastUpdated 2024-03-13
 */

import { expect, test, describe, vi } from 'vitest';
import { Mesh, MeshBuilder, NullEngine, Scene, Vector3 } from '@babylonjs/core';
import { App } from '../src/app';
import { AdvancedDynamicTexture, Button } from '@babylonjs/gui';

const engine = new NullEngine();
const app = new App(engine);

/**
 * The following tests are for populating the virtual environment:
 * - a "cylinder" object
 * - a "button" object implemented with a textured plane
 * - a custom "dragon" object implemented with the Georgia Tech `dragon.glb` mesh from https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/Georgia-Tech-Dragon/dragon.glb
 * 
 * Note that you'd need to ensure the properties of the objects are as expected,
 * e.g., the position, size, and texture of the objects.
 */
describe('Next let\'s *populate the virtual environment*, which should be:', async () => {
    const cylinderSpy = vi.spyOn(MeshBuilder, 'CreateCylinder');
    const scene = await app.createScene();

    test('in an existing instance of Scene,', () => {
        expect(scene).toBeInstanceOf(Scene);
    });
    describe('with:', () => {
        test('a "cylinder" object,', () => {
            // should be named "cylinder"
            const cylinder = scene.getMeshByName('cylinder')! as Mesh;
            expect(cylinder).not.toBeNull();
            expect(cylinder).toBeInstanceOf(Mesh);
            // should be created by MeshBuilder.CreateCylinder
            expect(cylinderSpy).toHaveBeenCalled();
            expect(cylinderSpy).toHaveReturnedWith(cylinder);
            // with expected properties
            // need to pass the hosting scene instance to the MeshBuilder function
            expect(cylinderSpy).toHaveBeenCalledWith(
                'cylinder',
                expect.objectContaining({ height: 1, diameterTop: 0.5, diameterBottom: 1, tessellation: 36 }),
                scene);
            // a bit above the point light
            expect(cylinder.position.toString()).toEqual(new Vector3(0, 0.75, 0).toString());
        });
        test('a "button" object implemented with a textured plane,', () => {
            // we need a plane to create a button as a texture mode GUI,
            // which should be named "button plane"
            const plane = scene.getMeshByName('button plane') as Mesh;
            expect(plane).not.toBeNull()
            expect(plane).toBeInstanceOf(Mesh);
            expect(plane.position.toString()).toEqual(new Vector3(2, 1, 0).toString());
            expect(plane.getBoundingInfo().boundingBox.extendSize.scale(2).toString()).toEqual(new Vector3(1, 0.5, 0).toString());

            // with an AdvancedDynamicTexture named "button texture"
            const texture = scene.getTextureByName('button texture') as AdvancedDynamicTexture;
            expect(texture).not.toBeNull();
            expect(texture).toBeInstanceOf(AdvancedDynamicTexture);

            // and a Button control named "button control"
            const control = texture.getControlByName('button control') as Button;
            expect(control).not.toBeNull();
            expect(control).toBeInstanceOf(Button);
            expect(control.background).toBe('green');

        });
        test('a custom "dragon" object implemented by the Georgia Tech `dragon.glb`', async () => {
            const dragon = await vi.waitUntil(
                () => scene.getMeshByName('dragon')! as Mesh,
                { timeout: 60000, interval: 1000 }
            );
            expect(dragon).not.toBeNull();
            expect(dragon).toBeInstanceOf(Mesh);
            expect(dragon.position.toString()).toEqual(new Vector3(0, 0, 5).toString());
            expect(dragon.scaling.toString()).toEqual(new Vector3(50, 50, 50).toString());
        });
    });
});
