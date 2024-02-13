import { Tools } from "@babylonjs/core/Misc/tools.js";
import { Matrix, TmpVectors, Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { VolumeBasedPanel } from "./volumeBasedPanel.js";
import { Container3D } from "./container3D.js";
import { Axis, Space } from "@babylonjs/core/Maths/math.axis.js";
/**
 * Class used to create a container panel deployed on the surface of a cylinder
 */
export class CylinderPanel extends VolumeBasedPanel {
    constructor() {
        super(...arguments);
        this._radius = 5.0;
    }
    /**
     * Gets or sets the radius of the cylinder where to project controls (5 by default)
     */
    get radius() {
        return this._radius;
    }
    set radius(value) {
        if (this._radius === value) {
            return;
        }
        this._radius = value;
        Tools.SetImmediate(() => {
            this._arrangeChildren();
        });
    }
    _mapGridNode(control, nodePosition) {
        const mesh = control.mesh;
        if (!mesh) {
            return;
        }
        const newPos = this._cylindricalMapping(nodePosition);
        control.position = newPos;
        switch (this.orientation) {
            case Container3D.FACEORIGIN_ORIENTATION:
                mesh.lookAt(new Vector3(2 * newPos.x, newPos.y, 2 * newPos.z));
                break;
            case Container3D.FACEORIGINREVERSED_ORIENTATION:
                mesh.lookAt(new Vector3(-newPos.x, newPos.y, -newPos.z));
                break;
            case Container3D.FACEFORWARD_ORIENTATION:
                break;
            case Container3D.FACEFORWARDREVERSED_ORIENTATION:
                mesh.rotate(Axis.Y, Math.PI, Space.LOCAL);
                break;
        }
    }
    _cylindricalMapping(source) {
        const newPos = new Vector3(0, source.y, this._radius);
        const yAngle = source.x / this._radius;
        Matrix.RotationYawPitchRollToRef(yAngle, 0, 0, TmpVectors.Matrix[0]);
        return Vector3.TransformNormal(newPos, TmpVectors.Matrix[0]);
    }
}
//# sourceMappingURL=cylinderPanel.js.map