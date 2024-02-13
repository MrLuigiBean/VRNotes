/** @internal */
export function addClipPlaneUniforms(uniforms) {
    if (uniforms.indexOf("vClipPlane") === -1) {
        uniforms.push("vClipPlane");
    }
    if (uniforms.indexOf("vClipPlane2") === -1) {
        uniforms.push("vClipPlane2");
    }
    if (uniforms.indexOf("vClipPlane3") === -1) {
        uniforms.push("vClipPlane3");
    }
    if (uniforms.indexOf("vClipPlane4") === -1) {
        uniforms.push("vClipPlane4");
    }
    if (uniforms.indexOf("vClipPlane5") === -1) {
        uniforms.push("vClipPlane5");
    }
    if (uniforms.indexOf("vClipPlane6") === -1) {
        uniforms.push("vClipPlane6");
    }
}
/** @internal */
export function prepareStringDefinesForClipPlanes(primaryHolder, secondaryHolder, defines) {
    var _a, _b, _c, _d, _e, _f;
    const clipPlane = !!((_a = primaryHolder.clipPlane) !== null && _a !== void 0 ? _a : secondaryHolder.clipPlane);
    const clipPlane2 = !!((_b = primaryHolder.clipPlane2) !== null && _b !== void 0 ? _b : secondaryHolder.clipPlane2);
    const clipPlane3 = !!((_c = primaryHolder.clipPlane3) !== null && _c !== void 0 ? _c : secondaryHolder.clipPlane3);
    const clipPlane4 = !!((_d = primaryHolder.clipPlane4) !== null && _d !== void 0 ? _d : secondaryHolder.clipPlane4);
    const clipPlane5 = !!((_e = primaryHolder.clipPlane5) !== null && _e !== void 0 ? _e : secondaryHolder.clipPlane5);
    const clipPlane6 = !!((_f = primaryHolder.clipPlane6) !== null && _f !== void 0 ? _f : secondaryHolder.clipPlane6);
    if (clipPlane)
        defines.push("#define CLIPPLANE");
    if (clipPlane2)
        defines.push("#define CLIPPLANE2");
    if (clipPlane3)
        defines.push("#define CLIPPLANE3");
    if (clipPlane4)
        defines.push("#define CLIPPLANE4");
    if (clipPlane5)
        defines.push("#define CLIPPLANE5");
    if (clipPlane6)
        defines.push("#define CLIPPLANE6");
}
/** @internal */
export function prepareDefinesForClipPlanes(primaryHolder, secondaryHolder, defines) {
    var _a, _b, _c, _d, _e, _f;
    let changed = false;
    const clipPlane = !!((_a = primaryHolder.clipPlane) !== null && _a !== void 0 ? _a : secondaryHolder.clipPlane);
    const clipPlane2 = !!((_b = primaryHolder.clipPlane2) !== null && _b !== void 0 ? _b : secondaryHolder.clipPlane2);
    const clipPlane3 = !!((_c = primaryHolder.clipPlane3) !== null && _c !== void 0 ? _c : secondaryHolder.clipPlane3);
    const clipPlane4 = !!((_d = primaryHolder.clipPlane4) !== null && _d !== void 0 ? _d : secondaryHolder.clipPlane4);
    const clipPlane5 = !!((_e = primaryHolder.clipPlane5) !== null && _e !== void 0 ? _e : secondaryHolder.clipPlane5);
    const clipPlane6 = !!((_f = primaryHolder.clipPlane6) !== null && _f !== void 0 ? _f : secondaryHolder.clipPlane6);
    // Do not factorize this code, it breaks browsers optimizations.
    if (defines["CLIPPLANE"] !== clipPlane) {
        defines["CLIPPLANE"] = clipPlane;
        changed = true;
    }
    if (defines["CLIPPLANE2"] !== clipPlane2) {
        defines["CLIPPLANE2"] = clipPlane2;
        changed = true;
    }
    if (defines["CLIPPLANE3"] !== clipPlane3) {
        defines["CLIPPLANE3"] = clipPlane3;
        changed = true;
    }
    if (defines["CLIPPLANE4"] !== clipPlane4) {
        defines["CLIPPLANE4"] = clipPlane4;
        changed = true;
    }
    if (defines["CLIPPLANE5"] !== clipPlane5) {
        defines["CLIPPLANE5"] = clipPlane5;
        changed = true;
    }
    if (defines["CLIPPLANE6"] !== clipPlane6) {
        defines["CLIPPLANE6"] = clipPlane6;
        changed = true;
    }
    return changed;
}
/** @internal */
export function bindClipPlane(effect, primaryHolder, secondaryHolder) {
    var _a, _b, _c, _d, _e, _f;
    let clipPlane = (_a = primaryHolder.clipPlane) !== null && _a !== void 0 ? _a : secondaryHolder.clipPlane;
    setClipPlane(effect, "vClipPlane", clipPlane);
    clipPlane = (_b = primaryHolder.clipPlane2) !== null && _b !== void 0 ? _b : secondaryHolder.clipPlane2;
    setClipPlane(effect, "vClipPlane2", clipPlane);
    clipPlane = (_c = primaryHolder.clipPlane3) !== null && _c !== void 0 ? _c : secondaryHolder.clipPlane3;
    setClipPlane(effect, "vClipPlane3", clipPlane);
    clipPlane = (_d = primaryHolder.clipPlane4) !== null && _d !== void 0 ? _d : secondaryHolder.clipPlane4;
    setClipPlane(effect, "vClipPlane4", clipPlane);
    clipPlane = (_e = primaryHolder.clipPlane5) !== null && _e !== void 0 ? _e : secondaryHolder.clipPlane5;
    setClipPlane(effect, "vClipPlane5", clipPlane);
    clipPlane = (_f = primaryHolder.clipPlane6) !== null && _f !== void 0 ? _f : secondaryHolder.clipPlane6;
    setClipPlane(effect, "vClipPlane6", clipPlane);
}
function setClipPlane(effect, uniformName, clipPlane) {
    if (clipPlane) {
        effect.setFloat4(uniformName, clipPlane.normal.x, clipPlane.normal.y, clipPlane.normal.z, clipPlane.d);
    }
}
//# sourceMappingURL=clipPlaneMaterialHelper.js.map