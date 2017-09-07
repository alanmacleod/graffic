
import Vector2      from './Vector2';
import {gen_square} from './Util';
import Scene        from './Scene';
import Renderer     from './Renderer';

let renderer = new Renderer('display');
let scene = new Scene();

// Start point and our goal
let start = [10, 10];
let end = [400, 400];

// Add some obstacles to the scene
scene.add( gen_square(100, 100, 100) );
scene.add( gen_square(200, 310, 150) );
scene.add( gen_square(500, 150, 200) );

let route = scene.solve( start, end );

// Now render a visualisation of the actual scenegraph
let vis = scene.vis();

// Graph nodes
for (let t=0; t<vis.nodes.length; t++)
  renderer.render( vis.nodes[t], '#bbb', 5 );

// Graph edges
renderer.render( vis.edges, '#bbb' );

// Render the original scene on top of the graph
renderer.render( start, '#0a0', 6 );
renderer.render( end, '#a00', 6 );
renderer.render( scene.objects, '#333' );

// Now display the route!
renderer.render( [route], '#0ff', 3 );
