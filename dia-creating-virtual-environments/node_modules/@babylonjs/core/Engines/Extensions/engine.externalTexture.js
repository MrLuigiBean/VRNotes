import { ThinEngine } from "../../Engines/thinEngine.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
ThinEngine.prototype.createExternalTexture = function (video) {
    return null;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
ThinEngine.prototype.setExternalTexture = function (name, texture) {
    throw new Error("setExternalTexture: This engine does not support external textures!");
};
//# sourceMappingURL=engine.externalTexture.js.map