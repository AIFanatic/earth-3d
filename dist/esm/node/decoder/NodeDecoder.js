var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { BufferGeometryUtils } from './BufferGeometryUtils';
import { MeshDecoder } from './MeshDecoder';
import { TextureDecoder } from './TextureDecoder';
var NodeDecoder = /** @class */ (function () {
    function NodeDecoder() {
    }
    NodeDecoder.unpackPathAndFlags = function (path_id) {
        var level = 1 + (path_id & 3);
        path_id >>= 2;
        var path = "";
        for (var i = 0; i < level; i++) {
            path += parseInt('0') + (path_id & 7);
            path_id >>= 3;
        }
        var flags = path_id;
        return {
            path: path,
            level: level,
            flags: flags
        };
    };
    NodeDecoder.Decode = function (node_data) {
        var e_1, _a;
        var node = {};
        node.meshes = [];
        node.matrix_globe_from_mesh = node_data.matrix_globe_from_mesh;
        try {
            for (var _b = __values(node_data.meshes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mesh = _c.value;
                var indices = MeshDecoder.unpackIndices(mesh.indices);
                var vertices = MeshDecoder.unpackVertices(mesh.vertices);
                var octants = MeshDecoder.unpackOctants(mesh.layer_and_octant_counts, indices, vertices.length / 3);
                var _d = TextureDecoder.unpackUvOffsetAndScale(mesh.texture[0], mesh.uv_offset_and_scale), uv_offset = _d.uv_offset, uv_scale = _d.uv_scale;
                var uvs = TextureDecoder.unpackTexCoords(mesh.texture_coordinates, mesh.texture[0], vertices.length / 3);
                var layer_bounds = MeshDecoder.unpackLayerBounds(mesh.layer_and_octant_counts);
                indices = indices.slice(0, layer_bounds[3]);
                // 6 == CRN_DXT
                var textureData = mesh.texture[0].format == 6 ? TextureDecoder.unpackCRN(mesh.texture[0].data[0], mesh.texture[0].width, mesh.texture[0].height) : mesh.texture[0].data[0];
                // texture.data[0] = textureData as any;
                var texture = [{
                        data: [textureData],
                        format: mesh.texture[0].format,
                        width: mesh.texture[0].width,
                        height: mesh.texture[0].height,
                    }];
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
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return node;
    };
    return NodeDecoder;
}());
export { NodeDecoder };
//# sourceMappingURL=NodeDecoder.js.map