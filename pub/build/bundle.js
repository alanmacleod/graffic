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

// Start point, goal and lastknown mouse coords
var start = [10, 10];
var end = [220, 120];
var mouse = end.slice();

// For the shape animations
var rotx = 300,
    roty = 350,
    rota = 0;
var motion = 0;

// Create some dynamic obstacles
var sq_small = (0, _Util.Square)(650, 100, 150);
var sq_large = (0, _Util.Triangle)(rotx, roty, 400);

var obstacles = [(0, _Util.Square)(80, 120, 100), // static
sq_small, // dynamic
sq_large // dynamic
];

// Add them all to the scene
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = obstacles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var o = _step.value;

    scene.add(o);
  } // Go!
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

(function frame() {
  requestAnimationFrame(frame);

  renderer.clear();

  // Animation
  motion += 0.05; // Sinusoidal
  (0, _Util.translate)(sq_small, 0, 3 * Math.sin(motion * 0.25 * Math.PI));
  (0, _Util.translate)([start], 3 * Math.sin(motion * 0.05 * Math.PI), 0);
  (0, _Util.rotate)(sq_large, rotx, roty, 0.005);

  // Find the shortest path. Two things happen here:
  //    1. A Scene graph is extracted from our scene geometry
  //    2. Dijkstra's method is used to find the optimal route across the graph
  var route = scene.solve(start, end);

  // Get a visualisation of the actual scenegraph
  var vis = scene.vis();

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

  var inside = dodge_nullspace();

  // User has moved the mouse inside a shape obstacle which invalidates the graph
  if (inside >= 0) {
    show_info("End point inside solid object!");
    renderer.render([scene.objects[inside]], '#f00', 5);
  } else hide_info();

  // Now display the found route!
  renderer.render([route], '#00f', 3);
})();

document.getElementById(element).onmousemove = function (e) {
  mouse = [e.clientX, e.clientY];
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
  // Check the current position of each of our solid shapes
  for (var i in obstacles) {
    var _o = obstacles[i >> 0];
    // Oh no!
    if ((0, _Util.point_in_polygon)(mouse, _o)) // simple convex-only test
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
      if (start == end) return;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmE0YzRlNTU5YTc4Y2NmMDc1YjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJUcmlhbmdsZSIsImFuZ2xlIiwiciIsIk1hdGgiLCJzaW4iLCJQSSIsInRyaSIsImkiLCJjb3MiLCJyb3RhdGUiLCJzaGFwZSIsInJ4IiwicnkiLCJkYSIsInBhaXIiLCJyb3RhdGVfcG9pbnQiLCJ0cmFuc2xhdGUiLCJkeCIsImR5IiwiY3giLCJjeSIsInAiLCJzIiwiYyIsInhuZXciLCJ5bmV3IiwicG9pbnRfaW5fcG9seWdvbiIsInBvaW50IiwidmVydGljZXMiLCJsZW5ndGgiLCJhIiwiYiIsInNlZyIsInN1YnRyYWN0UG9pbnRzIiwicHQiLCJpbnNpZGUiLCJjcm9zc1Byb2R1Y3QiLCJpbnRlcnNlY3RzIiwiYXAiLCJhcDIiLCJhcSIsImFxMiIsImRvTGluZVNlZ21lbnRzSW50ZXJzZWN0IiwiaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsiLCJwMiIsInEiLCJxMiIsImJveDEiLCJ4bWluIiwibWluIiwieW1pbiIsInhtYXgiLCJtYXgiLCJ5bWF4IiwiYm94MiIsImJib3hfY29udGFpbmVkIiwidU51bWVyYXRvciIsImRlbm9taW5hdG9yIiwiZXF1YWxQb2ludHMiLCJpbnRlcnNlY3QiLCJraXNzIiwiYWxsRXF1YWwiLCJ1IiwidCIsInBvaW50MSIsInBvaW50MiIsIkFycmF5IiwiaXNBcnJheSIsInJlc3VsdCIsImFyZ3MiLCJmaXJzdFZhbHVlIiwiYXJndW1lbnRzIiwiZWxlbWVudCIsInJlbmRlcmVyIiwic2NlbmUiLCJpbmZvIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNob3dHcmFwaCIsInNob3dPYnN0YWNsZXMiLCJzdGFydCIsImVuZCIsIm1vdXNlIiwic2xpY2UiLCJyb3R4Iiwicm90eSIsInJvdGEiLCJtb3Rpb24iLCJzcV9zbWFsbCIsInNxX2xhcmdlIiwib2JzdGFjbGVzIiwibyIsImFkZCIsImZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2xlYXIiLCJyb3V0ZSIsInNvbHZlIiwidmlzIiwibm9kZXMiLCJuIiwicmVuZGVyIiwiZWRnZXMiLCJvYmplY3RzIiwiZG9kZ2VfbnVsbHNwYWNlIiwic2hvd19pbmZvIiwiaGlkZV9pbmZvIiwib25tb3VzZW1vdmUiLCJlIiwiY2xpZW50WCIsImNsaWVudFkiLCJvbmNsaWNrIiwic3JjRWxlbWVudCIsImNoZWNrZWQiLCJ0ZXh0IiwiaW5uZXJIVE1MIiwic3R5bGUiLCJkaXNwbGF5IiwiU2NlbmUiLCJncmFwaCIsIl92aXMiLCJvYmplY3QiLCJfZ3JhcGgiLCJzaG9ydGVzdCIsImciLCJzaGFwZV9pZCIsInZlcnRleCIsImdlZGdlcyIsImJhc2UiLCJ2MSIsInYyIiwiaW5kZXgiLCJlcXVhbHMiLCJhZGR2ZXJ0ZXgiLCJOdW1iZXIiLCJnZSIsImFkZGVkZ2UiLCJjb3N0IiwibmUiLCJBIiwiQiIsInRlc3RlZGdlIiwiZWRnZXZpc2liaWx0eSIsInNxcnQiLCJyZXMiLCJHcmFwaCIsIm51bWVkZ2VzIiwiZGVzdCIsImN1cnJlbnRfbm9kZSIsImRpc3QiLCJwcmV2IiwidW52aXNpdGVkIiwiTUFYX1ZBTFVFIiwic2hpZnQiLCJuZWlnaGJvdXIiLCJ0ZW50YXRpdmVfZGlzdCIsInNlcSIsInJldmVyc2UiLCJSZW5kZXJlciIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJjb2xvdXIiLCJiZWdpblBhdGgiLCJhcmMiLCJmaWxsU3R5bGUiLCJmaWxsIiwiX2xpbmUiLCJ3IiwibGluZVdpZHRoIiwic3Ryb2tlU3R5bGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0RBLFNBQVNBLE1BQVQsQ0FBZ0JDLENBQWhCLEVBQW1CQyxDQUFuQixFQUFzQkMsSUFBdEIsRUFDQTtBQUNFLE1BQUlDLFFBQVFELFFBQU0sQ0FBbEI7QUFDQSxNQUFJRSxLQUFLLEVBQVQ7QUFDQTtBQUNBO0FBQ0FBLEtBQUdDLElBQUgsQ0FBUyxDQUFDTCxJQUFJRyxLQUFMLEVBQVlGLElBQUlFLEtBQWhCLENBQVQ7QUFDQTtBQUNBQyxLQUFHQyxJQUFILENBQVMsQ0FBQ0wsSUFBSUcsS0FBTCxFQUFZRixJQUFJRSxLQUFoQixDQUFUO0FBQ0E7QUFDQUMsS0FBR0MsSUFBSCxDQUFTLENBQUNMLElBQUlHLEtBQUwsRUFBWUYsSUFBSUUsS0FBaEIsQ0FBVDtBQUNBO0FBQ0FDLEtBQUdDLElBQUgsQ0FBUyxDQUFDTCxJQUFJRyxLQUFMLEVBQVlGLElBQUlFLEtBQWhCLENBQVQ7QUFDQTtBQUNBQyxLQUFHQyxJQUFILENBQVMsQ0FBQ0wsSUFBSUcsS0FBTCxFQUFZRixJQUFJRSxLQUFoQixDQUFUOztBQUVBLFNBQU9DLEVBQVA7QUFDRDs7QUFFRDtBQUNBLFNBQVNFLFFBQVQs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QUFETztBQUFBO0FBQUE7O0FBQUE7QUFHTCwrQkFBY2pFLE9BQWQsOEhBQ0E7QUFBQSxnQkFEU1osQ0FDVDs7QUFDRSxpQkFBSyxJQUFJaUIsSUFBRSxDQUFYLEVBQWNBLElBQUVqQixFQUFFOUQsTUFBRixHQUFTLENBQXpCLEVBQTRCK0UsR0FBNUIsRUFDQTtBQUNFLG1CQUFLNkQsS0FBTCxDQUFXOUUsRUFBRWlCLENBQUYsQ0FBWCxFQUFpQmpCLEVBQUVpQixJQUFFLENBQUosQ0FBakIsRUFBeUJ3RCxNQUF6QixFQUFpQ0YsS0FBakM7QUFDRDtBQUNGO0FBVEk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVdOO0FBRUY7OzswQkFFS3BJLEMsRUFBR0MsQyxFQUFHUixDLEVBQUdtSixDLEVBQ2Y7QUFDRSxXQUFLWCxPQUFMLENBQWFZLFNBQWIsR0FBeUJELENBQXpCO0FBQ0EsV0FBS1gsT0FBTCxDQUFhYSxXQUFiLEdBQTJCckosS0FBSyxPQUFoQztBQUNBLFdBQUt3SSxPQUFMLENBQWFNLFNBQWI7QUFDQSxXQUFLTixPQUFMLENBQWFjLE1BQWIsQ0FBb0IvSSxFQUFFLENBQUYsS0FBTSxDQUExQixFQUE0QkEsRUFBRSxDQUFGLEtBQU0sQ0FBbEM7QUFDQSxXQUFLaUksT0FBTCxDQUFhZSxNQUFiLENBQW9CL0ksRUFBRSxDQUFGLEtBQU0sQ0FBMUIsRUFBNEJBLEVBQUUsQ0FBRixLQUFNLENBQWxDO0FBQ0EsV0FBS2dJLE9BQUwsQ0FBYWdCLE1BQWI7QUFDRDs7Ozs7O2tCQWhEa0JqQixRIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDZhNGM0ZTU1OWE3OGNjZjA3NWI0IiwiXG5cbmZ1bmN0aW9uIFNxdWFyZSh4LCB5LCBzaXplKVxue1xuICBsZXQgaHNpemUgPSBzaXplPj4xO1xuICBsZXQgc3EgPSBbXTtcbiAgLy8gb3IganVzdCBtYWtlIGEgdW5pdCBzcXVhcmUgYW5kIHNjYWxlIGl0IHVwIGR1aCA6fFxuICAvLyB0b3AgbGVmdFxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5IC0gaHNpemVdICk7XG4gIC8vIHRvcCByaWdodFxuICBzcS5wdXNoKCBbeCArIGhzaXplLCB5IC0gaHNpemVdICk7XG4gIC8vIGJvdHRvbSByaWdodFxuICBzcS5wdXNoKCBbeCArIGhzaXplLCB5ICsgaHNpemVdICk7XG4gIC8vIGJvdHRvbSBsZWZ0XG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgKyBoc2l6ZV0gKTtcbiAgLy8gdG9wIGxlZnQgYWdhaW5cbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSAtIGhzaXplXSApO1xuXG4gIHJldHVybiBzcTtcbn1cblxuLy8gZXF1aWxhdGVyYWxcbmZ1bmN0aW9uIFRyaWFuZ2xlKHgsIHksIHNpemUpXG57XG4gIGxldCBhbmdsZSA9IDA7XG4gIGxldCByID0gKHNpemUvMi4wKS9NYXRoLnNpbihNYXRoLlBJKjYwLzE4MCk7XG4gIGxldCB0cmkgPSBbXTtcblxuICBmb3IobGV0IGk9MDsgaTw9MzsgaSsrKVxuICB7XG4gICAgdHJpLnB1c2goW1xuICAgICAgeCArIHIgKiBNYXRoLmNvcyhhbmdsZSArIChpICUgMykgKiAyICogTWF0aC5QSS8zKSxcbiAgICAgIHkgKyByICogTWF0aC5zaW4oYW5nbGUgKyAoaSAlIDMpICogMiAqIE1hdGguUEkvMylcbiAgICBdKTtcbiAgfVxuXG4gIHJldHVybiB0cmk7XG59XG5cbmZ1bmN0aW9uIHJvdGF0ZShzaGFwZSwgcngsIHJ5LCBkYSlcbntcbiAgZm9yIChsZXQgcGFpciBvZiBzaGFwZSlcbiAgICBwYWlyID0gcm90YXRlX3BvaW50KHJ4LCByeSwgZGEsIHBhaXIpO1xufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGUoc2hhcGUsIGR4LCBkeSlcbntcbiAgZm9yIChsZXQgcGFpciBvZiBzaGFwZSlcbiAge1xuICAgIHBhaXJbMF0gKz0gZHg7XG4gICAgcGFpclsxXSArPSBkeTtcbiAgfVxufVxuXG5mdW5jdGlvbiByb3RhdGVfcG9pbnQoY3gsIGN5LCBhbmdsZSwgcClcbntcbiAgbGV0IHMgPSBNYXRoLnNpbihhbmdsZSk7XG4gIGxldCBjID0gTWF0aC5jb3MoYW5nbGUpO1xuXG4gIC8vIHRyYW5zbGF0ZSBwb2ludCBiYWNrIHRvIG9yaWdpbjpcbiAgcFswXSAtPSBjeDtcbiAgcFsxXSAtPSBjeTtcblxuICAvLyByb3RhdGUgcG9pbnRcbiAgbGV0IHhuZXcgPSBwWzBdICogYyAtIHBbMV0gKiBzO1xuICBsZXQgeW5ldyA9IHBbMF0gKiBzICsgcFsxXSAqIGM7XG5cbiAgLy8gdHJhbnNsYXRlIHBvaW50IGJhY2s6XG4gIHBbMF0gPSB4bmV3ICsgY3g7XG4gIHBbMV0gPSB5bmV3ICsgY3k7XG5cbiAgcmV0dXJuIHA7XG59XG5cblxuZnVuY3Rpb24gcG9pbnRfaW5fcG9seWdvbihwb2ludCwgdmVydGljZXMpXG57XG4gIGZvciAobGV0IGk9MDsgaTx2ZXJ0aWNlcy5sZW5ndGgtMTsgaSsrKVxuICB7XG4gICAgbGV0IGEgPSB2ZXJ0aWNlc1tpXTtcbiAgICBsZXQgYiA9IHZlcnRpY2VzW2krMV07XG5cbiAgICBsZXQgc2VnID0gc3VidHJhY3RQb2ludHMoYiwgYSk7XG4gICAgbGV0IHB0ID0gc3VidHJhY3RQb2ludHMocG9pbnQsIGEpO1xuICAgIGxldCBpbnNpZGUgPSAoY3Jvc3NQcm9kdWN0KHNlZywgcHQpID4gMCk7XG4gICAgLy8gY29uc29sZS5sb2coaW5zaWRlKTtcbiAgICBpZiAoIWluc2lkZSkgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cblxuLyoqXG4gKiBAYXV0aG9yIFBldGVyIEtlbGxleVxuICogQGF1dGhvciBwZ2tlbGxleTRAZ21haWwuY29tXG4gKi9cbi8qKlxuICogU2VlIGlmIHR3byBsaW5lIHNlZ21lbnRzIGludGVyc2VjdC4gVGhpcyB1c2VzIHRoZVxuICogdmVjdG9yIGNyb3NzIHByb2R1Y3QgYXBwcm9hY2ggZGVzY3JpYmVkIGJlbG93OlxuICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTY1MjgyLzc4NjMzOVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIHN0YXJ0IG9mIHRoZSAxc3QgbGluZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwMiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBlbmQgb2YgdGhlIDFzdCBsaW5lLlxuICogQHBhcmFtIHtPYmplY3R9IHEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgc3RhcnQgb2YgdGhlIDJuZCBsaW5lLlxuICogQHBhcmFtIHtPYmplY3R9IHEyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIGVuZCBvZiB0aGUgMm5kIGxpbmUuXG4gKi9cblxuZnVuY3Rpb24gaW50ZXJzZWN0cyhhcCwgYXAyLCBhcSwgYXEyKVxue1xuICAvLyBBTTogTm90ZSB0byBkZXZlbG9wZXJzLCBwbGVhc2UgZG9uJ3QgdXNlIG5hbWVkIHByb3BlcnRpZXMgZm9yIHZlY3RvcnNcbiAgLy8gICAgIEl0J3MgZGFmdC4gVXNlIGFycmF5cy5cbiAgcmV0dXJuIGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0KCB7eDogYXBbMF0sIHk6IGFwWzFdfSwge3g6IGFwMlswXSwgeTogYXAyWzFdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eDogYXFbMF0sIHk6IGFxWzFdfSwge3g6IGFxMlswXSwgeTogYXEyWzFdfSApO1xufVxuXG5mdW5jdGlvbiBpc19vbmVfYmJveF9jb250YWluZWRfYnlfdGhlX290aGVyX3F1ZXN0aW9ubWFyayhwLCBwMiwgcSwgcTIpXG57XG4gIHZhciBib3gxID0ge1xuICAgIHhtaW46IE1hdGgubWluKHAueCwgcDIueCksXG4gICAgeW1pbjogTWF0aC5taW4ocC55LCBwMi55KSxcbiAgICB4bWF4OiBNYXRoLm1heChwLngsIHAyLngpLFxuICAgIHltYXg6IE1hdGgubWF4KHAueSwgcDIueSlcbiAgfTtcblxuICB2YXIgYm94MiA9IHtcbiAgICB4bWluOiBNYXRoLm1pbihxLngsIHEyLngpLFxuICAgIHltaW46IE1hdGgubWluKHEueSwgcTIueSksXG4gICAgeG1heDogTWF0aC5tYXgocS54LCBxMi54KSxcbiAgICB5bWF4OiBNYXRoLm1heChxLnksIHEyLnkpXG4gIH07XG5cbiAgcmV0dXJuIGJib3hfY29udGFpbmVkKGJveDEsIGJveDIpIHx8IGJib3hfY29udGFpbmVkKGJveDIsIGJveDEpO1xufVxuXG5mdW5jdGlvbiBiYm94X2NvbnRhaW5lZChhLCBiKVxue1xuICAvLyBJcyBCb3ggQiBjb21wbGV0ZWx5IGluc2lkZSBib3ggQSA/XG4gIHJldHVybiAoYi54bWluID49IGEueG1pbiAmJiBiLnhtYXggPD0gYS54bWF4KSAmJiAoYi55bWluID49IGEueW1pbiAmJiBiLnltYXggPD0gYS55bWF4KTtcbn1cblxuXG5mdW5jdGlvbiBkb0xpbmVTZWdtZW50c0ludGVyc2VjdChwLCBwMiwgcSwgcTIpXG57XG4gIC8vIHZhciBkZWJ1Z19zdHJpbmcgPSBgZG9MaW5lU2VnbWVudHNJbnRlcnNlY3Q6ICgke3AueH0sICR7cC55fSktKCR7cDIueH0sICR7cDIueX0pICB3aXRoICAoJHtxLnh9LCAke3EueX0pLSgke3EyLnh9LCAke3EyLnl9KWA7XG5cblx0dmFyIHIgPSBzdWJ0cmFjdFBvaW50cyhwMiwgcCk7XG5cdHZhciBzID0gc3VidHJhY3RQb2ludHMocTIsIHEpO1xuXG5cdHZhciB1TnVtZXJhdG9yID0gY3Jvc3NQcm9kdWN0KHN1YnRyYWN0UG9pbnRzKHEsIHApLCByKTtcblx0dmFyIGRlbm9taW5hdG9yID0gY3Jvc3NQcm9kdWN0KHIsIHMpO1xuXG5cdGlmICh1TnVtZXJhdG9yID09IDAgJiYgZGVub21pbmF0b3IgPT0gMCkge1xuXHRcdC8vIFRoZXkgYXJlIGNvTGxpbmVhclxuXG4gICAgLy8gY29uc29sZS5sb2coXCJDb3BsYW5hclwiKTtcblxuXHRcdC8vIERvIHRoZXkgdG91Y2g/IChBcmUgYW55IG9mIHRoZSBwb2ludHMgZXF1YWw/KVxuXHRcdGlmIChlcXVhbFBvaW50cyhwLCBxKSB8fCBlcXVhbFBvaW50cyhwLCBxMikgfHwgZXF1YWxQb2ludHMocDIsIHEpIHx8IGVxdWFsUG9pbnRzKHAyLCBxMikpIHtcblx0XHRcdHJldHVybiB7XG4gICAgICAgIGludGVyc2VjdDogdHJ1ZSxcbiAgICAgICAga2lzczogIWlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrKHAsIHAyLCBxLCBxMilcbiAgICAgIH07XG5cblx0XHR9XG5cdFx0Ly8gRG8gdGhleSBvdmVybGFwPyAoQXJlIGFsbCB0aGUgcG9pbnQgZGlmZmVyZW5jZXMgaW4gZWl0aGVyIGRpcmVjdGlvbiB0aGUgc2FtZSBzaWduKVxuXG4gICAgLy8gY29uc29sZS5sb2coXCJQb2ludHMgRE9OVCB0b3VjaFwiKTtcblxuXHRcdHJldHVybiB7XG4gICAgICBpbnRlcnNlY3Q6XG4gICAgICAgICAgICAhYWxsRXF1YWwoXG4gICAgICBcdFx0XHRcdChxLnggLSBwLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEueCAtIHAyLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnggLSBwLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnggLSBwMi54IDwgMCkpIHx8XG4gICAgICBcdFx0XHQhYWxsRXF1YWwoXG4gICAgICBcdFx0XHRcdChxLnkgLSBwLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEueSAtIHAyLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnkgLSBwLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnkgLSBwMi55IDwgMCkpLFxuICAgICAgICBraXNzOiBmYWxzZVxuICAgICAgfTtcblxuXHR9XG5cblx0aWYgKGRlbm9taW5hdG9yID09IDApIHtcblx0XHQvLyBsaW5lcyBhcmUgcGFyYWxlbGxcblx0XHRyZXR1cm4ge2ludGVyc2VjdDogZmFsc2UsIGtpc3M6IGZhbHNlfTtcblx0fVxuXG5cdHZhciB1ID0gdU51bWVyYXRvciAvIGRlbm9taW5hdG9yO1xuXHR2YXIgdCA9IGNyb3NzUHJvZHVjdChzdWJ0cmFjdFBvaW50cyhxLCBwKSwgcykgLyBkZW5vbWluYXRvcjtcblxuICAvLyBjb25zb2xlLmxvZyhgdD0ke3R9LCB1PSR7dX1gKTtcbiAgdmFyIGtpc3MgPSBmYWxzZTtcblxuICBpZiAoZXF1YWxQb2ludHMocCwgcSkgfHwgZXF1YWxQb2ludHMocCwgcTIpIHx8IGVxdWFsUG9pbnRzKHAyLCBxKSB8fCBlcXVhbFBvaW50cyhwMiwgcTIpKVxuICAgIGtpc3MgPSB0cnVlO1xuXG4gIC8vIGxldCByZXMgPVxuICAvL3JldHVyblxuICByZXR1cm4ge1xuICAgIGludGVyc2VjdDogKHQgPj0gMCkgJiYgKHQgPD0gMSkgJiYgKHUgPj0gMCkgJiYgKHUgPD0gMSksXG4gICAga2lzczoga2lzc1xuICB9O1xuXG4gIC8vIGNvbnNvbGUubG9nKGAke2RlYnVnX3N0cmluZ30gPSAke3Jlc31gKTtcblxuXHQvLyByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZSB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0aGUgdHdvIHBvaW50cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICpcbiAqIEByZXR1cm4gdGhlIGNyb3NzIHByb2R1Y3QgcmVzdWx0IGFzIGEgZmxvYXRcbiAqL1xuZnVuY3Rpb24gY3Jvc3NQcm9kdWN0KHBvaW50MSwgcG9pbnQyKSB7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocG9pbnQxKSlcbiAgICByZXR1cm4gcG9pbnQxWzBdICogcG9pbnQyWzFdIC0gcG9pbnQxWzFdICogcG9pbnQyWzBdO1xuICBlbHNlXG5cdCAgIHJldHVybiBwb2ludDEueCAqIHBvaW50Mi55IC0gcG9pbnQxLnkgKiBwb2ludDIueDtcbn1cblxuLyoqXG4gKiBTdWJ0cmFjdCB0aGUgc2Vjb25kIHBvaW50IGZyb20gdGhlIGZpcnN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiB0aGUgc3VidHJhY3Rpb24gcmVzdWx0IGFzIGEgcG9pbnQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIHN1YnRyYWN0UG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocG9pbnQxKSlcbiAge1xuICAgIHJldHVybiBbIHBvaW50MVswXSAtIHBvaW50MlswXSwgcG9pbnQxWzFdIC0gcG9pbnQyWzFdIF07XG4gIH0gZWxzZSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHJlc3VsdC54ID0gcG9pbnQxLnggLSBwb2ludDIueDtcbiAgICByZXN1bHQueSA9IHBvaW50MS55IC0gcG9pbnQyLnk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbi8qKlxuICogU2VlIGlmIHRoZSBwb2ludHMgYXJlIGVxdWFsLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiBpZiB0aGUgcG9pbnRzIGFyZSBlcXVhbFxuICovXG5mdW5jdGlvbiBlcXVhbFBvaW50cyhwb2ludDEsIHBvaW50Mikge1xuXHRyZXR1cm4gKHBvaW50MS54ID09IHBvaW50Mi54KSAmJiAocG9pbnQxLnkgPT0gcG9pbnQyLnkpXG59XG5cbi8qKlxuICogU2VlIGlmIGFsbCBhcmd1bWVudHMgYXJlIGVxdWFsLlxuICpcbiAqIEBwYXJhbSB7Li4ufSBhcmdzIGFyZ3VtZW50cyB0aGF0IHdpbGwgYmUgY29tcGFyZWQgYnkgJz09Jy5cbiAqXG4gKiBAcmV0dXJuIGlmIGFsbCBhcmd1bWVudHMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGFsbEVxdWFsKGFyZ3MpIHtcblx0dmFyIGZpcnN0VmFsdWUgPSBhcmd1bWVudHNbMF0sXG5cdFx0aTtcblx0Zm9yIChpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGlmIChhcmd1bWVudHNbaV0gIT0gZmlyc3RWYWx1ZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuXG5cbmV4cG9ydCB7U3F1YXJlLCBUcmlhbmdsZSwgaW50ZXJzZWN0cywgcm90YXRlLCB0cmFuc2xhdGUsIHBvaW50X2luX3BvbHlnb259IDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9VdGlsLmpzIiwiXG5pbXBvcnQgU2NlbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9TY2VuZSc7XG5pbXBvcnQgUmVuZGVyZXIgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQge1NxdWFyZSwgcm90YXRlLCB0cmFuc2xhdGV9ICAgICAgZnJvbSAnLi9VdGlsJztcbmltcG9ydCB7cG9pbnRfaW5fcG9seWdvbiwgVHJpYW5nbGV9ICAgICBmcm9tICcuL1V0aWwnO1xuXG5jb25zdCBlbGVtZW50ID0gJ2Rpc3BsYXknO1xuXG5sZXQgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoZWxlbWVudCk7XG5sZXQgc2NlbmUgPSBuZXcgU2NlbmUoKTtcbmxldCBpbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZm9UZXh0Jyk7XG5cbi8vIFNob3cvaGlkZSB0aGUgc2NlbmUgZ3JhcGhcbmxldCBzaG93R3JhcGggPSB0cnVlLCBzaG93T2JzdGFjbGVzID0gdHJ1ZTtcblxuLy8gU3RhcnQgcG9pbnQsIGdvYWwgYW5kIGxhc3Rrbm93biBtb3VzZSBjb29yZHNcbmxldCBzdGFydCA9IFsxMCwgMTBdO1xubGV0IGVuZCA9IFsyMjAsIDEyMF07XG5sZXQgbW91c2UgPSBlbmQuc2xpY2UoKTtcblxuLy8gRm9yIHRoZSBzaGFwZSBhbmltYXRpb25zXG5sZXQgcm90eCA9IDMwMCwgcm90eSA9IDM1MCwgcm90YSA9IDA7XG5sZXQgbW90aW9uID0gMDtcblxuLy8gQ3JlYXRlIHNvbWUgZHluYW1pYyBvYnN0YWNsZXNcbmxldCBzcV9zbWFsbCA9IFNxdWFyZSg2NTAsIDEwMCwgMTUwKTtcbmxldCBzcV9sYXJnZSA9IFRyaWFuZ2xlKHJvdHgsIHJvdHksIDQwMCk7XG5cbmxldCBvYnN0YWNsZXMgPSBbXG4gIFNxdWFyZSg4MCwgMTIwLCAxMDApLCAvLyBzdGF0aWNcbiAgc3Ffc21hbGwsIC8vIGR5bmFtaWNcbiAgc3FfbGFyZ2UgLy8gZHluYW1pY1xuXTtcblxuLy8gQWRkIHRoZW0gYWxsIHRvIHRoZSBzY2VuZVxuZm9yIChsZXQgbyBvZiBvYnN0YWNsZXMpXG4gIHNjZW5lLmFkZCggbyApO1xuXG4vLyBHbyFcbihmdW5jdGlvbiBmcmFtZSgpXG57XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSggZnJhbWUgKTtcblxuICByZW5kZXJlci5jbGVhcigpO1xuXG4gIC8vIEFuaW1hdGlvblxuICBtb3Rpb24gKz0gMC4wNTsgLy8gU2ludXNvaWRhbFxuICB0cmFuc2xhdGUoc3Ffc21hbGwsIDAsIDMgKiBNYXRoLnNpbihtb3Rpb24gKiAwLjI1ICogTWF0aC5QSSkpO1xuICB0cmFuc2xhdGUoW3N0YXJ0XSwgMyAqIE1hdGguc2luKG1vdGlvbiAqIDAuMDUgKiBNYXRoLlBJKSwgMCk7XG4gIHJvdGF0ZShzcV9sYXJnZSwgcm90eCwgcm90eSwgMC4wMDUpO1xuXG5cblxuICAvLyBGaW5kIHRoZSBzaG9ydGVzdCBwYXRoLiBUd28gdGhpbmdzIGhhcHBlbiBoZXJlOlxuICAvLyAgICAxLiBBIFNjZW5lIGdyYXBoIGlzIGV4dHJhY3RlZCBmcm9tIG91ciBzY2VuZSBnZW9tZXRyeVxuICAvLyAgICAyLiBEaWprc3RyYSdzIG1ldGhvZCBpcyB1c2VkIHRvIGZpbmQgdGhlIG9wdGltYWwgcm91dGUgYWNyb3NzIHRoZSBncmFwaFxuICBsZXQgcm91dGUgPSBzY2VuZS5zb2x2ZSggc3RhcnQsIGVuZCApO1xuXG4gIC8vIEdldCBhIHZpc3VhbGlzYXRpb24gb2YgdGhlIGFjdHVhbCBzY2VuZWdyYXBoXG4gIGxldCB2aXMgPSBzY2VuZS52aXMoKTtcblxuICBpZiAoc2hvd0dyYXBoKVxuICB7XG4gICAgLy8gRHJhdyB0aGUgc2NlbmUgZ3JhcGggbm9kZXNcbiAgICBmb3IgKGxldCBuIG9mIHZpcy5ub2RlcylcbiAgICAgIHJlbmRlcmVyLnJlbmRlciggbiwgJyNiYmInLCA1ICk7XG5cbiAgICAvLyBEcmF3IHRoZSBncmFwaCBlZGdlc1xuICAgIHJlbmRlcmVyLnJlbmRlciggdmlzLmVkZ2VzLCAnI2VlZScgKTtcbiAgfVxuXG4gIC8vIFJlbmRlciB0aGUgb3JpZ2luYWwgc2NlbmUgZ2VvbWV0cnkgb24gdG9wIG9mIHRoZSBncmFwaFxuICBpZiAoc2hvd09ic3RhY2xlcylcbiAge1xuICAgIHJlbmRlcmVyLnJlbmRlciggc3RhcnQsICcjMGEwJywgNiApO1xuICAgIHJlbmRlcmVyLnJlbmRlciggZW5kLCAnIzBhMCcsIDYgKTtcbiAgICByZW5kZXJlci5yZW5kZXIoIHNjZW5lLm9iamVjdHMsICcjMzMzJyApO1xuICB9XG5cbiAgbGV0IGluc2lkZSA9IGRvZGdlX251bGxzcGFjZSgpO1xuXG4gIC8vIFVzZXIgaGFzIG1vdmVkIHRoZSBtb3VzZSBpbnNpZGUgYSBzaGFwZSBvYnN0YWNsZSB3aGljaCBpbnZhbGlkYXRlcyB0aGUgZ3JhcGhcbiAgaWYgKGluc2lkZSA+PSAwKVxuICB7XG4gICAgc2hvd19pbmZvKFwiRW5kIHBvaW50IGluc2lkZSBzb2xpZCBvYmplY3QhXCIpXG4gICAgcmVuZGVyZXIucmVuZGVyKCBbc2NlbmUub2JqZWN0c1tpbnNpZGVdXSwgJyNmMDAnLCA1ICk7XG4gIH0gZWxzZSBoaWRlX2luZm8oKTtcblxuICAvLyBOb3cgZGlzcGxheSB0aGUgZm91bmQgcm91dGUhXG4gIHJlbmRlcmVyLnJlbmRlciggW3JvdXRlXSwgJyMwMGYnLCAzICk7XG5cbn0pKCk7XG5cblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCkub25tb3VzZW1vdmUgPSBlID0+IHsgbW91c2UgPSBbZS5jbGllbnRYLCBlLmNsaWVudFldOyAgfVxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NiX2RlYnVnJykub25jbGljayA9IChlLCBjKSA9PiB7IHNob3dHcmFwaCA9IGUuc3JjRWxlbWVudC5jaGVja2VkOyB9XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2JfZGVidWcyJykub25jbGljayA9IChlLCBjKSA9PiB7IHNob3dPYnN0YWNsZXMgPSBlLnNyY0VsZW1lbnQuY2hlY2tlZDsgfVxuXG5mdW5jdGlvbiBzaG93X2luZm8odGV4dCkgeyBpbmZvLmlubmVySFRNTCA9IHRleHQ7IGluZm8uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7IH1cbmZ1bmN0aW9uIGhpZGVfaW5mbygpIHsgaW5mby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9XG5cbi8vIFRoaXMgcHJldmVudHMgYSBiaXQgb2YgYSBtZXNzIGZyb20gaGFwcGVuaW5nXG4vLyB3aGVuIHRoZSBtb3VzZSBjdXJzb3IgZHJpZnRzICppbnNpZGUqIGEgc3VwcG9zZWRseSBzb2xpZCBzaGFwZVxuZnVuY3Rpb24gZG9kZ2VfbnVsbHNwYWNlKClcbntcbiAgLy8gQ2hlY2sgdGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgZWFjaCBvZiBvdXIgc29saWQgc2hhcGVzXG4gIGZvciAobGV0IGkgaW4gb2JzdGFjbGVzKVxuICB7XG4gICAgbGV0IG8gPSBvYnN0YWNsZXNbaT4+MF07XG4gICAgLy8gT2ggbm8hXG4gICAgaWYgKHBvaW50X2luX3BvbHlnb24obW91c2UsIG8pKSAgLy8gc2ltcGxlIGNvbnZleC1vbmx5IHRlc3RcbiAgICB7XG4gICAgICAvLyBTZXQgdGhlIGVuZHBvaW50IHRvIHRoZSBzdGFydCB0byByZW1vdmUgdGhlIHJlZCBsaW5lIGFuZCBjdXJzb3JcbiAgICAgIGVuZCA9IHN0YXJ0O1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIC8vIEFsbCBnb29kLCBzZXQgdGhlIGVuZHBvaW50IHRvIHRoZSBsYXN0IGtub3duIG1vdXNlIHBvc1xuICBlbmQgPSBtb3VzZTtcbiAgcmV0dXJuIC0xO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiLCJcbmltcG9ydCBHcmFwaCAgICAgICAgICBmcm9tICcuL0dyYXBoJztcbmltcG9ydCB7aW50ZXJzZWN0c30gICBmcm9tICcuL1V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZVxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICB0aGlzLm9iamVjdHMgPSBbXTtcbiAgICB0aGlzLmdyYXBoID0gbnVsbDtcblxuICAgIC8vIFRoaXMgaXMganVzdCBmb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoXG4gICAgdGhpcy5fdmlzID0gbnVsbDtcbiAgfVxuXG4gIGFkZChvYmplY3QpXG4gIHtcbiAgICB0aGlzLm9iamVjdHMucHVzaChvYmplY3QpO1xuICB9XG5cbiAgc29sdmUoc3RhcnQsIGVuZClcbiAge1xuICAgIGlmIChzdGFydCA9PSBlbmQpIHJldHVybjtcblxuICAgIHRoaXMuZ3JhcGggPSB0aGlzLl9ncmFwaChzdGFydCwgZW5kKTtcbiAgICBsZXQgbm9kZXMgPSB0aGlzLmdyYXBoLnNob3J0ZXN0KDAsIDEpOyAvLyBbMF0gc3RhcnQsIFsxXSBlbmQgKHNlZSAuZ3JhcGgoKSlcblxuICAgIGxldCByb3V0ZSA9IFtdO1xuXG4gICAgZm9yIChsZXQgbiBvZiBub2RlcylcbiAgICAgIHJvdXRlLnB1c2godGhpcy5fdmlzLm5vZGVzWyBuIF0pO1xuXG4gICAgcmV0dXJuIHJvdXRlO1xuICB9XG5cbiAgdmlzKClcbiAge1xuICAgIHJldHVybiB0aGlzLl92aXM7XG4gIH1cblxuICAvLyBFeHRyYWN0IGEgc2NlbmVncmFwaCBmcm9tIG91ciBjb250aW51b3VzIGV1Y2xpZGVhbiBnZW9tZXRyeVxuICBfZ3JhcGgoc3RhcnQsIGVuZClcbiAge1xuICAgIGxldCBub2RlcyA9IFtdO1xuICAgIGxldCBlZGdlcyA9IFtdO1xuXG4gICAgbGV0IGcgPSBuZXcgR3JhcGgoKTtcblxuICAgIC8vIEZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICB0aGlzLl92aXMgPSB7IG5vZGVzOiBbXSwgZWRnZXM6IFtdIH07XG5cbiAgICAvLyBUaGlzIGlzIGp1c3QgYSB0ZW1wIHZhbHVlIHVzZWQgdG8gbWFrZSBzdXJlIHNoYXBlcyBkb24ndCBwZXJmb3JtXG4gICAgLy8gaW50ZXJzZWN0aW9uIHRlc3RzIG9uIHRoZW1zZWx2ZXMgKHRoZWlyIG93biB2ZXJ0aWNlcywgY3Jvc3NpbmcgaW50ZXJuYWxseSlcbiAgICBsZXQgc2hhcGVfaWQgPSAxO1xuXG4gICAgLy8gVGhlc2UgZmlyc3QgdHdvIG5vZGVzIGluIHRoZSBncmFwaCBhcmUgYSBzcGVjaWFsIGNhc2VcbiAgICBub2Rlcy5wdXNoKCB7dmVydGV4OiBzdGFydCwgIHNoYXBlOiBzaGFwZV9pZCsrfSApOyAvLyBbMF0gc3RhcnQgKHNlZSAuc29sdmUoKSlcbiAgICBub2Rlcy5wdXNoKCB7dmVydGV4OiBlbmQsICAgIHNoYXBlOiBzaGFwZV9pZCsrfSApOyAvLyBbMV0gZW5kXG5cbiAgICBsZXQgZ2VkZ2VzID0gW107XG5cbiAgICAvLyBleHRyYWN0IGVhY2ggb2JzdGFjbGUncyBlZGdlcyBhbmQgbm9kZXNcbiAgICBmb3IgKGxldCBvIG9mIHRoaXMub2JqZWN0cylcbiAgICB7XG4gICAgICBzaGFwZV9pZCsrO1xuXG4gICAgICBsZXQgZTtcbiAgICAgIGxldCBiYXNlID0gbm9kZXMubGVuZ3RoO1xuICAgICAgZm9yIChlPTA7IGU8by5sZW5ndGgtMTsgZSsrKVxuICAgICAge1xuXG4gICAgICAgIGxldCB2MSA9IGJhc2UgKyBlO1xuICAgICAgICAvLyBGZnMgYWxhbiB3aGF0IGEgbWVzcyAobi5iLiBpdCB0b29rIDMwIG1pbnMgb2YgZGVidWdnaW5nIHRvIGdldCB0aGlzIGxpbmUgYmVsb3cgY29ycmVjdClcbiAgICAgICAgLy8gaXQgd2FzIG9yaWdpbmFsbHkgKGJhc2UgKyBlICsgMSkgJSAoby5sZW5ndGgtMSkpIHdoaWNoIGlzIHF1aXRlIGRpZmZlcmVudC5cbiAgICAgICAgLy8gSSB0aG91Z2h0IHRoaXMgd2FzIGdvaW5nIHRvIGJlIHN1Y2ggYSBkaWZmaWN1bHQgYnVnIHRvIGZpeCwgSSBuZWFybHkgZGlkbid0IGJvdGhlciB0cnlpbmcuXG4gICAgICAgIC8vIHRiaCwgdGhlc2Ugbm9kZS9lZGdlIHN0cnVjdHVyZXMgbmVlZCBhIHNlcmlvdXMgcmVmYWN0b3JpbmcgaWYgZXZlciB0aGlzIHByb2dyYW0gaXMgZXhwYW5kZWQhISFcbiAgICAgICAgbGV0IHYyID0gYmFzZSArICgoZSArIDEpICUgKG8ubGVuZ3RoLTEpKTtcblxuICAgICAgICBnZWRnZXMucHVzaCh7XG4gICAgICAgICAgaW5kZXg6W3YxLCB2Ml0sXG4gICAgICAgICAgdmVydGV4OiBbb1tlXSwgb1tlKzFdXVxuICAgICAgICB9KTtcblxuICAgICAgICBlZGdlcy5wdXNoKFtvW2VdLCBvW2UrMV1dKTtcblxuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB2ZXJ0ZXg6IG9bZV0sXG4gICAgICAgICAgc2hhcGU6IHNoYXBlX2lkXG4gICAgICAgIH0pO1xuXG4gICAgICB9XG5cbiAgICAgIC8vIHRoaXMgaXNuJ3QgYSBjbG9zZWQgcmluZyAobWF0Y2hpbmcgc3RhcnQgYW5kIGVuZHApXG4gICAgICAvLyBpLmUuIGEgc3RyYWlnaHQgbGluZS5cbiAgICAgIC8vIExhdGVyOiBJbiBoaW5kc2lnaHQsIEkgc2hvdWxkbid0IGhhdmUgYm90aGVyZWQgdHJ5aW5nIHRvXG4gICAgICAvLyBzdXBwb3J0IGVzc2VudGlhbGx5IGRpbWVuc2lvbmxlc3MgZW50aXRpZXMgbGlrZSBhIHR3by1zaWRlZCBzdHJhaWdodCBsaW5lIGluIDJkIHNwYWNlLlxuICAgICAgLy8gZXZlcnl0aGluZyBzaG91bGQgYmUgYSBjbG9zZWQgcmluZywgZXZlbiBpZiBpdCdzIGluaW5pdGVseSBzbWFsbC5cbiAgICAgIGlmICghZXF1YWxzKG9bMF0sIG9bZV0pKVxuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB2ZXJ0ZXg6IG9bZV0sXG4gICAgICAgICAgc2hhcGU6IHNoYXBlX2lkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCBgbm9kZXNgIGluZGljZXMgdG8gZ3JhcGhcbiAgICBmb3IgKGxldCBpIGluIG5vZGVzKVxuICAgIHtcbiAgICAgIGcuYWRkdmVydGV4KE51bWJlcihpKSk7XG5cbiAgICAgIC8vIEZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICAgIHRoaXMuX3Zpcy5ub2Rlcy5wdXNoKG5vZGVzW051bWJlcihpKV0udmVydGV4KTtcbiAgICB9XG5cbiAgICAvL1RPRE86IHJlZmFjdG9yIHRoZSBub2RlL2VkZ2UgZGF0YSBzdHJ1Y3QgbWVzc1xuICAgIGZvciAobGV0IGdlIG9mIGdlZGdlcylcbiAgICB7XG4gICAgICBnLmFkZGVkZ2UoZ2UuaW5kZXhbMF0sIGdlLmluZGV4WzFdLCBjb3N0KGdlLnZlcnRleFswXSwgZ2UudmVydGV4WzFdKSk7XG4gICAgICB0aGlzLl92aXMuZWRnZXMucHVzaChbZ2UudmVydGV4WzBdLCBnZS52ZXJ0ZXhbMV1dKTtcbiAgICB9XG5cbiAgICBsZXQgbmU9MDtcblxuICAgIGZvciAobGV0IHg9MDsgeDxub2Rlcy5sZW5ndGgtMTsgeCsrKVxuICAgICAgZm9yIChsZXQgeT14KzE7IHk8bm9kZXMubGVuZ3RoOyB5KyspXG4gICAgICB7XG4gICAgICAgICAgbGV0IEEgPSBub2Rlc1t4XTtcbiAgICAgICAgICBsZXQgQiA9IG5vZGVzW3ldO1xuXG4gICAgICAgICAgLy8gV2UncmUgdGVzdGluZyB0aGUgc2hhcGUncyB2ZXJ0aWNlcyBhZ2FpbnN0IGl0c2VsZlxuICAgICAgICAgIC8vIHdoaWNoIGxlYWRzIHRvIGludGVybmFsIHBhdGhzIGluc2lkZSB0aGUgc2hhcGUgKGludmFsaWQhKVxuICAgICAgICAgIGlmIChBLnNoYXBlID09IEIuc2hhcGUpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgbGV0IHRlc3RlZGdlID0gW0EudmVydGV4LCBCLnZlcnRleF07XG5cbiAgICAgICAgICBpZiAoZWRnZXZpc2liaWx0eSh0ZXN0ZWRnZSwgZWRnZXMpKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGcuYWRkZWRnZSh4LCB5LCBjb3N0KEEudmVydGV4LCBCLnZlcnRleCkpO1xuXG4gICAgICAgICAgICAvLyBKdXN0IGZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGgsIG5vbi1lc3NlbnRpYWw6XG4gICAgICAgICAgICB0aGlzLl92aXMuZWRnZXMucHVzaChbQS52ZXJ0ZXgsIEIudmVydGV4XSk7XG4gICAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICByZXR1cm4gZztcbiAgfVxuXG59XG5cblxuXG5mdW5jdGlvbiBjb3N0KGEsIGIpXG57XG4gIGxldCBkeCA9IGJbMF0gLSBhWzBdIC8vIHgyIC0geDFcbiAgbGV0IGR5ID0gYlsxXSAtIGFbMV07XG4gIHJldHVybiBNYXRoLnNxcnQoIGR4KmR4ICsgZHkqZHkgKTtcblxufVxuXG5mdW5jdGlvbiBlZGdldmlzaWJpbHR5KHRlc3RlZGdlLCBlZGdlcylcbntcbiAgLy8gY29uc29sZS5sb2coYFRlc3RpbmcgZWRnZTogJHt0ZXN0ZWRnZVswXX0sICR7dGVzdGVkZ2VbMV19YCk7XG5cbiAgZm9yIChsZXQgdD0wOyB0PGVkZ2VzLmxlbmd0aDsgdCsrKVxuICB7XG4gICAgbGV0IGUgPSBlZGdlc1t0XTtcblxuICAgIGxldCByZXMgPSBpbnRlcnNlY3RzKHRlc3RlZGdlWzBdLCB0ZXN0ZWRnZVsxXSwgZVswXSwgZVsxXSk7XG5cbiAgICAvLyBJZiBpbnRlcnNlY3Rpb24sIGNoZWNrIGl0J3Mgbm90IGp1c3QgdGhlIGVuZHBvaW50cyBraXNzaW5nIHdoaWNoIGlzIG9rXG4gICAgLy8gaW4gZmFjdCwgaXQncyBtb3JlIHRoYW4gJ29rJyAtIGl0J3MgZXhhY3RseSB3aGF0IHdlJ3JlIGxvb2tpbmcgZm9yXG4gICAgaWYgKHJlcy5pbnRlcnNlY3QgJiYgIXJlcy5raXNzKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5mdW5jdGlvbiBlcXVhbHMoYSwgYilcbntcbiAgcmV0dXJuIChhWzBdID09IGJbMF0gJiYgYVsxXSA9PSBiWzFdKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TY2VuZS5qcyIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcyA9IFtdO1xuICAgIHRoaXMuZWRnZXMgPSBbXTtcbiAgICB0aGlzLm51bWVkZ2VzID0gMDtcbiAgfVxuXG4gIGFkZHZlcnRleChuKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcy5wdXNoKG4pO1xuICAgIHRoaXMuZWRnZXNbbl0gPSBbXTtcbiAgfVxuXG4gIC8vIGFkamFjZW55IGVkZ2UgbGlzdFxuICBhZGRlZGdlKHYxLCB2MiwgY29zdClcbiAge1xuICAgIHRoaXMuZWRnZXNbdjFdLnB1c2goe2Rlc3Q6djIsIGNvc3R9KTtcbiAgICB0aGlzLmVkZ2VzW3YyXS5wdXNoKHtkZXN0OnYxLCBjb3N0fSk7XG5cbiAgICB0aGlzLm51bWVkZ2VzKys7XG4gIH1cblxuICAvLyBTdXBlciBiYXNpYyBpbXBsZW1lbnRhdGlvbiBvZiBEaWprc3RyYSdzIGFsZ29yaXRobVxuICAvLyBEaXJlY3RseSBmcm9tIHRoaXMgcmVjaXBlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EaWprc3RyYSUyN3NfYWxnb3JpdGhtI0FsZ29yaXRobVxuICBzaG9ydGVzdChzdGFydCwgZW5kKVxuICB7XG4gICAgbGV0IGN1cnJlbnRfbm9kZTtcbiAgICBsZXQgZGlzdCA9IFswXTtcbiAgICBsZXQgcHJldiA9IFtdO1xuICAgIGxldCB1bnZpc2l0ZWQgPSBbXTtcblxuICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnZlcnRpY2VzLmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgIGlmIChpKSBkaXN0W2ldID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgIHVudmlzaXRlZFtpXSA9IGk7XG4gICAgICBwcmV2W2ldID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyAnVmlzaXQnIGVhY2ggbm9kZSBvbmx5IG9uY2UsIGluIHR1cm5cbiAgICB3aGlsZSggKGN1cnJlbnRfbm9kZSA9IHVudmlzaXRlZC5zaGlmdCgpKSAhPSBudWxsIClcbiAgICB7XG4gICAgICAvLyBGb3IgZWFjaCBub2RlLCAnY2hlY2snIGl0cyBuZWlnaGJvdXJzLlxuICAgICAgLy8gV2hpbGUgd2Ugb25seSAndmlzaXQnIGVhY2ggbm9kZSBvbmNlLCBpdCdzIHRoaXMgcmVwZWF0ZWQgJ2NoZWNrJ2luZ1xuICAgICAgLy8gKGFuZCBvY2Nhc2lvbmFsIHJlY2FsY3VsYXRpbmcpIG9mIG5laWdoYm91cnMgdGhhdCBhbGxvd3MgdXMgdG8gZmluZFxuICAgICAgLy8gdGhlIHNob3J0ZXN0IHJvdXRlIHRocm91Z2ggdGhlIGdyYXBoIGZyb20gb3VyIHN0YXJ0IHBvaW50LlxuICAgICAgLy8gSW4gZmFjdCwgdGhlIGluaGVyZW50IHJlc3VsdCBvZiB0aGUgYWxnbyBpcyB0aGF0IHdlIGZpbmQgdGhlIHNob3J0ZXN0XG4gICAgICAvLyBwYXRoIHRvICpldmVyeSogcG9pbnQgaW4gdGhlIGdyYXBoXG4gICAgICBmb3IgKGxldCB0PTA7IHQ8dGhpcy5lZGdlc1tjdXJyZW50X25vZGVdLmxlbmd0aDsgdCsrKVxuICAgICAge1xuICAgICAgICAvLyB2ZXJ0ZXgvbm9kZSBJRFxuICAgICAgICBsZXQgbmVpZ2hib3VyID0gdGhpcy5lZGdlc1tjdXJyZW50X25vZGVdW3RdLmRlc3Q7XG5cbiAgICAgICAgLy8gRGlzdGFuY2UgZnJvbSBjdXJyZW50X25vZGUgdG8gbmVpZ2hib3VyXG4gICAgICAgIGxldCBjb3N0ID0gdGhpcy5lZGdlc1tjdXJyZW50X25vZGVdW3RdLmNvc3Q7XG5cbiAgICAgICAgLy8gRGlzdGFuY2UgdGh1cyBmYXIgb24gdGhpcyByb3V0ZSAodXAgdG8gY3VycmVudF9ub2RlKSArIGRpc3RhbmNlIHRvIG5laWdoYm91clxuICAgICAgICBsZXQgdGVudGF0aXZlX2Rpc3QgPSBkaXN0W2N1cnJlbnRfbm9kZV0gKyBjb3N0O1xuXG4gICAgICAgIC8vIEhhdmUgd2UgZm91bmQgYSBzaG9ydGVyIHBhdGg/XG4gICAgICAgIGlmICh0ZW50YXRpdmVfZGlzdCA8IGRpc3RbbmVpZ2hib3VyXSlcbiAgICAgICAge1xuICAgICAgICAgIGRpc3RbbmVpZ2hib3VyXSA9IHRlbnRhdGl2ZV9kaXN0OyAvLyBOZXcgZGlzdGFuY2UgdG8gdGhpcyBub2RlXG4gICAgICAgICAgcHJldltuZWlnaGJvdXJdID0gY3VycmVudF9ub2RlOyAgIC8vIFVwZGF0ZSB0aGUgcm91dGVcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGMgPSBlbmQsIHNlcSA9W2VuZF07XG5cbiAgICAvLyBmYWlsZWQgZm9yIHNvbWUgcmVhc29uLCBlLmcuIGltcG9zc2libGUgcG9pbnQgaW5zaWRlIG51bGxzcGFjZSBldGNcbiAgICBpZiAocHJldltjXSA9PSBudWxsKVxuICAgICAgcmV0dXJuIFtdO1xuXG4gICAgZG8ge1xuICAgICAgYyA9IHByZXZbY107XG4gICAgICBzZXEucHVzaChjKTtcbiAgICB9IHdoaWxlKGMgIT0gc3RhcnQpO1xuXG4gICAgcmV0dXJuIHNlcS5yZXZlcnNlKCk7XG5cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvR3JhcGguanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXJcbntcbiAgY29uc3RydWN0b3IoZWxlbWVudClcbiAge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICB9XG5cbiAgY2xlYXIoKVxuICB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgcmVuZGVyKG9iamVjdHMsIGNvbG91ciA9ICcjMDAwJywgd2lkdGggPSAyKVxuICB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdHMpKSByZXR1cm47XG5cbiAgICAvLyBwb2ludCB0eXBlXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdHNbMF0pKVxuICAgIHtcbiAgICAgIGNvbnN0IHAgPSBvYmplY3RzO1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LmFyYyhwWzBdPj4wLCBwWzFdPj4wLCB3aWR0aCwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvdXI7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgLy8gbGlzdCBvZiBzaGFwZXMgdHlwZVxuXG4gICAgICBmb3IgKGxldCBvIG9mIG9iamVjdHMpXG4gICAgICB7XG4gICAgICAgIGZvciAobGV0IGU9MDsgZTxvLmxlbmd0aC0xOyBlKyspXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLl9saW5lKG9bZV0sIG9bZSsxXSwgY29sb3VyLCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgX2xpbmUoYSwgYiwgYywgdylcbiAge1xuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB3O1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGMgfHwgJ2JsYWNrJztcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhhWzBdPj4wLGFbMV0+PjApO1xuICAgIHRoaXMuY29udGV4dC5saW5lVG8oYlswXT4+MCxiWzFdPj4wKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlcmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==