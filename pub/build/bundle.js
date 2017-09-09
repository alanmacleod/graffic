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
var end = [220, 120];

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

var obstacles = [(0, _Util.Square)(80, 120, 100), sq_small, sq_large];

// Add them all to the scene
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = obstacles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var o = _step.value;

    scene.add(o);
  } // DEBUGGING STARTS HERE

  // rotate(sq_large, rotx, roty, 0.785);
  // let route = scene.solve( start, end );
  // console.log(route);

  ///
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
  if (showObstacles) (0, _Util.rotate)(sq_large, rotx, roty, 0.005);
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
          // i.e. a straight line.
          // Later: In hindsight, I shouldn't have bothered trying to
          // support essentially dimensionless entities like a two-sided straight line in 2d space.
          // everything should be a closed ring, even if it's ininitely small.
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

      //TODO: refactor the node/edge data struct mess
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = gedges[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var ge = _step3.value;

          g.addedge(ge.index[0], ge.index[1], cost(ge.vertex[0], ge.vertex[1]));
          this._vis.edges.push([ge.vertex[0], ge.vertex[1]]);
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDcxYWMxNzM4OGNlZjc0YmIxMDQiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJUcmlhbmdsZSIsImFuZ2xlIiwiciIsIk1hdGgiLCJzaW4iLCJQSSIsInRyaSIsImkiLCJjb3MiLCJyb3RhdGUiLCJzaGFwZSIsInJ4IiwicnkiLCJkYSIsInBhaXIiLCJyb3RhdGVfcG9pbnQiLCJ0cmFuc2xhdGUiLCJkeCIsImR5IiwiY3giLCJjeSIsInAiLCJzIiwiYyIsInhuZXciLCJ5bmV3IiwicG9pbnRfaW5fcG9seWdvbiIsInBvaW50IiwidmVydGljZXMiLCJsZW5ndGgiLCJhIiwiYiIsInNlZyIsInN1YnRyYWN0UG9pbnRzIiwicHQiLCJpbnNpZGUiLCJjcm9zc1Byb2R1Y3QiLCJpbnRlcnNlY3RzIiwiYXAiLCJhcDIiLCJhcSIsImFxMiIsImRvTGluZVNlZ21lbnRzSW50ZXJzZWN0IiwiaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsiLCJwMiIsInEiLCJxMiIsImJveDEiLCJ4bWluIiwibWluIiwieW1pbiIsInhtYXgiLCJtYXgiLCJ5bWF4IiwiYm94MiIsImJib3hfY29udGFpbmVkIiwidU51bWVyYXRvciIsImRlbm9taW5hdG9yIiwiZXF1YWxQb2ludHMiLCJpbnRlcnNlY3QiLCJraXNzIiwiYWxsRXF1YWwiLCJ1IiwidCIsInBvaW50MSIsInBvaW50MiIsIkFycmF5IiwiaXNBcnJheSIsInJlc3VsdCIsImFyZ3MiLCJmaXJzdFZhbHVlIiwiYXJndW1lbnRzIiwiZWxlbWVudCIsInJlbmRlcmVyIiwic2NlbmUiLCJpbmZvIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNob3dHcmFwaCIsInNob3dPYnN0YWNsZXMiLCJzdGFydCIsImVuZCIsIm14IiwibXkiLCJyb3R4Iiwicm90eSIsIm1vdGlvbiIsInJvdGEiLCJzcV9zbWFsbCIsInNxX2xhcmdlIiwib2JzdGFjbGVzIiwibyIsImFkZCIsImZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaGlkZV9pbmZvIiwiZG9kZ2VfbnVsbHNwYWNlIiwicm91dGUiLCJzb2x2ZSIsInZpcyIsImNsZWFyIiwibm9kZXMiLCJuIiwicmVuZGVyIiwiZWRnZXMiLCJvYmplY3RzIiwic2hvd19pbmZvIiwib25tb3VzZW1vdmUiLCJlIiwiY2xpZW50WCIsImNsaWVudFkiLCJvbmNsaWNrIiwic3JjRWxlbWVudCIsImNoZWNrZWQiLCJ0ZXh0IiwiaW5uZXJIVE1MIiwic3R5bGUiLCJkaXNwbGF5IiwiU2NlbmUiLCJncmFwaCIsIl92aXMiLCJvYmplY3QiLCJfZ3JhcGgiLCJzaG9ydGVzdCIsImciLCJzaGFwZV9pZCIsInZlcnRleCIsImdlZGdlcyIsImJhc2UiLCJ2MSIsInYyIiwiaW5kZXgiLCJlcXVhbHMiLCJhZGR2ZXJ0ZXgiLCJOdW1iZXIiLCJnZSIsImFkZGVkZ2UiLCJjb3N0IiwibmUiLCJBIiwiQiIsInRlc3RlZGdlIiwiZWRnZXZpc2liaWx0eSIsInNxcnQiLCJyZXMiLCJHcmFwaCIsIm51bWVkZ2VzIiwiZGVzdCIsImN1cnJlbnRfbm9kZSIsImRpc3QiLCJwcmV2IiwidW52aXNpdGVkIiwiTUFYX1ZBTFVFIiwic2hpZnQiLCJuZWlnaGJvdXIiLCJ0ZW50YXRpdmVfZGlzdCIsInNlcSIsInJldmVyc2UiLCJSZW5kZXJlciIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJjb2xvdXIiLCJiZWdpblBhdGgiLCJhcmMiLCJmaWxsU3R5bGUiLCJmaWxsIiwiX2xp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RCxPQUFkLDhIQUNBO0FBQUEsZ0JBRFNkLENBQ1Q7O0FBQ0UsaUJBQUssSUFBSWlCLElBQUUsQ0FBWCxFQUFjQSxJQUFFakIsRUFBRTlELE1BQUYsR0FBUyxDQUF6QixFQUE0QitFLEdBQTVCLEVBQ0E7QUFDRSxtQkFBSzZELEtBQUwsQ0FBVzlFLEVBQUVpQixDQUFGLENBQVgsRUFBaUJqQixFQUFFaUIsSUFBRSxDQUFKLENBQWpCLEVBQXlCd0QsTUFBekIsRUFBaUNGLEtBQWpDO0FBQ0Q7QUFDRjtBQVRJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXTjtBQUVGOzs7MEJBRUtwSSxDLEVBQUdDLEMsRUFBR1IsQyxFQUFHbUosQyxFQUNmO0FBQ0UsV0FBS1gsT0FBTCxDQUFhWSxTQUFiLEdBQXlCRCxDQUF6QjtBQUNBLFdBQUtYLE9BQUwsQ0FBYWEsV0FBYixHQUEyQnJKLEtBQUssT0FBaEM7QUFDQSxXQUFLd0ksT0FBTCxDQUFhTSxTQUFiO0FBQ0EsV0FBS04sT0FBTCxDQUFhYyxNQUFiLENBQW9CL0ksRUFBRSxDQUFGLEtBQU0sQ0FBMUIsRUFBNEJBLEVBQUUsQ0FBRixLQUFNLENBQWxDO0FBQ0EsV0FBS2lJLE9BQUwsQ0FBYWUsTUFBYixDQUFvQi9JLEVBQUUsQ0FBRixLQUFNLENBQTFCLEVBQTRCQSxFQUFFLENBQUYsS0FBTSxDQUFsQztBQUNBLFdBQUtnSSxPQUFMLENBQWFnQixNQUFiO0FBQ0Q7Ozs7OztrQkFoRGtCakIsUSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwNzFhYzE3Mzg4Y2VmNzRiYjEwNCIsIlxuXG5mdW5jdGlvbiBTcXVhcmUoeCwgeSwgc2l6ZSlcbntcbiAgbGV0IGhzaXplID0gc2l6ZT4+MTtcbiAgbGV0IHNxID0gW107XG4gIC8vIG9yIGp1c3QgbWFrZSBhIHVuaXQgc3F1YXJlIGFuZCBzY2FsZSBpdCB1cCBkdWggOnxcbiAgLy8gdG9wIGxlZnRcbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSAtIGhzaXplXSApO1xuICAvLyB0b3AgcmlnaHRcbiAgc3EucHVzaCggW3ggKyBoc2l6ZSwgeSAtIGhzaXplXSApO1xuICAvLyBib3R0b20gcmlnaHRcbiAgc3EucHVzaCggW3ggKyBoc2l6ZSwgeSArIGhzaXplXSApO1xuICAvLyBib3R0b20gbGVmdFxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5ICsgaHNpemVdICk7XG4gIC8vIHRvcCBsZWZ0IGFnYWluXG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgLSBoc2l6ZV0gKTtcblxuICByZXR1cm4gc3E7XG59XG5cbi8vIGVxdWlsYXRlcmFsXG5mdW5jdGlvbiBUcmlhbmdsZSh4LCB5LCBzaXplKVxue1xuICBsZXQgYW5nbGUgPSAwO1xuICBsZXQgciA9IChzaXplLzIuMCkvTWF0aC5zaW4oTWF0aC5QSSo2MC8xODApO1xuICBsZXQgdHJpID0gW107XG5cbiAgZm9yKGxldCBpPTA7IGk8PTM7IGkrKylcbiAge1xuICAgIHRyaS5wdXNoKFtcbiAgICAgIHggKyByICogTWF0aC5jb3MoYW5nbGUgKyAoaSAlIDMpICogMiAqIE1hdGguUEkvMyksXG4gICAgICB5ICsgciAqIE1hdGguc2luKGFuZ2xlICsgKGkgJSAzKSAqIDIgKiBNYXRoLlBJLzMpXG4gICAgXSk7XG4gIH1cblxuICByZXR1cm4gdHJpO1xufVxuXG5mdW5jdGlvbiByb3RhdGUoc2hhcGUsIHJ4LCByeSwgZGEpXG57XG4gIGZvciAobGV0IHBhaXIgb2Ygc2hhcGUpXG4gICAgcGFpciA9IHJvdGF0ZV9wb2ludChyeCwgcnksIGRhLCBwYWlyKTtcbn1cblxuZnVuY3Rpb24gdHJhbnNsYXRlKHNoYXBlLCBkeCwgZHkpXG57XG4gIGZvciAobGV0IHBhaXIgb2Ygc2hhcGUpXG4gIHtcbiAgICBwYWlyWzBdICs9IGR4O1xuICAgIHBhaXJbMV0gKz0gZHk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm90YXRlX3BvaW50KGN4LCBjeSwgYW5nbGUsIHApXG57XG4gIGxldCBzID0gTWF0aC5zaW4oYW5nbGUpO1xuICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlKTtcblxuICAvLyB0cmFuc2xhdGUgcG9pbnQgYmFjayB0byBvcmlnaW46XG4gIHBbMF0gLT0gY3g7XG4gIHBbMV0gLT0gY3k7XG5cbiAgLy8gcm90YXRlIHBvaW50XG4gIGxldCB4bmV3ID0gcFswXSAqIGMgLSBwWzFdICogcztcbiAgbGV0IHluZXcgPSBwWzBdICogcyArIHBbMV0gKiBjO1xuXG4gIC8vIHRyYW5zbGF0ZSBwb2ludCBiYWNrOlxuICBwWzBdID0geG5ldyArIGN4O1xuICBwWzFdID0geW5ldyArIGN5O1xuXG4gIHJldHVybiBwO1xufVxuXG5cbmZ1bmN0aW9uIHBvaW50X2luX3BvbHlnb24ocG9pbnQsIHZlcnRpY2VzKVxue1xuICBmb3IgKGxldCBpPTA7IGk8dmVydGljZXMubGVuZ3RoLTE7IGkrKylcbiAge1xuICAgIGxldCBhID0gdmVydGljZXNbaV07XG4gICAgbGV0IGIgPSB2ZXJ0aWNlc1tpKzFdO1xuXG4gICAgbGV0IHNlZyA9IHN1YnRyYWN0UG9pbnRzKGIsIGEpO1xuICAgIGxldCBwdCA9IHN1YnRyYWN0UG9pbnRzKHBvaW50LCBhKTtcbiAgICBsZXQgaW5zaWRlID0gKGNyb3NzUHJvZHVjdChzZWcsIHB0KSA+IDApO1xuICAgIC8vIGNvbnNvbGUubG9nKGluc2lkZSk7XG4gICAgaWYgKCFpbnNpZGUpIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5cbi8qKlxuICogQGF1dGhvciBQZXRlciBLZWxsZXlcbiAqIEBhdXRob3IgcGdrZWxsZXk0QGdtYWlsLmNvbVxuICovXG4vKipcbiAqIFNlZSBpZiB0d28gbGluZSBzZWdtZW50cyBpbnRlcnNlY3QuIFRoaXMgdXNlcyB0aGVcbiAqIHZlY3RvciBjcm9zcyBwcm9kdWN0IGFwcHJvYWNoIGRlc2NyaWJlZCBiZWxvdzpcbiAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzU2NTI4Mi83ODYzMzlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcCBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBzdGFydCBvZiB0aGUgMXN0IGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgZW5kIG9mIHRoZSAxc3QgbGluZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIHN0YXJ0IG9mIHRoZSAybmQgbGluZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBxMiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBlbmQgb2YgdGhlIDJuZCBsaW5lLlxuICovXG5cbmZ1bmN0aW9uIGludGVyc2VjdHMoYXAsIGFwMiwgYXEsIGFxMilcbntcbiAgLy8gQU06IE5vdGUgdG8gZGV2ZWxvcGVycywgcGxlYXNlIGRvbid0IHVzZSBuYW1lZCBwcm9wZXJ0aWVzIGZvciB2ZWN0b3JzXG4gIC8vICAgICBJdCdzIGRhZnQuIFVzZSBhcnJheXMuXG4gIHJldHVybiBkb0xpbmVTZWdtZW50c0ludGVyc2VjdCgge3g6IGFwWzBdLCB5OiBhcFsxXX0sIHt4OiBhcDJbMF0sIHk6IGFwMlsxXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3g6IGFxWzBdLCB5OiBhcVsxXX0sIHt4OiBhcTJbMF0sIHk6IGFxMlsxXX0gKTtcbn1cblxuZnVuY3Rpb24gaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsocCwgcDIsIHEsIHEyKVxue1xuICB2YXIgYm94MSA9IHtcbiAgICB4bWluOiBNYXRoLm1pbihwLngsIHAyLngpLFxuICAgIHltaW46IE1hdGgubWluKHAueSwgcDIueSksXG4gICAgeG1heDogTWF0aC5tYXgocC54LCBwMi54KSxcbiAgICB5bWF4OiBNYXRoLm1heChwLnksIHAyLnkpXG4gIH07XG5cbiAgdmFyIGJveDIgPSB7XG4gICAgeG1pbjogTWF0aC5taW4ocS54LCBxMi54KSxcbiAgICB5bWluOiBNYXRoLm1pbihxLnksIHEyLnkpLFxuICAgIHhtYXg6IE1hdGgubWF4KHEueCwgcTIueCksXG4gICAgeW1heDogTWF0aC5tYXgocS55LCBxMi55KVxuICB9O1xuXG4gIHJldHVybiBiYm94X2NvbnRhaW5lZChib3gxLCBib3gyKSB8fCBiYm94X2NvbnRhaW5lZChib3gyLCBib3gxKTtcbn1cblxuZnVuY3Rpb24gYmJveF9jb250YWluZWQoYSwgYilcbntcbiAgLy8gSXMgQm94IEIgY29tcGxldGVseSBpbnNpZGUgYm94IEEgP1xuICByZXR1cm4gKGIueG1pbiA+PSBhLnhtaW4gJiYgYi54bWF4IDw9IGEueG1heCkgJiYgKGIueW1pbiA+PSBhLnltaW4gJiYgYi55bWF4IDw9IGEueW1heCk7XG59XG5cblxuZnVuY3Rpb24gZG9MaW5lU2VnbWVudHNJbnRlcnNlY3QocCwgcDIsIHEsIHEyKVxue1xuICAvLyB2YXIgZGVidWdfc3RyaW5nID0gYGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0OiAoJHtwLnh9LCAke3AueX0pLSgke3AyLnh9LCAke3AyLnl9KSAgd2l0aCAgKCR7cS54fSwgJHtxLnl9KS0oJHtxMi54fSwgJHtxMi55fSlgO1xuXG5cdHZhciByID0gc3VidHJhY3RQb2ludHMocDIsIHApO1xuXHR2YXIgcyA9IHN1YnRyYWN0UG9pbnRzKHEyLCBxKTtcblxuXHR2YXIgdU51bWVyYXRvciA9IGNyb3NzUHJvZHVjdChzdWJ0cmFjdFBvaW50cyhxLCBwKSwgcik7XG5cdHZhciBkZW5vbWluYXRvciA9IGNyb3NzUHJvZHVjdChyLCBzKTtcblxuXHRpZiAodU51bWVyYXRvciA9PSAwICYmIGRlbm9taW5hdG9yID09IDApIHtcblx0XHQvLyBUaGV5IGFyZSBjb0xsaW5lYXJcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiQ29wbGFuYXJcIik7XG5cblx0XHQvLyBEbyB0aGV5IHRvdWNoPyAoQXJlIGFueSBvZiB0aGUgcG9pbnRzIGVxdWFsPylcblx0XHRpZiAoZXF1YWxQb2ludHMocCwgcSkgfHwgZXF1YWxQb2ludHMocCwgcTIpIHx8IGVxdWFsUG9pbnRzKHAyLCBxKSB8fCBlcXVhbFBvaW50cyhwMiwgcTIpKSB7XG5cdFx0XHRyZXR1cm4ge1xuICAgICAgICBpbnRlcnNlY3Q6IHRydWUsXG4gICAgICAgIGtpc3M6ICFpc19vbmVfYmJveF9jb250YWluZWRfYnlfdGhlX290aGVyX3F1ZXN0aW9ubWFyayhwLCBwMiwgcSwgcTIpXG4gICAgICB9O1xuXG5cdFx0fVxuXHRcdC8vIERvIHRoZXkgb3ZlcmxhcD8gKEFyZSBhbGwgdGhlIHBvaW50IGRpZmZlcmVuY2VzIGluIGVpdGhlciBkaXJlY3Rpb24gdGhlIHNhbWUgc2lnbilcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiUG9pbnRzIERPTlQgdG91Y2hcIik7XG5cblx0XHRyZXR1cm4ge1xuICAgICAgaW50ZXJzZWN0OlxuICAgICAgICAgICAgIWFsbEVxdWFsKFxuICAgICAgXHRcdFx0XHQocS54IC0gcC54IDwgMCksXG4gICAgICBcdFx0XHRcdChxLnggLSBwMi54IDwgMCksXG4gICAgICBcdFx0XHRcdChxMi54IC0gcC54IDwgMCksXG4gICAgICBcdFx0XHRcdChxMi54IC0gcDIueCA8IDApKSB8fFxuICAgICAgXHRcdFx0IWFsbEVxdWFsKFxuICAgICAgXHRcdFx0XHQocS55IC0gcC55IDwgMCksXG4gICAgICBcdFx0XHRcdChxLnkgLSBwMi55IDwgMCksXG4gICAgICBcdFx0XHRcdChxMi55IC0gcC55IDwgMCksXG4gICAgICBcdFx0XHRcdChxMi55IC0gcDIueSA8IDApKSxcbiAgICAgICAga2lzczogZmFsc2VcbiAgICAgIH07XG5cblx0fVxuXG5cdGlmIChkZW5vbWluYXRvciA9PSAwKSB7XG5cdFx0Ly8gbGluZXMgYXJlIHBhcmFsZWxsXG5cdFx0cmV0dXJuIHtpbnRlcnNlY3Q6IGZhbHNlLCBraXNzOiBmYWxzZX07XG5cdH1cblxuXHR2YXIgdSA9IHVOdW1lcmF0b3IgLyBkZW5vbWluYXRvcjtcblx0dmFyIHQgPSBjcm9zc1Byb2R1Y3Qoc3VidHJhY3RQb2ludHMocSwgcCksIHMpIC8gZGVub21pbmF0b3I7XG5cbiAgLy8gY29uc29sZS5sb2coYHQ9JHt0fSwgdT0ke3V9YCk7XG4gIHZhciBraXNzID0gZmFsc2U7XG5cbiAgaWYgKGVxdWFsUG9pbnRzKHAsIHEpIHx8IGVxdWFsUG9pbnRzKHAsIHEyKSB8fCBlcXVhbFBvaW50cyhwMiwgcSkgfHwgZXF1YWxQb2ludHMocDIsIHEyKSlcbiAgICBraXNzID0gdHJ1ZTtcblxuICAvLyBsZXQgcmVzID1cbiAgLy9yZXR1cm5cbiAgcmV0dXJuIHtcbiAgICBpbnRlcnNlY3Q6ICh0ID49IDApICYmICh0IDw9IDEpICYmICh1ID49IDApICYmICh1IDw9IDEpLFxuICAgIGtpc3M6IGtpc3NcbiAgfTtcblxuICAvLyBjb25zb2xlLmxvZyhgJHtkZWJ1Z19zdHJpbmd9ID0gJHtyZXN9YCk7XG5cblx0Ly8gcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGUgdGhlIGNyb3NzIHByb2R1Y3Qgb2YgdGhlIHR3byBwb2ludHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIHRoZSBjcm9zcyBwcm9kdWN0IHJlc3VsdCBhcyBhIGZsb2F0XG4gKi9cbmZ1bmN0aW9uIGNyb3NzUHJvZHVjdChwb2ludDEsIHBvaW50Mikge1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHBvaW50MSkpXG4gICAgcmV0dXJuIHBvaW50MVswXSAqIHBvaW50MlsxXSAtIHBvaW50MVsxXSAqIHBvaW50MlswXTtcbiAgZWxzZVxuXHQgICByZXR1cm4gcG9pbnQxLnggKiBwb2ludDIueSAtIHBvaW50MS55ICogcG9pbnQyLng7XG59XG5cbi8qKlxuICogU3VidHJhY3QgdGhlIHNlY29uZCBwb2ludCBmcm9tIHRoZSBmaXJzdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICpcbiAqIEByZXR1cm4gdGhlIHN1YnRyYWN0aW9uIHJlc3VsdCBhcyBhIHBvaW50IG9iamVjdFxuICovXG5mdW5jdGlvbiBzdWJ0cmFjdFBvaW50cyhwb2ludDEsIHBvaW50Mikge1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHBvaW50MSkpXG4gIHtcbiAgICByZXR1cm4gWyBwb2ludDFbMF0gLSBwb2ludDJbMF0sIHBvaW50MVsxXSAtIHBvaW50MlsxXSBdO1xuICB9IGVsc2Uge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQueCA9IHBvaW50MS54IC0gcG9pbnQyLng7XG4gICAgcmVzdWx0LnkgPSBwb2ludDEueSAtIHBvaW50Mi55O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuXG4vKipcbiAqIFNlZSBpZiB0aGUgcG9pbnRzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICpcbiAqIEByZXR1cm4gaWYgdGhlIHBvaW50cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gZXF1YWxQb2ludHMocG9pbnQxLCBwb2ludDIpIHtcblx0cmV0dXJuIChwb2ludDEueCA9PSBwb2ludDIueCkgJiYgKHBvaW50MS55ID09IHBvaW50Mi55KVxufVxuXG4vKipcbiAqIFNlZSBpZiBhbGwgYXJndW1lbnRzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0gey4uLn0gYXJncyBhcmd1bWVudHMgdGhhdCB3aWxsIGJlIGNvbXBhcmVkIGJ5ICc9PScuXG4gKlxuICogQHJldHVybiBpZiBhbGwgYXJndW1lbnRzIGFyZSBlcXVhbFxuICovXG5mdW5jdGlvbiBhbGxFcXVhbChhcmdzKSB7XG5cdHZhciBmaXJzdFZhbHVlID0gYXJndW1lbnRzWzBdLFxuXHRcdGk7XG5cdGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRpZiAoYXJndW1lbnRzW2ldICE9IGZpcnN0VmFsdWUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5cblxuXG5leHBvcnQge1NxdWFyZSwgVHJpYW5nbGUsIGludGVyc2VjdHMsIHJvdGF0ZSwgdHJhbnNsYXRlLCBwb2ludF9pbl9wb2x5Z29ufSA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvVXRpbC5qcyIsIlxuaW1wb3J0IFNjZW5lICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vU2NlbmUnO1xuaW1wb3J0IFJlbmRlcmVyICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IHtTcXVhcmUsIHJvdGF0ZSwgdHJhbnNsYXRlfSAgICAgIGZyb20gJy4vVXRpbCc7XG5pbXBvcnQge3BvaW50X2luX3BvbHlnb24sIFRyaWFuZ2xlfSAgICAgZnJvbSAnLi9VdGlsJztcblxuY29uc3QgZWxlbWVudCA9ICdkaXNwbGF5JztcblxubGV0IHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKGVsZW1lbnQpO1xubGV0IHNjZW5lID0gbmV3IFNjZW5lKCk7XG5sZXQgaW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmZvVGV4dCcpO1xuXG4vLyBTaG93L2hpZGUgdGhlIHNjZW5lIGdyYXBoXG5sZXQgc2hvd0dyYXBoID0gdHJ1ZSwgc2hvd09ic3RhY2xlcyA9IHRydWU7XG5cbi8vIFN0YXJ0IHBvaW50IGFuZCBvdXIgZ29hbFxubGV0IHN0YXJ0ID0gWzEwLCAxMF07XG4vLyBsZXQgZW5kID0gWzM4MCwgNDIwXTtcbmxldCBlbmQgPSBbMjIwLCAxMjBdO1xuXG5sZXQgbXggPSBlbmRbMF0sIG15ID0gZW5kWzFdO1xuXG4vLyBGb3IgdGhlIHNoYXBlIGFuaW1hdGlvbnNcbmxldCByb3R4ID0gMzAwLCByb3R5ID0gMzUwO1xubGV0IG1vdGlvbiA9IDAsIHJvdGEgPSAwO1xuXG4vLyBDcmVhdGUgc29tZSBkeW5hbWljIG9ic3RhY2xlc1xubGV0IHNxX3NtYWxsID0gU3F1YXJlKDY1MCwgMTAwLCAxNTApO1xubGV0IHNxX2xhcmdlID0gU3F1YXJlKHJvdHgsIHJvdHksIDMwMCk7XG5cbmxldCBvYnN0YWNsZXMgPSBbXG4gIFNxdWFyZSg4MCwgMTIwLCAxMDApLFxuICBzcV9zbWFsbCxcbiAgc3FfbGFyZ2Vcbl07XG5cbi8vIEFkZCB0aGVtIGFsbCB0byB0aGUgc2NlbmVcbmZvciAobGV0IG8gb2Ygb2JzdGFjbGVzKVxuICBzY2VuZS5hZGQoIG8gKTtcblxuXG4vLyBERUJVR0dJTkcgU1RBUlRTIEhFUkVcblxuLy8gcm90YXRlKHNxX2xhcmdlLCByb3R4LCByb3R5LCAwLjc4NSk7XG4vLyBsZXQgcm91dGUgPSBzY2VuZS5zb2x2ZSggc3RhcnQsIGVuZCApO1xuLy8gY29uc29sZS5sb2cocm91dGUpO1xuXG4vLy9cblxuZnJhbWUoKTtcblxuZnVuY3Rpb24gZnJhbWUoKVxue1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGZyYW1lICk7XG5cbiAgaGlkZV9pbmZvKCk7XG5cbiAgbGV0IGluc2lkZSA9IGRvZGdlX251bGxzcGFjZSgpO1xuXG4gIC8vIEZpbmQgdGhlIHNob3J0ZXN0IHBhdGguIFR3byB0aGluZ3MgaGFwcGVuIGhlcmU6XG4gIC8vICAgIDEuIEEgU2NlbmUgZ3JhcGggaXMgZXh0cmFjdGVkIGZyb20gb3VyIHNjZW5lIGdlb21ldHJ5XG4gIC8vICAgIDIuIERpamtzdHJhJ3MgbWV0aG9kIGlzIHVzZWQgdG8gZmluZCB0aGUgb3B0aW1hbCByb3V0ZSBhY3Jvc3MgdGhlIGdyYXBoXG4gIGxldCByb3V0ZSA9IHNjZW5lLnNvbHZlKCBzdGFydCwgZW5kICk7XG5cbiAgLy8gR2V0IGEgdmlzdWFsaXNhdGlvbiBvZiB0aGUgYWN0dWFsIHNjZW5lZ3JhcGhcbiAgbGV0IHZpcyA9IHNjZW5lLnZpcygpO1xuXG4gIHJlbmRlcmVyLmNsZWFyKCk7XG5cbiAgaWYgKHNob3dHcmFwaClcbiAge1xuICAgIC8vIERyYXcgdGhlIHNjZW5lIGdyYXBoIG5vZGVzXG4gICAgZm9yIChsZXQgbiBvZiB2aXMubm9kZXMpXG4gICAgICByZW5kZXJlci5yZW5kZXIoIG4sICcjYmJiJywgNSApO1xuXG4gICAgLy8gRHJhdyB0aGUgZ3JhcGggZWRnZXNcbiAgICByZW5kZXJlci5yZW5kZXIoIHZpcy5lZGdlcywgJyNlZWUnICk7XG4gIH1cblxuICAvLyBSZW5kZXIgdGhlIG9yaWdpbmFsIHNjZW5lIGdlb21ldHJ5IG9uIHRvcCBvZiB0aGUgZ3JhcGhcbiAgaWYgKHNob3dPYnN0YWNsZXMpXG4gIHtcbiAgICByZW5kZXJlci5yZW5kZXIoIHN0YXJ0LCAnIzBhMCcsIDYgKTtcbiAgICByZW5kZXJlci5yZW5kZXIoIGVuZCwgJyMwYTAnLCA2ICk7XG4gICAgcmVuZGVyZXIucmVuZGVyKCBzY2VuZS5vYmplY3RzLCAnIzMzMycgKTtcbiAgfVxuXG4gIC8vIFVzZXIgaGFzIG1vdmVkIHRoZSBtb3VzZSBpbnNpZGUgYSBzaGFwZSBvYnN0YWNsZSB3aGljaCBpbnZhbGlkYXRlcyB0aGUgZ3JhcGhcbiAgaWYgKGluc2lkZSA+PSAwKVxuICB7XG4gICAgc2hvd19pbmZvKFwiRW5kIHBvaW50IGluc2lkZSBzb2xpZCBvYmplY3QhXCIpXG4gICAgcmVuZGVyZXIucmVuZGVyKCBbc2NlbmUub2JqZWN0c1tpbnNpZGVdXSwgJyNmMDAnLCA1ICk7XG4gIH1cblxuICAvLyBOb3cgZGlzcGxheSB0aGUgZm91bmQgcm91dGUhXG4gIHJlbmRlcmVyLnJlbmRlciggW3JvdXRlXSwgJyMwMGYnLCAzICk7XG5cbiAgLy8gQW5pbWF0aW9uXG4gIG1vdGlvbiArPSAwLjA1OyAvLyBTaW51c29pZGFsXG4gIHRyYW5zbGF0ZShzcV9zbWFsbCwgMCwgMyAqIE1hdGguc2luKG1vdGlvbiAqIDAuMjUgKiBNYXRoLlBJKSk7XG5cbiAgLy8gcm90YXRlIHRoZSBiaWcgc3F1YXJlXG4gIGlmIChzaG93T2JzdGFjbGVzKVxuICAgIHJvdGF0ZShzcV9sYXJnZSwgcm90eCwgcm90eSwgMC4wMDUpO1xuXG59XG5cbi8vIFNhdmUgdGhlIGxhc3Qga25vd24gbW91c2UgcG9zaXRpb25cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpLm9ubW91c2Vtb3ZlID0gZSA9PiB7IG14ID0gZS5jbGllbnRYOyBteSA9IGUuY2xpZW50WTsgIH1cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYl9kZWJ1ZycpLm9uY2xpY2sgPSAoZSwgYykgPT4geyBzaG93R3JhcGggPSBlLnNyY0VsZW1lbnQuY2hlY2tlZDsgfVxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NiX2RlYnVnMicpLm9uY2xpY2sgPSAoZSwgYykgPT4geyBzaG93T2JzdGFjbGVzID0gZS5zcmNFbGVtZW50LmNoZWNrZWQ7IH1cblxuZnVuY3Rpb24gc2hvd19pbmZvKHRleHQpIHsgaW5mby5pbm5lckhUTUwgPSB0ZXh0OyBpbmZvLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyB9XG5mdW5jdGlvbiBoaWRlX2luZm8oKSB7IGluZm8uc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfVxuXG4vLyBUaGlzIHByZXZlbnRzIGEgYml0IG9mIGEgbWVzcyBmcm9tIGhhcHBlbmluZ1xuLy8gd2hlbiB0aGUgbW91c2UgY3Vyc29yIGRyaWZ0cyAqaW5zaWRlKiBhIHN1cHBvc2VkbHkgc29saWQgc2hhcGVcbmZ1bmN0aW9uIGRvZGdlX251bGxzcGFjZSgpXG57XG4gIC8vIE91ciB0ZW50YXRpdmUgbmV3IGNvb3JkaW5hdGUgKGxhc3Qga25vd24gbW91c2UgcG9zKVxuICBsZXQgYyA9IFtteCwgbXldO1xuXG4gIC8vIENoZWNrIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIGVhY2ggb2Ygb3VyIHNvbGlkIHNoYXBlc1xuICBmb3IgKGxldCBpIGluIG9ic3RhY2xlcylcbiAge1xuICAgIGxldCBvID0gb2JzdGFjbGVzW2k+PjBdO1xuICAgIC8vIE9oIG5vIVxuICAgIGlmIChwb2ludF9pbl9wb2x5Z29uKGMsIG8pKSAgLy8gc2ltcGxlIGNvbnZleC1vbmx5IHRlc3RcbiAgICB7XG4gICAgICAvLyBTZXQgdGhlIGVuZHBvaW50IHRvIHRoZSBzdGFydCB0byByZW1vdmUgdGhlIHJlZCBsaW5lIGFuZCBjdXJzb3JcbiAgICAgIGVuZCA9IHN0YXJ0O1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIC8vIEFsbCBnb29kLCBzZXQgdGhlIGVuZHBvaW50IHRvIHRoZSBsYXN0IGtub3duIG1vdXNlIHBvc1xuICBlbmQgPSBjO1xuICByZXR1cm4gLTE7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuaW1wb3J0IEdyYXBoICAgICAgICAgIGZyb20gJy4vR3JhcGgnO1xuaW1wb3J0IHtpbnRlcnNlY3RzfSAgIGZyb20gJy4vVXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHRoaXMub2JqZWN0cyA9IFtdO1xuICAgIHRoaXMuZ3JhcGggPSBudWxsO1xuXG4gICAgLy8gVGhpcyBpcyBqdXN0IGZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICB0aGlzLl92aXMgPSBudWxsO1xuICB9XG5cbiAgYWRkKG9iamVjdClcbiAge1xuICAgIHRoaXMub2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gIH1cblxuICBzb2x2ZShzdGFydCwgZW5kKVxuICB7XG4gICAgdGhpcy5ncmFwaCA9IHRoaXMuX2dyYXBoKHN0YXJ0LCBlbmQpO1xuICAgIGxldCBub2RlcyA9IHRoaXMuZ3JhcGguc2hvcnRlc3QoMCwgMSk7IC8vIFswXSBzdGFydCwgWzFdIGVuZCAoc2VlIC5ncmFwaCgpKVxuXG4gICAgbGV0IHJvdXRlID0gW107XG4gICAgXG4gICAgZm9yIChsZXQgbiBvZiBub2RlcylcbiAgICAgIHJvdXRlLnB1c2godGhpcy5fdmlzLm5vZGVzWyBuIF0pO1xuXG4gICAgcmV0dXJuIHJvdXRlO1xuICB9XG5cbiAgdmlzKClcbiAge1xuICAgIHJldHVybiB0aGlzLl92aXM7XG4gIH1cblxuICAvLyBFeHRyYWN0IGEgc2NlbmVncmFwaCBmcm9tIG91ciBjb250aW51b3VzIGV1Y2xpZGVhbiBnZW9tZXRyeVxuICBfZ3JhcGgoc3RhcnQsIGVuZClcbiAge1xuICAgIGxldCBub2RlcyA9IFtdO1xuICAgIGxldCBlZGdlcyA9IFtdO1xuXG4gICAgbGV0IGcgPSBuZXcgR3JhcGgoKTtcblxuICAgIC8vIEZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICB0aGlzLl92aXMgPSB7IG5vZGVzOiBbXSwgZWRnZXM6IFtdIH07XG5cbiAgICAvLyBUaGlzIGlzIGp1c3QgYSB0ZW1wIHZhbHVlIHVzZWQgdG8gbWFrZSBzdXJlIHNoYXBlcyBkb24ndCBwZXJmb3JtXG4gICAgLy8gaW50ZXJzZWN0aW9uIHRlc3RzIG9uIHRoZW1zZWx2ZXMgKHRoZWlyIG93biB2ZXJ0aWNlcywgY3Jvc3NpbmcgaW50ZXJuYWxseSlcbiAgICBsZXQgc2hhcGVfaWQgPSAxO1xuXG4gICAgLy8gVGhlc2UgZmlyc3QgdHdvIG5vZGVzIGluIHRoZSBncmFwaCBhcmUgYSBzcGVjaWFsIGNhc2VcbiAgICBub2Rlcy5wdXNoKCB7dmVydGV4OiBzdGFydCwgIHNoYXBlOiBzaGFwZV9pZCsrfSApOyAvLyBbMF0gc3RhcnQgKHNlZSAuc29sdmUoKSlcbiAgICBub2Rlcy5wdXNoKCB7dmVydGV4OiBlbmQsICAgIHNoYXBlOiBzaGFwZV9pZCsrfSApOyAvLyBbMV0gZW5kXG5cbiAgICBsZXQgZ2VkZ2VzID0gW107XG5cbiAgICAvLyBleHRyYWN0IGVhY2ggb2JzdGFjbGUncyBlZGdlcyBhbmQgbm9kZXNcbiAgICBmb3IgKGxldCBvIG9mIHRoaXMub2JqZWN0cylcbiAgICB7XG4gICAgICBzaGFwZV9pZCsrO1xuXG4gICAgICBsZXQgZTtcbiAgICAgIGxldCBiYXNlID0gbm9kZXMubGVuZ3RoO1xuICAgICAgZm9yIChlPTA7IGU8by5sZW5ndGgtMTsgZSsrKVxuICAgICAge1xuXG4gICAgICAgIGxldCB2MSA9IGJhc2UgKyBlO1xuICAgICAgICAvLyBGZnMgYWxhbiB3aGF0IGEgbWVzcyAobi5iLiBpdCB0b29rIDMwIG1pbnMgb2YgZGVidWdnaW5nIHRvIGdldCB0aGlzIGxpbmUgYmVsb3cgY29ycmVjdClcbiAgICAgICAgLy8gaXQgd2FzIG9yaWdpbmFsbHkgKGJhc2UgKyBlICsgMSkgJSAoby5sZW5ndGgtMSkpIHdoaWNoIGlzIHF1aXRlIGRpZmZlcmVudC5cbiAgICAgICAgLy8gSSB0aG91Z2h0IHRoaXMgd2FzIGdvaW5nIHRvIGJlIHN1Y2ggYSBkaWZmaWN1bHQgYnVnIHRvIGZpeCwgSSBuZWFybHkgZGlkbid0IGJvdGhlciB0cnlpbmcuXG4gICAgICAgIC8vIHRiaCwgdGhlc2Ugbm9kZS9lZGdlIHN0cnVjdHVyZXMgbmVlZCBhIHNlcmlvdXMgcmVmYWN0b3JpbmcgaWYgZXZlciB0aGlzIHByb2dyYW0gaXMgZXhwYW5kZWQhISFcbiAgICAgICAgbGV0IHYyID0gYmFzZSArICgoZSArIDEpICUgKG8ubGVuZ3RoLTEpKTtcblxuICAgICAgICBnZWRnZXMucHVzaCh7XG4gICAgICAgICAgaW5kZXg6W3YxLCB2Ml0sXG4gICAgICAgICAgdmVydGV4OiBbb1tlXSwgb1tlKzFdXVxuICAgICAgICB9KTtcblxuICAgICAgICBlZGdlcy5wdXNoKFtvW2VdLCBvW2UrMV1dKTtcblxuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB2ZXJ0ZXg6IG9bZV0sXG4gICAgICAgICAgc2hhcGU6IHNoYXBlX2lkXG4gICAgICAgIH0pO1xuXG4gICAgICB9XG5cbiAgICAgIC8vIHRoaXMgaXNuJ3QgYSBjbG9zZWQgcmluZyAobWF0Y2hpbmcgc3RhcnQgYW5kIGVuZHApXG4gICAgICAvLyBpLmUuIGEgc3RyYWlnaHQgbGluZS5cbiAgICAgIC8vIExhdGVyOiBJbiBoaW5kc2lnaHQsIEkgc2hvdWxkbid0IGhhdmUgYm90aGVyZWQgdHJ5aW5nIHRvXG4gICAgICAvLyBzdXBwb3J0IGVzc2VudGlhbGx5IGRpbWVuc2lvbmxlc3MgZW50aXRpZXMgbGlrZSBhIHR3by1zaWRlZCBzdHJhaWdodCBsaW5lIGluIDJkIHNwYWNlLlxuICAgICAgLy8gZXZlcnl0aGluZyBzaG91bGQgYmUgYSBjbG9zZWQgcmluZywgZXZlbiBpZiBpdCdzIGluaW5pdGVseSBzbWFsbC5cbiAgICAgIGlmICghZXF1YWxzKG9bMF0sIG9bZV0pKVxuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB2ZXJ0ZXg6IG9bZV0sXG4gICAgICAgICAgc2hhcGU6IHNoYXBlX2lkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCBgbm9kZXNgIGluZGljZXMgdG8gZ3JhcGhcbiAgICBmb3IgKGxldCBpIGluIG5vZGVzKVxuICAgIHtcbiAgICAgIGcuYWRkdmVydGV4KE51bWJlcihpKSk7XG5cbiAgICAgIC8vIEZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICAgIHRoaXMuX3Zpcy5ub2Rlcy5wdXNoKG5vZGVzW051bWJlcihpKV0udmVydGV4KTtcbiAgICB9XG5cbiAgICAvL1RPRE86IHJlZmFjdG9yIHRoZSBub2RlL2VkZ2UgZGF0YSBzdHJ1Y3QgbWVzc1xuICAgIGZvciAobGV0IGdlIG9mIGdlZGdlcylcbiAgICB7XG4gICAgICBnLmFkZGVkZ2UoZ2UuaW5kZXhbMF0sIGdlLmluZGV4WzFdLCBjb3N0KGdlLnZlcnRleFswXSwgZ2UudmVydGV4WzFdKSk7XG4gICAgICB0aGlzLl92aXMuZWRnZXMucHVzaChbZ2UudmVydGV4WzBdLCBnZS52ZXJ0ZXhbMV1dKTtcbiAgICB9XG5cbiAgICBsZXQgbmU9MDtcblxuICAgIGZvciAobGV0IHg9MDsgeDxub2Rlcy5sZW5ndGgtMTsgeCsrKVxuICAgICAgZm9yIChsZXQgeT14KzE7IHk8bm9kZXMubGVuZ3RoOyB5KyspXG4gICAgICB7XG4gICAgICAgICAgbGV0IEEgPSBub2Rlc1t4XTtcbiAgICAgICAgICBsZXQgQiA9IG5vZGVzW3ldO1xuXG4gICAgICAgICAgLy8gV2UncmUgdGVzdGluZyB0aGUgc2hhcGUncyB2ZXJ0aWNlcyBhZ2FpbnN0IGl0c2VsZlxuICAgICAgICAgIC8vIHdoaWNoIGxlYWRzIHRvIGludGVybmFsIHBhdGhzIGluc2lkZSB0aGUgc2hhcGUgKGludmFsaWQhKVxuICAgICAgICAgIGlmIChBLnNoYXBlID09IEIuc2hhcGUpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgbGV0IHRlc3RlZGdlID0gW0EudmVydGV4LCBCLnZlcnRleF07XG5cbiAgICAgICAgICBpZiAoZWRnZXZpc2liaWx0eSh0ZXN0ZWRnZSwgZWRnZXMpKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGcuYWRkZWRnZSh4LCB5LCBjb3N0KEEudmVydGV4LCBCLnZlcnRleCkpO1xuXG4gICAgICAgICAgICAvLyBKdXN0IGZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGgsIG5vbi1lc3NlbnRpYWw6XG4gICAgICAgICAgICB0aGlzLl92aXMuZWRnZXMucHVzaChbQS52ZXJ0ZXgsIEIudmVydGV4XSk7XG4gICAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICByZXR1cm4gZztcbiAgfVxuXG59XG5cblxuXG5mdW5jdGlvbiBjb3N0KGEsIGIpXG57XG4gIGxldCBkeCA9IGJbMF0gLSBhWzBdIC8vIHgyIC0geDFcbiAgbGV0IGR5ID0gYlsxXSAtIGFbMV07XG4gIHJldHVybiBNYXRoLnNxcnQoIGR4KmR4ICsgZHkqZHkgKTtcblxufVxuXG5mdW5jdGlvbiBlZGdldmlzaWJpbHR5KHRlc3RlZGdlLCBlZGdlcylcbntcbiAgLy8gY29uc29sZS5sb2coYFRlc3RpbmcgZWRnZTogJHt0ZXN0ZWRnZVswXX0sICR7dGVzdGVkZ2VbMV19YCk7XG5cbiAgZm9yIChsZXQgdD0wOyB0PGVkZ2VzLmxlbmd0aDsgdCsrKVxuICB7XG4gICAgbGV0IGUgPSBlZGdlc1t0XTtcblxuICAgIGxldCByZXMgPSBpbnRlcnNlY3RzKHRlc3RlZGdlWzBdLCB0ZXN0ZWRnZVsxXSwgZVswXSwgZVsxXSk7XG5cbiAgICAvLyBJZiBpbnRlcnNlY3Rpb24sIGNoZWNrIGl0J3Mgbm90IGp1c3QgdGhlIGVuZHBvaW50cyBraXNzaW5nIHdoaWNoIGlzIG9rXG4gICAgLy8gaW4gZmFjdCwgaXQncyBtb3JlIHRoYW4gJ29rJyAtIGl0J3MgZXhhY3RseSB3aGF0IHdlJ3JlIGxvb2tpbmcgZm9yXG4gICAgaWYgKHJlcy5pbnRlcnNlY3QgJiYgIXJlcy5raXNzKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5mdW5jdGlvbiBlcXVhbHMoYSwgYilcbntcbiAgcmV0dXJuIChhWzBdID09IGJbMF0gJiYgYVsxXSA9PSBiWzFdKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TY2VuZS5qcyIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcyA9IFtdO1xuICAgIHRoaXMuZWRnZXMgPSBbXTtcbiAgICB0aGlzLm51bWVkZ2VzID0gMDtcbiAgfVxuXG4gIGFkZHZlcnRleChuKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcy5wdXNoKG4pO1xuICAgIHRoaXMuZWRnZXNbbl0gPSBbXTtcbiAgfVxuXG4gIC8vIGFkamFjZW55IGVkZ2UgbGlzdFxuICBhZGRlZGdlKHYxLCB2MiwgY29zdClcbiAge1xuICAgIHRoaXMuZWRnZXNbdjFdLnB1c2goe2Rlc3Q6djIsIGNvc3R9KTtcbiAgICB0aGlzLmVkZ2VzW3YyXS5wdXNoKHtkZXN0OnYxLCBjb3N0fSk7XG5cbiAgICB0aGlzLm51bWVkZ2VzKys7XG4gIH1cblxuICAvLyBTdXBlciBiYXNpYyBpbXBsZW1lbnRhdGlvbiBvZiBEaWprc3RyYSdzIGFsZ29yaXRobVxuICAvLyBEaXJlY3RseSBmcm9tIHRoaXMgcmVjaXBlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EaWprc3RyYSUyN3NfYWxnb3JpdGhtI0FsZ29yaXRobVxuICBzaG9ydGVzdChzdGFydCwgZW5kKVxuICB7XG4gICAgbGV0IGN1cnJlbnRfbm9kZTtcbiAgICBsZXQgZGlzdCA9IFswXTtcbiAgICBsZXQgcHJldiA9IFtdO1xuICAgIGxldCB1bnZpc2l0ZWQgPSBbXTtcblxuICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnZlcnRpY2VzLmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgIGlmIChpKSBkaXN0W2ldID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgIHVudmlzaXRlZFtpXSA9IGk7XG4gICAgICBwcmV2W2ldID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyAnVmlzaXQnIGVhY2ggbm9kZSBvbmx5IG9uY2UsIGluIHR1cm5cbiAgICB3aGlsZSggKGN1cnJlbnRfbm9kZSA9IHVudmlzaXRlZC5zaGlmdCgpKSAhPSBudWxsIClcbiAgICB7XG4gICAgICAvLyBGb3IgZWFjaCBub2RlLCAnY2hlY2snIGl0cyBuZWlnaGJvdXJzLlxuICAgICAgLy8gV2hpbGUgd2Ugb25seSAndmlzaXQnIGVhY2ggbm9kZSBvbmNlLCBpdCdzIHRoaXMgcmVwZWF0ZWQgJ2NoZWNrJ2luZ1xuICAgICAgLy8gKGFuZCBvY2Nhc2lvbmFsIHJlY2FsY3VsYXRpbmcpIG9mIG5laWdoYm91cnMgdGhhdCBhbGxvd3MgdXMgdG8gZmluZFxuICAgICAgLy8gdGhlIHNob3J0ZXN0IHJvdXRlIHRocm91Z2ggdGhlIGdyYXBoIGZyb20gb3VyIHN0YXJ0IHBvaW50LlxuICAgICAgLy8gSW4gZmFjdCwgdGhlIGluaGVyZW50IHJlc3VsdCBvZiB0aGUgYWxnbyBpcyB0aGF0IHdlIGZpbmQgdGhlIHNob3J0ZXN0XG4gICAgICAvLyBwYXRoIHRvICpldmVyeSogcG9pbnQgaW4gdGhlIGdyYXBoXG4gICAgICBmb3IgKGxldCB0PTA7IHQ8dGhpcy5lZGdlc1tjdXJyZW50X25vZGVdLmxlbmd0aDsgdCsrKVxuICAgICAge1xuICAgICAgICAvLyB2ZXJ0ZXgvbm9kZSBJRFxuICAgICAgICBsZXQgbmVpZ2hib3VyID0gdGhpcy5lZGdlc1tjdXJyZW50X25vZGVdW3RdLmRlc3Q7XG5cbiAgICAgICAgLy8gRGlzdGFuY2UgZnJvbSBjdXJyZW50X25vZGUgdG8gbmVpZ2hib3VyXG4gICAgICAgIGxldCBjb3N0ID0gdGhpcy5lZGdlc1tjdXJyZW50X25vZGVdW3RdLmNvc3Q7XG5cbiAgICAgICAgLy8gRGlzdGFuY2UgdGh1cyBmYXIgb24gdGhpcyByb3V0ZSAodXAgdG8gY3VycmVudF9ub2RlKSArIGRpc3RhbmNlIHRvIG5laWdoYm91clxuICAgICAgICBsZXQgdGVudGF0aXZlX2Rpc3QgPSBkaXN0W2N1cnJlbnRfbm9kZV0gKyBjb3N0O1xuXG4gICAgICAgIC8vIEhhdmUgd2UgZm91bmQgYSBzaG9ydGVyIHBhdGg/XG4gICAgICAgIGlmICh0ZW50YXRpdmVfZGlzdCA8IGRpc3RbbmVpZ2hib3VyXSlcbiAgICAgICAge1xuICAgICAgICAgIGRpc3RbbmVpZ2hib3VyXSA9IHRlbnRhdGl2ZV9kaXN0OyAvLyBOZXcgZGlzdGFuY2UgdG8gdGhpcyBub2RlXG4gICAgICAgICAgcHJldltuZWlnaGJvdXJdID0gY3VycmVudF9ub2RlOyAgIC8vIFVwZGF0ZSB0aGUgcm91dGVcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGMgPSBlbmQsIHNlcSA9W2VuZF07XG5cbiAgICAvLyBmYWlsZWQgZm9yIHNvbWUgcmVhc29uLCBlLmcuIGltcG9zc2libGUgcG9pbnQgaW5zaWRlIG51bGxzcGFjZSBldGNcbiAgICBpZiAocHJldltjXSA9PSBudWxsKVxuICAgICAgcmV0dXJuIFtdO1xuXG4gICAgZG8ge1xuICAgICAgYyA9IHByZXZbY107XG4gICAgICBzZXEucHVzaChjKTtcbiAgICB9IHdoaWxlKGMgIT0gc3RhcnQpO1xuXG4gICAgcmV0dXJuIHNlcS5yZXZlcnNlKCk7XG5cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvR3JhcGguanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXJcbntcbiAgY29uc3RydWN0b3IoZWxlbWVudClcbiAge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICB9XG5cbiAgY2xlYXIoKVxuICB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgcmVuZGVyKG9iamVjdHMsIGNvbG91ciA9ICcjMDAwJywgd2lkdGggPSAyKVxuICB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdHMpKSByZXR1cm47XG5cbiAgICAvLyBwb2ludCB0eXBlXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdHNbMF0pKVxuICAgIHtcbiAgICAgIGNvbnN0IHAgPSBvYmplY3RzO1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LmFyYyhwWzBdPj4wLCBwWzFdPj4wLCB3aWR0aCwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvdXI7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgLy8gbGlzdCBvZiBzaGFwZXMgdHlwZVxuXG4gICAgICBmb3IgKGxldCBvIG9mIG9iamVjdHMpXG4gICAgICB7XG4gICAgICAgIGZvciAobGV0IGU9MDsgZTxvLmxlbmd0aC0xOyBlKyspXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLl9saW5lKG9bZV0sIG9bZSsxXSwgY29sb3VyLCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgX2xpbmUoYSwgYiwgYywgdylcbiAge1xuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB3O1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGMgfHwgJ2JsYWNrJztcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhhWzBdPj4wLGFbMV0+PjApO1xuICAgIHRoaXMuY29udGV4dC5saW5lVG8oYlswXT4+MCxiWzFdPj4wKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlcmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==