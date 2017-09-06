
import Vector2      from './Vector2';
import {gen_square} from './Util';
import Scene        from './Scene';


// let scene = [];
const c = document.getElementById("display");
const context = c.getContext('2d');

let scene = new Scene();

// Start point and our goal
let start = [10, 10];
let end = [400, 400];

// Add some obstacles to the scene
scene.add( gen_square(100, 100, 100) );
scene.add( gen_square(200, 310, 150) );
scene.add( gen_square(500, 150, 200) );

let graph = scene.graph( start, end );

console.log(graph);

// Line of sight test endpoint -> other endpoints (optimise! otherwise O(N2))



// Create scene graph from vis endpoints

// Use Dijkstra or A* to find shortest route
