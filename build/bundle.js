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
  return point1.x * point2.y - point1.y * point2.x;
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
  var result = {};
  result.x = point1.x - point2.x;
  result.y = point1.y - point2.y;

  return result;
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

var renderer = new _Renderer2.default('display');
var scene = new _Scene2.default();

// Start point and our goal
var start = [10, 10];
var end = [380, 420];

// For the shape animations
var rotx = 500,
    roty = 150;
var motion = 0,
    rota = 0;

// Add some obstacles to the scene
var sq_small = (0, _Util.Square)(120, 100, 100);
var sq_med = (0, _Util.Square)(200, 310, 150);
var sq_large = (0, _Util.Square)(rotx, roty, 200);

var obstacles = [sq_small, sq_med, sq_large];

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

requestAnimationFrame(frame);

function frame() {
  requestAnimationFrame(frame);

  // Find the shortest path. Two things happen here:
  //    1. A Scene graph is extracted from our scene geometry
  //    2. Dijkstra's method is used to find the optimal route across the graph
  var route = scene.solve(start, end);

  // Get a visualisation of the actual scenegraph
  var vis = scene.vis();

  renderer.clear();

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

      while ((current_node = unvisited.shift()) != null) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWU2Zjg2YzU5ZjA2MzRlYjA2YTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJyb3RhdGUiLCJzaGFwZSIsInJ4IiwicnkiLCJkYSIsInBhaXIiLCJyb3RhdGVfcG9pbnQiLCJ0cmFuc2xhdGUiLCJkeCIsImR5IiwiY3giLCJjeSIsImFuZ2xlIiwicCIsInMiLCJNYXRoIiwic2luIiwiYyIsImNvcyIsInhuZXciLCJ5bmV3IiwiaW50ZXJzZWN0cyIsImFwIiwiYXAyIiwiYXEiLCJhcTIiLCJkb0xpbmVTZWdtZW50c0ludGVyc2VjdCIsImlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrIiwicDIiLCJxIiwicTIiLCJib3gxIiwieG1pbiIsIm1pbiIsInltaW4iLCJ4bWF4IiwibWF4IiwieW1heCIsImJveDIiLCJiYm94X2NvbnRhaW5lZCIsImEiLCJiIiwiciIsInN1YnRyYWN0UG9pbnRzIiwidU51bWVyYXRvciIsImNyb3NzUHJvZHVjdCIsImRlbm9taW5hdG9yIiwiZXF1YWxQb2ludHMiLCJpbnRlcnNlY3QiLCJraXNzIiwiYWxsRXF1YWwiLCJ1IiwidCIsInBvaW50MSIsInBvaW50MiIsInJlc3VsdCIsImFyZ3MiLCJmaXJzdFZhbHVlIiwiYXJndW1lbnRzIiwiaSIsImxlbmd0aCIsInJlbmRlcmVyIiwic2NlbmUiLCJzdGFydCIsImVuZCIsInJvdHgiLCJyb3R5IiwibW90aW9uIiwicm90YSIsInNxX3NtYWxsIiwic3FfbWVkIiwic3FfbGFyZ2UiLCJvYnN0YWNsZXMiLCJvIiwiYWRkIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZnJhbWUiLCJyb3V0ZSIsInNvbHZlIiwidmlzIiwiY2xlYXIiLCJub2RlcyIsIm4iLCJyZW5kZXIiLCJlZGdlcyIsIm9iamVjdHMiLCJQSSIsIlNjZW5lIiwiZ3JhcGgiLCJfdmlzIiwib2JqZWN0IiwiX2dyYXBoIiwic2hvcnRlc3QiLCJzaGFwZV9pZCIsInZlcnRleCIsImUiLCJlcXVhbHMiLCJnIiwiYWRkdmVydGV4IiwiTnVtYmVyIiwibmUiLCJBIiwiQiIsInRlc3RlZGdlIiwiZWRnZXZpc2liaWx0eSIsImFkZGVkZ2UiLCJjb3N0Iiwic3FydCIsInJlcyIsIkdyYXBoIiwidmVydGljZXMiLCJudW1lZGdlcyIsInYxIiwidjIiLCJkZXN0IiwiY3VycmVudF9ub2RlIiwiZGlzdCIsInByZXYiLCJ1bnZpc2l0ZWQiLCJNQVhfVkFMVUUiLCJzaGlmdCIsIm5laWdoYm91ciIsInRlbnRhdGl2ZV9kaXN0Iiwic2VxIiwicmV2ZXJzZSIsIlJlbmRlcmVyIiwiZWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiY29sb3VyIiwiQXJyYXkiLCJpc0FycmF5IiwiYmVnaW5QYXRoIiwiYXJjIiwiZmlsbFN0eWxlIiwiZmlsbCIsIl9saW5lIiwidyIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7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bUJBQUs4QyxLQUFMLENBQVdwRSxFQUFFc0IsQ0FBRixDQUFYLEVBQWlCdEIsRUFBRXNCLElBQUUsQ0FBSixDQUFqQixFQUF5QnVDLE1BQXpCLEVBQWlDRixLQUFqQztBQUNEO0FBQ0Y7QUFUSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV047QUFFRjs7OzBCQUVLNUYsQyxFQUFHQyxDLEVBQUd4QixDLEVBQUc2SCxDLEVBQ2Y7QUFDRSxXQUFLYixPQUFMLENBQWFjLFNBQWIsR0FBeUJELENBQXpCO0FBQ0EsV0FBS2IsT0FBTCxDQUFhZSxXQUFiLEdBQTJCL0gsS0FBSyxPQUFoQztBQUNBLFdBQUtnSCxPQUFMLENBQWFRLFNBQWI7QUFDQSxXQUFLUixPQUFMLENBQWFnQixNQUFiLENBQW9CekcsRUFBRSxDQUFGLEtBQU0sQ0FBMUIsRUFBNEJBLEVBQUUsQ0FBRixLQUFNLENBQWxDO0FBQ0EsV0FBS3lGLE9BQUwsQ0FBYWlCLE1BQWIsQ0FBb0J6RyxFQUFFLENBQUYsS0FBTSxDQUExQixFQUE0QkEsRUFBRSxDQUFGLEtBQU0sQ0FBbEM7QUFDQSxXQUFLd0YsT0FBTCxDQUFha0IsTUFBYjtBQUNEOzs7Ozs7a0JBaERrQnRCLFEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWU2Zjg2YzU5ZjA2MzRlYjA2YTEiLCJcblxuZnVuY3Rpb24gU3F1YXJlKHgsIHksIHNpemUpXG57XG4gIGxldCBoc2l6ZSA9IHNpemU+PjE7XG4gIGxldCBzcSA9IFtdO1xuICAvLyBvciBqdXN0IG1ha2UgYSB1bml0IHNxdWFyZSBhbmQgc2NhbGUgaXQgdXAgZHVoIDp8XG4gIC8vIHRvcCBsZWZ0XG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgLSBoc2l6ZV0gKTtcbiAgLy8gdG9wIHJpZ2h0XG4gIHNxLnB1c2goIFt4ICsgaHNpemUsIHkgLSBoc2l6ZV0gKTtcbiAgLy8gYm90dG9tIHJpZ2h0XG4gIHNxLnB1c2goIFt4ICsgaHNpemUsIHkgKyBoc2l6ZV0gKTtcbiAgLy8gYm90dG9tIGxlZnRcbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSArIGhzaXplXSApO1xuICAvLyB0b3AgbGVmdCBhZ2FpblxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5IC0gaHNpemVdICk7XG5cbiAgcmV0dXJuIHNxO1xufVxuXG5mdW5jdGlvbiByb3RhdGUoc2hhcGUsIHJ4LCByeSwgZGEpXG57XG4gIGZvciAobGV0IHBhaXIgb2Ygc2hhcGUpXG4gIHtcbiAgICBwYWlyID0gcm90YXRlX3BvaW50KHJ4LCByeSwgZGEsIHBhaXIpO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gdHJhbnNsYXRlKHNoYXBlLCBkeCwgZHkpXG57XG4gIGZvciAobGV0IHBhaXIgb2Ygc2hhcGUpXG4gIHtcbiAgICBwYWlyWzBdICs9IGR4O1xuICAgIHBhaXJbMV0gKz0gZHk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm90YXRlX3BvaW50KGN4LCBjeSwgYW5nbGUsIHApXG57XG4gIGxldCBzID0gTWF0aC5zaW4oYW5nbGUpO1xuICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlKTtcblxuICAvLyB0cmFuc2xhdGUgcG9pbnQgYmFjayB0byBvcmlnaW46XG4gIHBbMF0gLT0gY3g7XG4gIHBbMV0gLT0gY3k7XG5cbiAgLy8gcm90YXRlIHBvaW50XG4gIGxldCB4bmV3ID0gcFswXSAqIGMgLSBwWzFdICogcztcbiAgbGV0IHluZXcgPSBwWzBdICogcyArIHBbMV0gKiBjO1xuXG4gIC8vIHRyYW5zbGF0ZSBwb2ludCBiYWNrOlxuICBwWzBdID0geG5ldyArIGN4O1xuICBwWzFdID0geW5ldyArIGN5O1xuXG4gIHJldHVybiBwO1xufVxuXG4vKipcbiAqIEBhdXRob3IgUGV0ZXIgS2VsbGV5XG4gKiBAYXV0aG9yIHBna2VsbGV5NEBnbWFpbC5jb21cbiAqL1xuLyoqXG4gKiBTZWUgaWYgdHdvIGxpbmUgc2VnbWVudHMgaW50ZXJzZWN0LiBUaGlzIHVzZXMgdGhlXG4gKiB2ZWN0b3IgY3Jvc3MgcHJvZHVjdCBhcHByb2FjaCBkZXNjcmliZWQgYmVsb3c6XG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NjUyODIvNzg2MzM5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHAgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgc3RhcnQgb2YgdGhlIDFzdCBsaW5lLlxuICogQHBhcmFtIHtPYmplY3R9IHAyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIGVuZCBvZiB0aGUgMXN0IGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBzdGFydCBvZiB0aGUgMm5kIGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcTIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgZW5kIG9mIHRoZSAybmQgbGluZS5cbiAqL1xuXG5mdW5jdGlvbiBpbnRlcnNlY3RzKGFwLCBhcDIsIGFxLCBhcTIpXG57XG4gIC8vIEFNOiBOb3RlIHRvIGRldmVsb3BlcnMsIHVzaW5nIG5hbWVkIHByb3BlcnRpZXMgZm9yIHZlY3RvcnMgaXMgcmV0YXJkZWQuIHRoYW5rcy5cbiAgcmV0dXJuIGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0KCB7eDogYXBbMF0sIHk6IGFwWzFdfSwge3g6IGFwMlswXSwgeTogYXAyWzFdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eDogYXFbMF0sIHk6IGFxWzFdfSwge3g6IGFxMlswXSwgeTogYXEyWzFdfSApO1xufVxuXG5mdW5jdGlvbiBpc19vbmVfYmJveF9jb250YWluZWRfYnlfdGhlX290aGVyX3F1ZXN0aW9ubWFyayhwLCBwMiwgcSwgcTIpXG57XG4gIHZhciBib3gxID0ge1xuICAgIHhtaW46IE1hdGgubWluKHAueCwgcDIueCksXG4gICAgeW1pbjogTWF0aC5taW4ocC55LCBwMi55KSxcbiAgICB4bWF4OiBNYXRoLm1heChwLngsIHAyLngpLFxuICAgIHltYXg6IE1hdGgubWF4KHAueSwgcDIueSlcbiAgfTtcblxuICB2YXIgYm94MiA9IHtcbiAgICB4bWluOiBNYXRoLm1pbihxLngsIHEyLngpLFxuICAgIHltaW46IE1hdGgubWluKHEueSwgcTIueSksXG4gICAgeG1heDogTWF0aC5tYXgocS54LCBxMi54KSxcbiAgICB5bWF4OiBNYXRoLm1heChxLnksIHEyLnkpXG4gIH07XG5cbiAgcmV0dXJuIGJib3hfY29udGFpbmVkKGJveDEsIGJveDIpIHx8IGJib3hfY29udGFpbmVkKGJveDIsIGJveDEpO1xufVxuXG5mdW5jdGlvbiBiYm94X2NvbnRhaW5lZChhLCBiKVxue1xuICAvLyBJcyBCb3ggQiBjb21wbGV0ZWx5IGluc2lkZSBib3ggQSA/XG4gIHJldHVybiAoYi54bWluID49IGEueG1pbiAmJiBiLnhtYXggPD0gYS54bWF4KSAmJiAoYi55bWluID49IGEueW1pbiAmJiBiLnltYXggPD0gYS55bWF4KTtcbn1cblxuXG5mdW5jdGlvbiBkb0xpbmVTZWdtZW50c0ludGVyc2VjdChwLCBwMiwgcSwgcTIpXG57XG4gIC8vIHZhciBkZWJ1Z19zdHJpbmcgPSBgZG9MaW5lU2VnbWVudHNJbnRlcnNlY3Q6ICgke3AueH0sICR7cC55fSktKCR7cDIueH0sICR7cDIueX0pICB3aXRoICAoJHtxLnh9LCAke3EueX0pLSgke3EyLnh9LCAke3EyLnl9KWA7XG5cblx0dmFyIHIgPSBzdWJ0cmFjdFBvaW50cyhwMiwgcCk7XG5cdHZhciBzID0gc3VidHJhY3RQb2ludHMocTIsIHEpO1xuXG5cdHZhciB1TnVtZXJhdG9yID0gY3Jvc3NQcm9kdWN0KHN1YnRyYWN0UG9pbnRzKHEsIHApLCByKTtcblx0dmFyIGRlbm9taW5hdG9yID0gY3Jvc3NQcm9kdWN0KHIsIHMpO1xuXG5cdGlmICh1TnVtZXJhdG9yID09IDAgJiYgZGVub21pbmF0b3IgPT0gMCkge1xuXHRcdC8vIFRoZXkgYXJlIGNvTGxpbmVhclxuXG4gICAgLy8gY29uc29sZS5sb2coXCJDb3BsYW5hclwiKTtcblxuXHRcdC8vIERvIHRoZXkgdG91Y2g/IChBcmUgYW55IG9mIHRoZSBwb2ludHMgZXF1YWw/KVxuXHRcdGlmIChlcXVhbFBvaW50cyhwLCBxKSB8fCBlcXVhbFBvaW50cyhwLCBxMikgfHwgZXF1YWxQb2ludHMocDIsIHEpIHx8IGVxdWFsUG9pbnRzKHAyLCBxMikpIHtcblx0XHRcdHJldHVybiB7XG4gICAgICAgIGludGVyc2VjdDogdHJ1ZSxcbiAgICAgICAga2lzczogIWlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrKHAsIHAyLCBxLCBxMilcbiAgICAgIH07XG5cblx0XHR9XG5cdFx0Ly8gRG8gdGhleSBvdmVybGFwPyAoQXJlIGFsbCB0aGUgcG9pbnQgZGlmZmVyZW5jZXMgaW4gZWl0aGVyIGRpcmVjdGlvbiB0aGUgc2FtZSBzaWduKVxuXG4gICAgLy8gY29uc29sZS5sb2coXCJQb2ludHMgRE9OVCB0b3VjaFwiKTtcblxuXHRcdHJldHVybiB7XG4gICAgICBpbnRlcnNlY3Q6XG4gICAgICAgICAgICAhYWxsRXF1YWwoXG4gICAgICBcdFx0XHRcdChxLnggLSBwLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEueCAtIHAyLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnggLSBwLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnggLSBwMi54IDwgMCkpIHx8XG4gICAgICBcdFx0XHQhYWxsRXF1YWwoXG4gICAgICBcdFx0XHRcdChxLnkgLSBwLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEueSAtIHAyLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnkgLSBwLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnkgLSBwMi55IDwgMCkpLFxuICAgICAgICBraXNzOiBmYWxzZVxuICAgICAgfTtcblxuXHR9XG5cblx0aWYgKGRlbm9taW5hdG9yID09IDApIHtcblx0XHQvLyBsaW5lcyBhcmUgcGFyYWxlbGxcblx0XHRyZXR1cm4ge2ludGVyc2VjdDogZmFsc2UsIGtpc3M6IGZhbHNlfTtcblx0fVxuXG5cdHZhciB1ID0gdU51bWVyYXRvciAvIGRlbm9taW5hdG9yO1xuXHR2YXIgdCA9IGNyb3NzUHJvZHVjdChzdWJ0cmFjdFBvaW50cyhxLCBwKSwgcykgLyBkZW5vbWluYXRvcjtcblxuICAvLyBjb25zb2xlLmxvZyhgdD0ke3R9LCB1PSR7dX1gKTtcbiAgdmFyIGtpc3MgPSBmYWxzZTtcblxuICBpZiAoZXF1YWxQb2ludHMocCwgcSkgfHwgZXF1YWxQb2ludHMocCwgcTIpIHx8IGVxdWFsUG9pbnRzKHAyLCBxKSB8fCBlcXVhbFBvaW50cyhwMiwgcTIpKVxuICAgIGtpc3MgPSB0cnVlO1xuXG4gIC8vIGxldCByZXMgPVxuICAvL3JldHVyblxuICByZXR1cm4ge1xuICAgIGludGVyc2VjdDogKHQgPj0gMCkgJiYgKHQgPD0gMSkgJiYgKHUgPj0gMCkgJiYgKHUgPD0gMSksXG4gICAga2lzczoga2lzc1xuICB9O1xuXG4gIC8vIGNvbnNvbGUubG9nKGAke2RlYnVnX3N0cmluZ30gPSAke3Jlc31gKTtcblxuXHQvLyByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZSB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0aGUgdHdvIHBvaW50cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICpcbiAqIEByZXR1cm4gdGhlIGNyb3NzIHByb2R1Y3QgcmVzdWx0IGFzIGEgZmxvYXRcbiAqL1xuZnVuY3Rpb24gY3Jvc3NQcm9kdWN0KHBvaW50MSwgcG9pbnQyKSB7XG5cdHJldHVybiBwb2ludDEueCAqIHBvaW50Mi55IC0gcG9pbnQxLnkgKiBwb2ludDIueDtcbn1cblxuLyoqXG4gKiBTdWJ0cmFjdCB0aGUgc2Vjb25kIHBvaW50IGZyb20gdGhlIGZpcnN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiB0aGUgc3VidHJhY3Rpb24gcmVzdWx0IGFzIGEgcG9pbnQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIHN1YnRyYWN0UG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XG5cdHZhciByZXN1bHQgPSB7fTtcblx0cmVzdWx0LnggPSBwb2ludDEueCAtIHBvaW50Mi54O1xuXHRyZXN1bHQueSA9IHBvaW50MS55IC0gcG9pbnQyLnk7XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBTZWUgaWYgdGhlIHBvaW50cyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIGlmIHRoZSBwb2ludHMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGVxdWFsUG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XG5cdHJldHVybiAocG9pbnQxLnggPT0gcG9pbnQyLngpICYmIChwb2ludDEueSA9PSBwb2ludDIueSlcbn1cblxuLyoqXG4gKiBTZWUgaWYgYWxsIGFyZ3VtZW50cyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHsuLi59IGFyZ3MgYXJndW1lbnRzIHRoYXQgd2lsbCBiZSBjb21wYXJlZCBieSAnPT0nLlxuICpcbiAqIEByZXR1cm4gaWYgYWxsIGFyZ3VtZW50cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gYWxsRXF1YWwoYXJncykge1xuXHR2YXIgZmlyc3RWYWx1ZSA9IGFyZ3VtZW50c1swXSxcblx0XHRpO1xuXHRmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKGFyZ3VtZW50c1tpXSAhPSBmaXJzdFZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0cnVlO1xufVxuXG5cblxuZXhwb3J0IHtTcXVhcmUsIGludGVyc2VjdHMsIHJvdGF0ZSwgdHJhbnNsYXRlfSA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvVXRpbC5qcyIsIlxuaW1wb3J0IFNjZW5lICAgICAgICBmcm9tICcuL1NjZW5lJztcbmltcG9ydCBSZW5kZXJlciAgICAgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQge1NxdWFyZSwgcm90YXRlLCB0cmFuc2xhdGV9ICAgICBmcm9tICcuL1V0aWwnO1xuXG5sZXQgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoJ2Rpc3BsYXknKTtcbmxldCBzY2VuZSA9IG5ldyBTY2VuZSgpO1xuXG4vLyBTdGFydCBwb2ludCBhbmQgb3VyIGdvYWxcbmxldCBzdGFydCA9IFsxMCwgMTBdO1xubGV0IGVuZCA9IFszODAsIDQyMF07XG5cbi8vIEZvciB0aGUgc2hhcGUgYW5pbWF0aW9uc1xubGV0IHJvdHggPSA1MDAsIHJvdHkgPSAxNTA7XG5sZXQgbW90aW9uID0gMCwgcm90YSA9IDA7XG5cbi8vIEFkZCBzb21lIG9ic3RhY2xlcyB0byB0aGUgc2NlbmVcbmxldCBzcV9zbWFsbCA9IFNxdWFyZSgxMjAsIDEwMCwgMTAwKTtcbmxldCBzcV9tZWQgICA9IFNxdWFyZSgyMDAsIDMxMCwgMTUwKTtcbmxldCBzcV9sYXJnZSA9IFNxdWFyZShyb3R4LCByb3R5LCAyMDApO1xuXG5sZXQgb2JzdGFjbGVzID0gW3NxX3NtYWxsLCBzcV9tZWQsIHNxX2xhcmdlXTtcblxuZm9yIChsZXQgbyBvZiBvYnN0YWNsZXMpXG4gIHNjZW5lLmFkZCggbyApO1xuXG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGZyYW1lICk7XG5cbmZ1bmN0aW9uIGZyYW1lKClcbntcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBmcmFtZSApO1xuXG4gIC8vIEZpbmQgdGhlIHNob3J0ZXN0IHBhdGguIFR3byB0aGluZ3MgaGFwcGVuIGhlcmU6XG4gIC8vICAgIDEuIEEgU2NlbmUgZ3JhcGggaXMgZXh0cmFjdGVkIGZyb20gb3VyIHNjZW5lIGdlb21ldHJ5XG4gIC8vICAgIDIuIERpamtzdHJhJ3MgbWV0aG9kIGlzIHVzZWQgdG8gZmluZCB0aGUgb3B0aW1hbCByb3V0ZSBhY3Jvc3MgdGhlIGdyYXBoXG4gIGxldCByb3V0ZSA9IHNjZW5lLnNvbHZlKCBzdGFydCwgZW5kICk7XG5cbiAgLy8gR2V0IGEgdmlzdWFsaXNhdGlvbiBvZiB0aGUgYWN0dWFsIHNjZW5lZ3JhcGhcbiAgbGV0IHZpcyA9IHNjZW5lLnZpcygpO1xuXG4gIHJlbmRlcmVyLmNsZWFyKCk7XG5cbiAgLy8gRHJhdyB0aGUgc2NlbmUgZ3JhcGggbm9kZXNcbiAgZm9yIChsZXQgbiBvZiB2aXMubm9kZXMpXG4gICAgcmVuZGVyZXIucmVuZGVyKCBuLCAnI2RkZCcsIDUgKTtcblxuICAvLyBEcmF3IHRoZSBncmFwaCBlZGdlc1xuICByZW5kZXJlci5yZW5kZXIoIHZpcy5lZGdlcywgJyNkZGQnICk7XG5cbiAgLy8gUmVuZGVyIHRoZSBvcmlnaW5hbCBzY2VuZSBnZW9tZXRyeSBvbiB0b3Agb2YgdGhlIGdyYXBoXG4gIHJlbmRlcmVyLnJlbmRlciggc3RhcnQsICcjMGEwJywgNiApO1xuICByZW5kZXJlci5yZW5kZXIoIGVuZCwgJyMwOGYnLCA2ICk7XG4gIHJlbmRlcmVyLnJlbmRlciggc2NlbmUub2JqZWN0cywgJyMzMzMnICk7XG5cbiAgLy8gTm93IGRpc3BsYXkgdGhlIGZvdW5kIHJvdXRlIVxuICByZW5kZXJlci5yZW5kZXIoIFtyb3V0ZV0sICcjZjAwJywgMyApO1xuXG4gIC8vIEFuaW1hdGlvblxuICBtb3Rpb24gKz0gMC4wNTsgLy8gU2ludXNvaWRhbFxuICB0cmFuc2xhdGUoc3Ffc21hbGwsIDMgKiBNYXRoLnNpbihtb3Rpb24gKiAwLjI1ICogTWF0aC5QSSksIDApO1xuXG4gIC8vIHJvdGF0ZSB0aGUgYmlnIHNxdWFyZVxuICByb3RhdGUoc3FfbGFyZ2UsIHJvdHgsIHJvdHksIDAuMDA1KTtcblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiLCJcbmltcG9ydCBHcmFwaCAgICAgICAgICBmcm9tICcuL0dyYXBoJztcbmltcG9ydCB7aW50ZXJzZWN0c30gICBmcm9tICcuL1V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZVxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICB0aGlzLm9iamVjdHMgPSBbXTtcbiAgICB0aGlzLmdyYXBoID0gbnVsbDtcblxuICAgIC8vIFRoaXMgaXMganVzdCBmb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoXG4gICAgdGhpcy5fdmlzID0gbnVsbDtcbiAgfVxuXG4gIGFkZChvYmplY3QpXG4gIHtcbiAgICB0aGlzLm9iamVjdHMucHVzaChvYmplY3QpO1xuICB9XG5cbiAgc29sdmUoc3RhcnQsIGVuZClcbiAge1xuICAgIHRoaXMuZ3JhcGggPSB0aGlzLl9ncmFwaChzdGFydCwgZW5kKTtcbiAgICBsZXQgbm9kZXMgPSB0aGlzLmdyYXBoLnNob3J0ZXN0KDAsIDEpOyAvLyBbMF0gc3RhcnQsIFsxXSBlbmQgKHNlZSAuZ3JhcGgoKSlcblxuICAgIGxldCByb3V0ZSA9IFtdO1xuICAgIGZvciAobGV0IG4gb2Ygbm9kZXMpXG4gICAge1xuICAgICAgcm91dGUucHVzaCh0aGlzLl92aXMubm9kZXNbIG4gXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvdXRlO1xuICB9XG5cbiAgdmlzKClcbiAge1xuICAgIHJldHVybiB0aGlzLl92aXM7XG4gIH1cblxuICAvLyBFeHRyYWN0IGEgc2NlbmVncmFwaCBmcm9tIG91ciBjb250aW51b3VzIGV1Y2xpZGVhbiBnZW9tZXRyeVxuICBfZ3JhcGgoc3RhcnQsIGVuZClcbiAge1xuICAgIGxldCBub2RlcyA9IFtdO1xuICAgIGxldCBlZGdlcyA9IFtdO1xuXG4gICAgLy8gRm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaFxuICAgIHRoaXMuX3ZpcyA9IHsgbm9kZXM6IFtdLCBlZGdlczogW10gfTtcblxuICAgIC8vIFRoaXMgaXMganVzdCBhIHRlbXAgdmFsdWUgdXNlZCB0byBtYWtlIHN1cmUgc2hhcGVzIGRvbid0IHBlcmZvcm1cbiAgICAvLyBpbnRlcnNlY3Rpb24gdGVzdHMgb24gdGhlbXNlbHZlcyAoYWNyb3NzIHRoZWlyIG93biB2ZXJ0aWNlcylcbiAgICBsZXQgc2hhcGVfaWQgPSAxO1xuXG4gICAgLy8gVGhlc2UgZmlyc3QgdHdvIG5vZGVzIGluIHRoZSBncmFwaCBhcmUgYSBzcGVjaWFsIGNhc2VcbiAgICBub2Rlcy5wdXNoKCB7dmVydGV4OiBzdGFydCwgIHNoYXBlOiBzaGFwZV9pZCsrfSApOyAvLyBbMF0gc3RhcnQgKHNlZSAuc29sdmUoKSlcbiAgICBub2Rlcy5wdXNoKCB7dmVydGV4OiBlbmQsICAgIHNoYXBlOiBzaGFwZV9pZCsrfSApOyAvLyBbMV0gZW5kXG5cbiAgICAvLyBleHRyYWN0IGVhY2ggb2JzdGFjbGUncyBlZGdlcyBhbmQgbm9kZXNcbiAgICBmb3IgKGxldCBvIG9mIHRoaXMub2JqZWN0cylcbiAgICB7XG4gICAgICBzaGFwZV9pZCsrO1xuXG4gICAgICBsZXQgZTtcbiAgICAgIGZvciAoZT0wOyBlPG8ubGVuZ3RoLTE7IGUrKylcbiAgICAgIHtcbiAgICAgICAgZWRnZXMucHVzaChbb1tlXSwgb1tlKzFdXSk7XG5cbiAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgdmVydGV4OiBvW2VdLFxuICAgICAgICAgIHNoYXBlOiBzaGFwZV9pZFxuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgICAgLy8gdGhpcyBpc24ndCBhIGNsb3NlZCByaW5nIChtYXRjaGluZyBzdGFydCBhbmQgZW5kcClcbiAgICAgIGlmICghZXF1YWxzKG9bMF0sIG9bZV0pKVxuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB2ZXJ0ZXg6IG9bZV0sXG4gICAgICAgICAgc2hhcGU6IHNoYXBlX2lkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxldCBnID0gbmV3IEdyYXBoKCk7XG5cbiAgICAvLyBBZGQgYG5vZGVzYCBpbmRpY2VzIHRvIGdyYXBoXG4gICAgZm9yIChsZXQgaSBpbiBub2RlcylcbiAgICB7XG4gICAgICBnLmFkZHZlcnRleChOdW1iZXIoaSkpO1xuXG4gICAgICAvLyBGb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoXG4gICAgICB0aGlzLl92aXMubm9kZXMucHVzaChub2Rlc1tOdW1iZXIoaSldLnZlcnRleCk7XG4gICAgfVxuXG4gICAgLy8gZy5hZGRlZGdlKCk6IHBlcmltZXRlciBvZiBhbGwgb2JzdGFjbGVzXG5cbiAgICBsZXQgbmU9MDtcblxuICAgIGZvciAobGV0IHg9MDsgeDxub2Rlcy5sZW5ndGgtMTsgeCsrKVxuICAgICAgZm9yIChsZXQgeT14KzE7IHk8bm9kZXMubGVuZ3RoOyB5KyspXG4gICAgICB7XG4gICAgICAgICAgbGV0IEEgPSBub2Rlc1t4XTtcbiAgICAgICAgICBsZXQgQiA9IG5vZGVzW3ldO1xuXG4gICAgICAgICAgLy8gV2UncmUgdGVzdGluZyB0aGUgc2hhcGUncyB2ZXJ0aWNlcyBhZ2FpbnN0IGl0c2VsZlxuICAgICAgICAgIC8vIHdoaWNoIGxlYWRzIHRvIGludGVybmFsIHBhdGhzIGluc2lkZSB0aGUgc2hhcGUgKGludmFsaWQhKVxuICAgICAgICAgIGlmIChBLnNoYXBlID09IEIuc2hhcGUpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgbGV0IHRlc3RlZGdlID0gW0EudmVydGV4LCBCLnZlcnRleF07XG5cbiAgICAgICAgICBpZiAoZWRnZXZpc2liaWx0eSh0ZXN0ZWRnZSwgZWRnZXMpKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGcuYWRkZWRnZSh4LCB5LCBjb3N0KEEudmVydGV4LCBCLnZlcnRleCkpO1xuXG4gICAgICAgICAgICAvLyBKdXN0IGZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGgsIG5vbi1lc3NlbnRpYWw6XG4gICAgICAgICAgICB0aGlzLl92aXMuZWRnZXMucHVzaChbQS52ZXJ0ZXgsIEIudmVydGV4XSk7XG4gICAgICAgICAgfVxuXG4gICAgICB9XG5cblxuICAgIHJldHVybiBnO1xuICB9XG5cbn1cblxuXG5cbmZ1bmN0aW9uIGNvc3QoYSwgYilcbntcbiAgbGV0IGR4ID0gYlswXSAtIGFbMF0gLy8geDIgLSB4MVxuICBsZXQgZHkgPSBiWzFdIC0gYVsxXTtcbiAgcmV0dXJuIE1hdGguc3FydCggZHgqZHggKyBkeSpkeSApO1xuXG59XG5cbmZ1bmN0aW9uIGVkZ2V2aXNpYmlsdHkodGVzdGVkZ2UsIGVkZ2VzKVxue1xuICAvLyBjb25zb2xlLmxvZyhgVGVzdGluZyBlZGdlOiAke3Rlc3RlZGdlWzBdfSwgJHt0ZXN0ZWRnZVsxXX1gKTtcblxuICBmb3IgKGxldCB0PTA7IHQ8ZWRnZXMubGVuZ3RoOyB0KyspXG4gIHtcbiAgICBsZXQgZSA9IGVkZ2VzW3RdO1xuXG4gICAgbGV0IHJlcyA9IGludGVyc2VjdHModGVzdGVkZ2VbMF0sIHRlc3RlZGdlWzFdLCBlWzBdLCBlWzFdKTtcblxuICAgIC8vIElmIGludGVyc2VjdGlvbiwgY2hlY2sgaXQncyBub3QganVzdCB0aGUgZW5kcG9pbnRzIGtpc3Npbmcgd2hpY2ggaXMgb2tcbiAgICAvLyBpbiBmYWN0LCBpdCdzIG1vcmUgdGhhbiAnb2snIC0gaXQncyBleGFjdGx5IHdoYXQgd2UncmUgbG9va2luZyBmb3JcbiAgICBpZiAocmVzLmludGVyc2VjdCAmJiAhcmVzLmtpc3MpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5cbmZ1bmN0aW9uIGVxdWFscyhhLCBiKVxue1xuICByZXR1cm4gKGFbMF0gPT0gYlswXSAmJiBhWzFdID09IGJbMV0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1NjZW5lLmpzIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICB0aGlzLnZlcnRpY2VzID0gW107XG4gICAgdGhpcy5lZGdlcyA9IFtdO1xuICAgIHRoaXMubnVtZWRnZXMgPSAwO1xuICB9XG5cbiAgYWRkdmVydGV4KG4pXG4gIHtcbiAgICB0aGlzLnZlcnRpY2VzLnB1c2gobik7XG4gICAgdGhpcy5lZGdlc1tuXSA9IFtdO1xuICB9XG5cbiAgYWRkZWRnZSh2MSwgdjIsIGNvc3QpXG4gIHtcbiAgICB0aGlzLmVkZ2VzW3YxXS5wdXNoKHtkZXN0OnYyLCBjb3N0fSk7XG4gICAgdGhpcy5lZGdlc1t2Ml0ucHVzaCh7ZGVzdDp2MSwgY29zdH0pO1xuXG4gICAgdGhpcy5udW1lZGdlcysrO1xuICB9XG5cbiAgLy8gU3VwZXIgYmFzaWMgaW1wbGVtZW50YXRpb24gb2YgRGlqa3N0cmEncyBhbGdvcml0aG1cbiAgLy8gRGlyZWN0bHkgZnJvbSB0aGlzIHJlY2lwZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRGlqa3N0cmElMjdzX2FsZ29yaXRobSNBbGdvcml0aG1cbiAgc2hvcnRlc3Qoc3RhcnQsIGVuZClcbiAge1xuICAgIGxldCBjdXJyZW50X25vZGU7XG4gICAgbGV0IGRpc3QgPSBbMF07XG4gICAgbGV0IHByZXYgPSBbXTtcbiAgICBsZXQgdW52aXNpdGVkID0gW107XG5cbiAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy52ZXJ0aWNlcy5sZW5ndGg7IGkrKylcbiAgICB7XG4gICAgICBpZiAoaSkgZGlzdFtpXSA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICB1bnZpc2l0ZWRbaV0gPSBpO1xuICAgICAgcHJldltpXSA9IG51bGw7XG4gICAgfVxuXG4gICAgd2hpbGUoIChjdXJyZW50X25vZGUgPSB1bnZpc2l0ZWQuc2hpZnQoKSkgIT0gbnVsbCApXG4gICAge1xuICAgICAgZm9yIChsZXQgdD0wOyB0PHRoaXMuZWRnZXNbY3VycmVudF9ub2RlXS5sZW5ndGg7IHQrKylcbiAgICAgIHtcbiAgICAgICAgLy8gdmVydGV4L25vZGUgSURcbiAgICAgICAgbGV0IG5laWdoYm91ciA9IHRoaXMuZWRnZXNbY3VycmVudF9ub2RlXVt0XS5kZXN0O1xuXG4gICAgICAgIC8vIERpc3RhbmNlIGZyb20gY3VycmVudF9ub2RlIHRvIG5laWdoYm91clxuICAgICAgICBsZXQgY29zdCA9IHRoaXMuZWRnZXNbY3VycmVudF9ub2RlXVt0XS5jb3N0O1xuXG4gICAgICAgIC8vIERpc3RhbmNlIHRodXMgZmFyIG9uIHRoaXMgcm91dGUgKHVwIHRvIGN1cnJlbnRfbm9kZSkgKyBkaXN0YW5jZSB0byBuZWlnaGJvdXJcbiAgICAgICAgbGV0IHRlbnRhdGl2ZV9kaXN0ID0gZGlzdFtjdXJyZW50X25vZGVdICsgY29zdDtcblxuICAgICAgICAvLyBIYXZlIHdlIGZvdW5kIGEgc2hvcnRlciBwYXRoP1xuICAgICAgICBpZiAodGVudGF0aXZlX2Rpc3QgPCBkaXN0W25laWdoYm91cl0pXG4gICAgICAgIHtcbiAgICAgICAgICBkaXN0W25laWdoYm91cl0gPSB0ZW50YXRpdmVfZGlzdDsgLy8gTmV3IGRpc3RhbmNlIHRvIHRoaXMgbm9kZVxuICAgICAgICAgIHByZXZbbmVpZ2hib3VyXSA9IGN1cnJlbnRfbm9kZTsgICAvLyBVcGRhdGUgdGhlIHJvdXRlXG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBjID0gZW5kLCBzZXEgPVtlbmRdO1xuXG4gICAgLy8gZmFpbGVkIGZvciBzb21lIHJlYXNvbiwgZS5nLiBpbXBvc3NpYmxlIHBvaW50IGluc2lkZSBudWxsc3BhY2UgZXRjXG4gICAgaWYgKHByZXZbY10gPT0gbnVsbClcbiAgICAgIHJldHVybiBbXTtcblxuICAgIGRvIHtcbiAgICAgIGMgPSBwcmV2W2NdO1xuICAgICAgc2VxLnB1c2goYyk7XG4gICAgfSB3aGlsZShjICE9IHN0YXJ0KTtcblxuICAgIHJldHVybiBzZXEucmV2ZXJzZSgpO1xuXG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0dyYXBoLmpzIiwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyXG57XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpXG4gIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KTtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgfVxuXG4gIGNsZWFyKClcbiAge1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgfVxuXG4gIHJlbmRlcihvYmplY3RzLCBjb2xvdXIgPSAnIzAwMCcsIHdpZHRoID0gMilcbiAge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3RzKSkgcmV0dXJuO1xuXG4gICAgLy8gcG9pbnQgdHlwZVxuICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3RzWzBdKSlcbiAgICB7XG4gICAgICBjb25zdCBwID0gb2JqZWN0cztcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5hcmMocFswXT4+MCwgcFsxXT4+MCwgd2lkdGgsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3VyO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICB9IGVsc2Uge1xuICAgIC8vIGxpc3Qgb2Ygc2hhcGVzIHR5cGVcblxuICAgICAgZm9yIChsZXQgbyBvZiBvYmplY3RzKVxuICAgICAge1xuICAgICAgICBmb3IgKGxldCBlPTA7IGU8by5sZW5ndGgtMTsgZSsrKVxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5fbGluZShvW2VdLCBvW2UrMV0sIGNvbG91ciwgd2lkdGgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIF9saW5lKGEsIGIsIGMsIHcpXG4gIHtcbiAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdztcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjIHx8ICdibGFjayc7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oYVswXT4+MCxhWzFdPj4wKTtcbiAgICB0aGlzLmNvbnRleHQubGluZVRvKGJbMF0+PjAsYlsxXT4+MCk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=