
import {Square}     from './Util';
import Scene        from './Scene';
import Renderer     from './Renderer';

let renderer = new Renderer('display');
let scene = new Scene();

// Start point and our goal
let start = [10, 10];
let end = [380, 420];

// Add some obstacles to the scene
scene.add( Square(120, 100, 100) );
scene.add( Square(200, 310, 150) );
scene.add( Square(500, 150, 200) );

// Find the shortest path. Two things happen here:
//    1. A Scene graph is extracted from our scene geometry
//    2. Dijkstra's method is used to find the optimal route across the graph
let route = scene.solve( start, end );

// Get a visualisation of the actual scenegraph
let vis = scene.vis();

// Draw the scene graph nodes
for (let n of vis.nodes)
  renderer.render( n, '#ddd', 5 );

// Draw the graph edges
renderer.render( vis.edges, '#ddd' );

// Render the original scene geometry on top of the graph
renderer.render( start, '#0a0', 6 );
renderer.render( end, '#08f', 6 );
renderer.render( scene.objects, '#333' );

// Now display the found route!
renderer.render( [route], '#f00', 3 );
