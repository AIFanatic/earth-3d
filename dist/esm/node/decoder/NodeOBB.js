import { BufferUtils } from "./BufferUtils";
var NodeOBB = /** @class */ (function () {
    function NodeOBB() {
    }
    NodeOBB.unpackObb = function (data, head_node_center, meters_per_texel) {
        if (data.length != 15)
            throw Error("Invalid packed size");
        var center = {
            x: BufferUtils.readInt16LE(data, 0) * meters_per_texel + head_node_center[0],
            y: BufferUtils.readInt16LE(data, 2) * meters_per_texel + head_node_center[1],
            z: BufferUtils.readInt16LE(data, 4) * meters_per_texel + head_node_center[2]
        };
        var extents = {
            x: data[6] * meters_per_texel,
            y: data[7] * meters_per_texel,
            z: data[8] * meters_per_texel
        };
        var euler = {
            x: BufferUtils.readUint16LE(data, 9) * Math.PI / 32768.0,
            y: BufferUtils.readUint16LE(data, 11) * Math.PI / 65536.0,
            z: BufferUtils.readUint16LE(data, 13) * Math.PI / 32768.0
        };
        var c0 = Math.cos(euler.x);
        var s0 = Math.sin(euler.x);
        var c1 = Math.cos(euler.y);
        var s1 = Math.sin(euler.y);
        var c2 = Math.cos(euler.z);
        var s2 = Math.sin(euler.z);
        var orientation = {
            elements: [
                c0 * c2 - c1 * s0 * s2,
                c1 * c0 * s2 + c2 * s0,
                s2 * s1,
                -c0 * s2 - c2 * c1 * s0,
                c0 * c1 * c2 - s0 * s2,
                c2 * s1,
                s1 * s0,
                -c0 * s1,
                c1
            ]
        };
        return {
            center: center,
            extents: extents,
            orientation: orientation
        };
    };
    return NodeOBB;
}());
export { NodeOBB };
//# sourceMappingURL=NodeOBB.js.map