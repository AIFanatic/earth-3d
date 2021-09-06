export class BufferUtils {
    public static readUint16LE (buffer: ArrayBuffer, offset) {
        offset = offset >>> 0
        return buffer[offset] | (buffer[offset + 1] << 8)
    }

    public static readInt16LE (buffer: ArrayBuffer, offset) {
        offset = offset >>> 0
        const val = buffer[offset] | (buffer[offset + 1] << 8)
        return (val & 0x8000) ? val | 0xFFFF0000 : val
    }
}