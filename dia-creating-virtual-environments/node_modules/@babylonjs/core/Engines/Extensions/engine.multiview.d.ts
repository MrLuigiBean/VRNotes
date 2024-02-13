import { Camera } from "../../Cameras/camera";
import type { Nullable } from "../../types";
import type { RenderTargetTexture } from "../../Materials/Textures/renderTargetTexture";
import { Matrix } from "../../Maths/math.vector";
import { UniformBuffer } from "../../Materials/uniformBuffer";
import type { RenderTargetWrapper } from "../renderTargetWrapper";
declare module "../../Engines/engine" {
    interface Engine {
        /**
         * Creates a new multiview render target
         * @param width defines the width of the texture
         * @param height defines the height of the texture
         * @returns the created multiview render target wrapper
         */
        createMultiviewRenderTargetTexture(width: number, height: number, colorTexture?: WebGLTexture, depthStencilTexture?: WebGLTexture): RenderTargetWrapper;
        /**
         * Binds a multiview render target wrapper to be drawn to
         * @param multiviewTexture render target wrapper to bind
         */
        bindMultiviewFramebuffer(multiviewTexture: RenderTargetWrapper): void;
        /**
         * Binds a Space Warp render target wrapper to be drawn to
         * @param spaceWarpTexture render target wrapper to bind
         */
        bindSpaceWarpFramebuffer(spaceWarpTexture: RenderTargetWrapper): void;
    }
}
declare module "../../Cameras/camera" {
    interface Camera {
        /**
         * @internal
         * For cameras that cannot use multiview images to display directly. (e.g. webVR camera will render to multiview texture, then copy to each eye texture and go from there)
         */
        _useMultiviewToSingleView: boolean;
        /**
         * @internal
         * For cameras that cannot use multiview images to display directly. (e.g. webVR camera will render to multiview texture, then copy to each eye texture and go from there)
         */
        _multiviewTexture: Nullable<RenderTargetTexture>;
        /**
         * @internal
         * For WebXR cameras that are rendering to multiview texture arrays.
         */
        _renderingMultiview: boolean;
        /**
         * @internal
         * ensures the multiview texture of the camera exists and has the specified width/height
         * @param width height to set on the multiview texture
         * @param height width to set on the multiview texture
         */
        _resizeOrCreateMultiviewTexture(width: number, height: number): void;
    }
}
declare module "../../scene" {
    interface Scene {
        /** @internal */
        _transformMatrixR: Matrix;
        /** @internal */
        _multiviewSceneUbo: Nullable<UniformBuffer>;
        /** @internal */
        _createMultiviewUbo(): void;
        /** @internal */
        _updateMultiviewUbo(viewR?: Matrix, projectionR?: Matrix): void;
        /** @internal */
        _renderMultiviewToSingleView(camera: Camera): void;
    }
}
