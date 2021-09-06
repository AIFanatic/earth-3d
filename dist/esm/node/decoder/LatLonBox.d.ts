interface LatLon {
    lat: number;
    lon: number;
}
export declare class LatLonBox {
    n: number;
    s: number;
    w: number;
    e: number;
    constructor(n: number, s: number, w: number, e: number);
    mid_point(): LatLon;
    get_child(octant: any): LatLonBox;
    static is_overlapping(box1: LatLonBox, box2: LatLonBox): boolean;
}
export declare function octant_to_latlong(octant_string: string): LatLonBox;
export {};
