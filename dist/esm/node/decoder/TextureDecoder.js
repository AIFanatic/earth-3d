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
var crn = require('./crn.js');
var TextureDecoder = /** @class */ (function () {
    function TextureDecoder() {
    }
    TextureDecoder.arrayBufferCopy = function (src, dst, dstByteOffset, numBytes) {
        var dst32Offset = dstByteOffset / 4;
        var tail = (numBytes % 4);
        var src32 = new Uint32Array(src.buffer, 0, (numBytes - tail) / 4);
        var dst32 = new Uint32Array(dst.buffer);
        for (var i = 0; i < src32.length; i++) {
            dst32[dst32Offset + i] = src32[i];
        }
        for (var i = numBytes - tail; i < numBytes; i++) {
            dst[dstByteOffset + i] = src[i];
        }
    };
    TextureDecoder.unpackTextureFormat = function (available_texture_formats, default_available_texture_formats) {
        var e_1, _a;
        var texture_format;
        var supported = [6, 1]; // [TextureFormat.Texture_Format_CRN_DXT1, TextureFormat.Texture_Format_JPG];
        var available = available_texture_formats ? available_texture_formats : default_available_texture_formats;
        try {
            for (var supported_1 = __values(supported), supported_1_1 = supported_1.next(); !supported_1_1.done; supported_1_1 = supported_1.next()) {
                var s = supported_1_1.value;
                if (available & (1 << (s - 1))) {
                    texture_format = s;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (supported_1_1 && !supported_1_1.done && (_a = supported_1.return)) _a.call(supported_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return texture_format;
    };
    TextureDecoder.unpackImageryEpoch = function (flags, imagery_epoch, default_imagery_epoch) {
        // set imagery epoch if flags say it should be used
        var _imagery_epoch = 0;
        if ((flags & 16) != 0) { // 16 == NodeMetadata.Flags.USE_IMAGERY_EPOCH.value
            _imagery_epoch = imagery_epoch ? imagery_epoch : default_imagery_epoch;
        }
        return _imagery_epoch;
    };
    TextureDecoder.unpackUvOffsetAndScale = function (texture, uv_offset_and_scale) {
        var u_mod = texture.format == 6 ? texture.width : 0xffff + 1;
        var v_mod = texture.format == 6 ? texture.height : 0xffff + 1;
        var uv_offset = { x: 0.5, y: 0.5 };
        var uv_scale = { x: 1.0 / u_mod, y: 1.0 / v_mod };
        if (uv_offset_and_scale.length == 4) {
            uv_offset.x = uv_offset_and_scale[0];
            uv_offset.y = uv_offset_and_scale[1];
            uv_scale.x = uv_offset_and_scale[2];
            uv_scale.y = uv_offset_and_scale[3];
        }
        uv_offset.y -= 1 / uv_scale.y;
        uv_scale.y *= -1;
        return {
            uv_offset: uv_offset,
            uv_scale: uv_scale
        };
    };
    TextureDecoder.unpackTexCoords = function (packed, texture, verticesLength) {
        if (!(verticesLength * 4 == (packed.length - 4) && packed.length >= 4)) {
            throw Error("Invalid packed size");
        }
        var u_mod = texture.format == 6 ? texture.width : 0xffff + 1;
        var v_mod = texture.format == 6 ? texture.height : 0xffff + 1;
        // First 2 bytes are u_mod and v_mod
        var offset = 4;
        var u = 0, v = 0;
        var uvs = new Uint16Array(verticesLength * 2);
        for (var i = 0, j = 0; i < verticesLength; i++, j += 2) {
            u = (u + packed[verticesLength * 0 + i + offset] + (packed[verticesLength * 2 + i + offset] << 8)) % u_mod;
            v = (v + packed[verticesLength * 1 + i + offset] + (packed[verticesLength * 3 + i + offset] << 8)) % v_mod;
            uvs[j + 0] = u;
            uvs[j + 1] = v;
        }
        return uvs;
    };
    TextureDecoder.unpackCRN = function (data, width, height, convertToBMP) {
        if (convertToBMP === void 0) { convertToBMP = true; }
        var srcSize = data.byteLength;
        var bytes = new Uint8Array(data);
        var src = crn.Module._malloc(srcSize);
        TextureDecoder.arrayBufferCopy(bytes, crn.Module.HEAPU8, src, srcSize);
        // const width = crn.Module._crn_get_width(src, srcSize);
        // const height = crn.Module._crn_get_height(src, srcSize);
        // const levels = crn.Module._crn_get_levels(src, srcSize);
        // const format = crn.Module._crn_get_dxt_format(src, srcSize);
        var dstSize = crn.Module._crn_get_uncompressed_size(src, srcSize);
        var dst = crn.Module._malloc(dstSize);
        crn.Module._crn_decompress(src, srcSize, dst, dstSize, 0);
        var texture = new Uint8Array(crn.Module.HEAPU8.buffer, dst, dstSize);
        if (convertToBMP) {
            texture = TextureDecoder.dxtToRgb565(crn.Module.HEAPU16, dst / 2, width, height);
        }
        crn.Module._free(src);
        crn.Module._free(dst);
        return texture;
    };
    TextureDecoder.dxtToRgb565 = function (src, src16Offset, width, height) {
        var c = new Uint16Array(4);
        var dst = new Uint16Array(width * height);
        var nWords = (width * height) / 4;
        var m = 0;
        var dstI = 0;
        var i = 0;
        var r0 = 0, g0 = 0, b0 = 0, r1 = 0, g1 = 0, b1 = 0;
        var blockWidth = width / 4;
        var blockHeight = height / 4;
        for (var blockY = 0; blockY < blockHeight; blockY++) {
            for (var blockX = 0; blockX < blockWidth; blockX++) {
                i = src16Offset + 4 * (blockY * blockWidth + blockX);
                c[0] = src[i];
                c[1] = src[i + 1];
                r0 = c[0] & 0x1f;
                g0 = c[0] & 0x7e0;
                b0 = c[0] & 0xf800;
                r1 = c[1] & 0x1f;
                g1 = c[1] & 0x7e0;
                b1 = c[1] & 0xf800;
                // Interpolate between c0 and c1 to get c2 and c3.
                // Note that we approximate 1/3 as 3/8 and 2/3 as 5/8 for
                // speed.  This also appears to be what the hardware DXT
                // decoder in many GPUs does :)
                c[2] = ((5 * r0 + 3 * r1) >> 3)
                    | (((5 * g0 + 3 * g1) >> 3) & 0x7e0)
                    | (((5 * b0 + 3 * b1) >> 3) & 0xf800);
                c[3] = ((5 * r1 + 3 * r0) >> 3)
                    | (((5 * g1 + 3 * g0) >> 3) & 0x7e0)
                    | (((5 * b1 + 3 * b0) >> 3) & 0xf800);
                m = src[i + 2];
                dstI = (blockY * 4) * width + blockX * 4;
                dst[dstI] = c[m & 0x3];
                dst[dstI + 1] = c[(m >> 2) & 0x3];
                dst[dstI + 2] = c[(m >> 4) & 0x3];
                dst[dstI + 3] = c[(m >> 6) & 0x3];
                dstI += width;
                dst[dstI] = c[(m >> 8) & 0x3];
                dst[dstI + 1] = c[(m >> 10) & 0x3];
                dst[dstI + 2] = c[(m >> 12) & 0x3];
                dst[dstI + 3] = c[(m >> 14)];
                m = src[i + 3];
                dstI += width;
                dst[dstI] = c[m & 0x3];
                dst[dstI + 1] = c[(m >> 2) & 0x3];
                dst[dstI + 2] = c[(m >> 4) & 0x3];
                dst[dstI + 3] = c[(m >> 6) & 0x3];
                dstI += width;
                dst[dstI] = c[(m >> 8) & 0x3];
                dst[dstI + 1] = c[(m >> 10) & 0x3];
                dst[dstI + 2] = c[(m >> 12) & 0x3];
                dst[dstI + 3] = c[(m >> 14)];
            }
        }
        return dst;
    };
    return TextureDecoder;
}());
export { TextureDecoder };
//# sourceMappingURL=TextureDecoder.js.map