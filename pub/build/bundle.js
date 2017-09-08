/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


function Square(x, y, size) {
  var hsize = size >> 1;
  var sq = [];
  // or just make a unit square and scale it up duh :|
  // top left
  sq.push([x - hsize, y - hsize]);
  // top right
  sq.push([x + hsize, y - hsize]);
  // bottom right
  sq.push([x + hsize, y + hsize]);
  // bottom left
  sq.push([x - hsize, y + hsize]);
  // top left again
  sq.push([x - hsize, y - hsize]);

  return sq;
}

// equilateral
function Triangle(x, y, size) {
  var angle = 0;
  var r = size / 2.0 / Math.sin(Math.PI * 60 / 180);
  var tri = [];

  for (var i = 0; i <= 3; i++) {
    tri.push([x + r * Math.cos(angle + i % 3 * 2 * Math.PI / 3), y + r * Math.sin(angle + i % 3 * 2 * Math.PI / 3)]);
  }

  return tri;
}

function rotate(shape, rx, ry, da) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = shape[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var pair = _step.value;

      pair = rotate_point(rx, ry, da, pair);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function translate(shape, dx, dy) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = shape[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var pair = _step2.value;

      pair[0] += dx;
      pair[1] += dy;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function rotate_point(cx, cy, angle, p) {
  var s = Math.sin(angle);
  var c = Math.cos(angle);

  // translate point back to origin:
  p[0] -= cx;
  p[1] -= cy;

  // rotate point
  var xnew = p[0] * c - p[1] * s;
  var ynew = p[0] * s + p[1] * c;

  // translate point back:
  p[0] = xnew + cx;
  p[1] = ynew + cy;

  return p;
}

function point_in_polygon(point, vertices) {
  for (var i = 0; i < vertices.length - 1; i++) {
    var a = vertices[i];
    var b = vertices[i + 1];

    var seg = subtractPoints(b, a);
    var pt = subtractPoints(point, a);
    var inside = crossProduct(seg, pt) > 0;
    // console.log(inside);
    if (!inside) return false;
  }

  return true;
}

/**
 * @author Peter Kelley
 * @author pgkelley4@gmail.com
 */
/**
 * See if two line segments intersect. This uses the
 * vector cross product approach described below:
 * http://stackoverflow.com/a/565282/786339
 *
 * @param {Object} p point object with x and y coordinates
 *  representing the start of the 1st line.
 * @param {Object} p2 point object with x and y coordinates
 *  representing the end of the 1st line.
 * @param {Object} q point object with x and y coordinates
 *  representing the start of the 2nd line.
 * @param {Object} q2 point object with x and y coordinates
 *  representing the end of the 2nd line.
 */

function intersects(ap, ap2, aq, aq2) {
  // AM: Note to developers, please don't use named properties for vectors
  //     It's daft. Use arrays.
  return doLineSegmentsIntersect({ x: ap[0], y: ap[1] }, { x: ap2[0], y: ap2[1] }, { x: aq[0], y: aq[1] }, { x: aq2[0], y: aq2[1] });
}

function is_one_bbox_contained_by_the_other_questionmark(p, p2, q, q2) {
  var box1 = {
    xmin: Math.min(p.x, p2.x),
    ymin: Math.min(p.y, p2.y),
    xmax: Math.max(p.x, p2.x),
    ymax: Math.max(p.y, p2.y)
  };

  var box2 = {
    xmin: Math.min(q.x, q2.x),
    ymin: Math.min(q.y, q2.y),
    xmax: Math.max(q.x, q2.x),
    ymax: Math.max(q.y, q2.y)
  };

  return bbox_contained(box1, box2) || bbox_contained(box2, box1);
}

function bbox_contained(a, b) {
  // Is Box B completely inside box A ?
  return b.xmin >= a.xmin && b.xmax <= a.xmax && b.ymin >= a.ymin && b.ymax <= a.ymax;
}

function doLineSegmentsIntersect(p, p2, q, q2) {
  // var debug_string = `doLineSegmentsIntersect: (${p.x}, ${p.y})-(${p2.x}, ${p2.y})  with  (${q.x}, ${q.y})-(${q2.x}, ${q2.y})`;

  var r = subtractPoints(p2, p);
  var s = subtractPoints(q2, q);

  var uNumerator = crossProduct(subtractPoints(q, p), r);
  var denominator = crossProduct(r, s);

  if (uNumerator == 0 && denominator == 0) {
    // They are coLlinear

    // console.log("Coplanar");

    // Do they touch? (Are any of the points equal?)
    if (equalPoints(p, q) || equalPoints(p, q2) || equalPoints(p2, q) || equalPoints(p2, q2)) {
      return {
        intersect: true,
        kiss: !is_one_bbox_contained_by_the_other_questionmark(p, p2, q, q2)
      };
    }
    // Do they overlap? (Are all the point differences in either direction the same sign)

    // console.log("Points DONT touch");

    return {
      intersect: !allEqual(q.x - p.x < 0, q.x - p2.x < 0, q2.x - p.x < 0, q2.x - p2.x < 0) || !allEqual(q.y - p.y < 0, q.y - p2.y < 0, q2.y - p.y < 0, q2.y - p2.y < 0),
      kiss: false
    };
  }

  if (denominator == 0) {
    // lines are paralell
    return { intersect: false, kiss: false };
  }

  var u = uNumerator / denominator;
  var t = crossProduct(subtractPoints(q, p), s) / denominator;

  // console.log(`t=${t}, u=${u}`);
  var kiss = false;

  if (equalPoints(p, q) || equalPoints(p, q2) || equalPoints(p2, q) || equalPoints(p2, q2)) kiss = true;

  // let res =
  //return
  return {
    intersect: t >= 0 && t <= 1 && u >= 0 && u <= 1,
    kiss: kiss
  };

  // console.log(`${debug_string} = ${res}`);

  // return res;
}

/**
 * Calculate the cross product of the two points.
 *
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 *
 * @return the cross product result as a float
 */
function crossProduct(point1, point2) {

  if (Array.isArray(point1)) return point1[0] * point2[1] - point1[1] * point2[0];else return point1.x * point2.y - point1.y * point2.x;
}

/**
 * Subtract the second point from the first.
 *
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 *
 * @return the subtraction result as a point object
 */
function subtractPoints(point1, point2) {

  if (Array.isArray(point1)) {
    return [point1[0] - point2[0], point1[1] - point2[1]];
  } else {
    var result = {};
    result.x = point1.x - point2.x;
    result.y = point1.y - point2.y;

    return result;
  }
}

/**
 * See if the points are equal.
 *
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 *
 * @return if the points are equal
 */
function equalPoints(point1, point2) {
  return point1.x == point2.x && point1.y == point2.y;
}

/**
 * See if all arguments are equal.
 *
 * @param {...} args arguments that will be compared by '=='.
 *
 * @return if all arguments are equal
 */
function allEqual(args) {
  var firstValue = arguments[0],
      i;
  for (i = 1; i < arguments.length; i += 1) {
    if (arguments[i] != firstValue) {
      return false;
    }
  }
  return true;
}

exports.Square = Square;
exports.Triangle = Triangle;
exports.intersects = intersects;
exports.rotate = rotate;
exports.translate = translate;
exports.point_in_polygon = point_in_polygon;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Scene = __webpack_require__(2);

var _Scene2 = _interopRequireDefault(_Scene);

var _Renderer = __webpack_require__(4);

var _Renderer2 = _interopRequireDefault(_Renderer);

var _Util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var element = 'display';

var renderer = new _Renderer2.default(element);
var scene = new _Scene2.default();
var info = document.getElementById('infoText');

// Show/hide the scene graph
var debug = true;

// Start point and our goal
var start = [10, 10];
var end = [380, 420];
var mx = end[0],
    my = [1];

// For the shape animations
var rotx = 300,
    roty = 350;
var motion = 0,
    rota = 0;

// Create some dynamic obstacles
var sq_small = (0, _Util.Square)(600, 100, 100);
var sq_large = (0, _Util.Triangle)(rotx, roty, 400);

var obstacles = [
// Dynamic
//sq_small,
sq_large];

// Add them all to the scene
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = obstacles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var o = _step.value;

    scene.add(o);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

frame();

function frame() {
  requestAnimationFrame(frame);

  hide_info();

  var inside = dodge_nullspace();

  // Find the shortest path. Two things happen here:
  //    1. A Scene graph is extracted from our scene geometry
  //    2. Dijkstra's method is used to find the optimal route across the graph
  var route = scene.solve(start, end);

  // Get a visualisation of the actual scenegraph
  var vis = scene.vis();

  renderer.clear();

  if (debug) {
    // Draw the scene graph nodes
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = vis.nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var n = _step2.value;

        renderer.render(n, '#bbb', 5);
      } // Draw the graph edges
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    renderer.render(vis.edges, '#eee');
  }

  // // Render the original scene geometry on top of the graph
  renderer.render(start, '#0a0', 6);
  renderer.render(end, '#0a0', 6);
  renderer.render(scene.objects, '#333');

  if (inside >= 0) {
    show_info("End point inside solid object!");
    renderer.render([scene.objects[inside]], '#f00', 5);
  }

  // Now display the found route!
  renderer.render([route], '#00f', 3);

  // Animation
  motion += 0.05; // Sinusoidal
  (0, _Util.translate)(sq_small, 0, 3 * Math.sin(motion * 0.25 * Math.PI));

  // rotate the big square
  (0, _Util.rotate)(sq_large, rotx, roty, 0.005);
}

document.getElementById('cb_debug').onclick = function (e, c) {
  debug = e.srcElement.checked;
};

document.getElementById(element).onmousemove = function (e) {
  // Save the last known mouse position
  mx = e.clientX;
  my = e.clientY;
};

function show_info(text) {
  info.innerHTML = text;
  info.style.display = 'block';
}
function hide_info() {
  info.style.display = 'none';
}

// This prevents a bit of a mess from happening
// when the mouse cursor drifts *inside* a supposedly solid shape
function dodge_nullspace() {
  // Our tentative new coordinate (last known mouse pos)
  var c = [mx, my];

  // Check the current position of each of our solid shapes
  for (var i in obstacles) {
    var _o = obstacles[i >> 0];
    // Oh no!
    if ((0, _Util.point_in_polygon)(c, _o)) // simple convex-only test
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Graph = __webpack_require__(3);

var _Graph2 = _interopRequireDefault(_Graph);

var _Util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scene = function () {
  function Scene() {
    _classCallCheck(this, Scene);

    this.objects = [];
    this.graph = null;

    // This is just for visualising the graph
    this._vis = null;
  }

  _createClass(Scene, [{
    key: 'add',
    value: function add(object) {
      this.objects.push(object);
    }
  }, {
    key: 'solve',
    value: function solve(start, end) {
      this.graph = this._graph(start, end);
      var nodes = this.graph.shortest(0, 1); // [0] start, [1] end (see .graph())

      var route = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var n = _step.value;

          route.push(this._vis.nodes[n]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return route;
    }
  }, {
    key: 'vis',
    value: function vis() {
      return this._vis;
    }

    // Extract a scenegraph from our continuous euclidean geometry

  }, {
    key: '_graph',
    value: function _graph(start, end) {
      var nodes = [];
      var edges = [];

      var g = new _Graph2.default();

      // For visualising the graph
      this._vis = { nodes: [], edges: [] };

      // This is just a temp value used to make sure shapes don't perform
      // intersection tests on themselves (across their own vertices)
      var shape_id = 1;

      // These first two nodes in the graph are a special case
      nodes.push({ vertex: start, shape: shape_id++ }); // [0] start (see .solve())
      nodes.push({ vertex: end, shape: shape_id++ }); // [1] end

      // extract each obstacle's edges and nodes
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.objects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var o = _step2.value;

          shape_id++;

          var e = void 0;
          for (e = 0; e < o.length - 1; e++) {
            edges.push([o[e], o[e + 1]]);

            nodes.push({
              vertex: o[e],
              shape: shape_id
            });
          }
          // this isn't a closed ring (matching start and endp)
          if (!equals(o[0], o[e])) nodes.push({
            vertex: o[e],
            shape: shape_id
          });
        }

        // Add `nodes` indices to graph
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      for (var i in nodes) {
        g.addvertex(Number(i));

        // For visualising the graph
        this._vis.nodes.push(nodes[Number(i)].vertex);
      }

      // Add obstacles' permimeter edges to the graph

      // g.addedge(): perimeter of all obstacles

      var ne = 0;

      for (var x = 0; x < nodes.length - 1; x++) {
        for (var y = x + 1; y < nodes.length; y++) {
          var A = nodes[x];
          var B = nodes[y];

          // We're testing the shape's vertices against itself
          // which leads to internal paths inside the shape (invalid!)
          if (A.shape == B.shape) continue;

          var testedge = [A.vertex, B.vertex];

          if (edgevisibilty(testedge, edges)) {
            g.addedge(x, y, cost(A.vertex, B.vertex));

            // Just for visualising the graph, non-essential:
            this._vis.edges.push([A.vertex, B.vertex]);
          }
        }
      }return g;
    }
  }]);

  return Scene;
}();

exports.default = Scene;


function cost(a, b) {
  var dx = b[0] - a[0]; // x2 - x1
  var dy = b[1] - a[1];
  return Math.sqrt(dx * dx + dy * dy);
}

function edgevisibilty(testedge, edges) {
  // console.log(`Testing edge: ${testedge[0]}, ${testedge[1]}`);

  for (var t = 0; t < edges.length; t++) {
    var e = edges[t];

    var res = (0, _Util.intersects)(testedge[0], testedge[1], e[0], e[1]);

    // If intersection, check it's not just the endpoints kissing which is ok
    // in fact, it's more than 'ok' - it's exactly what we're looking for
    if (res.intersect && !res.kiss) return false;
  }

  return true;
}

function equals(a, b) {
  return a[0] == b[0] && a[1] == b[1];
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Graph = function () {
  function Graph() {
    _classCallCheck(this, Graph);

    this.vertices = [];
    this.edges = [];
    this.numedges = 0;
  }

  _createClass(Graph, [{
    key: "addvertex",
    value: function addvertex(n) {
      this.vertices.push(n);
      this.edges[n] = [];
    }

    // adjaceny edge list

  }, {
    key: "addedge",
    value: function addedge(v1, v2, cost) {
      this.edges[v1].push({ dest: v2, cost: cost });
      this.edges[v2].push({ dest: v1, cost: cost });

      this.numedges++;
    }

    // Super basic implementation of Dijkstra's algorithm
    // Directly from this recipe: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Algorithm

  }, {
    key: "shortest",
    value: function shortest(start, end) {
      var current_node = void 0;
      var dist = [0];
      var prev = [];
      var unvisited = [];

      for (var i = 0; i < this.vertices.length; i++) {
        if (i) dist[i] = Number.MAX_VALUE;
        unvisited[i] = i;
        prev[i] = null;
      }

      // 'Visit' each node only once, in turn
      while ((current_node = unvisited.shift()) != null) {
        // For each node, 'check' its neighbours.
        // While we only 'visit' each node once, it's this repeated 'check'ing
        // (and occasional recalculating) of neighbours that allows us to find
        // the shortest route through the graph from our start point.
        // In fact, the inherent result of the algo is that we find the shortest
        // path to *every* point in the graph
        for (var t = 0; t < this.edges[current_node].length; t++) {
          // vertex/node ID
          var neighbour = this.edges[current_node][t].dest;

          // Distance from current_node to neighbour
          var cost = this.edges[current_node][t].cost;

          // Distance thus far on this route (up to current_node) + distance to neighbour
          var tentative_dist = dist[current_node] + cost;

          // Have we found a shorter path?
          if (tentative_dist < dist[neighbour]) {
            dist[neighbour] = tentative_dist; // New distance to this node
            prev[neighbour] = current_node; // Update the route
          }
        }
      }

      var c = end,
          seq = [end];

      // failed for some reason, e.g. impossible point inside nullspace etc
      if (prev[c] == null) return [];

      do {
        c = prev[c];
        seq.push(c);
      } while (c != start);

      return seq.reverse();
    }
  }]);

  return Graph;
}();

exports.default = Graph;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
  function Renderer(element) {
    _classCallCheck(this, Renderer);

    this.element = document.getElementById(element);
    this.context = this.element.getContext('2d');
  }

  _createClass(Renderer, [{
    key: 'clear',
    value: function clear() {
      this.context.clearRect(0, 0, this.element.width, this.element.height);
    }
  }, {
    key: 'render',
    value: function render(objects) {
      var colour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#000';
      var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

      if (!Array.isArray(objects)) return;

      // point type
      if (!Array.isArray(objects[0])) {
        var p = objects;
        this.context.beginPath();
        this.context.arc(p[0] >> 0, p[1] >> 0, width, 0, 2 * Math.PI, false);
        this.context.fillStyle = colour;
        this.context.fill();
      } else {
        // list of shapes type

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = objects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var o = _step.value;

            for (var e = 0; e < o.length - 1; e++) {
              this._line(o[e], o[e + 1], colour, width);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: '_line',
    value: function _line(a, b, c, w) {
      this.context.lineWidth = w;
      this.context.strokeStyle = c || 'black';
      this.context.beginPath();
      this.context.moveTo(a[0] >> 0, a[1] >> 0);
      this.context.lineTo(b[0] >> 0, b[1] >> 0);
      this.context.stroke();
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWE3MjU1OTFmMzE3ZjgyMjczNWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJUcmlhbmdsZSIsImFuZ2xlIiwiciIsIk1hdGgiLCJzaW4iLCJQSSIsInRyaSIsImkiLCJjb3MiLCJyb3RhdGUiLCJzaGFwZSIsInJ4IiwicnkiLCJkYSIsInBhaXIiLCJyb3RhdGVfcG9pbnQiLCJ0cmFuc2xhdGUiLCJkeCIsImR5IiwiY3giLCJjeSIsInAiLCJzIiwiYyIsInhuZXciLCJ5bmV3IiwicG9pbnRfaW5fcG9seWdvbiIsInBvaW50IiwidmVydGljZXMiLCJsZW5ndGgiLCJhIiwiYiIsInNlZyIsInN1YnRyYWN0UG9pbnRzIiwicHQiLCJpbnNpZGUiLCJjcm9zc1Byb2R1Y3QiLCJpbnRlcnNlY3RzIiwiYXAiLCJhcDIiLCJhcSIsImFxMiIsImRvTGluZVNlZ21lbnRzSW50ZXJzZWN0IiwiaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsiLCJwMiIsInEiLCJxMiIsImJveDEiLCJ4bWluIiwibWluIiwieW1pbiIsInhtYXgiLCJtYXgiLCJ5bWF4IiwiYm94MiIsImJib3hfY29udGFpbmVkIiwidU51bWVyYXRvciIsImRlbm9taW5hdG9yIiwiZXF1YWxQb2ludHMiLCJpbnRlcnNlY3QiLCJraXNzIiwiYWxsRXF1YWwiLCJ1IiwidCIsInBvaW50MSIsInBvaW50MiIsIkFycmF5IiwiaXNBcnJheSIsInJlc3VsdCIsImFyZ3MiLCJmaXJzdFZhbHVlIiwiYXJndW1lbnRzIiwiZWxlbWVudCIsInJlbmRlcmVyIiwic2NlbmUiLCJpbmZvIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImRlYnVnIiwic3RhcnQiLCJlbmQiLCJteCIsIm15Iiwicm90eCIsInJvdHkiLCJtb3Rpb24iLCJyb3RhIiwic3Ffc21hbGwiLCJzcV9sYXJnZSIsIm9ic3RhY2xlcyIsIm8iLCJhZGQiLCJmcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImhpZGVfaW5mbyIsImRvZGdlX251bGxzcGFjZSIsInJvdXRlIiwic29sdmUiLCJ2aXMiLCJjbGVhciIsIm5vZGVzIiwibiIsInJlbmRlciIsImVkZ2VzIiwib2JqZWN0cyIsInNob3dfaW5mbyIsIm9uY2xpY2siLCJlIiwic3JjRWxlbWVudCIsImNoZWNrZWQiLCJvbm1vdXNlbW92ZSIsImNsaWVudFgiLCJjbGllbnRZIiwidGV4dCIsImlubmVySFRNTCIsInN0eWxlIiwiZGlzcGxheSIsIlNjZW5lIiwiZ3JhcGgiLCJfdmlzIiwib2JqZWN0IiwiX2dyYXBoIiwic2hvcnRlc3QiLCJnIiwic2hhcGVfaWQiLCJ2ZXJ0ZXgiLCJlcXVhbHMiLCJhZGR2ZXJ0ZXgiLCJOdW1iZXIiLCJuZSIsIkEiLCJCIiwidGVzdGVkZ2UiLCJlZGdldmlzaWJpbHR5IiwiYWRkZWRnZSIsImNvc3QiLCJzcXJ0IiwicmVzIiwiR3JhcGgiLCJudW1lZGdlcyIsInYxIiwidjIiLCJkZXN0IiwiY3VycmVudF9ub2RlIiwiZGlzdCIsInByZXYiLCJ1bnZpc2l0ZWQiLCJNQVhfVkFMVUUiLCJzaGlmdCIsIm5laWdoYm91ciIsInRlbnRhdGl2ZV9kaXN0Iiwic2VxIiwicmV2ZXJzZSIsIlJlbmRlcmVyIiwiY29udGV4dCIsImdldENvbnRleHQiLCJjbGVhclJlY3QiLCJ3aWR0aCIsImhlaWdodCIsImNvbG91ciIsImJlZ2luUGF0aCIsImFyYyIsImZpbGxTdHlsZSIsImZpbGwiLCJfbGluZSIsInciLCJsaW5lV2lkdGgiLCJzdHJva2VTdHlsZSIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMzREEsU0FBU0EsTUFBVCxDQUFnQkMsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCQyxJQUF0QixFQUNBO0FBQ0UsTUFBSUMsUUFBUUQsUUFBTSxDQUFsQjtBQUNBLE1BQUlFLEtBQUssRUFBVDtBQUNBO0FBQ0E7QUFDQUEsS0FBR0MsSUFBSCxDQUFTLENBQUNMLElBQUlHLEtBQUwsRUFBWUYsSUFBSUUsS0FBaEIsQ0FBVDtBQUNBO0FBQ0FDLEtBQUdDLElBQUgsQ0FBUyxDQUFDTCxJQUFJRyxLQUFMLEVBQVlGLElBQUlFLEtBQWhCLENBQVQ7QUFDQTtBQUNBQyxLQUFHQyxJQUFILENBQVMsQ0FBQ0wsSUFBSUcsS0FBTCxFQUFZRixJQUFJRSxLQUFoQixDQUFUO0FBQ0E7QUFDQUMsS0FBR0MsSUFBSCxDQUFTLENBQUNMLElBQUlHLEtBQUwsRUFBWUYsSUFBSUUsS0FBaEIsQ0FBVDtBQUNBO0FBQ0FDLEtBQUdDLElBQUgsQ0FBUyxDQUFDTCxJQUFJRyxLQUFMLEVBQVlGLElBQUlFLEtBQWhCLENBQVQ7O0FBRUEsU0FBT0MsRUFBUDtBQUNEOztBQUVEO0FBQ0EsU0FBU0UsUUFBVCxDQUFrQk4sQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCQyxJQUF4QixFQUNBO0FBQ0UsTUFBSUssUUFBUSxDQUFaO0FBQ0EsTUFBSUMsSUFBS04sT0FBSyxHQUFOLEdBQVdPLEtBQUtDLEdBQUwsQ0FBU0QsS0FBS0UsRUFBTCxHQUFRLEVBQVIsR0FBVyxHQUFwQixDQUFuQjtBQUNBLE1BQUlDLE1BQU0sRUFBVjs7QUFFQSxPQUFJLElBQUlDLElBQUUsQ0FBVixFQUFhQSxLQUFHLENBQWhCLEVBQW1CQSxHQUFuQixFQUNBO0FBQ0VELFFBQUlQLElBQUosQ0FBUyxDQUNQTCxJQUFJUSxJQUFJQyxLQUFLSyxHQUFMLENBQVNQLFFBQVNNLElBQUksQ0FBTCxHQUFVLENBQVYsR0FBY0osS0FBS0UsRUFBbkIsR0FBc0IsQ0FBdkMsQ0FERCxFQUVQVixJQUFJTyxJQUFJQyxLQUFLQyxHQUFMLENBQVNILFFBQVNNLElBQUksQ0FBTCxHQUFVLENBQVYsR0FBY0osS0FBS0UsRUFBbkIsR0FBc0IsQ0FBdkMsQ0FGRCxDQUFUO0FBSUQ7O0FBRUQsU0FBT0MsR0FBUDtBQUNEOztBQUVELFNBQVNHLE1BQVQsQ0FBZ0JDLEtBQWhCLEVBQXVCQyxFQUF2QixFQUEyQkMsRUFBM0IsRUFBK0JDLEVBQS9CLEVBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDRSx5QkFBaUJILEtBQWpCO0FBQUEsVUFBU0ksSUFBVDs7QUFDRUEsYUFBT0MsYUFBYUosRUFBYixFQUFpQkMsRUFBakIsRUFBcUJDLEVBQXJCLEVBQXlCQyxJQUF6QixDQUFQO0FBREY7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0M7O0FBRUQsU0FBU0UsU0FBVCxDQUFtQk4sS0FBbkIsRUFBMEJPLEVBQTFCLEVBQThCQyxFQUE5QixFQUNBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ0UsMEJBQWlCUixLQUFqQixtSUFDQTtBQUFBLFVBRFNJLElBQ1Q7O0FBQ0VBLFdBQUssQ0FBTCxLQUFXRyxFQUFYO0FBQ0FILFdBQUssQ0FBTCxLQUFXSSxFQUFYO0FBQ0Q7QUFMSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTUM7O0FBRUQsU0FBU0gsWUFBVCxDQUFzQkksRUFBdEIsRUFBMEJDLEVBQTFCLEVBQThCbkIsS0FBOUIsRUFBcUNvQixDQUFyQyxFQUNBO0FBQ0UsTUFBSUMsSUFBSW5CLEtBQUtDLEdBQUwsQ0FBU0gsS0FBVCxDQUFSO0FBQ0EsTUFBSXNCLElBQUlwQixLQUFLSyxHQUFMLENBQVNQLEtBQVQsQ0FBUjs7QUFFQTtBQUNBb0IsSUFBRSxDQUFGLEtBQVFGLEVBQVI7QUFDQUUsSUFBRSxDQUFGLEtBQVFELEVBQVI7O0FBRUE7QUFDQSxNQUFJSSxPQUFPSCxFQUFFLENBQUYsSUFBT0UsQ0FBUCxHQUFXRixFQUFFLENBQUYsSUFBT0MsQ0FBN0I7QUFDQSxNQUFJRyxPQUFPSixFQUFFLENBQUYsSUFBT0MsQ0FBUCxHQUFXRCxFQUFFLENBQUYsSUFBT0UsQ0FBN0I7O0FBRUE7QUFDQUYsSUFBRSxDQUFGLElBQU9HLE9BQU9MLEVBQWQ7QUFDQUUsSUFBRSxDQUFGLElBQU9JLE9BQU9MLEVBQWQ7O0FBRUEsU0FBT0MsQ0FBUDtBQUNEOztBQUdELFNBQVNLLGdCQUFULENBQTBCQyxLQUExQixFQUFpQ0MsUUFBakMsRUFDQTtBQUNFLE9BQUssSUFBSXJCLElBQUUsQ0FBWCxFQUFjQSxJQUFFcUIsU0FBU0MsTUFBVCxHQUFnQixDQUFoQyxFQUFtQ3RCLEdBQW5DLEVBQ0E7QUFDRSxRQUFJdUIsSUFBSUYsU0FBU3JCLENBQVQsQ0FBUjtBQUNBLFFBQUl3QixJQUFJSCxTQUFTckIsSUFBRSxDQUFYLENBQVI7O0FBRUEsUUFBSXlCLE1BQU1DLGVBQWVGLENBQWYsRUFBa0JELENBQWxCLENBQVY7QUFDQSxRQUFJSSxLQUFLRCxlQUFlTixLQUFmLEVBQXNCRyxDQUF0QixDQUFUO0FBQ0EsUUFBSUssU0FBVUMsYUFBYUosR0FBYixFQUFrQkUsRUFBbEIsSUFBd0IsQ0FBdEM7QUFDQTtBQUNBLFFBQUksQ0FBQ0MsTUFBTCxFQUFhLE9BQU8sS0FBUDtBQUNkOztBQUVELFNBQU8sSUFBUDtBQUNEOztBQUdEOzs7O0FBSUE7Ozs7Ozs7Ozs7Ozs7OztBQWVBLFNBQVNFLFVBQVQsQ0FBb0JDLEVBQXBCLEVBQXdCQyxHQUF4QixFQUE2QkMsRUFBN0IsRUFBaUNDLEdBQWpDLEVBQ0E7QUFDRTtBQUNBO0FBQ0EsU0FBT0Msd0JBQXlCLEVBQUNoRCxHQUFHNEMsR0FBRyxDQUFILENBQUosRUFBVzNDLEdBQUcyQyxHQUFHLENBQUgsQ0FBZCxFQUF6QixFQUErQyxFQUFDNUMsR0FBRzZDLElBQUksQ0FBSixDQUFKLEVBQVk1QyxHQUFHNEMsSUFBSSxDQUFKLENBQWYsRUFBL0MsRUFDeUIsRUFBQzdDLEdBQUc4QyxHQUFHLENBQUgsQ0FBSixFQUFXN0MsR0FBRzZDLEdBQUcsQ0FBSCxDQUFkLEVBRHpCLEVBQytDLEVBQUM5QyxHQUFHK0MsSUFBSSxDQUFKLENBQUosRUFBWTlDLEdBQUc4QyxJQUFJLENBQUosQ0FBZixFQUQvQyxDQUFQO0FBRUQ7O0FBRUQsU0FBU0UsK0NBQVQsQ0FBeUR0QixDQUF6RCxFQUE0RHVCLEVBQTVELEVBQWdFQyxDQUFoRSxFQUFtRUMsRUFBbkUsRUFDQTtBQUNFLE1BQUlDLE9BQU87QUFDVEMsVUFBTTdDLEtBQUs4QyxHQUFMLENBQVM1QixFQUFFM0IsQ0FBWCxFQUFja0QsR0FBR2xELENBQWpCLENBREc7QUFFVHdELFVBQU0vQyxLQUFLOEMsR0FBTCxDQUFTNUIsRUFBRTFCLENBQVgsRUFBY2lELEdBQUdqRCxDQUFqQixDQUZHO0FBR1R3RCxVQUFNaEQsS0FBS2lELEdBQUwsQ0FBUy9CLEVBQUUzQixDQUFYLEVBQWNrRCxHQUFHbEQsQ0FBakIsQ0FIRztBQUlUMkQsVUFBTWxELEtBQUtpRCxHQUFMLENBQVMvQixFQUFFMUIsQ0FBWCxFQUFjaUQsR0FBR2pELENBQWpCO0FBSkcsR0FBWDs7QUFPQSxNQUFJMkQsT0FBTztBQUNUTixVQUFNN0MsS0FBSzhDLEdBQUwsQ0FBU0osRUFBRW5ELENBQVgsRUFBY29ELEdBQUdwRCxDQUFqQixDQURHO0FBRVR3RCxVQUFNL0MsS0FBSzhDLEdBQUwsQ0FBU0osRUFBRWxELENBQVgsRUFBY21ELEdBQUduRCxDQUFqQixDQUZHO0FBR1R3RCxVQUFNaEQsS0FBS2lELEdBQUwsQ0FBU1AsRUFBRW5ELENBQVgsRUFBY29ELEdBQUdwRCxDQUFqQixDQUhHO0FBSVQyRCxVQUFNbEQsS0FBS2lELEdBQUwsQ0FBU1AsRUFBRWxELENBQVgsRUFBY21ELEdBQUduRCxDQUFqQjtBQUpHLEdBQVg7O0FBT0EsU0FBTzRELGVBQWVSLElBQWYsRUFBcUJPLElBQXJCLEtBQThCQyxlQUFlRCxJQUFmLEVBQXFCUCxJQUFyQixDQUFyQztBQUNEOztBQUVELFNBQVNRLGNBQVQsQ0FBd0J6QixDQUF4QixFQUEyQkMsQ0FBM0IsRUFDQTtBQUNFO0FBQ0EsU0FBUUEsRUFBRWlCLElBQUYsSUFBVWxCLEVBQUVrQixJQUFaLElBQW9CakIsRUFBRW9CLElBQUYsSUFBVXJCLEVBQUVxQixJQUFqQyxJQUEyQ3BCLEVBQUVtQixJQUFGLElBQVVwQixFQUFFb0IsSUFBWixJQUFvQm5CLEVBQUVzQixJQUFGLElBQVV2QixFQUFFdUIsSUFBbEY7QUFDRDs7QUFHRCxTQUFTWCx1QkFBVCxDQUFpQ3JCLENBQWpDLEVBQW9DdUIsRUFBcEMsRUFBd0NDLENBQXhDLEVBQTJDQyxFQUEzQyxFQUNBO0FBQ0U7O0FBRUQsTUFBSTVDLElBQUkrQixlQUFlVyxFQUFmLEVBQW1CdkIsQ0FBbkIsQ0FBUjtBQUNBLE1BQUlDLElBQUlXLGVBQWVhLEVBQWYsRUFBbUJELENBQW5CLENBQVI7O0FBRUEsTUFBSVcsYUFBYXBCLGFBQWFILGVBQWVZLENBQWYsRUFBa0J4QixDQUFsQixDQUFiLEVBQW1DbkIsQ0FBbkMsQ0FBakI7QUFDQSxNQUFJdUQsY0FBY3JCLGFBQWFsQyxDQUFiLEVBQWdCb0IsQ0FBaEIsQ0FBbEI7O0FBRUEsTUFBSWtDLGNBQWMsQ0FBZCxJQUFtQkMsZUFBZSxDQUF0QyxFQUF5QztBQUN4Qzs7QUFFRTs7QUFFRjtBQUNBLFFBQUlDLFlBQVlyQyxDQUFaLEVBQWV3QixDQUFmLEtBQXFCYSxZQUFZckMsQ0FBWixFQUFleUIsRUFBZixDQUFyQixJQUEyQ1ksWUFBWWQsRUFBWixFQUFnQkMsQ0FBaEIsQ0FBM0MsSUFBaUVhLFlBQVlkLEVBQVosRUFBZ0JFLEVBQWhCLENBQXJFLEVBQTBGO0FBQ3pGLGFBQU87QUFDRmEsbUJBQVcsSUFEVDtBQUVGQyxjQUFNLENBQUNqQixnREFBZ0R0QixDQUFoRCxFQUFtRHVCLEVBQW5ELEVBQXVEQyxDQUF2RCxFQUEwREMsRUFBMUQ7QUFGTCxPQUFQO0FBS0E7QUFDRDs7QUFFRTs7QUFFRixXQUFPO0FBQ0hhLGlCQUNNLENBQUNFLFNBQ0ZoQixFQUFFbkQsQ0FBRixHQUFNMkIsRUFBRTNCLENBQVIsR0FBWSxDQURWLEVBRUZtRCxFQUFFbkQsQ0FBRixHQUFNa0QsR0FBR2xELENBQVQsR0FBYSxDQUZYLEVBR0ZvRCxHQUFHcEQsQ0FBSCxHQUFPMkIsRUFBRTNCLENBQVQsR0FBYSxDQUhYLEVBSUZvRCxHQUFHcEQsQ0FBSCxHQUFPa0QsR0FBR2xELENBQVYsR0FBYyxDQUpaLENBQUQsSUFLSCxDQUFDbUUsU0FDQ2hCLEVBQUVsRCxDQUFGLEdBQU0wQixFQUFFMUIsQ0FBUixHQUFZLENBRGIsRUFFQ2tELEVBQUVsRCxDQUFGLEdBQU1pRCxHQUFHakQsQ0FBVCxHQUFhLENBRmQsRUFHQ21ELEdBQUduRCxDQUFILEdBQU8wQixFQUFFMUIsQ0FBVCxHQUFhLENBSGQsRUFJQ21ELEdBQUduRCxDQUFILEdBQU9pRCxHQUFHakQsQ0FBVixHQUFjLENBSmYsQ0FQRDtBQVlEaUUsWUFBTTtBQVpMLEtBQVA7QUFlQTs7QUFFRCxNQUFJSCxlQUFlLENBQW5CLEVBQXNCO0FBQ3JCO0FBQ0EsV0FBTyxFQUFDRSxXQUFXLEtBQVosRUFBbUJDLE1BQU0sS0FBekIsRUFBUDtBQUNBOztBQUVELE1BQUlFLElBQUlOLGFBQWFDLFdBQXJCO0FBQ0EsTUFBSU0sSUFBSTNCLGFBQWFILGVBQWVZLENBQWYsRUFBa0J4QixDQUFsQixDQUFiLEVBQW1DQyxDQUFuQyxJQUF3Q21DLFdBQWhEOztBQUVDO0FBQ0EsTUFBSUcsT0FBTyxLQUFYOztBQUVBLE1BQUlGLFlBQVlyQyxDQUFaLEVBQWV3QixDQUFmLEtBQXFCYSxZQUFZckMsQ0FBWixFQUFleUIsRUFBZixDQUFyQixJQUEyQ1ksWUFBWWQsRUFBWixFQUFnQkMsQ0FBaEIsQ0FBM0MsSUFBaUVhLFlBQVlkLEVBQVosRUFBZ0JFLEVBQWhCLENBQXJFLEVBQ0VjLE9BQU8sSUFBUDs7QUFFRjtBQUNBO0FBQ0EsU0FBTztBQUNMRCxlQUFZSSxLQUFLLENBQU4sSUFBYUEsS0FBSyxDQUFsQixJQUF5QkQsS0FBSyxDQUE5QixJQUFxQ0EsS0FBSyxDQURoRDtBQUVMRixVQUFNQTtBQUZELEdBQVA7O0FBS0E7O0FBRUQ7QUFDQTs7QUFFRDs7Ozs7Ozs7QUFRQSxTQUFTeEIsWUFBVCxDQUFzQjRCLE1BQXRCLEVBQThCQyxNQUE5QixFQUFzQzs7QUFFcEMsTUFBSUMsTUFBTUMsT0FBTixDQUFjSCxNQUFkLENBQUosRUFDRSxPQUFPQSxPQUFPLENBQVAsSUFBWUMsT0FBTyxDQUFQLENBQVosR0FBd0JELE9BQU8sQ0FBUCxJQUFZQyxPQUFPLENBQVAsQ0FBM0MsQ0FERixLQUdFLE9BQU9ELE9BQU90RSxDQUFQLEdBQVd1RSxPQUFPdEUsQ0FBbEIsR0FBc0JxRSxPQUFPckUsQ0FBUCxHQUFXc0UsT0FBT3ZFLENBQS9DO0FBQ0g7O0FBRUQ7Ozs7Ozs7O0FBUUEsU0FBU3VDLGNBQVQsQ0FBd0IrQixNQUF4QixFQUFnQ0MsTUFBaEMsRUFBd0M7O0FBRXRDLE1BQUlDLE1BQU1DLE9BQU4sQ0FBY0gsTUFBZCxDQUFKLEVBQ0E7QUFDRSxXQUFPLENBQUVBLE9BQU8sQ0FBUCxJQUFZQyxPQUFPLENBQVAsQ0FBZCxFQUF5QkQsT0FBTyxDQUFQLElBQVlDLE9BQU8sQ0FBUCxDQUFyQyxDQUFQO0FBQ0QsR0FIRCxNQUdPO0FBQ0wsUUFBSUcsU0FBUyxFQUFiO0FBQ0FBLFdBQU8xRSxDQUFQLEdBQVdzRSxPQUFPdEUsQ0FBUCxHQUFXdUUsT0FBT3ZFLENBQTdCO0FBQ0EwRSxXQUFPekUsQ0FBUCxHQUFXcUUsT0FBT3JFLENBQVAsR0FBV3NFLE9BQU90RSxDQUE3Qjs7QUFFQSxXQUFPeUUsTUFBUDtBQUNEO0FBQ0Y7O0FBRUQ7Ozs7Ozs7O0FBUUEsU0FBU1YsV0FBVCxDQUFxQk0sTUFBckIsRUFBNkJDLE1BQTdCLEVBQXFDO0FBQ3BDLFNBQVFELE9BQU90RSxDQUFQLElBQVl1RSxPQUFPdkUsQ0FBcEIsSUFBMkJzRSxPQUFPckUsQ0FBUCxJQUFZc0UsT0FBT3RFLENBQXJEO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUFPQSxTQUFTa0UsUUFBVCxDQUFrQlEsSUFBbEIsRUFBd0I7QUFDdkIsTUFBSUMsYUFBYUMsVUFBVSxDQUFWLENBQWpCO0FBQUEsTUFDQ2hFLENBREQ7QUFFQSxPQUFLQSxJQUFJLENBQVQsRUFBWUEsSUFBSWdFLFVBQVUxQyxNQUExQixFQUFrQ3RCLEtBQUssQ0FBdkMsRUFBMEM7QUFDekMsUUFBSWdFLFVBQVVoRSxDQUFWLEtBQWdCK0QsVUFBcEIsRUFBZ0M7QUFDL0IsYUFBTyxLQUFQO0FBQ0E7QUFDRDtBQUNELFNBQU8sSUFBUDtBQUNBOztRQUlPN0UsTSxHQUFBQSxNO1FBQVFPLFEsR0FBQUEsUTtRQUFVcUMsVSxHQUFBQSxVO1FBQVk1QixNLEdBQUFBLE07UUFBUU8sUyxHQUFBQSxTO1FBQVdVLGdCLEdBQUFBLGdCOzs7Ozs7Ozs7QUM3UnpEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBLElBQU04QyxVQUFVLFNBQWhCOztBQUVBLElBQUlDLFdBQVcsdUJBQWFELE9BQWIsQ0FBZjtBQUNBLElBQUlFLFFBQVEscUJBQVo7QUFDQSxJQUFJQyxPQUFPQyxTQUFTQyxjQUFULENBQXdCLFVBQXhCLENBQVg7O0FBRUE7QUFDQSxJQUFJQyxRQUFRLElBQVo7O0FBRUE7QUFDQSxJQUFJQyxRQUFRLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBWjtBQUNBLElBQUlDLE1BQU0sQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFWO0FBQ0EsSUFBSUMsS0FBS0QsSUFBSSxDQUFKLENBQVQ7QUFBQSxJQUFpQkUsS0FBSyxDQUFDLENBQUQsQ0FBdEI7O0FBRUE7QUFDQSxJQUFJQyxPQUFPLEdBQVg7QUFBQSxJQUFnQkMsT0FBTyxHQUF2QjtBQUNBLElBQUlDLFNBQVMsQ0FBYjtBQUFBLElBQWdCQyxPQUFPLENBQXZCOztBQUVBO0FBQ0EsSUFBSUMsV0FBVyxrQkFBTyxHQUFQLEVBQVksR0FBWixFQUFpQixHQUFqQixDQUFmO0FBQ0EsSUFBSUMsV0FBVyxvQkFBU0wsSUFBVCxFQUFlQyxJQUFmLEVBQXFCLEdBQXJCLENBQWY7O0FBRUEsSUFBSUssWUFBWTtBQUNkO0FBQ0E7QUFDQUQsUUFIYyxDQUFoQjs7QUFTQTs7Ozs7O0FBQ0EsdUJBQWNDLFNBQWQ7QUFBQSxRQUFTQyxDQUFUOztBQUNFaEIsVUFBTWlCLEdBQU4sQ0FBV0QsQ0FBWDtBQURGOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0FFOztBQUVBLFNBQVNBLEtBQVQsR0FDQTtBQUNFQyx3QkFBdUJELEtBQXZCOztBQUVBRTs7QUFFQSxNQUFJM0QsU0FBUzRELGlCQUFiOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUlDLFFBQVF0QixNQUFNdUIsS0FBTixDQUFhbEIsS0FBYixFQUFvQkMsR0FBcEIsQ0FBWjs7QUFFQTtBQUNBLE1BQUlrQixNQUFNeEIsTUFBTXdCLEdBQU4sRUFBVjs7QUFFQXpCLFdBQVMwQixLQUFUOztBQUVBLE1BQUlyQixLQUFKLEVBQ0E7QUFDRTtBQURGO0FBQUE7QUFBQTs7QUFBQTtBQUVFLDRCQUFjb0IsSUFBSUUsS0FBbEI7QUFBQSxZQUFTQyxDQUFUOztBQUNFNUIsaUJBQVM2QixNQUFULENBQWlCRCxDQUFqQixFQUFvQixNQUFwQixFQUE0QixDQUE1QjtBQURGLE9BRkYsQ0FLRTtBQUxGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTUU1QixhQUFTNkIsTUFBVCxDQUFpQkosSUFBSUssS0FBckIsRUFBNEIsTUFBNUI7QUFDRDs7QUFFRDtBQUNBOUIsV0FBUzZCLE1BQVQsQ0FBaUJ2QixLQUFqQixFQUF3QixNQUF4QixFQUFnQyxDQUFoQztBQUNBTixXQUFTNkIsTUFBVCxDQUFpQnRCLEdBQWpCLEVBQXNCLE1BQXRCLEVBQThCLENBQTlCO0FBQ0FQLFdBQVM2QixNQUFULENBQWlCNUIsTUFBTThCLE9BQXZCLEVBQWdDLE1BQWhDOztBQUVBLE1BQUlyRSxVQUFVLENBQWQsRUFDQTtBQUNFc0UsY0FBVSxnQ0FBVjtBQUNBaEMsYUFBUzZCLE1BQVQsQ0FBaUIsQ0FBQzVCLE1BQU04QixPQUFOLENBQWNyRSxNQUFkLENBQUQsQ0FBakIsRUFBMEMsTUFBMUMsRUFBa0QsQ0FBbEQ7QUFDRDs7QUFFRDtBQUNBc0MsV0FBUzZCLE1BQVQsQ0FBaUIsQ0FBQ04sS0FBRCxDQUFqQixFQUEwQixNQUExQixFQUFrQyxDQUFsQzs7QUFFQTtBQUNBWCxZQUFVLElBQVYsQ0ExQ0YsQ0EwQ2tCO0FBQ2hCLHVCQUFVRSxRQUFWLEVBQW9CLENBQXBCLEVBQXVCLElBQUlwRixLQUFLQyxHQUFMLENBQVNpRixTQUFTLElBQVQsR0FBZ0JsRixLQUFLRSxFQUE5QixDQUEzQjs7QUFFQTtBQUNBLG9CQUFPbUYsUUFBUCxFQUFpQkwsSUFBakIsRUFBdUJDLElBQXZCLEVBQTZCLEtBQTdCO0FBRUQ7O0FBRURSLFNBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0M2QixPQUFwQyxHQUE4QyxVQUFDQyxDQUFELEVBQUlwRixDQUFKLEVBQVU7QUFDdER1RCxVQUFRNkIsRUFBRUMsVUFBRixDQUFhQyxPQUFyQjtBQUNELENBRkQ7O0FBS0FqQyxTQUFTQyxjQUFULENBQXdCTCxPQUF4QixFQUFpQ3NDLFdBQWpDLEdBQStDLGFBQUs7QUFDbEQ7QUFDQTdCLE9BQUswQixFQUFFSSxPQUFQO0FBQ0E3QixPQUFLeUIsRUFBRUssT0FBUDtBQUNELENBSkQ7O0FBTUEsU0FBU1AsU0FBVCxDQUFtQlEsSUFBbkIsRUFDQTtBQUNFdEMsT0FBS3VDLFNBQUwsR0FBaUJELElBQWpCO0FBQ0F0QyxPQUFLd0MsS0FBTCxDQUFXQyxPQUFYLEdBQXFCLE9BQXJCO0FBQ0Q7QUFDRCxTQUFTdEIsU0FBVCxHQUNBO0FBQ0VuQixPQUFLd0MsS0FBTCxDQUFXQyxPQUFYLEdBQXFCLE1BQXJCO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBLFNBQVNyQixlQUFULEdBQ0E7QUFDRTtBQUNBLE1BQUl4RSxJQUFJLENBQUMwRCxFQUFELEVBQUtDLEVBQUwsQ0FBUjs7QUFFQTtBQUNBLE9BQUssSUFBSTNFLENBQVQsSUFBY2tGLFNBQWQsRUFDQTtBQUNFLFFBQUlDLEtBQUlELFVBQVVsRixLQUFHLENBQWIsQ0FBUjtBQUNBO0FBQ0EsUUFBSSw0QkFBaUJnQixDQUFqQixFQUFvQm1FLEVBQXBCLENBQUosRUFBNkI7QUFDN0I7QUFDRTtBQUNBVixjQUFNRCxLQUFOO0FBQ0EsZUFBT3hFLENBQVA7QUFDRDtBQUNGO0FBQ0Q7QUFDQXlFLFFBQU16RCxDQUFOO0FBQ0EsU0FBTyxDQUFDLENBQVI7QUFDRCxDOzs7Ozs7Ozs7Ozs7Ozs7QUN4SUQ7Ozs7QUFDQTs7Ozs7O0lBRXFCOEYsSztBQUVuQixtQkFDQTtBQUFBOztBQUNFLFNBQUtiLE9BQUwsR0FBZSxFQUFmO0FBQ0EsU0FBS2MsS0FBTCxHQUFhLElBQWI7O0FBRUE7QUFDQSxTQUFLQyxJQUFMLEdBQVksSUFBWjtBQUNEOzs7O3dCQUVHQyxNLEVBQ0o7QUFDRSxXQUFLaEIsT0FBTCxDQUFhekcsSUFBYixDQUFrQnlILE1BQWxCO0FBQ0Q7OzswQkFFS3pDLEssRUFBT0MsRyxFQUNiO0FBQ0UsV0FBS3NDLEtBQUwsR0FBYSxLQUFLRyxNQUFMLENBQVkxQyxLQUFaLEVBQW1CQyxHQUFuQixDQUFiO0FBQ0EsVUFBSW9CLFFBQVEsS0FBS2tCLEtBQUwsQ0FBV0ksUUFBWCxDQUFvQixDQUFwQixFQUF1QixDQUF2QixDQUFaLENBRkYsQ0FFeUM7O0FBRXZDLFVBQUkxQixRQUFRLEVBQVo7QUFKRjtBQUFBO0FBQUE7O0FBQUE7QUFLRSw2QkFBY0ksS0FBZCw4SEFDQTtBQUFBLGNBRFNDLENBQ1Q7O0FBQ0VMLGdCQUFNakcsSUFBTixDQUFXLEtBQUt3SCxJQUFMLENBQVVuQixLQUFWLENBQWlCQyxDQUFqQixDQUFYO0FBQ0Q7QUFSSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVVFLGFBQU9MLEtBQVA7QUFDRDs7OzBCQUdEO0FBQ0UsYUFBTyxLQUFLdUIsSUFBWjtBQUNEOztBQUVEOzs7OzJCQUNPeEMsSyxFQUFPQyxHLEVBQ2Q7QUFDRSxVQUFJb0IsUUFBUSxFQUFaO0FBQ0EsVUFBSUcsUUFBUSxFQUFaOztBQUVBLFVBQUlvQixJQUFJLHFCQUFSOztBQUVBO0FBQ0EsV0FBS0osSUFBTCxHQUFZLEVBQUVuQixPQUFPLEVBQVQsRUFBYUcsT0FBTyxFQUFwQixFQUFaOztBQUVBO0FBQ0E7QUFDQSxVQUFJcUIsV0FBVyxDQUFmOztBQUVBO0FBQ0F4QixZQUFNckcsSUFBTixDQUFZLEVBQUM4SCxRQUFROUMsS0FBVCxFQUFpQnJFLE9BQU9rSCxVQUF4QixFQUFaLEVBZEYsQ0FjcUQ7QUFDbkR4QixZQUFNckcsSUFBTixDQUFZLEVBQUM4SCxRQUFRN0MsR0FBVCxFQUFpQnRFLE9BQU9rSCxVQUF4QixFQUFaLEVBZkYsQ0FlcUQ7O0FBRW5EO0FBakJGO0FBQUE7QUFBQTs7QUFBQTtBQWtCRSw4QkFBYyxLQUFLcEIsT0FBbkIsbUlBQ0E7QUFBQSxjQURTZCxDQUNUOztBQUNFa0M7O0FBRUEsY0FBSWpCLFVBQUo7QUFDQSxlQUFLQSxJQUFFLENBQVAsRUFBVUEsSUFBRWpCLEVBQUU3RCxNQUFGLEdBQVMsQ0FBckIsRUFBd0I4RSxHQUF4QixFQUNBO0FBQ0VKLGtCQUFNeEcsSUFBTixDQUFXLENBQUMyRixFQUFFaUIsQ0FBRixDQUFELEVBQU9qQixFQUFFaUIsSUFBRSxDQUFKLENBQVAsQ0FBWDs7QUFFQVAsa0JBQU1yRyxJQUFOLENBQVc7QUFDVDhILHNCQUFRbkMsRUFBRWlCLENBQUYsQ0FEQztBQUVUakcscUJBQU9rSDtBQUZFLGFBQVg7QUFLRDtBQUNEO0FBQ0EsY0FBSSxDQUFDRSxPQUFPcEMsRUFBRSxDQUFGLENBQVAsRUFBYUEsRUFBRWlCLENBQUYsQ0FBYixDQUFMLEVBQ0VQLE1BQU1yRyxJQUFOLENBQVc7QUFDVDhILG9CQUFRbkMsRUFBRWlCLENBQUYsQ0FEQztBQUVUakcsbUJBQU9rSDtBQUZFLFdBQVg7QUFJSDs7QUFFRDtBQXpDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQTBDRSxXQUFLLElBQUlySCxDQUFULElBQWM2RixLQUFkLEVBQ0E7QUFDRXVCLFVBQUVJLFNBQUYsQ0FBWUMsT0FBT3pILENBQVAsQ0FBWjs7QUFFQTtBQUNBLGFBQUtnSCxJQUFMLENBQVVuQixLQUFWLENBQWdCckcsSUFBaEIsQ0FBcUJxRyxNQUFNNEIsT0FBT3pILENBQVAsQ0FBTixFQUFpQnNILE1BQXRDO0FBQ0Q7O0FBR0Q7O0FBRUE7O0FBRUEsVUFBSUksS0FBRyxDQUFQOztBQUVBLFdBQUssSUFBSXZJLElBQUUsQ0FBWCxFQUFjQSxJQUFFMEcsTUFBTXZFLE1BQU4sR0FBYSxDQUE3QixFQUFnQ25DLEdBQWhDO0FBQ0UsYUFBSyxJQUFJQyxJQUFFRCxJQUFFLENBQWIsRUFBZ0JDLElBQUV5RyxNQUFNdkUsTUFBeEIsRUFBZ0NsQyxHQUFoQyxFQUNBO0FBQ0ksY0FBSXVJLElBQUk5QixNQUFNMUcsQ0FBTixDQUFSO0FBQ0EsY0FBSXlJLElBQUkvQixNQUFNekcsQ0FBTixDQUFSOztBQUVBO0FBQ0E7QUFDQSxjQUFJdUksRUFBRXhILEtBQUYsSUFBV3lILEVBQUV6SCxLQUFqQixFQUF3Qjs7QUFFeEIsY0FBSTBILFdBQVcsQ0FBQ0YsRUFBRUwsTUFBSCxFQUFXTSxFQUFFTixNQUFiLENBQWY7O0FBRUEsY0FBSVEsY0FBY0QsUUFBZCxFQUF3QjdCLEtBQXhCLENBQUosRUFDQTtBQUNFb0IsY0FBRVcsT0FBRixDQUFVNUksQ0FBVixFQUFhQyxDQUFiLEVBQWdCNEksS0FBS0wsRUFBRUwsTUFBUCxFQUFlTSxFQUFFTixNQUFqQixDQUFoQjs7QUFFQTtBQUNBLGlCQUFLTixJQUFMLENBQVVoQixLQUFWLENBQWdCeEcsSUFBaEIsQ0FBcUIsQ0FBQ21JLEVBQUVMLE1BQUgsRUFBV00sRUFBRU4sTUFBYixDQUFyQjtBQUNEO0FBRUo7QUFwQkgsT0F1QkEsT0FBT0YsQ0FBUDtBQUNEOzs7Ozs7a0JBdEhrQk4sSzs7O0FBNEhyQixTQUFTa0IsSUFBVCxDQUFjekcsQ0FBZCxFQUFpQkMsQ0FBakIsRUFDQTtBQUNFLE1BQUlkLEtBQUtjLEVBQUUsQ0FBRixJQUFPRCxFQUFFLENBQUYsQ0FBaEIsQ0FERixDQUN1QjtBQUNyQixNQUFJWixLQUFLYSxFQUFFLENBQUYsSUFBT0QsRUFBRSxDQUFGLENBQWhCO0FBQ0EsU0FBTzNCLEtBQUtxSSxJQUFMLENBQVd2SCxLQUFHQSxFQUFILEdBQVFDLEtBQUdBLEVBQXRCLENBQVA7QUFFRDs7QUFFRCxTQUFTbUgsYUFBVCxDQUF1QkQsUUFBdkIsRUFBaUM3QixLQUFqQyxFQUNBO0FBQ0U7O0FBRUEsT0FBSyxJQUFJeEMsSUFBRSxDQUFYLEVBQWNBLElBQUV3QyxNQUFNMUUsTUFBdEIsRUFBOEJrQyxHQUE5QixFQUNBO0FBQ0UsUUFBSTRDLElBQUlKLE1BQU14QyxDQUFOLENBQVI7O0FBRUEsUUFBSTBFLE1BQU0sc0JBQVdMLFNBQVMsQ0FBVCxDQUFYLEVBQXdCQSxTQUFTLENBQVQsQ0FBeEIsRUFBcUN6QixFQUFFLENBQUYsQ0FBckMsRUFBMkNBLEVBQUUsQ0FBRixDQUEzQyxDQUFWOztBQUVBO0FBQ0E7QUFDQSxRQUFJOEIsSUFBSTlFLFNBQUosSUFBaUIsQ0FBQzhFLElBQUk3RSxJQUExQixFQUNFLE9BQU8sS0FBUDtBQUVIOztBQUVELFNBQU8sSUFBUDtBQUNEOztBQUdELFNBQVNrRSxNQUFULENBQWdCaEcsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQ0E7QUFDRSxTQUFRRCxFQUFFLENBQUYsS0FBUUMsRUFBRSxDQUFGLENBQVIsSUFBZ0JELEVBQUUsQ0FBRixLQUFRQyxFQUFFLENBQUYsQ0FBaEM7QUFDRCxDOzs7Ozs7Ozs7Ozs7Ozs7OztJQy9Kb0IyRyxLO0FBRW5CLG1CQUNBO0FBQUE7O0FBQ0UsU0FBSzlHLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLMkUsS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLb0MsUUFBTCxHQUFnQixDQUFoQjtBQUNEOzs7OzhCQUVTdEMsQyxFQUNWO0FBQ0UsV0FBS3pFLFFBQUwsQ0FBYzdCLElBQWQsQ0FBbUJzRyxDQUFuQjtBQUNBLFdBQUtFLEtBQUwsQ0FBV0YsQ0FBWCxJQUFnQixFQUFoQjtBQUNEOztBQUVEOzs7OzRCQUNRdUMsRSxFQUFJQyxFLEVBQUlOLEksRUFDaEI7QUFDRSxXQUFLaEMsS0FBTCxDQUFXcUMsRUFBWCxFQUFlN0ksSUFBZixDQUFvQixFQUFDK0ksTUFBS0QsRUFBTixFQUFVTixVQUFWLEVBQXBCO0FBQ0EsV0FBS2hDLEtBQUwsQ0FBV3NDLEVBQVgsRUFBZTlJLElBQWYsQ0FBb0IsRUFBQytJLE1BQUtGLEVBQU4sRUFBVUwsVUFBVixFQUFwQjs7QUFFQSxXQUFLSSxRQUFMO0FBQ0Q7O0FBRUQ7QUFDQTs7Ozs2QkFDUzVELEssRUFBT0MsRyxFQUNoQjtBQUNFLFVBQUkrRCxxQkFBSjtBQUNBLFVBQUlDLE9BQU8sQ0FBQyxDQUFELENBQVg7QUFDQSxVQUFJQyxPQUFPLEVBQVg7QUFDQSxVQUFJQyxZQUFZLEVBQWhCOztBQUVBLFdBQUssSUFBSTNJLElBQUUsQ0FBWCxFQUFjQSxJQUFFLEtBQUtxQixRQUFMLENBQWNDLE1BQTlCLEVBQXNDdEIsR0FBdEMsRUFDQTtBQUNFLFlBQUlBLENBQUosRUFBT3lJLEtBQUt6SSxDQUFMLElBQVV5SCxPQUFPbUIsU0FBakI7QUFDUEQsa0JBQVUzSSxDQUFWLElBQWVBLENBQWY7QUFDQTBJLGFBQUsxSSxDQUFMLElBQVUsSUFBVjtBQUNEOztBQUVEO0FBQ0EsYUFBTyxDQUFDd0ksZUFBZUcsVUFBVUUsS0FBVixFQUFoQixLQUFzQyxJQUE3QyxFQUNBO0FBQ0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSyxJQUFJckYsSUFBRSxDQUFYLEVBQWNBLElBQUUsS0FBS3dDLEtBQUwsQ0FBV3dDLFlBQVgsRUFBeUJsSCxNQUF6QyxFQUFpRGtDLEdBQWpELEVBQ0E7QUFDRTtBQUNBLGNBQUlzRixZQUFZLEtBQUs5QyxLQUFMLENBQVd3QyxZQUFYLEVBQXlCaEYsQ0FBekIsRUFBNEIrRSxJQUE1Qzs7QUFFQTtBQUNBLGNBQUlQLE9BQU8sS0FBS2hDLEtBQUwsQ0FBV3dDLFlBQVgsRUFBeUJoRixDQUF6QixFQUE0QndFLElBQXZDOztBQUVBO0FBQ0EsY0FBSWUsaUJBQWlCTixLQUFLRCxZQUFMLElBQXFCUixJQUExQzs7QUFFQTtBQUNBLGNBQUllLGlCQUFpQk4sS0FBS0ssU0FBTCxDQUFyQixFQUNBO0FBQ0VMLGlCQUFLSyxTQUFMLElBQWtCQyxjQUFsQixDQURGLENBQ29DO0FBQ2xDTCxpQkFBS0ksU0FBTCxJQUFrQk4sWUFBbEIsQ0FGRixDQUVvQztBQUNuQztBQUVGO0FBQ0Y7O0FBRUQsVUFBSXhILElBQUl5RCxHQUFSO0FBQUEsVUFBYXVFLE1BQUssQ0FBQ3ZFLEdBQUQsQ0FBbEI7O0FBRUE7QUFDQSxVQUFJaUUsS0FBSzFILENBQUwsS0FBVyxJQUFmLEVBQ0UsT0FBTyxFQUFQOztBQUVGLFNBQUc7QUFDREEsWUFBSTBILEtBQUsxSCxDQUFMLENBQUo7QUFDQWdJLFlBQUl4SixJQUFKLENBQVN3QixDQUFUO0FBQ0QsT0FIRCxRQUdRQSxLQUFLd0QsS0FIYjs7QUFLQSxhQUFPd0UsSUFBSUMsT0FBSixFQUFQO0FBRUQ7Ozs7OztrQkFuRmtCZCxLOzs7Ozs7Ozs7Ozs7Ozs7OztJQ0NBZSxRO0FBRW5CLG9CQUFZakYsT0FBWixFQUNBO0FBQUE7O0FBQ0UsU0FBS0EsT0FBTCxHQUFlSSxTQUFTQyxjQUFULENBQXdCTCxPQUF4QixDQUFmO0FBQ0EsU0FBS2tGLE9BQUwsR0FBZSxLQUFLbEYsT0FBTCxDQUFhbUYsVUFBYixDQUF3QixJQUF4QixDQUFmO0FBQ0Q7Ozs7NEJBR0Q7QUFDRSxXQUFLRCxPQUFMLENBQWFFLFNBQWIsQ0FBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsS0FBS3BGLE9BQUwsQ0FBYXFGLEtBQTFDLEVBQWlELEtBQUtyRixPQUFMLENBQWFzRixNQUE5RDtBQUNEOzs7MkJBRU10RCxPLEVBQ1A7QUFBQSxVQURnQnVELE1BQ2hCLHVFQUR5QixNQUN6QjtBQUFBLFVBRGlDRixLQUNqQyx1RUFEeUMsQ0FDekM7O0FBQ0UsVUFBSSxDQUFDM0YsTUFBTUMsT0FBTixDQUFjcUMsT0FBZCxDQUFMLEVBQTZCOztBQUU3QjtBQUNBLFVBQUksQ0FBQ3RDLE1BQU1DLE9BQU4sQ0FBY3FDLFFBQVEsQ0FBUixDQUFkLENBQUwsRUFDQTtBQUNFLFlBQU1uRixJQUFJbUYsT0FBVjtBQUNBLGFBQUtrRCxPQUFMLENBQWFNLFNBQWI7QUFDQSxhQUFLTixPQUFMLENBQWFPLEdBQWIsQ0FBaUI1SSxFQUFFLENBQUYsS0FBTSxDQUF2QixFQUEwQkEsRUFBRSxDQUFGLEtBQU0sQ0FBaEMsRUFBbUN3SSxLQUFuQyxFQUEwQyxDQUExQyxFQUE2QyxJQUFJMUosS0FBS0UsRUFBdEQsRUFBMEQsS0FBMUQ7QUFDQSxhQUFLcUosT0FBTCxDQUFhUSxTQUFiLEdBQXlCSCxNQUF6QjtBQUNBLGFBQUtMLE9BQUwsQ0FBYVMsSUFBYjtBQUNELE9BUEQsTUFPTztBQUNQOztBQURPO0FBQUE7QUFBQTs7QUFBQTtBQUdMLCtCQUFjM0QsT0FBZCw4SEFDQTtBQUFBLGdCQURTZCxDQUNUOztBQUNFLGlCQUFLLElBQUlpQixJQUFFLENBQVgsRUFBY0EsSUFBRWpCLEVBQUU3RCxNQUFGLEdBQVMsQ0FBekIsRUFBNEI4RSxHQUE1QixFQUNBO0FBQ0UsbUJBQUt5RCxLQUFMLENBQVcxRSxFQUFFaUIsQ0FBRixDQUFYLEVBQWlCakIsRUFBRWlCLElBQUUsQ0FBSixDQUFqQixFQUF5Qm9ELE1BQXpCLEVBQWlDRixLQUFqQztBQUNEO0FBQ0Y7QUFUSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV047QUFFRjs7OzBCQUVLL0gsQyxFQUFHQyxDLEVBQUdSLEMsRUFBRzhJLEMsRUFDZjtBQUNFLFdBQUtYLE9BQUwsQ0FBYVksU0FBYixHQUF5QkQsQ0FBekI7QUFDQSxXQUFLWCxPQUFMLENBQWFhLFdBQWIsR0FBMkJoSixLQUFLLE9BQWhDO0FBQ0EsV0FBS21JLE9BQUwsQ0FBYU0sU0FBYjtBQUNBLFdBQUtOLE9BQUwsQ0FBYWMsTUFBYixDQUFvQjFJLEVBQUUsQ0FBRixLQUFNLENBQTFCLEVBQTRCQSxFQUFFLENBQUYsS0FBTSxDQUFsQztBQUNBLFdBQUs0SCxPQUFMLENBQWFlLE1BQWIsQ0FBb0IxSSxFQUFFLENBQUYsS0FBTSxDQUExQixFQUE0QkEsRUFBRSxDQUFGLEtBQU0sQ0FBbEM7QUFDQSxXQUFLMkgsT0FBTCxDQUFhZ0IsTUFBYjtBQUNEOzs7Ozs7a0JBaERrQmpCLFEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWE3MjU1OTFmMzE3ZjgyMjczNWUiLCJcblxuZnVuY3Rpb24gU3F1YXJlKHgsIHksIHNpemUpXG57XG4gIGxldCBoc2l6ZSA9IHNpemU+PjE7XG4gIGxldCBzcSA9IFtdO1xuICAvLyBvciBqdXN0IG1ha2UgYSB1bml0IHNxdWFyZSBhbmQgc2NhbGUgaXQgdXAgZHVoIDp8XG4gIC8vIHRvcCBsZWZ0XG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgLSBoc2l6ZV0gKTtcbiAgLy8gdG9wIHJpZ2h0XG4gIHNxLnB1c2goIFt4ICsgaHNpemUsIHkgLSBoc2l6ZV0gKTtcbiAgLy8gYm90dG9tIHJpZ2h0XG4gIHNxLnB1c2goIFt4ICsgaHNpemUsIHkgKyBoc2l6ZV0gKTtcbiAgLy8gYm90dG9tIGxlZnRcbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSArIGhzaXplXSApO1xuICAvLyB0b3AgbGVmdCBhZ2FpblxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5IC0gaHNpemVdICk7XG5cbiAgcmV0dXJuIHNxO1xufVxuXG4vLyBlcXVpbGF0ZXJhbFxuZnVuY3Rpb24gVHJpYW5nbGUoeCwgeSwgc2l6ZSlcbntcbiAgbGV0IGFuZ2xlID0gMDtcbiAgbGV0IHIgPSAoc2l6ZS8yLjApL01hdGguc2luKE1hdGguUEkqNjAvMTgwKTtcbiAgbGV0IHRyaSA9IFtdO1xuXG4gIGZvcihsZXQgaT0wOyBpPD0zOyBpKyspXG4gIHtcbiAgICB0cmkucHVzaChbXG4gICAgICB4ICsgciAqIE1hdGguY29zKGFuZ2xlICsgKGkgJSAzKSAqIDIgKiBNYXRoLlBJLzMpLFxuICAgICAgeSArIHIgKiBNYXRoLnNpbihhbmdsZSArIChpICUgMykgKiAyICogTWF0aC5QSS8zKVxuICAgIF0pO1xuICB9XG5cbiAgcmV0dXJuIHRyaTtcbn1cblxuZnVuY3Rpb24gcm90YXRlKHNoYXBlLCByeCwgcnksIGRhKVxue1xuICBmb3IgKGxldCBwYWlyIG9mIHNoYXBlKVxuICAgIHBhaXIgPSByb3RhdGVfcG9pbnQocngsIHJ5LCBkYSwgcGFpcik7XG59XG5cbmZ1bmN0aW9uIHRyYW5zbGF0ZShzaGFwZSwgZHgsIGR5KVxue1xuICBmb3IgKGxldCBwYWlyIG9mIHNoYXBlKVxuICB7XG4gICAgcGFpclswXSArPSBkeDtcbiAgICBwYWlyWzFdICs9IGR5O1xuICB9XG59XG5cbmZ1bmN0aW9uIHJvdGF0ZV9wb2ludChjeCwgY3ksIGFuZ2xlLCBwKVxue1xuICBsZXQgcyA9IE1hdGguc2luKGFuZ2xlKTtcbiAgbGV0IGMgPSBNYXRoLmNvcyhhbmdsZSk7XG5cbiAgLy8gdHJhbnNsYXRlIHBvaW50IGJhY2sgdG8gb3JpZ2luOlxuICBwWzBdIC09IGN4O1xuICBwWzFdIC09IGN5O1xuXG4gIC8vIHJvdGF0ZSBwb2ludFxuICBsZXQgeG5ldyA9IHBbMF0gKiBjIC0gcFsxXSAqIHM7XG4gIGxldCB5bmV3ID0gcFswXSAqIHMgKyBwWzFdICogYztcblxuICAvLyB0cmFuc2xhdGUgcG9pbnQgYmFjazpcbiAgcFswXSA9IHhuZXcgKyBjeDtcbiAgcFsxXSA9IHluZXcgKyBjeTtcblxuICByZXR1cm4gcDtcbn1cblxuXG5mdW5jdGlvbiBwb2ludF9pbl9wb2x5Z29uKHBvaW50LCB2ZXJ0aWNlcylcbntcbiAgZm9yIChsZXQgaT0wOyBpPHZlcnRpY2VzLmxlbmd0aC0xOyBpKyspXG4gIHtcbiAgICBsZXQgYSA9IHZlcnRpY2VzW2ldO1xuICAgIGxldCBiID0gdmVydGljZXNbaSsxXTtcblxuICAgIGxldCBzZWcgPSBzdWJ0cmFjdFBvaW50cyhiLCBhKTtcbiAgICBsZXQgcHQgPSBzdWJ0cmFjdFBvaW50cyhwb2ludCwgYSk7XG4gICAgbGV0IGluc2lkZSA9IChjcm9zc1Byb2R1Y3Qoc2VnLCBwdCkgPiAwKTtcbiAgICAvLyBjb25zb2xlLmxvZyhpbnNpZGUpO1xuICAgIGlmICghaW5zaWRlKSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG4vKipcbiAqIEBhdXRob3IgUGV0ZXIgS2VsbGV5XG4gKiBAYXV0aG9yIHBna2VsbGV5NEBnbWFpbC5jb21cbiAqL1xuLyoqXG4gKiBTZWUgaWYgdHdvIGxpbmUgc2VnbWVudHMgaW50ZXJzZWN0LiBUaGlzIHVzZXMgdGhlXG4gKiB2ZWN0b3IgY3Jvc3MgcHJvZHVjdCBhcHByb2FjaCBkZXNjcmliZWQgYmVsb3c6XG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NjUyODIvNzg2MzM5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHAgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgc3RhcnQgb2YgdGhlIDFzdCBsaW5lLlxuICogQHBhcmFtIHtPYmplY3R9IHAyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIGVuZCBvZiB0aGUgMXN0IGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBzdGFydCBvZiB0aGUgMm5kIGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcTIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgZW5kIG9mIHRoZSAybmQgbGluZS5cbiAqL1xuXG5mdW5jdGlvbiBpbnRlcnNlY3RzKGFwLCBhcDIsIGFxLCBhcTIpXG57XG4gIC8vIEFNOiBOb3RlIHRvIGRldmVsb3BlcnMsIHBsZWFzZSBkb24ndCB1c2UgbmFtZWQgcHJvcGVydGllcyBmb3IgdmVjdG9yc1xuICAvLyAgICAgSXQncyBkYWZ0LiBVc2UgYXJyYXlzLlxuICByZXR1cm4gZG9MaW5lU2VnbWVudHNJbnRlcnNlY3QoIHt4OiBhcFswXSwgeTogYXBbMV19LCB7eDogYXAyWzBdLCB5OiBhcDJbMV19LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt4OiBhcVswXSwgeTogYXFbMV19LCB7eDogYXEyWzBdLCB5OiBhcTJbMV19ICk7XG59XG5cbmZ1bmN0aW9uIGlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrKHAsIHAyLCBxLCBxMilcbntcbiAgdmFyIGJveDEgPSB7XG4gICAgeG1pbjogTWF0aC5taW4ocC54LCBwMi54KSxcbiAgICB5bWluOiBNYXRoLm1pbihwLnksIHAyLnkpLFxuICAgIHhtYXg6IE1hdGgubWF4KHAueCwgcDIueCksXG4gICAgeW1heDogTWF0aC5tYXgocC55LCBwMi55KVxuICB9O1xuXG4gIHZhciBib3gyID0ge1xuICAgIHhtaW46IE1hdGgubWluKHEueCwgcTIueCksXG4gICAgeW1pbjogTWF0aC5taW4ocS55LCBxMi55KSxcbiAgICB4bWF4OiBNYXRoLm1heChxLngsIHEyLngpLFxuICAgIHltYXg6IE1hdGgubWF4KHEueSwgcTIueSlcbiAgfTtcblxuICByZXR1cm4gYmJveF9jb250YWluZWQoYm94MSwgYm94MikgfHwgYmJveF9jb250YWluZWQoYm94MiwgYm94MSk7XG59XG5cbmZ1bmN0aW9uIGJib3hfY29udGFpbmVkKGEsIGIpXG57XG4gIC8vIElzIEJveCBCIGNvbXBsZXRlbHkgaW5zaWRlIGJveCBBID9cbiAgcmV0dXJuIChiLnhtaW4gPj0gYS54bWluICYmIGIueG1heCA8PSBhLnhtYXgpICYmIChiLnltaW4gPj0gYS55bWluICYmIGIueW1heCA8PSBhLnltYXgpO1xufVxuXG5cbmZ1bmN0aW9uIGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0KHAsIHAyLCBxLCBxMilcbntcbiAgLy8gdmFyIGRlYnVnX3N0cmluZyA9IGBkb0xpbmVTZWdtZW50c0ludGVyc2VjdDogKCR7cC54fSwgJHtwLnl9KS0oJHtwMi54fSwgJHtwMi55fSkgIHdpdGggICgke3EueH0sICR7cS55fSktKCR7cTIueH0sICR7cTIueX0pYDtcblxuXHR2YXIgciA9IHN1YnRyYWN0UG9pbnRzKHAyLCBwKTtcblx0dmFyIHMgPSBzdWJ0cmFjdFBvaW50cyhxMiwgcSk7XG5cblx0dmFyIHVOdW1lcmF0b3IgPSBjcm9zc1Byb2R1Y3Qoc3VidHJhY3RQb2ludHMocSwgcCksIHIpO1xuXHR2YXIgZGVub21pbmF0b3IgPSBjcm9zc1Byb2R1Y3Qociwgcyk7XG5cblx0aWYgKHVOdW1lcmF0b3IgPT0gMCAmJiBkZW5vbWluYXRvciA9PSAwKSB7XG5cdFx0Ly8gVGhleSBhcmUgY29MbGluZWFyXG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvcGxhbmFyXCIpO1xuXG5cdFx0Ly8gRG8gdGhleSB0b3VjaD8gKEFyZSBhbnkgb2YgdGhlIHBvaW50cyBlcXVhbD8pXG5cdFx0aWYgKGVxdWFsUG9pbnRzKHAsIHEpIHx8IGVxdWFsUG9pbnRzKHAsIHEyKSB8fCBlcXVhbFBvaW50cyhwMiwgcSkgfHwgZXF1YWxQb2ludHMocDIsIHEyKSkge1xuXHRcdFx0cmV0dXJuIHtcbiAgICAgICAgaW50ZXJzZWN0OiB0cnVlLFxuICAgICAgICBraXNzOiAhaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsocCwgcDIsIHEsIHEyKVxuICAgICAgfTtcblxuXHRcdH1cblx0XHQvLyBEbyB0aGV5IG92ZXJsYXA/IChBcmUgYWxsIHRoZSBwb2ludCBkaWZmZXJlbmNlcyBpbiBlaXRoZXIgZGlyZWN0aW9uIHRoZSBzYW1lIHNpZ24pXG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIlBvaW50cyBET05UIHRvdWNoXCIpO1xuXG5cdFx0cmV0dXJuIHtcbiAgICAgIGludGVyc2VjdDpcbiAgICAgICAgICAgICFhbGxFcXVhbChcbiAgICAgIFx0XHRcdFx0KHEueCAtIHAueCA8IDApLFxuICAgICAgXHRcdFx0XHQocS54IC0gcDIueCA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueCAtIHAueCA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueCAtIHAyLnggPCAwKSkgfHxcbiAgICAgIFx0XHRcdCFhbGxFcXVhbChcbiAgICAgIFx0XHRcdFx0KHEueSAtIHAueSA8IDApLFxuICAgICAgXHRcdFx0XHQocS55IC0gcDIueSA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueSAtIHAueSA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueSAtIHAyLnkgPCAwKSksXG4gICAgICAgIGtpc3M6IGZhbHNlXG4gICAgICB9O1xuXG5cdH1cblxuXHRpZiAoZGVub21pbmF0b3IgPT0gMCkge1xuXHRcdC8vIGxpbmVzIGFyZSBwYXJhbGVsbFxuXHRcdHJldHVybiB7aW50ZXJzZWN0OiBmYWxzZSwga2lzczogZmFsc2V9O1xuXHR9XG5cblx0dmFyIHUgPSB1TnVtZXJhdG9yIC8gZGVub21pbmF0b3I7XG5cdHZhciB0ID0gY3Jvc3NQcm9kdWN0KHN1YnRyYWN0UG9pbnRzKHEsIHApLCBzKSAvIGRlbm9taW5hdG9yO1xuXG4gIC8vIGNvbnNvbGUubG9nKGB0PSR7dH0sIHU9JHt1fWApO1xuICB2YXIga2lzcyA9IGZhbHNlO1xuXG4gIGlmIChlcXVhbFBvaW50cyhwLCBxKSB8fCBlcXVhbFBvaW50cyhwLCBxMikgfHwgZXF1YWxQb2ludHMocDIsIHEpIHx8IGVxdWFsUG9pbnRzKHAyLCBxMikpXG4gICAga2lzcyA9IHRydWU7XG5cbiAgLy8gbGV0IHJlcyA9XG4gIC8vcmV0dXJuXG4gIHJldHVybiB7XG4gICAgaW50ZXJzZWN0OiAodCA+PSAwKSAmJiAodCA8PSAxKSAmJiAodSA+PSAwKSAmJiAodSA8PSAxKSxcbiAgICBraXNzOiBraXNzXG4gIH07XG5cbiAgLy8gY29uc29sZS5sb2coYCR7ZGVidWdfc3RyaW5nfSA9ICR7cmVzfWApO1xuXG5cdC8vIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHRoZSB0d28gcG9pbnRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiB0aGUgY3Jvc3MgcHJvZHVjdCByZXN1bHQgYXMgYSBmbG9hdFxuICovXG5mdW5jdGlvbiBjcm9zc1Byb2R1Y3QocG9pbnQxLCBwb2ludDIpIHtcblxuICBpZiAoQXJyYXkuaXNBcnJheShwb2ludDEpKVxuICAgIHJldHVybiBwb2ludDFbMF0gKiBwb2ludDJbMV0gLSBwb2ludDFbMV0gKiBwb2ludDJbMF07XG4gIGVsc2Vcblx0ICAgcmV0dXJuIHBvaW50MS54ICogcG9pbnQyLnkgLSBwb2ludDEueSAqIHBvaW50Mi54O1xufVxuXG4vKipcbiAqIFN1YnRyYWN0IHRoZSBzZWNvbmQgcG9pbnQgZnJvbSB0aGUgZmlyc3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIHRoZSBzdWJ0cmFjdGlvbiByZXN1bHQgYXMgYSBwb2ludCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gc3VidHJhY3RQb2ludHMocG9pbnQxLCBwb2ludDIpIHtcblxuICBpZiAoQXJyYXkuaXNBcnJheShwb2ludDEpKVxuICB7XG4gICAgcmV0dXJuIFsgcG9pbnQxWzBdIC0gcG9pbnQyWzBdLCBwb2ludDFbMV0gLSBwb2ludDJbMV0gXTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgcmVzdWx0LnggPSBwb2ludDEueCAtIHBvaW50Mi54O1xuICAgIHJlc3VsdC55ID0gcG9pbnQxLnkgLSBwb2ludDIueTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTZWUgaWYgdGhlIHBvaW50cyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIGlmIHRoZSBwb2ludHMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGVxdWFsUG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XG5cdHJldHVybiAocG9pbnQxLnggPT0gcG9pbnQyLngpICYmIChwb2ludDEueSA9PSBwb2ludDIueSlcbn1cblxuLyoqXG4gKiBTZWUgaWYgYWxsIGFyZ3VtZW50cyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHsuLi59IGFyZ3MgYXJndW1lbnRzIHRoYXQgd2lsbCBiZSBjb21wYXJlZCBieSAnPT0nLlxuICpcbiAqIEByZXR1cm4gaWYgYWxsIGFyZ3VtZW50cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gYWxsRXF1YWwoYXJncykge1xuXHR2YXIgZmlyc3RWYWx1ZSA9IGFyZ3VtZW50c1swXSxcblx0XHRpO1xuXHRmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKGFyZ3VtZW50c1tpXSAhPSBmaXJzdFZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0cnVlO1xufVxuXG5cblxuZXhwb3J0IHtTcXVhcmUsIFRyaWFuZ2xlLCBpbnRlcnNlY3RzLCByb3RhdGUsIHRyYW5zbGF0ZSwgcG9pbnRfaW5fcG9seWdvbn0gO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1V0aWwuanMiLCJcbmltcG9ydCBTY2VuZSAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1NjZW5lJztcbmltcG9ydCBSZW5kZXJlciAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCB7U3F1YXJlLCByb3RhdGUsIHRyYW5zbGF0ZX0gICAgICBmcm9tICcuL1V0aWwnO1xuaW1wb3J0IHtwb2ludF9pbl9wb2x5Z29uLCBUcmlhbmdsZX0gICAgIGZyb20gJy4vVXRpbCc7XG5cbmNvbnN0IGVsZW1lbnQgPSAnZGlzcGxheSc7XG5cbmxldCByZW5kZXJlciA9IG5ldyBSZW5kZXJlcihlbGVtZW50KTtcbmxldCBzY2VuZSA9IG5ldyBTY2VuZSgpO1xubGV0IGluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5mb1RleHQnKTtcblxuLy8gU2hvdy9oaWRlIHRoZSBzY2VuZSBncmFwaFxubGV0IGRlYnVnID0gdHJ1ZTtcblxuLy8gU3RhcnQgcG9pbnQgYW5kIG91ciBnb2FsXG5sZXQgc3RhcnQgPSBbMTAsIDEwXTtcbmxldCBlbmQgPSBbMzgwLCA0MjBdO1xubGV0IG14ID0gZW5kWzBdLCBteSA9IFsxXTtcblxuLy8gRm9yIHRoZSBzaGFwZSBhbmltYXRpb25zXG5sZXQgcm90eCA9IDMwMCwgcm90eSA9IDM1MDtcbmxldCBtb3Rpb24gPSAwLCByb3RhID0gMDtcblxuLy8gQ3JlYXRlIHNvbWUgZHluYW1pYyBvYnN0YWNsZXNcbmxldCBzcV9zbWFsbCA9IFNxdWFyZSg2MDAsIDEwMCwgMTAwKTtcbmxldCBzcV9sYXJnZSA9IFRyaWFuZ2xlKHJvdHgsIHJvdHksIDQwMCk7XG5cbmxldCBvYnN0YWNsZXMgPSBbXG4gIC8vIER5bmFtaWNcbiAgLy9zcV9zbWFsbCxcbiAgc3FfbGFyZ2UsXG4gIC8vIFN0YXRpY1xuICAvL1NxdWFyZSg2MCwgMjUwLCA1MCksIFNxdWFyZSgxMiwxMiwgMiksIFNxdWFyZSg2MjAsIDQwMCwgMTAwKSxcblxuXTtcblxuLy8gQWRkIHRoZW0gYWxsIHRvIHRoZSBzY2VuZVxuZm9yIChsZXQgbyBvZiBvYnN0YWNsZXMpXG4gIHNjZW5lLmFkZCggbyApO1xuXG5mcmFtZSgpO1xuXG5mdW5jdGlvbiBmcmFtZSgpXG57XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSggZnJhbWUgKTtcblxuICBoaWRlX2luZm8oKTtcblxuICBsZXQgaW5zaWRlID0gZG9kZ2VfbnVsbHNwYWNlKCk7XG5cbiAgLy8gRmluZCB0aGUgc2hvcnRlc3QgcGF0aC4gVHdvIHRoaW5ncyBoYXBwZW4gaGVyZTpcbiAgLy8gICAgMS4gQSBTY2VuZSBncmFwaCBpcyBleHRyYWN0ZWQgZnJvbSBvdXIgc2NlbmUgZ2VvbWV0cnlcbiAgLy8gICAgMi4gRGlqa3N0cmEncyBtZXRob2QgaXMgdXNlZCB0byBmaW5kIHRoZSBvcHRpbWFsIHJvdXRlIGFjcm9zcyB0aGUgZ3JhcGhcbiAgbGV0IHJvdXRlID0gc2NlbmUuc29sdmUoIHN0YXJ0LCBlbmQgKTtcblxuICAvLyBHZXQgYSB2aXN1YWxpc2F0aW9uIG9mIHRoZSBhY3R1YWwgc2NlbmVncmFwaFxuICBsZXQgdmlzID0gc2NlbmUudmlzKCk7XG5cbiAgcmVuZGVyZXIuY2xlYXIoKTtcblxuICBpZiAoZGVidWcpXG4gIHtcbiAgICAvLyBEcmF3IHRoZSBzY2VuZSBncmFwaCBub2Rlc1xuICAgIGZvciAobGV0IG4gb2YgdmlzLm5vZGVzKVxuICAgICAgcmVuZGVyZXIucmVuZGVyKCBuLCAnI2JiYicsIDUgKTtcblxuICAgIC8vIERyYXcgdGhlIGdyYXBoIGVkZ2VzXG4gICAgcmVuZGVyZXIucmVuZGVyKCB2aXMuZWRnZXMsICcjZWVlJyApO1xuICB9XG5cbiAgLy8gLy8gUmVuZGVyIHRoZSBvcmlnaW5hbCBzY2VuZSBnZW9tZXRyeSBvbiB0b3Agb2YgdGhlIGdyYXBoXG4gIHJlbmRlcmVyLnJlbmRlciggc3RhcnQsICcjMGEwJywgNiApO1xuICByZW5kZXJlci5yZW5kZXIoIGVuZCwgJyMwYTAnLCA2ICk7XG4gIHJlbmRlcmVyLnJlbmRlciggc2NlbmUub2JqZWN0cywgJyMzMzMnICk7XG5cbiAgaWYgKGluc2lkZSA+PSAwKVxuICB7XG4gICAgc2hvd19pbmZvKFwiRW5kIHBvaW50IGluc2lkZSBzb2xpZCBvYmplY3QhXCIpXG4gICAgcmVuZGVyZXIucmVuZGVyKCBbc2NlbmUub2JqZWN0c1tpbnNpZGVdXSwgJyNmMDAnLCA1ICk7XG4gIH1cblxuICAvLyBOb3cgZGlzcGxheSB0aGUgZm91bmQgcm91dGUhXG4gIHJlbmRlcmVyLnJlbmRlciggW3JvdXRlXSwgJyMwMGYnLCAzICk7XG5cbiAgLy8gQW5pbWF0aW9uXG4gIG1vdGlvbiArPSAwLjA1OyAvLyBTaW51c29pZGFsXG4gIHRyYW5zbGF0ZShzcV9zbWFsbCwgMCwgMyAqIE1hdGguc2luKG1vdGlvbiAqIDAuMjUgKiBNYXRoLlBJKSk7XG5cbiAgLy8gcm90YXRlIHRoZSBiaWcgc3F1YXJlXG4gIHJvdGF0ZShzcV9sYXJnZSwgcm90eCwgcm90eSwgMC4wMDUpO1xuXG59XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYl9kZWJ1ZycpLm9uY2xpY2sgPSAoZSwgYykgPT4ge1xuICBkZWJ1ZyA9IGUuc3JjRWxlbWVudC5jaGVja2VkO1xufVxuXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpLm9ubW91c2Vtb3ZlID0gZSA9PiB7XG4gIC8vIFNhdmUgdGhlIGxhc3Qga25vd24gbW91c2UgcG9zaXRpb25cbiAgbXggPSBlLmNsaWVudFg7XG4gIG15ID0gZS5jbGllbnRZO1xufVxuXG5mdW5jdGlvbiBzaG93X2luZm8odGV4dClcbntcbiAgaW5mby5pbm5lckhUTUwgPSB0ZXh0O1xuICBpbmZvLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufVxuZnVuY3Rpb24gaGlkZV9pbmZvKClcbntcbiAgaW5mby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufVxuXG4vLyBUaGlzIHByZXZlbnRzIGEgYml0IG9mIGEgbWVzcyBmcm9tIGhhcHBlbmluZ1xuLy8gd2hlbiB0aGUgbW91c2UgY3Vyc29yIGRyaWZ0cyAqaW5zaWRlKiBhIHN1cHBvc2VkbHkgc29saWQgc2hhcGVcbmZ1bmN0aW9uIGRvZGdlX251bGxzcGFjZSgpXG57XG4gIC8vIE91ciB0ZW50YXRpdmUgbmV3IGNvb3JkaW5hdGUgKGxhc3Qga25vd24gbW91c2UgcG9zKVxuICBsZXQgYyA9IFtteCwgbXldO1xuXG4gIC8vIENoZWNrIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIGVhY2ggb2Ygb3VyIHNvbGlkIHNoYXBlc1xuICBmb3IgKGxldCBpIGluIG9ic3RhY2xlcylcbiAge1xuICAgIGxldCBvID0gb2JzdGFjbGVzW2k+PjBdO1xuICAgIC8vIE9oIG5vIVxuICAgIGlmIChwb2ludF9pbl9wb2x5Z29uKGMsIG8pKSAgLy8gc2ltcGxlIGNvbnZleC1vbmx5IHRlc3RcbiAgICB7XG4gICAgICAvLyBTZXQgdGhlIGVuZHBvaW50IHRvIHRoZSBzdGFydCB0byByZW1vdmUgdGhlIHJlZCBsaW5lIGFuZCBjdXJzb3JcbiAgICAgIGVuZCA9IHN0YXJ0O1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIC8vIEFsbCBnb29kLCBzZXQgdGhlIGVuZHBvaW50IHRvIHRoZSBsYXN0IGtub3duIG1vdXNlIHBvc1xuICBlbmQgPSBjO1xuICByZXR1cm4gLTE7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuaW1wb3J0IEdyYXBoICAgICAgICAgIGZyb20gJy4vR3JhcGgnO1xuaW1wb3J0IHtpbnRlcnNlY3RzfSAgIGZyb20gJy4vVXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHRoaXMub2JqZWN0cyA9IFtdO1xuICAgIHRoaXMuZ3JhcGggPSBudWxsO1xuXG4gICAgLy8gVGhpcyBpcyBqdXN0IGZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICB0aGlzLl92aXMgPSBudWxsO1xuICB9XG5cbiAgYWRkKG9iamVjdClcbiAge1xuICAgIHRoaXMub2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gIH1cblxuICBzb2x2ZShzdGFydCwgZW5kKVxuICB7XG4gICAgdGhpcy5ncmFwaCA9IHRoaXMuX2dyYXBoKHN0YXJ0LCBlbmQpO1xuICAgIGxldCBub2RlcyA9IHRoaXMuZ3JhcGguc2hvcnRlc3QoMCwgMSk7IC8vIFswXSBzdGFydCwgWzFdIGVuZCAoc2VlIC5ncmFwaCgpKVxuXG4gICAgbGV0IHJvdXRlID0gW107XG4gICAgZm9yIChsZXQgbiBvZiBub2RlcylcbiAgICB7XG4gICAgICByb3V0ZS5wdXNoKHRoaXMuX3Zpcy5ub2Rlc1sgbiBdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm91dGU7XG4gIH1cblxuICB2aXMoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpcztcbiAgfVxuXG4gIC8vIEV4dHJhY3QgYSBzY2VuZWdyYXBoIGZyb20gb3VyIGNvbnRpbnVvdXMgZXVjbGlkZWFuIGdlb21ldHJ5XG4gIF9ncmFwaChzdGFydCwgZW5kKVxuICB7XG4gICAgbGV0IG5vZGVzID0gW107XG4gICAgbGV0IGVkZ2VzID0gW107XG5cbiAgICBsZXQgZyA9IG5ldyBHcmFwaCgpO1xuXG4gICAgLy8gRm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaFxuICAgIHRoaXMuX3ZpcyA9IHsgbm9kZXM6IFtdLCBlZGdlczogW10gfTtcblxuICAgIC8vIFRoaXMgaXMganVzdCBhIHRlbXAgdmFsdWUgdXNlZCB0byBtYWtlIHN1cmUgc2hhcGVzIGRvbid0IHBlcmZvcm1cbiAgICAvLyBpbnRlcnNlY3Rpb24gdGVzdHMgb24gdGhlbXNlbHZlcyAoYWNyb3NzIHRoZWlyIG93biB2ZXJ0aWNlcylcbiAgICBsZXQgc2hhcGVfaWQgPSAxO1xuXG4gICAgLy8gVGhlc2UgZmlyc3QgdHdvIG5vZGVzIGluIHRoZSBncmFwaCBhcmUgYSBzcGVjaWFsIGNhc2VcbiAgICBub2Rlcy5wdXNoKCB7dmVydGV4OiBzdGFydCwgIHNoYXBlOiBzaGFwZV9pZCsrfSApOyAvLyBbMF0gc3RhcnQgKHNlZSAuc29sdmUoKSlcbiAgICBub2Rlcy5wdXNoKCB7dmVydGV4OiBlbmQsICAgIHNoYXBlOiBzaGFwZV9pZCsrfSApOyAvLyBbMV0gZW5kXG5cbiAgICAvLyBleHRyYWN0IGVhY2ggb2JzdGFjbGUncyBlZGdlcyBhbmQgbm9kZXNcbiAgICBmb3IgKGxldCBvIG9mIHRoaXMub2JqZWN0cylcbiAgICB7XG4gICAgICBzaGFwZV9pZCsrO1xuXG4gICAgICBsZXQgZTtcbiAgICAgIGZvciAoZT0wOyBlPG8ubGVuZ3RoLTE7IGUrKylcbiAgICAgIHtcbiAgICAgICAgZWRnZXMucHVzaChbb1tlXSwgb1tlKzFdXSk7XG5cbiAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgdmVydGV4OiBvW2VdLFxuICAgICAgICAgIHNoYXBlOiBzaGFwZV9pZFxuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgICAgLy8gdGhpcyBpc24ndCBhIGNsb3NlZCByaW5nIChtYXRjaGluZyBzdGFydCBhbmQgZW5kcClcbiAgICAgIGlmICghZXF1YWxzKG9bMF0sIG9bZV0pKVxuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB2ZXJ0ZXg6IG9bZV0sXG4gICAgICAgICAgc2hhcGU6IHNoYXBlX2lkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCBgbm9kZXNgIGluZGljZXMgdG8gZ3JhcGhcbiAgICBmb3IgKGxldCBpIGluIG5vZGVzKVxuICAgIHtcbiAgICAgIGcuYWRkdmVydGV4KE51bWJlcihpKSk7XG5cbiAgICAgIC8vIEZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICAgIHRoaXMuX3Zpcy5ub2Rlcy5wdXNoKG5vZGVzW051bWJlcihpKV0udmVydGV4KTtcbiAgICB9XG5cblxuICAgIC8vIEFkZCBvYnN0YWNsZXMnIHBlcm1pbWV0ZXIgZWRnZXMgdG8gdGhlIGdyYXBoXG5cbiAgICAvLyBnLmFkZGVkZ2UoKTogcGVyaW1ldGVyIG9mIGFsbCBvYnN0YWNsZXNcblxuICAgIGxldCBuZT0wO1xuXG4gICAgZm9yIChsZXQgeD0wOyB4PG5vZGVzLmxlbmd0aC0xOyB4KyspXG4gICAgICBmb3IgKGxldCB5PXgrMTsgeTxub2Rlcy5sZW5ndGg7IHkrKylcbiAgICAgIHtcbiAgICAgICAgICBsZXQgQSA9IG5vZGVzW3hdO1xuICAgICAgICAgIGxldCBCID0gbm9kZXNbeV07XG5cbiAgICAgICAgICAvLyBXZSdyZSB0ZXN0aW5nIHRoZSBzaGFwZSdzIHZlcnRpY2VzIGFnYWluc3QgaXRzZWxmXG4gICAgICAgICAgLy8gd2hpY2ggbGVhZHMgdG8gaW50ZXJuYWwgcGF0aHMgaW5zaWRlIHRoZSBzaGFwZSAoaW52YWxpZCEpXG4gICAgICAgICAgaWYgKEEuc2hhcGUgPT0gQi5zaGFwZSkgY29udGludWU7XG5cbiAgICAgICAgICBsZXQgdGVzdGVkZ2UgPSBbQS52ZXJ0ZXgsIEIudmVydGV4XTtcblxuICAgICAgICAgIGlmIChlZGdldmlzaWJpbHR5KHRlc3RlZGdlLCBlZGdlcykpXG4gICAgICAgICAge1xuICAgICAgICAgICAgZy5hZGRlZGdlKHgsIHksIGNvc3QoQS52ZXJ0ZXgsIEIudmVydGV4KSk7XG5cbiAgICAgICAgICAgIC8vIEp1c3QgZm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaCwgbm9uLWVzc2VudGlhbDpcbiAgICAgICAgICAgIHRoaXMuX3Zpcy5lZGdlcy5wdXNoKFtBLnZlcnRleCwgQi52ZXJ0ZXhdKTtcbiAgICAgICAgICB9XG5cbiAgICAgIH1cblxuXG4gICAgcmV0dXJuIGc7XG4gIH1cblxufVxuXG5cblxuZnVuY3Rpb24gY29zdChhLCBiKVxue1xuICBsZXQgZHggPSBiWzBdIC0gYVswXSAvLyB4MiAtIHgxXG4gIGxldCBkeSA9IGJbMV0gLSBhWzFdO1xuICByZXR1cm4gTWF0aC5zcXJ0KCBkeCpkeCArIGR5KmR5ICk7XG5cbn1cblxuZnVuY3Rpb24gZWRnZXZpc2liaWx0eSh0ZXN0ZWRnZSwgZWRnZXMpXG57XG4gIC8vIGNvbnNvbGUubG9nKGBUZXN0aW5nIGVkZ2U6ICR7dGVzdGVkZ2VbMF19LCAke3Rlc3RlZGdlWzFdfWApO1xuXG4gIGZvciAobGV0IHQ9MDsgdDxlZGdlcy5sZW5ndGg7IHQrKylcbiAge1xuICAgIGxldCBlID0gZWRnZXNbdF07XG5cbiAgICBsZXQgcmVzID0gaW50ZXJzZWN0cyh0ZXN0ZWRnZVswXSwgdGVzdGVkZ2VbMV0sIGVbMF0sIGVbMV0pO1xuXG4gICAgLy8gSWYgaW50ZXJzZWN0aW9uLCBjaGVjayBpdCdzIG5vdCBqdXN0IHRoZSBlbmRwb2ludHMga2lzc2luZyB3aGljaCBpcyBva1xuICAgIC8vIGluIGZhY3QsIGl0J3MgbW9yZSB0aGFuICdvaycgLSBpdCdzIGV4YWN0bHkgd2hhdCB3ZSdyZSBsb29raW5nIGZvclxuICAgIGlmIChyZXMuaW50ZXJzZWN0ICYmICFyZXMua2lzcylcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cblxuZnVuY3Rpb24gZXF1YWxzKGEsIGIpXG57XG4gIHJldHVybiAoYVswXSA9PSBiWzBdICYmIGFbMV0gPT0gYlsxXSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU2NlbmUuanMiLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHRoaXMudmVydGljZXMgPSBbXTtcbiAgICB0aGlzLmVkZ2VzID0gW107XG4gICAgdGhpcy5udW1lZGdlcyA9IDA7XG4gIH1cblxuICBhZGR2ZXJ0ZXgobilcbiAge1xuICAgIHRoaXMudmVydGljZXMucHVzaChuKTtcbiAgICB0aGlzLmVkZ2VzW25dID0gW107XG4gIH1cblxuICAvLyBhZGphY2VueSBlZGdlIGxpc3RcbiAgYWRkZWRnZSh2MSwgdjIsIGNvc3QpXG4gIHtcbiAgICB0aGlzLmVkZ2VzW3YxXS5wdXNoKHtkZXN0OnYyLCBjb3N0fSk7XG4gICAgdGhpcy5lZGdlc1t2Ml0ucHVzaCh7ZGVzdDp2MSwgY29zdH0pO1xuXG4gICAgdGhpcy5udW1lZGdlcysrO1xuICB9XG5cbiAgLy8gU3VwZXIgYmFzaWMgaW1wbGVtZW50YXRpb24gb2YgRGlqa3N0cmEncyBhbGdvcml0aG1cbiAgLy8gRGlyZWN0bHkgZnJvbSB0aGlzIHJlY2lwZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRGlqa3N0cmElMjdzX2FsZ29yaXRobSNBbGdvcml0aG1cbiAgc2hvcnRlc3Qoc3RhcnQsIGVuZClcbiAge1xuICAgIGxldCBjdXJyZW50X25vZGU7XG4gICAgbGV0IGRpc3QgPSBbMF07XG4gICAgbGV0IHByZXYgPSBbXTtcbiAgICBsZXQgdW52aXNpdGVkID0gW107XG5cbiAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy52ZXJ0aWNlcy5sZW5ndGg7IGkrKylcbiAgICB7XG4gICAgICBpZiAoaSkgZGlzdFtpXSA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICB1bnZpc2l0ZWRbaV0gPSBpO1xuICAgICAgcHJldltpXSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gJ1Zpc2l0JyBlYWNoIG5vZGUgb25seSBvbmNlLCBpbiB0dXJuXG4gICAgd2hpbGUoIChjdXJyZW50X25vZGUgPSB1bnZpc2l0ZWQuc2hpZnQoKSkgIT0gbnVsbCApXG4gICAge1xuICAgICAgLy8gRm9yIGVhY2ggbm9kZSwgJ2NoZWNrJyBpdHMgbmVpZ2hib3Vycy5cbiAgICAgIC8vIFdoaWxlIHdlIG9ubHkgJ3Zpc2l0JyBlYWNoIG5vZGUgb25jZSwgaXQncyB0aGlzIHJlcGVhdGVkICdjaGVjaydpbmdcbiAgICAgIC8vIChhbmQgb2NjYXNpb25hbCByZWNhbGN1bGF0aW5nKSBvZiBuZWlnaGJvdXJzIHRoYXQgYWxsb3dzIHVzIHRvIGZpbmRcbiAgICAgIC8vIHRoZSBzaG9ydGVzdCByb3V0ZSB0aHJvdWdoIHRoZSBncmFwaCBmcm9tIG91ciBzdGFydCBwb2ludC5cbiAgICAgIC8vIEluIGZhY3QsIHRoZSBpbmhlcmVudCByZXN1bHQgb2YgdGhlIGFsZ28gaXMgdGhhdCB3ZSBmaW5kIHRoZSBzaG9ydGVzdFxuICAgICAgLy8gcGF0aCB0byAqZXZlcnkqIHBvaW50IGluIHRoZSBncmFwaFxuICAgICAgZm9yIChsZXQgdD0wOyB0PHRoaXMuZWRnZXNbY3VycmVudF9ub2RlXS5sZW5ndGg7IHQrKylcbiAgICAgIHtcbiAgICAgICAgLy8gdmVydGV4L25vZGUgSURcbiAgICAgICAgbGV0IG5laWdoYm91ciA9IHRoaXMuZWRnZXNbY3VycmVudF9ub2RlXVt0XS5kZXN0O1xuXG4gICAgICAgIC8vIERpc3RhbmNlIGZyb20gY3VycmVudF9ub2RlIHRvIG5laWdoYm91clxuICAgICAgICBsZXQgY29zdCA9IHRoaXMuZWRnZXNbY3VycmVudF9ub2RlXVt0XS5jb3N0O1xuXG4gICAgICAgIC8vIERpc3RhbmNlIHRodXMgZmFyIG9uIHRoaXMgcm91dGUgKHVwIHRvIGN1cnJlbnRfbm9kZSkgKyBkaXN0YW5jZSB0byBuZWlnaGJvdXJcbiAgICAgICAgbGV0IHRlbnRhdGl2ZV9kaXN0ID0gZGlzdFtjdXJyZW50X25vZGVdICsgY29zdDtcblxuICAgICAgICAvLyBIYXZlIHdlIGZvdW5kIGEgc2hvcnRlciBwYXRoP1xuICAgICAgICBpZiAodGVudGF0aXZlX2Rpc3QgPCBkaXN0W25laWdoYm91cl0pXG4gICAgICAgIHtcbiAgICAgICAgICBkaXN0W25laWdoYm91cl0gPSB0ZW50YXRpdmVfZGlzdDsgLy8gTmV3IGRpc3RhbmNlIHRvIHRoaXMgbm9kZVxuICAgICAgICAgIHByZXZbbmVpZ2hib3VyXSA9IGN1cnJlbnRfbm9kZTsgICAvLyBVcGRhdGUgdGhlIHJvdXRlXG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBjID0gZW5kLCBzZXEgPVtlbmRdO1xuXG4gICAgLy8gZmFpbGVkIGZvciBzb21lIHJlYXNvbiwgZS5nLiBpbXBvc3NpYmxlIHBvaW50IGluc2lkZSBudWxsc3BhY2UgZXRjXG4gICAgaWYgKHByZXZbY10gPT0gbnVsbClcbiAgICAgIHJldHVybiBbXTtcblxuICAgIGRvIHtcbiAgICAgIGMgPSBwcmV2W2NdO1xuICAgICAgc2VxLnB1c2goYyk7XG4gICAgfSB3aGlsZShjICE9IHN0YXJ0KTtcblxuICAgIHJldHVybiBzZXEucmV2ZXJzZSgpO1xuXG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0dyYXBoLmpzIiwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyXG57XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpXG4gIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KTtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgfVxuXG4gIGNsZWFyKClcbiAge1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgfVxuXG4gIHJlbmRlcihvYmplY3RzLCBjb2xvdXIgPSAnIzAwMCcsIHdpZHRoID0gMilcbiAge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3RzKSkgcmV0dXJuO1xuXG4gICAgLy8gcG9pbnQgdHlwZVxuICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3RzWzBdKSlcbiAgICB7XG4gICAgICBjb25zdCBwID0gb2JqZWN0cztcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5hcmMocFswXT4+MCwgcFsxXT4+MCwgd2lkdGgsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3VyO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICB9IGVsc2Uge1xuICAgIC8vIGxpc3Qgb2Ygc2hhcGVzIHR5cGVcblxuICAgICAgZm9yIChsZXQgbyBvZiBvYmplY3RzKVxuICAgICAge1xuICAgICAgICBmb3IgKGxldCBlPTA7IGU8by5sZW5ndGgtMTsgZSsrKVxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5fbGluZShvW2VdLCBvW2UrMV0sIGNvbG91ciwgd2lkdGgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIF9saW5lKGEsIGIsIGMsIHcpXG4gIHtcbiAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdztcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjIHx8ICdibGFjayc7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oYVswXT4+MCxhWzFdPj4wKTtcbiAgICB0aGlzLmNvbnRleHQubGluZVRvKGJbMF0+PjAsYlsxXT4+MCk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=