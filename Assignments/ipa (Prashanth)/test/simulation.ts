/**
 * @fileoverview Utility functions for interaction testing.
 * @author your instructors
 * @lastUpdated 2024-03-04
 */

import { Scene, Mesh, Vector3, Matrix, Viewport } from "@babylonjs/core";

/**
 * Get the screen coordinates of a mesh.
 * @param scene The scene.
 * @param mesh The mesh.
 * @returns The screen coordinates.
 */
export function getScreenCoordinates(scene: Scene, mesh: Mesh) {
    const renderWidth = scene.getEngine().getRenderWidth();
    const renderHeight = scene.getEngine().getRenderHeight();

    return Vector3.Project(
        mesh.position, //vector to project
        Matrix.Identity(), //world matrix
        scene.getTransformMatrix(), //transform matrix
        new Viewport(0, 0, renderWidth, renderHeight) //viewport
    );
}

/**
 * Simulate a drag interaction.
 * @param scene The scene.
 * @param mesh The mesh.
 * @param toScreenX The x-coordinate to drag to.
 * @param toScreenY The y-coordinate to drag to.
 * @param moveCounts The number of move steps.
 */
export function simulateDrag(scene: Scene, mesh: Mesh, toScreenX: number = 30, 
    toScreenY: number = toScreenX, moveCounts: number = 3) {
    let { x: screenX, y: screenY } = getScreenCoordinates(scene, mesh);
    let pickResult = scene.pick(screenX, screenY);

    // Convert screen coordinates to client coordinate
    const pointerEventInit = { pointerId: 1 } as PointerEventInit;
    const movementX = (toScreenX - screenX) / moveCounts;
    const movementY = (toScreenY - screenY) / moveCounts;

    for (let i = 0; i <= moveCounts; i++) {
        setTimeout(() => {
            // start drag
            if (i === 0) {
                console.log('================= drag start');
                console.log(`screenX: ${screenX.toFixed(2)}, screenY: ${screenY.toFixed(2)}, pickedMesh: ${pickResult.pickedMesh?.name} at frame ${scene.getFrameId()}`);
                scene.simulatePointerDown(pickResult, pointerEventInit);
            }

            // move drag
            if (i < moveCounts) {
                pickResult = scene.pick(screenX += movementX, screenY += movementY);
                console.log('----------------- drag move:', i);
                console.log(`screenX: ${screenX.toFixed(2)}, screenY: ${screenY.toFixed(2)} at frame ${scene.getFrameId()}`);
                scene.simulatePointerMove(pickResult, pointerEventInit);
            }

            // release drag
            if (i === moveCounts) {
                console.log(`================= drag end at frame ${scene.getFrameId()}`);
                scene.simulatePointerUp(pickResult, pointerEventInit);
            }
        }, 1000 * i);
    }

    console.log(`***mesh position at start (not updated yet): ${mesh.position.x.toFixed(2)}, ${mesh.position.y.toFixed(2)}, ${mesh.position.z.toFixed(2)}`);
}

/**
 * Simulate a click interaction.
 * @param scene The scene.
 * @param mesh The mesh to click.
 */
export function simulateClick(scene: Scene, mesh: Mesh) {
    const { x: screenX, y: screenY } = getScreenCoordinates(scene, mesh);
    const pickResult = scene.pick(screenX, screenY);
    const pointerEventInit = { pointerId: 1 } as PointerEventInit;

    console.log('================= click');
    console.log(`screenX: ${screenX.toFixed(2)}, screenY: ${screenY.toFixed(2)}, pickedMesh: ${pickResult.pickedMesh?.name} at frame ${scene.getFrameId()}`);
    console.log('================= click end')

    scene.simulatePointerDown(pickResult, pointerEventInit);
    scene.simulatePointerUp(pickResult, pointerEventInit);
}
