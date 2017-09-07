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

  translate(sq_small, 0.1, 0.1);
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

      var done = false;
      var c = end,
          seq = [end];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2Y3OWMxMmU2MzJjZmY1OWQyZTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJpbnRlcnNlY3RzIiwiYXAiLCJhcDIiLCJhcSIsImFxMiIsImRvTGluZVNlZ21lbnRzSW50ZXJzZWN0IiwiaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsiLCJwIiwicDIiLCJxIiwicTIiLCJib3gxIiwieG1pbiIsIk1hdGgiLCJtaW4iLCJ5bWluIiwieG1heCIsIm1heCIsInltYXgiLCJib3gyIiwiYmJveF9jb250YWluZWQiLCJhIiwiYiIsInIiLCJzdWJ0cmFjdFBvaW50cyIsInMiLCJ1TnVtZXJhdG9yIiwiY3Jvc3NQcm9kdWN0IiwiZGVub21pbmF0b3IiLCJlcXVhbFBvaW50cyIsImludGVyc2VjdCIsImtpc3MiLCJhbGxFcXVhbCIsInUiLCJ0IiwicG9pbnQxIiwicG9pbnQyIiwicmVzdWx0IiwiYXJncyIsImZpcnN0VmFsdWUiLCJhcmd1bWVudHMiLCJpIiwibGVuZ3RoIiwicmVuZGVyZXIiLCJzY2VuZSIsInN0YXJ0IiwiZW5kIiwic3Ffc21hbGwiLCJzcV9tZWQiLCJzcV9sYXJnZSIsIm9ic3RhY2xlcyIsIm8iLCJhZGQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJmcmFtZSIsInJvdXRlIiwic29sdmUiLCJ2aXMiLCJjbGVhciIsIm5vZGVzIiwibiIsInJlbmRlciIsImVkZ2VzIiwib2JqZWN0cyIsInRyYW5zbGF0ZSIsInNoYXBlIiwiZHgiLCJkeSIsInBhaXIiLCJTY2VuZSIsImdyYXBoIiwiX3ZpcyIsIm9iamVjdCIsIl9ncmFwaCIsInNob3J0ZXN0Iiwic2hhcGVfaWQiLCJ2ZXJ0ZXgiLCJlIiwiZXF1YWxzIiwiZyIsImFkZHZlcnRleCIsIk51bWJlciIsIm5lIiwiQSIsIkIiLCJ0ZXN0ZWRnZSIsImVkZ2V2aXNpYmlsdHkiLCJhZGRlZGdlIiwiY29zdCIsInNxcnQiLCJyZXMiLCJHcmFwaCIsInZlcnRpY2VzIiwibnVtZWRnZXMiLCJ2MSIsInYyIiwiZGVzdCIsImN1cnJlbnRfbm9kZSIsImRpc3QiLCJwcmV2IiwidW52aXNpdGVkIiwiTUFYX1ZBTFVFIiwic2hpZnQiLCJuZWlnaGJvdXIiLCJ0ZW50YXRpdmVfZGlzdCIsImRvbmUiLCJjIiwic2VxIiwicmV2ZXJzZSIsIlJlbmRlcmVyIiwiZWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiY29sb3VyIiwiQXJyYXkiLCJpc0FycmF5IiwiYmVnaW5QYXRoIiwiYXJjIiwiUEkiLCJmaWxsU3R5bGUiLCJmaWxsIiwiX2xpbmUiLCJ3IiwibGluZVdpZHRoIiwic3Ryb2tlU3R5bGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7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QWFpQixNQUFiLENBQW9CN0csRUFBRSxDQUFGLEtBQU0sQ0FBMUIsRUFBNEJBLEVBQUUsQ0FBRixLQUFNLENBQWxDO0FBQ0EsV0FBSzRGLE9BQUwsQ0FBYWtCLE1BQWIsQ0FBb0I3RyxFQUFFLENBQUYsS0FBTSxDQUExQixFQUE0QkEsRUFBRSxDQUFGLEtBQU0sQ0FBbEM7QUFDQSxXQUFLMkYsT0FBTCxDQUFhbUIsTUFBYjtBQUNEOzs7Ozs7a0JBaERrQnZCLFEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgN2Y3OWMxMmU2MzJjZmY1OWQyZTEiLCJcblxuZnVuY3Rpb24gU3F1YXJlKHgsIHksIHNpemUpXG57XG4gIGxldCBoc2l6ZSA9IHNpemU+PjE7XG4gIGxldCBzcSA9IFtdO1xuICAvLyBvciBqdXN0IG1ha2UgYSB1bml0IHNxdWFyZSBhbmQgc2NhbGUgaXQgdXAgZHVoIDp8XG4gIC8vIHRvcCBsZWZ0XG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgLSBoc2l6ZV0gKTtcbiAgLy8gdG9wIHJpZ2h0XG4gIHNxLnB1c2goIFt4ICsgaHNpemUsIHkgLSBoc2l6ZV0gKTtcbiAgLy8gYm90dG9tIHJpZ2h0XG4gIHNxLnB1c2goIFt4ICsgaHNpemUsIHkgKyBoc2l6ZV0gKTtcbiAgLy8gYm90dG9tIGxlZnRcbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSArIGhzaXplXSApO1xuICAvLyB0b3AgbGVmdCBhZ2FpblxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5IC0gaHNpemVdICk7XG5cbiAgcmV0dXJuIHNxO1xufVxuXG5cbi8qKlxuICogQGF1dGhvciBQZXRlciBLZWxsZXlcbiAqIEBhdXRob3IgcGdrZWxsZXk0QGdtYWlsLmNvbVxuICovXG4vKipcbiAqIFNlZSBpZiB0d28gbGluZSBzZWdtZW50cyBpbnRlcnNlY3QuIFRoaXMgdXNlcyB0aGVcbiAqIHZlY3RvciBjcm9zcyBwcm9kdWN0IGFwcHJvYWNoIGRlc2NyaWJlZCBiZWxvdzpcbiAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzU2NTI4Mi83ODYzMzlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcCBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBzdGFydCBvZiB0aGUgMXN0IGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgZW5kIG9mIHRoZSAxc3QgbGluZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIHN0YXJ0IG9mIHRoZSAybmQgbGluZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBxMiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBlbmQgb2YgdGhlIDJuZCBsaW5lLlxuICovXG5cbmZ1bmN0aW9uIGludGVyc2VjdHMoYXAsIGFwMiwgYXEsIGFxMilcbntcbiAgLy8gQU06IE5vdGUgdG8gZGV2ZWxvcGVycywgdXNpbmcgbmFtZWQgcHJvcGVydGllcyBmb3IgdmVjdG9ycyBpcyByZXRhcmRlZC4gdGhhbmtzLlxuICByZXR1cm4gZG9MaW5lU2VnbWVudHNJbnRlcnNlY3QoIHt4OiBhcFswXSwgeTogYXBbMV19LCB7eDogYXAyWzBdLCB5OiBhcDJbMV19LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt4OiBhcVswXSwgeTogYXFbMV19LCB7eDogYXEyWzBdLCB5OiBhcTJbMV19ICk7XG59XG5cbmZ1bmN0aW9uIGlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrKHAsIHAyLCBxLCBxMilcbntcbiAgdmFyIGJveDEgPSB7XG4gICAgeG1pbjogTWF0aC5taW4ocC54LCBwMi54KSxcbiAgICB5bWluOiBNYXRoLm1pbihwLnksIHAyLnkpLFxuICAgIHhtYXg6IE1hdGgubWF4KHAueCwgcDIueCksXG4gICAgeW1heDogTWF0aC5tYXgocC55LCBwMi55KVxuICB9O1xuXG4gIHZhciBib3gyID0ge1xuICAgIHhtaW46IE1hdGgubWluKHEueCwgcTIueCksXG4gICAgeW1pbjogTWF0aC5taW4ocS55LCBxMi55KSxcbiAgICB4bWF4OiBNYXRoLm1heChxLngsIHEyLngpLFxuICAgIHltYXg6IE1hdGgubWF4KHEueSwgcTIueSlcbiAgfTtcblxuICByZXR1cm4gYmJveF9jb250YWluZWQoYm94MSwgYm94MikgfHwgYmJveF9jb250YWluZWQoYm94MiwgYm94MSk7XG59XG5cbmZ1bmN0aW9uIGJib3hfY29udGFpbmVkKGEsIGIpXG57XG4gIC8vIElzIEJveCBCIGNvbXBsZXRlbHkgaW5zaWRlIGJveCBBID9cbiAgcmV0dXJuIChiLnhtaW4gPj0gYS54bWluICYmIGIueG1heCA8PSBhLnhtYXgpICYmIChiLnltaW4gPj0gYS55bWluICYmIGIueW1heCA8PSBhLnltYXgpO1xufVxuXG5cbmZ1bmN0aW9uIGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0KHAsIHAyLCBxLCBxMilcbntcbiAgLy8gdmFyIGRlYnVnX3N0cmluZyA9IGBkb0xpbmVTZWdtZW50c0ludGVyc2VjdDogKCR7cC54fSwgJHtwLnl9KS0oJHtwMi54fSwgJHtwMi55fSkgIHdpdGggICgke3EueH0sICR7cS55fSktKCR7cTIueH0sICR7cTIueX0pYDtcblxuXHR2YXIgciA9IHN1YnRyYWN0UG9pbnRzKHAyLCBwKTtcblx0dmFyIHMgPSBzdWJ0cmFjdFBvaW50cyhxMiwgcSk7XG5cblx0dmFyIHVOdW1lcmF0b3IgPSBjcm9zc1Byb2R1Y3Qoc3VidHJhY3RQb2ludHMocSwgcCksIHIpO1xuXHR2YXIgZGVub21pbmF0b3IgPSBjcm9zc1Byb2R1Y3Qociwgcyk7XG5cblx0aWYgKHVOdW1lcmF0b3IgPT0gMCAmJiBkZW5vbWluYXRvciA9PSAwKSB7XG5cdFx0Ly8gVGhleSBhcmUgY29MbGluZWFyXG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvcGxhbmFyXCIpO1xuXG5cdFx0Ly8gRG8gdGhleSB0b3VjaD8gKEFyZSBhbnkgb2YgdGhlIHBvaW50cyBlcXVhbD8pXG5cdFx0aWYgKGVxdWFsUG9pbnRzKHAsIHEpIHx8IGVxdWFsUG9pbnRzKHAsIHEyKSB8fCBlcXVhbFBvaW50cyhwMiwgcSkgfHwgZXF1YWxQb2ludHMocDIsIHEyKSkge1xuXHRcdFx0cmV0dXJuIHtcbiAgICAgICAgaW50ZXJzZWN0OiB0cnVlLFxuICAgICAgICBraXNzOiAhaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsocCwgcDIsIHEsIHEyKVxuICAgICAgfTtcblxuXHRcdH1cblx0XHQvLyBEbyB0aGV5IG92ZXJsYXA/IChBcmUgYWxsIHRoZSBwb2ludCBkaWZmZXJlbmNlcyBpbiBlaXRoZXIgZGlyZWN0aW9uIHRoZSBzYW1lIHNpZ24pXG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIlBvaW50cyBET05UIHRvdWNoXCIpO1xuXG5cdFx0cmV0dXJuIHtcbiAgICAgIGludGVyc2VjdDpcbiAgICAgICAgICAgICFhbGxFcXVhbChcbiAgICAgIFx0XHRcdFx0KHEueCAtIHAueCA8IDApLFxuICAgICAgXHRcdFx0XHQocS54IC0gcDIueCA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueCAtIHAueCA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueCAtIHAyLnggPCAwKSkgfHxcbiAgICAgIFx0XHRcdCFhbGxFcXVhbChcbiAgICAgIFx0XHRcdFx0KHEueSAtIHAueSA8IDApLFxuICAgICAgXHRcdFx0XHQocS55IC0gcDIueSA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueSAtIHAueSA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueSAtIHAyLnkgPCAwKSksXG4gICAgICAgIGtpc3M6IGZhbHNlXG4gICAgICB9O1xuXG5cdH1cblxuXHRpZiAoZGVub21pbmF0b3IgPT0gMCkge1xuXHRcdC8vIGxpbmVzIGFyZSBwYXJhbGVsbFxuXHRcdHJldHVybiB7aW50ZXJzZWN0OiBmYWxzZSwga2lzczogZmFsc2V9O1xuXHR9XG5cblx0dmFyIHUgPSB1TnVtZXJhdG9yIC8gZGVub21pbmF0b3I7XG5cdHZhciB0ID0gY3Jvc3NQcm9kdWN0KHN1YnRyYWN0UG9pbnRzKHEsIHApLCBzKSAvIGRlbm9taW5hdG9yO1xuXG4gIC8vIGNvbnNvbGUubG9nKGB0PSR7dH0sIHU9JHt1fWApO1xuICB2YXIga2lzcyA9IGZhbHNlO1xuXG4gIGlmIChlcXVhbFBvaW50cyhwLCBxKSB8fCBlcXVhbFBvaW50cyhwLCBxMikgfHwgZXF1YWxQb2ludHMocDIsIHEpIHx8IGVxdWFsUG9pbnRzKHAyLCBxMikpXG4gICAga2lzcyA9IHRydWU7XG5cbiAgLy8gbGV0IHJlcyA9XG4gIC8vcmV0dXJuXG4gIHJldHVybiB7XG4gICAgaW50ZXJzZWN0OiAodCA+PSAwKSAmJiAodCA8PSAxKSAmJiAodSA+PSAwKSAmJiAodSA8PSAxKSxcbiAgICBraXNzOiBraXNzXG4gIH07XG5cbiAgLy8gY29uc29sZS5sb2coYCR7ZGVidWdfc3RyaW5nfSA9ICR7cmVzfWApO1xuXG5cdC8vIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHRoZSB0d28gcG9pbnRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiB0aGUgY3Jvc3MgcHJvZHVjdCByZXN1bHQgYXMgYSBmbG9hdFxuICovXG5mdW5jdGlvbiBjcm9zc1Byb2R1Y3QocG9pbnQxLCBwb2ludDIpIHtcblx0cmV0dXJuIHBvaW50MS54ICogcG9pbnQyLnkgLSBwb2ludDEueSAqIHBvaW50Mi54O1xufVxuXG4vKipcbiAqIFN1YnRyYWN0IHRoZSBzZWNvbmQgcG9pbnQgZnJvbSB0aGUgZmlyc3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIHRoZSBzdWJ0cmFjdGlvbiByZXN1bHQgYXMgYSBwb2ludCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gc3VidHJhY3RQb2ludHMocG9pbnQxLCBwb2ludDIpIHtcblx0dmFyIHJlc3VsdCA9IHt9O1xuXHRyZXN1bHQueCA9IHBvaW50MS54IC0gcG9pbnQyLng7XG5cdHJlc3VsdC55ID0gcG9pbnQxLnkgLSBwb2ludDIueTtcblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFNlZSBpZiB0aGUgcG9pbnRzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICpcbiAqIEByZXR1cm4gaWYgdGhlIHBvaW50cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gZXF1YWxQb2ludHMocG9pbnQxLCBwb2ludDIpIHtcblx0cmV0dXJuIChwb2ludDEueCA9PSBwb2ludDIueCkgJiYgKHBvaW50MS55ID09IHBvaW50Mi55KVxufVxuXG4vKipcbiAqIFNlZSBpZiBhbGwgYXJndW1lbnRzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0gey4uLn0gYXJncyBhcmd1bWVudHMgdGhhdCB3aWxsIGJlIGNvbXBhcmVkIGJ5ICc9PScuXG4gKlxuICogQHJldHVybiBpZiBhbGwgYXJndW1lbnRzIGFyZSBlcXVhbFxuICovXG5mdW5jdGlvbiBhbGxFcXVhbChhcmdzKSB7XG5cdHZhciBmaXJzdFZhbHVlID0gYXJndW1lbnRzWzBdLFxuXHRcdGk7XG5cdGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRpZiAoYXJndW1lbnRzW2ldICE9IGZpcnN0VmFsdWUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5cblxuXG5leHBvcnQge1NxdWFyZSwgaW50ZXJzZWN0c30gO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1V0aWwuanMiLCJcbmltcG9ydCB7U3F1YXJlfSAgICAgZnJvbSAnLi9VdGlsJztcbmltcG9ydCBTY2VuZSAgICAgICAgZnJvbSAnLi9TY2VuZSc7XG5pbXBvcnQgUmVuZGVyZXIgICAgIGZyb20gJy4vUmVuZGVyZXInO1xuXG5sZXQgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoJ2Rpc3BsYXknKTtcbmxldCBzY2VuZSA9IG5ldyBTY2VuZSgpO1xuXG4vLyBTdGFydCBwb2ludCBhbmQgb3VyIGdvYWxcbmxldCBzdGFydCA9IFsxMCwgMTBdO1xubGV0IGVuZCA9IFszODAsIDQyMF07XG5cbi8vIEFkZCBzb21lIG9ic3RhY2xlcyB0byB0aGUgc2NlbmVcbmxldCBzcV9zbWFsbCA9IFNxdWFyZSgxMjAsIDEwMCwgMTAwKTtcbmxldCBzcV9tZWQgICA9IFNxdWFyZSgyMDAsIDMxMCwgMTUwKTtcbmxldCBzcV9sYXJnZSA9IFNxdWFyZSg1MDAsIDE1MCwgMjAwKTtcblxubGV0IG9ic3RhY2xlcyA9IFtzcV9zbWFsbCwgc3FfbWVkLCBzcV9sYXJnZV07XG5cbmZvciAobGV0IG8gb2Ygb2JzdGFjbGVzKVxuICBzY2VuZS5hZGQoIG8gKTtcblxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBmcmFtZSApO1xuXG5mdW5jdGlvbiBmcmFtZSgpXG57XG4gIC8vIEZpbmQgdGhlIHNob3J0ZXN0IHBhdGguIFR3byB0aGluZ3MgaGFwcGVuIGhlcmU6XG4gIC8vICAgIDEuIEEgU2NlbmUgZ3JhcGggaXMgZXh0cmFjdGVkIGZyb20gb3VyIHNjZW5lIGdlb21ldHJ5XG4gIC8vICAgIDIuIERpamtzdHJhJ3MgbWV0aG9kIGlzIHVzZWQgdG8gZmluZCB0aGUgb3B0aW1hbCByb3V0ZSBhY3Jvc3MgdGhlIGdyYXBoXG4gIGxldCByb3V0ZSA9IHNjZW5lLnNvbHZlKCBzdGFydCwgZW5kICk7XG5cbiAgLy8gR2V0IGEgdmlzdWFsaXNhdGlvbiBvZiB0aGUgYWN0dWFsIHNjZW5lZ3JhcGhcbiAgbGV0IHZpcyA9IHNjZW5lLnZpcygpO1xuXG4gIHJlbmRlcmVyLmNsZWFyKCk7XG5cbiAgLy8gRHJhdyB0aGUgc2NlbmUgZ3JhcGggbm9kZXNcbiAgZm9yIChsZXQgbiBvZiB2aXMubm9kZXMpXG4gICAgcmVuZGVyZXIucmVuZGVyKCBuLCAnI2RkZCcsIDUgKTtcblxuICAvLyBEcmF3IHRoZSBncmFwaCBlZGdlc1xuICByZW5kZXJlci5yZW5kZXIoIHZpcy5lZGdlcywgJyNkZGQnICk7XG5cbiAgLy8gUmVuZGVyIHRoZSBvcmlnaW5hbCBzY2VuZSBnZW9tZXRyeSBvbiB0b3Agb2YgdGhlIGdyYXBoXG4gIHJlbmRlcmVyLnJlbmRlciggc3RhcnQsICcjMGEwJywgNiApO1xuICByZW5kZXJlci5yZW5kZXIoIGVuZCwgJyMwOGYnLCA2ICk7XG4gIHJlbmRlcmVyLnJlbmRlciggc2NlbmUub2JqZWN0cywgJyMzMzMnICk7XG5cbiAgLy8gTm93IGRpc3BsYXkgdGhlIGZvdW5kIHJvdXRlIVxuICByZW5kZXJlci5yZW5kZXIoIFtyb3V0ZV0sICcjZjAwJywgMyApO1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSggZnJhbWUgKTtcblxuICB0cmFuc2xhdGUoc3Ffc21hbGwsIDAuMSwgMC4xKTtcblxufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGUoc2hhcGUsIGR4LCBkeSlcbntcbiAgZm9yIChsZXQgcGFpciBvZiBzaGFwZSlcbiAge1xuICAgIHBhaXJbMF0gKz0gZHg7XG4gICAgcGFpclsxXSArPSBkeTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiLCJcbmltcG9ydCBHcmFwaCAgICAgICAgICBmcm9tICcuL0dyYXBoJztcbmltcG9ydCB7aW50ZXJzZWN0c30gICBmcm9tICcuL1V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZVxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICB0aGlzLm9iamVjdHMgPSBbXTtcbiAgICB0aGlzLmdyYXBoID0gbnVsbDtcblxuICAgIC8vIFRoaXMgaXMganVzdCBmb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoXG4gICAgdGhpcy5fdmlzID0gbnVsbDtcbiAgfVxuXG4gIGFkZChvYmplY3QpXG4gIHtcbiAgICB0aGlzLm9iamVjdHMucHVzaChvYmplY3QpO1xuICB9XG5cbiAgc29sdmUoc3RhcnQsIGVuZClcbiAge1xuICAgIHRoaXMuZ3JhcGggPSB0aGlzLl9ncmFwaChzdGFydCwgZW5kKTtcbiAgICBsZXQgbm9kZXMgPSB0aGlzLmdyYXBoLnNob3J0ZXN0KDAsIDEpOyAvLyBbMF0gc3RhcnQsIFsxXSBlbmQgKHNlZSAuZ3JhcGgoKSlcblxuICAgIGxldCByb3V0ZSA9IFtdO1xuICAgIGZvciAobGV0IG4gb2Ygbm9kZXMpXG4gICAge1xuICAgICAgcm91dGUucHVzaCh0aGlzLl92aXMubm9kZXNbIG4gXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvdXRlO1xuICB9XG5cbiAgdmlzKClcbiAge1xuICAgIHJldHVybiB0aGlzLl92aXM7XG4gIH1cblxuICAvLyBFeHRyYWN0IGEgc2NlbmVncmFwaCBmcm9tIG91ciBjb250aW51b3VzIGV1Y2xpZGVhbiBnZW9tZXRyeVxuICBfZ3JhcGgoc3RhcnQsIGVuZClcbiAge1xuICAgIGxldCBub2RlcyA9IFtdO1xuICAgIGxldCBlZGdlcyA9IFtdO1xuXG4gICAgLy8gRm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaFxuICAgIHRoaXMuX3ZpcyA9IHsgbm9kZXM6IFtdLCBlZGdlczogW10gfTtcblxuICAgIC8vIFRoaXMgaXMganVzdCBhIHRlbXAgdmFsdWUgdXNlZCB0byBtYWtlIHN1cmUgc2hhcGVzIGRvbid0IHBlcmZvcm1cbiAgICAvLyBpbnRlcnNlY3Rpb24gdGVzdHMgb24gdGhlbXNlbHZlcyAoYWNyb3NzIHRoZWlyIG93biB2ZXJ0aWNlcylcbiAgICBsZXQgc2hhcGVfaWQgPSAxO1xuXG4gICAgLy8gVGhlc2UgZmlyc3QgdHdvIG5vZGVzIGluIHRoZSBncmFwaCBhcmUgYSBzcGVjaWFsIGNhc2VcbiAgICBub2Rlcy5wdXNoKCB7dmVydGV4OiBzdGFydCwgIHNoYXBlOiBzaGFwZV9pZCsrfSApOyAvLyBbMF0gc3RhcnQgKHNlZSAuc29sdmUoKSlcbiAgICBub2Rlcy5wdXNoKCB7dmVydGV4OiBlbmQsICAgIHNoYXBlOiBzaGFwZV9pZCsrfSApOyAvLyBbMV0gZW5kXG5cbiAgICAvLyBleHRyYWN0IGVhY2ggb2JzdGFjbGUncyBlZGdlcyBhbmQgbm9kZXNcbiAgICBmb3IgKGxldCBvIG9mIHRoaXMub2JqZWN0cylcbiAgICB7XG4gICAgICBzaGFwZV9pZCsrO1xuXG4gICAgICBsZXQgZTtcbiAgICAgIGZvciAoZT0wOyBlPG8ubGVuZ3RoLTE7IGUrKylcbiAgICAgIHtcbiAgICAgICAgZWRnZXMucHVzaChbb1tlXSwgb1tlKzFdXSk7XG5cbiAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgdmVydGV4OiBvW2VdLFxuICAgICAgICAgIHNoYXBlOiBzaGFwZV9pZFxuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgICAgLy8gdGhpcyBpc24ndCBhIGNsb3NlZCByaW5nIChtYXRjaGluZyBzdGFydCBhbmQgZW5kcClcbiAgICAgIGlmICghZXF1YWxzKG9bMF0sIG9bZV0pKVxuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB2ZXJ0ZXg6IG9bZV0sXG4gICAgICAgICAgc2hhcGU6IHNoYXBlX2lkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxldCBnID0gbmV3IEdyYXBoKCk7XG5cbiAgICAvLyBBZGQgYG5vZGVzYCBpbmRpY2VzIHRvIGdyYXBoXG4gICAgZm9yIChsZXQgaSBpbiBub2RlcylcbiAgICB7XG4gICAgICBnLmFkZHZlcnRleChOdW1iZXIoaSkpO1xuXG4gICAgICAvLyBGb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoXG4gICAgICB0aGlzLl92aXMubm9kZXMucHVzaChub2Rlc1tOdW1iZXIoaSldLnZlcnRleCk7XG4gICAgfVxuXG4gICAgLy8gZy5hZGRlZGdlKCk6IHBlcmltZXRlciBvZiBhbGwgb2JzdGFjbGVzXG5cbiAgICBsZXQgbmU9MDtcblxuICAgIGZvciAobGV0IHg9MDsgeDxub2Rlcy5sZW5ndGgtMTsgeCsrKVxuICAgICAgZm9yIChsZXQgeT14KzE7IHk8bm9kZXMubGVuZ3RoOyB5KyspXG4gICAgICB7XG4gICAgICAgICAgbGV0IEEgPSBub2Rlc1t4XTtcbiAgICAgICAgICBsZXQgQiA9IG5vZGVzW3ldO1xuXG4gICAgICAgICAgLy8gV2UncmUgdGVzdGluZyB0aGUgc2hhcGUncyB2ZXJ0aWNlcyBhZ2FpbnN0IGl0c2VsZlxuICAgICAgICAgIC8vIHdoaWNoIGxlYWRzIHRvIGludGVybmFsIHBhdGhzIGluc2lkZSB0aGUgc2hhcGUgKGludmFsaWQhKVxuICAgICAgICAgIGlmIChBLnNoYXBlID09IEIuc2hhcGUpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgbGV0IHRlc3RlZGdlID0gW0EudmVydGV4LCBCLnZlcnRleF07XG5cbiAgICAgICAgICBpZiAoZWRnZXZpc2liaWx0eSh0ZXN0ZWRnZSwgZWRnZXMpKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGcuYWRkZWRnZSh4LCB5LCBjb3N0KEEudmVydGV4LCBCLnZlcnRleCkpO1xuXG4gICAgICAgICAgICAvLyBKdXN0IGZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGgsIG5vbi1lc3NlbnRpYWw6XG4gICAgICAgICAgICB0aGlzLl92aXMuZWRnZXMucHVzaChbQS52ZXJ0ZXgsIEIudmVydGV4XSk7XG4gICAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICByZXR1cm4gZztcbiAgfVxuXG59XG5cblxuXG5mdW5jdGlvbiBjb3N0KGEsIGIpXG57XG4gIGxldCBkeCA9IGJbMF0gLSBhWzBdIC8vIHgyIC0geDFcbiAgbGV0IGR5ID0gYlsxXSAtIGFbMV07XG4gIHJldHVybiBNYXRoLnNxcnQoIGR4KmR4ICsgZHkqZHkgKTtcblxufVxuXG5mdW5jdGlvbiBlZGdldmlzaWJpbHR5KHRlc3RlZGdlLCBlZGdlcylcbntcbiAgLy8gY29uc29sZS5sb2coYFRlc3RpbmcgZWRnZTogJHt0ZXN0ZWRnZVswXX0sICR7dGVzdGVkZ2VbMV19YCk7XG5cbiAgZm9yIChsZXQgdD0wOyB0PGVkZ2VzLmxlbmd0aDsgdCsrKVxuICB7XG4gICAgbGV0IGUgPSBlZGdlc1t0XTtcblxuICAgIGxldCByZXMgPSBpbnRlcnNlY3RzKHRlc3RlZGdlWzBdLCB0ZXN0ZWRnZVsxXSwgZVswXSwgZVsxXSk7XG5cbiAgICAvLyBJZiBpbnRlcnNlY3Rpb24sIGNoZWNrIGl0J3Mgbm90IGp1c3QgdGhlIGVuZHBvaW50cyBraXNzaW5nIHdoaWNoIGlzIG9rXG4gICAgLy8gaW4gZmFjdCwgaXQncyBtb3JlIHRoYW4gJ29rJyAtIGl0J3MgZXhhY3RseSB3aGF0IHdlJ3JlIGxvb2tpbmcgZm9yXG4gICAgaWYgKHJlcy5pbnRlcnNlY3QgJiYgIXJlcy5raXNzKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5mdW5jdGlvbiBlcXVhbHMoYSwgYilcbntcbiAgcmV0dXJuIChhWzBdID09IGJbMF0gJiYgYVsxXSA9PSBiWzFdKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TY2VuZS5qcyIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcyA9IFtdO1xuICAgIHRoaXMuZWRnZXMgPSBbXTtcbiAgICB0aGlzLm51bWVkZ2VzID0gMDtcbiAgfVxuXG4gIGFkZHZlcnRleChuKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcy5wdXNoKG4pO1xuICAgIHRoaXMuZWRnZXNbbl0gPSBbXTtcbiAgfVxuXG4gIGFkZGVkZ2UodjEsIHYyLCBjb3N0KVxuICB7XG4gICAgdGhpcy5lZGdlc1t2MV0ucHVzaCh7ZGVzdDp2MiwgY29zdH0pO1xuICAgIHRoaXMuZWRnZXNbdjJdLnB1c2goe2Rlc3Q6djEsIGNvc3R9KTtcblxuICAgIHRoaXMubnVtZWRnZXMrKztcbiAgfVxuXG4gIC8vIFN1cGVyIGJhc2ljIGltcGxlbWVudGF0aW9uIG9mIERpamtzdHJhJ3MgYWxnb3JpdGhtXG4gIC8vIERpcmVjdGx5IGZyb20gdGhpcyByZWNpcGU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0RpamtzdHJhJTI3c19hbGdvcml0aG0jQWxnb3JpdGhtXG4gIHNob3J0ZXN0KHN0YXJ0LCBlbmQpXG4gIHtcbiAgICBsZXQgY3VycmVudF9ub2RlO1xuICAgIGxldCBkaXN0ID0gWzBdO1xuICAgIGxldCBwcmV2ID0gW107XG4gICAgbGV0IHVudmlzaXRlZCA9IFtdO1xuXG4gICAgZm9yIChsZXQgaT0wOyBpPHRoaXMudmVydGljZXMubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgaWYgKGkpIGRpc3RbaV0gPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgdW52aXNpdGVkW2ldID0gaTtcbiAgICAgIHByZXZbaV0gPSBudWxsO1xuICAgIH1cblxuICAgIHdoaWxlKCAoY3VycmVudF9ub2RlID0gdW52aXNpdGVkLnNoaWZ0KCkpICE9IG51bGwgKVxuICAgIHtcbiAgICAgIGZvciAobGV0IHQ9MDsgdDx0aGlzLmVkZ2VzW2N1cnJlbnRfbm9kZV0ubGVuZ3RoOyB0KyspXG4gICAgICB7XG4gICAgICAgIC8vIHZlcnRleC9ub2RlIElEXG4gICAgICAgIGxldCBuZWlnaGJvdXIgPSB0aGlzLmVkZ2VzW2N1cnJlbnRfbm9kZV1bdF0uZGVzdDtcblxuICAgICAgICAvLyBEaXN0YW5jZSBmcm9tIGN1cnJlbnRfbm9kZSB0byBuZWlnaGJvdXJcbiAgICAgICAgbGV0IGNvc3QgPSB0aGlzLmVkZ2VzW2N1cnJlbnRfbm9kZV1bdF0uY29zdDtcblxuICAgICAgICAvLyBEaXN0YW5jZSB0aHVzIGZhciBvbiB0aGlzIHJvdXRlICh1cCB0byBjdXJyZW50X25vZGUpICsgZGlzdGFuY2UgdG8gbmVpZ2hib3VyXG4gICAgICAgIGxldCB0ZW50YXRpdmVfZGlzdCA9IGRpc3RbY3VycmVudF9ub2RlXSArIGNvc3Q7XG5cbiAgICAgICAgLy8gSGF2ZSB3ZSBmb3VuZCBhIHNob3J0ZXIgcGF0aD9cbiAgICAgICAgaWYgKHRlbnRhdGl2ZV9kaXN0IDwgZGlzdFtuZWlnaGJvdXJdKVxuICAgICAgICB7XG4gICAgICAgICAgZGlzdFtuZWlnaGJvdXJdID0gdGVudGF0aXZlX2Rpc3Q7IC8vIE5ldyBkaXN0YW5jZSB0byB0aGlzIG5vZGVcbiAgICAgICAgICBwcmV2W25laWdoYm91cl0gPSBjdXJyZW50X25vZGU7ICAgLy8gVXBkYXRlIHRoZSByb3V0ZVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZG9uZSA9IGZhbHNlO1xuICAgIGxldCBjID0gZW5kLCBzZXEgPVtlbmRdO1xuXG4gICAgZG8ge1xuICAgICAgYyA9IHByZXZbY107XG4gICAgICBzZXEucHVzaChjKTtcbiAgICB9IHdoaWxlKGMgIT0gc3RhcnQpO1xuXG4gICAgcmV0dXJuIHNlcS5yZXZlcnNlKCk7XG5cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvR3JhcGguanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXJcbntcbiAgY29uc3RydWN0b3IoZWxlbWVudClcbiAge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICB9XG5cbiAgY2xlYXIoKVxuICB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgcmVuZGVyKG9iamVjdHMsIGNvbG91ciA9ICcjMDAwJywgd2lkdGggPSAyKVxuICB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdHMpKSByZXR1cm47XG5cbiAgICAvLyBwb2ludCB0eXBlXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdHNbMF0pKVxuICAgIHtcbiAgICAgIGNvbnN0IHAgPSBvYmplY3RzO1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LmFyYyhwWzBdPj4wLCBwWzFdPj4wLCB3aWR0aCwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvdXI7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgLy8gbGlzdCBvZiBzaGFwZXMgdHlwZVxuXG4gICAgICBmb3IgKGxldCBvIG9mIG9iamVjdHMpXG4gICAgICB7XG4gICAgICAgIGZvciAobGV0IGU9MDsgZTxvLmxlbmd0aC0xOyBlKyspXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLl9saW5lKG9bZV0sIG9bZSsxXSwgY29sb3VyLCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgX2xpbmUoYSwgYiwgYywgdylcbiAge1xuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB3O1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGMgfHwgJ2JsYWNrJztcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhhWzBdPj4wLGFbMV0+PjApO1xuICAgIHRoaXMuY29udGV4dC5saW5lVG8oYlswXT4+MCxiWzFdPj4wKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlcmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==