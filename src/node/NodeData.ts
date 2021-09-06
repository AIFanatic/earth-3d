import { INodeData } from "../proto/rocktree";
import { DecodedNode, NodeDecoder } from "./decoder/NodeDecoder";
import { OBB } from "./decoder/NodeOBB";
import { NodeState } from "./NodeState";
import { NodeHeader } from "./NodeHeader";
import { LatLonBox } from "./decoder/LatLonBox";

export class NodeData {
    public path: string;
    public flags: number;
    public level: number;
    public is_bulk: boolean;
    public obb: OBB;
    public latLonBox: LatLonBox;
    public can_have_data: boolean;

    public parent_bulk: string;
    public data: DecodedNode;

    public path_and_flags: any;
    public meters_per_texel: number;

    public state: NodeState;

    constructor(nodeHeader: NodeHeader, nodeData: INodeData) {
        this.path_and_flags = nodeHeader.path_and_flags;
        this.parent_bulk = nodeHeader.parent_bulk;
        this.path = nodeHeader.path;
        this.flags = nodeHeader.flags;
        this.level = nodeHeader.level;
        this.is_bulk = nodeHeader.is_bulk;
        this.can_have_data = nodeHeader.can_have_data;

        this.state = nodeHeader.state;
        
        this.obb = nodeHeader.obb;
        this.latLonBox = nodeHeader.latLonBox;
        
        if (this.can_have_data) {
            try {
                this.data = NodeDecoder.Decode(nodeData);    
                this.state = NodeState.DECODED;
            } catch (error) {
                console.error(error, this.data, this.state);
                this.state = NodeState.FAILED;            
            }
        }
    }
}