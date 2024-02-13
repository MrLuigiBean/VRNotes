import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { ContentDisplay3D } from "./contentDisplay3D.js";
/**
 * Class used as a root to all buttons
 */
export class AbstractButton3D extends ContentDisplay3D {
    /**
     * Creates a new button
     * @param name defines the control name
     */
    constructor(name) {
        super(name);
    }
    _getTypeName() {
        return "AbstractButton3D";
    }
    // Mesh association
    _createNode(scene) {
        return new TransformNode("button" + this.name, scene);
    }
}
//# sourceMappingURL=abstractButton3D.js.map