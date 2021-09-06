export var Module = {};
var aa = void 0, l = !0, n = null, r = !1, Ca = "object" == typeof process, Ea = "object" == typeof window, Fa = "function" == typeof importScripts, Ja = !Ea && !Ca && !Fa;
function Qa(r) { eval.call(n, r); }
function Ta(r) { if (1 == Ua)
    return 1; var e = { "%i1": 1, "%i8": 1, "%i16": 2, "%i32": 4, "%i64": 8, "%float": 4, "%double": 8 }["%" + r]; return e || ("*" == r[r.length - 1] ? e = Ua : "i" == r[0] && (Xa(0 == (r = parseInt(r.substr(1))) % 8), e = r / 8)), e; }
function Ya(r) { var e = v; return v = (v += r) + 3 >> 2 << 2, e; }
function ab(r) { var e = bb; if ((bb = (bb += r) + 3 >> 2 << 2) >= cb) {
    for (; cb <= bb;)
        cb = 2 * cb + 4095 >> 12 << 12;
    r = z;
    var i = new ArrayBuffer(cb);
    z = new Int8Array(i), hb = new Int16Array(i), A = new Int32Array(i), B = new Uint8Array(i), C = new Uint16Array(i), E = new Uint32Array(i), ib = new Float32Array(i), lb = new Float64Array(i), z.set(r);
} return e; }
Ca || (Ja ? (Module.print = print, Module.printErr = printErr, Module.read = "undefined" != typeof read ? read : function (r) { snarf(r); }, Module.arguments || ("undefined" != typeof scriptArgs ? Module.arguments = scriptArgs : "undefined" != typeof arguments && (Module.arguments = arguments))) : Ea ? (Module.print || (Module.print = function (r) { console.log(r); }), Module.printErr || (Module.printErr = function (r) { console.log(r); }), Module.read = function (e) { var i = new XMLHttpRequest; return i.open("GET", e, r), i.send(n), i.responseText; }, Module.arguments || "undefined" != typeof arguments && (Module.arguments = arguments)) : Fa ? Module.load = importScripts : b("Unknown runtime environment. Where are we?")), "undefined" == !Module.load && Module.read && (Module.load = function (r) { Qa(Module.read(r)); }), Module.printErr || (Module.printErr = function () { }), Module.print || (Module.print = Module.printErr), Module.arguments || (Module.arguments = []), Module.print = Module.print, Module.Jb = Module.printErr;
var Ua = 4, tb = {}, ub;
function vb(r) { Module.print(r + ":\n" + Error().stack), b("Assertion: " + r); }
function Xa(r, e) { r || vb("Assertion failed: " + e); }
var Hb = this;
function Ib(a, c, d, f) { var e = 0; try {
    var i = eval("_" + a);
}
catch (r) {
    try {
        i = Hb.Module["_" + a];
    }
    catch (r) { }
} Xa(i, "Cannot call unknown function " + a + " (perhaps LLVM optimizations or closure removed it?)"); var h = 0, a = f ? f.map(function (r) { var i = d[h++]; return "string" == i ? (e || (e = v), Pb(r, i = Ya(r.length + 1)), r = i) : "array" == i && (e || (e = v), Qb(r, i = Ya(r.length)), r = i), r; }) : [], c = function (r, e) { return "string" == e ? Tb(r) : (Xa("array" != e), r); }(i.apply(n, a), c); return e && (v = e), c; }
function Ub(r, e, i) { switch ("*" === (i = i || "i8")[i.length - 1] && (i = "i32"), i) {
    case "i1":
    case "i8":
        z[r] = e;
        break;
    case "i16":
        hb[r >> 1] = e;
        break;
    case "i32":
    case "i64":
        A[r >> 2] = e;
        break;
    case "float":
        ib[r >> 2] = e;
        break;
    case "double":
        Vb[0] = e, A[r >> 2] = Wb[0], A[r + 4 >> 2] = Wb[1];
        break;
    default: vb("invalid type for setValue: " + i);
} }
Module.ccall = Ib, Module.cwrap = function (r, e, i) { return function () { return Ib(r, e, i, Array.prototype.slice.call(arguments)); }; }, Module.setValue = Ub, Module.getValue = function (r, e) { switch ("*" === (e = e || "i8")[e.length - 1] && (e = "i32"), e) {
    case "i1":
    case "i8": return z[r];
    case "i16": return hb[r >> 1];
    case "i32":
    case "i64": return A[r >> 2];
    case "float": return ib[r >> 2];
    case "double": return Wb[0] = A[r >> 2], Wb[1] = A[r + 4 >> 2], Vb[0];
    default: vb("invalid type for setValue: " + e);
} return n; };
var Xb = 1, I = 2;
function N(e, i, a) { var t, A; "number" == typeof e ? (t = l, A = e) : (t = r, A = e.length); var o, f = "string" == typeof i ? i : n; a = [Yb, Ya, ab][a === aa ? I : a](Math.max(A, f ? 1 : i.length)); if (t)
    return Zb(a, 0, A), a; for (t = 0; t < A;) {
    var c = e[t];
    "function" == typeof c && (c = tb.Ib(c)), 0 === (o = f || i[t]) ? t++ : ("i64" == o && (o = "i32"), Ub(a + t, c, o), t += Ta(o));
} return a; }
function Tb(r, e) { for (var i, a = void 0 === e, t = "", n = 0, A = String.fromCharCode(0); (i = String.fromCharCode(B[r + n]), !a || i != A) && (t += i, n += 1, a || n != e);)
    ; return t; }
Module.ALLOC_NORMAL = 0, Module.ALLOC_STACK = Xb, Module.ALLOC_STATIC = I, Module.allocate = N, Module.Pointer_stringify = Tb, Module.Array_stringify = function (r) { for (var e = "", i = 0; i < r.length; i++)
    e += String.fromCharCode(r[i]); return e; };
var $b, ac = 4096, z, B, hb, C, A, E, ib, lb, v, bc, bb, ec = Module.TOTAL_STACK || 5242880, cb = Module.TOTAL_MEMORY || 10485760;
Xa(!!(Int32Array && Float64Array && new Int32Array(1).subarray && new Int32Array(1).set), "Cannot fallback to non-typed array case: Code is too specialized");
var fc = new ArrayBuffer(cb);
z = new Int8Array(fc), hb = new Int16Array(fc), A = new Int32Array(fc), B = new Uint8Array(fc), C = new Uint16Array(fc), E = new Uint32Array(fc), ib = new Float32Array(fc), lb = new Float64Array(fc), A[0] = 255, Xa(255 === B[0] && 0 === B[3], "Typed arrays 2 must be run on a little-endian system");
var hc = gc("(null)");
bb = hc.length;
for (var ic = 0; ic < hc.length; ic++)
    z[ic] = hc[ic];
Module.HEAP = aa, Module.HEAP8 = z, Module.HEAP16 = hb, Module.HEAP32 = A, Module.HEAPU8 = B, Module.HEAPU16 = C, Module.HEAPU32 = E, Module.HEAPF32 = ib, Module.HEAPF64 = lb, bc = (v = 4 * Math.ceil(bb / 4)) + ec;
var pc = 8 * Math.ceil(bc / 8);
z.subarray(pc);
var Wb = A.subarray(pc >> 2);
ib.subarray(pc >> 2);
var Vb = lb.subarray(pc >> 3);
function qc(r) { for (; 0 < r.length;) {
    var e = r.shift(), i = e.R;
    "number" == typeof i && (i = $b[i]), i(e.Za === aa ? n : e.Za);
} }
bc = pc + 8, bb = bc + 4095 >> 12 << 12;
var rc = [], sc = [], tc = [];
function uc(r, e) { return Array.prototype.slice.call(z.subarray(r, r + e)); }
function vc(r) { for (var e = 0; z[r + e];)
    e++; return e; }
function wc(r, e) { var i = vc(r); e && i++; var a = uc(r, i); return e && (a[i - 1] = 0), a; }
function gc(r, e, i) { var a = [], t = 0; for (i === aa && (i = r.length); t < i;) {
    var n = r.charCodeAt(t);
    255 < n && (n &= 255), a.push(n), t += 1;
} return e || a.push(0), a; }
function Pb(r, e, i) { for (var a = 0; a < r.length;) {
    var t = r.charCodeAt(a);
    255 < t && (t &= 255), z[e + a] = t, a += 1;
} i || (z[e + a] = 0); }
function Qb(r, e) { for (var i = 0; i < r.length; i++)
    z[e + i] = r[i]; }
Module.Array_copy = uc, Module.TypedArray_copy = function (r, e, i) { i === aa && (i = 0); for (var a = new Uint8Array(e - i), t = i; t < e; ++t)
    a[t - i] = z[r + t]; return a.buffer; }, Module.String_len = vc, Module.String_copy = wc, Module.intArrayFromString = gc, Module.intArrayToString = function (r) { for (var e = [], i = 0; i < r.length; i++) {
    var a = r[i];
    255 < a && (a &= 255), e.push(String.fromCharCode(a));
} return e.join(""); }, Module.writeStringToMemory = Pb, Module.writeArrayToMemory = Qb;
var R = [];
function xc(r, e) { return 0 <= r ? r : 32 >= e ? 2 * Math.abs(1 << e - 1) + r : Math.pow(2, e) + r; }
function yc(r, e) { if (0 >= r)
    return r; var i = 32 >= e ? Math.abs(1 << e - 1) : Math.pow(2, e - 1); return r >= i && (32 >= e || r > i) && (r = -2 * i + r), r; }
var zc = 0;
function Dc(r) { return r = r - 1 | 0, r |= r >>> 16, r |= r >>> 8, r |= r >>> 4, 1 + ((r |= r >>> 2) >>> 1 | r) | 0; }
function Ec(r, e) { for (var i = 0 | R.Ka, a = v, t = 0 | a, n = (i = (ub = v += 512, v += 12, A[ub >> 2] = i, A[ub + 4 >> 2] = e, A[ub + 8 >> 2] = r, ub), (i = Fc(0 | R.Ca, i)).length), o = 0; o < n; o++)
    z[t + o] = i[o]; z[t + o] = 0, ub = v, v = (v += 1) + 3 >> 2 << 2, A[ub >> 2] = 0, n = ub, i = A[Gc >> 2], o = Fc(t, n), t = v, n = N(o, "i8", Xb), 0 != (o = 1 * o.length) && -1 == Hc(i, n, o) && Ic[i] && (Ic[i].error = l), v = t, v = a; }
function Jc(r, e, i, a, t) { var n, o, f = v; v += 4; var c = r + 4 | 0; o = (r + 8 | 0) >> 2, E[c >> 2] >>> 0 > E[o] >>> 0 && Ec(0 | R.Da, 2121), Math.floor(2147418112 / (a >>> 0)) >>> 0 > e >>> 0 || Ec(0 | R.Pa, 2122); var u = E[o], s = u >>> 0 < e >>> 0; do {
    if (s) {
        var d = i ? 0 != (0 | e) && 0 == (e - 1 & e | 0) ? e : Dc(e) : e;
        0 != (0 | d) & d >>> 0 > u >>> 0 || Ec(0 | R.Ta, 2131);
        var l = d * a | 0;
        if (0 == (0 | t)) {
            var h, b = A[(n = 0 | r) >> 2], p = l, T = f;
            if (h = v, v += 4, 0 == (7 & b | 0) ? 2147418112 < p >>> 0 ? (Ec(0 | R.aa, 2500), T = 0) : (A[h >> 2] = p, b = $b[A[Kc >> 2]](b, p, h, 1, A[Lc >> 2]), 0 != (0 | T) && (A[T >> 2] = A[h >> 2]), 0 != (7 & b | 0) && Ec(0 | R.ba, 2552), T = b) : (Ec(0 | R.Fa, 2500), T = 0), v = h, 0 == (0 | (h = T))) {
                d = 0;
                break;
            }
            A[n >> 2] = h;
        }
        else {
            if (0 == (0 | (h = Mc(l, f)))) {
                d = 0;
                break;
            }
            n = (0 | r) >> 2, $b[t](h, A[n], A[c >> 2]), 0 != (0 | (T = A[n])) && Nc(T), A[n] = h;
        }
        n = E[f >> 2], A[o] = n >>> 0 > l >>> 0 ? Math.floor((n >>> 0) / (a >>> 0)) : d;
    }
    d = 1;
} while (0); return v = f, d; }
function Mc(r, e) { var i, a = v; if (v += 4, 2147418112 < (i = 0 == (0 | (i = r + 3 & -4)) ? 4 : i) >>> 0)
    Ec(0 | R.aa, 2500), i = 0;
else {
    A[a >> 2] = i;
    var t = $b[A[Kc >> 2]](0, i, a, 1, A[Lc >> 2]), n = E[a >> 2];
    0 != (0 | e) && (A[e >> 2] = n), 0 == (0 | t) | n >>> 0 < i >>> 0 ? (Ec(0 | R.Ea, 2500), i = 0) : (0 != (7 & t | 0) && Ec(0 | R.ba, 2527), i = t);
} return v = a, i; }
function Nc(r) { 0 != (0 | r) && (0 == (7 & r | 0) ? $b[A[Kc >> 2]](r, 0, 0, 1, A[Lc >> 2]) : Ec(0 | R.Ga, 2500)); }
function Oc(r, e, i, a) { var t, n, o, f, c, u = r >> 2, s = v; v += 200, f = s >> 2; var d = s + 64; o = d >> 2; var l = s + 132, h = 0 == (0 | e) | 11 < a >>> 0; r: do {
    if (h)
        var b = 0;
    else {
        A[u] = e, Zb(d, 0, 68);
        for (var p = 0;;) {
            var T = B[i + p | 0];
            if (0 != T << 24 >> 24) {
                var k = ((255 & T) << 2) + d | 0;
                A[k >> 2] = A[k >> 2] + 1 | 0;
            }
            var w = p + 1 | 0;
            if ((0 | w) == (0 | e)) {
                var y = 1, M = -1, g = 0, I = 0, N = 0;
                break;
            }
            p = w;
        }
        for (;;) {
            var m = E[(y << 2 >> 2) + o];
            if (0 == (0 | m)) {
                A[(28 + (y - 1 << 2) >> 2) + u] = 0;
                var X = N, S = I, O = g, F = M;
            }
            else {
                var j = M >>> 0 < y >>> 0 ? M : y, U = g >>> 0 > y >>> 0 ? g : y, _ = y - 1 | 0;
                A[(_ << 2 >> 2) + f] = N;
                var V = m + N | 0, L = 16 - y | 0;
                A[(28 + (_ << 2) >> 2) + u] = 1 + (V - 1 << L | (1 << L) - 1) | 0, A[(96 + (_ << 2) >> 2) + u] = I, A[l + (y << 2) >> 2] = I, X = V, S = m + I | 0, O = U, F = j;
            }
            var H = y + 1 | 0;
            if (17 == (0 | H))
                break;
            y = H, M = F, g = O, I = S, N = X << 1;
        }
        if (A[u + 1] = S, S >>> 0 > E[n = (r + 172 | 0) >> 2] >>> 0) {
            var Z = 0 != (0 | S) && 0 == (S - 1 & S | 0) ? S : e >>> 0 < Dc(S) >>> 0 ? e : Dc(S);
            A[n] = Z;
            var x = r + 176 | 0, G = A[x >> 2];
            if (0 == (0 | G))
                var P = Z;
            else
                Pc(G), P = A[n];
            var $ = Qc(P);
            if (A[x >> 2] = $, 0 == (0 | $)) {
                b = 0;
                break;
            }
            var q = x;
        }
        else
            q = r + 176 | 0;
        var D = r + 24 | 0;
        z[D] = 255 & F, z[r + 25 | 0] = 255 & O;
        for (var W = 0;;) {
            var Y = B[i + W | 0], J = 255 & Y;
            if (0 != Y << 24 >> 24) {
                0 == (0 | A[(J << 2 >> 2) + o]) && Ec(0 | R.Ua, 2274);
                var Q = (J << 2) + l | 0, K = E[Q >> 2];
                A[Q >> 2] = K + 1 | 0, K >>> 0 < S >>> 0 || Ec(0 | R.Va, 2278), hb[A[q >> 2] + (K << 1) >> 1] = 65535 & W;
            }
            var rr = W + 1 | 0;
            if ((0 | rr) == (0 | e))
                break;
            W = rr;
        }
        var er = B[D], ir = (255 & er) >>> 0 < a >>> 0 ? a : 0, ar = r + 8 | 0;
        A[ar >> 2] = ir;
        var tr = 0 != (0 | ir);
        if (tr) {
            var nr = 1 << ir, Ar = r + 164 | 0;
            if (nr >>> 0 > E[Ar >> 2] >>> 0) {
                A[Ar >> 2] = nr;
                var or = r + 168 | 0, fr = A[or >> 2];
                0 != (0 | fr) && Rc(fr);
                var cr = Sc(nr);
                if (A[or >> 2] = cr, 0 == (0 | cr)) {
                    b = 0;
                    break r;
                }
                Zb(cr, -1, nr << 2), 0 == (0 | ir) ? c = 26 : (sr = or, c = 34);
            }
            else {
                var ur = r + 168 | 0;
                Zb(A[ur >> 2], -1, nr << 2);
                var sr = ur;
                c = 34;
            }
            e: do {
                if (34 == c)
                    for (var dr = 1;;) {
                        var vr = 0 == (0 | A[(dr << 2 >> 2) + o]);
                        i: do {
                            if (!vr) {
                                var lr, hr = ir - dr | 0, br = 1 << hr, pr = dr - 1 | 0, Er = E[(pr << 2 >> 2) + f], Tr = r, Rr = dr;
                                0 != (0 | Rr) & 17 > Rr >>> 0 || Ec(0 | R.Sa, 1954);
                                var kr = A[Tr + (Rr - 1 << 2) + 28 >> 2];
                                if (Er >>> 0 <= (lr = 0 == (0 | kr) ? -1 : (kr - 1 | 0) >>> ((16 - Rr | 0) >>> 0)) >>> 0)
                                    for (var wr = A[(96 + (pr << 2) >> 2) + u] - Er | 0, yr = dr << 16, Mr = Er;;) {
                                        var gr = 65535 & C[A[q >> 2] + (wr + Mr << 1) >> 1];
                                        (255 & B[i + gr | 0] | 0) != (0 | dr) && Ec(0 | R.Wa, 2320);
                                        for (var Ir = Mr << hr, Nr = gr | yr, mr = 0;;) {
                                            var Xr = mr + Ir | 0;
                                            Xr >>> 0 < nr >>> 0 || Ec(0 | R.Xa, 2326);
                                            var Sr = E[sr >> 2];
                                            if (-1 == (0 | A[Sr + (Xr << 2) >> 2]))
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
        }
        else
            Fr = er;
        var jr = r + 96 | 0;
        A[jr >> 2] = A[jr >> 2] - A[f] | 0;
        var Ur = r + 100 | 0;
        A[Ur >> 2] = A[Ur >> 2] - A[f + 1] | 0;
        var _r = r + 104 | 0;
        A[_r >> 2] = A[_r >> 2] - A[f + 2] | 0;
        var Vr = r + 108 | 0;
        A[Vr >> 2] = A[Vr >> 2] - A[f + 3] | 0;
        var Lr = r + 112 | 0;
        A[Lr >> 2] = A[Lr >> 2] - A[f + 4] | 0;
        var Hr = r + 116 | 0;
        A[Hr >> 2] = A[Hr >> 2] - A[f + 5] | 0;
        var Zr = r + 120 | 0;
        A[Zr >> 2] = A[Zr >> 2] - A[f + 6] | 0;
        var xr = r + 124 | 0;
        A[xr >> 2] = A[xr >> 2] - A[f + 7] | 0;
        var Gr = r + 128 | 0;
        A[Gr >> 2] = A[Gr >> 2] - A[f + 8] | 0;
        var Pr = r + 132 | 0;
        A[Pr >> 2] = A[Pr >> 2] - A[f + 9] | 0;
        var $r = r + 136 | 0;
        A[$r >> 2] = A[$r >> 2] - A[f + 10] | 0;
        var qr = r + 140 | 0;
        A[qr >> 2] = A[qr >> 2] - A[f + 11] | 0;
        var Dr = r + 144 | 0;
        A[Dr >> 2] = A[Dr >> 2] - A[f + 12] | 0;
        var Wr = r + 148 | 0;
        A[Wr >> 2] = A[Wr >> 2] - A[f + 13] | 0;
        var Yr = r + 152 | 0;
        A[Yr >> 2] = A[Yr >> 2] - A[f + 14] | 0;
        var Jr = r + 156 | 0;
        A[Jr >> 2] = A[Jr >> 2] - A[f + 15] | 0;
        var Qr = r + 16 | 0;
        A[Qr >> 2] = 0, A[t = (r + 20 | 0) >> 2] = 255 & Fr;
        e: do {
            if (tr) {
                for (var Kr = ir;;) {
                    if (0 == (0 | Kr))
                        break e;
                    var re = Kr - 1 | 0;
                    if (0 != (0 | A[(Kr << 2 >> 2) + o]))
                        break;
                    Kr = re;
                }
                A[Qr >> 2] = A[(28 + (re << 2) >> 2) + u];
                for (var ee = ir + 1 | 0, ie = A[t] = ee;;) {
                    if (ie >>> 0 > O >>> 0)
                        break e;
                    if (0 != (0 | A[(ie << 2 >> 2) + o]))
                        break;
                    ie = ie + 1 | 0;
                }
                A[t] = ie;
            }
        } while (0);
        A[u + 23] = -1, A[u + 40] = 1048575, A[u + 3] = 32 - A[ar >> 2] | 0, b = 1;
    }
} while (0); return v = s, b; }
function Pc(r) { var e; 0 != (0 | r) && (e = A[r - 4 >> 2], r = r - 8 | 0, 4 == (e = 0 == (0 | e) ? 4 : (0 | e) == (-1 ^ A[r >> 2] | 0) ? 5 : 4) && Ec(0 | R.da, 645), Nc(r)); }
function Qc(r) { var e = Mc(8 + ((r = 0 == (0 | r) ? 1 : r) << 1) | 0, 0); return 0 == (0 | e) ? r = 0 : (A[e + 4 >> 2] = r, A[e >> 2] = -1 ^ r, r = e + 8 | 0), r; }
function Rc(r) { var e; 0 != (0 | r) && (e = A[r - 4 >> 2], r = r - 8 | 0, 4 == (e = 0 == (0 | e) ? 4 : (0 | e) == (-1 ^ A[r >> 2] | 0) ? 5 : 4) && Ec(0 | R.da, 645), Nc(r)); }
function Sc(r) { var e = Mc(8 + ((r = 0 == (0 | r) ? 1 : r) << 2) | 0, 0); return 0 == (0 | e) ? r = 0 : (A[e + 4 >> 2] = r, A[e >> 2] = -1 ^ r, r = e + 8 | 0), r; }
function Tc(r) { return (255 & B[0 | r]) << 8 | 255 & B[r + 1 | 0]; }
function Uc(r) { return (255 & B[r + 1 | 0]) << 16 | (255 & B[0 | r]) << 24 | 255 & B[r + 3 | 0] | (255 & B[r + 2 | 0]) << 8; }
function Vc(r) { return 255 & B[0 | r]; }
function Wc(r) { return 255 & B[r + 2 | 0] | (255 & B[0 | r]) << 16 | (255 & B[r + 1 | 0]) << 8; }
function Xc(r, e) { if (0 == r && 0 == e || 9 == r && 0 == e)
    var i = 4;
else
    1 == r && 0 == e || 2 == r && 0 == e || 7 == r && 0 == e || 8 == r && 0 == e || 3 == r && 0 == e || 4 == r && 0 == e || 5 == r && 0 == e || 6 == r && 0 == e ? i = 8 : (Ec(0 | R.Ia, 2664), i = 0); return i; }
function Yc(r, e) { return 0 == (0 | r) | 74 > e >>> 0 ? 0 : 18552 != (0 | Tc(r)) ? 0 : 74 > Tc(r + 2 | 0) >>> 0 ? 0 : Uc(r + 6 | 0) >>> 0 > e >>> 0 ? 0 : r; }
function Zc(r, e, i) { var a = i >> 2; return 0 == (0 | r) | 74 > e >>> 0 | 0 == (0 | i) ? a = 0 : 40 != (0 | A[a]) ? a = 0 : 0 == (0 | (r = Yc(r, e))) ? a = 0 : (A[a + 1] = Tc(r + 12 | 0), A[a + 2] = Tc(r + 14 | 0), A[a + 3] = Vc(r + 16 | 0), A[a + 4] = Vc(r + 17 | 0), e = r + 18 | 0, A[(i = i + 32 | 0) >> 2] = Vc(e), A[i + 4 >> 2] = 0, i = Vc(e), A[a + 5] = 0 == (0 | i) ? 8 : 9 == (0 | i) ? 8 : 16, A[a + 6] = Uc(r + 25 | 0), A[a + 7] = Uc(r + 29 | 0), a = 1), a; }
function $c(r) { A[r >> 2] = 0, ad(r + 4 | 0), A[r + 20 >> 2] = 0; }
function bd(r) { if (0 != (0 | r)) {
    var e = A[r + 168 >> 2];
    0 != (0 | e) && Rc(e), 0 != (0 | (e = A[r + 176 >> 2])) && Pc(e), Nc(r);
} }
function cd(r) { A[r >> 2] = 0, dd(r + 4 | 0); var e = A[(r = r + 20 | 0) >> 2]; 0 != (0 | e) && (bd(e), A[r >> 2] = 0); }
function ed(r) { var e = A[r + 20 >> 2]; 0 != (0 | e) && bd(e), dd(r + 4 | 0); }
function fd(r) { A[r >>= 2] = 0, A[r + 1] = 0, A[r + 2] = 0, A[r + 3] = 0, A[r + 4] = 0, A[r + 5] = 0; }
function gd(r, e) { if ((0 | r) != (0 | e)) {
    var i = r + 168 | 0;
    if (0 != (0 | (a = A[i >> 2])) && (Rc(a), A[i >> 2] = 0, A[r + 164 >> 2] = 0), 0 != (0 | (a = A[(i = r + 176 | 0) >> 2])) && (Pc(a), A[i >> 2] = 0, A[r + 172 >> 2] = 0), hd(r, e, 180), 0 != (0 | A[(i = e + 168 | 0) >> 2])) {
        var a, t = Sc(A[(a = r + 164 | 0) >> 2]);
        A[r + 168 >> 2] = t, 0 != (0 | t) && hd(t, A[i >> 2], A[a >> 2] << 2);
    }
    0 != (0 | A[(i = e + 176 | 0) >> 2]) && (t = Qc(A[(a = r + 172 | 0) >> 2]), A[r + 176 >> 2] = t, 0 != (0 | t) && hd(t, A[i >> 2], A[a >> 2] << 1));
} }
function dd(r) { var e = 0 | r, i = A[e >> 2]; if (0 != (0 | i)) {
    var a = r + 4 | 0;
    Nc(i), A[e >> 2] = 0, A[a >> 2] = 0, A[r + 8 >> 2] = 0;
} z[r + 12 | 0] = 0; }
function id(r, e) { var i, a = E[i = (r + 4 | 0) >> 2], t = (0 | a) == (0 | e); do {
    if (t)
        var n = 1;
    else {
        if (a >>> 0 <= e >>> 0) {
            if (E[r + 8 >> 2] >>> 0 < e >>> 0) {
                if (!jd(r, e, (a + 1 | 0) == (0 | e))) {
                    n = 0;
                    break;
                }
                n = A[i];
            }
            else
                n = a;
            Zb(A[r >> 2] + n | 0, 0, e - n | 0);
        }
        A[i] = e, n = 1;
    }
} while (0); return n; }
function kd(r, e) { return E[r + 4 >> 2] >>> 0 > e >>> 0 || Ec(0 | R.F, 904), A[r >> 2] + e | 0; }
function ld(r) { var e = A[(n = r + 4 | 0) + 4 >> 2]; 0 != (0 | e) & 8193 > e >>> 0 || Ec(0 | R.Ja, 2998); var i = 0 | r; A[i >> 2] = e; var a = r + 20 | 0; 0 == (0 | (f = E[a >> 2])) ? (0 == (0 | (e = Mc(180, 0))) ? e = 0 : 0 == (0 | e) ? e = 0 : (A[e + 164 >> 2] = 0, A[e + 168 >> 2] = 0, A[e + 172 >> 2] = 0, A[e + 176 >> 2] = 0), a = A[a >> 2] = e, i = A[i >> 2]) : (a = f, i = e); var t, n = kd(n, 0); if (16 < (r = E[r >> 2]) >>> 0) {
    e = 1 < r >>> 0;
    r: do {
        if (e)
            for (var o = 0, f = r;;) {
                if (o = o + 1 | 0, 3 >= f >>> 0) {
                    t = o;
                    break r;
                }
                f >>>= 1;
            }
        else
            t = 0;
    } while (0);
    t = 255 & (11 > ((t = 32 == (0 | t) ? 32 : (1 << t >>> 0 < r >>> 0 & 1) + t | 0) + 1 | 0) >>> 0 ? t + 1 | 0 : 11);
}
else
    t = 0; return Oc(a, i, n, t); }
function md(r, e) { if (0 == (0 | e))
    var i = 0;
else if (16 < e >>> 0)
    i = (i = nd(r, e - 16 | 0)) << 16 | nd(r, 16);
else
    i = nd(r, e); return i; }
function S(r, e) { var i, a, t, n; t = E[e + 20 >> 2] >> 2; var o = E[a = (r + 20 | 0) >> 2]; if (24 > (0 | o)) {
    var f = E[i = (r + 4 | 0) >> 2], c = E[r + 8 >> 2];
    n = f >>> 0 < c >>> 0, 16 > (0 | o) ? (n ? (n = f + 1 | 0, f = (255 & B[f]) << 8) : (n = f, f = 0), n >>> 0 < c >>> 0 ? (c = n + 1 | 0, n = 255 & B[n]) : (c = n, n = 0), A[i] = c, A[a] = o + 16 | 0, o = (n | f) << 16 - o | A[(i = r + 16 | 0) >> 2]) : (n ? (A[i] = f + 1 | 0, f = 255 & B[f]) : f = 0, A[a] = o + 8 | 0, o = f << 24 - o | A[(i = r + 16 | 0) >> 2]), A[i >> 2] = o;
}
else
    o = A[r + 16 >> 2]; if (i = r + 16 | 0, c = (f = 1 + (o >>> 16) | 0) >>> 0 > E[t + 4] >>> 0) {
    var u = (n = E[t + 5]) - 1 | 0, s = f >>> 0 > E[(28 + (u << 2) >> 2) + t] >>> 0;
    r: do {
        if (s)
            for (var d = n;;) {
                var v = d + 1 | 0;
                if (f >>> 0 <= E[(28 + (d << 2) >> 2) + t] >>> 0) {
                    var l = v, h = d;
                    break r;
                }
                d = v;
            }
        else
            l = n, h = u;
    } while (0);
    if ((n = (o >>> ((32 - l | 0) >>> 0)) + A[(96 + (h << 2) >> 2) + t] | 0) >>> 0 < E[e >> 2] >>> 0)
        p = l, T = 65535 & C[A[t + 44] + (n << 1) >> 1], n = 22;
    else {
        Ec(0 | R.ca, 3267);
        var b = 0;
        n = 23;
    }
}
else {
    if (-1 == (0 | (p = E[A[t + 42] + (o >>> ((32 - A[t + 2] | 0) >>> 0) << 2) >> 2])) && Ec(0 | R.Na, 3245), T = 65535 & p, p >>>= 16, u = T, E[(n = e + 4 | 0) + 4 >> 2] >>> 0 > u >>> 0 || Ec(0 | R.F, 903), (255 & B[A[n >> 2] + u | 0] | 0) == (0 | p))
        var p = p, T = T;
    else
        Ec(0 | R.Oa, 3249);
    n = 22;
} return 22 == n && (A[i >> 2] <<= p, A[a] = A[a] - p | 0, b = T), b; }
function od(r, e, i) { return 0 == (0 | i) ? r = 0 : (A[r >> 2] = e, A[r + 4 >> 2] = e, A[r + 12 >> 2] = i, A[r + 8 >> 2] = e + i | 0, A[r + 16 >> 2] = 0, A[r + 20 >> 2] = 0, r = 1), r; }
function nd(r, e) { var i; 33 > e >>> 0 || Ec(0 | R.La, 3191); var a = E[i = (r + 20 | 0) >> 2], t = (0 | a) < (0 | e); r: do {
    if (t)
        for (var n = r + 4 | 0, o = r + 8 | 0, f = r + 16 | 0, c = a;;) {
            var u = A[n >> 2];
            if ((0 | u) == (0 | A[o >> 2]) ? u = 0 : (A[n >> 2] = u + 1 | 0, u = 255 & B[u]), c = c + 8 | 0, A[i] = c, 33 > (0 | c) || (Ec(0 | R.Ma, 3200), c = A[i]), u = u << 32 - c | A[f >> 2], A[f >> 2] = u, (0 | c) >= (0 | e)) {
                var s = c, d = u;
                break r;
            }
        }
    else
        s = a, d = A[r + 16 >> 2];
} while (0); return A[r + 16 >> 2] = d << e, A[i] = s - e | 0, d >>> ((32 - e | 0) >>> 0); }
function pd(r, e) { var i, a = v; v += 24; r: do {
    for (var t = 0, n = 8192;;)
        if (t = t + 1 | 0, 0 == (0 | (n >>>= 1))) {
            i = t;
            break r;
        }
} while (0); if (t = 0 == (0 | (i = md(r, i))))
    cd(e), n = 1;
else if (id(n = e + 4 | 0, i)) {
    var A = kd(n, 0);
    if (Zb(A, 0, i), 0 == (0 | (A = md(r, 5))) | 21 < A >>> 0)
        n = 0;
    else {
        $c(a);
        var o = a + 4 | 0, f = id(o, 21);
        r: do {
            if (f) {
                for (var c = 0;;) {
                    var u = md(r, 3), s = kd(o, 255 & B[R.za + c | 0]);
                    if (z[s] = 255 & u, (0 | (c = c + 1 | 0)) == (0 | A))
                        break;
                }
                if (ld(a)) {
                    c = 0;
                    e: for (;;) {
                        s = c >>> 0 < i >>> 0, u = i - c | 0;
                        for (var d = 0 == (0 | c), l = c - 1 | 0;;) {
                            if (!s) {
                                if ((0 | c) != (0 | i)) {
                                    T = 0;
                                    break r;
                                }
                                T = ld(e);
                                break r;
                            }
                            var h = S(r, a);
                            if (17 > h >>> 0) {
                                u = kd(n, c), z[u] = 255 & h, c = c + 1 | 0;
                                continue e;
                            }
                            if (17 == (0 | h)) {
                                if ((s = md(r, 3) + 3 | 0) >>> 0 > u >>> 0) {
                                    T = 0;
                                    break r;
                                }
                                c = s + c | 0;
                                continue e;
                            }
                            if (18 == (0 | h)) {
                                if ((s = md(r, 7) + 11 | 0) >>> 0 > u >>> 0) {
                                    T = 0;
                                    break r;
                                }
                                c = s + c | 0;
                                continue e;
                            }
                            if (2 <= (h - 19 | 0) >>> 0) {
                                Ec(0 | R.ca, 3141), T = 0;
                                break r;
                            }
                            if (d | (h = 19 == (0 | h) ? md(r, 2) + 3 | 0 : md(r, 6) + 7 | 0) >>> 0 > u >>> 0) {
                                T = 0;
                                break r;
                            }
                            var b = kd(n, l);
                            if (0 == (b = B[b]) << 24 >> 24) {
                                T = 0;
                                break r;
                            }
                            var p = h + c | 0;
                            if (c >>> 0 < p >>> 0) {
                                var E = c;
                                break;
                            }
                        }
                        for (;;) {
                            if (u = kd(n, E), s = E + 1 | 0, z[u] = b, (0 | s) == (0 | p)) {
                                c = p;
                                continue e;
                            }
                            E = s;
                        }
                    }
                }
                else
                    var T = 0;
            }
            else
                T = 0;
        } while (0);
        ed(a), n = T;
    }
}
else
    n = 0; return v = a, n; }
function qd(r, e, i, a, t, n, o) { var f = r + 88 | 0, c = (3 + (1 < Tc((u = E[f >> 2]) + 12 | 0) >>> (o >>> 0) >>> 0 ? Tc(u + 12 | 0) >>> (o >>> 0) : 1) | 0) >>> 2, u = (o = (3 + (1 < Tc(u + 14 | 0) >>> (o >>> 0) >>> 0 ? Tc(u + 14 | 0) >>> (o >>> 0) : 1) | 0) >>> 2, (0 == (0 | (u = Vc(u + 18 | 0))) ? 8 : 9 == (0 | u) ? 8 : 16) * c | 0); if (0 == (0 | n)) {
    var s = u;
    n = 5;
}
else if (u >>> 0 <= n >>> 0 & 0 == (3 & n | 0))
    s = n, n = 5;
else {
    var d = 0;
    n = 12;
} return 5 == n && ((s * o | 0) >>> 0 > t >>> 0 ? d = 0 : (t = (c + 1 | 0) >>> 1, d = (o + 1 | 0) >>> 1, od(r + 92 | 0, e, i) ? 0 == (0 | (e = Vc(A[f >> 2] + 18 | 0))) ? (rd(r, a, 0, s, c, o, t, d), d = 1) : 2 == (0 | e) || 3 == (0 | e) || 5 == (0 | e) || 6 == (0 | e) || 4 == (0 | e) ? (sd(r, a, 0, s, c, o, t, d), d = 1) : 9 == (0 | e) ? (td(r, a, 0, s, c, o, t, d), d = 1) : 7 == (0 | e) || 8 == (0 | e) ? (ud(r, a, 0, s, c, o, t, d), d = 1) : d = 0 : d = 0)), d; }
function xd(r) { A[r >> 2] = 0, A[r + 4 >> 2] = 0, A[r + 8 >> 2] = 0, z[r + 12 | 0] = 0; }
function wd(r) { A[r >> 2] = 0, A[r + 4 >> 2] = 0, A[r + 8 >> 2] = 0, z[r + 12 | 0] = 0; }
function ad(r) { A[r >> 2] = 0, A[r + 4 >> 2] = 0, A[r + 8 >> 2] = 0, z[r + 12 | 0] = 0; }
function vd(r) { A[r >> 2] = 40; }
function Dd(r) { var e = 0 | r, i = A[e >> 2]; if (0 != (0 | i)) {
    var a = r + 4 | 0;
    Nc(i), A[e >> 2] = 0, A[a >> 2] = 0, A[r + 8 >> 2] = 0;
} z[r + 12 | 0] = 0; }
function Ed(r) { var e = 0 | r, i = A[e >> 2]; if (0 != (0 | i)) {
    var a = r + 4 | 0;
    Nc(i), A[e >> 2] = 0, A[a >> 2] = 0, A[r + 8 >> 2] = 0;
} z[r + 12 | 0] = 0; }
function jd(r, e, i) { return Jc(r, e, i, 1, 0) ? r = 1 : (z[r + 12 | 0] = 1, r = 0), r; }
function rd(r, e, i, a, t, n, o, f) { var c, u, s, d, l, h = v; v += 24, l = h >> 2; var b = h + 4; d = b >> 2; i = h + 8 >> 2; var p = r + 236 | 0, T = A[p + 4 >> 2], k = r + 252 | 0, w = A[k + 4 >> 2]; A[l] = 0, A[d] = 0; var y = Vc(A[r + 88 >> 2] + 17 | 0), M = a >>> 2, g = 0 == (0 | y); r: do {
    if (!g)
        for (var I = 0 == (0 | f), N = f - 1 | 0, m = 0 != (1 & n | 0), X = a << 1, C = r + 92 | 0, z = r + 116 | 0, O = r + 188 | 0, F = M + 1 | 0, j = M + 2 | 0, U = M + 3 | 0, _ = o - 1 | 0, V = r + 140 | 0, L = _ << 4, H = 0 != (1 & t | 0), Z = 0, x = 1;;) {
            e: do {
                if (I)
                    var G = x;
                else
                    for (var P = A[e + (Z << 2) >> 2], $ = 0, q = x;;) {
                        if (0 == (1 & $ | 0))
                            var D = P, W = 16, Y = 1, J = o, Q = 0;
                        else
                            D = P + L | 0, W = -16, J = Y = -1, Q = _;
                        var K = (0 | $) == (0 | N), rr = K & m, er = (0 | Q) == (0 | J);
                        i: do {
                            if (er)
                                var ir = q;
                            else {
                                var ar = K & m ^ 1, tr = q, nr = D;
                                s = nr >> 2;
                                for (var Ar = Q;;) {
                                    tr = 7 & (or = 1 == (0 | tr) ? 512 | S(C, z) : tr);
                                    var or = or >>> 3;
                                    u = 255 & B[R.D + tr | 0];
                                    for (var fr = 0, cr = A[l];;) {
                                        var ur = S(C, V);
                                        if (A[l] = cr + ur | 0, Fd(h, T), ur = Gd(p, cr = E[l]), A[(fr << 2 >> 2) + i] = A[ur >> 2], (fr = fr + 1 | 0) >>> 0 >= u >>> 0)
                                            break;
                                    }
                                    u = nr >> 2, cr = rr | (fr = (0 | Ar) == (0 | _) & H);
                                    a: do {
                                        if (cr)
                                            for (ur = 0;;) {
                                                var sr = ur * a | 0;
                                                c = sr >> 2;
                                                var dr = nr + sr | 0, vr = 0 == (0 | ur) | ar, lr = ur << 1, hr = S(C, O);
                                                if (A[d] = A[d] + hr | 0, Fd(b, w), fr ? (vr && (A[dr >> 2] = A[((255 & B[(tr << 2) + Hd + lr | 0]) << 2 >> 2) + i], lr = Gd(k, A[d]), A[c + (s + 1)] = A[lr >> 2]), c = S(C, O), A[d] = A[d] + c | 0, Fd(b, w)) : vr ? (A[dr >> 2] = A[((255 & B[(tr << 2) + Hd + lr | 0]) << 2 >> 2) + i], dr = Gd(k, A[d]), A[c + (s + 1)] = A[dr >> 2], sr = sr + (nr + 8) | 0, dr = S(C, O), A[d] = A[d] + dr | 0, Fd(b, w), A[sr >> 2] = A[((255 & B[(tr << 2) + Hd + (1 | lr) | 0]) << 2 >> 2) + i], lr = Gd(k, A[d]), A[c + (s + 3)] = A[lr >> 2]) : (c = S(C, O), A[d] = A[d] + c | 0, Fd(b, w)), 2 == (0 | (ur = ur + 1 | 0)))
                                                    break a;
                                            }
                                        else
                                            A[u] = A[((255 & B[(tr << 2) + Hd | 0]) << 2 >> 2) + i], ur = S(C, O), A[d] = A[d] + ur | 0, Fd(b, w), ur = Gd(k, A[d]), A[s + 1] = A[ur >> 2], A[s + 2] = A[((255 & B[(tr << 2) + Hd + 1 | 0]) << 2 >> 2) + i], ur = S(C, O), A[d] = A[d] + ur | 0, Fd(b, w), ur = Gd(k, A[d]), A[s + 3] = A[ur >> 2], A[(M << 2 >> 2) + u] = A[((255 & B[(tr << 2) + Hd + 2 | 0]) << 2 >> 2) + i], ur = S(C, O), A[d] = A[d] + ur | 0, Fd(b, w), ur = Gd(k, A[d]), A[(F << 2 >> 2) + u] = A[ur >> 2], A[(j << 2 >> 2) + u] = A[((255 & B[(tr << 2) + Hd + 3 | 0]) << 2 >> 2) + i], ur = S(C, O), A[d] = A[d] + ur | 0, Fd(b, w), ur = Gd(k, A[d]), A[(U << 2 >> 2) + u] = A[ur >> 2];
                                    } while (0);
                                    if ((0 | (Ar = Ar + Y | 0)) == (0 | J)) {
                                        ir = or;
                                        break i;
                                    }
                                    tr = or, s = (nr = nr + W | 0) >> 2;
                                }
                            }
                        } while (0);
                        if ((0 | (s = $ + 1 | 0)) == (0 | f)) {
                            G = ir;
                            break e;
                        }
                        P = P + X | 0, $ = s, q = ir;
                    }
            } while (0);
            if ((0 | (Z = Z + 1 | 0)) == (0 | y))
                break r;
            x = G;
        }
} while (0); return v = h, 1; }
function Cd(r) { A[r >> 2] = 0, Ed(r + 284 | 0), Ed(r + 268 | 0), Dd(r + 252 | 0), Dd(r + 236 | 0); var e = r + 188 | 0; ed(r + 212 | 0), ed(e), e = r + 140 | 0, ed(r + 164 | 0), ed(e), ed(r + 116 | 0); }
function Fd(r, e) { var i = A[r >> 2], a = i - e | 0, t = a >> 31; A[r >> 2] = t & i | a & (-1 ^ t); }
function sd(r, e, i, a, t, n, o, f) { var c, u, s, d, l, h, b, p, T = v; v += 48, p = T >> 2; var k = T + 4; b = k >> 2; var w = T + 8; h = w >> 2; var y = T + 12; l = y >> 2, d = T + 16 >> 2; i = T + 32 >> 2; var M = r + 236 | 0, g = A[M + 4 >> 2], I = r + 252 | 0, N = A[I + 4 >> 2], m = r + 268 | 0, X = A[m + 4 >> 2], z = Tc((O = A[r + 88 >> 2]) + 63 | 0); A[p] = 0, A[b] = 0, A[h] = 0, A[l] = 0; var O, F = 0 == (0 | (O = Vc(O + 17 | 0))); r: do {
    if (!F)
        for (var j = 0 == (0 | f), U = f - 1 | 0, _ = 0 == (1 & n | 0), V = a << 1, L = r + 92 | 0, H = r + 116 | 0, Z = r + 212 | 0, x = r + 188 | 0, G = r + 284 | 0, P = r + 140 | 0, $ = r + 164 | 0, q = o - 1 | 0, D = q << 5, W = 0 != (1 & t | 0), Y = 0, J = 1;;) {
            e: do {
                if (j)
                    var Q = J;
                else
                    for (var K = A[e + (Y << 2) >> 2], rr = 0, er = J;;) {
                        if (0 == (1 & rr | 0))
                            var ir = K, ar = 32, tr = 1, nr = o, Ar = 0;
                        else
                            ir = K + D | 0, ar = -32, nr = tr = -1, Ar = q;
                        var or = _ | (0 | rr) != (0 | U), fr = (0 | Ar) == (0 | nr);
                        i: do {
                            if (fr)
                                var cr = er;
                            else
                                for (var ur = er, sr = ir, dr = Ar;;) {
                                    ur = 7 & (vr = 1 == (0 | ur) ? 512 | S(L, H) : ur);
                                    var vr = vr >>> 3;
                                    s = 255 & B[R.D + ur | 0];
                                    for (var lr = 0, hr = A[h];;) {
                                        var br = S(L, $);
                                        if (A[h] = hr + br | 0, Fd(w, X), br = Id(m, hr = E[h]), A[(lr << 2 >> 2) + i] = 65535 & C[br >> 1], (lr = lr + 1 | 0) >>> 0 >= s >>> 0)
                                            break;
                                    }
                                    for (lr = 0, hr = A[p]; br = S(L, P), A[p] = hr + br | 0, Fd(T, g), br = Gd(M, hr = E[p]), A[(lr << 2 >> 2) + d] = A[br >> 2], !((lr = lr + 1 | 0) >>> 0 >= s >>> 0);)
                                        ;
                                    for (lr = (0 | dr) == (0 | q) & W, s = (hr = sr) >> 2, br = 0;;) {
                                        var pr = 0 == (0 | br) | or;
                                        if (c = br << 1, u = S(L, Z), A[l] = A[l] + u | 0, Fd(y, z), u = S(L, x), A[b] = A[b] + u | 0, Fd(k, N), pr) {
                                            var Er = hr, Tr = 255 & B[(ur << 2) + Hd + c | 0];
                                            u = Id(G, 3 * A[l] | 0) >> 1, A[Er >> 2] = (65535 & C[u]) << 16 | A[(Tr << 2 >> 2) + i], A[s + 1] = (65535 & C[u + 2]) << 16 | 65535 & C[u + 1], A[s + 2] = A[(Tr << 2 >> 2) + d], u = Gd(I, A[b]), A[s + 3] = A[u >> 2];
                                        }
                                        if (u = S(L, Z), A[l] = A[l] + u | 0, Fd(y, z), u = S(L, x), A[b] = A[b] + u | 0, Fd(k, N), lr | 1 ^ pr || (pr = hr + 16 | 0, u = 255 & B[(ur << 2) + Hd + (1 | c) | 0], c = Id(G, 3 * A[l] | 0) >> 1, A[pr >> 2] = (65535 & C[c]) << 16 | A[(u << 2 >> 2) + i], A[s + 5] = (65535 & C[c + 2]) << 16 | 65535 & C[c + 1], A[s + 6] = A[(u << 2 >> 2) + d], c = Gd(I, A[b]), A[s + 7] = A[c >> 2]), 2 == (0 | (br = br + 1 | 0)))
                                            break;
                                        s = (hr = hr + a | 0) >> 2;
                                    }
                                    if ((0 | (dr = dr + tr | 0)) == (0 | nr)) {
                                        cr = vr;
                                        break i;
                                    }
                                    ur = vr, sr = sr + ar | 0;
                                }
                        } while (0);
                        if ((0 | (rr = rr + 1 | 0)) == (0 | f)) {
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
} while (0); return v = T, 1; }
function td(r, e, i, a, t, n, o, f) { var c, u, s, d, l, h = v; v += 24, l = h >> 2; var b = h + 4; d = b >> 2; i = h + 8 >> 2; var p = r + 268 | 0, T = A[p + 4 >> 2], k = Tc((w = A[r + 88 >> 2]) + 63 | 0); A[l] = 0, A[d] = 0; var w, y = 0 == (0 | (w = Vc(w + 17 | 0))); r: do {
    if (!y)
        for (var M = 0 == (0 | f), g = f - 1 | 0, I = 0 == (1 & n | 0), N = a << 1, m = r + 92 | 0, X = r + 116 | 0, z = 0 == (1 & t | 0), O = r + 164 | 0, F = r + 212 | 0, j = r + 284 | 0, U = o - 1 | 0, _ = U << 4, V = 0, L = 1;;) {
            e: do {
                if (M)
                    var H = L;
                else
                    for (var Z = A[e + (V << 2) >> 2], x = 0, G = L;;) {
                        if (0 == (1 & x | 0))
                            var P = Z, $ = 16, q = 1, D = o, W = 0;
                        else
                            P = Z + _ | 0, $ = -16, D = q = -1, W = U;
                        var Y = I | (0 | x) != (0 | g), J = (0 | W) == (0 | D);
                        i: do {
                            if (J)
                                var Q = G;
                            else
                                for (var K = G, rr = P, er = W;;) {
                                    K = 7 & (ir = 1 == (0 | K) ? 512 | S(m, X) : K);
                                    var ir = ir >>> 3, ar = 255 & B[R.D + K | 0], tr = z | (0 | er) != (0 | U);
                                    for (c = 0, u = A[l];;) {
                                        var nr = S(m, O);
                                        if (A[l] = u + nr | 0, Fd(h, T), nr = Id(p, u = E[l]), A[(c << 2 >> 2) + i] = 65535 & C[nr >> 1], (c = c + 1 | 0) >>> 0 >= ar >>> 0) {
                                            var Ar = rr;
                                            s = Ar >> 2;
                                            var or = 0;
                                            break;
                                        }
                                    }
                                    for (; ar = Ar, u = 0 == (0 | or) | Y, c = or << 1, nr = S(m, F), A[d] = A[d] + nr | 0, Fd(b, k), tr ? u ? (nr = 255 & B[(K << 2) + Hd + c | 0], u = Id(j, 3 * A[d] | 0) >> 1, A[ar >> 2] = (65535 & C[u]) << 16 | A[(nr << 2 >> 2) + i], A[s + 1] = (65535 & C[u + 2]) << 16 | 65535 & C[u + 1], ar = Ar + 8 | 0, u = S(m, F), A[d] = A[d] + u | 0, Fd(b, k), u = 255 & B[(K << 2) + Hd + (1 | c) | 0], c = Id(j, 3 * A[d] | 0) >> 1, A[ar >> 2] = (65535 & C[c]) << 16 | A[(u << 2 >> 2) + i], A[s + 3] = (65535 & C[c + 2]) << 16 | 65535 & C[c + 1]) : (ar = S(m, F), A[d] = A[d] + ar | 0, Fd(b, k)) : (u && (u = 255 & B[(K << 2) + Hd + c | 0], c = Id(j, 3 * A[d] | 0) >> 1, A[ar >> 2] = (65535 & C[c]) << 16 | A[(u << 2 >> 2) + i], A[s + 1] = (65535 & C[c + 2]) << 16 | 65535 & C[c + 1]), ar = S(m, F), A[d] = A[d] + ar | 0, Fd(b, k)), 2 != (0 | (ar = or + 1 | 0));)
                                        s = (Ar = Ar + a | 0) >> 2, or = ar;
                                    if ((0 | (er = er + q | 0)) == (0 | D)) {
                                        Q = ir;
                                        break i;
                                    }
                                    K = ir, rr = rr + $ | 0;
                                }
                        } while (0);
                        if ((0 | (x = x + 1 | 0)) == (0 | f)) {
                            H = Q;
                            break e;
                        }
                        Z = Z + N | 0, G = Q;
                    }
            } while (0);
            if ((0 | (V = V + 1 | 0)) == (0 | w))
                break r;
            L = H;
        }
} while (0); return v = h, 1; }
function ud(r, e, i, a, t, n, o, f) { var c, u, s, d, l, h, b, p, T, k = v; v += 48, T = k >> 2; var w = k + 4; p = w >> 2; var y = k + 8; b = y >> 2; var M = k + 12; h = M >> 2, l = k + 16 >> 2; i = k + 32 >> 2; var g = r + 268 | 0, I = A[g + 4 >> 2], N = Tc((m = A[r + 88 >> 2]) + 63 | 0); A[T] = 0, A[p] = 0, A[b] = 0, A[h] = 0; var m, X = 0 == (0 | (m = Vc(m + 17 | 0))); r: do {
    if (!X)
        for (var z = 0 == (0 | f), O = f - 1 | 0, F = 0 == (1 & n | 0), j = a << 1, U = r + 92 | 0, _ = r + 116 | 0, V = r + 212 | 0, L = r + 284 | 0, H = r + 164 | 0, Z = o - 1 | 0, x = Z << 5, G = 0 != (1 & t | 0), P = 0, $ = 1;;) {
            e: do {
                if (z)
                    var q = $;
                else
                    for (var D = A[e + (P << 2) >> 2], W = 0, Y = $;;) {
                        if (0 == (1 & W | 0))
                            var J = D, Q = 32, K = 1, rr = o, er = 0;
                        else
                            J = D + x | 0, Q = -32, rr = K = -1, er = Z;
                        var ir = F | (0 | W) != (0 | O), ar = (0 | er) == (0 | rr);
                        i: do {
                            if (ar)
                                var tr = Y;
                            else
                                for (var nr = Y, Ar = J, or = er;;) {
                                    nr = 7 & (fr = 1 == (0 | nr) ? 512 | S(U, _) : nr);
                                    var fr = fr >>> 3;
                                    d = 255 & B[R.D + nr | 0];
                                    for (var cr = 0, ur = A[T];;) {
                                        var sr = S(U, H);
                                        if (A[T] = ur + sr | 0, Fd(k, I), sr = Id(g, ur = E[T]), A[(cr << 2 >> 2) + l] = 65535 & C[sr >> 1], (cr = cr + 1 | 0) >>> 0 >= d >>> 0)
                                            break;
                                    }
                                    for (cr = 0, ur = A[b]; sr = S(U, H), A[b] = ur + sr | 0, Fd(y, I), sr = Id(g, ur = E[b]), A[(cr << 2 >> 2) + i] = 65535 & C[sr >> 1], !((cr = cr + 1 | 0) >>> 0 >= d >>> 0);)
                                        ;
                                    for (cr = (0 | or) == (0 | Z) & G, d = (ur = Ar) >> 2, sr = 0;;) {
                                        var dr = 0 == (0 | sr) | ir;
                                        if (c = sr << 1, u = S(U, V), A[p] = A[p] + u | 0, Fd(w, N), u = S(U, V), A[h] = A[h] + u | 0, Fd(M, N), dr) {
                                            var vr = ur, lr = 255 & B[(nr << 2) + Hd + c | 0];
                                            s = Id(L, 3 * A[p] | 0) >> 1, u = Id(L, 3 * A[h] | 0) >> 1, A[vr >> 2] = (65535 & C[s]) << 16 | A[(lr << 2 >> 2) + l], A[d + 1] = (65535 & C[s + 2]) << 16 | 65535 & C[s + 1], A[d + 2] = (65535 & C[u]) << 16 | A[(lr << 2 >> 2) + i], A[d + 3] = (65535 & C[u + 2]) << 16 | 65535 & C[u + 1];
                                        }
                                        if (u = S(U, V), A[p] = A[p] + u | 0, Fd(w, N), u = S(U, V), A[h] = A[h] + u | 0, Fd(M, N), cr | 1 ^ dr || (dr = ur + 16 | 0, s = 255 & B[(nr << 2) + Hd + (1 | c) | 0], u = Id(L, 3 * A[p] | 0) >> 1, c = Id(L, 3 * A[h] | 0) >> 1, A[dr >> 2] = (65535 & C[u]) << 16 | A[(s << 2 >> 2) + l], A[d + 5] = (65535 & C[u + 2]) << 16 | 65535 & C[u + 1], A[d + 6] = (65535 & C[c]) << 16 | A[(s << 2 >> 2) + i], A[d + 7] = (65535 & C[c + 2]) << 16 | 65535 & C[c + 1]), 2 == (0 | (sr = sr + 1 | 0)))
                                            break;
                                        d = (ur = ur + a | 0) >> 2;
                                    }
                                    if ((0 | (or = or + K | 0)) == (0 | rr)) {
                                        tr = fr;
                                        break i;
                                    }
                                    nr = fr, Ar = Ar + Q | 0;
                                }
                        } while (0);
                        if ((0 | (W = W + 1 | 0)) == (0 | f)) {
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
} while (0); return v = k, 1; }
function Id(r, e) { return E[r + 4 >> 2] >>> 0 > e >>> 0 || Ec(0 | R.F, 904), (e << 1) + A[r >> 2] | 0; }
function Gd(r, e) { return E[r + 4 >> 2] >>> 0 > e >>> 0 || Ec(0 | R.F, 904), (e << 2) + A[r >> 2] | 0; }
function Jd(r, e) { var i, a = E[i = (r + 4 | 0) >> 2], t = (0 | a) == (0 | e); do {
    if (t)
        var n = 1;
    else {
        if (a >>> 0 <= e >>> 0) {
            if (E[r + 8 >> 2] >>> 0 < e >>> 0) {
                if (Jc(n = r, e, (a + 1 | 0) == (0 | e), 2, 0) ? n = 1 : (z[n + 12 | 0] = 1, n = 0), !n) {
                    n = 0;
                    break;
                }
                n = A[i];
            }
            else
                n = a;
            Zb((n << 1) + A[r >> 2] | 0, 0, (e - n | 0) << 1);
        }
        A[i] = e, n = 1;
    }
} while (0); return n; }
function Kd(r, e) { var i, a = E[i = (r + 4 | 0) >> 2], t = (0 | a) == (0 | e); do {
    if (t)
        var n = 1;
    else {
        if (a >>> 0 <= e >>> 0) {
            if (E[r + 8 >> 2] >>> 0 < e >>> 0) {
                if (Jc(n = r, e, (a + 1 | 0) == (0 | e), 4, 0) ? n = 1 : (z[n + 12 | 0] = 1, n = 0), !n) {
                    n = 0;
                    break;
                }
                n = A[i];
            }
            else
                n = a;
            Zb((n << 2) + A[r >> 2] | 0, 0, (e - n | 0) << 2);
        }
        A[i] = e, n = 1;
    }
} while (0); return n; }
function yd(r) { var e = v; v += 48; var i, a = r + 88 | 0, t = Tc(A[a >> 2] + 39 | 0), n = r + 236 | 0; if (Kd(n, t)) {
    var o = r + 92 | 0, f = A[a >> 2];
    if (od(o, A[r + 4 >> 2] + Wc(f + 33 | 0) | 0, Wc(f + 36 | 0))) {
        $c(f = 0 | e);
        var c = e + 24 | 0;
        $c(c);
        for (var u = 0;;) {
            if (2 <= u >>> 0) {
                i = 9;
                break;
            }
            if (!pd(o, e + 24 * u | 0)) {
                var s = 0;
                i = 11;
                break;
            }
            u = u + 1 | 0;
        }
        r: do {
            if (9 == i) {
                var d = Gd(n, 0);
                if (0 == (0 | t))
                    s = 1;
                else
                    for (var l = u = 0, h = 0, b = 0, p = 0, E = 0, T = 0;;) {
                        E = S(o, f) + E & 31, p = S(o, c) + p & 63, b = S(o, f) + b & 31;
                        var R = S(o, f) + h | 0;
                        h = 31 & R, l = S(o, c) + l & 63, u = S(o, f) + u & 31;
                        if (A[d >> 2] = p << 5 | E << 11 | b | R << 27 | l << 21 | u << 16, (0 | (T = T + 1 | 0)) == (0 | t)) {
                            s = 1;
                            break r;
                        }
                        d = d + 4 | 0;
                    }
            }
        } while (0);
        ed(c), ed(f), o = s;
    }
    else
        o = 0;
}
else
    o = 0; return v = e, o; }
function zd(r) { var e = v; v += 480; var i = e + 24, a = e + 220, t = e + 416, n = A[r + 88 >> 2], o = Tc(n + 47 | 0), f = r + 92 | 0; if (od(f, A[r + 4 >> 2] + Wc(n + 41 | 0) | 0, Wc(n + 44 | 0))) {
    $c(e), n = pd(f, e);
    r: do {
        if (n) {
            for (var c = -3, u = -3, s = 0;;) {
                A[i + (s << 2) >> 2] = c, A[a + (s << 2) >> 2] = u;
                u = (1 & (l = 3 < (0 | (c = c + 1 | 0)))) + u | 0;
                if (49 == (0 | (s = s + 1 | 0)))
                    break;
                c = l ? -3 : c;
            }
            if (Zb(t, 0, 64), Kd(u = r + 252 | 0, o)) {
                var d = Gd(u, 0);
                if (0 == (0 | o))
                    F = 1;
                else {
                    u = 0 | t, s = t + 4 | 0, c = t + 8 | 0;
                    for (var l = t + 12 | 0, h = t + 16 | 0, b = t + 20 | 0, p = t + 24 | 0, E = t + 28 | 0, T = t + 32 | 0, k = t + 36 | 0, w = t + 40 | 0, y = t + 44 | 0, M = t + 48 | 0, g = t + 52 | 0, I = t + 56 | 0, N = t + 60 | 0, m = 0;;) {
                        for (var X = 0;;) {
                            var C = S(f, e), z = X << 1, O = (z << 2) + t | 0;
                            if (A[O >> 2] = A[O >> 2] + A[i + (C << 2) >> 2] & 3, A[(z = ((1 | z) << 2) + t | 0) >> 2] = A[z >> 2] + A[a + (C << 2) >> 2] & 3, 8 == (0 | (X = X + 1 | 0)))
                                break;
                        }
                        if (A[d >> 2] = (255 & B[R.h + A[s >> 2] | 0]) << 2 | 255 & B[R.h + A[u >> 2] | 0] | (255 & B[R.h + A[c >> 2] | 0]) << 4 | (255 & B[R.h + A[l >> 2] | 0]) << 6 | (255 & B[R.h + A[h >> 2] | 0]) << 8 | (255 & B[R.h + A[b >> 2] | 0]) << 10 | (255 & B[R.h + A[p >> 2] | 0]) << 12 | (255 & B[R.h + A[E >> 2] | 0]) << 14 | (255 & B[R.h + A[T >> 2] | 0]) << 16 | (255 & B[R.h + A[k >> 2] | 0]) << 18 | (255 & B[R.h + A[w >> 2] | 0]) << 20 | (255 & B[R.h + A[y >> 2] | 0]) << 22 | (255 & B[R.h + A[M >> 2] | 0]) << 24 | (255 & B[R.h + A[g >> 2] | 0]) << 26 | (255 & B[R.h + A[I >> 2] | 0]) << 28 | (255 & B[R.h + A[N >> 2] | 0]) << 30, (0 | (m = m + 1 | 0)) == (0 | o)) {
                            F = 1;
                            break r;
                        }
                        d = d + 4 | 0;
                    }
                }
            }
            else
                var F = 0;
        }
        else
            F = 0;
    } while (0);
    ed(e), r = F;
}
else
    r = 0; return v = e, r; }
function Ad(r) { var e = v; v += 24; var i = A[r + 88 >> 2], a = Tc(i + 55 | 0), t = r + 92 | 0; if (od(t, A[r + 4 >> 2] + Wc(i + 49 | 0) | 0, Wc(i + 52 | 0))) {
    $c(e), i = pd(t, e);
    r: do {
        if (i) {
            var n = r + 268 | 0;
            if (Jd(n, a))
                if (n = Id(n, 0), 0 == (0 | a))
                    u = 1;
                else
                    for (var o = 0, f = 0, c = 0;;) {
                        o = S(t, e) + o & 255, f = S(t, e) + f & 255;
                        if (hb[n >> 1] = 65535 & (f << 8 | o), (0 | (c = c + 1 | 0)) == (0 | a)) {
                            u = 1;
                            break r;
                        }
                        n = n + 2 | 0;
                    }
            else
                var u = 0;
        }
        else
            u = 0;
    } while (0);
    ed(e), r = u;
}
else
    r = 0; return v = e, r; }
function Bd(r) { var e, i = v; v += 1888; var a = i + 24, t = i + 924, n = i + 1824, o = A[r + 88 >> 2], f = Tc(o + 63 | 0), c = r + 92 | 0; if (od(c, A[r + 4 >> 2] + Wc(o + 57 | 0) | 0, Wc(o + 60 | 0))) {
    $c(i), o = pd(c, i);
    r: do {
        if (o) {
            for (var u = -7, s = -7, d = 0;;) {
                A[a + (d << 2) >> 2] = u, A[t + (d << 2) >> 2] = s;
                s = (1 & (l = 7 < (0 | (u = u + 1 | 0)))) + s | 0;
                if (225 == (0 | (d = d + 1 | 0)))
                    break;
                u = l ? -7 : u;
            }
            if (Zb(n, 0, 64), Jd(s = r + 284 | 0, 3 * f | 0))
                if (e = Id(s, 0), 0 == (0 | f))
                    j = 1;
                else {
                    s = 0 | n, d = n + 4 | 0, u = n + 8 | 0;
                    var l = n + 12 | 0, h = n + 16 | 0, b = n + 20 | 0, p = n + 24 | 0, E = n + 28 | 0, T = n + 32 | 0, k = n + 36 | 0, w = n + 40 | 0, y = n + 44 | 0, M = n + 48 | 0, g = n + 52 | 0, I = n + 56 | 0, N = n + 60 | 0, m = e;
                    e = m >> 1;
                    for (var X = 0;;) {
                        for (var C = 0;;) {
                            var z = S(c, i), O = C << 1, F = (O << 2) + n | 0;
                            if (A[F >> 2] = A[F >> 2] + A[a + (z << 2) >> 2] & 7, A[(O = ((1 | O) << 2) + n | 0) >> 2] = A[O >> 2] + A[t + (z << 2) >> 2] & 7, 8 == (0 | (C = C + 1 | 0)))
                                break;
                        }
                        if (hb[e] = (255 & B[R.g + A[d >> 2] | 0]) << 3 | 255 & B[R.g + A[s >> 2] | 0] | (255 & B[R.g + A[u >> 2] | 0]) << 6 | (255 & B[R.g + A[l >> 2] | 0]) << 9 | (255 & B[R.g + A[h >> 2] | 0]) << 12 | (255 & B[R.g + A[b >> 2] | 0]) << 15, hb[e + 1] = (255 & B[R.g + A[p >> 2] | 0]) << 2 | (255 & B[R.g + A[b >> 2] | 0]) >>> 1 | (255 & B[R.g + A[E >> 2] | 0]) << 5 | (255 & B[R.g + A[T >> 2] | 0]) << 8 | (255 & B[R.g + A[k >> 2] | 0]) << 11 | (255 & B[R.g + A[w >> 2] | 0]) << 14, hb[e + 2] = (255 & B[R.g + A[y >> 2] | 0]) << 1 | (255 & B[R.g + A[w >> 2] | 0]) >>> 2 | (255 & B[R.g + A[M >> 2] | 0]) << 4 | (255 & B[R.g + A[g >> 2] | 0]) << 7 | (255 & B[R.g + A[I >> 2] | 0]) << 10 | (255 & B[R.g + A[N >> 2] | 0]) << 13, (0 | (X = X + 1 | 0)) == (0 | f)) {
                            j = 1;
                            break r;
                        }
                        e = (m = m + 6 | 0) >> 1;
                    }
                }
            else
                var j = 0;
        }
        else
            j = 0;
    } while (0);
    ed(i), r = j;
}
else
    r = 0; return v = i, r; }
function Yb(r) { if (245 > r >>> 0) {
    var e = (i = 11 > r >>> 0 ? 16 : r + 11 & -8) >>> 3;
    if (0 != (3 & (a = (r = E[T >> 2]) >>> (e >>> 0)) | 0)) {
        e = ((i = (n = (1 & a ^ 1) + e | 0) << 1) << 2) + T + 40 | 0;
        var i, a = E[(f = (i + 2 << 2) + T + 40 | 0) >> 2];
        (0 | e) == (0 | (t = E[(i = a + 8 | 0) >> 2])) ? A[T >> 2] = r & (1 << n ^ -1) : (t >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[f >> 2] = t, A[t + 12 >> 2] = e), r = n << 3, A[a + 4 >> 2] = 3 | r, A[(r = a + (4 | r) | 0) >> 2] |= 1, n = i, r = 38;
    }
    else if (i >>> 0 > E[T + 8 >> 2] >>> 0)
        if (0 != (0 | a)) {
            var t, n, o, f = ((n = (e = ((e = (a = (e = ((n = a << e & ((n = 2 << e) | -n)) & -n) - 1 | 0) >>> ((n = e >>> 12 & 16) >>> 0)) >>> 5 & 8) | n | (a = (f = a >>> (e >>> 0)) >>> 2 & 4) | (f = (t = f >>> (a >>> 0)) >>> 1 & 2) | (o = (t = t >>> (f >>> 0)) >>> 1 & 1)) + (t >>> (o >>> 0)) | 0) << 1) << 2) + T + 40 | 0;
            a = E[(t = (n + 2 << 2) + T + 40 | 0) >> 2];
            (0 | f) == (0 | (o = E[(n = a + 8 | 0) >> 2])) ? A[T >> 2] = r & (1 << e ^ -1) : (o >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[t >> 2] = o, A[o + 12 >> 2] = f), r = (f = e << 3) - i | 0, A[a + 4 >> 2] = 3 | i, e = a + i | 0, A[a + (4 | i) >> 2] = 1 | r, A[a + f >> 2] = r, 0 != (0 | (o = E[T + 8 >> 2])) && (i = A[T + 20 >> 2], a = ((f = o >>> 2 & 1073741822) << 2) + T + 40 | 0, 0 == ((t = E[T >> 2]) & (o = 1 << (o >>> 3)) | 0) ? (A[T >> 2] = t | o, t = a, f = (f + 2 << 2) + T + 40 | 0) : (t = E[(f = (f + 2 << 2) + T + 40 | 0) >> 2]) >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[f >> 2] = i, A[t + 12 >> 2] = i, A[(i + 8 | 0) >> 2] = t, A[(i + 12 | 0) >> 2] = a), A[T + 8 >> 2] = r, A[T + 20 >> 2] = e, r = 38;
        }
        else
            0 == (0 | A[T + 4 >> 2]) ? (c = i, r = 30) : 0 == (0 | (r = Ld(i))) ? (c = i, r = 30) : (n = r, r = 38);
    else {
        var c = i;
        r = 30;
    }
}
else
    4294967231 < r >>> 0 ? (c = -1, r = 30) : (r = r + 11 & -8, 0 == (0 | A[T + 4 >> 2]) ? (c = r, r = 30) : 0 == (0 | (i = Md(r))) ? (c = r, r = 30) : (n = i, r = 38)); return 30 == r && (c >>> 0 > (i = E[T + 8 >> 2]) >>> 0 ? c >>> 0 < (r = E[T + 12 >> 2]) >>> 0 ? (r = r - c | 0, A[T + 12 >> 2] = r, i = E[T + 24 >> 2], A[T + 24 >> 2] = i + c | 0, A[c + (i + 4) >> 2] = 1 | r, A[i + 4 >> 2] = 3 | c, n = i + 8 | 0) : n = Nd(c) : (n = i - c | 0, r = E[T + 20 >> 2], 15 < n >>> 0 ? (A[T + 20 >> 2] = r + c | 0, A[T + 8 >> 2] = n, A[c + (r + 4) >> 2] = 1 | n, A[r + i >> 2] = n, A[r + 4 >> 2] = 3 | c) : (A[T + 8 >> 2] = 0, A[T + 20 >> 2] = 0, A[r + 4 >> 2] = 3 | i, A[(c = i + (r + 4) | 0) >> 2] |= 1), n = r + 8 | 0)), n; }
function Ld(r) { var e, i, a, t = A[T + 4 >> 2]; i = (t = a = E[T + (((a = (f = (a = (t & -t) - 1 | 0) >>> ((t = a >>> 12 & 16) >>> 0)) >>> 5 & 8) | t | (f = (i = f >>> (a >>> 0)) >>> 2 & 4) | (i = (n = i >>> (f >>> 0)) >>> 1 & 2) | (u = (n = n >>> (i >>> 0)) >>> 1 & 1)) + (n >>> (u >>> 0)) << 2) + 304 >> 2]) >> 2, a = (-8 & A[a + 4 >> 2]) - r | 0; r: for (;;)
    for (f = t;;) {
        if (0 == (0 | (n = A[f + 16 >> 2]))) {
            if (0 == (0 | (f = A[f + 20 >> 2])))
                break r;
        }
        else
            f = n;
        if ((n = (-8 & A[f + 4 >> 2]) - r | 0) >>> 0 < a >>> 0) {
            i = (t = f) >> 2, a = n;
            continue r;
        }
    } var n = t, o = E[T + 16 >> 2]; if (!(u = n >>> 0 < o >>> 0)) {
    var f = c = n + r | 0;
    if (n >>> 0 < c >>> 0) {
        var c, u = E[i + 6], s = (0 | (c = E[i + 3])) == (0 | t);
        do {
            if (s) {
                var d = A[(e = t + 20 | 0) >> 2];
                if (0 == (0 | d) && 0 == (0 | (d = A[(e = t + 16 | 0) >> 2]))) {
                    e = (d = 0) >> 2;
                    break;
                }
                for (;;) {
                    var v = d + 20 | 0, l = A[v >> 2];
                    if (0 == (0 | l) && 0 == (0 | (l = E[(v = d + 16 | 0) >> 2])))
                        break;
                    e = v, d = l;
                }
                e >>> 0 < o >>> 0 && (X(), b("Reached an unreachable!")), A[e >> 2] = 0;
            }
            else
                (e = E[i + 2]) >>> 0 < o >>> 0 && (X(), b("Reached an unreachable!")), A[e + 12 >> 2] = c, A[c + 8 >> 2] = e, d = c;
            e = d >> 2;
        } while (0);
        o = 0 == (0 | u);
        r: do {
            if (!o) {
                s = (A[(c = t + 28 | 0) >> 2] << 2) + T + 304 | 0, v = (0 | t) == (0 | A[s >> 2]);
                do {
                    if (v) {
                        if (A[s >> 2] = d, 0 != (0 | d))
                            break;
                        A[T + 4 >> 2] &= 1 << A[c >> 2] ^ -1;
                        break r;
                    }
                    if (u >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), (0 | A[(l = u + 16 | 0) >> 2]) == (0 | t) ? A[l >> 2] = d : A[u + 20 >> 2] = d, 0 == (0 | d))
                        break r;
                } while (0);
                d >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e + 6] = u, 0 != (0 | (c = E[i + 4])) && (c >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e + 4] = c, A[c + 24 >> 2] = d), 0 != (0 | (c = E[i + 5])) && (c >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e + 5] = c, A[c + 24 >> 2] = d);
            }
        } while (0);
        return 16 > a >>> 0 ? (r = a + r | 0, A[i + 1] = 3 | r, A[(r = r + (n + 4) | 0) >> 2] |= 1) : (A[i + 1] = 3 | r, A[r + (n + 4) >> 2] = 1 | a, A[n + a + r >> 2] = a, 0 != (0 | (o = E[T + 8 >> 2])) && (r = E[T + 20 >> 2], i = ((n = o >>> 2 & 1073741822) << 2) + T + 40 | 0, 0 == ((u = E[T >> 2]) & (o = 1 << (o >>> 3)) | 0) ? (A[T >> 2] = u | o, u = i, n = (n + 2 << 2) + T + 40 | 0) : (u = E[(n = (n + 2 << 2) + T + 40 | 0) >> 2]) >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[n >> 2] = r, A[u + 12 >> 2] = r, A[r + 8 >> 2] = u, A[r + 12 >> 2] = i), A[T + 8 >> 2] = a, A[T + 20 >> 2] = f), t + 8 | 0;
    }
} X(), b("Reached an unreachable!"); }
function Nd(r) { var e, i; 0 == (0 | A[Od >> 2]) && Pd(); var a = 0 == (4 & A[T + 440 >> 2] | 0); do {
    if (a) {
        if (0 == (0 | (i = A[T + 24 >> 2])))
            i = 6;
        else if (0 == (0 | (i = Qd(i))))
            i = 6;
        else {
            var t = A[Od + 8 >> 2];
            if (2147483647 > (t = r + 47 - A[T + 12 >> 2] + t & -t) >>> 0)
                if ((0 | (u = Rd(t))) == (A[i >> 2] + A[i + 4 >> 2] | 0)) {
                    var n = u, o = t;
                    e = u, i = 13;
                }
                else {
                    var f = u, c = t;
                    i = 15;
                }
            else
                i = 14;
        }
        if (6 == i)
            if (-1 == (0 | (i = Rd(0))))
                i = 14;
            else {
                t = (t = A[Od + 8 >> 2]) + (r + 47) & -t;
                var u = i, s = A[Od + 4 >> 2], d = s - 1 | 0;
                2147483647 > (t = 0 == (d & u | 0) ? t : t - u + (d + u & -s) | 0) >>> 0 ? (0 | (u = Rd(t))) == (0 | i) ? (n = i, o = t, e = u, i = 13) : (f = u, c = t, i = 15) : i = 14;
            }
        if (13 == i) {
            if (-1 != (0 | n)) {
                var v = o, l = n;
                i = 26;
                break;
            }
            f = e, c = o;
        }
        else if (14 == i) {
            A[T + 440 >> 2] |= 4, i = 23;
            break;
        }
        if (i = 0 | -c, -1 != (0 | f) & 2147483647 > c >>> 0)
            if (c >>> 0 < (r + 48 | 0) >>> 0)
                2147483647 > (t = r + 47 - c + (t = A[Od + 8 >> 2]) & -t) >>> 0 ? -1 == (0 | Rd(t)) ? (Rd(i), i = 22) : (h = t + c | 0, i = 21) : (h = c, i = 21);
            else {
                var h = c;
                i = 21;
            }
        else
            h = c, i = 21;
        if (21 == i && -1 != (0 | f)) {
            v = h, l = f, i = 26;
            break;
        }
        A[T + 440 >> 2] |= 4;
    }
    i = 23;
} while (0); 23 == i && (2147483647 > (a = (a = A[Od + 8 >> 2]) + (r + 47) & -a) >>> 0 ? (a = Rd(a), -1 != (0 | (n = Rd(0))) & -1 != (0 | a) & a >>> 0 < n >>> 0 ? (n = n - a | 0) >>> 0 <= (r + 40 | 0) >>> 0 | -1 == (0 | a) ? i = 49 : (v = n, l = a, i = 26) : i = 49) : i = 49); r: do {
    if (26 == i) {
        a = A[T + 432 >> 2] + v | 0, A[T + 432 >> 2] = a, a >>> 0 > E[T + 436 >> 2] >>> 0 && (A[T + 436 >> 2] = a), n = 0 == (0 | (a = E[T + 24 >> 2]));
        e: do {
            if (n) {
                for (0 == (0 | (o = E[T + 16 >> 2])) | l >>> 0 < o >>> 0 && (A[T + 16 >> 2] = l), A[T + 444 >> 2] = l, A[T + 448 >> 2] = v, A[T + 456 >> 2] = 0, A[T + 36 >> 2] = A[Od >> 2], A[T + 32 >> 2] = -1, o = 0; f = ((e = o << 1) << 2) + T + 40 | 0, A[T + (e + 3 << 2) + 40 >> 2] = f, A[T + (e + 2 << 2) + 40 >> 2] = f, 32 != (0 | (o = o + 1 | 0));)
                    ;
                Sd(l, v - 40 | 0);
            }
            else {
                for (e = (f = T + 444 | 0) >> 2; 0 != (0 | f);) {
                    if ((0 | l) == (0 | (h = (o = E[e]) + (c = E[(f = f + 4 | 0) >> 2]) | 0))) {
                        if (0 != (8 & A[e + 3] | 0))
                            break;
                        if (!((e = a) >>> 0 >= o >>> 0 & e >>> 0 < h >>> 0))
                            break;
                        A[f >> 2] = c + v | 0, Sd(A[T + 24 >> 2], A[T + 12 >> 2] + v | 0);
                        break e;
                    }
                    e = (f = A[e + 2]) >> 2;
                }
                for (l >>> 0 < E[T + 16 >> 2] >>> 0 && (A[T + 16 >> 2] = l), e = l + v | 0, f = T + 444 | 0; 0 != (0 | f);) {
                    if ((0 | (o = E[(c = 0 | f) >> 2])) == (0 | e)) {
                        if (0 != (8 & A[f + 12 >> 2] | 0))
                            break;
                        A[c >> 2] = l;
                        var b = f + 4 | 0;
                        A[b >> 2] = A[b >> 2] + v | 0, b = Td(l, o, r), i = 50;
                        break r;
                    }
                    f = A[f + 8 >> 2];
                }
                Ud(l, v);
            }
        } while (0);
        (a = E[T + 12 >> 2]) >>> 0 > r >>> 0 ? (b = a - r | 0, A[T + 12 >> 2] = b, n = a = E[T + 24 >> 2], A[T + 24 >> 2] = n + r | 0, A[r + (n + 4) >> 2] = 1 | b, A[a + 4 >> 2] = 3 | r, b = a + 8 | 0, i = 50) : i = 49;
    }
} while (0); return 49 == i && (A[Vd >> 2] = 12, b = 0), b; }
function Md(r) { var e, i, a, t, n, o = r >> 2, f = 0 | -r, c = r >>> 8; if (0 == (0 | c))
    var u = 0;
else if (16777215 < r >>> 0)
    u = 31;
else {
    var s = (c + 1048320 | 0) >>> 16 & 8, d = c << s, v = (d + 520192 | 0) >>> 16 & 4, l = d << v, h = (l + 245760 | 0) >>> 16 & 2, p = 14 - (v | s | h) + (l << h >>> 15) | 0;
    u = r >>> ((p + 7 | 0) >>> 0) & 1 | p << 1;
} var R = E[T + (u << 2) + 304 >> 2], k = 0 == (0 | R); r: do {
    if (k)
        var w = 0, y = f, M = 0;
    else {
        var g = 0, I = f, N = R;
        n = N >> 2;
        for (var m = r << (31 == (0 | u) ? 0 : 25 - (u >>> 1) | 0), S = 0;;) {
            var B = -8 & A[n + 1], C = B - r | 0;
            if (C >>> 0 < I >>> 0) {
                if ((0 | B) == (0 | r)) {
                    w = N, y = C, M = N;
                    break r;
                }
                var z = N, O = C;
            }
            else
                z = g, O = I;
            var F = E[n + 5], j = E[(16 + (m >>> 31 << 2) >> 2) + n], U = 0 == (0 | F) | (0 | F) == (0 | j) ? S : F;
            if (0 == (0 | j)) {
                w = z, y = O, M = U;
                break r;
            }
            g = z, I = O, n = (N = j) >> 2, m <<= 1, S = U;
        }
    }
} while (0); if (0 == (0 | M) & 0 == (0 | w)) {
    var _ = 2 << u, V = A[T + 4 >> 2] & (_ | -_);
    if (0 == (0 | V))
        var L = M;
    else {
        var H = (V & -V) - 1 | 0, Z = H >>> 12 & 16, x = H >>> (Z >>> 0), G = x >>> 5 & 8, P = x >>> (G >>> 0), $ = P >>> 2 & 4, q = P >>> ($ >>> 0), D = q >>> 1 & 2, W = q >>> (D >>> 0), Y = W >>> 1 & 1;
        L = A[T + ((G | Z | $ | D | Y) + (W >>> (Y >>> 0)) << 2) + 304 >> 2];
    }
}
else
    L = M; var J = 0 == (0 | L); r: do {
    if (J) {
        var Q = y, K = w;
        t = w >> 2;
    }
    else {
        var rr = L;
        a = rr >> 2;
        for (var er = y, ir = w;;) {
            var ar = (-8 & A[a + 1]) - r | 0, tr = ar >>> 0 < er >>> 0, nr = tr ? ar : er, Ar = tr ? rr : ir, or = E[a + 4];
            if (0 != (0 | or))
                rr = or;
            else {
                var fr = E[a + 5];
                if (0 == (0 | fr)) {
                    Q = nr, t = (K = Ar) >> 2;
                    break r;
                }
                rr = fr;
            }
            a = rr >> 2, er = nr, ir = Ar;
        }
    }
} while (0); var cr = 0 == (0 | K); r: do {
    if (cr)
        var ur = 0;
    else {
        if (Q >>> 0 < (A[T + 8 >> 2] - r | 0) >>> 0) {
            var sr = K;
            i = sr >> 2;
            var dr = E[T + 16 >> 2];
            if (!(sr >>> 0 < dr >>> 0)) {
                var vr = sr + r | 0, lr = vr;
                if (sr >>> 0 < vr >>> 0) {
                    var hr = E[t + 6], br = E[t + 3], pr = (0 | br) == (0 | K);
                    do {
                        if (pr) {
                            var Er = K + 20 | 0, Tr = A[Er >> 2];
                            if (0 == (0 | Tr)) {
                                var Rr = K + 16 | 0, kr = A[Rr >> 2];
                                if (0 == (0 | kr)) {
                                    var wr = 0;
                                    e = wr >> 2;
                                    break;
                                }
                                var yr = Rr, Mr = kr;
                            }
                            else
                                yr = Er, Mr = Tr;
                            for (;;) {
                                var gr = Mr + 20 | 0, Ir = A[gr >> 2];
                                if (0 != (0 | Ir))
                                    yr = gr, Mr = Ir;
                                else {
                                    var Nr = Mr + 16 | 0, mr = E[Nr >> 2];
                                    if (0 == (0 | mr))
                                        break;
                                    yr = Nr, Mr = mr;
                                }
                            }
                            yr >>> 0 < dr >>> 0 && (X(), b("Reached an unreachable!")), A[yr >> 2] = 0, wr = Mr;
                        }
                        else {
                            var Xr = E[t + 2];
                            Xr >>> 0 < dr >>> 0 && (X(), b("Reached an unreachable!")), A[Xr + 12 >> 2] = br, A[br + 8 >> 2] = Xr, wr = br;
                        }
                        e = wr >> 2;
                    } while (0);
                    var Sr = 0 == (0 | hr);
                    e: do {
                        if (!Sr) {
                            var Br = K + 28 | 0, Cr = (A[Br >> 2] << 2) + T + 304 | 0, zr = (0 | K) == (0 | A[Cr >> 2]);
                            do {
                                if (zr) {
                                    if (A[Cr >> 2] = wr, 0 != (0 | wr))
                                        break;
                                    A[T + 4 >> 2] &= 1 << A[Br >> 2] ^ -1;
                                    break e;
                                }
                                hr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!"));
                                var Or = hr + 16 | 0;
                                if ((0 | A[Or >> 2]) == (0 | K) ? A[Or >> 2] = wr : A[hr + 20 >> 2] = wr, 0 == (0 | wr))
                                    break e;
                            } while (0);
                            wr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e + 6] = hr;
                            var Fr = E[t + 4];
                            0 != (0 | Fr) && (Fr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e + 4] = Fr, A[Fr + 24 >> 2] = wr);
                            var jr = E[t + 5];
                            0 != (0 | jr) && (jr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e + 5] = jr, A[jr + 24 >> 2] = wr);
                        }
                    } while (0);
                    var Ur = 16 > Q >>> 0;
                    e: do {
                        if (Ur) {
                            var _r = Q + r | 0;
                            A[t + 1] = 3 | _r, A[(_r + (sr + 4) | 0) >> 2] |= 1;
                        }
                        else if (A[t + 1] = 3 | r, A[o + (i + 1)] = 1 | Q, A[(Q >> 2) + i + o] = Q, 256 > Q >>> 0) {
                            var Vr = Q >>> 2 & 1073741822, Lr = (Vr << 2) + T + 40 | 0, Hr = E[T >> 2], Zr = 1 << (Q >>> 3);
                            if (0 == (Hr & Zr | 0)) {
                                A[T >> 2] = Hr | Zr;
                                var xr = Lr, Gr = (Vr + 2 << 2) + T + 40 | 0;
                            }
                            else {
                                var Pr = (Vr + 2 << 2) + T + 40 | 0, $r = E[Pr >> 2];
                                $r >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), xr = $r, Gr = Pr;
                            }
                            A[Gr >> 2] = lr, A[xr + 12 >> 2] = lr, A[o + (i + 2)] = xr, A[o + (i + 3)] = Lr;
                        }
                        else {
                            var qr = vr, Dr = Q >>> 8;
                            if (0 == (0 | Dr))
                                var Wr = 0;
                            else if (16777215 < Q >>> 0)
                                Wr = 31;
                            else {
                                var Yr = (Dr + 1048320 | 0) >>> 16 & 8, Jr = Dr << Yr, Qr = (Jr + 520192 | 0) >>> 16 & 4, Kr = Jr << Qr, re = (Kr + 245760 | 0) >>> 16 & 2, ee = 14 - (Qr | Yr | re) + (Kr << re >>> 15) | 0;
                                Wr = Q >>> ((ee + 7 | 0) >>> 0) & 1 | ee << 1;
                            }
                            var ie = (Wr << 2) + T + 304 | 0;
                            A[o + (i + 7)] = Wr;
                            var ae = r + (sr + 16) | 0;
                            A[o + (i + 5)] = 0, A[ae >> 2] = 0;
                            var te = A[T + 4 >> 2], ne = 1 << Wr;
                            if (0 == (te & ne | 0))
                                A[T + 4 >> 2] = te | ne, A[ie >> 2] = qr, A[o + (i + 6)] = ie, A[o + (i + 3)] = qr, A[o + (i + 2)] = qr;
                            else
                                for (var Ae = Q << (31 == (0 | Wr) ? 0 : 25 - (Wr >>> 1) | 0), oe = A[ie >> 2];;) {
                                    if ((-8 & A[oe + 4 >> 2] | 0) == (0 | Q)) {
                                        var fe = oe + 8 | 0, ce = E[fe >> 2], ue = E[T + 16 >> 2];
                                        if (!(oe >>> 0 < ue >>> 0) && ce >>> 0 >= ue >>> 0) {
                                            A[ce + 12 >> 2] = qr, A[fe >> 2] = qr, A[o + (i + 2)] = ce, A[o + (i + 3)] = oe, A[o + (i + 6)] = 0;
                                            break e;
                                        }
                                        X(), b("Reached an unreachable!");
                                    }
                                    var se = (Ae >>> 31 << 2) + oe + 16 | 0, de = E[se >> 2];
                                    if (0 == (0 | de)) {
                                        if (se >>> 0 >= E[T + 16 >> 2] >>> 0) {
                                            A[se >> 2] = qr, A[o + (i + 6)] = oe, A[o + (i + 3)] = qr, A[o + (i + 2)] = qr;
                                            break e;
                                        }
                                        X(), b("Reached an unreachable!");
                                    }
                                    Ae <<= 1, oe = de;
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
} while (0); return ur; }
function Wd(r) { var e; 0 == (0 | A[Od >> 2]) && Pd(); var i = 4294967232 > r >>> 0; r: do {
    if (i) {
        var a = E[T + 24 >> 2];
        if (0 != (0 | a)) {
            var t = E[T + 12 >> 2];
            if (t >>> 0 > (r + 40 | 0) >>> 0) {
                var n = E[Od + 8 >> 2], o = (Math.floor(((-40 - r - 1 + t + n | 0) >>> 0) / (n >>> 0)) - 1) * n | 0, f = Qd(a);
                if (0 == (8 & A[f + 12 >> 2] | 0)) {
                    var c = Rd(0);
                    if (e = (f + 4 | 0) >> 2, (0 | c) == (A[f >> 2] + A[e] | 0) && (-1 != (0 | (o = Rd(0 | -(2147483646 < o >>> 0 ? -2147483648 - n | 0 : o)))) & (n = Rd(0)) >>> 0 < c >>> 0 && (o = c - n | 0, (0 | c) != (0 | n)))) {
                        A[e] = A[e] - o | 0, A[T + 432 >> 2] = A[T + 432 >> 2] - o | 0, Sd(A[T + 24 >> 2], A[T + 12 >> 2] - o | 0), e = (0 | c) != (0 | n);
                        break r;
                    }
                }
            }
            E[T + 12 >> 2] >>> 0 > E[T + 28 >> 2] >>> 0 && (A[T + 28 >> 2] = -1);
        }
    }
    e = 0;
} while (0); return 1 & e; }
function Xd(r) { var e, i, a, t, n, o, f = r >> 2, c = 0 == (0 | r); r: do {
    if (!c) {
        var u = r - 8 | 0, s = u, d = E[T + 16 >> 2], v = u >>> 0 < d >>> 0;
        e: do {
            if (!v) {
                var l = E[r - 4 >> 2], h = 3 & l;
                if (1 != (0 | h)) {
                    var p = -8 & l;
                    o = p >> 2;
                    var R = r + (p - 8) | 0, k = R, w = 0 == (1 & l | 0);
                    i: do {
                        if (w) {
                            var y = E[u >> 2];
                            if (0 == (0 | h))
                                break r;
                            var M = -8 - y | 0;
                            n = M >> 2;
                            var g = r + M | 0, I = g, N = y + p | 0;
                            if (g >>> 0 < d >>> 0)
                                break e;
                            if ((0 | I) == (0 | A[T + 20 >> 2])) {
                                if (3 != (3 & A[t = (r + (p - 4) | 0) >> 2] | 0)) {
                                    var m = I;
                                    a = m >> 2;
                                    var S = N;
                                    break;
                                }
                                A[T + 8 >> 2] = N, A[t] &= -2, A[n + (f + 1)] = 1 | N, A[R >> 2] = N;
                                break r;
                            }
                            if (256 > y >>> 0) {
                                var B = E[n + (f + 2)], C = E[n + (f + 3)];
                                if ((0 | B) == (0 | C))
                                    A[T >> 2] &= 1 << (y >>> 3) ^ -1, a = (m = I) >> 2, S = N;
                                else {
                                    var z = ((y >>> 2 & 1073741822) << 2) + T + 40 | 0;
                                    if (!((0 | B) != (0 | z) & B >>> 0 < d >>> 0) && (0 | C) == (0 | z) | C >>> 0 >= d >>> 0) {
                                        A[B + 12 >> 2] = C, A[C + 8 >> 2] = B, a = (m = I) >> 2, S = N;
                                        break i;
                                    }
                                    X(), b("Reached an unreachable!");
                                }
                            }
                            else {
                                var O = g, F = E[n + (f + 6)], j = E[n + (f + 3)], U = (0 | j) == (0 | O);
                                do {
                                    if (U) {
                                        var _ = M + (r + 20) | 0, V = A[_ >> 2];
                                        if (0 == (0 | V)) {
                                            var L = M + (r + 16) | 0, H = A[L >> 2];
                                            if (0 == (0 | H)) {
                                                var Z = 0;
                                                i = Z >> 2;
                                                break;
                                            }
                                            var x = L, G = H;
                                        }
                                        else
                                            x = _, G = V, 21;
                                        for (;;) {
                                            var P = G + 20 | 0, $ = A[P >> 2];
                                            if (0 != (0 | $))
                                                x = P, G = $;
                                            else {
                                                var q = G + 16 | 0, D = E[q >> 2];
                                                if (0 == (0 | D))
                                                    break;
                                                x = q, G = D;
                                            }
                                        }
                                        x >>> 0 < d >>> 0 && (X(), b("Reached an unreachable!")), A[x >> 2] = 0, Z = G;
                                    }
                                    else {
                                        var W = E[n + (f + 2)];
                                        W >>> 0 < d >>> 0 && (X(), b("Reached an unreachable!")), A[W + 12 >> 2] = j, A[j + 8 >> 2] = W, Z = j;
                                    }
                                    i = Z >> 2;
                                } while (0);
                                if (0 != (0 | F)) {
                                    var Y = M + (r + 28) | 0, J = (A[Y >> 2] << 2) + T + 304 | 0, Q = (0 | O) == (0 | A[J >> 2]);
                                    do {
                                        if (Q) {
                                            if (A[J >> 2] = Z, 0 != (0 | Z))
                                                break;
                                            A[T + 4 >> 2] &= 1 << A[Y >> 2] ^ -1, a = (m = I) >> 2, S = N;
                                            break i;
                                        }
                                        F >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!"));
                                        var K = F + 16 | 0;
                                        if ((0 | A[K >> 2]) == (0 | O) ? A[K >> 2] = Z : A[F + 20 >> 2] = Z, 0 == (0 | Z)) {
                                            a = (m = I) >> 2, S = N;
                                            break i;
                                        }
                                    } while (0);
                                    Z >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[i + 6] = F;
                                    var rr = E[n + (f + 4)];
                                    0 != (0 | rr) && (rr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[i + 4] = rr, A[rr + 24 >> 2] = Z);
                                    var er = E[n + (f + 5)];
                                    0 != (0 | er) && (er >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[i + 5] = er, A[er + 24 >> 2] = Z);
                                }
                                a = (m = I) >> 2, S = N;
                            }
                        }
                        else
                            a = (m = s) >> 2, S = p;
                    } while (0);
                    var ir = m;
                    if (ir >>> 0 < R >>> 0) {
                        var ar = r + (p - 4) | 0, tr = E[ar >> 2];
                        if (0 != (1 & tr | 0)) {
                            if (0 == (2 & tr | 0)) {
                                if ((0 | k) == (0 | A[T + 24 >> 2])) {
                                    var nr = A[T + 12 >> 2] + S | 0;
                                    if (A[T + 12 >> 2] = nr, A[T + 24 >> 2] = m, A[a + 1] = 1 | nr, (0 | m) == (0 | A[T + 20 >> 2]) && (A[T + 20 >> 2] = 0, A[T + 8 >> 2] = 0), nr >>> 0 <= E[T + 28 >> 2] >>> 0)
                                        break r;
                                    Wd(0);
                                    break r;
                                }
                                if ((0 | k) == (0 | A[T + 20 >> 2])) {
                                    var Ar = A[T + 8 >> 2] + S | 0;
                                    A[T + 8 >> 2] = Ar, A[T + 20 >> 2] = m, A[a + 1] = 1 | Ar, A[(ir + Ar | 0) >> 2] = Ar;
                                    break r;
                                }
                                var or = (-8 & tr) + S | 0, fr = tr >>> 3, cr = 256 > tr >>> 0;
                                i: do {
                                    if (cr) {
                                        var ur = E[f + o], sr = E[((4 | p) >> 2) + f];
                                        if ((0 | ur) == (0 | sr))
                                            A[T >> 2] &= 1 << fr ^ -1;
                                        else {
                                            var dr = ((tr >>> 2 & 1073741822) << 2) + T + 40 | 0;
                                            if (63 == ((0 | ur) == (0 | dr) ? 63 : ur >>> 0 < E[T + 16 >> 2] >>> 0 ? 66 : 63) && !((0 | sr) != (0 | dr) && sr >>> 0 < E[T + 16 >> 2] >>> 0)) {
                                                A[ur + 12 >> 2] = sr, A[sr + 8 >> 2] = ur;
                                                break i;
                                            }
                                            X(), b("Reached an unreachable!");
                                        }
                                    }
                                    else {
                                        var vr = R, lr = E[o + (f + 4)], hr = E[((4 | p) >> 2) + f], br = (0 | hr) == (0 | vr);
                                        do {
                                            if (br) {
                                                var pr = p + (r + 12) | 0, Er = A[pr >> 2];
                                                if (0 == (0 | Er)) {
                                                    var Tr = p + (r + 8) | 0, Rr = A[Tr >> 2];
                                                    if (0 == (0 | Rr)) {
                                                        var kr = 0;
                                                        e = kr >> 2;
                                                        break;
                                                    }
                                                    var wr = Tr, yr = Rr;
                                                }
                                                else
                                                    wr = pr, yr = Er, 73;
                                                for (;;) {
                                                    var Mr = yr + 20 | 0, gr = A[Mr >> 2];
                                                    if (0 != (0 | gr))
                                                        wr = Mr, yr = gr;
                                                    else {
                                                        var Ir = yr + 16 | 0, Nr = E[Ir >> 2];
                                                        if (0 == (0 | Nr))
                                                            break;
                                                        wr = Ir, yr = Nr;
                                                    }
                                                }
                                                wr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[wr >> 2] = 0, kr = yr;
                                            }
                                            else {
                                                var mr = E[f + o];
                                                mr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[mr + 12 >> 2] = hr, A[hr + 8 >> 2] = mr, kr = hr;
                                            }
                                            e = kr >> 2;
                                        } while (0);
                                        if (0 != (0 | lr)) {
                                            var Xr = p + (r + 20) | 0, Sr = (A[Xr >> 2] << 2) + T + 304 | 0, Br = (0 | vr) == (0 | A[Sr >> 2]);
                                            do {
                                                if (Br) {
                                                    if (A[Sr >> 2] = kr, 0 != (0 | kr))
                                                        break;
                                                    A[T + 4 >> 2] &= 1 << A[Xr >> 2] ^ -1;
                                                    break i;
                                                }
                                                lr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!"));
                                                var Cr = lr + 16 | 0;
                                                if ((0 | A[Cr >> 2]) == (0 | vr) ? A[Cr >> 2] = kr : A[lr + 20 >> 2] = kr, 0 == (0 | kr))
                                                    break i;
                                            } while (0);
                                            kr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e + 6] = lr;
                                            var zr = E[o + (f + 2)];
                                            0 != (0 | zr) && (zr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e + 4] = zr, A[zr + 24 >> 2] = kr);
                                            var Or = E[o + (f + 3)];
                                            0 != (0 | Or) && (Or >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[e + 5] = Or, A[Or + 24 >> 2] = kr);
                                        }
                                    }
                                } while (0);
                                if (A[a + 1] = 1 | or, A[ir + or >> 2] = or, (0 | m) == (0 | A[T + 20 >> 2])) {
                                    A[T + 8 >> 2] = or;
                                    break r;
                                }
                                var Fr = or;
                            }
                            else
                                A[ar >> 2] = -2 & tr, A[a + 1] = 1 | S, Fr = A[ir + S >> 2] = S;
                            if (256 > Fr >>> 0) {
                                var jr = Fr >>> 2 & 1073741822, Ur = (jr << 2) + T + 40 | 0, _r = E[T >> 2], Vr = 1 << (Fr >>> 3);
                                if (0 == (_r & Vr | 0)) {
                                    A[T >> 2] = _r | Vr;
                                    var Lr = Ur, Hr = (jr + 2 << 2) + T + 40 | 0;
                                }
                                else {
                                    var Zr = (jr + 2 << 2) + T + 40 | 0, xr = E[Zr >> 2];
                                    xr >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), Lr = xr, Hr = Zr;
                                }
                                A[Hr >> 2] = m, A[Lr + 12 >> 2] = m, A[a + 2] = Lr, A[a + 3] = Ur;
                                break r;
                            }
                            var Gr = m, Pr = Fr >>> 8;
                            if (0 == (0 | Pr))
                                var $r = 0;
                            else if (16777215 < Fr >>> 0)
                                $r = 31;
                            else {
                                var qr = (Pr + 1048320 | 0) >>> 16 & 8, Dr = Pr << qr, Wr = (Dr + 520192 | 0) >>> 16 & 4, Yr = Dr << Wr, Jr = (Yr + 245760 | 0) >>> 16 & 2, Qr = 14 - (Wr | qr | Jr) + (Yr << Jr >>> 15) | 0;
                                $r = Fr >>> ((Qr + 7 | 0) >>> 0) & 1 | Qr << 1;
                            }
                            var Kr = ($r << 2) + T + 304 | 0;
                            A[a + 7] = $r, A[a + 5] = 0, A[a + 4] = 0;
                            var re = A[T + 4 >> 2], ee = 1 << $r, ie = 0 == (re & ee | 0);
                            i: do {
                                if (ie)
                                    A[T + 4 >> 2] = re | ee, A[Kr >> 2] = Gr, A[a + 6] = Kr, A[a + 3] = m, A[a + 2] = m;
                                else
                                    for (var ae = Fr << (31 == (0 | $r) ? 0 : 25 - ($r >>> 1) | 0), te = A[Kr >> 2];;) {
                                        if ((-8 & A[te + 4 >> 2] | 0) == (0 | Fr)) {
                                            var ne = te + 8 | 0, Ae = E[ne >> 2], oe = E[T + 16 >> 2];
                                            if (!(te >>> 0 < oe >>> 0) && Ae >>> 0 >= oe >>> 0) {
                                                A[Ae + 12 >> 2] = Gr, A[ne >> 2] = Gr, A[a + 2] = Ae, A[a + 3] = te, A[a + 6] = 0;
                                                break i;
                                            }
                                            X(), b("Reached an unreachable!");
                                        }
                                        var fe = (ae >>> 31 << 2) + te + 16 | 0, ce = E[fe >> 2];
                                        if (0 == (0 | ce)) {
                                            if (fe >>> 0 >= E[T + 16 >> 2] >>> 0) {
                                                A[fe >> 2] = Gr, A[a + 6] = te, A[a + 3] = m, A[a + 2] = m;
                                                break i;
                                            }
                                            X(), b("Reached an unreachable!");
                                        }
                                        ae <<= 1, te = ce;
                                    }
                            } while (0);
                            var ue = A[T + 32 >> 2] - 1 | 0;
                            if (A[T + 32 >> 2] = ue, 0 != (0 | ue))
                                break r;
                            var se = A[T + 452 >> 2], de = 0 == (0 | se);
                            i: do {
                                if (!de)
                                    for (var ve = se;;) {
                                        var le = A[ve + 8 >> 2];
                                        if (0 == (0 | le))
                                            break i;
                                        ve = le;
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
} while (0); }
function Yd(r, e) { var i, a, t, n = 4294967231 < e >>> 0; r: do {
    if (n) {
        A[Vd >> 2] = 12;
        var o = 0;
    }
    else {
        t = i = r - 8 | 0;
        var f = -8 & (l = E[a = (r - 4 | 0) >> 2]), c = f - 8 | 0, u = r + c | 0;
        if (!(i >>> 0 < E[T + 16 >> 2] >>> 0)) {
            var s = 3 & l;
            if (1 != (0 | s) & -8 < (0 | c) && 0 != (1 & A[i = (r + (f - 4) | 0) >> 2] | 0)) {
                if (n = 11 > e >>> 0 ? 16 : e + 11 & -8, 0 == (0 | s)) {
                    var d, v = 0, l = -8 & A[t + 4 >> 2];
                    d = 256 > n >>> 0 ? 0 : l >>> 0 >= (n + 4 | 0) >>> 0 && (l - n | 0) >>> 0 <= A[Od + 8 >> 2] << 1 >>> 0 ? t : 0, t = 17;
                }
                else
                    f >>> 0 < n >>> 0 ? (0 | u) != (0 | A[T + 24 >> 2]) ? t = 21 : (i = A[T + 12 >> 2] + f | 0) >>> 0 > n >>> 0 ? (v = i - n | 0, d = r + (n - 8) | 0, A[a] = n | 1 & l | 2, A[r + (n - 4) >> 2] = 1 | v, A[T + 24 >> 2] = d, A[T + 12 >> 2] = v, v = 0, d = t, t = 17) : t = 21 : (15 < (v = f - n | 0) >>> 0 ? (A[a] = n | 1 & l | 2, A[r + (n - 4) >> 2] = 3 | v, A[i] |= 1, v = r + n | 0) : v = 0, d = t, t = 17);
                if (17 == t && 0 != (0 | d)) {
                    0 != (0 | v) && Xd(v), o = d + 8 | 0;
                    break r;
                }
                if (0 == (0 | (t = Yb(e)))) {
                    o = 0;
                    break r;
                }
                hd(t, r, (a = f - (0 == (3 & A[a] | 0) ? 8 : 4) | 0) >>> 0 < e >>> 0 ? a : e), Xd(r), o = t;
                break r;
            }
        }
        X(), b("Reached an unreachable!");
    }
} while (0); return o; }
function Pd() { if (0 == (0 | A[Od >> 2])) {
    var r = Zd();
    0 == (r - 1 & r | 0) ? (A[Od + 8 >> 2] = r, A[Od + 4 >> 2] = r, A[Od + 12 >> 2] = -1, A[Od + 16 >> 2] = 2097152, A[Od + 20 >> 2] = 0, A[T + 440 >> 2] = 0, A[Od >> 2] = -16 & Math.floor(Date.now() / 1e3) ^ 1431655768) : (X(), b("Reached an unreachable!"));
} }
function $d(r) { if (0 == (0 | r))
    r = 0;
else {
    var e = 3 & (r = A[r - 4 >> 2]);
    r = 1 == (0 | e) ? 0 : (-8 & r) - (0 == (0 | e) ? 8 : 4) | 0;
} return r; }
function Qd(r) { var e, i = T + 444 | 0; for (e = i >> 2;;) {
    var a = E[e];
    if (a >>> 0 <= r >>> 0 && (a + A[e + 1] | 0) >>> 0 > r >>> 0) {
        var t = i;
        break;
    }
    if (0 == (0 | (e = E[e + 2]))) {
        t = 0;
        break;
    }
    e = (i = e) >> 2;
} return t; }
function Sd(r, e) { var i, a = e - (i = 0 == (7 & (i = r + 8 | 0) | 0) ? 0 : 7 & -i) | 0; A[T + 24 >> 2] = r + i | 0, A[T + 12 >> 2] = a, A[i + (r + 4) >> 2] = 1 | a, A[e + (r + 4) >> 2] = 40, A[T + 28 >> 2] = A[Od + 16 >> 2]; }
function Td(r, e, i) { var a, t, n, o, f, c = e >> 2, u = r >> 2, s = 0 == (7 & (t = e + 8 | 0) | 0) ? 0 : 7 & -t; n = s >> 2; var d = e + s | 0, v = (f = 0 == (7 & (f = r + 8 | 0) | 0) ? 0 : 7 & -f) + i | 0; t = v >> 2; var l = r + v | 0, h = d - (r + f) - i | 0; A[(f + 4 >> 2) + u] = 3 | i, i = (0 | d) == (0 | A[T + 24 >> 2]); r: do {
    if (i) {
        var p = A[T + 12 >> 2] + h | 0;
        A[T + 12 >> 2] = p, A[T + 24 >> 2] = l, A[t + (u + 1)] = 1 | p;
    }
    else if ((0 | d) == (0 | A[T + 20 >> 2]))
        p = A[T + 8 >> 2] + h | 0, A[T + 8 >> 2] = p, A[T + 20 >> 2] = l, A[t + (u + 1)] = 1 | p, A[(r + p + v | 0) >> 2] = p;
    else {
        var R = E[n + (c + 1)];
        if (1 == (3 & R | 0)) {
            p = -8 & R;
            var k = R >>> 3, w = 256 > R >>> 0;
            e: do {
                if (w) {
                    var y = E[((8 | s) >> 2) + c], M = E[n + (c + 3)];
                    if ((0 | y) == (0 | M))
                        A[T >> 2] &= 1 << k ^ -1;
                    else {
                        var g = ((R >>> 2 & 1073741822) << 2) + T + 40 | 0;
                        if (15 == (o = (0 | y) == (0 | g) ? 15 : y >>> 0 < E[T + 16 >> 2] >>> 0 ? 18 : 15) && !((0 | M) != (0 | g) && M >>> 0 < E[T + 16 >> 2] >>> 0)) {
                            A[y + 12 >> 2] = M, A[M + 8 >> 2] = y;
                            break e;
                        }
                        X(), b("Reached an unreachable!");
                    }
                }
                else {
                    o = d, y = E[((24 | s) >> 2) + c], g = (0 | (M = E[n + (c + 3)])) == (0 | o);
                    do {
                        if (g) {
                            var I = A[(N = (a = 16 | s) + (e + 4) | 0) >> 2];
                            if (0 == (0 | I)) {
                                if (0 == (0 | (I = A[(a = e + a | 0) >> 2]))) {
                                    a = (I = 0) >> 2;
                                    break;
                                }
                            }
                            else
                                a = N;
                            for (;;) {
                                var N, m = A[(N = I + 20 | 0) >> 2];
                                if (0 == (0 | m) && 0 == (0 | (m = E[(N = I + 16 | 0) >> 2])))
                                    break;
                                a = N, I = m;
                            }
                            a >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[a >> 2] = 0;
                        }
                        else
                            (a = E[((8 | s) >> 2) + c]) >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[a + 12 >> 2] = M, A[M + 8 >> 2] = a, I = M;
                        a = I >> 2;
                    } while (0);
                    if (0 != (0 | y)) {
                        g = (A[(M = s + (e + 28) | 0) >> 2] << 2) + T + 304 | 0, N = (0 | o) == (0 | A[g >> 2]);
                        do {
                            if (N) {
                                if (A[g >> 2] = I, 0 != (0 | I))
                                    break;
                                A[T + 4 >> 2] &= 1 << A[M >> 2] ^ -1;
                                break e;
                            }
                            if (y >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), (0 | A[(m = y + 16 | 0) >> 2]) == (0 | o) ? A[m >> 2] = I : A[y + 20 >> 2] = I, 0 == (0 | I))
                                break e;
                        } while (0);
                        I >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[a + 6] = y, 0 != (0 | (y = E[((o = 16 | s) >> 2) + c])) && (y >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[a + 4] = y, A[y + 24 >> 2] = I), 0 != (0 | (o = E[(o + 4 >> 2) + c])) && (o >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[a + 5] = o, A[o + 24 >> 2] = I);
                    }
                }
            } while (0);
            R = e + (p | s) | 0, p = p + h | 0;
        }
        else
            R = d, p = h;
        if (A[(R = R + 4 | 0) >> 2] &= -2, A[t + (u + 1)] = 1 | p, A[(p >> 2) + u + t] = p, 256 > p >>> 0)
            R = ((k = p >>> 2 & 1073741822) << 2) + T + 40 | 0, 0 == ((w = E[T >> 2]) & (p = 1 << (p >>> 3)) | 0) ? (A[T >> 2] = w | p, p = R, k = (k + 2 << 2) + T + 40 | 0) : (p = E[(k = (k + 2 << 2) + T + 40 | 0) >> 2]) >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[k >> 2] = l, A[p + 12 >> 2] = l, A[t + (u + 2)] = p, A[t + (u + 3)] = R;
        else if (R = l, 0 == (0 | (w = p >>> 8)) ? k = 0 : 16777215 < p >>> 0 ? k = 31 : k = p >>> (((k = 14 - ((w = ((o = w << (k = (w + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4) | k | (y = ((o <<= w) + 245760 | 0) >>> 16 & 2)) + (o << y >>> 15) | 0) + 7 | 0) >>> 0) & 1 | k << 1, w = (k << 2) + T + 304 | 0, A[t + (u + 7)] = k, o = v + (r + 16) | 0, A[t + (u + 5)] = 0, A[o >> 2] = 0, 0 == ((o = A[T + 4 >> 2]) & (y = 1 << k) | 0))
            A[T + 4 >> 2] = o | y, A[w >> 2] = R, A[t + (u + 6)] = w, A[t + (u + 3)] = R, A[t + (u + 2)] = R;
        else
            for (k = p << (31 == (0 | k) ? 0 : 25 - (k >>> 1) | 0), w = A[w >> 2];;) {
                if ((-8 & A[w + 4 >> 2] | 0) == (0 | p)) {
                    if (y = E[(o = w + 8 | 0) >> 2], !(g = w >>> 0 < (M = E[T + 16 >> 2]) >>> 0) && y >>> 0 >= M >>> 0) {
                        A[y + 12 >> 2] = R, A[o >> 2] = R, A[t + (u + 2)] = y, A[t + (u + 3)] = w, A[t + (u + 6)] = 0;
                        break r;
                    }
                    X(), b("Reached an unreachable!");
                }
                if (0 == (0 | (y = E[(o = (k >>> 31 << 2) + w + 16 | 0) >> 2]))) {
                    if (o >>> 0 >= E[T + 16 >> 2] >>> 0) {
                        A[o >> 2] = R, A[t + (u + 6)] = w, A[t + (u + 3)] = R, A[t + (u + 2)] = R;
                        break r;
                    }
                    X(), b("Reached an unreachable!");
                }
                k <<= 1, w = y;
            }
    }
} while (0); return r + (8 | f) | 0; }
function ae(r) { A[r >> 2] = be + 8 | 0; }
function ce(r) { de(0 | r); }
function Ud(r, e) { var i, a, t = E[T + 24 >> 2]; a = t >> 2; var n, o, f = Qd(t); f = (n = A[f >> 2]) + (i = A[f + 4 >> 2]) | 0; i = (o = (n = (n = n + (i - 47) + (0 == (7 & (o = n + (i - 39) | 0) | 0) ? 0 : 7 & -o) | 0) >>> 0 < (t + 16 | 0) >>> 0 ? t : n) + 8 | 0) >> 2, Sd(r, e - 40 | 0), A[(n + 4 | 0) >> 2] = 27, A[i] = A[T + 444 >> 2], A[i + 1] = A[T + 448 >> 2], A[i + 2] = A[T + 452 >> 2], A[i + 3] = A[T + 456 >> 2], A[T + 444 >> 2] = r, A[T + 448 >> 2] = e, A[T + 456 >> 2] = 0, A[T + 452 >> 2] = o, A[(i = n + 28 | 0) >> 2] = 7, o = (n + 32 | 0) >>> 0 < f >>> 0; r: do {
    if (o)
        for (var c = i;;) {
            if (A[(u = c + 4 | 0) >> 2] = 7, (c + 8 | 0) >>> 0 >= f >>> 0)
                break r;
            c = u;
        }
} while (0); f = (0 | n) == (0 | t); r: do {
    if (!f)
        if (o = t + (i = n - t | 0) | 0, A[(c = i + (t + 4) | 0) >> 2] &= -2, A[a + 1] = 1 | i, A[o >> 2] = i, 256 > i >>> 0)
            o = ((c = i >>> 2 & 1073741822) << 2) + T + 40 | 0, 0 == ((u = E[T >> 2]) & (i = 1 << (i >>> 3)) | 0) ? (A[T >> 2] = u | i, i = o, c = (c + 2 << 2) + T + 40 | 0) : (i = E[(c = (c + 2 << 2) + T + 40 | 0) >> 2]) >>> 0 < E[T + 16 >> 2] >>> 0 && (X(), b("Reached an unreachable!")), A[c >> 2] = t, A[i + 12 >> 2] = t, A[a + 2] = i, A[a + 3] = o;
        else {
            if (o = t, 0 == (0 | (u = i >>> 8)))
                c = 0;
            else if (16777215 < i >>> 0)
                c = 31;
            else {
                var u;
                c = i >>> (((c = 14 - ((u = ((s = u << (c = (u + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4) | c | (d = ((s = s << u) + 245760 | 0) >>> 16 & 2)) + (s << d >>> 15) | 0) + 7 | 0) >>> 0) & 1 | c << 1;
            }
            if (u = (c << 2) + T + 304 | 0, A[a + 7] = c, A[a + 5] = 0, A[a + 4] = 0, 0 == ((s = A[T + 4 >> 2]) & (d = 1 << c) | 0))
                A[T + 4 >> 2] = s | d, A[u >> 2] = o, A[a + 6] = u, A[a + 3] = t, A[a + 2] = t;
            else
                for (c = i << (31 == (0 | c) ? 0 : 25 - (c >>> 1) | 0), u = A[u >> 2];;) {
                    if ((-8 & A[u + 4 >> 2] | 0) == (0 | i)) {
                        var s, d = E[(s = u + 8 | 0) >> 2], v = E[T + 16 >> 2];
                        if (!(u >>> 0 < v >>> 0) && d >>> 0 >= v >>> 0) {
                            A[d + 12 >> 2] = o, A[s >> 2] = o, A[a + 2] = d, A[a + 3] = u, A[a + 6] = 0;
                            break r;
                        }
                        X(), b("Reached an unreachable!");
                    }
                    if (0 == (0 | (d = E[(s = (c >>> 31 << 2) + u + 16 | 0) >> 2]))) {
                        if (s >>> 0 >= E[T + 16 >> 2] >>> 0) {
                            A[s >> 2] = o, A[a + 6] = u, A[a + 3] = t, A[a + 2] = t;
                            break r;
                        }
                        X(), b("Reached an unreachable!");
                    }
                    c <<= 1, u = d;
                }
        }
} while (0); }
Jc.X = 1, Oc.X = 1, Zc.X = 1, S.X = 1, nd.X = 1, pd.X = 1, qd.X = 1, Module._crn_get_width = function (r, e) { var i = v; v += 40, vd(i), Zc(r, e, i); var a = A[i + 4 >> 2]; return v = i, a; }, Module._crn_get_height = function (r, e) { var i = v; v += 40, vd(i), Zc(r, e, i); var a = A[i + 8 >> 2]; return v = i, a; }, Module._crn_get_levels = function (r, e) { var i = v; v += 40, vd(i), Zc(r, e, i); var a = A[i + 12 >> 2]; return v = i, a; }, Module._crn_get_dxt_format = function (r, e) { var i = v; v += 40, vd(i), Zc(r, e, i); var a = A[(i + 32 | 0) >> 2]; return v = i, a; }, Module._crn_get_uncompressed_size = function (r, e) { var i = v; v += 40, vd(i), Zc(r, e, i); var a = (A[i + 4 >> 2] + 3 | 0) >>> 2, t = (A[i + 8 >> 2] + 3 | 0) >>> 2, n = Xc(A[(n = i + 32 | 0) >> 2], A[n + 4 >> 2]) << 1 & 536870910; return v = i, t * a * n | 0; }, Module._crn_decompress = function (r, e, i, a) { var t = v; v += 44; var n = t + 40; vd(t), Zc(r, e, t); var o, f, c = (c = (A[t + 4 >> 2] + 3 | 0) >>> 2) * (o = Xc(A[(o = t + 32 | 0) >> 2], A[o + 4 >> 2]) << 1 & 536870910) | 0; if (0 == (0 | r) | 62 > e >>> 0)
    f = 0;
else if (0 == (0 | (o = Mc(300, 0))) ? o = 0 : 0 == (0 | o) ? o = 0 : (A[o >> 2] = 519686845, A[o + 4 >> 2] = 0, A[o + 8 >> 2] = 0, A[o + 88 >> 2] = 0, fd(o + 92 | 0), $c(o + 116 | 0), $c(o + 140 | 0), $c(o + 164 | 0), $c(o + 188 | 0), $c(o + 212 | 0), wd(o + 236 | 0), wd(o + 252 | 0), xd(o + 268 | 0), xd(o + 284 | 0)), 0 == (0 | o))
    f = 0;
else {
    var u = Yc(r, e);
    if (A[o + 88 >> 2] = u, 0 == (0 | u))
        f = 0;
    else {
        A[o + 4 >> 2] = r, A[o + 8 >> 2] = e;
        e = o + 92 | 0, u = A[o + 4 >> 2];
        var s = A[r = (o + 88 | 0) >> 2];
        u = od(e, u + Wc(s + 67 | 0) | 0, Tc(s + 65 | 0));
        do {
            if (u)
                if (pd(e, o + 116 | 0)) {
                    if (0 == (0 | Tc((s = A[r]) + 39 | 0))) {
                        if (0 == (0 | Tc(s + 55 | 0))) {
                            s = 0;
                            break;
                        }
                    }
                    else {
                        if (!pd(e, o + 140 | 0)) {
                            s = 0;
                            break;
                        }
                        if (!pd(e, o + 188 | 0)) {
                            s = 0;
                            break;
                        }
                        s = A[r];
                    }
                    if (0 != (0 | Tc(s + 55 | 0))) {
                        if (!pd(e, o + 164 | 0)) {
                            s = 0;
                            break;
                        }
                        if (!pd(e, o + 212 | 0)) {
                            s = 0;
                            break;
                        }
                    }
                    s = 1;
                }
                else
                    s = 0;
            else
                s = 0;
        } while (0);
        if (s) {
            if (0 == (0 | Tc((e = A[(r = o + 88 | 0) >> 2]) + 39 | 0)))
                f = e, r = 5;
            else if (yd(o))
                zd(o) ? (f = A[r >> 2], r = 5) : (d = 0, r = 9);
            else {
                var d = 0;
                r = 9;
            }
            do {
                if (5 == r) {
                    if (0 != (0 | Tc(f + 55 | 0))) {
                        if (!Ad(o)) {
                            d = 0;
                            break;
                        }
                        if (!Bd(o)) {
                            d = 0;
                            break;
                        }
                    }
                    d = 1;
                }
            } while (0);
            f = d;
        }
        else
            f = 0;
    }
    f ? f = o : (0 != (0 | o) && (Cd(o), Nc(o)), f = 0);
} A[(n |= 0) >> 2] = i, !(0 == (0 | f) | 0 == (0 | n) | 8 > a >>> 0 | 0) && 519686845 == (0 | A[f >> 2]) && (i = Uc(0 + (d = E[f + 88 >> 2]) + 70 | 0), o = A[f + 8 >> 2], (d = 1 < Vc(d + 16 | 0) >>> 0 ? Uc(4 + d + 70 | 0) : o) >>> 0 > i >>> 0 || Ec(0 | R.Qa, 3705), qd(f, A[f + 4 >> 2] + i | 0, d - i | 0, n, a, c, 0)), 0 != (0 | f) && 519686845 == (0 | A[f >> 2]) && 0 != (0 | f) && (Cd(f), Nc(f)), v = t; }, rd.X = 1, Cd.X = 1, sd.X = 1, td.X = 1, ud.X = 1, yd.X = 1, zd.X = 1, Ad.X = 1, Bd.X = 1, Module._malloc = Yb, Yb.X = 1, Ld.X = 1, Nd.X = 1, Md.X = 1, Wd.X = 1, Module._free = Xd, Xd.X = 1, Yd.X = 1, Td.X = 1, Ud.X = 1;
var ee = function () { function e(r, e) { r != n && ("number" == typeof r ? this.k(r) : e == n && "string" != typeof r ? this.q(r, 256) : this.q(r, e)); } function i() { return new e(n); } function a(r, e) { var i = c[r.charCodeAt(e)]; return i == n ? -1 : i; } function t(r) { var e = i(); return e.t(r), e; } var A; (A = function (r, e) { this.d = 0 | r, this.e = 0 | e; }).W = {}, A.t = function (r) { if (-128 <= r && 128 > r) {
    var e = A.W[r];
    if (e)
        return e;
} return e = new A(0 | r, 0 > r ? -1 : 0), -128 <= r && 128 > r && (A.W[r] = e), e; }, A.k = function (r) { return isNaN(r) || !isFinite(r) ? A.ZERO : r <= -A.$ ? A.MIN_VALUE : r + 1 >= A.$ ? A.MAX_VALUE : 0 > r ? A.k(-r).f() : new A(r % A.r | 0, r / A.r | 0); }, A.p = function (r, e) { return new A(r, e); }, A.q = function (r, e) { 0 == r.length && b(Error("number format error: empty string")); var i = e || 10; if ((2 > i || 36 < i) && b(Error("radix out of range: " + i)), "-" == r.charAt(0))
    return A.q(r.substring(1), i).f(); 0 <= r.indexOf("-") && b(Error('number format error: interior "-" character: ' + r)); for (var a = A.k(Math.pow(i, 8)), t = A.ZERO, n = 0; n < r.length; n += 8) {
    var o = Math.min(8, r.length - n), f = parseInt(r.substring(n, n + o), i);
    8 > o ? (o = A.k(Math.pow(i, o)), t = t.multiply(o).add(A.k(f))) : t = (t = t.multiply(a)).add(A.k(f));
} return t; }, A.L = 65536, A.ob = 16777216, A.pb = (A.r = A.L * A.L) / 2, A.qb = A.r * A.L, A.$ = (A.ya = A.r * A.r) / 2, A.ZERO = A.t(0), A.ONE = A.t(1), A.Y = A.t(-1), A.MAX_VALUE = A.p(-1, 2147483647), A.MIN_VALUE = A.p(0, -2147483648), A.Z = A.t(16777216), A.prototype.K = function () { return this.e * A.r + this.eb(); }, A.prototype.toString = function (r) { if ((2 > (r = r || 10) || 36 < r) && b(Error("radix out of range: " + r)), this.v())
    return "0"; if (this.i()) {
    if (this.j(A.MIN_VALUE)) {
        var e = A.k(r);
        e = (i = this.o(e)).multiply(e).u(this);
        return i.toString(r) + e.d.toString(r);
    }
    return "-" + this.f().toString(r);
} for (var i = A.k(Math.pow(r, 6)), a = (e = this, "");;) {
    var t = e.o(i), n = e.u(t.multiply(i)).d.toString(r);
    if ((e = t).v())
        return n + a;
    for (; 6 > n.length;)
        n = "0" + n;
    a = "" + n + a;
} }, A.prototype.eb = function () { return 0 <= this.d ? this.d : A.r + this.d; }, A.prototype.v = function () { return 0 == this.e && 0 == this.d; }, A.prototype.i = function () { return 0 > this.e; }, A.prototype.la = function () { return 1 == (1 & this.d); }, A.prototype.j = function (r) { return this.e == r.e && this.d == r.d; }, A.prototype.pa = function (r) { return 0 > this.O(r); }, A.prototype.fb = function (r) { return 0 < this.O(r); }, A.prototype.gb = function (r) { return 0 <= this.O(r); }, A.prototype.O = function (r) { if (this.j(r))
    return 0; var e = this.i(), i = r.i(); return e && !i ? -1 : !e && i ? 1 : this.u(r).i() ? -1 : 1; }, A.prototype.f = function () { return this.j(A.MIN_VALUE) ? A.MIN_VALUE : this.kb().add(A.ONE); }, A.prototype.add = function (r) { var e, i = this.e >>> 16, a = 65535 & this.e, t = this.d >>> 16, n = r.e >>> 16, o = 65535 & r.e, f = r.d >>> 16; return r = 0 + ((e = (65535 & this.d) + (65535 & r.d) + 0) >>> 16), t = 0 + ((r += t + f) >>> 16), A.p((65535 & r) << 16 | 65535 & e, ((a = 0 + ((t += a + o) >>> 16)) + (i + n) & 65535) << 16 | 65535 & t); }, A.prototype.u = function (r) { return this.add(r.f()); }, A.prototype.multiply = function (r) { if (this.v() || r.v())
    return A.ZERO; if (this.j(A.MIN_VALUE))
    return r.la() ? A.MIN_VALUE : A.ZERO; if (r.j(A.MIN_VALUE))
    return this.la() ? A.MIN_VALUE : A.ZERO; if (this.i())
    return r.i() ? this.f().multiply(r.f()) : this.f().multiply(r).f(); if (r.i())
    return this.multiply(r.f()).f(); if (this.pa(A.Z) && r.pa(A.Z))
    return A.k(this.K() * r.K()); var e, i, a, t, n = this.e >>> 16, o = 65535 & this.e, f = this.d >>> 16, c = 65535 & this.d, u = r.e >>> 16, s = 65535 & r.e, d = r.d >>> 16; return a = 0 + ((t = 0 + c * (r = 65535 & r.d)) >>> 16), i = 0 + ((a += f * r) >>> 16), i += (a = (65535 & a) + c * d) >>> 16, e = 0 + ((i += o * r) >>> 16), e += (i = (65535 & i) + f * d) >>> 16, A.p((65535 & a) << 16 | 65535 & t, ((e += (i = (65535 & i) + c * s) >>> 16) + (n * r + o * d + f * s + c * u) & 65535) << 16 | 65535 & i); }, A.prototype.o = function (r) { if (r.v() && b(Error("division by zero")), this.v())
    return A.ZERO; if (this.j(A.MIN_VALUE)) {
    if (r.j(A.ONE) || r.j(A.Y))
        return A.MIN_VALUE;
    if (r.j(A.MIN_VALUE))
        return A.ONE;
    if ((a = this.mb().o(r).shiftLeft(1)).j(A.ZERO))
        return r.i() ? A.ONE : A.Y;
    var e = this.u(r.multiply(a));
    return a.add(e.o(r));
} if (r.j(A.MIN_VALUE))
    return A.ZERO; if (this.i())
    return r.i() ? this.f().o(r.f()) : this.f().o(r).f(); if (r.i())
    return this.o(r.f()).f(); var i = A.ZERO; for (e = this; e.gb(r);) {
    for (var a = Math.max(1, Math.floor(e.K() / r.K())), t = 48 >= (t = Math.ceil(Math.log(a) / Math.LN2)) ? 1 : Math.pow(2, t - 48), n = A.k(a), o = n.multiply(r); o.i() || o.fb(e);)
        o = (n = A.k(a -= t)).multiply(r);
    n.v() && (n = A.ONE), i = i.add(n), e = e.u(o);
} return i; }, A.prototype.ra = function (r) { return this.u(this.o(r).multiply(r)); }, A.prototype.kb = function () { return A.p(~this.d, ~this.e); }, A.prototype.shiftLeft = function (r) { if (0 == (r &= 63))
    return this; var e = this.d; return 32 > r ? A.p(e << r, this.e << r | e >>> 32 - r) : A.p(0, e << r - 32); }, A.prototype.mb = function () { var r = this.e; return A.p(this.d >>> 1 | r << 31, r >> 1); }, e.prototype.M = function (r, e, i, a) { for (var t = 0, n = 0; 0 <= --a;) {
    var A = r * this[t++] + e[i] + n;
    n = Math.floor(A / 67108864);
    e[i++] = 67108863 & A;
} return n; }, e.prototype.c = 26, e.prototype.n = 67108863, e.prototype.C = 67108864, e.prototype.xa = Math.pow(2, 52), e.prototype.U = 26, e.prototype.V = 0; var o, f, c = []; for (o = 48, f = 0; 9 >= f; ++f)
    c[o++] = f; for (o = 97, f = 10; 36 > f; ++f)
    c[o++] = f; for (o = 65, f = 10; 36 > f; ++f)
    c[o++] = f; e.prototype.copyTo = function (r) { for (var e = this.a - 1; 0 <= e; --e)
    r[e] = this[e]; r.a = this.a, r.b = this.b; }, e.prototype.t = function (r) { this.a = 1, this.b = 0 > r ? -1 : 0, 0 < r ? this[0] = r : -1 > r ? this[0] = r + DV : this.a = 0; }, e.prototype.q = function (i, t) { var n; if (16 == t)
    n = 4;
else if (8 == t)
    n = 3;
else if (256 == t)
    n = 8;
else if (2 == t)
    n = 1;
else if (32 == t)
    n = 5;
else {
    if (4 != t)
        return void this.cb(i, t);
    n = 2;
} this.b = this.a = 0; for (var A = i.length, o = r, f = 0; 0 <= --A;) {
    var c = 8 == n ? 255 & i[A] : a(i, A);
    0 > c ? "-" == i.charAt(A) && (o = l) : (o = r, 0 == f ? this[this.a++] = c : f + n > this.c ? (this[this.a - 1] |= (c & (1 << this.c - f) - 1) << f, this[this.a++] = c >> this.c - f) : this[this.a - 1] |= c << f, (f += n) >= this.c && (f -= this.c));
} 8 == n && 0 != (128 & i[0]) && (this.b = -1, 0 < f && (this[this.a - 1] |= (1 << this.c - f) - 1 << f)), this.s(), o && e.ZERO.m(this, this); }, e.prototype.s = function () { for (var r = this.b & this.n; 0 < this.a && this[this.a - 1] == r;)
    --this.a; }, e.prototype.P = function (r, e) { var i; for (i = this.a - 1; 0 <= i; --i)
    e[i + r] = this[i]; for (i = r - 1; 0 <= i; --i)
    e[i] = 0; e.a = this.a + r, e.b = this.b; }, e.prototype.bb = function (r, e) { for (var i = r; i < this.a; ++i)
    e[i - r] = this[i]; e.a = Math.max(this.a - r, 0), e.b = this.b; }, e.prototype.oa = function (r, e) { var i, a = r % this.c, t = this.c - a, n = (1 << t) - 1, A = Math.floor(r / this.c), o = this.b << a & this.n; for (i = this.a - 1; 0 <= i; --i)
    e[i + A + 1] = this[i] >> t | o, o = (this[i] & n) << a; for (i = A - 1; 0 <= i; --i)
    e[i] = 0; e[A] = o, e.a = this.a + A + 1, e.b = this.b, e.s(); }, e.prototype.lb = function (r, e) { e.b = this.b; var i = Math.floor(r / this.c); if (i >= this.a)
    e.a = 0;
else {
    var a = r % this.c, t = this.c - a, n = (1 << a) - 1;
    e[0] = this[i] >> a;
    for (var A = i + 1; A < this.a; ++A)
        e[A - i - 1] |= (this[A] & n) << t, e[A - i] = this[A] >> a;
    0 < a && (e[this.a - i - 1] |= (this.b & n) << t), e.a = this.a - i, e.s();
} }, e.prototype.m = function (r, e) { for (var i = 0, a = 0, t = Math.min(r.a, this.a); i < t;)
    a += this[i] - r[i], e[i++] = a & this.n, a >>= this.c; if (r.a < this.a) {
    for (a -= r.b; i < this.a;)
        a += this[i], e[i++] = a & this.n, a >>= this.c;
    a += this.b;
}
else {
    for (a += this.b; i < r.a;)
        a -= r[i], e[i++] = a & this.n, a >>= this.c;
    a -= r.b;
} e.b = 0 > a ? -1 : 0, -1 > a ? e[i++] = this.C + a : 0 < a && (e[i++] = a), e.a = i, e.s(); }, e.prototype.jb = function (r, i) { var a = this.abs(), t = r.abs(), n = a.a; for (i.a = n + t.a; 0 <= --n;)
    i[n] = 0; for (n = 0; n < t.a; ++n)
    i[n + a.a] = a.M(t[n], i, n, a.a); i.b = 0, i.s(), this.b != r.b && e.ZERO.m(i, i); }, e.prototype.w = function (r, a, t) { var A = r.abs(); if (!(0 >= A.a)) {
    var o = this.abs();
    if (o.a < A.a)
        a != n && a.t(0), t != n && this.copyTo(t);
    else {
        t == n && (t = i());
        var f, c = i(), u = this.b, s = (r = r.b, A[A.a - 1]), d = 1;
        if (0 != (f = s >>> 16) && (s = f, d += 16), 0 != (f = s >> 8) && (s = f, d += 8), 0 != (f = s >> 4) && (s = f, d += 4), 0 != (f = s >> 2) && (s = f, d += 2), 0 != s >> 1 && (d += 1), 0 < (s = this.c - d) ? (A.oa(s, c), o.oa(s, t)) : (A.copyTo(c), o.copyTo(t)), 0 != (o = c[(A = c.a) - 1])) {
            f = o * (1 << this.U) + (1 < A ? c[A - 2] >> this.V : 0), d = this.xa / f, f = (1 << this.U) / f;
            var v = 1 << this.V, l = t.a, h = l - A, b = a == n ? i() : a;
            for (c.P(h, b), 0 <= t.ab(b) && (t[t.a++] = 1, t.m(b, t)), e.ONE.P(A, b), b.m(c, c); c.a < A;)
                c[c.a++] = 0;
            for (; 0 <= --h;) {
                var p = t[--l] == o ? this.n : Math.floor(t[l] * d + (t[l - 1] + v) * f);
                if ((t[l] += c.M(p, t, h, A)) < p)
                    for (c.P(h, b), t.m(b, t); t[l] < --p;)
                        t.m(b, t);
            }
            a != n && (t.bb(A, a), u != r && e.ZERO.m(a, a)), t.a = A, t.s(), 0 < s && t.lb(s, t), 0 > u && e.ZERO.m(t, t);
        }
    }
} }, e.prototype.toString = function (e) { if (0 > this.b)
    return "-" + this.f().toString(e); if (16 == e)
    e = 4;
else if (8 == e)
    e = 3;
else if (2 == e)
    e = 1;
else if (32 == e)
    e = 5;
else {
    if (4 != e)
        return this.nb(e);
    e = 2;
} var i, a = (1 << e) - 1, t = r, n = "", A = this.a, o = this.c - A * this.c % e; if (0 < A--)
    for (o < this.c && 0 < (i = this[A] >> o) && (t = l, n = "0123456789abcdefghijklmnopqrstuvwxyz".charAt(i)); 0 <= A;)
        o < e ? (i = (this[A] & (1 << o) - 1) << e - o, i |= this[--A] >> (o += this.c - e)) : (i = this[A] >> (o -= e) & a, 0 >= o && (o += this.c, --A)), 0 < i && (t = l), t && (n += "0123456789abcdefghijklmnopqrstuvwxyz".charAt(i)); return t ? n : "0"; }, e.prototype.f = function () { var r = i(); return e.ZERO.m(this, r), r; }, e.prototype.abs = function () { return 0 > this.b ? this.f() : this; }, e.prototype.ab = function (r) { if (0 != (e = this.b - r.b))
    return e; var e, i = this.a; if (0 != (e = i - r.a))
    return e; for (; 0 <= --i;)
    if (0 != (e = this[i] - r[i]))
        return e; return 0; }, e.ZERO = t(0), e.ONE = t(1), e.prototype.cb = function (i, t) { this.t(0), t == n && (t = 10); for (var A = this.fa(t), o = Math.pow(t, A), f = r, c = 0, u = 0, s = 0; s < i.length; ++s) {
    var d = a(i, s);
    0 > d ? "-" == i.charAt(s) && 0 == this.S() && (f = l) : (u = t * u + d, ++c >= A && (this.ha(o), this.ga(u), u = c = 0));
} 0 < c && (this.ha(Math.pow(t, c)), this.ga(u)), f && e.ZERO.m(this, this); }, e.prototype.fa = function (r) { return Math.floor(Math.LN2 * this.c / Math.log(r)); }, e.prototype.S = function () { return 0 > this.b ? -1 : 0 >= this.a || 1 == this.a && 0 >= this[0] ? 0 : 1; }, e.prototype.ha = function (r) { this[this.a] = this.M(r - 1, this, 0, this.a), ++this.a, this.s(); }, e.prototype.ga = function (r) { var e = 0; if (0 != r) {
    for (; this.a <= e;)
        this[this.a++] = 0;
    for (this[e] += r; this[e] >= this.C;)
        this[e] -= this.C, ++e >= this.a && (this[this.a++] = 0), ++this[e];
} }, e.prototype.nb = function (r) { if (r == n && (r = 10), 0 == this.S() || 2 > r || 36 < r)
    return "0"; var e = this.fa(r), a = t(e = Math.pow(r, e)), A = i(), o = i(), f = ""; for (this.w(a, A, o); 0 < A.S();)
    f = (e + o.ja()).toString(r).substr(1) + f, A.w(a, A, o); return o.ja().toString(r) + f; }, e.prototype.ja = function () { if (0 > this.b) {
    if (1 == this.a)
        return this[0] - this.C;
    if (0 == this.a)
        return -1;
}
else {
    if (1 == this.a)
        return this[0];
    if (0 == this.a)
        return 0;
} return (this[1] & (1 << 32 - this.c) - 1) << this.c | this[0]; }, e.prototype.ea = function (r, e) { for (var i = 0, a = 0, t = Math.min(r.a, this.a); i < t;)
    a += this[i] + r[i], e[i++] = a & this.n, a >>= this.c; if (r.a < this.a) {
    for (a += r.b; i < this.a;)
        a += this[i], e[i++] = a & this.n, a >>= this.c;
    a += this.b;
}
else {
    for (a += this.b; i < r.a;)
        a += r[i], e[i++] = a & this.n, a >>= this.c;
    a += r.b;
} e.b = 0 > a ? -1 : 0, 0 < a ? e[i++] = a : -1 > a && (e[i++] = this.C + a), e.a = i, e.s(); }; var u = { result: [0, 0], add: function (r, e, i, a) { r = new A(r, e).add(new A(i, a)), u.result[0] = r.d, u.result[1] = r.e; }, u: function (r, e, i, a) { r = new A(r, e).u(new A(i, a)), u.result[0] = r.d, u.result[1] = r.e; }, multiply: function (r, e, i, a) { r = new A(r, e).multiply(new A(i, a)), u.result[0] = r.d, u.result[1] = r.e; }, qa: function () { u.B = new e, u.B.q("4294967296", 10); }, I: function (r, i) { var a = new e; a.q(i.toString(), 10); var t = new e; a.jb(u.B, t), (a = new e).q(r.toString(), 10); var n = new e; return a.ea(t, n), n; }, Hb: function (r, i, a, t, o) { u.B || u.qa(), o ? (r = u.I(r >>> 0, i >>> 0), t = u.I(a >>> 0, t >>> 0), a = new e, r.w(t, a, n), t = new e, r = new e, a.w(u.B, r, t), u.result[0] = 0 | parseInt(t.toString()), u.result[1] = 0 | parseInt(r.toString())) : (r = new A(r, i), t = new A(a, t), a = r.o(t), u.result[0] = a.d, u.result[1] = a.e); }, ra: function (r, i, a, t, o) { u.B || u.qa(), o ? (r = u.I(r >>> 0, i >>> 0), t = u.I(a >>> 0, t >>> 0), a = new e, r.w(t, n, a), t = new e, r = new e, a.w(u.B, r, t), u.result[0] = 0 | parseInt(t.toString()), u.result[1] = 0 | parseInt(r.toString())) : (r = new A(r, i), t = new A(a, t), a = r.ra(t), u.result[0] = a.d, u.result[1] = a.e); }, stringify: function (r, i, a) { return r = new A(r, i).toString(), a && "-" == r[0] && (u.T || (u.T = new e, u.T.q("18446744073709551616", 10)), (a = new e).q(r, 10), r = new e, u.T.ea(a, r), r = r.toString(10)), r; } }; return u; }();
function Fc(e, i) { function a(r) { var e; return "double" === r ? (Wb[0] = A[i + c >> 2], Wb[1] = A[i + c + 4 >> 2], e = Vb[0]) : "i64" == r ? e = [A[i + c >> 2], A[i + c + 4 >> 2]] : (r = "i32", e = A[i + c >> 2]), c += Math.max(Ta(r), Ua), e; } for (var t, o, f = e, c = 0, u = [];;) {
    var s = f;
    if (0 === (t = z[f]))
        break;
    if (o = z[f + 1], 37 == t) {
        var d = r, v = r, h = r, b = r;
        r: for (;;) {
            switch (o) {
                case 43:
                    d = l;
                    break;
                case 45:
                    v = l;
                    break;
                case 35:
                    h = l;
                    break;
                case 48:
                    if (b)
                        break r;
                    b = l;
                    break;
                default: break r;
            }
            o = z[++f + 1];
        }
        var p = 0;
        if (42 == o)
            p = a("i32"), o = z[++f + 1];
        else
            for (; 48 <= o && 57 >= o;)
                p = 10 * p + (o - 48), o = z[++f + 1];
        var E, T = r;
        if (46 == o) {
            var R = 0;
            T = l;
            if (42 == (o = z[++f + 1]))
                R = a("i32"), f++;
            else
                for (; !(48 > (o = z[f + 1]) || 57 < o);)
                    R = 10 * R + (o - 48), f++;
            o = z[f + 1];
        }
        else
            R = 6;
        switch (String.fromCharCode(o)) {
            case "h":
                104 == (o = z[f + 2]) ? (f++, E = 1) : E = 2;
                break;
            case "l":
                108 == (o = z[f + 2]) ? (f++, E = 8) : E = 4;
                break;
            case "L":
            case "q":
            case "j":
                E = 8;
                break;
            case "z":
            case "t":
            case "I":
                E = 4;
                break;
            default: E = n;
        }
        if (E && f++, o = z[f + 1], -1 != "d,i,u,o,x,X,p".split(",").indexOf(String.fromCharCode(o))) {
            s = 100 == o || 105 == o;
            var k, w = t = a("i" + 8 * (E = E || 4));
            8 == E && (t = 117 == o ? (t[0] >>> 0) + 4294967296 * (t[1] >>> 0) : (t[0] >>> 0) + 4294967296 * (0 | t[1])), 4 >= E && (t = (s ? yc : xc)(t & Math.pow(256, E) - 1, 8 * E));
            var y = Math.abs(t);
            s = "";
            if (100 == o || 105 == o)
                k = 8 == E && ee ? ee.stringify(w[0], w[1]) : yc(t, 8 * E).toString(10);
            else if (117 == o)
                k = 8 == E && ee ? ee.stringify(w[0], w[1], l) : xc(t, 8 * E).toString(10), t = Math.abs(t);
            else if (111 == o)
                k = (h ? "0" : "") + y.toString(8);
            else if (120 == o || 88 == o) {
                if (s = h ? "0x" : "", 0 > t) {
                    for (t = -t, k = (y - 1).toString(16), h = [], w = 0; w < k.length; w++)
                        h.push((15 - parseInt(k[w], 16)).toString(16));
                    for (k = h.join(""); k.length < 2 * E;)
                        k = "f" + k;
                }
                else
                    k = y.toString(16);
                88 == o && (s = s.toUpperCase(), k = k.toUpperCase());
            }
            else
                112 == o && (0 === y ? k = "(nil)" : (s = "0x", k = y.toString(16)));
            if (T)
                for (; k.length < R;)
                    k = "0" + k;
            for (d && (s = 0 > t ? "-" + s : "+" + s); s.length + k.length < p;)
                v ? k += " " : b ? k = "0" + k : s = " " + s;
            (k = s + k).split("").forEach(function (r) { u.push(r.charCodeAt(0)); });
        }
        else if (-1 != "f,F,e,E,g,G".split(",").indexOf(String.fromCharCode(o))) {
            if (t = a("double"), isNaN(t))
                k = "nan", b = r;
            else if (isFinite(t)) {
                if (T = r, E = Math.min(R, 20), 103 != o && 71 != o || (T = l, (R = R || 1) > (E = parseInt(t.toExponential(E).split("e")[1], 10)) && -4 <= E ? (o = (103 == o ? "f" : "F").charCodeAt(0), R -= E + 1) : (o = (103 == o ? "e" : "E").charCodeAt(0), R--), E = Math.min(R, 20)), 101 == o || 69 == o ? (k = t.toExponential(E), /[eE][-+]\d$/.test(k) && (k = k.slice(0, -1) + "0" + k.slice(-1))) : 102 != o && 70 != o || (k = t.toFixed(E)), s = k.split("e"), T && !h)
                    for (; 1 < s[0].length && -1 != s[0].indexOf(".") && ("0" == s[0].slice(-1) || "." == s[0].slice(-1));)
                        s[0] = s[0].slice(0, -1);
                else
                    for (h && -1 == k.indexOf(".") && (s[0] += "."); R > E++;)
                        s[0] += "0";
                k = s[0] + (1 < s.length ? "e" + s[1] : ""), 69 == o && (k = k.toUpperCase()), d && 0 <= t && (k = "+" + k);
            }
            else
                k = (0 > t ? "-" : "") + "inf", b = r;
            for (; k.length < p;)
                k = v ? k + " " : !b || "-" != k[0] && "+" != k[0] ? (b ? "0" : " ") + k : k[0] + "0" + k.slice(1);
            97 > o && (k = k.toUpperCase()), k.split("").forEach(function (r) { u.push(r.charCodeAt(0)); });
        }
        else if (115 == o) {
            if ((d = a("i8*")) ? (d = wc(d), T && d.length > R && (d = d.slice(0, R))) : d = gc("(null)", l), !v)
                for (; d.length < p--;)
                    u.push(32);
            if (u = u.concat(d), v)
                for (; d.length < p--;)
                    u.push(32);
        }
        else if (99 == o) {
            for (v && u.push(a("i8")); 0 < --p;)
                u.push(32);
            v || u.push(a("i8"));
        }
        else if (110 == o)
            v = a("i32*"), A[v >> 2] = u.length;
        else if (37 == o)
            u.push(t);
        else
            for (w = s; w < f + 2; w++)
                u.push(z[w]);
        f += 2;
    }
    else
        u.push(t), f += 1;
} return u; }
var fe = 13, ge = 9, he = 22, ke = 5, le = 21, me = 6;
function ne(r) { Vd || (Vd = N([0], "i32", I)), A[Vd >> 2] = r; }
var Vd, oe = 0, Gc = 0, pe = 0, qe = 2, Ic = [n], re = l, Ce, ue, De, de, Kc, Lc, Hd, T, Od, be, Ee, Fe, Ge, He;
function se(r, e) { if ("string" != typeof r)
    return n; e === aa && (e = "/"), r && "/" == r[0] && (e = ""); for (var i = (e + "/" + r).split("/").reverse(), a = [""]; i.length;) {
    var t = i.pop();
    "" == t || "." == t || (".." == t ? 1 < a.length && a.pop() : a.push(t));
} return 1 == a.length ? "/" : a.join("/"); }
function te(e, i, a) { var t = { ib: r, Q: r, error: 0, name: n, path: n, object: n, sa: r, ua: n, ta: n }; if ("/" == (e = se(e)))
    t.ib = l, t.Q = t.sa = l, t.name = "/", t.path = t.ua = "/", t.object = t.ta = ue;
else if (e !== n) {
    a = a || 0, e = e.slice(1).split("/");
    for (var A = ue, o = [""]; e.length;) {
        1 == e.length && A.z && (t.sa = l, t.ua = 1 == o.length ? "/" : o.join("/"), t.ta = A, t.name = e[0]);
        var f = e.shift();
        if (!A.z) {
            t.error = 20;
            break;
        }
        if (!A.va) {
            t.error = fe;
            break;
        }
        if (!A.l.hasOwnProperty(f)) {
            t.error = 2;
            break;
        }
        if ((A = A.l[f]).link && (!i || 0 != e.length)) {
            if (40 < a) {
                t.error = 40;
                break;
            }
            t = te([t = se(A.link, o.join("/"))].concat(e).join("/"), i, a + 1);
            break;
        }
        o.push(f), 0 == e.length && (t.Q = l, t.path = o.join("/"), t.object = A);
    }
} return t; }
function ve(r) { return we(), (r = te(r, aa)).Q ? r.object : (ne(r.error), n); }
function xe(e, i, a, t, n) { for (var A in e || (e = "/"), "string" == typeof e && (e = ve(e)), e || (ne(fe), b(Error("Parent path must exist."))), e.z || (ne(20), b(Error("Parent must be a folder."))), !e.write && !re && (ne(fe), b(Error("Parent folder must be writeable."))), i && "." != i && ".." != i || (ne(2), b(Error("Name must not be empty."))), e.l.hasOwnProperty(i) && (ne(17), b(Error("Can't overwrite object."))), e.l[i] = { va: t === aa ? l : t, write: n === aa ? r : n, timestamp: Date.now(), hb: qe++ }, a)
    a.hasOwnProperty(A) && (e.l[i][A] = a[A]); return e.l[i]; }
function ye(e, i) { return xe(e, i, { z: l, G: r, l: {} }, l, l); }
function ze() { var r = "dev/shm/tmp", e = ve("/"); for (e === n && b(Error("Invalid parent.")), r = r.split("/").reverse(); r.length;) {
    var i = r.pop();
    i && (e.l.hasOwnProperty(i) || ye(e, i), e = e.l[i]);
} }
function Ae(e, i, a, t) { !a && !t && b(Error("A device must have at least one callback defined.")); var n = { G: l, input: a, A: t }; return n.z = r, xe(e, i, n, Boolean(a), Boolean(t)); }
function we() { ue || (ue = { va: l, write: l, z: l, G: r, timestamp: Date.now(), hb: 1, l: {} }); }
function Be() { var e, i, a; function t(r) { r === n || 10 === r ? (i.J(i.buffer.join("")), i.buffer = []) : i.buffer.push(String.fromCharCode(r)); } Xa(!Ce, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"), Ce = l, we(), e = e || Module.stdin, i = i || Module.stdout, a = a || Module.stderr; var A = l, o = l, f = l; e || (A = r, e = function () { var r; e.N && e.N.length || ("undefined" != typeof window && "function" == typeof window.prompt ? r = window.prompt("Input: ") : "function" == typeof readline && (r = readline()), r || (r = ""), e.N = gc(r + "\n", l)); return e.N.shift(); }), i || (o = r, i = t), i.J || (i.J = Module.print), i.buffer || (i.buffer = []), a || (f = r, a = t), a.J || (a.J = Module.print), a.buffer || (a.buffer = []), ye("/", "tmp"); var c = ye("/", "dev"), u = Ae(c, "stdin", e), s = Ae(c, "stdout", n, i); a = Ae(c, "stderr", n, a), Ae(c, "tty", e, i), Ic[1] = { path: "/dev/stdin", object: u, position: 0, ma: l, H: r, ka: r, na: !A, error: r, ia: r, wa: [] }, Ic[2] = { path: "/dev/stdout", object: s, position: 0, ma: r, H: l, ka: r, na: !o, error: r, ia: r, wa: [] }, Ic[3] = { path: "/dev/stderr", object: a, position: 0, ma: r, H: l, ka: r, na: !f, error: r, ia: r, wa: [] }, oe = N([1], "void*", I), Gc = N([2], "void*", I), pe = N([3], "void*", I), ze(), Ic[oe] = Ic[1], Ic[Gc] = Ic[2], Ic[pe] = Ic[3], N([N([0, 0, 0, 0, oe, 0, 0, 0, Gc, 0, 0, 0, pe, 0, 0, 0], "void*", I)], "void*", I); }
function Hc(r, e, i) { var a = Ic[r]; if (a) {
    if (a.H) {
        if (0 > i)
            return ne(he), -1;
        if (a.object.G) {
            if (a.object.A) {
                for (var t = 0; t < i; t++)
                    try {
                        a.object.A(z[e + t]);
                    }
                    catch (r) {
                        return ne(ke), -1;
                    }
                return a.object.timestamp = Date.now(), t;
            }
            return ne(me), -1;
        }
        if (t = a.position, !(r = Ic[r]) || r.object.G)
            ne(ge), e = -1;
        else if (r.H)
            if (r.object.z)
                ne(le), e = -1;
            else if (0 > i || 0 > t)
                ne(he), e = -1;
            else {
                for (var n = r.object.l; n.length < t;)
                    n.push(0);
                for (var A = 0; A < i; A++)
                    n[t + A] = B[e + A];
                r.object.timestamp = Date.now(), e = A;
            }
        else
            ne(fe), e = -1;
        return -1 != e && (a.position += e), e;
    }
    return ne(fe), -1;
} return ne(ge), -1; }
function Zb(r, e, i) { if (20 <= i) {
    for (i = r + i; r % 4;)
        z[r++] = e;
    0 > e && (e += 256);
    r = r >> 2;
    for (var a = i >> 2, t = e | e << 8 | e << 16 | e << 24; r < a;)
        A[r++] = t;
    for (r <<= 2; r < i;)
        z[r++] = e;
}
else
    for (; i--;)
        z[r++] = e; }
function hd(r, e, i) { if (20 <= i && e % 2 == r % 2)
    if (e % 4 == r % 4) {
        for (i = e + i; e % 4;)
            z[r++] = z[e++];
        e = e >> 2, r = r >> 2;
        for (var a = i >> 2; e < a;)
            A[r++] = A[e++];
        for (e <<= 2, r <<= 2; e < i;)
            z[r++] = z[e++];
    }
    else {
        for (i = e + i, e % 2 && (z[r++] = z[e++]), e >>= 1, r >>= 1, a = i >> 1; e < a;)
            hb[r++] = hb[e++];
        r <<= 1, (e <<= 1) < i && (z[r++] = z[e++]);
    }
else
    for (; i--;)
        z[r++] = z[e++]; }
function X() { b("abort() at " + Error().stack); }
function Zd() { return ac; }
function Rd(r) { De || (bb = bb + 4095 >> 12 << 12, De = l); var e = bb; return 0 != r && ab(r), e; }
function Ie(r) { r = r || Module.arguments, Module.setStatus && Module.setStatus(""), Module.preRun && Module.preRun(); var e = n; return Module._main && (qc(sc), e = Module.$a(r), Module.noExitRuntime || qc(tc)), Module.postRun && Module.postRun(), e; }
rc.unshift({ R: function () { !Module.noFSInit && !Ce && Be(); } }), sc.push({ R: function () { re = r; } }), tc.push({ R: function () { Ce && (Ic[2] && 0 < Ic[2].object.A.buffer.length && Ic[2].object.A(10), Ic[3] && 0 < Ic[3].object.A.buffer.length && Ic[3].object.A(10)); } }), ne(0), N(12, "void*", I), Module.$a = function (r) { function e() { for (var r = 0; 3 > r; r++)
    a.push(0); } var i = r.length + 1, a = [N(gc("/bin/this.program"), "i8", I)]; e(); for (var t = 0; t < i - 1; t += 1)
    a.push(N(gc(r[t]), "i8", I)), e(); return a.push(0), a = N(a, "i32", I), _main(i, a, 0); }, R.Ca = N([37, 115, 40, 37, 117, 41, 58, 32, 65, 115, 115, 101, 114, 116, 105, 111, 110, 32, 102, 97, 105, 108, 117, 114, 101, 58, 32, 34, 37, 115, 34, 10, 0], "i8", I), R.Da = N([109, 95, 115, 105, 122, 101, 32, 60, 61, 32, 109, 95, 99, 97, 112, 97, 99, 105, 116, 121, 0], "i8", I), R.Ka = N([46, 47, 99, 114, 110, 95, 100, 101, 99, 111, 109, 112, 46, 104, 0], "i8", I), R.Pa = N([109, 105, 110, 95, 110, 101, 119, 95, 99, 97, 112, 97, 99, 105, 116, 121, 32, 60, 32, 40, 48, 120, 55, 70, 70, 70, 48, 48, 48, 48, 85, 32, 47, 32, 101, 108, 101, 109, 101, 110, 116, 95, 115, 105, 122, 101, 41, 0], "i8", I), R.Ta = N([110, 101, 119, 95, 99, 97, 112, 97, 99, 105, 116, 121, 32, 38, 38, 32, 40, 110, 101, 119, 95, 99, 97, 112, 97, 99, 105, 116, 121, 32, 62, 32, 109, 95, 99, 97, 112, 97, 99, 105, 116, 121, 41, 0], "i8", I), R.Ua = N([110, 117, 109, 95, 99, 111, 100, 101, 115, 91, 99, 93, 0], "i8", I), R.Va = N([115, 111, 114, 116, 101, 100, 95, 112, 111, 115, 32, 60, 32, 116, 111, 116, 97, 108, 95, 117, 115, 101, 100, 95, 115, 121, 109, 115, 0], "i8", I), R.Wa = N([112, 67, 111, 100, 101, 115, 105, 122, 101, 115, 91, 115, 121, 109, 95, 105, 110, 100, 101, 120, 93, 32, 61, 61, 32, 99, 111, 100, 101, 115, 105, 122, 101, 0], "i8", I), R.Xa = N([116, 32, 60, 32, 40, 49, 85, 32, 60, 60, 32, 116, 97, 98, 108, 101, 95, 98, 105, 116, 115, 41, 0], "i8", I), R.Ya = N([109, 95, 108, 111, 111, 107, 117, 112, 91, 116, 93, 32, 61, 61, 32, 99, 85, 73, 78, 84, 51, 50, 95, 77, 65, 88, 0], "i8", I), Kc = N([2], ["i8* (i8*, i32, i32*, i1, i8*)*", 0, 0, 0, 0], I), N([4], ["i32 (i8*, i8*)*", 0, 0, 0, 0], I), Lc = N(1, "i8*", I), R.aa = N([99, 114, 110, 100, 95, 109, 97, 108, 108, 111, 99, 58, 32, 115, 105, 122, 101, 32, 116, 111, 111, 32, 98, 105, 103, 0], "i8", I), R.Ea = N([99, 114, 110, 100, 95, 109, 97, 108, 108, 111, 99, 58, 32, 111, 117, 116, 32, 111, 102, 32, 109, 101, 109, 111, 114, 121, 0], "i8", I), R.ba = N([40, 40, 117, 105, 110, 116, 51, 50, 41, 112, 95, 110, 101, 119, 32, 38, 32, 40, 67, 82, 78, 68, 95, 77, 73, 78, 95, 65, 76, 76, 79, 67, 95, 65, 76, 73, 71, 78, 77, 69, 78, 84, 32, 45, 32, 49, 41, 41, 32, 61, 61, 32, 48, 0], "i8", I), R.Fa = N([99, 114, 110, 100, 95, 114, 101, 97, 108, 108, 111, 99, 58, 32, 98, 97, 100, 32, 112, 116, 114, 0], "i8", I), R.Ga = N([99, 114, 110, 100, 95, 102, 114, 101, 101, 58, 32, 98, 97, 100, 32, 112, 116, 114, 0], "i8", I), R.wb = N([99, 114, 110, 100, 95, 109, 115, 105, 122, 101, 58, 32, 98, 97, 100, 32, 112, 116, 114, 0], "i8", I), N([1, 0, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 16, 0, 0, 0, 32, 0, 0, 0, 64, 0, 0, 0, 128, 0, 0, 0, 256, 0, 0, 0, 512, 0, 0, 0, 1024, 0, 0, 0, 2048, 0, 0, 0, 4096, 0, 0, 0, 8192, 0, 0, 0, 16384, 0, 0, 0, 32768, 0, 0, 0, 65536, 0, 0, 0, 131072, 0, 0, 0, 262144, 0, 0, 0, 524288, 0, 0, 0, 1048576, 0, 0, 0, 2097152, 0, 0, 0, 4194304, 0, 0, 0, 8388608, 0, 0, 0, 16777216, 0, 0, 0, 33554432, 0, 0, 0, 67108864, 0, 0, 0, 134217728, 0, 0, 0, 268435456, 0, 0, 0, 536870912, 0, 0, 0, 1073741824, 0, 0, 0, -2147483648, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], I), R.Ia = N([102, 97, 108, 115, 101, 0], "i8", I), R.xb = N([99, 114, 110, 100, 95, 118, 97, 108, 105, 100, 97, 116, 101, 95, 102, 105, 108, 101, 40, 38, 110, 101, 119, 95, 104, 101, 97, 100, 101, 114, 44, 32, 97, 99, 116, 117, 97, 108, 95, 98, 97, 115, 101, 95, 100, 97, 116, 97, 95, 115, 105, 122, 101, 44, 32, 78, 85, 76, 76, 41, 0], "i8", I), R.yb = N([40, 116, 111, 116, 97, 108, 95, 115, 121, 109, 115, 32, 62, 61, 32, 49, 41, 32, 38, 38, 32, 40, 116, 111, 116, 97, 108, 95, 115, 121, 109, 115, 32, 60, 61, 32, 112, 114, 101, 102, 105, 120, 95, 99, 111, 100, 105, 110, 103, 58, 58, 99, 77, 97, 120, 83, 117, 112, 112, 111, 114, 116, 101, 100, 83, 121, 109, 115, 41, 32, 38, 38, 32, 40, 99, 111, 100, 101, 95, 115, 105, 122, 101, 95, 108, 105, 109, 105, 116, 32, 62, 61, 32, 49, 41, 0], "i8", I), R.Ja = N([40, 116, 111, 116, 97, 108, 95, 115, 121, 109, 115, 32, 62, 61, 32, 49, 41, 32, 38, 38, 32, 40, 116, 111, 116, 97, 108, 95, 115, 121, 109, 115, 32, 60, 61, 32, 112, 114, 101, 102, 105, 120, 95, 99, 111, 100, 105, 110, 103, 58, 58, 99, 77, 97, 120, 83, 117, 112, 112, 111, 114, 116, 101, 100, 83, 121, 109, 115, 41, 0], "i8", I), R.za = N([17, 18, 19, 20, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15, 16], "i8", I), R.ca = N([48, 0], "i8", I), R.La = N([110, 117, 109, 95, 98, 105, 116, 115, 32, 60, 61, 32, 51, 50, 85, 0], "i8", I), R.Ma = N([109, 95, 98, 105, 116, 95, 99, 111, 117, 110, 116, 32, 60, 61, 32, 99, 66, 105, 116, 66, 117, 102, 83, 105, 122, 101, 0], "i8", I), R.Na = N([116, 32, 33, 61, 32, 99, 85, 73, 78, 84, 51, 50, 95, 77, 65, 88, 0], "i8", I), R.Oa = N([109, 111, 100, 101, 108, 46, 109, 95, 99, 111, 100, 101, 95, 115, 105, 122, 101, 115, 91, 115, 121, 109, 93, 32, 61, 61, 32, 108, 101, 110, 0], "i8", I), N([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 7, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 7, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], I), N([0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 7, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], I), R.rb = N([0, 3, 1, 2], "i8", I), R.h = N([0, 2, 3, 1], "i8", I), R.sb = N([0, 7, 1, 2, 3, 4, 5, 6], "i8", I), R.g = N([0, 2, 3, 4, 5, 6, 7, 1], "i8", I), R.tb = N([1, 0, 5, 4, 3, 2, 6, 7], "i8", I), R.ub = N([1, 0, 7, 6, 5, 4, 3, 2], "i8", I), R.Ab = N([105, 110, 100, 101, 120, 32, 60, 32, 50, 0], "i8", I), R.Bb = N([40, 108, 111, 32, 60, 61, 32, 48, 120, 70, 70, 70, 70, 85, 41, 32, 38, 38, 32, 40, 104, 105, 32, 60, 61, 32, 48, 120, 70, 70, 70, 70, 85, 41, 0], "i8", I), R.Cb = N([40, 120, 32, 60, 32, 99, 68, 88, 84, 66, 108, 111, 99, 107, 83, 105, 122, 101, 41, 32, 38, 38, 32, 40, 121, 32, 60, 32, 99, 68, 88, 84, 66, 108, 111, 99, 107, 83, 105, 122, 101, 41, 0], "i8", I), R.Db = N([118, 97, 108, 117, 101, 32, 60, 61, 32, 48, 120, 70, 70, 0], "i8", I), R.Eb = N([118, 97, 108, 117, 101, 32, 60, 61, 32, 48, 120, 70, 0], "i8", I), R.Fb = N([40, 108, 111, 32, 60, 61, 32, 48, 120, 70, 70, 41, 32, 38, 38, 32, 40, 104, 105, 32, 60, 61, 32, 48, 120, 70, 70, 41, 0], "i8", I), R.F = N([105, 32, 60, 32, 109, 95, 115, 105, 122, 101, 0], "i8", I), R.da = N([110, 117, 109, 32, 38, 38, 32, 40, 110, 117, 109, 32, 61, 61, 32, 126, 110, 117, 109, 95, 99, 104, 101, 99, 107, 41, 0], "i8", I), R.D = N([1, 2, 2, 3, 3, 3, 3, 4], "i8", I), Hd = N([0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 2, 1, 2, 0, 0, 0, 1, 0, 2, 1, 0, 2, 0, 0, 1, 2, 3], "i8", I), R.Qa = N([110, 101, 120, 116, 95, 108, 101, 118, 101, 108, 95, 111, 102, 115, 32, 62, 32, 99, 117, 114, 95, 108, 101, 118, 101, 108, 95, 111, 102, 115, 0], "i8", I), R.Sa = N([40, 108, 101, 110, 32, 62, 61, 32, 49, 41, 32, 38, 38, 32, 40, 108, 101, 110, 32, 60, 61, 32, 99, 77, 97, 120, 69, 120, 112, 101, 99, 116, 101, 100, 67, 111, 100, 101, 83, 105, 122, 101, 41, 0], "i8", I), T = N(468, ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0], I), Od = N(24, "i32", I), R.Gb = N([109, 97, 120, 32, 115, 121, 115, 116, 101, 109, 32, 98, 121, 116, 101, 115, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0], "i8", I), R.vb = N([115, 121, 115, 116, 101, 109, 32, 98, 121, 116, 101, 115, 32, 32, 32, 32, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0], "i8", I), R.zb = N([105, 110, 32, 117, 115, 101, 32, 98, 121, 116, 101, 115, 32, 32, 32, 32, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0], "i8", I), N([0], "i8", I), N(1, "void ()*", I), be = N([0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 8, 0, 0, 0, 10, 0, 0, 0], ["*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0], I), N(1, "void*", I), R.Ra = N([115, 116, 100, 58, 58, 98, 97, 100, 95, 97, 108, 108, 111, 99, 0], "i8", I), Ee = N([0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 12, 0, 0, 0, 14, 0, 0, 0], ["*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0], I), N(1, "void*", I), R.Ha = N([98, 97, 100, 95, 97, 114, 114, 97, 121, 95, 110, 101, 119, 95, 108, 101, 110, 103, 116, 104, 0], "i8", I), R.Ba = N([83, 116, 57, 98, 97, 100, 95, 97, 108, 108, 111, 99, 0], "i8", I), Ge = N(12, "*", I), R.Aa = N([83, 116, 50, 48, 98, 97, 100, 95, 97, 114, 114, 97, 121, 95, 110, 101, 119, 95, 108, 101, 110, 103, 116, 104, 0], "i8", I), He = N(12, "*", I), A[be + 4 >> 2] = Ge, A[Ee + 4 >> 2] = He, Fe = N([2, 0, 0, 0, 0], ["i8*", 0, 0, 0, 0], I), A[Ge >> 2] = Fe + 8 | 0, A[Ge + 4 >> 2] = 0 | R.Ba, A[Ge + 8 >> 2] = aa, A[He >> 2] = Fe + 8 | 0, A[He + 4 >> 2] = 0 | R.Aa, A[He + 8 >> 2] = Ge, $b = [0, 0, function (r, e, i, a) { if (0 == (0 | r))
        r = Yb(e), 0 != (0 | i) && (A[i >> 2] = 0 == (0 | r) ? 0 : $d(r)), i = r;
    else if (0 == (0 | e))
        Xd(r), 0 != (0 | i) && (A[i >> 2] = 0), i = 0;
    else {
        var t = 0 == (0 | r) ? Yb(e) : Yd(r, e), n = 0 != (0 | t);
        n | 1 ^ a ? r = n ? t : r : 0 == (0 | (t = 0 == (0 | r) ? Yb(e) : Yd(r, e))) ? t = 0 : r = t, 0 != (0 | i) && (A[i >> 2] = $d(r)), i = t;
    } return i; }, 0, function (r) { return 0 == (0 | r) ? 0 : $d(r); }, 0, ce, 0, function (r) { ce(r), 0 != (0 | r) && Xd(r); }, 0, function () { return 0 | R.Ra; }, 0, function (r) { ce(0 | r), 0 != (0 | r) && Xd(r); }, 0, function () { return 0 | R.Ha; }, 0, $c, 0, function (r, e) { var i; if (A[r >> 2] = 0, ad(r + 4 | 0), A[r + 20 >> 2] = 0, (0 | r) != (0 | e)) {
        A[r >> 2] = A[e >> 2];
        var a, t = e + 4 | 0, n = (0 | (i = r + 4 | 0)) == (0 | t);
        do {
            if (!n) {
                if (a = (t + 4 | 0) >> 2, (0 | A[i + 8 >> 2]) == (0 | A[a]))
                    id(i, 0);
                else if (dd(i), !jd(i, A[a], 0))
                    break;
                hd(A[i >> 2], A[t >> 2], A[a]), A[i + 4 >> 2] = A[a];
            }
        } while (0);
        0 != (1 & z[i + 12 | 0]) << 24 >> 24 ? cd(r) : (t = A[e + 20 >> 2], a = A[i = (r + 20 | 0) >> 2], 0 == (0 | t) ? (bd(a), A[i] = 0) : 0 == (0 | a) ? (0 == (0 | (a = Mc(180, 0))) ? t = 0 : 0 == (0 | a) ? t = 0 : (A[a + 164 >> 2] = 0, A[a + 168 >> 2] = 0, A[a + 172 >> 2] = 0, A[a + 176 >> 2] = 0, gd(a, t), t = a), A[i] = t) : gd(a, t));
    } }, 0, ed, 0, fd, 0, ae, 0, function (r) { ae(0 | r), A[r >> 2] = Ee + 8 | 0; }, 0], Module.FUNCTION_TABLE = $b, Module.run = Ie, qc(rc), Module.noInitialRun && (zc++, Module.monitorRunDependencies && Module.monitorRunDependencies(zc)), 0 == zc && Ie();
//# sourceMappingURL=crn.js.map