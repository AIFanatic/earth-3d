var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Pbf from "pbf";
import { BulkMetadata, PlanetoidMetadata, NodeData as ProtoNodeData } from "../proto/rocktree";
import { GetURL } from "../utils/GetURL";
import { LRUMap } from 'lru_map';
import { BulkData } from "../bulk/BulkData";
import { NodeData } from "../node/NodeData";
import { Pool, spawn, Worker } from "threads";
var ResourceState;
(function (ResourceState) {
    ResourceState[ResourceState["PENDING"] = 0] = "PENDING";
    ResourceState[ResourceState["SUCCESS"] = 1] = "SUCCESS";
    ResourceState[ResourceState["FAILED"] = 2] = "FAILED";
})(ResourceState || (ResourceState = {}));
var Resources = /** @class */ (function () {
    function Resources(urlPrefix, workerPath, workerCount) {
        var _this = this;
        this.urlPrefix = urlPrefix;
        this.workerCount = workerCount;
        this.bulkCache = new LRUMap(200);
        this.nodeCache = new LRUMap(500);
        if (this.workerCount > 0) {
            var w = new Worker(workerPath);
            var workerResourceManager_1 = spawn(w);
            workerResourceManager_1.then(function (worker) {
                worker.init(_this.urlPrefix)
                    .then(function () {
                    _this.workerResourceManager = Pool(function () { return workerResourceManager_1; }, _this.workerCount);
                    _this.initializedWorker = true;
                });
            });
        }
    }
    Resources.prototype.request_planetoid_metadata = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = this.urlPrefix + "PlanetoidMetadata";
                return [2 /*return*/, GetURL(url)
                        .then(function (buffer) {
                        var protodata = new Uint8Array(buffer);
                        var pbf = new Pbf(protodata);
                        var metadata = PlanetoidMetadata.read(pbf);
                        return metadata;
                    })
                        .catch(function (error) {
                        return null;
                    })];
            });
        });
    };
    Resources.prototype.request_bulk_data = function (path, epoch) {
        var url = this.urlPrefix + ("BulkMetadata/pb=!1m2!1s" + path + "!2u" + epoch);
        return GetURL(url)
            .then(function (buffer) {
            var protodata = new Uint8Array(buffer);
            var pbf = new Pbf(protodata);
            var metadata = BulkMetadata.read(pbf);
            var bulk = new BulkData(metadata);
            return bulk;
        })
            .catch(function (error) {
            return null;
        });
    };
    Resources.prototype.request_node_data = function (node_header) {
        var url = this.urlPrefix + ("NodeData/pb=!1m2!1s" + node_header.path + "!2u" + node_header.epoch + "!2e" + node_header.texture_format + "!4b0");
        if (node_header.imagery_epoch != 0) {
            url = this.urlPrefix + ("NodeData/pb=!1m2!1s" + node_header.path + "!2u" + node_header.epoch + "!2e" + node_header.texture_format + "!3u" + node_header.imagery_epoch + "!4b0");
        }
        return GetURL(url)
            .then(function (buffer) {
            var protodata = new Uint8Array(buffer);
            var pbf = new Pbf(protodata);
            var metadata = ProtoNodeData.read(pbf);
            var node = new NodeData(node_header, metadata);
            return node;
        })
            .catch(function (error) {
            return null;
        });
    };
    Resources.prototype.fetch_bulk = function (path, epoch) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.workerCount > 0) {
                    return [2 /*return*/, this.workerResourceManager.queue(function (workerResources) {
                            return workerResources.request_bulk_data(path, epoch);
                        })];
                }
                else {
                    return [2 /*return*/, this.request_bulk_data(path, epoch)];
                }
                return [2 /*return*/];
            });
        });
    };
    Resources.prototype.get_or_fetch_cached_bulk = function (path, epoch) {
        var _this = this;
        var cachedBulk = this.bulkCache.get(path);
        if (!cachedBulk) {
            this.bulkCache.set(path, { status: ResourceState.PENDING, data: null });
            this.fetch_bulk(path, epoch)
                .then(function (bulk) {
                if (bulk !== null) {
                    _this.bulkCache.set(path, { status: ResourceState.SUCCESS, data: bulk });
                }
                else {
                    _this.bulkCache.set(path, { status: ResourceState.FAILED, data: null });
                }
            });
            return false;
        }
        if (cachedBulk.status == ResourceState.SUCCESS)
            return cachedBulk.data;
        return false;
    };
    Resources.prototype.fetch_node = function (nodeHeader) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.workerCount > 0) {
                    return [2 /*return*/, this.workerResourceManager.queue(function (workerResources) {
                            return workerResources.request_node_data(nodeHeader);
                        })];
                }
                else {
                    return [2 /*return*/, this.request_node_data(nodeHeader)];
                }
                return [2 /*return*/];
            });
        });
    };
    Resources.prototype.get_or_fetch_cached_node = function (nodeHeader) {
        var _this = this;
        var cachedNode = this.nodeCache.get(nodeHeader.path);
        if (!cachedNode) {
            this.nodeCache.set(nodeHeader.path, { status: ResourceState.PENDING, data: null });
            this.fetch_node(nodeHeader)
                .then(function (node) {
                if (node !== null) {
                    _this.nodeCache.set(nodeHeader.path, { status: ResourceState.SUCCESS, data: node });
                }
                else {
                    _this.nodeCache.set(nodeHeader.path, { status: ResourceState.FAILED, data: null });
                }
            });
            return false;
        }
        if (cachedNode.status == ResourceState.SUCCESS)
            return cachedNode.data;
        return false;
    };
    return Resources;
}());
export { Resources };
//# sourceMappingURL=Resources.js.map