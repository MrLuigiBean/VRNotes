import { Engine } from '@babylonjs/core';
import { App } from './app';

// get the canvas element
const canvas = <HTMLCanvasElement>document.getElementById('renderCanvas');

// initialize babylon engine
const engine = new Engine(canvas, true);

// create the scene and run the render loop
const app = new App(engine);
app.createScene().then(scene => {
	engine.runRenderLoop(() => {
		app.updateScene();
		scene.render();
	})
});

// resize the canvas when the window is resized
window.addEventListener('resize', function () {
	engine.resize();
});
