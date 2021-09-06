import { NodeState } from "./NodeState";
import { NodeMetadata } from "../proto/rocktree";
import { NodeDecoder } from "./decoder/NodeDecoder";
import { NodeOBB } from "./decoder/NodeOBB";
import { TextureDecoder } from "./decoder/TextureDecoder";
import { octant_to_latlong } from "./decoder/LatLonBox";
var NodeHeader = /** @class */ (function () {
    function NodeHeader(parent_bulk, metadata) {
        var path_and_flags = NodeDecoder.unpackPathAndFlags(metadata.path_and_flags);
        this.path_and_flags = path_and_flags;
        this.parent_bulk = parent_bulk.head_node_key.path;
        this.path = parent_bulk.head_node_key.path + path_and_flags.path;
        this.flags = path_and_flags.flags;
        this.level = this.path.length;
        this.is_bulk = (this.level % 4 == 0) && (!(this.flags & 4));
        this.can_have_data = !(this.flags & NodeMetadata.Flags.NODATA.value);
        this.state = NodeState.PENDING;
        // Set meters per texel so it can be used for node validation
        this.meters_per_texel = metadata.meters_per_texel ? metadata.meters_per_texel : parent_bulk.meters_per_texel[path_and_flags.level - 1];
        this.texture_format = TextureDecoder.unpackTextureFormat(metadata.available_texture_formats, parent_bulk.default_available_texture_formats);
        this.imagery_epoch = TextureDecoder.unpackImageryEpoch(this.flags, metadata.imagery_epoch, parent_bulk.default_imagery_epoch);
        this.epoch = metadata.epoch ? metadata.epoch : parent_bulk.head_node_key.epoch;
        if (metadata.oriented_bounding_box) {
            this.obb = NodeOBB.unpackObb(metadata.oriented_bounding_box, parent_bulk.head_node_center, this.meters_per_texel);
            this.latLonBox = octant_to_latlong(this.path);
        }
    }
    return NodeHeader;
}());
export { NodeHeader };
//# sourceMappingURL=NodeHeader.js.map