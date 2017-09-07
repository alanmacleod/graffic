
import {Square}     from './Util';
import Scene        from './Scene';
import Renderer     from './Renderer';

let renderer = new Renderer('display');
let scene = new Scene();

// Start point and our goal
let start = [10, 10];
let end = [380, 420];

// Add some obstacles to the scene
let sq_small = Square(120, 100, 100);
// let sq_small = Square(334+50, 314+50, 100);
let sq_med   = Square(200, 310, 150);
let sq_large = Square(500, 150, 200);

let obstacles = [sq_small, sq_med, sq_large];

for (let o of obstacles)
  scene.add( o );

requestAnimationFrame( frame );

function frame()
{
  requestAnimationFrame( frame );

  // Throttle a bit
  if (((Date.now() / 5)>>0) & 1)
    return;

  // if ((Date.now() / 10)>>0 & 1) return;

  // Find the shortest path. Two things happen here:
  //    1. A Scene graph is extracted from our scene geometry
  //    2. Dijkstra's method is used to find the optimal route across the graph
  let route = scene.solve( start, end );

  // Get a visualisation of the actual scenegraph
  let vis = scene.vis();

  renderer.clear();

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

  translate(sq_small, 1, 1);
}

function translate(shape, dx, dy)
{
  for (let pair of shape)
  {
    pair[0] += dx;
    pair[1] += dy;
  }
}
