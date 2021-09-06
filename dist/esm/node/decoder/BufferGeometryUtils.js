var BufferGeometryUtils = /** @class */ (function () {
    function BufferGeometryUtils() {
    }
    BufferGeometryUtils.toTriangleStripDrawMode = function (indexes) {
        var numberOfTriangles = indexes.length - 2;
        var newIndices = new Uint16Array(numberOfTriangles * 3);
        for (var i = 0, j = 0; i < numberOfTriangles; i++, j += 3) {
            if (i % 2 === 0) {
                newIndices[j] = indexes[i];
                newIndices[j + 1] = indexes[i + 1];
                newIndices[j + 2] = indexes[i + 2];
            }
            else {
                newIndices[j] = indexes[i + 2];
                newIndices[j + 1] = indexes[i + 1];
                newIndices[j + 2] = indexes[i];
            }
        }
        return newIndices;
    };
    return BufferGeometryUtils;
}());
export { BufferGeometryUtils };
//# sourceMappingURL=BufferGeometryUtils.js.map