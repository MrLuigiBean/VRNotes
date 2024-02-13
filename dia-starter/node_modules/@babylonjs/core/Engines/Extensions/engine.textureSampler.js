import { ThinEngine } from "../../Engines/thinEngine.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
ThinEngine.prototype.setTextureSampler = function (name, sampler) {
    throw new Error("setTextureSampler: This engine does not support separate texture sampler objects!");
};
//# sourceMappingURL=engine.textureSampler.js.map