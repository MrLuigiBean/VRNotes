import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
/**
 * Class used to transport Vector3 information for pointer events
 */
export class Vector3WithInfo extends Vector3 {
    /**
     * Creates a new Vector3WithInfo
     * @param source defines the vector3 data to transport
     * @param buttonIndex defines the current mouse button index
     */
    constructor(source, 
    /** defines the current mouse button index */
    buttonIndex = 0) {
        super(source.x, source.y, source.z);
        this.buttonIndex = buttonIndex;
    }
}
//# sourceMappingURL=vector3WithInfo.js.map