import { NodeHeader } from "../node/NodeHeader";
import { IBulkMetadata, INodeKey, NodeMetadata } from "../proto/rocktree";

export class BulkData {
    public node_metadata: NodeHeader[];
    
    public bulks: Map<string, NodeHeader>;
    public nodes: Map<string, NodeHeader>;


    public head_node_key: INodeKey;
    public head_node_center: number[];
    public meters_per_texel: number[];
    public default_imagery_epoch: number;
    public default_available_texture_formats: number;
    public default_available_view_dependent_textures: number;
    public default_available_view_dependent_texture_formats: number;

    constructor(metadata: IBulkMetadata) {
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
}