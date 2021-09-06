import { expose, Transfer } from "threads/worker"

import Pbf from "pbf";
import { BulkMetadata, IPlanetoidMetadata, NodeData as ProtoNodeData, PlanetoidMetadata } from "../proto/rocktree";
import { GetURL } from "../utils/GetURL";
import { BulkData } from "../bulk/BulkData";
import { NodeData } from "../node/NodeData";
import { NodeHeader } from "../node/NodeHeader";

export class ResourcesWorker {
    private urlPrefix: string;

    constructor(urlPrefix: string) {
        this.urlPrefix = urlPrefix;
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


    public async request_bulk_data(path: string, epoch: number): Promise<BulkData> {
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

    public async request_node_data(node_header: NodeHeader): Promise<NodeData> {
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
}

let resources: ResourcesWorker;

const resourceManager = {
    init(urlPrefix: string) {
        resources = new ResourcesWorker(urlPrefix);
    },
    request_planetoid_metadata(): Promise<IPlanetoidMetadata | null> {
        return resources.request_planetoid_metadata();
    },
    request_bulk_data(path: string, epoch: number): Promise<BulkData> {
        return resources.request_bulk_data(path, epoch);
    },
    request_node_data(node_header: NodeHeader) {
        return resources.request_node_data(node_header)
        .then(nodeData => {
            if (nodeData === null) {
                return null;
            }
            
            let transferables = [];

            for (let i = 0; i < nodeData.data.meshes.length; i++) {
                transferables.push(
                    nodeData.data.meshes[i].indices.buffer,
                    nodeData.data.meshes[i].octants.buffer,
                    nodeData.data.meshes[i].vertices.buffer,
                    nodeData.data.meshes[i].vertices_uvs.buffer,
                    nodeData.data.meshes[i].texture[0].data[0].buffer,
                )
            }
            // const t = Transfer(nodeData, transferables);
            // console.log(nodeData)
            // return t;
            // 16% transfer speed increase
            return Transfer(nodeData, transferables);
        })
        // return resources.request_node_data(node_header);
    }
}

export type WorkerResources = typeof resourceManager

expose(resourceManager)