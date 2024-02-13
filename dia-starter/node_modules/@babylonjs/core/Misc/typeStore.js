/** @internal */
// eslint-disable-next-line @typescript-eslint/naming-convention
const _RegisteredTypes = {};
/**
 * @internal
 */
export function RegisterClass(className, type) {
    _RegisteredTypes[className] = type;
}
/**
 * @internal
 */
export function GetClass(fqdn) {
    return _RegisteredTypes[fqdn];
}
//# sourceMappingURL=typeStore.js.map