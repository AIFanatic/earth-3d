import { INodeData } from "../proto/rocktree";
import { DecodedNode } from "./decoder/NodeDecoder";
import { OBB } from "./decoder/NodeOBB";
import { NodeState } from "./NodeState";
import { NodeHeader } from "./NodeHeader";
import { LatLonBox } from "./decoder/LatLonBox";
export declare class NodeData {
    path: string;
    flags: number;
    level: number;
    is_bulk: boolean;
    obb: OBB;
    latLonBox: LatLonBox;
    can_have_data: boolean;
    parent_bulk: string;
    data: DecodedNode;
    path_and_flags: any;
    meters_per_texel: number;
    state: NodeState;
    constructor(nodeHeader: NodeHeader, nodeData: INodeData);
}
