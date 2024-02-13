import { TmpVectors, Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { Container3D } from "./container3D.js";
import { VolumeBasedPanel } from "./volumeBasedPanel.js";
/**
 * Class used to create a container panel deployed on the surface of a plane
 */
export class PlanePanel extends VolumeBasedPanel {
    _mapGridNode(control, nodePosition) {
        const mesh = control.mesh;
        if (!mesh) {
            return;
        }
        control.position = nodePosition.clone();
        const target = TmpVectors.Vector3[0];
        target.copyFrom(nodePosition);
        switch (this.orientation) {
            case Container3D.FACEORIGIN_ORIENTATION:
            case Container3D.FACEFORWARD_ORIENTATION:
                target.addInPlace(new Vector3(0, 0, 1));
                mesh.lookAt(target);
                break;
            case Container3D.FACEFORWARDREVERSED_ORIENTATION:
            case Container3D.FACEORIGINREVERSED_ORIENTATION:
                target.addInPlace(new Vector3(0, 0, -1));
                mesh.lookAt(target);
                break;
        }
    }
}
//# sourceMappingURL=planePanel.js.map