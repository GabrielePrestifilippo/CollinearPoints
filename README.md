# Collinear Points

Given a set of P feature points in the bidimensional plane, determine every line that contains at least N or more 
COLLINEAR points.


### Pre requisites
Node.js and npm installed
### Installing dependencies
In the root of the project run: 
```sh
$ npm install
```
### Running the server
In the root of the project run: 
```sh
$ node index
```
The server will be reachable at
 ```sh 
http://localhost:3000
```
### Endpoints

#### GET

Retrieve all the points (Array)
```
http://localhost:3000/space
```

Retrieve all the lines with minimum length N (Array)
```
http://localhost:3000/lines/{n}
```
#### POST

Post a JSON points -> Returns posted points

The server expects a valid JSON as input
```
http://localhost:3000/point
```
#### DELETE

Delete all the points -> returns the empty space
```
http://localhost:3000/space
```
