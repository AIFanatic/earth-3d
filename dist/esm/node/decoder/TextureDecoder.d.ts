import { ITexture } from "../../proto/rocktree";
export interface TextureCoordinates {
    uv_offset: {
        x: number;
        y: number;
    };
    uv_scale: {
        x: number;
        y: number;
    };
}
export declare class TextureDecoder {
    private static arrayBufferCopy;
    static unpackTextureFormat(available_texture_formats: any, default_available_texture_formats: any): number;
    static unpackImageryEpoch(flags: number, imagery_epoch: number, default_imagery_epoch: number): number;
    static unpackUvOffsetAndScale(texture: ITexture, uv_offset_and_scale: number[]): {
        uv_offset: {
            x: number;
            y: number;
        };
        uv_scale: {
            x: number;
            y: number;
        };
    };
    static unpackTexCoords(packed: any, texture: ITexture, verticesLength: any): Uint16Array;
    static unpackCRN(data: any, width: any, height: any, convertToBMP?: boolean): Uint8Array | Uint16Array;
    private static dxtToRgb565;
}
