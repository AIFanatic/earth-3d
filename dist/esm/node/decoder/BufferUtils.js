var BufferUtils = /** @class */ (function () {
    function BufferUtils() {
    }
    BufferUtils.readUint16LE = function (buffer, offset) {
        offset = offset >>> 0;
        return buffer[offset] | (buffer[offset + 1] << 8);
    };
    BufferUtils.readInt16LE = function (buffer, offset) {
        offset = offset >>> 0;
        var val = buffer[offset] | (buffer[offset + 1] << 8);
        return (val & 0x8000) ? val | 0xFFFF0000 : val;
    };
    return BufferUtils;
}());
export { BufferUtils };
//# sourceMappingURL=BufferUtils.js.map