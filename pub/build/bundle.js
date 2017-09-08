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
var showGraph = true,
    showObstacles = true;

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
var sq_small = (0, _Util.Square)(650, 100, 150);
var sq_large = (0, _Util.Square)(rotx, roty, 300);

var obstacles = [(0, _Util.Square)(80, 120, 100),
//, Square(12,12, 2),
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

  if (showGraph) {
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

  // Render the original scene geometry on top of the graph
  if (showObstacles) {
    renderer.render(start, '#0a0', 6);
    renderer.render(end, '#0a0', 6);
    renderer.render(scene.objects, '#333');
  }

  // User has moved the mouse inside a shape obstacle which invalidates the graph
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

// Save the last known mouse position
document.getElementById(element).onmousemove = function (e) {
  mx = e.clientX;my = e.clientY;
};
document.getElementById('cb_debug').onclick = function (e, c) {
  showGraph = e.srcElement.checked;
};
document.getElementById('cb_debug2').onclick = function (e, c) {
  showObstacles = e.srcElement.checked;
};

function show_info(text) {
  info.innerHTML = text;info.style.display = 'block';
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
      // intersection tests on themselves (their own vertices, crossing internally)
      var shape_id = 1;

      // These first two nodes in the graph are a special case
      nodes.push({ vertex: start, shape: shape_id++ }); // [0] start (see .solve())
      nodes.push({ vertex: end, shape: shape_id++ }); // [1] end

      var gedges = [];

      // extract each obstacle's edges and nodes
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.objects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var o = _step2.value;

          shape_id++;

          var e = void 0;
          var base = nodes.length;
          for (e = 0; e < o.length - 1; e++) {

            // Ffs alan what a mess
            // let v1 = base + e;
            // let v2 = (base + e + 1) % (o.length-1);
            //
            // gedges.push({
            //   index:[v1, v2],
            //   vertex: [o[e], o[e+1]]
            // });
            //
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

      // for (let ge of gedges)
      // {
      //   g.addedge(ge.index[0], ge.index[1], cost(ge.vertex[0], ge.vertex[1]));
      //   this._vis.edges.push([ge.vertex[0], ge.vertex[1]]);
      // }

      // Add obstacles' permimeter edges to the graph
      //
      // for (let o of this.objects)
      // {
      //   let cords = "";
      //   for (let e of o)
      //   {
      //     cords += `(${e}), `;
      //   }
      //   console.log(cords);
      // }
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
      if (v1 == 1 || v2 == 1) {
        console.log(v1, v2, cost);
      }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzA0MDAyMmYwYzA4OGUxZmQ4ZWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJUcmlhbmdsZSIsImFuZ2xlIiwiciIsIk1hdGgiLCJzaW4iLCJQSSIsInRyaSIsImkiLCJjb3MiLCJyb3RhdGUiLCJzaGFwZSIsInJ4IiwicnkiLCJkYSIsInBhaXIiLCJyb3RhdGVfcG9pbnQiLCJ0cmFuc2xhdGUiLCJkeCIsImR5IiwiY3giLCJjeSIsInAiLCJzIiwiYyIsInhuZXciLCJ5bmV3IiwicG9pbnRfaW5fcG9seWdvbiIsInBvaW50IiwidmVydGljZXMiLCJsZW5ndGgiLCJhIiwiYiIsInNlZyIsInN1YnRyYWN0UG9pbnRzIiwicHQiLCJpbnNpZGUiLCJjcm9zc1Byb2R1Y3QiLCJpbnRlcnNlY3RzIiwiYXAiLCJhcDIiLCJhcSIsImFxMiIsImRvTGluZVNlZ21lbnRzSW50ZXJzZWN0IiwiaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsiLCJwMiIsInEiLCJxMiIsImJveDEiLCJ4bWluIiwibWluIiwieW1pbiIsInhtYXgiLCJtYXgiLCJ5bWF4IiwiYm94MiIsImJib3hfY29udGFpbmVkIiwidU51bWVyYXRvciIsImRlbm9taW5hdG9yIiwiZXF1YWxQb2ludHMiLCJpbnRlcnNlY3QiLCJraXNzIiwiYWxsRXF1YWwiLCJ1IiwidCIsInBvaW50MSIsInBvaW50MiIsIkFycmF5IiwiaXNBcnJheSIsInJlc3VsdCIsImFyZ3MiLCJmaXJzdFZhbHVlIiwiYXJndW1lbnRzIiwiZWxlbWVudCIsInJlbmRlcmVyIiwic2NlbmUiLCJpbmZvIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNob3dHcmFwaCIsInNob3dPYnN0YWNsZXMiLCJzdGFydCIsImVuZCIsIm14IiwibXkiLCJyb3R4Iiwicm90eSIsIm1vdGlvbiIsInJvdGEiLCJzcV9zbWFsbCIsInNxX2xhcmdlIiwib2JzdGFjbGVzIiwibyIsImFkZCIsImZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaGlkZV9pbmZvIiwiZG9kZ2VfbnVsbHNwYWNlIiwicm91dGUiLCJzb2x2ZSIsInZpcyIsImNsZWFyIiwibm9kZXMiLCJuIiwicmVuZGVyIiwiZWRnZXMiLCJvYmplY3RzIiwic2hvd19pbmZvIiwib25tb3VzZW1vdmUiLCJlIiwiY2xpZW50WCIsImNsaWVudFkiLCJvbmNsaWNrIiwic3JjRWxlbWVudCIsImNoZWNrZWQiLCJ0ZXh0IiwiaW5uZXJIVE1MIiwic3R5bGUiLCJkaXNwbGF5IiwiU2NlbmUiLCJncmFwaCIsIl92aXMiLCJvYmplY3QiLCJfZ3JhcGgiLCJzaG9ydGVzdCIsImciLCJzaGFwZV9pZCIsInZlcnRleCIsImdlZGdlcyIsImJhc2UiLCJlcXVhbHMiLCJhZGR2ZXJ0ZXgiLCJOdW1iZXIiLCJuZSIsIkEiLCJCIiwidGVzdGVkZ2UiLCJlZGdldmlzaWJpbHR5IiwiYWRkZWRnZSIsImNvc3QiLCJzcXJ0IiwicmVzIiwiR3JhcGgiLCJudW1lZGdlcyIsInYxIiwidjIiLCJjb25zb2xlIiwibG9nIiwiZGVzdCIsImN1cnJlbnRfbm9kZSIsImRpc3QiLCJwcmV2IiwidW52aXNpdGVkIiwiTUFYX1ZBTFVFIiwic2hpZnQiLCJuZWlnaGJvdXIiLCJ0ZW50YXRpdmVfZGlzdCIsInNlcSIsInJldmVyc2UiLCJSZW5kZXJlciIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJjb2xvdXIiLCJiZWdpblBhdGgiLCJhcmMiLCJmaWxsU3R5bGUiLCJmaWxsIiwiX2xpbmUiLCJ3IiwibGluZVdpZHRoIiwic3Ryb2tlU3R5bGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0RBLFNBQVNBLE1BQVQsQ0FBZ0JDLENBQWhCLEVBQW1CQyxDQUFuQixFQUFzQkMsSUFBdEIsRUFDQTtBQUNFLE1BQUlDLFFBQVFELFFBQU0sQ0FBbEI7QUFDQSxNQUFJRSxLQUFLLEVBQVQ7QUFDQTtBQUNBO0FBQ0FBLEtBQUdDLElBQUgsQ0FBUyxDQUFDTCxJQUFJRyxLQUFMLEVBQVlGLElBQUlFLEtBQWhCLENBQVQ7QUFDQTtBQUNBQyxLQUFHQyxJQUFILENBQVMsQ0FBQ0wsSUFBSUcsS0FBTCxFQUFZRixJQUFJRSxLQUFoQixDQUFUO0FBQ0E7QUFDQUMsS0FBR0MsSUFBSCxDQUFTLENBQUNMLElBQUlHLEtBQUwsRUFBWUYsSUFBSUUsS0FBaEIsQ0FBVDtBQUNBO0FBQ0FDLEtBQUdDLElBQUgsQ0FBUyxDQUFDTCxJQUFJRyxLQUFMLEVBQVlGLElBQUlFLEtBQWhCLENBQVQ7QUFDQTtBQUNBQyxLQUFHQyxJQUFILENBQVMsQ0FBQ0wsSUFBSUcsS0FBTCxFQUFZRixJQUFJRSxLQUFoQixDQUFUOztBQUVBLFNBQU9DLEVBQVA7QUFDRDs7QUFFRDtBQUNBLFNBQVNFLFFBQVQsQ0FB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QUFGLEtBQU0sQ0FBbEM7QUFDQSxXQUFLaUksT0FBTCxDQUFhZSxNQUFiLENBQW9CL0ksRUFBRSxDQUFGLEtBQU0sQ0FBMUIsRUFBNEJBLEVBQUUsQ0FBRixLQUFNLENBQWxDO0FBQ0EsV0FBS2dJLE9BQUwsQ0FBYWdCLE1BQWI7QUFDRDs7Ozs7O2tCQWhEa0JqQixRIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDMwNDAwMjJmMGMwODhlMWZkOGVlIiwiXG5cbmZ1bmN0aW9uIFNxdWFyZSh4LCB5LCBzaXplKVxue1xuICBsZXQgaHNpemUgPSBzaXplPj4xO1xuICBsZXQgc3EgPSBbXTtcbiAgLy8gb3IganVzdCBtYWtlIGEgdW5pdCBzcXVhcmUgYW5kIHNjYWxlIGl0IHVwIGR1aCA6fFxuICAvLyB0b3AgbGVmdFxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5IC0gaHNpemVdICk7XG4gIC8vIHRvcCByaWdodFxuICBzcS5wdXNoKCBbeCArIGhzaXplLCB5IC0gaHNpemVdICk7XG4gIC8vIGJvdHRvbSByaWdodFxuICBzcS5wdXNoKCBbeCArIGhzaXplLCB5ICsgaHNpemVdICk7XG4gIC8vIGJvdHRvbSBsZWZ0XG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgKyBoc2l6ZV0gKTtcbiAgLy8gdG9wIGxlZnQgYWdhaW5cbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSAtIGhzaXplXSApO1xuXG4gIHJldHVybiBzcTtcbn1cblxuLy8gZXF1aWxhdGVyYWxcbmZ1bmN0aW9uIFRyaWFuZ2xlKHgsIHksIHNpemUpXG57XG4gIGxldCBhbmdsZSA9IDA7XG4gIGxldCByID0gKHNpemUvMi4wKS9NYXRoLnNpbihNYXRoLlBJKjYwLzE4MCk7XG4gIGxldCB0cmkgPSBbXTtcblxuICBmb3IobGV0IGk9MDsgaTw9MzsgaSsrKVxuICB7XG4gICAgdHJpLnB1c2goW1xuICAgICAgeCArIHIgKiBNYXRoLmNvcyhhbmdsZSArIChpICUgMykgKiAyICogTWF0aC5QSS8zKSxcbiAgICAgIHkgKyByICogTWF0aC5zaW4oYW5nbGUgKyAoaSAlIDMpICogMiAqIE1hdGguUEkvMylcbiAgICBdKTtcbiAgfVxuXG4gIHJldHVybiB0cmk7XG59XG5cbmZ1bmN0aW9uIHJvdGF0ZShzaGFwZSwgcngsIHJ5LCBkYSlcbntcbiAgZm9yIChsZXQgcGFpciBvZiBzaGFwZSlcbiAgICBwYWlyID0gcm90YXRlX3BvaW50KHJ4LCByeSwgZGEsIHBhaXIpO1xufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGUoc2hhcGUsIGR4LCBkeSlcbntcbiAgZm9yIChsZXQgcGFpciBvZiBzaGFwZSlcbiAge1xuICAgIHBhaXJbMF0gKz0gZHg7XG4gICAgcGFpclsxXSArPSBkeTtcbiAgfVxufVxuXG5mdW5jdGlvbiByb3RhdGVfcG9pbnQoY3gsIGN5LCBhbmdsZSwgcClcbntcbiAgbGV0IHMgPSBNYXRoLnNpbihhbmdsZSk7XG4gIGxldCBjID0gTWF0aC5jb3MoYW5nbGUpO1xuXG4gIC8vIHRyYW5zbGF0ZSBwb2ludCBiYWNrIHRvIG9yaWdpbjpcbiAgcFswXSAtPSBjeDtcbiAgcFsxXSAtPSBjeTtcblxuICAvLyByb3RhdGUgcG9pbnRcbiAgbGV0IHhuZXcgPSBwWzBdICogYyAtIHBbMV0gKiBzO1xuICBsZXQgeW5ldyA9IHBbMF0gKiBzICsgcFsxXSAqIGM7XG5cbiAgLy8gdHJhbnNsYXRlIHBvaW50IGJhY2s6XG4gIHBbMF0gPSB4bmV3ICsgY3g7XG4gIHBbMV0gPSB5bmV3ICsgY3k7XG5cbiAgcmV0dXJuIHA7XG59XG5cblxuZnVuY3Rpb24gcG9pbnRfaW5fcG9seWdvbihwb2ludCwgdmVydGljZXMpXG57XG4gIGZvciAobGV0IGk9MDsgaTx2ZXJ0aWNlcy5sZW5ndGgtMTsgaSsrKVxuICB7XG4gICAgbGV0IGEgPSB2ZXJ0aWNlc1tpXTtcbiAgICBsZXQgYiA9IHZlcnRpY2VzW2krMV07XG5cbiAgICBsZXQgc2VnID0gc3VidHJhY3RQb2ludHMoYiwgYSk7XG4gICAgbGV0IHB0ID0gc3VidHJhY3RQb2ludHMocG9pbnQsIGEpO1xuICAgIGxldCBpbnNpZGUgPSAoY3Jvc3NQcm9kdWN0KHNlZywgcHQpID4gMCk7XG4gICAgLy8gY29uc29sZS5sb2coaW5zaWRlKTtcbiAgICBpZiAoIWluc2lkZSkgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cblxuLyoqXG4gKiBAYXV0aG9yIFBldGVyIEtlbGxleVxuICogQGF1dGhvciBwZ2tlbGxleTRAZ21haWwuY29tXG4gKi9cbi8qKlxuICogU2VlIGlmIHR3byBsaW5lIHNlZ21lbnRzIGludGVyc2VjdC4gVGhpcyB1c2VzIHRoZVxuICogdmVjdG9yIGNyb3NzIHByb2R1Y3QgYXBwcm9hY2ggZGVzY3JpYmVkIGJlbG93OlxuICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTY1MjgyLzc4NjMzOVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIHN0YXJ0IG9mIHRoZSAxc3QgbGluZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwMiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBlbmQgb2YgdGhlIDFzdCBsaW5lLlxuICogQHBhcmFtIHtPYmplY3R9IHEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgc3RhcnQgb2YgdGhlIDJuZCBsaW5lLlxuICogQHBhcmFtIHtPYmplY3R9IHEyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIGVuZCBvZiB0aGUgMm5kIGxpbmUuXG4gKi9cblxuZnVuY3Rpb24gaW50ZXJzZWN0cyhhcCwgYXAyLCBhcSwgYXEyKVxue1xuICAvLyBBTTogTm90ZSB0byBkZXZlbG9wZXJzLCBwbGVhc2UgZG9uJ3QgdXNlIG5hbWVkIHByb3BlcnRpZXMgZm9yIHZlY3RvcnNcbiAgLy8gICAgIEl0J3MgZGFmdC4gVXNlIGFycmF5cy5cbiAgcmV0dXJuIGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0KCB7eDogYXBbMF0sIHk6IGFwWzFdfSwge3g6IGFwMlswXSwgeTogYXAyWzFdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eDogYXFbMF0sIHk6IGFxWzFdfSwge3g6IGFxMlswXSwgeTogYXEyWzFdfSApO1xufVxuXG5mdW5jdGlvbiBpc19vbmVfYmJveF9jb250YWluZWRfYnlfdGhlX290aGVyX3F1ZXN0aW9ubWFyayhwLCBwMiwgcSwgcTIpXG57XG4gIHZhciBib3gxID0ge1xuICAgIHhtaW46IE1hdGgubWluKHAueCwgcDIueCksXG4gICAgeW1pbjogTWF0aC5taW4ocC55LCBwMi55KSxcbiAgICB4bWF4OiBNYXRoLm1heChwLngsIHAyLngpLFxuICAgIHltYXg6IE1hdGgubWF4KHAueSwgcDIueSlcbiAgfTtcblxuICB2YXIgYm94MiA9IHtcbiAgICB4bWluOiBNYXRoLm1pbihxLngsIHEyLngpLFxuICAgIHltaW46IE1hdGgubWluKHEueSwgcTIueSksXG4gICAgeG1heDogTWF0aC5tYXgocS54LCBxMi54KSxcbiAgICB5bWF4OiBNYXRoLm1heChxLnksIHEyLnkpXG4gIH07XG5cbiAgcmV0dXJuIGJib3hfY29udGFpbmVkKGJveDEsIGJveDIpIHx8IGJib3hfY29udGFpbmVkKGJveDIsIGJveDEpO1xufVxuXG5mdW5jdGlvbiBiYm94X2NvbnRhaW5lZChhLCBiKVxue1xuICAvLyBJcyBCb3ggQiBjb21wbGV0ZWx5IGluc2lkZSBib3ggQSA/XG4gIHJldHVybiAoYi54bWluID49IGEueG1pbiAmJiBiLnhtYXggPD0gYS54bWF4KSAmJiAoYi55bWluID49IGEueW1pbiAmJiBiLnltYXggPD0gYS55bWF4KTtcbn1cblxuXG5mdW5jdGlvbiBkb0xpbmVTZWdtZW50c0ludGVyc2VjdChwLCBwMiwgcSwgcTIpXG57XG4gIC8vIHZhciBkZWJ1Z19zdHJpbmcgPSBgZG9MaW5lU2VnbWVudHNJbnRlcnNlY3Q6ICgke3AueH0sICR7cC55fSktKCR7cDIueH0sICR7cDIueX0pICB3aXRoICAoJHtxLnh9LCAke3EueX0pLSgke3EyLnh9LCAke3EyLnl9KWA7XG5cblx0dmFyIHIgPSBzdWJ0cmFjdFBvaW50cyhwMiwgcCk7XG5cdHZhciBzID0gc3VidHJhY3RQb2ludHMocTIsIHEpO1xuXG5cdHZhciB1TnVtZXJhdG9yID0gY3Jvc3NQcm9kdWN0KHN1YnRyYWN0UG9pbnRzKHEsIHApLCByKTtcblx0dmFyIGRlbm9taW5hdG9yID0gY3Jvc3NQcm9kdWN0KHIsIHMpO1xuXG5cdGlmICh1TnVtZXJhdG9yID09IDAgJiYgZGVub21pbmF0b3IgPT0gMCkge1xuXHRcdC8vIFRoZXkgYXJlIGNvTGxpbmVhclxuXG4gICAgLy8gY29uc29sZS5sb2coXCJDb3BsYW5hclwiKTtcblxuXHRcdC8vIERvIHRoZXkgdG91Y2g/IChBcmUgYW55IG9mIHRoZSBwb2ludHMgZXF1YWw/KVxuXHRcdGlmIChlcXVhbFBvaW50cyhwLCBxKSB8fCBlcXVhbFBvaW50cyhwLCBxMikgfHwgZXF1YWxQb2ludHMocDIsIHEpIHx8IGVxdWFsUG9pbnRzKHAyLCBxMikpIHtcblx0XHRcdHJldHVybiB7XG4gICAgICAgIGludGVyc2VjdDogdHJ1ZSxcbiAgICAgICAga2lzczogIWlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrKHAsIHAyLCBxLCBxMilcbiAgICAgIH07XG5cblx0XHR9XG5cdFx0Ly8gRG8gdGhleSBvdmVybGFwPyAoQXJlIGFsbCB0aGUgcG9pbnQgZGlmZmVyZW5jZXMgaW4gZWl0aGVyIGRpcmVjdGlvbiB0aGUgc2FtZSBzaWduKVxuXG4gICAgLy8gY29uc29sZS5sb2coXCJQb2ludHMgRE9OVCB0b3VjaFwiKTtcblxuXHRcdHJldHVybiB7XG4gICAgICBpbnRlcnNlY3Q6XG4gICAgICAgICAgICAhYWxsRXF1YWwoXG4gICAgICBcdFx0XHRcdChxLnggLSBwLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEueCAtIHAyLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnggLSBwLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnggLSBwMi54IDwgMCkpIHx8XG4gICAgICBcdFx0XHQhYWxsRXF1YWwoXG4gICAgICBcdFx0XHRcdChxLnkgLSBwLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEueSAtIHAyLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnkgLSBwLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnkgLSBwMi55IDwgMCkpLFxuICAgICAgICBraXNzOiBmYWxzZVxuICAgICAgfTtcblxuXHR9XG5cblx0aWYgKGRlbm9taW5hdG9yID09IDApIHtcblx0XHQvLyBsaW5lcyBhcmUgcGFyYWxlbGxcblx0XHRyZXR1cm4ge2ludGVyc2VjdDogZmFsc2UsIGtpc3M6IGZhbHNlfTtcblx0fVxuXG5cdHZhciB1ID0gdU51bWVyYXRvciAvIGRlbm9taW5hdG9yO1xuXHR2YXIgdCA9IGNyb3NzUHJvZHVjdChzdWJ0cmFjdFBvaW50cyhxLCBwKSwgcykgLyBkZW5vbWluYXRvcjtcblxuICAvLyBjb25zb2xlLmxvZyhgdD0ke3R9LCB1PSR7dX1gKTtcbiAgdmFyIGtpc3MgPSBmYWxzZTtcblxuICBpZiAoZXF1YWxQb2ludHMocCwgcSkgfHwgZXF1YWxQb2ludHMocCwgcTIpIHx8IGVxdWFsUG9pbnRzKHAyLCBxKSB8fCBlcXVhbFBvaW50cyhwMiwgcTIpKVxuICAgIGtpc3MgPSB0cnVlO1xuXG4gIC8vIGxldCByZXMgPVxuICAvL3JldHVyblxuICByZXR1cm4ge1xuICAgIGludGVyc2VjdDogKHQgPj0gMCkgJiYgKHQgPD0gMSkgJiYgKHUgPj0gMCkgJiYgKHUgPD0gMSksXG4gICAga2lzczoga2lzc1xuICB9O1xuXG4gIC8vIGNvbnNvbGUubG9nKGAke2RlYnVnX3N0cmluZ30gPSAke3Jlc31gKTtcblxuXHQvLyByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZSB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0aGUgdHdvIHBvaW50cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICpcbiAqIEByZXR1cm4gdGhlIGNyb3NzIHByb2R1Y3QgcmVzdWx0IGFzIGEgZmxvYXRcbiAqL1xuZnVuY3Rpb24gY3Jvc3NQcm9kdWN0KHBvaW50MSwgcG9pbnQyKSB7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocG9pbnQxKSlcbiAgICByZXR1cm4gcG9pbnQxWzBdICogcG9pbnQyWzFdIC0gcG9pbnQxWzFdICogcG9pbnQyWzBdO1xuICBlbHNlXG5cdCAgIHJldHVybiBwb2ludDEueCAqIHBvaW50Mi55IC0gcG9pbnQxLnkgKiBwb2ludDIueDtcbn1cblxuLyoqXG4gKiBTdWJ0cmFjdCB0aGUgc2Vjb25kIHBvaW50IGZyb20gdGhlIGZpcnN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiB0aGUgc3VidHJhY3Rpb24gcmVzdWx0IGFzIGEgcG9pbnQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIHN1YnRyYWN0UG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocG9pbnQxKSlcbiAge1xuICAgIHJldHVybiBbIHBvaW50MVswXSAtIHBvaW50MlswXSwgcG9pbnQxWzFdIC0gcG9pbnQyWzFdIF07XG4gIH0gZWxzZSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHJlc3VsdC54ID0gcG9pbnQxLnggLSBwb2ludDIueDtcbiAgICByZXN1bHQueSA9IHBvaW50MS55IC0gcG9pbnQyLnk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbi8qKlxuICogU2VlIGlmIHRoZSBwb2ludHMgYXJlIGVxdWFsLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiBpZiB0aGUgcG9pbnRzIGFyZSBlcXVhbFxuICovXG5mdW5jdGlvbiBlcXVhbFBvaW50cyhwb2ludDEsIHBvaW50Mikge1xuXHRyZXR1cm4gKHBvaW50MS54ID09IHBvaW50Mi54KSAmJiAocG9pbnQxLnkgPT0gcG9pbnQyLnkpXG59XG5cbi8qKlxuICogU2VlIGlmIGFsbCBhcmd1bWVudHMgYXJlIGVxdWFsLlxuICpcbiAqIEBwYXJhbSB7Li4ufSBhcmdzIGFyZ3VtZW50cyB0aGF0IHdpbGwgYmUgY29tcGFyZWQgYnkgJz09Jy5cbiAqXG4gKiBAcmV0dXJuIGlmIGFsbCBhcmd1bWVudHMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGFsbEVxdWFsKGFyZ3MpIHtcblx0dmFyIGZpcnN0VmFsdWUgPSBhcmd1bWVudHNbMF0sXG5cdFx0aTtcblx0Zm9yIChpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGlmIChhcmd1bWVudHNbaV0gIT0gZmlyc3RWYWx1ZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuXG5cbmV4cG9ydCB7U3F1YXJlLCBUcmlhbmdsZSwgaW50ZXJzZWN0cywgcm90YXRlLCB0cmFuc2xhdGUsIHBvaW50X2luX3BvbHlnb259IDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9VdGlsLmpzIiwiXG5pbXBvcnQgU2NlbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9TY2VuZSc7XG5pbXBvcnQgUmVuZGVyZXIgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQge1NxdWFyZSwgcm90YXRlLCB0cmFuc2xhdGV9ICAgICAgZnJvbSAnLi9VdGlsJztcbmltcG9ydCB7cG9pbnRfaW5fcG9seWdvbiwgVHJpYW5nbGV9ICAgICBmcm9tICcuL1V0aWwnO1xuXG5jb25zdCBlbGVtZW50ID0gJ2Rpc3BsYXknO1xuXG5sZXQgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoZWxlbWVudCk7XG5sZXQgc2NlbmUgPSBuZXcgU2NlbmUoKTtcbmxldCBpbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZm9UZXh0Jyk7XG5cbi8vIFNob3cvaGlkZSB0aGUgc2NlbmUgZ3JhcGhcbmxldCBzaG93R3JhcGggPSB0cnVlLCBzaG93T2JzdGFjbGVzID0gdHJ1ZTtcblxuLy8gU3RhcnQgcG9pbnQgYW5kIG91ciBnb2FsXG5sZXQgc3RhcnQgPSBbMTAsIDEwXTtcbmxldCBlbmQgPSBbMzgwLCA0MjBdO1xubGV0IG14ID0gZW5kWzBdLCBteSA9IFsxXTtcblxuLy8gRm9yIHRoZSBzaGFwZSBhbmltYXRpb25zXG5sZXQgcm90eCA9IDMwMCwgcm90eSA9IDM1MDtcbmxldCBtb3Rpb24gPSAwLCByb3RhID0gMDtcblxuLy8gQ3JlYXRlIHNvbWUgZHluYW1pYyBvYnN0YWNsZXNcbmxldCBzcV9zbWFsbCA9IFNxdWFyZSg2NTAsIDEwMCwgMTUwKTtcbmxldCBzcV9sYXJnZSA9IFNxdWFyZShyb3R4LCByb3R5LCAzMDApO1xuXG5sZXQgb2JzdGFjbGVzID0gW1xuICBTcXVhcmUoODAsIDEyMCwgMTAwKSxcbiAgLy8sIFNxdWFyZSgxMiwxMiwgMiksXG4gIC8vc3Ffc21hbGwsXG4gIHNxX2xhcmdlXG5dO1xuXG4vLyBBZGQgdGhlbSBhbGwgdG8gdGhlIHNjZW5lXG5mb3IgKGxldCBvIG9mIG9ic3RhY2xlcylcbiAgc2NlbmUuYWRkKCBvICk7XG5cbmZyYW1lKCk7XG5cbmZ1bmN0aW9uIGZyYW1lKClcbntcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBmcmFtZSApO1xuXG4gIGhpZGVfaW5mbygpO1xuXG4gIGxldCBpbnNpZGUgPSBkb2RnZV9udWxsc3BhY2UoKTtcblxuICAvLyBGaW5kIHRoZSBzaG9ydGVzdCBwYXRoLiBUd28gdGhpbmdzIGhhcHBlbiBoZXJlOlxuICAvLyAgICAxLiBBIFNjZW5lIGdyYXBoIGlzIGV4dHJhY3RlZCBmcm9tIG91ciBzY2VuZSBnZW9tZXRyeVxuICAvLyAgICAyLiBEaWprc3RyYSdzIG1ldGhvZCBpcyB1c2VkIHRvIGZpbmQgdGhlIG9wdGltYWwgcm91dGUgYWNyb3NzIHRoZSBncmFwaFxuICBsZXQgcm91dGUgPSBzY2VuZS5zb2x2ZSggc3RhcnQsIGVuZCApO1xuXG4gIC8vIEdldCBhIHZpc3VhbGlzYXRpb24gb2YgdGhlIGFjdHVhbCBzY2VuZWdyYXBoXG4gIGxldCB2aXMgPSBzY2VuZS52aXMoKTtcblxuICByZW5kZXJlci5jbGVhcigpO1xuXG4gIGlmIChzaG93R3JhcGgpXG4gIHtcbiAgICAvLyBEcmF3IHRoZSBzY2VuZSBncmFwaCBub2Rlc1xuICAgIGZvciAobGV0IG4gb2YgdmlzLm5vZGVzKVxuICAgICAgcmVuZGVyZXIucmVuZGVyKCBuLCAnI2JiYicsIDUgKTtcblxuICAgIC8vIERyYXcgdGhlIGdyYXBoIGVkZ2VzXG4gICAgcmVuZGVyZXIucmVuZGVyKCB2aXMuZWRnZXMsICcjZWVlJyApO1xuICB9XG5cbiAgLy8gUmVuZGVyIHRoZSBvcmlnaW5hbCBzY2VuZSBnZW9tZXRyeSBvbiB0b3Agb2YgdGhlIGdyYXBoXG4gIGlmIChzaG93T2JzdGFjbGVzKVxuICB7XG4gICAgcmVuZGVyZXIucmVuZGVyKCBzdGFydCwgJyMwYTAnLCA2ICk7XG4gICAgcmVuZGVyZXIucmVuZGVyKCBlbmQsICcjMGEwJywgNiApO1xuICAgIHJlbmRlcmVyLnJlbmRlciggc2NlbmUub2JqZWN0cywgJyMzMzMnICk7XG4gIH1cblxuICAvLyBVc2VyIGhhcyBtb3ZlZCB0aGUgbW91c2UgaW5zaWRlIGEgc2hhcGUgb2JzdGFjbGUgd2hpY2ggaW52YWxpZGF0ZXMgdGhlIGdyYXBoXG4gIGlmIChpbnNpZGUgPj0gMClcbiAge1xuICAgIHNob3dfaW5mbyhcIkVuZCBwb2ludCBpbnNpZGUgc29saWQgb2JqZWN0IVwiKVxuICAgIHJlbmRlcmVyLnJlbmRlciggW3NjZW5lLm9iamVjdHNbaW5zaWRlXV0sICcjZjAwJywgNSApO1xuICB9XG5cbiAgLy8gTm93IGRpc3BsYXkgdGhlIGZvdW5kIHJvdXRlIVxuICByZW5kZXJlci5yZW5kZXIoIFtyb3V0ZV0sICcjMDBmJywgMyApO1xuXG4gIC8vIEFuaW1hdGlvblxuICBtb3Rpb24gKz0gMC4wNTsgLy8gU2ludXNvaWRhbFxuICB0cmFuc2xhdGUoc3Ffc21hbGwsIDAsIDMgKiBNYXRoLnNpbihtb3Rpb24gKiAwLjI1ICogTWF0aC5QSSkpO1xuXG4gIC8vIHJvdGF0ZSB0aGUgYmlnIHNxdWFyZVxuICByb3RhdGUoc3FfbGFyZ2UsIHJvdHgsIHJvdHksIDAuMDA1KTtcblxufVxuXG4vLyBTYXZlIHRoZSBsYXN0IGtub3duIG1vdXNlIHBvc2l0aW9uXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KS5vbm1vdXNlbW92ZSA9IGUgPT4geyBteCA9IGUuY2xpZW50WDsgbXkgPSBlLmNsaWVudFk7IH1cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYl9kZWJ1ZycpLm9uY2xpY2sgPSAoZSwgYykgPT4geyBzaG93R3JhcGggPSBlLnNyY0VsZW1lbnQuY2hlY2tlZDsgfVxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NiX2RlYnVnMicpLm9uY2xpY2sgPSAoZSwgYykgPT4geyBzaG93T2JzdGFjbGVzID0gZS5zcmNFbGVtZW50LmNoZWNrZWQ7IH1cblxuZnVuY3Rpb24gc2hvd19pbmZvKHRleHQpIHsgaW5mby5pbm5lckhUTUwgPSB0ZXh0OyBpbmZvLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyB9XG5mdW5jdGlvbiBoaWRlX2luZm8oKSB7IGluZm8uc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfVxuXG4vLyBUaGlzIHByZXZlbnRzIGEgYml0IG9mIGEgbWVzcyBmcm9tIGhhcHBlbmluZ1xuLy8gd2hlbiB0aGUgbW91c2UgY3Vyc29yIGRyaWZ0cyAqaW5zaWRlKiBhIHN1cHBvc2VkbHkgc29saWQgc2hhcGVcbmZ1bmN0aW9uIGRvZGdlX251bGxzcGFjZSgpXG57XG4gIC8vIE91ciB0ZW50YXRpdmUgbmV3IGNvb3JkaW5hdGUgKGxhc3Qga25vd24gbW91c2UgcG9zKVxuICBsZXQgYyA9IFtteCwgbXldO1xuXG4gIC8vIENoZWNrIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIGVhY2ggb2Ygb3VyIHNvbGlkIHNoYXBlc1xuICBmb3IgKGxldCBpIGluIG9ic3RhY2xlcylcbiAge1xuICAgIGxldCBvID0gb2JzdGFjbGVzW2k+PjBdO1xuICAgIC8vIE9oIG5vIVxuICAgIGlmIChwb2ludF9pbl9wb2x5Z29uKGMsIG8pKSAgLy8gc2ltcGxlIGNvbnZleC1vbmx5IHRlc3RcbiAgICB7XG4gICAgICAvLyBTZXQgdGhlIGVuZHBvaW50IHRvIHRoZSBzdGFydCB0byByZW1vdmUgdGhlIHJlZCBsaW5lIGFuZCBjdXJzb3JcbiAgICAgIGVuZCA9IHN0YXJ0O1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIC8vIEFsbCBnb29kLCBzZXQgdGhlIGVuZHBvaW50IHRvIHRoZSBsYXN0IGtub3duIG1vdXNlIHBvc1xuICBlbmQgPSBjO1xuICByZXR1cm4gLTE7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuaW1wb3J0IEdyYXBoICAgICAgICAgIGZyb20gJy4vR3JhcGgnO1xuaW1wb3J0IHtpbnRlcnNlY3RzfSAgIGZyb20gJy4vVXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHRoaXMub2JqZWN0cyA9IFtdO1xuICAgIHRoaXMuZ3JhcGggPSBudWxsO1xuXG4gICAgLy8gVGhpcyBpcyBqdXN0IGZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICB0aGlzLl92aXMgPSBudWxsO1xuICB9XG5cbiAgYWRkKG9iamVjdClcbiAge1xuICAgIHRoaXMub2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gIH1cblxuICBzb2x2ZShzdGFydCwgZW5kKVxuICB7XG4gICAgdGhpcy5ncmFwaCA9IHRoaXMuX2dyYXBoKHN0YXJ0LCBlbmQpO1xuICAgIGxldCBub2RlcyA9IHRoaXMuZ3JhcGguc2hvcnRlc3QoMCwgMSk7IC8vIFswXSBzdGFydCwgWzFdIGVuZCAoc2VlIC5ncmFwaCgpKVxuXG4gICAgbGV0IHJvdXRlID0gW107XG4gICAgZm9yIChsZXQgbiBvZiBub2RlcylcbiAgICB7XG4gICAgICByb3V0ZS5wdXNoKHRoaXMuX3Zpcy5ub2Rlc1sgbiBdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm91dGU7XG4gIH1cblxuICB2aXMoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpcztcbiAgfVxuXG4gIC8vIEV4dHJhY3QgYSBzY2VuZWdyYXBoIGZyb20gb3VyIGNvbnRpbnVvdXMgZXVjbGlkZWFuIGdlb21ldHJ5XG4gIF9ncmFwaChzdGFydCwgZW5kKVxuICB7XG4gICAgbGV0IG5vZGVzID0gW107XG4gICAgbGV0IGVkZ2VzID0gW107XG5cbiAgICBsZXQgZyA9IG5ldyBHcmFwaCgpO1xuXG4gICAgLy8gRm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaFxuICAgIHRoaXMuX3ZpcyA9IHsgbm9kZXM6IFtdLCBlZGdlczogW10gfTtcblxuICAgIC8vIFRoaXMgaXMganVzdCBhIHRlbXAgdmFsdWUgdXNlZCB0byBtYWtlIHN1cmUgc2hhcGVzIGRvbid0IHBlcmZvcm1cbiAgICAvLyBpbnRlcnNlY3Rpb24gdGVzdHMgb24gdGhlbXNlbHZlcyAodGhlaXIgb3duIHZlcnRpY2VzLCBjcm9zc2luZyBpbnRlcm5hbGx5KVxuICAgIGxldCBzaGFwZV9pZCA9IDE7XG5cbiAgICAvLyBUaGVzZSBmaXJzdCB0d28gbm9kZXMgaW4gdGhlIGdyYXBoIGFyZSBhIHNwZWNpYWwgY2FzZVxuICAgIG5vZGVzLnB1c2goIHt2ZXJ0ZXg6IHN0YXJ0LCAgc2hhcGU6IHNoYXBlX2lkKyt9ICk7IC8vIFswXSBzdGFydCAoc2VlIC5zb2x2ZSgpKVxuICAgIG5vZGVzLnB1c2goIHt2ZXJ0ZXg6IGVuZCwgICAgc2hhcGU6IHNoYXBlX2lkKyt9ICk7IC8vIFsxXSBlbmRcblxuICAgIGxldCBnZWRnZXMgPSBbXTtcblxuICAgIC8vIGV4dHJhY3QgZWFjaCBvYnN0YWNsZSdzIGVkZ2VzIGFuZCBub2Rlc1xuICAgIGZvciAobGV0IG8gb2YgdGhpcy5vYmplY3RzKVxuICAgIHtcbiAgICAgIHNoYXBlX2lkKys7XG5cbiAgICAgIGxldCBlO1xuICAgICAgbGV0IGJhc2UgPSBub2Rlcy5sZW5ndGg7XG4gICAgICBmb3IgKGU9MDsgZTxvLmxlbmd0aC0xOyBlKyspXG4gICAgICB7XG5cbiAgICAgICAgLy8gRmZzIGFsYW4gd2hhdCBhIG1lc3NcbiAgICAgICAgLy8gbGV0IHYxID0gYmFzZSArIGU7XG4gICAgICAgIC8vIGxldCB2MiA9IChiYXNlICsgZSArIDEpICUgKG8ubGVuZ3RoLTEpO1xuICAgICAgICAvL1xuICAgICAgICAvLyBnZWRnZXMucHVzaCh7XG4gICAgICAgIC8vICAgaW5kZXg6W3YxLCB2Ml0sXG4gICAgICAgIC8vICAgdmVydGV4OiBbb1tlXSwgb1tlKzFdXVxuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgZWRnZXMucHVzaChbb1tlXSwgb1tlKzFdXSk7XG5cbiAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgdmVydGV4OiBvW2VdLFxuICAgICAgICAgIHNoYXBlOiBzaGFwZV9pZFxuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgICAgLy8gdGhpcyBpc24ndCBhIGNsb3NlZCByaW5nIChtYXRjaGluZyBzdGFydCBhbmQgZW5kcClcbiAgICAgIGlmICghZXF1YWxzKG9bMF0sIG9bZV0pKVxuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB2ZXJ0ZXg6IG9bZV0sXG4gICAgICAgICAgc2hhcGU6IHNoYXBlX2lkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCBgbm9kZXNgIGluZGljZXMgdG8gZ3JhcGhcbiAgICBmb3IgKGxldCBpIGluIG5vZGVzKVxuICAgIHtcbiAgICAgIGcuYWRkdmVydGV4KE51bWJlcihpKSk7XG5cbiAgICAgIC8vIEZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICAgIHRoaXMuX3Zpcy5ub2Rlcy5wdXNoKG5vZGVzW051bWJlcihpKV0udmVydGV4KTtcbiAgICB9XG5cbiAgICAvLyBmb3IgKGxldCBnZSBvZiBnZWRnZXMpXG4gICAgLy8ge1xuICAgIC8vICAgZy5hZGRlZGdlKGdlLmluZGV4WzBdLCBnZS5pbmRleFsxXSwgY29zdChnZS52ZXJ0ZXhbMF0sIGdlLnZlcnRleFsxXSkpO1xuICAgIC8vICAgdGhpcy5fdmlzLmVkZ2VzLnB1c2goW2dlLnZlcnRleFswXSwgZ2UudmVydGV4WzFdXSk7XG4gICAgLy8gfVxuXG4gICAgLy8gQWRkIG9ic3RhY2xlcycgcGVybWltZXRlciBlZGdlcyB0byB0aGUgZ3JhcGhcbiAgICAvL1xuICAgIC8vIGZvciAobGV0IG8gb2YgdGhpcy5vYmplY3RzKVxuICAgIC8vIHtcbiAgICAvLyAgIGxldCBjb3JkcyA9IFwiXCI7XG4gICAgLy8gICBmb3IgKGxldCBlIG9mIG8pXG4gICAgLy8gICB7XG4gICAgLy8gICAgIGNvcmRzICs9IGAoJHtlfSksIGA7XG4gICAgLy8gICB9XG4gICAgLy8gICBjb25zb2xlLmxvZyhjb3Jkcyk7XG4gICAgLy8gfVxuICAgIC8vIGcuYWRkZWRnZSgpOiBwZXJpbWV0ZXIgb2YgYWxsIG9ic3RhY2xlc1xuXG4gICAgbGV0IG5lPTA7XG5cbiAgICBmb3IgKGxldCB4PTA7IHg8bm9kZXMubGVuZ3RoLTE7IHgrKylcbiAgICAgIGZvciAobGV0IHk9eCsxOyB5PG5vZGVzLmxlbmd0aDsgeSsrKVxuICAgICAge1xuICAgICAgICAgIGxldCBBID0gbm9kZXNbeF07XG4gICAgICAgICAgbGV0IEIgPSBub2Rlc1t5XTtcblxuICAgICAgICAgIC8vIFdlJ3JlIHRlc3RpbmcgdGhlIHNoYXBlJ3MgdmVydGljZXMgYWdhaW5zdCBpdHNlbGZcbiAgICAgICAgICAvLyB3aGljaCBsZWFkcyB0byBpbnRlcm5hbCBwYXRocyBpbnNpZGUgdGhlIHNoYXBlIChpbnZhbGlkISlcbiAgICAgICAgICBpZiAoQS5zaGFwZSA9PSBCLnNoYXBlKSBjb250aW51ZTtcblxuICAgICAgICAgIGxldCB0ZXN0ZWRnZSA9IFtBLnZlcnRleCwgQi52ZXJ0ZXhdO1xuXG4gICAgICAgICAgaWYgKGVkZ2V2aXNpYmlsdHkodGVzdGVkZ2UsIGVkZ2VzKSlcbiAgICAgICAgICB7XG4gICAgICAgICAgICBnLmFkZGVkZ2UoeCwgeSwgY29zdChBLnZlcnRleCwgQi52ZXJ0ZXgpKTtcblxuICAgICAgICAgICAgLy8gSnVzdCBmb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoLCBub24tZXNzZW50aWFsOlxuICAgICAgICAgICAgdGhpcy5fdmlzLmVkZ2VzLnB1c2goW0EudmVydGV4LCBCLnZlcnRleF0pO1xuICAgICAgICAgIH1cblxuICAgICAgfVxuXG5cbiAgICByZXR1cm4gZztcbiAgfVxuXG59XG5cblxuXG5mdW5jdGlvbiBjb3N0KGEsIGIpXG57XG4gIGxldCBkeCA9IGJbMF0gLSBhWzBdIC8vIHgyIC0geDFcbiAgbGV0IGR5ID0gYlsxXSAtIGFbMV07XG4gIHJldHVybiBNYXRoLnNxcnQoIGR4KmR4ICsgZHkqZHkgKTtcblxufVxuXG5mdW5jdGlvbiBlZGdldmlzaWJpbHR5KHRlc3RlZGdlLCBlZGdlcylcbntcbiAgLy8gY29uc29sZS5sb2coYFRlc3RpbmcgZWRnZTogJHt0ZXN0ZWRnZVswXX0sICR7dGVzdGVkZ2VbMV19YCk7XG5cbiAgZm9yIChsZXQgdD0wOyB0PGVkZ2VzLmxlbmd0aDsgdCsrKVxuICB7XG4gICAgbGV0IGUgPSBlZGdlc1t0XTtcblxuICAgIGxldCByZXMgPSBpbnRlcnNlY3RzKHRlc3RlZGdlWzBdLCB0ZXN0ZWRnZVsxXSwgZVswXSwgZVsxXSk7XG5cbiAgICAvLyBJZiBpbnRlcnNlY3Rpb24sIGNoZWNrIGl0J3Mgbm90IGp1c3QgdGhlIGVuZHBvaW50cyBraXNzaW5nIHdoaWNoIGlzIG9rXG4gICAgLy8gaW4gZmFjdCwgaXQncyBtb3JlIHRoYW4gJ29rJyAtIGl0J3MgZXhhY3RseSB3aGF0IHdlJ3JlIGxvb2tpbmcgZm9yXG4gICAgaWYgKHJlcy5pbnRlcnNlY3QgJiYgIXJlcy5raXNzKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5mdW5jdGlvbiBlcXVhbHMoYSwgYilcbntcbiAgcmV0dXJuIChhWzBdID09IGJbMF0gJiYgYVsxXSA9PSBiWzFdKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TY2VuZS5qcyIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcyA9IFtdO1xuICAgIHRoaXMuZWRnZXMgPSBbXTtcbiAgICB0aGlzLm51bWVkZ2VzID0gMDtcbiAgfVxuXG4gIGFkZHZlcnRleChuKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcy5wdXNoKG4pO1xuICAgIHRoaXMuZWRnZXNbbl0gPSBbXTtcbiAgfVxuXG4gIC8vIGFkamFjZW55IGVkZ2UgbGlzdFxuICBhZGRlZGdlKHYxLCB2MiwgY29zdClcbiAge1xuICAgIGlmICh2MSA9PSAxIHx8IHYyID09IDEpXG4gICAge1xuICAgICAgY29uc29sZS5sb2codjEsIHYyLCBjb3N0KTtcbiAgICB9XG5cbiAgICB0aGlzLmVkZ2VzW3YxXS5wdXNoKHtkZXN0OnYyLCBjb3N0fSk7XG4gICAgdGhpcy5lZGdlc1t2Ml0ucHVzaCh7ZGVzdDp2MSwgY29zdH0pO1xuXG4gICAgdGhpcy5udW1lZGdlcysrO1xuICB9XG5cbiAgLy8gU3VwZXIgYmFzaWMgaW1wbGVtZW50YXRpb24gb2YgRGlqa3N0cmEncyBhbGdvcml0aG1cbiAgLy8gRGlyZWN0bHkgZnJvbSB0aGlzIHJlY2lwZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRGlqa3N0cmElMjdzX2FsZ29yaXRobSNBbGdvcml0aG1cbiAgc2hvcnRlc3Qoc3RhcnQsIGVuZClcbiAge1xuICAgIGxldCBjdXJyZW50X25vZGU7XG4gICAgbGV0IGRpc3QgPSBbMF07XG4gICAgbGV0IHByZXYgPSBbXTtcbiAgICBsZXQgdW52aXNpdGVkID0gW107XG5cbiAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy52ZXJ0aWNlcy5sZW5ndGg7IGkrKylcbiAgICB7XG4gICAgICBpZiAoaSkgZGlzdFtpXSA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICB1bnZpc2l0ZWRbaV0gPSBpO1xuICAgICAgcHJldltpXSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gJ1Zpc2l0JyBlYWNoIG5vZGUgb25seSBvbmNlLCBpbiB0dXJuXG4gICAgd2hpbGUoIChjdXJyZW50X25vZGUgPSB1bnZpc2l0ZWQuc2hpZnQoKSkgIT0gbnVsbCApXG4gICAge1xuICAgICAgLy8gRm9yIGVhY2ggbm9kZSwgJ2NoZWNrJyBpdHMgbmVpZ2hib3Vycy5cbiAgICAgIC8vIFdoaWxlIHdlIG9ubHkgJ3Zpc2l0JyBlYWNoIG5vZGUgb25jZSwgaXQncyB0aGlzIHJlcGVhdGVkICdjaGVjaydpbmdcbiAgICAgIC8vIChhbmQgb2NjYXNpb25hbCByZWNhbGN1bGF0aW5nKSBvZiBuZWlnaGJvdXJzIHRoYXQgYWxsb3dzIHVzIHRvIGZpbmRcbiAgICAgIC8vIHRoZSBzaG9ydGVzdCByb3V0ZSB0aHJvdWdoIHRoZSBncmFwaCBmcm9tIG91ciBzdGFydCBwb2ludC5cbiAgICAgIC8vIEluIGZhY3QsIHRoZSBpbmhlcmVudCByZXN1bHQgb2YgdGhlIGFsZ28gaXMgdGhhdCB3ZSBmaW5kIHRoZSBzaG9ydGVzdFxuICAgICAgLy8gcGF0aCB0byAqZXZlcnkqIHBvaW50IGluIHRoZSBncmFwaFxuICAgICAgZm9yIChsZXQgdD0wOyB0PHRoaXMuZWRnZXNbY3VycmVudF9ub2RlXS5sZW5ndGg7IHQrKylcbiAgICAgIHtcbiAgICAgICAgLy8gdmVydGV4L25vZGUgSURcbiAgICAgICAgbGV0IG5laWdoYm91ciA9IHRoaXMuZWRnZXNbY3VycmVudF9ub2RlXVt0XS5kZXN0O1xuXG4gICAgICAgIC8vIERpc3RhbmNlIGZyb20gY3VycmVudF9ub2RlIHRvIG5laWdoYm91clxuICAgICAgICBsZXQgY29zdCA9IHRoaXMuZWRnZXNbY3VycmVudF9ub2RlXVt0XS5jb3N0O1xuXG4gICAgICAgIC8vIERpc3RhbmNlIHRodXMgZmFyIG9uIHRoaXMgcm91dGUgKHVwIHRvIGN1cnJlbnRfbm9kZSkgKyBkaXN0YW5jZSB0byBuZWlnaGJvdXJcbiAgICAgICAgbGV0IHRlbnRhdGl2ZV9kaXN0ID0gZGlzdFtjdXJyZW50X25vZGVdICsgY29zdDtcblxuICAgICAgICAvLyBIYXZlIHdlIGZvdW5kIGEgc2hvcnRlciBwYXRoP1xuICAgICAgICBpZiAodGVudGF0aXZlX2Rpc3QgPCBkaXN0W25laWdoYm91cl0pXG4gICAgICAgIHtcbiAgICAgICAgICBkaXN0W25laWdoYm91cl0gPSB0ZW50YXRpdmVfZGlzdDsgLy8gTmV3IGRpc3RhbmNlIHRvIHRoaXMgbm9kZVxuICAgICAgICAgIHByZXZbbmVpZ2hib3VyXSA9IGN1cnJlbnRfbm9kZTsgICAvLyBVcGRhdGUgdGhlIHJvdXRlXG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBjID0gZW5kLCBzZXEgPVtlbmRdO1xuXG4gICAgLy8gZmFpbGVkIGZvciBzb21lIHJlYXNvbiwgZS5nLiBpbXBvc3NpYmxlIHBvaW50IGluc2lkZSBudWxsc3BhY2UgZXRjXG4gICAgaWYgKHByZXZbY10gPT0gbnVsbClcbiAgICAgIHJldHVybiBbXTtcblxuICAgIGRvIHtcbiAgICAgIGMgPSBwcmV2W2NdO1xuICAgICAgc2VxLnB1c2goYyk7XG4gICAgfSB3aGlsZShjICE9IHN0YXJ0KTtcblxuICAgIHJldHVybiBzZXEucmV2ZXJzZSgpO1xuXG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0dyYXBoLmpzIiwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyXG57XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpXG4gIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KTtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgfVxuXG4gIGNsZWFyKClcbiAge1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgfVxuXG4gIHJlbmRlcihvYmplY3RzLCBjb2xvdXIgPSAnIzAwMCcsIHdpZHRoID0gMilcbiAge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3RzKSkgcmV0dXJuO1xuXG4gICAgLy8gcG9pbnQgdHlwZVxuICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3RzWzBdKSlcbiAgICB7XG4gICAgICBjb25zdCBwID0gb2JqZWN0cztcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5hcmMocFswXT4+MCwgcFsxXT4+MCwgd2lkdGgsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3VyO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICB9IGVsc2Uge1xuICAgIC8vIGxpc3Qgb2Ygc2hhcGVzIHR5cGVcblxuICAgICAgZm9yIChsZXQgbyBvZiBvYmplY3RzKVxuICAgICAge1xuICAgICAgICBmb3IgKGxldCBlPTA7IGU8by5sZW5ndGgtMTsgZSsrKVxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5fbGluZShvW2VdLCBvW2UrMV0sIGNvbG91ciwgd2lkdGgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIF9saW5lKGEsIGIsIGMsIHcpXG4gIHtcbiAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdztcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjIHx8ICdibGFjayc7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oYVswXT4+MCxhWzFdPj4wKTtcbiAgICB0aGlzLmNvbnRleHQubGluZVRvKGJbMF0+PjAsYlsxXT4+MCk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=