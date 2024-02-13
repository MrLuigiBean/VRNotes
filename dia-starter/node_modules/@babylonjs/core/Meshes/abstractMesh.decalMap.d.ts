import type { Nullable } from "../types";
import type { MeshUVSpaceRenderer } from "./meshUVSpaceRenderer";
declare module "./abstractMesh" {
    interface AbstractMesh {
        /** @internal */
        _decalMap: Nullable<MeshUVSpaceRenderer>;
        /**
         * Gets or sets the decal map for this mesh
         */
        decalMap: Nullable<MeshUVSpaceRenderer>;
    }
}
