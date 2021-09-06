import { NodeState } from "./NodeState";
import { IBulkMetadata, INodeMetadata, NodeMetadata } from "../proto/rocktree";
import { NodeDecoder } from "./decoder/NodeDecoder";
import { NodeOBB, OBB } from "./decoder/NodeOBB";
import { TextureDecoder } from "./decoder/TextureDecoder";
import { LatLonBox, octant_to_latlong } from "./decoder/LatLonBox";

export class NodeHeader {
    public path: string;
    public flags: number;
    public level: number;
    public is_bulk: boolean;
    public obb: OBB;
    public latLonBox: LatLonBox;
    public can_have_data: boolean;

    public parent_bulk: string;

    public path_and_flags: any;
    public meters_per_texel: number;
    
    public texture_format: number;
    public imagery_epoch: number;
    public epoch: number;

    public state: NodeState;

    constructor(parent_bulk: IBulkMetadata, metadata: INodeMetadata) {
        const path_and_flags = NodeDecoder.unpackPathAndFlags(metadata.path_and_flags);

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
}