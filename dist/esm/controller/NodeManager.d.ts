import { NodeData } from "../node/NodeData";
import { NodeHeader } from "../node/NodeHeader";
/**
 * Node Manager options
 *
 * @property nodeValidationHandler: {function} Function responsible for the validation of new potential nodes.
 * @property rootEpoch: {number} Set the epoch used when querying nodes.
 */
export interface NodeManagerOptions {
    /** url: URL used to get data from. */
    url?: string;
    /** nodeValidationHandler: Function responsible for the validation of new potential nodes. */
    nodeValidationHandler?: (node: NodeHeader) => boolean;
    /** rootEpoch: Set the epoch used when querying nodes. If not set the latest epoch from planetoid will be used. */
    rootEpoch?: number;
    /** workerCount: Number of web workers to use. If zero no web workers will be used. */
    workerCount?: number;
    /** workerPath: Location of the web worker file. */
    workerPath?: string;
}
export declare class NodeManager {
    private planetoid;
    private root_bulk;
    private options;
    private resourceManager;
    private epoch;
    private octants;
    constructor(options?: NodeManagerOptions);
    get_nodes(): Map<string, NodeData>;
    getMasksForNodes(nodes: Map<string, NodeData>): Map<string, number>;
}
