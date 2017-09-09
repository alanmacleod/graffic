
import Scene                            from './Scene';
import Renderer                         from './Renderer';
import {Square, rotate, translate}      from './Util';
import {point_in_polygon, Triangle}     from './Util';

const element = 'display';

let renderer = new Renderer(element);
let scene = new Scene();
let info = document.getElementById('infoText');

// Show/hide the scene graph
let showGraph = true, showObstacles = true;

// Start point, goal and lastknown mouse coords
let start = [10, 10];
let end = [220, 120];
let mouse = end.slice();

// For the shape animations
let rotx = 300, roty = 350, rota = 0;
let motion = 0;

// Create some dynamic obstacles
let sq_small = Square(650, 100, 150);
let sq_large = Triangle(rotx, roty, 400);

let obstacles = [
  Square(80, 120, 100), // static
  sq_small, // dynamic
  sq_large // dynamic
];

// Add them all to the scene
for (let o of obstacles)
  scene.add( o );

// Go!
(function frame()
{
  requestAnimationFrame( frame );

  renderer.clear();

  // Animation
  motion += 0.05; // Sinusoidal
  translate(sq_small, 0, 3 * Math.sin(motion * 0.25 * Math.PI));
  translate([start], 3 * Math.sin(motion * 0.05 * Math.PI), 0);
  rotate(sq_large, rotx, roty, 0.005);

  // Find the shortest path. Two things happen here:
  //    1. A Scene graph is extracted from our scene geometry
  //    2. Dijkstra's method is used to find the optimal route across the graph
  let route = scene.solve( start, end );

  // Get a visualisation of the actual scenegraph
  let vis = scene.vis();

  if (showGraph)
  {
    // Draw the scene graph nodes
    for (let n of vis.nodes)
      renderer.render( n, '#bbb', 5 );

    // Draw the graph edges
    renderer.render( vis.edges, '#eee' );
  }

  // Render the original scene geometry on top of the graph
  if (showObstacles)
  {
    renderer.render( start, '#0a0', 6 );
    renderer.render( end, '#0a0', 6 );
    renderer.render( scene.objects, '#333' );
  }

  let inside = dodge_nullspace();

  // User has moved the mouse inside a shape obstacle which invalidates the graph
  if (inside >= 0)
  {
    show_info("End point inside solid object!")
    renderer.render( [scene.objects[inside]], '#f00', 5 );
  } else hide_info();

  // Now display the found route!
  renderer.render( [route], '#00f', 3 );

})();


document.getElementById(element).onmousemove = e => { mouse = [e.clientX, e.clientY];  }
document.getElementById('cb_debug').onclick = (e, c) => { showGraph = e.srcElement.checked; }
document.getElementById('cb_debug2').onclick = (e, c) => { showObstacles = e.srcElement.checked; }

function show_info(text) { info.innerHTML = text; info.style.display = 'block'; }
function hide_info() { info.style.display = 'none'; }

// This prevents a bit of a mess from happening
// when the mouse cursor drifts *inside* a supposedly solid shape
function dodge_nullspace()
{
  // Check the current position of each of our solid shapes
  for (let i in obstacles)
  {
    let o = obstacles[i>>0];
    // Oh no!
    if (point_in_polygon(mouse, o))  // simple convex-only test
    {
      // Set the endpoint to the start to remove the red line and cursor
      end = start;
      return i;
    }
  }
  // All good, set the endpoint to the last known mouse pos
  end = mouse;
  return -1;
}
