
import Scene                            from './Scene';
import Renderer                         from './Renderer';
import {Square, rotate, translate}      from './Util';

const element = 'display';

let renderer = new Renderer(element);
let scene = new Scene();

// Show/hide the scene graph
let debug = true;

// Start point and our goal
let start = [10, 10];
let end = [380, 420];

// For the shape animations
let rotx = 500, roty = 150;
let motion = 0, rota = 0;

// Create some simple obstacles (accepts simple n-sided polygons)
let sq_small = Square(120, 100, 100);
let sq_med   = Square(200, 310, 150);
let sq_large = Square(rotx, roty, 200);

// Add them to the scene
scene.add( sq_small );
scene.add( sq_med );
scene.add( sq_large );

frame();

function frame()
{
  requestAnimationFrame( frame );

  // Find the shortest path. Two things happen here:
  //    1. A Scene graph is extracted from our scene geometry
  //    2. Dijkstra's method is used to find the optimal route across the graph
  let route = scene.solve( start, end );

  // Get a visualisation of the actual scenegraph
  let vis = scene.vis();

  renderer.clear();

  if (debug)
  {
    // Draw the scene graph nodes
    for (let n of vis.nodes)
      renderer.render( n, '#ddd', 5 );

    // Draw the graph edges
    renderer.render( vis.edges, '#ddd' );
  }

  // Render the original scene geometry on top of the graph
  renderer.render( start, '#0a0', 6 );
  renderer.render( end, '#08f', 6 );
  renderer.render( scene.objects, '#333' );

  // Now display the found route!
  renderer.render( [route], '#f00', 3 );

  // Animation
  motion += 0.05; // Sinusoidal
  translate(sq_small, 3 * Math.sin(motion * 0.25 * Math.PI), 0);

  // rotate the big square
  rotate(sq_large, rotx, roty, 0.005);

}

document.getElementById('cb_debug').onclick = (e, c) => {
  debug = e.srcElement.checked;
}

document.getElementById(element).onmousemove = e => {
  end = [e.clientX, e.clientY];
}
