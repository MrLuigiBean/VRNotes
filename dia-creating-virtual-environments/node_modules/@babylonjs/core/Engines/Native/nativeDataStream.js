/** @internal */
export class NativeDataStream {
    constructor() {
        const buffer = new ArrayBuffer(NativeDataStream.DEFAULT_BUFFER_SIZE);
        this._uint32s = new Uint32Array(buffer);
        this._int32s = new Int32Array(buffer);
        this._float32s = new Float32Array(buffer);
        this._length = NativeDataStream.DEFAULT_BUFFER_SIZE / 4;
        this._position = 0;
        this._nativeDataStream = new _native.NativeDataStream(() => {
            this._flush();
        });
    }
    writeUint32(value) {
        this._flushIfNecessary(1);
        this._uint32s[this._position++] = value;
    }
    writeInt32(value) {
        this._flushIfNecessary(1);
        this._int32s[this._position++] = value;
    }
    writeFloat32(value) {
        this._flushIfNecessary(1);
        this._float32s[this._position++] = value;
    }
    writeUint32Array(values) {
        this._flushIfNecessary(1 + values.length);
        this._uint32s[this._position++] = values.length;
        this._uint32s.set(values, this._position);
        this._position += values.length;
    }
    writeInt32Array(values) {
        this._flushIfNecessary(1 + values.length);
        this._uint32s[this._position++] = values.length;
        this._int32s.set(values, this._position);
        this._position += values.length;
    }
    writeFloat32Array(values) {
        this._flushIfNecessary(1 + values.length);
        this._uint32s[this._position++] = values.length;
        this._float32s.set(values, this._position);
        this._position += values.length;
    }
    writeNativeData(handle) {
        this._flushIfNecessary(handle.length);
        this._uint32s.set(handle, this._position);
        this._position += handle.length;
    }
    writeBoolean(value) {
        this.writeUint32(value ? 1 : 0);
    }
    _flushIfNecessary(required) {
        if (this._position + required > this._length) {
            this._flush();
        }
    }
    _flush() {
        this._nativeDataStream.writeBuffer(this._uint32s.buffer, this._position);
        this._position = 0;
    }
}
// Must be multiple of 4!
// eslint-disable-next-line @typescript-eslint/naming-convention
NativeDataStream.DEFAULT_BUFFER_SIZE = 65536;
//# sourceMappingURL=nativeDataStream.js.map