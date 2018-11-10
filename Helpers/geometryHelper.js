/**
 * Extract the longest segments given a minimum length from a list of collinear points, indexed by a number indicating
 * the angle between the first and the other points
 * @param angles: list of elements
 * @param minimumLenght: minimum segment's length
 * @returns {Array}: the list of longest segments, after having cleaned the shorter
 */
exports.extractLongestSegments = function (angles, minimumLenght) {
    let lines = []

    for (let angle in angles) {
        for (let pair in angles[angle]) {
            if (angles[angle][pair].length >= minimumLenght)
                lines.push(angles[angle][pair])
        }
    }
    return cleanDuplicates(lines)
}

/**
 * The method iterates over the points in a nested for, avoiding checking the same elements twice by using a hashMap.
 * It then saves the angles each points is making with the others. By indexing a list by the angles and the occurrences.
 * @param points: all the input points
 * @returns {Array}: the object containing the angles with the list of points
 */
exports.getAnglesMap = function (points) {
    let angles = []
    let hashMapChecked = {}

    for (let initialPoint = 0; initialPoint < points.length; initialPoint++) {
        angles[initialPoint] = {}
        hashMapChecked[initialPoint] = {}

        for (let secondPoint = 0; secondPoint < points.length; secondPoint++) {
            hashMapChecked[initialPoint][secondPoint] = true

            if (!hashMapChecked[secondPoint])
                hashMapChecked[secondPoint] = []

            if (initialPoint !== secondPoint && !hashMapChecked[secondPoint][initialPoint]) {

                let myAngle = getSlope(points[initialPoint], points[secondPoint])

                if (!angles[initialPoint][myAngle])
                    angles[initialPoint][myAngle] = [initialPoint]

                angles[initialPoint][myAngle].push(secondPoint)
            }
        }
    }
    return angles
}

/**
 *
 * @param a: point1
 * @param b: point2
 * @returns {number}: the angle/slope. If they lye on the same X axis, we define a custom output (99),
 * to avoid division by 0.
 */
getSlope = function (a, b) {
    if (a.x === b.x)
        return 99
    return (a.y - b.y) / (a.x - b.x)
}

/**
 * Remove duplicates of lines, by checking if every segment contains another, avoiding checking twice the elements which
 * have been checked, since the order is not important.
 * @param lines: input segment which might contains duplicates with shorter
 * @returns {Array}: segments without duplicates
 */
cleanDuplicates = function (lines) {
    let toRemove;
    for (let i = 0; i < lines.length; i++) {
        for (let j = i; j < lines.length; j++) {
            if (i !== j) {
                toRemove = containsOther(lines, i, j)
                if (toRemove)
                    lines.splice(toRemove, 1)
            }
        }
    }
    return lines
}

/**
 * Check if an array contains another array (a segment contains another), indepedent of the order of the two
 * @param input: array of segments
 * @param index1: index1 to check
 * @param index2: index2 to check
 * @returns {*}: return the element which is a children if found, false otherwise
 */
containsOther = function (input, index1, index2) {

    let longArray, shortArray, shortIndex

    if (input[index1].length >= input[index2].length) {
        longArray = input[index1]
        shortArray = input[index2]
        shortIndex = index2
    } else {
        longArray = input[index2]
        shortArray = input[index1]
        shortIndex = index1
    }

    if (shortArray.every(elem => longArray.indexOf(elem) > -1))
        return shortIndex

    return false
}