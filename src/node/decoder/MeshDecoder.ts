export class MeshDecoder {

    public static unpackVarInt(packed: Uint8Array, index: number): Array<number> {
        const data = packed;
        const size = packed.length;
        let c = 0, d = 1, e;
        do {
            if (index >= size) {
                throw Error("Unable to unpack varint");
            }
            e = data[index++];
            c += (e & 0x7F) * d;
            d <<= 7;
        } while (e & 0x80);
        return [c, index];
    }

    public static unpackVertices(packed: Uint8Array): Uint8Array {
        // packed = Buffer.from(packed);
        const data = packed;
        const count = packed.length / 3;
        let vtx = new Uint8Array(packed.length);
        let x = 0, y = 0, z = 0; // 8 bit for % 0x100
        let vc = 0;
        for (let i = 0; i < count; i++) {
            x = (x + data[count * 0 + i]) & 0xff
            y = (y + data[count * 1 + i]) & 0xff
            z = (z + data[count * 2 + i]) & 0xff
            
            vtx[vc] = x;
            vtx[vc+1] = y;
            vtx[vc+2] = z;
            
            vc+=3;
        }

        return vtx;
    }

    public static unpackIndices(packed: Uint8Array): Uint16Array {
        let offset = 0;

        const varint = MeshDecoder.unpackVarInt(packed, offset);
        const triangle_strip_len = varint[0];
        offset = varint[1];
        let triangle_strip = new Uint16Array(triangle_strip_len);
        for (let zeros = 0, a, b = 0, c = 0, i = 0; i < triangle_strip_len; i++) {
            const varint = MeshDecoder.unpackVarInt(packed, offset);
            const val = varint[0];
            offset = varint[1];
            triangle_strip[i] = (a = b, b = c, c = zeros - val);
            if (0 == val) zeros++;
        }

        return triangle_strip;
    }

    public static unpackOctants(packed: Uint8Array, indices: Uint16Array, verticesLength: number): Uint8Array {
        let offset = 0;
        const varint = MeshDecoder.unpackVarInt(packed, offset);
        const len = varint[0]
        offset = varint[1];
        let idx_i = 0;

        let octants = new Uint8Array(verticesLength);

        for (let i = 0; i < len; i++) {
            const varint = MeshDecoder.unpackVarInt(packed, offset);
            const v = varint[0];
            offset = varint[1];
            for (let j = 0; j < v; j++) {
                const idx = indices[idx_i++];
                octants[idx] = i & 7;
            }
        }

        return octants;
    }

    public static unpackLayerBounds(packed: Uint8Array): Array<number> {
        let offset = 0;
        const varint = MeshDecoder.unpackVarInt(packed, offset);
        const len = varint[0]
        offset = varint[1];
        let k = 0;
        let m = 0;

        let layer_bounds = new Array(10);

        for (let i = 0; i < len; i++) {
            if (0 == i % 8) {
                if (!(m < 10)) {
                    throw Error("Invalid m?");
                }
                layer_bounds[m++] = k;
            }
            const varint = MeshDecoder.unpackVarInt(packed, offset);
            const v = varint[0];
            offset = varint[1];
            k += v;
        }

        for (; 10 > m; m++) layer_bounds[m] = k;

        return layer_bounds;
    }
}