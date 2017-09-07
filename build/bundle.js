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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Util = __webpack_require__(0);

var _Scene = __webpack_require__(2);

var _Scene2 = _interopRequireDefault(_Scene);

var _Renderer = __webpack_require__(4);

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderer = new _Renderer2.default('display');
var scene = new _Scene2.default();

// Start point and our goal
var start = [10, 10];
var end = [380, 420];

// Add some obstacles to the scene
var sq_small = (0, _Util.Square)(120, 100, 100);
// let sq_small = Square(334+50, 314+50, 100);
var sq_med = (0, _Util.Square)(200, 310, 150);
var sq_large = (0, _Util.Square)(500, 150, 200);

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

  // Throttle a bit
  if (Date.now() / 5 >> 0 & 1) return;

  // if ((Date.now() / 10)>>0 & 1) return;

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

  translate(sq_small, 1, 1);
}

function translate(shape, dx, dy) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = shape[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var pair = _step3.value;

      pair[0] += dx;
      pair[1] += dy;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjA5MjBiMzViZWE3MmY5NjZmMzIiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJpbnRlcnNlY3RzIiwiYXAiLCJhcDIiLCJhcSIsImFxMiIsImRvTGluZVNlZ21lbnRzSW50ZXJzZWN0IiwiaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsiLCJwIiwicDIiLCJxIiwicTIiLCJib3gxIiwieG1pbiIsIk1hdGgiLCJtaW4iLCJ5bWluIiwieG1heCIsIm1heCIsInltYXgiLCJib3gyIiwiYmJveF9jb250YWluZWQiLCJhIiwiYiIsInIiLCJzdWJ0cmFjdFBvaW50cyIsInMiLCJ1TnVtZXJhdG9yIiwiY3Jvc3NQcm9kdWN0IiwiZGVub21pbmF0b3IiLCJlcXVhbFBvaW50cyIsImludGVyc2VjdCIsImtpc3MiLCJhbGxFcXVhbCIsInUiLCJ0IiwicG9pbnQxIiwicG9pbnQyIiwicmVzdWx0IiwiYXJncyIsImZpcnN0VmFsdWUiLCJhcmd1bWVudHMiLCJpIiwibGVuZ3RoIiwicmVuZGVyZXIiLCJzY2VuZSIsInN0YXJ0IiwiZW5kIiwic3Ffc21hbGwiLCJzcV9tZWQiLCJzcV9sYXJnZSIsIm9ic3RhY2xlcyIsIm8iLCJhZGQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJmcmFtZSIsIkRhdGUiLCJub3ciLCJyb3V0ZSIsInNvbHZlIiwidmlzIiwiY2xlYXIiLCJub2RlcyIsIm4iLCJyZW5kZXIiLCJlZGdlcyIsIm9iamVjdHMiLCJ0cmFuc2xhdGUiLCJzaGFwZSIsImR4IiwiZHkiLCJwYWlyIiwiU2NlbmUiLCJncmFwaCIsIl92aXMiLCJvYmplY3QiLCJfZ3JhcGgiLCJzaG9ydGVzdCIsInNoYXBlX2lkIiwidmVydGV4IiwiZSIsImVxdWFscyIsImciLCJhZGR2ZXJ0ZXgiLCJOdW1iZXIiLCJuZSIsIkEiLCJCIiwidGVzdGVkZ2UiLCJlZGdldmlzaWJpbHR5IiwiYWRkZWRnZSIsImNvc3QiLCJzcXJ0IiwicmVzIiwiR3JhcGgiLCJ2ZXJ0aWNlcyIsIm51bWVkZ2VzIiwidjEiLCJ2MiIsImRlc3QiLCJjdXJyZW50X25vZGUiLCJkaXN0IiwicHJldiIsInVudmlzaXRlZCIsIk1BWF9WQUxVRSIsInNoaWZ0IiwibmVpZ2hib3VyIiwidGVudGF0aXZlX2Rpc3QiLCJjIiwic2VxIiwicmV2ZXJzZSIsIlJlbmRlcmVyIiwiZWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiY29sb3VyIiwiQXJyYXkiLCJpc0FycmF5IiwiYmVnaW5QYXRoIiwiYXJjIiwiUEkiLCJmaWxsU3R5bGUiLCJmaWxsIiwiX2xpbmUiLCJ3IiwibGluZVdpZHRoIiwic3Ryb2tlU3R5bGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7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S2QsT0FBTCxDQUFhZSxTQUFiLEdBQXlCRCxDQUF6QjtBQUNBLFdBQUtkLE9BQUwsQ0FBYWdCLFdBQWIsR0FBMkJ2QixLQUFLLE9BQWhDO0FBQ0EsV0FBS08sT0FBTCxDQUFhUSxTQUFiO0FBQ0EsV0FBS1IsT0FBTCxDQUFhaUIsTUFBYixDQUFvQjlHLEVBQUUsQ0FBRixLQUFNLENBQTFCLEVBQTRCQSxFQUFFLENBQUYsS0FBTSxDQUFsQztBQUNBLFdBQUs2RixPQUFMLENBQWFrQixNQUFiLENBQW9COUcsRUFBRSxDQUFGLEtBQU0sQ0FBMUIsRUFBNEJBLEVBQUUsQ0FBRixLQUFNLENBQWxDO0FBQ0EsV0FBSzRGLE9BQUwsQ0FBYW1CLE1BQWI7QUFDRDs7Ozs7O2tCQWhEa0J2QixRIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYwOTIwYjM1YmVhNzJmOTY2ZjMyIiwiXG5cbmZ1bmN0aW9uIFNxdWFyZSh4LCB5LCBzaXplKVxue1xuICBsZXQgaHNpemUgPSBzaXplPj4xO1xuICBsZXQgc3EgPSBbXTtcbiAgLy8gb3IganVzdCBtYWtlIGEgdW5pdCBzcXVhcmUgYW5kIHNjYWxlIGl0IHVwIGR1aCA6fFxuICAvLyB0b3AgbGVmdFxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5IC0gaHNpemVdICk7XG4gIC8vIHRvcCByaWdodFxuICBzcS5wdXNoKCBbeCArIGhzaXplLCB5IC0gaHNpemVdICk7XG4gIC8vIGJvdHRvbSByaWdodFxuICBzcS5wdXNoKCBbeCArIGhzaXplLCB5ICsgaHNpemVdICk7XG4gIC8vIGJvdHRvbSBsZWZ0XG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgKyBoc2l6ZV0gKTtcbiAgLy8gdG9wIGxlZnQgYWdhaW5cbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSAtIGhzaXplXSApO1xuXG4gIHJldHVybiBzcTtcbn1cblxuXG4vKipcbiAqIEBhdXRob3IgUGV0ZXIgS2VsbGV5XG4gKiBAYXV0aG9yIHBna2VsbGV5NEBnbWFpbC5jb21cbiAqL1xuLyoqXG4gKiBTZWUgaWYgdHdvIGxpbmUgc2VnbWVudHMgaW50ZXJzZWN0LiBUaGlzIHVzZXMgdGhlXG4gKiB2ZWN0b3IgY3Jvc3MgcHJvZHVjdCBhcHByb2FjaCBkZXNjcmliZWQgYmVsb3c6XG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NjUyODIvNzg2MzM5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHAgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgc3RhcnQgb2YgdGhlIDFzdCBsaW5lLlxuICogQHBhcmFtIHtPYmplY3R9IHAyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIGVuZCBvZiB0aGUgMXN0IGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBzdGFydCBvZiB0aGUgMm5kIGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcTIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgZW5kIG9mIHRoZSAybmQgbGluZS5cbiAqL1xuXG5mdW5jdGlvbiBpbnRlcnNlY3RzKGFwLCBhcDIsIGFxLCBhcTIpXG57XG4gIC8vIEFNOiBOb3RlIHRvIGRldmVsb3BlcnMsIHVzaW5nIG5hbWVkIHByb3BlcnRpZXMgZm9yIHZlY3RvcnMgaXMgcmV0YXJkZWQuIHRoYW5rcy5cbiAgcmV0dXJuIGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0KCB7eDogYXBbMF0sIHk6IGFwWzFdfSwge3g6IGFwMlswXSwgeTogYXAyWzFdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eDogYXFbMF0sIHk6IGFxWzFdfSwge3g6IGFxMlswXSwgeTogYXEyWzFdfSApO1xufVxuXG5mdW5jdGlvbiBpc19vbmVfYmJveF9jb250YWluZWRfYnlfdGhlX290aGVyX3F1ZXN0aW9ubWFyayhwLCBwMiwgcSwgcTIpXG57XG4gIHZhciBib3gxID0ge1xuICAgIHhtaW46IE1hdGgubWluKHAueCwgcDIueCksXG4gICAgeW1pbjogTWF0aC5taW4ocC55LCBwMi55KSxcbiAgICB4bWF4OiBNYXRoLm1heChwLngsIHAyLngpLFxuICAgIHltYXg6IE1hdGgubWF4KHAueSwgcDIueSlcbiAgfTtcblxuICB2YXIgYm94MiA9IHtcbiAgICB4bWluOiBNYXRoLm1pbihxLngsIHEyLngpLFxuICAgIHltaW46IE1hdGgubWluKHEueSwgcTIueSksXG4gICAgeG1heDogTWF0aC5tYXgocS54LCBxMi54KSxcbiAgICB5bWF4OiBNYXRoLm1heChxLnksIHEyLnkpXG4gIH07XG5cbiAgcmV0dXJuIGJib3hfY29udGFpbmVkKGJveDEsIGJveDIpIHx8IGJib3hfY29udGFpbmVkKGJveDIsIGJveDEpO1xufVxuXG5mdW5jdGlvbiBiYm94X2NvbnRhaW5lZChhLCBiKVxue1xuICAvLyBJcyBCb3ggQiBjb21wbGV0ZWx5IGluc2lkZSBib3ggQSA/XG4gIHJldHVybiAoYi54bWluID49IGEueG1pbiAmJiBiLnhtYXggPD0gYS54bWF4KSAmJiAoYi55bWluID49IGEueW1pbiAmJiBiLnltYXggPD0gYS55bWF4KTtcbn1cblxuXG5mdW5jdGlvbiBkb0xpbmVTZWdtZW50c0ludGVyc2VjdChwLCBwMiwgcSwgcTIpXG57XG4gIC8vIHZhciBkZWJ1Z19zdHJpbmcgPSBgZG9MaW5lU2VnbWVudHNJbnRlcnNlY3Q6ICgke3AueH0sICR7cC55fSktKCR7cDIueH0sICR7cDIueX0pICB3aXRoICAoJHtxLnh9LCAke3EueX0pLSgke3EyLnh9LCAke3EyLnl9KWA7XG5cblx0dmFyIHIgPSBzdWJ0cmFjdFBvaW50cyhwMiwgcCk7XG5cdHZhciBzID0gc3VidHJhY3RQb2ludHMocTIsIHEpO1xuXG5cdHZhciB1TnVtZXJhdG9yID0gY3Jvc3NQcm9kdWN0KHN1YnRyYWN0UG9pbnRzKHEsIHApLCByKTtcblx0dmFyIGRlbm9taW5hdG9yID0gY3Jvc3NQcm9kdWN0KHIsIHMpO1xuXG5cdGlmICh1TnVtZXJhdG9yID09IDAgJiYgZGVub21pbmF0b3IgPT0gMCkge1xuXHRcdC8vIFRoZXkgYXJlIGNvTGxpbmVhclxuXG4gICAgLy8gY29uc29sZS5sb2coXCJDb3BsYW5hclwiKTtcblxuXHRcdC8vIERvIHRoZXkgdG91Y2g/IChBcmUgYW55IG9mIHRoZSBwb2ludHMgZXF1YWw/KVxuXHRcdGlmIChlcXVhbFBvaW50cyhwLCBxKSB8fCBlcXVhbFBvaW50cyhwLCBxMikgfHwgZXF1YWxQb2ludHMocDIsIHEpIHx8IGVxdWFsUG9pbnRzKHAyLCBxMikpIHtcblx0XHRcdHJldHVybiB7XG4gICAgICAgIGludGVyc2VjdDogdHJ1ZSxcbiAgICAgICAga2lzczogIWlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrKHAsIHAyLCBxLCBxMilcbiAgICAgIH07XG5cblx0XHR9XG5cdFx0Ly8gRG8gdGhleSBvdmVybGFwPyAoQXJlIGFsbCB0aGUgcG9pbnQgZGlmZmVyZW5jZXMgaW4gZWl0aGVyIGRpcmVjdGlvbiB0aGUgc2FtZSBzaWduKVxuXG4gICAgLy8gY29uc29sZS5sb2coXCJQb2ludHMgRE9OVCB0b3VjaFwiKTtcblxuXHRcdHJldHVybiB7XG4gICAgICBpbnRlcnNlY3Q6XG4gICAgICAgICAgICAhYWxsRXF1YWwoXG4gICAgICBcdFx0XHRcdChxLnggLSBwLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEueCAtIHAyLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnggLSBwLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnggLSBwMi54IDwgMCkpIHx8XG4gICAgICBcdFx0XHQhYWxsRXF1YWwoXG4gICAgICBcdFx0XHRcdChxLnkgLSBwLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEueSAtIHAyLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnkgLSBwLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnkgLSBwMi55IDwgMCkpLFxuICAgICAgICBraXNzOiBmYWxzZVxuICAgICAgfTtcblxuXHR9XG5cblx0aWYgKGRlbm9taW5hdG9yID09IDApIHtcblx0XHQvLyBsaW5lcyBhcmUgcGFyYWxlbGxcblx0XHRyZXR1cm4ge2ludGVyc2VjdDogZmFsc2UsIGtpc3M6IGZhbHNlfTtcblx0fVxuXG5cdHZhciB1ID0gdU51bWVyYXRvciAvIGRlbm9taW5hdG9yO1xuXHR2YXIgdCA9IGNyb3NzUHJvZHVjdChzdWJ0cmFjdFBvaW50cyhxLCBwKSwgcykgLyBkZW5vbWluYXRvcjtcblxuICAvLyBjb25zb2xlLmxvZyhgdD0ke3R9LCB1PSR7dX1gKTtcbiAgdmFyIGtpc3MgPSBmYWxzZTtcblxuICBpZiAoZXF1YWxQb2ludHMocCwgcSkgfHwgZXF1YWxQb2ludHMocCwgcTIpIHx8IGVxdWFsUG9pbnRzKHAyLCBxKSB8fCBlcXVhbFBvaW50cyhwMiwgcTIpKVxuICAgIGtpc3MgPSB0cnVlO1xuXG4gIC8vIGxldCByZXMgPVxuICAvL3JldHVyblxuICByZXR1cm4ge1xuICAgIGludGVyc2VjdDogKHQgPj0gMCkgJiYgKHQgPD0gMSkgJiYgKHUgPj0gMCkgJiYgKHUgPD0gMSksXG4gICAga2lzczoga2lzc1xuICB9O1xuXG4gIC8vIGNvbnNvbGUubG9nKGAke2RlYnVnX3N0cmluZ30gPSAke3Jlc31gKTtcblxuXHQvLyByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZSB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0aGUgdHdvIHBvaW50cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICpcbiAqIEByZXR1cm4gdGhlIGNyb3NzIHByb2R1Y3QgcmVzdWx0IGFzIGEgZmxvYXRcbiAqL1xuZnVuY3Rpb24gY3Jvc3NQcm9kdWN0KHBvaW50MSwgcG9pbnQyKSB7XG5cdHJldHVybiBwb2ludDEueCAqIHBvaW50Mi55IC0gcG9pbnQxLnkgKiBwb2ludDIueDtcbn1cblxuLyoqXG4gKiBTdWJ0cmFjdCB0aGUgc2Vjb25kIHBvaW50IGZyb20gdGhlIGZpcnN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiB0aGUgc3VidHJhY3Rpb24gcmVzdWx0IGFzIGEgcG9pbnQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIHN1YnRyYWN0UG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XG5cdHZhciByZXN1bHQgPSB7fTtcblx0cmVzdWx0LnggPSBwb2ludDEueCAtIHBvaW50Mi54O1xuXHRyZXN1bHQueSA9IHBvaW50MS55IC0gcG9pbnQyLnk7XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBTZWUgaWYgdGhlIHBvaW50cyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIGlmIHRoZSBwb2ludHMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGVxdWFsUG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XG5cdHJldHVybiAocG9pbnQxLnggPT0gcG9pbnQyLngpICYmIChwb2ludDEueSA9PSBwb2ludDIueSlcbn1cblxuLyoqXG4gKiBTZWUgaWYgYWxsIGFyZ3VtZW50cyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHsuLi59IGFyZ3MgYXJndW1lbnRzIHRoYXQgd2lsbCBiZSBjb21wYXJlZCBieSAnPT0nLlxuICpcbiAqIEByZXR1cm4gaWYgYWxsIGFyZ3VtZW50cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gYWxsRXF1YWwoYXJncykge1xuXHR2YXIgZmlyc3RWYWx1ZSA9IGFyZ3VtZW50c1swXSxcblx0XHRpO1xuXHRmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKGFyZ3VtZW50c1tpXSAhPSBmaXJzdFZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0cnVlO1xufVxuXG5cblxuZXhwb3J0IHtTcXVhcmUsIGludGVyc2VjdHN9IDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9VdGlsLmpzIiwiXG5pbXBvcnQge1NxdWFyZX0gICAgIGZyb20gJy4vVXRpbCc7XG5pbXBvcnQgU2NlbmUgICAgICAgIGZyb20gJy4vU2NlbmUnO1xuaW1wb3J0IFJlbmRlcmVyICAgICBmcm9tICcuL1JlbmRlcmVyJztcblxubGV0IHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKCdkaXNwbGF5Jyk7XG5sZXQgc2NlbmUgPSBuZXcgU2NlbmUoKTtcblxuLy8gU3RhcnQgcG9pbnQgYW5kIG91ciBnb2FsXG5sZXQgc3RhcnQgPSBbMTAsIDEwXTtcbmxldCBlbmQgPSBbMzgwLCA0MjBdO1xuXG4vLyBBZGQgc29tZSBvYnN0YWNsZXMgdG8gdGhlIHNjZW5lXG5sZXQgc3Ffc21hbGwgPSBTcXVhcmUoMTIwLCAxMDAsIDEwMCk7XG4vLyBsZXQgc3Ffc21hbGwgPSBTcXVhcmUoMzM0KzUwLCAzMTQrNTAsIDEwMCk7XG5sZXQgc3FfbWVkICAgPSBTcXVhcmUoMjAwLCAzMTAsIDE1MCk7XG5sZXQgc3FfbGFyZ2UgPSBTcXVhcmUoNTAwLCAxNTAsIDIwMCk7XG5cbmxldCBvYnN0YWNsZXMgPSBbc3Ffc21hbGwsIHNxX21lZCwgc3FfbGFyZ2VdO1xuXG5mb3IgKGxldCBvIG9mIG9ic3RhY2xlcylcbiAgc2NlbmUuYWRkKCBvICk7XG5cbnJlcXVlc3RBbmltYXRpb25GcmFtZSggZnJhbWUgKTtcblxuZnVuY3Rpb24gZnJhbWUoKVxue1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGZyYW1lICk7XG5cbiAgLy8gVGhyb3R0bGUgYSBiaXRcbiAgaWYgKCgoRGF0ZS5ub3coKSAvIDUpPj4wKSAmIDEpXG4gICAgcmV0dXJuO1xuXG4gIC8vIGlmICgoRGF0ZS5ub3coKSAvIDEwKT4+MCAmIDEpIHJldHVybjtcblxuICAvLyBGaW5kIHRoZSBzaG9ydGVzdCBwYXRoLiBUd28gdGhpbmdzIGhhcHBlbiBoZXJlOlxuICAvLyAgICAxLiBBIFNjZW5lIGdyYXBoIGlzIGV4dHJhY3RlZCBmcm9tIG91ciBzY2VuZSBnZW9tZXRyeVxuICAvLyAgICAyLiBEaWprc3RyYSdzIG1ldGhvZCBpcyB1c2VkIHRvIGZpbmQgdGhlIG9wdGltYWwgcm91dGUgYWNyb3NzIHRoZSBncmFwaFxuICBsZXQgcm91dGUgPSBzY2VuZS5zb2x2ZSggc3RhcnQsIGVuZCApO1xuXG4gIC8vIEdldCBhIHZpc3VhbGlzYXRpb24gb2YgdGhlIGFjdHVhbCBzY2VuZWdyYXBoXG4gIGxldCB2aXMgPSBzY2VuZS52aXMoKTtcblxuICByZW5kZXJlci5jbGVhcigpO1xuXG4gIC8vIERyYXcgdGhlIHNjZW5lIGdyYXBoIG5vZGVzXG4gIGZvciAobGV0IG4gb2YgdmlzLm5vZGVzKVxuICAgIHJlbmRlcmVyLnJlbmRlciggbiwgJyNkZGQnLCA1ICk7XG5cbiAgLy8gRHJhdyB0aGUgZ3JhcGggZWRnZXNcbiAgcmVuZGVyZXIucmVuZGVyKCB2aXMuZWRnZXMsICcjZGRkJyApO1xuXG4gIC8vIFJlbmRlciB0aGUgb3JpZ2luYWwgc2NlbmUgZ2VvbWV0cnkgb24gdG9wIG9mIHRoZSBncmFwaFxuICByZW5kZXJlci5yZW5kZXIoIHN0YXJ0LCAnIzBhMCcsIDYgKTtcbiAgcmVuZGVyZXIucmVuZGVyKCBlbmQsICcjMDhmJywgNiApO1xuICByZW5kZXJlci5yZW5kZXIoIHNjZW5lLm9iamVjdHMsICcjMzMzJyApO1xuXG4gIC8vIE5vdyBkaXNwbGF5IHRoZSBmb3VuZCByb3V0ZSFcbiAgcmVuZGVyZXIucmVuZGVyKCBbcm91dGVdLCAnI2YwMCcsIDMgKTtcblxuXG5cbiAgdHJhbnNsYXRlKHNxX3NtYWxsLCAxLCAxKTtcblxufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGUoc2hhcGUsIGR4LCBkeSlcbntcbiAgZm9yIChsZXQgcGFpciBvZiBzaGFwZSlcbiAge1xuICAgIHBhaXJbMF0gKz0gZHg7XG4gICAgcGFpclsxXSArPSBkeTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiLCJcbmltcG9ydCBHcmFwaCAgICAgICAgICBmcm9tICcuL0dyYXBoJztcbmltcG9ydCB7aW50ZXJzZWN0c30gICBmcm9tICcuL1V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZVxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICB0aGlzLm9iamVjdHMgPSBbXTtcbiAgICB0aGlzLmdyYXBoID0gbnVsbDtcblxuICAgIC8vIFRoaXMgaXMganVzdCBmb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoXG4gICAgdGhpcy5fdmlzID0gbnVsbDtcbiAgfVxuXG4gIGFkZChvYmplY3QpXG4gIHtcbiAgICB0aGlzLm9iamVjdHMucHVzaChvYmplY3QpO1xuICB9XG5cbiAgc29sdmUoc3RhcnQsIGVuZClcbiAge1xuICAgIHRoaXMuZ3JhcGggPSB0aGlzLl9ncmFwaChzdGFydCwgZW5kKTtcbiAgICBsZXQgbm9kZXMgPSB0aGlzLmdyYXBoLnNob3J0ZXN0KDAsIDEpOyAvLyBbMF0gc3RhcnQsIFsxXSBlbmQgKHNlZSAuZ3JhcGgoKSlcblxuICAgIGxldCByb3V0ZSA9IFtdO1xuICAgIGZvciAobGV0IG4gb2Ygbm9kZXMpXG4gICAge1xuICAgICAgcm91dGUucHVzaCh0aGlzLl92aXMubm9kZXNbIG4gXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvdXRlO1xuICB9XG5cbiAgdmlzKClcbiAge1xuICAgIHJldHVybiB0aGlzLl92aXM7XG4gIH1cblxuICAvLyBFeHRyYWN0IGEgc2NlbmVncmFwaCBmcm9tIG91ciBjb250aW51b3VzIGV1Y2xpZGVhbiBnZW9tZXRyeVxuICBfZ3JhcGgoc3RhcnQsIGVuZClcbiAge1xuICAgIGxldCBub2RlcyA9IFtdO1xuICAgIGxldCBlZGdlcyA9IFtdO1xuXG4gICAgLy8gRm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaFxuICAgIHRoaXMuX3ZpcyA9IHsgbm9kZXM6IFtdLCBlZGdlczogW10gfTtcblxuICAgIC8vIFRoaXMgaXMganVzdCBhIHRlbXAgdmFsdWUgdXNlZCB0byBtYWtlIHN1cmUgc2hhcGVzIGRvbid0IHBlcmZvcm1cbiAgICAvLyBpbnRlcnNlY3Rpb24gdGVzdHMgb24gdGhlbXNlbHZlcyAoYWNyb3NzIHRoZWlyIG93biB2ZXJ0aWNlcylcbiAgICBsZXQgc2hhcGVfaWQgPSAxO1xuXG4gICAgLy8gVGhlc2UgZmlyc3QgdHdvIG5vZGVzIGluIHRoZSBncmFwaCBhcmUgYSBzcGVjaWFsIGNhc2VcbiAgICBub2Rlcy5wdXNoKCB7dmVydGV4OiBzdGFydCwgIHNoYXBlOiBzaGFwZV9pZCsrfSApOyAvLyBbMF0gc3RhcnQgKHNlZSAuc29sdmUoKSlcbiAgICBub2Rlcy5wdXNoKCB7dmVydGV4OiBlbmQsICAgIHNoYXBlOiBzaGFwZV9pZCsrfSApOyAvLyBbMV0gZW5kXG5cbiAgICAvLyBleHRyYWN0IGVhY2ggb2JzdGFjbGUncyBlZGdlcyBhbmQgbm9kZXNcbiAgICBmb3IgKGxldCBvIG9mIHRoaXMub2JqZWN0cylcbiAgICB7XG4gICAgICBzaGFwZV9pZCsrO1xuXG4gICAgICBsZXQgZTtcbiAgICAgIGZvciAoZT0wOyBlPG8ubGVuZ3RoLTE7IGUrKylcbiAgICAgIHtcbiAgICAgICAgZWRnZXMucHVzaChbb1tlXSwgb1tlKzFdXSk7XG5cbiAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgdmVydGV4OiBvW2VdLFxuICAgICAgICAgIHNoYXBlOiBzaGFwZV9pZFxuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgICAgLy8gdGhpcyBpc24ndCBhIGNsb3NlZCByaW5nIChtYXRjaGluZyBzdGFydCBhbmQgZW5kcClcbiAgICAgIGlmICghZXF1YWxzKG9bMF0sIG9bZV0pKVxuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB2ZXJ0ZXg6IG9bZV0sXG4gICAgICAgICAgc2hhcGU6IHNoYXBlX2lkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxldCBnID0gbmV3IEdyYXBoKCk7XG5cbiAgICAvLyBBZGQgYG5vZGVzYCBpbmRpY2VzIHRvIGdyYXBoXG4gICAgZm9yIChsZXQgaSBpbiBub2RlcylcbiAgICB7XG4gICAgICBnLmFkZHZlcnRleChOdW1iZXIoaSkpO1xuXG4gICAgICAvLyBGb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoXG4gICAgICB0aGlzLl92aXMubm9kZXMucHVzaChub2Rlc1tOdW1iZXIoaSldLnZlcnRleCk7XG4gICAgfVxuXG4gICAgLy8gZy5hZGRlZGdlKCk6IHBlcmltZXRlciBvZiBhbGwgb2JzdGFjbGVzXG5cbiAgICBsZXQgbmU9MDtcblxuICAgIGZvciAobGV0IHg9MDsgeDxub2Rlcy5sZW5ndGgtMTsgeCsrKVxuICAgICAgZm9yIChsZXQgeT14KzE7IHk8bm9kZXMubGVuZ3RoOyB5KyspXG4gICAgICB7XG4gICAgICAgICAgbGV0IEEgPSBub2Rlc1t4XTtcbiAgICAgICAgICBsZXQgQiA9IG5vZGVzW3ldO1xuXG4gICAgICAgICAgLy8gV2UncmUgdGVzdGluZyB0aGUgc2hhcGUncyB2ZXJ0aWNlcyBhZ2FpbnN0IGl0c2VsZlxuICAgICAgICAgIC8vIHdoaWNoIGxlYWRzIHRvIGludGVybmFsIHBhdGhzIGluc2lkZSB0aGUgc2hhcGUgKGludmFsaWQhKVxuICAgICAgICAgIGlmIChBLnNoYXBlID09IEIuc2hhcGUpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgbGV0IHRlc3RlZGdlID0gW0EudmVydGV4LCBCLnZlcnRleF07XG5cbiAgICAgICAgICBpZiAoZWRnZXZpc2liaWx0eSh0ZXN0ZWRnZSwgZWRnZXMpKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGcuYWRkZWRnZSh4LCB5LCBjb3N0KEEudmVydGV4LCBCLnZlcnRleCkpO1xuXG4gICAgICAgICAgICAvLyBKdXN0IGZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGgsIG5vbi1lc3NlbnRpYWw6XG4gICAgICAgICAgICB0aGlzLl92aXMuZWRnZXMucHVzaChbQS52ZXJ0ZXgsIEIudmVydGV4XSk7XG4gICAgICAgICAgfVxuXG4gICAgICB9XG5cblxuICAgIHJldHVybiBnO1xuICB9XG5cbn1cblxuXG5cbmZ1bmN0aW9uIGNvc3QoYSwgYilcbntcbiAgbGV0IGR4ID0gYlswXSAtIGFbMF0gLy8geDIgLSB4MVxuICBsZXQgZHkgPSBiWzFdIC0gYVsxXTtcbiAgcmV0dXJuIE1hdGguc3FydCggZHgqZHggKyBkeSpkeSApO1xuXG59XG5cbmZ1bmN0aW9uIGVkZ2V2aXNpYmlsdHkodGVzdGVkZ2UsIGVkZ2VzKVxue1xuICAvLyBjb25zb2xlLmxvZyhgVGVzdGluZyBlZGdlOiAke3Rlc3RlZGdlWzBdfSwgJHt0ZXN0ZWRnZVsxXX1gKTtcblxuICBmb3IgKGxldCB0PTA7IHQ8ZWRnZXMubGVuZ3RoOyB0KyspXG4gIHtcbiAgICBsZXQgZSA9IGVkZ2VzW3RdO1xuXG4gICAgbGV0IHJlcyA9IGludGVyc2VjdHModGVzdGVkZ2VbMF0sIHRlc3RlZGdlWzFdLCBlWzBdLCBlWzFdKTtcblxuICAgIC8vIElmIGludGVyc2VjdGlvbiwgY2hlY2sgaXQncyBub3QganVzdCB0aGUgZW5kcG9pbnRzIGtpc3Npbmcgd2hpY2ggaXMgb2tcbiAgICAvLyBpbiBmYWN0LCBpdCdzIG1vcmUgdGhhbiAnb2snIC0gaXQncyBleGFjdGx5IHdoYXQgd2UncmUgbG9va2luZyBmb3JcbiAgICBpZiAocmVzLmludGVyc2VjdCAmJiAhcmVzLmtpc3MpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5cbmZ1bmN0aW9uIGVxdWFscyhhLCBiKVxue1xuICByZXR1cm4gKGFbMF0gPT0gYlswXSAmJiBhWzFdID09IGJbMV0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1NjZW5lLmpzIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICB0aGlzLnZlcnRpY2VzID0gW107XG4gICAgdGhpcy5lZGdlcyA9IFtdO1xuICAgIHRoaXMubnVtZWRnZXMgPSAwO1xuICB9XG5cbiAgYWRkdmVydGV4KG4pXG4gIHtcbiAgICB0aGlzLnZlcnRpY2VzLnB1c2gobik7XG4gICAgdGhpcy5lZGdlc1tuXSA9IFtdO1xuICB9XG5cbiAgYWRkZWRnZSh2MSwgdjIsIGNvc3QpXG4gIHtcbiAgICB0aGlzLmVkZ2VzW3YxXS5wdXNoKHtkZXN0OnYyLCBjb3N0fSk7XG4gICAgdGhpcy5lZGdlc1t2Ml0ucHVzaCh7ZGVzdDp2MSwgY29zdH0pO1xuXG4gICAgdGhpcy5udW1lZGdlcysrO1xuICB9XG5cbiAgLy8gU3VwZXIgYmFzaWMgaW1wbGVtZW50YXRpb24gb2YgRGlqa3N0cmEncyBhbGdvcml0aG1cbiAgLy8gRGlyZWN0bHkgZnJvbSB0aGlzIHJlY2lwZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRGlqa3N0cmElMjdzX2FsZ29yaXRobSNBbGdvcml0aG1cbiAgc2hvcnRlc3Qoc3RhcnQsIGVuZClcbiAge1xuICAgIGxldCBjdXJyZW50X25vZGU7XG4gICAgbGV0IGRpc3QgPSBbMF07XG4gICAgbGV0IHByZXYgPSBbXTtcbiAgICBsZXQgdW52aXNpdGVkID0gW107XG5cbiAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy52ZXJ0aWNlcy5sZW5ndGg7IGkrKylcbiAgICB7XG4gICAgICBpZiAoaSkgZGlzdFtpXSA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICB1bnZpc2l0ZWRbaV0gPSBpO1xuICAgICAgcHJldltpXSA9IG51bGw7XG4gICAgfVxuXG4gICAgd2hpbGUoIChjdXJyZW50X25vZGUgPSB1bnZpc2l0ZWQuc2hpZnQoKSkgIT0gbnVsbCApXG4gICAge1xuICAgICAgZm9yIChsZXQgdD0wOyB0PHRoaXMuZWRnZXNbY3VycmVudF9ub2RlXS5sZW5ndGg7IHQrKylcbiAgICAgIHtcbiAgICAgICAgLy8gdmVydGV4L25vZGUgSURcbiAgICAgICAgbGV0IG5laWdoYm91ciA9IHRoaXMuZWRnZXNbY3VycmVudF9ub2RlXVt0XS5kZXN0O1xuXG4gICAgICAgIC8vIERpc3RhbmNlIGZyb20gY3VycmVudF9ub2RlIHRvIG5laWdoYm91clxuICAgICAgICBsZXQgY29zdCA9IHRoaXMuZWRnZXNbY3VycmVudF9ub2RlXVt0XS5jb3N0O1xuXG4gICAgICAgIC8vIERpc3RhbmNlIHRodXMgZmFyIG9uIHRoaXMgcm91dGUgKHVwIHRvIGN1cnJlbnRfbm9kZSkgKyBkaXN0YW5jZSB0byBuZWlnaGJvdXJcbiAgICAgICAgbGV0IHRlbnRhdGl2ZV9kaXN0ID0gZGlzdFtjdXJyZW50X25vZGVdICsgY29zdDtcblxuICAgICAgICAvLyBIYXZlIHdlIGZvdW5kIGEgc2hvcnRlciBwYXRoP1xuICAgICAgICBpZiAodGVudGF0aXZlX2Rpc3QgPCBkaXN0W25laWdoYm91cl0pXG4gICAgICAgIHtcbiAgICAgICAgICBkaXN0W25laWdoYm91cl0gPSB0ZW50YXRpdmVfZGlzdDsgLy8gTmV3IGRpc3RhbmNlIHRvIHRoaXMgbm9kZVxuICAgICAgICAgIHByZXZbbmVpZ2hib3VyXSA9IGN1cnJlbnRfbm9kZTsgICAvLyBVcGRhdGUgdGhlIHJvdXRlXG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBjID0gZW5kLCBzZXEgPVtlbmRdO1xuXG4gICAgLy8gZmFpbGVkIGZvciBzb21lIHJlYXNvbiwgZS5nLiBpbXBvc3NpYmxlIHBvaW50IGluc2lkZSBudWxsc3BhY2UgZXRjXG4gICAgaWYgKHByZXZbY10gPT0gbnVsbClcbiAgICAgIHJldHVybiBbXTtcblxuICAgIGRvIHtcbiAgICAgIGMgPSBwcmV2W2NdO1xuICAgICAgc2VxLnB1c2goYyk7XG4gICAgfSB3aGlsZShjICE9IHN0YXJ0KTtcblxuICAgIHJldHVybiBzZXEucmV2ZXJzZSgpO1xuXG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0dyYXBoLmpzIiwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyXG57XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpXG4gIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KTtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgfVxuXG4gIGNsZWFyKClcbiAge1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgfVxuXG4gIHJlbmRlcihvYmplY3RzLCBjb2xvdXIgPSAnIzAwMCcsIHdpZHRoID0gMilcbiAge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3RzKSkgcmV0dXJuO1xuXG4gICAgLy8gcG9pbnQgdHlwZVxuICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3RzWzBdKSlcbiAgICB7XG4gICAgICBjb25zdCBwID0gb2JqZWN0cztcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5hcmMocFswXT4+MCwgcFsxXT4+MCwgd2lkdGgsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3VyO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICB9IGVsc2Uge1xuICAgIC8vIGxpc3Qgb2Ygc2hhcGVzIHR5cGVcblxuICAgICAgZm9yIChsZXQgbyBvZiBvYmplY3RzKVxuICAgICAge1xuICAgICAgICBmb3IgKGxldCBlPTA7IGU8by5sZW5ndGgtMTsgZSsrKVxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5fbGluZShvW2VdLCBvW2UrMV0sIGNvbG91ciwgd2lkdGgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIF9saW5lKGEsIGIsIGMsIHcpXG4gIHtcbiAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdztcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjIHx8ICdibGFjayc7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oYVswXT4+MCxhWzFdPj4wKTtcbiAgICB0aGlzLmNvbnRleHQubGluZVRvKGJbMF0+PjAsYlsxXT4+MCk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=