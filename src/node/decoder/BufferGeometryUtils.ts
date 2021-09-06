export class BufferGeometryUtils {
    
    static toTriangleStripDrawMode( indexes: Uint16Array ): Uint16Array {
        let numberOfTriangles = indexes.length - 2;
        let newIndices = new Uint16Array(numberOfTriangles * 3);

        for ( let i = 0, j=0; i < numberOfTriangles; i ++, j+=3 ) {
            if ( i % 2 === 0 ) {
                newIndices[j] = indexes[ i ];
                newIndices[j+1] = indexes[ i + 1 ];
                newIndices[j+2] = indexes[ i + 2 ];

            } else {
                newIndices[j] = indexes[ i + 2];
                newIndices[j+1] = indexes[ i + 1 ];
                newIndices[j+2] = indexes[ i ];
            }

        }

        return newIndices;
    }
}