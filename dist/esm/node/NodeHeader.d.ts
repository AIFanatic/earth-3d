import { NodeState } from "./NodeState";
import { IBulkMetadata, INodeMetadata } from "../proto/rocktree";
import { OBB } from "./decoder/NodeOBB";
import { LatLonBox } from "./decoder/LatLonBox";
export declare class NodeHeader {
    path: string;
    flags: number;
    level: number;
    is_bulk: boolean;
    obb: OBB;
    latLonBox: LatLonBox;
    can_have_data: boolean;
    parent_bulk: string;
    path_and_flags: any;
    meters_per_texel: number;
    texture_format: number;
    imagery_epoch: number;
    epoch: number;
    state: NodeState;
    constructor(parent_bulk: IBulkMetadata, metadata: INodeMetadata);
}
