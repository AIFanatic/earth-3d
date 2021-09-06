var MeshDecoder = /** @class */ (function () {
    function MeshDecoder() {
    }
    MeshDecoder.unpackVarInt = function (packed, index) {
        var data = packed;
        var size = packed.length;
        var c = 0, d = 1, e;
        do {
            if (index >= size) {
                throw Error("Unable to unpack varint");
            }
            e = data[index++];
            c += (e & 0x7F) * d;
            d <<= 7;
        } while (e & 0x80);
        return [c, index];
    };
    MeshDecoder.unpackVertices = function (packed) {
        // packed = Buffer.from(packed);
        var data = packed;
        var count = packed.length / 3;
        var vtx = new Uint8Array(packed.length);
        var x = 0, y = 0, z = 0; // 8 bit for % 0x100
        var vc = 0;
        for (var i = 0; i < count; i++) {
            x = (x + data[count * 0 + i]) & 0xff;
            y = (y + data[count * 1 + i]) & 0xff;
            z = (z + data[count * 2 + i]) & 0xff;
            vtx[vc] = x;
            vtx[vc + 1] = y;
            vtx[vc + 2] = z;
            vc += 3;
        }
        return vtx;
    };
    MeshDecoder.unpackIndices = function (packed) {
        var offset = 0;
        var varint = MeshDecoder.unpackVarInt(packed, offset);
        var triangle_strip_len = varint[0];
        offset = varint[1];
        var triangle_strip = new Uint16Array(triangle_strip_len);
        for (var zeros = 0, a = void 0, b = 0, c = 0, i = 0; i < triangle_strip_len; i++) {
            var varint_1 = MeshDecoder.unpackVarInt(packed, offset);
            var val = varint_1[0];
            offset = varint_1[1];
            triangle_strip[i] = (a = b, b = c, c = zeros - val);
            if (0 == val)
                zeros++;
        }
        return triangle_strip;
    };
    MeshDecoder.unpackOctants = function (packed, indices, verticesLength) {
        var offset = 0;
        var varint = MeshDecoder.unpackVarInt(packed, offset);
        var len = varint[0];
        offset = varint[1];
        var idx_i = 0;
        var octants = new Uint8Array(verticesLength);
        for (var i = 0; i < len; i++) {
            var varint_2 = MeshDecoder.unpackVarInt(packed, offset);
            var v = varint_2[0];
            offset = varint_2[1];
            for (var j = 0; j < v; j++) {
                var idx = indices[idx_i++];
                octants[idx] = i & 7;
            }
        }
        return octants;
    };
    MeshDecoder.unpackLayerBounds = function (packed) {
        var offset = 0;
        var varint = MeshDecoder.unpackVarInt(packed, offset);
        var len = varint[0];
        offset = varint[1];
        var k = 0;
        var m = 0;
        var layer_bounds = new Array(10);
        for (var i = 0; i < len; i++) {
            if (0 == i % 8) {
                if (!(m < 10)) {
                    throw Error("Invalid m?");
                }
                layer_bounds[m++] = k;
            }
            var varint_3 = MeshDecoder.unpackVarInt(packed, offset);
            var v = varint_3[0];
            offset = varint_3[1];
            k += v;
        }
        for (; 10 > m; m++)
            layer_bounds[m] = k;
        return layer_bounds;
    };
    return MeshDecoder;
}());
export { MeshDecoder };
//# sourceMappingURL=MeshDecoder.js.map