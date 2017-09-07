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
    var inside = crossProduct(seg, pt) <= 0;
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
  // AM: Note to developers, using named properties for vectors is retarded. thanks.
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

// Show/hide the scene graph
var debug = true;

// Start point and our goal
var start = [10, 10];
var end = [380, 420];

// For the shape animations
var rotx = 300,
    roty = 400;
var motion = 0,
    rota = 0;

// Create some dynamic obstacles
var sq_small = (0, _Util.Square)(60, 100, 100);
var sq_large = (0, _Util.Square)(rotx, roty, 325);

console.log(sq_small);

// Some static
var others = [(0, _Util.Square)(50, 250, 50), (0, _Util.Square)(500, 100, 150), (0, _Util.Square)(620, 400, 100)];

// Add them to the scene
scene.add(sq_small);
scene.add(sq_large);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = others[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

        renderer.render(n, '#ddd', 5);
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

    renderer.render(vis.edges, '#ddd');
  }

  // Render the original scene geometry on top of the graph
  renderer.render(start, '#0a0', 6);
  renderer.render(end, '#08f', 6);
  renderer.render(scene.objects, '#333');

  // Now display the found route!
  renderer.render([route], '#f00', 3);

  // Animation
  motion += 0.05; // Sinusoidal
  (0, _Util.translate)(sq_small, 3 * Math.sin(motion * 0.25 * Math.PI), 0);

  // rotate the big square
  (0, _Util.rotate)(sq_large, rotx, roty, 0.005);
}

document.getElementById('cb_debug').onclick = function (e, c) {
  debug = e.srcElement.checked;
};

document.getElementById(element).onmousemove = function (e) {
  end = [e.clientX, e.clientY];
};

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

      var g = new _Graph2.default();

      // Add `nodes` indices to graph
      for (var i in nodes) {
        g.addvertex(Number(i));

        // For visualising the graph
        this._vis.nodes.push(nodes[Number(i)].vertex);
      }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTkwNGY0MjAyNWUzYTY2OWQ3OTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJyb3RhdGUiLCJzaGFwZSIsInJ4IiwicnkiLCJkYSIsInBhaXIiLCJyb3RhdGVfcG9pbnQiLCJ0cmFuc2xhdGUiLCJkeCIsImR5IiwiY3giLCJjeSIsImFuZ2xlIiwicCIsInMiLCJNYXRoIiwic2luIiwiYyIsImNvcyIsInhuZXciLCJ5bmV3IiwicG9pbnRfaW5fcG9seWdvbiIsInBvaW50IiwidmVydGljZXMiLCJpIiwibGVuZ3RoIiwiYSIsImIiLCJzZWciLCJzdWJ0cmFjdFBvaW50cyIsInB0IiwiaW5zaWRlIiwiY3Jvc3NQcm9kdWN0IiwiaW50ZXJzZWN0cyIsImFwIiwiYXAyIiwiYXEiLCJhcTIiLCJkb0xpbmVTZWdtZW50c0ludGVyc2VjdCIsImlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrIiwicDIiLCJxIiwicTIiLCJib3gxIiwieG1pbiIsIm1pbiIsInltaW4iLCJ4bWF4IiwibWF4IiwieW1heCIsImJveDIiLCJiYm94X2NvbnRhaW5lZCIsInIiLCJ1TnVtZXJhdG9yIiwiZGVub21pbmF0b3IiLCJlcXVhbFBvaW50cyIsImludGVyc2VjdCIsImtpc3MiLCJhbGxFcXVhbCIsInUiLCJ0IiwicG9pbnQxIiwicG9pbnQyIiwiQXJyYXkiLCJpc0FycmF5IiwicmVzdWx0IiwiYXJncyIsImZpcnN0VmFsdWUiLCJhcmd1bWVudHMiLCJlbGVtZW50IiwicmVuZGVyZXIiLCJzY2VuZSIsImRlYnVnIiwic3RhcnQiLCJlbmQiLCJyb3R4Iiwicm90eSIsIm1vdGlvbiIsInJvdGEiLCJzcV9zbWFsbCIsInNxX2xhcmdlIiwiY29uc29sZSIsImxvZyIsIm90aGVycyIsImFkZCIsIm8iLCJmcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInJvdXRlIiwic29sdmUiLCJ2aXMiLCJjbGVhciIsIm5vZGVzIiwibiIsInJlbmRlciIsImVkZ2VzIiwib2JqZWN0cyIsIlBJIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm9uY2xpY2siLCJlIiwic3JjRWxlbWVudCIsImNoZWNrZWQiLCJvbm1vdXNlbW92ZSIsImNsaWVudFgiLCJjbGllbnRZIiwiU2NlbmUiLCJncmFwaCIsIl92aXMiLCJvYmplY3QiLCJfZ3JhcGgiLCJzaG9ydGVzdCIsInNoYXBlX2lkIiwidmVydGV4IiwiZXF1YWxzIiwiZyIsImFkZHZlcnRleCIsIk51bWJlciIsIm5lIiwiQSIsIkIiLCJ0ZXN0ZWRnZSIsImVkZ2V2aXNpYmlsdHkiLCJhZGRlZGdlIiwiY29zdCIsInNxcnQiLCJyZXMiLCJHcmFwaCIsIm51bWVkZ2VzIiwidjEiLCJ2MiIsImRlc3QiLCJjdXJyZW50X25vZGUiLCJkaXN0IiwicHJldiIsInVudmlzaXRlZCIsIk1BWF9WQUxVRSIsInNoaWZ0IiwibmVpZ2hib3VyIiwidGVudGF0aXZlX2Rpc3QiLCJzZXEiLCJyZXZlcnNlIiwiUmVuZGVyZXIiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiY29sb3VyIiwiYmVnaW5QYXRoIiwiYXJjIiwiZmlsbFN0eWxlIiwiZmlsbCIsIl9saW5lIiwidyIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzNEQSxTQUFTQSxNQUFULENBQWdCQyxDQUFoQixFQUFtQkMsQ0FBbkIsRUFBc0JDLElBQXRCLEVBQ0E7QUFDRSxNQUFJQyxRQUFRRCxRQUFNLENBQWxCO0FBQ0EsTUFBSUUsS0FBSyxFQUFUO0FBQ0E7QUFDQTtBQUNBQSxLQUFHQyxJQUFILENBQVMsQ0FBQ0wsSUFBSUcsS0FBTCxFQUFZRixJQUFJRSxLQUFoQixDQUFUO0FBQ0E7QUFDQUMsS0FBR0MsSUFBSCxDQUFTLENBQUNMLElBQUlHLEtBQUwsRUFBWUYsSUFBSUUsS0FBaEIsQ0FBVDtBQUNBO0FBQ0FDLEtBQUdDLElBQUgsQ0FBUyxDQUFDTCxJQUFJRyxLQUFMLEVBQVlGLElBQUlFLEtBQWhCLENBQVQ7QUFDQTtBQUNBQyxLQUFHQyxJQUFILENBQVMsQ0FBQ0wsSUFBSUcsS0FBTCxFQUFZRixJQUFJRSxLQUFoQixDQUFUO0FBQ0E7QUFDQUMsS0FBR0MsSUFBSCxDQUFTLENBQUNMLElBQUlHLEtBQUwsRUFBWUYsSUFBSUUsS0FBaEIsQ0FBVDs7QUFFQSxTQUFPQyxFQUFQO0FBQ0Q7O0FBRUQsU0FBU0UsTUFBVCxDQUFnQkMsS0FBaEIsRUFBdUJDLEVBQXZCLEVBQTJCQyxFQUEzQixFQUErQkMsRUFBL0IsRUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNFLHlCQUFpQkgsS0FBakIsOEhBQ0E7QUFBQSxVQURTSSxJQUNUOztBQUNFQSxhQUFPQyxhQUFhSixFQUFiLEVBQWlCQyxFQUFqQixFQUFxQkMsRUFBckIsRUFBeUJDLElBQXpCLENBQVA7QUFDRDtBQUpIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQzs7QUFFRCxTQUFTRSxTQUFULENBQW1CTixLQUFuQixFQUEwQk8sRUFBMUIsRUFBOEJDLEVBQTlCLEVBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDRSwwQkFBaUJSLEtBQWpCLG1JQUNBO0FBQUEsVUFEU0ksSUFDVDs7QUFDRUEsV0FBSyxDQUFMLEtBQVdHLEVBQVg7QUFDQUgsV0FBSyxDQUFMLEtBQVdJLEVBQVg7QUFDRDtBQUxIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQzs7QUFFRCxTQUFTSCxZQUFULENBQXNCSSxFQUF0QixFQUEwQkMsRUFBMUIsRUFBOEJDLEtBQTlCLEVBQXFDQyxDQUFyQyxFQUNBO0FBQ0UsTUFBSUMsSUFBSUMsS0FBS0MsR0FBTCxDQUFTSixLQUFULENBQVI7QUFDQSxNQUFJSyxJQUFJRixLQUFLRyxHQUFMLENBQVNOLEtBQVQsQ0FBUjs7QUFFQTtBQUNBQyxJQUFFLENBQUYsS0FBUUgsRUFBUjtBQUNBRyxJQUFFLENBQUYsS0FBUUYsRUFBUjs7QUFFQTtBQUNBLE1BQUlRLE9BQU9OLEVBQUUsQ0FBRixJQUFPSSxDQUFQLEdBQVdKLEVBQUUsQ0FBRixJQUFPQyxDQUE3QjtBQUNBLE1BQUlNLE9BQU9QLEVBQUUsQ0FBRixJQUFPQyxDQUFQLEdBQVdELEVBQUUsQ0FBRixJQUFPSSxDQUE3Qjs7QUFFQTtBQUNBSixJQUFFLENBQUYsSUFBT00sT0FBT1QsRUFBZDtBQUNBRyxJQUFFLENBQUYsSUFBT08sT0FBT1QsRUFBZDs7QUFFQSxTQUFPRSxDQUFQO0FBQ0Q7O0FBR0QsU0FBU1EsZ0JBQVQsQ0FBMEJDLEtBQTFCLEVBQWlDQyxRQUFqQyxFQUNBO0FBQ0UsT0FBSyxJQUFJQyxJQUFFLENBQVgsRUFBY0EsSUFBRUQsU0FBU0UsTUFBVCxHQUFnQixDQUFoQyxFQUFtQ0QsR0FBbkMsRUFDQTtBQUNFLFFBQUlFLElBQUlILFNBQVNDLENBQVQsQ0FBUjtBQUNBLFFBQUlHLElBQUlKLFNBQVNDLElBQUUsQ0FBWCxDQUFSOztBQUVBLFFBQUlJLE1BQU1DLGVBQWVGLENBQWYsRUFBa0JELENBQWxCLENBQVY7QUFDQSxRQUFJSSxLQUFLRCxlQUFlUCxLQUFmLEVBQXNCSSxDQUF0QixDQUFUO0FBQ0EsUUFBSUssU0FBVUMsYUFBYUosR0FBYixFQUFrQkUsRUFBbEIsS0FBeUIsQ0FBdkM7QUFDQSxRQUFJLENBQUNDLE1BQUwsRUFBYSxPQUFPLEtBQVA7QUFDZDs7QUFFRCxTQUFPLElBQVA7QUFDRDs7QUFHRDs7OztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7QUFlQSxTQUFTRSxVQUFULENBQW9CQyxFQUFwQixFQUF3QkMsR0FBeEIsRUFBNkJDLEVBQTdCLEVBQWlDQyxHQUFqQyxFQUNBO0FBQ0U7QUFDQSxTQUFPQyx3QkFBeUIsRUFBQzVDLEdBQUd3QyxHQUFHLENBQUgsQ0FBSixFQUFXdkMsR0FBR3VDLEdBQUcsQ0FBSCxDQUFkLEVBQXpCLEVBQStDLEVBQUN4QyxHQUFHeUMsSUFBSSxDQUFKLENBQUosRUFBWXhDLEdBQUd3QyxJQUFJLENBQUosQ0FBZixFQUEvQyxFQUN5QixFQUFDekMsR0FBRzBDLEdBQUcsQ0FBSCxDQUFKLEVBQVd6QyxHQUFHeUMsR0FBRyxDQUFILENBQWQsRUFEekIsRUFDK0MsRUFBQzFDLEdBQUcyQyxJQUFJLENBQUosQ0FBSixFQUFZMUMsR0FBRzBDLElBQUksQ0FBSixDQUFmLEVBRC9DLENBQVA7QUFFRDs7QUFFRCxTQUFTRSwrQ0FBVCxDQUF5RDFCLENBQXpELEVBQTREMkIsRUFBNUQsRUFBZ0VDLENBQWhFLEVBQW1FQyxFQUFuRSxFQUNBO0FBQ0UsTUFBSUMsT0FBTztBQUNUQyxVQUFNN0IsS0FBSzhCLEdBQUwsQ0FBU2hDLEVBQUVuQixDQUFYLEVBQWM4QyxHQUFHOUMsQ0FBakIsQ0FERztBQUVUb0QsVUFBTS9CLEtBQUs4QixHQUFMLENBQVNoQyxFQUFFbEIsQ0FBWCxFQUFjNkMsR0FBRzdDLENBQWpCLENBRkc7QUFHVG9ELFVBQU1oQyxLQUFLaUMsR0FBTCxDQUFTbkMsRUFBRW5CLENBQVgsRUFBYzhDLEdBQUc5QyxDQUFqQixDQUhHO0FBSVR1RCxVQUFNbEMsS0FBS2lDLEdBQUwsQ0FBU25DLEVBQUVsQixDQUFYLEVBQWM2QyxHQUFHN0MsQ0FBakI7QUFKRyxHQUFYOztBQU9BLE1BQUl1RCxPQUFPO0FBQ1ROLFVBQU03QixLQUFLOEIsR0FBTCxDQUFTSixFQUFFL0MsQ0FBWCxFQUFjZ0QsR0FBR2hELENBQWpCLENBREc7QUFFVG9ELFVBQU0vQixLQUFLOEIsR0FBTCxDQUFTSixFQUFFOUMsQ0FBWCxFQUFjK0MsR0FBRy9DLENBQWpCLENBRkc7QUFHVG9ELFVBQU1oQyxLQUFLaUMsR0FBTCxDQUFTUCxFQUFFL0MsQ0FBWCxFQUFjZ0QsR0FBR2hELENBQWpCLENBSEc7QUFJVHVELFVBQU1sQyxLQUFLaUMsR0FBTCxDQUFTUCxFQUFFOUMsQ0FBWCxFQUFjK0MsR0FBRy9DLENBQWpCO0FBSkcsR0FBWDs7QUFPQSxTQUFPd0QsZUFBZVIsSUFBZixFQUFxQk8sSUFBckIsS0FBOEJDLGVBQWVELElBQWYsRUFBcUJQLElBQXJCLENBQXJDO0FBQ0Q7O0FBRUQsU0FBU1EsY0FBVCxDQUF3QnpCLENBQXhCLEVBQTJCQyxDQUEzQixFQUNBO0FBQ0U7QUFDQSxTQUFRQSxFQUFFaUIsSUFBRixJQUFVbEIsRUFBRWtCLElBQVosSUFBb0JqQixFQUFFb0IsSUFBRixJQUFVckIsRUFBRXFCLElBQWpDLElBQTJDcEIsRUFBRW1CLElBQUYsSUFBVXBCLEVBQUVvQixJQUFaLElBQW9CbkIsRUFBRXNCLElBQUYsSUFBVXZCLEVBQUV1QixJQUFsRjtBQUNEOztBQUdELFNBQVNYLHVCQUFULENBQWlDekIsQ0FBakMsRUFBb0MyQixFQUFwQyxFQUF3Q0MsQ0FBeEMsRUFBMkNDLEVBQTNDLEVBQ0E7QUFDRTs7QUFFRCxNQUFJVSxJQUFJdkIsZUFBZVcsRUFBZixFQUFtQjNCLENBQW5CLENBQVI7QUFDQSxNQUFJQyxJQUFJZSxlQUFlYSxFQUFmLEVBQW1CRCxDQUFuQixDQUFSOztBQUVBLE1BQUlZLGFBQWFyQixhQUFhSCxlQUFlWSxDQUFmLEVBQWtCNUIsQ0FBbEIsQ0FBYixFQUFtQ3VDLENBQW5DLENBQWpCO0FBQ0EsTUFBSUUsY0FBY3RCLGFBQWFvQixDQUFiLEVBQWdCdEMsQ0FBaEIsQ0FBbEI7O0FBRUEsTUFBSXVDLGNBQWMsQ0FBZCxJQUFtQkMsZUFBZSxDQUF0QyxFQUF5QztBQUN4Qzs7QUFFRTs7QUFFRjtBQUNBLFFBQUlDLFlBQVkxQyxDQUFaLEVBQWU0QixDQUFmLEtBQXFCYyxZQUFZMUMsQ0FBWixFQUFlNkIsRUFBZixDQUFyQixJQUEyQ2EsWUFBWWYsRUFBWixFQUFnQkMsQ0FBaEIsQ0FBM0MsSUFBaUVjLFlBQVlmLEVBQVosRUFBZ0JFLEVBQWhCLENBQXJFLEVBQTBGO0FBQ3pGLGFBQU87QUFDRmMsbUJBQVcsSUFEVDtBQUVGQyxjQUFNLENBQUNsQixnREFBZ0QxQixDQUFoRCxFQUFtRDJCLEVBQW5ELEVBQXVEQyxDQUF2RCxFQUEwREMsRUFBMUQ7QUFGTCxPQUFQO0FBS0E7QUFDRDs7QUFFRTs7QUFFRixXQUFPO0FBQ0hjLGlCQUNNLENBQUNFLFNBQ0ZqQixFQUFFL0MsQ0FBRixHQUFNbUIsRUFBRW5CLENBQVIsR0FBWSxDQURWLEVBRUYrQyxFQUFFL0MsQ0FBRixHQUFNOEMsR0FBRzlDLENBQVQsR0FBYSxDQUZYLEVBR0ZnRCxHQUFHaEQsQ0FBSCxHQUFPbUIsRUFBRW5CLENBQVQsR0FBYSxDQUhYLEVBSUZnRCxHQUFHaEQsQ0FBSCxHQUFPOEMsR0FBRzlDLENBQVYsR0FBYyxDQUpaLENBQUQsSUFLSCxDQUFDZ0UsU0FDQ2pCLEVBQUU5QyxDQUFGLEdBQU1rQixFQUFFbEIsQ0FBUixHQUFZLENBRGIsRUFFQzhDLEVBQUU5QyxDQUFGLEdBQU02QyxHQUFHN0MsQ0FBVCxHQUFhLENBRmQsRUFHQytDLEdBQUcvQyxDQUFILEdBQU9rQixFQUFFbEIsQ0FBVCxHQUFhLENBSGQsRUFJQytDLEdBQUcvQyxDQUFILEdBQU82QyxHQUFHN0MsQ0FBVixHQUFjLENBSmYsQ0FQRDtBQVlEOEQsWUFBTTtBQVpMLEtBQVA7QUFlQTs7QUFFRCxNQUFJSCxlQUFlLENBQW5CLEVBQXNCO0FBQ3JCO0FBQ0EsV0FBTyxFQUFDRSxXQUFXLEtBQVosRUFBbUJDLE1BQU0sS0FBekIsRUFBUDtBQUNBOztBQUVELE1BQUlFLElBQUlOLGFBQWFDLFdBQXJCO0FBQ0EsTUFBSU0sSUFBSTVCLGFBQWFILGVBQWVZLENBQWYsRUFBa0I1QixDQUFsQixDQUFiLEVBQW1DQyxDQUFuQyxJQUF3Q3dDLFdBQWhEOztBQUVDO0FBQ0EsTUFBSUcsT0FBTyxLQUFYOztBQUVBLE1BQUlGLFlBQVkxQyxDQUFaLEVBQWU0QixDQUFmLEtBQXFCYyxZQUFZMUMsQ0FBWixFQUFlNkIsRUFBZixDQUFyQixJQUEyQ2EsWUFBWWYsRUFBWixFQUFnQkMsQ0FBaEIsQ0FBM0MsSUFBaUVjLFlBQVlmLEVBQVosRUFBZ0JFLEVBQWhCLENBQXJFLEVBQ0VlLE9BQU8sSUFBUDs7QUFFRjtBQUNBO0FBQ0EsU0FBTztBQUNMRCxlQUFZSSxLQUFLLENBQU4sSUFBYUEsS0FBSyxDQUFsQixJQUF5QkQsS0FBSyxDQUE5QixJQUFxQ0EsS0FBSyxDQURoRDtBQUVMRixVQUFNQTtBQUZELEdBQVA7O0FBS0E7O0FBRUQ7QUFDQTs7QUFFRDs7Ozs7Ozs7QUFRQSxTQUFTekIsWUFBVCxDQUFzQjZCLE1BQXRCLEVBQThCQyxNQUE5QixFQUFzQzs7QUFFcEMsTUFBSUMsTUFBTUMsT0FBTixDQUFjSCxNQUFkLENBQUosRUFDRSxPQUFPQSxPQUFPLENBQVAsSUFBWUMsT0FBTyxDQUFQLENBQVosR0FBd0JELE9BQU8sQ0FBUCxJQUFZQyxPQUFPLENBQVAsQ0FBM0MsQ0FERixLQUdFLE9BQU9ELE9BQU9uRSxDQUFQLEdBQVdvRSxPQUFPbkUsQ0FBbEIsR0FBc0JrRSxPQUFPbEUsQ0FBUCxHQUFXbUUsT0FBT3BFLENBQS9DO0FBQ0g7O0FBRUQ7Ozs7Ozs7O0FBUUEsU0FBU21DLGNBQVQsQ0FBd0JnQyxNQUF4QixFQUFnQ0MsTUFBaEMsRUFBd0M7O0FBRXRDLE1BQUlDLE1BQU1DLE9BQU4sQ0FBY0gsTUFBZCxDQUFKLEVBQ0E7QUFDRSxXQUFPLENBQUVBLE9BQU8sQ0FBUCxJQUFZQyxPQUFPLENBQVAsQ0FBZCxFQUF5QkQsT0FBTyxDQUFQLElBQVlDLE9BQU8sQ0FBUCxDQUFyQyxDQUFQO0FBQ0QsR0FIRCxNQUdPO0FBQ0wsUUFBSUcsU0FBUyxFQUFiO0FBQ0FBLFdBQU92RSxDQUFQLEdBQVdtRSxPQUFPbkUsQ0FBUCxHQUFXb0UsT0FBT3BFLENBQTdCO0FBQ0F1RSxXQUFPdEUsQ0FBUCxHQUFXa0UsT0FBT2xFLENBQVAsR0FBV21FLE9BQU9uRSxDQUE3Qjs7QUFFQSxXQUFPc0UsTUFBUDtBQUNEO0FBQ0Y7O0FBRUQ7Ozs7Ozs7O0FBUUEsU0FBU1YsV0FBVCxDQUFxQk0sTUFBckIsRUFBNkJDLE1BQTdCLEVBQXFDO0FBQ3BDLFNBQVFELE9BQU9uRSxDQUFQLElBQVlvRSxPQUFPcEUsQ0FBcEIsSUFBMkJtRSxPQUFPbEUsQ0FBUCxJQUFZbUUsT0FBT25FLENBQXJEO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUFPQSxTQUFTK0QsUUFBVCxDQUFrQlEsSUFBbEIsRUFBd0I7QUFDdkIsTUFBSUMsYUFBYUMsVUFBVSxDQUFWLENBQWpCO0FBQUEsTUFDQzVDLENBREQ7QUFFQSxPQUFLQSxJQUFJLENBQVQsRUFBWUEsSUFBSTRDLFVBQVUzQyxNQUExQixFQUFrQ0QsS0FBSyxDQUF2QyxFQUEwQztBQUN6QyxRQUFJNEMsVUFBVTVDLENBQVYsS0FBZ0IyQyxVQUFwQixFQUFnQztBQUMvQixhQUFPLEtBQVA7QUFDQTtBQUNEO0FBQ0QsU0FBTyxJQUFQO0FBQ0E7O1FBSU8xRSxNLEdBQUFBLE07UUFBUXdDLFUsR0FBQUEsVTtRQUFZakMsTSxHQUFBQSxNO1FBQVFPLFMsR0FBQUEsUztRQUFXYyxnQixHQUFBQSxnQjs7Ozs7Ozs7O0FDNVEvQzs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNZ0QsVUFBVSxTQUFoQjs7QUFFQSxJQUFJQyxXQUFXLHVCQUFhRCxPQUFiLENBQWY7QUFDQSxJQUFJRSxRQUFRLHFCQUFaOztBQUVBO0FBQ0EsSUFBSUMsUUFBUSxJQUFaOztBQUVBO0FBQ0EsSUFBSUMsUUFBUSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBQVo7QUFDQSxJQUFJQyxNQUFNLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBVjs7QUFFQTtBQUNBLElBQUlDLE9BQU8sR0FBWDtBQUFBLElBQWdCQyxPQUFPLEdBQXZCO0FBQ0EsSUFBSUMsU0FBUyxDQUFiO0FBQUEsSUFBZ0JDLE9BQU8sQ0FBdkI7O0FBRUE7QUFDQSxJQUFJQyxXQUFXLGtCQUFPLEVBQVAsRUFBVyxHQUFYLEVBQWdCLEdBQWhCLENBQWY7QUFDQSxJQUFJQyxXQUFXLGtCQUFPTCxJQUFQLEVBQWFDLElBQWIsRUFBbUIsR0FBbkIsQ0FBZjs7QUFHQUssUUFBUUMsR0FBUixDQUFZSCxRQUFaOztBQUVBO0FBQ0EsSUFBSUksU0FBVyxDQUFFLGtCQUFPLEVBQVAsRUFBVyxHQUFYLEVBQWdCLEVBQWhCLENBQUYsRUFBdUIsa0JBQU8sR0FBUCxFQUFZLEdBQVosRUFBaUIsR0FBakIsQ0FBdkIsRUFBOEMsa0JBQU8sR0FBUCxFQUFZLEdBQVosRUFBaUIsR0FBakIsQ0FBOUMsQ0FBZjs7QUFFQTtBQUNBWixNQUFNYSxHQUFOLENBQVdMLFFBQVg7QUFDQVIsTUFBTWEsR0FBTixDQUFXSixRQUFYOzs7Ozs7O0FBRUEsdUJBQWNHLE1BQWQ7QUFBQSxRQUFTRSxDQUFUOztBQUNFZCxVQUFNYSxHQUFOLENBQVdDLENBQVg7QUFERjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBQzs7QUFFQSxTQUFTQSxLQUFULEdBQ0E7QUFDRUMsd0JBQXVCRCxLQUF2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFJRSxRQUFRakIsTUFBTWtCLEtBQU4sQ0FBYWhCLEtBQWIsRUFBb0JDLEdBQXBCLENBQVo7O0FBRUE7QUFDQSxNQUFJZ0IsTUFBTW5CLE1BQU1tQixHQUFOLEVBQVY7O0FBRUFwQixXQUFTcUIsS0FBVDs7QUFFQSxNQUFJbkIsS0FBSixFQUNBO0FBQ0U7QUFERjtBQUFBO0FBQUE7O0FBQUE7QUFFRSw0QkFBY2tCLElBQUlFLEtBQWxCO0FBQUEsWUFBU0MsQ0FBVDs7QUFDRXZCLGlCQUFTd0IsTUFBVCxDQUFpQkQsQ0FBakIsRUFBb0IsTUFBcEIsRUFBNEIsQ0FBNUI7QUFERixPQUZGLENBS0U7QUFMRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU1FdkIsYUFBU3dCLE1BQVQsQ0FBaUJKLElBQUlLLEtBQXJCLEVBQTRCLE1BQTVCO0FBQ0Q7O0FBRUQ7QUFDQXpCLFdBQVN3QixNQUFULENBQWlCckIsS0FBakIsRUFBd0IsTUFBeEIsRUFBZ0MsQ0FBaEM7QUFDQUgsV0FBU3dCLE1BQVQsQ0FBaUJwQixHQUFqQixFQUFzQixNQUF0QixFQUE4QixDQUE5QjtBQUNBSixXQUFTd0IsTUFBVCxDQUFpQnZCLE1BQU15QixPQUF2QixFQUFnQyxNQUFoQzs7QUFFQTtBQUNBMUIsV0FBU3dCLE1BQVQsQ0FBaUIsQ0FBQ04sS0FBRCxDQUFqQixFQUEwQixNQUExQixFQUFrQyxDQUFsQzs7QUFFQTtBQUNBWCxZQUFVLElBQVYsQ0FoQ0YsQ0FnQ2tCO0FBQ2hCLHVCQUFVRSxRQUFWLEVBQW9CLElBQUloRSxLQUFLQyxHQUFMLENBQVM2RCxTQUFTLElBQVQsR0FBZ0I5RCxLQUFLa0YsRUFBOUIsQ0FBeEIsRUFBMkQsQ0FBM0Q7O0FBRUE7QUFDQSxvQkFBT2pCLFFBQVAsRUFBaUJMLElBQWpCLEVBQXVCQyxJQUF2QixFQUE2QixLQUE3QjtBQUVEOztBQUVEc0IsU0FBU0MsY0FBVCxDQUF3QixVQUF4QixFQUFvQ0MsT0FBcEMsR0FBOEMsVUFBQ0MsQ0FBRCxFQUFJcEYsQ0FBSixFQUFVO0FBQ3REdUQsVUFBUTZCLEVBQUVDLFVBQUYsQ0FBYUMsT0FBckI7QUFDRCxDQUZEOztBQUlBTCxTQUFTQyxjQUFULENBQXdCOUIsT0FBeEIsRUFBaUNtQyxXQUFqQyxHQUErQyxhQUFLO0FBQ2xEOUIsUUFBTSxDQUFDMkIsRUFBRUksT0FBSCxFQUFZSixFQUFFSyxPQUFkLENBQU47QUFDRCxDQUZELEM7Ozs7Ozs7Ozs7Ozs7OztBQ3BGQTs7OztBQUNBOzs7Ozs7SUFFcUJDLEs7QUFFbkIsbUJBQ0E7QUFBQTs7QUFDRSxTQUFLWCxPQUFMLEdBQWUsRUFBZjtBQUNBLFNBQUtZLEtBQUwsR0FBYSxJQUFiOztBQUVBO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLElBQVo7QUFDRDs7Ozt3QkFFR0MsTSxFQUNKO0FBQ0UsV0FBS2QsT0FBTCxDQUFhakcsSUFBYixDQUFrQitHLE1BQWxCO0FBQ0Q7OzswQkFFS3JDLEssRUFBT0MsRyxFQUNiO0FBQ0UsV0FBS2tDLEtBQUwsR0FBYSxLQUFLRyxNQUFMLENBQVl0QyxLQUFaLEVBQW1CQyxHQUFuQixDQUFiO0FBQ0EsVUFBSWtCLFFBQVEsS0FBS2dCLEtBQUwsQ0FBV0ksUUFBWCxDQUFvQixDQUFwQixFQUF1QixDQUF2QixDQUFaLENBRkYsQ0FFeUM7O0FBRXZDLFVBQUl4QixRQUFRLEVBQVo7QUFKRjtBQUFBO0FBQUE7O0FBQUE7QUFLRSw2QkFBY0ksS0FBZCw4SEFDQTtBQUFBLGNBRFNDLENBQ1Q7O0FBQ0VMLGdCQUFNekYsSUFBTixDQUFXLEtBQUs4RyxJQUFMLENBQVVqQixLQUFWLENBQWlCQyxDQUFqQixDQUFYO0FBQ0Q7QUFSSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVVFLGFBQU9MLEtBQVA7QUFDRDs7OzBCQUdEO0FBQ0UsYUFBTyxLQUFLcUIsSUFBWjtBQUNEOztBQUVEOzs7OzJCQUNPcEMsSyxFQUFPQyxHLEVBQ2Q7QUFDRSxVQUFJa0IsUUFBUSxFQUFaO0FBQ0EsVUFBSUcsUUFBUSxFQUFaOztBQUVBO0FBQ0EsV0FBS2MsSUFBTCxHQUFZLEVBQUVqQixPQUFPLEVBQVQsRUFBYUcsT0FBTyxFQUFwQixFQUFaOztBQUVBO0FBQ0E7QUFDQSxVQUFJa0IsV0FBVyxDQUFmOztBQUVBO0FBQ0FyQixZQUFNN0YsSUFBTixDQUFZLEVBQUNtSCxRQUFRekMsS0FBVCxFQUFpQnhFLE9BQU9nSCxVQUF4QixFQUFaLEVBWkYsQ0FZcUQ7QUFDbkRyQixZQUFNN0YsSUFBTixDQUFZLEVBQUNtSCxRQUFReEMsR0FBVCxFQUFpQnpFLE9BQU9nSCxVQUF4QixFQUFaLEVBYkYsQ0FhcUQ7O0FBRW5EO0FBZkY7QUFBQTtBQUFBOztBQUFBO0FBZ0JFLDhCQUFjLEtBQUtqQixPQUFuQixtSUFDQTtBQUFBLGNBRFNYLENBQ1Q7O0FBQ0U0Qjs7QUFFQSxjQUFJWixVQUFKO0FBQ0EsZUFBS0EsSUFBRSxDQUFQLEVBQVVBLElBQUVoQixFQUFFNUQsTUFBRixHQUFTLENBQXJCLEVBQXdCNEUsR0FBeEIsRUFDQTtBQUNFTixrQkFBTWhHLElBQU4sQ0FBVyxDQUFDc0YsRUFBRWdCLENBQUYsQ0FBRCxFQUFPaEIsRUFBRWdCLElBQUUsQ0FBSixDQUFQLENBQVg7O0FBRUFULGtCQUFNN0YsSUFBTixDQUFXO0FBQ1RtSCxzQkFBUTdCLEVBQUVnQixDQUFGLENBREM7QUFFVHBHLHFCQUFPZ0g7QUFGRSxhQUFYO0FBS0Q7QUFDRDtBQUNBLGNBQUksQ0FBQ0UsT0FBTzlCLEVBQUUsQ0FBRixDQUFQLEVBQWFBLEVBQUVnQixDQUFGLENBQWIsQ0FBTCxFQUNFVCxNQUFNN0YsSUFBTixDQUFXO0FBQ1RtSCxvQkFBUTdCLEVBQUVnQixDQUFGLENBREM7QUFFVHBHLG1CQUFPZ0g7QUFGRSxXQUFYO0FBSUg7QUFyQ0g7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUF1Q0UsVUFBSUcsSUFBSSxxQkFBUjs7QUFFQTtBQUNBLFdBQUssSUFBSTVGLENBQVQsSUFBY29FLEtBQWQsRUFDQTtBQUNFd0IsVUFBRUMsU0FBRixDQUFZQyxPQUFPOUYsQ0FBUCxDQUFaOztBQUVBO0FBQ0EsYUFBS3FGLElBQUwsQ0FBVWpCLEtBQVYsQ0FBZ0I3RixJQUFoQixDQUFxQjZGLE1BQU0wQixPQUFPOUYsQ0FBUCxDQUFOLEVBQWlCMEYsTUFBdEM7QUFDRDs7QUFFRDs7QUFFQSxVQUFJSyxLQUFHLENBQVA7O0FBRUEsV0FBSyxJQUFJN0gsSUFBRSxDQUFYLEVBQWNBLElBQUVrRyxNQUFNbkUsTUFBTixHQUFhLENBQTdCLEVBQWdDL0IsR0FBaEM7QUFDRSxhQUFLLElBQUlDLElBQUVELElBQUUsQ0FBYixFQUFnQkMsSUFBRWlHLE1BQU1uRSxNQUF4QixFQUFnQzlCLEdBQWhDLEVBQ0E7QUFDSSxjQUFJNkgsSUFBSTVCLE1BQU1sRyxDQUFOLENBQVI7QUFDQSxjQUFJK0gsSUFBSTdCLE1BQU1qRyxDQUFOLENBQVI7O0FBRUE7QUFDQTtBQUNBLGNBQUk2SCxFQUFFdkgsS0FBRixJQUFXd0gsRUFBRXhILEtBQWpCLEVBQXdCOztBQUV4QixjQUFJeUgsV0FBVyxDQUFDRixFQUFFTixNQUFILEVBQVdPLEVBQUVQLE1BQWIsQ0FBZjs7QUFFQSxjQUFJUyxjQUFjRCxRQUFkLEVBQXdCM0IsS0FBeEIsQ0FBSixFQUNBO0FBQ0VxQixjQUFFUSxPQUFGLENBQVVsSSxDQUFWLEVBQWFDLENBQWIsRUFBZ0JrSSxLQUFLTCxFQUFFTixNQUFQLEVBQWVPLEVBQUVQLE1BQWpCLENBQWhCOztBQUVBO0FBQ0EsaUJBQUtMLElBQUwsQ0FBVWQsS0FBVixDQUFnQmhHLElBQWhCLENBQXFCLENBQUN5SCxFQUFFTixNQUFILEVBQVdPLEVBQUVQLE1BQWIsQ0FBckI7QUFDRDtBQUVKO0FBcEJILE9BdUJBLE9BQU9FLENBQVA7QUFDRDs7Ozs7O2tCQW5Ia0JULEs7OztBQXlIckIsU0FBU2tCLElBQVQsQ0FBY25HLENBQWQsRUFBaUJDLENBQWpCLEVBQ0E7QUFDRSxNQUFJbkIsS0FBS21CLEVBQUUsQ0FBRixJQUFPRCxFQUFFLENBQUYsQ0FBaEIsQ0FERixDQUN1QjtBQUNyQixNQUFJakIsS0FBS2tCLEVBQUUsQ0FBRixJQUFPRCxFQUFFLENBQUYsQ0FBaEI7QUFDQSxTQUFPWCxLQUFLK0csSUFBTCxDQUFXdEgsS0FBR0EsRUFBSCxHQUFRQyxLQUFHQSxFQUF0QixDQUFQO0FBRUQ7O0FBRUQsU0FBU2tILGFBQVQsQ0FBdUJELFFBQXZCLEVBQWlDM0IsS0FBakMsRUFDQTtBQUNFOztBQUVBLE9BQUssSUFBSW5DLElBQUUsQ0FBWCxFQUFjQSxJQUFFbUMsTUFBTXRFLE1BQXRCLEVBQThCbUMsR0FBOUIsRUFDQTtBQUNFLFFBQUl5QyxJQUFJTixNQUFNbkMsQ0FBTixDQUFSOztBQUVBLFFBQUltRSxNQUFNLHNCQUFXTCxTQUFTLENBQVQsQ0FBWCxFQUF3QkEsU0FBUyxDQUFULENBQXhCLEVBQXFDckIsRUFBRSxDQUFGLENBQXJDLEVBQTJDQSxFQUFFLENBQUYsQ0FBM0MsQ0FBVjs7QUFFQTtBQUNBO0FBQ0EsUUFBSTBCLElBQUl2RSxTQUFKLElBQWlCLENBQUN1RSxJQUFJdEUsSUFBMUIsRUFDRSxPQUFPLEtBQVA7QUFFSDs7QUFFRCxTQUFPLElBQVA7QUFDRDs7QUFHRCxTQUFTMEQsTUFBVCxDQUFnQnpGLENBQWhCLEVBQW1CQyxDQUFuQixFQUNBO0FBQ0UsU0FBUUQsRUFBRSxDQUFGLEtBQVFDLEVBQUUsQ0FBRixDQUFSLElBQWdCRCxFQUFFLENBQUYsS0FBUUMsRUFBRSxDQUFGLENBQWhDO0FBQ0QsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUM1Sm9CcUcsSztBQUVuQixtQkFDQTtBQUFBOztBQUNFLFNBQUt6RyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsU0FBS3dFLEtBQUwsR0FBYSxFQUFiO0FBQ0EsU0FBS2tDLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDRDs7Ozs4QkFFU3BDLEMsRUFDVjtBQUNFLFdBQUt0RSxRQUFMLENBQWN4QixJQUFkLENBQW1COEYsQ0FBbkI7QUFDQSxXQUFLRSxLQUFMLENBQVdGLENBQVgsSUFBZ0IsRUFBaEI7QUFDRDs7QUFFRDs7Ozs0QkFDUXFDLEUsRUFBSUMsRSxFQUFJTixJLEVBQ2hCO0FBQ0UsV0FBSzlCLEtBQUwsQ0FBV21DLEVBQVgsRUFBZW5JLElBQWYsQ0FBb0IsRUFBQ3FJLE1BQUtELEVBQU4sRUFBVU4sVUFBVixFQUFwQjtBQUNBLFdBQUs5QixLQUFMLENBQVdvQyxFQUFYLEVBQWVwSSxJQUFmLENBQW9CLEVBQUNxSSxNQUFLRixFQUFOLEVBQVVMLFVBQVYsRUFBcEI7O0FBRUEsV0FBS0ksUUFBTDtBQUNEOztBQUVEO0FBQ0E7Ozs7NkJBQ1N4RCxLLEVBQU9DLEcsRUFDaEI7QUFDRSxVQUFJMkQscUJBQUo7QUFDQSxVQUFJQyxPQUFPLENBQUMsQ0FBRCxDQUFYO0FBQ0EsVUFBSUMsT0FBTyxFQUFYO0FBQ0EsVUFBSUMsWUFBWSxFQUFoQjs7QUFFQSxXQUFLLElBQUloSCxJQUFFLENBQVgsRUFBY0EsSUFBRSxLQUFLRCxRQUFMLENBQWNFLE1BQTlCLEVBQXNDRCxHQUF0QyxFQUNBO0FBQ0UsWUFBSUEsQ0FBSixFQUFPOEcsS0FBSzlHLENBQUwsSUFBVThGLE9BQU9tQixTQUFqQjtBQUNQRCxrQkFBVWhILENBQVYsSUFBZUEsQ0FBZjtBQUNBK0csYUFBSy9HLENBQUwsSUFBVSxJQUFWO0FBQ0Q7O0FBRUQ7QUFDQSxhQUFPLENBQUM2RyxlQUFlRyxVQUFVRSxLQUFWLEVBQWhCLEtBQXNDLElBQTdDLEVBQ0E7QUFDRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLLElBQUk5RSxJQUFFLENBQVgsRUFBY0EsSUFBRSxLQUFLbUMsS0FBTCxDQUFXc0MsWUFBWCxFQUF5QjVHLE1BQXpDLEVBQWlEbUMsR0FBakQsRUFDQTtBQUNFO0FBQ0EsY0FBSStFLFlBQVksS0FBSzVDLEtBQUwsQ0FBV3NDLFlBQVgsRUFBeUJ6RSxDQUF6QixFQUE0QndFLElBQTVDOztBQUVBO0FBQ0EsY0FBSVAsT0FBTyxLQUFLOUIsS0FBTCxDQUFXc0MsWUFBWCxFQUF5QnpFLENBQXpCLEVBQTRCaUUsSUFBdkM7O0FBRUE7QUFDQSxjQUFJZSxpQkFBaUJOLEtBQUtELFlBQUwsSUFBcUJSLElBQTFDOztBQUVBO0FBQ0EsY0FBSWUsaUJBQWlCTixLQUFLSyxTQUFMLENBQXJCLEVBQ0E7QUFDRUwsaUJBQUtLLFNBQUwsSUFBa0JDLGNBQWxCLENBREYsQ0FDb0M7QUFDbENMLGlCQUFLSSxTQUFMLElBQWtCTixZQUFsQixDQUZGLENBRW9DO0FBQ25DO0FBRUY7QUFDRjs7QUFFRCxVQUFJcEgsSUFBSXlELEdBQVI7QUFBQSxVQUFhbUUsTUFBSyxDQUFDbkUsR0FBRCxDQUFsQjs7QUFFQTtBQUNBLFVBQUk2RCxLQUFLdEgsQ0FBTCxLQUFXLElBQWYsRUFDRSxPQUFPLEVBQVA7O0FBRUYsU0FBRztBQUNEQSxZQUFJc0gsS0FBS3RILENBQUwsQ0FBSjtBQUNBNEgsWUFBSTlJLElBQUosQ0FBU2tCLENBQVQ7QUFDRCxPQUhELFFBR1FBLEtBQUt3RCxLQUhiOztBQUtBLGFBQU9vRSxJQUFJQyxPQUFKLEVBQVA7QUFFRDs7Ozs7O2tCQW5Ga0JkLEs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDQ0FlLFE7QUFFbkIsb0JBQVkxRSxPQUFaLEVBQ0E7QUFBQTs7QUFDRSxTQUFLQSxPQUFMLEdBQWU2QixTQUFTQyxjQUFULENBQXdCOUIsT0FBeEIsQ0FBZjtBQUNBLFNBQUsyRSxPQUFMLEdBQWUsS0FBSzNFLE9BQUwsQ0FBYTRFLFVBQWIsQ0FBd0IsSUFBeEIsQ0FBZjtBQUNEOzs7OzRCQUdEO0FBQ0UsV0FBS0QsT0FBTCxDQUFhRSxTQUFiLENBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLEtBQUs3RSxPQUFMLENBQWE4RSxLQUExQyxFQUFpRCxLQUFLOUUsT0FBTCxDQUFhK0UsTUFBOUQ7QUFDRDs7OzJCQUVNcEQsTyxFQUNQO0FBQUEsVUFEZ0JxRCxNQUNoQix1RUFEeUIsTUFDekI7QUFBQSxVQURpQ0YsS0FDakMsdUVBRHlDLENBQ3pDOztBQUNFLFVBQUksQ0FBQ3BGLE1BQU1DLE9BQU4sQ0FBY2dDLE9BQWQsQ0FBTCxFQUE2Qjs7QUFFN0I7QUFDQSxVQUFJLENBQUNqQyxNQUFNQyxPQUFOLENBQWNnQyxRQUFRLENBQVIsQ0FBZCxDQUFMLEVBQ0E7QUFDRSxZQUFNbkYsSUFBSW1GLE9BQVY7QUFDQSxhQUFLZ0QsT0FBTCxDQUFhTSxTQUFiO0FBQ0EsYUFBS04sT0FBTCxDQUFhTyxHQUFiLENBQWlCMUksRUFBRSxDQUFGLEtBQU0sQ0FBdkIsRUFBMEJBLEVBQUUsQ0FBRixLQUFNLENBQWhDLEVBQW1Dc0ksS0FBbkMsRUFBMEMsQ0FBMUMsRUFBNkMsSUFBSXBJLEtBQUtrRixFQUF0RCxFQUEwRCxLQUExRDtBQUNBLGFBQUsrQyxPQUFMLENBQWFRLFNBQWIsR0FBeUJILE1BQXpCO0FBQ0EsYUFBS0wsT0FBTCxDQUFhUyxJQUFiO0FBQ0QsT0FQRCxNQU9PO0FBQ1A7O0FBRE87QUFBQTtBQUFBOztBQUFBO0FBR0wsK0JBQWN6RCxPQUFkLDhIQUNBO0FBQUEsZ0JBRFNYLENBQ1Q7O0FBQ0UsaUJBQUssSUFBSWdCLElBQUUsQ0FBWCxFQUFjQSxJQUFFaEIsRUFBRTVELE1BQUYsR0FBUyxDQUF6QixFQUE0QjRFLEdBQTVCLEVBQ0E7QUFDRSxtQkFBS3FELEtBQUwsQ0FBV3JFLEVBQUVnQixDQUFGLENBQVgsRUFBaUJoQixFQUFFZ0IsSUFBRSxDQUFKLENBQWpCLEVBQXlCZ0QsTUFBekIsRUFBaUNGLEtBQWpDO0FBQ0Q7QUFDRjtBQVRJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXTjtBQUVGOzs7MEJBRUt6SCxDLEVBQUdDLEMsRUFBR1YsQyxFQUFHMEksQyxFQUNmO0FBQ0UsV0FBS1gsT0FBTCxDQUFhWSxTQUFiLEdBQXlCRCxDQUF6QjtBQUNBLFdBQUtYLE9BQUwsQ0FBYWEsV0FBYixHQUEyQjVJLEtBQUssT0FBaEM7QUFDQSxXQUFLK0gsT0FBTCxDQUFhTSxTQUFiO0FBQ0EsV0FBS04sT0FBTCxDQUFhYyxNQUFiLENBQW9CcEksRUFBRSxDQUFGLEtBQU0sQ0FBMUIsRUFBNEJBLEVBQUUsQ0FBRixLQUFNLENBQWxDO0FBQ0EsV0FBS3NILE9BQUwsQ0FBYWUsTUFBYixDQUFvQnBJLEVBQUUsQ0FBRixLQUFNLENBQTFCLEVBQTRCQSxFQUFFLENBQUYsS0FBTSxDQUFsQztBQUNBLFdBQUtxSCxPQUFMLENBQWFnQixNQUFiO0FBQ0Q7Ozs7OztrQkFoRGtCakIsUSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxOTA0ZjQyMDI1ZTNhNjY5ZDc5NSIsIlxuXG5mdW5jdGlvbiBTcXVhcmUoeCwgeSwgc2l6ZSlcbntcbiAgbGV0IGhzaXplID0gc2l6ZT4+MTtcbiAgbGV0IHNxID0gW107XG4gIC8vIG9yIGp1c3QgbWFrZSBhIHVuaXQgc3F1YXJlIGFuZCBzY2FsZSBpdCB1cCBkdWggOnxcbiAgLy8gdG9wIGxlZnRcbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSAtIGhzaXplXSApO1xuICAvLyB0b3AgcmlnaHRcbiAgc3EucHVzaCggW3ggKyBoc2l6ZSwgeSAtIGhzaXplXSApO1xuICAvLyBib3R0b20gcmlnaHRcbiAgc3EucHVzaCggW3ggKyBoc2l6ZSwgeSArIGhzaXplXSApO1xuICAvLyBib3R0b20gbGVmdFxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5ICsgaHNpemVdICk7XG4gIC8vIHRvcCBsZWZ0IGFnYWluXG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgLSBoc2l6ZV0gKTtcblxuICByZXR1cm4gc3E7XG59XG5cbmZ1bmN0aW9uIHJvdGF0ZShzaGFwZSwgcngsIHJ5LCBkYSlcbntcbiAgZm9yIChsZXQgcGFpciBvZiBzaGFwZSlcbiAge1xuICAgIHBhaXIgPSByb3RhdGVfcG9pbnQocngsIHJ5LCBkYSwgcGFpcik7XG4gIH1cblxufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGUoc2hhcGUsIGR4LCBkeSlcbntcbiAgZm9yIChsZXQgcGFpciBvZiBzaGFwZSlcbiAge1xuICAgIHBhaXJbMF0gKz0gZHg7XG4gICAgcGFpclsxXSArPSBkeTtcbiAgfVxufVxuXG5mdW5jdGlvbiByb3RhdGVfcG9pbnQoY3gsIGN5LCBhbmdsZSwgcClcbntcbiAgbGV0IHMgPSBNYXRoLnNpbihhbmdsZSk7XG4gIGxldCBjID0gTWF0aC5jb3MoYW5nbGUpO1xuXG4gIC8vIHRyYW5zbGF0ZSBwb2ludCBiYWNrIHRvIG9yaWdpbjpcbiAgcFswXSAtPSBjeDtcbiAgcFsxXSAtPSBjeTtcblxuICAvLyByb3RhdGUgcG9pbnRcbiAgbGV0IHhuZXcgPSBwWzBdICogYyAtIHBbMV0gKiBzO1xuICBsZXQgeW5ldyA9IHBbMF0gKiBzICsgcFsxXSAqIGM7XG5cbiAgLy8gdHJhbnNsYXRlIHBvaW50IGJhY2s6XG4gIHBbMF0gPSB4bmV3ICsgY3g7XG4gIHBbMV0gPSB5bmV3ICsgY3k7XG5cbiAgcmV0dXJuIHA7XG59XG5cblxuZnVuY3Rpb24gcG9pbnRfaW5fcG9seWdvbihwb2ludCwgdmVydGljZXMpXG57XG4gIGZvciAobGV0IGk9MDsgaTx2ZXJ0aWNlcy5sZW5ndGgtMTsgaSsrKVxuICB7XG4gICAgbGV0IGEgPSB2ZXJ0aWNlc1tpXTtcbiAgICBsZXQgYiA9IHZlcnRpY2VzW2krMV07XG5cbiAgICBsZXQgc2VnID0gc3VidHJhY3RQb2ludHMoYiwgYSk7XG4gICAgbGV0IHB0ID0gc3VidHJhY3RQb2ludHMocG9pbnQsIGEpO1xuICAgIGxldCBpbnNpZGUgPSAoY3Jvc3NQcm9kdWN0KHNlZywgcHQpIDw9IDApO1xuICAgIGlmICghaW5zaWRlKSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG4vKipcbiAqIEBhdXRob3IgUGV0ZXIgS2VsbGV5XG4gKiBAYXV0aG9yIHBna2VsbGV5NEBnbWFpbC5jb21cbiAqL1xuLyoqXG4gKiBTZWUgaWYgdHdvIGxpbmUgc2VnbWVudHMgaW50ZXJzZWN0LiBUaGlzIHVzZXMgdGhlXG4gKiB2ZWN0b3IgY3Jvc3MgcHJvZHVjdCBhcHByb2FjaCBkZXNjcmliZWQgYmVsb3c6XG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NjUyODIvNzg2MzM5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHAgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgc3RhcnQgb2YgdGhlIDFzdCBsaW5lLlxuICogQHBhcmFtIHtPYmplY3R9IHAyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIGVuZCBvZiB0aGUgMXN0IGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBzdGFydCBvZiB0aGUgMm5kIGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcTIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgZW5kIG9mIHRoZSAybmQgbGluZS5cbiAqL1xuXG5mdW5jdGlvbiBpbnRlcnNlY3RzKGFwLCBhcDIsIGFxLCBhcTIpXG57XG4gIC8vIEFNOiBOb3RlIHRvIGRldmVsb3BlcnMsIHVzaW5nIG5hbWVkIHByb3BlcnRpZXMgZm9yIHZlY3RvcnMgaXMgcmV0YXJkZWQuIHRoYW5rcy5cbiAgcmV0dXJuIGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0KCB7eDogYXBbMF0sIHk6IGFwWzFdfSwge3g6IGFwMlswXSwgeTogYXAyWzFdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eDogYXFbMF0sIHk6IGFxWzFdfSwge3g6IGFxMlswXSwgeTogYXEyWzFdfSApO1xufVxuXG5mdW5jdGlvbiBpc19vbmVfYmJveF9jb250YWluZWRfYnlfdGhlX290aGVyX3F1ZXN0aW9ubWFyayhwLCBwMiwgcSwgcTIpXG57XG4gIHZhciBib3gxID0ge1xuICAgIHhtaW46IE1hdGgubWluKHAueCwgcDIueCksXG4gICAgeW1pbjogTWF0aC5taW4ocC55LCBwMi55KSxcbiAgICB4bWF4OiBNYXRoLm1heChwLngsIHAyLngpLFxuICAgIHltYXg6IE1hdGgubWF4KHAueSwgcDIueSlcbiAgfTtcblxuICB2YXIgYm94MiA9IHtcbiAgICB4bWluOiBNYXRoLm1pbihxLngsIHEyLngpLFxuICAgIHltaW46IE1hdGgubWluKHEueSwgcTIueSksXG4gICAgeG1heDogTWF0aC5tYXgocS54LCBxMi54KSxcbiAgICB5bWF4OiBNYXRoLm1heChxLnksIHEyLnkpXG4gIH07XG5cbiAgcmV0dXJuIGJib3hfY29udGFpbmVkKGJveDEsIGJveDIpIHx8IGJib3hfY29udGFpbmVkKGJveDIsIGJveDEpO1xufVxuXG5mdW5jdGlvbiBiYm94X2NvbnRhaW5lZChhLCBiKVxue1xuICAvLyBJcyBCb3ggQiBjb21wbGV0ZWx5IGluc2lkZSBib3ggQSA/XG4gIHJldHVybiAoYi54bWluID49IGEueG1pbiAmJiBiLnhtYXggPD0gYS54bWF4KSAmJiAoYi55bWluID49IGEueW1pbiAmJiBiLnltYXggPD0gYS55bWF4KTtcbn1cblxuXG5mdW5jdGlvbiBkb0xpbmVTZWdtZW50c0ludGVyc2VjdChwLCBwMiwgcSwgcTIpXG57XG4gIC8vIHZhciBkZWJ1Z19zdHJpbmcgPSBgZG9MaW5lU2VnbWVudHNJbnRlcnNlY3Q6ICgke3AueH0sICR7cC55fSktKCR7cDIueH0sICR7cDIueX0pICB3aXRoICAoJHtxLnh9LCAke3EueX0pLSgke3EyLnh9LCAke3EyLnl9KWA7XG5cblx0dmFyIHIgPSBzdWJ0cmFjdFBvaW50cyhwMiwgcCk7XG5cdHZhciBzID0gc3VidHJhY3RQb2ludHMocTIsIHEpO1xuXG5cdHZhciB1TnVtZXJhdG9yID0gY3Jvc3NQcm9kdWN0KHN1YnRyYWN0UG9pbnRzKHEsIHApLCByKTtcblx0dmFyIGRlbm9taW5hdG9yID0gY3Jvc3NQcm9kdWN0KHIsIHMpO1xuXG5cdGlmICh1TnVtZXJhdG9yID09IDAgJiYgZGVub21pbmF0b3IgPT0gMCkge1xuXHRcdC8vIFRoZXkgYXJlIGNvTGxpbmVhclxuXG4gICAgLy8gY29uc29sZS5sb2coXCJDb3BsYW5hclwiKTtcblxuXHRcdC8vIERvIHRoZXkgdG91Y2g/IChBcmUgYW55IG9mIHRoZSBwb2ludHMgZXF1YWw/KVxuXHRcdGlmIChlcXVhbFBvaW50cyhwLCBxKSB8fCBlcXVhbFBvaW50cyhwLCBxMikgfHwgZXF1YWxQb2ludHMocDIsIHEpIHx8IGVxdWFsUG9pbnRzKHAyLCBxMikpIHtcblx0XHRcdHJldHVybiB7XG4gICAgICAgIGludGVyc2VjdDogdHJ1ZSxcbiAgICAgICAga2lzczogIWlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrKHAsIHAyLCBxLCBxMilcbiAgICAgIH07XG5cblx0XHR9XG5cdFx0Ly8gRG8gdGhleSBvdmVybGFwPyAoQXJlIGFsbCB0aGUgcG9pbnQgZGlmZmVyZW5jZXMgaW4gZWl0aGVyIGRpcmVjdGlvbiB0aGUgc2FtZSBzaWduKVxuXG4gICAgLy8gY29uc29sZS5sb2coXCJQb2ludHMgRE9OVCB0b3VjaFwiKTtcblxuXHRcdHJldHVybiB7XG4gICAgICBpbnRlcnNlY3Q6XG4gICAgICAgICAgICAhYWxsRXF1YWwoXG4gICAgICBcdFx0XHRcdChxLnggLSBwLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEueCAtIHAyLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnggLSBwLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnggLSBwMi54IDwgMCkpIHx8XG4gICAgICBcdFx0XHQhYWxsRXF1YWwoXG4gICAgICBcdFx0XHRcdChxLnkgLSBwLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEueSAtIHAyLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnkgLSBwLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnkgLSBwMi55IDwgMCkpLFxuICAgICAgICBraXNzOiBmYWxzZVxuICAgICAgfTtcblxuXHR9XG5cblx0aWYgKGRlbm9taW5hdG9yID09IDApIHtcblx0XHQvLyBsaW5lcyBhcmUgcGFyYWxlbGxcblx0XHRyZXR1cm4ge2ludGVyc2VjdDogZmFsc2UsIGtpc3M6IGZhbHNlfTtcblx0fVxuXG5cdHZhciB1ID0gdU51bWVyYXRvciAvIGRlbm9taW5hdG9yO1xuXHR2YXIgdCA9IGNyb3NzUHJvZHVjdChzdWJ0cmFjdFBvaW50cyhxLCBwKSwgcykgLyBkZW5vbWluYXRvcjtcblxuICAvLyBjb25zb2xlLmxvZyhgdD0ke3R9LCB1PSR7dX1gKTtcbiAgdmFyIGtpc3MgPSBmYWxzZTtcblxuICBpZiAoZXF1YWxQb2ludHMocCwgcSkgfHwgZXF1YWxQb2ludHMocCwgcTIpIHx8IGVxdWFsUG9pbnRzKHAyLCBxKSB8fCBlcXVhbFBvaW50cyhwMiwgcTIpKVxuICAgIGtpc3MgPSB0cnVlO1xuXG4gIC8vIGxldCByZXMgPVxuICAvL3JldHVyblxuICByZXR1cm4ge1xuICAgIGludGVyc2VjdDogKHQgPj0gMCkgJiYgKHQgPD0gMSkgJiYgKHUgPj0gMCkgJiYgKHUgPD0gMSksXG4gICAga2lzczoga2lzc1xuICB9O1xuXG4gIC8vIGNvbnNvbGUubG9nKGAke2RlYnVnX3N0cmluZ30gPSAke3Jlc31gKTtcblxuXHQvLyByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZSB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0aGUgdHdvIHBvaW50cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICpcbiAqIEByZXR1cm4gdGhlIGNyb3NzIHByb2R1Y3QgcmVzdWx0IGFzIGEgZmxvYXRcbiAqL1xuZnVuY3Rpb24gY3Jvc3NQcm9kdWN0KHBvaW50MSwgcG9pbnQyKSB7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocG9pbnQxKSlcbiAgICByZXR1cm4gcG9pbnQxWzBdICogcG9pbnQyWzFdIC0gcG9pbnQxWzFdICogcG9pbnQyWzBdO1xuICBlbHNlXG5cdCAgIHJldHVybiBwb2ludDEueCAqIHBvaW50Mi55IC0gcG9pbnQxLnkgKiBwb2ludDIueDtcbn1cblxuLyoqXG4gKiBTdWJ0cmFjdCB0aGUgc2Vjb25kIHBvaW50IGZyb20gdGhlIGZpcnN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiB0aGUgc3VidHJhY3Rpb24gcmVzdWx0IGFzIGEgcG9pbnQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIHN1YnRyYWN0UG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocG9pbnQxKSlcbiAge1xuICAgIHJldHVybiBbIHBvaW50MVswXSAtIHBvaW50MlswXSwgcG9pbnQxWzFdIC0gcG9pbnQyWzFdIF07XG4gIH0gZWxzZSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHJlc3VsdC54ID0gcG9pbnQxLnggLSBwb2ludDIueDtcbiAgICByZXN1bHQueSA9IHBvaW50MS55IC0gcG9pbnQyLnk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbi8qKlxuICogU2VlIGlmIHRoZSBwb2ludHMgYXJlIGVxdWFsLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiBpZiB0aGUgcG9pbnRzIGFyZSBlcXVhbFxuICovXG5mdW5jdGlvbiBlcXVhbFBvaW50cyhwb2ludDEsIHBvaW50Mikge1xuXHRyZXR1cm4gKHBvaW50MS54ID09IHBvaW50Mi54KSAmJiAocG9pbnQxLnkgPT0gcG9pbnQyLnkpXG59XG5cbi8qKlxuICogU2VlIGlmIGFsbCBhcmd1bWVudHMgYXJlIGVxdWFsLlxuICpcbiAqIEBwYXJhbSB7Li4ufSBhcmdzIGFyZ3VtZW50cyB0aGF0IHdpbGwgYmUgY29tcGFyZWQgYnkgJz09Jy5cbiAqXG4gKiBAcmV0dXJuIGlmIGFsbCBhcmd1bWVudHMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGFsbEVxdWFsKGFyZ3MpIHtcblx0dmFyIGZpcnN0VmFsdWUgPSBhcmd1bWVudHNbMF0sXG5cdFx0aTtcblx0Zm9yIChpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGlmIChhcmd1bWVudHNbaV0gIT0gZmlyc3RWYWx1ZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuXG5cbmV4cG9ydCB7U3F1YXJlLCBpbnRlcnNlY3RzLCByb3RhdGUsIHRyYW5zbGF0ZSwgcG9pbnRfaW5fcG9seWdvbn0gO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1V0aWwuanMiLCJcbmltcG9ydCBTY2VuZSAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1NjZW5lJztcbmltcG9ydCBSZW5kZXJlciAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCB7U3F1YXJlLCByb3RhdGUsIHRyYW5zbGF0ZX0gICAgICBmcm9tICcuL1V0aWwnO1xuXG5jb25zdCBlbGVtZW50ID0gJ2Rpc3BsYXknO1xuXG5sZXQgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoZWxlbWVudCk7XG5sZXQgc2NlbmUgPSBuZXcgU2NlbmUoKTtcblxuLy8gU2hvdy9oaWRlIHRoZSBzY2VuZSBncmFwaFxubGV0IGRlYnVnID0gdHJ1ZTtcblxuLy8gU3RhcnQgcG9pbnQgYW5kIG91ciBnb2FsXG5sZXQgc3RhcnQgPSBbMTAsIDEwXTtcbmxldCBlbmQgPSBbMzgwLCA0MjBdO1xuXG4vLyBGb3IgdGhlIHNoYXBlIGFuaW1hdGlvbnNcbmxldCByb3R4ID0gMzAwLCByb3R5ID0gNDAwO1xubGV0IG1vdGlvbiA9IDAsIHJvdGEgPSAwO1xuXG4vLyBDcmVhdGUgc29tZSBkeW5hbWljIG9ic3RhY2xlc1xubGV0IHNxX3NtYWxsID0gU3F1YXJlKDYwLCAxMDAsIDEwMCk7XG5sZXQgc3FfbGFyZ2UgPSBTcXVhcmUocm90eCwgcm90eSwgMzI1KTtcblxuXG5jb25zb2xlLmxvZyhzcV9zbWFsbCk7XG5cbi8vIFNvbWUgc3RhdGljXG5sZXQgb3RoZXJzICAgPSBbIFNxdWFyZSg1MCwgMjUwLCA1MCksIFNxdWFyZSg1MDAsIDEwMCwgMTUwKSwgU3F1YXJlKDYyMCwgNDAwLCAxMDApIF07XG5cbi8vIEFkZCB0aGVtIHRvIHRoZSBzY2VuZVxuc2NlbmUuYWRkKCBzcV9zbWFsbCApO1xuc2NlbmUuYWRkKCBzcV9sYXJnZSApO1xuXG5mb3IgKGxldCBvIG9mIG90aGVycylcbiAgc2NlbmUuYWRkKCBvICk7XG5cbmZyYW1lKCk7XG5cbmZ1bmN0aW9uIGZyYW1lKClcbntcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBmcmFtZSApO1xuXG4gIC8vIEZpbmQgdGhlIHNob3J0ZXN0IHBhdGguIFR3byB0aGluZ3MgaGFwcGVuIGhlcmU6XG4gIC8vICAgIDEuIEEgU2NlbmUgZ3JhcGggaXMgZXh0cmFjdGVkIGZyb20gb3VyIHNjZW5lIGdlb21ldHJ5XG4gIC8vICAgIDIuIERpamtzdHJhJ3MgbWV0aG9kIGlzIHVzZWQgdG8gZmluZCB0aGUgb3B0aW1hbCByb3V0ZSBhY3Jvc3MgdGhlIGdyYXBoXG4gIGxldCByb3V0ZSA9IHNjZW5lLnNvbHZlKCBzdGFydCwgZW5kICk7XG5cbiAgLy8gR2V0IGEgdmlzdWFsaXNhdGlvbiBvZiB0aGUgYWN0dWFsIHNjZW5lZ3JhcGhcbiAgbGV0IHZpcyA9IHNjZW5lLnZpcygpO1xuXG4gIHJlbmRlcmVyLmNsZWFyKCk7XG5cbiAgaWYgKGRlYnVnKVxuICB7XG4gICAgLy8gRHJhdyB0aGUgc2NlbmUgZ3JhcGggbm9kZXNcbiAgICBmb3IgKGxldCBuIG9mIHZpcy5ub2RlcylcbiAgICAgIHJlbmRlcmVyLnJlbmRlciggbiwgJyNkZGQnLCA1ICk7XG5cbiAgICAvLyBEcmF3IHRoZSBncmFwaCBlZGdlc1xuICAgIHJlbmRlcmVyLnJlbmRlciggdmlzLmVkZ2VzLCAnI2RkZCcgKTtcbiAgfVxuXG4gIC8vIFJlbmRlciB0aGUgb3JpZ2luYWwgc2NlbmUgZ2VvbWV0cnkgb24gdG9wIG9mIHRoZSBncmFwaFxuICByZW5kZXJlci5yZW5kZXIoIHN0YXJ0LCAnIzBhMCcsIDYgKTtcbiAgcmVuZGVyZXIucmVuZGVyKCBlbmQsICcjMDhmJywgNiApO1xuICByZW5kZXJlci5yZW5kZXIoIHNjZW5lLm9iamVjdHMsICcjMzMzJyApO1xuXG4gIC8vIE5vdyBkaXNwbGF5IHRoZSBmb3VuZCByb3V0ZSFcbiAgcmVuZGVyZXIucmVuZGVyKCBbcm91dGVdLCAnI2YwMCcsIDMgKTtcblxuICAvLyBBbmltYXRpb25cbiAgbW90aW9uICs9IDAuMDU7IC8vIFNpbnVzb2lkYWxcbiAgdHJhbnNsYXRlKHNxX3NtYWxsLCAzICogTWF0aC5zaW4obW90aW9uICogMC4yNSAqIE1hdGguUEkpLCAwKTtcblxuICAvLyByb3RhdGUgdGhlIGJpZyBzcXVhcmVcbiAgcm90YXRlKHNxX2xhcmdlLCByb3R4LCByb3R5LCAwLjAwNSk7XG5cbn1cblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NiX2RlYnVnJykub25jbGljayA9IChlLCBjKSA9PiB7XG4gIGRlYnVnID0gZS5zcmNFbGVtZW50LmNoZWNrZWQ7XG59XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpLm9ubW91c2Vtb3ZlID0gZSA9PiB7XG4gIGVuZCA9IFtlLmNsaWVudFgsIGUuY2xpZW50WV07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuaW1wb3J0IEdyYXBoICAgICAgICAgIGZyb20gJy4vR3JhcGgnO1xuaW1wb3J0IHtpbnRlcnNlY3RzfSAgIGZyb20gJy4vVXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHRoaXMub2JqZWN0cyA9IFtdO1xuICAgIHRoaXMuZ3JhcGggPSBudWxsO1xuXG4gICAgLy8gVGhpcyBpcyBqdXN0IGZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICB0aGlzLl92aXMgPSBudWxsO1xuICB9XG5cbiAgYWRkKG9iamVjdClcbiAge1xuICAgIHRoaXMub2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gIH1cblxuICBzb2x2ZShzdGFydCwgZW5kKVxuICB7XG4gICAgdGhpcy5ncmFwaCA9IHRoaXMuX2dyYXBoKHN0YXJ0LCBlbmQpO1xuICAgIGxldCBub2RlcyA9IHRoaXMuZ3JhcGguc2hvcnRlc3QoMCwgMSk7IC8vIFswXSBzdGFydCwgWzFdIGVuZCAoc2VlIC5ncmFwaCgpKVxuXG4gICAgbGV0IHJvdXRlID0gW107XG4gICAgZm9yIChsZXQgbiBvZiBub2RlcylcbiAgICB7XG4gICAgICByb3V0ZS5wdXNoKHRoaXMuX3Zpcy5ub2Rlc1sgbiBdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm91dGU7XG4gIH1cblxuICB2aXMoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpcztcbiAgfVxuXG4gIC8vIEV4dHJhY3QgYSBzY2VuZWdyYXBoIGZyb20gb3VyIGNvbnRpbnVvdXMgZXVjbGlkZWFuIGdlb21ldHJ5XG4gIF9ncmFwaChzdGFydCwgZW5kKVxuICB7XG4gICAgbGV0IG5vZGVzID0gW107XG4gICAgbGV0IGVkZ2VzID0gW107XG5cbiAgICAvLyBGb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoXG4gICAgdGhpcy5fdmlzID0geyBub2RlczogW10sIGVkZ2VzOiBbXSB9O1xuXG4gICAgLy8gVGhpcyBpcyBqdXN0IGEgdGVtcCB2YWx1ZSB1c2VkIHRvIG1ha2Ugc3VyZSBzaGFwZXMgZG9uJ3QgcGVyZm9ybVxuICAgIC8vIGludGVyc2VjdGlvbiB0ZXN0cyBvbiB0aGVtc2VsdmVzIChhY3Jvc3MgdGhlaXIgb3duIHZlcnRpY2VzKVxuICAgIGxldCBzaGFwZV9pZCA9IDE7XG5cbiAgICAvLyBUaGVzZSBmaXJzdCB0d28gbm9kZXMgaW4gdGhlIGdyYXBoIGFyZSBhIHNwZWNpYWwgY2FzZVxuICAgIG5vZGVzLnB1c2goIHt2ZXJ0ZXg6IHN0YXJ0LCAgc2hhcGU6IHNoYXBlX2lkKyt9ICk7IC8vIFswXSBzdGFydCAoc2VlIC5zb2x2ZSgpKVxuICAgIG5vZGVzLnB1c2goIHt2ZXJ0ZXg6IGVuZCwgICAgc2hhcGU6IHNoYXBlX2lkKyt9ICk7IC8vIFsxXSBlbmRcblxuICAgIC8vIGV4dHJhY3QgZWFjaCBvYnN0YWNsZSdzIGVkZ2VzIGFuZCBub2Rlc1xuICAgIGZvciAobGV0IG8gb2YgdGhpcy5vYmplY3RzKVxuICAgIHtcbiAgICAgIHNoYXBlX2lkKys7XG5cbiAgICAgIGxldCBlO1xuICAgICAgZm9yIChlPTA7IGU8by5sZW5ndGgtMTsgZSsrKVxuICAgICAge1xuICAgICAgICBlZGdlcy5wdXNoKFtvW2VdLCBvW2UrMV1dKTtcblxuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB2ZXJ0ZXg6IG9bZV0sXG4gICAgICAgICAgc2hhcGU6IHNoYXBlX2lkXG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgICAvLyB0aGlzIGlzbid0IGEgY2xvc2VkIHJpbmcgKG1hdGNoaW5nIHN0YXJ0IGFuZCBlbmRwKVxuICAgICAgaWYgKCFlcXVhbHMob1swXSwgb1tlXSkpXG4gICAgICAgIG5vZGVzLnB1c2goe1xuICAgICAgICAgIHZlcnRleDogb1tlXSxcbiAgICAgICAgICBzaGFwZTogc2hhcGVfaWRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGV0IGcgPSBuZXcgR3JhcGgoKTtcblxuICAgIC8vIEFkZCBgbm9kZXNgIGluZGljZXMgdG8gZ3JhcGhcbiAgICBmb3IgKGxldCBpIGluIG5vZGVzKVxuICAgIHtcbiAgICAgIGcuYWRkdmVydGV4KE51bWJlcihpKSk7XG5cbiAgICAgIC8vIEZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICAgIHRoaXMuX3Zpcy5ub2Rlcy5wdXNoKG5vZGVzW051bWJlcihpKV0udmVydGV4KTtcbiAgICB9XG5cbiAgICAvLyBnLmFkZGVkZ2UoKTogcGVyaW1ldGVyIG9mIGFsbCBvYnN0YWNsZXNcblxuICAgIGxldCBuZT0wO1xuXG4gICAgZm9yIChsZXQgeD0wOyB4PG5vZGVzLmxlbmd0aC0xOyB4KyspXG4gICAgICBmb3IgKGxldCB5PXgrMTsgeTxub2Rlcy5sZW5ndGg7IHkrKylcbiAgICAgIHtcbiAgICAgICAgICBsZXQgQSA9IG5vZGVzW3hdO1xuICAgICAgICAgIGxldCBCID0gbm9kZXNbeV07XG5cbiAgICAgICAgICAvLyBXZSdyZSB0ZXN0aW5nIHRoZSBzaGFwZSdzIHZlcnRpY2VzIGFnYWluc3QgaXRzZWxmXG4gICAgICAgICAgLy8gd2hpY2ggbGVhZHMgdG8gaW50ZXJuYWwgcGF0aHMgaW5zaWRlIHRoZSBzaGFwZSAoaW52YWxpZCEpXG4gICAgICAgICAgaWYgKEEuc2hhcGUgPT0gQi5zaGFwZSkgY29udGludWU7XG5cbiAgICAgICAgICBsZXQgdGVzdGVkZ2UgPSBbQS52ZXJ0ZXgsIEIudmVydGV4XTtcblxuICAgICAgICAgIGlmIChlZGdldmlzaWJpbHR5KHRlc3RlZGdlLCBlZGdlcykpXG4gICAgICAgICAge1xuICAgICAgICAgICAgZy5hZGRlZGdlKHgsIHksIGNvc3QoQS52ZXJ0ZXgsIEIudmVydGV4KSk7XG5cbiAgICAgICAgICAgIC8vIEp1c3QgZm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaCwgbm9uLWVzc2VudGlhbDpcbiAgICAgICAgICAgIHRoaXMuX3Zpcy5lZGdlcy5wdXNoKFtBLnZlcnRleCwgQi52ZXJ0ZXhdKTtcbiAgICAgICAgICB9XG5cbiAgICAgIH1cblxuXG4gICAgcmV0dXJuIGc7XG4gIH1cblxufVxuXG5cblxuZnVuY3Rpb24gY29zdChhLCBiKVxue1xuICBsZXQgZHggPSBiWzBdIC0gYVswXSAvLyB4MiAtIHgxXG4gIGxldCBkeSA9IGJbMV0gLSBhWzFdO1xuICByZXR1cm4gTWF0aC5zcXJ0KCBkeCpkeCArIGR5KmR5ICk7XG5cbn1cblxuZnVuY3Rpb24gZWRnZXZpc2liaWx0eSh0ZXN0ZWRnZSwgZWRnZXMpXG57XG4gIC8vIGNvbnNvbGUubG9nKGBUZXN0aW5nIGVkZ2U6ICR7dGVzdGVkZ2VbMF19LCAke3Rlc3RlZGdlWzFdfWApO1xuXG4gIGZvciAobGV0IHQ9MDsgdDxlZGdlcy5sZW5ndGg7IHQrKylcbiAge1xuICAgIGxldCBlID0gZWRnZXNbdF07XG5cbiAgICBsZXQgcmVzID0gaW50ZXJzZWN0cyh0ZXN0ZWRnZVswXSwgdGVzdGVkZ2VbMV0sIGVbMF0sIGVbMV0pO1xuXG4gICAgLy8gSWYgaW50ZXJzZWN0aW9uLCBjaGVjayBpdCdzIG5vdCBqdXN0IHRoZSBlbmRwb2ludHMga2lzc2luZyB3aGljaCBpcyBva1xuICAgIC8vIGluIGZhY3QsIGl0J3MgbW9yZSB0aGFuICdvaycgLSBpdCdzIGV4YWN0bHkgd2hhdCB3ZSdyZSBsb29raW5nIGZvclxuICAgIGlmIChyZXMuaW50ZXJzZWN0ICYmICFyZXMua2lzcylcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cblxuZnVuY3Rpb24gZXF1YWxzKGEsIGIpXG57XG4gIHJldHVybiAoYVswXSA9PSBiWzBdICYmIGFbMV0gPT0gYlsxXSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU2NlbmUuanMiLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHRoaXMudmVydGljZXMgPSBbXTtcbiAgICB0aGlzLmVkZ2VzID0gW107XG4gICAgdGhpcy5udW1lZGdlcyA9IDA7XG4gIH1cblxuICBhZGR2ZXJ0ZXgobilcbiAge1xuICAgIHRoaXMudmVydGljZXMucHVzaChuKTtcbiAgICB0aGlzLmVkZ2VzW25dID0gW107XG4gIH1cblxuICAvLyBhZGphY2VueSBlZGdlIGxpc3RcbiAgYWRkZWRnZSh2MSwgdjIsIGNvc3QpXG4gIHtcbiAgICB0aGlzLmVkZ2VzW3YxXS5wdXNoKHtkZXN0OnYyLCBjb3N0fSk7XG4gICAgdGhpcy5lZGdlc1t2Ml0ucHVzaCh7ZGVzdDp2MSwgY29zdH0pO1xuXG4gICAgdGhpcy5udW1lZGdlcysrO1xuICB9XG5cbiAgLy8gU3VwZXIgYmFzaWMgaW1wbGVtZW50YXRpb24gb2YgRGlqa3N0cmEncyBhbGdvcml0aG1cbiAgLy8gRGlyZWN0bHkgZnJvbSB0aGlzIHJlY2lwZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRGlqa3N0cmElMjdzX2FsZ29yaXRobSNBbGdvcml0aG1cbiAgc2hvcnRlc3Qoc3RhcnQsIGVuZClcbiAge1xuICAgIGxldCBjdXJyZW50X25vZGU7XG4gICAgbGV0IGRpc3QgPSBbMF07XG4gICAgbGV0IHByZXYgPSBbXTtcbiAgICBsZXQgdW52aXNpdGVkID0gW107XG5cbiAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy52ZXJ0aWNlcy5sZW5ndGg7IGkrKylcbiAgICB7XG4gICAgICBpZiAoaSkgZGlzdFtpXSA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICB1bnZpc2l0ZWRbaV0gPSBpO1xuICAgICAgcHJldltpXSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gJ1Zpc2l0JyBlYWNoIG5vZGUgb25seSBvbmNlLCBpbiB0dXJuXG4gICAgd2hpbGUoIChjdXJyZW50X25vZGUgPSB1bnZpc2l0ZWQuc2hpZnQoKSkgIT0gbnVsbCApXG4gICAge1xuICAgICAgLy8gRm9yIGVhY2ggbm9kZSwgJ2NoZWNrJyBpdHMgbmVpZ2hib3Vycy5cbiAgICAgIC8vIFdoaWxlIHdlIG9ubHkgJ3Zpc2l0JyBlYWNoIG5vZGUgb25jZSwgaXQncyB0aGlzIHJlcGVhdGVkICdjaGVjaydpbmdcbiAgICAgIC8vIChhbmQgb2NjYXNpb25hbCByZWNhbGN1bGF0aW5nKSBvZiBuZWlnaGJvdXJzIHRoYXQgYWxsb3dzIHVzIHRvIGZpbmRcbiAgICAgIC8vIHRoZSBzaG9ydGVzdCByb3V0ZSB0aHJvdWdoIHRoZSBncmFwaCBmcm9tIG91ciBzdGFydCBwb2ludC5cbiAgICAgIC8vIEluIGZhY3QsIHRoZSBpbmhlcmVudCByZXN1bHQgb2YgdGhlIGFsZ28gaXMgdGhhdCB3ZSBmaW5kIHRoZSBzaG9ydGVzdFxuICAgICAgLy8gcGF0aCB0byAqZXZlcnkqIHBvaW50IGluIHRoZSBncmFwaFxuICAgICAgZm9yIChsZXQgdD0wOyB0PHRoaXMuZWRnZXNbY3VycmVudF9ub2RlXS5sZW5ndGg7IHQrKylcbiAgICAgIHtcbiAgICAgICAgLy8gdmVydGV4L25vZGUgSURcbiAgICAgICAgbGV0IG5laWdoYm91ciA9IHRoaXMuZWRnZXNbY3VycmVudF9ub2RlXVt0XS5kZXN0O1xuXG4gICAgICAgIC8vIERpc3RhbmNlIGZyb20gY3VycmVudF9ub2RlIHRvIG5laWdoYm91clxuICAgICAgICBsZXQgY29zdCA9IHRoaXMuZWRnZXNbY3VycmVudF9ub2RlXVt0XS5jb3N0O1xuXG4gICAgICAgIC8vIERpc3RhbmNlIHRodXMgZmFyIG9uIHRoaXMgcm91dGUgKHVwIHRvIGN1cnJlbnRfbm9kZSkgKyBkaXN0YW5jZSB0byBuZWlnaGJvdXJcbiAgICAgICAgbGV0IHRlbnRhdGl2ZV9kaXN0ID0gZGlzdFtjdXJyZW50X25vZGVdICsgY29zdDtcblxuICAgICAgICAvLyBIYXZlIHdlIGZvdW5kIGEgc2hvcnRlciBwYXRoP1xuICAgICAgICBpZiAodGVudGF0aXZlX2Rpc3QgPCBkaXN0W25laWdoYm91cl0pXG4gICAgICAgIHtcbiAgICAgICAgICBkaXN0W25laWdoYm91cl0gPSB0ZW50YXRpdmVfZGlzdDsgLy8gTmV3IGRpc3RhbmNlIHRvIHRoaXMgbm9kZVxuICAgICAgICAgIHByZXZbbmVpZ2hib3VyXSA9IGN1cnJlbnRfbm9kZTsgICAvLyBVcGRhdGUgdGhlIHJvdXRlXG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBjID0gZW5kLCBzZXEgPVtlbmRdO1xuXG4gICAgLy8gZmFpbGVkIGZvciBzb21lIHJlYXNvbiwgZS5nLiBpbXBvc3NpYmxlIHBvaW50IGluc2lkZSBudWxsc3BhY2UgZXRjXG4gICAgaWYgKHByZXZbY10gPT0gbnVsbClcbiAgICAgIHJldHVybiBbXTtcblxuICAgIGRvIHtcbiAgICAgIGMgPSBwcmV2W2NdO1xuICAgICAgc2VxLnB1c2goYyk7XG4gICAgfSB3aGlsZShjICE9IHN0YXJ0KTtcblxuICAgIHJldHVybiBzZXEucmV2ZXJzZSgpO1xuXG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0dyYXBoLmpzIiwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyXG57XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpXG4gIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KTtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgfVxuXG4gIGNsZWFyKClcbiAge1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgfVxuXG4gIHJlbmRlcihvYmplY3RzLCBjb2xvdXIgPSAnIzAwMCcsIHdpZHRoID0gMilcbiAge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3RzKSkgcmV0dXJuO1xuXG4gICAgLy8gcG9pbnQgdHlwZVxuICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3RzWzBdKSlcbiAgICB7XG4gICAgICBjb25zdCBwID0gb2JqZWN0cztcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5hcmMocFswXT4+MCwgcFsxXT4+MCwgd2lkdGgsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3VyO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICB9IGVsc2Uge1xuICAgIC8vIGxpc3Qgb2Ygc2hhcGVzIHR5cGVcblxuICAgICAgZm9yIChsZXQgbyBvZiBvYmplY3RzKVxuICAgICAge1xuICAgICAgICBmb3IgKGxldCBlPTA7IGU8by5sZW5ndGgtMTsgZSsrKVxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5fbGluZShvW2VdLCBvW2UrMV0sIGNvbG91ciwgd2lkdGgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIF9saW5lKGEsIGIsIGMsIHcpXG4gIHtcbiAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdztcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjIHx8ICdibGFjayc7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oYVswXT4+MCxhWzFdPj4wKTtcbiAgICB0aGlzLmNvbnRleHQubGluZVRvKGJbMF0+PjAsYlsxXT4+MCk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=