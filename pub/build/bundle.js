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

//
// let area = [
//   [0, 0], [100, 0], [100, 100], [0, 100], [0, 0]
// ];
// console.log( point_in_polygon( [10, 10], area ) );


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmJkMWIwMzNmODk1YTRlNTc0ODUiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJyb3RhdGUiLCJzaGFwZSIsInJ4IiwicnkiLCJkYSIsInBhaXIiLCJyb3RhdGVfcG9pbnQiLCJ0cmFuc2xhdGUiLCJkeCIsImR5IiwiY3giLCJjeSIsImFuZ2xlIiwicCIsInMiLCJNYXRoIiwic2luIiwiYyIsImNvcyIsInhuZXciLCJ5bmV3IiwicG9pbnRfaW5fcG9seWdvbiIsInBvaW50IiwidmVydGljZXMiLCJpIiwibGVuZ3RoIiwiYSIsImIiLCJzZWciLCJzdWJ0cmFjdFBvaW50cyIsInB0IiwiaW5zaWRlIiwiY3Jvc3NQcm9kdWN0IiwiaW50ZXJzZWN0cyIsImFwIiwiYXAyIiwiYXEiLCJhcTIiLCJkb0xpbmVTZWdtZW50c0ludGVyc2VjdCIsImlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrIiwicDIiLCJxIiwicTIiLCJib3gxIiwieG1pbiIsIm1pbiIsInltaW4iLCJ4bWF4IiwibWF4IiwieW1heCIsImJveDIiLCJiYm94X2NvbnRhaW5lZCIsInIiLCJ1TnVtZXJhdG9yIiwiZGVub21pbmF0b3IiLCJlcXVhbFBvaW50cyIsImludGVyc2VjdCIsImtpc3MiLCJhbGxFcXVhbCIsInUiLCJ0IiwicG9pbnQxIiwicG9pbnQyIiwiQXJyYXkiLCJpc0FycmF5IiwicmVzdWx0IiwiYXJncyIsImZpcnN0VmFsdWUiLCJhcmd1bWVudHMiLCJlbGVtZW50IiwicmVuZGVyZXIiLCJzY2VuZSIsImRlYnVnIiwic3RhcnQiLCJlbmQiLCJyb3R4Iiwicm90eSIsIm1vdGlvbiIsInJvdGEiLCJzcV9zbWFsbCIsInNxX2xhcmdlIiwib3RoZXJzIiwiYWRkIiwibyIsImZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicm91dGUiLCJzb2x2ZSIsInZpcyIsImNsZWFyIiwibm9kZXMiLCJuIiwicmVuZGVyIiwiZWRnZXMiLCJvYmplY3RzIiwiUEkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwib25jbGljayIsImUiLCJzcmNFbGVtZW50IiwiY2hlY2tlZCIsIm9ubW91c2Vtb3ZlIiwiY2xpZW50WCIsImNsaWVudFkiLCJTY2VuZSIsImdyYXBoIiwiX3ZpcyIsIm9iamVjdCIsIl9ncmFwaCIsInNob3J0ZXN0Iiwic2hhcGVfaWQiLCJ2ZXJ0ZXgiLCJlcXVhbHMiLCJnIiwiYWRkdmVydGV4IiwiTnVtYmVyIiwibmUiLCJBIiwiQiIsInRlc3RlZGdlIiwiZWRnZXZpc2liaWx0eSIsImFkZGVkZ2UiLCJjb3N0Iiwic3FydCIsInJlcyIsIkdyYXBoIiwibnVtZWRnZXMiLCJ2MSIsInYyIiwiZGVzdCIsImN1cnJlbnRfbm9kZSIsImRpc3QiLCJwcmV2IiwidW52aXNpdGVkIiwiTUFYX1ZBTFVFIiwic2hpZnQiLCJuZWlnaGJvdXIiLCJ0ZW50YXRpdmVfZGlzdCIsInNlcSIsInJldmVyc2UiLCJSZW5kZXJlciIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJjb2xvdXIiLCJiZWdpblBhdGgiLCJhcmMiLCJmaWxsU3R5bGUiLCJmaWxsIiwiX2xpbmUiLCJ3IiwibGluZVdpZHRoIiwic3Ryb2tlU3R5bGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0RBLFNBQVNBLE1BQVQsQ0FBZ0JDLENBQWhCLEVBQW1CQyxDQUFuQixFQUFzQkMsSUFBdEIsRUFDQTtBQUNFLE1BQUlDLFFBQVFELFFBQU0sQ0FBbEI7QUFDQSxNQUFJRSxLQUFLLEVBQVQ7QUFDQTtBQUNBO0FBQ0FBLEtBQUdDLElBQUgsQ0FBUyxDQUFDTCxJQUFJRyxLQUFMLEVBQVlGLElBQUlFLEtBQWhCLENBQVQ7QUFDQTtBQUNBQyxLQUFHQyxJQUFILENBQVMsQ0FBQ0wsSUFBSUcsS0FBTCxFQUFZRixJQUFJRSxLQUFoQixDQUFUO0FBQ0E7QUFDQUMsS0FBR0MsSUFBSCxDQUFTLENBQUNMLElBQUlHLEtBQUwsRUFBWUYsSUFBSUUsS0FBaEIsQ0FBVDtBQUNBO0FBQ0FDLEtBQUdDLElBQUgsQ0FBUyxDQUFDTCxJQUFJRyxLQUFMLEVBQVlGLElBQUlFLEtBQWhCLENBQVQ7QUFDQTtBQUNBQyxLQUFHQyxJQUFILENBQVMsQ0FBQ0wsSUFBSUcsS0FBTCxFQUFZRixJQUFJRSxLQUFoQixDQUFUOztBQUVBLFNBQU9DLEVBQVA7QUFDRDs7QUFFRCxTQUFTRSxNQUFULENBQWdCQyxLQUFoQixFQUF1QkMsRUFBdkIsRUFBMkJDLEVBQTNCLEVBQStCQyxFQUEvQixFQUNBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ0UseUJBQWlCSCxLQUFqQiw4SEFDQTtBQUFBLFVBRFNJLElBQ1Q7O0FBQ0VBLGFBQU9DLGFBQWFKLEVBQWIsRUFBaUJDLEVBQWpCLEVBQXFCQyxFQUFyQixFQUF5QkMsSUFBekIsQ0FBUDtBQUNEO0FBSkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1DOztBQUVELFNBQVNFLFNBQVQsQ0FBbUJOLEtBQW5CLEVBQTBCTyxFQUExQixFQUE4QkMsRUFBOUIsRUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNFLDBCQUFpQlIsS0FBakIsbUlBQ0E7QUFBQSxVQURTSSxJQUNUOztBQUNFQSxXQUFLLENBQUwsS0FBV0csRUFBWDtBQUNBSCxXQUFLLENBQUwsS0FBV0ksRUFBWDtBQUNEO0FBTEg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1DOztBQUVELFNBQVNILFlBQVQsQ0FBc0JJLEVBQXRCLEVBQTBCQyxFQUExQixFQUE4QkMsS0FBOUIsRUFBcUNDLENBQXJDLEVBQ0E7QUFDRSxNQUFJQyxJQUFJQyxLQUFLQyxHQUFMLENBQVNKLEtBQVQsQ0FBUjtBQUNBLE1BQUlLLElBQUlGLEtBQUtHLEdBQUwsQ0FBU04sS0FBVCxDQUFSOztBQUVBO0FBQ0FDLElBQUUsQ0FBRixLQUFRSCxFQUFSO0FBQ0FHLElBQUUsQ0FBRixLQUFRRixFQUFSOztBQUVBO0FBQ0EsTUFBSVEsT0FBT04sRUFBRSxDQUFGLElBQU9JLENBQVAsR0FBV0osRUFBRSxDQUFGLElBQU9DLENBQTdCO0FBQ0EsTUFBSU0sT0FBT1AsRUFBRSxDQUFGLElBQU9DLENBQVAsR0FBV0QsRUFBRSxDQUFGLElBQU9JLENBQTdCOztBQUVBO0FBQ0FKLElBQUUsQ0FBRixJQUFPTSxPQUFPVCxFQUFkO0FBQ0FHLElBQUUsQ0FBRixJQUFPTyxPQUFPVCxFQUFkOztBQUVBLFNBQU9FLENBQVA7QUFDRDs7QUFHRCxTQUFTUSxnQkFBVCxDQUEwQkMsS0FBMUIsRUFBaUNDLFFBQWpDLEVBQ0E7QUFDRSxPQUFLLElBQUlDLElBQUUsQ0FBWCxFQUFjQSxJQUFFRCxTQUFTRSxNQUFULEdBQWdCLENBQWhDLEVBQW1DRCxHQUFuQyxFQUNBO0FBQ0UsUUFBSUUsSUFBSUgsU0FBU0MsQ0FBVCxDQUFSO0FBQ0EsUUFBSUcsSUFBSUosU0FBU0MsSUFBRSxDQUFYLENBQVI7O0FBRUEsUUFBSUksTUFBTUMsZUFBZUYsQ0FBZixFQUFrQkQsQ0FBbEIsQ0FBVjtBQUNBLFFBQUlJLEtBQUtELGVBQWVQLEtBQWYsRUFBc0JJLENBQXRCLENBQVQ7QUFDQSxRQUFJSyxTQUFVQyxhQUFhSixHQUFiLEVBQWtCRSxFQUFsQixJQUF3QixDQUF0QztBQUNBO0FBQ0EsUUFBSSxDQUFDQyxNQUFMLEVBQWEsT0FBTyxLQUFQO0FBQ2Q7O0FBRUQsU0FBTyxJQUFQO0FBQ0Q7O0FBR0Q7Ozs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsU0FBU0UsVUFBVCxDQUFvQkMsRUFBcEIsRUFBd0JDLEdBQXhCLEVBQTZCQyxFQUE3QixFQUFpQ0MsR0FBakMsRUFDQTtBQUNFO0FBQ0EsU0FBT0Msd0JBQXlCLEVBQUM1QyxHQUFHd0MsR0FBRyxDQUFILENBQUosRUFBV3ZDLEdBQUd1QyxHQUFHLENBQUgsQ0FBZCxFQUF6QixFQUErQyxFQUFDeEMsR0FBR3lDLElBQUksQ0FBSixDQUFKLEVBQVl4QyxHQUFHd0MsSUFBSSxDQUFKLENBQWYsRUFBL0MsRUFDeUIsRUFBQ3pDLEdBQUcwQyxHQUFHLENBQUgsQ0FBSixFQUFXekMsR0FBR3lDLEdBQUcsQ0FBSCxDQUFkLEVBRHpCLEVBQytDLEVBQUMxQyxHQUFHMkMsSUFBSSxDQUFKLENBQUosRUFBWTFDLEdBQUcwQyxJQUFJLENBQUosQ0FBZixFQUQvQyxDQUFQO0FBRUQ7O0FBRUQsU0FBU0UsK0NBQVQsQ0FBeUQxQixDQUF6RCxFQUE0RDJCLEVBQTVELEVBQWdFQyxDQUFoRSxFQUFtRUMsRUFBbkUsRUFDQTtBQUNFLE1BQUlDLE9BQU87QUFDVEMsVUFBTTdCLEtBQUs4QixHQUFMLENBQVNoQyxFQUFFbkIsQ0FBWCxFQUFjOEMsR0FBRzlDLENBQWpCLENBREc7QUFFVG9ELFVBQU0vQixLQUFLOEIsR0FBTCxDQUFTaEMsRUFBRWxCLENBQVgsRUFBYzZDLEdBQUc3QyxDQUFqQixDQUZHO0FBR1RvRCxVQUFNaEMsS0FBS2lDLEdBQUwsQ0FBU25DLEVBQUVuQixDQUFYLEVBQWM4QyxHQUFHOUMsQ0FBakIsQ0FIRztBQUlUdUQsVUFBTWxDLEtBQUtpQyxHQUFMLENBQVNuQyxFQUFFbEIsQ0FBWCxFQUFjNkMsR0FBRzdDLENBQWpCO0FBSkcsR0FBWDs7QUFPQSxNQUFJdUQsT0FBTztBQUNUTixVQUFNN0IsS0FBSzhCLEdBQUwsQ0FBU0osRUFBRS9DLENBQVgsRUFBY2dELEdBQUdoRCxDQUFqQixDQURHO0FBRVRvRCxVQUFNL0IsS0FBSzhCLEdBQUwsQ0FBU0osRUFBRTlDLENBQVgsRUFBYytDLEdBQUcvQyxDQUFqQixDQUZHO0FBR1RvRCxVQUFNaEMsS0FBS2lDLEdBQUwsQ0FBU1AsRUFBRS9DLENBQVgsRUFBY2dELEdBQUdoRCxDQUFqQixDQUhHO0FBSVR1RCxVQUFNbEMsS0FBS2lDLEdBQUwsQ0FBU1AsRUFBRTlDLENBQVgsRUFBYytDLEdBQUcvQyxDQUFqQjtBQUpHLEdBQVg7O0FBT0EsU0FBT3dELGVBQWVSLElBQWYsRUFBcUJPLElBQXJCLEtBQThCQyxlQUFlRCxJQUFmLEVBQXFCUCxJQUFyQixDQUFyQztBQUNEOztBQUVELFNBQVNRLGNBQVQsQ0FBd0J6QixDQUF4QixFQUEyQkMsQ0FBM0IsRUFDQTtBQUNFO0FBQ0EsU0FBUUEsRUFBRWlCLElBQUYsSUFBVWxCLEVBQUVrQixJQUFaLElBQW9CakIsRUFBRW9CLElBQUYsSUFBVXJCLEVBQUVxQixJQUFqQyxJQUEyQ3BCLEVBQUVtQixJQUFGLElBQVVwQixFQUFFb0IsSUFBWixJQUFvQm5CLEVBQUVzQixJQUFGLElBQVV2QixFQUFFdUIsSUFBbEY7QUFDRDs7QUFHRCxTQUFTWCx1QkFBVCxDQUFpQ3pCLENBQWpDLEVBQW9DMkIsRUFBcEMsRUFBd0NDLENBQXhDLEVBQTJDQyxFQUEzQyxFQUNBO0FBQ0U7O0FBRUQsTUFBSVUsSUFBSXZCLGVBQWVXLEVBQWYsRUFBbUIzQixDQUFuQixDQUFSO0FBQ0EsTUFBSUMsSUFBSWUsZUFBZWEsRUFBZixFQUFtQkQsQ0FBbkIsQ0FBUjs7QUFFQSxNQUFJWSxhQUFhckIsYUFBYUgsZUFBZVksQ0FBZixFQUFrQjVCLENBQWxCLENBQWIsRUFBbUN1QyxDQUFuQyxDQUFqQjtBQUNBLE1BQUlFLGNBQWN0QixhQUFhb0IsQ0FBYixFQUFnQnRDLENBQWhCLENBQWxCOztBQUVBLE1BQUl1QyxjQUFjLENBQWQsSUFBbUJDLGVBQWUsQ0FBdEMsRUFBeUM7QUFDeEM7O0FBRUU7O0FBRUY7QUFDQSxRQUFJQyxZQUFZMUMsQ0FBWixFQUFlNEIsQ0FBZixLQUFxQmMsWUFBWTFDLENBQVosRUFBZTZCLEVBQWYsQ0FBckIsSUFBMkNhLFlBQVlmLEVBQVosRUFBZ0JDLENBQWhCLENBQTNDLElBQWlFYyxZQUFZZixFQUFaLEVBQWdCRSxFQUFoQixDQUFyRSxFQUEwRjtBQUN6RixhQUFPO0FBQ0ZjLG1CQUFXLElBRFQ7QUFFRkMsY0FBTSxDQUFDbEIsZ0RBQWdEMUIsQ0FBaEQsRUFBbUQyQixFQUFuRCxFQUF1REMsQ0FBdkQsRUFBMERDLEVBQTFEO0FBRkwsT0FBUDtBQUtBO0FBQ0Q7O0FBRUU7O0FBRUYsV0FBTztBQUNIYyxpQkFDTSxDQUFDRSxTQUNGakIsRUFBRS9DLENBQUYsR0FBTW1CLEVBQUVuQixDQUFSLEdBQVksQ0FEVixFQUVGK0MsRUFBRS9DLENBQUYsR0FBTThDLEdBQUc5QyxDQUFULEdBQWEsQ0FGWCxFQUdGZ0QsR0FBR2hELENBQUgsR0FBT21CLEVBQUVuQixDQUFULEdBQWEsQ0FIWCxFQUlGZ0QsR0FBR2hELENBQUgsR0FBTzhDLEdBQUc5QyxDQUFWLEdBQWMsQ0FKWixDQUFELElBS0gsQ0FBQ2dFLFNBQ0NqQixFQUFFOUMsQ0FBRixHQUFNa0IsRUFBRWxCLENBQVIsR0FBWSxDQURiLEVBRUM4QyxFQUFFOUMsQ0FBRixHQUFNNkMsR0FBRzdDLENBQVQsR0FBYSxDQUZkLEVBR0MrQyxHQUFHL0MsQ0FBSCxHQUFPa0IsRUFBRWxCLENBQVQsR0FBYSxDQUhkLEVBSUMrQyxHQUFHL0MsQ0FBSCxHQUFPNkMsR0FBRzdDLENBQVYsR0FBYyxDQUpmLENBUEQ7QUFZRDhELFlBQU07QUFaTCxLQUFQO0FBZUE7O0FBRUQsTUFBSUgsZUFBZSxDQUFuQixFQUFzQjtBQUNyQjtBQUNBLFdBQU8sRUFBQ0UsV0FBVyxLQUFaLEVBQW1CQyxNQUFNLEtBQXpCLEVBQVA7QUFDQTs7QUFFRCxNQUFJRSxJQUFJTixhQUFhQyxXQUFyQjtBQUNBLE1BQUlNLElBQUk1QixhQUFhSCxlQUFlWSxDQUFmLEVBQWtCNUIsQ0FBbEIsQ0FBYixFQUFtQ0MsQ0FBbkMsSUFBd0N3QyxXQUFoRDs7QUFFQztBQUNBLE1BQUlHLE9BQU8sS0FBWDs7QUFFQSxNQUFJRixZQUFZMUMsQ0FBWixFQUFlNEIsQ0FBZixLQUFxQmMsWUFBWTFDLENBQVosRUFBZTZCLEVBQWYsQ0FBckIsSUFBMkNhLFlBQVlmLEVBQVosRUFBZ0JDLENBQWhCLENBQTNDLElBQWlFYyxZQUFZZixFQUFaLEVBQWdCRSxFQUFoQixDQUFyRSxFQUNFZSxPQUFPLElBQVA7O0FBRUY7QUFDQTtBQUNBLFNBQU87QUFDTEQsZUFBWUksS0FBSyxDQUFOLElBQWFBLEtBQUssQ0FBbEIsSUFBeUJELEtBQUssQ0FBOUIsSUFBcUNBLEtBQUssQ0FEaEQ7QUFFTEYsVUFBTUE7QUFGRCxHQUFQOztBQUtBOztBQUVEO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBUUEsU0FBU3pCLFlBQVQsQ0FBc0I2QixNQUF0QixFQUE4QkMsTUFBOUIsRUFBc0M7O0FBRXBDLE1BQUlDLE1BQU1DLE9BQU4sQ0FBY0gsTUFBZCxDQUFKLEVBQ0UsT0FBT0EsT0FBTyxDQUFQLElBQVlDLE9BQU8sQ0FBUCxDQUFaLEdBQXdCRCxPQUFPLENBQVAsSUFBWUMsT0FBTyxDQUFQLENBQTNDLENBREYsS0FHRSxPQUFPRCxPQUFPbkUsQ0FBUCxHQUFXb0UsT0FBT25FLENBQWxCLEdBQXNCa0UsT0FBT2xFLENBQVAsR0FBV21FLE9BQU9wRSxDQUEvQztBQUNIOztBQUVEOzs7Ozs7OztBQVFBLFNBQVNtQyxjQUFULENBQXdCZ0MsTUFBeEIsRUFBZ0NDLE1BQWhDLEVBQXdDOztBQUV0QyxNQUFJQyxNQUFNQyxPQUFOLENBQWNILE1BQWQsQ0FBSixFQUNBO0FBQ0UsV0FBTyxDQUFFQSxPQUFPLENBQVAsSUFBWUMsT0FBTyxDQUFQLENBQWQsRUFBeUJELE9BQU8sQ0FBUCxJQUFZQyxPQUFPLENBQVAsQ0FBckMsQ0FBUDtBQUNELEdBSEQsTUFHTztBQUNMLFFBQUlHLFNBQVMsRUFBYjtBQUNBQSxXQUFPdkUsQ0FBUCxHQUFXbUUsT0FBT25FLENBQVAsR0FBV29FLE9BQU9wRSxDQUE3QjtBQUNBdUUsV0FBT3RFLENBQVAsR0FBV2tFLE9BQU9sRSxDQUFQLEdBQVdtRSxPQUFPbkUsQ0FBN0I7O0FBRUEsV0FBT3NFLE1BQVA7QUFDRDtBQUNGOztBQUVEOzs7Ozs7OztBQVFBLFNBQVNWLFdBQVQsQ0FBcUJNLE1BQXJCLEVBQTZCQyxNQUE3QixFQUFxQztBQUNwQyxTQUFRRCxPQUFPbkUsQ0FBUCxJQUFZb0UsT0FBT3BFLENBQXBCLElBQTJCbUUsT0FBT2xFLENBQVAsSUFBWW1FLE9BQU9uRSxDQUFyRDtBQUNBOztBQUVEOzs7Ozs7O0FBT0EsU0FBUytELFFBQVQsQ0FBa0JRLElBQWxCLEVBQXdCO0FBQ3ZCLE1BQUlDLGFBQWFDLFVBQVUsQ0FBVixDQUFqQjtBQUFBLE1BQ0M1QyxDQUREO0FBRUEsT0FBS0EsSUFBSSxDQUFULEVBQVlBLElBQUk0QyxVQUFVM0MsTUFBMUIsRUFBa0NELEtBQUssQ0FBdkMsRUFBMEM7QUFDekMsUUFBSTRDLFVBQVU1QyxDQUFWLEtBQWdCMkMsVUFBcEIsRUFBZ0M7QUFDL0IsYUFBTyxLQUFQO0FBQ0E7QUFDRDtBQUNELFNBQU8sSUFBUDtBQUNBOztRQUlPMUUsTSxHQUFBQSxNO1FBQVF3QyxVLEdBQUFBLFU7UUFBWWpDLE0sR0FBQUEsTTtRQUFRTyxTLEdBQUFBLFM7UUFBV2MsZ0IsR0FBQUEsZ0I7Ozs7Ozs7OztBQzdRL0M7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0EsSUFBTWdELFVBQVUsU0FBaEI7O0FBRUEsSUFBSUMsV0FBVyx1QkFBYUQsT0FBYixDQUFmO0FBQ0EsSUFBSUUsUUFBUSxxQkFBWjs7QUFFQTtBQUNBLElBQUlDLFFBQVEsSUFBWjs7QUFFQTtBQUNBLElBQUlDLFFBQVEsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUFaO0FBQ0EsSUFBSUMsTUFBTSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQVY7O0FBRUE7QUFDQSxJQUFJQyxPQUFPLEdBQVg7QUFBQSxJQUFnQkMsT0FBTyxHQUF2QjtBQUNBLElBQUlDLFNBQVMsQ0FBYjtBQUFBLElBQWdCQyxPQUFPLENBQXZCOztBQUVBO0FBQ0EsSUFBSUMsV0FBVyxrQkFBTyxFQUFQLEVBQVcsR0FBWCxFQUFnQixHQUFoQixDQUFmO0FBQ0EsSUFBSUMsV0FBVyxrQkFBT0wsSUFBUCxFQUFhQyxJQUFiLEVBQW1CLEdBQW5CLENBQWY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxJQUFJSyxTQUFXLENBQUUsa0JBQU8sRUFBUCxFQUFXLEdBQVgsRUFBZ0IsRUFBaEIsQ0FBRixFQUF1QixrQkFBTyxHQUFQLEVBQVksR0FBWixFQUFpQixHQUFqQixDQUF2QixFQUE4QyxrQkFBTyxHQUFQLEVBQVksR0FBWixFQUFpQixHQUFqQixDQUE5QyxDQUFmOztBQUVBO0FBQ0FWLE1BQU1XLEdBQU4sQ0FBV0gsUUFBWDtBQUNBUixNQUFNVyxHQUFOLENBQVdGLFFBQVg7Ozs7Ozs7QUFFQSx1QkFBY0MsTUFBZDtBQUFBLFFBQVNFLENBQVQ7O0FBQ0VaLFVBQU1XLEdBQU4sQ0FBV0MsQ0FBWDtBQURGOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0FDOztBQUVBLFNBQVNBLEtBQVQsR0FDQTtBQUNFQyx3QkFBdUJELEtBQXZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUlFLFFBQVFmLE1BQU1nQixLQUFOLENBQWFkLEtBQWIsRUFBb0JDLEdBQXBCLENBQVo7O0FBRUE7QUFDQSxNQUFJYyxNQUFNakIsTUFBTWlCLEdBQU4sRUFBVjs7QUFFQWxCLFdBQVNtQixLQUFUOztBQUVBLE1BQUlqQixLQUFKLEVBQ0E7QUFDRTtBQURGO0FBQUE7QUFBQTs7QUFBQTtBQUVFLDRCQUFjZ0IsSUFBSUUsS0FBbEI7QUFBQSxZQUFTQyxDQUFUOztBQUNFckIsaUJBQVNzQixNQUFULENBQWlCRCxDQUFqQixFQUFvQixNQUFwQixFQUE0QixDQUE1QjtBQURGLE9BRkYsQ0FLRTtBQUxGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTUVyQixhQUFTc0IsTUFBVCxDQUFpQkosSUFBSUssS0FBckIsRUFBNEIsTUFBNUI7QUFDRDs7QUFFRDtBQUNBdkIsV0FBU3NCLE1BQVQsQ0FBaUJuQixLQUFqQixFQUF3QixNQUF4QixFQUFnQyxDQUFoQztBQUNBSCxXQUFTc0IsTUFBVCxDQUFpQmxCLEdBQWpCLEVBQXNCLE1BQXRCLEVBQThCLENBQTlCO0FBQ0FKLFdBQVNzQixNQUFULENBQWlCckIsTUFBTXVCLE9BQXZCLEVBQWdDLE1BQWhDOztBQUVBO0FBQ0F4QixXQUFTc0IsTUFBVCxDQUFpQixDQUFDTixLQUFELENBQWpCLEVBQTBCLE1BQTFCLEVBQWtDLENBQWxDOztBQUVBO0FBQ0FULFlBQVUsSUFBVixDQWhDRixDQWdDa0I7QUFDaEIsdUJBQVVFLFFBQVYsRUFBb0IsSUFBSWhFLEtBQUtDLEdBQUwsQ0FBUzZELFNBQVMsSUFBVCxHQUFnQjlELEtBQUtnRixFQUE5QixDQUF4QixFQUEyRCxDQUEzRDs7QUFFQTtBQUNBLG9CQUFPZixRQUFQLEVBQWlCTCxJQUFqQixFQUF1QkMsSUFBdkIsRUFBNkIsS0FBN0I7QUFFRDs7QUFFRG9CLFNBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0NDLE9BQXBDLEdBQThDLFVBQUNDLENBQUQsRUFBSWxGLENBQUosRUFBVTtBQUN0RHVELFVBQVEyQixFQUFFQyxVQUFGLENBQWFDLE9BQXJCO0FBQ0QsQ0FGRDs7QUFJQUwsU0FBU0MsY0FBVCxDQUF3QjVCLE9BQXhCLEVBQWlDaUMsV0FBakMsR0FBK0MsYUFBSztBQUNsRDVCLFFBQU0sQ0FBQ3lCLEVBQUVJLE9BQUgsRUFBWUosRUFBRUssT0FBZCxDQUFOO0FBQ0QsQ0FGRCxDOzs7Ozs7Ozs7Ozs7Ozs7QUN6RkE7Ozs7QUFDQTs7Ozs7O0lBRXFCQyxLO0FBRW5CLG1CQUNBO0FBQUE7O0FBQ0UsU0FBS1gsT0FBTCxHQUFlLEVBQWY7QUFDQSxTQUFLWSxLQUFMLEdBQWEsSUFBYjs7QUFFQTtBQUNBLFNBQUtDLElBQUwsR0FBWSxJQUFaO0FBQ0Q7Ozs7d0JBRUdDLE0sRUFDSjtBQUNFLFdBQUtkLE9BQUwsQ0FBYS9GLElBQWIsQ0FBa0I2RyxNQUFsQjtBQUNEOzs7MEJBRUtuQyxLLEVBQU9DLEcsRUFDYjtBQUNFLFdBQUtnQyxLQUFMLEdBQWEsS0FBS0csTUFBTCxDQUFZcEMsS0FBWixFQUFtQkMsR0FBbkIsQ0FBYjtBQUNBLFVBQUlnQixRQUFRLEtBQUtnQixLQUFMLENBQVdJLFFBQVgsQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsQ0FBWixDQUZGLENBRXlDOztBQUV2QyxVQUFJeEIsUUFBUSxFQUFaO0FBSkY7QUFBQTtBQUFBOztBQUFBO0FBS0UsNkJBQWNJLEtBQWQsOEhBQ0E7QUFBQSxjQURTQyxDQUNUOztBQUNFTCxnQkFBTXZGLElBQU4sQ0FBVyxLQUFLNEcsSUFBTCxDQUFVakIsS0FBVixDQUFpQkMsQ0FBakIsQ0FBWDtBQUNEO0FBUkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFVRSxhQUFPTCxLQUFQO0FBQ0Q7OzswQkFHRDtBQUNFLGFBQU8sS0FBS3FCLElBQVo7QUFDRDs7QUFFRDs7OzsyQkFDT2xDLEssRUFBT0MsRyxFQUNkO0FBQ0UsVUFBSWdCLFFBQVEsRUFBWjtBQUNBLFVBQUlHLFFBQVEsRUFBWjs7QUFFQTtBQUNBLFdBQUtjLElBQUwsR0FBWSxFQUFFakIsT0FBTyxFQUFULEVBQWFHLE9BQU8sRUFBcEIsRUFBWjs7QUFFQTtBQUNBO0FBQ0EsVUFBSWtCLFdBQVcsQ0FBZjs7QUFFQTtBQUNBckIsWUFBTTNGLElBQU4sQ0FBWSxFQUFDaUgsUUFBUXZDLEtBQVQsRUFBaUJ4RSxPQUFPOEcsVUFBeEIsRUFBWixFQVpGLENBWXFEO0FBQ25EckIsWUFBTTNGLElBQU4sQ0FBWSxFQUFDaUgsUUFBUXRDLEdBQVQsRUFBaUJ6RSxPQUFPOEcsVUFBeEIsRUFBWixFQWJGLENBYXFEOztBQUVuRDtBQWZGO0FBQUE7QUFBQTs7QUFBQTtBQWdCRSw4QkFBYyxLQUFLakIsT0FBbkIsbUlBQ0E7QUFBQSxjQURTWCxDQUNUOztBQUNFNEI7O0FBRUEsY0FBSVosVUFBSjtBQUNBLGVBQUtBLElBQUUsQ0FBUCxFQUFVQSxJQUFFaEIsRUFBRTFELE1BQUYsR0FBUyxDQUFyQixFQUF3QjBFLEdBQXhCLEVBQ0E7QUFDRU4sa0JBQU05RixJQUFOLENBQVcsQ0FBQ29GLEVBQUVnQixDQUFGLENBQUQsRUFBT2hCLEVBQUVnQixJQUFFLENBQUosQ0FBUCxDQUFYOztBQUVBVCxrQkFBTTNGLElBQU4sQ0FBVztBQUNUaUgsc0JBQVE3QixFQUFFZ0IsQ0FBRixDQURDO0FBRVRsRyxxQkFBTzhHO0FBRkUsYUFBWDtBQUtEO0FBQ0Q7QUFDQSxjQUFJLENBQUNFLE9BQU85QixFQUFFLENBQUYsQ0FBUCxFQUFhQSxFQUFFZ0IsQ0FBRixDQUFiLENBQUwsRUFDRVQsTUFBTTNGLElBQU4sQ0FBVztBQUNUaUgsb0JBQVE3QixFQUFFZ0IsQ0FBRixDQURDO0FBRVRsRyxtQkFBTzhHO0FBRkUsV0FBWDtBQUlIO0FBckNIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBdUNFLFVBQUlHLElBQUkscUJBQVI7O0FBRUE7QUFDQSxXQUFLLElBQUkxRixDQUFULElBQWNrRSxLQUFkLEVBQ0E7QUFDRXdCLFVBQUVDLFNBQUYsQ0FBWUMsT0FBTzVGLENBQVAsQ0FBWjs7QUFFQTtBQUNBLGFBQUttRixJQUFMLENBQVVqQixLQUFWLENBQWdCM0YsSUFBaEIsQ0FBcUIyRixNQUFNMEIsT0FBTzVGLENBQVAsQ0FBTixFQUFpQndGLE1BQXRDO0FBQ0Q7O0FBRUQ7O0FBRUEsVUFBSUssS0FBRyxDQUFQOztBQUVBLFdBQUssSUFBSTNILElBQUUsQ0FBWCxFQUFjQSxJQUFFZ0csTUFBTWpFLE1BQU4sR0FBYSxDQUE3QixFQUFnQy9CLEdBQWhDO0FBQ0UsYUFBSyxJQUFJQyxJQUFFRCxJQUFFLENBQWIsRUFBZ0JDLElBQUUrRixNQUFNakUsTUFBeEIsRUFBZ0M5QixHQUFoQyxFQUNBO0FBQ0ksY0FBSTJILElBQUk1QixNQUFNaEcsQ0FBTixDQUFSO0FBQ0EsY0FBSTZILElBQUk3QixNQUFNL0YsQ0FBTixDQUFSOztBQUVBO0FBQ0E7QUFDQSxjQUFJMkgsRUFBRXJILEtBQUYsSUFBV3NILEVBQUV0SCxLQUFqQixFQUF3Qjs7QUFFeEIsY0FBSXVILFdBQVcsQ0FBQ0YsRUFBRU4sTUFBSCxFQUFXTyxFQUFFUCxNQUFiLENBQWY7O0FBRUEsY0FBSVMsY0FBY0QsUUFBZCxFQUF3QjNCLEtBQXhCLENBQUosRUFDQTtBQUNFcUIsY0FBRVEsT0FBRixDQUFVaEksQ0FBVixFQUFhQyxDQUFiLEVBQWdCZ0ksS0FBS0wsRUFBRU4sTUFBUCxFQUFlTyxFQUFFUCxNQUFqQixDQUFoQjs7QUFFQTtBQUNBLGlCQUFLTCxJQUFMLENBQVVkLEtBQVYsQ0FBZ0I5RixJQUFoQixDQUFxQixDQUFDdUgsRUFBRU4sTUFBSCxFQUFXTyxFQUFFUCxNQUFiLENBQXJCO0FBQ0Q7QUFFSjtBQXBCSCxPQXVCQSxPQUFPRSxDQUFQO0FBQ0Q7Ozs7OztrQkFuSGtCVCxLOzs7QUF5SHJCLFNBQVNrQixJQUFULENBQWNqRyxDQUFkLEVBQWlCQyxDQUFqQixFQUNBO0FBQ0UsTUFBSW5CLEtBQUttQixFQUFFLENBQUYsSUFBT0QsRUFBRSxDQUFGLENBQWhCLENBREYsQ0FDdUI7QUFDckIsTUFBSWpCLEtBQUtrQixFQUFFLENBQUYsSUFBT0QsRUFBRSxDQUFGLENBQWhCO0FBQ0EsU0FBT1gsS0FBSzZHLElBQUwsQ0FBV3BILEtBQUdBLEVBQUgsR0FBUUMsS0FBR0EsRUFBdEIsQ0FBUDtBQUVEOztBQUVELFNBQVNnSCxhQUFULENBQXVCRCxRQUF2QixFQUFpQzNCLEtBQWpDLEVBQ0E7QUFDRTs7QUFFQSxPQUFLLElBQUlqQyxJQUFFLENBQVgsRUFBY0EsSUFBRWlDLE1BQU1wRSxNQUF0QixFQUE4Qm1DLEdBQTlCLEVBQ0E7QUFDRSxRQUFJdUMsSUFBSU4sTUFBTWpDLENBQU4sQ0FBUjs7QUFFQSxRQUFJaUUsTUFBTSxzQkFBV0wsU0FBUyxDQUFULENBQVgsRUFBd0JBLFNBQVMsQ0FBVCxDQUF4QixFQUFxQ3JCLEVBQUUsQ0FBRixDQUFyQyxFQUEyQ0EsRUFBRSxDQUFGLENBQTNDLENBQVY7O0FBRUE7QUFDQTtBQUNBLFFBQUkwQixJQUFJckUsU0FBSixJQUFpQixDQUFDcUUsSUFBSXBFLElBQTFCLEVBQ0UsT0FBTyxLQUFQO0FBRUg7O0FBRUQsU0FBTyxJQUFQO0FBQ0Q7O0FBR0QsU0FBU3dELE1BQVQsQ0FBZ0J2RixDQUFoQixFQUFtQkMsQ0FBbkIsRUFDQTtBQUNFLFNBQVFELEVBQUUsQ0FBRixLQUFRQyxFQUFFLENBQUYsQ0FBUixJQUFnQkQsRUFBRSxDQUFGLEtBQVFDLEVBQUUsQ0FBRixDQUFoQztBQUNELEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDNUpvQm1HLEs7QUFFbkIsbUJBQ0E7QUFBQTs7QUFDRSxTQUFLdkcsUUFBTCxHQUFnQixFQUFoQjtBQUNBLFNBQUtzRSxLQUFMLEdBQWEsRUFBYjtBQUNBLFNBQUtrQyxRQUFMLEdBQWdCLENBQWhCO0FBQ0Q7Ozs7OEJBRVNwQyxDLEVBQ1Y7QUFDRSxXQUFLcEUsUUFBTCxDQUFjeEIsSUFBZCxDQUFtQjRGLENBQW5CO0FBQ0EsV0FBS0UsS0FBTCxDQUFXRixDQUFYLElBQWdCLEVBQWhCO0FBQ0Q7O0FBRUQ7Ozs7NEJBQ1FxQyxFLEVBQUlDLEUsRUFBSU4sSSxFQUNoQjtBQUNFLFdBQUs5QixLQUFMLENBQVdtQyxFQUFYLEVBQWVqSSxJQUFmLENBQW9CLEVBQUNtSSxNQUFLRCxFQUFOLEVBQVVOLFVBQVYsRUFBcEI7QUFDQSxXQUFLOUIsS0FBTCxDQUFXb0MsRUFBWCxFQUFlbEksSUFBZixDQUFvQixFQUFDbUksTUFBS0YsRUFBTixFQUFVTCxVQUFWLEVBQXBCOztBQUVBLFdBQUtJLFFBQUw7QUFDRDs7QUFFRDtBQUNBOzs7OzZCQUNTdEQsSyxFQUFPQyxHLEVBQ2hCO0FBQ0UsVUFBSXlELHFCQUFKO0FBQ0EsVUFBSUMsT0FBTyxDQUFDLENBQUQsQ0FBWDtBQUNBLFVBQUlDLE9BQU8sRUFBWDtBQUNBLFVBQUlDLFlBQVksRUFBaEI7O0FBRUEsV0FBSyxJQUFJOUcsSUFBRSxDQUFYLEVBQWNBLElBQUUsS0FBS0QsUUFBTCxDQUFjRSxNQUE5QixFQUFzQ0QsR0FBdEMsRUFDQTtBQUNFLFlBQUlBLENBQUosRUFBTzRHLEtBQUs1RyxDQUFMLElBQVU0RixPQUFPbUIsU0FBakI7QUFDUEQsa0JBQVU5RyxDQUFWLElBQWVBLENBQWY7QUFDQTZHLGFBQUs3RyxDQUFMLElBQVUsSUFBVjtBQUNEOztBQUVEO0FBQ0EsYUFBTyxDQUFDMkcsZUFBZUcsVUFBVUUsS0FBVixFQUFoQixLQUFzQyxJQUE3QyxFQUNBO0FBQ0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSyxJQUFJNUUsSUFBRSxDQUFYLEVBQWNBLElBQUUsS0FBS2lDLEtBQUwsQ0FBV3NDLFlBQVgsRUFBeUIxRyxNQUF6QyxFQUFpRG1DLEdBQWpELEVBQ0E7QUFDRTtBQUNBLGNBQUk2RSxZQUFZLEtBQUs1QyxLQUFMLENBQVdzQyxZQUFYLEVBQXlCdkUsQ0FBekIsRUFBNEJzRSxJQUE1Qzs7QUFFQTtBQUNBLGNBQUlQLE9BQU8sS0FBSzlCLEtBQUwsQ0FBV3NDLFlBQVgsRUFBeUJ2RSxDQUF6QixFQUE0QitELElBQXZDOztBQUVBO0FBQ0EsY0FBSWUsaUJBQWlCTixLQUFLRCxZQUFMLElBQXFCUixJQUExQzs7QUFFQTtBQUNBLGNBQUllLGlCQUFpQk4sS0FBS0ssU0FBTCxDQUFyQixFQUNBO0FBQ0VMLGlCQUFLSyxTQUFMLElBQWtCQyxjQUFsQixDQURGLENBQ29DO0FBQ2xDTCxpQkFBS0ksU0FBTCxJQUFrQk4sWUFBbEIsQ0FGRixDQUVvQztBQUNuQztBQUVGO0FBQ0Y7O0FBRUQsVUFBSWxILElBQUl5RCxHQUFSO0FBQUEsVUFBYWlFLE1BQUssQ0FBQ2pFLEdBQUQsQ0FBbEI7O0FBRUE7QUFDQSxVQUFJMkQsS0FBS3BILENBQUwsS0FBVyxJQUFmLEVBQ0UsT0FBTyxFQUFQOztBQUVGLFNBQUc7QUFDREEsWUFBSW9ILEtBQUtwSCxDQUFMLENBQUo7QUFDQTBILFlBQUk1SSxJQUFKLENBQVNrQixDQUFUO0FBQ0QsT0FIRCxRQUdRQSxLQUFLd0QsS0FIYjs7QUFLQSxhQUFPa0UsSUFBSUMsT0FBSixFQUFQO0FBRUQ7Ozs7OztrQkFuRmtCZCxLOzs7Ozs7Ozs7Ozs7Ozs7OztJQ0NBZSxRO0FBRW5CLG9CQUFZeEUsT0FBWixFQUNBO0FBQUE7O0FBQ0UsU0FBS0EsT0FBTCxHQUFlMkIsU0FBU0MsY0FBVCxDQUF3QjVCLE9BQXhCLENBQWY7QUFDQSxTQUFLeUUsT0FBTCxHQUFlLEtBQUt6RSxPQUFMLENBQWEwRSxVQUFiLENBQXdCLElBQXhCLENBQWY7QUFDRDs7Ozs0QkFHRDtBQUNFLFdBQUtELE9BQUwsQ0FBYUUsU0FBYixDQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixLQUFLM0UsT0FBTCxDQUFhNEUsS0FBMUMsRUFBaUQsS0FBSzVFLE9BQUwsQ0FBYTZFLE1BQTlEO0FBQ0Q7OzsyQkFFTXBELE8sRUFDUDtBQUFBLFVBRGdCcUQsTUFDaEIsdUVBRHlCLE1BQ3pCO0FBQUEsVUFEaUNGLEtBQ2pDLHVFQUR5QyxDQUN6Qzs7QUFDRSxVQUFJLENBQUNsRixNQUFNQyxPQUFOLENBQWM4QixPQUFkLENBQUwsRUFBNkI7O0FBRTdCO0FBQ0EsVUFBSSxDQUFDL0IsTUFBTUMsT0FBTixDQUFjOEIsUUFBUSxDQUFSLENBQWQsQ0FBTCxFQUNBO0FBQ0UsWUFBTWpGLElBQUlpRixPQUFWO0FBQ0EsYUFBS2dELE9BQUwsQ0FBYU0sU0FBYjtBQUNBLGFBQUtOLE9BQUwsQ0FBYU8sR0FBYixDQUFpQnhJLEVBQUUsQ0FBRixLQUFNLENBQXZCLEVBQTBCQSxFQUFFLENBQUYsS0FBTSxDQUFoQyxFQUFtQ29JLEtBQW5DLEVBQTBDLENBQTFDLEVBQTZDLElBQUlsSSxLQUFLZ0YsRUFBdEQsRUFBMEQsS0FBMUQ7QUFDQSxhQUFLK0MsT0FBTCxDQUFhUSxTQUFiLEdBQXlCSCxNQUF6QjtBQUNBLGFBQUtMLE9BQUwsQ0FBYVMsSUFBYjtBQUNELE9BUEQsTUFPTztBQUNQOztBQURPO0FBQUE7QUFBQTs7QUFBQTtBQUdMLCtCQUFjekQsT0FBZCw4SEFDQTtBQUFBLGdCQURTWCxDQUNUOztBQUNFLGlCQUFLLElBQUlnQixJQUFFLENBQVgsRUFBY0EsSUFBRWhCLEVBQUUxRCxNQUFGLEdBQVMsQ0FBekIsRUFBNEIwRSxHQUE1QixFQUNBO0FBQ0UsbUJBQUtxRCxLQUFMLENBQVdyRSxFQUFFZ0IsQ0FBRixDQUFYLEVBQWlCaEIsRUFBRWdCLElBQUUsQ0FBSixDQUFqQixFQUF5QmdELE1BQXpCLEVBQWlDRixLQUFqQztBQUNEO0FBQ0Y7QUFUSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV047QUFFRjs7OzBCQUVLdkgsQyxFQUFHQyxDLEVBQUdWLEMsRUFBR3dJLEMsRUFDZjtBQUNFLFdBQUtYLE9BQUwsQ0FBYVksU0FBYixHQUF5QkQsQ0FBekI7QUFDQSxXQUFLWCxPQUFMLENBQWFhLFdBQWIsR0FBMkIxSSxLQUFLLE9BQWhDO0FBQ0EsV0FBSzZILE9BQUwsQ0FBYU0sU0FBYjtBQUNBLFdBQUtOLE9BQUwsQ0FBYWMsTUFBYixDQUFvQmxJLEVBQUUsQ0FBRixLQUFNLENBQTFCLEVBQTRCQSxFQUFFLENBQUYsS0FBTSxDQUFsQztBQUNBLFdBQUtvSCxPQUFMLENBQWFlLE1BQWIsQ0FBb0JsSSxFQUFFLENBQUYsS0FBTSxDQUExQixFQUE0QkEsRUFBRSxDQUFGLEtBQU0sQ0FBbEM7QUFDQSxXQUFLbUgsT0FBTCxDQUFhZ0IsTUFBYjtBQUNEOzs7Ozs7a0JBaERrQmpCLFEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMmJkMWIwMzNmODk1YTRlNTc0ODUiLCJcblxuZnVuY3Rpb24gU3F1YXJlKHgsIHksIHNpemUpXG57XG4gIGxldCBoc2l6ZSA9IHNpemU+PjE7XG4gIGxldCBzcSA9IFtdO1xuICAvLyBvciBqdXN0IG1ha2UgYSB1bml0IHNxdWFyZSBhbmQgc2NhbGUgaXQgdXAgZHVoIDp8XG4gIC8vIHRvcCBsZWZ0XG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgLSBoc2l6ZV0gKTtcbiAgLy8gdG9wIHJpZ2h0XG4gIHNxLnB1c2goIFt4ICsgaHNpemUsIHkgLSBoc2l6ZV0gKTtcbiAgLy8gYm90dG9tIHJpZ2h0XG4gIHNxLnB1c2goIFt4ICsgaHNpemUsIHkgKyBoc2l6ZV0gKTtcbiAgLy8gYm90dG9tIGxlZnRcbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSArIGhzaXplXSApO1xuICAvLyB0b3AgbGVmdCBhZ2FpblxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5IC0gaHNpemVdICk7XG5cbiAgcmV0dXJuIHNxO1xufVxuXG5mdW5jdGlvbiByb3RhdGUoc2hhcGUsIHJ4LCByeSwgZGEpXG57XG4gIGZvciAobGV0IHBhaXIgb2Ygc2hhcGUpXG4gIHtcbiAgICBwYWlyID0gcm90YXRlX3BvaW50KHJ4LCByeSwgZGEsIHBhaXIpO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gdHJhbnNsYXRlKHNoYXBlLCBkeCwgZHkpXG57XG4gIGZvciAobGV0IHBhaXIgb2Ygc2hhcGUpXG4gIHtcbiAgICBwYWlyWzBdICs9IGR4O1xuICAgIHBhaXJbMV0gKz0gZHk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm90YXRlX3BvaW50KGN4LCBjeSwgYW5nbGUsIHApXG57XG4gIGxldCBzID0gTWF0aC5zaW4oYW5nbGUpO1xuICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlKTtcblxuICAvLyB0cmFuc2xhdGUgcG9pbnQgYmFjayB0byBvcmlnaW46XG4gIHBbMF0gLT0gY3g7XG4gIHBbMV0gLT0gY3k7XG5cbiAgLy8gcm90YXRlIHBvaW50XG4gIGxldCB4bmV3ID0gcFswXSAqIGMgLSBwWzFdICogcztcbiAgbGV0IHluZXcgPSBwWzBdICogcyArIHBbMV0gKiBjO1xuXG4gIC8vIHRyYW5zbGF0ZSBwb2ludCBiYWNrOlxuICBwWzBdID0geG5ldyArIGN4O1xuICBwWzFdID0geW5ldyArIGN5O1xuXG4gIHJldHVybiBwO1xufVxuXG5cbmZ1bmN0aW9uIHBvaW50X2luX3BvbHlnb24ocG9pbnQsIHZlcnRpY2VzKVxue1xuICBmb3IgKGxldCBpPTA7IGk8dmVydGljZXMubGVuZ3RoLTE7IGkrKylcbiAge1xuICAgIGxldCBhID0gdmVydGljZXNbaV07XG4gICAgbGV0IGIgPSB2ZXJ0aWNlc1tpKzFdO1xuXG4gICAgbGV0IHNlZyA9IHN1YnRyYWN0UG9pbnRzKGIsIGEpO1xuICAgIGxldCBwdCA9IHN1YnRyYWN0UG9pbnRzKHBvaW50LCBhKTtcbiAgICBsZXQgaW5zaWRlID0gKGNyb3NzUHJvZHVjdChzZWcsIHB0KSA+IDApO1xuICAgIC8vIGNvbnNvbGUubG9nKGluc2lkZSk7XG4gICAgaWYgKCFpbnNpZGUpIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5cbi8qKlxuICogQGF1dGhvciBQZXRlciBLZWxsZXlcbiAqIEBhdXRob3IgcGdrZWxsZXk0QGdtYWlsLmNvbVxuICovXG4vKipcbiAqIFNlZSBpZiB0d28gbGluZSBzZWdtZW50cyBpbnRlcnNlY3QuIFRoaXMgdXNlcyB0aGVcbiAqIHZlY3RvciBjcm9zcyBwcm9kdWN0IGFwcHJvYWNoIGRlc2NyaWJlZCBiZWxvdzpcbiAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzU2NTI4Mi83ODYzMzlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcCBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBzdGFydCBvZiB0aGUgMXN0IGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgZW5kIG9mIHRoZSAxc3QgbGluZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIHN0YXJ0IG9mIHRoZSAybmQgbGluZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBxMiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBlbmQgb2YgdGhlIDJuZCBsaW5lLlxuICovXG5cbmZ1bmN0aW9uIGludGVyc2VjdHMoYXAsIGFwMiwgYXEsIGFxMilcbntcbiAgLy8gQU06IE5vdGUgdG8gZGV2ZWxvcGVycywgdXNpbmcgbmFtZWQgcHJvcGVydGllcyBmb3IgdmVjdG9ycyBpcyByZXRhcmRlZC4gdGhhbmtzLlxuICByZXR1cm4gZG9MaW5lU2VnbWVudHNJbnRlcnNlY3QoIHt4OiBhcFswXSwgeTogYXBbMV19LCB7eDogYXAyWzBdLCB5OiBhcDJbMV19LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt4OiBhcVswXSwgeTogYXFbMV19LCB7eDogYXEyWzBdLCB5OiBhcTJbMV19ICk7XG59XG5cbmZ1bmN0aW9uIGlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrKHAsIHAyLCBxLCBxMilcbntcbiAgdmFyIGJveDEgPSB7XG4gICAgeG1pbjogTWF0aC5taW4ocC54LCBwMi54KSxcbiAgICB5bWluOiBNYXRoLm1pbihwLnksIHAyLnkpLFxuICAgIHhtYXg6IE1hdGgubWF4KHAueCwgcDIueCksXG4gICAgeW1heDogTWF0aC5tYXgocC55LCBwMi55KVxuICB9O1xuXG4gIHZhciBib3gyID0ge1xuICAgIHhtaW46IE1hdGgubWluKHEueCwgcTIueCksXG4gICAgeW1pbjogTWF0aC5taW4ocS55LCBxMi55KSxcbiAgICB4bWF4OiBNYXRoLm1heChxLngsIHEyLngpLFxuICAgIHltYXg6IE1hdGgubWF4KHEueSwgcTIueSlcbiAgfTtcblxuICByZXR1cm4gYmJveF9jb250YWluZWQoYm94MSwgYm94MikgfHwgYmJveF9jb250YWluZWQoYm94MiwgYm94MSk7XG59XG5cbmZ1bmN0aW9uIGJib3hfY29udGFpbmVkKGEsIGIpXG57XG4gIC8vIElzIEJveCBCIGNvbXBsZXRlbHkgaW5zaWRlIGJveCBBID9cbiAgcmV0dXJuIChiLnhtaW4gPj0gYS54bWluICYmIGIueG1heCA8PSBhLnhtYXgpICYmIChiLnltaW4gPj0gYS55bWluICYmIGIueW1heCA8PSBhLnltYXgpO1xufVxuXG5cbmZ1bmN0aW9uIGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0KHAsIHAyLCBxLCBxMilcbntcbiAgLy8gdmFyIGRlYnVnX3N0cmluZyA9IGBkb0xpbmVTZWdtZW50c0ludGVyc2VjdDogKCR7cC54fSwgJHtwLnl9KS0oJHtwMi54fSwgJHtwMi55fSkgIHdpdGggICgke3EueH0sICR7cS55fSktKCR7cTIueH0sICR7cTIueX0pYDtcblxuXHR2YXIgciA9IHN1YnRyYWN0UG9pbnRzKHAyLCBwKTtcblx0dmFyIHMgPSBzdWJ0cmFjdFBvaW50cyhxMiwgcSk7XG5cblx0dmFyIHVOdW1lcmF0b3IgPSBjcm9zc1Byb2R1Y3Qoc3VidHJhY3RQb2ludHMocSwgcCksIHIpO1xuXHR2YXIgZGVub21pbmF0b3IgPSBjcm9zc1Byb2R1Y3Qociwgcyk7XG5cblx0aWYgKHVOdW1lcmF0b3IgPT0gMCAmJiBkZW5vbWluYXRvciA9PSAwKSB7XG5cdFx0Ly8gVGhleSBhcmUgY29MbGluZWFyXG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvcGxhbmFyXCIpO1xuXG5cdFx0Ly8gRG8gdGhleSB0b3VjaD8gKEFyZSBhbnkgb2YgdGhlIHBvaW50cyBlcXVhbD8pXG5cdFx0aWYgKGVxdWFsUG9pbnRzKHAsIHEpIHx8IGVxdWFsUG9pbnRzKHAsIHEyKSB8fCBlcXVhbFBvaW50cyhwMiwgcSkgfHwgZXF1YWxQb2ludHMocDIsIHEyKSkge1xuXHRcdFx0cmV0dXJuIHtcbiAgICAgICAgaW50ZXJzZWN0OiB0cnVlLFxuICAgICAgICBraXNzOiAhaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsocCwgcDIsIHEsIHEyKVxuICAgICAgfTtcblxuXHRcdH1cblx0XHQvLyBEbyB0aGV5IG92ZXJsYXA/IChBcmUgYWxsIHRoZSBwb2ludCBkaWZmZXJlbmNlcyBpbiBlaXRoZXIgZGlyZWN0aW9uIHRoZSBzYW1lIHNpZ24pXG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIlBvaW50cyBET05UIHRvdWNoXCIpO1xuXG5cdFx0cmV0dXJuIHtcbiAgICAgIGludGVyc2VjdDpcbiAgICAgICAgICAgICFhbGxFcXVhbChcbiAgICAgIFx0XHRcdFx0KHEueCAtIHAueCA8IDApLFxuICAgICAgXHRcdFx0XHQocS54IC0gcDIueCA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueCAtIHAueCA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueCAtIHAyLnggPCAwKSkgfHxcbiAgICAgIFx0XHRcdCFhbGxFcXVhbChcbiAgICAgIFx0XHRcdFx0KHEueSAtIHAueSA8IDApLFxuICAgICAgXHRcdFx0XHQocS55IC0gcDIueSA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueSAtIHAueSA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueSAtIHAyLnkgPCAwKSksXG4gICAgICAgIGtpc3M6IGZhbHNlXG4gICAgICB9O1xuXG5cdH1cblxuXHRpZiAoZGVub21pbmF0b3IgPT0gMCkge1xuXHRcdC8vIGxpbmVzIGFyZSBwYXJhbGVsbFxuXHRcdHJldHVybiB7aW50ZXJzZWN0OiBmYWxzZSwga2lzczogZmFsc2V9O1xuXHR9XG5cblx0dmFyIHUgPSB1TnVtZXJhdG9yIC8gZGVub21pbmF0b3I7XG5cdHZhciB0ID0gY3Jvc3NQcm9kdWN0KHN1YnRyYWN0UG9pbnRzKHEsIHApLCBzKSAvIGRlbm9taW5hdG9yO1xuXG4gIC8vIGNvbnNvbGUubG9nKGB0PSR7dH0sIHU9JHt1fWApO1xuICB2YXIga2lzcyA9IGZhbHNlO1xuXG4gIGlmIChlcXVhbFBvaW50cyhwLCBxKSB8fCBlcXVhbFBvaW50cyhwLCBxMikgfHwgZXF1YWxQb2ludHMocDIsIHEpIHx8IGVxdWFsUG9pbnRzKHAyLCBxMikpXG4gICAga2lzcyA9IHRydWU7XG5cbiAgLy8gbGV0IHJlcyA9XG4gIC8vcmV0dXJuXG4gIHJldHVybiB7XG4gICAgaW50ZXJzZWN0OiAodCA+PSAwKSAmJiAodCA8PSAxKSAmJiAodSA+PSAwKSAmJiAodSA8PSAxKSxcbiAgICBraXNzOiBraXNzXG4gIH07XG5cbiAgLy8gY29uc29sZS5sb2coYCR7ZGVidWdfc3RyaW5nfSA9ICR7cmVzfWApO1xuXG5cdC8vIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHRoZSB0d28gcG9pbnRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiB0aGUgY3Jvc3MgcHJvZHVjdCByZXN1bHQgYXMgYSBmbG9hdFxuICovXG5mdW5jdGlvbiBjcm9zc1Byb2R1Y3QocG9pbnQxLCBwb2ludDIpIHtcblxuICBpZiAoQXJyYXkuaXNBcnJheShwb2ludDEpKVxuICAgIHJldHVybiBwb2ludDFbMF0gKiBwb2ludDJbMV0gLSBwb2ludDFbMV0gKiBwb2ludDJbMF07XG4gIGVsc2Vcblx0ICAgcmV0dXJuIHBvaW50MS54ICogcG9pbnQyLnkgLSBwb2ludDEueSAqIHBvaW50Mi54O1xufVxuXG4vKipcbiAqIFN1YnRyYWN0IHRoZSBzZWNvbmQgcG9pbnQgZnJvbSB0aGUgZmlyc3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIHRoZSBzdWJ0cmFjdGlvbiByZXN1bHQgYXMgYSBwb2ludCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gc3VidHJhY3RQb2ludHMocG9pbnQxLCBwb2ludDIpIHtcblxuICBpZiAoQXJyYXkuaXNBcnJheShwb2ludDEpKVxuICB7XG4gICAgcmV0dXJuIFsgcG9pbnQxWzBdIC0gcG9pbnQyWzBdLCBwb2ludDFbMV0gLSBwb2ludDJbMV0gXTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgcmVzdWx0LnggPSBwb2ludDEueCAtIHBvaW50Mi54O1xuICAgIHJlc3VsdC55ID0gcG9pbnQxLnkgLSBwb2ludDIueTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTZWUgaWYgdGhlIHBvaW50cyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIGlmIHRoZSBwb2ludHMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGVxdWFsUG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XG5cdHJldHVybiAocG9pbnQxLnggPT0gcG9pbnQyLngpICYmIChwb2ludDEueSA9PSBwb2ludDIueSlcbn1cblxuLyoqXG4gKiBTZWUgaWYgYWxsIGFyZ3VtZW50cyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHsuLi59IGFyZ3MgYXJndW1lbnRzIHRoYXQgd2lsbCBiZSBjb21wYXJlZCBieSAnPT0nLlxuICpcbiAqIEByZXR1cm4gaWYgYWxsIGFyZ3VtZW50cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gYWxsRXF1YWwoYXJncykge1xuXHR2YXIgZmlyc3RWYWx1ZSA9IGFyZ3VtZW50c1swXSxcblx0XHRpO1xuXHRmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKGFyZ3VtZW50c1tpXSAhPSBmaXJzdFZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0cnVlO1xufVxuXG5cblxuZXhwb3J0IHtTcXVhcmUsIGludGVyc2VjdHMsIHJvdGF0ZSwgdHJhbnNsYXRlLCBwb2ludF9pbl9wb2x5Z29ufSA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvVXRpbC5qcyIsIlxuaW1wb3J0IFNjZW5lICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vU2NlbmUnO1xuaW1wb3J0IFJlbmRlcmVyICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IHtTcXVhcmUsIHJvdGF0ZSwgdHJhbnNsYXRlfSAgICAgIGZyb20gJy4vVXRpbCc7XG5pbXBvcnQge3BvaW50X2luX3BvbHlnb259ICAgICAgICAgICAgICAgZnJvbSAnLi9VdGlsJztcblxuY29uc3QgZWxlbWVudCA9ICdkaXNwbGF5JztcblxubGV0IHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKGVsZW1lbnQpO1xubGV0IHNjZW5lID0gbmV3IFNjZW5lKCk7XG5cbi8vIFNob3cvaGlkZSB0aGUgc2NlbmUgZ3JhcGhcbmxldCBkZWJ1ZyA9IHRydWU7XG5cbi8vIFN0YXJ0IHBvaW50IGFuZCBvdXIgZ29hbFxubGV0IHN0YXJ0ID0gWzEwLCAxMF07XG5sZXQgZW5kID0gWzM4MCwgNDIwXTtcblxuLy8gRm9yIHRoZSBzaGFwZSBhbmltYXRpb25zXG5sZXQgcm90eCA9IDMwMCwgcm90eSA9IDQwMDtcbmxldCBtb3Rpb24gPSAwLCByb3RhID0gMDtcblxuLy8gQ3JlYXRlIHNvbWUgZHluYW1pYyBvYnN0YWNsZXNcbmxldCBzcV9zbWFsbCA9IFNxdWFyZSg2MCwgMTAwLCAxMDApO1xubGV0IHNxX2xhcmdlID0gU3F1YXJlKHJvdHgsIHJvdHksIDMyNSk7XG5cbi8vXG4vLyBsZXQgYXJlYSA9IFtcbi8vICAgWzAsIDBdLCBbMTAwLCAwXSwgWzEwMCwgMTAwXSwgWzAsIDEwMF0sIFswLCAwXVxuLy8gXTtcbi8vIGNvbnNvbGUubG9nKCBwb2ludF9pbl9wb2x5Z29uKCBbMTAsIDEwXSwgYXJlYSApICk7XG5cblxuLy8gU29tZSBzdGF0aWNcbmxldCBvdGhlcnMgICA9IFsgU3F1YXJlKDUwLCAyNTAsIDUwKSwgU3F1YXJlKDUwMCwgMTAwLCAxNTApLCBTcXVhcmUoNjIwLCA0MDAsIDEwMCkgXTtcblxuLy8gQWRkIHRoZW0gdG8gdGhlIHNjZW5lXG5zY2VuZS5hZGQoIHNxX3NtYWxsICk7XG5zY2VuZS5hZGQoIHNxX2xhcmdlICk7XG5cbmZvciAobGV0IG8gb2Ygb3RoZXJzKVxuICBzY2VuZS5hZGQoIG8gKTtcblxuZnJhbWUoKTtcblxuZnVuY3Rpb24gZnJhbWUoKVxue1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGZyYW1lICk7XG5cbiAgLy8gRmluZCB0aGUgc2hvcnRlc3QgcGF0aC4gVHdvIHRoaW5ncyBoYXBwZW4gaGVyZTpcbiAgLy8gICAgMS4gQSBTY2VuZSBncmFwaCBpcyBleHRyYWN0ZWQgZnJvbSBvdXIgc2NlbmUgZ2VvbWV0cnlcbiAgLy8gICAgMi4gRGlqa3N0cmEncyBtZXRob2QgaXMgdXNlZCB0byBmaW5kIHRoZSBvcHRpbWFsIHJvdXRlIGFjcm9zcyB0aGUgZ3JhcGhcbiAgbGV0IHJvdXRlID0gc2NlbmUuc29sdmUoIHN0YXJ0LCBlbmQgKTtcblxuICAvLyBHZXQgYSB2aXN1YWxpc2F0aW9uIG9mIHRoZSBhY3R1YWwgc2NlbmVncmFwaFxuICBsZXQgdmlzID0gc2NlbmUudmlzKCk7XG5cbiAgcmVuZGVyZXIuY2xlYXIoKTtcblxuICBpZiAoZGVidWcpXG4gIHtcbiAgICAvLyBEcmF3IHRoZSBzY2VuZSBncmFwaCBub2Rlc1xuICAgIGZvciAobGV0IG4gb2YgdmlzLm5vZGVzKVxuICAgICAgcmVuZGVyZXIucmVuZGVyKCBuLCAnI2RkZCcsIDUgKTtcblxuICAgIC8vIERyYXcgdGhlIGdyYXBoIGVkZ2VzXG4gICAgcmVuZGVyZXIucmVuZGVyKCB2aXMuZWRnZXMsICcjZGRkJyApO1xuICB9XG5cbiAgLy8gUmVuZGVyIHRoZSBvcmlnaW5hbCBzY2VuZSBnZW9tZXRyeSBvbiB0b3Agb2YgdGhlIGdyYXBoXG4gIHJlbmRlcmVyLnJlbmRlciggc3RhcnQsICcjMGEwJywgNiApO1xuICByZW5kZXJlci5yZW5kZXIoIGVuZCwgJyMwOGYnLCA2ICk7XG4gIHJlbmRlcmVyLnJlbmRlciggc2NlbmUub2JqZWN0cywgJyMzMzMnICk7XG5cbiAgLy8gTm93IGRpc3BsYXkgdGhlIGZvdW5kIHJvdXRlIVxuICByZW5kZXJlci5yZW5kZXIoIFtyb3V0ZV0sICcjZjAwJywgMyApO1xuXG4gIC8vIEFuaW1hdGlvblxuICBtb3Rpb24gKz0gMC4wNTsgLy8gU2ludXNvaWRhbFxuICB0cmFuc2xhdGUoc3Ffc21hbGwsIDMgKiBNYXRoLnNpbihtb3Rpb24gKiAwLjI1ICogTWF0aC5QSSksIDApO1xuXG4gIC8vIHJvdGF0ZSB0aGUgYmlnIHNxdWFyZVxuICByb3RhdGUoc3FfbGFyZ2UsIHJvdHgsIHJvdHksIDAuMDA1KTtcblxufVxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2JfZGVidWcnKS5vbmNsaWNrID0gKGUsIGMpID0+IHtcbiAgZGVidWcgPSBlLnNyY0VsZW1lbnQuY2hlY2tlZDtcbn1cblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCkub25tb3VzZW1vdmUgPSBlID0+IHtcbiAgZW5kID0gW2UuY2xpZW50WCwgZS5jbGllbnRZXTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWluLmpzIiwiXG5pbXBvcnQgR3JhcGggICAgICAgICAgZnJvbSAnLi9HcmFwaCc7XG5pbXBvcnQge2ludGVyc2VjdHN9ICAgZnJvbSAnLi9VdGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmVcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgdGhpcy5vYmplY3RzID0gW107XG4gICAgdGhpcy5ncmFwaCA9IG51bGw7XG5cbiAgICAvLyBUaGlzIGlzIGp1c3QgZm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaFxuICAgIHRoaXMuX3ZpcyA9IG51bGw7XG4gIH1cblxuICBhZGQob2JqZWN0KVxuICB7XG4gICAgdGhpcy5vYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgfVxuXG4gIHNvbHZlKHN0YXJ0LCBlbmQpXG4gIHtcbiAgICB0aGlzLmdyYXBoID0gdGhpcy5fZ3JhcGgoc3RhcnQsIGVuZCk7XG4gICAgbGV0IG5vZGVzID0gdGhpcy5ncmFwaC5zaG9ydGVzdCgwLCAxKTsgLy8gWzBdIHN0YXJ0LCBbMV0gZW5kIChzZWUgLmdyYXBoKCkpXG5cbiAgICBsZXQgcm91dGUgPSBbXTtcbiAgICBmb3IgKGxldCBuIG9mIG5vZGVzKVxuICAgIHtcbiAgICAgIHJvdXRlLnB1c2godGhpcy5fdmlzLm5vZGVzWyBuIF0pO1xuICAgIH1cblxuICAgIHJldHVybiByb3V0ZTtcbiAgfVxuXG4gIHZpcygpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5fdmlzO1xuICB9XG5cbiAgLy8gRXh0cmFjdCBhIHNjZW5lZ3JhcGggZnJvbSBvdXIgY29udGludW91cyBldWNsaWRlYW4gZ2VvbWV0cnlcbiAgX2dyYXBoKHN0YXJ0LCBlbmQpXG4gIHtcbiAgICBsZXQgbm9kZXMgPSBbXTtcbiAgICBsZXQgZWRnZXMgPSBbXTtcblxuICAgIC8vIEZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICB0aGlzLl92aXMgPSB7IG5vZGVzOiBbXSwgZWRnZXM6IFtdIH07XG5cbiAgICAvLyBUaGlzIGlzIGp1c3QgYSB0ZW1wIHZhbHVlIHVzZWQgdG8gbWFrZSBzdXJlIHNoYXBlcyBkb24ndCBwZXJmb3JtXG4gICAgLy8gaW50ZXJzZWN0aW9uIHRlc3RzIG9uIHRoZW1zZWx2ZXMgKGFjcm9zcyB0aGVpciBvd24gdmVydGljZXMpXG4gICAgbGV0IHNoYXBlX2lkID0gMTtcblxuICAgIC8vIFRoZXNlIGZpcnN0IHR3byBub2RlcyBpbiB0aGUgZ3JhcGggYXJlIGEgc3BlY2lhbCBjYXNlXG4gICAgbm9kZXMucHVzaCgge3ZlcnRleDogc3RhcnQsICBzaGFwZTogc2hhcGVfaWQrK30gKTsgLy8gWzBdIHN0YXJ0IChzZWUgLnNvbHZlKCkpXG4gICAgbm9kZXMucHVzaCgge3ZlcnRleDogZW5kLCAgICBzaGFwZTogc2hhcGVfaWQrK30gKTsgLy8gWzFdIGVuZFxuXG4gICAgLy8gZXh0cmFjdCBlYWNoIG9ic3RhY2xlJ3MgZWRnZXMgYW5kIG5vZGVzXG4gICAgZm9yIChsZXQgbyBvZiB0aGlzLm9iamVjdHMpXG4gICAge1xuICAgICAgc2hhcGVfaWQrKztcblxuICAgICAgbGV0IGU7XG4gICAgICBmb3IgKGU9MDsgZTxvLmxlbmd0aC0xOyBlKyspXG4gICAgICB7XG4gICAgICAgIGVkZ2VzLnB1c2goW29bZV0sIG9bZSsxXV0pO1xuXG4gICAgICAgIG5vZGVzLnB1c2goe1xuICAgICAgICAgIHZlcnRleDogb1tlXSxcbiAgICAgICAgICBzaGFwZTogc2hhcGVfaWRcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICAgIC8vIHRoaXMgaXNuJ3QgYSBjbG9zZWQgcmluZyAobWF0Y2hpbmcgc3RhcnQgYW5kIGVuZHApXG4gICAgICBpZiAoIWVxdWFscyhvWzBdLCBvW2VdKSlcbiAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgdmVydGV4OiBvW2VdLFxuICAgICAgICAgIHNoYXBlOiBzaGFwZV9pZFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsZXQgZyA9IG5ldyBHcmFwaCgpO1xuXG4gICAgLy8gQWRkIGBub2Rlc2AgaW5kaWNlcyB0byBncmFwaFxuICAgIGZvciAobGV0IGkgaW4gbm9kZXMpXG4gICAge1xuICAgICAgZy5hZGR2ZXJ0ZXgoTnVtYmVyKGkpKTtcblxuICAgICAgLy8gRm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaFxuICAgICAgdGhpcy5fdmlzLm5vZGVzLnB1c2gobm9kZXNbTnVtYmVyKGkpXS52ZXJ0ZXgpO1xuICAgIH1cblxuICAgIC8vIGcuYWRkZWRnZSgpOiBwZXJpbWV0ZXIgb2YgYWxsIG9ic3RhY2xlc1xuXG4gICAgbGV0IG5lPTA7XG5cbiAgICBmb3IgKGxldCB4PTA7IHg8bm9kZXMubGVuZ3RoLTE7IHgrKylcbiAgICAgIGZvciAobGV0IHk9eCsxOyB5PG5vZGVzLmxlbmd0aDsgeSsrKVxuICAgICAge1xuICAgICAgICAgIGxldCBBID0gbm9kZXNbeF07XG4gICAgICAgICAgbGV0IEIgPSBub2Rlc1t5XTtcblxuICAgICAgICAgIC8vIFdlJ3JlIHRlc3RpbmcgdGhlIHNoYXBlJ3MgdmVydGljZXMgYWdhaW5zdCBpdHNlbGZcbiAgICAgICAgICAvLyB3aGljaCBsZWFkcyB0byBpbnRlcm5hbCBwYXRocyBpbnNpZGUgdGhlIHNoYXBlIChpbnZhbGlkISlcbiAgICAgICAgICBpZiAoQS5zaGFwZSA9PSBCLnNoYXBlKSBjb250aW51ZTtcblxuICAgICAgICAgIGxldCB0ZXN0ZWRnZSA9IFtBLnZlcnRleCwgQi52ZXJ0ZXhdO1xuXG4gICAgICAgICAgaWYgKGVkZ2V2aXNpYmlsdHkodGVzdGVkZ2UsIGVkZ2VzKSlcbiAgICAgICAgICB7XG4gICAgICAgICAgICBnLmFkZGVkZ2UoeCwgeSwgY29zdChBLnZlcnRleCwgQi52ZXJ0ZXgpKTtcblxuICAgICAgICAgICAgLy8gSnVzdCBmb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoLCBub24tZXNzZW50aWFsOlxuICAgICAgICAgICAgdGhpcy5fdmlzLmVkZ2VzLnB1c2goW0EudmVydGV4LCBCLnZlcnRleF0pO1xuICAgICAgICAgIH1cblxuICAgICAgfVxuXG5cbiAgICByZXR1cm4gZztcbiAgfVxuXG59XG5cblxuXG5mdW5jdGlvbiBjb3N0KGEsIGIpXG57XG4gIGxldCBkeCA9IGJbMF0gLSBhWzBdIC8vIHgyIC0geDFcbiAgbGV0IGR5ID0gYlsxXSAtIGFbMV07XG4gIHJldHVybiBNYXRoLnNxcnQoIGR4KmR4ICsgZHkqZHkgKTtcblxufVxuXG5mdW5jdGlvbiBlZGdldmlzaWJpbHR5KHRlc3RlZGdlLCBlZGdlcylcbntcbiAgLy8gY29uc29sZS5sb2coYFRlc3RpbmcgZWRnZTogJHt0ZXN0ZWRnZVswXX0sICR7dGVzdGVkZ2VbMV19YCk7XG5cbiAgZm9yIChsZXQgdD0wOyB0PGVkZ2VzLmxlbmd0aDsgdCsrKVxuICB7XG4gICAgbGV0IGUgPSBlZGdlc1t0XTtcblxuICAgIGxldCByZXMgPSBpbnRlcnNlY3RzKHRlc3RlZGdlWzBdLCB0ZXN0ZWRnZVsxXSwgZVswXSwgZVsxXSk7XG5cbiAgICAvLyBJZiBpbnRlcnNlY3Rpb24sIGNoZWNrIGl0J3Mgbm90IGp1c3QgdGhlIGVuZHBvaW50cyBraXNzaW5nIHdoaWNoIGlzIG9rXG4gICAgLy8gaW4gZmFjdCwgaXQncyBtb3JlIHRoYW4gJ29rJyAtIGl0J3MgZXhhY3RseSB3aGF0IHdlJ3JlIGxvb2tpbmcgZm9yXG4gICAgaWYgKHJlcy5pbnRlcnNlY3QgJiYgIXJlcy5raXNzKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5mdW5jdGlvbiBlcXVhbHMoYSwgYilcbntcbiAgcmV0dXJuIChhWzBdID09IGJbMF0gJiYgYVsxXSA9PSBiWzFdKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TY2VuZS5qcyIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcyA9IFtdO1xuICAgIHRoaXMuZWRnZXMgPSBbXTtcbiAgICB0aGlzLm51bWVkZ2VzID0gMDtcbiAgfVxuXG4gIGFkZHZlcnRleChuKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcy5wdXNoKG4pO1xuICAgIHRoaXMuZWRnZXNbbl0gPSBbXTtcbiAgfVxuXG4gIC8vIGFkamFjZW55IGVkZ2UgbGlzdFxuICBhZGRlZGdlKHYxLCB2MiwgY29zdClcbiAge1xuICAgIHRoaXMuZWRnZXNbdjFdLnB1c2goe2Rlc3Q6djIsIGNvc3R9KTtcbiAgICB0aGlzLmVkZ2VzW3YyXS5wdXNoKHtkZXN0OnYxLCBjb3N0fSk7XG5cbiAgICB0aGlzLm51bWVkZ2VzKys7XG4gIH1cblxuICAvLyBTdXBlciBiYXNpYyBpbXBsZW1lbnRhdGlvbiBvZiBEaWprc3RyYSdzIGFsZ29yaXRobVxuICAvLyBEaXJlY3RseSBmcm9tIHRoaXMgcmVjaXBlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EaWprc3RyYSUyN3NfYWxnb3JpdGhtI0FsZ29yaXRobVxuICBzaG9ydGVzdChzdGFydCwgZW5kKVxuICB7XG4gICAgbGV0IGN1cnJlbnRfbm9kZTtcbiAgICBsZXQgZGlzdCA9IFswXTtcbiAgICBsZXQgcHJldiA9IFtdO1xuICAgIGxldCB1bnZpc2l0ZWQgPSBbXTtcblxuICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnZlcnRpY2VzLmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgIGlmIChpKSBkaXN0W2ldID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgIHVudmlzaXRlZFtpXSA9IGk7XG4gICAgICBwcmV2W2ldID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyAnVmlzaXQnIGVhY2ggbm9kZSBvbmx5IG9uY2UsIGluIHR1cm5cbiAgICB3aGlsZSggKGN1cnJlbnRfbm9kZSA9IHVudmlzaXRlZC5zaGlmdCgpKSAhPSBudWxsIClcbiAgICB7XG4gICAgICAvLyBGb3IgZWFjaCBub2RlLCAnY2hlY2snIGl0cyBuZWlnaGJvdXJzLlxuICAgICAgLy8gV2hpbGUgd2Ugb25seSAndmlzaXQnIGVhY2ggbm9kZSBvbmNlLCBpdCdzIHRoaXMgcmVwZWF0ZWQgJ2NoZWNrJ2luZ1xuICAgICAgLy8gKGFuZCBvY2Nhc2lvbmFsIHJlY2FsY3VsYXRpbmcpIG9mIG5laWdoYm91cnMgdGhhdCBhbGxvd3MgdXMgdG8gZmluZFxuICAgICAgLy8gdGhlIHNob3J0ZXN0IHJvdXRlIHRocm91Z2ggdGhlIGdyYXBoIGZyb20gb3VyIHN0YXJ0IHBvaW50LlxuICAgICAgLy8gSW4gZmFjdCwgdGhlIGluaGVyZW50IHJlc3VsdCBvZiB0aGUgYWxnbyBpcyB0aGF0IHdlIGZpbmQgdGhlIHNob3J0ZXN0XG4gICAgICAvLyBwYXRoIHRvICpldmVyeSogcG9pbnQgaW4gdGhlIGdyYXBoXG4gICAgICBmb3IgKGxldCB0PTA7IHQ8dGhpcy5lZGdlc1tjdXJyZW50X25vZGVdLmxlbmd0aDsgdCsrKVxuICAgICAge1xuICAgICAgICAvLyB2ZXJ0ZXgvbm9kZSBJRFxuICAgICAgICBsZXQgbmVpZ2hib3VyID0gdGhpcy5lZGdlc1tjdXJyZW50X25vZGVdW3RdLmRlc3Q7XG5cbiAgICAgICAgLy8gRGlzdGFuY2UgZnJvbSBjdXJyZW50X25vZGUgdG8gbmVpZ2hib3VyXG4gICAgICAgIGxldCBjb3N0ID0gdGhpcy5lZGdlc1tjdXJyZW50X25vZGVdW3RdLmNvc3Q7XG5cbiAgICAgICAgLy8gRGlzdGFuY2UgdGh1cyBmYXIgb24gdGhpcyByb3V0ZSAodXAgdG8gY3VycmVudF9ub2RlKSArIGRpc3RhbmNlIHRvIG5laWdoYm91clxuICAgICAgICBsZXQgdGVudGF0aXZlX2Rpc3QgPSBkaXN0W2N1cnJlbnRfbm9kZV0gKyBjb3N0O1xuXG4gICAgICAgIC8vIEhhdmUgd2UgZm91bmQgYSBzaG9ydGVyIHBhdGg/XG4gICAgICAgIGlmICh0ZW50YXRpdmVfZGlzdCA8IGRpc3RbbmVpZ2hib3VyXSlcbiAgICAgICAge1xuICAgICAgICAgIGRpc3RbbmVpZ2hib3VyXSA9IHRlbnRhdGl2ZV9kaXN0OyAvLyBOZXcgZGlzdGFuY2UgdG8gdGhpcyBub2RlXG4gICAgICAgICAgcHJldltuZWlnaGJvdXJdID0gY3VycmVudF9ub2RlOyAgIC8vIFVwZGF0ZSB0aGUgcm91dGVcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGMgPSBlbmQsIHNlcSA9W2VuZF07XG5cbiAgICAvLyBmYWlsZWQgZm9yIHNvbWUgcmVhc29uLCBlLmcuIGltcG9zc2libGUgcG9pbnQgaW5zaWRlIG51bGxzcGFjZSBldGNcbiAgICBpZiAocHJldltjXSA9PSBudWxsKVxuICAgICAgcmV0dXJuIFtdO1xuXG4gICAgZG8ge1xuICAgICAgYyA9IHByZXZbY107XG4gICAgICBzZXEucHVzaChjKTtcbiAgICB9IHdoaWxlKGMgIT0gc3RhcnQpO1xuXG4gICAgcmV0dXJuIHNlcS5yZXZlcnNlKCk7XG5cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvR3JhcGguanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXJcbntcbiAgY29uc3RydWN0b3IoZWxlbWVudClcbiAge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICB9XG5cbiAgY2xlYXIoKVxuICB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgcmVuZGVyKG9iamVjdHMsIGNvbG91ciA9ICcjMDAwJywgd2lkdGggPSAyKVxuICB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdHMpKSByZXR1cm47XG5cbiAgICAvLyBwb2ludCB0eXBlXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdHNbMF0pKVxuICAgIHtcbiAgICAgIGNvbnN0IHAgPSBvYmplY3RzO1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LmFyYyhwWzBdPj4wLCBwWzFdPj4wLCB3aWR0aCwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvdXI7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgLy8gbGlzdCBvZiBzaGFwZXMgdHlwZVxuXG4gICAgICBmb3IgKGxldCBvIG9mIG9iamVjdHMpXG4gICAgICB7XG4gICAgICAgIGZvciAobGV0IGU9MDsgZTxvLmxlbmd0aC0xOyBlKyspXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLl9saW5lKG9bZV0sIG9bZSsxXSwgY29sb3VyLCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgX2xpbmUoYSwgYiwgYywgdylcbiAge1xuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB3O1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGMgfHwgJ2JsYWNrJztcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhhWzBdPj4wLGFbMV0+PjApO1xuICAgIHRoaXMuY29udGV4dC5saW5lVG8oYlswXT4+MCxiWzFdPj4wKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlcmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==