import { ThinEngine } from "../../Engines/thinEngine.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
ThinEngine.prototype.createStorageBuffer = function (data, creationFlags) {
    throw new Error("createStorageBuffer: Unsupported method in this engine!");
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
ThinEngine.prototype.updateStorageBuffer = function (buffer, data, byteOffset, byteLength) { };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
ThinEngine.prototype.readFromStorageBuffer = function (storageBuffer, offset, size, buffer) {
    throw new Error("readFromStorageBuffer: Unsupported method in this engine!");
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
ThinEngine.prototype.setStorageBuffer = function (name, buffer) {
    throw new Error("setStorageBuffer: Unsupported method in this engine!");
};
//# sourceMappingURL=engine.storageBuffer.js.map