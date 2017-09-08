
import Scene                            from './Scene';
import Renderer                         from './Renderer';
import {Square, rotate, translate}      from './Util';
import {point_in_polygon, Triangle}     from './Util';

const element = 'display';

let renderer = new Renderer(element);
let scene = new Scene();
let info = document.getElementById('infoText');

// Show/hide the scene graph
let debug = true;

// Start point and our goal
let start = [10, 10];
let end = [380, 420];
let mx = end[0], my = [1];

// For the shape animations
let rotx = 300, roty = 350;
let motion = 0, rota = 0;

// Create some dynamic obstacles
let sq_small = Square(600, 100, 100);
let sq_large = Triangle(rotx, roty, 400);

let obstacles = [
  // Dynamic
  //sq_small,
  sq_large,
  // Static
  //Square(60, 250, 50), Square(12,12, 2), Square(620, 400, 100),

];

// Add them all to the scene
for (let o of obstacles)
  scene.add( o );

frame();

function frame()
{
  requestAnimationFrame( frame );

  hide_info();

  let inside = dodge_nullspace();

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
      renderer.render( n, '#bbb', 5 );

    // Draw the graph edges
    renderer.render( vis.edges, '#eee' );
  }

  // // Render the original scene geometry on top of the graph
  renderer.render( start, '#0a0', 6 );
  renderer.render( end, '#0a0', 6 );
  renderer.render( scene.objects, '#333' );

  if (inside >= 0)
  {
    show_info("End point inside solid object!")
    renderer.render( [scene.objects[inside]], '#f00', 5 );
  }

  // Now display the found route!
  renderer.render( [route], '#00f', 3 );

  // Animation
  motion += 0.05; // Sinusoidal
  translate(sq_small, 0, 3 * Math.sin(motion * 0.25 * Math.PI));

  // rotate the big square
  rotate(sq_large, rotx, roty, 0.005);

}

document.getElementById('cb_debug').onclick = (e, c) => {
  debug = e.srcElement.checked;
}


document.getElementById(element).onmousemove = e => {
  // Save the last known mouse position
  mx = e.clientX;
  my = e.clientY;
}

function show_info(text)
{
  info.innerHTML = text;
  info.style.display = 'block';
}
function hide_info()
{
  info.style.display = 'none';
}

// This prevents a bit of a mess from happening
// when the mouse cursor drifts *inside* a supposedly solid shape
function dodge_nullspace()
{
  // Our tentative new coordinate (last known mouse pos)
  let c = [mx, my];

  // Check the current position of each of our solid shapes
  for (let i in obstacles)
  {
    let o = obstacles[i>>0];
    // Oh no!
    if (point_in_polygon(c, o))  // simple convex-only test
    {
      // Set the endpoint to the start to remove the red line and cursor
      end = start;
      return i;
    }
  }
  // All good, set the endpoint to the last known mouse pos
  end = c;
  return -1;
}
