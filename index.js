const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let {getAnglesMap, extractLongestSegments} = require('./Helpers/geometryHelper')
let {convertToPoints, isDuplicate} = require('./Helpers/generalHelper')

let points = []

app.get('/space', (req, res) => {
    res.json(points);
});

app.get('/lines/:numberOfLines', (req, res) => {

    let minimumNumber = Number(req.params.numberOfLines)

    if (!minimumNumber || !Number.isInteger(minimumNumber)) {
        res.send({status: "error", message: "malformed input"})

    } else {

        let anglesMap = getAnglesMap(points)
        let longestSegmentsByIndex = extractLongestSegments(anglesMap, minimumNumber)
        let outPoints = convertToPoints(longestSegmentsByIndex, points)

        res.send(outPoints)
    }
});

app.post('/point', (req, res) => {

    let x = Number(req.body.x)
    let y = Number(req.body.y)

    let point = {x: x, y: y}

    if (!req.body || isNaN(x) || isNaN(y))
        res.send({status: "error", message: "malformed input"})
    else if (isDuplicate(point, points)) {
        res.send({status: "error", message: "point already present"})
    } else {
        points.push(point)
        res.send({status: "ok", message: point})
    }
});

app.delete('/space', (req, res) => {
    points = []
    res.send(points)
});


app.listen(3000, () => console.log('App listening on port 3000'));