import { INodeData } from '../../proto/rocktree';
export interface DecodedIMesh {
    vertices_uvs?: Uint16Array;
    uv_offset?: {
        x: number;
        y: number;
    };
    uv_scale?: {
        x: number;
        y: number;
    };
    octants?: Uint8Array;
    indices?: Uint16Array;
    vertices?: Uint8Array;
    texture?: any;
}
export interface DecodedNode {
    meshes?: DecodedIMesh[];
    matrix_globe_from_mesh?: number[];
}
export declare class NodeDecoder {
    static unpackPathAndFlags(path_id: number): {
        path: string;
        level: number;
        flags: number;
    };
    static Decode(node_data: INodeData): DecodedNode;
}
