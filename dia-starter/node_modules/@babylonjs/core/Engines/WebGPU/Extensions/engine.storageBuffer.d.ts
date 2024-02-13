import type { Nullable } from "../../../types";
import type { StorageBuffer } from "../../../Buffers/storageBuffer";
declare module "../../../Materials/effect" {
    interface Effect {
        /**
         * Sets a storage buffer on the engine to be used in the shader.
         * @param name Name of the storage buffer variable.
         * @param buffer Storage buffer to set.
         * @param label defines the label of the buffer (for debug purpose)
         */
        setStorageBuffer(name: string, buffer: Nullable<StorageBuffer>, label?: string): void;
    }
}
