import { INodeData, ITexture } from '../../proto/rocktree';
import { BufferGeometryUtils } from './BufferGeometryUtils';
import { MeshDecoder } from './MeshDecoder';
import { TextureDecoder } from './TextureDecoder';

export interface DecodedIMesh {
    vertices_uvs?: Uint16Array;
    uv_offset?: {x: number, y: number};
    uv_scale?: {x: number, y: number};
    octants?: Uint8Array;
    indices?: Uint16Array;
    vertices?: Uint8Array;
    texture?: any;
}

export interface DecodedNode {
    meshes?: DecodedIMesh[];
    matrix_globe_from_mesh?: number[];
}

export class NodeDecoder {
    public static unpackPathAndFlags(path_id: number) {
        let level = 1 + (path_id & 3);
        path_id >>= 2;
        let path = "";

        for (let i = 0; i < level; i++) {
            path += parseInt('0') + (path_id & 7);
            path_id >>= 3;
        }
        let flags = path_id;

        return {
            path: path,
            level: level,
            flags: flags
        }
    }

    public static Decode(node_data: INodeData): DecodedNode {
        const node: DecodedNode = {};
        node.meshes = [];
        
        node.matrix_globe_from_mesh = node_data.matrix_globe_from_mesh;

        for (let mesh of node_data.meshes) {
            let indices = MeshDecoder.unpackIndices(mesh.indices);
            const vertices = MeshDecoder.unpackVertices(mesh.vertices);

            let octants = MeshDecoder.unpackOctants(mesh.layer_and_octant_counts, indices, vertices.length / 3);
            let {uv_offset, uv_scale} = TextureDecoder.unpackUvOffsetAndScale(mesh.texture[0], mesh.uv_offset_and_scale);
            let uvs = TextureDecoder.unpackTexCoords(mesh.texture_coordinates, mesh.texture[0], vertices.length / 3);

            let layer_bounds = MeshDecoder.unpackLayerBounds(mesh.layer_and_octant_counts);
            indices = indices.slice(0, layer_bounds[3]);

            // 6 == CRN_DXT
            const textureData = mesh.texture[0].format == 6 ? TextureDecoder.unpackCRN(mesh.texture[0].data[0], mesh.texture[0].width, mesh.texture[0].height) : mesh.texture[0].data[0];
            // texture.data[0] = textureData as any;

            let texture =
            [{
                data: [textureData],
                format: mesh.texture[0].format,
                width: mesh.texture[0].width,
                height: mesh.texture[0].height,
            }]

            // Convert indices to stripDrawMode
            indices = BufferGeometryUtils.toTriangleStripDrawMode(indices);

            node.meshes.push({
                indices: indices,
                vertices: vertices,
                octants: octants,
                vertices_uvs: uvs,
                uv_scale: uv_scale,
                uv_offset: uv_offset,
                texture: texture
            })
        }
    
        return node;
    }
}