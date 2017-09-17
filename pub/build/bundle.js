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
  mouse = [e.clientX - e.target.offsetLeft + window.scrollX, e.clientY - e.target.offsetTop + window.scrollY];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGRiMWZiMDBmNzJjOWU2OTI4MWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJUcmlhbmdsZSIsImFuZ2xlIiwiciIsIk1hdGgiLCJzaW4iLCJQSSIsInRyaSIsImkiLCJjb3MiLCJyb3RhdGUiLCJzaGFwZSIsInJ4IiwicnkiLCJkYSIsInBhaXIiLCJyb3RhdGVfcG9pbnQiLCJ0cmFuc2xhdGUiLCJkeCIsImR5IiwiY3giLCJjeSIsInAiLCJzIiwiYyIsInhuZXciLCJ5bmV3IiwicG9pbnRfaW5fcG9seWdvbiIsInBvaW50IiwidmVydGljZXMiLCJsZW5ndGgiLCJhIiwiYiIsInNlZyIsInN1YnRyYWN0UG9pbnRzIiwicHQiLCJpbnNpZGUiLCJjcm9zc1Byb2R1Y3QiLCJpbnRlcnNlY3RzIiwiYXAiLCJhcDIiLCJhcSIsImFxMiIsImRvTGluZVNlZ21lbnRzSW50ZXJzZWN0IiwiaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsiLCJwMiIsInEiLCJxMiIsImJveDEiLCJ4bWluIiwibWluIiwieW1pbiIsInhtYXgiLCJtYXgiLCJ5bWF4IiwiYm94MiIsImJib3hfY29udGFpbmVkIiwidU51bWVyYXRvciIsImRlbm9taW5hdG9yIiwiZXF1YWxQb2ludHMiLCJpbnRlcnNlY3QiLCJraXNzIiwiYWxsRXF1YWwiLCJ1IiwidCIsInBvaW50MSIsInBvaW50MiIsIkFycmF5IiwiaXNBcnJheSIsInJlc3VsdCIsImFyZ3MiLCJmaXJzdFZhbHVlIiwiYXJndW1lbnRzIiwiZWxlbWVudCIsInJlbmRlcmVyIiwic2NlbmUiLCJpbmZvIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNob3dHcmFwaCIsInNob3dPYnN0YWNsZXMiLCJzdGFydCIsImVuZCIsIm1vdXNlIiwic2xpY2UiLCJyb3R4Iiwicm90eSIsInJvdGEiLCJtb3Rpb24iLCJzcV9zbWFsbCIsInNxX2xhcmdlIiwib2JzdGFjbGVzIiwibyIsImFkZCIsImZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2xlYXIiLCJyb3V0ZSIsInNvbHZlIiwidmlzIiwiZG9kZ2VfbnVsbHNwYWNlIiwibm9kZXMiLCJuIiwicmVuZGVyIiwiZWRnZXMiLCJvYmplY3RzIiwic2hvd19pbmZvIiwiaGlkZV9pbmZvIiwib25tb3VzZW1vdmUiLCJlIiwiY2xpZW50WCIsInRhcmdldCIsIm9mZnNldExlZnQiLCJ3aW5kb3ciLCJzY3JvbGxYIiwiY2xpZW50WSIsIm9mZnNldFRvcCIsInNjcm9sbFkiLCJvbmNsaWNrIiwic3JjRWxlbWVudCIsImNoZWNrZWQiLCJ0ZXh0IiwiaW5uZXJIVE1MIiwic3R5bGUiLCJkaXNwbGF5IiwiU2NlbmUiLCJncmFwaCIsIl92aXMiLCJvYmplY3QiLCJfZ3JhcGgiLCJzaG9ydGVzdCIsImciLCJzaGFwZV9pZCIsInZlcnRleCIsImdlZGdlcyIsImJhc2UiLCJ2MSIsInYyIiwiaW5kZXgiLCJlcXVhbHMiLCJhZGR2ZXJ0ZXgiLCJOdW1iZXIiLCJnZSIsImFkZGVkZ2UiLCJjb3N0IiwibmUiLCJBIiwiQiIsInRlc3RlZGdlIiwiZWRnZXZpc2liaWx0eSIsInNxcnQiLCJyZXMiLCJHcmFwaCIsIm51bWVkZ2VzIiwiZGVzdCIsImN1cnJlbnRfbm9kZSIsImRpc3QiLCJwcmV2IiwidW52aXNpdGVkIiwiTUFYX1ZBTFVFIiwic2hpZnQiLCJuZWlnaGJvdXIiLCJ0ZW50YXRpdmVfZGlzdCIsInNlcSIsInJldmVyc2UiLCJSZW5kZXJlciIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJjb2xvdXIiLCJiZWdpblBhdGgiLCJhcmMiLCJmaWxsU3R5bGUiLCJmaWxsIiwiX2xpbmUiLCJ3IiwibGluZVdpZHRoIiwic3Ryb2tlU3R5bGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0RBLFNBQVNBLE1BQVQsQ0FBZ0JDLENBQWhCLEVBQW1CQyxDQUFuQixFQUFzQkMsSUFBdEIsRUFDQTtBQUNFLE1BQUlDLFFBQVFELFFBQU0sQ0FBbEI7QUFDQSxNQUFJRSxLQUFLLEVBQVQ7QUFDQTtBQUNBO0FBQ0FBLEtBQUdDLElBQUgsQ0FBUyxDQUFDTCxJQUFJRyxLQUFMLEVBQVlGLElBQUlFLEtBQWhCLENBQVQ7QUFDQTtBQUNBQyxLQUFHQyxJQUFILENBQVMsQ0FBQ0wsSUFBSUcsS0FBTCxFQUFZRixJQUFJRSxLQUFoQixDQUFUO0FBQ0E7QUFDQUMsS0FBR0MsSUFBSCxDQUFTLENBQUNMLElBQUlHLEtBQUwsRUFBWUYsSUFBSUUsS0FBaEIsQ0FBVDtBQUNBO0FBQ0FDLEtBQUdDLElBQUgsQ0FBUyxDQUFDTCxJQUFJRyxLQUFMLEVBQVlGLElBQUlFLEtBQWhCLENBQVQ7QUFDQTtBQUNBQyxLQUFHQyxJQUFILENBQVMsQ0FBQ0wsSUFBSUcsS0FBTCxFQUFZ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OiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0ZGIxZmIwMGY3MmM5ZTY5MjgxZSIsIlxuXG5mdW5jdGlvbiBTcXVhcmUoeCwgeSwgc2l6ZSlcbntcbiAgbGV0IGhzaXplID0gc2l6ZT4+MTtcbiAgbGV0IHNxID0gW107XG4gIC8vIG9yIGp1c3QgbWFrZSBhIHVuaXQgc3F1YXJlIGFuZCBzY2FsZSBpdCB1cCBkdWggOnxcbiAgLy8gdG9wIGxlZnRcbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSAtIGhzaXplXSApO1xuICAvLyB0b3AgcmlnaHRcbiAgc3EucHVzaCggW3ggKyBoc2l6ZSwgeSAtIGhzaXplXSApO1xuICAvLyBib3R0b20gcmlnaHRcbiAgc3EucHVzaCggW3ggKyBoc2l6ZSwgeSArIGhzaXplXSApO1xuICAvLyBib3R0b20gbGVmdFxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5ICsgaHNpemVdICk7XG4gIC8vIHRvcCBsZWZ0IGFnYWluXG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgLSBoc2l6ZV0gKTtcblxuICByZXR1cm4gc3E7XG59XG5cbi8vIGVxdWlsYXRlcmFsXG5mdW5jdGlvbiBUcmlhbmdsZSh4LCB5LCBzaXplKVxue1xuICBsZXQgYW5nbGUgPSAwO1xuICBsZXQgciA9IChzaXplLzIuMCkvTWF0aC5zaW4oTWF0aC5QSSo2MC8xODApO1xuICBsZXQgdHJpID0gW107XG5cbiAgZm9yKGxldCBpPTA7IGk8PTM7IGkrKylcbiAge1xuICAgIHRyaS5wdXNoKFtcbiAgICAgIHggKyByICogTWF0aC5jb3MoYW5nbGUgKyAoaSAlIDMpICogMiAqIE1hdGguUEkvMyksXG4gICAgICB5ICsgciAqIE1hdGguc2luKGFuZ2xlICsgKGkgJSAzKSAqIDIgKiBNYXRoLlBJLzMpXG4gICAgXSk7XG4gIH1cblxuICByZXR1cm4gdHJpO1xufVxuXG5mdW5jdGlvbiByb3RhdGUoc2hhcGUsIHJ4LCByeSwgZGEpXG57XG4gIGZvciAobGV0IHBhaXIgb2Ygc2hhcGUpXG4gICAgcGFpciA9IHJvdGF0ZV9wb2ludChyeCwgcnksIGRhLCBwYWlyKTtcbn1cblxuZnVuY3Rpb24gdHJhbnNsYXRlKHNoYXBlLCBkeCwgZHkpXG57XG4gIGZvciAobGV0IHBhaXIgb2Ygc2hhcGUpXG4gIHtcbiAgICBwYWlyWzBdICs9IGR4O1xuICAgIHBhaXJbMV0gKz0gZHk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm90YXRlX3BvaW50KGN4LCBjeSwgYW5nbGUsIHApXG57XG4gIGxldCBzID0gTWF0aC5zaW4oYW5nbGUpO1xuICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlKTtcblxuICAvLyB0cmFuc2xhdGUgcG9pbnQgYmFjayB0byBvcmlnaW46XG4gIHBbMF0gLT0gY3g7XG4gIHBbMV0gLT0gY3k7XG5cbiAgLy8gcm90YXRlIHBvaW50XG4gIGxldCB4bmV3ID0gcFswXSAqIGMgLSBwWzFdICogcztcbiAgbGV0IHluZXcgPSBwWzBdICogcyArIHBbMV0gKiBjO1xuXG4gIC8vIHRyYW5zbGF0ZSBwb2ludCBiYWNrOlxuICBwWzBdID0geG5ldyArIGN4O1xuICBwWzFdID0geW5ldyArIGN5O1xuXG4gIHJldHVybiBwO1xufVxuXG5cbmZ1bmN0aW9uIHBvaW50X2luX3BvbHlnb24ocG9pbnQsIHZlcnRpY2VzKVxue1xuICBmb3IgKGxldCBpPTA7IGk8dmVydGljZXMubGVuZ3RoLTE7IGkrKylcbiAge1xuICAgIGxldCBhID0gdmVydGljZXNbaV07XG4gICAgbGV0IGIgPSB2ZXJ0aWNlc1tpKzFdO1xuXG4gICAgbGV0IHNlZyA9IHN1YnRyYWN0UG9pbnRzKGIsIGEpO1xuICAgIGxldCBwdCA9IHN1YnRyYWN0UG9pbnRzKHBvaW50LCBhKTtcbiAgICBsZXQgaW5zaWRlID0gKGNyb3NzUHJvZHVjdChzZWcsIHB0KSA+IDApO1xuICAgIC8vIGNvbnNvbGUubG9nKGluc2lkZSk7XG4gICAgaWYgKCFpbnNpZGUpIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5cbi8qKlxuICogQGF1dGhvciBQZXRlciBLZWxsZXlcbiAqIEBhdXRob3IgcGdrZWxsZXk0QGdtYWlsLmNvbVxuICovXG4vKipcbiAqIFNlZSBpZiB0d28gbGluZSBzZWdtZW50cyBpbnRlcnNlY3QuIFRoaXMgdXNlcyB0aGVcbiAqIHZlY3RvciBjcm9zcyBwcm9kdWN0IGFwcHJvYWNoIGRlc2NyaWJlZCBiZWxvdzpcbiAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzU2NTI4Mi83ODYzMzlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcCBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBzdGFydCBvZiB0aGUgMXN0IGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgZW5kIG9mIHRoZSAxc3QgbGluZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIHN0YXJ0IG9mIHRoZSAybmQgbGluZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBxMiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBlbmQgb2YgdGhlIDJuZCBsaW5lLlxuICovXG5cbmZ1bmN0aW9uIGludGVyc2VjdHMoYXAsIGFwMiwgYXEsIGFxMilcbntcbiAgLy8gQU06IE5vdGUgdG8gZGV2ZWxvcGVycywgcGxlYXNlIGRvbid0IHVzZSBuYW1lZCBwcm9wZXJ0aWVzIGZvciB2ZWN0b3JzXG4gIC8vICAgICBJdCdzIGRhZnQuIFVzZSBhcnJheXMuXG4gIHJldHVybiBkb0xpbmVTZWdtZW50c0ludGVyc2VjdCgge3g6IGFwWzBdLCB5OiBhcFsxXX0sIHt4OiBhcDJbMF0sIHk6IGFwMlsxXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3g6IGFxWzBdLCB5OiBhcVsxXX0sIHt4OiBhcTJbMF0sIHk6IGFxMlsxXX0gKTtcbn1cblxuZnVuY3Rpb24gaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsocCwgcDIsIHEsIHEyKVxue1xuICB2YXIgYm94MSA9IHtcbiAgICB4bWluOiBNYXRoLm1pbihwLngsIHAyLngpLFxuICAgIHltaW46IE1hdGgubWluKHAueSwgcDIueSksXG4gICAgeG1heDogTWF0aC5tYXgocC54LCBwMi54KSxcbiAgICB5bWF4OiBNYXRoLm1heChwLnksIHAyLnkpXG4gIH07XG5cbiAgdmFyIGJveDIgPSB7XG4gICAgeG1pbjogTWF0aC5taW4ocS54LCBxMi54KSxcbiAgICB5bWluOiBNYXRoLm1pbihxLnksIHEyLnkpLFxuICAgIHhtYXg6IE1hdGgubWF4KHEueCwgcTIueCksXG4gICAgeW1heDogTWF0aC5tYXgocS55LCBxMi55KVxuICB9O1xuXG4gIHJldHVybiBiYm94X2NvbnRhaW5lZChib3gxLCBib3gyKSB8fCBiYm94X2NvbnRhaW5lZChib3gyLCBib3gxKTtcbn1cblxuZnVuY3Rpb24gYmJveF9jb250YWluZWQoYSwgYilcbntcbiAgLy8gSXMgQm94IEIgY29tcGxldGVseSBpbnNpZGUgYm94IEEgP1xuICByZXR1cm4gKGIueG1pbiA+PSBhLnhtaW4gJiYgYi54bWF4IDw9IGEueG1heCkgJiYgKGIueW1pbiA+PSBhLnltaW4gJiYgYi55bWF4IDw9IGEueW1heCk7XG59XG5cblxuZnVuY3Rpb24gZG9MaW5lU2VnbWVudHNJbnRlcnNlY3QocCwgcDIsIHEsIHEyKVxue1xuICAvLyB2YXIgZGVidWdfc3RyaW5nID0gYGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0OiAoJHtwLnh9LCAke3AueX0pLSgke3AyLnh9LCAke3AyLnl9KSAgd2l0aCAgKCR7cS54fSwgJHtxLnl9KS0oJHtxMi54fSwgJHtxMi55fSlgO1xuXG5cdHZhciByID0gc3VidHJhY3RQb2ludHMocDIsIHApO1xuXHR2YXIgcyA9IHN1YnRyYWN0UG9pbnRzKHEyLCBxKTtcblxuXHR2YXIgdU51bWVyYXRvciA9IGNyb3NzUHJvZHVjdChzdWJ0cmFjdFBvaW50cyhxLCBwKSwgcik7XG5cdHZhciBkZW5vbWluYXRvciA9IGNyb3NzUHJvZHVjdChyLCBzKTtcblxuXHRpZiAodU51bWVyYXRvciA9PSAwICYmIGRlbm9taW5hdG9yID09IDApIHtcblx0XHQvLyBUaGV5IGFyZSBjb0xsaW5lYXJcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiQ29wbGFuYXJcIik7XG5cblx0XHQvLyBEbyB0aGV5IHRvdWNoPyAoQXJlIGFueSBvZiB0aGUgcG9pbnRzIGVxdWFsPylcblx0XHRpZiAoZXF1YWxQb2ludHMocCwgcSkgfHwgZXF1YWxQb2ludHMocCwgcTIpIHx8IGVxdWFsUG9pbnRzKHAyLCBxKSB8fCBlcXVhbFBvaW50cyhwMiwgcTIpKSB7XG5cdFx0XHRyZXR1cm4ge1xuICAgICAgICBpbnRlcnNlY3Q6IHRydWUsXG4gICAgICAgIGtpc3M6ICFpc19vbmVfYmJveF9jb250YWluZWRfYnlfdGhlX290aGVyX3F1ZXN0aW9ubWFyayhwLCBwMiwgcSwgcTIpXG4gICAgICB9O1xuXG5cdFx0fVxuXHRcdC8vIERvIHRoZXkgb3ZlcmxhcD8gKEFyZSBhbGwgdGhlIHBvaW50IGRpZmZlcmVuY2VzIGluIGVpdGhlciBkaXJlY3Rpb24gdGhlIHNhbWUgc2lnbilcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiUG9pbnRzIERPTlQgdG91Y2hcIik7XG5cblx0XHRyZXR1cm4ge1xuICAgICAgaW50ZXJzZWN0OlxuICAgICAgICAgICAgIWFsbEVxdWFsKFxuICAgICAgXHRcdFx0XHQocS54IC0gcC54IDwgMCksXG4gICAgICBcdFx0XHRcdChxLnggLSBwMi54IDwgMCksXG4gICAgICBcdFx0XHRcdChxMi54IC0gcC54IDwgMCksXG4gICAgICBcdFx0XHRcdChxMi54IC0gcDIueCA8IDApKSB8fFxuICAgICAgXHRcdFx0IWFsbEVxdWFsKFxuICAgICAgXHRcdFx0XHQocS55IC0gcC55IDwgMCksXG4gICAgICBcdFx0XHRcdChxLnkgLSBwMi55IDwgMCksXG4gICAgICBcdFx0XHRcdChxMi55IC0gcC55IDwgMCksXG4gICAgICBcdFx0XHRcdChxMi55IC0gcDIueSA8IDApKSxcbiAgICAgICAga2lzczogZmFsc2VcbiAgICAgIH07XG5cblx0fVxuXG5cdGlmIChkZW5vbWluYXRvciA9PSAwKSB7XG5cdFx0Ly8gbGluZXMgYXJlIHBhcmFsZWxsXG5cdFx0cmV0dXJuIHtpbnRlcnNlY3Q6IGZhbHNlLCBraXNzOiBmYWxzZX07XG5cdH1cblxuXHR2YXIgdSA9IHVOdW1lcmF0b3IgLyBkZW5vbWluYXRvcjtcblx0dmFyIHQgPSBjcm9zc1Byb2R1Y3Qoc3VidHJhY3RQb2ludHMocSwgcCksIHMpIC8gZGVub21pbmF0b3I7XG5cbiAgLy8gY29uc29sZS5sb2coYHQ9JHt0fSwgdT0ke3V9YCk7XG4gIHZhciBraXNzID0gZmFsc2U7XG5cbiAgaWYgKGVxdWFsUG9pbnRzKHAsIHEpIHx8IGVxdWFsUG9pbnRzKHAsIHEyKSB8fCBlcXVhbFBvaW50cyhwMiwgcSkgfHwgZXF1YWxQb2ludHMocDIsIHEyKSlcbiAgICBraXNzID0gdHJ1ZTtcblxuICAvLyBsZXQgcmVzID1cbiAgLy9yZXR1cm5cbiAgcmV0dXJuIHtcbiAgICBpbnRlcnNlY3Q6ICh0ID49IDApICYmICh0IDw9IDEpICYmICh1ID49IDApICYmICh1IDw9IDEpLFxuICAgIGtpc3M6IGtpc3NcbiAgfTtcblxuICAvLyBjb25zb2xlLmxvZyhgJHtkZWJ1Z19zdHJpbmd9ID0gJHtyZXN9YCk7XG5cblx0Ly8gcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGUgdGhlIGNyb3NzIHByb2R1Y3Qgb2YgdGhlIHR3byBwb2ludHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIHRoZSBjcm9zcyBwcm9kdWN0IHJlc3VsdCBhcyBhIGZsb2F0XG4gKi9cbmZ1bmN0aW9uIGNyb3NzUHJvZHVjdChwb2ludDEsIHBvaW50Mikge1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHBvaW50MSkpXG4gICAgcmV0dXJuIHBvaW50MVswXSAqIHBvaW50MlsxXSAtIHBvaW50MVsxXSAqIHBvaW50MlswXTtcbiAgZWxzZVxuXHQgICByZXR1cm4gcG9pbnQxLnggKiBwb2ludDIueSAtIHBvaW50MS55ICogcG9pbnQyLng7XG59XG5cbi8qKlxuICogU3VidHJhY3QgdGhlIHNlY29uZCBwb2ludCBmcm9tIHRoZSBmaXJzdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICpcbiAqIEByZXR1cm4gdGhlIHN1YnRyYWN0aW9uIHJlc3VsdCBhcyBhIHBvaW50IG9iamVjdFxuICovXG5mdW5jdGlvbiBzdWJ0cmFjdFBvaW50cyhwb2ludDEsIHBvaW50Mikge1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHBvaW50MSkpXG4gIHtcbiAgICByZXR1cm4gWyBwb2ludDFbMF0gLSBwb2ludDJbMF0sIHBvaW50MVsxXSAtIHBvaW50MlsxXSBdO1xuICB9IGVsc2Uge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQueCA9IHBvaW50MS54IC0gcG9pbnQyLng7XG4gICAgcmVzdWx0LnkgPSBwb2ludDEueSAtIHBvaW50Mi55O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuXG4vKipcbiAqIFNlZSBpZiB0aGUgcG9pbnRzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICpcbiAqIEByZXR1cm4gaWYgdGhlIHBvaW50cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gZXF1YWxQb2ludHMocG9pbnQxLCBwb2ludDIpIHtcblx0cmV0dXJuIChwb2ludDEueCA9PSBwb2ludDIueCkgJiYgKHBvaW50MS55ID09IHBvaW50Mi55KVxufVxuXG4vKipcbiAqIFNlZSBpZiBhbGwgYXJndW1lbnRzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0gey4uLn0gYXJncyBhcmd1bWVudHMgdGhhdCB3aWxsIGJlIGNvbXBhcmVkIGJ5ICc9PScuXG4gKlxuICogQHJldHVybiBpZiBhbGwgYXJndW1lbnRzIGFyZSBlcXVhbFxuICovXG5mdW5jdGlvbiBhbGxFcXVhbChhcmdzKSB7XG5cdHZhciBmaXJzdFZhbHVlID0gYXJndW1lbnRzWzBdLFxuXHRcdGk7XG5cdGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRpZiAoYXJndW1lbnRzW2ldICE9IGZpcnN0VmFsdWUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5cblxuXG5leHBvcnQge1NxdWFyZSwgVHJpYW5nbGUsIGludGVyc2VjdHMsIHJvdGF0ZSwgdHJhbnNsYXRlLCBwb2ludF9pbl9wb2x5Z29ufSA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvVXRpbC5qcyIsIlxuaW1wb3J0IFNjZW5lICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vU2NlbmUnO1xuaW1wb3J0IFJlbmRlcmVyICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IHtTcXVhcmUsIHJvdGF0ZSwgdHJhbnNsYXRlfSAgICAgIGZyb20gJy4vVXRpbCc7XG5pbXBvcnQge3BvaW50X2luX3BvbHlnb24sIFRyaWFuZ2xlfSAgICAgZnJvbSAnLi9VdGlsJztcblxuY29uc3QgZWxlbWVudCA9ICdkaXNwbGF5JztcblxubGV0IHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKGVsZW1lbnQpO1xubGV0IHNjZW5lID0gbmV3IFNjZW5lKCk7XG5sZXQgaW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmZvVGV4dCcpO1xuXG4vLyBTaG93L2hpZGUgdGhlIHNjZW5lIGdyYXBoXG5sZXQgc2hvd0dyYXBoID0gdHJ1ZSwgc2hvd09ic3RhY2xlcyA9IHRydWU7XG5cbi8vIFN0YXJ0IHBvaW50LCBnb2FsIGFuZCBsYXN0a25vd24gbW91c2UgY29vcmRzXG5sZXQgc3RhcnQgPSBbMTAsIDEwXTtcbmxldCBlbmQgPSBbMjIwLCAxMjBdO1xubGV0IG1vdXNlID0gZW5kLnNsaWNlKCk7XG5cbi8vIEZvciB0aGUgc2hhcGUgYW5pbWF0aW9uc1xubGV0IHJvdHggPSAzMDAsIHJvdHkgPSAzNTAsIHJvdGEgPSAwO1xubGV0IG1vdGlvbiA9IDA7XG5cbi8vIENyZWF0ZSBzb21lIGR5bmFtaWMgb2JzdGFjbGVzXG5sZXQgc3Ffc21hbGwgPSBTcXVhcmUoNjUwLCAxMDAsIDE1MCk7XG5sZXQgc3FfbGFyZ2UgPSBUcmlhbmdsZShyb3R4LCByb3R5LCA0MDApO1xuXG5sZXQgb2JzdGFjbGVzID0gW1xuICBTcXVhcmUoODAsIDEyMCwgMTAwKSwgLy8gc3RhdGljXG4gIHNxX3NtYWxsLCAgICAgICAgICAgICAvLyBkeW5hbWljXG4gIHNxX2xhcmdlICAgICAgICAgICAgICAvLyBkeW5hbWljXG5dO1xuXG4vLyBBZGQgdGhlbSBhbGwgdG8gdGhlIHNjZW5lXG5mb3IgKGxldCBvIG9mIG9ic3RhY2xlcylcbiAgc2NlbmUuYWRkKCBvICk7XG5cbi8vIEdvIVxuKGZ1bmN0aW9uIGZyYW1lKClcbntcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBmcmFtZSApO1xuXG4gIHJlbmRlcmVyLmNsZWFyKCk7XG5cbiAgLy8gQW5pbWF0aW9uXG4gIG1vdGlvbiArPSAwLjA1OyAvLyBTaW51c29pZGFsXG4gIHRyYW5zbGF0ZShzcV9zbWFsbCwgMCwgMyAqIE1hdGguc2luKG1vdGlvbiAqIDAuMjUgKiBNYXRoLlBJKSk7XG4gIHRyYW5zbGF0ZShbc3RhcnRdLCAzICogTWF0aC5zaW4obW90aW9uICogMC4wNSAqIE1hdGguUEkpLCAwKTtcbiAgcm90YXRlKHNxX2xhcmdlLCByb3R4LCByb3R5LCAwLjAwNSk7XG5cbiAgLy8gRmluZCB0aGUgc2hvcnRlc3QgcGF0aC4gVHdvIHRoaW5ncyBoYXBwZW4gaGVyZTpcbiAgLy8gICAgMS4gQSBTY2VuZSBncmFwaCBpcyBleHRyYWN0ZWQgZnJvbSBvdXIgc2NlbmUgZ2VvbWV0cnlcbiAgLy8gICAgMi4gRGlqa3N0cmEncyBtZXRob2QgaXMgdXNlZCB0byBmaW5kIHRoZSBvcHRpbWFsIHJvdXRlIGFjcm9zcyB0aGUgZ3JhcGhcbiAgbGV0IHJvdXRlID0gc2NlbmUuc29sdmUoIHN0YXJ0LCBlbmQgKTtcblxuICAvLyBHZXQgYSB2aXN1YWxpc2F0aW9uIG9mIHRoZSBhY3R1YWwgc2NlbmVncmFwaFxuICBsZXQgdmlzID0gc2NlbmUudmlzKCk7XG5cbiAgbGV0IGluc2lkZSA9IGRvZGdlX251bGxzcGFjZSgpO1xuXG4gIGlmIChzaG93R3JhcGgpLy8gJiYgKGluc2lkZT09LTEpKVxuICB7XG4gICAgLy8gRHJhdyB0aGUgc2NlbmUgZ3JhcGggbm9kZXNcbiAgICBmb3IgKGxldCBuIG9mIHZpcy5ub2RlcylcbiAgICAgIHJlbmRlcmVyLnJlbmRlciggbiwgJyNiYmInLCA1ICk7XG5cbiAgICAvLyBEcmF3IHRoZSBncmFwaCBlZGdlc1xuICAgIHJlbmRlcmVyLnJlbmRlciggdmlzLmVkZ2VzLCAnI2VlZScgKTtcbiAgfVxuXG4gIC8vIFJlbmRlciB0aGUgb3JpZ2luYWwgc2NlbmUgZ2VvbWV0cnkgb24gdG9wIG9mIHRoZSBncmFwaFxuICBpZiAoc2hvd09ic3RhY2xlcylcbiAge1xuICAgIHJlbmRlcmVyLnJlbmRlciggc3RhcnQsICcjMGEwJywgNiApO1xuICAgIHJlbmRlcmVyLnJlbmRlciggZW5kLCAnIzBhMCcsIDYgKTtcbiAgICByZW5kZXJlci5yZW5kZXIoIHNjZW5lLm9iamVjdHMsICcjMzMzJyApO1xuICB9XG5cblxuICAvLyBVc2VyIGhhcyBtb3ZlZCB0aGUgbW91c2UgaW5zaWRlIGEgc2hhcGUgb2JzdGFjbGUgd2hpY2ggaW52YWxpZGF0ZXMgdGhlIGdyYXBoXG4gIGlmIChpbnNpZGUgPj0gMClcbiAge1xuICAgIHNob3dfaW5mbyhcIkVuZCBwb2ludCBpbnNpZGUgc29saWQgb2JqZWN0IVwiKVxuICAgIHJlbmRlcmVyLnJlbmRlciggW3NjZW5lLm9iamVjdHNbaW5zaWRlXV0sICcjZjAwJywgNSApO1xuICB9IGVsc2Uge1xuXG4gICAgaGlkZV9pbmZvKCk7XG5cbiAgICAvLyBOb3cgZGlzcGxheSB0aGUgZm91bmQgcm91dGUhXG4gICAgcmVuZGVyZXIucmVuZGVyKCBbcm91dGVdLCAnIzAwZicsIDMgKTtcblxuICB9XG5cblxufSkoKTtcblxuXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpLm9ubW91c2Vtb3ZlID0gZSA9PiB7XG4gIG1vdXNlID0gW2UuY2xpZW50WCAtIGUudGFyZ2V0Lm9mZnNldExlZnQgKyB3aW5kb3cuc2Nyb2xsWCwgZS5jbGllbnRZIC0gZS50YXJnZXQub2Zmc2V0VG9wICsgd2luZG93LnNjcm9sbFldO307XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2JfZGVidWcnKS5vbmNsaWNrID0gKGUsIGMpID0+IHsgc2hvd0dyYXBoID0gZS5zcmNFbGVtZW50LmNoZWNrZWQ7IH07XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2JfZGVidWcyJykub25jbGljayA9IChlLCBjKSA9PiB7IHNob3dPYnN0YWNsZXMgPSBlLnNyY0VsZW1lbnQuY2hlY2tlZDsgfTtcblxuXG5mdW5jdGlvbiBzaG93X2luZm8odGV4dCkgeyBpbmZvLmlubmVySFRNTCA9IHRleHQ7IGluZm8uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7IH1cbmZ1bmN0aW9uIGhpZGVfaW5mbygpIHsgaW5mby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9XG5cblxuLy8gVGhpcyBwcmV2ZW50cyBhIGJpdCBvZiBhIG1lc3MgZnJvbSBoYXBwZW5pbmdcbi8vIHdoZW4gdGhlIG1vdXNlIGN1cnNvciBkcmlmdHMgKmluc2lkZSogYSBzdXBwb3NlZGx5IHNvbGlkIHNoYXBlXG5mdW5jdGlvbiBkb2RnZV9udWxsc3BhY2UoKVxue1xuICAvLyBDaGVjayB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiBlYWNoIG9mIG91ciBzb2xpZCBzaGFwZXNcbiAgZm9yIChsZXQgaSBpbiBvYnN0YWNsZXMpXG4gIHtcbiAgICBsZXQgbyA9IG9ic3RhY2xlc1tpPj4wXTtcbiAgICAvLyBPaCBubyFcbiAgICBpZiAocG9pbnRfaW5fcG9seWdvbihtb3VzZSwgbykpICAvLyBzaW1wbGUgY29udmV4LW9ubHkgdGVzdFxuICAgIHtcbiAgICAgIC8vIFNldCB0aGUgZW5kcG9pbnQgdG8gdGhlIHN0YXJ0IHRvIHJlbW92ZSB0aGUgcmVkIGxpbmUgYW5kIGN1cnNvclxuICAgICAgZW5kID0gc3RhcnQ7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgLy8gQWxsIGdvb2QsIHNldCB0aGUgZW5kcG9pbnQgdG8gdGhlIGxhc3Qga25vd24gbW91c2UgcG9zXG4gIGVuZCA9IG1vdXNlO1xuICByZXR1cm4gLTE7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuaW1wb3J0IEdyYXBoICAgICAgICAgIGZyb20gJy4vR3JhcGgnO1xuaW1wb3J0IHtpbnRlcnNlY3RzfSAgIGZyb20gJy4vVXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHRoaXMub2JqZWN0cyA9IFtdO1xuICAgIHRoaXMuZ3JhcGggPSBudWxsO1xuXG4gICAgLy8gVGhpcyBpcyBqdXN0IGZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICB0aGlzLl92aXMgPSBudWxsO1xuICB9XG5cbiAgYWRkKG9iamVjdClcbiAge1xuICAgIHRoaXMub2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gIH1cblxuICBzb2x2ZShzdGFydCwgZW5kKVxuICB7XG4gICAgaWYgKHN0YXJ0ID09IGVuZCkgcmV0dXJuO1xuXG4gICAgdGhpcy5ncmFwaCA9IHRoaXMuX2dyYXBoKHN0YXJ0LCBlbmQpO1xuICAgIGxldCBub2RlcyA9IHRoaXMuZ3JhcGguc2hvcnRlc3QoMCwgMSk7IC8vIFswXSBzdGFydCwgWzFdIGVuZCAoc2VlIC5ncmFwaCgpKVxuXG4gICAgbGV0IHJvdXRlID0gW107XG5cbiAgICBmb3IgKGxldCBuIG9mIG5vZGVzKVxuICAgICAgcm91dGUucHVzaCh0aGlzLl92aXMubm9kZXNbIG4gXSk7XG5cbiAgICByZXR1cm4gcm91dGU7XG4gIH1cblxuICB2aXMoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpcztcbiAgfVxuXG4gIC8vIEV4dHJhY3QgYSBzY2VuZWdyYXBoIGZyb20gb3VyIGNvbnRpbnVvdXMgZXVjbGlkZWFuIGdlb21ldHJ5XG4gIF9ncmFwaChzdGFydCwgZW5kKVxuICB7XG4gICAgbGV0IG5vZGVzID0gW107XG4gICAgbGV0IGVkZ2VzID0gW107XG5cbiAgICBsZXQgZyA9IG5ldyBHcmFwaCgpO1xuXG4gICAgLy8gRm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaFxuICAgIHRoaXMuX3ZpcyA9IHsgbm9kZXM6IFtdLCBlZGdlczogW10gfTtcblxuICAgIC8vIFRoaXMgaXMganVzdCBhIHRlbXAgdmFsdWUgdXNlZCB0byBtYWtlIHN1cmUgc2hhcGVzIGRvbid0IHBlcmZvcm1cbiAgICAvLyBpbnRlcnNlY3Rpb24gdGVzdHMgb24gdGhlbXNlbHZlcyAodGhlaXIgb3duIHZlcnRpY2VzLCBjcm9zc2luZyBpbnRlcm5hbGx5KVxuICAgIGxldCBzaGFwZV9pZCA9IDE7XG5cbiAgICAvLyBUaGVzZSBmaXJzdCB0d28gbm9kZXMgaW4gdGhlIGdyYXBoIGFyZSBhIHNwZWNpYWwgY2FzZVxuICAgIG5vZGVzLnB1c2goIHt2ZXJ0ZXg6IHN0YXJ0LCAgc2hhcGU6IHNoYXBlX2lkKyt9ICk7IC8vIFswXSBzdGFydCAoc2VlIC5zb2x2ZSgpKVxuICAgIG5vZGVzLnB1c2goIHt2ZXJ0ZXg6IGVuZCwgICAgc2hhcGU6IHNoYXBlX2lkKyt9ICk7IC8vIFsxXSBlbmRcblxuICAgIGxldCBnZWRnZXMgPSBbXTtcblxuICAgIC8vIGV4dHJhY3QgZWFjaCBvYnN0YWNsZSdzIGVkZ2VzIGFuZCBub2Rlc1xuICAgIGZvciAobGV0IG8gb2YgdGhpcy5vYmplY3RzKVxuICAgIHtcbiAgICAgIHNoYXBlX2lkKys7XG5cbiAgICAgIGxldCBlO1xuICAgICAgbGV0IGJhc2UgPSBub2Rlcy5sZW5ndGg7XG4gICAgICBmb3IgKGU9MDsgZTxvLmxlbmd0aC0xOyBlKyspXG4gICAgICB7XG5cbiAgICAgICAgbGV0IHYxID0gYmFzZSArIGU7XG4gICAgICAgIC8vIEZmcyBhbGFuIHdoYXQgYSBtZXNzIChuLmIuIGl0IHRvb2sgMzAgbWlucyBvZiBkZWJ1Z2dpbmcgdG8gZ2V0IHRoaXMgbGluZSBiZWxvdyBjb3JyZWN0KVxuICAgICAgICAvLyBpdCB3YXMgb3JpZ2luYWxseSAoYmFzZSArIGUgKyAxKSAlIChvLmxlbmd0aC0xKSkgd2hpY2ggaXMgcXVpdGUgZGlmZmVyZW50LlxuICAgICAgICAvLyBJIHRob3VnaHQgdGhpcyB3YXMgZ29pbmcgdG8gYmUgc3VjaCBhIGRpZmZpY3VsdCBidWcgdG8gZml4LCBJIG5lYXJseSBkaWRuJ3QgYm90aGVyIHRyeWluZy5cbiAgICAgICAgLy8gdGJoLCB0aGVzZSBub2RlL2VkZ2Ugc3RydWN0dXJlcyBuZWVkIGEgc2VyaW91cyByZWZhY3RvcmluZyBpZiBldmVyIHRoaXMgcHJvZ3JhbSBpcyBleHBhbmRlZCEhIVxuICAgICAgICBsZXQgdjIgPSBiYXNlICsgKChlICsgMSkgJSAoby5sZW5ndGgtMSkpO1xuXG4gICAgICAgIGdlZGdlcy5wdXNoKHtcbiAgICAgICAgICBpbmRleDpbdjEsIHYyXSxcbiAgICAgICAgICB2ZXJ0ZXg6IFtvW2VdLCBvW2UrMV1dXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVkZ2VzLnB1c2goW29bZV0sIG9bZSsxXV0pO1xuXG4gICAgICAgIG5vZGVzLnB1c2goe1xuICAgICAgICAgIHZlcnRleDogb1tlXSxcbiAgICAgICAgICBzaGFwZTogc2hhcGVfaWRcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgICAgLy8gdGhpcyBpc24ndCBhIGNsb3NlZCByaW5nIChtYXRjaGluZyBzdGFydCBhbmQgZW5kcClcbiAgICAgIC8vIGkuZS4gYSBzdHJhaWdodCBsaW5lLlxuICAgICAgLy8gTGF0ZXI6IEluIGhpbmRzaWdodCwgSSBzaG91bGRuJ3QgaGF2ZSBib3RoZXJlZCB0cnlpbmcgdG9cbiAgICAgIC8vIHN1cHBvcnQgZXNzZW50aWFsbHkgZGltZW5zaW9ubGVzcyBlbnRpdGllcyBsaWtlIGEgdHdvLXNpZGVkIHN0cmFpZ2h0IGxpbmUgaW4gMmQgc3BhY2UuXG4gICAgICAvLyBldmVyeXRoaW5nIHNob3VsZCBiZSBhIGNsb3NlZCByaW5nLCBldmVuIGlmIGl0J3MgaW5pbml0ZWx5IHNtYWxsLlxuICAgICAgaWYgKCFlcXVhbHMob1swXSwgb1tlXSkpXG4gICAgICAgIG5vZGVzLnB1c2goe1xuICAgICAgICAgIHZlcnRleDogb1tlXSxcbiAgICAgICAgICBzaGFwZTogc2hhcGVfaWRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGBub2Rlc2AgaW5kaWNlcyB0byBncmFwaFxuICAgIGZvciAobGV0IGkgaW4gbm9kZXMpXG4gICAge1xuICAgICAgZy5hZGR2ZXJ0ZXgoTnVtYmVyKGkpKTtcblxuICAgICAgLy8gRm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaFxuICAgICAgdGhpcy5fdmlzLm5vZGVzLnB1c2gobm9kZXNbTnVtYmVyKGkpXS52ZXJ0ZXgpO1xuICAgIH1cblxuICAgIC8vVE9ETzogcmVmYWN0b3IgdGhlIG5vZGUvZWRnZSBkYXRhIHN0cnVjdCBtZXNzXG4gICAgZm9yIChsZXQgZ2Ugb2YgZ2VkZ2VzKVxuICAgIHtcbiAgICAgIGcuYWRkZWRnZShnZS5pbmRleFswXSwgZ2UuaW5kZXhbMV0sIGNvc3QoZ2UudmVydGV4WzBdLCBnZS52ZXJ0ZXhbMV0pKTtcbiAgICAgIHRoaXMuX3Zpcy5lZGdlcy5wdXNoKFtnZS52ZXJ0ZXhbMF0sIGdlLnZlcnRleFsxXV0pO1xuICAgIH1cblxuICAgIGxldCBuZT0wO1xuXG4gICAgZm9yIChsZXQgeD0wOyB4PG5vZGVzLmxlbmd0aC0xOyB4KyspXG4gICAgICBmb3IgKGxldCB5PXgrMTsgeTxub2Rlcy5sZW5ndGg7IHkrKylcbiAgICAgIHtcbiAgICAgICAgICBsZXQgQSA9IG5vZGVzW3hdO1xuICAgICAgICAgIGxldCBCID0gbm9kZXNbeV07XG5cbiAgICAgICAgICAvLyBXZSdyZSB0ZXN0aW5nIHRoZSBzaGFwZSdzIHZlcnRpY2VzIGFnYWluc3QgaXRzZWxmXG4gICAgICAgICAgLy8gd2hpY2ggbGVhZHMgdG8gaW50ZXJuYWwgcGF0aHMgaW5zaWRlIHRoZSBzaGFwZSAoaW52YWxpZCEpXG4gICAgICAgICAgaWYgKEEuc2hhcGUgPT0gQi5zaGFwZSkgY29udGludWU7XG5cbiAgICAgICAgICBsZXQgdGVzdGVkZ2UgPSBbQS52ZXJ0ZXgsIEIudmVydGV4XTtcblxuICAgICAgICAgIGlmIChlZGdldmlzaWJpbHR5KHRlc3RlZGdlLCBlZGdlcykpXG4gICAgICAgICAge1xuICAgICAgICAgICAgZy5hZGRlZGdlKHgsIHksIGNvc3QoQS52ZXJ0ZXgsIEIudmVydGV4KSk7XG5cbiAgICAgICAgICAgIC8vIEp1c3QgZm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaCwgbm9uLWVzc2VudGlhbDpcbiAgICAgICAgICAgIHRoaXMuX3Zpcy5lZGdlcy5wdXNoKFtBLnZlcnRleCwgQi52ZXJ0ZXhdKTtcbiAgICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIHJldHVybiBnO1xuICB9XG5cbn1cblxuXG5cbmZ1bmN0aW9uIGNvc3QoYSwgYilcbntcbiAgbGV0IGR4ID0gYlswXSAtIGFbMF0gLy8geDIgLSB4MVxuICBsZXQgZHkgPSBiWzFdIC0gYVsxXTtcbiAgcmV0dXJuIE1hdGguc3FydCggZHgqZHggKyBkeSpkeSApO1xuXG59XG5cbmZ1bmN0aW9uIGVkZ2V2aXNpYmlsdHkodGVzdGVkZ2UsIGVkZ2VzKVxue1xuICAvLyBjb25zb2xlLmxvZyhgVGVzdGluZyBlZGdlOiAke3Rlc3RlZGdlWzBdfSwgJHt0ZXN0ZWRnZVsxXX1gKTtcblxuICBmb3IgKGxldCB0PTA7IHQ8ZWRnZXMubGVuZ3RoOyB0KyspXG4gIHtcbiAgICBsZXQgZSA9IGVkZ2VzW3RdO1xuXG4gICAgbGV0IHJlcyA9IGludGVyc2VjdHModGVzdGVkZ2VbMF0sIHRlc3RlZGdlWzFdLCBlWzBdLCBlWzFdKTtcblxuICAgIC8vIElmIGludGVyc2VjdGlvbiwgY2hlY2sgaXQncyBub3QganVzdCB0aGUgZW5kcG9pbnRzIGtpc3Npbmcgd2hpY2ggaXMgb2tcbiAgICAvLyBpbiBmYWN0LCBpdCdzIG1vcmUgdGhhbiAnb2snIC0gaXQncyBleGFjdGx5IHdoYXQgd2UncmUgbG9va2luZyBmb3JcbiAgICBpZiAocmVzLmludGVyc2VjdCAmJiAhcmVzLmtpc3MpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5cbmZ1bmN0aW9uIGVxdWFscyhhLCBiKVxue1xuICByZXR1cm4gKGFbMF0gPT0gYlswXSAmJiBhWzFdID09IGJbMV0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1NjZW5lLmpzIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICB0aGlzLnZlcnRpY2VzID0gW107XG4gICAgdGhpcy5lZGdlcyA9IFtdO1xuICAgIHRoaXMubnVtZWRnZXMgPSAwO1xuICB9XG5cbiAgYWRkdmVydGV4KG4pXG4gIHtcbiAgICB0aGlzLnZlcnRpY2VzLnB1c2gobik7XG4gICAgdGhpcy5lZGdlc1tuXSA9IFtdO1xuICB9XG5cbiAgLy8gYWRqYWNlbnkgZWRnZSBsaXN0XG4gIGFkZGVkZ2UodjEsIHYyLCBjb3N0KVxuICB7XG4gICAgdGhpcy5lZGdlc1t2MV0ucHVzaCh7ZGVzdDp2MiwgY29zdH0pO1xuICAgIHRoaXMuZWRnZXNbdjJdLnB1c2goe2Rlc3Q6djEsIGNvc3R9KTtcblxuICAgIHRoaXMubnVtZWRnZXMrKztcbiAgfVxuXG4gIC8vIFN1cGVyIGJhc2ljIGltcGxlbWVudGF0aW9uIG9mIERpamtzdHJhJ3MgYWxnb3JpdGhtXG4gIC8vIERpcmVjdGx5IGZyb20gdGhpcyByZWNpcGU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0RpamtzdHJhJTI3c19hbGdvcml0aG0jQWxnb3JpdGhtXG4gIHNob3J0ZXN0KHN0YXJ0LCBlbmQpXG4gIHtcbiAgICBsZXQgY3VycmVudF9ub2RlO1xuICAgIGxldCBkaXN0ID0gWzBdO1xuICAgIGxldCBwcmV2ID0gW107XG4gICAgbGV0IHVudmlzaXRlZCA9IFtdO1xuXG4gICAgZm9yIChsZXQgaT0wOyBpPHRoaXMudmVydGljZXMubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgaWYgKGkpIGRpc3RbaV0gPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgdW52aXNpdGVkW2ldID0gaTtcbiAgICAgIHByZXZbaV0gPSBudWxsO1xuICAgIH1cblxuICAgIC8vICdWaXNpdCcgZWFjaCBub2RlIG9ubHkgb25jZSwgaW4gdHVyblxuICAgIHdoaWxlKCAoY3VycmVudF9ub2RlID0gdW52aXNpdGVkLnNoaWZ0KCkpICE9IG51bGwgKVxuICAgIHtcbiAgICAgIC8vIEZvciBlYWNoIG5vZGUsICdjaGVjaycgaXRzIG5laWdoYm91cnMuXG4gICAgICAvLyBXaGlsZSB3ZSBvbmx5ICd2aXNpdCcgZWFjaCBub2RlIG9uY2UsIGl0J3MgdGhpcyByZXBlYXRlZCAnY2hlY2snaW5nXG4gICAgICAvLyAoYW5kIG9jY2FzaW9uYWwgcmVjYWxjdWxhdGluZykgb2YgbmVpZ2hib3VycyB0aGF0IGFsbG93cyB1cyB0byBmaW5kXG4gICAgICAvLyB0aGUgc2hvcnRlc3Qgcm91dGUgdGhyb3VnaCB0aGUgZ3JhcGggZnJvbSBvdXIgc3RhcnQgcG9pbnQuXG4gICAgICAvLyBJbiBmYWN0LCB0aGUgaW5oZXJlbnQgcmVzdWx0IG9mIHRoZSBhbGdvIGlzIHRoYXQgd2UgZmluZCB0aGUgc2hvcnRlc3RcbiAgICAgIC8vIHBhdGggdG8gKmV2ZXJ5KiBwb2ludCBpbiB0aGUgZ3JhcGhcbiAgICAgIGZvciAobGV0IHQ9MDsgdDx0aGlzLmVkZ2VzW2N1cnJlbnRfbm9kZV0ubGVuZ3RoOyB0KyspXG4gICAgICB7XG4gICAgICAgIC8vIHZlcnRleC9ub2RlIElEXG4gICAgICAgIGxldCBuZWlnaGJvdXIgPSB0aGlzLmVkZ2VzW2N1cnJlbnRfbm9kZV1bdF0uZGVzdDtcblxuICAgICAgICAvLyBEaXN0YW5jZSBmcm9tIGN1cnJlbnRfbm9kZSB0byBuZWlnaGJvdXJcbiAgICAgICAgbGV0IGNvc3QgPSB0aGlzLmVkZ2VzW2N1cnJlbnRfbm9kZV1bdF0uY29zdDtcblxuICAgICAgICAvLyBEaXN0YW5jZSB0aHVzIGZhciBvbiB0aGlzIHJvdXRlICh1cCB0byBjdXJyZW50X25vZGUpICsgZGlzdGFuY2UgdG8gbmVpZ2hib3VyXG4gICAgICAgIGxldCB0ZW50YXRpdmVfZGlzdCA9IGRpc3RbY3VycmVudF9ub2RlXSArIGNvc3Q7XG5cbiAgICAgICAgLy8gSGF2ZSB3ZSBmb3VuZCBhIHNob3J0ZXIgcGF0aD9cbiAgICAgICAgaWYgKHRlbnRhdGl2ZV9kaXN0IDwgZGlzdFtuZWlnaGJvdXJdKVxuICAgICAgICB7XG4gICAgICAgICAgZGlzdFtuZWlnaGJvdXJdID0gdGVudGF0aXZlX2Rpc3Q7IC8vIE5ldyBkaXN0YW5jZSB0byB0aGlzIG5vZGVcbiAgICAgICAgICBwcmV2W25laWdoYm91cl0gPSBjdXJyZW50X25vZGU7ICAgLy8gVXBkYXRlIHRoZSByb3V0ZVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYyA9IGVuZCwgc2VxID1bZW5kXTtcblxuICAgIC8vIGZhaWxlZCBmb3Igc29tZSByZWFzb24sIGUuZy4gaW1wb3NzaWJsZSBwb2ludCBpbnNpZGUgbnVsbHNwYWNlIGV0Y1xuICAgIGlmIChwcmV2W2NdID09IG51bGwpXG4gICAgICByZXR1cm4gW107XG5cbiAgICBkbyB7XG4gICAgICBjID0gcHJldltjXTtcbiAgICAgIHNlcS5wdXNoKGMpO1xuICAgIH0gd2hpbGUoYyAhPSBzdGFydCk7XG5cbiAgICByZXR1cm4gc2VxLnJldmVyc2UoKTtcblxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9HcmFwaC5qcyIsIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlclxue1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KVxuICB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCk7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gIH1cblxuICBjbGVhcigpXG4gIHtcbiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gIH1cblxuICByZW5kZXIob2JqZWN0cywgY29sb3VyID0gJyMwMDAnLCB3aWR0aCA9IDIpXG4gIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob2JqZWN0cykpIHJldHVybjtcblxuICAgIC8vIHBvaW50IHR5cGVcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob2JqZWN0c1swXSkpXG4gICAge1xuICAgICAgY29uc3QgcCA9IG9iamVjdHM7XG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQuYXJjKHBbMF0+PjAsIHBbMV0+PjAsIHdpZHRoLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG91cjtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAvLyBsaXN0IG9mIHNoYXBlcyB0eXBlXG5cbiAgICAgIGZvciAobGV0IG8gb2Ygb2JqZWN0cylcbiAgICAgIHtcbiAgICAgICAgZm9yIChsZXQgZT0wOyBlPG8ubGVuZ3RoLTE7IGUrKylcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuX2xpbmUob1tlXSwgb1tlKzFdLCBjb2xvdXIsIHdpZHRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICBfbGluZShhLCBiLCBjLCB3KVxuICB7XG4gICAgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9IHc7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gYyB8fCAnYmxhY2snO1xuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQubW92ZVRvKGFbMF0+PjAsYVsxXT4+MCk7XG4gICAgdGhpcy5jb250ZXh0LmxpbmVUbyhiWzBdPj4wLGJbMV0+PjApO1xuICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyZXIuanMiXSwic291cmNlUm9vdCI6IiJ9