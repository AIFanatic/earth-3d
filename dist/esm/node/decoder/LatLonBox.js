var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
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
var octant_dict = {
    '0': [0, 0, 0],
    '1': [1, 0, 0],
    '2': [0, 1, 0],
    '3': [1, 1, 0],
    '4': [0, 0, 1],
    '5': [1, 0, 1],
    '6': [0, 1, 1],
    '7': [1, 1, 1],
};
var LatLonBox = /** @class */ (function () {
    function LatLonBox(n, s, w, e) {
        this.n = n;
        this.s = s;
        this.w = w;
        this.e = e;
    }
    LatLonBox.prototype.mid_point = function () {
        return {
            lat: (this.n + this.s) / 2,
            lon: (this.w + this.e) / 2
        };
    };
    LatLonBox.prototype.get_child = function (octant) {
        var _a;
        var oct_x, oct_y, oct_z;
        try {
            _a = __read(octant_dict[octant], 3), oct_x = _a[0], oct_y = _a[1], oct_z = _a[2];
        }
        catch (error) {
            throw Error("Invalid octant value");
        }
        var n = this.n;
        var s = this.s;
        var w = this.w;
        var e = this.e;
        if (oct_y == 0) {
            n = this.mid_point().lat;
        }
        else if (oct_y == 1) {
            s = this.mid_point().lat;
        }
        else {
            throw Error("Invalid y (north or south");
        }
        if (n == 90 || s == -90) {
            return new LatLonBox(n, s, w, e);
        }
        if (oct_x == 0) {
            e = this.mid_point().lon;
        }
        else if (oct_x == 1) {
            w = this.mid_point().lon;
        }
        else {
            throw Error("Invalid x (east or west");
        }
        return new LatLonBox(n, s, w, e);
    };
    LatLonBox.is_overlapping = function (box1, box2) {
        var n = Math.min(box1.n, box2.n);
        var s = Math.max(box1.s, box2.s);
        var w = Math.max(box1.w, box2.w);
        var e = Math.min(box1.e, box2.e);
        return (n >= s) && (w <= e);
    };
    return LatLonBox;
}());
export { LatLonBox };
var first_latlonbox_dict = {
    '': new LatLonBox(90, -90, -180, 180),
    '0': new LatLonBox(0, -90, -180, 0),
    '1': new LatLonBox(0, -90, 0, 180),
    '2': new LatLonBox(90, 0, -180, 0),
    '3': new LatLonBox(90, 0, 0, 180),
    '02': new LatLonBox(0, -90, -180, -90),
    '03': new LatLonBox(0, -90, -90, 0),
    '12': new LatLonBox(0, -90, 0, 90),
    '13': new LatLonBox(0, -90, 90, 180),
    '20': new LatLonBox(90, 0, -180, -90),
    '21': new LatLonBox(90, 0, -90, 0),
    '30': new LatLonBox(90, 0, 0, 90),
    '31': new LatLonBox(90, 0, 90, 180),
};
export function octant_to_latlong(octant_string) {
    var e_1, _a;
    var latlonbox = first_latlonbox_dict[octant_string.substr(0, 2)];
    try {
        for (var _b = __values(octant_string.substr(2, octant_string.length)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var octant = _c.value;
            latlonbox = latlonbox.get_child(octant);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return latlonbox;
}
//# sourceMappingURL=LatLonBox.js.map