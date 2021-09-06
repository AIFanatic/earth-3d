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
import { NodeHeader } from "../node/NodeHeader";
import { NodeMetadata } from "../proto/rocktree";
var BulkData = /** @class */ (function () {
    function BulkData(metadata) {
        var e_1, _a;
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
        try {
            for (var _b = __values(metadata.node_metadata), _c = _b.next(); !_c.done; _c = _b.next()) {
                var nodeMetadata = _c.value;
                var nodeHeader = new NodeHeader(metadata, nodeMetadata);
                this.node_metadata.push(nodeHeader);
                if (nodeHeader.is_bulk) {
                    this.bulks.set(nodeHeader.path, nodeHeader);
                }
                if ((nodeHeader.can_have_data || !(nodeHeader.flags & NodeMetadata.Flags.LEAF.value)) && nodeHeader.obb) {
                    this.nodes.set(nodeHeader.path, nodeHeader);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return BulkData;
}());
export { BulkData };
//# sourceMappingURL=BulkData.js.map