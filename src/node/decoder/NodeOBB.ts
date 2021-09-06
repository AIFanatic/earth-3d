import { BufferUtils } from "./BufferUtils";

export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export interface Matrix3 {
    elements: number[]
}

export interface OBB {
    center: Vector3,
    extents: Vector3;
    orientation: Matrix3;
}

export class NodeOBB {
    public static unpackObb(data: Uint8Array, head_node_center: number[], meters_per_texel: number): OBB {
        if (data.length != 15) throw Error("Invalid packed size");

        const center: Vector3 = {
            x: BufferUtils.readInt16LE(data, 0) * meters_per_texel + head_node_center[0],
            y: BufferUtils.readInt16LE(data, 2) * meters_per_texel + head_node_center[1],
            z: BufferUtils.readInt16LE(data, 4) * meters_per_texel + head_node_center[2]
        };

        const extents: Vector3 = {
            x: data[6] * meters_per_texel,
            y: data[7] * meters_per_texel,
            z: data[8] * meters_per_texel
        };

        const euler: Vector3 = {
            x: BufferUtils.readUint16LE(data, 9) * Math.PI / 32768.0,
            y: BufferUtils.readUint16LE(data, 11) * Math.PI / 65536.0,
            z: BufferUtils.readUint16LE(data, 13) * Math.PI / 32768.0
        };

        const c0: number = Math.cos(euler.x);
        const s0: number = Math.sin(euler.x);
        const c1: number = Math.cos(euler.y);
        const s1: number = Math.sin(euler.y);
        const c2: number = Math.cos(euler.z);
        const s2: number = Math.sin(euler.z);

        const orientation: Matrix3 = {
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
    }
}