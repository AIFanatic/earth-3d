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
import { Resources } from "./Resources";
var NodeManagerOptionsDefault = {
    url: "https://kh.google.com/rt/earth/",
    nodeValidationHandler: function (node) { return false; },
    workerCount: 8,
    workerPath: "./ResourcesWorker.js"
};
var NodeManager = /** @class */ (function () {
    function NodeManager(options) {
        var _this = this;
        this.octants = ["0", "1", "2", "3", "4", "5", "6", "7"];
        this.options = Object.assign({}, NodeManagerOptionsDefault, options);
        this.resourceManager = new Resources(this.options.url, this.options.workerPath, this.options.workerCount);
        this.resourceManager.request_planetoid_metadata()
            .then(function (planetoid_metadata) {
            _this.planetoid = planetoid_metadata;
            _this.epoch = _this.options.rootEpoch ? _this.options.rootEpoch : planetoid_metadata.root_node_metadata.epoch;
            _this.resourceManager.request_bulk_data("", _this.epoch)
                .then(function (bulk) {
                _this.root_bulk = bulk;
            });
        });
    }
    NodeManager.prototype.get_nodes = function () {
        var e_1, _a, e_2, _b;
        var potential_bulks = new Map();
        var potential_nodes = new Map();
        if (!this.root_bulk)
            return potential_nodes;
        if (this.options.workerCount > 0 && !this.resourceManager.initializedWorker)
            return potential_nodes;
        var next_valid = new Map();
        next_valid.set("", this.root_bulk);
        while (next_valid.size != 0) {
            try {
                for (var next_valid_1 = (e_1 = void 0, __values(next_valid)), next_valid_1_1 = next_valid_1.next(); !next_valid_1_1.done; next_valid_1_1 = next_valid_1.next()) {
                    var current_bulk_map = next_valid_1_1.value;
                    var current_bulk_path = current_bulk_map[0];
                    var current_bulk = current_bulk_map[1];
                    next_valid.delete(current_bulk_path);
                    if (current_bulk_path.length > 0 && current_bulk_path.length % 4 == 0) {
                        var potential_bulk_header = current_bulk.bulks.get(current_bulk_path);
                        if (!potential_bulk_header)
                            continue;
                        var cachedBulk = this.resourceManager.get_or_fetch_cached_bulk(potential_bulk_header.path, this.epoch);
                        if (!cachedBulk)
                            continue;
                        current_bulk = cachedBulk;
                    }
                    potential_bulks.set(current_bulk_path, current_bulk);
                    try {
                        for (var _c = (e_2 = void 0, __values(this.octants)), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var o = _d.value;
                            var next_bulk_path = current_bulk_path + o;
                            var node = current_bulk.nodes.get(next_bulk_path);
                            if (!node)
                                continue;
                            if (!this.options.nodeValidationHandler(node)) {
                                continue;
                            }
                            next_valid.set(next_bulk_path, current_bulk);
                            if (!node.can_have_data)
                                continue;
                            var cachedNode = this.resourceManager.get_or_fetch_cached_node(node);
                            if (!cachedNode)
                                continue;
                            potential_nodes.set(node.path, cachedNode);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (next_valid_1_1 && !next_valid_1_1.done && (_a = next_valid_1.return)) _a.call(next_valid_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return potential_nodes;
    };
    NodeManager.prototype.getMasksForNodes = function (nodes) {
        var e_3, _a;
        var mask_map = new Map();
        try {
            for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                var node_map = nodes_1_1.value;
                var path = node_map[0];
                var level = path.length;
                var octant = parseInt(path[level - 1]);
                var prev = path.substr(0, level - 1);
                mask_map.set(prev, mask_map[prev] |= 1 << octant);
                if (mask_map[path] === undefined)
                    mask_map.set(path, 0);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return mask_map;
    };
    return NodeManager;
}());
export { NodeManager };
//# sourceMappingURL=NodeManager.js.map