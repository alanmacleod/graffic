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
var mx = end[0],
    my = end[1];

// For the shape animations
var rotx = 300,
    roty = 350,
    rota = 0;
var motion = 0;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTRiYWExNWNjZDI3NGJlNTgxYjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJUcmlhbmdsZSIsImFuZ2xlIiwiciIsIk1hdGgiLCJzaW4iLCJQSSIsInRyaSIsImkiLCJjb3MiLCJyb3RhdGUiLCJzaGFwZSIsInJ4IiwicnkiLCJkYSIsInBhaXIiLCJyb3RhdGVfcG9pbnQiLCJ0cmFuc2xhdGUiLCJkeCIsImR5IiwiY3giLCJjeSIsInAiLCJzIiwiYyIsInhuZXciLCJ5bmV3IiwicG9pbnRfaW5fcG9seWdvbiIsInBvaW50IiwidmVydGljZXMiLCJsZW5ndGgiLCJhIiwiYiIsInNlZyIsInN1YnRyYWN0UG9pbnRzIiwicHQiLCJpbnNpZGUiLCJjcm9zc1Byb2R1Y3QiLCJpbnRlcnNlY3RzIiwiYXAiLCJhcDIiLCJhcSIsImFxMiIsImRvTGluZVNlZ21lbnRzSW50ZXJzZWN0IiwiaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsiLCJwMiIsInEiLCJxMiIsImJveDEiLCJ4bWluIiwibWluIiwieW1pbiIsInhtYXgiLCJtYXgiLCJ5bWF4IiwiYm94MiIsImJib3hfY29udGFpbmVkIiwidU51bWVyYXRvciIsImRlbm9taW5hdG9yIiwiZXF1YWxQb2ludHMiLCJpbnRlcnNlY3QiLCJraXNzIiwiYWxsRXF1YWwiLCJ1IiwidCIsInBvaW50MSIsInBvaW50MiIsIkFycmF5IiwiaXNBcnJheSIsInJlc3VsdCIsImFyZ3MiLCJmaXJzdFZhbHVlIiwiYXJndW1lbnRzIiwiZWxlbWVudCIsInJlbmRlcmVyIiwic2NlbmUiLCJpbmZvIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNob3dHcmFwaCIsInNob3dPYnN0YWNsZXMiLCJzdGFydCIsImVuZCIsIm14IiwibXkiLCJyb3R4Iiwicm90eSIsInJvdGEiLCJtb3Rpb24iLCJzcV9zbWFsbCIsInNxX2xhcmdlIiwib2JzdGFjbGVzIiwibyIsImFkZCIsImZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaGlkZV9pbmZvIiwiZG9kZ2VfbnVsbHNwYWNlIiwicm91dGUiLCJzb2x2ZSIsInZpcyIsImNsZWFyIiwibm9kZXMiLCJuIiwicmVuZGVyIiwiZWRnZXMiLCJvYmplY3RzIiwic2hvd19pbmZvIiwib25tb3VzZW1vdmUiLCJlIiwiY2xpZW50WCIsImNsaWVudFkiLCJvbmNsaWNrIiwic3JjRWxlbWVudCIsImNoZWNrZWQiLCJ0ZXh0IiwiaW5uZXJIVE1MIiwic3R5bGUiLCJkaXNwbGF5IiwiU2NlbmUiLCJncmFwaCIsIl92aXMiLCJvYmplY3QiLCJfZ3JhcGgiLCJzaG9ydGVzdCIsImciLCJzaGFwZV9pZCIsInZlcnRleCIsImdlZGdlcyIsImJhc2UiLCJ2MSIsInYyIiwiaW5kZXgiLCJlcXVhbHMiLCJhZGR2ZXJ0ZXgiLCJOdW1iZXIiLCJnZSIsImFkZGVkZ2UiLCJjb3N0IiwibmUiLCJBIiwiQiIsInRlc3RlZGdlIiwiZWRnZXZpc2liaWx0eSIsInNxcnQiLCJyZXMiLCJHcmFwaCIsIm51bWVkZ2VzIiwiZGVzdCIsImN1cnJlbnRfbm9kZSIsImRpc3QiLCJwcmV2IiwidW52aXNpdGVkIiwiTUFYX1ZBTFVFIiwic2hpZnQiLCJuZWlnaGJvdXIiLCJ0ZW50YXRpdmVfZGlzdCIsInNlcSIsInJldmVyc2UiLCJSZW5kZXJlciIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJjb2xvdXIiLCJiZWdpblBhdGgiLCJhcmMiLCJmaWxsU3R5bGUiLCJmaWxsIiwiX2xp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LGlCQUFLLElBQUlpQixJQUFFLENBQVgsRUFBY0EsSUFBRWpCLEVBQUU5RCxNQUFGLEdBQVMsQ0FBekIsRUFBNEIrRSxHQUE1QixFQUNBO0FBQ0UsbUJBQUs2RCxLQUFMLENBQVc5RSxFQUFFaUIsQ0FBRixDQUFYLEVBQWlCakIsRUFBRWlCLElBQUUsQ0FBSixDQUFqQixFQUF5QndELE1BQXpCLEVBQWlDRixLQUFqQztBQUNEO0FBQ0Y7QUFUSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV047QUFFRjs7OzBCQUVLcEksQyxFQUFHQyxDLEVBQUdSLEMsRUFBR21KLEMsRUFDZjtBQUNFLFdBQUtYLE9BQUwsQ0FBYVksU0FBYixHQUF5QkQsQ0FBekI7QUFDQSxXQUFLWCxPQUFMLENBQWFhLFdBQWIsR0FBMkJySixLQUFLLE9BQWhDO0FBQ0EsV0FBS3dJLE9BQUwsQ0FBYU0sU0FBYjtBQUNBLFdBQUtOLE9BQUwsQ0FBYWMsTUFBYixDQUFvQi9JLEVBQUUsQ0FBRixLQUFNLENBQTFCLEVBQTRCQSxFQUFFLENBQUYsS0FBTSxDQUFsQztBQUNBLFdBQUtpSSxPQUFMLENBQWFlLE1BQWIsQ0FBb0IvSSxFQUFFLENBQUYsS0FBTSxDQUExQixFQUE0QkEsRUFBRSxDQUFGLEtBQU0sQ0FBbEM7QUFDQSxXQUFLZ0ksT0FBTCxDQUFhZ0IsTUFBYjtBQUNEOzs7Ozs7a0JBaERrQmpCLFEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTRiYWExNWNjZDI3NGJlNTgxYjQiLCJcblxuZnVuY3Rpb24gU3F1YXJlKHgsIHksIHNpemUpXG57XG4gIGxldCBoc2l6ZSA9IHNpemU+PjE7XG4gIGxldCBzcSA9IFtdO1xuICAvLyBvciBqdXN0IG1ha2UgYSB1bml0IHNxdWFyZSBhbmQgc2NhbGUgaXQgdXAgZHVoIDp8XG4gIC8vIHRvcCBsZWZ0XG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgLSBoc2l6ZV0gKTtcbiAgLy8gdG9wIHJpZ2h0XG4gIHNxLnB1c2goIFt4ICsgaHNpemUsIHkgLSBoc2l6ZV0gKTtcbiAgLy8gYm90dG9tIHJpZ2h0XG4gIHNxLnB1c2goIFt4ICsgaHNpemUsIHkgKyBoc2l6ZV0gKTtcbiAgLy8gYm90dG9tIGxlZnRcbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSArIGhzaXplXSApO1xuICAvLyB0b3AgbGVmdCBhZ2FpblxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5IC0gaHNpemVdICk7XG5cbiAgcmV0dXJuIHNxO1xufVxuXG4vLyBlcXVpbGF0ZXJhbFxuZnVuY3Rpb24gVHJpYW5nbGUoeCwgeSwgc2l6ZSlcbntcbiAgbGV0IGFuZ2xlID0gMDtcbiAgbGV0IHIgPSAoc2l6ZS8yLjApL01hdGguc2luKE1hdGguUEkqNjAvMTgwKTtcbiAgbGV0IHRyaSA9IFtdO1xuXG4gIGZvcihsZXQgaT0wOyBpPD0zOyBpKyspXG4gIHtcbiAgICB0cmkucHVzaChbXG4gICAgICB4ICsgciAqIE1hdGguY29zKGFuZ2xlICsgKGkgJSAzKSAqIDIgKiBNYXRoLlBJLzMpLFxuICAgICAgeSArIHIgKiBNYXRoLnNpbihhbmdsZSArIChpICUgMykgKiAyICogTWF0aC5QSS8zKVxuICAgIF0pO1xuICB9XG5cbiAgcmV0dXJuIHRyaTtcbn1cblxuZnVuY3Rpb24gcm90YXRlKHNoYXBlLCByeCwgcnksIGRhKVxue1xuICBmb3IgKGxldCBwYWlyIG9mIHNoYXBlKVxuICAgIHBhaXIgPSByb3RhdGVfcG9pbnQocngsIHJ5LCBkYSwgcGFpcik7XG59XG5cbmZ1bmN0aW9uIHRyYW5zbGF0ZShzaGFwZSwgZHgsIGR5KVxue1xuICBmb3IgKGxldCBwYWlyIG9mIHNoYXBlKVxuICB7XG4gICAgcGFpclswXSArPSBkeDtcbiAgICBwYWlyWzFdICs9IGR5O1xuICB9XG59XG5cbmZ1bmN0aW9uIHJvdGF0ZV9wb2ludChjeCwgY3ksIGFuZ2xlLCBwKVxue1xuICBsZXQgcyA9IE1hdGguc2luKGFuZ2xlKTtcbiAgbGV0IGMgPSBNYXRoLmNvcyhhbmdsZSk7XG5cbiAgLy8gdHJhbnNsYXRlIHBvaW50IGJhY2sgdG8gb3JpZ2luOlxuICBwWzBdIC09IGN4O1xuICBwWzFdIC09IGN5O1xuXG4gIC8vIHJvdGF0ZSBwb2ludFxuICBsZXQgeG5ldyA9IHBbMF0gKiBjIC0gcFsxXSAqIHM7XG4gIGxldCB5bmV3ID0gcFswXSAqIHMgKyBwWzFdICogYztcblxuICAvLyB0cmFuc2xhdGUgcG9pbnQgYmFjazpcbiAgcFswXSA9IHhuZXcgKyBjeDtcbiAgcFsxXSA9IHluZXcgKyBjeTtcblxuICByZXR1cm4gcDtcbn1cblxuXG5mdW5jdGlvbiBwb2ludF9pbl9wb2x5Z29uKHBvaW50LCB2ZXJ0aWNlcylcbntcbiAgZm9yIChsZXQgaT0wOyBpPHZlcnRpY2VzLmxlbmd0aC0xOyBpKyspXG4gIHtcbiAgICBsZXQgYSA9IHZlcnRpY2VzW2ldO1xuICAgIGxldCBiID0gdmVydGljZXNbaSsxXTtcblxuICAgIGxldCBzZWcgPSBzdWJ0cmFjdFBvaW50cyhiLCBhKTtcbiAgICBsZXQgcHQgPSBzdWJ0cmFjdFBvaW50cyhwb2ludCwgYSk7XG4gICAgbGV0IGluc2lkZSA9IChjcm9zc1Byb2R1Y3Qoc2VnLCBwdCkgPiAwKTtcbiAgICAvLyBjb25zb2xlLmxvZyhpbnNpZGUpO1xuICAgIGlmICghaW5zaWRlKSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG4vKipcbiAqIEBhdXRob3IgUGV0ZXIgS2VsbGV5XG4gKiBAYXV0aG9yIHBna2VsbGV5NEBnbWFpbC5jb21cbiAqL1xuLyoqXG4gKiBTZWUgaWYgdHdvIGxpbmUgc2VnbWVudHMgaW50ZXJzZWN0LiBUaGlzIHVzZXMgdGhlXG4gKiB2ZWN0b3IgY3Jvc3MgcHJvZHVjdCBhcHByb2FjaCBkZXNjcmliZWQgYmVsb3c6XG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NjUyODIvNzg2MzM5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHAgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgc3RhcnQgb2YgdGhlIDFzdCBsaW5lLlxuICogQHBhcmFtIHtPYmplY3R9IHAyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIGVuZCBvZiB0aGUgMXN0IGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBzdGFydCBvZiB0aGUgMm5kIGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcTIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgZW5kIG9mIHRoZSAybmQgbGluZS5cbiAqL1xuXG5mdW5jdGlvbiBpbnRlcnNlY3RzKGFwLCBhcDIsIGFxLCBhcTIpXG57XG4gIC8vIEFNOiBOb3RlIHRvIGRldmVsb3BlcnMsIHBsZWFzZSBkb24ndCB1c2UgbmFtZWQgcHJvcGVydGllcyBmb3IgdmVjdG9yc1xuICAvLyAgICAgSXQncyBkYWZ0LiBVc2UgYXJyYXlzLlxuICByZXR1cm4gZG9MaW5lU2VnbWVudHNJbnRlcnNlY3QoIHt4OiBhcFswXSwgeTogYXBbMV19LCB7eDogYXAyWzBdLCB5OiBhcDJbMV19LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt4OiBhcVswXSwgeTogYXFbMV19LCB7eDogYXEyWzBdLCB5OiBhcTJbMV19ICk7XG59XG5cbmZ1bmN0aW9uIGlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrKHAsIHAyLCBxLCBxMilcbntcbiAgdmFyIGJveDEgPSB7XG4gICAgeG1pbjogTWF0aC5taW4ocC54LCBwMi54KSxcbiAgICB5bWluOiBNYXRoLm1pbihwLnksIHAyLnkpLFxuICAgIHhtYXg6IE1hdGgubWF4KHAueCwgcDIueCksXG4gICAgeW1heDogTWF0aC5tYXgocC55LCBwMi55KVxuICB9O1xuXG4gIHZhciBib3gyID0ge1xuICAgIHhtaW46IE1hdGgubWluKHEueCwgcTIueCksXG4gICAgeW1pbjogTWF0aC5taW4ocS55LCBxMi55KSxcbiAgICB4bWF4OiBNYXRoLm1heChxLngsIHEyLngpLFxuICAgIHltYXg6IE1hdGgubWF4KHEueSwgcTIueSlcbiAgfTtcblxuICByZXR1cm4gYmJveF9jb250YWluZWQoYm94MSwgYm94MikgfHwgYmJveF9jb250YWluZWQoYm94MiwgYm94MSk7XG59XG5cbmZ1bmN0aW9uIGJib3hfY29udGFpbmVkKGEsIGIpXG57XG4gIC8vIElzIEJveCBCIGNvbXBsZXRlbHkgaW5zaWRlIGJveCBBID9cbiAgcmV0dXJuIChiLnhtaW4gPj0gYS54bWluICYmIGIueG1heCA8PSBhLnhtYXgpICYmIChiLnltaW4gPj0gYS55bWluICYmIGIueW1heCA8PSBhLnltYXgpO1xufVxuXG5cbmZ1bmN0aW9uIGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0KHAsIHAyLCBxLCBxMilcbntcbiAgLy8gdmFyIGRlYnVnX3N0cmluZyA9IGBkb0xpbmVTZWdtZW50c0ludGVyc2VjdDogKCR7cC54fSwgJHtwLnl9KS0oJHtwMi54fSwgJHtwMi55fSkgIHdpdGggICgke3EueH0sICR7cS55fSktKCR7cTIueH0sICR7cTIueX0pYDtcblxuXHR2YXIgciA9IHN1YnRyYWN0UG9pbnRzKHAyLCBwKTtcblx0dmFyIHMgPSBzdWJ0cmFjdFBvaW50cyhxMiwgcSk7XG5cblx0dmFyIHVOdW1lcmF0b3IgPSBjcm9zc1Byb2R1Y3Qoc3VidHJhY3RQb2ludHMocSwgcCksIHIpO1xuXHR2YXIgZGVub21pbmF0b3IgPSBjcm9zc1Byb2R1Y3Qociwgcyk7XG5cblx0aWYgKHVOdW1lcmF0b3IgPT0gMCAmJiBkZW5vbWluYXRvciA9PSAwKSB7XG5cdFx0Ly8gVGhleSBhcmUgY29MbGluZWFyXG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvcGxhbmFyXCIpO1xuXG5cdFx0Ly8gRG8gdGhleSB0b3VjaD8gKEFyZSBhbnkgb2YgdGhlIHBvaW50cyBlcXVhbD8pXG5cdFx0aWYgKGVxdWFsUG9pbnRzKHAsIHEpIHx8IGVxdWFsUG9pbnRzKHAsIHEyKSB8fCBlcXVhbFBvaW50cyhwMiwgcSkgfHwgZXF1YWxQb2ludHMocDIsIHEyKSkge1xuXHRcdFx0cmV0dXJuIHtcbiAgICAgICAgaW50ZXJzZWN0OiB0cnVlLFxuICAgICAgICBraXNzOiAhaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsocCwgcDIsIHEsIHEyKVxuICAgICAgfTtcblxuXHRcdH1cblx0XHQvLyBEbyB0aGV5IG92ZXJsYXA/IChBcmUgYWxsIHRoZSBwb2ludCBkaWZmZXJlbmNlcyBpbiBlaXRoZXIgZGlyZWN0aW9uIHRoZSBzYW1lIHNpZ24pXG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIlBvaW50cyBET05UIHRvdWNoXCIpO1xuXG5cdFx0cmV0dXJuIHtcbiAgICAgIGludGVyc2VjdDpcbiAgICAgICAgICAgICFhbGxFcXVhbChcbiAgICAgIFx0XHRcdFx0KHEueCAtIHAueCA8IDApLFxuICAgICAgXHRcdFx0XHQocS54IC0gcDIueCA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueCAtIHAueCA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueCAtIHAyLnggPCAwKSkgfHxcbiAgICAgIFx0XHRcdCFhbGxFcXVhbChcbiAgICAgIFx0XHRcdFx0KHEueSAtIHAueSA8IDApLFxuICAgICAgXHRcdFx0XHQocS55IC0gcDIueSA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueSAtIHAueSA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueSAtIHAyLnkgPCAwKSksXG4gICAgICAgIGtpc3M6IGZhbHNlXG4gICAgICB9O1xuXG5cdH1cblxuXHRpZiAoZGVub21pbmF0b3IgPT0gMCkge1xuXHRcdC8vIGxpbmVzIGFyZSBwYXJhbGVsbFxuXHRcdHJldHVybiB7aW50ZXJzZWN0OiBmYWxzZSwga2lzczogZmFsc2V9O1xuXHR9XG5cblx0dmFyIHUgPSB1TnVtZXJhdG9yIC8gZGVub21pbmF0b3I7XG5cdHZhciB0ID0gY3Jvc3NQcm9kdWN0KHN1YnRyYWN0UG9pbnRzKHEsIHApLCBzKSAvIGRlbm9taW5hdG9yO1xuXG4gIC8vIGNvbnNvbGUubG9nKGB0PSR7dH0sIHU9JHt1fWApO1xuICB2YXIga2lzcyA9IGZhbHNlO1xuXG4gIGlmIChlcXVhbFBvaW50cyhwLCBxKSB8fCBlcXVhbFBvaW50cyhwLCBxMikgfHwgZXF1YWxQb2ludHMocDIsIHEpIHx8IGVxdWFsUG9pbnRzKHAyLCBxMikpXG4gICAga2lzcyA9IHRydWU7XG5cbiAgLy8gbGV0IHJlcyA9XG4gIC8vcmV0dXJuXG4gIHJldHVybiB7XG4gICAgaW50ZXJzZWN0OiAodCA+PSAwKSAmJiAodCA8PSAxKSAmJiAodSA+PSAwKSAmJiAodSA8PSAxKSxcbiAgICBraXNzOiBraXNzXG4gIH07XG5cbiAgLy8gY29uc29sZS5sb2coYCR7ZGVidWdfc3RyaW5nfSA9ICR7cmVzfWApO1xuXG5cdC8vIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHRoZSB0d28gcG9pbnRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiB0aGUgY3Jvc3MgcHJvZHVjdCByZXN1bHQgYXMgYSBmbG9hdFxuICovXG5mdW5jdGlvbiBjcm9zc1Byb2R1Y3QocG9pbnQxLCBwb2ludDIpIHtcblxuICBpZiAoQXJyYXkuaXNBcnJheShwb2ludDEpKVxuICAgIHJldHVybiBwb2ludDFbMF0gKiBwb2ludDJbMV0gLSBwb2ludDFbMV0gKiBwb2ludDJbMF07XG4gIGVsc2Vcblx0ICAgcmV0dXJuIHBvaW50MS54ICogcG9pbnQyLnkgLSBwb2ludDEueSAqIHBvaW50Mi54O1xufVxuXG4vKipcbiAqIFN1YnRyYWN0IHRoZSBzZWNvbmQgcG9pbnQgZnJvbSB0aGUgZmlyc3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIHRoZSBzdWJ0cmFjdGlvbiByZXN1bHQgYXMgYSBwb2ludCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gc3VidHJhY3RQb2ludHMocG9pbnQxLCBwb2ludDIpIHtcblxuICBpZiAoQXJyYXkuaXNBcnJheShwb2ludDEpKVxuICB7XG4gICAgcmV0dXJuIFsgcG9pbnQxWzBdIC0gcG9pbnQyWzBdLCBwb2ludDFbMV0gLSBwb2ludDJbMV0gXTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgcmVzdWx0LnggPSBwb2ludDEueCAtIHBvaW50Mi54O1xuICAgIHJlc3VsdC55ID0gcG9pbnQxLnkgLSBwb2ludDIueTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTZWUgaWYgdGhlIHBvaW50cyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIGlmIHRoZSBwb2ludHMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGVxdWFsUG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XG5cdHJldHVybiAocG9pbnQxLnggPT0gcG9pbnQyLngpICYmIChwb2ludDEueSA9PSBwb2ludDIueSlcbn1cblxuLyoqXG4gKiBTZWUgaWYgYWxsIGFyZ3VtZW50cyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHsuLi59IGFyZ3MgYXJndW1lbnRzIHRoYXQgd2lsbCBiZSBjb21wYXJlZCBieSAnPT0nLlxuICpcbiAqIEByZXR1cm4gaWYgYWxsIGFyZ3VtZW50cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gYWxsRXF1YWwoYXJncykge1xuXHR2YXIgZmlyc3RWYWx1ZSA9IGFyZ3VtZW50c1swXSxcblx0XHRpO1xuXHRmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKGFyZ3VtZW50c1tpXSAhPSBmaXJzdFZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0cnVlO1xufVxuXG5cblxuZXhwb3J0IHtTcXVhcmUsIFRyaWFuZ2xlLCBpbnRlcnNlY3RzLCByb3RhdGUsIHRyYW5zbGF0ZSwgcG9pbnRfaW5fcG9seWdvbn0gO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1V0aWwuanMiLCJcbmltcG9ydCBTY2VuZSAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1NjZW5lJztcbmltcG9ydCBSZW5kZXJlciAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCB7U3F1YXJlLCByb3RhdGUsIHRyYW5zbGF0ZX0gICAgICBmcm9tICcuL1V0aWwnO1xuaW1wb3J0IHtwb2ludF9pbl9wb2x5Z29uLCBUcmlhbmdsZX0gICAgIGZyb20gJy4vVXRpbCc7XG5cbmNvbnN0IGVsZW1lbnQgPSAnZGlzcGxheSc7XG5cbmxldCByZW5kZXJlciA9IG5ldyBSZW5kZXJlcihlbGVtZW50KTtcbmxldCBzY2VuZSA9IG5ldyBTY2VuZSgpO1xubGV0IGluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5mb1RleHQnKTtcblxuLy8gU2hvdy9oaWRlIHRoZSBzY2VuZSBncmFwaFxubGV0IHNob3dHcmFwaCA9IHRydWUsIHNob3dPYnN0YWNsZXMgPSB0cnVlO1xuXG4vLyBTdGFydCBwb2ludCwgZ29hbCBhbmQgbGFzdGtub3duIG1vdXNlIGNvb3Jkc1xubGV0IHN0YXJ0ID0gWzEwLCAxMF07XG5sZXQgZW5kID0gWzIyMCwgMTIwXTtcbmxldCBteCA9IGVuZFswXSwgbXkgPSBlbmRbMV07XG5cbi8vIEZvciB0aGUgc2hhcGUgYW5pbWF0aW9uc1xubGV0IHJvdHggPSAzMDAsIHJvdHkgPSAzNTAsIHJvdGEgPSAwO1xubGV0IG1vdGlvbiA9IDA7XG5cbi8vIENyZWF0ZSBzb21lIGR5bmFtaWMgb2JzdGFjbGVzXG5sZXQgc3Ffc21hbGwgPSBTcXVhcmUoNjUwLCAxMDAsIDE1MCk7XG5sZXQgc3FfbGFyZ2UgPSBTcXVhcmUocm90eCwgcm90eSwgMzAwKTtcblxubGV0IG9ic3RhY2xlcyA9IFtcbiAgU3F1YXJlKDgwLCAxMjAsIDEwMCksXG4gIHNxX3NtYWxsLFxuICBzcV9sYXJnZVxuXTtcblxuLy8gQWRkIHRoZW0gYWxsIHRvIHRoZSBzY2VuZVxuZm9yIChsZXQgbyBvZiBvYnN0YWNsZXMpXG4gIHNjZW5lLmFkZCggbyApO1xuXG5cblxuZnJhbWUoKTtcblxuZnVuY3Rpb24gZnJhbWUoKVxue1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGZyYW1lICk7XG5cbiAgaGlkZV9pbmZvKCk7XG5cbiAgbGV0IGluc2lkZSA9IGRvZGdlX251bGxzcGFjZSgpO1xuXG4gIC8vIEZpbmQgdGhlIHNob3J0ZXN0IHBhdGguIFR3byB0aGluZ3MgaGFwcGVuIGhlcmU6XG4gIC8vICAgIDEuIEEgU2NlbmUgZ3JhcGggaXMgZXh0cmFjdGVkIGZyb20gb3VyIHNjZW5lIGdlb21ldHJ5XG4gIC8vICAgIDIuIERpamtzdHJhJ3MgbWV0aG9kIGlzIHVzZWQgdG8gZmluZCB0aGUgb3B0aW1hbCByb3V0ZSBhY3Jvc3MgdGhlIGdyYXBoXG4gIGxldCByb3V0ZSA9IHNjZW5lLnNvbHZlKCBzdGFydCwgZW5kICk7XG5cbiAgLy8gR2V0IGEgdmlzdWFsaXNhdGlvbiBvZiB0aGUgYWN0dWFsIHNjZW5lZ3JhcGhcbiAgbGV0IHZpcyA9IHNjZW5lLnZpcygpO1xuXG4gIHJlbmRlcmVyLmNsZWFyKCk7XG5cbiAgaWYgKHNob3dHcmFwaClcbiAge1xuICAgIC8vIERyYXcgdGhlIHNjZW5lIGdyYXBoIG5vZGVzXG4gICAgZm9yIChsZXQgbiBvZiB2aXMubm9kZXMpXG4gICAgICByZW5kZXJlci5yZW5kZXIoIG4sICcjYmJiJywgNSApO1xuXG4gICAgLy8gRHJhdyB0aGUgZ3JhcGggZWRnZXNcbiAgICByZW5kZXJlci5yZW5kZXIoIHZpcy5lZGdlcywgJyNlZWUnICk7XG4gIH1cblxuICAvLyBSZW5kZXIgdGhlIG9yaWdpbmFsIHNjZW5lIGdlb21ldHJ5IG9uIHRvcCBvZiB0aGUgZ3JhcGhcbiAgaWYgKHNob3dPYnN0YWNsZXMpXG4gIHtcbiAgICByZW5kZXJlci5yZW5kZXIoIHN0YXJ0LCAnIzBhMCcsIDYgKTtcbiAgICByZW5kZXJlci5yZW5kZXIoIGVuZCwgJyMwYTAnLCA2ICk7XG4gICAgcmVuZGVyZXIucmVuZGVyKCBzY2VuZS5vYmplY3RzLCAnIzMzMycgKTtcbiAgfVxuXG4gIC8vIFVzZXIgaGFzIG1vdmVkIHRoZSBtb3VzZSBpbnNpZGUgYSBzaGFwZSBvYnN0YWNsZSB3aGljaCBpbnZhbGlkYXRlcyB0aGUgZ3JhcGhcbiAgaWYgKGluc2lkZSA+PSAwKVxuICB7XG4gICAgc2hvd19pbmZvKFwiRW5kIHBvaW50IGluc2lkZSBzb2xpZCBvYmplY3QhXCIpXG4gICAgcmVuZGVyZXIucmVuZGVyKCBbc2NlbmUub2JqZWN0c1tpbnNpZGVdXSwgJyNmMDAnLCA1ICk7XG4gIH1cblxuICAvLyBOb3cgZGlzcGxheSB0aGUgZm91bmQgcm91dGUhXG4gIHJlbmRlcmVyLnJlbmRlciggW3JvdXRlXSwgJyMwMGYnLCAzICk7XG5cbiAgLy8gQW5pbWF0aW9uXG4gIG1vdGlvbiArPSAwLjA1OyAvLyBTaW51c29pZGFsXG4gIHRyYW5zbGF0ZShzcV9zbWFsbCwgMCwgMyAqIE1hdGguc2luKG1vdGlvbiAqIDAuMjUgKiBNYXRoLlBJKSk7XG5cbiAgLy8gcm90YXRlIHRoZSBiaWcgc3F1YXJlXG4gIGlmIChzaG93T2JzdGFjbGVzKVxuICAgIHJvdGF0ZShzcV9sYXJnZSwgcm90eCwgcm90eSwgMC4wMDUpO1xuXG59XG5cbi8vIFNhdmUgdGhlIGxhc3Qga25vd24gbW91c2UgcG9zaXRpb25cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpLm9ubW91c2Vtb3ZlID0gZSA9PiB7IG14ID0gZS5jbGllbnRYOyBteSA9IGUuY2xpZW50WTsgIH1cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYl9kZWJ1ZycpLm9uY2xpY2sgPSAoZSwgYykgPT4geyBzaG93R3JhcGggPSBlLnNyY0VsZW1lbnQuY2hlY2tlZDsgfVxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NiX2RlYnVnMicpLm9uY2xpY2sgPSAoZSwgYykgPT4geyBzaG93T2JzdGFjbGVzID0gZS5zcmNFbGVtZW50LmNoZWNrZWQ7IH1cblxuZnVuY3Rpb24gc2hvd19pbmZvKHRleHQpIHsgaW5mby5pbm5lckhUTUwgPSB0ZXh0OyBpbmZvLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyB9XG5mdW5jdGlvbiBoaWRlX2luZm8oKSB7IGluZm8uc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfVxuXG4vLyBUaGlzIHByZXZlbnRzIGEgYml0IG9mIGEgbWVzcyBmcm9tIGhhcHBlbmluZ1xuLy8gd2hlbiB0aGUgbW91c2UgY3Vyc29yIGRyaWZ0cyAqaW5zaWRlKiBhIHN1cHBvc2VkbHkgc29saWQgc2hhcGVcbmZ1bmN0aW9uIGRvZGdlX251bGxzcGFjZSgpXG57XG4gIC8vIE91ciB0ZW50YXRpdmUgbmV3IGNvb3JkaW5hdGUgKGxhc3Qga25vd24gbW91c2UgcG9zKVxuICBsZXQgYyA9IFtteCwgbXldO1xuXG4gIC8vIENoZWNrIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIGVhY2ggb2Ygb3VyIHNvbGlkIHNoYXBlc1xuICBmb3IgKGxldCBpIGluIG9ic3RhY2xlcylcbiAge1xuICAgIGxldCBvID0gb2JzdGFjbGVzW2k+PjBdO1xuICAgIC8vIE9oIG5vIVxuICAgIGlmIChwb2ludF9pbl9wb2x5Z29uKGMsIG8pKSAgLy8gc2ltcGxlIGNvbnZleC1vbmx5IHRlc3RcbiAgICB7XG4gICAgICAvLyBTZXQgdGhlIGVuZHBvaW50IHRvIHRoZSBzdGFydCB0byByZW1vdmUgdGhlIHJlZCBsaW5lIGFuZCBjdXJzb3JcbiAgICAgIGVuZCA9IHN0YXJ0O1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIC8vIEFsbCBnb29kLCBzZXQgdGhlIGVuZHBvaW50IHRvIHRoZSBsYXN0IGtub3duIG1vdXNlIHBvc1xuICBlbmQgPSBjO1xuICByZXR1cm4gLTE7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuaW1wb3J0IEdyYXBoICAgICAgICAgIGZyb20gJy4vR3JhcGgnO1xuaW1wb3J0IHtpbnRlcnNlY3RzfSAgIGZyb20gJy4vVXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHRoaXMub2JqZWN0cyA9IFtdO1xuICAgIHRoaXMuZ3JhcGggPSBudWxsO1xuXG4gICAgLy8gVGhpcyBpcyBqdXN0IGZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICB0aGlzLl92aXMgPSBudWxsO1xuICB9XG5cbiAgYWRkKG9iamVjdClcbiAge1xuICAgIHRoaXMub2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gIH1cblxuICBzb2x2ZShzdGFydCwgZW5kKVxuICB7XG4gICAgdGhpcy5ncmFwaCA9IHRoaXMuX2dyYXBoKHN0YXJ0LCBlbmQpO1xuICAgIGxldCBub2RlcyA9IHRoaXMuZ3JhcGguc2hvcnRlc3QoMCwgMSk7IC8vIFswXSBzdGFydCwgWzFdIGVuZCAoc2VlIC5ncmFwaCgpKVxuXG4gICAgbGV0IHJvdXRlID0gW107XG4gICAgXG4gICAgZm9yIChsZXQgbiBvZiBub2RlcylcbiAgICAgIHJvdXRlLnB1c2godGhpcy5fdmlzLm5vZGVzWyBuIF0pO1xuXG4gICAgcmV0dXJuIHJvdXRlO1xuICB9XG5cbiAgdmlzKClcbiAge1xuICAgIHJldHVybiB0aGlzLl92aXM7XG4gIH1cblxuICAvLyBFeHRyYWN0IGEgc2NlbmVncmFwaCBmcm9tIG91ciBjb250aW51b3VzIGV1Y2xpZGVhbiBnZW9tZXRyeVxuICBfZ3JhcGgoc3RhcnQsIGVuZClcbiAge1xuICAgIGxldCBub2RlcyA9IFtdO1xuICAgIGxldCBlZGdlcyA9IFtdO1xuXG4gICAgbGV0IGcgPSBuZXcgR3JhcGgoKTtcblxuICAgIC8vIEZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICB0aGlzLl92aXMgPSB7IG5vZGVzOiBbXSwgZWRnZXM6IFtdIH07XG5cbiAgICAvLyBUaGlzIGlzIGp1c3QgYSB0ZW1wIHZhbHVlIHVzZWQgdG8gbWFrZSBzdXJlIHNoYXBlcyBkb24ndCBwZXJmb3JtXG4gICAgLy8gaW50ZXJzZWN0aW9uIHRlc3RzIG9uIHRoZW1zZWx2ZXMgKHRoZWlyIG93biB2ZXJ0aWNlcywgY3Jvc3NpbmcgaW50ZXJuYWxseSlcbiAgICBsZXQgc2hhcGVfaWQgPSAxO1xuXG4gICAgLy8gVGhlc2UgZmlyc3QgdHdvIG5vZGVzIGluIHRoZSBncmFwaCBhcmUgYSBzcGVjaWFsIGNhc2VcbiAgICBub2Rlcy5wdXNoKCB7dmVydGV4OiBzdGFydCwgIHNoYXBlOiBzaGFwZV9pZCsrfSApOyAvLyBbMF0gc3RhcnQgKHNlZSAuc29sdmUoKSlcbiAgICBub2Rlcy5wdXNoKCB7dmVydGV4OiBlbmQsICAgIHNoYXBlOiBzaGFwZV9pZCsrfSApOyAvLyBbMV0gZW5kXG5cbiAgICBsZXQgZ2VkZ2VzID0gW107XG5cbiAgICAvLyBleHRyYWN0IGVhY2ggb2JzdGFjbGUncyBlZGdlcyBhbmQgbm9kZXNcbiAgICBmb3IgKGxldCBvIG9mIHRoaXMub2JqZWN0cylcbiAgICB7XG4gICAgICBzaGFwZV9pZCsrO1xuXG4gICAgICBsZXQgZTtcbiAgICAgIGxldCBiYXNlID0gbm9kZXMubGVuZ3RoO1xuICAgICAgZm9yIChlPTA7IGU8by5sZW5ndGgtMTsgZSsrKVxuICAgICAge1xuXG4gICAgICAgIGxldCB2MSA9IGJhc2UgKyBlO1xuICAgICAgICAvLyBGZnMgYWxhbiB3aGF0IGEgbWVzcyAobi5iLiBpdCB0b29rIDMwIG1pbnMgb2YgZGVidWdnaW5nIHRvIGdldCB0aGlzIGxpbmUgYmVsb3cgY29ycmVjdClcbiAgICAgICAgLy8gaXQgd2FzIG9yaWdpbmFsbHkgKGJhc2UgKyBlICsgMSkgJSAoby5sZW5ndGgtMSkpIHdoaWNoIGlzIHF1aXRlIGRpZmZlcmVudC5cbiAgICAgICAgLy8gSSB0aG91Z2h0IHRoaXMgd2FzIGdvaW5nIHRvIGJlIHN1Y2ggYSBkaWZmaWN1bHQgYnVnIHRvIGZpeCwgSSBuZWFybHkgZGlkbid0IGJvdGhlciB0cnlpbmcuXG4gICAgICAgIC8vIHRiaCwgdGhlc2Ugbm9kZS9lZGdlIHN0cnVjdHVyZXMgbmVlZCBhIHNlcmlvdXMgcmVmYWN0b3JpbmcgaWYgZXZlciB0aGlzIHByb2dyYW0gaXMgZXhwYW5kZWQhISFcbiAgICAgICAgbGV0IHYyID0gYmFzZSArICgoZSArIDEpICUgKG8ubGVuZ3RoLTEpKTtcblxuICAgICAgICBnZWRnZXMucHVzaCh7XG4gICAgICAgICAgaW5kZXg6W3YxLCB2Ml0sXG4gICAgICAgICAgdmVydGV4OiBbb1tlXSwgb1tlKzFdXVxuICAgICAgICB9KTtcblxuICAgICAgICBlZGdlcy5wdXNoKFtvW2VdLCBvW2UrMV1dKTtcblxuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB2ZXJ0ZXg6IG9bZV0sXG4gICAgICAgICAgc2hhcGU6IHNoYXBlX2lkXG4gICAgICAgIH0pO1xuXG4gICAgICB9XG5cbiAgICAgIC8vIHRoaXMgaXNuJ3QgYSBjbG9zZWQgcmluZyAobWF0Y2hpbmcgc3RhcnQgYW5kIGVuZHApXG4gICAgICAvLyBpLmUuIGEgc3RyYWlnaHQgbGluZS5cbiAgICAgIC8vIExhdGVyOiBJbiBoaW5kc2lnaHQsIEkgc2hvdWxkbid0IGhhdmUgYm90aGVyZWQgdHJ5aW5nIHRvXG4gICAgICAvLyBzdXBwb3J0IGVzc2VudGlhbGx5IGRpbWVuc2lvbmxlc3MgZW50aXRpZXMgbGlrZSBhIHR3by1zaWRlZCBzdHJhaWdodCBsaW5lIGluIDJkIHNwYWNlLlxuICAgICAgLy8gZXZlcnl0aGluZyBzaG91bGQgYmUgYSBjbG9zZWQgcmluZywgZXZlbiBpZiBpdCdzIGluaW5pdGVseSBzbWFsbC5cbiAgICAgIGlmICghZXF1YWxzKG9bMF0sIG9bZV0pKVxuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB2ZXJ0ZXg6IG9bZV0sXG4gICAgICAgICAgc2hhcGU6IHNoYXBlX2lkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCBgbm9kZXNgIGluZGljZXMgdG8gZ3JhcGhcbiAgICBmb3IgKGxldCBpIGluIG5vZGVzKVxuICAgIHtcbiAgICAgIGcuYWRkdmVydGV4KE51bWJlcihpKSk7XG5cbiAgICAgIC8vIEZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICAgIHRoaXMuX3Zpcy5ub2Rlcy5wdXNoKG5vZGVzW051bWJlcihpKV0udmVydGV4KTtcbiAgICB9XG5cbiAgICAvL1RPRE86IHJlZmFjdG9yIHRoZSBub2RlL2VkZ2UgZGF0YSBzdHJ1Y3QgbWVzc1xuICAgIGZvciAobGV0IGdlIG9mIGdlZGdlcylcbiAgICB7XG4gICAgICBnLmFkZGVkZ2UoZ2UuaW5kZXhbMF0sIGdlLmluZGV4WzFdLCBjb3N0KGdlLnZlcnRleFswXSwgZ2UudmVydGV4WzFdKSk7XG4gICAgICB0aGlzLl92aXMuZWRnZXMucHVzaChbZ2UudmVydGV4WzBdLCBnZS52ZXJ0ZXhbMV1dKTtcbiAgICB9XG5cbiAgICBsZXQgbmU9MDtcblxuICAgIGZvciAobGV0IHg9MDsgeDxub2Rlcy5sZW5ndGgtMTsgeCsrKVxuICAgICAgZm9yIChsZXQgeT14KzE7IHk8bm9kZXMubGVuZ3RoOyB5KyspXG4gICAgICB7XG4gICAgICAgICAgbGV0IEEgPSBub2Rlc1t4XTtcbiAgICAgICAgICBsZXQgQiA9IG5vZGVzW3ldO1xuXG4gICAgICAgICAgLy8gV2UncmUgdGVzdGluZyB0aGUgc2hhcGUncyB2ZXJ0aWNlcyBhZ2FpbnN0IGl0c2VsZlxuICAgICAgICAgIC8vIHdoaWNoIGxlYWRzIHRvIGludGVybmFsIHBhdGhzIGluc2lkZSB0aGUgc2hhcGUgKGludmFsaWQhKVxuICAgICAgICAgIGlmIChBLnNoYXBlID09IEIuc2hhcGUpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgbGV0IHRlc3RlZGdlID0gW0EudmVydGV4LCBCLnZlcnRleF07XG5cbiAgICAgICAgICBpZiAoZWRnZXZpc2liaWx0eSh0ZXN0ZWRnZSwgZWRnZXMpKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGcuYWRkZWRnZSh4LCB5LCBjb3N0KEEudmVydGV4LCBCLnZlcnRleCkpO1xuXG4gICAgICAgICAgICAvLyBKdXN0IGZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGgsIG5vbi1lc3NlbnRpYWw6XG4gICAgICAgICAgICB0aGlzLl92aXMuZWRnZXMucHVzaChbQS52ZXJ0ZXgsIEIudmVydGV4XSk7XG4gICAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICByZXR1cm4gZztcbiAgfVxuXG59XG5cblxuXG5mdW5jdGlvbiBjb3N0KGEsIGIpXG57XG4gIGxldCBkeCA9IGJbMF0gLSBhWzBdIC8vIHgyIC0geDFcbiAgbGV0IGR5ID0gYlsxXSAtIGFbMV07XG4gIHJldHVybiBNYXRoLnNxcnQoIGR4KmR4ICsgZHkqZHkgKTtcblxufVxuXG5mdW5jdGlvbiBlZGdldmlzaWJpbHR5KHRlc3RlZGdlLCBlZGdlcylcbntcbiAgLy8gY29uc29sZS5sb2coYFRlc3RpbmcgZWRnZTogJHt0ZXN0ZWRnZVswXX0sICR7dGVzdGVkZ2VbMV19YCk7XG5cbiAgZm9yIChsZXQgdD0wOyB0PGVkZ2VzLmxlbmd0aDsgdCsrKVxuICB7XG4gICAgbGV0IGUgPSBlZGdlc1t0XTtcblxuICAgIGxldCByZXMgPSBpbnRlcnNlY3RzKHRlc3RlZGdlWzBdLCB0ZXN0ZWRnZVsxXSwgZVswXSwgZVsxXSk7XG5cbiAgICAvLyBJZiBpbnRlcnNlY3Rpb24sIGNoZWNrIGl0J3Mgbm90IGp1c3QgdGhlIGVuZHBvaW50cyBraXNzaW5nIHdoaWNoIGlzIG9rXG4gICAgLy8gaW4gZmFjdCwgaXQncyBtb3JlIHRoYW4gJ29rJyAtIGl0J3MgZXhhY3RseSB3aGF0IHdlJ3JlIGxvb2tpbmcgZm9yXG4gICAgaWYgKHJlcy5pbnRlcnNlY3QgJiYgIXJlcy5raXNzKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5mdW5jdGlvbiBlcXVhbHMoYSwgYilcbntcbiAgcmV0dXJuIChhWzBdID09IGJbMF0gJiYgYVsxXSA9PSBiWzFdKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TY2VuZS5qcyIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcyA9IFtdO1xuICAgIHRoaXMuZWRnZXMgPSBbXTtcbiAgICB0aGlzLm51bWVkZ2VzID0gMDtcbiAgfVxuXG4gIGFkZHZlcnRleChuKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcy5wdXNoKG4pO1xuICAgIHRoaXMuZWRnZXNbbl0gPSBbXTtcbiAgfVxuXG4gIC8vIGFkamFjZW55IGVkZ2UgbGlzdFxuICBhZGRlZGdlKHYxLCB2MiwgY29zdClcbiAge1xuICAgIHRoaXMuZWRnZXNbdjFdLnB1c2goe2Rlc3Q6djIsIGNvc3R9KTtcbiAgICB0aGlzLmVkZ2VzW3YyXS5wdXNoKHtkZXN0OnYxLCBjb3N0fSk7XG5cbiAgICB0aGlzLm51bWVkZ2VzKys7XG4gIH1cblxuICAvLyBTdXBlciBiYXNpYyBpbXBsZW1lbnRhdGlvbiBvZiBEaWprc3RyYSdzIGFsZ29yaXRobVxuICAvLyBEaXJlY3RseSBmcm9tIHRoaXMgcmVjaXBlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EaWprc3RyYSUyN3NfYWxnb3JpdGhtI0FsZ29yaXRobVxuICBzaG9ydGVzdChzdGFydCwgZW5kKVxuICB7XG4gICAgbGV0IGN1cnJlbnRfbm9kZTtcbiAgICBsZXQgZGlzdCA9IFswXTtcbiAgICBsZXQgcHJldiA9IFtdO1xuICAgIGxldCB1bnZpc2l0ZWQgPSBbXTtcblxuICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnZlcnRpY2VzLmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgIGlmIChpKSBkaXN0W2ldID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgIHVudmlzaXRlZFtpXSA9IGk7XG4gICAgICBwcmV2W2ldID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyAnVmlzaXQnIGVhY2ggbm9kZSBvbmx5IG9uY2UsIGluIHR1cm5cbiAgICB3aGlsZSggKGN1cnJlbnRfbm9kZSA9IHVudmlzaXRlZC5zaGlmdCgpKSAhPSBudWxsIClcbiAgICB7XG4gICAgICAvLyBGb3IgZWFjaCBub2RlLCAnY2hlY2snIGl0cyBuZWlnaGJvdXJzLlxuICAgICAgLy8gV2hpbGUgd2Ugb25seSAndmlzaXQnIGVhY2ggbm9kZSBvbmNlLCBpdCdzIHRoaXMgcmVwZWF0ZWQgJ2NoZWNrJ2luZ1xuICAgICAgLy8gKGFuZCBvY2Nhc2lvbmFsIHJlY2FsY3VsYXRpbmcpIG9mIG5laWdoYm91cnMgdGhhdCBhbGxvd3MgdXMgdG8gZmluZFxuICAgICAgLy8gdGhlIHNob3J0ZXN0IHJvdXRlIHRocm91Z2ggdGhlIGdyYXBoIGZyb20gb3VyIHN0YXJ0IHBvaW50LlxuICAgICAgLy8gSW4gZmFjdCwgdGhlIGluaGVyZW50IHJlc3VsdCBvZiB0aGUgYWxnbyBpcyB0aGF0IHdlIGZpbmQgdGhlIHNob3J0ZXN0XG4gICAgICAvLyBwYXRoIHRvICpldmVyeSogcG9pbnQgaW4gdGhlIGdyYXBoXG4gICAgICBmb3IgKGxldCB0PTA7IHQ8dGhpcy5lZGdlc1tjdXJyZW50X25vZGVdLmxlbmd0aDsgdCsrKVxuICAgICAge1xuICAgICAgICAvLyB2ZXJ0ZXgvbm9kZSBJRFxuICAgICAgICBsZXQgbmVpZ2hib3VyID0gdGhpcy5lZGdlc1tjdXJyZW50X25vZGVdW3RdLmRlc3Q7XG5cbiAgICAgICAgLy8gRGlzdGFuY2UgZnJvbSBjdXJyZW50X25vZGUgdG8gbmVpZ2hib3VyXG4gICAgICAgIGxldCBjb3N0ID0gdGhpcy5lZGdlc1tjdXJyZW50X25vZGVdW3RdLmNvc3Q7XG5cbiAgICAgICAgLy8gRGlzdGFuY2UgdGh1cyBmYXIgb24gdGhpcyByb3V0ZSAodXAgdG8gY3VycmVudF9ub2RlKSArIGRpc3RhbmNlIHRvIG5laWdoYm91clxuICAgICAgICBsZXQgdGVudGF0aXZlX2Rpc3QgPSBkaXN0W2N1cnJlbnRfbm9kZV0gKyBjb3N0O1xuXG4gICAgICAgIC8vIEhhdmUgd2UgZm91bmQgYSBzaG9ydGVyIHBhdGg/XG4gICAgICAgIGlmICh0ZW50YXRpdmVfZGlzdCA8IGRpc3RbbmVpZ2hib3VyXSlcbiAgICAgICAge1xuICAgICAgICAgIGRpc3RbbmVpZ2hib3VyXSA9IHRlbnRhdGl2ZV9kaXN0OyAvLyBOZXcgZGlzdGFuY2UgdG8gdGhpcyBub2RlXG4gICAgICAgICAgcHJldltuZWlnaGJvdXJdID0gY3VycmVudF9ub2RlOyAgIC8vIFVwZGF0ZSB0aGUgcm91dGVcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGMgPSBlbmQsIHNlcSA9W2VuZF07XG5cbiAgICAvLyBmYWlsZWQgZm9yIHNvbWUgcmVhc29uLCBlLmcuIGltcG9zc2libGUgcG9pbnQgaW5zaWRlIG51bGxzcGFjZSBldGNcbiAgICBpZiAocHJldltjXSA9PSBudWxsKVxuICAgICAgcmV0dXJuIFtdO1xuXG4gICAgZG8ge1xuICAgICAgYyA9IHByZXZbY107XG4gICAgICBzZXEucHVzaChjKTtcbiAgICB9IHdoaWxlKGMgIT0gc3RhcnQpO1xuXG4gICAgcmV0dXJuIHNlcS5yZXZlcnNlKCk7XG5cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvR3JhcGguanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXJcbntcbiAgY29uc3RydWN0b3IoZWxlbWVudClcbiAge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICB9XG5cbiAgY2xlYXIoKVxuICB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgcmVuZGVyKG9iamVjdHMsIGNvbG91ciA9ICcjMDAwJywgd2lkdGggPSAyKVxuICB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdHMpKSByZXR1cm47XG5cbiAgICAvLyBwb2ludCB0eXBlXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdHNbMF0pKVxuICAgIHtcbiAgICAgIGNvbnN0IHAgPSBvYmplY3RzO1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LmFyYyhwWzBdPj4wLCBwWzFdPj4wLCB3aWR0aCwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvdXI7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgLy8gbGlzdCBvZiBzaGFwZXMgdHlwZVxuXG4gICAgICBmb3IgKGxldCBvIG9mIG9iamVjdHMpXG4gICAgICB7XG4gICAgICAgIGZvciAobGV0IGU9MDsgZTxvLmxlbmd0aC0xOyBlKyspXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLl9saW5lKG9bZV0sIG9bZSsxXSwgY29sb3VyLCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgX2xpbmUoYSwgYiwgYywgdylcbiAge1xuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB3O1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGMgfHwgJ2JsYWNrJztcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhhWzBdPj4wLGFbMV0+PjApO1xuICAgIHRoaXMuY29udGV4dC5saW5lVG8oYlswXT4+MCxiWzFdPj4wKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlcmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==