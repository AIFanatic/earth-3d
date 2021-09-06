import { NodeDecoder } from "./decoder/NodeDecoder";
import { NodeState } from "./NodeState";
var NodeData = /** @class */ (function () {
    function NodeData(nodeHeader, nodeData) {
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
            }
            catch (error) {
                console.error(error, this.data, this.state);
                this.state = NodeState.FAILED;
            }
        }
    }
    return NodeData;
}());
export { NodeData };
//# sourceMappingURL=NodeData.js.map