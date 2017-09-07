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

  console.log(Date.now() / 10 >> 0 & 1);
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

  requestAnimationFrame(frame);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzc1MmY1MWFkODQzMzFmN2Y2NWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJpbnRlcnNlY3RzIiwiYXAiLCJhcDIiLCJhcSIsImFxMiIsImRvTGluZVNlZ21lbnRzSW50ZXJzZWN0IiwiaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsiLCJwIiwicDIiLCJxIiwicTIiLCJib3gxIiwieG1pbiIsIk1hdGgiLCJtaW4iLCJ5bWluIiwieG1heCIsIm1heCIsInltYXgiLCJib3gyIiwiYmJveF9jb250YWluZWQiLCJhIiwiYiIsInIiLCJzdWJ0cmFjdFBvaW50cyIsInMiLCJ1TnVtZXJhdG9yIiwiY3Jvc3NQcm9kdWN0IiwiZGVub21pbmF0b3IiLCJlcXVhbFBvaW50cyIsImludGVyc2VjdCIsImtpc3MiLCJhbGxFcXVhbCIsInUiLCJ0IiwicG9pbnQxIiwicG9pbnQyIiwicmVzdWx0IiwiYXJncyIsImZpcnN0VmFsdWUiLCJhcmd1bWVudHMiLCJpIiwibGVuZ3RoIiwicmVuZGVyZXIiLCJzY2VuZSIsInN0YXJ0IiwiZW5kIiwic3Ffc21hbGwiLCJzcV9tZWQiLCJzcV9sYXJnZSIsIm9ic3RhY2xlcyIsIm8iLCJhZGQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJmcmFtZSIsImNvbnNvbGUiLCJsb2ciLCJEYXRlIiwibm93Iiwicm91dGUiLCJzb2x2ZSIsInZpcyIsImNsZWFyIiwibm9kZXMiLCJuIiwicmVuZGVyIiwiZWRnZXMiLCJvYmplY3RzIiwidHJhbnNsYXRlIiwic2hhcGUiLCJkeCIsImR5IiwicGFpciIsIlNjZW5lIiwiZ3JhcGgiLCJfdmlzIiwib2JqZWN0IiwiX2dyYXBoIiwic2hvcnRlc3QiLCJzaGFwZV9pZCIsInZlcnRleCIsImUiLCJlcXVhbHMiLCJnIiwiYWRkdmVydGV4IiwiTnVtYmVyIiwibmUiLCJBIiwiQiIsInRlc3RlZGdlIiwiZWRnZXZpc2liaWx0eSIsImFkZGVkZ2UiLCJjb3N0Iiwic3FydCIsInJlcyIsIkdyYXBoIiwidmVydGljZXMiLCJudW1lZGdlcyIsInYxIiwidjIiLCJkZXN0IiwiY3VycmVudF9ub2RlIiwiZGlzdCIsInByZXYiLCJ1bnZpc2l0ZWQiLCJNQVhfVkFMVUUiLCJzaGlmdCIsIm5laWdoYm91ciIsInRlbnRhdGl2ZV9kaXN0IiwiYyIsInNlcSIsInJldmVyc2UiLCJSZW5kZXJlciIsImVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY29udGV4dCIsImdldENvbnRleHQiLCJjbGVhclJlY3QiLCJ3aWR0aCIsImhlaWdodCIsImNvbG91ciIsIkFycmF5IiwiaXNBcnJheSIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwiZmlsbFN0eWxlIiwiZmlsbCIsIl9saW5lIiwidyIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RB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QyxFQUFHcUIsQyxFQUNmO0FBQ0UsV0FBS2QsT0FBTCxDQUFhZSxTQUFiLEdBQXlCRCxDQUF6QjtBQUNBLFdBQUtkLE9BQUwsQ0FBYWdCLFdBQWIsR0FBMkJ2QixLQUFLLE9BQWhDO0FBQ0EsV0FBS08sT0FBTCxDQUFhUSxTQUFiO0FBQ0EsV0FBS1IsT0FBTCxDQUFhaUIsTUFBYixDQUFvQmhILEVBQUUsQ0FBRixLQUFNLENBQTFCLEVBQTRCQSxFQUFFLENBQUYsS0FBTSxDQUFsQztBQUNBLFdBQUsrRixPQUFMLENBQWFrQixNQUFiLENBQW9CaEgsRUFBRSxDQUFGLEtBQU0sQ0FBMUIsRUFBNEJBLEVBQUUsQ0FBRixLQUFNLENBQWxDO0FBQ0EsV0FBSzhGLE9BQUwsQ0FBYW1CLE1BQWI7QUFDRDs7Ozs7O2tCQWhEa0J2QixRIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDM3NTJmNTFhZDg0MzMxZjdmNjVlIiwiXG5cbmZ1bmN0aW9uIFNxdWFyZSh4LCB5LCBzaXplKVxue1xuICBsZXQgaHNpemUgPSBzaXplPj4xO1xuICBsZXQgc3EgPSBbXTtcbiAgLy8gb3IganVzdCBtYWtlIGEgdW5pdCBzcXVhcmUgYW5kIHNjYWxlIGl0IHVwIGR1aCA6fFxuICAvLyB0b3AgbGVmdFxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5IC0gaHNpemVdICk7XG4gIC8vIHRvcCByaWdodFxuICBzcS5wdXNoKCBbeCArIGhzaXplLCB5IC0gaHNpemVdICk7XG4gIC8vIGJvdHRvbSByaWdodFxuICBzcS5wdXNoKCBbeCArIGhzaXplLCB5ICsgaHNpemVdICk7XG4gIC8vIGJvdHRvbSBsZWZ0XG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgKyBoc2l6ZV0gKTtcbiAgLy8gdG9wIGxlZnQgYWdhaW5cbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSAtIGhzaXplXSApO1xuXG4gIHJldHVybiBzcTtcbn1cblxuXG4vKipcbiAqIEBhdXRob3IgUGV0ZXIgS2VsbGV5XG4gKiBAYXV0aG9yIHBna2VsbGV5NEBnbWFpbC5jb21cbiAqL1xuLyoqXG4gKiBTZWUgaWYgdHdvIGxpbmUgc2VnbWVudHMgaW50ZXJzZWN0LiBUaGlzIHVzZXMgdGhlXG4gKiB2ZWN0b3IgY3Jvc3MgcHJvZHVjdCBhcHByb2FjaCBkZXNjcmliZWQgYmVsb3c6XG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NjUyODIvNzg2MzM5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHAgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgc3RhcnQgb2YgdGhlIDFzdCBsaW5lLlxuICogQHBhcmFtIHtPYmplY3R9IHAyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIGVuZCBvZiB0aGUgMXN0IGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBzdGFydCBvZiB0aGUgMm5kIGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcTIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgZW5kIG9mIHRoZSAybmQgbGluZS5cbiAqL1xuXG5mdW5jdGlvbiBpbnRlcnNlY3RzKGFwLCBhcDIsIGFxLCBhcTIpXG57XG4gIC8vIEFNOiBOb3RlIHRvIGRldmVsb3BlcnMsIHVzaW5nIG5hbWVkIHByb3BlcnRpZXMgZm9yIHZlY3RvcnMgaXMgcmV0YXJkZWQuIHRoYW5rcy5cbiAgcmV0dXJuIGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0KCB7eDogYXBbMF0sIHk6IGFwWzFdfSwge3g6IGFwMlswXSwgeTogYXAyWzFdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eDogYXFbMF0sIHk6IGFxWzFdfSwge3g6IGFxMlswXSwgeTogYXEyWzFdfSApO1xufVxuXG5mdW5jdGlvbiBpc19vbmVfYmJveF9jb250YWluZWRfYnlfdGhlX290aGVyX3F1ZXN0aW9ubWFyayhwLCBwMiwgcSwgcTIpXG57XG4gIHZhciBib3gxID0ge1xuICAgIHhtaW46IE1hdGgubWluKHAueCwgcDIueCksXG4gICAgeW1pbjogTWF0aC5taW4ocC55LCBwMi55KSxcbiAgICB4bWF4OiBNYXRoLm1heChwLngsIHAyLngpLFxuICAgIHltYXg6IE1hdGgubWF4KHAueSwgcDIueSlcbiAgfTtcblxuICB2YXIgYm94MiA9IHtcbiAgICB4bWluOiBNYXRoLm1pbihxLngsIHEyLngpLFxuICAgIHltaW46IE1hdGgubWluKHEueSwgcTIueSksXG4gICAgeG1heDogTWF0aC5tYXgocS54LCBxMi54KSxcbiAgICB5bWF4OiBNYXRoLm1heChxLnksIHEyLnkpXG4gIH07XG5cbiAgcmV0dXJuIGJib3hfY29udGFpbmVkKGJveDEsIGJveDIpIHx8IGJib3hfY29udGFpbmVkKGJveDIsIGJveDEpO1xufVxuXG5mdW5jdGlvbiBiYm94X2NvbnRhaW5lZChhLCBiKVxue1xuICAvLyBJcyBCb3ggQiBjb21wbGV0ZWx5IGluc2lkZSBib3ggQSA/XG4gIHJldHVybiAoYi54bWluID49IGEueG1pbiAmJiBiLnhtYXggPD0gYS54bWF4KSAmJiAoYi55bWluID49IGEueW1pbiAmJiBiLnltYXggPD0gYS55bWF4KTtcbn1cblxuXG5mdW5jdGlvbiBkb0xpbmVTZWdtZW50c0ludGVyc2VjdChwLCBwMiwgcSwgcTIpXG57XG4gIC8vIHZhciBkZWJ1Z19zdHJpbmcgPSBgZG9MaW5lU2VnbWVudHNJbnRlcnNlY3Q6ICgke3AueH0sICR7cC55fSktKCR7cDIueH0sICR7cDIueX0pICB3aXRoICAoJHtxLnh9LCAke3EueX0pLSgke3EyLnh9LCAke3EyLnl9KWA7XG5cblx0dmFyIHIgPSBzdWJ0cmFjdFBvaW50cyhwMiwgcCk7XG5cdHZhciBzID0gc3VidHJhY3RQb2ludHMocTIsIHEpO1xuXG5cdHZhciB1TnVtZXJhdG9yID0gY3Jvc3NQcm9kdWN0KHN1YnRyYWN0UG9pbnRzKHEsIHApLCByKTtcblx0dmFyIGRlbm9taW5hdG9yID0gY3Jvc3NQcm9kdWN0KHIsIHMpO1xuXG5cdGlmICh1TnVtZXJhdG9yID09IDAgJiYgZGVub21pbmF0b3IgPT0gMCkge1xuXHRcdC8vIFRoZXkgYXJlIGNvTGxpbmVhclxuXG4gICAgLy8gY29uc29sZS5sb2coXCJDb3BsYW5hclwiKTtcblxuXHRcdC8vIERvIHRoZXkgdG91Y2g/IChBcmUgYW55IG9mIHRoZSBwb2ludHMgZXF1YWw/KVxuXHRcdGlmIChlcXVhbFBvaW50cyhwLCBxKSB8fCBlcXVhbFBvaW50cyhwLCBxMikgfHwgZXF1YWxQb2ludHMocDIsIHEpIHx8IGVxdWFsUG9pbnRzKHAyLCBxMikpIHtcblx0XHRcdHJldHVybiB7XG4gICAgICAgIGludGVyc2VjdDogdHJ1ZSxcbiAgICAgICAga2lzczogIWlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrKHAsIHAyLCBxLCBxMilcbiAgICAgIH07XG5cblx0XHR9XG5cdFx0Ly8gRG8gdGhleSBvdmVybGFwPyAoQXJlIGFsbCB0aGUgcG9pbnQgZGlmZmVyZW5jZXMgaW4gZWl0aGVyIGRpcmVjdGlvbiB0aGUgc2FtZSBzaWduKVxuXG4gICAgLy8gY29uc29sZS5sb2coXCJQb2ludHMgRE9OVCB0b3VjaFwiKTtcblxuXHRcdHJldHVybiB7XG4gICAgICBpbnRlcnNlY3Q6XG4gICAgICAgICAgICAhYWxsRXF1YWwoXG4gICAgICBcdFx0XHRcdChxLnggLSBwLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEueCAtIHAyLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnggLSBwLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnggLSBwMi54IDwgMCkpIHx8XG4gICAgICBcdFx0XHQhYWxsRXF1YWwoXG4gICAgICBcdFx0XHRcdChxLnkgLSBwLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEueSAtIHAyLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnkgLSBwLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnkgLSBwMi55IDwgMCkpLFxuICAgICAgICBraXNzOiBmYWxzZVxuICAgICAgfTtcblxuXHR9XG5cblx0aWYgKGRlbm9taW5hdG9yID09IDApIHtcblx0XHQvLyBsaW5lcyBhcmUgcGFyYWxlbGxcblx0XHRyZXR1cm4ge2ludGVyc2VjdDogZmFsc2UsIGtpc3M6IGZhbHNlfTtcblx0fVxuXG5cdHZhciB1ID0gdU51bWVyYXRvciAvIGRlbm9taW5hdG9yO1xuXHR2YXIgdCA9IGNyb3NzUHJvZHVjdChzdWJ0cmFjdFBvaW50cyhxLCBwKSwgcykgLyBkZW5vbWluYXRvcjtcblxuICAvLyBjb25zb2xlLmxvZyhgdD0ke3R9LCB1PSR7dX1gKTtcbiAgdmFyIGtpc3MgPSBmYWxzZTtcblxuICBpZiAoZXF1YWxQb2ludHMocCwgcSkgfHwgZXF1YWxQb2ludHMocCwgcTIpIHx8IGVxdWFsUG9pbnRzKHAyLCBxKSB8fCBlcXVhbFBvaW50cyhwMiwgcTIpKVxuICAgIGtpc3MgPSB0cnVlO1xuXG4gIC8vIGxldCByZXMgPVxuICAvL3JldHVyblxuICByZXR1cm4ge1xuICAgIGludGVyc2VjdDogKHQgPj0gMCkgJiYgKHQgPD0gMSkgJiYgKHUgPj0gMCkgJiYgKHUgPD0gMSksXG4gICAga2lzczoga2lzc1xuICB9O1xuXG4gIC8vIGNvbnNvbGUubG9nKGAke2RlYnVnX3N0cmluZ30gPSAke3Jlc31gKTtcblxuXHQvLyByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZSB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0aGUgdHdvIHBvaW50cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICpcbiAqIEByZXR1cm4gdGhlIGNyb3NzIHByb2R1Y3QgcmVzdWx0IGFzIGEgZmxvYXRcbiAqL1xuZnVuY3Rpb24gY3Jvc3NQcm9kdWN0KHBvaW50MSwgcG9pbnQyKSB7XG5cdHJldHVybiBwb2ludDEueCAqIHBvaW50Mi55IC0gcG9pbnQxLnkgKiBwb2ludDIueDtcbn1cblxuLyoqXG4gKiBTdWJ0cmFjdCB0aGUgc2Vjb25kIHBvaW50IGZyb20gdGhlIGZpcnN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiB0aGUgc3VidHJhY3Rpb24gcmVzdWx0IGFzIGEgcG9pbnQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIHN1YnRyYWN0UG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XG5cdHZhciByZXN1bHQgPSB7fTtcblx0cmVzdWx0LnggPSBwb2ludDEueCAtIHBvaW50Mi54O1xuXHRyZXN1bHQueSA9IHBvaW50MS55IC0gcG9pbnQyLnk7XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBTZWUgaWYgdGhlIHBvaW50cyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIGlmIHRoZSBwb2ludHMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGVxdWFsUG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XG5cdHJldHVybiAocG9pbnQxLnggPT0gcG9pbnQyLngpICYmIChwb2ludDEueSA9PSBwb2ludDIueSlcbn1cblxuLyoqXG4gKiBTZWUgaWYgYWxsIGFyZ3VtZW50cyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHsuLi59IGFyZ3MgYXJndW1lbnRzIHRoYXQgd2lsbCBiZSBjb21wYXJlZCBieSAnPT0nLlxuICpcbiAqIEByZXR1cm4gaWYgYWxsIGFyZ3VtZW50cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gYWxsRXF1YWwoYXJncykge1xuXHR2YXIgZmlyc3RWYWx1ZSA9IGFyZ3VtZW50c1swXSxcblx0XHRpO1xuXHRmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKGFyZ3VtZW50c1tpXSAhPSBmaXJzdFZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0cnVlO1xufVxuXG5cblxuZXhwb3J0IHtTcXVhcmUsIGludGVyc2VjdHN9IDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9VdGlsLmpzIiwiXG5pbXBvcnQge1NxdWFyZX0gICAgIGZyb20gJy4vVXRpbCc7XG5pbXBvcnQgU2NlbmUgICAgICAgIGZyb20gJy4vU2NlbmUnO1xuaW1wb3J0IFJlbmRlcmVyICAgICBmcm9tICcuL1JlbmRlcmVyJztcblxubGV0IHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKCdkaXNwbGF5Jyk7XG5sZXQgc2NlbmUgPSBuZXcgU2NlbmUoKTtcblxuLy8gU3RhcnQgcG9pbnQgYW5kIG91ciBnb2FsXG5sZXQgc3RhcnQgPSBbMTAsIDEwXTtcbmxldCBlbmQgPSBbMzgwLCA0MjBdO1xuXG4vLyBBZGQgc29tZSBvYnN0YWNsZXMgdG8gdGhlIHNjZW5lXG5sZXQgc3Ffc21hbGwgPSBTcXVhcmUoMTIwLCAxMDAsIDEwMCk7XG4vLyBsZXQgc3Ffc21hbGwgPSBTcXVhcmUoMzM0KzUwLCAzMTQrNTAsIDEwMCk7XG5sZXQgc3FfbWVkICAgPSBTcXVhcmUoMjAwLCAzMTAsIDE1MCk7XG5sZXQgc3FfbGFyZ2UgPSBTcXVhcmUoNTAwLCAxNTAsIDIwMCk7XG5cbmxldCBvYnN0YWNsZXMgPSBbc3Ffc21hbGwsIHNxX21lZCwgc3FfbGFyZ2VdO1xuXG5mb3IgKGxldCBvIG9mIG9ic3RhY2xlcylcbiAgc2NlbmUuYWRkKCBvICk7XG5cbnJlcXVlc3RBbmltYXRpb25GcmFtZSggZnJhbWUgKTtcblxuZnVuY3Rpb24gZnJhbWUoKVxue1xuXG4gIGNvbnNvbGUubG9nKCgoRGF0ZS5ub3coKSAvIDEwKT4+MCkgJiAxKTtcbiAgLy8gaWYgKChEYXRlLm5vdygpIC8gMTApPj4wICYgMSkgcmV0dXJuO1xuXG4gIC8vIEZpbmQgdGhlIHNob3J0ZXN0IHBhdGguIFR3byB0aGluZ3MgaGFwcGVuIGhlcmU6XG4gIC8vICAgIDEuIEEgU2NlbmUgZ3JhcGggaXMgZXh0cmFjdGVkIGZyb20gb3VyIHNjZW5lIGdlb21ldHJ5XG4gIC8vICAgIDIuIERpamtzdHJhJ3MgbWV0aG9kIGlzIHVzZWQgdG8gZmluZCB0aGUgb3B0aW1hbCByb3V0ZSBhY3Jvc3MgdGhlIGdyYXBoXG4gIGxldCByb3V0ZSA9IHNjZW5lLnNvbHZlKCBzdGFydCwgZW5kICk7XG5cbiAgLy8gR2V0IGEgdmlzdWFsaXNhdGlvbiBvZiB0aGUgYWN0dWFsIHNjZW5lZ3JhcGhcbiAgbGV0IHZpcyA9IHNjZW5lLnZpcygpO1xuXG4gIHJlbmRlcmVyLmNsZWFyKCk7XG5cbiAgLy8gRHJhdyB0aGUgc2NlbmUgZ3JhcGggbm9kZXNcbiAgZm9yIChsZXQgbiBvZiB2aXMubm9kZXMpXG4gICAgcmVuZGVyZXIucmVuZGVyKCBuLCAnI2RkZCcsIDUgKTtcblxuICAvLyBEcmF3IHRoZSBncmFwaCBlZGdlc1xuICByZW5kZXJlci5yZW5kZXIoIHZpcy5lZGdlcywgJyNkZGQnICk7XG5cbiAgLy8gUmVuZGVyIHRoZSBvcmlnaW5hbCBzY2VuZSBnZW9tZXRyeSBvbiB0b3Agb2YgdGhlIGdyYXBoXG4gIHJlbmRlcmVyLnJlbmRlciggc3RhcnQsICcjMGEwJywgNiApO1xuICByZW5kZXJlci5yZW5kZXIoIGVuZCwgJyMwOGYnLCA2ICk7XG4gIHJlbmRlcmVyLnJlbmRlciggc2NlbmUub2JqZWN0cywgJyMzMzMnICk7XG5cbiAgLy8gTm93IGRpc3BsYXkgdGhlIGZvdW5kIHJvdXRlIVxuICByZW5kZXJlci5yZW5kZXIoIFtyb3V0ZV0sICcjZjAwJywgMyApO1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSggZnJhbWUgKTtcblxuICB0cmFuc2xhdGUoc3Ffc21hbGwsIDEsIDEpO1xuXG59XG5cbmZ1bmN0aW9uIHRyYW5zbGF0ZShzaGFwZSwgZHgsIGR5KVxue1xuICBmb3IgKGxldCBwYWlyIG9mIHNoYXBlKVxuICB7XG4gICAgcGFpclswXSArPSBkeDtcbiAgICBwYWlyWzFdICs9IGR5O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuaW1wb3J0IEdyYXBoICAgICAgICAgIGZyb20gJy4vR3JhcGgnO1xuaW1wb3J0IHtpbnRlcnNlY3RzfSAgIGZyb20gJy4vVXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHRoaXMub2JqZWN0cyA9IFtdO1xuICAgIHRoaXMuZ3JhcGggPSBudWxsO1xuXG4gICAgLy8gVGhpcyBpcyBqdXN0IGZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICB0aGlzLl92aXMgPSBudWxsO1xuICB9XG5cbiAgYWRkKG9iamVjdClcbiAge1xuICAgIHRoaXMub2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gIH1cblxuICBzb2x2ZShzdGFydCwgZW5kKVxuICB7XG4gICAgdGhpcy5ncmFwaCA9IHRoaXMuX2dyYXBoKHN0YXJ0LCBlbmQpO1xuICAgIGxldCBub2RlcyA9IHRoaXMuZ3JhcGguc2hvcnRlc3QoMCwgMSk7IC8vIFswXSBzdGFydCwgWzFdIGVuZCAoc2VlIC5ncmFwaCgpKVxuXG4gICAgbGV0IHJvdXRlID0gW107XG4gICAgZm9yIChsZXQgbiBvZiBub2RlcylcbiAgICB7XG4gICAgICByb3V0ZS5wdXNoKHRoaXMuX3Zpcy5ub2Rlc1sgbiBdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm91dGU7XG4gIH1cblxuICB2aXMoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpcztcbiAgfVxuXG4gIC8vIEV4dHJhY3QgYSBzY2VuZWdyYXBoIGZyb20gb3VyIGNvbnRpbnVvdXMgZXVjbGlkZWFuIGdlb21ldHJ5XG4gIF9ncmFwaChzdGFydCwgZW5kKVxuICB7XG4gICAgbGV0IG5vZGVzID0gW107XG4gICAgbGV0IGVkZ2VzID0gW107XG5cbiAgICAvLyBGb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoXG4gICAgdGhpcy5fdmlzID0geyBub2RlczogW10sIGVkZ2VzOiBbXSB9O1xuXG4gICAgLy8gVGhpcyBpcyBqdXN0IGEgdGVtcCB2YWx1ZSB1c2VkIHRvIG1ha2Ugc3VyZSBzaGFwZXMgZG9uJ3QgcGVyZm9ybVxuICAgIC8vIGludGVyc2VjdGlvbiB0ZXN0cyBvbiB0aGVtc2VsdmVzIChhY3Jvc3MgdGhlaXIgb3duIHZlcnRpY2VzKVxuICAgIGxldCBzaGFwZV9pZCA9IDE7XG5cbiAgICAvLyBUaGVzZSBmaXJzdCB0d28gbm9kZXMgaW4gdGhlIGdyYXBoIGFyZSBhIHNwZWNpYWwgY2FzZVxuICAgIG5vZGVzLnB1c2goIHt2ZXJ0ZXg6IHN0YXJ0LCAgc2hhcGU6IHNoYXBlX2lkKyt9ICk7IC8vIFswXSBzdGFydCAoc2VlIC5zb2x2ZSgpKVxuICAgIG5vZGVzLnB1c2goIHt2ZXJ0ZXg6IGVuZCwgICAgc2hhcGU6IHNoYXBlX2lkKyt9ICk7IC8vIFsxXSBlbmRcblxuICAgIC8vIGV4dHJhY3QgZWFjaCBvYnN0YWNsZSdzIGVkZ2VzIGFuZCBub2Rlc1xuICAgIGZvciAobGV0IG8gb2YgdGhpcy5vYmplY3RzKVxuICAgIHtcbiAgICAgIHNoYXBlX2lkKys7XG5cbiAgICAgIGxldCBlO1xuICAgICAgZm9yIChlPTA7IGU8by5sZW5ndGgtMTsgZSsrKVxuICAgICAge1xuICAgICAgICBlZGdlcy5wdXNoKFtvW2VdLCBvW2UrMV1dKTtcblxuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB2ZXJ0ZXg6IG9bZV0sXG4gICAgICAgICAgc2hhcGU6IHNoYXBlX2lkXG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgICAvLyB0aGlzIGlzbid0IGEgY2xvc2VkIHJpbmcgKG1hdGNoaW5nIHN0YXJ0IGFuZCBlbmRwKVxuICAgICAgaWYgKCFlcXVhbHMob1swXSwgb1tlXSkpXG4gICAgICAgIG5vZGVzLnB1c2goe1xuICAgICAgICAgIHZlcnRleDogb1tlXSxcbiAgICAgICAgICBzaGFwZTogc2hhcGVfaWRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGV0IGcgPSBuZXcgR3JhcGgoKTtcblxuICAgIC8vIEFkZCBgbm9kZXNgIGluZGljZXMgdG8gZ3JhcGhcbiAgICBmb3IgKGxldCBpIGluIG5vZGVzKVxuICAgIHtcbiAgICAgIGcuYWRkdmVydGV4KE51bWJlcihpKSk7XG5cbiAgICAgIC8vIEZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICAgIHRoaXMuX3Zpcy5ub2Rlcy5wdXNoKG5vZGVzW051bWJlcihpKV0udmVydGV4KTtcbiAgICB9XG5cbiAgICAvLyBnLmFkZGVkZ2UoKTogcGVyaW1ldGVyIG9mIGFsbCBvYnN0YWNsZXNcblxuICAgIGxldCBuZT0wO1xuXG4gICAgZm9yIChsZXQgeD0wOyB4PG5vZGVzLmxlbmd0aC0xOyB4KyspXG4gICAgICBmb3IgKGxldCB5PXgrMTsgeTxub2Rlcy5sZW5ndGg7IHkrKylcbiAgICAgIHtcbiAgICAgICAgICBsZXQgQSA9IG5vZGVzW3hdO1xuICAgICAgICAgIGxldCBCID0gbm9kZXNbeV07XG5cbiAgICAgICAgICAvLyBXZSdyZSB0ZXN0aW5nIHRoZSBzaGFwZSdzIHZlcnRpY2VzIGFnYWluc3QgaXRzZWxmXG4gICAgICAgICAgLy8gd2hpY2ggbGVhZHMgdG8gaW50ZXJuYWwgcGF0aHMgaW5zaWRlIHRoZSBzaGFwZSAoaW52YWxpZCEpXG4gICAgICAgICAgaWYgKEEuc2hhcGUgPT0gQi5zaGFwZSkgY29udGludWU7XG5cbiAgICAgICAgICBsZXQgdGVzdGVkZ2UgPSBbQS52ZXJ0ZXgsIEIudmVydGV4XTtcblxuICAgICAgICAgIGlmIChlZGdldmlzaWJpbHR5KHRlc3RlZGdlLCBlZGdlcykpXG4gICAgICAgICAge1xuICAgICAgICAgICAgZy5hZGRlZGdlKHgsIHksIGNvc3QoQS52ZXJ0ZXgsIEIudmVydGV4KSk7XG5cbiAgICAgICAgICAgIC8vIEp1c3QgZm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaCwgbm9uLWVzc2VudGlhbDpcbiAgICAgICAgICAgIHRoaXMuX3Zpcy5lZGdlcy5wdXNoKFtBLnZlcnRleCwgQi52ZXJ0ZXhdKTtcbiAgICAgICAgICB9XG5cbiAgICAgIH1cblxuXG4gICAgcmV0dXJuIGc7XG4gIH1cblxufVxuXG5cblxuZnVuY3Rpb24gY29zdChhLCBiKVxue1xuICBsZXQgZHggPSBiWzBdIC0gYVswXSAvLyB4MiAtIHgxXG4gIGxldCBkeSA9IGJbMV0gLSBhWzFdO1xuICByZXR1cm4gTWF0aC5zcXJ0KCBkeCpkeCArIGR5KmR5ICk7XG5cbn1cblxuZnVuY3Rpb24gZWRnZXZpc2liaWx0eSh0ZXN0ZWRnZSwgZWRnZXMpXG57XG4gIC8vIGNvbnNvbGUubG9nKGBUZXN0aW5nIGVkZ2U6ICR7dGVzdGVkZ2VbMF19LCAke3Rlc3RlZGdlWzFdfWApO1xuXG4gIGZvciAobGV0IHQ9MDsgdDxlZGdlcy5sZW5ndGg7IHQrKylcbiAge1xuICAgIGxldCBlID0gZWRnZXNbdF07XG5cbiAgICBsZXQgcmVzID0gaW50ZXJzZWN0cyh0ZXN0ZWRnZVswXSwgdGVzdGVkZ2VbMV0sIGVbMF0sIGVbMV0pO1xuXG4gICAgLy8gSWYgaW50ZXJzZWN0aW9uLCBjaGVjayBpdCdzIG5vdCBqdXN0IHRoZSBlbmRwb2ludHMga2lzc2luZyB3aGljaCBpcyBva1xuICAgIC8vIGluIGZhY3QsIGl0J3MgbW9yZSB0aGFuICdvaycgLSBpdCdzIGV4YWN0bHkgd2hhdCB3ZSdyZSBsb29raW5nIGZvclxuICAgIGlmIChyZXMuaW50ZXJzZWN0ICYmICFyZXMua2lzcylcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cblxuZnVuY3Rpb24gZXF1YWxzKGEsIGIpXG57XG4gIHJldHVybiAoYVswXSA9PSBiWzBdICYmIGFbMV0gPT0gYlsxXSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU2NlbmUuanMiLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHRoaXMudmVydGljZXMgPSBbXTtcbiAgICB0aGlzLmVkZ2VzID0gW107XG4gICAgdGhpcy5udW1lZGdlcyA9IDA7XG4gIH1cblxuICBhZGR2ZXJ0ZXgobilcbiAge1xuICAgIHRoaXMudmVydGljZXMucHVzaChuKTtcbiAgICB0aGlzLmVkZ2VzW25dID0gW107XG4gIH1cblxuICBhZGRlZGdlKHYxLCB2MiwgY29zdClcbiAge1xuICAgIHRoaXMuZWRnZXNbdjFdLnB1c2goe2Rlc3Q6djIsIGNvc3R9KTtcbiAgICB0aGlzLmVkZ2VzW3YyXS5wdXNoKHtkZXN0OnYxLCBjb3N0fSk7XG5cbiAgICB0aGlzLm51bWVkZ2VzKys7XG4gIH1cblxuICAvLyBTdXBlciBiYXNpYyBpbXBsZW1lbnRhdGlvbiBvZiBEaWprc3RyYSdzIGFsZ29yaXRobVxuICAvLyBEaXJlY3RseSBmcm9tIHRoaXMgcmVjaXBlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EaWprc3RyYSUyN3NfYWxnb3JpdGhtI0FsZ29yaXRobVxuICBzaG9ydGVzdChzdGFydCwgZW5kKVxuICB7XG4gICAgbGV0IGN1cnJlbnRfbm9kZTtcbiAgICBsZXQgZGlzdCA9IFswXTtcbiAgICBsZXQgcHJldiA9IFtdO1xuICAgIGxldCB1bnZpc2l0ZWQgPSBbXTtcblxuICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnZlcnRpY2VzLmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgIGlmIChpKSBkaXN0W2ldID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgIHVudmlzaXRlZFtpXSA9IGk7XG4gICAgICBwcmV2W2ldID0gbnVsbDtcbiAgICB9XG5cbiAgICB3aGlsZSggKGN1cnJlbnRfbm9kZSA9IHVudmlzaXRlZC5zaGlmdCgpKSAhPSBudWxsIClcbiAgICB7XG4gICAgICBmb3IgKGxldCB0PTA7IHQ8dGhpcy5lZGdlc1tjdXJyZW50X25vZGVdLmxlbmd0aDsgdCsrKVxuICAgICAge1xuICAgICAgICAvLyB2ZXJ0ZXgvbm9kZSBJRFxuICAgICAgICBsZXQgbmVpZ2hib3VyID0gdGhpcy5lZGdlc1tjdXJyZW50X25vZGVdW3RdLmRlc3Q7XG5cbiAgICAgICAgLy8gRGlzdGFuY2UgZnJvbSBjdXJyZW50X25vZGUgdG8gbmVpZ2hib3VyXG4gICAgICAgIGxldCBjb3N0ID0gdGhpcy5lZGdlc1tjdXJyZW50X25vZGVdW3RdLmNvc3Q7XG5cbiAgICAgICAgLy8gRGlzdGFuY2UgdGh1cyBmYXIgb24gdGhpcyByb3V0ZSAodXAgdG8gY3VycmVudF9ub2RlKSArIGRpc3RhbmNlIHRvIG5laWdoYm91clxuICAgICAgICBsZXQgdGVudGF0aXZlX2Rpc3QgPSBkaXN0W2N1cnJlbnRfbm9kZV0gKyBjb3N0O1xuXG4gICAgICAgIC8vIEhhdmUgd2UgZm91bmQgYSBzaG9ydGVyIHBhdGg/XG4gICAgICAgIGlmICh0ZW50YXRpdmVfZGlzdCA8IGRpc3RbbmVpZ2hib3VyXSlcbiAgICAgICAge1xuICAgICAgICAgIGRpc3RbbmVpZ2hib3VyXSA9IHRlbnRhdGl2ZV9kaXN0OyAvLyBOZXcgZGlzdGFuY2UgdG8gdGhpcyBub2RlXG4gICAgICAgICAgcHJldltuZWlnaGJvdXJdID0gY3VycmVudF9ub2RlOyAgIC8vIFVwZGF0ZSB0aGUgcm91dGVcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGMgPSBlbmQsIHNlcSA9W2VuZF07XG5cbiAgICAvLyBmYWlsZWQgZm9yIHNvbWUgcmVhc29uLCBlLmcuIGltcG9zc2libGUgcG9pbnQgaW5zaWRlIG51bGxzcGFjZSBldGNcbiAgICBpZiAocHJldltjXSA9PSBudWxsKVxuICAgICAgcmV0dXJuIFtdO1xuXG4gICAgZG8ge1xuICAgICAgYyA9IHByZXZbY107XG4gICAgICBzZXEucHVzaChjKTtcbiAgICB9IHdoaWxlKGMgIT0gc3RhcnQpO1xuXG4gICAgcmV0dXJuIHNlcS5yZXZlcnNlKCk7XG5cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvR3JhcGguanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXJcbntcbiAgY29uc3RydWN0b3IoZWxlbWVudClcbiAge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICB9XG5cbiAgY2xlYXIoKVxuICB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgcmVuZGVyKG9iamVjdHMsIGNvbG91ciA9ICcjMDAwJywgd2lkdGggPSAyKVxuICB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdHMpKSByZXR1cm47XG5cbiAgICAvLyBwb2ludCB0eXBlXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdHNbMF0pKVxuICAgIHtcbiAgICAgIGNvbnN0IHAgPSBvYmplY3RzO1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LmFyYyhwWzBdPj4wLCBwWzFdPj4wLCB3aWR0aCwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvdXI7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgLy8gbGlzdCBvZiBzaGFwZXMgdHlwZVxuXG4gICAgICBmb3IgKGxldCBvIG9mIG9iamVjdHMpXG4gICAgICB7XG4gICAgICAgIGZvciAobGV0IGU9MDsgZTxvLmxlbmd0aC0xOyBlKyspXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLl9saW5lKG9bZV0sIG9bZSsxXSwgY29sb3VyLCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgX2xpbmUoYSwgYiwgYywgdylcbiAge1xuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB3O1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGMgfHwgJ2JsYWNrJztcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhhWzBdPj4wLGFbMV0+PjApO1xuICAgIHRoaXMuY29udGV4dC5saW5lVG8oYlswXT4+MCxiWzFdPj4wKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlcmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==