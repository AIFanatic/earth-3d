import { Frustum, Matrix3, Matrix4, Vector3 } from 'https://cdn.skypack.dev/three@0.130.0';

export class NodeValidator {

    constructor() {
        this._frustum = new Frustum();
        this._matrix3 = new Matrix3();
        this._matrix4 = new Matrix4();
        this._matrix41 = new Matrix4();
        this._v1 = new Vector3();
        this._v2 = new Vector3();
        this._v3 = new Vector3();
        this._v4 = new Vector3();
        this._v5 = new Vector3();
    }

    Classify(obb, plane) {
        // const orientation = this._matrix3.set(...obb.orientation.elements);
        const orientation = this._matrix3.set(
            obb.orientation.elements[0],
            obb.orientation.elements[1],
            obb.orientation.elements[2],
            obb.orientation.elements[3],
            obb.orientation.elements[4],
            obb.orientation.elements[5],
            obb.orientation.elements[6],
            obb.orientation.elements[7],
            obb.orientation.elements[8]
        );

        const normal = this._v2.copy(plane.normal).applyMatrix3(orientation);

        const size_x = obb.extents.x;
        const size_y = obb.extents.y;
        const size_z = obb.extents.z;

        const r = Math.abs(size_x * normal.x) + Math.abs(size_y * normal.y) + Math.abs(size_z * normal.z);

        const obb_center = this._v1.set(obb.center.x, obb.center.y, obb.center.z);
        const plane_distance = plane.constant;
        const d = obb_center.dot(plane.normal) + plane_distance;

        if (Math.abs(d) < r) {
            return 0.0;
        }
        else if (d < 0.0) {
            return d + r;
        }
        return d - r;
    }

    Intersects(frustum, obb) {

        for (let i = 0; i < 6; ++i) {
            const side = this.Classify(obb, frustum.planes[i]);
            if (side < 0) {
                return false;
            }
        }
        return true;
    }

    GetCameraParameters(camera) {
        const position = camera.position;
        const quaternion = camera.quaternion;
        
        const viewprojection = this._matrix4.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);

        return [position, quaternion, viewprojection];
    }

    isNodeTooSmallForProjection(position, direction, viewprojection, node) {
        const eye = this._v1.copy(position);
        const obb_center = this._v2.set(node.obb.center.x, node.obb.center.y, node.obb.center.z);
        
        var _direction = this._v3.set(0,0,-1).applyQuaternion( direction );

        const node_meters_per_texel = node.meters_per_texel;


        const norm = this._v4.copy(eye).sub(obb_center).length();

        const translation = this._v5.copy(eye).add(_direction.multiplyScalar(norm));
        let t = this._matrix41.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        t.makeTranslation(translation.x, translation.y, translation.z);

        const m = this._matrix4.copy(viewprojection).multiply(t);

        const s = m.elements[15];

        const texels_per_meter = 1.0 / node_meters_per_texel;
        const wh = 512; // width < height ? width : height;
        const r = (2.0*(1.0/s)) * wh;

        return texels_per_meter > r;
    }

    isNodeIntersectingCamera(camera, node) {
        const [position, quaternion, viewprojection] = this.GetCameraParameters(camera);

        this._frustum.setFromProjectionMatrix(viewprojection);

        const intersects_node = this.Intersects(this._frustum, node.obb);
        const is_node_too_far = !this.isNodeTooSmallForProjection(position, quaternion, viewprojection, node);

        return intersects_node && is_node_too_far;
    }
}