import { NodeHeader } from "../node/NodeHeader";
import { IBulkMetadata, INodeKey } from "../proto/rocktree";
export declare class BulkData {
    node_metadata: NodeHeader[];
    bulks: Map<string, NodeHeader>;
    nodes: Map<string, NodeHeader>;
    head_node_key: INodeKey;
    head_node_center: number[];
    meters_per_texel: number[];
    default_imagery_epoch: number;
    default_available_texture_formats: number;
    default_available_view_dependent_textures: number;
    default_available_view_dependent_texture_formats: number;
    constructor(metadata: IBulkMetadata);
}
