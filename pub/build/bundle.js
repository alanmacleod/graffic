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
// let end = [380, 420];
var end = [450, 520];
var mx = end[0],
    my = end[1];

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
  } // DEBUGGING STARTS HERE
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

(0, _Util.rotate)(sq_large, rotx, roty, 0.785);
var route = scene.solve(start, end);
console.log(route);

///

frame();

function frame() {
  // requestAnimationFrame( frame );

  hide_info();

  var inside = dodge_nullspace();

  // Find the shortest path. Two things happen here:
  //    1. A Scene graph is extracted from our scene geometry
  //    2. Dijkstra's method is used to find the optimal route across the graph
  // let route = scene.solve( start, end );

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
  // if (showObstacles)
  //   rotate(sq_large, rotx, roty, 0.005);
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

      console.log(nodes);

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

            var v1 = base + e;
            // Ffs alan what a mess (n.b. it took 30 mins of debugging to get this line below correct)
            // it was originally (base + e + 1) % (o.length-1)) which is quite different.
            // I thought this was going to be such a difficult bug to fix, I nearly didn't bother trying.
            // tbh, these node/edge structures need a serious refactoring if ever this program is expanded!!!
            var v2 = base + (e + 1) % (o.length - 1);

            gedges.push({
              index: [v1, v2],
              vertex: [o[e], o[e + 1]]
            });

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

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = gedges[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var ge = _step3.value;

          g.addedge(ge.index[0], ge.index[1], cost(ge.vertex[0], ge.vertex[1]));
          this._vis.edges.push([ge.vertex[0], ge.vertex[1]]);
        }

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
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWNiYmQ1NjQzNmM3NjA2ZmIzYjgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJUcmlhbmdsZSIsImFuZ2xlIiwiciIsIk1hdGgiLCJzaW4iLCJQSSIsInRyaSIsImkiLCJjb3MiLCJyb3RhdGUiLCJzaGFwZSIsInJ4IiwicnkiLCJkYSIsInBhaXIiLCJyb3RhdGVfcG9pbnQiLCJ0cmFuc2xhdGUiLCJkeCIsImR5IiwiY3giLCJjeSIsInAiLCJzIiwiYyIsInhuZXciLCJ5bmV3IiwicG9pbnRfaW5fcG9seWdvbiIsInBvaW50IiwidmVydGljZXMiLCJsZW5ndGgiLCJhIiwiYiIsInNlZyIsInN1YnRyYWN0UG9pbnRzIiwicHQiLCJpbnNpZGUiLCJjcm9zc1Byb2R1Y3QiLCJpbnRlcnNlY3RzIiwiYXAiLCJhcDIiLCJhcSIsImFxMiIsImRvTGluZVNlZ21lbnRzSW50ZXJzZWN0IiwiaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsiLCJwMiIsInEiLCJxMiIsImJveDEiLCJ4bWluIiwibWluIiwieW1pbiIsInhtYXgiLCJtYXgiLCJ5bWF4IiwiYm94MiIsImJib3hfY29udGFpbmVkIiwidU51bWVyYXRvciIsImRlbm9taW5hdG9yIiwiZXF1YWxQb2ludHMiLCJpbnRlcnNlY3QiLCJraXNzIiwiYWxsRXF1YWwiLCJ1IiwidCIsInBvaW50MSIsInBvaW50MiIsIkFycmF5IiwiaXNBcnJheSIsInJlc3VsdCIsImFyZ3MiLCJmaXJzdFZhbHVlIiwiYXJndW1lbnRzIiwiZWxlbWVudCIsInJlbmRlcmVyIiwic2NlbmUiLCJpbmZvIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNob3dHcmFwaCIsInNob3dPYnN0YWNsZXMiLCJzdGFydCIsImVuZCIsIm14IiwibXkiLCJyb3R4Iiwicm90eSIsIm1vdGlvbiIsInJvdGEiLCJzcV9zbWFsbCIsInNxX2xhcmdlIiwib2JzdGFjbGVzIiwibyIsImFkZCIsInJvdXRlIiwic29sdmUiLCJjb25zb2xlIiwibG9nIiwiZnJhbWUiLCJoaWRlX2luZm8iLCJkb2RnZV9udWxsc3BhY2UiLCJ2aXMiLCJjbGVhciIsIm5vZGVzIiwibiIsInJlbmRlciIsImVkZ2VzIiwib2JqZWN0cyIsInNob3dfaW5mbyIsIm9ubW91c2Vtb3ZlIiwiZSIsImNsaWVudFgiLCJjbGllbnRZIiwib25jbGljayIsInNyY0VsZW1lbnQiLCJjaGVja2VkIiwidGV4dCIsImlubmVySFRNTCIsInN0eWxlIiwiZGlzcGxheSIsIlNjZW5lIiwiZ3JhcGgiLCJfdmlzIiwib2JqZWN0IiwiX2dyYXBoIiwic2hvcnRlc3QiLCJnIiwic2hhcGVfaWQiLCJ2ZXJ0ZXgiLCJnZWRnZXMiLCJiYXNlIiwidjEiLCJ2MiIsImluZGV4IiwiZXF1YWxzIiwiYWRkdmVydGV4IiwiTnVtYmVyIiwiZ2UiLCJhZGRlZGdlIiwiY29zdCIsIm5lIiwiQSIsIkIiLCJ0ZXN0ZWRnZSIsImVkZ2V2aXNpYmlsdHkiLCJzcXJ0IiwicmVzIiwiR3JhcGgiLCJudW1lZGdlcyIsImRlc3QiLCJjdXJyZW50X25vZGUiLCJkaXN0IiwicHJldiIsInVudmlzaXRlZCIsIk1BWF9WQUxVRSIsInNoaWZ0IiwibmVpZ2hib3VyIiwidGVudGF0aXZlX2Rpc3QiLCJzZXEiLCJyZXZlcnNlIiwiUmVuZGVyZXIiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiY29sb3VyIiwiYmVnaW5QYXRoIiwiYXJjIiwiZmlsbFN0eWxlIiwiZmlsbCIsIl9saW5lIiwidyIs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O0FBQ0QsT0FQRCxNQU9PO0FBQ1A7O0FBRE87QUFBQTtBQUFBOztBQUFBO0FBR0wsK0JBQWMvRCxPQUFkLDhIQUNBO0FBQUEsZ0JBRFNmLENBQ1Q7O0FBQ0UsaUJBQUssSUFBSWtCLElBQUUsQ0FBWCxFQUFjQSxJQUFFbEIsRUFBRTlELE1BQUYsR0FBUyxDQUF6QixFQUE0QmdGLEdBQTVCLEVBQ0E7QUFDRSxtQkFBSzZELEtBQUwsQ0FBVy9FLEVBQUVrQixDQUFGLENBQVgsRUFBaUJsQixFQUFFa0IsSUFBRSxDQUFKLENBQWpCLEVBQXlCd0QsTUFBekIsRUFBaUNGLEtBQWpDO0FBQ0Q7QUFDRjtBQVRJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXTjtBQUVGOzs7MEJBRUtySSxDLEVBQUdDLEMsRUFBR1IsQyxFQUFHb0osQyxFQUNmO0FBQ0UsV0FBS1gsT0FBTCxDQUFhWSxTQUFiLEdBQXlCRCxDQUF6QjtBQUNBLFdBQUtYLE9BQUwsQ0FBYWEsV0FBYixHQUEyQnRKLEtBQUssT0FBaEM7QUFDQSxXQUFLeUksT0FBTCxDQUFhTSxTQUFiO0FBQ0EsV0FBS04sT0FBTCxDQUFhYyxNQUFiLENBQW9CaEosRUFBRSxDQUFGLEtBQU0sQ0FBMUIsRUFBNEJBLEVBQUUsQ0FBRixLQUFNLENBQWxDO0FBQ0EsV0FBS2tJLE9BQUwsQ0FBYWUsTUFBYixDQUFvQmhKLEVBQUUsQ0FBRixLQUFNLENBQTFCLEVBQTRCQSxFQUFFLENBQUYsS0FBTSxDQUFsQztBQUNBLFdBQUtpSSxPQUFMLENBQWFnQixNQUFiO0FBQ0Q7Ozs7OztrQkFoRGtCakIsUSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxY2JiZDU2NDM2Yzc2MDZmYjNiOCIsIlxuXG5mdW5jdGlvbiBTcXVhcmUoeCwgeSwgc2l6ZSlcbntcbiAgbGV0IGhzaXplID0gc2l6ZT4+MTtcbiAgbGV0IHNxID0gW107XG4gIC8vIG9yIGp1c3QgbWFrZSBhIHVuaXQgc3F1YXJlIGFuZCBzY2FsZSBpdCB1cCBkdWggOnxcbiAgLy8gdG9wIGxlZnRcbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSAtIGhzaXplXSApO1xuICAvLyB0b3AgcmlnaHRcbiAgc3EucHVzaCggW3ggKyBoc2l6ZSwgeSAtIGhzaXplXSApO1xuICAvLyBib3R0b20gcmlnaHRcbiAgc3EucHVzaCggW3ggKyBoc2l6ZSwgeSArIGhzaXplXSApO1xuICAvLyBib3R0b20gbGVmdFxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5ICsgaHNpemVdICk7XG4gIC8vIHRvcCBsZWZ0IGFnYWluXG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgLSBoc2l6ZV0gKTtcblxuICByZXR1cm4gc3E7XG59XG5cbi8vIGVxdWlsYXRlcmFsXG5mdW5jdGlvbiBUcmlhbmdsZSh4LCB5LCBzaXplKVxue1xuICBsZXQgYW5nbGUgPSAwO1xuICBsZXQgciA9IChzaXplLzIuMCkvTWF0aC5zaW4oTWF0aC5QSSo2MC8xODApO1xuICBsZXQgdHJpID0gW107XG5cbiAgZm9yKGxldCBpPTA7IGk8PTM7IGkrKylcbiAge1xuICAgIHRyaS5wdXNoKFtcbiAgICAgIHggKyByICogTWF0aC5jb3MoYW5nbGUgKyAoaSAlIDMpICogMiAqIE1hdGguUEkvMyksXG4gICAgICB5ICsgciAqIE1hdGguc2luKGFuZ2xlICsgKGkgJSAzKSAqIDIgKiBNYXRoLlBJLzMpXG4gICAgXSk7XG4gIH1cblxuICByZXR1cm4gdHJpO1xufVxuXG5mdW5jdGlvbiByb3RhdGUoc2hhcGUsIHJ4LCByeSwgZGEpXG57XG4gIGZvciAobGV0IHBhaXIgb2Ygc2hhcGUpXG4gICAgcGFpciA9IHJvdGF0ZV9wb2ludChyeCwgcnksIGRhLCBwYWlyKTtcbn1cblxuZnVuY3Rpb24gdHJhbnNsYXRlKHNoYXBlLCBkeCwgZHkpXG57XG4gIGZvciAobGV0IHBhaXIgb2Ygc2hhcGUpXG4gIHtcbiAgICBwYWlyWzBdICs9IGR4O1xuICAgIHBhaXJbMV0gKz0gZHk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm90YXRlX3BvaW50KGN4LCBjeSwgYW5nbGUsIHApXG57XG4gIGxldCBzID0gTWF0aC5zaW4oYW5nbGUpO1xuICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlKTtcblxuICAvLyB0cmFuc2xhdGUgcG9pbnQgYmFjayB0byBvcmlnaW46XG4gIHBbMF0gLT0gY3g7XG4gIHBbMV0gLT0gY3k7XG5cbiAgLy8gcm90YXRlIHBvaW50XG4gIGxldCB4bmV3ID0gcFswXSAqIGMgLSBwWzFdICogcztcbiAgbGV0IHluZXcgPSBwWzBdICogcyArIHBbMV0gKiBjO1xuXG4gIC8vIHRyYW5zbGF0ZSBwb2ludCBiYWNrOlxuICBwWzBdID0geG5ldyArIGN4O1xuICBwWzFdID0geW5ldyArIGN5O1xuXG4gIHJldHVybiBwO1xufVxuXG5cbmZ1bmN0aW9uIHBvaW50X2luX3BvbHlnb24ocG9pbnQsIHZlcnRpY2VzKVxue1xuICBmb3IgKGxldCBpPTA7IGk8dmVydGljZXMubGVuZ3RoLTE7IGkrKylcbiAge1xuICAgIGxldCBhID0gdmVydGljZXNbaV07XG4gICAgbGV0IGIgPSB2ZXJ0aWNlc1tpKzFdO1xuXG4gICAgbGV0IHNlZyA9IHN1YnRyYWN0UG9pbnRzKGIsIGEpO1xuICAgIGxldCBwdCA9IHN1YnRyYWN0UG9pbnRzKHBvaW50LCBhKTtcbiAgICBsZXQgaW5zaWRlID0gKGNyb3NzUHJvZHVjdChzZWcsIHB0KSA+IDApO1xuICAgIC8vIGNvbnNvbGUubG9nKGluc2lkZSk7XG4gICAgaWYgKCFpbnNpZGUpIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5cbi8qKlxuICogQGF1dGhvciBQZXRlciBLZWxsZXlcbiAqIEBhdXRob3IgcGdrZWxsZXk0QGdtYWlsLmNvbVxuICovXG4vKipcbiAqIFNlZSBpZiB0d28gbGluZSBzZWdtZW50cyBpbnRlcnNlY3QuIFRoaXMgdXNlcyB0aGVcbiAqIHZlY3RvciBjcm9zcyBwcm9kdWN0IGFwcHJvYWNoIGRlc2NyaWJlZCBiZWxvdzpcbiAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzU2NTI4Mi83ODYzMzlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcCBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBzdGFydCBvZiB0aGUgMXN0IGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgZW5kIG9mIHRoZSAxc3QgbGluZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIHN0YXJ0IG9mIHRoZSAybmQgbGluZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBxMiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBlbmQgb2YgdGhlIDJuZCBsaW5lLlxuICovXG5cbmZ1bmN0aW9uIGludGVyc2VjdHMoYXAsIGFwMiwgYXEsIGFxMilcbntcbiAgLy8gQU06IE5vdGUgdG8gZGV2ZWxvcGVycywgcGxlYXNlIGRvbid0IHVzZSBuYW1lZCBwcm9wZXJ0aWVzIGZvciB2ZWN0b3JzXG4gIC8vICAgICBJdCdzIGRhZnQuIFVzZSBhcnJheXMuXG4gIHJldHVybiBkb0xpbmVTZWdtZW50c0ludGVyc2VjdCgge3g6IGFwWzBdLCB5OiBhcFsxXX0sIHt4OiBhcDJbMF0sIHk6IGFwMlsxXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3g6IGFxWzBdLCB5OiBhcVsxXX0sIHt4OiBhcTJbMF0sIHk6IGFxMlsxXX0gKTtcbn1cblxuZnVuY3Rpb24gaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsocCwgcDIsIHEsIHEyKVxue1xuICB2YXIgYm94MSA9IHtcbiAgICB4bWluOiBNYXRoLm1pbihwLngsIHAyLngpLFxuICAgIHltaW46IE1hdGgubWluKHAueSwgcDIueSksXG4gICAgeG1heDogTWF0aC5tYXgocC54LCBwMi54KSxcbiAgICB5bWF4OiBNYXRoLm1heChwLnksIHAyLnkpXG4gIH07XG5cbiAgdmFyIGJveDIgPSB7XG4gICAgeG1pbjogTWF0aC5taW4ocS54LCBxMi54KSxcbiAgICB5bWluOiBNYXRoLm1pbihxLnksIHEyLnkpLFxuICAgIHhtYXg6IE1hdGgubWF4KHEueCwgcTIueCksXG4gICAgeW1heDogTWF0aC5tYXgocS55LCBxMi55KVxuICB9O1xuXG4gIHJldHVybiBiYm94X2NvbnRhaW5lZChib3gxLCBib3gyKSB8fCBiYm94X2NvbnRhaW5lZChib3gyLCBib3gxKTtcbn1cblxuZnVuY3Rpb24gYmJveF9jb250YWluZWQoYSwgYilcbntcbiAgLy8gSXMgQm94IEIgY29tcGxldGVseSBpbnNpZGUgYm94IEEgP1xuICByZXR1cm4gKGIueG1pbiA+PSBhLnhtaW4gJiYgYi54bWF4IDw9IGEueG1heCkgJiYgKGIueW1pbiA+PSBhLnltaW4gJiYgYi55bWF4IDw9IGEueW1heCk7XG59XG5cblxuZnVuY3Rpb24gZG9MaW5lU2VnbWVudHNJbnRlcnNlY3QocCwgcDIsIHEsIHEyKVxue1xuICAvLyB2YXIgZGVidWdfc3RyaW5nID0gYGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0OiAoJHtwLnh9LCAke3AueX0pLSgke3AyLnh9LCAke3AyLnl9KSAgd2l0aCAgKCR7cS54fSwgJHtxLnl9KS0oJHtxMi54fSwgJHtxMi55fSlgO1xuXG5cdHZhciByID0gc3VidHJhY3RQb2ludHMocDIsIHApO1xuXHR2YXIgcyA9IHN1YnRyYWN0UG9pbnRzKHEyLCBxKTtcblxuXHR2YXIgdU51bWVyYXRvciA9IGNyb3NzUHJvZHVjdChzdWJ0cmFjdFBvaW50cyhxLCBwKSwgcik7XG5cdHZhciBkZW5vbWluYXRvciA9IGNyb3NzUHJvZHVjdChyLCBzKTtcblxuXHRpZiAodU51bWVyYXRvciA9PSAwICYmIGRlbm9taW5hdG9yID09IDApIHtcblx0XHQvLyBUaGV5IGFyZSBjb0xsaW5lYXJcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiQ29wbGFuYXJcIik7XG5cblx0XHQvLyBEbyB0aGV5IHRvdWNoPyAoQXJlIGFueSBvZiB0aGUgcG9pbnRzIGVxdWFsPylcblx0XHRpZiAoZXF1YWxQb2ludHMocCwgcSkgfHwgZXF1YWxQb2ludHMocCwgcTIpIHx8IGVxdWFsUG9pbnRzKHAyLCBxKSB8fCBlcXVhbFBvaW50cyhwMiwgcTIpKSB7XG5cdFx0XHRyZXR1cm4ge1xuICAgICAgICBpbnRlcnNlY3Q6IHRydWUsXG4gICAgICAgIGtpc3M6ICFpc19vbmVfYmJveF9jb250YWluZWRfYnlfdGhlX290aGVyX3F1ZXN0aW9ubWFyayhwLCBwMiwgcSwgcTIpXG4gICAgICB9O1xuXG5cdFx0fVxuXHRcdC8vIERvIHRoZXkgb3ZlcmxhcD8gKEFyZSBhbGwgdGhlIHBvaW50IGRpZmZlcmVuY2VzIGluIGVpdGhlciBkaXJlY3Rpb24gdGhlIHNhbWUgc2lnbilcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiUG9pbnRzIERPTlQgdG91Y2hcIik7XG5cblx0XHRyZXR1cm4ge1xuICAgICAgaW50ZXJzZWN0OlxuICAgICAgICAgICAgIWFsbEVxdWFsKFxuICAgICAgXHRcdFx0XHQocS54IC0gcC54IDwgMCksXG4gICAgICBcdFx0XHRcdChxLnggLSBwMi54IDwgMCksXG4gICAgICBcdFx0XHRcdChxMi54IC0gcC54IDwgMCksXG4gICAgICBcdFx0XHRcdChxMi54IC0gcDIueCA8IDApKSB8fFxuICAgICAgXHRcdFx0IWFsbEVxdWFsKFxuICAgICAgXHRcdFx0XHQocS55IC0gcC55IDwgMCksXG4gICAgICBcdFx0XHRcdChxLnkgLSBwMi55IDwgMCksXG4gICAgICBcdFx0XHRcdChxMi55IC0gcC55IDwgMCksXG4gICAgICBcdFx0XHRcdChxMi55IC0gcDIueSA8IDApKSxcbiAgICAgICAga2lzczogZmFsc2VcbiAgICAgIH07XG5cblx0fVxuXG5cdGlmIChkZW5vbWluYXRvciA9PSAwKSB7XG5cdFx0Ly8gbGluZXMgYXJlIHBhcmFsZWxsXG5cdFx0cmV0dXJuIHtpbnRlcnNlY3Q6IGZhbHNlLCBraXNzOiBmYWxzZX07XG5cdH1cblxuXHR2YXIgdSA9IHVOdW1lcmF0b3IgLyBkZW5vbWluYXRvcjtcblx0dmFyIHQgPSBjcm9zc1Byb2R1Y3Qoc3VidHJhY3RQb2ludHMocSwgcCksIHMpIC8gZGVub21pbmF0b3I7XG5cbiAgLy8gY29uc29sZS5sb2coYHQ9JHt0fSwgdT0ke3V9YCk7XG4gIHZhciBraXNzID0gZmFsc2U7XG5cbiAgaWYgKGVxdWFsUG9pbnRzKHAsIHEpIHx8IGVxdWFsUG9pbnRzKHAsIHEyKSB8fCBlcXVhbFBvaW50cyhwMiwgcSkgfHwgZXF1YWxQb2ludHMocDIsIHEyKSlcbiAgICBraXNzID0gdHJ1ZTtcblxuICAvLyBsZXQgcmVzID1cbiAgLy9yZXR1cm5cbiAgcmV0dXJuIHtcbiAgICBpbnRlcnNlY3Q6ICh0ID49IDApICYmICh0IDw9IDEpICYmICh1ID49IDApICYmICh1IDw9IDEpLFxuICAgIGtpc3M6IGtpc3NcbiAgfTtcblxuICAvLyBjb25zb2xlLmxvZyhgJHtkZWJ1Z19zdHJpbmd9ID0gJHtyZXN9YCk7XG5cblx0Ly8gcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGUgdGhlIGNyb3NzIHByb2R1Y3Qgb2YgdGhlIHR3byBwb2ludHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIHRoZSBjcm9zcyBwcm9kdWN0IHJlc3VsdCBhcyBhIGZsb2F0XG4gKi9cbmZ1bmN0aW9uIGNyb3NzUHJvZHVjdChwb2ludDEsIHBvaW50Mikge1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHBvaW50MSkpXG4gICAgcmV0dXJuIHBvaW50MVswXSAqIHBvaW50MlsxXSAtIHBvaW50MVsxXSAqIHBvaW50MlswXTtcbiAgZWxzZVxuXHQgICByZXR1cm4gcG9pbnQxLnggKiBwb2ludDIueSAtIHBvaW50MS55ICogcG9pbnQyLng7XG59XG5cbi8qKlxuICogU3VidHJhY3QgdGhlIHNlY29uZCBwb2ludCBmcm9tIHRoZSBmaXJzdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICpcbiAqIEByZXR1cm4gdGhlIHN1YnRyYWN0aW9uIHJlc3VsdCBhcyBhIHBvaW50IG9iamVjdFxuICovXG5mdW5jdGlvbiBzdWJ0cmFjdFBvaW50cyhwb2ludDEsIHBvaW50Mikge1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHBvaW50MSkpXG4gIHtcbiAgICByZXR1cm4gWyBwb2ludDFbMF0gLSBwb2ludDJbMF0sIHBvaW50MVsxXSAtIHBvaW50MlsxXSBdO1xuICB9IGVsc2Uge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQueCA9IHBvaW50MS54IC0gcG9pbnQyLng7XG4gICAgcmVzdWx0LnkgPSBwb2ludDEueSAtIHBvaW50Mi55O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuXG4vKipcbiAqIFNlZSBpZiB0aGUgcG9pbnRzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICpcbiAqIEByZXR1cm4gaWYgdGhlIHBvaW50cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gZXF1YWxQb2ludHMocG9pbnQxLCBwb2ludDIpIHtcblx0cmV0dXJuIChwb2ludDEueCA9PSBwb2ludDIueCkgJiYgKHBvaW50MS55ID09IHBvaW50Mi55KVxufVxuXG4vKipcbiAqIFNlZSBpZiBhbGwgYXJndW1lbnRzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0gey4uLn0gYXJncyBhcmd1bWVudHMgdGhhdCB3aWxsIGJlIGNvbXBhcmVkIGJ5ICc9PScuXG4gKlxuICogQHJldHVybiBpZiBhbGwgYXJndW1lbnRzIGFyZSBlcXVhbFxuICovXG5mdW5jdGlvbiBhbGxFcXVhbChhcmdzKSB7XG5cdHZhciBmaXJzdFZhbHVlID0gYXJndW1lbnRzWzBdLFxuXHRcdGk7XG5cdGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRpZiAoYXJndW1lbnRzW2ldICE9IGZpcnN0VmFsdWUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5cblxuXG5leHBvcnQge1NxdWFyZSwgVHJpYW5nbGUsIGludGVyc2VjdHMsIHJvdGF0ZSwgdHJhbnNsYXRlLCBwb2ludF9pbl9wb2x5Z29ufSA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvVXRpbC5qcyIsIlxuaW1wb3J0IFNjZW5lICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vU2NlbmUnO1xuaW1wb3J0IFJlbmRlcmVyICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IHtTcXVhcmUsIHJvdGF0ZSwgdHJhbnNsYXRlfSAgICAgIGZyb20gJy4vVXRpbCc7XG5pbXBvcnQge3BvaW50X2luX3BvbHlnb24sIFRyaWFuZ2xlfSAgICAgZnJvbSAnLi9VdGlsJztcblxuY29uc3QgZWxlbWVudCA9ICdkaXNwbGF5JztcblxubGV0IHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKGVsZW1lbnQpO1xubGV0IHNjZW5lID0gbmV3IFNjZW5lKCk7XG5sZXQgaW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmZvVGV4dCcpO1xuXG4vLyBTaG93L2hpZGUgdGhlIHNjZW5lIGdyYXBoXG5sZXQgc2hvd0dyYXBoID0gdHJ1ZSwgc2hvd09ic3RhY2xlcyA9IHRydWU7XG5cbi8vIFN0YXJ0IHBvaW50IGFuZCBvdXIgZ29hbFxubGV0IHN0YXJ0ID0gWzEwLCAxMF07XG4vLyBsZXQgZW5kID0gWzM4MCwgNDIwXTtcbmxldCBlbmQgPSBbNDUwLCA1MjBdO1xubGV0IG14ID0gZW5kWzBdLCBteSA9IGVuZFsxXTtcblxuLy8gRm9yIHRoZSBzaGFwZSBhbmltYXRpb25zXG5sZXQgcm90eCA9IDMwMCwgcm90eSA9IDM1MDtcbmxldCBtb3Rpb24gPSAwLCByb3RhID0gMDtcblxuLy8gQ3JlYXRlIHNvbWUgZHluYW1pYyBvYnN0YWNsZXNcbmxldCBzcV9zbWFsbCA9IFNxdWFyZSg2NTAsIDEwMCwgMTUwKTtcbmxldCBzcV9sYXJnZSA9IFNxdWFyZShyb3R4LCByb3R5LCAzMDApO1xuXG5sZXQgb2JzdGFjbGVzID0gW1xuICBTcXVhcmUoODAsIDEyMCwgMTAwKSxcbiAgLy8sIFNxdWFyZSgxMiwxMiwgMiksXG4gIC8vc3Ffc21hbGwsXG4gIHNxX2xhcmdlXG5dO1xuXG4vLyBBZGQgdGhlbSBhbGwgdG8gdGhlIHNjZW5lXG5mb3IgKGxldCBvIG9mIG9ic3RhY2xlcylcbiAgc2NlbmUuYWRkKCBvICk7XG5cblxuLy8gREVCVUdHSU5HIFNUQVJUUyBIRVJFXG5cbnJvdGF0ZShzcV9sYXJnZSwgcm90eCwgcm90eSwgMC43ODUpO1xubGV0IHJvdXRlID0gc2NlbmUuc29sdmUoIHN0YXJ0LCBlbmQgKTtcbmNvbnNvbGUubG9nKHJvdXRlKTtcblxuXG5cbi8vL1xuXG5mcmFtZSgpO1xuXG5mdW5jdGlvbiBmcmFtZSgpXG57XG4gIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSggZnJhbWUgKTtcblxuICBoaWRlX2luZm8oKTtcblxuICBsZXQgaW5zaWRlID0gZG9kZ2VfbnVsbHNwYWNlKCk7XG5cbiAgLy8gRmluZCB0aGUgc2hvcnRlc3QgcGF0aC4gVHdvIHRoaW5ncyBoYXBwZW4gaGVyZTpcbiAgLy8gICAgMS4gQSBTY2VuZSBncmFwaCBpcyBleHRyYWN0ZWQgZnJvbSBvdXIgc2NlbmUgZ2VvbWV0cnlcbiAgLy8gICAgMi4gRGlqa3N0cmEncyBtZXRob2QgaXMgdXNlZCB0byBmaW5kIHRoZSBvcHRpbWFsIHJvdXRlIGFjcm9zcyB0aGUgZ3JhcGhcbiAgLy8gbGV0IHJvdXRlID0gc2NlbmUuc29sdmUoIHN0YXJ0LCBlbmQgKTtcblxuICAvLyBHZXQgYSB2aXN1YWxpc2F0aW9uIG9mIHRoZSBhY3R1YWwgc2NlbmVncmFwaFxuICBsZXQgdmlzID0gc2NlbmUudmlzKCk7XG5cbiAgcmVuZGVyZXIuY2xlYXIoKTtcblxuICBpZiAoc2hvd0dyYXBoKVxuICB7XG4gICAgLy8gRHJhdyB0aGUgc2NlbmUgZ3JhcGggbm9kZXNcbiAgICBmb3IgKGxldCBuIG9mIHZpcy5ub2RlcylcbiAgICAgIHJlbmRlcmVyLnJlbmRlciggbiwgJyNiYmInLCA1ICk7XG5cbiAgICAvLyBEcmF3IHRoZSBncmFwaCBlZGdlc1xuICAgIHJlbmRlcmVyLnJlbmRlciggdmlzLmVkZ2VzLCAnI2VlZScgKTtcbiAgfVxuXG4gIC8vIFJlbmRlciB0aGUgb3JpZ2luYWwgc2NlbmUgZ2VvbWV0cnkgb24gdG9wIG9mIHRoZSBncmFwaFxuICBpZiAoc2hvd09ic3RhY2xlcylcbiAge1xuICAgIHJlbmRlcmVyLnJlbmRlciggc3RhcnQsICcjMGEwJywgNiApO1xuICAgIHJlbmRlcmVyLnJlbmRlciggZW5kLCAnIzBhMCcsIDYgKTtcbiAgICByZW5kZXJlci5yZW5kZXIoIHNjZW5lLm9iamVjdHMsICcjMzMzJyApO1xuICB9XG5cbiAgLy8gVXNlciBoYXMgbW92ZWQgdGhlIG1vdXNlIGluc2lkZSBhIHNoYXBlIG9ic3RhY2xlIHdoaWNoIGludmFsaWRhdGVzIHRoZSBncmFwaFxuICBpZiAoaW5zaWRlID49IDApXG4gIHtcbiAgICBzaG93X2luZm8oXCJFbmQgcG9pbnQgaW5zaWRlIHNvbGlkIG9iamVjdCFcIilcbiAgICByZW5kZXJlci5yZW5kZXIoIFtzY2VuZS5vYmplY3RzW2luc2lkZV1dLCAnI2YwMCcsIDUgKTtcbiAgfVxuXG4gIC8vIE5vdyBkaXNwbGF5IHRoZSBmb3VuZCByb3V0ZSFcbiAgcmVuZGVyZXIucmVuZGVyKCBbcm91dGVdLCAnIzAwZicsIDMgKTtcblxuICAvLyBBbmltYXRpb25cbiAgbW90aW9uICs9IDAuMDU7IC8vIFNpbnVzb2lkYWxcbiAgdHJhbnNsYXRlKHNxX3NtYWxsLCAwLCAzICogTWF0aC5zaW4obW90aW9uICogMC4yNSAqIE1hdGguUEkpKTtcblxuICAvLyByb3RhdGUgdGhlIGJpZyBzcXVhcmVcbiAgLy8gaWYgKHNob3dPYnN0YWNsZXMpXG4gIC8vICAgcm90YXRlKHNxX2xhcmdlLCByb3R4LCByb3R5LCAwLjAwNSk7XG5cbn1cblxuLy8gU2F2ZSB0aGUgbGFzdCBrbm93biBtb3VzZSBwb3NpdGlvblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCkub25tb3VzZW1vdmUgPSBlID0+IHsgbXggPSBlLmNsaWVudFg7IG15ID0gZS5jbGllbnRZOyAgfVxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NiX2RlYnVnJykub25jbGljayA9IChlLCBjKSA9PiB7IHNob3dHcmFwaCA9IGUuc3JjRWxlbWVudC5jaGVja2VkOyB9XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2JfZGVidWcyJykub25jbGljayA9IChlLCBjKSA9PiB7IHNob3dPYnN0YWNsZXMgPSBlLnNyY0VsZW1lbnQuY2hlY2tlZDsgfVxuXG5mdW5jdGlvbiBzaG93X2luZm8odGV4dCkgeyBpbmZvLmlubmVySFRNTCA9IHRleHQ7IGluZm8uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7IH1cbmZ1bmN0aW9uIGhpZGVfaW5mbygpIHsgaW5mby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9XG5cbi8vIFRoaXMgcHJldmVudHMgYSBiaXQgb2YgYSBtZXNzIGZyb20gaGFwcGVuaW5nXG4vLyB3aGVuIHRoZSBtb3VzZSBjdXJzb3IgZHJpZnRzICppbnNpZGUqIGEgc3VwcG9zZWRseSBzb2xpZCBzaGFwZVxuZnVuY3Rpb24gZG9kZ2VfbnVsbHNwYWNlKClcbntcbiAgLy8gT3VyIHRlbnRhdGl2ZSBuZXcgY29vcmRpbmF0ZSAobGFzdCBrbm93biBtb3VzZSBwb3MpXG4gIGxldCBjID0gW214LCBteV07XG5cbiAgLy8gQ2hlY2sgdGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgZWFjaCBvZiBvdXIgc29saWQgc2hhcGVzXG4gIGZvciAobGV0IGkgaW4gb2JzdGFjbGVzKVxuICB7XG4gICAgbGV0IG8gPSBvYnN0YWNsZXNbaT4+MF07XG4gICAgLy8gT2ggbm8hXG4gICAgaWYgKHBvaW50X2luX3BvbHlnb24oYywgbykpICAvLyBzaW1wbGUgY29udmV4LW9ubHkgdGVzdFxuICAgIHtcbiAgICAgIC8vIFNldCB0aGUgZW5kcG9pbnQgdG8gdGhlIHN0YXJ0IHRvIHJlbW92ZSB0aGUgcmVkIGxpbmUgYW5kIGN1cnNvclxuICAgICAgZW5kID0gc3RhcnQ7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgLy8gQWxsIGdvb2QsIHNldCB0aGUgZW5kcG9pbnQgdG8gdGhlIGxhc3Qga25vd24gbW91c2UgcG9zXG4gIGVuZCA9IGM7XG4gIHJldHVybiAtMTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWluLmpzIiwiXG5pbXBvcnQgR3JhcGggICAgICAgICAgZnJvbSAnLi9HcmFwaCc7XG5pbXBvcnQge2ludGVyc2VjdHN9ICAgZnJvbSAnLi9VdGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmVcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgdGhpcy5vYmplY3RzID0gW107XG4gICAgdGhpcy5ncmFwaCA9IG51bGw7XG5cbiAgICAvLyBUaGlzIGlzIGp1c3QgZm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaFxuICAgIHRoaXMuX3ZpcyA9IG51bGw7XG4gIH1cblxuICBhZGQob2JqZWN0KVxuICB7XG4gICAgdGhpcy5vYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgfVxuXG4gIHNvbHZlKHN0YXJ0LCBlbmQpXG4gIHtcbiAgICB0aGlzLmdyYXBoID0gdGhpcy5fZ3JhcGgoc3RhcnQsIGVuZCk7XG4gICAgbGV0IG5vZGVzID0gdGhpcy5ncmFwaC5zaG9ydGVzdCgwLCAxKTsgLy8gWzBdIHN0YXJ0LCBbMV0gZW5kIChzZWUgLmdyYXBoKCkpXG5cbiAgICBjb25zb2xlLmxvZyhub2Rlcyk7XG5cbiAgICBsZXQgcm91dGUgPSBbXTtcbiAgICBmb3IgKGxldCBuIG9mIG5vZGVzKVxuICAgIHtcbiAgICAgIHJvdXRlLnB1c2godGhpcy5fdmlzLm5vZGVzWyBuIF0pO1xuICAgIH1cblxuICAgIHJldHVybiByb3V0ZTtcbiAgfVxuXG4gIHZpcygpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5fdmlzO1xuICB9XG5cbiAgLy8gRXh0cmFjdCBhIHNjZW5lZ3JhcGggZnJvbSBvdXIgY29udGludW91cyBldWNsaWRlYW4gZ2VvbWV0cnlcbiAgX2dyYXBoKHN0YXJ0LCBlbmQpXG4gIHtcbiAgICBsZXQgbm9kZXMgPSBbXTtcbiAgICBsZXQgZWRnZXMgPSBbXTtcblxuICAgIGxldCBnID0gbmV3IEdyYXBoKCk7XG5cbiAgICAvLyBGb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoXG4gICAgdGhpcy5fdmlzID0geyBub2RlczogW10sIGVkZ2VzOiBbXSB9O1xuXG4gICAgLy8gVGhpcyBpcyBqdXN0IGEgdGVtcCB2YWx1ZSB1c2VkIHRvIG1ha2Ugc3VyZSBzaGFwZXMgZG9uJ3QgcGVyZm9ybVxuICAgIC8vIGludGVyc2VjdGlvbiB0ZXN0cyBvbiB0aGVtc2VsdmVzICh0aGVpciBvd24gdmVydGljZXMsIGNyb3NzaW5nIGludGVybmFsbHkpXG4gICAgbGV0IHNoYXBlX2lkID0gMTtcblxuICAgIC8vIFRoZXNlIGZpcnN0IHR3byBub2RlcyBpbiB0aGUgZ3JhcGggYXJlIGEgc3BlY2lhbCBjYXNlXG4gICAgbm9kZXMucHVzaCgge3ZlcnRleDogc3RhcnQsICBzaGFwZTogc2hhcGVfaWQrK30gKTsgLy8gWzBdIHN0YXJ0IChzZWUgLnNvbHZlKCkpXG4gICAgbm9kZXMucHVzaCgge3ZlcnRleDogZW5kLCAgICBzaGFwZTogc2hhcGVfaWQrK30gKTsgLy8gWzFdIGVuZFxuXG4gICAgbGV0IGdlZGdlcyA9IFtdO1xuXG4gICAgLy8gZXh0cmFjdCBlYWNoIG9ic3RhY2xlJ3MgZWRnZXMgYW5kIG5vZGVzXG4gICAgZm9yIChsZXQgbyBvZiB0aGlzLm9iamVjdHMpXG4gICAge1xuICAgICAgc2hhcGVfaWQrKztcblxuICAgICAgbGV0IGU7XG4gICAgICBsZXQgYmFzZSA9IG5vZGVzLmxlbmd0aDtcbiAgICAgIGZvciAoZT0wOyBlPG8ubGVuZ3RoLTE7IGUrKylcbiAgICAgIHtcblxuICAgICAgICBsZXQgdjEgPSBiYXNlICsgZTtcbiAgICAgICAgLy8gRmZzIGFsYW4gd2hhdCBhIG1lc3MgKG4uYi4gaXQgdG9vayAzMCBtaW5zIG9mIGRlYnVnZ2luZyB0byBnZXQgdGhpcyBsaW5lIGJlbG93IGNvcnJlY3QpXG4gICAgICAgIC8vIGl0IHdhcyBvcmlnaW5hbGx5IChiYXNlICsgZSArIDEpICUgKG8ubGVuZ3RoLTEpKSB3aGljaCBpcyBxdWl0ZSBkaWZmZXJlbnQuXG4gICAgICAgIC8vIEkgdGhvdWdodCB0aGlzIHdhcyBnb2luZyB0byBiZSBzdWNoIGEgZGlmZmljdWx0IGJ1ZyB0byBmaXgsIEkgbmVhcmx5IGRpZG4ndCBib3RoZXIgdHJ5aW5nLlxuICAgICAgICAvLyB0YmgsIHRoZXNlIG5vZGUvZWRnZSBzdHJ1Y3R1cmVzIG5lZWQgYSBzZXJpb3VzIHJlZmFjdG9yaW5nIGlmIGV2ZXIgdGhpcyBwcm9ncmFtIGlzIGV4cGFuZGVkISEhXG4gICAgICAgIGxldCB2MiA9IGJhc2UgKyAoKGUgKyAxKSAlIChvLmxlbmd0aC0xKSk7XG5cbiAgICAgICAgZ2VkZ2VzLnB1c2goe1xuICAgICAgICAgIGluZGV4Olt2MSwgdjJdLFxuICAgICAgICAgIHZlcnRleDogW29bZV0sIG9bZSsxXV1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWRnZXMucHVzaChbb1tlXSwgb1tlKzFdXSk7XG5cbiAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgdmVydGV4OiBvW2VdLFxuICAgICAgICAgIHNoYXBlOiBzaGFwZV9pZFxuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgICAgLy8gdGhpcyBpc24ndCBhIGNsb3NlZCByaW5nIChtYXRjaGluZyBzdGFydCBhbmQgZW5kcClcbiAgICAgIGlmICghZXF1YWxzKG9bMF0sIG9bZV0pKVxuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB2ZXJ0ZXg6IG9bZV0sXG4gICAgICAgICAgc2hhcGU6IHNoYXBlX2lkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCBgbm9kZXNgIGluZGljZXMgdG8gZ3JhcGhcbiAgICBmb3IgKGxldCBpIGluIG5vZGVzKVxuICAgIHtcbiAgICAgIGcuYWRkdmVydGV4KE51bWJlcihpKSk7XG5cbiAgICAgIC8vIEZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICAgIHRoaXMuX3Zpcy5ub2Rlcy5wdXNoKG5vZGVzW051bWJlcihpKV0udmVydGV4KTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBnZSBvZiBnZWRnZXMpXG4gICAge1xuICAgICAgZy5hZGRlZGdlKGdlLmluZGV4WzBdLCBnZS5pbmRleFsxXSwgY29zdChnZS52ZXJ0ZXhbMF0sIGdlLnZlcnRleFsxXSkpO1xuICAgICAgdGhpcy5fdmlzLmVkZ2VzLnB1c2goW2dlLnZlcnRleFswXSwgZ2UudmVydGV4WzFdXSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIG9ic3RhY2xlcycgcGVybWltZXRlciBlZGdlcyB0byB0aGUgZ3JhcGhcbiAgICAvL1xuICAgIC8vIGZvciAobGV0IG8gb2YgdGhpcy5vYmplY3RzKVxuICAgIC8vIHtcbiAgICAvLyAgIGxldCBjb3JkcyA9IFwiXCI7XG4gICAgLy8gICBmb3IgKGxldCBlIG9mIG8pXG4gICAgLy8gICB7XG4gICAgLy8gICAgIGNvcmRzICs9IGAoJHtlfSksIGA7XG4gICAgLy8gICB9XG4gICAgLy8gICBjb25zb2xlLmxvZyhjb3Jkcyk7XG4gICAgLy8gfVxuICAgIC8vIGcuYWRkZWRnZSgpOiBwZXJpbWV0ZXIgb2YgYWxsIG9ic3RhY2xlc1xuXG4gICAgbGV0IG5lPTA7XG5cbiAgICBmb3IgKGxldCB4PTA7IHg8bm9kZXMubGVuZ3RoLTE7IHgrKylcbiAgICAgIGZvciAobGV0IHk9eCsxOyB5PG5vZGVzLmxlbmd0aDsgeSsrKVxuICAgICAge1xuICAgICAgICAgIGxldCBBID0gbm9kZXNbeF07XG4gICAgICAgICAgbGV0IEIgPSBub2Rlc1t5XTtcblxuICAgICAgICAgIC8vIFdlJ3JlIHRlc3RpbmcgdGhlIHNoYXBlJ3MgdmVydGljZXMgYWdhaW5zdCBpdHNlbGZcbiAgICAgICAgICAvLyB3aGljaCBsZWFkcyB0byBpbnRlcm5hbCBwYXRocyBpbnNpZGUgdGhlIHNoYXBlIChpbnZhbGlkISlcbiAgICAgICAgICBpZiAoQS5zaGFwZSA9PSBCLnNoYXBlKSBjb250aW51ZTtcblxuICAgICAgICAgIGxldCB0ZXN0ZWRnZSA9IFtBLnZlcnRleCwgQi52ZXJ0ZXhdO1xuXG4gICAgICAgICAgaWYgKGVkZ2V2aXNpYmlsdHkodGVzdGVkZ2UsIGVkZ2VzKSlcbiAgICAgICAgICB7XG4gICAgICAgICAgICBnLmFkZGVkZ2UoeCwgeSwgY29zdChBLnZlcnRleCwgQi52ZXJ0ZXgpKTtcblxuICAgICAgICAgICAgLy8gSnVzdCBmb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoLCBub24tZXNzZW50aWFsOlxuICAgICAgICAgICAgdGhpcy5fdmlzLmVkZ2VzLnB1c2goW0EudmVydGV4LCBCLnZlcnRleF0pO1xuICAgICAgICAgIH1cblxuICAgICAgfVxuXG5cbiAgICByZXR1cm4gZztcbiAgfVxuXG59XG5cblxuXG5mdW5jdGlvbiBjb3N0KGEsIGIpXG57XG4gIGxldCBkeCA9IGJbMF0gLSBhWzBdIC8vIHgyIC0geDFcbiAgbGV0IGR5ID0gYlsxXSAtIGFbMV07XG4gIHJldHVybiBNYXRoLnNxcnQoIGR4KmR4ICsgZHkqZHkgKTtcblxufVxuXG5mdW5jdGlvbiBlZGdldmlzaWJpbHR5KHRlc3RlZGdlLCBlZGdlcylcbntcbiAgLy8gY29uc29sZS5sb2coYFRlc3RpbmcgZWRnZTogJHt0ZXN0ZWRnZVswXX0sICR7dGVzdGVkZ2VbMV19YCk7XG5cbiAgZm9yIChsZXQgdD0wOyB0PGVkZ2VzLmxlbmd0aDsgdCsrKVxuICB7XG4gICAgbGV0IGUgPSBlZGdlc1t0XTtcblxuICAgIGxldCByZXMgPSBpbnRlcnNlY3RzKHRlc3RlZGdlWzBdLCB0ZXN0ZWRnZVsxXSwgZVswXSwgZVsxXSk7XG5cbiAgICAvLyBJZiBpbnRlcnNlY3Rpb24sIGNoZWNrIGl0J3Mgbm90IGp1c3QgdGhlIGVuZHBvaW50cyBraXNzaW5nIHdoaWNoIGlzIG9rXG4gICAgLy8gaW4gZmFjdCwgaXQncyBtb3JlIHRoYW4gJ29rJyAtIGl0J3MgZXhhY3RseSB3aGF0IHdlJ3JlIGxvb2tpbmcgZm9yXG4gICAgaWYgKHJlcy5pbnRlcnNlY3QgJiYgIXJlcy5raXNzKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5mdW5jdGlvbiBlcXVhbHMoYSwgYilcbntcbiAgcmV0dXJuIChhWzBdID09IGJbMF0gJiYgYVsxXSA9PSBiWzFdKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TY2VuZS5qcyIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcyA9IFtdO1xuICAgIHRoaXMuZWRnZXMgPSBbXTtcbiAgICB0aGlzLm51bWVkZ2VzID0gMDtcbiAgfVxuXG4gIGFkZHZlcnRleChuKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcy5wdXNoKG4pO1xuICAgIHRoaXMuZWRnZXNbbl0gPSBbXTtcbiAgfVxuXG4gIC8vIGFkamFjZW55IGVkZ2UgbGlzdFxuICBhZGRlZGdlKHYxLCB2MiwgY29zdClcbiAge1xuICAgIHRoaXMuZWRnZXNbdjFdLnB1c2goe2Rlc3Q6djIsIGNvc3R9KTtcbiAgICB0aGlzLmVkZ2VzW3YyXS5wdXNoKHtkZXN0OnYxLCBjb3N0fSk7XG5cbiAgICB0aGlzLm51bWVkZ2VzKys7XG4gIH1cblxuICAvLyBTdXBlciBiYXNpYyBpbXBsZW1lbnRhdGlvbiBvZiBEaWprc3RyYSdzIGFsZ29yaXRobVxuICAvLyBEaXJlY3RseSBmcm9tIHRoaXMgcmVjaXBlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EaWprc3RyYSUyN3NfYWxnb3JpdGhtI0FsZ29yaXRobVxuICBzaG9ydGVzdChzdGFydCwgZW5kKVxuICB7XG4gICAgbGV0IGN1cnJlbnRfbm9kZTtcbiAgICBsZXQgZGlzdCA9IFswXTtcbiAgICBsZXQgcHJldiA9IFtdO1xuICAgIGxldCB1bnZpc2l0ZWQgPSBbXTtcblxuICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnZlcnRpY2VzLmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgIGlmIChpKSBkaXN0W2ldID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgIHVudmlzaXRlZFtpXSA9IGk7XG4gICAgICBwcmV2W2ldID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyAnVmlzaXQnIGVhY2ggbm9kZSBvbmx5IG9uY2UsIGluIHR1cm5cbiAgICB3aGlsZSggKGN1cnJlbnRfbm9kZSA9IHVudmlzaXRlZC5zaGlmdCgpKSAhPSBudWxsIClcbiAgICB7XG4gICAgICAvLyBGb3IgZWFjaCBub2RlLCAnY2hlY2snIGl0cyBuZWlnaGJvdXJzLlxuICAgICAgLy8gV2hpbGUgd2Ugb25seSAndmlzaXQnIGVhY2ggbm9kZSBvbmNlLCBpdCdzIHRoaXMgcmVwZWF0ZWQgJ2NoZWNrJ2luZ1xuICAgICAgLy8gKGFuZCBvY2Nhc2lvbmFsIHJlY2FsY3VsYXRpbmcpIG9mIG5laWdoYm91cnMgdGhhdCBhbGxvd3MgdXMgdG8gZmluZFxuICAgICAgLy8gdGhlIHNob3J0ZXN0IHJvdXRlIHRocm91Z2ggdGhlIGdyYXBoIGZyb20gb3VyIHN0YXJ0IHBvaW50LlxuICAgICAgLy8gSW4gZmFjdCwgdGhlIGluaGVyZW50IHJlc3VsdCBvZiB0aGUgYWxnbyBpcyB0aGF0IHdlIGZpbmQgdGhlIHNob3J0ZXN0XG4gICAgICAvLyBwYXRoIHRvICpldmVyeSogcG9pbnQgaW4gdGhlIGdyYXBoXG4gICAgICBmb3IgKGxldCB0PTA7IHQ8dGhpcy5lZGdlc1tjdXJyZW50X25vZGVdLmxlbmd0aDsgdCsrKVxuICAgICAge1xuICAgICAgICAvLyB2ZXJ0ZXgvbm9kZSBJRFxuICAgICAgICBsZXQgbmVpZ2hib3VyID0gdGhpcy5lZGdlc1tjdXJyZW50X25vZGVdW3RdLmRlc3Q7XG5cbiAgICAgICAgLy8gRGlzdGFuY2UgZnJvbSBjdXJyZW50X25vZGUgdG8gbmVpZ2hib3VyXG4gICAgICAgIGxldCBjb3N0ID0gdGhpcy5lZGdlc1tjdXJyZW50X25vZGVdW3RdLmNvc3Q7XG5cbiAgICAgICAgLy8gRGlzdGFuY2UgdGh1cyBmYXIgb24gdGhpcyByb3V0ZSAodXAgdG8gY3VycmVudF9ub2RlKSArIGRpc3RhbmNlIHRvIG5laWdoYm91clxuICAgICAgICBsZXQgdGVudGF0aXZlX2Rpc3QgPSBkaXN0W2N1cnJlbnRfbm9kZV0gKyBjb3N0O1xuXG4gICAgICAgIC8vIEhhdmUgd2UgZm91bmQgYSBzaG9ydGVyIHBhdGg/XG4gICAgICAgIGlmICh0ZW50YXRpdmVfZGlzdCA8IGRpc3RbbmVpZ2hib3VyXSlcbiAgICAgICAge1xuICAgICAgICAgIGRpc3RbbmVpZ2hib3VyXSA9IHRlbnRhdGl2ZV9kaXN0OyAvLyBOZXcgZGlzdGFuY2UgdG8gdGhpcyBub2RlXG4gICAgICAgICAgcHJldltuZWlnaGJvdXJdID0gY3VycmVudF9ub2RlOyAgIC8vIFVwZGF0ZSB0aGUgcm91dGVcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGMgPSBlbmQsIHNlcSA9W2VuZF07XG5cbiAgICAvLyBmYWlsZWQgZm9yIHNvbWUgcmVhc29uLCBlLmcuIGltcG9zc2libGUgcG9pbnQgaW5zaWRlIG51bGxzcGFjZSBldGNcbiAgICBpZiAocHJldltjXSA9PSBudWxsKVxuICAgICAgcmV0dXJuIFtdO1xuXG4gICAgZG8ge1xuICAgICAgYyA9IHByZXZbY107XG4gICAgICBzZXEucHVzaChjKTtcbiAgICB9IHdoaWxlKGMgIT0gc3RhcnQpO1xuXG4gICAgcmV0dXJuIHNlcS5yZXZlcnNlKCk7XG5cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvR3JhcGguanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXJcbntcbiAgY29uc3RydWN0b3IoZWxlbWVudClcbiAge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICB9XG5cbiAgY2xlYXIoKVxuICB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgcmVuZGVyKG9iamVjdHMsIGNvbG91ciA9ICcjMDAwJywgd2lkdGggPSAyKVxuICB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdHMpKSByZXR1cm47XG5cbiAgICAvLyBwb2ludCB0eXBlXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdHNbMF0pKVxuICAgIHtcbiAgICAgIGNvbnN0IHAgPSBvYmplY3RzO1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LmFyYyhwWzBdPj4wLCBwWzFdPj4wLCB3aWR0aCwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvdXI7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgLy8gbGlzdCBvZiBzaGFwZXMgdHlwZVxuXG4gICAgICBmb3IgKGxldCBvIG9mIG9iamVjdHMpXG4gICAgICB7XG4gICAgICAgIGZvciAobGV0IGU9MDsgZTxvLmxlbmd0aC0xOyBlKyspXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLl9saW5lKG9bZV0sIG9bZSsxXSwgY29sb3VyLCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgX2xpbmUoYSwgYiwgYywgdylcbiAge1xuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB3O1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGMgfHwgJ2JsYWNrJztcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhhWzBdPj4wLGFbMV0+PjApO1xuICAgIHRoaXMuY29udGV4dC5saW5lVG8oYlswXT4+MCxiWzFdPj4wKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlcmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==