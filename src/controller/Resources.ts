import Pbf from "pbf";
import { BulkMetadata, IPlanetoidMetadata, PlanetoidMetadata, NodeData as ProtoNodeData } from "../proto/rocktree";
import { GetURL } from "../utils/GetURL";
import { LRUMap } from 'lru_map';
import { BulkData } from "../bulk/BulkData";
import { NodeData } from "../node/NodeData";
import { NodeHeader } from "../node/NodeHeader";
import { ModuleThread, Pool, spawn, Worker } from "threads";
import { WorkerResources } from "./ResourcesWorker";

enum ResourceState {
    PENDING,
    SUCCESS,
    FAILED
}
interface ResourceRequest {
    status: ResourceState;
    data: BulkData | NodeData
}

export class Resources {
    private urlPrefix: string;

    public bulkCache: LRUMap<string, ResourceRequest>;
    public nodeCache: LRUMap<string, ResourceRequest>;

    private workerCount: number;

    private workerResourceManager: Pool<ModuleThread<WorkerResources>>;
    public initializedWorker: boolean;

    constructor(urlPrefix: string, workerPath: string, workerCount: number) {
        this.urlPrefix = urlPrefix;
        this.workerCount = workerCount;

        this.bulkCache = new LRUMap(200);
        this.nodeCache = new LRUMap(500);

        if (this.workerCount > 0) {
            const w = new Worker(workerPath);
            const workerResourceManager = spawn<WorkerResources>(w);
            workerResourceManager.then(worker => {
                worker.init(this.urlPrefix)
                .then(() => {
                    this.workerResourceManager = Pool(() => workerResourceManager, this.workerCount);
                    this.initializedWorker = true;
                })
            })
        }
    }

    public async request_planetoid_metadata(): Promise<IPlanetoidMetadata | null> {
        const url = this.urlPrefix + "PlanetoidMetadata"
    
        return GetURL(url)
        .then(buffer => {
            const protodata = new Uint8Array(buffer);
        
            const pbf = new Pbf(protodata);
            const metadata = PlanetoidMetadata.read(pbf);
            return metadata;
        })
        .catch(error => {
            return null;
        })
    }


    public request_bulk_data(path: string, epoch: number): Promise<BulkData> {
        const url = this.urlPrefix + `BulkMetadata/pb=!1m2!1s${path}!2u${epoch}`

        return GetURL(url)
        .then(buffer => {
            const protodata = new Uint8Array(buffer);
        
            const pbf = new Pbf(protodata);
            const metadata = BulkMetadata.read(pbf);
            const bulk = new BulkData(metadata);
            return bulk;
        })
        .catch(error => {
            return null;
        })
    }

    public request_node_data(node_header: NodeHeader): Promise<NodeData> {
        let url = this.urlPrefix + `NodeData/pb=!1m2!1s${node_header.path}!2u${node_header.epoch}!2e${node_header.texture_format}!4b0`;

        if (node_header.imagery_epoch != 0) {
            url = this.urlPrefix + `NodeData/pb=!1m2!1s${node_header.path}!2u${node_header.epoch}!2e${node_header.texture_format}!3u${node_header.imagery_epoch}!4b0`;
        }

        return GetURL(url)
        .then(buffer => {
            const protodata = new Uint8Array(buffer);
        
            const pbf = new Pbf(protodata);
            const metadata = ProtoNodeData.read(pbf);
            const node = new NodeData(node_header, metadata);
            return node;
        })
        .catch(error => {
            return null;
        })
    }

    public async fetch_bulk(path: string, epoch: number): Promise<BulkData> {
        if (this.workerCount > 0) {
            return this.workerResourceManager.queue(workerResources => {
                return workerResources.request_bulk_data(path, epoch)
            })
        }
        else {
            return this.request_bulk_data(path, epoch);
        }
    }

    public get_or_fetch_cached_bulk(path: string, epoch: number): BulkData | false {
        const cachedBulk = this.bulkCache.get(path);

        if (!cachedBulk) {
            this.bulkCache.set(path, {status: ResourceState.PENDING, data: null});

            this.fetch_bulk(path, epoch)
            .then(bulk => {
                if (bulk !== null) {
                    this.bulkCache.set(path, {status: ResourceState.SUCCESS, data: bulk});
                }
                else {
                    this.bulkCache.set(path, {status: ResourceState.FAILED, data: null});
                }
            })
            return false;
        }

        if (cachedBulk.status == ResourceState.SUCCESS) return cachedBulk.data as BulkData;

        return false;
    }

    public async fetch_node(nodeHeader: NodeHeader): Promise<NodeData> {
        if (this.workerCount > 0) {
            return this.workerResourceManager.queue(workerResources => {
                return workerResources.request_node_data(nodeHeader);
            })
        }
        else {
            return this.request_node_data(nodeHeader);
        }
    }

    public get_or_fetch_cached_node(nodeHeader: NodeHeader): NodeData | false {
        const cachedNode = this.nodeCache.get(nodeHeader.path);

        if (!cachedNode) {
            this.nodeCache.set(nodeHeader.path, {status: ResourceState.PENDING, data: null});

            this.fetch_node(nodeHeader)
            .then(node => {
                if (node !== null) {
                    this.nodeCache.set(nodeHeader.path, {status: ResourceState.SUCCESS, data: node});
                }
                else {
                    this.nodeCache.set(nodeHeader.path, {status: ResourceState.FAILED, data: null});
                }
            })
            return false;
        }

        if (cachedNode.status == ResourceState.SUCCESS) return cachedNode.data as NodeData;

        return false;
    }
}