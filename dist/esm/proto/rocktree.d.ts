import Pbf from 'pbf';
export interface IBulkMetadataRequest {
    node_key?: INodeKey;
}
export interface INodeDataRequest {
    node_key?: INodeKey;
    texture_format?: Texture_Format_Value;
    imagery_epoch?: number;
}
export interface INodeKey {
    path?: string;
    epoch?: number;
}
export interface ICopyrightRequest {
    epoch?: number;
}
export interface ITextureDataRequest {
    node_key?: INodeKey;
    texture_format?: Texture_Format_Value;
    view_direction?: Texture_ViewDirection_Value;
}
export interface IBulkMetadata {
    node_metadata?: INodeMetadata[];
    head_node_key?: INodeKey;
    head_node_center?: number[];
    meters_per_texel?: number[];
    default_imagery_epoch?: number;
    default_available_texture_formats?: number;
    default_available_view_dependent_textures?: number;
    default_available_view_dependent_texture_formats?: number;
}
export interface INodeMetadata {
    path_and_flags?: number;
    epoch?: number;
    bulk_metadata_epoch?: number;
    oriented_bounding_box?: Uint8Array;
    meters_per_texel?: number;
    processing_oriented_bounding_box?: number[];
    imagery_epoch?: number;
    available_texture_formats?: number;
    available_view_dependent_textures?: number;
    available_view_dependent_texture_formats?: number;
}
export declare type NodeMetadata_Flags_Key = "RICH3D_LEAF" | "RICH3D_NODATA" | "LEAF" | "NODATA" | "USE_IMAGERY_EPOCH";
export declare type NodeMetadata_Flags_Value = 1 | 2 | 4 | 8 | 16;
export interface INodeData {
    matrix_globe_from_mesh?: number[];
    meshes?: IMesh[];
    copyright_ids?: number[];
    node_key?: INodeKey;
    kml_bounding_box?: number[];
    water_mesh?: IMesh;
    overlay_surface_meshes?: IMesh[];
    for_normals?: Uint8Array;
}
export interface IMesh {
    vertices?: Uint8Array;
    vertex_alphas?: Uint8Array;
    texture_coords?: Uint8Array;
    indices?: Uint8Array;
    octant_ranges?: Uint8Array;
    layer_counts?: Uint8Array;
    texture?: ITexture[];
    texture_coordinates?: Uint8Array;
    uv_offset_and_scale?: number[];
    layer_and_octant_counts?: Uint8Array;
    normals?: Uint8Array;
    normals_dev?: Uint8Array;
    mesh_id?: number;
    skirt_flags?: Uint8Array;
}
export declare type Mesh_Layer_Key = "OVERGROUND" | "TERRAIN_BELOW_WATER" | "TERRAIN_ABOVE_WATER" | "TERRAIN_HIDDEN" | "WATER" | "WATER_SKIRTS" | "WATER_SKIRTS_INVERTED" | "OVERLAY_SURFACE" | "OVERLAY_SURFACE_SKIRTS" | "NUM_LAYERS";
export declare type Mesh_Layer_Value = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export declare type Mesh_LayerMask_Key = "TERRAIN_WITH_OVERGROUND" | "TERRAIN_WITH_WATER" | "TERRAIN_WITHOUT_WATER";
export declare type Mesh_LayerMask_Value = 7 | 28 | 14;
export interface ITexture {
    data?: Uint8Array[];
    format?: Texture_Format_Value;
    width?: number;
    height?: number;
    view_direction?: Texture_ViewDirection_Value;
    mesh_id?: number;
}
export declare type Texture_Format_Key = "JPG" | "DXT1" | "ETC1" | "PVRTC2" | "PVRTC4" | "CRN_DXT1";
export declare type Texture_Format_Value = 1 | 2 | 3 | 4 | 5 | 6;
export declare type Texture_ViewDirection_Key = "NADIR" | "NORTH_45" | "EAST_45" | "SOUTH_45" | "WEST_45";
export declare type Texture_ViewDirection_Value = 0 | 1 | 2 | 3 | 4;
export interface ITextureData {
    node_key?: INodeKey;
    textures?: ITexture[];
}
export interface ICopyrights {
    copyrights?: ICopyright[];
}
export interface ICopyright {
    id?: number;
    text?: string;
    text_clean?: string;
}
export interface IPlanetoidMetadata {
    root_node_metadata?: INodeMetadata;
    radius?: number;
    min_terrain_altitude?: number;
    max_terrain_altitude?: number;
}
export declare const BulkMetadataRequest: {
    read(pbf: Pbf, end?: number): IBulkMetadataRequest;
    _readField(tag: number, obj: any, pbf: Pbf): void;
    write(obj: IBulkMetadataRequest, pbf: Pbf): void;
};
export declare const NodeDataRequest: {
    read(pbf: Pbf, end?: number): INodeDataRequest;
    _readField(tag: number, obj: any, pbf: Pbf): void;
    write(obj: INodeDataRequest, pbf: Pbf): void;
};
export declare const NodeKey: {
    read(pbf: Pbf, end?: number): INodeKey;
    _readField(tag: number, obj: any, pbf: Pbf): void;
    write(obj: INodeKey, pbf: Pbf): void;
};
export declare const CopyrightRequest: {
    read(pbf: Pbf, end?: number): ICopyrightRequest;
    _readField(tag: number, obj: any, pbf: Pbf): void;
    write(obj: ICopyrightRequest, pbf: Pbf): void;
};
export declare const TextureDataRequest: {
    read(pbf: Pbf, end?: number): ITextureDataRequest;
    _readField(tag: number, obj: any, pbf: Pbf): void;
    write(obj: ITextureDataRequest, pbf: Pbf): void;
};
export declare const BulkMetadata: {
    read(pbf: Pbf, end?: number): IBulkMetadata;
    _readField(tag: number, obj: any, pbf: Pbf): void;
    write(obj: IBulkMetadata, pbf: Pbf): void;
};
export declare const NodeMetadata: {
    read(pbf: Pbf, end?: number): INodeMetadata;
    _readField(tag: number, obj: any, pbf: Pbf): void;
    write(obj: INodeMetadata, pbf: Pbf): void;
    Flags: {
        RICH3D_LEAF: {
            value: NodeMetadata_Flags_Value;
            options: any;
        };
        RICH3D_NODATA: {
            value: NodeMetadata_Flags_Value;
            options: any;
        };
        LEAF: {
            value: NodeMetadata_Flags_Value;
            options: any;
        };
        NODATA: {
            value: NodeMetadata_Flags_Value;
            options: any;
        };
        USE_IMAGERY_EPOCH: {
            value: NodeMetadata_Flags_Value;
            options: any;
        };
    };
};
export declare const NodeData: {
    read(pbf: Pbf, end?: number): INodeData;
    _readField(tag: number, obj: any, pbf: Pbf): void;
    write(obj: INodeData, pbf: Pbf): void;
};
export declare const Mesh: {
    read(pbf: Pbf, end?: number): IMesh;
    _readField(tag: number, obj: any, pbf: Pbf): void;
    write(obj: IMesh, pbf: Pbf): void;
    Layer: {
        OVERGROUND: {
            value: Mesh_Layer_Value;
            options: any;
        };
        TERRAIN_BELOW_WATER: {
            value: Mesh_Layer_Value;
            options: any;
        };
        TERRAIN_ABOVE_WATER: {
            value: Mesh_Layer_Value;
            options: any;
        };
        TERRAIN_HIDDEN: {
            value: Mesh_Layer_Value;
            options: any;
        };
        WATER: {
            value: Mesh_Layer_Value;
            options: any;
        };
        WATER_SKIRTS: {
            value: Mesh_Layer_Value;
            options: any;
        };
        WATER_SKIRTS_INVERTED: {
            value: Mesh_Layer_Value;
            options: any;
        };
        OVERLAY_SURFACE: {
            value: Mesh_Layer_Value;
            options: any;
        };
        OVERLAY_SURFACE_SKIRTS: {
            value: Mesh_Layer_Value;
            options: any;
        };
        NUM_LAYERS: {
            value: Mesh_Layer_Value;
            options: any;
        };
    };
    LayerMask: {
        TERRAIN_WITH_OVERGROUND: {
            value: Mesh_LayerMask_Value;
            options: any;
        };
        TERRAIN_WITH_WATER: {
            value: Mesh_LayerMask_Value;
            options: any;
        };
        TERRAIN_WITHOUT_WATER: {
            value: Mesh_LayerMask_Value;
            options: any;
        };
    };
};
export declare const Texture: {
    read(pbf: Pbf, end?: number): ITexture;
    _readField(tag: number, obj: any, pbf: Pbf): void;
    write(obj: ITexture, pbf: Pbf): void;
    Format: {
        JPG: {
            value: Texture_Format_Value;
            options: any;
        };
        DXT1: {
            value: Texture_Format_Value;
            options: any;
        };
        ETC1: {
            value: Texture_Format_Value;
            options: any;
        };
        PVRTC2: {
            value: Texture_Format_Value;
            options: any;
        };
        PVRTC4: {
            value: Texture_Format_Value;
            options: any;
        };
        CRN_DXT1: {
            value: Texture_Format_Value;
            options: any;
        };
    };
    ViewDirection: {
        NADIR: {
            value: Texture_ViewDirection_Value;
            options: any;
        };
        NORTH_45: {
            value: Texture_ViewDirection_Value;
            options: any;
        };
        EAST_45: {
            value: Texture_ViewDirection_Value;
            options: any;
        };
        SOUTH_45: {
            value: Texture_ViewDirection_Value;
            options: any;
        };
        WEST_45: {
            value: Texture_ViewDirection_Value;
            options: any;
        };
    };
};
export declare const TextureData: {
    read(pbf: Pbf, end?: number): ITextureData;
    _readField(tag: number, obj: any, pbf: Pbf): void;
    write(obj: ITextureData, pbf: Pbf): void;
};
export declare const Copyrights: {
    read(pbf: Pbf, end?: number): ICopyrights;
    _readField(tag: number, obj: any, pbf: Pbf): void;
    write(obj: ICopyrights, pbf: Pbf): void;
};
export declare const Copyright: {
    read(pbf: Pbf, end?: number): ICopyright;
    _readField(tag: number, obj: any, pbf: Pbf): void;
    write(obj: ICopyright, pbf: Pbf): void;
};
export declare const PlanetoidMetadata: {
    read(pbf: Pbf, end?: number): IPlanetoidMetadata;
    _readField(tag: number, obj: any, pbf: Pbf): void;
    write(obj: IPlanetoidMetadata, pbf: Pbf): void;
};
