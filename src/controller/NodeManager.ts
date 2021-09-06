import { NodeData } from "../node/NodeData";
import { IPlanetoidMetadata } from "../proto/rocktree";
import { Resources } from "./Resources";

import { NodeHeader } from "../node/NodeHeader";
import { BulkData } from "../bulk/BulkData";

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

const NodeManagerOptionsDefault: NodeManagerOptions = {
    url: "https://kh.google.com/rt/earth/",
    nodeValidationHandler: (node: NodeHeader): boolean => {return false},
    workerCount: 8,
    workerPath: "./ResourcesWorker.js"
}

export class NodeManager {

    private planetoid: IPlanetoidMetadata;
    private root_bulk: BulkData;

    private options: NodeManagerOptions;

    private resourceManager: Resources;
    private epoch: number;

    private octants = ["0", "1", "2", "3", "4", "5", "6", "7"];

    constructor(options?: NodeManagerOptions) {
        this.options = Object.assign({}, NodeManagerOptionsDefault, options);
        
        this.resourceManager = new Resources(this.options.url, this.options.workerPath, this.options.workerCount);

        this.resourceManager.request_planetoid_metadata()
        .then((planetoid_metadata) => {
            this.planetoid = planetoid_metadata;
            this.epoch = this.options.rootEpoch ? this.options.rootEpoch : planetoid_metadata.root_node_metadata.epoch;
            
            this.resourceManager.request_bulk_data("", this.epoch)
            .then(bulk => {
                this.root_bulk = bulk;
            })
        })
    }

    public get_nodes() {
        let potential_bulks = new Map<string, BulkData>();
        let potential_nodes = new Map<string, NodeData>();
        
        if (!this.root_bulk) return potential_nodes;
        if (this.options.workerCount > 0 && !this.resourceManager.initializedWorker) return potential_nodes;

        let next_valid = new Map<string, BulkData>();
        next_valid.set("", this.root_bulk);

        while (next_valid.size != 0) {

            for(const current_bulk_map of next_valid) {
                const current_bulk_path = current_bulk_map[0];
                let current_bulk = current_bulk_map[1];
                next_valid.delete(current_bulk_path)

                if (current_bulk_path.length > 0 && current_bulk_path.length % 4 == 0) {
                    let potential_bulk_header = current_bulk.bulks.get(current_bulk_path);
                    
                    if (!potential_bulk_header) continue;
                    
                    const cachedBulk = this.resourceManager.get_or_fetch_cached_bulk(potential_bulk_header.path, this.epoch);
                    if (!cachedBulk) continue

                    current_bulk = cachedBulk;
                }

                potential_bulks.set(current_bulk_path, current_bulk);
                
                for (let o of this.octants) {
                    const next_bulk_path = current_bulk_path + o;
                    const node = current_bulk.nodes.get(next_bulk_path);

                    if (!node) continue;

                    if (!this.options.nodeValidationHandler(node)) {
                        continue;
                    }

                    next_valid.set(next_bulk_path, current_bulk);

                    if (!node.can_have_data) continue;

                    const cachedNode = this.resourceManager.get_or_fetch_cached_node(node);
                    if (!cachedNode) continue

                    potential_nodes.set(node.path, cachedNode);

                }
            }
        }

        return potential_nodes
    }

    public getMasksForNodes (nodes: Map<string, NodeData>): Map<string, number> {
        let mask_map = new Map<string, number>();

        for (let node_map of nodes) {
            const path =  node_map[0];
            const level = path.length;
            const octant: number = parseInt(path[level - 1]);
            let prev = path.substr(0, level - 1);
        
            mask_map.set(prev, mask_map[prev] |= 1 << octant);
            if (mask_map[path]===undefined) mask_map.set(path, 0);
        }

        return mask_map;
    }
}