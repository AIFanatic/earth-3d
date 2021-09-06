var earth3d = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb2, mod) => function __require() {
    return mod || (0, cb2[Object.keys(cb2)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e2) {
          reject(e2);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e2) {
          reject(e2);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e2, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i2 = isLE ? nBytes - 1 : 0;
        var d2 = isLE ? -1 : 1;
        var s = buffer[offset + i2];
        i2 += d2;
        e2 = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e2 = e2 * 256 + buffer[offset + i2], i2 += d2, nBits -= 8) {
        }
        m = e2 & (1 << -nBits) - 1;
        e2 >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i2], i2 += d2, nBits -= 8) {
        }
        if (e2 === 0) {
          e2 = 1 - eBias;
        } else if (e2 === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e2 = e2 - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e2 - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e2, m, c2;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i2 = isLE ? 0 : nBytes - 1;
        var d2 = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e2 = eMax;
        } else {
          e2 = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c2 = Math.pow(2, -e2)) < 1) {
            e2--;
            c2 *= 2;
          }
          if (e2 + eBias >= 1) {
            value += rt / c2;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c2 >= 2) {
            e2++;
            c2 /= 2;
          }
          if (e2 + eBias >= eMax) {
            m = 0;
            e2 = eMax;
          } else if (e2 + eBias >= 1) {
            m = (value * c2 - 1) * Math.pow(2, mLen);
            e2 = e2 + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e2 = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i2] = m & 255, i2 += d2, m /= 256, mLen -= 8) {
        }
        e2 = e2 << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i2] = e2 & 255, i2 += d2, e2 /= 256, eLen -= 8) {
        }
        buffer[offset + i2 - d2] |= s * 128;
      };
    }
  });

  // node_modules/pbf/index.js
  var require_pbf = __commonJS({
    "node_modules/pbf/index.js"(exports, module) {
      "use strict";
      module.exports = Pbf2;
      var ieee754 = require_ieee754();
      function Pbf2(buf) {
        this.buf = ArrayBuffer.isView && ArrayBuffer.isView(buf) ? buf : new Uint8Array(buf || 0);
        this.pos = 0;
        this.type = 0;
        this.length = this.buf.length;
      }
      Pbf2.Varint = 0;
      Pbf2.Fixed64 = 1;
      Pbf2.Bytes = 2;
      Pbf2.Fixed32 = 5;
      var SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
      var SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
      var TEXT_DECODER_MIN_LENGTH = 12;
      var utf8TextDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder("utf8");
      Pbf2.prototype = {
        destroy: function() {
          this.buf = null;
        },
        readFields: function(readField, result, end) {
          end = end || this.length;
          while (this.pos < end) {
            var val = this.readVarint(), tag = val >> 3, startPos = this.pos;
            this.type = val & 7;
            readField(tag, result, this);
            if (this.pos === startPos)
              this.skip(val);
          }
          return result;
        },
        readMessage: function(readField, result) {
          return this.readFields(readField, result, this.readVarint() + this.pos);
        },
        readFixed32: function() {
          var val = readUInt32(this.buf, this.pos);
          this.pos += 4;
          return val;
        },
        readSFixed32: function() {
          var val = readInt32(this.buf, this.pos);
          this.pos += 4;
          return val;
        },
        readFixed64: function() {
          var val = readUInt32(this.buf, this.pos) + readUInt32(this.buf, this.pos + 4) * SHIFT_LEFT_32;
          this.pos += 8;
          return val;
        },
        readSFixed64: function() {
          var val = readUInt32(this.buf, this.pos) + readInt32(this.buf, this.pos + 4) * SHIFT_LEFT_32;
          this.pos += 8;
          return val;
        },
        readFloat: function() {
          var val = ieee754.read(this.buf, this.pos, true, 23, 4);
          this.pos += 4;
          return val;
        },
        readDouble: function() {
          var val = ieee754.read(this.buf, this.pos, true, 52, 8);
          this.pos += 8;
          return val;
        },
        readVarint: function(isSigned) {
          var buf = this.buf, val, b2;
          b2 = buf[this.pos++];
          val = b2 & 127;
          if (b2 < 128)
            return val;
          b2 = buf[this.pos++];
          val |= (b2 & 127) << 7;
          if (b2 < 128)
            return val;
          b2 = buf[this.pos++];
          val |= (b2 & 127) << 14;
          if (b2 < 128)
            return val;
          b2 = buf[this.pos++];
          val |= (b2 & 127) << 21;
          if (b2 < 128)
            return val;
          b2 = buf[this.pos];
          val |= (b2 & 15) << 28;
          return readVarintRemainder(val, isSigned, this);
        },
        readVarint64: function() {
          return this.readVarint(true);
        },
        readSVarint: function() {
          var num = this.readVarint();
          return num % 2 === 1 ? (num + 1) / -2 : num / 2;
        },
        readBoolean: function() {
          return Boolean(this.readVarint());
        },
        readString: function() {
          var end = this.readVarint() + this.pos;
          var pos = this.pos;
          this.pos = end;
          if (end - pos >= TEXT_DECODER_MIN_LENGTH && utf8TextDecoder) {
            return readUtf8TextDecoder(this.buf, pos, end);
          }
          return readUtf8(this.buf, pos, end);
        },
        readBytes: function() {
          var end = this.readVarint() + this.pos, buffer = this.buf.subarray(this.pos, end);
          this.pos = end;
          return buffer;
        },
        readPackedVarint: function(arr, isSigned) {
          if (this.type !== Pbf2.Bytes)
            return arr.push(this.readVarint(isSigned));
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readVarint(isSigned));
          return arr;
        },
        readPackedSVarint: function(arr) {
          if (this.type !== Pbf2.Bytes)
            return arr.push(this.readSVarint());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readSVarint());
          return arr;
        },
        readPackedBoolean: function(arr) {
          if (this.type !== Pbf2.Bytes)
            return arr.push(this.readBoolean());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readBoolean());
          return arr;
        },
        readPackedFloat: function(arr) {
          if (this.type !== Pbf2.Bytes)
            return arr.push(this.readFloat());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readFloat());
          return arr;
        },
        readPackedDouble: function(arr) {
          if (this.type !== Pbf2.Bytes)
            return arr.push(this.readDouble());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readDouble());
          return arr;
        },
        readPackedFixed32: function(arr) {
          if (this.type !== Pbf2.Bytes)
            return arr.push(this.readFixed32());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readFixed32());
          return arr;
        },
        readPackedSFixed32: function(arr) {
          if (this.type !== Pbf2.Bytes)
            return arr.push(this.readSFixed32());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readSFixed32());
          return arr;
        },
        readPackedFixed64: function(arr) {
          if (this.type !== Pbf2.Bytes)
            return arr.push(this.readFixed64());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readFixed64());
          return arr;
        },
        readPackedSFixed64: function(arr) {
          if (this.type !== Pbf2.Bytes)
            return arr.push(this.readSFixed64());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readSFixed64());
          return arr;
        },
        skip: function(val) {
          var type = val & 7;
          if (type === Pbf2.Varint)
            while (this.buf[this.pos++] > 127) {
            }
          else if (type === Pbf2.Bytes)
            this.pos = this.readVarint() + this.pos;
          else if (type === Pbf2.Fixed32)
            this.pos += 4;
          else if (type === Pbf2.Fixed64)
            this.pos += 8;
          else
            throw new Error("Unimplemented type: " + type);
        },
        writeTag: function(tag, type) {
          this.writeVarint(tag << 3 | type);
        },
        realloc: function(min) {
          var length = this.length || 16;
          while (length < this.pos + min)
            length *= 2;
          if (length !== this.length) {
            var buf = new Uint8Array(length);
            buf.set(this.buf);
            this.buf = buf;
            this.length = length;
          }
        },
        finish: function() {
          this.length = this.pos;
          this.pos = 0;
          return this.buf.subarray(0, this.length);
        },
        writeFixed32: function(val) {
          this.realloc(4);
          writeInt32(this.buf, val, this.pos);
          this.pos += 4;
        },
        writeSFixed32: function(val) {
          this.realloc(4);
          writeInt32(this.buf, val, this.pos);
          this.pos += 4;
        },
        writeFixed64: function(val) {
          this.realloc(8);
          writeInt32(this.buf, val & -1, this.pos);
          writeInt32(this.buf, Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
          this.pos += 8;
        },
        writeSFixed64: function(val) {
          this.realloc(8);
          writeInt32(this.buf, val & -1, this.pos);
          writeInt32(this.buf, Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
          this.pos += 8;
        },
        writeVarint: function(val) {
          val = +val || 0;
          if (val > 268435455 || val < 0) {
            writeBigVarint(val, this);
            return;
          }
          this.realloc(4);
          this.buf[this.pos++] = val & 127 | (val > 127 ? 128 : 0);
          if (val <= 127)
            return;
          this.buf[this.pos++] = (val >>>= 7) & 127 | (val > 127 ? 128 : 0);
          if (val <= 127)
            return;
          this.buf[this.pos++] = (val >>>= 7) & 127 | (val > 127 ? 128 : 0);
          if (val <= 127)
            return;
          this.buf[this.pos++] = val >>> 7 & 127;
        },
        writeSVarint: function(val) {
          this.writeVarint(val < 0 ? -val * 2 - 1 : val * 2);
        },
        writeBoolean: function(val) {
          this.writeVarint(Boolean(val));
        },
        writeString: function(str) {
          str = String(str);
          this.realloc(str.length * 4);
          this.pos++;
          var startPos = this.pos;
          this.pos = writeUtf8(this.buf, str, this.pos);
          var len = this.pos - startPos;
          if (len >= 128)
            makeRoomForExtraLength(startPos, len, this);
          this.pos = startPos - 1;
          this.writeVarint(len);
          this.pos += len;
        },
        writeFloat: function(val) {
          this.realloc(4);
          ieee754.write(this.buf, val, this.pos, true, 23, 4);
          this.pos += 4;
        },
        writeDouble: function(val) {
          this.realloc(8);
          ieee754.write(this.buf, val, this.pos, true, 52, 8);
          this.pos += 8;
        },
        writeBytes: function(buffer) {
          var len = buffer.length;
          this.writeVarint(len);
          this.realloc(len);
          for (var i2 = 0; i2 < len; i2++)
            this.buf[this.pos++] = buffer[i2];
        },
        writeRawMessage: function(fn, obj) {
          this.pos++;
          var startPos = this.pos;
          fn(obj, this);
          var len = this.pos - startPos;
          if (len >= 128)
            makeRoomForExtraLength(startPos, len, this);
          this.pos = startPos - 1;
          this.writeVarint(len);
          this.pos += len;
        },
        writeMessage: function(tag, fn, obj) {
          this.writeTag(tag, Pbf2.Bytes);
          this.writeRawMessage(fn, obj);
        },
        writePackedVarint: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedVarint, arr);
        },
        writePackedSVarint: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedSVarint, arr);
        },
        writePackedBoolean: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedBoolean, arr);
        },
        writePackedFloat: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedFloat, arr);
        },
        writePackedDouble: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedDouble, arr);
        },
        writePackedFixed32: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedFixed32, arr);
        },
        writePackedSFixed32: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedSFixed32, arr);
        },
        writePackedFixed64: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedFixed64, arr);
        },
        writePackedSFixed64: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedSFixed64, arr);
        },
        writeBytesField: function(tag, buffer) {
          this.writeTag(tag, Pbf2.Bytes);
          this.writeBytes(buffer);
        },
        writeFixed32Field: function(tag, val) {
          this.writeTag(tag, Pbf2.Fixed32);
          this.writeFixed32(val);
        },
        writeSFixed32Field: function(tag, val) {
          this.writeTag(tag, Pbf2.Fixed32);
          this.writeSFixed32(val);
        },
        writeFixed64Field: function(tag, val) {
          this.writeTag(tag, Pbf2.Fixed64);
          this.writeFixed64(val);
        },
        writeSFixed64Field: function(tag, val) {
          this.writeTag(tag, Pbf2.Fixed64);
          this.writeSFixed64(val);
        },
        writeVarintField: function(tag, val) {
          this.writeTag(tag, Pbf2.Varint);
          this.writeVarint(val);
        },
        writeSVarintField: function(tag, val) {
          this.writeTag(tag, Pbf2.Varint);
          this.writeSVarint(val);
        },
        writeStringField: function(tag, str) {
          this.writeTag(tag, Pbf2.Bytes);
          this.writeString(str);
        },
        writeFloatField: function(tag, val) {
          this.writeTag(tag, Pbf2.Fixed32);
          this.writeFloat(val);
        },
        writeDoubleField: function(tag, val) {
          this.writeTag(tag, Pbf2.Fixed64);
          this.writeDouble(val);
        },
        writeBooleanField: function(tag, val) {
          this.writeVarintField(tag, Boolean(val));
        }
      };
      function readVarintRemainder(l2, s, p) {
        var buf = p.buf, h2, b2;
        b2 = buf[p.pos++];
        h2 = (b2 & 112) >> 4;
        if (b2 < 128)
          return toNum(l2, h2, s);
        b2 = buf[p.pos++];
        h2 |= (b2 & 127) << 3;
        if (b2 < 128)
          return toNum(l2, h2, s);
        b2 = buf[p.pos++];
        h2 |= (b2 & 127) << 10;
        if (b2 < 128)
          return toNum(l2, h2, s);
        b2 = buf[p.pos++];
        h2 |= (b2 & 127) << 17;
        if (b2 < 128)
          return toNum(l2, h2, s);
        b2 = buf[p.pos++];
        h2 |= (b2 & 127) << 24;
        if (b2 < 128)
          return toNum(l2, h2, s);
        b2 = buf[p.pos++];
        h2 |= (b2 & 1) << 31;
        if (b2 < 128)
          return toNum(l2, h2, s);
        throw new Error("Expected varint not more than 10 bytes");
      }
      function readPackedEnd(pbf) {
        return pbf.type === Pbf2.Bytes ? pbf.readVarint() + pbf.pos : pbf.pos + 1;
      }
      function toNum(low, high, isSigned) {
        if (isSigned) {
          return high * 4294967296 + (low >>> 0);
        }
        return (high >>> 0) * 4294967296 + (low >>> 0);
      }
      function writeBigVarint(val, pbf) {
        var low, high;
        if (val >= 0) {
          low = val % 4294967296 | 0;
          high = val / 4294967296 | 0;
        } else {
          low = ~(-val % 4294967296);
          high = ~(-val / 4294967296);
          if (low ^ 4294967295) {
            low = low + 1 | 0;
          } else {
            low = 0;
            high = high + 1 | 0;
          }
        }
        if (val >= 18446744073709552e3 || val < -18446744073709552e3) {
          throw new Error("Given varint doesn't fit into 10 bytes");
        }
        pbf.realloc(10);
        writeBigVarintLow(low, high, pbf);
        writeBigVarintHigh(high, pbf);
      }
      function writeBigVarintLow(low, high, pbf) {
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos] = low & 127;
      }
      function writeBigVarintHigh(high, pbf) {
        var lsb = (high & 7) << 4;
        pbf.buf[pbf.pos++] |= lsb | ((high >>>= 3) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127;
      }
      function makeRoomForExtraLength(startPos, len, pbf) {
        var extraLen = len <= 16383 ? 1 : len <= 2097151 ? 2 : len <= 268435455 ? 3 : Math.floor(Math.log(len) / (Math.LN2 * 7));
        pbf.realloc(extraLen);
        for (var i2 = pbf.pos - 1; i2 >= startPos; i2--)
          pbf.buf[i2 + extraLen] = pbf.buf[i2];
      }
      function writePackedVarint(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeVarint(arr[i2]);
      }
      function writePackedSVarint(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeSVarint(arr[i2]);
      }
      function writePackedFloat(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeFloat(arr[i2]);
      }
      function writePackedDouble(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeDouble(arr[i2]);
      }
      function writePackedBoolean(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeBoolean(arr[i2]);
      }
      function writePackedFixed32(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeFixed32(arr[i2]);
      }
      function writePackedSFixed32(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeSFixed32(arr[i2]);
      }
      function writePackedFixed64(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeFixed64(arr[i2]);
      }
      function writePackedSFixed64(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeSFixed64(arr[i2]);
      }
      function readUInt32(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16) + buf[pos + 3] * 16777216;
      }
      function writeInt32(buf, val, pos) {
        buf[pos] = val;
        buf[pos + 1] = val >>> 8;
        buf[pos + 2] = val >>> 16;
        buf[pos + 3] = val >>> 24;
      }
      function readInt32(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16) + (buf[pos + 3] << 24);
      }
      function readUtf8(buf, pos, end) {
        var str = "";
        var i2 = pos;
        while (i2 < end) {
          var b0 = buf[i2];
          var c2 = null;
          var bytesPerSequence = b0 > 239 ? 4 : b0 > 223 ? 3 : b0 > 191 ? 2 : 1;
          if (i2 + bytesPerSequence > end)
            break;
          var b1, b2, b3;
          if (bytesPerSequence === 1) {
            if (b0 < 128) {
              c2 = b0;
            }
          } else if (bytesPerSequence === 2) {
            b1 = buf[i2 + 1];
            if ((b1 & 192) === 128) {
              c2 = (b0 & 31) << 6 | b1 & 63;
              if (c2 <= 127) {
                c2 = null;
              }
            }
          } else if (bytesPerSequence === 3) {
            b1 = buf[i2 + 1];
            b2 = buf[i2 + 2];
            if ((b1 & 192) === 128 && (b2 & 192) === 128) {
              c2 = (b0 & 15) << 12 | (b1 & 63) << 6 | b2 & 63;
              if (c2 <= 2047 || c2 >= 55296 && c2 <= 57343) {
                c2 = null;
              }
            }
          } else if (bytesPerSequence === 4) {
            b1 = buf[i2 + 1];
            b2 = buf[i2 + 2];
            b3 = buf[i2 + 3];
            if ((b1 & 192) === 128 && (b2 & 192) === 128 && (b3 & 192) === 128) {
              c2 = (b0 & 15) << 18 | (b1 & 63) << 12 | (b2 & 63) << 6 | b3 & 63;
              if (c2 <= 65535 || c2 >= 1114112) {
                c2 = null;
              }
            }
          }
          if (c2 === null) {
            c2 = 65533;
            bytesPerSequence = 1;
          } else if (c2 > 65535) {
            c2 -= 65536;
            str += String.fromCharCode(c2 >>> 10 & 1023 | 55296);
            c2 = 56320 | c2 & 1023;
          }
          str += String.fromCharCode(c2);
          i2 += bytesPerSequence;
        }
        return str;
      }
      function readUtf8TextDecoder(buf, pos, end) {
        return utf8TextDecoder.decode(buf.subarray(pos, end));
      }
      function writeUtf8(buf, str, pos) {
        for (var i2 = 0, c2, lead; i2 < str.length; i2++) {
          c2 = str.charCodeAt(i2);
          if (c2 > 55295 && c2 < 57344) {
            if (lead) {
              if (c2 < 56320) {
                buf[pos++] = 239;
                buf[pos++] = 191;
                buf[pos++] = 189;
                lead = c2;
                continue;
              } else {
                c2 = lead - 55296 << 10 | c2 - 56320 | 65536;
                lead = null;
              }
            } else {
              if (c2 > 56319 || i2 + 1 === str.length) {
                buf[pos++] = 239;
                buf[pos++] = 191;
                buf[pos++] = 189;
              } else {
                lead = c2;
              }
              continue;
            }
          } else if (lead) {
            buf[pos++] = 239;
            buf[pos++] = 191;
            buf[pos++] = 189;
            lead = null;
          }
          if (c2 < 128) {
            buf[pos++] = c2;
          } else {
            if (c2 < 2048) {
              buf[pos++] = c2 >> 6 | 192;
            } else {
              if (c2 < 65536) {
                buf[pos++] = c2 >> 12 | 224;
              } else {
                buf[pos++] = c2 >> 18 | 240;
                buf[pos++] = c2 >> 12 & 63 | 128;
              }
              buf[pos++] = c2 >> 6 & 63 | 128;
            }
            buf[pos++] = c2 & 63 | 128;
          }
        }
        return pos;
      }
    }
  });

  // node_modules/lru_map/dist/lru.js
  var require_lru = __commonJS({
    "node_modules/lru_map/dist/lru.js"(exports, module) {
      !function(g, c2) {
        typeof exports == "object" && typeof module != "undefined" ? c2(exports) : typeof define == "function" && define.amd ? define(["exports"], c2) : c2((g = g || self).lru_map = g.lru_map || {});
      }(exports, function(g) {
        const c2 = Symbol("newer"), e2 = Symbol("older");
        class n2 {
          constructor(a2, b2) {
            typeof a2 !== "number" && (b2 = a2, a2 = 0), this.size = 0, this.limit = a2, this.oldest = this.newest = void 0, this._keymap = new Map(), b2 && (this.assign(b2), a2 < 1 && (this.limit = this.size));
          }
          _markEntryAsUsed(a2) {
            if (a2 === this.newest)
              return;
            a2[c2] && (a2 === this.oldest && (this.oldest = a2[c2]), a2[c2][e2] = a2[e2]), a2[e2] && (a2[e2][c2] = a2[c2]), a2[c2] = void 0, a2[e2] = this.newest, this.newest && (this.newest[c2] = a2), this.newest = a2;
          }
          assign(a2) {
            let b2, d2 = this.limit || Number.MAX_VALUE;
            this._keymap.clear();
            let m = a2[Symbol.iterator]();
            for (let h2 = m.next(); !h2.done; h2 = m.next()) {
              let f2 = new l2(h2.value[0], h2.value[1]);
              this._keymap.set(f2.key, f2), b2 ? (b2[c2] = f2, f2[e2] = b2) : this.oldest = f2, b2 = f2;
              if (d2-- == 0)
                throw new Error("overflow");
            }
            this.newest = b2, this.size = this._keymap.size;
          }
          get(a2) {
            var b2 = this._keymap.get(a2);
            return b2 ? (this._markEntryAsUsed(b2), b2.value) : void 0;
          }
          set(a2, b2) {
            var d2 = this._keymap.get(a2);
            return d2 ? (d2.value = b2, this._markEntryAsUsed(d2), this) : (this._keymap.set(a2, d2 = new l2(a2, b2)), this.newest ? (this.newest[c2] = d2, d2[e2] = this.newest) : this.oldest = d2, this.newest = d2, ++this.size, this.size > this.limit && this.shift(), this);
          }
          shift() {
            var a2 = this.oldest;
            if (a2)
              return this.oldest[c2] ? (this.oldest = this.oldest[c2], this.oldest[e2] = void 0) : (this.oldest = void 0, this.newest = void 0), a2[c2] = a2[e2] = void 0, this._keymap.delete(a2.key), --this.size, [a2.key, a2.value];
          }
          find(a2) {
            let b2 = this._keymap.get(a2);
            return b2 ? b2.value : void 0;
          }
          has(a2) {
            return this._keymap.has(a2);
          }
          delete(a2) {
            var b2 = this._keymap.get(a2);
            return b2 ? (this._keymap.delete(b2.key), b2[c2] && b2[e2] ? (b2[e2][c2] = b2[c2], b2[c2][e2] = b2[e2]) : b2[c2] ? (b2[c2][e2] = void 0, this.oldest = b2[c2]) : b2[e2] ? (b2[e2][c2] = void 0, this.newest = b2[e2]) : this.oldest = this.newest = void 0, this.size--, b2.value) : void 0;
          }
          clear() {
            this.oldest = this.newest = void 0, this.size = 0, this._keymap.clear();
          }
          keys() {
            return new j(this.oldest);
          }
          values() {
            return new k(this.oldest);
          }
          entries() {
            return this;
          }
          [Symbol.iterator]() {
            return new i2(this.oldest);
          }
          forEach(a2, b2) {
            typeof b2 !== "object" && (b2 = this);
            let d2 = this.oldest;
            for (; d2; )
              a2.call(b2, d2.value, d2.key, this), d2 = d2[c2];
          }
          toJSON() {
            for (var a2 = new Array(this.size), b2 = 0, d2 = this.oldest; d2; )
              a2[b2++] = { key: d2.key, value: d2.value }, d2 = d2[c2];
            return a2;
          }
          toString() {
            for (var a2 = "", b2 = this.oldest; b2; )
              a2 += String(b2.key) + ":" + b2.value, b2 = b2[c2], b2 && (a2 += " < ");
            return a2;
          }
        }
        g.LRUMap = n2;
        function l2(a2, b2) {
          this.key = a2, this.value = b2, this[c2] = void 0, this[e2] = void 0;
        }
        function i2(a2) {
          this.entry = a2;
        }
        i2.prototype[Symbol.iterator] = function() {
          return this;
        }, i2.prototype.next = function() {
          let a2 = this.entry;
          return a2 ? (this.entry = a2[c2], { done: false, value: [a2.key, a2.value] }) : { done: true, value: void 0 };
        };
        function j(a2) {
          this.entry = a2;
        }
        j.prototype[Symbol.iterator] = function() {
          return this;
        }, j.prototype.next = function() {
          let a2 = this.entry;
          return a2 ? (this.entry = a2[c2], { done: false, value: a2.key }) : { done: true, value: void 0 };
        };
        function k(a2) {
          this.entry = a2;
        }
        k.prototype[Symbol.iterator] = function() {
          return this;
        }, k.prototype.next = function() {
          let a2 = this.entry;
          return a2 ? (this.entry = a2[c2], { done: false, value: a2.value }) : { done: true, value: void 0 };
        };
      });
    }
  });

  // src/node/decoder/crn.js
  var crn_exports = {};
  __export(crn_exports, {
    Module: () => Module
  });
  function Qa(r2) {
    eval.call(n, r2);
  }
  function Ta(r2) {
    if (Ua == 1)
      return 1;
    var e2 = { "%i1": 1, "%i8": 1, "%i16": 2, "%i32": 4, "%i64": 8, "%float": 4, "%double": 8 }["%" + r2];
    return e2 || (r2[r2.length - 1] == "*" ? e2 = Ua : r2[0] == "i" && (Xa((r2 = parseInt(r2.substr(1))) % 8 == 0), e2 = r2 / 8)), e2;
  }
  function Ya(r2) {
    var e2 = v;
    return v = (v += r2) + 3 >> 2 << 2, e2;
  }
  function ab(r2) {
    var e2 = bb;
    if ((bb = (bb += r2) + 3 >> 2 << 2) >= cb) {
      for (; cb <= bb; )
        cb = 2 * cb + 4095 >> 12 << 12;
      r2 = z;
      var i2 = new ArrayBuffer(cb);
      z = new Int8Array(i2), hb = new Int16Array(i2), A = new Int32Array(i2), B = new Uint8Array(i2), C = new Uint16Array(i2), E = new Uint32Array(i2), ib = new Float32Array(i2), lb = new Float64Array(i2), z.set(r2);
    }
    return e2;
  }
  function vb(r2) {
    Module.print(r2 + ":\n" + Error().stack), b("Assertion: " + r2);
  }
  function Xa(r2, e2) {
    r2 || vb("Assertion failed: " + e2);
  }
  function Ib(a, c, d, f) {
    var e = 0;
    try {
      var i = eval("_" + a);
    } catch (r2) {
      try {
        i = Hb.Module["_" + a];
      } catch (r3) {
      }
    }
    Xa(i, "Cannot call unknown function " + a + " (perhaps LLVM optimizations or closure removed it?)");
    var h = 0, a = f ? f.map(function(r2) {
      var i2 = d[h++];
      return i2 == "string" ? (e || (e = v), Pb(r2, i2 = Ya(r2.length + 1)), r2 = i2) : i2 == "array" && (e || (e = v), Qb(r2, i2 = Ya(r2.length)), r2 = i2), r2;
    }) : [], c = function(r2, e2) {
      return e2 == "string" ? Tb(r2) : (Xa(e2 != "array"), r2);
    }(i.apply(n, a), c);
    return e && (v = e), c;
  }
  function Ub(r2, e2, i2) {
    switch ((i2 = i2 || "i8")[i2.length - 1] === "*" && (i2 = "i32"), i2) {
      case "i1":
      case "i8":
        z[r2] = e2;
        break;
      case "i16":
        hb[r2 >> 1] = e2;
        break;
      case "i32":
      case "i64":
        A[r2 >> 2] = e2;
        break;
      case "float":
        ib[r2 >> 2] = e2;
        break;
      case "double":
        Vb[0] = e2, A[r2 >> 2] = Wb[0], A[r2 + 4 >> 2] = Wb[1];
        break;
      default:
        vb("invalid type for setValue: " + i2);
    }
  }
  function N(e2, i2, a2) {
    var t, A2;
    typeof e2 == "number" ? (t = l, A2 = e2) : (t = r, A2 = e2.length);
    var o, f2 = typeof i2 == "string" ? i2 : n;
    a2 = [Yb, Ya, ab][a2 === aa ? I : a2](Math.max(A2, f2 ? 1 : i2.length));
    if (t)
      return Zb(a2, 0, A2), a2;
    for (t = 0; t < A2; ) {
      var c2 = e2[t];
      typeof c2 == "function" && (c2 = tb.Ib(c2)), (o = f2 || i2[t]) === 0 ? t++ : (o == "i64" && (o = "i32"), Ub(a2 + t, c2, o), t += Ta(o));
    }
    return a2;
  }
  function Tb(r2, e2) {
    for (var i2, a2 = e2 === void 0, t = "", n2 = 0, A2 = String.fromCharCode(0); (i2 = String.fromCharCode(B[r2 + n2]), !a2 || i2 != A2) && (t += i2, n2 += 1, a2 || n2 != e2); )
      ;
    return t;
  }
  function qc(r2) {
    for (; 0 < r2.length; ) {
      var e2 = r2.shift(), i2 = e2.R;
      typeof i2 == "number" && (i2 = $b[i2]), i2(e2.Za === aa ? n : e2.Za);
    }
  }
  function uc(r2, e2) {
    return Array.prototype.slice.call(z.subarray(r2, r2 + e2));
  }
  function vc(r2) {
    for (var e2 = 0; z[r2 + e2]; )
      e2++;
    return e2;
  }
  function wc(r2, e2) {
    var i2 = vc(r2);
    e2 && i2++;
    var a2 = uc(r2, i2);
    return e2 && (a2[i2 - 1] = 0), a2;
  }
  function gc(r2, e2, i2) {
    var a2 = [], t = 0;
    for (i2 === aa && (i2 = r2.length); t < i2; ) {
      var n2 = r2.charCodeAt(t);
      255 < n2 && (n2 &= 255), a2.push(n2), t += 1;
    }
    return e2 || a2.push(0), a2;
  }
  function Pb(r2, e2, i2) {
    for (var a2 = 0; a2 < r2.length; ) {
      var t = r2.charCodeAt(a2);
      255 < t && (t &= 255), z[e2 + a2] = t, a2 += 1;
    }
    i2 || (z[e2 + a2] = 0);
  }
  function Qb(r2, e2) {
    for (var i2 = 0; i2 < r2.length; i2++)
      z[e2 + i2] = r2[i2];
  }
  function xc(r2, e2) {
    return 0 <= r2 ? r2 : 32 >= e2 ? 2 * Math.abs(1 << e2 - 1) + r2 : Math.pow(2, e2) + r2;
  }
  function yc(r2, e2) {
    if (0 >= r2)
      return r2;
    var i2 = 32 >= e2 ? Math.abs(1 << e2 - 1) : Math.pow(2, e2 - 1);
    return r2 >= i2 && (32 >= e2 || r2 > i2) && (r2 = -2 * i2 + r2), r2;
  }
  function Dc(r2) {
    return r2 = r2 - 1 | 0, r2 |= r2 >>> 16, r2 |= r2 >>> 8, r2 |= r2 >>> 4, 1 + ((r2 |= r2 >>> 2) >>> 1 | r2) | 0;
  }
  function Ec(r2, e2) {
    for (var i2 = 0 | R.Ka, a2 = v, t = 0 | a2, n2 = (i2 = (ub = v += 512, v += 12, A[ub >> 2] = i2, A[ub + 4 >> 2] = e2, A[ub + 8 >> 2] = r2, ub), (i2 = Fc(0 | R.Ca, i2)).length), o = 0; o < n2; o++)
      z[t + o] = i2[o];
    z[t + o] = 0, ub = v, v = (v += 1) + 3 >> 2 << 2, A[ub >> 2] = 0, n2 = ub, i2 = A[Gc >> 2], o = Fc(t, n2), t = v, n2 = N(o, "i8", Xb), (o = 1 * o.length) != 0 && Hc(i2, n2, o) == -1 && Ic[i2] && (Ic[i2].error = l), v = t, v = a2;
  }
  function Jc(r2, e2, i2, a2, t) {
    var n2, o, f2 = v;
    v += 4;
    var c2 = r2 + 4 | 0;
    o = (r2 + 8 | 0) >> 2, E[c2 >> 2] >>> 0 > E[o] >>> 0 && Ec(0 | R.Da, 2121), Math.floor(2147418112 / (a2 >>> 0)) >>> 0 > e2 >>> 0 || Ec(0 | R.Pa, 2122);
    var u = E[o], s = u >>> 0 < e2 >>> 0;
    do {
      if (s) {
        var d2 = i2 ? (0 | e2) != 0 && (e2 - 1 & e2 | 0) == 0 ? e2 : Dc(e2) : e2;
        (0 | d2) != 0 & d2 >>> 0 > u >>> 0 || Ec(0 | R.Ta, 2131);
        var l2 = d2 * a2 | 0;
        if ((0 | t) == 0) {
          var h2, b2 = A[(n2 = 0 | r2) >> 2], p = l2, T2 = f2;
          if (h2 = v, v += 4, (7 & b2 | 0) == 0 ? 2147418112 < p >>> 0 ? (Ec(0 | R.aa, 2500), T2 = 0) : (A[h2 >> 2] = p, b2 = $b[A[Kc >> 2]](b2, p, h2, 1, A[Lc >> 2]), (0 | T2) != 0 && (A[T2 >> 2] = A[h2 >> 2]), (7 & b2 | 0) != 0 && Ec(0 | R.ba, 2552), T2 = b2) : (Ec(0 | R.Fa, 2500), T2 = 0), v = h2, (0 | (h2 = T2)) == 0) {
            d2 = 0;
            break;
          }
          A[n2 >> 2] = h2;
        } else {
          if ((0 | (h2 = Mc(l2, f2))) == 0) {
            d2 = 0;
            break;
          }
          n2 = (0 | r2) >> 2, $b[t](h2, A[n2], A[c2 >> 2]), (0 | (T2 = A[n2])) != 0 && Nc(T2), A[n2] = h2;
        }
        n2 = E[f2 >> 2], A[o] = n2 >>> 0 > l2 >>> 0 ? Math.floor((n2 >>> 0) / (a2 >>> 0)) : d2;
      }
      d2 = 1;
    } while (0);
    return v = f2, d2;
  }
  function Mc(r2, e2) {
    var i2, a2 = v;
    if (v += 4, 2147418112 < (i2 = (0 | (i2 = r2 + 3 & -4)) == 0 ? 4 : i2) >>> 0)
      Ec(0 | R.aa, 2500), i2 = 0;
    else {
      A[a2 >> 2] = i2;
      var t = $b[A[Kc >> 2]](0, i2, a2, 1, A[Lc >> 2]), n2 = E[a2 >> 2];
      (0 | e2) != 0 && (A[e2 >> 2] = n2), (0 | t) == 0 | n2 >>> 0 < i2 >>> 0 ? (Ec(0 | R.Ea, 2500), i2 = 0) : ((7 & t | 0) != 0 && Ec(0 | R.ba, 2527), i2 = t);
    }
    return v = a2, i2;
  }
  function Nc(r2) {
    (0 | r2) != 0 && ((7 & r2 | 0) == 0 ? $b[A[Kc >> 2]](r2, 0, 0, 1, A[Lc >> 2]) : Ec(0 | R.Ga, 2500));
  }
  function Oc(r2, e2, i2, a2) {
    var t, n2, o, f2, c2, u = r2 >> 2, s = v;
    v += 200, f2 = s >> 2;
    var d2 = s + 64;
    o = d2 >> 2;
    var l2 = s + 132, h2 = (0 | e2) == 0 | 11 < a2 >>> 0;
    r:
      do {
        if (h2)
          var b2 = 0;
        else {
          A[u] = e2, Zb(d2, 0, 68);
          for (var p = 0; ; ) {
            var T2 = B[i2 + p | 0];
            if (T2 << 24 >> 24 != 0) {
              var k = ((255 & T2) << 2) + d2 | 0;
              A[k >> 2] = A[k >> 2] + 1 | 0;
            }
            var w = p + 1 | 0;
            if ((0 | w) == (0 | e2)) {
              var y = 1, M = -1, g = 0, I2 = 0, N2 = 0;
              break;
            }
            p = w;
          }
          for (; ; ) {
            var m = E[(y << 2 >> 2) + o];
            if ((0 | m) == 0) {
              A[(28 + (y - 1 << 2) >> 2) + u] = 0;
              var X2 = N2, S2 = I2, O = g, F = M;
            } else {
              var j = M >>> 0 < y >>> 0 ? M : y, U = g >>> 0 > y >>> 0 ? g : y, _ = y - 1 | 0;
              A[(_ << 2 >> 2) + f2] = N2;
              var V = m + N2 | 0, L = 16 - y | 0;
              A[(28 + (_ << 2) >> 2) + u] = 1 + (V - 1 << L | (1 << L) - 1) | 0, A[(96 + (_ << 2) >> 2) + u] = I2, A[l2 + (y << 2) >> 2] = I2, X2 = V, S2 = m + I2 | 0, O = U, F = j;
            }
            var H = y + 1 | 0;
            if ((0 | H) == 17)
              break;
            y = H, M = F, g = O, I2 = S2, N2 = X2 << 1;
          }
          if (A[u + 1] = S2, S2 >>> 0 > E[n2 = (r2 + 172 | 0) >> 2] >>> 0) {
            var Z = (0 | S2) != 0 && (S2 - 1 & S2 | 0) == 0 ? S2 : e2 >>> 0 < Dc(S2) >>> 0 ? e2 : Dc(S2);
            A[n2] = Z;
            var x = r2 + 176 | 0, G = A[x >> 2];
            if ((0 | G) == 0)
              var P = Z;
            else
              Pc(G), P = A[n2];
            var $ = Qc(P);
            if (A[x >> 2] = $, (0 | $) == 0) {
              b2 = 0;
              break;
            }
            var q = x;
          } else
            q = r2 + 176 | 0;
          var D = r2 + 24 | 0;
          z[D] = 255 & F, z[r2 + 25 | 0] = 255 & O;
          for (var W = 0; ; ) {
            var Y = B[i2 + W | 0], J = 255 & Y;
            if (Y << 24 >> 24 != 0) {
              (0 | A[(J << 2 >> 2) + o]) == 0 && Ec(0 | R.Ua, 2274);
              var Q = (J << 2) + l2 | 0, K = E[Q >> 2];
              A[Q >> 2] = K + 1 | 0, K >>> 0 < S2 >>> 0 || Ec(0 | R.Va, 2278), hb[A[q >> 2] + (K << 1) >> 1] = 65535 & W;
            }
            var rr = W + 1 | 0;
            if ((0 | rr) == (0 | e2))
              break;
            W = rr;
          }
          var er = B[D], ir = (255 & er) >>> 0 < a2 >>> 0 ? a2 : 0, ar = r2 + 8 | 0;
          A[ar >> 2] = ir;
          var tr = (0 | ir) != 0;
          if (tr) {
            var nr = 1 << ir, Ar = r2 + 164 | 0;
            if (nr >>> 0 > E[Ar >> 2] >>> 0) {
              A[Ar >> 2] = nr;
              var or = r2 + 168 | 0, fr = A[or >> 2];
              (0 | fr) != 0 && Rc(fr);
              var cr = Sc(nr);
              if (A[or >> 2] = cr, (0 | cr) == 0) {
                b2 = 0;
                break r;
              }
              Zb(cr, -1, nr << 2), (0 | ir) == 0 ? c2 = 26 : (sr = or, c2 = 34);
            } else {
              var ur = r2 + 168 | 0;
              Zb(A[ur >> 2], -1, nr << 2);
              var sr = ur;
              c2 = 34;
            }
            e:
              do {
                if (c2 == 34)
                  for (var dr = 1; ; ) {
                    var vr = (0 | A[(dr << 2 >> 2) + o]) == 0;
                    i:
                      do {
                        if (!vr) {
                          var lr, hr = ir - dr | 0, br = 1 << hr, pr = dr - 1 | 0, Er = E[(pr << 2 >> 2) + f2], Tr = r2, Rr = dr;
                          (0 | Rr) != 0 & 17 > Rr >>> 0 || Ec(0 | R.Sa, 1954);
                          var kr = A[Tr + (Rr - 1 << 2) + 28 >> 2];
                          if (Er >>> 0 <= (lr = (0 | kr) == 0 ? -1 : (kr - 1 | 0) >>> ((16 - Rr | 0) >>> 0)) >>> 0)
                            for (var wr = A[(96 + (pr << 2) >> 2) + u] - Er | 0, yr = dr << 16, Mr = Er; ; ) {
                              var gr = 65535 & C[A[q >> 2] + (wr + Mr << 1) >> 1];
                              (255 & B[i2 + gr | 0] | 0) != (0 | dr) && Ec(0 | R.Wa, 2320);
                              for (var Ir = Mr << hr, Nr = gr | yr, mr = 0; ; ) {
                                var Xr = mr + Ir | 0;
                                Xr >>> 0 < nr >>> 0 || Ec(0 | R.Xa, 2326);
                                var Sr = E[sr >> 2];
                                if ((0 | A[Sr + (Xr << 2) >> 2]) == -1)
                                  var Br = Sr;
                                else
                                  Ec(0 | R.Ya, 2328), Br = A[sr >> 2];
                                A[Br + (Xr << 2) >> 2] = Nr;
                                var Cr = mr + 1 | 0;
                                if (Cr >>> 0 >= br >>> 0)
                                  break;
                                mr = Cr;
                              }
                              var zr = Mr + 1 | 0;
                              if (zr >>> 0 > lr >>> 0)
                                break i;
                              Mr = zr;
                            }
                        }
                      } while (0);
                    var Or = dr + 1 | 0;
                    if (Or >>> 0 > ir >>> 0)
                      break e;
                    dr = Or;
                  }
              } while (0);
            var Fr = z[D];
          } else
            Fr = er;
          var jr = r2 + 96 | 0;
          A[jr >> 2] = A[jr >> 2] - A[f2] | 0;
          var Ur = r2 + 100 | 0;
          A[Ur >> 2] = A[Ur >> 2] - A[f2 + 1] | 0;
          var _r = r2 + 104 | 0;
          A[_r >> 2] = A[_r >> 2] - A[f2 + 2] | 0;
          var Vr = r2 + 108 | 0;
          A[Vr >> 2] = A[Vr >> 2] - A[f2 + 3] | 0;
          var Lr = r2 + 112 | 0;
          A[Lr >> 2] = A[Lr >> 2] - A[f2 + 4] | 0;
          var Hr = r2 + 116 | 0;
          A[Hr >> 2] = A[Hr >> 2] - A[f2 + 5] | 0;
          var Zr = r2 + 120 | 0;
          A[Zr >> 2] = A[Zr >> 2] - A[f2 + 6] | 0;
          var xr = r2 + 124 | 0;
          A[xr >> 2] = A[xr >> 2] - A[f2 + 7] | 0;
          var Gr = r2 + 128 | 0;
          A[Gr >> 2] = A[Gr >> 2] - A[f2 + 8] | 0;
          var Pr = r2 + 132 | 0;
          A[Pr >> 2] = A[Pr >> 2] - A[f2 + 9] | 0;
          var $r = r2 + 136 | 0;
          A[$r >> 2] = A[$r >> 2] - A[f2 + 10] | 0;
          var qr = r2 + 140 | 0;
          A[qr >> 2] = A[qr >> 2] - A[f2 + 11] | 0;
          var Dr = r2 + 144 | 0;
          A[Dr >> 2] = A[Dr >> 2] - A[f2 + 12] | 0;
          var Wr = r2 + 148 | 0;
          A[Wr >> 2] = A[Wr >> 2] - A[f2 + 13] | 0;
          var Yr = r2 + 152 | 0;
          A[Yr >> 2] = A[Yr >> 2] - A[f2 + 14] | 0;
          var Jr = r2 + 156 | 0;
          A[Jr >> 2] = A[Jr >> 2] - A[f2 + 15] | 0;
          var Qr = r2 + 16 | 0;
          A[Qr >> 2] = 0, A[t = (r2 + 20 | 0) >> 2] = 255 & Fr;
          e:
            do {
              if (tr) {
                for (var Kr = ir; ; ) {
                  if ((0 | Kr) == 0)
                    break e;
                  var re2 = Kr - 1 | 0;
                  if ((0 | A[(Kr << 2 >> 2) + o]) != 0)
                    break;
                  Kr = re2;
                }
                A[Qr >> 2] = A[(28 + (re2 << 2) >> 2) + u];
                for (var ee2 = ir + 1 | 0, ie = A[t] = ee2; ; ) {
                  if (ie >>> 0 > O >>> 0)
                    break e;
                  if ((0 | A[(ie << 2 >> 2) + o]) != 0)
                    break;
                  ie = ie + 1 | 0;
                }
                A[t] = ie;
              }
            } while (0);
          A[u + 23] = -1, A[u + 40] = 1048575, A[u + 3] = 32 - A[ar >> 2] | 0, b2 = 1;
        }
      } while (0);
    return v = s, b2;
  }
  function Pc(r2) {
    var e2;
    (0 | r2) != 0 && (e2 = A[r2 - 4 >> 2], r2 = r2 - 8 | 0, (e2 = (0 | e2) == 0 ? 4 : (0 | e2) == (-1 ^ A[r2 >> 2] | 0) ? 5 : 4) == 4 && Ec(0 | R.da, 645), Nc(r2));
  }
  function Qc(r2) {
    var e2 = Mc(8 + ((r2 = (0 | r2) == 0 ? 1 : r2) << 1) | 0, 0);
    return (0 | e2) == 0 ? r2 = 0 : (A[e2 + 4 >> 2] = r2, A[e2 >> 2] = -1 ^ r2, r2 = e2 + 8 | 0), r2;
  }
  function Rc(r2) {
    var e2;
    (0 | r2) != 0 && (e2 = A[r2 - 4 >> 2], r2 = r2 - 8 | 0, (e2 = (0 | e2) == 0 ? 4 : (0 | e2) == (-1 ^ A[r2 >> 2] | 0) ? 5 : 4) == 4 && Ec(0 | R.da, 645), Nc(r2));
  }
  function Sc(r2) {
    var e2 = Mc(8 + ((r2 = (0 | r2) == 0 ? 1 : r2) << 2) | 0, 0);
    return (0 | e2) == 0 ? r2 = 0 : (A[e2 + 4 >> 2] = r2, A[e2 >> 2] = -1 ^ r2, r2 = e2 + 8 | 0), r2;
  }
  function Tc(r2) {
    return (255 & B[0 | r2]) << 8 | 255 & B[r2 + 1 | 0];
  }
  function Uc(r2) {
    return (255 & B[r2 + 1 | 0]) << 16 | (255 & B[0 | r2]) << 24 | 255 & B[r2 + 3 | 0] | (255 & B[r2 + 2 | 0]) << 8;
  }
  function Vc(r2) {
    return 255 & B[0 | r2];
  }
  function Wc(r2) {
    return 255 & B[r2 + 2 | 0] | (255 & B[0 | r2]) << 16 | (255 & B[r2 + 1 | 0]) << 8;
  }
  function Xc(r2, e2) {
    if (r2 == 0 && e2 == 0 || r2 == 9 && e2 == 0)
      var i2 = 4;
    else
      r2 == 1 && e2 == 0 || r2 == 2 && e2 == 0 || r2 == 7 && e2 == 0 || r2 == 8 && e2 == 0 || r2 == 3 && e2 == 0 || r2 == 4 && e2 == 0 || r2 == 5 && e2 == 0 || r2 == 6 && e2 == 0 ? i2 = 8 : (Ec(0 | R.Ia, 2664), i2 = 0);
    return i2;
  }
  function Yc(r2, e2) {
    return (0 | r2) == 0 | 74 > e2 >>> 0 ? 0 : (0 | Tc(r2)) != 18552 ? 0 : 74 > Tc(r2 + 2 | 0) >>> 0 ? 0 : Uc(r2 + 6 | 0) >>> 0 > e2 >>> 0 ? 0 : r2;
  }
  function Zc(r2, e2, i2) {
    var a2 = i2 >> 2;
    return (0 | r2) == 0 | 74 > e2 >>> 0 | (0 | i2) == 0 ? a2 = 0 : (0 | A[a2]) != 40 ? a2 = 0 : (0 | (r2 = Yc(r2, e2))) == 0 ? a2 = 0 : (A[a2 + 1] = Tc(r2 + 12 | 0), A[a2 + 2] = Tc(r2 + 14 | 0), A[a2 + 3] = Vc(r2 + 16 | 0), A[a2 + 4] = Vc(r2 + 17 | 0), e2 = r2 + 18 | 0, A[(i2 = i2 + 32 | 0) >> 2] = Vc(e2), A[i2 + 4 >> 2] = 0, i2 = Vc(e2), A[a2 + 5] = (0 | i2) == 0 ? 8 : (0 | i2) == 9 ? 8 : 16, A[a2 + 6] = Uc(r2 + 25 | 0), A[a2 + 7] = Uc(r2 + 29 | 0), a2 = 1), a2;
  }
  function $c(r2) {
    A[r2 >> 2] = 0, ad(r2 + 4 | 0), A[r2 + 20 >> 2] = 0;
  }
  function bd(r2) {
    if ((0 | r2) != 0) {
      var e2 = A[r2 + 168 >> 2];
      (0 | e2) != 0 && Rc(e2), (0 | (e2 = A[r2 + 176 >> 2])) != 0 && Pc(e2), Nc(r2);
    }
  }
  function cd(r2) {
    A[r2 >> 2] = 0, dd(r2 + 4 | 0);
    var e2 = A[(r2 = r2 + 20 | 0) >> 2];
    (0 | e2) != 0 && (bd(e2), A[r2 >> 2] = 0);
  }
  function ed(r2) {
    var e2 = A[r2 + 20 >> 2];
    (0 | e2) != 0 && bd(e2), dd(r2 + 4 | 0);
  }
  function fd(r2) {
    A[r2 >>= 2] = 0, A[r2 + 1] = 0, A[r2 + 2] = 0, A[r2 + 3] = 0, A[r2 + 4] = 0, A[r2 + 5] = 0;
  }
  function gd(r2, e2) {
    if ((0 | r2) != (0 | e2)) {
      var i2 = r2 + 168 | 0;
      if ((0 | (a2 = A[i2 >> 2])) != 0 && (Rc(a2), A[i2 >> 2] = 0, A[r2 + 164 >> 2] = 0), (0 | (a2 = A[(i2 = r2 + 176 | 0) >> 2])) != 0 && (Pc(a2), A[i2 >> 2] = 0, A[r2 + 172 >> 2] = 0), hd(r2, e2, 180), (0 | A[(i2 = e2 + 168 | 0) >> 2]) != 0) {
        var a2, t = Sc(A[(a2 = r2 + 164 | 0) >> 2]);
        A[r2 + 168 >> 2] = t, (0 | t) != 0 && hd(t, A[i2 >> 2], A[a2 >> 2] << 2);
      }
      (0 | A[(i2 = e2 + 176 | 0) >> 2]) != 0 && (t = Qc(A[(a2 = r2 + 172 | 0) >> 2]), A[r2 + 176 >> 2] = t, (0 | t) != 0 && hd(t, A[i2 >> 2], A[a2 >> 2] << 1));
    }
  }
  function dd(r2) {
    var e2 = 0 | r2, i2 = A[e2 >> 2];
    if ((0 | i2) != 0) {
      var a2 = r2 + 4 | 0;
      Nc(i2), A[e2 >> 2] = 0, A[a2 >> 2] = 0, A[r2 + 8 >> 2] = 0;
    }
    z[r2 + 12 | 0] = 0;
  }
  function id(r2, e2) {
    var i2, a2 = E[i2 = (r2 + 4 | 0) >> 2], t = (0 | a2) == (0 | e2);
    do {
      if (t)
        var n2 = 1;
      else {
        if (a2 >>> 0 <= e2 >>> 0) {
          if (E[r2 + 8 >> 2] >>> 0 < e2 >>> 0) {
            if (!jd(r2, e2, (a2 + 1 | 0) == (0 | e2))) {
              n2 = 0;
              break;
            }
            n2 = A[i2];
          } else
            n2 = a2;
          Zb(A[r2 >> 2] + n2 | 0, 0, e2 - n2 | 0);
        }
        A[i2] = e2, n2 = 1;
      }
    } while (0);
    return n2;
  }
  function kd(r2, e2) {
    return E[r2 + 4 >> 2] >>> 0 > e2 >>> 0 || Ec(0 | R.F, 904), A[r2 >> 2] + e2 | 0;
  }
  function ld(r2) {
    var e2 = A[(n2 = r2 + 4 | 0) + 4 >> 2];
    (0 | e2) != 0 & 8193 > e2 >>> 0 || Ec(0 | R.Ja, 2998);
    var i2 = 0 | r2;
    A[i2 >> 2] = e2;
    var a2 = r2 + 20 | 0;
    (0 | (f2 = E[a2 >> 2])) == 0 ? ((0 | (e2 = Mc(180, 0))) == 0 ? e2 = 0 : (0 | e2) == 0 ? e2 = 0 : (A[e2 + 164 >> 2] = 0, A[e2 + 168 >> 2] = 0, A[e2 + 172 >> 2] = 0, A[e2 + 176 >> 2] = 0), a2 = A[a2 >> 2] = e2, i2 = A[i2 >> 2]) : (a2 = f2, i2 = e2);
    var t, n2 = kd(n2, 0);
    if (16 < (r2 = E[r2 >> 2]) >>> 0) {
      e2 = 1 < r2 >>> 0;
      r:
        do {
          if (e2)
            for (var o = 0, f2 = r2; ; ) {
              if (o = o + 1 | 0, 3 >= f2 >>> 0) {
                t = o;
                break r;
              }
              f2 >>>= 1;
            }
          else
            t = 0;
        } while (0);
      t = 255 & (11 > ((t = (0 | t) == 32 ? 32 : (1 << t >>> 0 < r2 >>> 0 & 1) + t | 0) + 1 | 0) >>> 0 ? t + 1 | 0 : 11);
    } else
      t = 0;
    return Oc(a2, i2, n2, t);
  }
  function md(r2, e2) {
    if ((0 | e2) == 0)
      var i2 = 0;
    else if (16 < e2 >>> 0)
      i2 = (i2 = nd(r2, e2 - 16 | 0)) << 16 | nd(r2, 16);
    else
      i2 = nd(r2, e2);
    return i2;
  }
  function S(r2, e2) {
    var i2, a2, t, n2;
    t = E[e2 + 20 >> 2] >> 2;
    var o = E[a2 = (r2 + 20 | 0) >> 2];
    if (24 > (0 | o)) {
      var f2 = E[i2 = (r2 + 4 | 0) >> 2], c2 = E[r2 + 8 >> 2];
      n2 = f2 >>> 0 < c2 >>> 0, 16 > (0 | o) ? (n2 ? (n2 = f2 + 1 | 0, f2 = (255 & B[f2]) << 8) : (n2 = f2, f2 = 0), n2 >>> 0 < c2 >>> 0 ? (c2 = n2 + 1 | 0, n2 = 255 & B[n2]) : (c2 = n2, n2 = 0), A[i2] = c2, A[a2] = o + 16 | 0, o = (n2 | f2) << 16 - o | A[(i2 = r2 + 16 | 0) >> 2]) : (n2 ? (A[i2] = f2 + 1 | 0, f2 = 255 & B[f2]) : f2 = 0, A[a2] = o + 8 | 0, o = f2 << 24 - o | A[(i2 = r2 + 16 | 0) >> 2]), A[i2 >> 2] = o;
    } else
      o = A[r2 + 16 >> 2];
    if (i2 = r2 + 16 | 0, c2 = (f2 = 1 + (o >>> 16) | 0) >>> 0 > E[t + 4] >>> 0) {
      var u = (n2 = E[t + 5]) - 1 | 0, s = f2 >>> 0 > E[(28 + (u << 2) >> 2) + t] >>> 0;
      r:
        do {
          if (s)
            for (var d2 = n2; ; ) {
              var v2 = d2 + 1 | 0;
              if (f2 >>> 0 <= E[(28 + (d2 << 2) >> 2) + t] >>> 0) {
                var l2 = v2, h2 = d2;
                break r;
              }
              d2 = v2;
            }
          else
            l2 = n2, h2 = u;
        } while (0);
      if ((n2 = (o >>> ((32 - l2 | 0) >>> 0)) + A[(96 + (h2 << 2) >> 2) + t] | 0) >>> 0 < E[e2 >> 2] >>> 0)
        p = l2, T2 = 65535 & C[A[t + 44] + (n2 << 1) >> 1], n2 = 22;
      else {
        Ec(0 | R.ca, 3267);
        var b2 = 0;
        n2 = 23;
      }
    } else {
      if ((0 | (p = E[A[t + 42] + (o >>> ((32 - A[t + 2] | 0) >>> 0) << 2) >> 2])) == -1 && Ec(0 | R.Na, 3245), T2 = 65535 & p, p >>>= 16, u = T2, E[(n2 = e2 + 4 | 0) + 4 >> 2] >>> 0 > u >>> 0 || Ec(0 | R.F, 903), (255 & B[A[n2 >> 2] + u | 0] | 0) == (0 | p))
        var p = p, T2 = T2;
      else
        Ec(0 | R.Oa, 3249);
      n2 = 22;
    }
    return n2 == 22 && (A[i2 >> 2] <<= p, A[a2] = A[a2] - p | 0, b2 = T2), b2;
  }
  function od(r2, e2, i2) {
    return (0 | i2) == 0 ? r2 = 0 : (A[r2 >> 2] = e2, A[r2 + 4 >> 2] = e2, A[r2 + 12 >> 2] = i2, A[r2 + 8 >> 2] = e2 + i2 | 0, A[r2 + 16 >> 2] = 0, A[r2 + 20 >> 2] = 0, r2 = 1), r2;
  }
  function nd(r2, e2) {
    var i2;
    33 > e2 >>> 0 || Ec(0 | R.La, 3191);
    var a2 = E[i2 = (r2 + 20 | 0) >> 2], t = (0 | a2) < (0 | e2);
    r:
      do {
        if (t)
          for (var n2 = r2 + 4 | 0, o = r2 + 8 | 0, f2 = r2 + 16 | 0, c2 = a2; ; ) {
            var u = A[n2 >> 2];
            if ((0 | u) == (0 | A[o >> 2]) ? u = 0 : (A[n2 >> 2] = u + 1 | 0, u = 255 & B[u]), c2 = c2 + 8 | 0, A[i2] = c2, 33 > (0 | c2) || (Ec(0 | R.Ma, 3200), c2 = A[i2]), u = u << 32 - c2 | A[f2 >> 2], A[f2 >> 2] = u, (0 | c2) >= (0 | e2)) {
              var s = c2, d2 = u;
              break r;
            }
          }
        else
          s = a2, d2 = A[r2 + 16 >> 2];
      } while (0);
    return A[r2 + 16 >> 2] = d2 << e2, A[i2] = s - e2 | 0, d2 >>> ((32 - e2 | 0) >>> 0);
  }
  function pd(r2, e2) {
    var i2, a2 = v;
    v += 24;
    r:
      do {
        for (var t = 0, n2 = 8192; ; )
          if (t = t + 1 | 0, (0 | (n2 >>>= 1)) == 0) {
            i2 = t;
            break r;
          }
      } while (0);
    if (t = (0 | (i2 = md(r2, i2))) == 0)
      cd(e2), n2 = 1;
    else if (id(n2 = e2 + 4 | 0, i2)) {
      var A2 = kd(n2, 0);
      if (Zb(A2, 0, i2), (0 | (A2 = md(r2, 5))) == 0 | 21 < A2 >>> 0)
        n2 = 0;
      else {
        $c(a2);
        var o = a2 + 4 | 0, f2 = id(o, 21);
        r:
          do {
            if (f2) {
              for (var c2 = 0; ; ) {
                var u = md(r2, 3), s = kd(o, 255 & B[R.za + c2 | 0]);
                if (z[s] = 255 & u, (0 | (c2 = c2 + 1 | 0)) == (0 | A2))
                  break;
              }
              if (ld(a2)) {
                c2 = 0;
                e:
                  for (; ; ) {
                    s = c2 >>> 0 < i2 >>> 0, u = i2 - c2 | 0;
                    for (var d2 = (0 | c2) == 0, l2 = c2 - 1 | 0; ; ) {
                      if (!s) {
                        if ((0 | c2) != (0 | i2)) {
                          T2 = 0;
                          break r;
                        }
                        T2 = ld(e2);
                        break r;
                      }
                      var h2 = S(r2, a2);
                      if (17 > h2 >>> 0) {
                        u = kd(n2, c2), z[u] = 255 & h2, c2 = c2 + 1 | 0;
                        continue e;
                      }
                      if ((0 | h2) == 17) {
                        if ((s = md(r2, 3) + 3 | 0) >>> 0 > u >>> 0) {
                          T2 = 0;
                          break r;
                        }
                        c2 = s + c2 | 0;
                        continue e;
                      }
                      if ((0 | h2) == 18) {
                        if ((s = md(r2, 7) + 11 | 0) >>> 0 > u >>> 0) {
                          T2 = 0;
                          break r;
                        }
                        c2 = s + c2 | 0;
                        continue e;
                      }
                      if (2 <= (h2 - 19 | 0) >>> 0) {
                        Ec(0 | R.ca, 3141), T2 = 0;
                        break r;
                      }
                      if (d2 | (h2 = (0 | h2) == 19 ? md(r2, 2) + 3 | 0 : md(r2, 6) + 7 | 0) >>> 0 > u >>> 0) {
                        T2 = 0;
                        break r;
                      }
                      var b2 = kd(n2, l2);
                      if ((b2 = B[b2]) << 24 >> 24 == 0) {
                        T2 = 0;
                        break r;
                      }
                      var p = h2 + c2 | 0;
                      if (c2 >>> 0 < p >>> 0) {
                        var E2 = c2;
                        break;
                      }
                    }
                    for (; ; ) {
                      if (u = kd(n2, E2), s = E2 + 1 | 0, z[u] = b2, (0 | s) == (0 | p)) {
                        c2 = p;
                        continue e;
                      }
                      E2 = s;
                    }
                  }
              } else
                var T2 = 0;
            } else
              T2 = 0;
          } while (0);
        ed(a2), n2 = T2;
      }
    } else
      n2 = 0;
    return v = a2, n2;
  }
  function qd(r2, e2, i2, a2, t, n2, o) {
    var f2 = r2 + 88 | 0, c2 = (3 + (1 < Tc((u = E[f2 >> 2]) + 12 | 0) >>> (o >>> 0) >>> 0 ? Tc(u + 12 | 0) >>> (o >>> 0) : 1) | 0) >>> 2, u = (o = (3 + (1 < Tc(u + 14 | 0) >>> (o >>> 0) >>> 0 ? Tc(u + 14 | 0) >>> (o >>> 0) : 1) | 0) >>> 2, ((0 | (u = Vc(u + 18 | 0))) == 0 ? 8 : (0 | u) == 9 ? 8 : 16) * c2 | 0);
    if ((0 | n2) == 0) {
      var s = u;
      n2 = 5;
    } else if (u >>> 0 <= n2 >>> 0 & (3 & n2 | 0) == 0)
      s = n2, n2 = 5;
    else {
      var d2 = 0;
      n2 = 12;
    }
    return n2 == 5 && ((s * o | 0) >>> 0 > t >>> 0 ? d2 = 0 : (t = (c2 + 1 | 0) >>> 1, d2 = (o + 1 | 0) >>> 1, od(r2 + 92 | 0, e2, i2) ? (0 | (e2 = Vc(A[f2 >> 2] + 18 | 0))) == 0 ? (rd(r2, a2, 0, s, c2, o, t, d2), d2 = 1) : (0 | e2) == 2 || (0 | e2) == 3 || (0 | e2) == 5 || (0 | e2) == 6 || (0 | e2) == 4 ? (sd(r2, a2, 0, s, c2, o, t, d2), d2 = 1) : (0 | e2) == 9 ? (td(r2, a2, 0, s, c2, o, t, d2), d2 = 1) : (0 | e2) == 7 || (0 | e2) == 8 ? (ud(r2, a2, 0, s, c2, o, t, d2), d2 = 1) : d2 = 0 : d2 = 0)), d2;
  }
  function xd(r2) {
    A[r2 >> 2] = 0, A[r2 + 4 >> 2] = 0, A[r2 + 8 >> 2] = 0, z[r2 + 12 | 0] = 0;
  }
  function wd(r2) {
    A[r2 >> 2] = 0, A[r2 + 4 >> 2] = 0, A[r2 + 8 >> 2] = 0, z[r2 + 12 | 0] = 0;
  }
  function ad(r2) {
    A[r2 >> 2] = 0, A[r2 + 4 >> 2] = 0, A[r2 + 8 >> 2] = 0, z[r2 + 12 | 0] = 0;
  }
  function vd(r2) {
    A[r2 >> 2] = 40;
  }
  function Dd(r2) {
    var e2 = 0 | r2, i2 = A[e2 >> 2];
    if ((0 | i2) != 0) {
      var a2 = r2 + 4 | 0;
      Nc(i2), A[e2 >> 2] = 0, A[a2 >> 2] = 0, A[r2 + 8 >> 2] = 0;
    }
    z[r2 + 12 | 0] = 0;
  }
  function Ed(r2) {
    var e2 = 0 | r2, i2 = A[e2 >> 2];
    if ((0 | i2) != 0) {
      var a2 = r2 + 4 | 0;
      Nc(i2), A[e2 >> 2] = 0, A[a2 >> 2] = 0, A[r2 + 8 >> 2] = 0;
    }
    z[r2 + 12 | 0] = 0;
  }
  function jd(r2, e2, i2) {
    return Jc(r2, e2, i2, 1, 0) ? r2 = 1 : (z[r2 + 12 | 0] = 1, r2 = 0), r2;
  }
  function rd(r2, e2, i2, a2, t, n2, o, f2) {
    var c2, u, s, d2, l2, h2 = v;
    v += 24, l2 = h2 >> 2;
    var b2 = h2 + 4;
    d2 = b2 >> 2;
    i2 = h2 + 8 >> 2;
    var p = r2 + 236 | 0, T2 = A[p + 4 >> 2], k = r2 + 252 | 0, w = A[k + 4 >> 2];
    A[l2] = 0, A[d2] = 0;
    var y = Vc(A[r2 + 88 >> 2] + 17 | 0), M = a2 >>> 2, g = (0 | y) == 0;
    r:
      do {
        if (!g)
          for (var I2 = (0 | f2) == 0, N2 = f2 - 1 | 0, m = (1 & n2 | 0) != 0, X2 = a2 << 1, C2 = r2 + 92 | 0, z2 = r2 + 116 | 0, O = r2 + 188 | 0, F = M + 1 | 0, j = M + 2 | 0, U = M + 3 | 0, _ = o - 1 | 0, V = r2 + 140 | 0, L = _ << 4, H = (1 & t | 0) != 0, Z = 0, x = 1; ; ) {
            e:
              do {
                if (I2)
                  var G = x;
                else
                  for (var P = A[e2 + (Z << 2) >> 2], $ = 0, q = x; ; ) {
                    if ((1 & $ | 0) == 0)
                      var D = P, W = 16, Y = 1, J = o, Q = 0;
                    else
                      D = P + L | 0, W = -16, J = Y = -1, Q = _;
                    var K = (0 | $) == (0 | N2), rr = K & m, er = (0 | Q) == (0 | J);
                    i:
                      do {
                        if (er)
                          var ir = q;
                        else {
                          var ar = K & m ^ 1, tr = q, nr = D;
                          s = nr >> 2;
                          for (var Ar = Q; ; ) {
                            tr = 7 & (or = (0 | tr) == 1 ? 512 | S(C2, z2) : tr);
                            var or = or >>> 3;
                            u = 255 & B[R.D + tr | 0];
                            for (var fr = 0, cr = A[l2]; ; ) {
                              var ur = S(C2, V);
                              if (A[l2] = cr + ur | 0, Fd(h2, T2), ur = Gd(p, cr = E[l2]), A[(fr << 2 >> 2) + i2] = A[ur >> 2], (fr = fr + 1 | 0) >>> 0 >= u >>> 0)
                                break;
                            }
                            u = nr >> 2, cr = rr | (fr = (0 | Ar) == (0 | _) & H);
                            a:
                              do {
                                if (cr)
                                  for (ur = 0; ; ) {
                                    var sr = ur * a2 | 0;
                                    c2 = sr >> 2;
                                    var dr = nr + sr | 0, vr = (0 | ur) == 0 | ar, lr = ur << 1, hr = S(C2, O);
                                    if (A[d2] = A[d2] + hr | 0, Fd(b2, w), fr ? (vr && (A[dr >> 2] = A[((255 & B[(tr << 2) + Hd + lr | 0]) << 2 >> 2) + i2], lr = Gd(k, A[d2]), A[c2 + (s + 1)] = A[lr >> 2]), c2 = S(C2, O), A[d2] = A[d2] + c2 | 0, Fd(b2, w)) : vr ? (A[dr >> 2] = A[((255 & B[(tr << 2) + Hd + lr | 0]) << 2 >> 2) + i2], dr = Gd(k, A[d2]), A[c2 + (s + 1)] = A[dr >> 2], sr = sr + (nr + 8) | 0, dr = S(C2, O), A[d2] = A[d2] + dr | 0, Fd(b2, w), A[sr >> 2] = A[((255 & B[(tr << 2) + Hd + (1 | lr) | 0]) << 2 >> 2) + i2], lr = Gd(k, A[d2]), A[c2 + (s + 3)] = A[lr >> 2]) : (c2 = S(C2, O), A[d2] = A[d2] + c2 | 0, Fd(b2, w)), (0 | (ur = ur + 1 | 0)) == 2)
                                      break a;
                                  }
                                else
                                  A[u] = A[((255 & B[(tr << 2) + Hd | 0]) << 2 >> 2) + i2], ur = S(C2, O), A[d2] = A[d2] + ur | 0, Fd(b2, w), ur = Gd(k, A[d2]), A[s + 1] = A[ur >> 2], A[s + 2] = A[((255 & B[(tr << 2) + Hd + 1 | 0]) << 2 >> 2) + i2], ur = S(C2, O), A[d2] = A[d2] + ur | 0, Fd(b2, w), ur = Gd(k, A[d2]), A[s + 3] = A[ur >> 2], A[(M << 2 >> 2) + u] = A[((255 & B[(tr << 2) + Hd + 2 | 0]) << 2 >> 2) + i2], ur = S(C2, O), A[d2] = A[d2] + ur | 0, Fd(b2, w), ur = Gd(k, A[d2]), A[(F << 2 >> 2) + u] = A[ur >> 2], A[(j << 2 >> 2) + u] = A[((255 & B[(tr << 2) + Hd + 3 | 0]) << 2 >> 2) + i2], ur = S(C2, O), A[d2] = A[d2] + ur | 0, Fd(b2, w), ur = Gd(k, A[d2]), A[(U << 2 >> 2) + u] = A[ur >> 2];
                              } while (0);
                            if ((0 | (Ar = Ar + Y | 0)) == (0 | J)) {
                              ir = or;
                              break i;
                            }
                            tr = or, s = (nr = nr + W | 0) >> 2;
                          }
                        }
                      } while (0);
                    if ((0 | (s = $ + 1 | 0)) == (0 | f2)) {
                      G = ir;
                      break e;
                    }
                    P = P + X2 | 0, $ = s, q = ir;
                  }
              } while (0);
            if ((0 | (Z = Z + 1 | 0)) == (0 | y))
              break r;
            x = G;
          }
      } while (0);
    return v = h2, 1;
  }
  function Cd(r2) {
    A[r2 >> 2] = 0, Ed(r2 + 284 | 0), Ed(r2 + 268 | 0), Dd(r2 + 252 | 0), Dd(r2 + 236 | 0);
    var e2 = r2 + 188 | 0;
    ed(r2 + 212 | 0), ed(e2), e2 = r2 + 140 | 0, ed(r2 + 164 | 0), ed(e2), ed(r2 + 116 | 0);
  }
  function Fd(r2, e2) {
    var i2 = A[r2 >> 2], a2 = i2 - e2 | 0, t = a2 >> 31;
    A[r2 >> 2] = t & i2 | a2 & (-1 ^ t);
  }
  function sd(r2, e2, i2, a2, t, n2, o, f2) {
    var c2, u, s, d2, l2, h2, b2, p, T2 = v;
    v += 48, p = T2 >> 2;
    var k = T2 + 4;
    b2 = k >> 2;
    var w = T2 + 8;
    h2 = w >> 2;
    var y = T2 + 12;
    l2 = y >> 2, d2 = T2 + 16 >> 2;
    i2 = T2 + 32 >> 2;
    var M = r2 + 236 | 0, g = A[M + 4 >> 2], I2 = r2 + 252 | 0, N2 = A[I2 + 4 >> 2], m = r2 + 268 | 0, X2 = A[m + 4 >> 2], z2 = Tc((O = A[r2 + 88 >> 2]) + 63 | 0);
    A[p] = 0, A[b2] = 0, A[h2] = 0, A[l2] = 0;
    var O, F = (0 | (O = Vc(O + 17 | 0))) == 0;
    r:
      do {
        if (!F)
          for (var j = (0 | f2) == 0, U = f2 - 1 | 0, _ = (1 & n2 | 0) == 0, V = a2 << 1, L = r2 + 92 | 0, H = r2 + 116 | 0, Z = r2 + 212 | 0, x = r2 + 188 | 0, G = r2 + 284 | 0, P = r2 + 140 | 0, $ = r2 + 164 | 0, q = o - 1 | 0, D = q << 5, W = (1 & t | 0) != 0, Y = 0, J = 1; ; ) {
            e:
              do {
                if (j)
                  var Q = J;
                else
                  for (var K = A[e2 + (Y << 2) >> 2], rr = 0, er = J; ; ) {
                    if ((1 & rr | 0) == 0)
                      var ir = K, ar = 32, tr = 1, nr = o, Ar = 0;
                    else
                      ir = K + D | 0, ar = -32, nr = tr = -1, Ar = q;
                    var or = _ | (0 | rr) != (0 | U), fr = (0 | Ar) == (0 | nr);
                    i:
                      do {
                        if (fr)
                          var cr = er;
                        else
                          for (var ur = er, sr = ir, dr = Ar; ; ) {
                            ur = 7 & (vr = (0 | ur) == 1 ? 512 | S(L, H) : ur);
                            var vr = vr >>> 3;
                            s = 255 & B[R.D + ur | 0];
                            for (var lr = 0, hr = A[h2]; ; ) {
                              var br = S(L, $);
                              if (A[h2] = hr + br | 0, Fd(w, X2), br = Id(m, hr = E[h2]), A[(lr << 2 >> 2) + i2] = 65535 & C[br >> 1], (lr = lr + 1 | 0) >>> 0 >= s >>> 0)
                                break;
                            }
                            for (lr = 0, hr = A[p]; br = S(L, P), A[p] = hr + br | 0, Fd(T2, g), br = Gd(M, hr = E[p]), A[(lr << 2 >> 2) + d2] = A[br >> 2], !((lr = lr + 1 | 0) >>> 0 >= s >>> 0); )
                              ;
                            for (lr = (0 | dr) == (0 | q) & W, s = (hr = sr) >> 2, br = 0; ; ) {
                              var pr = (0 | br) == 0 | or;
                              if (c2 = br << 1, u = S(L, Z), A[l2] = A[l2] + u | 0, Fd(y, z2), u = S(L, x), A[b2] = A[b2] + u | 0, Fd(k, N2), pr) {
                                var Er = hr, Tr = 255 & B[(ur << 2) + Hd + c2 | 0];
                                u = Id(G, 3 * A[l2] | 0) >> 1, A[Er >> 2] = (65535 & C[u]) << 16 | A[(Tr << 2 >> 2) + i2], A[s + 1] = (65535 & C[u + 2]) << 16 | 65535 & C[u + 1], A[s + 2] = A[(Tr << 2 >> 2) + d2], u = Gd(I2, A[b2]), A[s + 3] = A[u >> 2];
                              }
                              if (u = S(L, Z), A[l2] = A[l2] + u | 0, Fd(y, z2), u = S(L, x), A[b2] = A[b2] + u | 0, Fd(k, N2), lr | 1 ^ pr || (pr = hr + 16 | 0, u = 255 & B[(ur << 2) + Hd + (1 | c2) | 0], c2 = Id(G, 3 * A[l2] | 0) >> 1, A[pr >> 2] = (65535 & C[c2]) << 16 | A[(u << 2 >> 2) + i2], A[s + 5] = (65535 & C[c2 + 2]) << 16 | 65535 & C[c2 + 1], A[s + 6] = A[(u << 2 >> 2) + d2], c2 = Gd(I2, A[b2]), A[s + 7] = A[c2 >> 2]), (0 | (br = br + 1 | 0)) == 2)
                                break;
                              s = (hr = hr + a2 | 0) >> 2;
                            }
                            if ((0 | (dr = dr + tr | 0)) == (0 | nr)) {
                              cr = vr;
                              break i;
                            }
                            ur = vr, sr = sr + ar | 0;
                          }
                      } while (0);
                    if ((0 | (rr = rr + 1 | 0)) == (0 | f2)) {
                      Q = cr;
                      break e;
                    }
                    K = K + V | 0, er = cr;
                  }
              } while (0);
            if ((0 | (Y = Y + 1 | 0)) == (0 | O))
              break r;
            J = Q;
          }
      } while (0);
    return v = T2, 1;
  }
  function td(r2, e2, i2, a2, t, n2, o, f2) {
    var c2, u, s, d2, l2, h2 = v;
    v += 24, l2 = h2 >> 2;
    var b2 = h2 + 4;
    d2 = b2 >> 2;
    i2 = h2 + 8 >> 2;
    var p = r2 + 268 | 0, T2 = A[p + 4 >> 2], k = Tc((w = A[r2 + 88 >> 2]) + 63 | 0);
    A[l2] = 0, A[d2] = 0;
    var w, y = (0 | (w = Vc(w + 17 | 0))) == 0;
    r:
      do {
        if (!y)
          for (var M = (0 | f2) == 0, g = f2 - 1 | 0, I2 = (1 & n2 | 0) == 0, N2 = a2 << 1, m = r2 + 92 | 0, X2 = r2 + 116 | 0, z2 = (1 & t | 0) == 0, O = r2 + 164 | 0, F = r2 + 212 | 0, j = r2 + 284 | 0, U = o - 1 | 0, _ = U << 4, V = 0, L = 1; ; ) {
            e:
              do {
                if (M)
                  var H = L;
                else
                  for (var Z = A[e2 + (V << 2) >> 2], x = 0, G = L; ; ) {
                    if ((1 & x | 0) == 0)
                      var P = Z, $ = 16, q = 1, D = o, W = 0;
                    else
                      P = Z + _ | 0, $ = -16, D = q = -1, W = U;
                    var Y = I2 | (0 | x) != (0 | g), J = (0 | W) == (0 | D);
                    i:
                      do {
                        if (J)
                          var Q = G;
                        else
                          for (var K = G, rr = P, er = W; ; ) {
                            K = 7 & (ir = (0 | K) == 1 ? 512 | S(m, X2) : K);
                            var ir = ir >>> 3, ar = 255 & B[R.D + K | 0], tr = z2 | (0 | er) != (0 | U);
                            for (c2 = 0, u = A[l2]; ; ) {
                              var nr = S(m, O);
                              if (A[l2] = u + nr | 0, Fd(h2, T2), nr = Id(p, u = E[l2]), A[(c2 << 2 >> 2) + i2] = 65535 & C[nr >> 1], (c2 = c2 + 1 | 0) >>> 0 >= ar >>> 0) {
                                var Ar = rr;
                                s = Ar >> 2;
                                var or = 0;
                                break;
                              }
                            }
                            for (; ar = Ar, u = (0 | or) == 0 | Y, c2 = or << 1, nr = S(m, F), A[d2] = A[d2] + nr | 0, Fd(b2, k), tr ? u ? (nr = 255 & B[(K << 2) + Hd + c2 | 0], u = Id(j, 3 * A[d2] | 0) >> 1, A[ar >> 2] = (65535 & C[u]) << 16 | A[(nr << 2 >> 2) + i2], A[s + 1] = (65535 & C[u + 2]) << 16 | 65535 & C[u + 1], ar = Ar + 8 | 0, u = S(m, F), A[d2] = A[d2] + u | 0, Fd(b2, k), u = 255 & B[(K << 2) + Hd + (1 | c2) | 0], c2 = Id(j, 3 * A[d2] | 0) >> 1, A[ar >> 2] = (65535 & C[c2]) << 16 | A[(u << 2 >> 2) + i2], A[s + 3] = (65535 & C[c2 + 2]) << 16 | 65535 & C[c2 + 1]) : (ar = S(m, F), A[d2] = A[d2] + ar | 0, Fd(b2, k)) : (u && (u = 255 & B[(K << 2) + Hd + c2 | 0], c2 = Id(j, 3 * A[d2] | 0) >> 1, A[ar >> 2] = (65535 & C[c2]) << 16 | A[(u << 2 >> 2) + i2], A[s + 1] = (65535 & C[c2 + 2]) << 16 | 65535 & C[c2 + 1]), ar = S(m, F), A[d2] = A[d2] + ar | 0, Fd(b2, k)), (0 | (ar = or + 1 | 0)) != 2; )
                              s = (Ar = Ar + a2 | 0) >> 2, or = ar;
                            if ((0 | (er = er + q | 0)) == (0 | D)) {
                              Q = ir;
                              break i;
                            }
                            K = ir, rr = rr + $ | 0;
                          }
                      } while (0);
                    if ((0 | (x = x + 1 | 0)) == (0 | f2)) {
                      H = Q;
                      break e;
                    }
                    Z = Z + N2 | 0, G = Q;
                  }
              } while (0);
            if ((0 | (V = V + 1 | 0)) == (0 | w))
              break r;
            L = H;
          }
      } while (0);
    return v = h2, 1;
  }
  function ud(r2, e2, i2, a2, t, n2, o, f2) {
    var c2, u, s, d2, l2, h2, b2, p, T2, k = v;
    v += 48, T2 = k >> 2;
    var w = k + 4;
    p = w >> 2;
    var y = k + 8;
    b2 = y >> 2;
    var M = k + 12;
    h2 = M >> 2, l2 = k + 16 >> 2;
    i2 = k + 32 >> 2;
    var g = r2 + 268 | 0, I2 = A[g + 4 >> 2], N2 = Tc((m = A[r2 + 88 >> 2]) + 63 | 0);
    A[T2] = 0, A[p] = 0, A[b2] = 0, A[h2] = 0;
    var m, X2 = (0 | (m = Vc(m + 17 | 0))) == 0;
    r:
      do {
        if (!X2)
          for (var z2 = (0 | f2) == 0, O = f2 - 1 | 0, F = (1 & n2 | 0) == 0, j = a2 << 1, U = r2 + 92 | 0, _ = r2 + 116 | 0, V = r2 + 212 | 0, L = r2 + 284 | 0, H = r2 + 164 | 0, Z = o - 1 | 0, x = Z << 5, G = (1 & t | 0) != 0, P = 0, $ = 1; ; ) {
            e:
              do {
                if (z2)
                  var q = $;
                else
                  for (var D = A[e2 + (P << 2) >> 2], W = 0, Y = $; ; ) {
                    if ((1 & W | 0) == 0)
                      var J = D, Q = 32, K = 1, rr = o, er = 0;
                    else
                      J = D + x | 0, Q = -32, rr = K = -1, er = Z;
                    var ir = F | (0 | W) != (0 | O), ar = (0 | er) == (0 | rr);
                    i:
                      do {
                        if (ar)
                          var tr = Y;
                        else
                          for (var nr = Y, Ar = J, or = er; ; ) {
                            nr = 7 & (fr = (0 | nr) == 1 ? 512 | S(U, _) : nr);
                            var fr = fr >>> 3;
                            d2 = 255 & B[R.D + nr | 0];
                            for (var cr = 0, ur = A[T2]; ; ) {
                              var sr = S(U, H);
                              if (A[T2] = ur + sr | 0, Fd(k, I2), sr = Id(g, ur = E[T2]), A[(cr << 2 >> 2) + l2] = 65535 & C[sr >> 1], (cr = cr + 1 | 0) >>> 0 >= d2 >>> 0)
                                break;
                            }
                            for (cr = 0, ur = A[b2]; sr = S(U, H), A[b2] = ur + sr | 0, Fd(y, I2), sr = Id(g, ur = E[b2]), A[(cr << 2 >> 2) + i2] = 65535 & C[sr >> 1], !((cr = cr + 1 | 0) >>> 0 >= d2 >>> 0); )
                              ;
                            for (cr = (0 | or) == (0 | Z) & G, d2 = (ur = Ar) >> 2, sr = 0; ; ) {
                              var dr = (0 | sr) == 0 | ir;
                              if (c2 = sr << 1, u = S(U, V), A[p] = A[p] + u | 0, Fd(w, N2), u = S(U, V), A[h2] = A[h2] + u | 0, Fd(M, N2), dr) {
                                var vr = ur, lr = 255 & B[(nr << 2) + Hd + c2 | 0];
                                s = Id(L, 3 * A[p] | 0) >> 1, u = Id(L, 3 * A[h2] | 0) >> 1, A[vr >> 2] = (65535 & C[s]) << 16 | A[(lr << 2 >> 2) + l2], A[d2 + 1] = (65535 & C[s + 2]) << 16 | 65535 & C[s + 1], A[d2 + 2] = (65535 & C[u]) << 16 | A[(lr << 2 >> 2) + i2], A[d2 + 3] = (65535 & C[u + 2]) << 16 | 65535 & C[u + 1];
                              }
                              if (u = S(U, V), A[p] = A[p] + u | 0, Fd(w, N2), u = S(U, V), A[h2] = A[h2] + u | 0, Fd(M, N2), cr | 1 ^ dr || (dr = ur + 16 | 0, s = 255 & B[(nr << 2) + Hd + (1 | c2) | 0], u = Id(L, 3 * A[p] | 0) >> 1, c2 = Id(L, 3 * A[h2] | 0) >> 1, A[dr >> 2] = (65535 & C[u]) << 16 | A[(s << 2 >> 2) + l2], A[d2 + 5] = (65535 & C[u + 2]) << 16 | 65535 & C[u + 1], A[d2 + 6] = (65535 & C[c2]) << 16 | A[(s << 2 >> 2) + i2], A[d2 + 7] = (65535 & C[c2 + 2]) << 16 | 65535 & C[c2 + 1]), (0 | (sr = sr + 1 | 0)) == 2)
                                break;
                              d2 = (ur = ur + a2 | 0) >> 2;
                            }
                            if ((0 | (or = or + K | 0)) == (0 | rr)) {
                              tr = fr;
                              break i;
                            }
                            nr = fr, Ar = Ar + Q | 0;
                          }
                      } while (0);
                    if ((0 | (W = W + 1 | 0)) == (0 | f2)) {
                      q = tr;
                      break e;
                    }
                    D = D + j | 0, Y = tr;
                  }
              } while (0);
            if ((0 | (P = P + 1 | 0)) == (0 | m))
              break r;
            $ = q;
          }
      } while (0);
    return v = k, 1;
  }
  function Id(r2, e2) {
    return E[r2 + 4 >> 2] >>> 0 > e2 >>> 0 || Ec(0 | R.F, 904), (e2 << 1) + A[r2 >> 2] | 0;
  }
  function Gd(r2, e2) {
    return E[r2 + 4 >> 2] >>> 0 > e2 >>> 0 || Ec(0 | R.F, 904), (e2 << 2) + A[r2 >> 2] | 0;
  }
  function Jd(r2, e2) {
    var i2, a2 = E[i2 = (r2 + 4 | 0) >> 2], t = (0 | a2) == (0 | e2);
    do {
      if (t)
        var n2 = 1;
      else {
        if (a2 >>> 0 <= e2 >>> 0) {
          if (E[r2 + 8 >> 2] >>> 0 < e2 >>> 0) {
            if (Jc(n2 = r2, e2, (a2 + 1 | 0) == (0 | e2), 2, 0) ? n2 = 1 : (z[n2 + 12 | 0] = 1, n2 = 0), !n2) {
              n2 = 0;
              break;
            }
            n2 = A[i2];
          } else
            n2 = a2;
          Zb((n2 << 1) + A[r2 >> 2] | 0, 0, (e2 - n2 | 0) << 1);
        }
        A[i2] = e2, n2 = 1;
      }
    } while (0);
    return n2;
  }
  function Kd(r2, e2) {
    var i2, a2 = E[i2 = (r2 + 4 | 0) >> 2], t = (0 | a2) == (0 | e2);
    do {
      if (t)
        var n2 = 1;
      else {
        if (a2 >>> 0 <= e2 >>> 0) {
          if (E[r2 + 8 >> 2] >>> 0 < e2 >>> 0) {
            if (Jc(n2 = r2, e2, (a2 + 1 | 0) == (0 | e2), 4, 0) ? n2 = 1 : (z[n2 + 12 | 0] = 1, n2 = 0), !n2) {
              n2 = 0;
              break;
            }
            n2 = A[i2];
          } else
            n2 = a2;
          Zb((n2 << 2) + A[r2 >> 2] | 0, 0, (e2 - n2 | 0) << 2);
        }
        A[i2] = e2, n2 = 1;
      }
    } while (0);
    return n2;
  }
  function yd(r2) {
    var e2 = v;
    v += 48;
    var i2, a2 = r2 + 88 | 0, t = Tc(A[a2 >> 2] + 39 | 0), n2 = r2 + 236 | 0;
    if (Kd(n2, t)) {
      var o = r2 + 92 | 0, f2 = A[a2 >> 2];
      if (od(o, A[r2 + 4 >> 2] + Wc(f2 + 33 | 0) | 0, Wc(f2 + 36 | 0))) {
        $c(f2 = 0 | e2);
        var c2 = e2 + 24 | 0;
        $c(c2);
        for (var u = 0; ; ) {
          if (2 <= u >>> 0) {
            i2 = 9;
            break;
          }
          if (!pd(o, e2 + 24 * u | 0)) {
            var s = 0;
            i2 = 11;
            break;
          }
          u = u + 1 | 0;
        }
        r:
          do {
            if (i2 == 9) {
              var d2 = Gd(n2, 0);
              if ((0 | t) == 0)
                s = 1;
              else
                for (var l2 = u = 0, h2 = 0, b2 = 0, p = 0, E2 = 0, T2 = 0; ; ) {
                  E2 = S(o, f2) + E2 & 31, p = S(o, c2) + p & 63, b2 = S(o, f2) + b2 & 31;
                  var R2 = S(o, f2) + h2 | 0;
                  h2 = 31 & R2, l2 = S(o, c2) + l2 & 63, u = S(o, f2) + u & 31;
                  if (A[d2 >> 2] = p << 5 | E2 << 11 | b2 | R2 << 27 | l2 << 21 | u << 16, (0 | (T2 = T2 + 1 | 0)) == (0 | t)) {
                    s = 1;
                    break r;
                  }
                  d2 = d2 + 4 | 0;
                }
            }
          } while (0);
        ed(c2), ed(f2), o = s;
      } else
        o = 0;
    } else
      o = 0;
    return v = e2, o;
  }
  function zd(r2) {
    var e2 = v;
    v += 480;
    var i2 = e2 + 24, a2 = e2 + 220, t = e2 + 416, n2 = A[r2 + 88 >> 2], o = Tc(n2 + 47 | 0), f2 = r2 + 92 | 0;
    if (od(f2, A[r2 + 4 >> 2] + Wc(n2 + 41 | 0) | 0, Wc(n2 + 44 | 0))) {
      $c(e2), n2 = pd(f2, e2);
      r:
        do {
          if (n2) {
            for (var c2 = -3, u = -3, s = 0; ; ) {
              A[i2 + (s << 2) >> 2] = c2, A[a2 + (s << 2) >> 2] = u;
              u = (1 & (l2 = 3 < (0 | (c2 = c2 + 1 | 0)))) + u | 0;
              if ((0 | (s = s + 1 | 0)) == 49)
                break;
              c2 = l2 ? -3 : c2;
            }
            if (Zb(t, 0, 64), Kd(u = r2 + 252 | 0, o)) {
              var d2 = Gd(u, 0);
              if ((0 | o) == 0)
                F = 1;
              else {
                u = 0 | t, s = t + 4 | 0, c2 = t + 8 | 0;
                for (var l2 = t + 12 | 0, h2 = t + 16 | 0, b2 = t + 20 | 0, p = t + 24 | 0, E2 = t + 28 | 0, T2 = t + 32 | 0, k = t + 36 | 0, w = t + 40 | 0, y = t + 44 | 0, M = t + 48 | 0, g = t + 52 | 0, I2 = t + 56 | 0, N2 = t + 60 | 0, m = 0; ; ) {
                  for (var X2 = 0; ; ) {
                    var C2 = S(f2, e2), z2 = X2 << 1, O = (z2 << 2) + t | 0;
                    if (A[O >> 2] = A[O >> 2] + A[i2 + (C2 << 2) >> 2] & 3, A[(z2 = ((1 | z2) << 2) + t | 0) >> 2] = A[z2 >> 2] + A[a2 + (C2 << 2) >> 2] & 3, (0 | (X2 = X2 + 1 | 0)) == 8)
                      break;
                  }
                  if (A[d2 >> 2] = (255 & B[R.h + A[s >> 2] | 0]) << 2 | 255 & B[R.h + A[u >> 2] | 0] | (255 & B[R.h + A[c2 >> 2] | 0]) << 4 | (255 & B[R.h + A[l2 >> 2] | 0]) << 6 | (255 & B[R.h + A[h2 >> 2] | 0]) << 8 | (255 & B[R.h + A[b2 >> 2] | 0]) << 10 | (255 & B[R.h + A[p >> 2] | 0]) << 12 | (255 & B[R.h + A[E2 >> 2] | 0]) << 14 | (255 & B[R.h + A[T2 >> 2] | 0]) << 16 | (255 & B[R.h + A[k >> 2] | 0]) << 18 | (255 & B[R.h + A[w >> 2] | 0]) << 20 | (255 & B[R.h + A[y >> 2] | 0]) << 22 | (255 & B[R.h + A[M >> 2] | 0]) << 24 | (255 & B[R.h + A[g >> 2] | 0]) << 26 | (255 & B[R.h + A[I2 >> 2] | 0]) << 28 | (255 & B[R.h + A[N2 >> 2] | 0]) << 30, (0 | (m = m + 1 | 0)) == (0 | o)) {
                    F = 1;
                    break r;
                  }
                  d2 = d2 + 4 | 0;
                }
              }
            } else
              var F = 0;
          } else
            F = 0;
        } while (0);
      ed(e2), r2 = F;
    } else
      r2 = 0;
    return v = e2, r2;
  }
  function Ad(r2) {
    var e2 = v;
    v += 24;
    var i2 = A[r2 + 88 >> 2], a2 = Tc(i2 + 55 | 0), t = r2 + 92 | 0;
    if (od(t, A[r2 + 4 >> 2] + Wc(i2 + 49 | 0) | 0, Wc(i2 + 52 | 0))) {
      $c(e2), i2 = pd(t, e2);
      r:
        do {
          if (i2) {
            var n2 = r2 + 268 | 0;
            if (Jd(n2, a2))
              if (n2 = Id(n2, 0), (0 | a2) == 0)
                u = 1;
              else
                for (var o = 0, f2 = 0, c2 = 0; ; ) {
                  o = S(t, e2) + o & 255, f2 = S(t, e2) + f2 & 255;
                  if (hb[n2 >> 1] = 65535 & (f2 << 8 | o), (0 | (c2 = c2 + 1 | 0)) == (0 | a2)) {
                    u = 1;
                    break r;
                  }
                  n2 = n2 + 2 | 0;
                }
            else
              var u = 0;
          } else
            u = 0;
        } while (0);
      ed(e2), r2 = u;
    } else
      r2 = 0;
    return v = e2, r2;
  }
  function Bd(r2) {
    var e2, i2 = v;
    v += 1888;
    var a2 = i2 + 24, t = i2 + 924, n2 = i2 + 1824, o = A[r2 + 88 >> 2], f2 = Tc(o + 63 | 0), c2 = r2 + 92 | 0;
    if (od(c2, A[r2 + 4 >> 2] + Wc(o + 57 | 0) | 0, Wc(o + 60 | 0))) {
      $c(i2), o = pd(c2, i2);
      r:
        do {
          if (o) {
            for (var u = -7, s = -7, d2 = 0; ; ) {
              A[a2 + (d2 << 2) >> 2] = u, A[t + (d2 << 2) >> 2] = s;
              s = (1 & (l2 = 7 < (0 | (u = u + 1 | 0)))) + s | 0;
              if ((0 | (d2 = d2 + 1 | 0)) == 225)
                break;
              u = l2 ? -7 : u;
            }
            if (Zb(n2, 0, 64), Jd(s = r2 + 284 | 0, 3 * f2 | 0))
              if (e2 = Id(s, 0), (0 | f2) == 0)
                j = 1;
              else {
                s = 0 | n2, d2 = n2 + 4 | 0, u = n2 + 8 | 0;
                var l2 = n2 + 12 | 0, h2 = n2 + 16 | 0, b2 = n2 + 20 | 0, p = n2 + 24 | 0, E2 = n2 + 28 | 0, T2 = n2 + 32 | 0, k = n2 + 36 | 0, w = n2 + 40 | 0, y = n2 + 44 | 0, M = n2 + 48 | 0, g = n2 + 52 | 0, I2 = n2 + 56 | 0, N2 = n2 + 60 | 0, m = e2;
                e2 = m >> 1;
                for (var X2 = 0; ; ) {
                  for (var C2 = 0; ; ) {
                    var z2 = S(c2, i2), O = C2 << 1, F = (O << 2) + n2 | 0;
                    if (A[F >> 2] = A[F >> 2] + A[a2 + (z2 << 2) >> 2] & 7, A[(O = ((1 | O) << 2) + n2 | 0) >> 2] = A[O >> 2] + A[t + (z2 << 2) >> 2] & 7, (0 | (C2 = C2 + 1 | 0)) == 8)
                      break;
                  }
                  if (hb[e2] = (255 & B[R.g + A[d2 >> 2] | 0]) << 3 | 255 & B[R.g + A[s >> 2] | 0] | (255 & B[R.g + A[u >> 2] | 0]) << 6 | (255 & B[R.g + A[l2 >> 2] | 0]) << 9 | (255 & B[R.g + A[h2 >> 2] | 0]) << 12 | (255 & B[R.g + A[b2 >> 2] | 0]) << 15, hb[e2 + 1] = (255 & B[R.g + A[p >> 2] | 0]) << 2 | (255 & B[R.g + A[b2 >> 2] | 0]) >>> 1 | (255 & B[R.g + A[E2 >> 2] | 0]) << 5 | (255 & B[R.g + A[T2 >> 2] | 0]) << 8 | (255 & B[R.g + A[k >> 2] | 0]) << 11 | (255 & B[R.g + A[w >> 2] | 0]) << 14, hb[e2 + 2] = (255 & B[R.g + A[y >> 2] | 0]) << 1 | (255 & B[R.g + A[w >> 2] | 0]) >>> 2 | (255 & B[R.g + A[M >> 2] | 0]) << 4 | (255 & B[R.g + A[g >> 2] | 0]) << 7 | (255 & B[R.g + A[I2 >> 2] | 0]) << 10 | (255 & B[R.g + A[N2 >> 2] | 0]) << 13, (0 | (X2 = X2 + 1 | 0)) == (0 | f2)) {
                    j = 1;
                    break r;
                  }
                  e2 = (m = m + 6 | 0) >> 1;
                }
              }
            else
              var j = 0;
          } else
            j = 0;
        } while (0);
      ed(i2), r2 = j;
    } else
      r2 = 0;
    return v = i2, r2;
  }
  function Yb(r2) {
    if (245 > r2 >>> 0) {
      var e2 = (i2 = 11 > r2 >>> 0 ? 16 : r2 + 11 & -8) >>> 3;
      if ((3 & (a2 = (r2 = E[T >> 2]) >>> (e2 >>> 0)) | 0) != 0) {
        e2 = ((i2 = (n2 = (1 & a2 ^ 1) + e2 | 0) << 1) << 2) + T + 40 | 0;
        var i2, a2 = E[(f2 = (i2 + 2 << 2) + T + 40 | 0) >> 2];
        (0 | e2) == (0 | (t = E[(i2 = a2 + 8 | 0) >> 2])) ? A[T >> 2] = r2 & (1 << n2 ^ -1) : (t >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[f2 >> 2] = t, A[t + 12 >> 2] = e2), r2 = n2 << 3, A[a2 + 4 >> 2] = 3 | r2, A[(r2 = a2 + (4 | r2) | 0) >> 2] |= 1, n2 = i2, r2 = 38;
      } else if (i2 >>> 0 > E[T + 8 >> 2] >>> 0)
        if ((0 | a2) != 0) {
          var t, n2, o, f2 = ((n2 = (e2 = ((e2 = (a2 = (e2 = ((n2 = a2 << e2 & ((n2 = 2 << e2) | -n2)) & -n2) - 1 | 0) >>> ((n2 = e2 >>> 12 & 16) >>> 0)) >>> 5 & 8) | n2 | (a2 = (f2 = a2 >>> (e2 >>> 0)) >>> 2 & 4) | (f2 = (t = f2 >>> (a2 >>> 0)) >>> 1 & 2) | (o = (t = t >>> (f2 >>> 0)) >>> 1 & 1)) + (t >>> (o >>> 0)) | 0) << 1) << 2) + T + 40 | 0;
          a2 = E[(t = (n2 + 2 << 2) + T + 40 | 0) >> 2];
          (0 | f2) == (0 | (o = E[(n2 = a2 + 8 | 0) >> 2])) ? A[T >> 2] = r2 & (1 << e2 ^ -1) : (o >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[t >> 2] = o, A[o + 12 >> 2] = f2), r2 = (f2 = e2 << 3) - i2 | 0, A[a2 + 4 >> 2] = 3 | i2, e2 = a2 + i2 | 0, A[a2 + (4 | i2) >> 2] = 1 | r2, A[a2 + f2 >> 2] = r2, (0 | (o = E[T + 8 >> 2])) != 0 && (i2 = A[T + 20 >> 2], a2 = ((f2 = o >>> 2 & 1073741822) << 2) + T + 40 | 0, ((t = E[T >> 2]) & (o = 1 << (o >>> 3)) | 0) == 0 ? (A[T >> 2] = t | o, t = a2, f2 = (f2 + 2 << 2) + T + 40 | 0) : (t = E[(f2 = (f2 + 2 << 2) + T + 40 | 0) >> 2]) >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[f2 >> 2] = i2, A[t + 12 >> 2] = i2, A[(i2 + 8 | 0) >> 2] = t, A[(i2 + 12 | 0) >> 2] = a2), A[T + 8 >> 2] = r2, A[T + 20 >> 2] = e2, r2 = 38;
        } else
          (0 | A[T + 4 >> 2]) == 0 ? (c2 = i2, r2 = 30) : (0 | (r2 = Ld(i2))) == 0 ? (c2 = i2, r2 = 30) : (n2 = r2, r2 = 38);
      else {
        var c2 = i2;
        r2 = 30;
      }
    } else
      4294967231 < r2 >>> 0 ? (c2 = -1, r2 = 30) : (r2 = r2 + 11 & -8, (0 | A[T + 4 >> 2]) == 0 ? (c2 = r2, r2 = 30) : (0 | (i2 = Md(r2))) == 0 ? (c2 = r2, r2 = 30) : (n2 = i2, r2 = 38));
    return r2 == 30 && (c2 >>> 0 > (i2 = E[T + 8 >> 2]) >>> 0 ? c2 >>> 0 < (r2 = E[T + 12 >> 2]) >>> 0 ? (r2 = r2 - c2 | 0, A[T + 12 >> 2] = r2, i2 = E[T + 24 >> 2], A[T + 24 >> 2] = i2 + c2 | 0, A[c2 + (i2 + 4) >> 2] = 1 | r2, A[i2 + 4 >> 2] = 3 | c2, n2 = i2 + 8 | 0) : n2 = Nd(c2) : (n2 = i2 - c2 | 0, r2 = E[T + 20 >> 2], 15 < n2 >>> 0 ? (A[T + 20 >> 2] = r2 + c2 | 0, A[T + 8 >> 2] = n2, A[c2 + (r2 + 4) >> 2] = 1 | n2, A[r2 + i2 >> 2] = n2, A[r2 + 4 >> 2] = 3 | c2) : (A[T + 8 >> 2] = 0, A[T + 20 >> 2] = 0, A[r2 + 4 >> 2] = 3 | i2, A[(c2 = i2 + (r2 + 4) | 0) >> 2] |= 1), n2 = r2 + 8 | 0)), n2;
  }
  function Ld(r2) {
    var e2, i2, a2, t = A[T + 4 >> 2];
    i2 = (t = a2 = E[T + (((a2 = (f2 = (a2 = (t & -t) - 1 | 0) >>> ((t = a2 >>> 12 & 16) >>> 0)) >>> 5 & 8) | t | (f2 = (i2 = f2 >>> (a2 >>> 0)) >>> 2 & 4) | (i2 = (n2 = i2 >>> (f2 >>> 0)) >>> 1 & 2) | (u = (n2 = n2 >>> (i2 >>> 0)) >>> 1 & 1)) + (n2 >>> (u >>> 0)) << 2) + 304 >> 2]) >> 2, a2 = (-8 & A[a2 + 4 >> 2]) - r2 | 0;
    r:
      for (; ; )
        for (f2 = t; ; ) {
          if ((0 | (n2 = A[f2 + 16 >> 2])) == 0) {
            if ((0 | (f2 = A[f2 + 20 >> 2])) == 0)
              break r;
          } else
            f2 = n2;
          if ((n2 = (-8 & A[f2 + 4 >> 2]) - r2 | 0) >>> 0 < a2 >>> 0) {
            i2 = (t = f2) >> 2, a2 = n2;
            continue r;
          }
        }
    var n2 = t, o = E[T + 16 >> 2];
    if (!(u = n2 >>> 0 < o >>> 0)) {
      var f2 = c2 = n2 + r2 | 0;
      if (n2 >>> 0 < c2 >>> 0) {
        var c2, u = E[i2 + 6], s = (0 | (c2 = E[i2 + 3])) == (0 | t);
        do {
          if (s) {
            var d2 = A[(e2 = t + 20 | 0) >> 2];
            if ((0 | d2) == 0 && (0 | (d2 = A[(e2 = t + 16 | 0) >> 2])) == 0) {
              e2 = (d2 = 0) >> 2;
              break;
            }
            for (; ; ) {
              var v2 = d2 + 20 | 0, l2 = A[v2 >> 2];
              if ((0 | l2) == 0 && (0 | (l2 = E[(v2 = d2 + 16 | 0) >> 2])) == 0)
                break;
              e2 = v2, d2 = l2;
            }
            e2 >>> 0 < o >>> 0 && (X(), b("Reached an unreachable!")), A[e2 >> 2] = 0;
          } else
            (e2 = E[i2 + 2]) >>> 0 < o >>> 0 && (X(), b("Reached an unreachable!")), A[e2 + 12 >> 2] = c2, A[c2 + 8 >> 2] = e2, d2 = c2;
          e2 = d2 >> 2;
        } while (0);
        o = (0 | u) == 0;
        r:
          do {
            if (!o) {
              s = (A[(c2 = t + 28 | 0) >> 2] << 2) + T + 304 | 0, v2 = (0 | t) == (0 | A[s >> 2]);
              do {
                if (v2) {
                  if (A[s >> 2] = d2, (0 | d2) != 0)
                    break;
                  A[T + 4 >> 2] &= 1 << A[c2 >> 2] ^ -1;
                  break r;
                }
                if (u >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), (0 | A[(l2 = u + 16 | 0) >> 2]) == (0 | t) ? A[l2 >> 2] = d2 : A[u + 20 >> 2] = d2, (0 | d2) == 0)
                  break r;
              } while (0);
              d2 >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e2 + 6] = u, (0 | (c2 = E[i2 + 4])) != 0 && (c2 >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e2 + 4] = c2, A[c2 + 24 >> 2] = d2), (0 | (c2 = E[i2 + 5])) != 0 && (c2 >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e2 + 5] = c2, A[c2 + 24 >> 2] = d2);
            }
          } while (0);
        return 16 > a2 >>> 0 ? (r2 = a2 + r2 | 0, A[i2 + 1] = 3 | r2, A[(r2 = r2 + (n2 + 4) | 0) >> 2] |= 1) : (A[i2 + 1] = 3 | r2, A[r2 + (n2 + 4) >> 2] = 1 | a2, A[n2 + a2 + r2 >> 2] = a2, (0 | (o = E[T + 8 >> 2])) != 0 && (r2 = E[T + 20 >> 2], i2 = ((n2 = o >>> 2 & 1073741822) << 2) + T + 40 | 0, ((u = E[T >> 2]) & (o = 1 << (o >>> 3)) | 0) == 0 ? (A[T >> 2] = u | o, u = i2, n2 = (n2 + 2 << 2) + T + 40 | 0) : (u = E[(n2 = (n2 + 2 << 2) + T + 40 | 0) >> 2]) >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[n2 >> 2] = r2, A[u + 12 >> 2] = r2, A[r2 + 8 >> 2] = u, A[r2 + 12 >> 2] = i2), A[T + 8 >> 2] = a2, A[T + 20 >> 2] = f2), t + 8 | 0;
      }
    }
    X(), b("Reached an unreachable!");
  }
  function Nd(r2) {
    var e2, i2;
    (0 | A[Od >> 2]) == 0 && Pd();
    var a2 = (4 & A[T + 440 >> 2] | 0) == 0;
    do {
      if (a2) {
        if ((0 | (i2 = A[T + 24 >> 2])) == 0)
          i2 = 6;
        else if ((0 | (i2 = Qd(i2))) == 0)
          i2 = 6;
        else {
          var t = A[Od + 8 >> 2];
          if (2147483647 > (t = r2 + 47 - A[T + 12 >> 2] + t & -t) >>> 0)
            if ((0 | (u = Rd(t))) == (A[i2 >> 2] + A[i2 + 4 >> 2] | 0)) {
              var n2 = u, o = t;
              e2 = u, i2 = 13;
            } else {
              var f2 = u, c2 = t;
              i2 = 15;
            }
          else
            i2 = 14;
        }
        if (i2 == 6)
          if ((0 | (i2 = Rd(0))) == -1)
            i2 = 14;
          else {
            t = (t = A[Od + 8 >> 2]) + (r2 + 47) & -t;
            var u = i2, s = A[Od + 4 >> 2], d2 = s - 1 | 0;
            2147483647 > (t = (d2 & u | 0) == 0 ? t : t - u + (d2 + u & -s) | 0) >>> 0 ? (0 | (u = Rd(t))) == (0 | i2) ? (n2 = i2, o = t, e2 = u, i2 = 13) : (f2 = u, c2 = t, i2 = 15) : i2 = 14;
          }
        if (i2 == 13) {
          if ((0 | n2) != -1) {
            var v2 = o, l2 = n2;
            i2 = 26;
            break;
          }
          f2 = e2, c2 = o;
        } else if (i2 == 14) {
          A[T + 440 >> 2] |= 4, i2 = 23;
          break;
        }
        if (i2 = 0 | -c2, (0 | f2) != -1 & 2147483647 > c2 >>> 0)
          if (c2 >>> 0 < (r2 + 48 | 0) >>> 0)
            2147483647 > (t = r2 + 47 - c2 + (t = A[Od + 8 >> 2]) & -t) >>> 0 ? (0 | Rd(t)) == -1 ? (Rd(i2), i2 = 22) : (h2 = t + c2 | 0, i2 = 21) : (h2 = c2, i2 = 21);
          else {
            var h2 = c2;
            i2 = 21;
          }
        else
          h2 = c2, i2 = 21;
        if (i2 == 21 && (0 | f2) != -1) {
          v2 = h2, l2 = f2, i2 = 26;
          break;
        }
        A[T + 440 >> 2] |= 4;
      }
      i2 = 23;
    } while (0);
    i2 == 23 && (2147483647 > (a2 = (a2 = A[Od + 8 >> 2]) + (r2 + 47) & -a2) >>> 0 ? (a2 = Rd(a2), (0 | (n2 = Rd(0))) != -1 & (0 | a2) != -1 & a2 >>> 0 < n2 >>> 0 ? (n2 = n2 - a2 | 0) >>> 0 <= (r2 + 40 | 0) >>> 0 | (0 | a2) == -1 ? i2 = 49 : (v2 = n2, l2 = a2, i2 = 26) : i2 = 49) : i2 = 49);
    r:
      do {
        if (i2 == 26) {
          a2 = A[T + 432 >> 2] + v2 | 0, A[T + 432 >> 2] = a2, a2 >>> 0 > E[T + 436 >> 2] >>> 0 && (A[T + 436 >> 2] = a2), n2 = (0 | (a2 = E[T + 24 >> 2])) == 0;
          e:
            do {
              if (n2) {
                for ((0 | (o = E[T + 16 >> 2])) == 0 | l2 >>> 0 < o >>> 0 && (A[T + 16 >> 2] = l2), A[T + 444 >> 2] = l2, A[T + 448 >> 2] = v2, A[T + 456 >> 2] = 0, A[T + 36 >> 2] = A[Od >> 2], A[T + 32 >> 2] = -1, o = 0; f2 = ((e2 = o << 1) << 2) + T + 40 | 0, A[T + (e2 + 3 << 2) + 40 >> 2] = f2, A[T + (e2 + 2 << 2) + 40 >> 2] = f2, (0 | (o = o + 1 | 0)) != 32; )
                  ;
                Sd(l2, v2 - 40 | 0);
              } else {
                for (e2 = (f2 = T + 444 | 0) >> 2; (0 | f2) != 0; ) {
                  if ((0 | l2) == (0 | (h2 = (o = E[e2]) + (c2 = E[(f2 = f2 + 4 | 0) >> 2]) | 0))) {
                    if ((8 & A[e2 + 3] | 0) != 0)
                      break;
                    if (!((e2 = a2) >>> 0 >= o >>> 0 & e2 >>> 0 < h2 >>> 0))
                      break;
                    A[f2 >> 2] = c2 + v2 | 0, Sd(A[T + 24 >> 2], A[T + 12 >> 2] + v2 | 0);
                    break e;
                  }
                  e2 = (f2 = A[e2 + 2]) >> 2;
                }
                for (l2 >>> 0 < E[T + 16 >> 2] >>> 0 && (A[T + 16 >> 2] = l2), e2 = l2 + v2 | 0, f2 = T + 444 | 0; (0 | f2) != 0; ) {
                  if ((0 | (o = E[(c2 = 0 | f2) >> 2])) == (0 | e2)) {
                    if ((8 & A[f2 + 12 >> 2] | 0) != 0)
                      break;
                    A[c2 >> 2] = l2;
                    var b2 = f2 + 4 | 0;
                    A[b2 >> 2] = A[b2 >> 2] + v2 | 0, b2 = Td(l2, o, r2), i2 = 50;
                    break r;
                  }
                  f2 = A[f2 + 8 >> 2];
                }
                Ud(l2, v2);
              }
            } while (0);
          (a2 = E[T + 12 >> 2]) >>> 0 > r2 >>> 0 ? (b2 = a2 - r2 | 0, A[T + 12 >> 2] = b2, n2 = a2 = E[T + 24 >> 2], A[T + 24 >> 2] = n2 + r2 | 0, A[r2 + (n2 + 4) >> 2] = 1 | b2, A[a2 + 4 >> 2] = 3 | r2, b2 = a2 + 8 | 0, i2 = 50) : i2 = 49;
        }
      } while (0);
    return i2 == 49 && (A[Vd >> 2] = 12, b2 = 0), b2;
  }
  function Md(r2) {
    var e2, i2, a2, t, n2, o = r2 >> 2, f2 = 0 | -r2, c2 = r2 >>> 8;
    if ((0 | c2) == 0)
      var u = 0;
    else if (16777215 < r2 >>> 0)
      u = 31;
    else {
      var s = (c2 + 1048320 | 0) >>> 16 & 8, d2 = c2 << s, v2 = (d2 + 520192 | 0) >>> 16 & 4, l2 = d2 << v2, h2 = (l2 + 245760 | 0) >>> 16 & 2, p = 14 - (v2 | s | h2) + (l2 << h2 >>> 15) | 0;
      u = r2 >>> ((p + 7 | 0) >>> 0) & 1 | p << 1;
    }
    var R2 = E[T + (u << 2) + 304 >> 2], k = (0 | R2) == 0;
    r:
      do {
        if (k)
          var w = 0, y = f2, M = 0;
        else {
          var g = 0, I2 = f2, N2 = R2;
          n2 = N2 >> 2;
          for (var m = r2 << ((0 | u) == 31 ? 0 : 25 - (u >>> 1) | 0), S2 = 0; ; ) {
            var B2 = -8 & A[n2 + 1], C2 = B2 - r2 | 0;
            if (C2 >>> 0 < I2 >>> 0) {
              if ((0 | B2) == (0 | r2)) {
                w = N2, y = C2, M = N2;
                break r;
              }
              var z2 = N2, O = C2;
            } else
              z2 = g, O = I2;
            var F = E[n2 + 5], j = E[(16 + (m >>> 31 << 2) >> 2) + n2], U = (0 | F) == 0 | (0 | F) == (0 | j) ? S2 : F;
            if ((0 | j) == 0) {
              w = z2, y = O, M = U;
              break r;
            }
            g = z2, I2 = O, n2 = (N2 = j) >> 2, m <<= 1, S2 = U;
          }
        }
      } while (0);
    if ((0 | M) == 0 & (0 | w) == 0) {
      var _ = 2 << u, V = A[T + 4 >> 2] & (_ | -_);
      if ((0 | V) == 0)
        var L = M;
      else {
        var H = (V & -V) - 1 | 0, Z = H >>> 12 & 16, x = H >>> (Z >>> 0), G = x >>> 5 & 8, P = x >>> (G >>> 0), $ = P >>> 2 & 4, q = P >>> ($ >>> 0), D = q >>> 1 & 2, W = q >>> (D >>> 0), Y = W >>> 1 & 1;
        L = A[T + ((G | Z | $ | D | Y) + (W >>> (Y >>> 0)) << 2) + 304 >> 2];
      }
    } else
      L = M;
    var J = (0 | L) == 0;
    r:
      do {
        if (J) {
          var Q = y, K = w;
          t = w >> 2;
        } else {
          var rr = L;
          a2 = rr >> 2;
          for (var er = y, ir = w; ; ) {
            var ar = (-8 & A[a2 + 1]) - r2 | 0, tr = ar >>> 0 < er >>> 0, nr = tr ? ar : er, Ar = tr ? rr : ir, or = E[a2 + 4];
            if ((0 | or) != 0)
              rr = or;
            else {
              var fr = E[a2 + 5];
              if ((0 | fr) == 0) {
                Q = nr, t = (K = Ar) >> 2;
                break r;
              }
              rr = fr;
            }
            a2 = rr >> 2, er = nr, ir = Ar;
          }
        }
      } while (0);
    var cr = (0 | K) == 0;
    r:
      do {
        if (cr)
          var ur = 0;
        else {
          if (Q >>> 0 < (A[T + 8 >> 2] - r2 | 0) >>> 0) {
            var sr = K;
            i2 = sr >> 2;
            var dr = E[T + 16 >> 2];
            if (!(sr >>> 0 < dr >>> 0)) {
              var vr = sr + r2 | 0, lr = vr;
              if (sr >>> 0 < vr >>> 0) {
                var hr = E[t + 6], br = E[t + 3], pr = (0 | br) == (0 | K);
                do {
                  if (pr) {
                    var Er = K + 20 | 0, Tr = A[Er >> 2];
                    if ((0 | Tr) == 0) {
                      var Rr = K + 16 | 0, kr = A[Rr >> 2];
                      if ((0 | kr) == 0) {
                        var wr = 0;
                        e2 = wr >> 2;
                        break;
                      }
                      var yr = Rr, Mr = kr;
                    } else
                      yr = Er, Mr = Tr;
                    for (; ; ) {
                      var gr = Mr + 20 | 0, Ir = A[gr >> 2];
                      if ((0 | Ir) != 0)
                        yr = gr, Mr = Ir;
                      else {
                        var Nr = Mr + 16 | 0, mr = E[Nr >> 2];
                        if ((0 | mr) == 0)
                          break;
                        yr = Nr, Mr = mr;
                      }
                    }
                    yr >>> 0 < dr >>> 0 && (X(), b("Reached an unreachable!")), A[yr >> 2] = 0, wr = Mr;
                  } else {
                    var Xr = E[t + 2];
                    Xr >>> 0 < dr >>> 0 && (X(), b("Reached an unreachable!")), A[Xr + 12 >> 2] = br, A[br + 8 >> 2] = Xr, wr = br;
                  }
                  e2 = wr >> 2;
                } while (0);
                var Sr = (0 | hr) == 0;
                e:
                  do {
                    if (!Sr) {
                      var Br = K + 28 | 0, Cr = (A[Br >> 2] << 2) + T + 304 | 0, zr = (0 | K) == (0 | A[Cr >> 2]);
                      do {
                        if (zr) {
                          if (A[Cr >> 2] = wr, (0 | wr) != 0)
                            break;
                          A[T + 4 >> 2] &= 1 << A[Br >> 2] ^ -1;
                          break e;
                        }
                        hr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!"));
                        var Or = hr + 16 | 0;
                        if ((0 | A[Or >> 2]) == (0 | K) ? A[Or >> 2] = wr : A[hr + 20 >> 2] = wr, (0 | wr) == 0)
                          break e;
                      } while (0);
                      wr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e2 + 6] = hr;
                      var Fr = E[t + 4];
                      (0 | Fr) != 0 && (Fr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e2 + 4] = Fr, A[Fr + 24 >> 2] = wr);
                      var jr = E[t + 5];
                      (0 | jr) != 0 && (jr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e2 + 5] = jr, A[jr + 24 >> 2] = wr);
                    }
                  } while (0);
                var Ur = 16 > Q >>> 0;
                e:
                  do {
                    if (Ur) {
                      var _r = Q + r2 | 0;
                      A[t + 1] = 3 | _r, A[(_r + (sr + 4) | 0) >> 2] |= 1;
                    } else if (A[t + 1] = 3 | r2, A[o + (i2 + 1)] = 1 | Q, A[(Q >> 2) + i2 + o] = Q, 256 > Q >>> 0) {
                      var Vr = Q >>> 2 & 1073741822, Lr = (Vr << 2) + T + 40 | 0, Hr = E[T >> 2], Zr = 1 << (Q >>> 3);
                      if ((Hr & Zr | 0) == 0) {
                        A[T >> 2] = Hr | Zr;
                        var xr = Lr, Gr = (Vr + 2 << 2) + T + 40 | 0;
                      } else {
                        var Pr = (Vr + 2 << 2) + T + 40 | 0, $r = E[Pr >> 2];
                        $r >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), xr = $r, Gr = Pr;
                      }
                      A[Gr >> 2] = lr, A[xr + 12 >> 2] = lr, A[o + (i2 + 2)] = xr, A[o + (i2 + 3)] = Lr;
                    } else {
                      var qr = vr, Dr = Q >>> 8;
                      if ((0 | Dr) == 0)
                        var Wr = 0;
                      else if (16777215 < Q >>> 0)
                        Wr = 31;
                      else {
                        var Yr = (Dr + 1048320 | 0) >>> 16 & 8, Jr = Dr << Yr, Qr = (Jr + 520192 | 0) >>> 16 & 4, Kr = Jr << Qr, re2 = (Kr + 245760 | 0) >>> 16 & 2, ee2 = 14 - (Qr | Yr | re2) + (Kr << re2 >>> 15) | 0;
                        Wr = Q >>> ((ee2 + 7 | 0) >>> 0) & 1 | ee2 << 1;
                      }
                      var ie = (Wr << 2) + T + 304 | 0;
                      A[o + (i2 + 7)] = Wr;
                      var ae2 = r2 + (sr + 16) | 0;
                      A[o + (i2 + 5)] = 0, A[ae2 >> 2] = 0;
                      var te2 = A[T + 4 >> 2], ne2 = 1 << Wr;
                      if ((te2 & ne2 | 0) == 0)
                        A[T + 4 >> 2] = te2 | ne2, A[ie >> 2] = qr, A[o + (i2 + 6)] = ie, A[o + (i2 + 3)] = qr, A[o + (i2 + 2)] = qr;
                      else
                        for (var Ae2 = Q << ((0 | Wr) == 31 ? 0 : 25 - (Wr >>> 1) | 0), oe2 = A[ie >> 2]; ; ) {
                          if ((-8 & A[oe2 + 4 >> 2] | 0) == (0 | Q)) {
                            var fe2 = oe2 + 8 | 0, ce2 = E[fe2 >> 2], ue2 = E[T + 16 >> 2];
                            if (!(oe2 >>> 0 < ue2 >>> 0) && ce2 >>> 0 >= ue2 >>> 0) {
                              A[ce2 + 12 >> 2] = qr, A[fe2 >> 2] = qr, A[o + (i2 + 2)] = ce2, A[o + (i2 + 3)] = oe2, A[o + (i2 + 6)] = 0;
                              break e;
                            }
                            X(), b("Reached an unreachable!");
                          }
                          var se2 = (Ae2 >>> 31 << 2) + oe2 + 16 | 0, de2 = E[se2 >> 2];
                          if ((0 | de2) == 0) {
                            if (se2 >>> 0 >= E[T + 16 >> 2] >>> 0) {
                              A[se2 >> 2] = qr, A[o + (i2 + 6)] = oe2, A[o + (i2 + 3)] = qr, A[o + (i2 + 2)] = qr;
                              break e;
                            }
                            X(), b("Reached an unreachable!");
                          }
                          Ae2 <<= 1, oe2 = de2;
                        }
                    }
                  } while (0);
                ur = K + 8 | 0;
                break r;
              }
            }
            X(), b("Reached an unreachable!");
          }
          ur = 0;
        }
      } while (0);
    return ur;
  }
  function Wd(r2) {
    var e2;
    (0 | A[Od >> 2]) == 0 && Pd();
    var i2 = 4294967232 > r2 >>> 0;
    r:
      do {
        if (i2) {
          var a2 = E[T + 24 >> 2];
          if ((0 | a2) != 0) {
            var t = E[T + 12 >> 2];
            if (t >>> 0 > (r2 + 40 | 0) >>> 0) {
              var n2 = E[Od + 8 >> 2], o = (Math.floor(((-40 - r2 - 1 + t + n2 | 0) >>> 0) / (n2 >>> 0)) - 1) * n2 | 0, f2 = Qd(a2);
              if ((8 & A[f2 + 12 >> 2] | 0) == 0) {
                var c2 = Rd(0);
                if (e2 = (f2 + 4 | 0) >> 2, (0 | c2) == (A[f2 >> 2] + A[e2] | 0) && ((0 | (o = Rd(0 | -(2147483646 < o >>> 0 ? -2147483648 - n2 | 0 : o)))) != -1 & (n2 = Rd(0)) >>> 0 < c2 >>> 0 && (o = c2 - n2 | 0, (0 | c2) != (0 | n2)))) {
                  A[e2] = A[e2] - o | 0, A[T + 432 >> 2] = A[T + 432 >> 2] - o | 0, Sd(A[T + 24 >> 2], A[T + 12 >> 2] - o | 0), e2 = (0 | c2) != (0 | n2);
                  break r;
                }
              }
            }
            E[T + 12 >> 2] >>> 0 > E[T + 28 >> 2] >>> 0 && (A[T + 28 >> 2] = -1);
          }
        }
        e2 = 0;
      } while (0);
    return 1 & e2;
  }
  function Xd(r2) {
    var e2, i2, a2, t, n2, o, f2 = r2 >> 2, c2 = (0 | r2) == 0;
    r:
      do {
        if (!c2) {
          var u = r2 - 8 | 0, s = u, d2 = E[T + 16 >> 2], v2 = u >>> 0 < d2 >>> 0;
          e:
            do {
              if (!v2) {
                var l2 = E[r2 - 4 >> 2], h2 = 3 & l2;
                if ((0 | h2) != 1) {
                  var p = -8 & l2;
                  o = p >> 2;
                  var R2 = r2 + (p - 8) | 0, k = R2, w = (1 & l2 | 0) == 0;
                  i:
                    do {
                      if (w) {
                        var y = E[u >> 2];
                        if ((0 | h2) == 0)
                          break r;
                        var M = -8 - y | 0;
                        n2 = M >> 2;
                        var g = r2 + M | 0, I2 = g, N2 = y + p | 0;
                        if (g >>> 0 < d2 >>> 0)
                          break e;
                        if ((0 | I2) == (0 | A[T + 20 >> 2])) {
                          if ((3 & A[t = (r2 + (p - 4) | 0) >> 2] | 0) != 3) {
                            var m = I2;
                            a2 = m >> 2;
                            var S2 = N2;
                            break;
                          }
                          A[T + 8 >> 2] = N2, A[t] &= -2, A[n2 + (f2 + 1)] = 1 | N2, A[R2 >> 2] = N2;
                          break r;
                        }
                        if (256 > y >>> 0) {
                          var B2 = E[n2 + (f2 + 2)], C2 = E[n2 + (f2 + 3)];
                          if ((0 | B2) == (0 | C2))
                            A[T >> 2] &= 1 << (y >>> 3) ^ -1, a2 = (m = I2) >> 2, S2 = N2;
                          else {
                            var z2 = ((y >>> 2 & 1073741822) << 2) + T + 40 | 0;
                            if (!((0 | B2) != (0 | z2) & B2 >>> 0 < d2 >>> 0) && (0 | C2) == (0 | z2) | C2 >>> 0 >= d2 >>> 0) {
                              A[B2 + 12 >> 2] = C2, A[C2 + 8 >> 2] = B2, a2 = (m = I2) >> 2, S2 = N2;
                              break i;
                            }
                            X(), b("Reached an unreachable!");
                          }
                        } else {
                          var O = g, F = E[n2 + (f2 + 6)], j = E[n2 + (f2 + 3)], U = (0 | j) == (0 | O);
                          do {
                            if (U) {
                              var _ = M + (r2 + 20) | 0, V = A[_ >> 2];
                              if ((0 | V) == 0) {
                                var L = M + (r2 + 16) | 0, H = A[L >> 2];
                                if ((0 | H) == 0) {
                                  var Z = 0;
                                  i2 = Z >> 2;
                                  break;
                                }
                                var x = L, G = H;
                              } else
                                x = _, G = V, 21;
                              for (; ; ) {
                                var P = G + 20 | 0, $ = A[P >> 2];
                                if ((0 | $) != 0)
                                  x = P, G = $;
                                else {
                                  var q = G + 16 | 0, D = E[q >> 2];
                                  if ((0 | D) == 0)
                                    break;
                                  x = q, G = D;
                                }
                              }
                              x >>> 0 < d2 >>> 0 && (X(), b("Reached an unreachable!")), A[x >> 2] = 0, Z = G;
                            } else {
                              var W = E[n2 + (f2 + 2)];
                              W >>> 0 < d2 >>> 0 && (X(), b("Reached an unreachable!")), A[W + 12 >> 2] = j, A[j + 8 >> 2] = W, Z = j;
                            }
                            i2 = Z >> 2;
                          } while (0);
                          if ((0 | F) != 0) {
                            var Y = M + (r2 + 28) | 0, J = (A[Y >> 2] << 2) + T + 304 | 0, Q = (0 | O) == (0 | A[J >> 2]);
                            do {
                              if (Q) {
                                if (A[J >> 2] = Z, (0 | Z) != 0)
                                  break;
                                A[T + 4 >> 2] &= 1 << A[Y >> 2] ^ -1, a2 = (m = I2) >> 2, S2 = N2;
                                break i;
                              }
                              F >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!"));
                              var K = F + 16 | 0;
                              if ((0 | A[K >> 2]) == (0 | O) ? A[K >> 2] = Z : A[F + 20 >> 2] = Z, (0 | Z) == 0) {
                                a2 = (m = I2) >> 2, S2 = N2;
                                break i;
                              }
                            } while (0);
                            Z >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[i2 + 6] = F;
                            var rr = E[n2 + (f2 + 4)];
                            (0 | rr) != 0 && (rr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[i2 + 4] = rr, A[rr + 24 >> 2] = Z);
                            var er = E[n2 + (f2 + 5)];
                            (0 | er) != 0 && (er >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[i2 + 5] = er, A[er + 24 >> 2] = Z);
                          }
                          a2 = (m = I2) >> 2, S2 = N2;
                        }
                      } else
                        a2 = (m = s) >> 2, S2 = p;
                    } while (0);
                  var ir = m;
                  if (ir >>> 0 < R2 >>> 0) {
                    var ar = r2 + (p - 4) | 0, tr = E[ar >> 2];
                    if ((1 & tr | 0) != 0) {
                      if ((2 & tr | 0) == 0) {
                        if ((0 | k) == (0 | A[T + 24 >> 2])) {
                          var nr = A[T + 12 >> 2] + S2 | 0;
                          if (A[T + 12 >> 2] = nr, A[T + 24 >> 2] = m, A[a2 + 1] = 1 | nr, (0 | m) == (0 | A[T + 20 >> 2]) && (A[T + 20 >> 2] = 0, A[T + 8 >> 2] = 0), nr >>> 0 <= E[T + 28 >> 2] >>> 0)
                            break r;
                          Wd(0);
                          break r;
                        }
                        if ((0 | k) == (0 | A[T + 20 >> 2])) {
                          var Ar = A[T + 8 >> 2] + S2 | 0;
                          A[T + 8 >> 2] = Ar, A[T + 20 >> 2] = m, A[a2 + 1] = 1 | Ar, A[(ir + Ar | 0) >> 2] = Ar;
                          break r;
                        }
                        var or = (-8 & tr) + S2 | 0, fr = tr >>> 3, cr = 256 > tr >>> 0;
                        i:
                          do {
                            if (cr) {
                              var ur = E[f2 + o], sr = E[((4 | p) >> 2) + f2];
                              if ((0 | ur) == (0 | sr))
                                A[T >> 2] &= 1 << fr ^ -1;
                              else {
                                var dr = ((tr >>> 2 & 1073741822) << 2) + T + 40 | 0;
                                if (((0 | ur) == (0 | dr) ? 63 : ur >>> 0 < E[T + 16 >> 2] >>> 0 ? 66 : 63) == 63 && !((0 | sr) != (0 | dr) && sr >>> 0 < E[T + 16 >> 2] >>> 0)) {
                                  A[ur + 12 >> 2] = sr, A[sr + 8 >> 2] = ur;
                                  break i;
                                }
                                X(), b("Reached an unreachable!");
                              }
                            } else {
                              var vr = R2, lr = E[o + (f2 + 4)], hr = E[((4 | p) >> 2) + f2], br = (0 | hr) == (0 | vr);
                              do {
                                if (br) {
                                  var pr = p + (r2 + 12) | 0, Er = A[pr >> 2];
                                  if ((0 | Er) == 0) {
                                    var Tr = p + (r2 + 8) | 0, Rr = A[Tr >> 2];
                                    if ((0 | Rr) == 0) {
                                      var kr = 0;
                                      e2 = kr >> 2;
                                      break;
                                    }
                                    var wr = Tr, yr = Rr;
                                  } else
                                    wr = pr, yr = Er, 73;
                                  for (; ; ) {
                                    var Mr = yr + 20 | 0, gr = A[Mr >> 2];
                                    if ((0 | gr) != 0)
                                      wr = Mr, yr = gr;
                                    else {
                                      var Ir = yr + 16 | 0, Nr = E[Ir >> 2];
                                      if ((0 | Nr) == 0)
                                        break;
                                      wr = Ir, yr = Nr;
                                    }
                                  }
                                  wr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[wr >> 2] = 0, kr = yr;
                                } else {
                                  var mr = E[f2 + o];
                                  mr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[mr + 12 >> 2] = hr, A[hr + 8 >> 2] = mr, kr = hr;
                                }
                                e2 = kr >> 2;
                              } while (0);
                              if ((0 | lr) != 0) {
                                var Xr = p + (r2 + 20) | 0, Sr = (A[Xr >> 2] << 2) + T + 304 | 0, Br = (0 | vr) == (0 | A[Sr >> 2]);
                                do {
                                  if (Br) {
                                    if (A[Sr >> 2] = kr, (0 | kr) != 0)
                                      break;
                                    A[T + 4 >> 2] &= 1 << A[Xr >> 2] ^ -1;
                                    break i;
                                  }
                                  lr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!"));
                                  var Cr = lr + 16 | 0;
                                  if ((0 | A[Cr >> 2]) == (0 | vr) ? A[Cr >> 2] = kr : A[lr + 20 >> 2] = kr, (0 | kr) == 0)
                                    break i;
                                } while (0);
                                kr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e2 + 6] = lr;
                                var zr = E[o + (f2 + 2)];
                                (0 | zr) != 0 && (zr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e2 + 4] = zr, A[zr + 24 >> 2] = kr);
                                var Or = E[o + (f2 + 3)];
                                (0 | Or) != 0 && (Or >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e2 + 5] = Or, A[Or + 24 >> 2] = kr);
                              }
                            }
                          } while (0);
                        if (A[a2 + 1] = 1 | or, A[ir + or >> 2] = or, (0 | m) == (0 | A[T + 20 >> 2])) {
                          A[T + 8 >> 2] = or;
                          break r;
                        }
                        var Fr = or;
                      } else
                        A[ar >> 2] = -2 & tr, A[a2 + 1] = 1 | S2, Fr = A[ir + S2 >> 2] = S2;
                      if (256 > Fr >>> 0) {
                        var jr = Fr >>> 2 & 1073741822, Ur = (jr << 2) + T + 40 | 0, _r = E[T >> 2], Vr = 1 << (Fr >>> 3);
                        if ((_r & Vr | 0) == 0) {
                          A[T >> 2] = _r | Vr;
                          var Lr = Ur, Hr = (jr + 2 << 2) + T + 40 | 0;
                        } else {
                          var Zr = (jr + 2 << 2) + T + 40 | 0, xr = E[Zr >> 2];
                          xr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), Lr = xr, Hr = Zr;
                        }
                        A[Hr >> 2] = m, A[Lr + 12 >> 2] = m, A[a2 + 2] = Lr, A[a2 + 3] = Ur;
                        break r;
                      }
                      var Gr = m, Pr = Fr >>> 8;
                      if ((0 | Pr) == 0)
                        var $r = 0;
                      else if (16777215 < Fr >>> 0)
                        $r = 31;
                      else {
                        var qr = (Pr + 1048320 | 0) >>> 16 & 8, Dr = Pr << qr, Wr = (Dr + 520192 | 0) >>> 16 & 4, Yr = Dr << Wr, Jr = (Yr + 245760 | 0) >>> 16 & 2, Qr = 14 - (Wr | qr | Jr) + (Yr << Jr >>> 15) | 0;
                        $r = Fr >>> ((Qr + 7 | 0) >>> 0) & 1 | Qr << 1;
                      }
                      var Kr = ($r << 2) + T + 304 | 0;
                      A[a2 + 7] = $r, A[a2 + 5] = 0, A[a2 + 4] = 0;
                      var re2 = A[T + 4 >> 2], ee2 = 1 << $r, ie = (re2 & ee2 | 0) == 0;
                      i:
                        do {
                          if (ie)
                            A[T + 4 >> 2] = re2 | ee2, A[Kr >> 2] = Gr, A[a2 + 6] = Kr, A[a2 + 3] = m, A[a2 + 2] = m;
                          else
                            for (var ae2 = Fr << ((0 | $r) == 31 ? 0 : 25 - ($r >>> 1) | 0), te2 = A[Kr >> 2]; ; ) {
                              if ((-8 & A[te2 + 4 >> 2] | 0) == (0 | Fr)) {
                                var ne2 = te2 + 8 | 0, Ae2 = E[ne2 >> 2], oe2 = E[T + 16 >> 2];
                                if (!(te2 >>> 0 < oe2 >>> 0) && Ae2 >>> 0 >= oe2 >>> 0) {
                                  A[Ae2 + 12 >> 2] = Gr, A[ne2 >> 2] = Gr, A[a2 + 2] = Ae2, A[a2 + 3] = te2, A[a2 + 6] = 0;
                                  break i;
                                }
                                X(), b("Reached an unreachable!");
                              }
                              var fe2 = (ae2 >>> 31 << 2) + te2 + 16 | 0, ce2 = E[fe2 >> 2];
                              if ((0 | ce2) == 0) {
                                if (fe2 >>> 0 >= E[T + 16 >> 2] >>> 0) {
                                  A[fe2 >> 2] = Gr, A[a2 + 6] = te2, A[a2 + 3] = m, A[a2 + 2] = m;
                                  break i;
                                }
                                X(), b("Reached an unreachable!");
                              }
                              ae2 <<= 1, te2 = ce2;
                            }
                        } while (0);
                      var ue2 = A[T + 32 >> 2] - 1 | 0;
                      if (A[T + 32 >> 2] = ue2, (0 | ue2) != 0)
                        break r;
                      var se2 = A[T + 452 >> 2], de2 = (0 | se2) == 0;
                      i:
                        do {
                          if (!de2)
                            for (var ve2 = se2; ; ) {
                              var le2 = A[ve2 + 8 >> 2];
                              if ((0 | le2) == 0)
                                break i;
                              ve2 = le2;
                            }
                        } while (0);
                      A[T + 32 >> 2] = -1;
                      break r;
                    }
                  }
                }
              }
            } while (0);
          X(), b("Reached an unreachable!");
        }
      } while (0);
  }
  function Yd(r2, e2) {
    var i2, a2, t, n2 = 4294967231 < e2 >>> 0;
    r:
      do {
        if (n2) {
          A[Vd >> 2] = 12;
          var o = 0;
        } else {
          t = i2 = r2 - 8 | 0;
          var f2 = -8 & (l2 = E[a2 = (r2 - 4 | 0) >> 2]), c2 = f2 - 8 | 0, u = r2 + c2 | 0;
          if (!(i2 >>> 0 < E[T + 16 >> 2] >>> 0)) {
            var s = 3 & l2;
            if ((0 | s) != 1 & -8 < (0 | c2) && (1 & A[i2 = (r2 + (f2 - 4) | 0) >> 2] | 0) != 0) {
              if (n2 = 11 > e2 >>> 0 ? 16 : e2 + 11 & -8, (0 | s) == 0) {
                var d2, v2 = 0, l2 = -8 & A[t + 4 >> 2];
                d2 = 256 > n2 >>> 0 ? 0 : l2 >>> 0 >= (n2 + 4 | 0) >>> 0 && (l2 - n2 | 0) >>> 0 <= A[Od + 8 >> 2] << 1 >>> 0 ? t : 0, t = 17;
              } else
                f2 >>> 0 < n2 >>> 0 ? (0 | u) != (0 | A[T + 24 >> 2]) ? t = 21 : (i2 = A[T + 12 >> 2] + f2 | 0) >>> 0 > n2 >>> 0 ? (v2 = i2 - n2 | 0, d2 = r2 + (n2 - 8) | 0, A[a2] = n2 | 1 & l2 | 2, A[r2 + (n2 - 4) >> 2] = 1 | v2, A[T + 24 >> 2] = d2, A[T + 12 >> 2] = v2, v2 = 0, d2 = t, t = 17) : t = 21 : (15 < (v2 = f2 - n2 | 0) >>> 0 ? (A[a2] = n2 | 1 & l2 | 2, A[r2 + (n2 - 4) >> 2] = 3 | v2, A[i2] |= 1, v2 = r2 + n2 | 0) : v2 = 0, d2 = t, t = 17);
              if (t == 17 && (0 | d2) != 0) {
                (0 | v2) != 0 && Xd(v2), o = d2 + 8 | 0;
                break r;
              }
              if ((0 | (t = Yb(e2))) == 0) {
                o = 0;
                break r;
              }
              hd(t, r2, (a2 = f2 - ((3 & A[a2] | 0) == 0 ? 8 : 4) | 0) >>> 0 < e2 >>> 0 ? a2 : e2), Xd(r2), o = t;
              break r;
            }
          }
          X(), b("Reached an unreachable!");
        }
      } while (0);
    return o;
  }
  function Pd() {
    if ((0 | A[Od >> 2]) == 0) {
      var r2 = Zd();
      (r2 - 1 & r2 | 0) == 0 ? (A[Od + 8 >> 2] = r2, A[Od + 4 >> 2] = r2, A[Od + 12 >> 2] = -1, A[Od + 16 >> 2] = 2097152, A[Od + 20 >> 2] = 0, A[T + 440 >> 2] = 0, A[Od >> 2] = -16 & Math.floor(Date.now() / 1e3) ^ 1431655768) : (X(), b("Reached an unreachable!"));
    }
  }
  function $d(r2) {
    if ((0 | r2) == 0)
      r2 = 0;
    else {
      var e2 = 3 & (r2 = A[r2 - 4 >> 2]);
      r2 = (0 | e2) == 1 ? 0 : (-8 & r2) - ((0 | e2) == 0 ? 8 : 4) | 0;
    }
    return r2;
  }
  function Qd(r2) {
    var e2, i2 = T + 444 | 0;
    for (e2 = i2 >> 2; ; ) {
      var a2 = E[e2];
      if (a2 >>> 0 <= r2 >>> 0 && (a2 + A[e2 + 1] | 0) >>> 0 > r2 >>> 0) {
        var t = i2;
        break;
      }
      if ((0 | (e2 = E[e2 + 2])) == 0) {
        t = 0;
        break;
      }
      e2 = (i2 = e2) >> 2;
    }
    return t;
  }
  function Sd(r2, e2) {
    var i2, a2 = e2 - (i2 = (7 & (i2 = r2 + 8 | 0) | 0) == 0 ? 0 : 7 & -i2) | 0;
    A[T + 24 >> 2] = r2 + i2 | 0, A[T + 12 >> 2] = a2, A[i2 + (r2 + 4) >> 2] = 1 | a2, A[e2 + (r2 + 4) >> 2] = 40, A[T + 28 >> 2] = A[Od + 16 >> 2];
  }
  function Td(r2, e2, i2) {
    var a2, t, n2, o, f2, c2 = e2 >> 2, u = r2 >> 2, s = (7 & (t = e2 + 8 | 0) | 0) == 0 ? 0 : 7 & -t;
    n2 = s >> 2;
    var d2 = e2 + s | 0, v2 = (f2 = (7 & (f2 = r2 + 8 | 0) | 0) == 0 ? 0 : 7 & -f2) + i2 | 0;
    t = v2 >> 2;
    var l2 = r2 + v2 | 0, h2 = d2 - (r2 + f2) - i2 | 0;
    A[(f2 + 4 >> 2) + u] = 3 | i2, i2 = (0 | d2) == (0 | A[T + 24 >> 2]);
    r:
      do {
        if (i2) {
          var p = A[T + 12 >> 2] + h2 | 0;
          A[T + 12 >> 2] = p, A[T + 24 >> 2] = l2, A[t + (u + 1)] = 1 | p;
        } else if ((0 | d2) == (0 | A[T + 20 >> 2]))
          p = A[T + 8 >> 2] + h2 | 0, A[T + 8 >> 2] = p, A[T + 20 >> 2] = l2, A[t + (u + 1)] = 1 | p, A[(r2 + p + v2 | 0) >> 2] = p;
        else {
          var R2 = E[n2 + (c2 + 1)];
          if ((3 & R2 | 0) == 1) {
            p = -8 & R2;
            var k = R2 >>> 3, w = 256 > R2 >>> 0;
            e:
              do {
                if (w) {
                  var y = E[((8 | s) >> 2) + c2], M = E[n2 + (c2 + 3)];
                  if ((0 | y) == (0 | M))
                    A[T >> 2] &= 1 << k ^ -1;
                  else {
                    var g = ((R2 >>> 2 & 1073741822) << 2) + T + 40 | 0;
                    if ((o = (0 | y) == (0 | g) ? 15 : y >>> 0 < E[T + 16 >> 2] >>> 0 ? 18 : 15) == 15 && !((0 | M) != (0 | g) && M >>> 0 < E[T + 16 >> 2] >>> 0)) {
                      A[y + 12 >> 2] = M, A[M + 8 >> 2] = y;
                      break e;
                    }
                    X(), b("Reached an unreachable!");
                  }
                } else {
                  o = d2, y = E[((24 | s) >> 2) + c2], g = (0 | (M = E[n2 + (c2 + 3)])) == (0 | o);
                  do {
                    if (g) {
                      var I2 = A[(N2 = (a2 = 16 | s) + (e2 + 4) | 0) >> 2];
                      if ((0 | I2) == 0) {
                        if ((0 | (I2 = A[(a2 = e2 + a2 | 0) >> 2])) == 0) {
                          a2 = (I2 = 0) >> 2;
                          break;
                        }
                      } else
                        a2 = N2;
                      for (; ; ) {
                        var N2, m = A[(N2 = I2 + 20 | 0) >> 2];
                        if ((0 | m) == 0 && (0 | (m = E[(N2 = I2 + 16 | 0) >> 2])) == 0)
                          break;
                        a2 = N2, I2 = m;
                      }
                      a2 >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[a2 >> 2] = 0;
                    } else
                      (a2 = E[((8 | s) >> 2) + c2]) >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[a2 + 12 >> 2] = M, A[M + 8 >> 2] = a2, I2 = M;
                    a2 = I2 >> 2;
                  } while (0);
                  if ((0 | y) != 0) {
                    g = (A[(M = s + (e2 + 28) | 0) >> 2] << 2) + T + 304 | 0, N2 = (0 | o) == (0 | A[g >> 2]);
                    do {
                      if (N2) {
                        if (A[g >> 2] = I2, (0 | I2) != 0)
                          break;
                        A[T + 4 >> 2] &= 1 << A[M >> 2] ^ -1;
                        break e;
                      }
                      if (y >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), (0 | A[(m = y + 16 | 0) >> 2]) == (0 | o) ? A[m >> 2] = I2 : A[y + 20 >> 2] = I2, (0 | I2) == 0)
                        break e;
                    } while (0);
                    I2 >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[a2 + 6] = y, (0 | (y = E[((o = 16 | s) >> 2) + c2])) != 0 && (y >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[a2 + 4] = y, A[y + 24 >> 2] = I2), (0 | (o = E[(o + 4 >> 2) + c2])) != 0 && (o >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[a2 + 5] = o, A[o + 24 >> 2] = I2);
                  }
                }
              } while (0);
            R2 = e2 + (p | s) | 0, p = p + h2 | 0;
          } else
            R2 = d2, p = h2;
          if (A[(R2 = R2 + 4 | 0) >> 2] &= -2, A[t + (u + 1)] = 1 | p, A[(p >> 2) + u + t] = p, 256 > p >>> 0)
            R2 = ((k = p >>> 2 & 1073741822) << 2) + T + 40 | 0, ((w = E[T >> 2]) & (p = 1 << (p >>> 3)) | 0) == 0 ? (A[T >> 2] = w | p, p = R2, k = (k + 2 << 2) + T + 40 | 0) : (p = E[(k = (k + 2 << 2) + T + 40 | 0) >> 2]) >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[k >> 2] = l2, A[p + 12 >> 2] = l2, A[t + (u + 2)] = p, A[t + (u + 3)] = R2;
          else if (R2 = l2, (0 | (w = p >>> 8)) == 0 ? k = 0 : 16777215 < p >>> 0 ? k = 31 : k = p >>> (((k = 14 - ((w = ((o = w << (k = (w + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4) | k | (y = ((o <<= w) + 245760 | 0) >>> 16 & 2)) + (o << y >>> 15) | 0) + 7 | 0) >>> 0) & 1 | k << 1, w = (k << 2) + T + 304 | 0, A[t + (u + 7)] = k, o = v2 + (r2 + 16) | 0, A[t + (u + 5)] = 0, A[o >> 2] = 0, ((o = A[T + 4 >> 2]) & (y = 1 << k) | 0) == 0)
            A[T + 4 >> 2] = o | y, A[w >> 2] = R2, A[t + (u + 6)] = w, A[t + (u + 3)] = R2, A[t + (u + 2)] = R2;
          else
            for (k = p << ((0 | k) == 31 ? 0 : 25 - (k >>> 1) | 0), w = A[w >> 2]; ; ) {
              if ((-8 & A[w + 4 >> 2] | 0) == (0 | p)) {
                if (y = E[(o = w + 8 | 0) >> 2], !(g = w >>> 0 < (M = E[T + 16 >> 2]) >>> 0) && y >>> 0 >= M >>> 0) {
                  A[y + 12 >> 2] = R2, A[o >> 2] = R2, A[t + (u + 2)] = y, A[t + (u + 3)] = w, A[t + (u + 6)] = 0;
                  break r;
                }
                X(), b("Reached an unreachable!");
              }
              if ((0 | (y = E[(o = (k >>> 31 << 2) + w + 16 | 0) >> 2])) == 0) {
                if (o >>> 0 >= E[T + 16 >> 2] >>> 0) {
                  A[o >> 2] = R2, A[t + (u + 6)] = w, A[t + (u + 3)] = R2, A[t + (u + 2)] = R2;
                  break r;
                }
                X(), b("Reached an unreachable!");
              }
              k <<= 1, w = y;
            }
        }
      } while (0);
    return r2 + (8 | f2) | 0;
  }
  function ae(r2) {
    A[r2 >> 2] = be + 8 | 0;
  }
  function ce(r2) {
    de(0 | r2);
  }
  function Ud(r2, e2) {
    var i2, a2, t = E[T + 24 >> 2];
    a2 = t >> 2;
    var n2, o, f2 = Qd(t);
    f2 = (n2 = A[f2 >> 2]) + (i2 = A[f2 + 4 >> 2]) | 0;
    i2 = (o = (n2 = (n2 = n2 + (i2 - 47) + ((7 & (o = n2 + (i2 - 39) | 0) | 0) == 0 ? 0 : 7 & -o) | 0) >>> 0 < (t + 16 | 0) >>> 0 ? t : n2) + 8 | 0) >> 2, Sd(r2, e2 - 40 | 0), A[(n2 + 4 | 0) >> 2] = 27, A[i2] = A[T + 444 >> 2], A[i2 + 1] = A[T + 448 >> 2], A[i2 + 2] = A[T + 452 >> 2], A[i2 + 3] = A[T + 456 >> 2], A[T + 444 >> 2] = r2, A[T + 448 >> 2] = e2, A[T + 456 >> 2] = 0, A[T + 452 >> 2] = o, A[(i2 = n2 + 28 | 0) >> 2] = 7, o = (n2 + 32 | 0) >>> 0 < f2 >>> 0;
    r:
      do {
        if (o)
          for (var c2 = i2; ; ) {
            if (A[(u = c2 + 4 | 0) >> 2] = 7, (c2 + 8 | 0) >>> 0 >= f2 >>> 0)
              break r;
            c2 = u;
          }
      } while (0);
    f2 = (0 | n2) == (0 | t);
    r:
      do {
        if (!f2)
          if (o = t + (i2 = n2 - t | 0) | 0, A[(c2 = i2 + (t + 4) | 0) >> 2] &= -2, A[a2 + 1] = 1 | i2, A[o >> 2] = i2, 256 > i2 >>> 0)
            o = ((c2 = i2 >>> 2 & 1073741822) << 2) + T + 40 | 0, ((u = E[T >> 2]) & (i2 = 1 << (i2 >>> 3)) | 0) == 0 ? (A[T >> 2] = u | i2, i2 = o, c2 = (c2 + 2 << 2) + T + 40 | 0) : (i2 = E[(c2 = (c2 + 2 << 2) + T + 40 | 0) >> 2]) >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[c2 >> 2] = t, A[i2 + 12 >> 2] = t, A[a2 + 2] = i2, A[a2 + 3] = o;
          else {
            if (o = t, (0 | (u = i2 >>> 8)) == 0)
              c2 = 0;
            else if (16777215 < i2 >>> 0)
              c2 = 31;
            else {
              var u;
              c2 = i2 >>> (((c2 = 14 - ((u = ((s = u << (c2 = (u + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4) | c2 | (d2 = ((s = s << u) + 245760 | 0) >>> 16 & 2)) + (s << d2 >>> 15) | 0) + 7 | 0) >>> 0) & 1 | c2 << 1;
            }
            if (u = (c2 << 2) + T + 304 | 0, A[a2 + 7] = c2, A[a2 + 5] = 0, A[a2 + 4] = 0, ((s = A[T + 4 >> 2]) & (d2 = 1 << c2) | 0) == 0)
              A[T + 4 >> 2] = s | d2, A[u >> 2] = o, A[a2 + 6] = u, A[a2 + 3] = t, A[a2 + 2] = t;
            else
              for (c2 = i2 << ((0 | c2) == 31 ? 0 : 25 - (c2 >>> 1) | 0), u = A[u >> 2]; ; ) {
                if ((-8 & A[u + 4 >> 2] | 0) == (0 | i2)) {
                  var s, d2 = E[(s = u + 8 | 0) >> 2], v2 = E[T + 16 >> 2];
                  if (!(u >>> 0 < v2 >>> 0) && d2 >>> 0 >= v2 >>> 0) {
                    A[d2 + 12 >> 2] = o, A[s >> 2] = o, A[a2 + 2] = d2, A[a2 + 3] = u, A[a2 + 6] = 0;
                    break r;
                  }
                  X(), b("Reached an unreachable!");
                }
                if ((0 | (d2 = E[(s = (c2 >>> 31 << 2) + u + 16 | 0) >> 2])) == 0) {
                  if (s >>> 0 >= E[T + 16 >> 2] >>> 0) {
                    A[s >> 2] = o, A[a2 + 6] = u, A[a2 + 3] = t, A[a2 + 2] = t;
                    break r;
                  }
                  X(), b("Reached an unreachable!");
                }
                c2 <<= 1, u = d2;
              }
          }
      } while (0);
  }
  function Fc(e2, i2) {
    function a2(r2) {
      var e3;
      return r2 === "double" ? (Wb[0] = A[i2 + c2 >> 2], Wb[1] = A[i2 + c2 + 4 >> 2], e3 = Vb[0]) : r2 == "i64" ? e3 = [A[i2 + c2 >> 2], A[i2 + c2 + 4 >> 2]] : (r2 = "i32", e3 = A[i2 + c2 >> 2]), c2 += Math.max(Ta(r2), Ua), e3;
    }
    for (var t, o, f2 = e2, c2 = 0, u = []; ; ) {
      var s = f2;
      if ((t = z[f2]) === 0)
        break;
      if (o = z[f2 + 1], t == 37) {
        var d2 = r, v2 = r, h2 = r, b2 = r;
        r:
          for (; ; ) {
            switch (o) {
              case 43:
                d2 = l;
                break;
              case 45:
                v2 = l;
                break;
              case 35:
                h2 = l;
                break;
              case 48:
                if (b2)
                  break r;
                b2 = l;
                break;
              default:
                break r;
            }
            o = z[++f2 + 1];
          }
        var p = 0;
        if (o == 42)
          p = a2("i32"), o = z[++f2 + 1];
        else
          for (; 48 <= o && 57 >= o; )
            p = 10 * p + (o - 48), o = z[++f2 + 1];
        var E2, T2 = r;
        if (o == 46) {
          var R2 = 0;
          T2 = l;
          if ((o = z[++f2 + 1]) == 42)
            R2 = a2("i32"), f2++;
          else
            for (; !(48 > (o = z[f2 + 1]) || 57 < o); )
              R2 = 10 * R2 + (o - 48), f2++;
          o = z[f2 + 1];
        } else
          R2 = 6;
        switch (String.fromCharCode(o)) {
          case "h":
            (o = z[f2 + 2]) == 104 ? (f2++, E2 = 1) : E2 = 2;
            break;
          case "l":
            (o = z[f2 + 2]) == 108 ? (f2++, E2 = 8) : E2 = 4;
            break;
          case "L":
          case "q":
          case "j":
            E2 = 8;
            break;
          case "z":
          case "t":
          case "I":
            E2 = 4;
            break;
          default:
            E2 = n;
        }
        if (E2 && f2++, o = z[f2 + 1], "d,i,u,o,x,X,p".split(",").indexOf(String.fromCharCode(o)) != -1) {
          s = o == 100 || o == 105;
          var k, w = t = a2("i" + 8 * (E2 = E2 || 4));
          E2 == 8 && (t = o == 117 ? (t[0] >>> 0) + 4294967296 * (t[1] >>> 0) : (t[0] >>> 0) + 4294967296 * (0 | t[1])), 4 >= E2 && (t = (s ? yc : xc)(t & Math.pow(256, E2) - 1, 8 * E2));
          var y = Math.abs(t);
          s = "";
          if (o == 100 || o == 105)
            k = E2 == 8 && ee ? ee.stringify(w[0], w[1]) : yc(t, 8 * E2).toString(10);
          else if (o == 117)
            k = E2 == 8 && ee ? ee.stringify(w[0], w[1], l) : xc(t, 8 * E2).toString(10), t = Math.abs(t);
          else if (o == 111)
            k = (h2 ? "0" : "") + y.toString(8);
          else if (o == 120 || o == 88) {
            if (s = h2 ? "0x" : "", 0 > t) {
              for (t = -t, k = (y - 1).toString(16), h2 = [], w = 0; w < k.length; w++)
                h2.push((15 - parseInt(k[w], 16)).toString(16));
              for (k = h2.join(""); k.length < 2 * E2; )
                k = "f" + k;
            } else
              k = y.toString(16);
            o == 88 && (s = s.toUpperCase(), k = k.toUpperCase());
          } else
            o == 112 && (y === 0 ? k = "(nil)" : (s = "0x", k = y.toString(16)));
          if (T2)
            for (; k.length < R2; )
              k = "0" + k;
          for (d2 && (s = 0 > t ? "-" + s : "+" + s); s.length + k.length < p; )
            v2 ? k += " " : b2 ? k = "0" + k : s = " " + s;
          (k = s + k).split("").forEach(function(r2) {
            u.push(r2.charCodeAt(0));
          });
        } else if ("f,F,e,E,g,G".split(",").indexOf(String.fromCharCode(o)) != -1) {
          if (t = a2("double"), isNaN(t))
            k = "nan", b2 = r;
          else if (isFinite(t)) {
            if (T2 = r, E2 = Math.min(R2, 20), o != 103 && o != 71 || (T2 = l, (R2 = R2 || 1) > (E2 = parseInt(t.toExponential(E2).split("e")[1], 10)) && -4 <= E2 ? (o = (o == 103 ? "f" : "F").charCodeAt(0), R2 -= E2 + 1) : (o = (o == 103 ? "e" : "E").charCodeAt(0), R2--), E2 = Math.min(R2, 20)), o == 101 || o == 69 ? (k = t.toExponential(E2), /[eE][-+]\d$/.test(k) && (k = k.slice(0, -1) + "0" + k.slice(-1))) : o != 102 && o != 70 || (k = t.toFixed(E2)), s = k.split("e"), T2 && !h2)
              for (; 1 < s[0].length && s[0].indexOf(".") != -1 && (s[0].slice(-1) == "0" || s[0].slice(-1) == "."); )
                s[0] = s[0].slice(0, -1);
            else
              for (h2 && k.indexOf(".") == -1 && (s[0] += "."); R2 > E2++; )
                s[0] += "0";
            k = s[0] + (1 < s.length ? "e" + s[1] : ""), o == 69 && (k = k.toUpperCase()), d2 && 0 <= t && (k = "+" + k);
          } else
            k = (0 > t ? "-" : "") + "inf", b2 = r;
          for (; k.length < p; )
            k = v2 ? k + " " : !b2 || k[0] != "-" && k[0] != "+" ? (b2 ? "0" : " ") + k : k[0] + "0" + k.slice(1);
          97 > o && (k = k.toUpperCase()), k.split("").forEach(function(r2) {
            u.push(r2.charCodeAt(0));
          });
        } else if (o == 115) {
          if ((d2 = a2("i8*")) ? (d2 = wc(d2), T2 && d2.length > R2 && (d2 = d2.slice(0, R2))) : d2 = gc("(null)", l), !v2)
            for (; d2.length < p--; )
              u.push(32);
          if (u = u.concat(d2), v2)
            for (; d2.length < p--; )
              u.push(32);
        } else if (o == 99) {
          for (v2 && u.push(a2("i8")); 0 < --p; )
            u.push(32);
          v2 || u.push(a2("i8"));
        } else if (o == 110)
          v2 = a2("i32*"), A[v2 >> 2] = u.length;
        else if (o == 37)
          u.push(t);
        else
          for (w = s; w < f2 + 2; w++)
            u.push(z[w]);
        f2 += 2;
      } else
        u.push(t), f2 += 1;
    }
    return u;
  }
  function ne(r2) {
    Vd || (Vd = N([0], "i32", I)), A[Vd >> 2] = r2;
  }
  function se(r2, e2) {
    if (typeof r2 != "string")
      return n;
    e2 === aa && (e2 = "/"), r2 && r2[0] == "/" && (e2 = "");
    for (var i2 = (e2 + "/" + r2).split("/").reverse(), a2 = [""]; i2.length; ) {
      var t = i2.pop();
      t == "" || t == "." || (t == ".." ? 1 < a2.length && a2.pop() : a2.push(t));
    }
    return a2.length == 1 ? "/" : a2.join("/");
  }
  function te(e2, i2, a2) {
    var t = { ib: r, Q: r, error: 0, name: n, path: n, object: n, sa: r, ua: n, ta: n };
    if ((e2 = se(e2)) == "/")
      t.ib = l, t.Q = t.sa = l, t.name = "/", t.path = t.ua = "/", t.object = t.ta = ue;
    else if (e2 !== n) {
      a2 = a2 || 0, e2 = e2.slice(1).split("/");
      for (var A2 = ue, o = [""]; e2.length; ) {
        e2.length == 1 && A2.z && (t.sa = l, t.ua = o.length == 1 ? "/" : o.join("/"), t.ta = A2, t.name = e2[0]);
        var f2 = e2.shift();
        if (!A2.z) {
          t.error = 20;
          break;
        }
        if (!A2.va) {
          t.error = fe;
          break;
        }
        if (!A2.l.hasOwnProperty(f2)) {
          t.error = 2;
          break;
        }
        if ((A2 = A2.l[f2]).link && (!i2 || e2.length != 0)) {
          if (40 < a2) {
            t.error = 40;
            break;
          }
          t = te([t = se(A2.link, o.join("/"))].concat(e2).join("/"), i2, a2 + 1);
          break;
        }
        o.push(f2), e2.length == 0 && (t.Q = l, t.path = o.join("/"), t.object = A2);
      }
    }
    return t;
  }
  function ve(r2) {
    return we(), (r2 = te(r2, aa)).Q ? r2.object : (ne(r2.error), n);
  }
  function xe(e2, i2, a2, t, n2) {
    for (var A2 in e2 || (e2 = "/"), typeof e2 == "string" && (e2 = ve(e2)), e2 || (ne(fe), b(Error("Parent path must exist."))), e2.z || (ne(20), b(Error("Parent must be a folder."))), !e2.write && !re && (ne(fe), b(Error("Parent folder must be writeable."))), i2 && i2 != "." && i2 != ".." || (ne(2), b(Error("Name must not be empty."))), e2.l.hasOwnProperty(i2) && (ne(17), b(Error("Can't overwrite object."))), e2.l[i2] = { va: t === aa ? l : t, write: n2 === aa ? r : n2, timestamp: Date.now(), hb: qe++ }, a2)
      a2.hasOwnProperty(A2) && (e2.l[i2][A2] = a2[A2]);
    return e2.l[i2];
  }
  function ye(e2, i2) {
    return xe(e2, i2, { z: l, G: r, l: {} }, l, l);
  }
  function ze() {
    var r2 = "dev/shm/tmp", e2 = ve("/");
    for (e2 === n && b(Error("Invalid parent.")), r2 = r2.split("/").reverse(); r2.length; ) {
      var i2 = r2.pop();
      i2 && (e2.l.hasOwnProperty(i2) || ye(e2, i2), e2 = e2.l[i2]);
    }
  }
  function Ae(e2, i2, a2, t) {
    !a2 && !t && b(Error("A device must have at least one callback defined."));
    var n2 = { G: l, input: a2, A: t };
    return n2.z = r, xe(e2, i2, n2, Boolean(a2), Boolean(t));
  }
  function we() {
    ue || (ue = { va: l, write: l, z: l, G: r, timestamp: Date.now(), hb: 1, l: {} });
  }
  function Be() {
    var e2, i2, a2;
    function t(r2) {
      r2 === n || r2 === 10 ? (i2.J(i2.buffer.join("")), i2.buffer = []) : i2.buffer.push(String.fromCharCode(r2));
    }
    Xa(!Ce, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"), Ce = l, we(), e2 = e2 || Module.stdin, i2 = i2 || Module.stdout, a2 = a2 || Module.stderr;
    var A2 = l, o = l, f2 = l;
    e2 || (A2 = r, e2 = function() {
      var r2;
      e2.N && e2.N.length || (typeof window != "undefined" && typeof window.prompt == "function" ? r2 = window.prompt("Input: ") : typeof readline == "function" && (r2 = readline()), r2 || (r2 = ""), e2.N = gc(r2 + "\n", l));
      return e2.N.shift();
    }), i2 || (o = r, i2 = t), i2.J || (i2.J = Module.print), i2.buffer || (i2.buffer = []), a2 || (f2 = r, a2 = t), a2.J || (a2.J = Module.print), a2.buffer || (a2.buffer = []), ye("/", "tmp");
    var c2 = ye("/", "dev"), u = Ae(c2, "stdin", e2), s = Ae(c2, "stdout", n, i2);
    a2 = Ae(c2, "stderr", n, a2), Ae(c2, "tty", e2, i2), Ic[1] = { path: "/dev/stdin", object: u, position: 0, ma: l, H: r, ka: r, na: !A2, error: r, ia: r, wa: [] }, Ic[2] = { path: "/dev/stdout", object: s, position: 0, ma: r, H: l, ka: r, na: !o, error: r, ia: r, wa: [] }, Ic[3] = { path: "/dev/stderr", object: a2, position: 0, ma: r, H: l, ka: r, na: !f2, error: r, ia: r, wa: [] }, oe = N([1], "void*", I), Gc = N([2], "void*", I), pe = N([3], "void*", I), ze(), Ic[oe] = Ic[1], Ic[Gc] = Ic[2], Ic[pe] = Ic[3], N([N([0, 0, 0, 0, oe, 0, 0, 0, Gc, 0, 0, 0, pe, 0, 0, 0], "void*", I)], "void*", I);
  }
  function Hc(r2, e2, i2) {
    var a2 = Ic[r2];
    if (a2) {
      if (a2.H) {
        if (0 > i2)
          return ne(he), -1;
        if (a2.object.G) {
          if (a2.object.A) {
            for (var t = 0; t < i2; t++)
              try {
                a2.object.A(z[e2 + t]);
              } catch (r3) {
                return ne(ke), -1;
              }
            return a2.object.timestamp = Date.now(), t;
          }
          return ne(me), -1;
        }
        if (t = a2.position, !(r2 = Ic[r2]) || r2.object.G)
          ne(ge), e2 = -1;
        else if (r2.H)
          if (r2.object.z)
            ne(le), e2 = -1;
          else if (0 > i2 || 0 > t)
            ne(he), e2 = -1;
          else {
            for (var n2 = r2.object.l; n2.length < t; )
              n2.push(0);
            for (var A2 = 0; A2 < i2; A2++)
              n2[t + A2] = B[e2 + A2];
            r2.object.timestamp = Date.now(), e2 = A2;
          }
        else
          ne(fe), e2 = -1;
        return e2 != -1 && (a2.position += e2), e2;
      }
      return ne(fe), -1;
    }
    return ne(ge), -1;
  }
  function Zb(r2, e2, i2) {
    if (20 <= i2) {
      for (i2 = r2 + i2; r2 % 4; )
        z[r2++] = e2;
      0 > e2 && (e2 += 256);
      r2 = r2 >> 2;
      for (var a2 = i2 >> 2, t = e2 | e2 << 8 | e2 << 16 | e2 << 24; r2 < a2; )
        A[r2++] = t;
      for (r2 <<= 2; r2 < i2; )
        z[r2++] = e2;
    } else
      for (; i2--; )
        z[r2++] = e2;
  }
  function hd(r2, e2, i2) {
    if (20 <= i2 && e2 % 2 == r2 % 2)
      if (e2 % 4 == r2 % 4) {
        for (i2 = e2 + i2; e2 % 4; )
          z[r2++] = z[e2++];
        e2 = e2 >> 2, r2 = r2 >> 2;
        for (var a2 = i2 >> 2; e2 < a2; )
          A[r2++] = A[e2++];
        for (e2 <<= 2, r2 <<= 2; e2 < i2; )
          z[r2++] = z[e2++];
      } else {
        for (i2 = e2 + i2, e2 % 2 && (z[r2++] = z[e2++]), e2 >>= 1, r2 >>= 1, a2 = i2 >> 1; e2 < a2; )
          hb[r2++] = hb[e2++];
        r2 <<= 1, (e2 <<= 1) < i2 && (z[r2++] = z[e2++]);
      }
    else
      for (; i2--; )
        z[r2++] = z[e2++];
  }
  function X() {
    b("abort() at " + Error().stack);
  }
  function Zd() {
    return ac;
  }
  function Rd(r2) {
    De || (bb = bb + 4095 >> 12 << 12, De = l);
    var e2 = bb;
    return r2 != 0 && ab(r2), e2;
  }
  function Ie(r2) {
    r2 = r2 || Module.arguments, Module.setStatus && Module.setStatus(""), Module.preRun && Module.preRun();
    var e2 = n;
    return Module._main && (qc(sc), e2 = Module.$a(r2), Module.noExitRuntime || qc(tc)), Module.postRun && Module.postRun(), e2;
  }
  var Module, aa, l, n, r, Ca, Ea, Fa, Ja, Ua, tb, ub, Hb, Xb, I, $b, ac, z, B, hb, C, A, E, ib, lb, v, bc, bb, ec, cb, fc, hc, ic, pc, Wb, Vb, rc, sc, tc, R, zc, ee, fe, ge, he, ke, le, me, Vd, oe, Gc, pe, qe, Ic, re, Ce, ue, De, de, Kc, Lc, Hd, T, Od, be, Ee, Fe, Ge, He;
  var init_crn = __esm({
    "src/node/decoder/crn.js"() {
      Module = {};
      aa = void 0;
      l = true;
      n = null;
      r = false;
      Ca = typeof process == "object";
      Ea = typeof window == "object";
      Fa = typeof importScripts == "function";
      Ja = !Ea && !Ca && !Fa;
      Ca || (Ja ? (Module.print = print, Module.printErr = printErr, Module.read = typeof read != "undefined" ? read : function(r2) {
        snarf(r2);
      }, Module.arguments || (typeof scriptArgs != "undefined" ? Module.arguments = scriptArgs : typeof arguments != "undefined" && (Module.arguments = arguments))) : Ea ? (Module.print || (Module.print = function(r2) {
        console.log(r2);
      }), Module.printErr || (Module.printErr = function(r2) {
        console.log(r2);
      }), Module.read = function(e2) {
        var i2 = new XMLHttpRequest();
        return i2.open("GET", e2, r), i2.send(n), i2.responseText;
      }, Module.arguments || typeof arguments != "undefined" && (Module.arguments = arguments)) : Fa ? Module.load = importScripts : b("Unknown runtime environment. Where are we?")), !Module.load == "undefined" && Module.read && (Module.load = function(r2) {
        Qa(Module.read(r2));
      }), Module.printErr || (Module.printErr = function() {
      }), Module.print || (Module.print = Module.printErr), Module.arguments || (Module.arguments = []), Module.print = Module.print, Module.Jb = Module.printErr;
      Ua = 4;
      tb = {};
      Hb = void 0;
      Module.ccall = Ib, Module.cwrap = function(r2, e2, i2) {
        return function() {
          return Ib(r2, e2, i2, Array.prototype.slice.call(arguments));
        };
      }, Module.setValue = Ub, Module.getValue = function(r2, e2) {
        switch ((e2 = e2 || "i8")[e2.length - 1] === "*" && (e2 = "i32"), e2) {
          case "i1":
          case "i8":
            return z[r2];
          case "i16":
            return hb[r2 >> 1];
          case "i32":
          case "i64":
            return A[r2 >> 2];
          case "float":
            return ib[r2 >> 2];
          case "double":
            return Wb[0] = A[r2 >> 2], Wb[1] = A[r2 + 4 >> 2], Vb[0];
          default:
            vb("invalid type for setValue: " + e2);
        }
        return n;
      };
      Xb = 1;
      I = 2;
      Module.ALLOC_NORMAL = 0, Module.ALLOC_STACK = Xb, Module.ALLOC_STATIC = I, Module.allocate = N, Module.Pointer_stringify = Tb, Module.Array_stringify = function(r2) {
        for (var e2 = "", i2 = 0; i2 < r2.length; i2++)
          e2 += String.fromCharCode(r2[i2]);
        return e2;
      };
      ac = 4096;
      ec = Module.TOTAL_STACK || 5242880;
      cb = Module.TOTAL_MEMORY || 10485760;
      Xa(!!(Int32Array && Float64Array && new Int32Array(1).subarray && new Int32Array(1).set), "Cannot fallback to non-typed array case: Code is too specialized");
      fc = new ArrayBuffer(cb);
      z = new Int8Array(fc), hb = new Int16Array(fc), A = new Int32Array(fc), B = new Uint8Array(fc), C = new Uint16Array(fc), E = new Uint32Array(fc), ib = new Float32Array(fc), lb = new Float64Array(fc), A[0] = 255, Xa(B[0] === 255 && B[3] === 0, "Typed arrays 2 must be run on a little-endian system");
      hc = gc("(null)");
      bb = hc.length;
      for (ic = 0; ic < hc.length; ic++)
        z[ic] = hc[ic];
      Module.HEAP = aa, Module.HEAP8 = z, Module.HEAP16 = hb, Module.HEAP32 = A, Module.HEAPU8 = B, Module.HEAPU16 = C, Module.HEAPU32 = E, Module.HEAPF32 = ib, Module.HEAPF64 = lb, bc = (v = 4 * Math.ceil(bb / 4)) + ec;
      pc = 8 * Math.ceil(bc / 8);
      z.subarray(pc);
      Wb = A.subarray(pc >> 2);
      ib.subarray(pc >> 2);
      Vb = lb.subarray(pc >> 3);
      bc = pc + 8, bb = bc + 4095 >> 12 << 12;
      rc = [];
      sc = [];
      tc = [];
      Module.Array_copy = uc, Module.TypedArray_copy = function(r2, e2, i2) {
        i2 === aa && (i2 = 0);
        for (var a2 = new Uint8Array(e2 - i2), t = i2; t < e2; ++t)
          a2[t - i2] = z[r2 + t];
        return a2.buffer;
      }, Module.String_len = vc, Module.String_copy = wc, Module.intArrayFromString = gc, Module.intArrayToString = function(r2) {
        for (var e2 = [], i2 = 0; i2 < r2.length; i2++) {
          var a2 = r2[i2];
          255 < a2 && (a2 &= 255), e2.push(String.fromCharCode(a2));
        }
        return e2.join("");
      }, Module.writeStringToMemory = Pb, Module.writeArrayToMemory = Qb;
      R = [];
      zc = 0;
      Jc.X = 1, Oc.X = 1, Zc.X = 1, S.X = 1, nd.X = 1, pd.X = 1, qd.X = 1, Module._crn_get_width = function(r2, e2) {
        var i2 = v;
        v += 40, vd(i2), Zc(r2, e2, i2);
        var a2 = A[i2 + 4 >> 2];
        return v = i2, a2;
      }, Module._crn_get_height = function(r2, e2) {
        var i2 = v;
        v += 40, vd(i2), Zc(r2, e2, i2);
        var a2 = A[i2 + 8 >> 2];
        return v = i2, a2;
      }, Module._crn_get_levels = function(r2, e2) {
        var i2 = v;
        v += 40, vd(i2), Zc(r2, e2, i2);
        var a2 = A[i2 + 12 >> 2];
        return v = i2, a2;
      }, Module._crn_get_dxt_format = function(r2, e2) {
        var i2 = v;
        v += 40, vd(i2), Zc(r2, e2, i2);
        var a2 = A[(i2 + 32 | 0) >> 2];
        return v = i2, a2;
      }, Module._crn_get_uncompressed_size = function(r2, e2) {
        var i2 = v;
        v += 40, vd(i2), Zc(r2, e2, i2);
        var a2 = (A[i2 + 4 >> 2] + 3 | 0) >>> 2, t = (A[i2 + 8 >> 2] + 3 | 0) >>> 2, n2 = Xc(A[(n2 = i2 + 32 | 0) >> 2], A[n2 + 4 >> 2]) << 1 & 536870910;
        return v = i2, t * a2 * n2 | 0;
      }, Module._crn_decompress = function(r2, e2, i2, a2) {
        var t = v;
        v += 44;
        var n2 = t + 40;
        vd(t), Zc(r2, e2, t);
        var o, f2, c2 = (c2 = (A[t + 4 >> 2] + 3 | 0) >>> 2) * (o = Xc(A[(o = t + 32 | 0) >> 2], A[o + 4 >> 2]) << 1 & 536870910) | 0;
        if ((0 | r2) == 0 | 62 > e2 >>> 0)
          f2 = 0;
        else if ((0 | (o = Mc(300, 0))) == 0 ? o = 0 : (0 | o) == 0 ? o = 0 : (A[o >> 2] = 519686845, A[o + 4 >> 2] = 0, A[o + 8 >> 2] = 0, A[o + 88 >> 2] = 0, fd(o + 92 | 0), $c(o + 116 | 0), $c(o + 140 | 0), $c(o + 164 | 0), $c(o + 188 | 0), $c(o + 212 | 0), wd(o + 236 | 0), wd(o + 252 | 0), xd(o + 268 | 0), xd(o + 284 | 0)), (0 | o) == 0)
          f2 = 0;
        else {
          var u = Yc(r2, e2);
          if (A[o + 88 >> 2] = u, (0 | u) == 0)
            f2 = 0;
          else {
            A[o + 4 >> 2] = r2, A[o + 8 >> 2] = e2;
            e2 = o + 92 | 0, u = A[o + 4 >> 2];
            var s = A[r2 = (o + 88 | 0) >> 2];
            u = od(e2, u + Wc(s + 67 | 0) | 0, Tc(s + 65 | 0));
            do {
              if (u)
                if (pd(e2, o + 116 | 0)) {
                  if ((0 | Tc((s = A[r2]) + 39 | 0)) == 0) {
                    if ((0 | Tc(s + 55 | 0)) == 0) {
                      s = 0;
                      break;
                    }
                  } else {
                    if (!pd(e2, o + 140 | 0)) {
                      s = 0;
                      break;
                    }
                    if (!pd(e2, o + 188 | 0)) {
                      s = 0;
                      break;
                    }
                    s = A[r2];
                  }
                  if ((0 | Tc(s + 55 | 0)) != 0) {
                    if (!pd(e2, o + 164 | 0)) {
                      s = 0;
                      break;
                    }
                    if (!pd(e2, o + 212 | 0)) {
                      s = 0;
                      break;
                    }
                  }
                  s = 1;
                } else
                  s = 0;
              else
                s = 0;
            } while (0);
            if (s) {
              if ((0 | Tc((e2 = A[(r2 = o + 88 | 0) >> 2]) + 39 | 0)) == 0)
                f2 = e2, r2 = 5;
              else if (yd(o))
                zd(o) ? (f2 = A[r2 >> 2], r2 = 5) : (d2 = 0, r2 = 9);
              else {
                var d2 = 0;
                r2 = 9;
              }
              do {
                if (r2 == 5) {
                  if ((0 | Tc(f2 + 55 | 0)) != 0) {
                    if (!Ad(o)) {
                      d2 = 0;
                      break;
                    }
                    if (!Bd(o)) {
                      d2 = 0;
                      break;
                    }
                  }
                  d2 = 1;
                }
              } while (0);
              f2 = d2;
            } else
              f2 = 0;
          }
          f2 ? f2 = o : ((0 | o) != 0 && (Cd(o), Nc(o)), f2 = 0);
        }
        A[(n2 |= 0) >> 2] = i2, !((0 | f2) == 0 | (0 | n2) == 0 | 8 > a2 >>> 0 | 0) && (0 | A[f2 >> 2]) == 519686845 && (i2 = Uc(0 + (d2 = E[f2 + 88 >> 2]) + 70 | 0), o = A[f2 + 8 >> 2], (d2 = 1 < Vc(d2 + 16 | 0) >>> 0 ? Uc(4 + d2 + 70 | 0) : o) >>> 0 > i2 >>> 0 || Ec(0 | R.Qa, 3705), qd(f2, A[f2 + 4 >> 2] + i2 | 0, d2 - i2 | 0, n2, a2, c2, 0)), (0 | f2) != 0 && (0 | A[f2 >> 2]) == 519686845 && (0 | f2) != 0 && (Cd(f2), Nc(f2)), v = t;
      }, rd.X = 1, Cd.X = 1, sd.X = 1, td.X = 1, ud.X = 1, yd.X = 1, zd.X = 1, Ad.X = 1, Bd.X = 1, Module._malloc = Yb, Yb.X = 1, Ld.X = 1, Nd.X = 1, Md.X = 1, Wd.X = 1, Module._free = Xd, Xd.X = 1, Yd.X = 1, Td.X = 1, Ud.X = 1;
      ee = function() {
        function e2(r2, e3) {
          r2 != n && (typeof r2 == "number" ? this.k(r2) : e3 == n && typeof r2 != "string" ? this.q(r2, 256) : this.q(r2, e3));
        }
        function i2() {
          return new e2(n);
        }
        function a2(r2, e3) {
          var i3 = c2[r2.charCodeAt(e3)];
          return i3 == n ? -1 : i3;
        }
        function t(r2) {
          var e3 = i2();
          return e3.t(r2), e3;
        }
        var A2;
        (A2 = function(r2, e3) {
          this.d = 0 | r2, this.e = 0 | e3;
        }).W = {}, A2.t = function(r2) {
          if (-128 <= r2 && 128 > r2) {
            var e3 = A2.W[r2];
            if (e3)
              return e3;
          }
          return e3 = new A2(0 | r2, 0 > r2 ? -1 : 0), -128 <= r2 && 128 > r2 && (A2.W[r2] = e3), e3;
        }, A2.k = function(r2) {
          return isNaN(r2) || !isFinite(r2) ? A2.ZERO : r2 <= -A2.$ ? A2.MIN_VALUE : r2 + 1 >= A2.$ ? A2.MAX_VALUE : 0 > r2 ? A2.k(-r2).f() : new A2(r2 % A2.r | 0, r2 / A2.r | 0);
        }, A2.p = function(r2, e3) {
          return new A2(r2, e3);
        }, A2.q = function(r2, e3) {
          r2.length == 0 && b(Error("number format error: empty string"));
          var i3 = e3 || 10;
          if ((2 > i3 || 36 < i3) && b(Error("radix out of range: " + i3)), r2.charAt(0) == "-")
            return A2.q(r2.substring(1), i3).f();
          0 <= r2.indexOf("-") && b(Error('number format error: interior "-" character: ' + r2));
          for (var a3 = A2.k(Math.pow(i3, 8)), t2 = A2.ZERO, n2 = 0; n2 < r2.length; n2 += 8) {
            var o2 = Math.min(8, r2.length - n2), f3 = parseInt(r2.substring(n2, n2 + o2), i3);
            8 > o2 ? (o2 = A2.k(Math.pow(i3, o2)), t2 = t2.multiply(o2).add(A2.k(f3))) : t2 = (t2 = t2.multiply(a3)).add(A2.k(f3));
          }
          return t2;
        }, A2.L = 65536, A2.ob = 16777216, A2.pb = (A2.r = A2.L * A2.L) / 2, A2.qb = A2.r * A2.L, A2.$ = (A2.ya = A2.r * A2.r) / 2, A2.ZERO = A2.t(0), A2.ONE = A2.t(1), A2.Y = A2.t(-1), A2.MAX_VALUE = A2.p(-1, 2147483647), A2.MIN_VALUE = A2.p(0, -2147483648), A2.Z = A2.t(16777216), A2.prototype.K = function() {
          return this.e * A2.r + this.eb();
        }, A2.prototype.toString = function(r2) {
          if ((2 > (r2 = r2 || 10) || 36 < r2) && b(Error("radix out of range: " + r2)), this.v())
            return "0";
          if (this.i()) {
            if (this.j(A2.MIN_VALUE)) {
              var e3 = A2.k(r2);
              e3 = (i3 = this.o(e3)).multiply(e3).u(this);
              return i3.toString(r2) + e3.d.toString(r2);
            }
            return "-" + this.f().toString(r2);
          }
          for (var i3 = A2.k(Math.pow(r2, 6)), a3 = (e3 = this, ""); ; ) {
            var t2 = e3.o(i3), n2 = e3.u(t2.multiply(i3)).d.toString(r2);
            if ((e3 = t2).v())
              return n2 + a3;
            for (; 6 > n2.length; )
              n2 = "0" + n2;
            a3 = "" + n2 + a3;
          }
        }, A2.prototype.eb = function() {
          return 0 <= this.d ? this.d : A2.r + this.d;
        }, A2.prototype.v = function() {
          return this.e == 0 && this.d == 0;
        }, A2.prototype.i = function() {
          return 0 > this.e;
        }, A2.prototype.la = function() {
          return (1 & this.d) == 1;
        }, A2.prototype.j = function(r2) {
          return this.e == r2.e && this.d == r2.d;
        }, A2.prototype.pa = function(r2) {
          return 0 > this.O(r2);
        }, A2.prototype.fb = function(r2) {
          return 0 < this.O(r2);
        }, A2.prototype.gb = function(r2) {
          return 0 <= this.O(r2);
        }, A2.prototype.O = function(r2) {
          if (this.j(r2))
            return 0;
          var e3 = this.i(), i3 = r2.i();
          return e3 && !i3 ? -1 : !e3 && i3 ? 1 : this.u(r2).i() ? -1 : 1;
        }, A2.prototype.f = function() {
          return this.j(A2.MIN_VALUE) ? A2.MIN_VALUE : this.kb().add(A2.ONE);
        }, A2.prototype.add = function(r2) {
          var e3, i3 = this.e >>> 16, a3 = 65535 & this.e, t2 = this.d >>> 16, n2 = r2.e >>> 16, o2 = 65535 & r2.e, f3 = r2.d >>> 16;
          return r2 = 0 + ((e3 = (65535 & this.d) + (65535 & r2.d) + 0) >>> 16), t2 = 0 + ((r2 += t2 + f3) >>> 16), A2.p((65535 & r2) << 16 | 65535 & e3, ((a3 = 0 + ((t2 += a3 + o2) >>> 16)) + (i3 + n2) & 65535) << 16 | 65535 & t2);
        }, A2.prototype.u = function(r2) {
          return this.add(r2.f());
        }, A2.prototype.multiply = function(r2) {
          if (this.v() || r2.v())
            return A2.ZERO;
          if (this.j(A2.MIN_VALUE))
            return r2.la() ? A2.MIN_VALUE : A2.ZERO;
          if (r2.j(A2.MIN_VALUE))
            return this.la() ? A2.MIN_VALUE : A2.ZERO;
          if (this.i())
            return r2.i() ? this.f().multiply(r2.f()) : this.f().multiply(r2).f();
          if (r2.i())
            return this.multiply(r2.f()).f();
          if (this.pa(A2.Z) && r2.pa(A2.Z))
            return A2.k(this.K() * r2.K());
          var e3, i3, a3, t2, n2 = this.e >>> 16, o2 = 65535 & this.e, f3 = this.d >>> 16, c3 = 65535 & this.d, u2 = r2.e >>> 16, s = 65535 & r2.e, d2 = r2.d >>> 16;
          return a3 = 0 + ((t2 = 0 + c3 * (r2 = 65535 & r2.d)) >>> 16), i3 = 0 + ((a3 += f3 * r2) >>> 16), i3 += (a3 = (65535 & a3) + c3 * d2) >>> 16, e3 = 0 + ((i3 += o2 * r2) >>> 16), e3 += (i3 = (65535 & i3) + f3 * d2) >>> 16, A2.p((65535 & a3) << 16 | 65535 & t2, ((e3 += (i3 = (65535 & i3) + c3 * s) >>> 16) + (n2 * r2 + o2 * d2 + f3 * s + c3 * u2) & 65535) << 16 | 65535 & i3);
        }, A2.prototype.o = function(r2) {
          if (r2.v() && b(Error("division by zero")), this.v())
            return A2.ZERO;
          if (this.j(A2.MIN_VALUE)) {
            if (r2.j(A2.ONE) || r2.j(A2.Y))
              return A2.MIN_VALUE;
            if (r2.j(A2.MIN_VALUE))
              return A2.ONE;
            if ((a3 = this.mb().o(r2).shiftLeft(1)).j(A2.ZERO))
              return r2.i() ? A2.ONE : A2.Y;
            var e3 = this.u(r2.multiply(a3));
            return a3.add(e3.o(r2));
          }
          if (r2.j(A2.MIN_VALUE))
            return A2.ZERO;
          if (this.i())
            return r2.i() ? this.f().o(r2.f()) : this.f().o(r2).f();
          if (r2.i())
            return this.o(r2.f()).f();
          var i3 = A2.ZERO;
          for (e3 = this; e3.gb(r2); ) {
            for (var a3 = Math.max(1, Math.floor(e3.K() / r2.K())), t2 = 48 >= (t2 = Math.ceil(Math.log(a3) / Math.LN2)) ? 1 : Math.pow(2, t2 - 48), n2 = A2.k(a3), o2 = n2.multiply(r2); o2.i() || o2.fb(e3); )
              o2 = (n2 = A2.k(a3 -= t2)).multiply(r2);
            n2.v() && (n2 = A2.ONE), i3 = i3.add(n2), e3 = e3.u(o2);
          }
          return i3;
        }, A2.prototype.ra = function(r2) {
          return this.u(this.o(r2).multiply(r2));
        }, A2.prototype.kb = function() {
          return A2.p(~this.d, ~this.e);
        }, A2.prototype.shiftLeft = function(r2) {
          if ((r2 &= 63) == 0)
            return this;
          var e3 = this.d;
          return 32 > r2 ? A2.p(e3 << r2, this.e << r2 | e3 >>> 32 - r2) : A2.p(0, e3 << r2 - 32);
        }, A2.prototype.mb = function() {
          var r2 = this.e;
          return A2.p(this.d >>> 1 | r2 << 31, r2 >> 1);
        }, e2.prototype.M = function(r2, e3, i3, a3) {
          for (var t2 = 0, n2 = 0; 0 <= --a3; ) {
            var A3 = r2 * this[t2++] + e3[i3] + n2;
            n2 = Math.floor(A3 / 67108864);
            e3[i3++] = 67108863 & A3;
          }
          return n2;
        }, e2.prototype.c = 26, e2.prototype.n = 67108863, e2.prototype.C = 67108864, e2.prototype.xa = Math.pow(2, 52), e2.prototype.U = 26, e2.prototype.V = 0;
        var o, f2, c2 = [];
        for (o = 48, f2 = 0; 9 >= f2; ++f2)
          c2[o++] = f2;
        for (o = 97, f2 = 10; 36 > f2; ++f2)
          c2[o++] = f2;
        for (o = 65, f2 = 10; 36 > f2; ++f2)
          c2[o++] = f2;
        e2.prototype.copyTo = function(r2) {
          for (var e3 = this.a - 1; 0 <= e3; --e3)
            r2[e3] = this[e3];
          r2.a = this.a, r2.b = this.b;
        }, e2.prototype.t = function(r2) {
          this.a = 1, this.b = 0 > r2 ? -1 : 0, 0 < r2 ? this[0] = r2 : -1 > r2 ? this[0] = r2 + DV : this.a = 0;
        }, e2.prototype.q = function(i3, t2) {
          var n2;
          if (t2 == 16)
            n2 = 4;
          else if (t2 == 8)
            n2 = 3;
          else if (t2 == 256)
            n2 = 8;
          else if (t2 == 2)
            n2 = 1;
          else if (t2 == 32)
            n2 = 5;
          else {
            if (t2 != 4)
              return void this.cb(i3, t2);
            n2 = 2;
          }
          this.b = this.a = 0;
          for (var A3 = i3.length, o2 = r, f3 = 0; 0 <= --A3; ) {
            var c3 = n2 == 8 ? 255 & i3[A3] : a2(i3, A3);
            0 > c3 ? i3.charAt(A3) == "-" && (o2 = l) : (o2 = r, f3 == 0 ? this[this.a++] = c3 : f3 + n2 > this.c ? (this[this.a - 1] |= (c3 & (1 << this.c - f3) - 1) << f3, this[this.a++] = c3 >> this.c - f3) : this[this.a - 1] |= c3 << f3, (f3 += n2) >= this.c && (f3 -= this.c));
          }
          n2 == 8 && (128 & i3[0]) != 0 && (this.b = -1, 0 < f3 && (this[this.a - 1] |= (1 << this.c - f3) - 1 << f3)), this.s(), o2 && e2.ZERO.m(this, this);
        }, e2.prototype.s = function() {
          for (var r2 = this.b & this.n; 0 < this.a && this[this.a - 1] == r2; )
            --this.a;
        }, e2.prototype.P = function(r2, e3) {
          var i3;
          for (i3 = this.a - 1; 0 <= i3; --i3)
            e3[i3 + r2] = this[i3];
          for (i3 = r2 - 1; 0 <= i3; --i3)
            e3[i3] = 0;
          e3.a = this.a + r2, e3.b = this.b;
        }, e2.prototype.bb = function(r2, e3) {
          for (var i3 = r2; i3 < this.a; ++i3)
            e3[i3 - r2] = this[i3];
          e3.a = Math.max(this.a - r2, 0), e3.b = this.b;
        }, e2.prototype.oa = function(r2, e3) {
          var i3, a3 = r2 % this.c, t2 = this.c - a3, n2 = (1 << t2) - 1, A3 = Math.floor(r2 / this.c), o2 = this.b << a3 & this.n;
          for (i3 = this.a - 1; 0 <= i3; --i3)
            e3[i3 + A3 + 1] = this[i3] >> t2 | o2, o2 = (this[i3] & n2) << a3;
          for (i3 = A3 - 1; 0 <= i3; --i3)
            e3[i3] = 0;
          e3[A3] = o2, e3.a = this.a + A3 + 1, e3.b = this.b, e3.s();
        }, e2.prototype.lb = function(r2, e3) {
          e3.b = this.b;
          var i3 = Math.floor(r2 / this.c);
          if (i3 >= this.a)
            e3.a = 0;
          else {
            var a3 = r2 % this.c, t2 = this.c - a3, n2 = (1 << a3) - 1;
            e3[0] = this[i3] >> a3;
            for (var A3 = i3 + 1; A3 < this.a; ++A3)
              e3[A3 - i3 - 1] |= (this[A3] & n2) << t2, e3[A3 - i3] = this[A3] >> a3;
            0 < a3 && (e3[this.a - i3 - 1] |= (this.b & n2) << t2), e3.a = this.a - i3, e3.s();
          }
        }, e2.prototype.m = function(r2, e3) {
          for (var i3 = 0, a3 = 0, t2 = Math.min(r2.a, this.a); i3 < t2; )
            a3 += this[i3] - r2[i3], e3[i3++] = a3 & this.n, a3 >>= this.c;
          if (r2.a < this.a) {
            for (a3 -= r2.b; i3 < this.a; )
              a3 += this[i3], e3[i3++] = a3 & this.n, a3 >>= this.c;
            a3 += this.b;
          } else {
            for (a3 += this.b; i3 < r2.a; )
              a3 -= r2[i3], e3[i3++] = a3 & this.n, a3 >>= this.c;
            a3 -= r2.b;
          }
          e3.b = 0 > a3 ? -1 : 0, -1 > a3 ? e3[i3++] = this.C + a3 : 0 < a3 && (e3[i3++] = a3), e3.a = i3, e3.s();
        }, e2.prototype.jb = function(r2, i3) {
          var a3 = this.abs(), t2 = r2.abs(), n2 = a3.a;
          for (i3.a = n2 + t2.a; 0 <= --n2; )
            i3[n2] = 0;
          for (n2 = 0; n2 < t2.a; ++n2)
            i3[n2 + a3.a] = a3.M(t2[n2], i3, n2, a3.a);
          i3.b = 0, i3.s(), this.b != r2.b && e2.ZERO.m(i3, i3);
        }, e2.prototype.w = function(r2, a3, t2) {
          var A3 = r2.abs();
          if (!(0 >= A3.a)) {
            var o2 = this.abs();
            if (o2.a < A3.a)
              a3 != n && a3.t(0), t2 != n && this.copyTo(t2);
            else {
              t2 == n && (t2 = i2());
              var f3, c3 = i2(), u2 = this.b, s = (r2 = r2.b, A3[A3.a - 1]), d2 = 1;
              if ((f3 = s >>> 16) != 0 && (s = f3, d2 += 16), (f3 = s >> 8) != 0 && (s = f3, d2 += 8), (f3 = s >> 4) != 0 && (s = f3, d2 += 4), (f3 = s >> 2) != 0 && (s = f3, d2 += 2), s >> 1 != 0 && (d2 += 1), 0 < (s = this.c - d2) ? (A3.oa(s, c3), o2.oa(s, t2)) : (A3.copyTo(c3), o2.copyTo(t2)), (o2 = c3[(A3 = c3.a) - 1]) != 0) {
                f3 = o2 * (1 << this.U) + (1 < A3 ? c3[A3 - 2] >> this.V : 0), d2 = this.xa / f3, f3 = (1 << this.U) / f3;
                var v2 = 1 << this.V, l2 = t2.a, h2 = l2 - A3, b2 = a3 == n ? i2() : a3;
                for (c3.P(h2, b2), 0 <= t2.ab(b2) && (t2[t2.a++] = 1, t2.m(b2, t2)), e2.ONE.P(A3, b2), b2.m(c3, c3); c3.a < A3; )
                  c3[c3.a++] = 0;
                for (; 0 <= --h2; ) {
                  var p = t2[--l2] == o2 ? this.n : Math.floor(t2[l2] * d2 + (t2[l2 - 1] + v2) * f3);
                  if ((t2[l2] += c3.M(p, t2, h2, A3)) < p)
                    for (c3.P(h2, b2), t2.m(b2, t2); t2[l2] < --p; )
                      t2.m(b2, t2);
                }
                a3 != n && (t2.bb(A3, a3), u2 != r2 && e2.ZERO.m(a3, a3)), t2.a = A3, t2.s(), 0 < s && t2.lb(s, t2), 0 > u2 && e2.ZERO.m(t2, t2);
              }
            }
          }
        }, e2.prototype.toString = function(e3) {
          if (0 > this.b)
            return "-" + this.f().toString(e3);
          if (e3 == 16)
            e3 = 4;
          else if (e3 == 8)
            e3 = 3;
          else if (e3 == 2)
            e3 = 1;
          else if (e3 == 32)
            e3 = 5;
          else {
            if (e3 != 4)
              return this.nb(e3);
            e3 = 2;
          }
          var i3, a3 = (1 << e3) - 1, t2 = r, n2 = "", A3 = this.a, o2 = this.c - A3 * this.c % e3;
          if (0 < A3--)
            for (o2 < this.c && 0 < (i3 = this[A3] >> o2) && (t2 = l, n2 = "0123456789abcdefghijklmnopqrstuvwxyz".charAt(i3)); 0 <= A3; )
              o2 < e3 ? (i3 = (this[A3] & (1 << o2) - 1) << e3 - o2, i3 |= this[--A3] >> (o2 += this.c - e3)) : (i3 = this[A3] >> (o2 -= e3) & a3, 0 >= o2 && (o2 += this.c, --A3)), 0 < i3 && (t2 = l), t2 && (n2 += "0123456789abcdefghijklmnopqrstuvwxyz".charAt(i3));
          return t2 ? n2 : "0";
        }, e2.prototype.f = function() {
          var r2 = i2();
          return e2.ZERO.m(this, r2), r2;
        }, e2.prototype.abs = function() {
          return 0 > this.b ? this.f() : this;
        }, e2.prototype.ab = function(r2) {
          if ((e3 = this.b - r2.b) != 0)
            return e3;
          var e3, i3 = this.a;
          if ((e3 = i3 - r2.a) != 0)
            return e3;
          for (; 0 <= --i3; )
            if ((e3 = this[i3] - r2[i3]) != 0)
              return e3;
          return 0;
        }, e2.ZERO = t(0), e2.ONE = t(1), e2.prototype.cb = function(i3, t2) {
          this.t(0), t2 == n && (t2 = 10);
          for (var A3 = this.fa(t2), o2 = Math.pow(t2, A3), f3 = r, c3 = 0, u2 = 0, s = 0; s < i3.length; ++s) {
            var d2 = a2(i3, s);
            0 > d2 ? i3.charAt(s) == "-" && this.S() == 0 && (f3 = l) : (u2 = t2 * u2 + d2, ++c3 >= A3 && (this.ha(o2), this.ga(u2), u2 = c3 = 0));
          }
          0 < c3 && (this.ha(Math.pow(t2, c3)), this.ga(u2)), f3 && e2.ZERO.m(this, this);
        }, e2.prototype.fa = function(r2) {
          return Math.floor(Math.LN2 * this.c / Math.log(r2));
        }, e2.prototype.S = function() {
          return 0 > this.b ? -1 : 0 >= this.a || this.a == 1 && 0 >= this[0] ? 0 : 1;
        }, e2.prototype.ha = function(r2) {
          this[this.a] = this.M(r2 - 1, this, 0, this.a), ++this.a, this.s();
        }, e2.prototype.ga = function(r2) {
          var e3 = 0;
          if (r2 != 0) {
            for (; this.a <= e3; )
              this[this.a++] = 0;
            for (this[e3] += r2; this[e3] >= this.C; )
              this[e3] -= this.C, ++e3 >= this.a && (this[this.a++] = 0), ++this[e3];
          }
        }, e2.prototype.nb = function(r2) {
          if (r2 == n && (r2 = 10), this.S() == 0 || 2 > r2 || 36 < r2)
            return "0";
          var e3 = this.fa(r2), a3 = t(e3 = Math.pow(r2, e3)), A3 = i2(), o2 = i2(), f3 = "";
          for (this.w(a3, A3, o2); 0 < A3.S(); )
            f3 = (e3 + o2.ja()).toString(r2).substr(1) + f3, A3.w(a3, A3, o2);
          return o2.ja().toString(r2) + f3;
        }, e2.prototype.ja = function() {
          if (0 > this.b) {
            if (this.a == 1)
              return this[0] - this.C;
            if (this.a == 0)
              return -1;
          } else {
            if (this.a == 1)
              return this[0];
            if (this.a == 0)
              return 0;
          }
          return (this[1] & (1 << 32 - this.c) - 1) << this.c | this[0];
        }, e2.prototype.ea = function(r2, e3) {
          for (var i3 = 0, a3 = 0, t2 = Math.min(r2.a, this.a); i3 < t2; )
            a3 += this[i3] + r2[i3], e3[i3++] = a3 & this.n, a3 >>= this.c;
          if (r2.a < this.a) {
            for (a3 += r2.b; i3 < this.a; )
              a3 += this[i3], e3[i3++] = a3 & this.n, a3 >>= this.c;
            a3 += this.b;
          } else {
            for (a3 += this.b; i3 < r2.a; )
              a3 += r2[i3], e3[i3++] = a3 & this.n, a3 >>= this.c;
            a3 += r2.b;
          }
          e3.b = 0 > a3 ? -1 : 0, 0 < a3 ? e3[i3++] = a3 : -1 > a3 && (e3[i3++] = this.C + a3), e3.a = i3, e3.s();
        };
        var u = { result: [0, 0], add: function(r2, e3, i3, a3) {
          r2 = new A2(r2, e3).add(new A2(i3, a3)), u.result[0] = r2.d, u.result[1] = r2.e;
        }, u: function(r2, e3, i3, a3) {
          r2 = new A2(r2, e3).u(new A2(i3, a3)), u.result[0] = r2.d, u.result[1] = r2.e;
        }, multiply: function(r2, e3, i3, a3) {
          r2 = new A2(r2, e3).multiply(new A2(i3, a3)), u.result[0] = r2.d, u.result[1] = r2.e;
        }, qa: function() {
          u.B = new e2(), u.B.q("4294967296", 10);
        }, I: function(r2, i3) {
          var a3 = new e2();
          a3.q(i3.toString(), 10);
          var t2 = new e2();
          a3.jb(u.B, t2), (a3 = new e2()).q(r2.toString(), 10);
          var n2 = new e2();
          return a3.ea(t2, n2), n2;
        }, Hb: function(r2, i3, a3, t2, o2) {
          u.B || u.qa(), o2 ? (r2 = u.I(r2 >>> 0, i3 >>> 0), t2 = u.I(a3 >>> 0, t2 >>> 0), a3 = new e2(), r2.w(t2, a3, n), t2 = new e2(), r2 = new e2(), a3.w(u.B, r2, t2), u.result[0] = 0 | parseInt(t2.toString()), u.result[1] = 0 | parseInt(r2.toString())) : (r2 = new A2(r2, i3), t2 = new A2(a3, t2), a3 = r2.o(t2), u.result[0] = a3.d, u.result[1] = a3.e);
        }, ra: function(r2, i3, a3, t2, o2) {
          u.B || u.qa(), o2 ? (r2 = u.I(r2 >>> 0, i3 >>> 0), t2 = u.I(a3 >>> 0, t2 >>> 0), a3 = new e2(), r2.w(t2, n, a3), t2 = new e2(), r2 = new e2(), a3.w(u.B, r2, t2), u.result[0] = 0 | parseInt(t2.toString()), u.result[1] = 0 | parseInt(r2.toString())) : (r2 = new A2(r2, i3), t2 = new A2(a3, t2), a3 = r2.ra(t2), u.result[0] = a3.d, u.result[1] = a3.e);
        }, stringify: function(r2, i3, a3) {
          return r2 = new A2(r2, i3).toString(), a3 && r2[0] == "-" && (u.T || (u.T = new e2(), u.T.q("18446744073709551616", 10)), (a3 = new e2()).q(r2, 10), r2 = new e2(), u.T.ea(a3, r2), r2 = r2.toString(10)), r2;
        } };
        return u;
      }();
      fe = 13;
      ge = 9;
      he = 22;
      ke = 5;
      le = 21;
      me = 6;
      oe = 0;
      Gc = 0;
      pe = 0;
      qe = 2;
      Ic = [n];
      re = l;
      rc.unshift({ R: function() {
        !Module.noFSInit && !Ce && Be();
      } }), sc.push({ R: function() {
        re = r;
      } }), tc.push({ R: function() {
        Ce && (Ic[2] && 0 < Ic[2].object.A.buffer.length && Ic[2].object.A(10), Ic[3] && 0 < Ic[3].object.A.buffer.length && Ic[3].object.A(10));
      } }), ne(0), N(12, "void*", I), Module.$a = function(r2) {
        function e2() {
          for (var r3 = 0; 3 > r3; r3++)
            a2.push(0);
        }
        var i2 = r2.length + 1, a2 = [N(gc("/bin/this.program"), "i8", I)];
        e2();
        for (var t = 0; t < i2 - 1; t += 1)
          a2.push(N(gc(r2[t]), "i8", I)), e2();
        return a2.push(0), a2 = N(a2, "i32", I), _main(i2, a2, 0);
      }, R.Ca = N([37, 115, 40, 37, 117, 41, 58, 32, 65, 115, 115, 101, 114, 116, 105, 111, 110, 32, 102, 97, 105, 108, 117, 114, 101, 58, 32, 34, 37, 115, 34, 10, 0], "i8", I), R.Da = N([109, 95, 115, 105, 122, 101, 32, 60, 61, 32, 109, 95, 99, 97, 112, 97, 99, 105, 116, 121, 0], "i8", I), R.Ka = N([46, 47, 99, 114, 110, 95, 100, 101, 99, 111, 109, 112, 46, 104, 0], "i8", I), R.Pa = N([109, 105, 110, 95, 110, 101, 119, 95, 99, 97, 112, 97, 99, 105, 116, 121, 32, 60, 32, 40, 48, 120, 55, 70, 70, 70, 48, 48, 48, 48, 85, 32, 47, 32, 101, 108, 101, 109, 101, 110, 116, 95, 115, 105, 122, 101, 41, 0], "i8", I), R.Ta = N([110, 101, 119, 95, 99, 97, 112, 97, 99, 105, 116, 121, 32, 38, 38, 32, 40, 110, 101, 119, 95, 99, 97, 112, 97, 99, 105, 116, 121, 32, 62, 32, 109, 95, 99, 97, 112, 97, 99, 105, 116, 121, 41, 0], "i8", I), R.Ua = N([110, 117, 109, 95, 99, 111, 100, 101, 115, 91, 99, 93, 0], "i8", I), R.Va = N([115, 111, 114, 116, 101, 100, 95, 112, 111, 115, 32, 60, 32, 116, 111, 116, 97, 108, 95, 117, 115, 101, 100, 95, 115, 121, 109, 115, 0], "i8", I), R.Wa = N([112, 67, 111, 100, 101, 115, 105, 122, 101, 115, 91, 115, 121, 109, 95, 105, 110, 100, 101, 120, 93, 32, 61, 61, 32, 99, 111, 100, 101, 115, 105, 122, 101, 0], "i8", I), R.Xa = N([116, 32, 60, 32, 40, 49, 85, 32, 60, 60, 32, 116, 97, 98, 108, 101, 95, 98, 105, 116, 115, 41, 0], "i8", I), R.Ya = N([109, 95, 108, 111, 111, 107, 117, 112, 91, 116, 93, 32, 61, 61, 32, 99, 85, 73, 78, 84, 51, 50, 95, 77, 65, 88, 0], "i8", I), Kc = N([2], ["i8* (i8*, i32, i32*, i1, i8*)*", 0, 0, 0, 0], I), N([4], ["i32 (i8*, i8*)*", 0, 0, 0, 0], I), Lc = N(1, "i8*", I), R.aa = N([99, 114, 110, 100, 95, 109, 97, 108, 108, 111, 99, 58, 32, 115, 105, 122, 101, 32, 116, 111, 111, 32, 98, 105, 103, 0], "i8", I), R.Ea = N([99, 114, 110, 100, 95, 109, 97, 108, 108, 111, 99, 58, 32, 111, 117, 116, 32, 111, 102, 32, 109, 101, 109, 111, 114, 121, 0], "i8", I), R.ba = N([40, 40, 117, 105, 110, 116, 51, 50, 41, 112, 95, 110, 101, 119, 32, 38, 32, 40, 67, 82, 78, 68, 95, 77, 73, 78, 95, 65, 76, 76, 79, 67, 95, 65, 76, 73, 71, 78, 77, 69, 78, 84, 32, 45, 32, 49, 41, 41, 32, 61, 61, 32, 48, 0], "i8", I), R.Fa = N([99, 114, 110, 100, 95, 114, 101, 97, 108, 108, 111, 99, 58, 32, 98, 97, 100, 32, 112, 116, 114, 0], "i8", I), R.Ga = N([99, 114, 110, 100, 95, 102, 114, 101, 101, 58, 32, 98, 97, 100, 32, 112, 116, 114, 0], "i8", I), R.wb = N([99, 114, 110, 100, 95, 109, 115, 105, 122, 101, 58, 32, 98, 97, 100, 32, 112, 116, 114, 0], "i8", I), N([1, 0, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 16, 0, 0, 0, 32, 0, 0, 0, 64, 0, 0, 0, 128, 0, 0, 0, 256, 0, 0, 0, 512, 0, 0, 0, 1024, 0, 0, 0, 2048, 0, 0, 0, 4096, 0, 0, 0, 8192, 0, 0, 0, 16384, 0, 0, 0, 32768, 0, 0, 0, 65536, 0, 0, 0, 131072, 0, 0, 0, 262144, 0, 0, 0, 524288, 0, 0, 0, 1048576, 0, 0, 0, 2097152, 0, 0, 0, 4194304, 0, 0, 0, 8388608, 0, 0, 0, 16777216, 0, 0, 0, 33554432, 0, 0, 0, 67108864, 0, 0, 0, 134217728, 0, 0, 0, 268435456, 0, 0, 0, 536870912, 0, 0, 0, 1073741824, 0, 0, 0, -2147483648, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], I), R.Ia = N([102, 97, 108, 115, 101, 0], "i8", I), R.xb = N([99, 114, 110, 100, 95, 118, 97, 108, 105, 100, 97, 116, 101, 95, 102, 105, 108, 101, 40, 38, 110, 101, 119, 95, 104, 101, 97, 100, 101, 114, 44, 32, 97, 99, 116, 117, 97, 108, 95, 98, 97, 115, 101, 95, 100, 97, 116, 97, 95, 115, 105, 122, 101, 44, 32, 78, 85, 76, 76, 41, 0], "i8", I), R.yb = N([40, 116, 111, 116, 97, 108, 95, 115, 121, 109, 115, 32, 62, 61, 32, 49, 41, 32, 38, 38, 32, 40, 116, 111, 116, 97, 108, 95, 115, 121, 109, 115, 32, 60, 61, 32, 112, 114, 101, 102, 105, 120, 95, 99, 111, 100, 105, 110, 103, 58, 58, 99, 77, 97, 120, 83, 117, 112, 112, 111, 114, 116, 101, 100, 83, 121, 109, 115, 41, 32, 38, 38, 32, 40, 99, 111, 100, 101, 95, 115, 105, 122, 101, 95, 108, 105, 109, 105, 116, 32, 62, 61, 32, 49, 41, 0], "i8", I), R.Ja = N([40, 116, 111, 116, 97, 108, 95, 115, 121, 109, 115, 32, 62, 61, 32, 49, 41, 32, 38, 38, 32, 40, 116, 111, 116, 97, 108, 95, 115, 121, 109, 115, 32, 60, 61, 32, 112, 114, 101, 102, 105, 120, 95, 99, 111, 100, 105, 110, 103, 58, 58, 99, 77, 97, 120, 83, 117, 112, 112, 111, 114, 116, 101, 100, 83, 121, 109, 115, 41, 0], "i8", I), R.za = N([17, 18, 19, 20, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15, 16], "i8", I), R.ca = N([48, 0], "i8", I), R.La = N([110, 117, 109, 95, 98, 105, 116, 115, 32, 60, 61, 32, 51, 50, 85, 0], "i8", I), R.Ma = N([109, 95, 98, 105, 116, 95, 99, 111, 117, 110, 116, 32, 60, 61, 32, 99, 66, 105, 116, 66, 117, 102, 83, 105, 122, 101, 0], "i8", I), R.Na = N([116, 32, 33, 61, 32, 99, 85, 73, 78, 84, 51, 50, 95, 77, 65, 88, 0], "i8", I), R.Oa = N([109, 111, 100, 101, 108, 46, 109, 95, 99, 111, 100, 101, 95, 115, 105, 122, 101, 115, 91, 115, 121, 109, 93, 32, 61, 61, 32, 108, 101, 110, 0], "i8", I), N([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 7, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 7, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], I), N([0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 7, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], I), R.rb = N([0, 3, 1, 2], "i8", I), R.h = N([0, 2, 3, 1], "i8", I), R.sb = N([0, 7, 1, 2, 3, 4, 5, 6], "i8", I), R.g = N([0, 2, 3, 4, 5, 6, 7, 1], "i8", I), R.tb = N([1, 0, 5, 4, 3, 2, 6, 7], "i8", I), R.ub = N([1, 0, 7, 6, 5, 4, 3, 2], "i8", I), R.Ab = N([105, 110, 100, 101, 120, 32, 60, 32, 50, 0], "i8", I), R.Bb = N([40, 108, 111, 32, 60, 61, 32, 48, 120, 70, 70, 70, 70, 85, 41, 32, 38, 38, 32, 40, 104, 105, 32, 60, 61, 32, 48, 120, 70, 70, 70, 70, 85, 41, 0], "i8", I), R.Cb = N([40, 120, 32, 60, 32, 99, 68, 88, 84, 66, 108, 111, 99, 107, 83, 105, 122, 101, 41, 32, 38, 38, 32, 40, 121, 32, 60, 32, 99, 68, 88, 84, 66, 108, 111, 99, 107, 83, 105, 122, 101, 41, 0], "i8", I), R.Db = N([118, 97, 108, 117, 101, 32, 60, 61, 32, 48, 120, 70, 70, 0], "i8", I), R.Eb = N([118, 97, 108, 117, 101, 32, 60, 61, 32, 48, 120, 70, 0], "i8", I), R.Fb = N([40, 108, 111, 32, 60, 61, 32, 48, 120, 70, 70, 41, 32, 38, 38, 32, 40, 104, 105, 32, 60, 61, 32, 48, 120, 70, 70, 41, 0], "i8", I), R.F = N([105, 32, 60, 32, 109, 95, 115, 105, 122, 101, 0], "i8", I), R.da = N([110, 117, 109, 32, 38, 38, 32, 40, 110, 117, 109, 32, 61, 61, 32, 126, 110, 117, 109, 95, 99, 104, 101, 99, 107, 41, 0], "i8", I), R.D = N([1, 2, 2, 3, 3, 3, 3, 4], "i8", I), Hd = N([0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 2, 1, 2, 0, 0, 0, 1, 0, 2, 1, 0, 2, 0, 0, 1, 2, 3], "i8", I), R.Qa = N([110, 101, 120, 116, 95, 108, 101, 118, 101, 108, 95, 111, 102, 115, 32, 62, 32, 99, 117, 114, 95, 108, 101, 118, 101, 108, 95, 111, 102, 115, 0], "i8", I), R.Sa = N([40, 108, 101, 110, 32, 62, 61, 32, 49, 41, 32, 38, 38, 32, 40, 108, 101, 110, 32, 60, 61, 32, 99, 77, 97, 120, 69, 120, 112, 101, 99, 116, 101, 100, 67, 111, 100, 101, 83, 105, 122, 101, 41, 0], "i8", I), T = N(468, ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0], I), Od = N(24, "i32", I), R.Gb = N([109, 97, 120, 32, 115, 121, 115, 116, 101, 109, 32, 98, 121, 116, 101, 115, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0], "i8", I), R.vb = N([115, 121, 115, 116, 101, 109, 32, 98, 121, 116, 101, 115, 32, 32, 32, 32, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0], "i8", I), R.zb = N([105, 110, 32, 117, 115, 101, 32, 98, 121, 116, 101, 115, 32, 32, 32, 32, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0], "i8", I), N([0], "i8", I), N(1, "void ()*", I), be = N([0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 8, 0, 0, 0, 10, 0, 0, 0], ["*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0], I), N(1, "void*", I), R.Ra = N([115, 116, 100, 58, 58, 98, 97, 100, 95, 97, 108, 108, 111, 99, 0], "i8", I), Ee = N([0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 12, 0, 0, 0, 14, 0, 0, 0], ["*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0], I), N(1, "void*", I), R.Ha = N([98, 97, 100, 95, 97, 114, 114, 97, 121, 95, 110, 101, 119, 95, 108, 101, 110, 103, 116, 104, 0], "i8", I), R.Ba = N([83, 116, 57, 98, 97, 100, 95, 97, 108, 108, 111, 99, 0], "i8", I), Ge = N(12, "*", I), R.Aa = N([83, 116, 50, 48, 98, 97, 100, 95, 97, 114, 114, 97, 121, 95, 110, 101, 119, 95, 108, 101, 110, 103, 116, 104, 0], "i8", I), He = N(12, "*", I), A[be + 4 >> 2] = Ge, A[Ee + 4 >> 2] = He, Fe = N([2, 0, 0, 0, 0], ["i8*", 0, 0, 0, 0], I), A[Ge >> 2] = Fe + 8 | 0, A[Ge + 4 >> 2] = 0 | R.Ba, A[Ge + 8 >> 2] = aa, A[He >> 2] = Fe + 8 | 0, A[He + 4 >> 2] = 0 | R.Aa, A[He + 8 >> 2] = Ge, $b = [0, 0, function(r2, e2, i2, a2) {
        if ((0 | r2) == 0)
          r2 = Yb(e2), (0 | i2) != 0 && (A[i2 >> 2] = (0 | r2) == 0 ? 0 : $d(r2)), i2 = r2;
        else if ((0 | e2) == 0)
          Xd(r2), (0 | i2) != 0 && (A[i2 >> 2] = 0), i2 = 0;
        else {
          var t = (0 | r2) == 0 ? Yb(e2) : Yd(r2, e2), n2 = (0 | t) != 0;
          n2 | 1 ^ a2 ? r2 = n2 ? t : r2 : (0 | (t = (0 | r2) == 0 ? Yb(e2) : Yd(r2, e2))) == 0 ? t = 0 : r2 = t, (0 | i2) != 0 && (A[i2 >> 2] = $d(r2)), i2 = t;
        }
        return i2;
      }, 0, function(r2) {
        return (0 | r2) == 0 ? 0 : $d(r2);
      }, 0, ce, 0, function(r2) {
        ce(r2), (0 | r2) != 0 && Xd(r2);
      }, 0, function() {
        return 0 | R.Ra;
      }, 0, function(r2) {
        ce(0 | r2), (0 | r2) != 0 && Xd(r2);
      }, 0, function() {
        return 0 | R.Ha;
      }, 0, $c, 0, function(r2, e2) {
        var i2;
        if (A[r2 >> 2] = 0, ad(r2 + 4 | 0), A[r2 + 20 >> 2] = 0, (0 | r2) != (0 | e2)) {
          A[r2 >> 2] = A[e2 >> 2];
          var a2, t = e2 + 4 | 0, n2 = (0 | (i2 = r2 + 4 | 0)) == (0 | t);
          do {
            if (!n2) {
              if (a2 = (t + 4 | 0) >> 2, (0 | A[i2 + 8 >> 2]) == (0 | A[a2]))
                id(i2, 0);
              else if (dd(i2), !jd(i2, A[a2], 0))
                break;
              hd(A[i2 >> 2], A[t >> 2], A[a2]), A[i2 + 4 >> 2] = A[a2];
            }
          } while (0);
          (1 & z[i2 + 12 | 0]) << 24 >> 24 != 0 ? cd(r2) : (t = A[e2 + 20 >> 2], a2 = A[i2 = (r2 + 20 | 0) >> 2], (0 | t) == 0 ? (bd(a2), A[i2] = 0) : (0 | a2) == 0 ? ((0 | (a2 = Mc(180, 0))) == 0 ? t = 0 : (0 | a2) == 0 ? t = 0 : (A[a2 + 164 >> 2] = 0, A[a2 + 168 >> 2] = 0, A[a2 + 172 >> 2] = 0, A[a2 + 176 >> 2] = 0, gd(a2, t), t = a2), A[i2] = t) : gd(a2, t));
        }
      }, 0, ed, 0, fd, 0, ae, 0, function(r2) {
        ae(0 | r2), A[r2 >> 2] = Ee + 8 | 0;
      }, 0], Module.FUNCTION_TABLE = $b, Module.run = Ie, qc(rc), Module.noInitialRun && (zc++, Module.monitorRunDependencies && Module.monitorRunDependencies(zc)), zc == 0 && Ie();
    }
  });

  // node_modules/threads/dist/serializers.js
  var require_serializers = __commonJS({
    "node_modules/threads/dist/serializers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DefaultSerializer = exports.extendSerializer = void 0;
      function extendSerializer(extend, implementation) {
        const fallbackDeserializer = extend.deserialize.bind(extend);
        const fallbackSerializer = extend.serialize.bind(extend);
        return {
          deserialize(message) {
            return implementation.deserialize(message, fallbackDeserializer);
          },
          serialize(input) {
            return implementation.serialize(input, fallbackSerializer);
          }
        };
      }
      exports.extendSerializer = extendSerializer;
      var DefaultErrorSerializer = {
        deserialize(message) {
          return Object.assign(Error(message.message), {
            name: message.name,
            stack: message.stack
          });
        },
        serialize(error) {
          return {
            __error_marker: "$$error",
            message: error.message,
            name: error.name,
            stack: error.stack
          };
        }
      };
      var isSerializedError = (thing) => thing && typeof thing === "object" && "__error_marker" in thing && thing.__error_marker === "$$error";
      exports.DefaultSerializer = {
        deserialize(message) {
          if (isSerializedError(message)) {
            return DefaultErrorSerializer.deserialize(message);
          } else {
            return message;
          }
        },
        serialize(input) {
          if (input instanceof Error) {
            return DefaultErrorSerializer.serialize(input);
          } else {
            return input;
          }
        }
      };
    }
  });

  // node_modules/threads/dist/common.js
  var require_common = __commonJS({
    "node_modules/threads/dist/common.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.serialize = exports.deserialize = exports.registerSerializer = void 0;
      var serializers_1 = require_serializers();
      var registeredSerializer = serializers_1.DefaultSerializer;
      function registerSerializer2(serializer) {
        registeredSerializer = serializers_1.extendSerializer(registeredSerializer, serializer);
      }
      exports.registerSerializer = registerSerializer2;
      function deserialize(message) {
        return registeredSerializer.deserialize(message);
      }
      exports.deserialize = deserialize;
      function serialize(input) {
        return registeredSerializer.serialize(input);
      }
      exports.serialize = serialize;
    }
  });

  // node_modules/threads/dist/master/get-bundle-url.browser.js
  var require_get_bundle_url_browser = __commonJS({
    "node_modules/threads/dist/master/get-bundle-url.browser.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getBundleURL = exports.getBaseURL = void 0;
      var bundleURL;
      function getBundleURLCached() {
        if (!bundleURL) {
          bundleURL = getBundleURL();
        }
        return bundleURL;
      }
      exports.getBundleURL = getBundleURLCached;
      function getBundleURL() {
        try {
          throw new Error();
        } catch (err) {
          const matches = ("" + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
          if (matches) {
            return getBaseURL(matches[0]);
          }
        }
        return "/";
      }
      function getBaseURL(url) {
        return ("" + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, "$1") + "/";
      }
      exports.getBaseURL = getBaseURL;
    }
  });

  // node_modules/threads/dist/master/implementation.browser.js
  var require_implementation_browser = __commonJS({
    "node_modules/threads/dist/master/implementation.browser.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isWorkerRuntime = exports.getWorkerImplementation = exports.defaultPoolSize = void 0;
      var get_bundle_url_browser_1 = require_get_bundle_url_browser();
      exports.defaultPoolSize = typeof navigator !== "undefined" && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4;
      var isAbsoluteURL = (value) => /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(value);
      function createSourceBlobURL(code) {
        const blob = new Blob([code], { type: "application/javascript" });
        return URL.createObjectURL(blob);
      }
      function selectWorkerImplementation() {
        if (typeof Worker === "undefined") {
          return class NoWebWorker {
            constructor() {
              throw Error("No web worker implementation available. You might have tried to spawn a worker within a worker in a browser that doesn't support workers in workers.");
            }
          };
        }
        class WebWorker extends Worker {
          constructor(url, options) {
            var _a, _b;
            if (typeof url === "string" && options && options._baseURL) {
              url = new URL(url, options._baseURL);
            } else if (typeof url === "string" && !isAbsoluteURL(url) && get_bundle_url_browser_1.getBundleURL().match(/^file:\/\//i)) {
              url = new URL(url, get_bundle_url_browser_1.getBundleURL().replace(/\/[^\/]+$/, "/"));
              if ((_a = options === null || options === void 0 ? void 0 : options.CORSWorkaround) !== null && _a !== void 0 ? _a : true) {
                url = createSourceBlobURL(`importScripts(${JSON.stringify(url)});`);
              }
            }
            if (typeof url === "string" && isAbsoluteURL(url)) {
              if ((_b = options === null || options === void 0 ? void 0 : options.CORSWorkaround) !== null && _b !== void 0 ? _b : true) {
                url = createSourceBlobURL(`importScripts(${JSON.stringify(url)});`);
              }
            }
            super(url, options);
          }
        }
        class BlobWorker extends WebWorker {
          constructor(blob, options) {
            const url = window.URL.createObjectURL(blob);
            super(url, options);
          }
          static fromText(source, options) {
            const blob = new window.Blob([source], { type: "text/javascript" });
            return new BlobWorker(blob, options);
          }
        }
        return {
          blob: BlobWorker,
          default: WebWorker
        };
      }
      var implementation;
      function getWorkerImplementation() {
        if (!implementation) {
          implementation = selectWorkerImplementation();
        }
        return implementation;
      }
      exports.getWorkerImplementation = getWorkerImplementation;
      function isWorkerRuntime() {
        const isWindowContext = typeof self !== "undefined" && typeof Window !== "undefined" && self instanceof Window;
        return typeof self !== "undefined" && self.postMessage && !isWindowContext ? true : false;
      }
      exports.isWorkerRuntime = isWorkerRuntime;
    }
  });

  // node_modules/ms/index.js
  var require_ms = __commonJS({
    "node_modules/ms/index.js"(exports, module) {
      var s = 1e3;
      var m = s * 60;
      var h2 = m * 60;
      var d2 = h2 * 24;
      var w = d2 * 7;
      var y = d2 * 365.25;
      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
      };
      function parse(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
        if (!match) {
          return;
        }
        var n2 = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n2 * y;
          case "weeks":
          case "week":
          case "w":
            return n2 * w;
          case "days":
          case "day":
          case "d":
            return n2 * d2;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n2 * h2;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n2 * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n2 * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n2;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d2) {
          return Math.round(ms / d2) + "d";
        }
        if (msAbs >= h2) {
          return Math.round(ms / h2) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d2) {
          return plural(ms, msAbs, d2, "day");
        }
        if (msAbs >= h2) {
          return plural(ms, msAbs, h2, "hour");
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms, msAbs, s, "second");
        }
        return ms + " ms";
      }
      function plural(ms, msAbs, n2, name) {
        var isPlural = msAbs >= n2 * 1.5;
        return Math.round(ms / n2) + " " + name + (isPlural ? "s" : "");
      }
    }
  });

  // node_modules/debug/src/common.js
  var require_common2 = __commonJS({
    "node_modules/debug/src/common.js"(exports, module) {
      function setup(env) {
        createDebug.debug = createDebug;
        createDebug.default = createDebug;
        createDebug.coerce = coerce;
        createDebug.disable = disable;
        createDebug.enable = enable;
        createDebug.enabled = enabled;
        createDebug.humanize = require_ms();
        createDebug.destroy = destroy;
        Object.keys(env).forEach((key) => {
          createDebug[key] = env[key];
        });
        createDebug.names = [];
        createDebug.skips = [];
        createDebug.formatters = {};
        function selectColor(namespace) {
          let hash = 0;
          for (let i2 = 0; i2 < namespace.length; i2++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i2);
            hash |= 0;
          }
          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }
        createDebug.selectColor = selectColor;
        function createDebug(namespace) {
          let prevTime;
          let enableOverride = null;
          let namespacesCache;
          let enabledCache;
          function debug(...args) {
            if (!debug.enabled) {
              return;
            }
            const self2 = debug;
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self2.diff = ms;
            self2.prev = prevTime;
            self2.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
              if (match === "%%") {
                return "%";
              }
              index++;
              const formatter = createDebug.formatters[format];
              if (typeof formatter === "function") {
                const val = args[index];
                match = formatter.call(self2, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            createDebug.formatArgs.call(self2, args);
            const logFn = self2.log || createDebug.log;
            logFn.apply(self2, args);
          }
          debug.namespace = namespace;
          debug.useColors = createDebug.useColors();
          debug.color = createDebug.selectColor(namespace);
          debug.extend = extend;
          debug.destroy = createDebug.destroy;
          Object.defineProperty(debug, "enabled", {
            enumerable: true,
            configurable: false,
            get: () => {
              if (enableOverride !== null) {
                return enableOverride;
              }
              if (namespacesCache !== createDebug.namespaces) {
                namespacesCache = createDebug.namespaces;
                enabledCache = createDebug.enabled(namespace);
              }
              return enabledCache;
            },
            set: (v2) => {
              enableOverride = v2;
            }
          });
          if (typeof createDebug.init === "function") {
            createDebug.init(debug);
          }
          return debug;
        }
        function extend(namespace, delimiter) {
          const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
          newDebug.log = this.log;
          return newDebug;
        }
        function enable(namespaces) {
          createDebug.save(namespaces);
          createDebug.namespaces = namespaces;
          createDebug.names = [];
          createDebug.skips = [];
          let i2;
          const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
          const len = split.length;
          for (i2 = 0; i2 < len; i2++) {
            if (!split[i2]) {
              continue;
            }
            namespaces = split[i2].replace(/\*/g, ".*?");
            if (namespaces[0] === "-") {
              createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
            } else {
              createDebug.names.push(new RegExp("^" + namespaces + "$"));
            }
          }
        }
        function disable() {
          const namespaces = [
            ...createDebug.names.map(toNamespace),
            ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
          ].join(",");
          createDebug.enable("");
          return namespaces;
        }
        function enabled(name) {
          if (name[name.length - 1] === "*") {
            return true;
          }
          let i2;
          let len;
          for (i2 = 0, len = createDebug.skips.length; i2 < len; i2++) {
            if (createDebug.skips[i2].test(name)) {
              return false;
            }
          }
          for (i2 = 0, len = createDebug.names.length; i2 < len; i2++) {
            if (createDebug.names[i2].test(name)) {
              return true;
            }
          }
          return false;
        }
        function toNamespace(regexp) {
          return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
        }
        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        function destroy() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
        createDebug.enable(createDebug.load());
        return createDebug;
      }
      module.exports = setup;
    }
  });

  // node_modules/debug/src/browser.js
  var require_browser = __commonJS({
    "node_modules/debug/src/browser.js"(exports, module) {
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.storage = localstorage();
      exports.destroy = (() => {
        let warned = false;
        return () => {
          if (!warned) {
            warned = true;
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
          }
        };
      })();
      exports.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
      ];
      function useColors() {
        if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
          return true;
        }
        if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
          return false;
        }
        return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      function formatArgs(args) {
        args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
        if (!this.useColors) {
          return;
        }
        const c2 = "color: " + this.color;
        args.splice(1, 0, c2, "color: inherit");
        let index = 0;
        let lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, (match) => {
          if (match === "%%") {
            return;
          }
          index++;
          if (match === "%c") {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c2);
      }
      exports.log = console.debug || console.log || (() => {
      });
      function save(namespaces) {
        try {
          if (namespaces) {
            exports.storage.setItem("debug", namespaces);
          } else {
            exports.storage.removeItem("debug");
          }
        } catch (error) {
        }
      }
      function load() {
        let r2;
        try {
          r2 = exports.storage.getItem("debug");
        } catch (error) {
        }
        if (!r2 && typeof process !== "undefined" && "env" in process) {
          r2 = process.env.DEBUG;
        }
        return r2;
      }
      function localstorage() {
        try {
          return localStorage;
        } catch (error) {
        }
      }
      module.exports = require_common2()(exports);
      var { formatters } = module.exports;
      formatters.j = function(v2) {
        try {
          return JSON.stringify(v2);
        } catch (error) {
          return "[UnexpectedJSONParseError]: " + error.message;
        }
      };
    }
  });

  // node_modules/observable-fns/dist/_scheduler.js
  var require_scheduler = __commonJS({
    "node_modules/observable-fns/dist/_scheduler.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e2) {
              reject(e2);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e2) {
              reject(e2);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AsyncSerialScheduler = void 0;
      var AsyncSerialScheduler = class {
        constructor(observer) {
          this._baseObserver = observer;
          this._pendingPromises = new Set();
        }
        complete() {
          Promise.all(this._pendingPromises).then(() => this._baseObserver.complete()).catch((error) => this._baseObserver.error(error));
        }
        error(error) {
          this._baseObserver.error(error);
        }
        schedule(task) {
          const prevPromisesCompletion = Promise.all(this._pendingPromises);
          const values = [];
          const next = (value) => values.push(value);
          const promise = Promise.resolve().then(() => __awaiter(this, void 0, void 0, function* () {
            yield prevPromisesCompletion;
            yield task(next);
            this._pendingPromises.delete(promise);
            for (const value of values) {
              this._baseObserver.next(value);
            }
          })).catch((error) => {
            this._pendingPromises.delete(promise);
            this._baseObserver.error(error);
          });
          this._pendingPromises.add(promise);
        }
      };
      exports.AsyncSerialScheduler = AsyncSerialScheduler;
    }
  });

  // node_modules/observable-fns/dist/symbols.js
  var require_symbols = __commonJS({
    "node_modules/observable-fns/dist/symbols.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/observable-fns/dist/_symbols.js
  var require_symbols2 = __commonJS({
    "node_modules/observable-fns/dist/_symbols.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.registerObservableSymbol = exports.getSymbol = exports.hasSymbol = exports.hasSymbols = void 0;
      var hasSymbols = () => typeof Symbol === "function";
      exports.hasSymbols = hasSymbols;
      var hasSymbol = (name) => exports.hasSymbols() && Boolean(Symbol[name]);
      exports.hasSymbol = hasSymbol;
      var getSymbol = (name) => exports.hasSymbol(name) ? Symbol[name] : "@@" + name;
      exports.getSymbol = getSymbol;
      function registerObservableSymbol() {
        if (exports.hasSymbols() && !exports.hasSymbol("observable")) {
          Symbol.observable = Symbol("observable");
        }
      }
      exports.registerObservableSymbol = registerObservableSymbol;
      if (!exports.hasSymbol("asyncIterator")) {
        Symbol.asyncIterator = Symbol.asyncIterator || Symbol.for("Symbol.asyncIterator");
      }
    }
  });

  // node_modules/observable-fns/dist/observable.js
  var require_observable = __commonJS({
    "node_modules/observable-fns/dist/observable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Observable = exports.SubscriptionObserver = exports.Subscription = void 0;
      require_symbols();
      var _symbols_1 = require_symbols2();
      var SymbolIterator = _symbols_1.getSymbol("iterator");
      var SymbolObservable = _symbols_1.getSymbol("observable");
      var SymbolSpecies = _symbols_1.getSymbol("species");
      function getMethod(obj, key) {
        const value = obj[key];
        if (value == null) {
          return void 0;
        }
        if (typeof value !== "function") {
          throw new TypeError(value + " is not a function");
        }
        return value;
      }
      function getSpecies(obj) {
        let ctor = obj.constructor;
        if (ctor !== void 0) {
          ctor = ctor[SymbolSpecies];
          if (ctor === null) {
            ctor = void 0;
          }
        }
        return ctor !== void 0 ? ctor : Observable;
      }
      function isObservable(x) {
        return x instanceof Observable;
      }
      function hostReportError(error) {
        if (hostReportError.log) {
          hostReportError.log(error);
        } else {
          setTimeout(() => {
            throw error;
          }, 0);
        }
      }
      function enqueue(fn) {
        Promise.resolve().then(() => {
          try {
            fn();
          } catch (e2) {
            hostReportError(e2);
          }
        });
      }
      function cleanupSubscription(subscription) {
        const cleanup = subscription._cleanup;
        if (cleanup === void 0) {
          return;
        }
        subscription._cleanup = void 0;
        if (!cleanup) {
          return;
        }
        try {
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            const unsubscribe = getMethod(cleanup, "unsubscribe");
            if (unsubscribe) {
              unsubscribe.call(cleanup);
            }
          }
        } catch (e2) {
          hostReportError(e2);
        }
      }
      function closeSubscription(subscription) {
        subscription._observer = void 0;
        subscription._queue = void 0;
        subscription._state = "closed";
      }
      function flushSubscription(subscription) {
        const queue = subscription._queue;
        if (!queue) {
          return;
        }
        subscription._queue = void 0;
        subscription._state = "ready";
        for (const item of queue) {
          notifySubscription(subscription, item.type, item.value);
          if (subscription._state === "closed") {
            break;
          }
        }
      }
      function notifySubscription(subscription, type, value) {
        subscription._state = "running";
        const observer = subscription._observer;
        try {
          const m = observer ? getMethod(observer, type) : void 0;
          switch (type) {
            case "next":
              if (m)
                m.call(observer, value);
              break;
            case "error":
              closeSubscription(subscription);
              if (m)
                m.call(observer, value);
              else
                throw value;
              break;
            case "complete":
              closeSubscription(subscription);
              if (m)
                m.call(observer);
              break;
          }
        } catch (e2) {
          hostReportError(e2);
        }
        if (subscription._state === "closed") {
          cleanupSubscription(subscription);
        } else if (subscription._state === "running") {
          subscription._state = "ready";
        }
      }
      function onNotify(subscription, type, value) {
        if (subscription._state === "closed") {
          return;
        }
        if (subscription._state === "buffering") {
          subscription._queue = subscription._queue || [];
          subscription._queue.push({ type, value });
          return;
        }
        if (subscription._state !== "ready") {
          subscription._state = "buffering";
          subscription._queue = [{ type, value }];
          enqueue(() => flushSubscription(subscription));
          return;
        }
        notifySubscription(subscription, type, value);
      }
      var Subscription = class {
        constructor(observer, subscriber) {
          this._cleanup = void 0;
          this._observer = observer;
          this._queue = void 0;
          this._state = "initializing";
          const subscriptionObserver = new SubscriptionObserver(this);
          try {
            this._cleanup = subscriber.call(void 0, subscriptionObserver);
          } catch (e2) {
            subscriptionObserver.error(e2);
          }
          if (this._state === "initializing") {
            this._state = "ready";
          }
        }
        get closed() {
          return this._state === "closed";
        }
        unsubscribe() {
          if (this._state !== "closed") {
            closeSubscription(this);
            cleanupSubscription(this);
          }
        }
      };
      exports.Subscription = Subscription;
      var SubscriptionObserver = class {
        constructor(subscription) {
          this._subscription = subscription;
        }
        get closed() {
          return this._subscription._state === "closed";
        }
        next(value) {
          onNotify(this._subscription, "next", value);
        }
        error(value) {
          onNotify(this._subscription, "error", value);
        }
        complete() {
          onNotify(this._subscription, "complete");
        }
      };
      exports.SubscriptionObserver = SubscriptionObserver;
      var Observable = class {
        constructor(subscriber) {
          if (!(this instanceof Observable)) {
            throw new TypeError("Observable cannot be called as a function");
          }
          if (typeof subscriber !== "function") {
            throw new TypeError("Observable initializer must be a function");
          }
          this._subscriber = subscriber;
        }
        subscribe(nextOrObserver, onError, onComplete) {
          if (typeof nextOrObserver !== "object" || nextOrObserver === null) {
            nextOrObserver = {
              next: nextOrObserver,
              error: onError,
              complete: onComplete
            };
          }
          return new Subscription(nextOrObserver, this._subscriber);
        }
        pipe(first, ...mappers) {
          let intermediate = this;
          for (const mapper of [first, ...mappers]) {
            intermediate = mapper(intermediate);
          }
          return intermediate;
        }
        tap(nextOrObserver, onError, onComplete) {
          const tapObserver = typeof nextOrObserver !== "object" || nextOrObserver === null ? {
            next: nextOrObserver,
            error: onError,
            complete: onComplete
          } : nextOrObserver;
          return new Observable((observer) => {
            return this.subscribe({
              next(value) {
                tapObserver.next && tapObserver.next(value);
                observer.next(value);
              },
              error(error) {
                tapObserver.error && tapObserver.error(error);
                observer.error(error);
              },
              complete() {
                tapObserver.complete && tapObserver.complete();
                observer.complete();
              },
              start(subscription) {
                tapObserver.start && tapObserver.start(subscription);
              }
            });
          });
        }
        forEach(fn) {
          return new Promise((resolve, reject) => {
            if (typeof fn !== "function") {
              reject(new TypeError(fn + " is not a function"));
              return;
            }
            function done() {
              subscription.unsubscribe();
              resolve(void 0);
            }
            const subscription = this.subscribe({
              next(value) {
                try {
                  fn(value, done);
                } catch (e2) {
                  reject(e2);
                  subscription.unsubscribe();
                }
              },
              error(error) {
                reject(error);
              },
              complete() {
                resolve(void 0);
              }
            });
          });
        }
        map(fn) {
          if (typeof fn !== "function") {
            throw new TypeError(fn + " is not a function");
          }
          const C2 = getSpecies(this);
          return new C2((observer) => this.subscribe({
            next(value) {
              let propagatedValue = value;
              try {
                propagatedValue = fn(value);
              } catch (e2) {
                return observer.error(e2);
              }
              observer.next(propagatedValue);
            },
            error(e2) {
              observer.error(e2);
            },
            complete() {
              observer.complete();
            }
          }));
        }
        filter(fn) {
          if (typeof fn !== "function") {
            throw new TypeError(fn + " is not a function");
          }
          const C2 = getSpecies(this);
          return new C2((observer) => this.subscribe({
            next(value) {
              try {
                if (!fn(value))
                  return;
              } catch (e2) {
                return observer.error(e2);
              }
              observer.next(value);
            },
            error(e2) {
              observer.error(e2);
            },
            complete() {
              observer.complete();
            }
          }));
        }
        reduce(fn, seed) {
          if (typeof fn !== "function") {
            throw new TypeError(fn + " is not a function");
          }
          const C2 = getSpecies(this);
          const hasSeed = arguments.length > 1;
          let hasValue = false;
          let acc = seed;
          return new C2((observer) => this.subscribe({
            next(value) {
              const first = !hasValue;
              hasValue = true;
              if (!first || hasSeed) {
                try {
                  acc = fn(acc, value);
                } catch (e2) {
                  return observer.error(e2);
                }
              } else {
                acc = value;
              }
            },
            error(e2) {
              observer.error(e2);
            },
            complete() {
              if (!hasValue && !hasSeed) {
                return observer.error(new TypeError("Cannot reduce an empty sequence"));
              }
              observer.next(acc);
              observer.complete();
            }
          }));
        }
        concat(...sources) {
          const C2 = getSpecies(this);
          return new C2((observer) => {
            let subscription;
            let index = 0;
            function startNext(next) {
              subscription = next.subscribe({
                next(v2) {
                  observer.next(v2);
                },
                error(e2) {
                  observer.error(e2);
                },
                complete() {
                  if (index === sources.length) {
                    subscription = void 0;
                    observer.complete();
                  } else {
                    startNext(C2.from(sources[index++]));
                  }
                }
              });
            }
            startNext(this);
            return () => {
              if (subscription) {
                subscription.unsubscribe();
                subscription = void 0;
              }
            };
          });
        }
        flatMap(fn) {
          if (typeof fn !== "function") {
            throw new TypeError(fn + " is not a function");
          }
          const C2 = getSpecies(this);
          return new C2((observer) => {
            const subscriptions = [];
            const outer = this.subscribe({
              next(value) {
                let normalizedValue;
                if (fn) {
                  try {
                    normalizedValue = fn(value);
                  } catch (e2) {
                    return observer.error(e2);
                  }
                } else {
                  normalizedValue = value;
                }
                const inner = C2.from(normalizedValue).subscribe({
                  next(innerValue) {
                    observer.next(innerValue);
                  },
                  error(e2) {
                    observer.error(e2);
                  },
                  complete() {
                    const i2 = subscriptions.indexOf(inner);
                    if (i2 >= 0)
                      subscriptions.splice(i2, 1);
                    completeIfDone();
                  }
                });
                subscriptions.push(inner);
              },
              error(e2) {
                observer.error(e2);
              },
              complete() {
                completeIfDone();
              }
            });
            function completeIfDone() {
              if (outer.closed && subscriptions.length === 0) {
                observer.complete();
              }
            }
            return () => {
              subscriptions.forEach((s) => s.unsubscribe());
              outer.unsubscribe();
            };
          });
        }
        [(Symbol.observable, SymbolObservable)]() {
          return this;
        }
        static from(x) {
          const C2 = typeof this === "function" ? this : Observable;
          if (x == null) {
            throw new TypeError(x + " is not an object");
          }
          const observableMethod = getMethod(x, SymbolObservable);
          if (observableMethod) {
            const observable = observableMethod.call(x);
            if (Object(observable) !== observable) {
              throw new TypeError(observable + " is not an object");
            }
            if (isObservable(observable) && observable.constructor === C2) {
              return observable;
            }
            return new C2((observer) => observable.subscribe(observer));
          }
          if (_symbols_1.hasSymbol("iterator")) {
            const iteratorMethod = getMethod(x, SymbolIterator);
            if (iteratorMethod) {
              return new C2((observer) => {
                enqueue(() => {
                  if (observer.closed)
                    return;
                  for (const item of iteratorMethod.call(x)) {
                    observer.next(item);
                    if (observer.closed)
                      return;
                  }
                  observer.complete();
                });
              });
            }
          }
          if (Array.isArray(x)) {
            return new C2((observer) => {
              enqueue(() => {
                if (observer.closed)
                  return;
                for (const item of x) {
                  observer.next(item);
                  if (observer.closed)
                    return;
                }
                observer.complete();
              });
            });
          }
          throw new TypeError(x + " is not observable");
        }
        static of(...items) {
          const C2 = typeof this === "function" ? this : Observable;
          return new C2((observer) => {
            enqueue(() => {
              if (observer.closed)
                return;
              for (const item of items) {
                observer.next(item);
                if (observer.closed)
                  return;
              }
              observer.complete();
            });
          });
        }
        static get [SymbolSpecies]() {
          return this;
        }
      };
      exports.Observable = Observable;
      if (_symbols_1.hasSymbols()) {
        Object.defineProperty(Observable, Symbol("extensions"), {
          value: {
            symbol: SymbolObservable,
            hostReportError
          },
          configurable: true
        });
      }
      exports.default = Observable;
    }
  });

  // node_modules/observable-fns/dist/unsubscribe.js
  var require_unsubscribe = __commonJS({
    "node_modules/observable-fns/dist/unsubscribe.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function unsubscribe(subscription) {
        if (typeof subscription === "function") {
          subscription();
        } else if (subscription && typeof subscription.unsubscribe === "function") {
          subscription.unsubscribe();
        }
      }
      exports.default = unsubscribe;
    }
  });

  // node_modules/observable-fns/dist/filter.js
  var require_filter = __commonJS({
    "node_modules/observable-fns/dist/filter.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e2) {
              reject(e2);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e2) {
              reject(e2);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var _scheduler_1 = require_scheduler();
      var observable_1 = require_observable();
      var unsubscribe_1 = require_unsubscribe();
      function filter(test) {
        return (observable) => {
          return new observable_1.default((observer) => {
            const scheduler = new _scheduler_1.AsyncSerialScheduler(observer);
            const subscription = observable.subscribe({
              complete() {
                scheduler.complete();
              },
              error(error) {
                scheduler.error(error);
              },
              next(input) {
                scheduler.schedule((next) => __awaiter(this, void 0, void 0, function* () {
                  if (yield test(input)) {
                    next(input);
                  }
                }));
              }
            });
            return () => unsubscribe_1.default(subscription);
          });
        };
      }
      exports.default = filter;
    }
  });

  // node_modules/observable-fns/dist/_util.js
  var require_util = __commonJS({
    "node_modules/observable-fns/dist/_util.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isIterator = exports.isAsyncIterator = void 0;
      var _symbols_1 = require_symbols2();
      function isAsyncIterator(thing) {
        return thing && _symbols_1.hasSymbol("asyncIterator") && thing[Symbol.asyncIterator];
      }
      exports.isAsyncIterator = isAsyncIterator;
      function isIterator(thing) {
        return thing && _symbols_1.hasSymbol("iterator") && thing[Symbol.iterator];
      }
      exports.isIterator = isIterator;
    }
  });

  // node_modules/observable-fns/dist/flatMap.js
  var require_flatMap = __commonJS({
    "node_modules/observable-fns/dist/flatMap.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e2) {
              reject(e2);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e2) {
              reject(e2);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __asyncValues = exports && exports.__asyncValues || function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i2;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
          return this;
        }, i2);
        function verb(n2) {
          i2[n2] = o[n2] && function(v2) {
            return new Promise(function(resolve, reject) {
              v2 = o[n2](v2), settle(resolve, reject, v2.done, v2.value);
            });
          };
        }
        function settle(resolve, reject, d2, v2) {
          Promise.resolve(v2).then(function(v3) {
            resolve({ value: v3, done: d2 });
          }, reject);
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var _scheduler_1 = require_scheduler();
      var _util_1 = require_util();
      var observable_1 = require_observable();
      var unsubscribe_1 = require_unsubscribe();
      function flatMap(mapper) {
        return (observable) => {
          return new observable_1.default((observer) => {
            const scheduler = new _scheduler_1.AsyncSerialScheduler(observer);
            const subscription = observable.subscribe({
              complete() {
                scheduler.complete();
              },
              error(error) {
                scheduler.error(error);
              },
              next(input) {
                scheduler.schedule((next) => __awaiter(this, void 0, void 0, function* () {
                  var e_1, _a;
                  const mapped = yield mapper(input);
                  if (_util_1.isIterator(mapped) || _util_1.isAsyncIterator(mapped)) {
                    try {
                      for (var mapped_1 = __asyncValues(mapped), mapped_1_1; mapped_1_1 = yield mapped_1.next(), !mapped_1_1.done; ) {
                        const element = mapped_1_1.value;
                        next(element);
                      }
                    } catch (e_1_1) {
                      e_1 = { error: e_1_1 };
                    } finally {
                      try {
                        if (mapped_1_1 && !mapped_1_1.done && (_a = mapped_1.return))
                          yield _a.call(mapped_1);
                      } finally {
                        if (e_1)
                          throw e_1.error;
                      }
                    }
                  } else {
                    mapped.map((output) => next(output));
                  }
                }));
              }
            });
            return () => unsubscribe_1.default(subscription);
          });
        };
      }
      exports.default = flatMap;
    }
  });

  // node_modules/observable-fns/dist/interval.js
  var require_interval = __commonJS({
    "node_modules/observable-fns/dist/interval.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var observable_1 = require_observable();
      function interval(period) {
        return new observable_1.Observable((observer) => {
          let counter = 0;
          const handle = setInterval(() => {
            observer.next(counter++);
          }, period);
          return () => clearInterval(handle);
        });
      }
      exports.default = interval;
    }
  });

  // node_modules/observable-fns/dist/map.js
  var require_map = __commonJS({
    "node_modules/observable-fns/dist/map.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e2) {
              reject(e2);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e2) {
              reject(e2);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var _scheduler_1 = require_scheduler();
      var observable_1 = require_observable();
      var unsubscribe_1 = require_unsubscribe();
      function map(mapper) {
        return (observable) => {
          return new observable_1.default((observer) => {
            const scheduler = new _scheduler_1.AsyncSerialScheduler(observer);
            const subscription = observable.subscribe({
              complete() {
                scheduler.complete();
              },
              error(error) {
                scheduler.error(error);
              },
              next(input) {
                scheduler.schedule((next) => __awaiter(this, void 0, void 0, function* () {
                  const mapped = yield mapper(input);
                  next(mapped);
                }));
              }
            });
            return () => unsubscribe_1.default(subscription);
          });
        };
      }
      exports.default = map;
    }
  });

  // node_modules/observable-fns/dist/merge.js
  var require_merge = __commonJS({
    "node_modules/observable-fns/dist/merge.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var observable_1 = require_observable();
      var unsubscribe_1 = require_unsubscribe();
      function merge(...observables) {
        if (observables.length === 0) {
          return observable_1.Observable.from([]);
        }
        return new observable_1.Observable((observer) => {
          let completed = 0;
          const subscriptions = observables.map((input) => {
            return input.subscribe({
              error(error) {
                observer.error(error);
                unsubscribeAll();
              },
              next(value) {
                observer.next(value);
              },
              complete() {
                if (++completed === observables.length) {
                  observer.complete();
                  unsubscribeAll();
                }
              }
            });
          });
          const unsubscribeAll = () => {
            subscriptions.forEach((subscription) => unsubscribe_1.default(subscription));
          };
          return unsubscribeAll;
        });
      }
      exports.default = merge;
    }
  });

  // node_modules/observable-fns/dist/subject.js
  var require_subject = __commonJS({
    "node_modules/observable-fns/dist/subject.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var observable_1 = require_observable();
      var MulticastSubject = class extends observable_1.default {
        constructor() {
          super((observer) => {
            this._observers.add(observer);
            return () => this._observers.delete(observer);
          });
          this._observers = new Set();
        }
        next(value) {
          for (const observer of this._observers) {
            observer.next(value);
          }
        }
        error(error) {
          for (const observer of this._observers) {
            observer.error(error);
          }
        }
        complete() {
          for (const observer of this._observers) {
            observer.complete();
          }
        }
      };
      exports.default = MulticastSubject;
    }
  });

  // node_modules/observable-fns/dist/multicast.js
  var require_multicast = __commonJS({
    "node_modules/observable-fns/dist/multicast.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var observable_1 = require_observable();
      var subject_1 = require_subject();
      var unsubscribe_1 = require_unsubscribe();
      function multicast(coldObservable) {
        const subject = new subject_1.default();
        let sourceSubscription;
        let subscriberCount = 0;
        return new observable_1.default((observer) => {
          if (!sourceSubscription) {
            sourceSubscription = coldObservable.subscribe(subject);
          }
          const subscription = subject.subscribe(observer);
          subscriberCount++;
          return () => {
            subscriberCount--;
            subscription.unsubscribe();
            if (subscriberCount === 0) {
              unsubscribe_1.default(sourceSubscription);
              sourceSubscription = void 0;
            }
          };
        });
      }
      exports.default = multicast;
    }
  });

  // node_modules/observable-fns/dist/scan.js
  var require_scan = __commonJS({
    "node_modules/observable-fns/dist/scan.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e2) {
              reject(e2);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e2) {
              reject(e2);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var _scheduler_1 = require_scheduler();
      var observable_1 = require_observable();
      var unsubscribe_1 = require_unsubscribe();
      function scan(accumulator, seed) {
        return (observable) => {
          return new observable_1.default((observer) => {
            let accumulated;
            let index = 0;
            const scheduler = new _scheduler_1.AsyncSerialScheduler(observer);
            const subscription = observable.subscribe({
              complete() {
                scheduler.complete();
              },
              error(error) {
                scheduler.error(error);
              },
              next(value) {
                scheduler.schedule((next) => __awaiter(this, void 0, void 0, function* () {
                  const prevAcc = index === 0 ? typeof seed === "undefined" ? value : seed : accumulated;
                  accumulated = yield accumulator(prevAcc, value, index++);
                  next(accumulated);
                }));
              }
            });
            return () => unsubscribe_1.default(subscription);
          });
        };
      }
      exports.default = scan;
    }
  });

  // node_modules/observable-fns/dist/index.js
  var require_dist = __commonJS({
    "node_modules/observable-fns/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.unsubscribe = exports.Subject = exports.scan = exports.Observable = exports.multicast = exports.merge = exports.map = exports.interval = exports.flatMap = exports.filter = void 0;
      var filter_1 = require_filter();
      Object.defineProperty(exports, "filter", { enumerable: true, get: function() {
        return filter_1.default;
      } });
      var flatMap_1 = require_flatMap();
      Object.defineProperty(exports, "flatMap", { enumerable: true, get: function() {
        return flatMap_1.default;
      } });
      var interval_1 = require_interval();
      Object.defineProperty(exports, "interval", { enumerable: true, get: function() {
        return interval_1.default;
      } });
      var map_1 = require_map();
      Object.defineProperty(exports, "map", { enumerable: true, get: function() {
        return map_1.default;
      } });
      var merge_1 = require_merge();
      Object.defineProperty(exports, "merge", { enumerable: true, get: function() {
        return merge_1.default;
      } });
      var multicast_1 = require_multicast();
      Object.defineProperty(exports, "multicast", { enumerable: true, get: function() {
        return multicast_1.default;
      } });
      var observable_1 = require_observable();
      Object.defineProperty(exports, "Observable", { enumerable: true, get: function() {
        return observable_1.default;
      } });
      var scan_1 = require_scan();
      Object.defineProperty(exports, "scan", { enumerable: true, get: function() {
        return scan_1.default;
      } });
      var subject_1 = require_subject();
      Object.defineProperty(exports, "Subject", { enumerable: true, get: function() {
        return subject_1.default;
      } });
      var unsubscribe_1 = require_unsubscribe();
      Object.defineProperty(exports, "unsubscribe", { enumerable: true, get: function() {
        return unsubscribe_1.default;
      } });
    }
  });

  // node_modules/observable-fns/index.js
  var require_observable_fns = __commonJS({
    "node_modules/observable-fns/index.js"(exports, module) {
      module.exports = require_dist();
    }
  });

  // node_modules/threads/dist/ponyfills.js
  var require_ponyfills = __commonJS({
    "node_modules/threads/dist/ponyfills.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.allSettled = void 0;
      function allSettled(values) {
        return Promise.all(values.map((item) => {
          const onFulfill = (value) => {
            return { status: "fulfilled", value };
          };
          const onReject = (reason) => {
            return { status: "rejected", reason };
          };
          const itemPromise = Promise.resolve(item);
          try {
            return itemPromise.then(onFulfill, onReject);
          } catch (error) {
            return Promise.reject(error);
          }
        }));
      }
      exports.allSettled = allSettled;
    }
  });

  // node_modules/threads/dist/master/pool-types.js
  var require_pool_types = __commonJS({
    "node_modules/threads/dist/master/pool-types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PoolEventType = void 0;
      var PoolEventType;
      (function(PoolEventType2) {
        PoolEventType2["initialized"] = "initialized";
        PoolEventType2["taskCanceled"] = "taskCanceled";
        PoolEventType2["taskCompleted"] = "taskCompleted";
        PoolEventType2["taskFailed"] = "taskFailed";
        PoolEventType2["taskQueued"] = "taskQueued";
        PoolEventType2["taskQueueDrained"] = "taskQueueDrained";
        PoolEventType2["taskStart"] = "taskStart";
        PoolEventType2["terminated"] = "terminated";
      })(PoolEventType = exports.PoolEventType || (exports.PoolEventType = {}));
    }
  });

  // node_modules/threads/dist/symbols.js
  var require_symbols3 = __commonJS({
    "node_modules/threads/dist/symbols.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$worker = exports.$transferable = exports.$terminate = exports.$events = exports.$errors = void 0;
      exports.$errors = Symbol("thread.errors");
      exports.$events = Symbol("thread.events");
      exports.$terminate = Symbol("thread.terminate");
      exports.$transferable = Symbol("thread.transferable");
      exports.$worker = Symbol("thread.worker");
    }
  });

  // node_modules/threads/dist/master/thread.js
  var require_thread = __commonJS({
    "node_modules/threads/dist/master/thread.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Thread = void 0;
      var symbols_1 = require_symbols3();
      function fail(message) {
        throw Error(message);
      }
      exports.Thread = {
        errors(thread) {
          return thread[symbols_1.$errors] || fail("Error observable not found. Make sure to pass a thread instance as returned by the spawn() promise.");
        },
        events(thread) {
          return thread[symbols_1.$events] || fail("Events observable not found. Make sure to pass a thread instance as returned by the spawn() promise.");
        },
        terminate(thread) {
          return thread[symbols_1.$terminate]();
        }
      };
    }
  });

  // node_modules/threads/dist/master/pool.js
  var require_pool = __commonJS({
    "node_modules/threads/dist/master/pool.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e2) {
              reject(e2);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e2) {
              reject(e2);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Pool = exports.Thread = exports.PoolEventType = void 0;
      var debug_1 = __importDefault(require_browser());
      var observable_fns_1 = require_observable_fns();
      var ponyfills_1 = require_ponyfills();
      var implementation_1 = require_implementation_browser();
      var pool_types_1 = require_pool_types();
      Object.defineProperty(exports, "PoolEventType", { enumerable: true, get: function() {
        return pool_types_1.PoolEventType;
      } });
      var thread_1 = require_thread();
      Object.defineProperty(exports, "Thread", { enumerable: true, get: function() {
        return thread_1.Thread;
      } });
      var nextPoolID = 1;
      function createArray(size) {
        const array = [];
        for (let index = 0; index < size; index++) {
          array.push(index);
        }
        return array;
      }
      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      function flatMap(array, mapper) {
        return array.reduce((flattened, element) => [...flattened, ...mapper(element)], []);
      }
      function slugify(text) {
        return text.replace(/\W/g, " ").trim().replace(/\s+/g, "-");
      }
      function spawnWorkers(spawnWorker, count) {
        return createArray(count).map(() => ({
          init: spawnWorker(),
          runningTasks: []
        }));
      }
      var WorkerPool = class {
        constructor(spawnWorker, optionsOrSize) {
          this.eventSubject = new observable_fns_1.Subject();
          this.initErrors = [];
          this.isClosing = false;
          this.nextTaskID = 1;
          this.taskQueue = [];
          const options = typeof optionsOrSize === "number" ? { size: optionsOrSize } : optionsOrSize || {};
          const { size = implementation_1.defaultPoolSize } = options;
          this.debug = debug_1.default(`threads:pool:${slugify(options.name || String(nextPoolID++))}`);
          this.options = options;
          this.workers = spawnWorkers(spawnWorker, size);
          this.eventObservable = observable_fns_1.multicast(observable_fns_1.Observable.from(this.eventSubject));
          Promise.all(this.workers.map((worker) => worker.init)).then(() => this.eventSubject.next({
            type: pool_types_1.PoolEventType.initialized,
            size: this.workers.length
          }), (error) => {
            this.debug("Error while initializing pool worker:", error);
            this.eventSubject.error(error);
            this.initErrors.push(error);
          });
        }
        findIdlingWorker() {
          const { concurrency = 1 } = this.options;
          return this.workers.find((worker) => worker.runningTasks.length < concurrency);
        }
        runPoolTask(worker, task) {
          return __awaiter(this, void 0, void 0, function* () {
            const workerID = this.workers.indexOf(worker) + 1;
            this.debug(`Running task #${task.id} on worker #${workerID}...`);
            this.eventSubject.next({
              type: pool_types_1.PoolEventType.taskStart,
              taskID: task.id,
              workerID
            });
            try {
              const returnValue = yield task.run(yield worker.init);
              this.debug(`Task #${task.id} completed successfully`);
              this.eventSubject.next({
                type: pool_types_1.PoolEventType.taskCompleted,
                returnValue,
                taskID: task.id,
                workerID
              });
            } catch (error) {
              this.debug(`Task #${task.id} failed`);
              this.eventSubject.next({
                type: pool_types_1.PoolEventType.taskFailed,
                taskID: task.id,
                error,
                workerID
              });
            }
          });
        }
        run(worker, task) {
          return __awaiter(this, void 0, void 0, function* () {
            const runPromise = (() => __awaiter(this, void 0, void 0, function* () {
              const removeTaskFromWorkersRunningTasks = () => {
                worker.runningTasks = worker.runningTasks.filter((someRunPromise) => someRunPromise !== runPromise);
              };
              yield delay(0);
              try {
                yield this.runPoolTask(worker, task);
              } finally {
                removeTaskFromWorkersRunningTasks();
                if (!this.isClosing) {
                  this.scheduleWork();
                }
              }
            }))();
            worker.runningTasks.push(runPromise);
          });
        }
        scheduleWork() {
          this.debug(`Attempt de-queueing a task in order to run it...`);
          const availableWorker = this.findIdlingWorker();
          if (!availableWorker)
            return;
          const nextTask = this.taskQueue.shift();
          if (!nextTask) {
            this.debug(`Task queue is empty`);
            this.eventSubject.next({ type: pool_types_1.PoolEventType.taskQueueDrained });
            return;
          }
          this.run(availableWorker, nextTask);
        }
        taskCompletion(taskID) {
          return new Promise((resolve, reject) => {
            const eventSubscription = this.events().subscribe((event) => {
              if (event.type === pool_types_1.PoolEventType.taskCompleted && event.taskID === taskID) {
                eventSubscription.unsubscribe();
                resolve(event.returnValue);
              } else if (event.type === pool_types_1.PoolEventType.taskFailed && event.taskID === taskID) {
                eventSubscription.unsubscribe();
                reject(event.error);
              } else if (event.type === pool_types_1.PoolEventType.terminated) {
                eventSubscription.unsubscribe();
                reject(Error("Pool has been terminated before task was run."));
              }
            });
          });
        }
        settled(allowResolvingImmediately = false) {
          return __awaiter(this, void 0, void 0, function* () {
            const getCurrentlyRunningTasks = () => flatMap(this.workers, (worker) => worker.runningTasks);
            const taskFailures = [];
            const failureSubscription = this.eventObservable.subscribe((event) => {
              if (event.type === pool_types_1.PoolEventType.taskFailed) {
                taskFailures.push(event.error);
              }
            });
            if (this.initErrors.length > 0) {
              return Promise.reject(this.initErrors[0]);
            }
            if (allowResolvingImmediately && this.taskQueue.length === 0) {
              yield ponyfills_1.allSettled(getCurrentlyRunningTasks());
              return taskFailures;
            }
            yield new Promise((resolve, reject) => {
              const subscription = this.eventObservable.subscribe({
                next(event) {
                  if (event.type === pool_types_1.PoolEventType.taskQueueDrained) {
                    subscription.unsubscribe();
                    resolve(void 0);
                  }
                },
                error: reject
              });
            });
            yield ponyfills_1.allSettled(getCurrentlyRunningTasks());
            failureSubscription.unsubscribe();
            return taskFailures;
          });
        }
        completed(allowResolvingImmediately = false) {
          return __awaiter(this, void 0, void 0, function* () {
            const settlementPromise = this.settled(allowResolvingImmediately);
            const earlyExitPromise = new Promise((resolve, reject) => {
              const subscription = this.eventObservable.subscribe({
                next(event) {
                  if (event.type === pool_types_1.PoolEventType.taskQueueDrained) {
                    subscription.unsubscribe();
                    resolve(settlementPromise);
                  } else if (event.type === pool_types_1.PoolEventType.taskFailed) {
                    subscription.unsubscribe();
                    reject(event.error);
                  }
                },
                error: reject
              });
            });
            const errors = yield Promise.race([
              settlementPromise,
              earlyExitPromise
            ]);
            if (errors.length > 0) {
              throw errors[0];
            }
          });
        }
        events() {
          return this.eventObservable;
        }
        queue(taskFunction) {
          const { maxQueuedJobs = Infinity } = this.options;
          if (this.isClosing) {
            throw Error(`Cannot schedule pool tasks after terminate() has been called.`);
          }
          if (this.initErrors.length > 0) {
            throw this.initErrors[0];
          }
          const taskID = this.nextTaskID++;
          const taskCompletion = this.taskCompletion(taskID);
          taskCompletion.catch((error) => {
            this.debug(`Task #${taskID} errored:`, error);
          });
          const task = {
            id: taskID,
            run: taskFunction,
            cancel: () => {
              if (this.taskQueue.indexOf(task) === -1)
                return;
              this.taskQueue = this.taskQueue.filter((someTask) => someTask !== task);
              this.eventSubject.next({
                type: pool_types_1.PoolEventType.taskCanceled,
                taskID: task.id
              });
            },
            then: taskCompletion.then.bind(taskCompletion)
          };
          if (this.taskQueue.length >= maxQueuedJobs) {
            throw Error("Maximum number of pool tasks queued. Refusing to queue another one.\nThis usually happens for one of two reasons: We are either at peak workload right now or some tasks just won't finish, thus blocking the pool.");
          }
          this.debug(`Queueing task #${task.id}...`);
          this.taskQueue.push(task);
          this.eventSubject.next({
            type: pool_types_1.PoolEventType.taskQueued,
            taskID: task.id
          });
          this.scheduleWork();
          return task;
        }
        terminate(force) {
          return __awaiter(this, void 0, void 0, function* () {
            this.isClosing = true;
            if (!force) {
              yield this.completed(true);
            }
            this.eventSubject.next({
              type: pool_types_1.PoolEventType.terminated,
              remainingQueue: [...this.taskQueue]
            });
            this.eventSubject.complete();
            yield Promise.all(this.workers.map((worker) => __awaiter(this, void 0, void 0, function* () {
              return thread_1.Thread.terminate(yield worker.init);
            })));
          });
        }
      };
      WorkerPool.EventType = pool_types_1.PoolEventType;
      function PoolConstructor(spawnWorker, optionsOrSize) {
        return new WorkerPool(spawnWorker, optionsOrSize);
      }
      PoolConstructor.EventType = pool_types_1.PoolEventType;
      exports.Pool = PoolConstructor;
    }
  });

  // node_modules/threads/dist/promise.js
  var require_promise = __commonJS({
    "node_modules/threads/dist/promise.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createPromiseWithResolver = void 0;
      var doNothing = () => void 0;
      function createPromiseWithResolver() {
        let alreadyResolved = false;
        let resolvedTo;
        let resolver = doNothing;
        const promise = new Promise((resolve) => {
          if (alreadyResolved) {
            resolve(resolvedTo);
          } else {
            resolver = resolve;
          }
        });
        const exposedResolver = (value) => {
          alreadyResolved = true;
          resolvedTo = value;
          resolver(resolvedTo);
        };
        return [promise, exposedResolver];
      }
      exports.createPromiseWithResolver = createPromiseWithResolver;
    }
  });

  // node_modules/threads/dist/types/master.js
  var require_master = __commonJS({
    "node_modules/threads/dist/types/master.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WorkerEventType = void 0;
      var symbols_1 = require_symbols3();
      var WorkerEventType;
      (function(WorkerEventType2) {
        WorkerEventType2["internalError"] = "internalError";
        WorkerEventType2["message"] = "message";
        WorkerEventType2["termination"] = "termination";
      })(WorkerEventType = exports.WorkerEventType || (exports.WorkerEventType = {}));
    }
  });

  // node_modules/threads/dist/observable-promise.js
  var require_observable_promise = __commonJS({
    "node_modules/threads/dist/observable-promise.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ObservablePromise = void 0;
      var observable_fns_1 = require_observable_fns();
      var doNothing = () => void 0;
      var returnInput = (input) => input;
      var runDeferred = (fn) => Promise.resolve().then(fn);
      function fail(error) {
        throw error;
      }
      function isThenable(thing) {
        return thing && typeof thing.then === "function";
      }
      var ObservablePromise = class extends observable_fns_1.Observable {
        constructor(init) {
          super((originalObserver) => {
            const self2 = this;
            const observer = Object.assign(Object.assign({}, originalObserver), {
              complete() {
                originalObserver.complete();
                self2.onCompletion();
              },
              error(error) {
                originalObserver.error(error);
                self2.onError(error);
              },
              next(value) {
                originalObserver.next(value);
                self2.onNext(value);
              }
            });
            try {
              this.initHasRun = true;
              return init(observer);
            } catch (error) {
              observer.error(error);
            }
          });
          this.initHasRun = false;
          this.fulfillmentCallbacks = [];
          this.rejectionCallbacks = [];
          this.firstValueSet = false;
          this.state = "pending";
        }
        onNext(value) {
          if (!this.firstValueSet) {
            this.firstValue = value;
            this.firstValueSet = true;
          }
        }
        onError(error) {
          this.state = "rejected";
          this.rejection = error;
          for (const onRejected of this.rejectionCallbacks) {
            runDeferred(() => onRejected(error));
          }
        }
        onCompletion() {
          this.state = "fulfilled";
          for (const onFulfilled of this.fulfillmentCallbacks) {
            runDeferred(() => onFulfilled(this.firstValue));
          }
        }
        then(onFulfilledRaw, onRejectedRaw) {
          const onFulfilled = onFulfilledRaw || returnInput;
          const onRejected = onRejectedRaw || fail;
          let onRejectedCalled = false;
          return new Promise((resolve, reject) => {
            const rejectionCallback = (error) => {
              if (onRejectedCalled)
                return;
              onRejectedCalled = true;
              try {
                resolve(onRejected(error));
              } catch (anotherError) {
                reject(anotherError);
              }
            };
            const fulfillmentCallback = (value) => {
              try {
                resolve(onFulfilled(value));
              } catch (error) {
                rejectionCallback(error);
              }
            };
            if (!this.initHasRun) {
              this.subscribe({ error: rejectionCallback });
            }
            if (this.state === "fulfilled") {
              return resolve(onFulfilled(this.firstValue));
            }
            if (this.state === "rejected") {
              onRejectedCalled = true;
              return resolve(onRejected(this.rejection));
            }
            this.fulfillmentCallbacks.push(fulfillmentCallback);
            this.rejectionCallbacks.push(rejectionCallback);
          });
        }
        catch(onRejected) {
          return this.then(void 0, onRejected);
        }
        finally(onCompleted) {
          const handler = onCompleted || doNothing;
          return this.then((value) => {
            handler();
            return value;
          }, () => handler());
        }
        static from(thing) {
          if (isThenable(thing)) {
            return new ObservablePromise((observer) => {
              const onFulfilled = (value) => {
                observer.next(value);
                observer.complete();
              };
              const onRejected = (error) => {
                observer.error(error);
              };
              thing.then(onFulfilled, onRejected);
            });
          } else {
            return super.from(thing);
          }
        }
      };
      exports.ObservablePromise = ObservablePromise;
    }
  });

  // node_modules/threads/dist/transferable.js
  var require_transferable = __commonJS({
    "node_modules/threads/dist/transferable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Transfer = exports.isTransferDescriptor = void 0;
      var symbols_1 = require_symbols3();
      function isTransferable(thing) {
        if (!thing || typeof thing !== "object")
          return false;
        return true;
      }
      function isTransferDescriptor(thing) {
        return thing && typeof thing === "object" && thing[symbols_1.$transferable];
      }
      exports.isTransferDescriptor = isTransferDescriptor;
      function Transfer2(payload, transferables) {
        if (!transferables) {
          if (!isTransferable(payload))
            throw Error();
          transferables = [payload];
        }
        return {
          [symbols_1.$transferable]: true,
          send: payload,
          transferables
        };
      }
      exports.Transfer = Transfer2;
    }
  });

  // node_modules/threads/dist/types/messages.js
  var require_messages = __commonJS({
    "node_modules/threads/dist/types/messages.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WorkerMessageType = exports.MasterMessageType = void 0;
      var MasterMessageType;
      (function(MasterMessageType2) {
        MasterMessageType2["cancel"] = "cancel";
        MasterMessageType2["run"] = "run";
      })(MasterMessageType = exports.MasterMessageType || (exports.MasterMessageType = {}));
      var WorkerMessageType;
      (function(WorkerMessageType2) {
        WorkerMessageType2["error"] = "error";
        WorkerMessageType2["init"] = "init";
        WorkerMessageType2["result"] = "result";
        WorkerMessageType2["running"] = "running";
        WorkerMessageType2["uncaughtError"] = "uncaughtError";
      })(WorkerMessageType = exports.WorkerMessageType || (exports.WorkerMessageType = {}));
    }
  });

  // node_modules/threads/dist/master/invocation-proxy.js
  var require_invocation_proxy = __commonJS({
    "node_modules/threads/dist/master/invocation-proxy.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createProxyModule = exports.createProxyFunction = void 0;
      var debug_1 = __importDefault(require_browser());
      var observable_fns_1 = require_observable_fns();
      var common_1 = require_common();
      var observable_promise_1 = require_observable_promise();
      var transferable_1 = require_transferable();
      var messages_1 = require_messages();
      var debugMessages = debug_1.default("threads:master:messages");
      var nextJobUID = 1;
      var dedupe = (array) => Array.from(new Set(array));
      var isJobErrorMessage = (data) => data && data.type === messages_1.WorkerMessageType.error;
      var isJobResultMessage = (data) => data && data.type === messages_1.WorkerMessageType.result;
      var isJobStartMessage = (data) => data && data.type === messages_1.WorkerMessageType.running;
      function createObservableForJob(worker, jobUID) {
        return new observable_fns_1.Observable((observer) => {
          let asyncType;
          const messageHandler = (event) => {
            debugMessages("Message from worker:", event.data);
            if (!event.data || event.data.uid !== jobUID)
              return;
            if (isJobStartMessage(event.data)) {
              asyncType = event.data.resultType;
            } else if (isJobResultMessage(event.data)) {
              if (asyncType === "promise") {
                if (typeof event.data.payload !== "undefined") {
                  observer.next(common_1.deserialize(event.data.payload));
                }
                observer.complete();
                worker.removeEventListener("message", messageHandler);
              } else {
                if (event.data.payload) {
                  observer.next(common_1.deserialize(event.data.payload));
                }
                if (event.data.complete) {
                  observer.complete();
                  worker.removeEventListener("message", messageHandler);
                }
              }
            } else if (isJobErrorMessage(event.data)) {
              const error = common_1.deserialize(event.data.error);
              if (asyncType === "promise" || !asyncType) {
                observer.error(error);
              } else {
                observer.error(error);
              }
              worker.removeEventListener("message", messageHandler);
            }
          };
          worker.addEventListener("message", messageHandler);
          return () => {
            if (asyncType === "observable" || !asyncType) {
              const cancelMessage = {
                type: messages_1.MasterMessageType.cancel,
                uid: jobUID
              };
              worker.postMessage(cancelMessage);
            }
            worker.removeEventListener("message", messageHandler);
          };
        });
      }
      function prepareArguments(rawArgs) {
        if (rawArgs.length === 0) {
          return {
            args: [],
            transferables: []
          };
        }
        const args = [];
        const transferables = [];
        for (const arg of rawArgs) {
          if (transferable_1.isTransferDescriptor(arg)) {
            args.push(common_1.serialize(arg.send));
            transferables.push(...arg.transferables);
          } else {
            args.push(common_1.serialize(arg));
          }
        }
        return {
          args,
          transferables: transferables.length === 0 ? transferables : dedupe(transferables)
        };
      }
      function createProxyFunction(worker, method) {
        return (...rawArgs) => {
          const uid = nextJobUID++;
          const { args, transferables } = prepareArguments(rawArgs);
          const runMessage = {
            type: messages_1.MasterMessageType.run,
            uid,
            method,
            args
          };
          debugMessages("Sending command to run function to worker:", runMessage);
          try {
            worker.postMessage(runMessage, transferables);
          } catch (error) {
            return observable_promise_1.ObservablePromise.from(Promise.reject(error));
          }
          return observable_promise_1.ObservablePromise.from(observable_fns_1.multicast(createObservableForJob(worker, uid)));
        };
      }
      exports.createProxyFunction = createProxyFunction;
      function createProxyModule(worker, methodNames) {
        const proxy = {};
        for (const methodName of methodNames) {
          proxy[methodName] = createProxyFunction(worker, methodName);
        }
        return proxy;
      }
      exports.createProxyModule = createProxyModule;
    }
  });

  // node_modules/threads/dist/master/spawn.js
  var require_spawn = __commonJS({
    "node_modules/threads/dist/master/spawn.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e2) {
              reject(e2);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e2) {
              reject(e2);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.spawn = void 0;
      var debug_1 = __importDefault(require_browser());
      var observable_fns_1 = require_observable_fns();
      var common_1 = require_common();
      var promise_1 = require_promise();
      var symbols_1 = require_symbols3();
      var master_1 = require_master();
      var invocation_proxy_1 = require_invocation_proxy();
      var debugMessages = debug_1.default("threads:master:messages");
      var debugSpawn = debug_1.default("threads:master:spawn");
      var debugThreadUtils = debug_1.default("threads:master:thread-utils");
      var isInitMessage = (data) => data && data.type === "init";
      var isUncaughtErrorMessage = (data) => data && data.type === "uncaughtError";
      var initMessageTimeout = typeof process !== "undefined" && process.env.THREADS_WORKER_INIT_TIMEOUT ? Number.parseInt(process.env.THREADS_WORKER_INIT_TIMEOUT, 10) : 1e4;
      function withTimeout(promise, timeoutInMs, errorMessage) {
        return __awaiter(this, void 0, void 0, function* () {
          let timeoutHandle;
          const timeout = new Promise((resolve, reject) => {
            timeoutHandle = setTimeout(() => reject(Error(errorMessage)), timeoutInMs);
          });
          const result = yield Promise.race([
            promise,
            timeout
          ]);
          clearTimeout(timeoutHandle);
          return result;
        });
      }
      function receiveInitMessage(worker) {
        return new Promise((resolve, reject) => {
          const messageHandler = (event) => {
            debugMessages("Message from worker before finishing initialization:", event.data);
            if (isInitMessage(event.data)) {
              worker.removeEventListener("message", messageHandler);
              resolve(event.data);
            } else if (isUncaughtErrorMessage(event.data)) {
              worker.removeEventListener("message", messageHandler);
              reject(common_1.deserialize(event.data.error));
            }
          };
          worker.addEventListener("message", messageHandler);
        });
      }
      function createEventObservable(worker, workerTermination) {
        return new observable_fns_1.Observable((observer) => {
          const messageHandler = (messageEvent) => {
            const workerEvent = {
              type: master_1.WorkerEventType.message,
              data: messageEvent.data
            };
            observer.next(workerEvent);
          };
          const rejectionHandler = (errorEvent) => {
            debugThreadUtils("Unhandled promise rejection event in thread:", errorEvent);
            const workerEvent = {
              type: master_1.WorkerEventType.internalError,
              error: Error(errorEvent.reason)
            };
            observer.next(workerEvent);
          };
          worker.addEventListener("message", messageHandler);
          worker.addEventListener("unhandledrejection", rejectionHandler);
          workerTermination.then(() => {
            const terminationEvent = {
              type: master_1.WorkerEventType.termination
            };
            worker.removeEventListener("message", messageHandler);
            worker.removeEventListener("unhandledrejection", rejectionHandler);
            observer.next(terminationEvent);
            observer.complete();
          });
        });
      }
      function createTerminator(worker) {
        const [termination, resolver] = promise_1.createPromiseWithResolver();
        const terminate = () => __awaiter(this, void 0, void 0, function* () {
          debugThreadUtils("Terminating worker");
          yield worker.terminate();
          resolver();
        });
        return { terminate, termination };
      }
      function setPrivateThreadProps(raw, worker, workerEvents, terminate) {
        const workerErrors = workerEvents.filter((event) => event.type === master_1.WorkerEventType.internalError).map((errorEvent) => errorEvent.error);
        return Object.assign(raw, {
          [symbols_1.$errors]: workerErrors,
          [symbols_1.$events]: workerEvents,
          [symbols_1.$terminate]: terminate,
          [symbols_1.$worker]: worker
        });
      }
      function spawn2(worker, options) {
        return __awaiter(this, void 0, void 0, function* () {
          debugSpawn("Initializing new thread");
          const timeout = options && options.timeout ? options.timeout : initMessageTimeout;
          const initMessage = yield withTimeout(receiveInitMessage(worker), timeout, `Timeout: Did not receive an init message from worker after ${timeout}ms. Make sure the worker calls expose().`);
          const exposed = initMessage.exposed;
          const { termination, terminate } = createTerminator(worker);
          const events = createEventObservable(worker, termination);
          if (exposed.type === "function") {
            const proxy = invocation_proxy_1.createProxyFunction(worker);
            return setPrivateThreadProps(proxy, worker, events, terminate);
          } else if (exposed.type === "module") {
            const proxy = invocation_proxy_1.createProxyModule(worker, exposed.methods);
            return setPrivateThreadProps(proxy, worker, events, terminate);
          } else {
            const type = exposed.type;
            throw Error(`Worker init message states unexpected type of expose(): ${type}`);
          }
        });
      }
      exports.spawn = spawn2;
    }
  });

  // node_modules/threads/dist/master/index.js
  var require_master2 = __commonJS({
    "node_modules/threads/dist/master/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Worker = exports.BlobWorker = exports.isWorkerRuntime = exports.Thread = exports.spawn = exports.Pool = void 0;
      var implementation_1 = require_implementation_browser();
      Object.defineProperty(exports, "isWorkerRuntime", { enumerable: true, get: function() {
        return implementation_1.isWorkerRuntime;
      } });
      var pool_1 = require_pool();
      Object.defineProperty(exports, "Pool", { enumerable: true, get: function() {
        return pool_1.Pool;
      } });
      var spawn_1 = require_spawn();
      Object.defineProperty(exports, "spawn", { enumerable: true, get: function() {
        return spawn_1.spawn;
      } });
      var thread_1 = require_thread();
      Object.defineProperty(exports, "Thread", { enumerable: true, get: function() {
        return thread_1.Thread;
      } });
      exports.BlobWorker = implementation_1.getWorkerImplementation().blob;
      exports.Worker = implementation_1.getWorkerImplementation().default;
    }
  });

  // node_modules/is-observable/index.js
  var require_is_observable = __commonJS({
    "node_modules/is-observable/index.js"(exports, module) {
      "use strict";
      module.exports = (value) => {
        if (!value) {
          return false;
        }
        if (typeof Symbol.observable === "symbol" && typeof value[Symbol.observable] === "function") {
          return value === value[Symbol.observable]();
        }
        if (typeof value["@@observable"] === "function") {
          return value === value["@@observable"]();
        }
        return false;
      };
    }
  });

  // node_modules/threads/dist/worker/implementation.browser.js
  var require_implementation_browser2 = __commonJS({
    "node_modules/threads/dist/worker/implementation.browser.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var isWorkerRuntime = function isWorkerRuntime2() {
        const isWindowContext = typeof self !== "undefined" && typeof Window !== "undefined" && self instanceof Window;
        return typeof self !== "undefined" && self.postMessage && !isWindowContext ? true : false;
      };
      var postMessageToMaster = function postMessageToMaster2(data, transferList) {
        self.postMessage(data, transferList);
      };
      var subscribeToMasterMessages = function subscribeToMasterMessages2(onMessage) {
        const messageHandler = (messageEvent) => {
          onMessage(messageEvent.data);
        };
        const unsubscribe = () => {
          self.removeEventListener("message", messageHandler);
        };
        self.addEventListener("message", messageHandler);
        return unsubscribe;
      };
      exports.default = {
        isWorkerRuntime,
        postMessageToMaster,
        subscribeToMasterMessages
      };
    }
  });

  // node_modules/threads/dist/worker/index.js
  var require_worker = __commonJS({
    "node_modules/threads/dist/worker/index.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e2) {
              reject(e2);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e2) {
              reject(e2);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.expose = exports.isWorkerRuntime = exports.Transfer = exports.registerSerializer = void 0;
      var is_observable_1 = __importDefault(require_is_observable());
      var common_1 = require_common();
      var transferable_1 = require_transferable();
      var messages_1 = require_messages();
      var implementation_1 = __importDefault(require_implementation_browser2());
      var common_2 = require_common();
      Object.defineProperty(exports, "registerSerializer", { enumerable: true, get: function() {
        return common_2.registerSerializer;
      } });
      var transferable_2 = require_transferable();
      Object.defineProperty(exports, "Transfer", { enumerable: true, get: function() {
        return transferable_2.Transfer;
      } });
      exports.isWorkerRuntime = implementation_1.default.isWorkerRuntime;
      var exposeCalled = false;
      var activeSubscriptions = new Map();
      var isMasterJobCancelMessage = (thing) => thing && thing.type === messages_1.MasterMessageType.cancel;
      var isMasterJobRunMessage = (thing) => thing && thing.type === messages_1.MasterMessageType.run;
      var isObservable = (thing) => is_observable_1.default(thing) || isZenObservable(thing);
      function isZenObservable(thing) {
        return thing && typeof thing === "object" && typeof thing.subscribe === "function";
      }
      function deconstructTransfer(thing) {
        return transferable_1.isTransferDescriptor(thing) ? { payload: thing.send, transferables: thing.transferables } : { payload: thing, transferables: void 0 };
      }
      function postFunctionInitMessage() {
        const initMessage = {
          type: messages_1.WorkerMessageType.init,
          exposed: {
            type: "function"
          }
        };
        implementation_1.default.postMessageToMaster(initMessage);
      }
      function postModuleInitMessage(methodNames) {
        const initMessage = {
          type: messages_1.WorkerMessageType.init,
          exposed: {
            type: "module",
            methods: methodNames
          }
        };
        implementation_1.default.postMessageToMaster(initMessage);
      }
      function postJobErrorMessage(uid, rawError) {
        const { payload: error, transferables } = deconstructTransfer(rawError);
        const errorMessage = {
          type: messages_1.WorkerMessageType.error,
          uid,
          error: common_1.serialize(error)
        };
        implementation_1.default.postMessageToMaster(errorMessage, transferables);
      }
      function postJobResultMessage(uid, completed, resultValue) {
        const { payload, transferables } = deconstructTransfer(resultValue);
        const resultMessage = {
          type: messages_1.WorkerMessageType.result,
          uid,
          complete: completed ? true : void 0,
          payload
        };
        implementation_1.default.postMessageToMaster(resultMessage, transferables);
      }
      function postJobStartMessage(uid, resultType) {
        const startMessage = {
          type: messages_1.WorkerMessageType.running,
          uid,
          resultType
        };
        implementation_1.default.postMessageToMaster(startMessage);
      }
      function postUncaughtErrorMessage(error) {
        try {
          const errorMessage = {
            type: messages_1.WorkerMessageType.uncaughtError,
            error: common_1.serialize(error)
          };
          implementation_1.default.postMessageToMaster(errorMessage);
        } catch (subError) {
          console.error("Not reporting uncaught error back to master thread as it occured while reporting an uncaught error already.\nLatest error:", subError, "\nOriginal error:", error);
        }
      }
      function runFunction(jobUID, fn, args) {
        return __awaiter(this, void 0, void 0, function* () {
          let syncResult;
          try {
            syncResult = fn(...args);
          } catch (error) {
            return postJobErrorMessage(jobUID, error);
          }
          const resultType = isObservable(syncResult) ? "observable" : "promise";
          postJobStartMessage(jobUID, resultType);
          if (isObservable(syncResult)) {
            const subscription = syncResult.subscribe((value) => postJobResultMessage(jobUID, false, common_1.serialize(value)), (error) => {
              postJobErrorMessage(jobUID, common_1.serialize(error));
              activeSubscriptions.delete(jobUID);
            }, () => {
              postJobResultMessage(jobUID, true);
              activeSubscriptions.delete(jobUID);
            });
            activeSubscriptions.set(jobUID, subscription);
          } else {
            try {
              const result = yield syncResult;
              postJobResultMessage(jobUID, true, common_1.serialize(result));
            } catch (error) {
              postJobErrorMessage(jobUID, common_1.serialize(error));
            }
          }
        });
      }
      function expose(exposed) {
        if (!implementation_1.default.isWorkerRuntime()) {
          throw Error("expose() called in the master thread.");
        }
        if (exposeCalled) {
          throw Error("expose() called more than once. This is not possible. Pass an object to expose() if you want to expose multiple functions.");
        }
        exposeCalled = true;
        if (typeof exposed === "function") {
          implementation_1.default.subscribeToMasterMessages((messageData) => {
            if (isMasterJobRunMessage(messageData) && !messageData.method) {
              runFunction(messageData.uid, exposed, messageData.args.map(common_1.deserialize));
            }
          });
          postFunctionInitMessage();
        } else if (typeof exposed === "object" && exposed) {
          implementation_1.default.subscribeToMasterMessages((messageData) => {
            if (isMasterJobRunMessage(messageData) && messageData.method) {
              runFunction(messageData.uid, exposed[messageData.method], messageData.args.map(common_1.deserialize));
            }
          });
          const methodNames = Object.keys(exposed).filter((key) => typeof exposed[key] === "function");
          postModuleInitMessage(methodNames);
        } else {
          throw Error(`Invalid argument passed to expose(). Expected a function or an object, got: ${exposed}`);
        }
        implementation_1.default.subscribeToMasterMessages((messageData) => {
          if (isMasterJobCancelMessage(messageData)) {
            const jobUID = messageData.uid;
            const subscription = activeSubscriptions.get(jobUID);
            if (subscription) {
              subscription.unsubscribe();
              activeSubscriptions.delete(jobUID);
            }
          }
        });
      }
      exports.expose = expose;
      if (typeof self !== "undefined" && typeof self.addEventListener === "function" && implementation_1.default.isWorkerRuntime()) {
        self.addEventListener("error", (event) => {
          setTimeout(() => postUncaughtErrorMessage(event.error || event), 250);
        });
        self.addEventListener("unhandledrejection", (event) => {
          const error = event.reason;
          if (error && typeof error.message === "string") {
            setTimeout(() => postUncaughtErrorMessage(error), 250);
          }
        });
      }
      if (typeof process !== "undefined" && typeof process.on === "function" && implementation_1.default.isWorkerRuntime()) {
        process.on("uncaughtException", (error) => {
          setTimeout(() => postUncaughtErrorMessage(error), 250);
        });
        process.on("unhandledRejection", (error) => {
          if (error && typeof error.message === "string") {
            setTimeout(() => postUncaughtErrorMessage(error), 250);
          }
        });
      }
    }
  });

  // node_modules/threads/dist/index.js
  var require_dist2 = __commonJS({
    "node_modules/threads/dist/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Transfer = exports.DefaultSerializer = exports.expose = exports.registerSerializer = void 0;
      var common_1 = require_common();
      Object.defineProperty(exports, "registerSerializer", { enumerable: true, get: function() {
        return common_1.registerSerializer;
      } });
      __exportStar(require_master2(), exports);
      var index_1 = require_worker();
      Object.defineProperty(exports, "expose", { enumerable: true, get: function() {
        return index_1.expose;
      } });
      var serializers_1 = require_serializers();
      Object.defineProperty(exports, "DefaultSerializer", { enumerable: true, get: function() {
        return serializers_1.DefaultSerializer;
      } });
      var transferable_1 = require_transferable();
      Object.defineProperty(exports, "Transfer", { enumerable: true, get: function() {
        return transferable_1.Transfer;
      } });
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    LatLonBox: () => LatLonBox,
    NodeData: () => NodeData2,
    NodeHeader: () => NodeHeader,
    NodeManager: () => NodeManager
  });

  // src/controller/Resources.ts
  var import_pbf = __toModule(require_pbf());

  // src/proto/rocktree.ts
  var NodeKey = {
    read(pbf, end) {
      return pbf.readFields(NodeKey._readField, { path: "", epoch: 0 }, end);
    },
    _readField(tag, obj, pbf) {
      if (tag === 1)
        obj.path = pbf.readString();
      else if (tag === 2)
        obj.epoch = pbf.readVarint();
    },
    write(obj, pbf) {
      if (obj.path)
        pbf.writeStringField(1, obj.path);
      if (obj.epoch)
        pbf.writeVarintField(2, obj.epoch);
    }
  };
  var BulkMetadata = {
    read(pbf, end) {
      return pbf.readFields(BulkMetadata._readField, { node_metadata: [], head_node_key: null, head_node_center: [], meters_per_texel: [], default_imagery_epoch: 0, default_available_texture_formats: 0, default_available_view_dependent_textures: 0, default_available_view_dependent_texture_formats: 0 }, end);
    },
    _readField(tag, obj, pbf) {
      if (tag === 1)
        obj.node_metadata.push(NodeMetadata.read(pbf, pbf.readVarint() + pbf.pos));
      else if (tag === 2)
        obj.head_node_key = NodeKey.read(pbf, pbf.readVarint() + pbf.pos);
      else if (tag === 3)
        pbf.readPackedDouble(obj.head_node_center);
      else if (tag === 4)
        pbf.readPackedFloat(obj.meters_per_texel);
      else if (tag === 5)
        obj.default_imagery_epoch = pbf.readVarint();
      else if (tag === 6)
        obj.default_available_texture_formats = pbf.readVarint();
      else if (tag === 7)
        obj.default_available_view_dependent_textures = pbf.readVarint();
      else if (tag === 8)
        obj.default_available_view_dependent_texture_formats = pbf.readVarint();
    },
    write(obj, pbf) {
      if (obj.node_metadata)
        for (var i2 = 0; i2 < obj.node_metadata.length; i2++)
          pbf.writeMessage(1, NodeMetadata.write, obj.node_metadata[i2]);
      if (obj.head_node_key)
        pbf.writeMessage(2, NodeKey.write, obj.head_node_key);
      if (obj.head_node_center)
        pbf.writePackedDouble(3, obj.head_node_center);
      if (obj.meters_per_texel)
        pbf.writePackedFloat(4, obj.meters_per_texel);
      if (obj.default_imagery_epoch)
        pbf.writeVarintField(5, obj.default_imagery_epoch);
      if (obj.default_available_texture_formats)
        pbf.writeVarintField(6, obj.default_available_texture_formats);
      if (obj.default_available_view_dependent_textures)
        pbf.writeVarintField(7, obj.default_available_view_dependent_textures);
      if (obj.default_available_view_dependent_texture_formats)
        pbf.writeVarintField(8, obj.default_available_view_dependent_texture_formats);
    }
  };
  var NodeMetadata = {
    read(pbf, end) {
      return pbf.readFields(NodeMetadata._readField, { path_and_flags: 0, epoch: 0, bulk_metadata_epoch: 0, oriented_bounding_box: null, meters_per_texel: 0, processing_oriented_bounding_box: [], imagery_epoch: 0, available_texture_formats: 0, available_view_dependent_textures: 0, available_view_dependent_texture_formats: 0 }, end);
    },
    _readField(tag, obj, pbf) {
      if (tag === 1)
        obj.path_and_flags = pbf.readVarint();
      else if (tag === 2)
        obj.epoch = pbf.readVarint();
      else if (tag === 5)
        obj.bulk_metadata_epoch = pbf.readVarint();
      else if (tag === 3)
        obj.oriented_bounding_box = pbf.readBytes();
      else if (tag === 4)
        obj.meters_per_texel = pbf.readFloat();
      else if (tag === 6)
        pbf.readPackedDouble(obj.processing_oriented_bounding_box);
      else if (tag === 7)
        obj.imagery_epoch = pbf.readVarint();
      else if (tag === 8)
        obj.available_texture_formats = pbf.readVarint();
      else if (tag === 9)
        obj.available_view_dependent_textures = pbf.readVarint();
      else if (tag === 10)
        obj.available_view_dependent_texture_formats = pbf.readVarint();
    },
    write(obj, pbf) {
      if (obj.path_and_flags)
        pbf.writeVarintField(1, obj.path_and_flags);
      if (obj.epoch)
        pbf.writeVarintField(2, obj.epoch);
      if (obj.bulk_metadata_epoch)
        pbf.writeVarintField(5, obj.bulk_metadata_epoch);
      if (obj.oriented_bounding_box)
        pbf.writeBytesField(3, obj.oriented_bounding_box);
      if (obj.meters_per_texel)
        pbf.writeFloatField(4, obj.meters_per_texel);
      if (obj.processing_oriented_bounding_box)
        pbf.writePackedDouble(6, obj.processing_oriented_bounding_box);
      if (obj.imagery_epoch)
        pbf.writeVarintField(7, obj.imagery_epoch);
      if (obj.available_texture_formats)
        pbf.writeVarintField(8, obj.available_texture_formats);
      if (obj.available_view_dependent_textures)
        pbf.writeVarintField(9, obj.available_view_dependent_textures);
      if (obj.available_view_dependent_texture_formats)
        pbf.writeVarintField(10, obj.available_view_dependent_texture_formats);
    },
    Flags: {
      "RICH3D_LEAF": {
        "value": 1,
        "options": {}
      },
      "RICH3D_NODATA": {
        "value": 2,
        "options": {}
      },
      "LEAF": {
        "value": 4,
        "options": {}
      },
      "NODATA": {
        "value": 8,
        "options": {}
      },
      "USE_IMAGERY_EPOCH": {
        "value": 16,
        "options": {}
      }
    }
  };
  var NodeData = {
    read(pbf, end) {
      return pbf.readFields(NodeData._readField, { matrix_globe_from_mesh: [], meshes: [], copyright_ids: [], node_key: null, kml_bounding_box: [], water_mesh: null, overlay_surface_meshes: [], for_normals: null }, end);
    },
    _readField(tag, obj, pbf) {
      if (tag === 1)
        pbf.readPackedDouble(obj.matrix_globe_from_mesh);
      else if (tag === 2)
        obj.meshes.push(Mesh.read(pbf, pbf.readVarint() + pbf.pos));
      else if (tag === 3)
        pbf.readPackedVarint(obj.copyright_ids);
      else if (tag === 4)
        obj.node_key = NodeKey.read(pbf, pbf.readVarint() + pbf.pos);
      else if (tag === 5)
        pbf.readPackedDouble(obj.kml_bounding_box);
      else if (tag === 6)
        obj.water_mesh = Mesh.read(pbf, pbf.readVarint() + pbf.pos);
      else if (tag === 7)
        obj.overlay_surface_meshes.push(Mesh.read(pbf, pbf.readVarint() + pbf.pos));
      else if (tag === 8)
        obj.for_normals = pbf.readBytes();
    },
    write(obj, pbf) {
      if (obj.matrix_globe_from_mesh)
        pbf.writePackedDouble(1, obj.matrix_globe_from_mesh);
      if (obj.meshes)
        for (var i2 = 0; i2 < obj.meshes.length; i2++)
          pbf.writeMessage(2, Mesh.write, obj.meshes[i2]);
      if (obj.copyright_ids)
        for (i2 = 0; i2 < obj.copyright_ids.length; i2++)
          pbf.writeVarintField(3, obj.copyright_ids[i2]);
      if (obj.node_key)
        pbf.writeMessage(4, NodeKey.write, obj.node_key);
      if (obj.kml_bounding_box)
        pbf.writePackedDouble(5, obj.kml_bounding_box);
      if (obj.water_mesh)
        pbf.writeMessage(6, Mesh.write, obj.water_mesh);
      if (obj.overlay_surface_meshes)
        for (i2 = 0; i2 < obj.overlay_surface_meshes.length; i2++)
          pbf.writeMessage(7, Mesh.write, obj.overlay_surface_meshes[i2]);
      if (obj.for_normals)
        pbf.writeBytesField(8, obj.for_normals);
    }
  };
  var Mesh = {
    read(pbf, end) {
      return pbf.readFields(Mesh._readField, { vertices: null, vertex_alphas: null, texture_coords: null, indices: null, octant_ranges: null, layer_counts: null, texture: [], texture_coordinates: null, uv_offset_and_scale: [], layer_and_octant_counts: null, normals: null, normals_dev: null, mesh_id: 0, skirt_flags: null }, end);
    },
    _readField(tag, obj, pbf) {
      if (tag === 1)
        obj.vertices = pbf.readBytes();
      else if (tag === 9)
        obj.vertex_alphas = pbf.readBytes();
      else if (tag === 2)
        obj.texture_coords = pbf.readBytes();
      else if (tag === 3)
        obj.indices = pbf.readBytes();
      else if (tag === 4)
        obj.octant_ranges = pbf.readBytes();
      else if (tag === 5)
        obj.layer_counts = pbf.readBytes();
      else if (tag === 6)
        obj.texture.push(Texture.read(pbf, pbf.readVarint() + pbf.pos));
      else if (tag === 7)
        obj.texture_coordinates = pbf.readBytes();
      else if (tag === 10)
        pbf.readPackedFloat(obj.uv_offset_and_scale);
      else if (tag === 8)
        obj.layer_and_octant_counts = pbf.readBytes();
      else if (tag === 11)
        obj.normals = pbf.readBytes();
      else if (tag === 16)
        obj.normals_dev = pbf.readBytes();
      else if (tag === 12)
        obj.mesh_id = pbf.readVarint();
      else if (tag === 13)
        obj.skirt_flags = pbf.readBytes();
    },
    write(obj, pbf) {
      if (obj.vertices)
        pbf.writeBytesField(1, obj.vertices);
      if (obj.vertex_alphas)
        pbf.writeBytesField(9, obj.vertex_alphas);
      if (obj.texture_coords)
        pbf.writeBytesField(2, obj.texture_coords);
      if (obj.indices)
        pbf.writeBytesField(3, obj.indices);
      if (obj.octant_ranges)
        pbf.writeBytesField(4, obj.octant_ranges);
      if (obj.layer_counts)
        pbf.writeBytesField(5, obj.layer_counts);
      if (obj.texture)
        for (var i2 = 0; i2 < obj.texture.length; i2++)
          pbf.writeMessage(6, Texture.write, obj.texture[i2]);
      if (obj.texture_coordinates)
        pbf.writeBytesField(7, obj.texture_coordinates);
      if (obj.uv_offset_and_scale)
        pbf.writePackedFloat(10, obj.uv_offset_and_scale);
      if (obj.layer_and_octant_counts)
        pbf.writeBytesField(8, obj.layer_and_octant_counts);
      if (obj.normals)
        pbf.writeBytesField(11, obj.normals);
      if (obj.normals_dev)
        pbf.writeBytesField(16, obj.normals_dev);
      if (obj.mesh_id)
        pbf.writeVarintField(12, obj.mesh_id);
      if (obj.skirt_flags)
        pbf.writeBytesField(13, obj.skirt_flags);
    },
    Layer: {
      "OVERGROUND": {
        "value": 0,
        "options": {}
      },
      "TERRAIN_BELOW_WATER": {
        "value": 1,
        "options": {}
      },
      "TERRAIN_ABOVE_WATER": {
        "value": 2,
        "options": {}
      },
      "TERRAIN_HIDDEN": {
        "value": 3,
        "options": {}
      },
      "WATER": {
        "value": 4,
        "options": {}
      },
      "WATER_SKIRTS": {
        "value": 5,
        "options": {}
      },
      "WATER_SKIRTS_INVERTED": {
        "value": 6,
        "options": {}
      },
      "OVERLAY_SURFACE": {
        "value": 7,
        "options": {}
      },
      "OVERLAY_SURFACE_SKIRTS": {
        "value": 8,
        "options": {}
      },
      "NUM_LAYERS": {
        "value": 9,
        "options": {}
      }
    },
    LayerMask: {
      "TERRAIN_WITH_OVERGROUND": {
        "value": 7,
        "options": {}
      },
      "TERRAIN_WITH_WATER": {
        "value": 28,
        "options": {}
      },
      "TERRAIN_WITHOUT_WATER": {
        "value": 14,
        "options": {}
      }
    }
  };
  var Texture = {
    read(pbf, end) {
      return pbf.readFields(Texture._readField, { data: [], format: 0, width: 256, height: 256, view_direction: 0, mesh_id: 0 }, end);
    },
    _readField(tag, obj, pbf) {
      if (tag === 1)
        obj.data.push(pbf.readBytes());
      else if (tag === 2)
        obj.format = pbf.readVarint();
      else if (tag === 3)
        obj.width = pbf.readVarint();
      else if (tag === 4)
        obj.height = pbf.readVarint();
      else if (tag === 5)
        obj.view_direction = pbf.readVarint();
      else if (tag === 6)
        obj.mesh_id = pbf.readVarint();
    },
    write(obj, pbf) {
      if (obj.data)
        for (var i2 = 0; i2 < obj.data.length; i2++)
          pbf.writeBytesField(1, obj.data[i2]);
      if (obj.format)
        pbf.writeVarintField(2, obj.format);
      if (obj.width != void 0 && obj.width !== 256)
        pbf.writeVarintField(3, obj.width);
      if (obj.height != void 0 && obj.height !== 256)
        pbf.writeVarintField(4, obj.height);
      if (obj.view_direction)
        pbf.writeVarintField(5, obj.view_direction);
      if (obj.mesh_id)
        pbf.writeVarintField(6, obj.mesh_id);
    },
    Format: {
      "JPG": {
        "value": 1,
        "options": {}
      },
      "DXT1": {
        "value": 2,
        "options": {}
      },
      "ETC1": {
        "value": 3,
        "options": {}
      },
      "PVRTC2": {
        "value": 4,
        "options": {}
      },
      "PVRTC4": {
        "value": 5,
        "options": {}
      },
      "CRN_DXT1": {
        "value": 6,
        "options": {}
      }
    },
    ViewDirection: {
      "NADIR": {
        "value": 0,
        "options": {}
      },
      "NORTH_45": {
        "value": 1,
        "options": {}
      },
      "EAST_45": {
        "value": 2,
        "options": {}
      },
      "SOUTH_45": {
        "value": 3,
        "options": {}
      },
      "WEST_45": {
        "value": 4,
        "options": {}
      }
    }
  };
  var PlanetoidMetadata = {
    read(pbf, end) {
      return pbf.readFields(PlanetoidMetadata._readField, { root_node_metadata: null, radius: 0, min_terrain_altitude: 0, max_terrain_altitude: 0 }, end);
    },
    _readField(tag, obj, pbf) {
      if (tag === 1)
        obj.root_node_metadata = NodeMetadata.read(pbf, pbf.readVarint() + pbf.pos);
      else if (tag === 2)
        obj.radius = pbf.readFloat();
      else if (tag === 3)
        obj.min_terrain_altitude = pbf.readFloat();
      else if (tag === 4)
        obj.max_terrain_altitude = pbf.readFloat();
    },
    write(obj, pbf) {
      if (obj.root_node_metadata)
        pbf.writeMessage(1, NodeMetadata.write, obj.root_node_metadata);
      if (obj.radius)
        pbf.writeFloatField(2, obj.radius);
      if (obj.min_terrain_altitude)
        pbf.writeFloatField(3, obj.min_terrain_altitude);
      if (obj.max_terrain_altitude)
        pbf.writeFloatField(4, obj.max_terrain_altitude);
    }
  };

  // src/utils/GetURL.ts
  function GetURL(url) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        fetch(url).then((response) => {
          if (!response.ok) {
            reject(url);
            return;
          }
          return response.arrayBuffer();
        }).then((buffer) => {
          resolve(buffer);
        }).catch((error) => {
          reject(error);
        });
      });
    });
  }

  // src/controller/Resources.ts
  var import_lru_map = __toModule(require_lru());

  // src/node/NodeState.ts
  var NodeState;
  (function(NodeState2) {
    NodeState2[NodeState2["PENDING"] = 0] = "PENDING";
    NodeState2[NodeState2["DOWNLOADED"] = 1] = "DOWNLOADED";
    NodeState2[NodeState2["DECODED"] = 2] = "DECODED";
    NodeState2[NodeState2["FAILED"] = 3] = "FAILED";
  })(NodeState || (NodeState = {}));

  // src/node/decoder/BufferGeometryUtils.ts
  var BufferGeometryUtils = class {
    static toTriangleStripDrawMode(indexes) {
      let numberOfTriangles = indexes.length - 2;
      let newIndices = new Uint16Array(numberOfTriangles * 3);
      for (let i2 = 0, j = 0; i2 < numberOfTriangles; i2++, j += 3) {
        if (i2 % 2 === 0) {
          newIndices[j] = indexes[i2];
          newIndices[j + 1] = indexes[i2 + 1];
          newIndices[j + 2] = indexes[i2 + 2];
        } else {
          newIndices[j] = indexes[i2 + 2];
          newIndices[j + 1] = indexes[i2 + 1];
          newIndices[j + 2] = indexes[i2];
        }
      }
      return newIndices;
    }
  };

  // src/node/decoder/MeshDecoder.ts
  var MeshDecoder = class {
    static unpackVarInt(packed, index) {
      const data = packed;
      const size = packed.length;
      let c2 = 0, d2 = 1, e2;
      do {
        if (index >= size) {
          throw Error("Unable to unpack varint");
        }
        e2 = data[index++];
        c2 += (e2 & 127) * d2;
        d2 <<= 7;
      } while (e2 & 128);
      return [c2, index];
    }
    static unpackVertices(packed) {
      const data = packed;
      const count = packed.length / 3;
      let vtx = new Uint8Array(packed.length);
      let x = 0, y = 0, z2 = 0;
      let vc2 = 0;
      for (let i2 = 0; i2 < count; i2++) {
        x = x + data[count * 0 + i2] & 255;
        y = y + data[count * 1 + i2] & 255;
        z2 = z2 + data[count * 2 + i2] & 255;
        vtx[vc2] = x;
        vtx[vc2 + 1] = y;
        vtx[vc2 + 2] = z2;
        vc2 += 3;
      }
      return vtx;
    }
    static unpackIndices(packed) {
      let offset = 0;
      const varint = MeshDecoder.unpackVarInt(packed, offset);
      const triangle_strip_len = varint[0];
      offset = varint[1];
      let triangle_strip = new Uint16Array(triangle_strip_len);
      for (let zeros = 0, a2, b2 = 0, c2 = 0, i2 = 0; i2 < triangle_strip_len; i2++) {
        const varint2 = MeshDecoder.unpackVarInt(packed, offset);
        const val = varint2[0];
        offset = varint2[1];
        triangle_strip[i2] = (a2 = b2, b2 = c2, c2 = zeros - val);
        if (val == 0)
          zeros++;
      }
      return triangle_strip;
    }
    static unpackOctants(packed, indices, verticesLength) {
      let offset = 0;
      const varint = MeshDecoder.unpackVarInt(packed, offset);
      const len = varint[0];
      offset = varint[1];
      let idx_i = 0;
      let octants = new Uint8Array(verticesLength);
      for (let i2 = 0; i2 < len; i2++) {
        const varint2 = MeshDecoder.unpackVarInt(packed, offset);
        const v2 = varint2[0];
        offset = varint2[1];
        for (let j = 0; j < v2; j++) {
          const idx = indices[idx_i++];
          octants[idx] = i2 & 7;
        }
      }
      return octants;
    }
    static unpackLayerBounds(packed) {
      let offset = 0;
      const varint = MeshDecoder.unpackVarInt(packed, offset);
      const len = varint[0];
      offset = varint[1];
      let k = 0;
      let m = 0;
      let layer_bounds = new Array(10);
      for (let i2 = 0; i2 < len; i2++) {
        if (i2 % 8 == 0) {
          if (!(m < 10)) {
            throw Error("Invalid m?");
          }
          layer_bounds[m++] = k;
        }
        const varint2 = MeshDecoder.unpackVarInt(packed, offset);
        const v2 = varint2[0];
        offset = varint2[1];
        k += v2;
      }
      for (; 10 > m; m++)
        layer_bounds[m] = k;
      return layer_bounds;
    }
  };

  // src/node/decoder/TextureDecoder.ts
  var crn = (init_crn(), crn_exports);
  var TextureDecoder = class {
    static arrayBufferCopy(src, dst, dstByteOffset, numBytes) {
      let dst32Offset = dstByteOffset / 4;
      var tail = numBytes % 4;
      var src32 = new Uint32Array(src.buffer, 0, (numBytes - tail) / 4);
      var dst32 = new Uint32Array(dst.buffer);
      for (var i2 = 0; i2 < src32.length; i2++) {
        dst32[dst32Offset + i2] = src32[i2];
      }
      for (var i2 = numBytes - tail; i2 < numBytes; i2++) {
        dst[dstByteOffset + i2] = src[i2];
      }
    }
    static unpackTextureFormat(available_texture_formats, default_available_texture_formats) {
      let texture_format;
      const supported = [6, 1];
      const available = available_texture_formats ? available_texture_formats : default_available_texture_formats;
      for (let s of supported) {
        if (available & 1 << s - 1) {
          texture_format = s;
          break;
        }
      }
      return texture_format;
    }
    static unpackImageryEpoch(flags, imagery_epoch, default_imagery_epoch) {
      let _imagery_epoch = 0;
      if ((flags & 16) != 0) {
        _imagery_epoch = imagery_epoch ? imagery_epoch : default_imagery_epoch;
      }
      return _imagery_epoch;
    }
    static unpackUvOffsetAndScale(texture, uv_offset_and_scale) {
      let u_mod = texture.format == 6 ? texture.width : 65535 + 1;
      let v_mod = texture.format == 6 ? texture.height : 65535 + 1;
      const uv_offset = { x: 0.5, y: 0.5 };
      const uv_scale = { x: 1 / u_mod, y: 1 / v_mod };
      if (uv_offset_and_scale.length == 4) {
        uv_offset.x = uv_offset_and_scale[0];
        uv_offset.y = uv_offset_and_scale[1];
        uv_scale.x = uv_offset_and_scale[2];
        uv_scale.y = uv_offset_and_scale[3];
      }
      uv_offset.y -= 1 / uv_scale.y;
      uv_scale.y *= -1;
      return {
        uv_offset,
        uv_scale
      };
    }
    static unpackTexCoords(packed, texture, verticesLength) {
      if (!(verticesLength * 4 == packed.length - 4 && packed.length >= 4)) {
        throw Error("Invalid packed size");
      }
      let u_mod = texture.format == 6 ? texture.width : 65535 + 1;
      let v_mod = texture.format == 6 ? texture.height : 65535 + 1;
      let offset = 4;
      let u = 0, v2 = 0;
      let uvs = new Uint16Array(verticesLength * 2);
      for (let i2 = 0, j = 0; i2 < verticesLength; i2++, j += 2) {
        u = (u + packed[verticesLength * 0 + i2 + offset] + (packed[verticesLength * 2 + i2 + offset] << 8)) % u_mod;
        v2 = (v2 + packed[verticesLength * 1 + i2 + offset] + (packed[verticesLength * 3 + i2 + offset] << 8)) % v_mod;
        uvs[j + 0] = u;
        uvs[j + 1] = v2;
      }
      return uvs;
    }
    static unpackCRN(data, width, height, convertToBMP = true) {
      const srcSize = data.byteLength;
      const bytes = new Uint8Array(data);
      const src = crn.Module._malloc(srcSize);
      TextureDecoder.arrayBufferCopy(bytes, crn.Module.HEAPU8, src, srcSize);
      const dstSize = crn.Module._crn_get_uncompressed_size(src, srcSize);
      const dst = crn.Module._malloc(dstSize);
      crn.Module._crn_decompress(src, srcSize, dst, dstSize, 0);
      let texture = new Uint8Array(crn.Module.HEAPU8.buffer, dst, dstSize);
      if (convertToBMP) {
        texture = TextureDecoder.dxtToRgb565(crn.Module.HEAPU16, dst / 2, width, height);
      }
      crn.Module._free(src);
      crn.Module._free(dst);
      return texture;
    }
    static dxtToRgb565(src, src16Offset, width, height) {
      var c2 = new Uint16Array(4);
      var dst = new Uint16Array(width * height);
      var nWords = width * height / 4;
      var m = 0;
      var dstI = 0;
      var i2 = 0;
      var r0 = 0, g0 = 0, b0 = 0, r1 = 0, g1 = 0, b1 = 0;
      var blockWidth = width / 4;
      var blockHeight = height / 4;
      for (var blockY = 0; blockY < blockHeight; blockY++) {
        for (var blockX = 0; blockX < blockWidth; blockX++) {
          i2 = src16Offset + 4 * (blockY * blockWidth + blockX);
          c2[0] = src[i2];
          c2[1] = src[i2 + 1];
          r0 = c2[0] & 31;
          g0 = c2[0] & 2016;
          b0 = c2[0] & 63488;
          r1 = c2[1] & 31;
          g1 = c2[1] & 2016;
          b1 = c2[1] & 63488;
          c2[2] = 5 * r0 + 3 * r1 >> 3 | 5 * g0 + 3 * g1 >> 3 & 2016 | 5 * b0 + 3 * b1 >> 3 & 63488;
          c2[3] = 5 * r1 + 3 * r0 >> 3 | 5 * g1 + 3 * g0 >> 3 & 2016 | 5 * b1 + 3 * b0 >> 3 & 63488;
          m = src[i2 + 2];
          dstI = blockY * 4 * width + blockX * 4;
          dst[dstI] = c2[m & 3];
          dst[dstI + 1] = c2[m >> 2 & 3];
          dst[dstI + 2] = c2[m >> 4 & 3];
          dst[dstI + 3] = c2[m >> 6 & 3];
          dstI += width;
          dst[dstI] = c2[m >> 8 & 3];
          dst[dstI + 1] = c2[m >> 10 & 3];
          dst[dstI + 2] = c2[m >> 12 & 3];
          dst[dstI + 3] = c2[m >> 14];
          m = src[i2 + 3];
          dstI += width;
          dst[dstI] = c2[m & 3];
          dst[dstI + 1] = c2[m >> 2 & 3];
          dst[dstI + 2] = c2[m >> 4 & 3];
          dst[dstI + 3] = c2[m >> 6 & 3];
          dstI += width;
          dst[dstI] = c2[m >> 8 & 3];
          dst[dstI + 1] = c2[m >> 10 & 3];
          dst[dstI + 2] = c2[m >> 12 & 3];
          dst[dstI + 3] = c2[m >> 14];
        }
      }
      return dst;
    }
  };

  // src/node/decoder/NodeDecoder.ts
  var NodeDecoder = class {
    static unpackPathAndFlags(path_id) {
      let level = 1 + (path_id & 3);
      path_id >>= 2;
      let path = "";
      for (let i2 = 0; i2 < level; i2++) {
        path += parseInt("0") + (path_id & 7);
        path_id >>= 3;
      }
      let flags = path_id;
      return {
        path,
        level,
        flags
      };
    }
    static Decode(node_data) {
      const node = {};
      node.meshes = [];
      node.matrix_globe_from_mesh = node_data.matrix_globe_from_mesh;
      for (let mesh of node_data.meshes) {
        let indices = MeshDecoder.unpackIndices(mesh.indices);
        const vertices = MeshDecoder.unpackVertices(mesh.vertices);
        let octants = MeshDecoder.unpackOctants(mesh.layer_and_octant_counts, indices, vertices.length / 3);
        let { uv_offset, uv_scale } = TextureDecoder.unpackUvOffsetAndScale(mesh.texture[0], mesh.uv_offset_and_scale);
        let uvs = TextureDecoder.unpackTexCoords(mesh.texture_coordinates, mesh.texture[0], vertices.length / 3);
        let layer_bounds = MeshDecoder.unpackLayerBounds(mesh.layer_and_octant_counts);
        indices = indices.slice(0, layer_bounds[3]);
        const textureData = mesh.texture[0].format == 6 ? TextureDecoder.unpackCRN(mesh.texture[0].data[0], mesh.texture[0].width, mesh.texture[0].height) : mesh.texture[0].data[0];
        let texture = [{
          data: [textureData],
          format: mesh.texture[0].format,
          width: mesh.texture[0].width,
          height: mesh.texture[0].height
        }];
        indices = BufferGeometryUtils.toTriangleStripDrawMode(indices);
        node.meshes.push({
          indices,
          vertices,
          octants,
          vertices_uvs: uvs,
          uv_scale,
          uv_offset,
          texture
        });
      }
      return node;
    }
  };

  // src/node/decoder/BufferUtils.ts
  var BufferUtils = class {
    static readUint16LE(buffer, offset) {
      offset = offset >>> 0;
      return buffer[offset] | buffer[offset + 1] << 8;
    }
    static readInt16LE(buffer, offset) {
      offset = offset >>> 0;
      const val = buffer[offset] | buffer[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    }
  };

  // src/node/decoder/NodeOBB.ts
  var NodeOBB = class {
    static unpackObb(data, head_node_center, meters_per_texel) {
      if (data.length != 15)
        throw Error("Invalid packed size");
      const center = {
        x: BufferUtils.readInt16LE(data, 0) * meters_per_texel + head_node_center[0],
        y: BufferUtils.readInt16LE(data, 2) * meters_per_texel + head_node_center[1],
        z: BufferUtils.readInt16LE(data, 4) * meters_per_texel + head_node_center[2]
      };
      const extents = {
        x: data[6] * meters_per_texel,
        y: data[7] * meters_per_texel,
        z: data[8] * meters_per_texel
      };
      const euler = {
        x: BufferUtils.readUint16LE(data, 9) * Math.PI / 32768,
        y: BufferUtils.readUint16LE(data, 11) * Math.PI / 65536,
        z: BufferUtils.readUint16LE(data, 13) * Math.PI / 32768
      };
      const c0 = Math.cos(euler.x);
      const s0 = Math.sin(euler.x);
      const c1 = Math.cos(euler.y);
      const s1 = Math.sin(euler.y);
      const c2 = Math.cos(euler.z);
      const s2 = Math.sin(euler.z);
      const orientation = {
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
        center,
        extents,
        orientation
      };
    }
  };

  // src/node/decoder/LatLonBox.ts
  var octant_dict = {
    "0": [0, 0, 0],
    "1": [1, 0, 0],
    "2": [0, 1, 0],
    "3": [1, 1, 0],
    "4": [0, 0, 1],
    "5": [1, 0, 1],
    "6": [0, 1, 1],
    "7": [1, 1, 1]
  };
  var LatLonBox = class {
    constructor(n2, s, w, e2) {
      this.n = n2;
      this.s = s;
      this.w = w;
      this.e = e2;
    }
    mid_point() {
      return {
        lat: (this.n + this.s) / 2,
        lon: (this.w + this.e) / 2
      };
    }
    get_child(octant) {
      let oct_x, oct_y, oct_z;
      try {
        [oct_x, oct_y, oct_z] = octant_dict[octant];
      } catch (error) {
        throw Error("Invalid octant value");
      }
      let n2 = this.n;
      let s = this.s;
      let w = this.w;
      let e2 = this.e;
      if (oct_y == 0) {
        n2 = this.mid_point().lat;
      } else if (oct_y == 1) {
        s = this.mid_point().lat;
      } else {
        throw Error("Invalid y (north or south");
      }
      if (n2 == 90 || s == -90) {
        return new LatLonBox(n2, s, w, e2);
      }
      if (oct_x == 0) {
        e2 = this.mid_point().lon;
      } else if (oct_x == 1) {
        w = this.mid_point().lon;
      } else {
        throw Error("Invalid x (east or west");
      }
      return new LatLonBox(n2, s, w, e2);
    }
    static is_overlapping(box1, box2) {
      const n2 = Math.min(box1.n, box2.n);
      const s = Math.max(box1.s, box2.s);
      const w = Math.max(box1.w, box2.w);
      const e2 = Math.min(box1.e, box2.e);
      return n2 >= s && w <= e2;
    }
  };
  var first_latlonbox_dict = {
    "": new LatLonBox(90, -90, -180, 180),
    "0": new LatLonBox(0, -90, -180, 0),
    "1": new LatLonBox(0, -90, 0, 180),
    "2": new LatLonBox(90, 0, -180, 0),
    "3": new LatLonBox(90, 0, 0, 180),
    "02": new LatLonBox(0, -90, -180, -90),
    "03": new LatLonBox(0, -90, -90, 0),
    "12": new LatLonBox(0, -90, 0, 90),
    "13": new LatLonBox(0, -90, 90, 180),
    "20": new LatLonBox(90, 0, -180, -90),
    "21": new LatLonBox(90, 0, -90, 0),
    "30": new LatLonBox(90, 0, 0, 90),
    "31": new LatLonBox(90, 0, 90, 180)
  };
  function octant_to_latlong(octant_string) {
    let latlonbox = first_latlonbox_dict[octant_string.substr(0, 2)];
    for (let octant of octant_string.substr(2, octant_string.length)) {
      latlonbox = latlonbox.get_child(octant);
    }
    return latlonbox;
  }

  // src/node/NodeHeader.ts
  var NodeHeader = class {
    constructor(parent_bulk, metadata) {
      const path_and_flags = NodeDecoder.unpackPathAndFlags(metadata.path_and_flags);
      this.path_and_flags = path_and_flags;
      this.parent_bulk = parent_bulk.head_node_key.path;
      this.path = parent_bulk.head_node_key.path + path_and_flags.path;
      this.flags = path_and_flags.flags;
      this.level = this.path.length;
      this.is_bulk = this.level % 4 == 0 && !(this.flags & 4);
      this.can_have_data = !(this.flags & NodeMetadata.Flags.NODATA.value);
      this.state = NodeState.PENDING;
      this.meters_per_texel = metadata.meters_per_texel ? metadata.meters_per_texel : parent_bulk.meters_per_texel[path_and_flags.level - 1];
      this.texture_format = TextureDecoder.unpackTextureFormat(metadata.available_texture_formats, parent_bulk.default_available_texture_formats);
      this.imagery_epoch = TextureDecoder.unpackImageryEpoch(this.flags, metadata.imagery_epoch, parent_bulk.default_imagery_epoch);
      this.epoch = metadata.epoch ? metadata.epoch : parent_bulk.head_node_key.epoch;
      if (metadata.oriented_bounding_box) {
        this.obb = NodeOBB.unpackObb(metadata.oriented_bounding_box, parent_bulk.head_node_center, this.meters_per_texel);
        this.latLonBox = octant_to_latlong(this.path);
      }
    }
  };

  // src/bulk/BulkData.ts
  var BulkData = class {
    constructor(metadata) {
      this.head_node_key = metadata.head_node_key;
      this.head_node_center = metadata.head_node_center;
      this.meters_per_texel = metadata.meters_per_texel;
      this.default_imagery_epoch = metadata.default_imagery_epoch;
      this.default_available_texture_formats = metadata.default_available_texture_formats;
      this.default_available_view_dependent_textures = metadata.default_available_view_dependent_textures;
      this.default_available_view_dependent_texture_formats = metadata.default_available_view_dependent_texture_formats;
      this.node_metadata = [];
      this.bulks = new Map();
      this.nodes = new Map();
      for (let nodeMetadata of metadata.node_metadata) {
        const nodeHeader = new NodeHeader(metadata, nodeMetadata);
        this.node_metadata.push(nodeHeader);
        if (nodeHeader.is_bulk) {
          this.bulks.set(nodeHeader.path, nodeHeader);
        }
        if ((nodeHeader.can_have_data || !(nodeHeader.flags & NodeMetadata.Flags.LEAF.value)) && nodeHeader.obb) {
          this.nodes.set(nodeHeader.path, nodeHeader);
        }
      }
    }
  };

  // src/node/NodeData.ts
  var NodeData2 = class {
    constructor(nodeHeader, nodeData) {
      this.path_and_flags = nodeHeader.path_and_flags;
      this.parent_bulk = nodeHeader.parent_bulk;
      this.path = nodeHeader.path;
      this.flags = nodeHeader.flags;
      this.level = nodeHeader.level;
      this.is_bulk = nodeHeader.is_bulk;
      this.can_have_data = nodeHeader.can_have_data;
      this.state = nodeHeader.state;
      this.obb = nodeHeader.obb;
      this.latLonBox = nodeHeader.latLonBox;
      if (this.can_have_data) {
        try {
          this.data = NodeDecoder.Decode(nodeData);
          this.state = NodeState.DECODED;
        } catch (error) {
          console.error(error, this.data, this.state);
          this.state = NodeState.FAILED;
        }
      }
    }
  };

  // node_modules/threads/index.mjs
  var import_dist = __toModule(require_dist2());
  var registerSerializer = import_dist.default.registerSerializer;
  var spawn = import_dist.default.spawn;
  var DefaultSerializer = import_dist.default.DefaultSerializer;
  var Pool = import_dist.default.Pool;
  var Thread = import_dist.default.Thread;
  var Transfer = import_dist.default.Transfer;
  var Worker2 = import_dist.default.Worker;

  // src/controller/Resources.ts
  var ResourceState;
  (function(ResourceState2) {
    ResourceState2[ResourceState2["PENDING"] = 0] = "PENDING";
    ResourceState2[ResourceState2["SUCCESS"] = 1] = "SUCCESS";
    ResourceState2[ResourceState2["FAILED"] = 2] = "FAILED";
  })(ResourceState || (ResourceState = {}));
  var Resources = class {
    constructor(urlPrefix, workerPath, workerCount) {
      this.urlPrefix = urlPrefix;
      this.workerCount = workerCount;
      this.bulkCache = new import_lru_map.LRUMap(200);
      this.nodeCache = new import_lru_map.LRUMap(500);
      if (this.workerCount > 0) {
        const w = new Worker2(workerPath);
        const workerResourceManager = spawn(w);
        workerResourceManager.then((worker) => {
          worker.init(this.urlPrefix).then(() => {
            this.workerResourceManager = Pool(() => workerResourceManager, this.workerCount);
            this.initializedWorker = true;
          });
        });
      }
    }
    request_planetoid_metadata() {
      return __async(this, null, function* () {
        const url = this.urlPrefix + "PlanetoidMetadata";
        return GetURL(url).then((buffer) => {
          const protodata = new Uint8Array(buffer);
          const pbf = new import_pbf.default(protodata);
          const metadata = PlanetoidMetadata.read(pbf);
          return metadata;
        }).catch((error) => {
          return null;
        });
      });
    }
    request_bulk_data(path, epoch) {
      const url = this.urlPrefix + `BulkMetadata/pb=!1m2!1s${path}!2u${epoch}`;
      return GetURL(url).then((buffer) => {
        const protodata = new Uint8Array(buffer);
        const pbf = new import_pbf.default(protodata);
        const metadata = BulkMetadata.read(pbf);
        const bulk = new BulkData(metadata);
        return bulk;
      }).catch((error) => {
        return null;
      });
    }
    request_node_data(node_header) {
      let url = this.urlPrefix + `NodeData/pb=!1m2!1s${node_header.path}!2u${node_header.epoch}!2e${node_header.texture_format}!4b0`;
      if (node_header.imagery_epoch != 0) {
        url = this.urlPrefix + `NodeData/pb=!1m2!1s${node_header.path}!2u${node_header.epoch}!2e${node_header.texture_format}!3u${node_header.imagery_epoch}!4b0`;
      }
      return GetURL(url).then((buffer) => {
        const protodata = new Uint8Array(buffer);
        const pbf = new import_pbf.default(protodata);
        const metadata = NodeData.read(pbf);
        const node = new NodeData2(node_header, metadata);
        return node;
      }).catch((error) => {
        return null;
      });
    }
    fetch_bulk(path, epoch) {
      return __async(this, null, function* () {
        if (this.workerCount > 0) {
          return this.workerResourceManager.queue((workerResources) => {
            return workerResources.request_bulk_data(path, epoch);
          });
        } else {
          return this.request_bulk_data(path, epoch);
        }
      });
    }
    get_or_fetch_cached_bulk(path, epoch) {
      const cachedBulk = this.bulkCache.get(path);
      if (!cachedBulk) {
        this.bulkCache.set(path, { status: 0, data: null });
        this.fetch_bulk(path, epoch).then((bulk) => {
          if (bulk !== null) {
            this.bulkCache.set(path, { status: 1, data: bulk });
          } else {
            this.bulkCache.set(path, { status: 2, data: null });
          }
        });
        return false;
      }
      if (cachedBulk.status == 1)
        return cachedBulk.data;
      return false;
    }
    fetch_node(nodeHeader) {
      return __async(this, null, function* () {
        if (this.workerCount > 0) {
          return this.workerResourceManager.queue((workerResources) => {
            return workerResources.request_node_data(nodeHeader);
          });
        } else {
          return this.request_node_data(nodeHeader);
        }
      });
    }
    get_or_fetch_cached_node(nodeHeader) {
      const cachedNode = this.nodeCache.get(nodeHeader.path);
      if (!cachedNode) {
        this.nodeCache.set(nodeHeader.path, { status: 0, data: null });
        this.fetch_node(nodeHeader).then((node) => {
          if (node !== null) {
            this.nodeCache.set(nodeHeader.path, { status: 1, data: node });
          } else {
            this.nodeCache.set(nodeHeader.path, { status: 2, data: null });
          }
        });
        return false;
      }
      if (cachedNode.status == 1)
        return cachedNode.data;
      return false;
    }
  };

  // src/controller/NodeManager.ts
  var NodeManagerOptionsDefault = {
    url: "https://kh.google.com/rt/earth/",
    nodeValidationHandler: (node) => {
      return false;
    },
    workerCount: 8,
    workerPath: "./ResourcesWorker.js"
  };
  var NodeManager = class {
    constructor(options) {
      this.octants = ["0", "1", "2", "3", "4", "5", "6", "7"];
      this.options = Object.assign({}, NodeManagerOptionsDefault, options);
      this.resourceManager = new Resources(this.options.url, this.options.workerPath, this.options.workerCount);
      this.resourceManager.request_planetoid_metadata().then((planetoid_metadata) => {
        this.planetoid = planetoid_metadata;
        this.epoch = this.options.rootEpoch ? this.options.rootEpoch : planetoid_metadata.root_node_metadata.epoch;
        this.resourceManager.request_bulk_data("", this.epoch).then((bulk) => {
          this.root_bulk = bulk;
        });
      });
    }
    get_nodes() {
      let potential_bulks = new Map();
      let potential_nodes = new Map();
      if (!this.root_bulk)
        return potential_nodes;
      if (this.options.workerCount > 0 && !this.resourceManager.initializedWorker)
        return potential_nodes;
      let next_valid = new Map();
      next_valid.set("", this.root_bulk);
      while (next_valid.size != 0) {
        for (const current_bulk_map of next_valid) {
          const current_bulk_path = current_bulk_map[0];
          let current_bulk = current_bulk_map[1];
          next_valid.delete(current_bulk_path);
          if (current_bulk_path.length > 0 && current_bulk_path.length % 4 == 0) {
            let potential_bulk_header = current_bulk.bulks.get(current_bulk_path);
            if (!potential_bulk_header)
              continue;
            const cachedBulk = this.resourceManager.get_or_fetch_cached_bulk(potential_bulk_header.path, this.epoch);
            if (!cachedBulk)
              continue;
            current_bulk = cachedBulk;
          }
          potential_bulks.set(current_bulk_path, current_bulk);
          for (let o of this.octants) {
            const next_bulk_path = current_bulk_path + o;
            const node = current_bulk.nodes.get(next_bulk_path);
            if (!node)
              continue;
            if (!this.options.nodeValidationHandler(node)) {
              continue;
            }
            next_valid.set(next_bulk_path, current_bulk);
            if (!node.can_have_data)
              continue;
            const cachedNode = this.resourceManager.get_or_fetch_cached_node(node);
            if (!cachedNode)
              continue;
            potential_nodes.set(node.path, cachedNode);
          }
        }
      }
      return potential_nodes;
    }
    getMasksForNodes(nodes) {
      let mask_map = new Map();
      for (let node_map of nodes) {
        const path = node_map[0];
        const level = path.length;
        const octant = parseInt(path[level - 1]);
        let prev = path.substr(0, level - 1);
        mask_map.set(prev, mask_map[prev] |= 1 << octant);
        if (mask_map[path] === void 0)
          mask_map.set(path, 0);
      }
      return mask_map;
    }
  };
  return src_exports;
})();
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
