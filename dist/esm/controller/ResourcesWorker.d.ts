import { IPlanetoidMetadata } from "../proto/rocktree";
import { BulkData } from "../bulk/BulkData";
import { NodeData } from "../node/NodeData";
import { NodeHeader } from "../node/NodeHeader";
export declare class ResourcesWorker {
    private urlPrefix;
    constructor(urlPrefix: string);
    request_planetoid_metadata(): Promise<IPlanetoidMetadata | null>;
    request_bulk_data(path: string, epoch: number): Promise<BulkData>;
    request_node_data(node_header: NodeHeader): Promise<NodeData>;
}
declare const resourceManager: {
    init(urlPrefix: string): void;
    request_planetoid_metadata(): Promise<IPlanetoidMetadata | null>;
    request_bulk_data(path: string, epoch: number): Promise<BulkData>;
    request_node_data(node_header: NodeHeader): Promise<import("threads").TransferDescriptor<any>>;
};
export declare type WorkerResources = typeof resourceManager;
export {};
