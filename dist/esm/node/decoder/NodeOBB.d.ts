export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export interface Matrix3 {
    elements: number[];
}
export interface OBB {
    center: Vector3;
    extents: Vector3;
    orientation: Matrix3;
}
export declare class NodeOBB {
    static unpackObb(data: Uint8Array, head_node_center: number[], meters_per_texel: number): OBB;
}
