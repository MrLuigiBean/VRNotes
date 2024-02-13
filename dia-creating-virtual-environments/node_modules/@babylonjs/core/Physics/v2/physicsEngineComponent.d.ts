import type { Nullable } from "../../types";
import type { Observer } from "../../Misc/observable";
import type { Vector3 } from "../../Maths/math.vector";
import type { Node } from "../../node";
import type { PhysicsBody } from "./physicsBody";
import "../joinedPhysicsEngineComponent";
declare module "../../Meshes/transformNode" {
    /**
     *
     */
    /** @internal */
    interface TransformNode {
        /** @internal */
        _physicsBody: Nullable<PhysicsBody>;
        /**
         * @see
         */
        physicsBody: Nullable<PhysicsBody>;
        /**
         *
         */
        getPhysicsBody(): Nullable<PhysicsBody>;
        /** Apply a physic impulse to the mesh
         * @param force defines the force to apply
         * @param contactPoint defines where to apply the force
         * @returns the current mesh
         */
        applyImpulse(force: Vector3, contactPoint: Vector3): TransformNode;
        /** @internal */
        _disposePhysicsObserver: Nullable<Observer<Node>>;
    }
}
