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

  var inside = dodge_nullspace();

  if (showGraph) // && (inside==-1))
    {
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
  } else {

    hide_info();

    // Now display the found route!
    renderer.render([route], '#00f', 3);
  }
})();

document.getElementById(element).onmousemove = function (e) {
  mouse = [e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzNlZWExM2I4ZjlhNjUyYTQ1Y2UiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJUcmlhbmdsZSIsImFuZ2xlIiwiciIsIk1hdGgiLCJzaW4iLCJQSSIsInRyaSIsImkiLCJjb3MiLCJyb3RhdGUiLCJzaGFwZSIsInJ4IiwicnkiLCJkYSIsInBhaXIiLCJyb3RhdGVfcG9pbnQiLCJ0cmFuc2xhdGUiLCJkeCIsImR5IiwiY3giLCJjeSIsInAiLCJzIiwiYyIsInhuZXciLCJ5bmV3IiwicG9pbnRfaW5fcG9seWdvbiIsInBvaW50IiwidmVydGljZXMiLCJsZW5ndGgiLCJhIiwiYiIsInNlZyIsInN1YnRyYWN0UG9pbnRzIiwicHQiLCJpbnNpZGUiLCJjcm9zc1Byb2R1Y3QiLCJpbnRlcnNlY3RzIiwiYXAiLCJhcDIiLCJhcSIsImFxMiIsImRvTGluZVNlZ21lbnRzSW50ZXJzZWN0IiwiaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsiLCJwMiIsInEiLCJxMiIsImJveDEiLCJ4bWluIiwibWluIiwieW1pbiIsInhtYXgiLCJtYXgiLCJ5bWF4IiwiYm94MiIsImJib3hfY29udGFpbmVkIiwidU51bWVyYXRvciIsImRlbm9taW5hdG9yIiwiZXF1YWxQb2ludHMiLCJpbnRlcnNlY3QiLCJraXNzIiwiYWxsRXF1YWwiLCJ1IiwidCIsInBvaW50MSIsInBvaW50MiIsIkFycmF5IiwiaXNBcnJheSIsInJlc3VsdCIsImFyZ3MiLCJmaXJzdFZhbHVlIiwiYXJndW1lbnRzIiwiZWxlbWVudCIsInJlbmRlcmVyIiwic2NlbmUiLCJpbmZvIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNob3dHcmFwaCIsInNob3dPYnN0YWNsZXMiLCJzdGFydCIsImVuZCIsIm1vdXNlIiwic2xpY2UiLCJyb3R4Iiwicm90eSIsInJvdGEiLCJtb3Rpb24iLCJzcV9zbWFsbCIsInNxX2xhcmdlIiwib2JzdGFjbGVzIiwibyIsImFkZCIsImZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2xlYXIiLCJyb3V0ZSIsInNvbHZlIiwidmlzIiwiZG9kZ2VfbnVsbHNwYWNlIiwibm9kZXMiLCJuIiwicmVuZGVyIiwiZWRnZXMiLCJvYmplY3RzIiwic2hvd19pbmZvIiwiaGlkZV9pbmZvIiwib25tb3VzZW1vdmUiLCJlIiwiY2xpZW50WCIsInRhcmdldCIsIm9mZnNldExlZnQiLCJjbGllbnRZIiwib2Zmc2V0VG9wIiwib25jbGljayIsInNyY0VsZW1lbnQiLCJjaGVja2VkIiwidGV4dCIsImlubmVySFRNTCIsInN0eWxlIiwiZGlzcGxheSIsIlNjZW5lIiwiZ3JhcGgiLCJfdmlzIiwib2JqZWN0IiwiX2dyYXBoIiwic2hvcnRlc3QiLCJnIiwic2hhcGVfaWQiLCJ2ZXJ0ZXgiLCJnZWRnZXMiLCJiYXNlIiwidjEiLCJ2MiIsImluZGV4IiwiZXF1YWxzIiwiYWRkdmVydGV4IiwiTnVtYmVyIiwiZ2UiLCJhZGRlZGdlIiwiY29zdCIsIm5lIiwiQSIsIkIiLCJ0ZXN0ZWRnZSIsImVkZ2V2aXNpYmlsdHkiLCJzcXJ0IiwicmVzIiwiR3JhcGgiLCJudW1lZGdlcyIsImRlc3QiLCJjdXJyZW50X25vZGUiLCJkaXN0IiwicHJldiIsInVudmlzaXRlZCIsIk1BWF9WQUxVRSIsInNoaWZ0IiwibmVpZ2hib3VyIiwidGVudGF0aXZlX2Rpc3QiLCJzZXEiLCJyZXZlcnNlIiwiUmVuZGVyZXIiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiY29sb3VyIiwiYmVnaW5QYXRoIiwiYXJjIiwiZmlsbFN0eWxlIiwiZmlsbCIsIl9saW5lIiwidyIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzNEQSxTQUFTQSxNQUFULENBQWdCQyxDQUFoQixFQUFtQkMsQ0FBbkIsRUFBc0JDLElBQXRCLEVBQ0E7QUFDRSxNQUFJQyxRQUFRRCxRQUFNLENBQWxCO0FBQ0EsTUFBSUUsS0FBSyxFQUFUO0FBQ0E7QUFDQTtBQUNBQSxLQUFHQyxJQUFILENBQVMsQ0FBQ0wsSUFBSUcsS0FBTCxFQUFZRixJQUFJRSxLQUFoQixDQUFUO0FBQ0E7QUFDQUMsS0FBR0MsSUFBSCxDQUFTLENBQUNMLElBQUlHLEtBQUwsRUFBWUYsSUFBSUUsS0FBaEIsQ0FBVDtBQUNBO0FBQ0FDLEtBQUdDLElBQUgsQ0FBUyxDQUFDTCxJQUFJRyxLQUFMLEVBQVlGLElBQUlFLEtBQWhCLENBQVQ7QUFDQTtBQUNBQyxLQUFHQyxJQUFILENBQVMsQ0FBQ0wsSUFBSUcsS0FBTCxFQUFZRixJQUFJRSxLQUFoQixDQUFUO0FBQ0E7QUFDQUMsS0FBR0MsSUFBSCxDQUFTLENBQUNMLElBQUlHLEtBQUwsRUFBWUYsSUFBSUUsS0FBaEIsQ0FBVDs7QUFFQSxTQUFP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S0FBS0UsRUFBdEQsRUFBMEQsS0FBMUQ7QUFDQSxhQUFLNkosT0FBTCxDQUFhUSxTQUFiLEdBQXlCSCxNQUF6QjtBQUNBLGFBQUtMLE9BQUwsQ0FBYVMsSUFBYjtBQUNELE9BUEQsTUFPTztBQUNQOztBQURPO0FBQUE7QUFBQTs7QUFBQTtBQUdMLCtCQUFjbkUsT0FBZCw4SEFDQTtBQUFBLGdCQURTYixDQUNUOztBQUNFLGlCQUFLLElBQUlpQixJQUFFLENBQVgsRUFBY0EsSUFBRWpCLEVBQUU5RCxNQUFGLEdBQVMsQ0FBekIsRUFBNEIrRSxHQUE1QixFQUNBO0FBQ0UsbUJBQUtnRSxLQUFMLENBQVdqRixFQUFFaUIsQ0FBRixDQUFYLEVBQWlCakIsRUFBRWlCLElBQUUsQ0FBSixDQUFqQixFQUF5QjJELE1BQXpCLEVBQWlDRixLQUFqQztBQUNEO0FBQ0Y7QUFUSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV047QUFFRjs7OzBCQUVLdkksQyxFQUFHQyxDLEVBQUdSLEMsRUFBR3NKLEMsRUFDZjtBQUNFLFdBQUtYLE9BQUwsQ0FBYVksU0FBYixHQUF5QkQsQ0FBekI7QUFDQSxXQUFLWCxPQUFMLENBQWFhLFdBQWIsR0FBMkJ4SixLQUFLLE9BQWhDO0FBQ0EsV0FBSzJJLE9BQUwsQ0FBYU0sU0FBYjtBQUNBLFdBQUtOLE9BQUwsQ0FBYWMsTUFBYixDQUFvQmxKLEVBQUUsQ0FBRixLQUFNLENBQTFCLEVBQTRCQSxFQUFFLENBQUYsS0FBTSxDQUFsQztBQUNBLFdBQUtvSSxPQUFMLENBQWFlLE1BQWIsQ0FBb0JsSixFQUFFLENBQUYsS0FBTSxDQUExQixFQUE0QkEsRUFBRSxDQUFGLEtBQU0sQ0FBbEM7QUFDQSxXQUFLbUksT0FBTCxDQUFhZ0IsTUFBYjtBQUNEOzs7Ozs7a0JBaERrQmpCLFEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzNlZWExM2I4ZjlhNjUyYTQ1Y2UiLCJcblxuZnVuY3Rpb24gU3F1YXJlKHgsIHksIHNpemUpXG57XG4gIGxldCBoc2l6ZSA9IHNpemU+PjE7XG4gIGxldCBzcSA9IFtdO1xuICAvLyBvciBqdXN0IG1ha2UgYSB1bml0IHNxdWFyZSBhbmQgc2NhbGUgaXQgdXAgZHVoIDp8XG4gIC8vIHRvcCBsZWZ0XG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgLSBoc2l6ZV0gKTtcbiAgLy8gdG9wIHJpZ2h0XG4gIHNxLnB1c2goIFt4ICsgaHNpemUsIHkgLSBoc2l6ZV0gKTtcbiAgLy8gYm90dG9tIHJpZ2h0XG4gIHNxLnB1c2goIFt4ICsgaHNpemUsIHkgKyBoc2l6ZV0gKTtcbiAgLy8gYm90dG9tIGxlZnRcbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSArIGhzaXplXSApO1xuICAvLyB0b3AgbGVmdCBhZ2FpblxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5IC0gaHNpemVdICk7XG5cbiAgcmV0dXJuIHNxO1xufVxuXG4vLyBlcXVpbGF0ZXJhbFxuZnVuY3Rpb24gVHJpYW5nbGUoeCwgeSwgc2l6ZSlcbntcbiAgbGV0IGFuZ2xlID0gMDtcbiAgbGV0IHIgPSAoc2l6ZS8yLjApL01hdGguc2luKE1hdGguUEkqNjAvMTgwKTtcbiAgbGV0IHRyaSA9IFtdO1xuXG4gIGZvcihsZXQgaT0wOyBpPD0zOyBpKyspXG4gIHtcbiAgICB0cmkucHVzaChbXG4gICAgICB4ICsgciAqIE1hdGguY29zKGFuZ2xlICsgKGkgJSAzKSAqIDIgKiBNYXRoLlBJLzMpLFxuICAgICAgeSArIHIgKiBNYXRoLnNpbihhbmdsZSArIChpICUgMykgKiAyICogTWF0aC5QSS8zKVxuICAgIF0pO1xuICB9XG5cbiAgcmV0dXJuIHRyaTtcbn1cblxuZnVuY3Rpb24gcm90YXRlKHNoYXBlLCByeCwgcnksIGRhKVxue1xuICBmb3IgKGxldCBwYWlyIG9mIHNoYXBlKVxuICAgIHBhaXIgPSByb3RhdGVfcG9pbnQocngsIHJ5LCBkYSwgcGFpcik7XG59XG5cbmZ1bmN0aW9uIHRyYW5zbGF0ZShzaGFwZSwgZHgsIGR5KVxue1xuICBmb3IgKGxldCBwYWlyIG9mIHNoYXBlKVxuICB7XG4gICAgcGFpclswXSArPSBkeDtcbiAgICBwYWlyWzFdICs9IGR5O1xuICB9XG59XG5cbmZ1bmN0aW9uIHJvdGF0ZV9wb2ludChjeCwgY3ksIGFuZ2xlLCBwKVxue1xuICBsZXQgcyA9IE1hdGguc2luKGFuZ2xlKTtcbiAgbGV0IGMgPSBNYXRoLmNvcyhhbmdsZSk7XG5cbiAgLy8gdHJhbnNsYXRlIHBvaW50IGJhY2sgdG8gb3JpZ2luOlxuICBwWzBdIC09IGN4O1xuICBwWzFdIC09IGN5O1xuXG4gIC8vIHJvdGF0ZSBwb2ludFxuICBsZXQgeG5ldyA9IHBbMF0gKiBjIC0gcFsxXSAqIHM7XG4gIGxldCB5bmV3ID0gcFswXSAqIHMgKyBwWzFdICogYztcblxuICAvLyB0cmFuc2xhdGUgcG9pbnQgYmFjazpcbiAgcFswXSA9IHhuZXcgKyBjeDtcbiAgcFsxXSA9IHluZXcgKyBjeTtcblxuICByZXR1cm4gcDtcbn1cblxuXG5mdW5jdGlvbiBwb2ludF9pbl9wb2x5Z29uKHBvaW50LCB2ZXJ0aWNlcylcbntcbiAgZm9yIChsZXQgaT0wOyBpPHZlcnRpY2VzLmxlbmd0aC0xOyBpKyspXG4gIHtcbiAgICBsZXQgYSA9IHZlcnRpY2VzW2ldO1xuICAgIGxldCBiID0gdmVydGljZXNbaSsxXTtcblxuICAgIGxldCBzZWcgPSBzdWJ0cmFjdFBvaW50cyhiLCBhKTtcbiAgICBsZXQgcHQgPSBzdWJ0cmFjdFBvaW50cyhwb2ludCwgYSk7XG4gICAgbGV0IGluc2lkZSA9IChjcm9zc1Byb2R1Y3Qoc2VnLCBwdCkgPiAwKTtcbiAgICAvLyBjb25zb2xlLmxvZyhpbnNpZGUpO1xuICAgIGlmICghaW5zaWRlKSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG4vKipcbiAqIEBhdXRob3IgUGV0ZXIgS2VsbGV5XG4gKiBAYXV0aG9yIHBna2VsbGV5NEBnbWFpbC5jb21cbiAqL1xuLyoqXG4gKiBTZWUgaWYgdHdvIGxpbmUgc2VnbWVudHMgaW50ZXJzZWN0LiBUaGlzIHVzZXMgdGhlXG4gKiB2ZWN0b3IgY3Jvc3MgcHJvZHVjdCBhcHByb2FjaCBkZXNjcmliZWQgYmVsb3c6XG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NjUyODIvNzg2MzM5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHAgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgc3RhcnQgb2YgdGhlIDFzdCBsaW5lLlxuICogQHBhcmFtIHtPYmplY3R9IHAyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIGVuZCBvZiB0aGUgMXN0IGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBzdGFydCBvZiB0aGUgMm5kIGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcTIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgZW5kIG9mIHRoZSAybmQgbGluZS5cbiAqL1xuXG5mdW5jdGlvbiBpbnRlcnNlY3RzKGFwLCBhcDIsIGFxLCBhcTIpXG57XG4gIC8vIEFNOiBOb3RlIHRvIGRldmVsb3BlcnMsIHBsZWFzZSBkb24ndCB1c2UgbmFtZWQgcHJvcGVydGllcyBmb3IgdmVjdG9yc1xuICAvLyAgICAgSXQncyBkYWZ0LiBVc2UgYXJyYXlzLlxuICByZXR1cm4gZG9MaW5lU2VnbWVudHNJbnRlcnNlY3QoIHt4OiBhcFswXSwgeTogYXBbMV19LCB7eDogYXAyWzBdLCB5OiBhcDJbMV19LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt4OiBhcVswXSwgeTogYXFbMV19LCB7eDogYXEyWzBdLCB5OiBhcTJbMV19ICk7XG59XG5cbmZ1bmN0aW9uIGlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrKHAsIHAyLCBxLCBxMilcbntcbiAgdmFyIGJveDEgPSB7XG4gICAgeG1pbjogTWF0aC5taW4ocC54LCBwMi54KSxcbiAgICB5bWluOiBNYXRoLm1pbihwLnksIHAyLnkpLFxuICAgIHhtYXg6IE1hdGgubWF4KHAueCwgcDIueCksXG4gICAgeW1heDogTWF0aC5tYXgocC55LCBwMi55KVxuICB9O1xuXG4gIHZhciBib3gyID0ge1xuICAgIHhtaW46IE1hdGgubWluKHEueCwgcTIueCksXG4gICAgeW1pbjogTWF0aC5taW4ocS55LCBxMi55KSxcbiAgICB4bWF4OiBNYXRoLm1heChxLngsIHEyLngpLFxuICAgIHltYXg6IE1hdGgubWF4KHEueSwgcTIueSlcbiAgfTtcblxuICByZXR1cm4gYmJveF9jb250YWluZWQoYm94MSwgYm94MikgfHwgYmJveF9jb250YWluZWQoYm94MiwgYm94MSk7XG59XG5cbmZ1bmN0aW9uIGJib3hfY29udGFpbmVkKGEsIGIpXG57XG4gIC8vIElzIEJveCBCIGNvbXBsZXRlbHkgaW5zaWRlIGJveCBBID9cbiAgcmV0dXJuIChiLnhtaW4gPj0gYS54bWluICYmIGIueG1heCA8PSBhLnhtYXgpICYmIChiLnltaW4gPj0gYS55bWluICYmIGIueW1heCA8PSBhLnltYXgpO1xufVxuXG5cbmZ1bmN0aW9uIGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0KHAsIHAyLCBxLCBxMilcbntcbiAgLy8gdmFyIGRlYnVnX3N0cmluZyA9IGBkb0xpbmVTZWdtZW50c0ludGVyc2VjdDogKCR7cC54fSwgJHtwLnl9KS0oJHtwMi54fSwgJHtwMi55fSkgIHdpdGggICgke3EueH0sICR7cS55fSktKCR7cTIueH0sICR7cTIueX0pYDtcblxuXHR2YXIgciA9IHN1YnRyYWN0UG9pbnRzKHAyLCBwKTtcblx0dmFyIHMgPSBzdWJ0cmFjdFBvaW50cyhxMiwgcSk7XG5cblx0dmFyIHVOdW1lcmF0b3IgPSBjcm9zc1Byb2R1Y3Qoc3VidHJhY3RQb2ludHMocSwgcCksIHIpO1xuXHR2YXIgZGVub21pbmF0b3IgPSBjcm9zc1Byb2R1Y3Qociwgcyk7XG5cblx0aWYgKHVOdW1lcmF0b3IgPT0gMCAmJiBkZW5vbWluYXRvciA9PSAwKSB7XG5cdFx0Ly8gVGhleSBhcmUgY29MbGluZWFyXG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvcGxhbmFyXCIpO1xuXG5cdFx0Ly8gRG8gdGhleSB0b3VjaD8gKEFyZSBhbnkgb2YgdGhlIHBvaW50cyBlcXVhbD8pXG5cdFx0aWYgKGVxdWFsUG9pbnRzKHAsIHEpIHx8IGVxdWFsUG9pbnRzKHAsIHEyKSB8fCBlcXVhbFBvaW50cyhwMiwgcSkgfHwgZXF1YWxQb2ludHMocDIsIHEyKSkge1xuXHRcdFx0cmV0dXJuIHtcbiAgICAgICAgaW50ZXJzZWN0OiB0cnVlLFxuICAgICAgICBraXNzOiAhaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsocCwgcDIsIHEsIHEyKVxuICAgICAgfTtcblxuXHRcdH1cblx0XHQvLyBEbyB0aGV5IG92ZXJsYXA/IChBcmUgYWxsIHRoZSBwb2ludCBkaWZmZXJlbmNlcyBpbiBlaXRoZXIgZGlyZWN0aW9uIHRoZSBzYW1lIHNpZ24pXG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIlBvaW50cyBET05UIHRvdWNoXCIpO1xuXG5cdFx0cmV0dXJuIHtcbiAgICAgIGludGVyc2VjdDpcbiAgICAgICAgICAgICFhbGxFcXVhbChcbiAgICAgIFx0XHRcdFx0KHEueCAtIHAueCA8IDApLFxuICAgICAgXHRcdFx0XHQocS54IC0gcDIueCA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueCAtIHAueCA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueCAtIHAyLnggPCAwKSkgfHxcbiAgICAgIFx0XHRcdCFhbGxFcXVhbChcbiAgICAgIFx0XHRcdFx0KHEueSAtIHAueSA8IDApLFxuICAgICAgXHRcdFx0XHQocS55IC0gcDIueSA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueSAtIHAueSA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueSAtIHAyLnkgPCAwKSksXG4gICAgICAgIGtpc3M6IGZhbHNlXG4gICAgICB9O1xuXG5cdH1cblxuXHRpZiAoZGVub21pbmF0b3IgPT0gMCkge1xuXHRcdC8vIGxpbmVzIGFyZSBwYXJhbGVsbFxuXHRcdHJldHVybiB7aW50ZXJzZWN0OiBmYWxzZSwga2lzczogZmFsc2V9O1xuXHR9XG5cblx0dmFyIHUgPSB1TnVtZXJhdG9yIC8gZGVub21pbmF0b3I7XG5cdHZhciB0ID0gY3Jvc3NQcm9kdWN0KHN1YnRyYWN0UG9pbnRzKHEsIHApLCBzKSAvIGRlbm9taW5hdG9yO1xuXG4gIC8vIGNvbnNvbGUubG9nKGB0PSR7dH0sIHU9JHt1fWApO1xuICB2YXIga2lzcyA9IGZhbHNlO1xuXG4gIGlmIChlcXVhbFBvaW50cyhwLCBxKSB8fCBlcXVhbFBvaW50cyhwLCBxMikgfHwgZXF1YWxQb2ludHMocDIsIHEpIHx8IGVxdWFsUG9pbnRzKHAyLCBxMikpXG4gICAga2lzcyA9IHRydWU7XG5cbiAgLy8gbGV0IHJlcyA9XG4gIC8vcmV0dXJuXG4gIHJldHVybiB7XG4gICAgaW50ZXJzZWN0OiAodCA+PSAwKSAmJiAodCA8PSAxKSAmJiAodSA+PSAwKSAmJiAodSA8PSAxKSxcbiAgICBraXNzOiBraXNzXG4gIH07XG5cbiAgLy8gY29uc29sZS5sb2coYCR7ZGVidWdfc3RyaW5nfSA9ICR7cmVzfWApO1xuXG5cdC8vIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHRoZSB0d28gcG9pbnRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiB0aGUgY3Jvc3MgcHJvZHVjdCByZXN1bHQgYXMgYSBmbG9hdFxuICovXG5mdW5jdGlvbiBjcm9zc1Byb2R1Y3QocG9pbnQxLCBwb2ludDIpIHtcblxuICBpZiAoQXJyYXkuaXNBcnJheShwb2ludDEpKVxuICAgIHJldHVybiBwb2ludDFbMF0gKiBwb2ludDJbMV0gLSBwb2ludDFbMV0gKiBwb2ludDJbMF07XG4gIGVsc2Vcblx0ICAgcmV0dXJuIHBvaW50MS54ICogcG9pbnQyLnkgLSBwb2ludDEueSAqIHBvaW50Mi54O1xufVxuXG4vKipcbiAqIFN1YnRyYWN0IHRoZSBzZWNvbmQgcG9pbnQgZnJvbSB0aGUgZmlyc3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIHRoZSBzdWJ0cmFjdGlvbiByZXN1bHQgYXMgYSBwb2ludCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gc3VidHJhY3RQb2ludHMocG9pbnQxLCBwb2ludDIpIHtcblxuICBpZiAoQXJyYXkuaXNBcnJheShwb2ludDEpKVxuICB7XG4gICAgcmV0dXJuIFsgcG9pbnQxWzBdIC0gcG9pbnQyWzBdLCBwb2ludDFbMV0gLSBwb2ludDJbMV0gXTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgcmVzdWx0LnggPSBwb2ludDEueCAtIHBvaW50Mi54O1xuICAgIHJlc3VsdC55ID0gcG9pbnQxLnkgLSBwb2ludDIueTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTZWUgaWYgdGhlIHBvaW50cyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIGlmIHRoZSBwb2ludHMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGVxdWFsUG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XG5cdHJldHVybiAocG9pbnQxLnggPT0gcG9pbnQyLngpICYmIChwb2ludDEueSA9PSBwb2ludDIueSlcbn1cblxuLyoqXG4gKiBTZWUgaWYgYWxsIGFyZ3VtZW50cyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHsuLi59IGFyZ3MgYXJndW1lbnRzIHRoYXQgd2lsbCBiZSBjb21wYXJlZCBieSAnPT0nLlxuICpcbiAqIEByZXR1cm4gaWYgYWxsIGFyZ3VtZW50cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gYWxsRXF1YWwoYXJncykge1xuXHR2YXIgZmlyc3RWYWx1ZSA9IGFyZ3VtZW50c1swXSxcblx0XHRpO1xuXHRmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKGFyZ3VtZW50c1tpXSAhPSBmaXJzdFZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0cnVlO1xufVxuXG5cblxuZXhwb3J0IHtTcXVhcmUsIFRyaWFuZ2xlLCBpbnRlcnNlY3RzLCByb3RhdGUsIHRyYW5zbGF0ZSwgcG9pbnRfaW5fcG9seWdvbn0gO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1V0aWwuanMiLCJcbmltcG9ydCBTY2VuZSAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1NjZW5lJztcbmltcG9ydCBSZW5kZXJlciAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCB7U3F1YXJlLCByb3RhdGUsIHRyYW5zbGF0ZX0gICAgICBmcm9tICcuL1V0aWwnO1xuaW1wb3J0IHtwb2ludF9pbl9wb2x5Z29uLCBUcmlhbmdsZX0gICAgIGZyb20gJy4vVXRpbCc7XG5cbmNvbnN0IGVsZW1lbnQgPSAnZGlzcGxheSc7XG5cbmxldCByZW5kZXJlciA9IG5ldyBSZW5kZXJlcihlbGVtZW50KTtcbmxldCBzY2VuZSA9IG5ldyBTY2VuZSgpO1xubGV0IGluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5mb1RleHQnKTtcblxuLy8gU2hvdy9oaWRlIHRoZSBzY2VuZSBncmFwaFxubGV0IHNob3dHcmFwaCA9IHRydWUsIHNob3dPYnN0YWNsZXMgPSB0cnVlO1xuXG4vLyBTdGFydCBwb2ludCwgZ29hbCBhbmQgbGFzdGtub3duIG1vdXNlIGNvb3Jkc1xubGV0IHN0YXJ0ID0gWzEwLCAxMF07XG5sZXQgZW5kID0gWzIyMCwgMTIwXTtcbmxldCBtb3VzZSA9IGVuZC5zbGljZSgpO1xuXG4vLyBGb3IgdGhlIHNoYXBlIGFuaW1hdGlvbnNcbmxldCByb3R4ID0gMzAwLCByb3R5ID0gMzUwLCByb3RhID0gMDtcbmxldCBtb3Rpb24gPSAwO1xuXG4vLyBDcmVhdGUgc29tZSBkeW5hbWljIG9ic3RhY2xlc1xubGV0IHNxX3NtYWxsID0gU3F1YXJlKDY1MCwgMTAwLCAxNTApO1xubGV0IHNxX2xhcmdlID0gVHJpYW5nbGUocm90eCwgcm90eSwgNDAwKTtcblxubGV0IG9ic3RhY2xlcyA9IFtcbiAgU3F1YXJlKDgwLCAxMjAsIDEwMCksIC8vIHN0YXRpY1xuICBzcV9zbWFsbCwgICAgICAgICAgICAgLy8gZHluYW1pY1xuICBzcV9sYXJnZSAgICAgICAgICAgICAgLy8gZHluYW1pY1xuXTtcblxuLy8gQWRkIHRoZW0gYWxsIHRvIHRoZSBzY2VuZVxuZm9yIChsZXQgbyBvZiBvYnN0YWNsZXMpXG4gIHNjZW5lLmFkZCggbyApO1xuXG4vLyBHbyFcbihmdW5jdGlvbiBmcmFtZSgpXG57XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSggZnJhbWUgKTtcblxuICByZW5kZXJlci5jbGVhcigpO1xuXG4gIC8vIEFuaW1hdGlvblxuICBtb3Rpb24gKz0gMC4wNTsgLy8gU2ludXNvaWRhbFxuICB0cmFuc2xhdGUoc3Ffc21hbGwsIDAsIDMgKiBNYXRoLnNpbihtb3Rpb24gKiAwLjI1ICogTWF0aC5QSSkpO1xuICB0cmFuc2xhdGUoW3N0YXJ0XSwgMyAqIE1hdGguc2luKG1vdGlvbiAqIDAuMDUgKiBNYXRoLlBJKSwgMCk7XG4gIHJvdGF0ZShzcV9sYXJnZSwgcm90eCwgcm90eSwgMC4wMDUpO1xuXG4gIC8vIEZpbmQgdGhlIHNob3J0ZXN0IHBhdGguIFR3byB0aGluZ3MgaGFwcGVuIGhlcmU6XG4gIC8vICAgIDEuIEEgU2NlbmUgZ3JhcGggaXMgZXh0cmFjdGVkIGZyb20gb3VyIHNjZW5lIGdlb21ldHJ5XG4gIC8vICAgIDIuIERpamtzdHJhJ3MgbWV0aG9kIGlzIHVzZWQgdG8gZmluZCB0aGUgb3B0aW1hbCByb3V0ZSBhY3Jvc3MgdGhlIGdyYXBoXG4gIGxldCByb3V0ZSA9IHNjZW5lLnNvbHZlKCBzdGFydCwgZW5kICk7XG5cbiAgLy8gR2V0IGEgdmlzdWFsaXNhdGlvbiBvZiB0aGUgYWN0dWFsIHNjZW5lZ3JhcGhcbiAgbGV0IHZpcyA9IHNjZW5lLnZpcygpO1xuXG4gIGxldCBpbnNpZGUgPSBkb2RnZV9udWxsc3BhY2UoKTtcblxuICBpZiAoc2hvd0dyYXBoKS8vICYmIChpbnNpZGU9PS0xKSlcbiAge1xuICAgIC8vIERyYXcgdGhlIHNjZW5lIGdyYXBoIG5vZGVzXG4gICAgZm9yIChsZXQgbiBvZiB2aXMubm9kZXMpXG4gICAgICByZW5kZXJlci5yZW5kZXIoIG4sICcjYmJiJywgNSApO1xuXG4gICAgLy8gRHJhdyB0aGUgZ3JhcGggZWRnZXNcbiAgICByZW5kZXJlci5yZW5kZXIoIHZpcy5lZGdlcywgJyNlZWUnICk7XG4gIH1cblxuICAvLyBSZW5kZXIgdGhlIG9yaWdpbmFsIHNjZW5lIGdlb21ldHJ5IG9uIHRvcCBvZiB0aGUgZ3JhcGhcbiAgaWYgKHNob3dPYnN0YWNsZXMpXG4gIHtcbiAgICByZW5kZXJlci5yZW5kZXIoIHN0YXJ0LCAnIzBhMCcsIDYgKTtcbiAgICByZW5kZXJlci5yZW5kZXIoIGVuZCwgJyMwYTAnLCA2ICk7XG4gICAgcmVuZGVyZXIucmVuZGVyKCBzY2VuZS5vYmplY3RzLCAnIzMzMycgKTtcbiAgfVxuXG5cbiAgLy8gVXNlciBoYXMgbW92ZWQgdGhlIG1vdXNlIGluc2lkZSBhIHNoYXBlIG9ic3RhY2xlIHdoaWNoIGludmFsaWRhdGVzIHRoZSBncmFwaFxuICBpZiAoaW5zaWRlID49IDApXG4gIHtcbiAgICBzaG93X2luZm8oXCJFbmQgcG9pbnQgaW5zaWRlIHNvbGlkIG9iamVjdCFcIilcbiAgICByZW5kZXJlci5yZW5kZXIoIFtzY2VuZS5vYmplY3RzW2luc2lkZV1dLCAnI2YwMCcsIDUgKTtcbiAgfSBlbHNlIHtcblxuICAgIGhpZGVfaW5mbygpO1xuXG4gICAgLy8gTm93IGRpc3BsYXkgdGhlIGZvdW5kIHJvdXRlIVxuICAgIHJlbmRlcmVyLnJlbmRlciggW3JvdXRlXSwgJyMwMGYnLCAzICk7XG5cbiAgfVxuXG5cbn0pKCk7XG5cblxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KS5vbm1vdXNlbW92ZSA9IGUgPT4ge1xuICBtb3VzZSA9IFtlLmNsaWVudFggLSBlLnRhcmdldC5vZmZzZXRMZWZ0LCBlLmNsaWVudFkgLSBlLnRhcmdldC5vZmZzZXRUb3BdO307XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2JfZGVidWcnKS5vbmNsaWNrID0gKGUsIGMpID0+IHsgc2hvd0dyYXBoID0gZS5zcmNFbGVtZW50LmNoZWNrZWQ7IH07XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2JfZGVidWcyJykub25jbGljayA9IChlLCBjKSA9PiB7IHNob3dPYnN0YWNsZXMgPSBlLnNyY0VsZW1lbnQuY2hlY2tlZDsgfTtcblxuXG5mdW5jdGlvbiBzaG93X2luZm8odGV4dCkgeyBpbmZvLmlubmVySFRNTCA9IHRleHQ7IGluZm8uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7IH1cbmZ1bmN0aW9uIGhpZGVfaW5mbygpIHsgaW5mby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9XG5cblxuLy8gVGhpcyBwcmV2ZW50cyBhIGJpdCBvZiBhIG1lc3MgZnJvbSBoYXBwZW5pbmdcbi8vIHdoZW4gdGhlIG1vdXNlIGN1cnNvciBkcmlmdHMgKmluc2lkZSogYSBzdXBwb3NlZGx5IHNvbGlkIHNoYXBlXG5mdW5jdGlvbiBkb2RnZV9udWxsc3BhY2UoKVxue1xuICAvLyBDaGVjayB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiBlYWNoIG9mIG91ciBzb2xpZCBzaGFwZXNcbiAgZm9yIChsZXQgaSBpbiBvYnN0YWNsZXMpXG4gIHtcbiAgICBsZXQgbyA9IG9ic3RhY2xlc1tpPj4wXTtcbiAgICAvLyBPaCBubyFcbiAgICBpZiAocG9pbnRfaW5fcG9seWdvbihtb3VzZSwgbykpICAvLyBzaW1wbGUgY29udmV4LW9ubHkgdGVzdFxuICAgIHtcbiAgICAgIC8vIFNldCB0aGUgZW5kcG9pbnQgdG8gdGhlIHN0YXJ0IHRvIHJlbW92ZSB0aGUgcmVkIGxpbmUgYW5kIGN1cnNvclxuICAgICAgZW5kID0gc3RhcnQ7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgLy8gQWxsIGdvb2QsIHNldCB0aGUgZW5kcG9pbnQgdG8gdGhlIGxhc3Qga25vd24gbW91c2UgcG9zXG4gIGVuZCA9IG1vdXNlO1xuICByZXR1cm4gLTE7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuaW1wb3J0IEdyYXBoICAgICAgICAgIGZyb20gJy4vR3JhcGgnO1xuaW1wb3J0IHtpbnRlcnNlY3RzfSAgIGZyb20gJy4vVXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHRoaXMub2JqZWN0cyA9IFtdO1xuICAgIHRoaXMuZ3JhcGggPSBudWxsO1xuXG4gICAgLy8gVGhpcyBpcyBqdXN0IGZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICB0aGlzLl92aXMgPSBudWxsO1xuICB9XG5cbiAgYWRkKG9iamVjdClcbiAge1xuICAgIHRoaXMub2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gIH1cblxuICBzb2x2ZShzdGFydCwgZW5kKVxuICB7XG4gICAgaWYgKHN0YXJ0ID09IGVuZCkgcmV0dXJuO1xuXG4gICAgdGhpcy5ncmFwaCA9IHRoaXMuX2dyYXBoKHN0YXJ0LCBlbmQpO1xuICAgIGxldCBub2RlcyA9IHRoaXMuZ3JhcGguc2hvcnRlc3QoMCwgMSk7IC8vIFswXSBzdGFydCwgWzFdIGVuZCAoc2VlIC5ncmFwaCgpKVxuXG4gICAgbGV0IHJvdXRlID0gW107XG5cbiAgICBmb3IgKGxldCBuIG9mIG5vZGVzKVxuICAgICAgcm91dGUucHVzaCh0aGlzLl92aXMubm9kZXNbIG4gXSk7XG5cbiAgICByZXR1cm4gcm91dGU7XG4gIH1cblxuICB2aXMoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpcztcbiAgfVxuXG4gIC8vIEV4dHJhY3QgYSBzY2VuZWdyYXBoIGZyb20gb3VyIGNvbnRpbnVvdXMgZXVjbGlkZWFuIGdlb21ldHJ5XG4gIF9ncmFwaChzdGFydCwgZW5kKVxuICB7XG4gICAgbGV0IG5vZGVzID0gW107XG4gICAgbGV0IGVkZ2VzID0gW107XG5cbiAgICBsZXQgZyA9IG5ldyBHcmFwaCgpO1xuXG4gICAgLy8gRm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaFxuICAgIHRoaXMuX3ZpcyA9IHsgbm9kZXM6IFtdLCBlZGdlczogW10gfTtcblxuICAgIC8vIFRoaXMgaXMganVzdCBhIHRlbXAgdmFsdWUgdXNlZCB0byBtYWtlIHN1cmUgc2hhcGVzIGRvbid0IHBlcmZvcm1cbiAgICAvLyBpbnRlcnNlY3Rpb24gdGVzdHMgb24gdGhlbXNlbHZlcyAodGhlaXIgb3duIHZlcnRpY2VzLCBjcm9zc2luZyBpbnRlcm5hbGx5KVxuICAgIGxldCBzaGFwZV9pZCA9IDE7XG5cbiAgICAvLyBUaGVzZSBmaXJzdCB0d28gbm9kZXMgaW4gdGhlIGdyYXBoIGFyZSBhIHNwZWNpYWwgY2FzZVxuICAgIG5vZGVzLnB1c2goIHt2ZXJ0ZXg6IHN0YXJ0LCAgc2hhcGU6IHNoYXBlX2lkKyt9ICk7IC8vIFswXSBzdGFydCAoc2VlIC5zb2x2ZSgpKVxuICAgIG5vZGVzLnB1c2goIHt2ZXJ0ZXg6IGVuZCwgICAgc2hhcGU6IHNoYXBlX2lkKyt9ICk7IC8vIFsxXSBlbmRcblxuICAgIGxldCBnZWRnZXMgPSBbXTtcblxuICAgIC8vIGV4dHJhY3QgZWFjaCBvYnN0YWNsZSdzIGVkZ2VzIGFuZCBub2Rlc1xuICAgIGZvciAobGV0IG8gb2YgdGhpcy5vYmplY3RzKVxuICAgIHtcbiAgICAgIHNoYXBlX2lkKys7XG5cbiAgICAgIGxldCBlO1xuICAgICAgbGV0IGJhc2UgPSBub2Rlcy5sZW5ndGg7XG4gICAgICBmb3IgKGU9MDsgZTxvLmxlbmd0aC0xOyBlKyspXG4gICAgICB7XG5cbiAgICAgICAgbGV0IHYxID0gYmFzZSArIGU7XG4gICAgICAgIC8vIEZmcyBhbGFuIHdoYXQgYSBtZXNzIChuLmIuIGl0IHRvb2sgMzAgbWlucyBvZiBkZWJ1Z2dpbmcgdG8gZ2V0IHRoaXMgbGluZSBiZWxvdyBjb3JyZWN0KVxuICAgICAgICAvLyBpdCB3YXMgb3JpZ2luYWxseSAoYmFzZSArIGUgKyAxKSAlIChvLmxlbmd0aC0xKSkgd2hpY2ggaXMgcXVpdGUgZGlmZmVyZW50LlxuICAgICAgICAvLyBJIHRob3VnaHQgdGhpcyB3YXMgZ29pbmcgdG8gYmUgc3VjaCBhIGRpZmZpY3VsdCBidWcgdG8gZml4LCBJIG5lYXJseSBkaWRuJ3QgYm90aGVyIHRyeWluZy5cbiAgICAgICAgLy8gdGJoLCB0aGVzZSBub2RlL2VkZ2Ugc3RydWN0dXJlcyBuZWVkIGEgc2VyaW91cyByZWZhY3RvcmluZyBpZiBldmVyIHRoaXMgcHJvZ3JhbSBpcyBleHBhbmRlZCEhIVxuICAgICAgICBsZXQgdjIgPSBiYXNlICsgKChlICsgMSkgJSAoby5sZW5ndGgtMSkpO1xuXG4gICAgICAgIGdlZGdlcy5wdXNoKHtcbiAgICAgICAgICBpbmRleDpbdjEsIHYyXSxcbiAgICAgICAgICB2ZXJ0ZXg6IFtvW2VdLCBvW2UrMV1dXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVkZ2VzLnB1c2goW29bZV0sIG9bZSsxXV0pO1xuXG4gICAgICAgIG5vZGVzLnB1c2goe1xuICAgICAgICAgIHZlcnRleDogb1tlXSxcbiAgICAgICAgICBzaGFwZTogc2hhcGVfaWRcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgICAgLy8gdGhpcyBpc24ndCBhIGNsb3NlZCByaW5nIChtYXRjaGluZyBzdGFydCBhbmQgZW5kcClcbiAgICAgIC8vIGkuZS4gYSBzdHJhaWdodCBsaW5lLlxuICAgICAgLy8gTGF0ZXI6IEluIGhpbmRzaWdodCwgSSBzaG91bGRuJ3QgaGF2ZSBib3RoZXJlZCB0cnlpbmcgdG9cbiAgICAgIC8vIHN1cHBvcnQgZXNzZW50aWFsbHkgZGltZW5zaW9ubGVzcyBlbnRpdGllcyBsaWtlIGEgdHdvLXNpZGVkIHN0cmFpZ2h0IGxpbmUgaW4gMmQgc3BhY2UuXG4gICAgICAvLyBldmVyeXRoaW5nIHNob3VsZCBiZSBhIGNsb3NlZCByaW5nLCBldmVuIGlmIGl0J3MgaW5pbml0ZWx5IHNtYWxsLlxuICAgICAgaWYgKCFlcXVhbHMob1swXSwgb1tlXSkpXG4gICAgICAgIG5vZGVzLnB1c2goe1xuICAgICAgICAgIHZlcnRleDogb1tlXSxcbiAgICAgICAgICBzaGFwZTogc2hhcGVfaWRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGBub2Rlc2AgaW5kaWNlcyB0byBncmFwaFxuICAgIGZvciAobGV0IGkgaW4gbm9kZXMpXG4gICAge1xuICAgICAgZy5hZGR2ZXJ0ZXgoTnVtYmVyKGkpKTtcblxuICAgICAgLy8gRm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaFxuICAgICAgdGhpcy5fdmlzLm5vZGVzLnB1c2gobm9kZXNbTnVtYmVyKGkpXS52ZXJ0ZXgpO1xuICAgIH1cblxuICAgIC8vVE9ETzogcmVmYWN0b3IgdGhlIG5vZGUvZWRnZSBkYXRhIHN0cnVjdCBtZXNzXG4gICAgZm9yIChsZXQgZ2Ugb2YgZ2VkZ2VzKVxuICAgIHtcbiAgICAgIGcuYWRkZWRnZShnZS5pbmRleFswXSwgZ2UuaW5kZXhbMV0sIGNvc3QoZ2UudmVydGV4WzBdLCBnZS52ZXJ0ZXhbMV0pKTtcbiAgICAgIHRoaXMuX3Zpcy5lZGdlcy5wdXNoKFtnZS52ZXJ0ZXhbMF0sIGdlLnZlcnRleFsxXV0pO1xuICAgIH1cblxuICAgIGxldCBuZT0wO1xuXG4gICAgZm9yIChsZXQgeD0wOyB4PG5vZGVzLmxlbmd0aC0xOyB4KyspXG4gICAgICBmb3IgKGxldCB5PXgrMTsgeTxub2Rlcy5sZW5ndGg7IHkrKylcbiAgICAgIHtcbiAgICAgICAgICBsZXQgQSA9IG5vZGVzW3hdO1xuICAgICAgICAgIGxldCBCID0gbm9kZXNbeV07XG5cbiAgICAgICAgICAvLyBXZSdyZSB0ZXN0aW5nIHRoZSBzaGFwZSdzIHZlcnRpY2VzIGFnYWluc3QgaXRzZWxmXG4gICAgICAgICAgLy8gd2hpY2ggbGVhZHMgdG8gaW50ZXJuYWwgcGF0aHMgaW5zaWRlIHRoZSBzaGFwZSAoaW52YWxpZCEpXG4gICAgICAgICAgaWYgKEEuc2hhcGUgPT0gQi5zaGFwZSkgY29udGludWU7XG5cbiAgICAgICAgICBsZXQgdGVzdGVkZ2UgPSBbQS52ZXJ0ZXgsIEIudmVydGV4XTtcblxuICAgICAgICAgIGlmIChlZGdldmlzaWJpbHR5KHRlc3RlZGdlLCBlZGdlcykpXG4gICAgICAgICAge1xuICAgICAgICAgICAgZy5hZGRlZGdlKHgsIHksIGNvc3QoQS52ZXJ0ZXgsIEIudmVydGV4KSk7XG5cbiAgICAgICAgICAgIC8vIEp1c3QgZm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaCwgbm9uLWVzc2VudGlhbDpcbiAgICAgICAgICAgIHRoaXMuX3Zpcy5lZGdlcy5wdXNoKFtBLnZlcnRleCwgQi52ZXJ0ZXhdKTtcbiAgICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIHJldHVybiBnO1xuICB9XG5cbn1cblxuXG5cbmZ1bmN0aW9uIGNvc3QoYSwgYilcbntcbiAgbGV0IGR4ID0gYlswXSAtIGFbMF0gLy8geDIgLSB4MVxuICBsZXQgZHkgPSBiWzFdIC0gYVsxXTtcbiAgcmV0dXJuIE1hdGguc3FydCggZHgqZHggKyBkeSpkeSApO1xuXG59XG5cbmZ1bmN0aW9uIGVkZ2V2aXNpYmlsdHkodGVzdGVkZ2UsIGVkZ2VzKVxue1xuICAvLyBjb25zb2xlLmxvZyhgVGVzdGluZyBlZGdlOiAke3Rlc3RlZGdlWzBdfSwgJHt0ZXN0ZWRnZVsxXX1gKTtcblxuICBmb3IgKGxldCB0PTA7IHQ8ZWRnZXMubGVuZ3RoOyB0KyspXG4gIHtcbiAgICBsZXQgZSA9IGVkZ2VzW3RdO1xuXG4gICAgbGV0IHJlcyA9IGludGVyc2VjdHModGVzdGVkZ2VbMF0sIHRlc3RlZGdlWzFdLCBlWzBdLCBlWzFdKTtcblxuICAgIC8vIElmIGludGVyc2VjdGlvbiwgY2hlY2sgaXQncyBub3QganVzdCB0aGUgZW5kcG9pbnRzIGtpc3Npbmcgd2hpY2ggaXMgb2tcbiAgICAvLyBpbiBmYWN0LCBpdCdzIG1vcmUgdGhhbiAnb2snIC0gaXQncyBleGFjdGx5IHdoYXQgd2UncmUgbG9va2luZyBmb3JcbiAgICBpZiAocmVzLmludGVyc2VjdCAmJiAhcmVzLmtpc3MpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5cbmZ1bmN0aW9uIGVxdWFscyhhLCBiKVxue1xuICByZXR1cm4gKGFbMF0gPT0gYlswXSAmJiBhWzFdID09IGJbMV0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1NjZW5lLmpzIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICB0aGlzLnZlcnRpY2VzID0gW107XG4gICAgdGhpcy5lZGdlcyA9IFtdO1xuICAgIHRoaXMubnVtZWRnZXMgPSAwO1xuICB9XG5cbiAgYWRkdmVydGV4KG4pXG4gIHtcbiAgICB0aGlzLnZlcnRpY2VzLnB1c2gobik7XG4gICAgdGhpcy5lZGdlc1tuXSA9IFtdO1xuICB9XG5cbiAgLy8gYWRqYWNlbnkgZWRnZSBsaXN0XG4gIGFkZGVkZ2UodjEsIHYyLCBjb3N0KVxuICB7XG4gICAgdGhpcy5lZGdlc1t2MV0ucHVzaCh7ZGVzdDp2MiwgY29zdH0pO1xuICAgIHRoaXMuZWRnZXNbdjJdLnB1c2goe2Rlc3Q6djEsIGNvc3R9KTtcblxuICAgIHRoaXMubnVtZWRnZXMrKztcbiAgfVxuXG4gIC8vIFN1cGVyIGJhc2ljIGltcGxlbWVudGF0aW9uIG9mIERpamtzdHJhJ3MgYWxnb3JpdGhtXG4gIC8vIERpcmVjdGx5IGZyb20gdGhpcyByZWNpcGU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0RpamtzdHJhJTI3c19hbGdvcml0aG0jQWxnb3JpdGhtXG4gIHNob3J0ZXN0KHN0YXJ0LCBlbmQpXG4gIHtcbiAgICBsZXQgY3VycmVudF9ub2RlO1xuICAgIGxldCBkaXN0ID0gWzBdO1xuICAgIGxldCBwcmV2ID0gW107XG4gICAgbGV0IHVudmlzaXRlZCA9IFtdO1xuXG4gICAgZm9yIChsZXQgaT0wOyBpPHRoaXMudmVydGljZXMubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgaWYgKGkpIGRpc3RbaV0gPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgdW52aXNpdGVkW2ldID0gaTtcbiAgICAgIHByZXZbaV0gPSBudWxsO1xuICAgIH1cblxuICAgIC8vICdWaXNpdCcgZWFjaCBub2RlIG9ubHkgb25jZSwgaW4gdHVyblxuICAgIHdoaWxlKCAoY3VycmVudF9ub2RlID0gdW52aXNpdGVkLnNoaWZ0KCkpICE9IG51bGwgKVxuICAgIHtcbiAgICAgIC8vIEZvciBlYWNoIG5vZGUsICdjaGVjaycgaXRzIG5laWdoYm91cnMuXG4gICAgICAvLyBXaGlsZSB3ZSBvbmx5ICd2aXNpdCcgZWFjaCBub2RlIG9uY2UsIGl0J3MgdGhpcyByZXBlYXRlZCAnY2hlY2snaW5nXG4gICAgICAvLyAoYW5kIG9jY2FzaW9uYWwgcmVjYWxjdWxhdGluZykgb2YgbmVpZ2hib3VycyB0aGF0IGFsbG93cyB1cyB0byBmaW5kXG4gICAgICAvLyB0aGUgc2hvcnRlc3Qgcm91dGUgdGhyb3VnaCB0aGUgZ3JhcGggZnJvbSBvdXIgc3RhcnQgcG9pbnQuXG4gICAgICAvLyBJbiBmYWN0LCB0aGUgaW5oZXJlbnQgcmVzdWx0IG9mIHRoZSBhbGdvIGlzIHRoYXQgd2UgZmluZCB0aGUgc2hvcnRlc3RcbiAgICAgIC8vIHBhdGggdG8gKmV2ZXJ5KiBwb2ludCBpbiB0aGUgZ3JhcGhcbiAgICAgIGZvciAobGV0IHQ9MDsgdDx0aGlzLmVkZ2VzW2N1cnJlbnRfbm9kZV0ubGVuZ3RoOyB0KyspXG4gICAgICB7XG4gICAgICAgIC8vIHZlcnRleC9ub2RlIElEXG4gICAgICAgIGxldCBuZWlnaGJvdXIgPSB0aGlzLmVkZ2VzW2N1cnJlbnRfbm9kZV1bdF0uZGVzdDtcblxuICAgICAgICAvLyBEaXN0YW5jZSBmcm9tIGN1cnJlbnRfbm9kZSB0byBuZWlnaGJvdXJcbiAgICAgICAgbGV0IGNvc3QgPSB0aGlzLmVkZ2VzW2N1cnJlbnRfbm9kZV1bdF0uY29zdDtcblxuICAgICAgICAvLyBEaXN0YW5jZSB0aHVzIGZhciBvbiB0aGlzIHJvdXRlICh1cCB0byBjdXJyZW50X25vZGUpICsgZGlzdGFuY2UgdG8gbmVpZ2hib3VyXG4gICAgICAgIGxldCB0ZW50YXRpdmVfZGlzdCA9IGRpc3RbY3VycmVudF9ub2RlXSArIGNvc3Q7XG5cbiAgICAgICAgLy8gSGF2ZSB3ZSBmb3VuZCBhIHNob3J0ZXIgcGF0aD9cbiAgICAgICAgaWYgKHRlbnRhdGl2ZV9kaXN0IDwgZGlzdFtuZWlnaGJvdXJdKVxuICAgICAgICB7XG4gICAgICAgICAgZGlzdFtuZWlnaGJvdXJdID0gdGVudGF0aXZlX2Rpc3Q7IC8vIE5ldyBkaXN0YW5jZSB0byB0aGlzIG5vZGVcbiAgICAgICAgICBwcmV2W25laWdoYm91cl0gPSBjdXJyZW50X25vZGU7ICAgLy8gVXBkYXRlIHRoZSByb3V0ZVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYyA9IGVuZCwgc2VxID1bZW5kXTtcblxuICAgIC8vIGZhaWxlZCBmb3Igc29tZSByZWFzb24sIGUuZy4gaW1wb3NzaWJsZSBwb2ludCBpbnNpZGUgbnVsbHNwYWNlIGV0Y1xuICAgIGlmIChwcmV2W2NdID09IG51bGwpXG4gICAgICByZXR1cm4gW107XG5cbiAgICBkbyB7XG4gICAgICBjID0gcHJldltjXTtcbiAgICAgIHNlcS5wdXNoKGMpO1xuICAgIH0gd2hpbGUoYyAhPSBzdGFydCk7XG5cbiAgICByZXR1cm4gc2VxLnJldmVyc2UoKTtcblxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9HcmFwaC5qcyIsIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlclxue1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KVxuICB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCk7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gIH1cblxuICBjbGVhcigpXG4gIHtcbiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gIH1cblxuICByZW5kZXIob2JqZWN0cywgY29sb3VyID0gJyMwMDAnLCB3aWR0aCA9IDIpXG4gIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob2JqZWN0cykpIHJldHVybjtcblxuICAgIC8vIHBvaW50IHR5cGVcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob2JqZWN0c1swXSkpXG4gICAge1xuICAgICAgY29uc3QgcCA9IG9iamVjdHM7XG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQuYXJjKHBbMF0+PjAsIHBbMV0+PjAsIHdpZHRoLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG91cjtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAvLyBsaXN0IG9mIHNoYXBlcyB0eXBlXG5cbiAgICAgIGZvciAobGV0IG8gb2Ygb2JqZWN0cylcbiAgICAgIHtcbiAgICAgICAgZm9yIChsZXQgZT0wOyBlPG8ubGVuZ3RoLTE7IGUrKylcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuX2xpbmUob1tlXSwgb1tlKzFdLCBjb2xvdXIsIHdpZHRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICBfbGluZShhLCBiLCBjLCB3KVxuICB7XG4gICAgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9IHc7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gYyB8fCAnYmxhY2snO1xuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQubW92ZVRvKGFbMF0+PjAsYVsxXT4+MCk7XG4gICAgdGhpcy5jb250ZXh0LmxpbmVUbyhiWzBdPj4wLGJbMV0+PjApO1xuICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyZXIuanMiXSwic291cmNlUm9vdCI6IiJ9