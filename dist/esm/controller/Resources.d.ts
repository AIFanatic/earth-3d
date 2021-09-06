import { IPlanetoidMetadata } from "../proto/rocktree";
import { LRUMap } from 'lru_map';
import { BulkData } from "../bulk/BulkData";
import { NodeData } from "../node/NodeData";
import { NodeHeader } from "../node/NodeHeader";
declare enum ResourceState {
    PENDING = 0,
    SUCCESS = 1,
    FAILED = 2
}
interface ResourceRequest {
    status: ResourceState;
    data: BulkData | NodeData;
}
export declare class Resources {
    private urlPrefix;
    bulkCache: LRUMap<string, ResourceRequest>;
    nodeCache: LRUMap<string, ResourceRequest>;
    private workerCount;
    private workerResourceManager;
    initializedWorker: boolean;
    constructor(urlPrefix: string, workerPath: string, workerCount: number);
    request_planetoid_metadata(): Promise<IPlanetoidMetadata | null>;
    request_bulk_data(path: string, epoch: number): Promise<BulkData>;
    request_node_data(node_header: NodeHeader): Promise<NodeData>;
    fetch_bulk(path: string, epoch: number): Promise<BulkData>;
    get_or_fetch_cached_bulk(path: string, epoch: number): BulkData | false;
    fetch_node(nodeHeader: NodeHeader): Promise<NodeData>;
    get_or_fetch_cached_node(nodeHeader: NodeHeader): NodeData | false;
}
export {};
