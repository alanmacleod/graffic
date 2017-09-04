
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

scene.journey( start, end );

// Add some obstacles to the scene
scene.add( gen_square(100, 100, 100) );
scene.add( gen_square(200, 310, 150) );
scene.add( gen_square(500, 150, 200) );

console.log(scene);

scene.graph();

// Line of sight test endpoint -> other endpoints (optimise! otherwise O(N2))

// function intersects(a,b,c,d,  p,q,r,s)
// {
//   var det, gamma, lambda;
//   det = (c - a) * (s - q) - (r - p) * (d - b);
//   if (det === 0) {
//     return false;
//   } else {
//
//     lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
//     gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
//     return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
//   }
// }


// Create scene graph from vis endpoints

// Use Dijkstra or A* to find shortest route
