export declare class MeshDecoder {
    static unpackVarInt(packed: Uint8Array, index: number): Array<number>;
    static unpackVertices(packed: Uint8Array): Uint8Array;
    static unpackIndices(packed: Uint8Array): Uint16Array;
    static unpackOctants(packed: Uint8Array, indices: Uint16Array, verticesLength: number): Uint8Array;
    static unpackLayerBounds(packed: Uint8Array): Array<number>;
}
