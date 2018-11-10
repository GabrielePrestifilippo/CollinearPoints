/**
 * Convert the segments identified by indeces of the points from the list, back to X,Y points
 * @param longestSegmentsByIndex: list of segments identified by indeces
 * @param points: original list of points
 * @returns {Array}: return the list of points making the longest segments
 */
exports.convertToPoints = function (longestSegmentsByIndex, points) {
    let outPoints = []

    for (let segment of longestSegmentsByIndex) {
        let currentSegment = []
        for (let point of segment)
            currentSegment.push(points[point])
        outPoints.push(currentSegment)
    }
    return outPoints
}

/**
 * Check if a point is present in an array of points
 * @param point
 * @param points
 * @returns {boolean}
 */
exports.isDuplicate = function (point, points) {
    for (let existingPoint of points)
        if (point.x === existingPoint.x && point.y === existingPoint.y)
            return true

    return false
}