/**
 * @fileoverview Tests for implementing interactions on the objects.
 * @author your instructors
 * @lastUpdated 2024-03-13
 */

import { expect, test, describe, vi, beforeAll } from 'vitest';
import { Color3, Mesh, NullEngine, PointLight, Scene, StandardMaterial } from '@babylonjs/core';
import { App } from '../src/app';
import { getScreenCoordinates, simulateDrag } from './simulation';

const engine = new NullEngine();
const app = new App(engine);

/**
 * The following tests are for implementing interactions on the objects:
 * - able to grab the "cylinder" object and move it around
 * - able to use the "cylinder" object to press the "button" object in order to turn off the "spotlight"
 * - able to use the "cylinder" object to tap the ground to change the "dragon" object's color
 */
describe('Finally, let\'s *implement interactions* on the objects, which should be:', () => {
    beforeAll(() => {
        (window as any).PointerEvent =
            function (type: string, pointerEventInit?: PointerEventInit) {
                const evt = new (window as any).MouseEvent(type, pointerEventInit);
                evt.pointerId = pointerEventInit?.pointerId;
                evt.pointerType = 'mouse';
                return evt as PointerEvent;
            };
        vi.useFakeTimers();
    });

    // the process is:
    // 1. simulate a drag interaction
    // 2. advance the timers to the end of the drag duration
    // 3. get the screen coordinates of the mesh position
    // 4. check if the screen coordinates are close to the expected coordinates
    function testDrag(scene: Scene, mesh: Mesh, toScreenX: number, toScreenY: number, moveCounts: number) {
        simulateDrag(scene, mesh, toScreenX, toScreenY, moveCounts);
        vi.advanceTimersByTime(1000 * moveCounts);
        console.log('***mesh position after drag:', mesh.position.toString());
        const { x: screenX, y: screenY } = getScreenCoordinates(scene, mesh);
        console.log('***screen coordinates after drag:', screenX, screenY);
        console.log('\n');
        expect(screenX).toBeCloseTo(toScreenX, 2);
        expect(screenY).toBeCloseTo(toScreenY, 2);
    }

    describe('- able to grab and move around the "cylinder" object, which should be:', async () => {
        const engine = new NullEngine();
        const app = new App(engine);

        const scene = await app.createScene();
        expect(scene).toBeInstanceOf(Scene);
        scene.render();

        let cylinder: Mesh;
        test('the "cylinder" should be existing,', () => {
            cylinder = scene.getMeshByName('cylinder')! as Mesh;
            expect(cylinder).not.toBeNull();
            expect(cylinder).toBeInstanceOf(Mesh);
        });
        test('pickable,', () => {
            const { x: screenX, y: screenY } = getScreenCoordinates(scene, cylinder);
            const pickResult = scene.pick(screenX, screenY);
            expect(pickResult.pickedMesh).not.toBeNull();
            expect(pickResult.pickedMesh?.name).toBe('cylinder');
        });
        test('not affected by texture loading,', async () => {
            // make sure texture loading is non-blocking
            expect(scene.useDelayedTextureLoading).toBe(true);
            // because somehow loading cube textures for skybox in jsdom environment is never ready or not blocking
            // and it blocks the drag behaviors defined after the texture loading
        });
        test('draggable with a pointer device (such as a mouse or controller,)', () => {
            // run the render loop to update the scene
            engine.runRenderLoop(() => {
                scene.render();
            });

            // and it's done twice with random screen coordinates
            // this test may be affected by asset loading errors,
            // since we define the mesh after loading some textures.
            testDrag(scene, cylinder, Math.random() * 100, Math.random() * 100, 2);
            testDrag(scene, cylinder, Math.random() * 100, Math.random() * 100, 3);
        });
    });

    describe('- able to use the "cylinder" object to press the "button" object in order to turn off the "point light":', async () => {
        const engine = new NullEngine();
        const app = new App(engine);

        const scene = await app.createScene();
        expect(scene).toBeInstanceOf(Scene);
        scene.render();

        let cylinder: Mesh, button: Mesh;
        test('the "cylinder" and "button" should be existing,', () => {
            // "cylinder" object is existing
            cylinder = scene.getMeshByName('cylinder')! as Mesh;
            expect(cylinder).not.toBeNull();
            expect(cylinder).toBeInstanceOf(Mesh);

            // "button" object is existing
            button = scene.getMeshByName('button plane')! as Mesh;
            expect(button).not.toBeNull();
            expect(button).toBeInstanceOf(Mesh);
        });

        let light: PointLight;
        test('the "point light" should be existing and turned on,', () => {
            // light is existing
            light = scene.getLightByName('point light')! as PointLight;
            expect(light).not.toBeNull();
            expect(light).toBeInstanceOf(PointLight);

            // light is on before the button is pressed
            expect(light.isEnabled()).toBe(true);
            expect(light.intensity).toBeGreaterThan(0);
        });

        test('the "cylinder" should be dragged to the "button",', () => {
            // run the render loop to update the scene
            engine.runRenderLoop(() => {
                scene.render();
            });

            // get the screen coordinates of the button
            const { x: buttonScreenX, y: buttonScreenY } = getScreenCoordinates(scene, button);
            // test simulation to drag the cylinder to the button
            testDrag(scene, cylinder, buttonScreenX, buttonScreenY, 2);
        });

        test('pressing the "button" (being intersected by the "cylinder") should turn off the light,', () => {
            // light is off after the button is pressed
            // expect(light.isEnabled()).toBe(false);
            expect(light.intensity).toBe(0);
        });
    });

    describe('- able to use the "cylinder" object to tap the "ground" object to change "dragon\'s" color:', async () => {
        const engine = new NullEngine();
        const app = new App(engine);

        const scene = await app.createScene();
        expect(scene).toBeInstanceOf(Scene);
        scene.render();

        let cylinder: Mesh, ground: Mesh;
        test('the "cylinder" and "ground" should be existing,', () => {
            // "cylinder" object is existing
            cylinder = scene.getMeshByName('cylinder')! as Mesh;
            expect(cylinder).not.toBeNull();
            expect(cylinder).toBeInstanceOf(Mesh);

            // "ground" object is existing
            ground = scene.getMeshByName('ground')! as Mesh;
            expect(ground).not.toBeNull();
            expect(ground).toBeInstanceOf(Mesh);

        });

        let dragon: Mesh, dragonMaterial: StandardMaterial, dragonColorBefore: Color3;
        test('the "dragon" should be existing and colored,', async () => {
            // dragon is existing
            dragon = await vi.waitUntil(
                () => scene.getMeshByName('dragon')! as Mesh,
                { timeout: 60000, interval: 1000 }
            );
            expect(dragon).not.toBeNull();
            expect(dragon).toBeInstanceOf(Mesh);

            // the root mesh of the dragon should have a material
            dragonMaterial = dragon.material! as StandardMaterial;
            expect(dragonMaterial).not.toBeNull();
            expect(dragonMaterial).toBeInstanceOf(StandardMaterial);
            
            // all child meshes of the dragon should have the same material
            // so we can easily change the color of the dragon by changing the material's color
            for (const mesh of dragon.getChildMeshes()) {
                expect(mesh.material).toBe(dragonMaterial);
            }
            // dragon is colored before the ground is tapped
            dragonColorBefore = dragonMaterial.diffuseColor;
            expect(dragonColorBefore).not.toBeNull();
            expect(dragonColorBefore).toBeInstanceOf(Color3);
        });

        test('the "cylinder" should be dragged to the "ground",', () => {
            // run the render loop to update the scene
            engine.runRenderLoop(() => {
                scene.render();
            });

            // get the screen coordinates of the ground
            const { x: groundScreenX, y: groundScreenY } = getScreenCoordinates(scene, ground);
            // test simulation to drag the cylinder to the ground
            testDrag(scene, cylinder, groundScreenX, groundScreenY, 2);
        });

        test('tapping the "ground" (being intersected by the "cylinder") should change the "dragon\'s" color,', () => {
            // dragon is colored differently after the ground is tapped
            const dragonColorAfter = dragonMaterial.diffuseColor;
            expect(dragonColorAfter).not.toBeNull();
            expect(dragonColorAfter).toBeInstanceOf(Color3);
            expect(dragonColorAfter.toString()).not.toEqual(dragonColorBefore.toString());
        });
    });
});
