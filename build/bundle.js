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
scene.add((0, _Util.Square)(120, 100, 100));
scene.add((0, _Util.Square)(200, 310, 150));
scene.add((0, _Util.Square)(500, 150, 200));

// Find the shortest path. Two things happen here:
//    1. A Scene graph is extracted from our scene geometry
//    2. Dijkstra's method is used to find a quick route across the graph
var route = scene.solve(start, end);

// Get a visualisation of the actual scenegraph
var vis = scene.vis();

// Draw the scene graph nodes
for (var t = 0; t < vis.nodes.length; t++) {
  renderer.render(vis.nodes[t], '#ddd', 5);
} // Draw the graph edges
renderer.render(vis.edges, '#ddd');

// Render the original scene geometry on top of the graph
renderer.render(start, '#0a0', 6);
renderer.render(end, '#a00', 6);
renderer.render(scene.objects, '#333');

// Now display the found route!
renderer.render([route], '#0ff', 3);

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
  }, {
    key: "shortest",
    value: function shortest(start, end) {
      var current_node = void 0;
      var dist = [0];
      var prev = [];
      var unvisited = [];

      for (var i = 1; i < this.vertices.length; i++) {
        dist[i] = Number.MAX_VALUE;
      }for (var _i = 0; _i < this.vertices.length; _i++) {
        unvisited[_i] = _i;
        prev[_i] = null;
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
      var c = end;
      var seq = [end];

      // console.log(c);

      do {

        c = prev[c];

        //console.log(c);
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
    key: 'render',
    value: function render(objects) {
      var colour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#000';
      var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

      if (!Array.isArray(objects)) return;

      // point type
      if (!Array.isArray(objects[0])) {
        var p = objects;
        this.context.beginPath();
        this.context.arc(p[0], p[1], width, 0, 2 * Math.PI, false);
        this.context.fillStyle = colour;
        this.context.fill();
      } else {
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
      this.context.moveTo(a[0], a[1]);
      this.context.lineTo(b[0], b[1]);
      this.context.stroke();
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzJhYTQ2YzVhNzg0OTk0ODRjOGEiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJpbnRlcnNlY3RzIiwiYXAiLCJhcDIiLCJhcSIsImFxMiIsImRvTGluZVNlZ21lbnRzSW50ZXJzZWN0IiwiaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsiLCJwIiwicDIiLCJxIiwicTIiLCJib3gxIiwieG1pbiIsIk1hdGgiLCJtaW4iLCJ5bWluIiwieG1heCIsIm1heCIsInltYXgiLCJib3gyIiwiYmJveF9jb250YWluZWQiLCJhIiwiYiIsInIiLCJzdWJ0cmFjdFBvaW50cyIsInMiLCJ1TnVtZXJhdG9yIiwiY3Jvc3NQcm9kdWN0IiwiZGVub21pbmF0b3IiLCJlcXVhbFBvaW50cyIsImludGVyc2VjdCIsImtpc3MiLCJhbGxFcXVhbCIsInUiLCJ0IiwicG9pbnQxIiwicG9pbnQyIiwicmVzdWx0IiwiYXJncyIsImZpcnN0VmFsdWUiLCJhcmd1bWVudHMiLCJpIiwibGVuZ3RoIiwicmVuZGVyZXIiLCJzY2VuZSIsInN0YXJ0IiwiZW5kIiwiYWRkIiwicm91dGUiLCJzb2x2ZSIsInZpcyIsIm5vZGVzIiwicmVuZGVyIiwiZWRnZXMiLCJvYmplY3RzIiwiU2NlbmUiLCJncmFwaCIsIl92aXMiLCJvYmplY3QiLCJfZ3JhcGgiLCJzaG9ydGVzdCIsIm4iLCJzaGFwZV9pZCIsInZlcnRleCIsInNoYXBlIiwibyIsImUiLCJlcXVhbHMiLCJnIiwiYWRkdmVydGV4IiwiTnVtYmVyIiwibmUiLCJBIiwiQiIsInRlc3RlZGdlIiwiZWRnZXZpc2liaWx0eSIsImFkZGVkZ2UiLCJjb3N0IiwiZHgiLCJkeSIsInNxcnQiLCJyZXMiLCJHcmFwaCIsInZlcnRpY2VzIiwibnVtZWRnZXMiLCJ2MSIsInYyIiwiZGVzdCIsImN1cnJlbnRfbm9kZSIsImRpc3QiLCJwcmV2IiwidW52aXNpdGVkIiwiTUFYX1ZBTFVFIiwic2hpZnQiLCJuZWlnaGJvdXIiLCJ0ZW50YXRpdmVfZGlzdCIsImRvbmUiLCJjIiwic2VxIiwicmV2ZXJzZSIsIlJlbmRlcmVyIiwiZWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImNvbG91ciIsIndpZHRoIiwiQXJyYXkiLCJpc0FycmF5IiwiYmVnaW5QYXRoIiwiYXJjIiwiUEkiLCJmaWxsU3R5bGUiLCJmaWxsIiwiX2xpbmUiLCJ3IiwibGluZVdpZHRoIiwic3Ryb2tlU3R5bGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0RBLFNBQVNBLE1BQVQsQ0FBZ0JDLENBQWhCLEVBQW1CQyxDQUFuQixFQUFzQkMsSUFBdEIsRUFDQTtBQUNFLE1BQUlDLFFBQVFELFFBQU0sQ0FBbEI7QUFDQSxNQUFJRSxLQUFL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R0FBeUJELENBQXpCO0FBQ0EsV0FBS1osT0FBTCxDQUFhYyxXQUFiLEdBQTJCckIsS0FBSyxPQUFoQztBQUNBLFdBQUtPLE9BQUwsQ0FBYU0sU0FBYjtBQUNBLFdBQUtOLE9BQUwsQ0FBYWUsTUFBYixDQUFvQmxHLEVBQUUsQ0FBRixDQUFwQixFQUF5QkEsRUFBRSxDQUFGLENBQXpCO0FBQ0EsV0FBS21GLE9BQUwsQ0FBYWdCLE1BQWIsQ0FBb0JsRyxFQUFFLENBQUYsQ0FBcEIsRUFBeUJBLEVBQUUsQ0FBRixDQUF6QjtBQUNBLFdBQUtrRixPQUFMLENBQWFpQixNQUFiO0FBQ0Q7Ozs7OztrQkExQ2tCckIsUSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3MmFhNDZjNWE3ODQ5OTQ4NGM4YSIsIlxuXG5mdW5jdGlvbiBTcXVhcmUoeCwgeSwgc2l6ZSlcbntcbiAgbGV0IGhzaXplID0gc2l6ZT4+MTtcbiAgbGV0IHNxID0gW107XG4gIC8vIG9yIGp1c3QgbWFrZSBhIHVuaXQgc3F1YXJlIGFuZCBzY2FsZSBpdCB1cCBkdWggOnxcbiAgLy8gdG9wIGxlZnRcbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSAtIGhzaXplXSApO1xuICAvLyB0b3AgcmlnaHRcbiAgc3EucHVzaCggW3ggKyBoc2l6ZSwgeSAtIGhzaXplXSApO1xuICAvLyBib3R0b20gcmlnaHRcbiAgc3EucHVzaCggW3ggKyBoc2l6ZSwgeSArIGhzaXplXSApO1xuICAvLyBib3R0b20gbGVmdFxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5ICsgaHNpemVdICk7XG4gIC8vIHRvcCBsZWZ0IGFnYWluXG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgLSBoc2l6ZV0gKTtcblxuICByZXR1cm4gc3E7XG59XG5cblxuLyoqXG4gKiBAYXV0aG9yIFBldGVyIEtlbGxleVxuICogQGF1dGhvciBwZ2tlbGxleTRAZ21haWwuY29tXG4gKi9cbi8qKlxuICogU2VlIGlmIHR3byBsaW5lIHNlZ21lbnRzIGludGVyc2VjdC4gVGhpcyB1c2VzIHRoZVxuICogdmVjdG9yIGNyb3NzIHByb2R1Y3QgYXBwcm9hY2ggZGVzY3JpYmVkIGJlbG93OlxuICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTY1MjgyLzc4NjMzOVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIHN0YXJ0IG9mIHRoZSAxc3QgbGluZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwMiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBlbmQgb2YgdGhlIDFzdCBsaW5lLlxuICogQHBhcmFtIHtPYmplY3R9IHEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgc3RhcnQgb2YgdGhlIDJuZCBsaW5lLlxuICogQHBhcmFtIHtPYmplY3R9IHEyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIGVuZCBvZiB0aGUgMm5kIGxpbmUuXG4gKi9cblxuZnVuY3Rpb24gaW50ZXJzZWN0cyhhcCwgYXAyLCBhcSwgYXEyKVxue1xuICAvLyBBTTogTm90ZSB0byBkZXZlbG9wZXJzLCB1c2luZyBuYW1lZCBwcm9wZXJ0aWVzIGZvciB2ZWN0b3JzIGlzIHJldGFyZGVkLiB0aGFua3MuXG4gIHJldHVybiBkb0xpbmVTZWdtZW50c0ludGVyc2VjdCgge3g6IGFwWzBdLCB5OiBhcFsxXX0sIHt4OiBhcDJbMF0sIHk6IGFwMlsxXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3g6IGFxWzBdLCB5OiBhcVsxXX0sIHt4OiBhcTJbMF0sIHk6IGFxMlsxXX0gKTtcbn1cblxuZnVuY3Rpb24gaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsocCwgcDIsIHEsIHEyKVxue1xuICB2YXIgYm94MSA9IHtcbiAgICB4bWluOiBNYXRoLm1pbihwLngsIHAyLngpLFxuICAgIHltaW46IE1hdGgubWluKHAueSwgcDIueSksXG4gICAgeG1heDogTWF0aC5tYXgocC54LCBwMi54KSxcbiAgICB5bWF4OiBNYXRoLm1heChwLnksIHAyLnkpXG4gIH07XG5cbiAgdmFyIGJveDIgPSB7XG4gICAgeG1pbjogTWF0aC5taW4ocS54LCBxMi54KSxcbiAgICB5bWluOiBNYXRoLm1pbihxLnksIHEyLnkpLFxuICAgIHhtYXg6IE1hdGgubWF4KHEueCwgcTIueCksXG4gICAgeW1heDogTWF0aC5tYXgocS55LCBxMi55KVxuICB9O1xuXG4gIHJldHVybiBiYm94X2NvbnRhaW5lZChib3gxLCBib3gyKSB8fCBiYm94X2NvbnRhaW5lZChib3gyLCBib3gxKTtcbn1cblxuZnVuY3Rpb24gYmJveF9jb250YWluZWQoYSwgYilcbntcbiAgLy8gSXMgQm94IEIgY29tcGxldGVseSBpbnNpZGUgYm94IEEgP1xuICByZXR1cm4gKGIueG1pbiA+PSBhLnhtaW4gJiYgYi54bWF4IDw9IGEueG1heCkgJiYgKGIueW1pbiA+PSBhLnltaW4gJiYgYi55bWF4IDw9IGEueW1heCk7XG59XG5cblxuZnVuY3Rpb24gZG9MaW5lU2VnbWVudHNJbnRlcnNlY3QocCwgcDIsIHEsIHEyKVxue1xuICAvLyB2YXIgZGVidWdfc3RyaW5nID0gYGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0OiAoJHtwLnh9LCAke3AueX0pLSgke3AyLnh9LCAke3AyLnl9KSAgd2l0aCAgKCR7cS54fSwgJHtxLnl9KS0oJHtxMi54fSwgJHtxMi55fSlgO1xuXG5cdHZhciByID0gc3VidHJhY3RQb2ludHMocDIsIHApO1xuXHR2YXIgcyA9IHN1YnRyYWN0UG9pbnRzKHEyLCBxKTtcblxuXHR2YXIgdU51bWVyYXRvciA9IGNyb3NzUHJvZHVjdChzdWJ0cmFjdFBvaW50cyhxLCBwKSwgcik7XG5cdHZhciBkZW5vbWluYXRvciA9IGNyb3NzUHJvZHVjdChyLCBzKTtcblxuXHRpZiAodU51bWVyYXRvciA9PSAwICYmIGRlbm9taW5hdG9yID09IDApIHtcblx0XHQvLyBUaGV5IGFyZSBjb0xsaW5lYXJcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiQ29wbGFuYXJcIik7XG5cblx0XHQvLyBEbyB0aGV5IHRvdWNoPyAoQXJlIGFueSBvZiB0aGUgcG9pbnRzIGVxdWFsPylcblx0XHRpZiAoZXF1YWxQb2ludHMocCwgcSkgfHwgZXF1YWxQb2ludHMocCwgcTIpIHx8IGVxdWFsUG9pbnRzKHAyLCBxKSB8fCBlcXVhbFBvaW50cyhwMiwgcTIpKSB7XG5cdFx0XHRyZXR1cm4ge1xuICAgICAgICBpbnRlcnNlY3Q6IHRydWUsXG4gICAgICAgIGtpc3M6ICFpc19vbmVfYmJveF9jb250YWluZWRfYnlfdGhlX290aGVyX3F1ZXN0aW9ubWFyayhwLCBwMiwgcSwgcTIpXG4gICAgICB9O1xuXG5cdFx0fVxuXHRcdC8vIERvIHRoZXkgb3ZlcmxhcD8gKEFyZSBhbGwgdGhlIHBvaW50IGRpZmZlcmVuY2VzIGluIGVpdGhlciBkaXJlY3Rpb24gdGhlIHNhbWUgc2lnbilcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiUG9pbnRzIERPTlQgdG91Y2hcIik7XG5cblx0XHRyZXR1cm4ge1xuICAgICAgaW50ZXJzZWN0OlxuICAgICAgICAgICAgIWFsbEVxdWFsKFxuICAgICAgXHRcdFx0XHQocS54IC0gcC54IDwgMCksXG4gICAgICBcdFx0XHRcdChxLnggLSBwMi54IDwgMCksXG4gICAgICBcdFx0XHRcdChxMi54IC0gcC54IDwgMCksXG4gICAgICBcdFx0XHRcdChxMi54IC0gcDIueCA8IDApKSB8fFxuICAgICAgXHRcdFx0IWFsbEVxdWFsKFxuICAgICAgXHRcdFx0XHQocS55IC0gcC55IDwgMCksXG4gICAgICBcdFx0XHRcdChxLnkgLSBwMi55IDwgMCksXG4gICAgICBcdFx0XHRcdChxMi55IC0gcC55IDwgMCksXG4gICAgICBcdFx0XHRcdChxMi55IC0gcDIueSA8IDApKSxcbiAgICAgICAga2lzczogZmFsc2VcbiAgICAgIH07XG5cblx0fVxuXG5cdGlmIChkZW5vbWluYXRvciA9PSAwKSB7XG5cdFx0Ly8gbGluZXMgYXJlIHBhcmFsZWxsXG5cdFx0cmV0dXJuIHtpbnRlcnNlY3Q6IGZhbHNlLCBraXNzOiBmYWxzZX07XG5cdH1cblxuXHR2YXIgdSA9IHVOdW1lcmF0b3IgLyBkZW5vbWluYXRvcjtcblx0dmFyIHQgPSBjcm9zc1Byb2R1Y3Qoc3VidHJhY3RQb2ludHMocSwgcCksIHMpIC8gZGVub21pbmF0b3I7XG5cbiAgLy8gY29uc29sZS5sb2coYHQ9JHt0fSwgdT0ke3V9YCk7XG4gIHZhciBraXNzID0gZmFsc2U7XG5cbiAgaWYgKGVxdWFsUG9pbnRzKHAsIHEpIHx8IGVxdWFsUG9pbnRzKHAsIHEyKSB8fCBlcXVhbFBvaW50cyhwMiwgcSkgfHwgZXF1YWxQb2ludHMocDIsIHEyKSlcbiAgICBraXNzID0gdHJ1ZTtcblxuICAvLyBsZXQgcmVzID1cbiAgLy9yZXR1cm5cbiAgcmV0dXJuIHtcbiAgICBpbnRlcnNlY3Q6ICh0ID49IDApICYmICh0IDw9IDEpICYmICh1ID49IDApICYmICh1IDw9IDEpLFxuICAgIGtpc3M6IGtpc3NcbiAgfTtcblxuICAvLyBjb25zb2xlLmxvZyhgJHtkZWJ1Z19zdHJpbmd9ID0gJHtyZXN9YCk7XG5cblx0Ly8gcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGUgdGhlIGNyb3NzIHByb2R1Y3Qgb2YgdGhlIHR3byBwb2ludHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIHRoZSBjcm9zcyBwcm9kdWN0IHJlc3VsdCBhcyBhIGZsb2F0XG4gKi9cbmZ1bmN0aW9uIGNyb3NzUHJvZHVjdChwb2ludDEsIHBvaW50Mikge1xuXHRyZXR1cm4gcG9pbnQxLnggKiBwb2ludDIueSAtIHBvaW50MS55ICogcG9pbnQyLng7XG59XG5cbi8qKlxuICogU3VidHJhY3QgdGhlIHNlY29uZCBwb2ludCBmcm9tIHRoZSBmaXJzdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICpcbiAqIEByZXR1cm4gdGhlIHN1YnRyYWN0aW9uIHJlc3VsdCBhcyBhIHBvaW50IG9iamVjdFxuICovXG5mdW5jdGlvbiBzdWJ0cmFjdFBvaW50cyhwb2ludDEsIHBvaW50Mikge1xuXHR2YXIgcmVzdWx0ID0ge307XG5cdHJlc3VsdC54ID0gcG9pbnQxLnggLSBwb2ludDIueDtcblx0cmVzdWx0LnkgPSBwb2ludDEueSAtIHBvaW50Mi55O1xuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogU2VlIGlmIHRoZSBwb2ludHMgYXJlIGVxdWFsLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiBpZiB0aGUgcG9pbnRzIGFyZSBlcXVhbFxuICovXG5mdW5jdGlvbiBlcXVhbFBvaW50cyhwb2ludDEsIHBvaW50Mikge1xuXHRyZXR1cm4gKHBvaW50MS54ID09IHBvaW50Mi54KSAmJiAocG9pbnQxLnkgPT0gcG9pbnQyLnkpXG59XG5cbi8qKlxuICogU2VlIGlmIGFsbCBhcmd1bWVudHMgYXJlIGVxdWFsLlxuICpcbiAqIEBwYXJhbSB7Li4ufSBhcmdzIGFyZ3VtZW50cyB0aGF0IHdpbGwgYmUgY29tcGFyZWQgYnkgJz09Jy5cbiAqXG4gKiBAcmV0dXJuIGlmIGFsbCBhcmd1bWVudHMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGFsbEVxdWFsKGFyZ3MpIHtcblx0dmFyIGZpcnN0VmFsdWUgPSBhcmd1bWVudHNbMF0sXG5cdFx0aTtcblx0Zm9yIChpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGlmIChhcmd1bWVudHNbaV0gIT0gZmlyc3RWYWx1ZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuXG5cbmV4cG9ydCB7U3F1YXJlLCBpbnRlcnNlY3RzfSA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvVXRpbC5qcyIsIlxuaW1wb3J0IHtTcXVhcmV9ICAgICBmcm9tICcuL1V0aWwnO1xuaW1wb3J0IFNjZW5lICAgICAgICBmcm9tICcuL1NjZW5lJztcbmltcG9ydCBSZW5kZXJlciAgICAgZnJvbSAnLi9SZW5kZXJlcic7XG5cbmxldCByZW5kZXJlciA9IG5ldyBSZW5kZXJlcignZGlzcGxheScpO1xubGV0IHNjZW5lID0gbmV3IFNjZW5lKCk7XG5cbi8vIFN0YXJ0IHBvaW50IGFuZCBvdXIgZ29hbFxubGV0IHN0YXJ0ID0gWzEwLCAxMF07XG5sZXQgZW5kID0gWzM4MCwgNDIwXTtcblxuLy8gQWRkIHNvbWUgb2JzdGFjbGVzIHRvIHRoZSBzY2VuZVxuc2NlbmUuYWRkKCBTcXVhcmUoMTIwLCAxMDAsIDEwMCkgKTtcbnNjZW5lLmFkZCggU3F1YXJlKDIwMCwgMzEwLCAxNTApICk7XG5zY2VuZS5hZGQoIFNxdWFyZSg1MDAsIDE1MCwgMjAwKSApO1xuXG4vLyBGaW5kIHRoZSBzaG9ydGVzdCBwYXRoLiBUd28gdGhpbmdzIGhhcHBlbiBoZXJlOlxuLy8gICAgMS4gQSBTY2VuZSBncmFwaCBpcyBleHRyYWN0ZWQgZnJvbSBvdXIgc2NlbmUgZ2VvbWV0cnlcbi8vICAgIDIuIERpamtzdHJhJ3MgbWV0aG9kIGlzIHVzZWQgdG8gZmluZCBhIHF1aWNrIHJvdXRlIGFjcm9zcyB0aGUgZ3JhcGhcbmxldCByb3V0ZSA9IHNjZW5lLnNvbHZlKCBzdGFydCwgZW5kICk7XG5cbi8vIEdldCBhIHZpc3VhbGlzYXRpb24gb2YgdGhlIGFjdHVhbCBzY2VuZWdyYXBoXG5sZXQgdmlzID0gc2NlbmUudmlzKCk7XG5cbi8vIERyYXcgdGhlIHNjZW5lIGdyYXBoIG5vZGVzXG5mb3IgKGxldCB0PTA7IHQ8dmlzLm5vZGVzLmxlbmd0aDsgdCsrKVxuICByZW5kZXJlci5yZW5kZXIoIHZpcy5ub2Rlc1t0XSwgJyNkZGQnLCA1ICk7XG5cbi8vIERyYXcgdGhlIGdyYXBoIGVkZ2VzXG5yZW5kZXJlci5yZW5kZXIoIHZpcy5lZGdlcywgJyNkZGQnICk7XG5cbi8vIFJlbmRlciB0aGUgb3JpZ2luYWwgc2NlbmUgZ2VvbWV0cnkgb24gdG9wIG9mIHRoZSBncmFwaFxucmVuZGVyZXIucmVuZGVyKCBzdGFydCwgJyMwYTAnLCA2ICk7XG5yZW5kZXJlci5yZW5kZXIoIGVuZCwgJyNhMDAnLCA2ICk7XG5yZW5kZXJlci5yZW5kZXIoIHNjZW5lLm9iamVjdHMsICcjMzMzJyApO1xuXG4vLyBOb3cgZGlzcGxheSB0aGUgZm91bmQgcm91dGUhXG5yZW5kZXJlci5yZW5kZXIoIFtyb3V0ZV0sICcjMGZmJywgMyApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiLCJcbmltcG9ydCBHcmFwaCAgICAgICAgICBmcm9tICcuL0dyYXBoJztcbmltcG9ydCB7aW50ZXJzZWN0c30gICBmcm9tICcuL1V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZVxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICB0aGlzLm9iamVjdHMgPSBbXTtcbiAgICB0aGlzLmdyYXBoID0gbnVsbDtcblxuICAgIC8vIFRoaXMgaXMganVzdCBmb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoXG4gICAgdGhpcy5fdmlzID0gbnVsbDtcbiAgfVxuXG4gIGFkZChvYmplY3QpXG4gIHtcbiAgICB0aGlzLm9iamVjdHMucHVzaChvYmplY3QpO1xuICB9XG5cbiAgc29sdmUoc3RhcnQsIGVuZClcbiAge1xuICAgIHRoaXMuZ3JhcGggPSB0aGlzLl9ncmFwaChzdGFydCwgZW5kKTtcbiAgICBsZXQgbm9kZXMgPSB0aGlzLmdyYXBoLnNob3J0ZXN0KDAsIDEpOyAvLyBbMF0gc3RhcnQsIFsxXSBlbmQgKHNlZSAuZ3JhcGgoKSlcblxuICAgIGxldCByb3V0ZSA9IFtdO1xuICAgIGZvciAobGV0IG4gb2Ygbm9kZXMpXG4gICAge1xuICAgICAgcm91dGUucHVzaCh0aGlzLl92aXMubm9kZXNbIG4gXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvdXRlO1xuICB9XG5cbiAgdmlzKClcbiAge1xuICAgIHJldHVybiB0aGlzLl92aXM7XG4gIH1cblxuICAvLyBFeHRyYWN0IGEgc2NlbmVncmFwaCBmcm9tIG91ciBjb250aW51b3VzIGV1Y2xpZGVhbiBnZW9tZXRyeVxuICBfZ3JhcGgoc3RhcnQsIGVuZClcbiAge1xuICAgIGxldCBub2RlcyA9IFtdO1xuICAgIGxldCBlZGdlcyA9IFtdO1xuXG4gICAgLy8gRm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaFxuICAgIHRoaXMuX3ZpcyA9IHsgbm9kZXM6IFtdLCBlZGdlczogW10gfTtcblxuICAgIC8vIFRoaXMgaXMganVzdCBhIHRlbXAgdmFsdWUgdXNlZCB0byBtYWtlIHN1cmUgc2hhcGVzIGRvbid0IHBlcmZvcm1cbiAgICAvLyBpbnRlcnNlY3Rpb24gdGVzdHMgb24gdGhlbXNlbHZlcyAoYWNyb3NzIHRoZWlyIG93biB2ZXJ0aWNlcylcbiAgICBsZXQgc2hhcGVfaWQgPSAxO1xuXG4gICAgLy8gVGhlc2UgZmlyc3QgdHdvIG5vZGVzIGluIHRoZSBncmFwaCBhcmUgYSBzcGVjaWFsIGNhc2VcbiAgICBub2Rlcy5wdXNoKCB7dmVydGV4OiBzdGFydCwgIHNoYXBlOiBzaGFwZV9pZCsrfSApOyAvLyBbMF0gc3RhcnQgKHNlZSAuc29sdmUoKSlcbiAgICBub2Rlcy5wdXNoKCB7dmVydGV4OiBlbmQsICAgIHNoYXBlOiBzaGFwZV9pZCsrfSApOyAvLyBbMV0gZW5kXG5cbiAgICAvLyBleHRyYWN0IGVhY2ggb2JzdGFjbGUncyBlZGdlcyBhbmQgbm9kZXNcbiAgICBmb3IgKGxldCBvIG9mIHRoaXMub2JqZWN0cylcbiAgICB7XG4gICAgICBzaGFwZV9pZCsrO1xuXG4gICAgICBsZXQgZTtcbiAgICAgIGZvciAoZT0wOyBlPG8ubGVuZ3RoLTE7IGUrKylcbiAgICAgIHtcbiAgICAgICAgZWRnZXMucHVzaChbb1tlXSwgb1tlKzFdXSk7XG5cbiAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgdmVydGV4OiBvW2VdLFxuICAgICAgICAgIHNoYXBlOiBzaGFwZV9pZFxuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgICAgLy8gdGhpcyBpc24ndCBhIGNsb3NlZCByaW5nIChtYXRjaGluZyBzdGFydCBhbmQgZW5kcClcbiAgICAgIGlmICghZXF1YWxzKG9bMF0sIG9bZV0pKVxuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB2ZXJ0ZXg6IG9bZV0sXG4gICAgICAgICAgc2hhcGU6IHNoYXBlX2lkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxldCBnID0gbmV3IEdyYXBoKCk7XG5cbiAgICAvLyBBZGQgYG5vZGVzYCBpbmRpY2VzIHRvIGdyYXBoXG4gICAgZm9yIChsZXQgaSBpbiBub2RlcylcbiAgICB7XG4gICAgICBnLmFkZHZlcnRleChOdW1iZXIoaSkpO1xuXG4gICAgICAvLyBGb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoXG4gICAgICB0aGlzLl92aXMubm9kZXMucHVzaChub2Rlc1tOdW1iZXIoaSldLnZlcnRleCk7XG4gICAgfVxuXG4gICAgLy8gZy5hZGRlZGdlKCk6IHBlcmltZXRlciBvZiBhbGwgb2JzdGFjbGVzXG5cbiAgICBsZXQgbmU9MDtcblxuICAgIGZvciAobGV0IHg9MDsgeDxub2Rlcy5sZW5ndGgtMTsgeCsrKVxuICAgICAgZm9yIChsZXQgeT14KzE7IHk8bm9kZXMubGVuZ3RoOyB5KyspXG4gICAgICB7XG4gICAgICAgICAgbGV0IEEgPSBub2Rlc1t4XTtcbiAgICAgICAgICBsZXQgQiA9IG5vZGVzW3ldO1xuXG4gICAgICAgICAgLy8gV2UncmUgdGVzdGluZyB0aGUgc2hhcGUncyB2ZXJ0aWNlcyBhZ2FpbnN0IGl0c2VsZlxuICAgICAgICAgIC8vIHdoaWNoIGxlYWRzIHRvIGludGVybmFsIHBhdGhzIGluc2lkZSB0aGUgc2hhcGUgKGludmFsaWQhKVxuICAgICAgICAgIGlmIChBLnNoYXBlID09IEIuc2hhcGUpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgbGV0IHRlc3RlZGdlID0gW0EudmVydGV4LCBCLnZlcnRleF07XG5cbiAgICAgICAgICBpZiAoZWRnZXZpc2liaWx0eSh0ZXN0ZWRnZSwgZWRnZXMpKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGcuYWRkZWRnZSh4LCB5LCBjb3N0KEEudmVydGV4LCBCLnZlcnRleCkpO1xuXG4gICAgICAgICAgICAvLyBKdXN0IGZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGgsIG5vbi1lc3NlbnRpYWw6XG4gICAgICAgICAgICB0aGlzLl92aXMuZWRnZXMucHVzaChbQS52ZXJ0ZXgsIEIudmVydGV4XSk7XG4gICAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICByZXR1cm4gZztcbiAgfVxuXG59XG5cblxuXG5mdW5jdGlvbiBjb3N0KGEsIGIpXG57XG4gIGxldCBkeCA9IGJbMF0gLSBhWzBdIC8vIHgyIC0geDFcbiAgbGV0IGR5ID0gYlsxXSAtIGFbMV07XG4gIHJldHVybiBNYXRoLnNxcnQoIGR4KmR4ICsgZHkqZHkgKTtcblxufVxuXG5mdW5jdGlvbiBlZGdldmlzaWJpbHR5KHRlc3RlZGdlLCBlZGdlcylcbntcbiAgLy8gY29uc29sZS5sb2coYFRlc3RpbmcgZWRnZTogJHt0ZXN0ZWRnZVswXX0sICR7dGVzdGVkZ2VbMV19YCk7XG5cbiAgZm9yIChsZXQgdD0wOyB0PGVkZ2VzLmxlbmd0aDsgdCsrKVxuICB7XG4gICAgbGV0IGUgPSBlZGdlc1t0XTtcblxuICAgIGxldCByZXMgPSBpbnRlcnNlY3RzKHRlc3RlZGdlWzBdLCB0ZXN0ZWRnZVsxXSwgZVswXSwgZVsxXSk7XG5cbiAgICAvLyBJZiBpbnRlcnNlY3Rpb24sIGNoZWNrIGl0J3Mgbm90IGp1c3QgdGhlIGVuZHBvaW50cyBraXNzaW5nIHdoaWNoIGlzIG9rXG4gICAgLy8gaW4gZmFjdCwgaXQncyBtb3JlIHRoYW4gJ29rJyAtIGl0J3MgZXhhY3RseSB3aGF0IHdlJ3JlIGxvb2tpbmcgZm9yXG4gICAgaWYgKHJlcy5pbnRlcnNlY3QgJiYgIXJlcy5raXNzKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5mdW5jdGlvbiBlcXVhbHMoYSwgYilcbntcbiAgcmV0dXJuIChhWzBdID09IGJbMF0gJiYgYVsxXSA9PSBiWzFdKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TY2VuZS5qcyIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcyA9IFtdO1xuICAgIHRoaXMuZWRnZXMgPSBbXTtcbiAgICB0aGlzLm51bWVkZ2VzID0gMDtcbiAgfVxuXG4gIGFkZHZlcnRleChuKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcy5wdXNoKG4pO1xuICAgIHRoaXMuZWRnZXNbbl0gPSBbXTtcbiAgfVxuXG4gIGFkZGVkZ2UodjEsIHYyLCBjb3N0KVxuICB7XG4gICAgdGhpcy5lZGdlc1t2MV0ucHVzaCh7ZGVzdDp2MiwgY29zdH0pO1xuICAgIHRoaXMuZWRnZXNbdjJdLnB1c2goe2Rlc3Q6djEsIGNvc3R9KTtcblxuICAgIHRoaXMubnVtZWRnZXMrKztcbiAgfVxuXG4gIHNob3J0ZXN0KHN0YXJ0LCBlbmQpXG4gIHtcbiAgICBsZXQgY3VycmVudF9ub2RlO1xuICAgIGxldCBkaXN0ID0gWzBdO1xuICAgIGxldCBwcmV2ID0gW107XG4gICAgbGV0IHVudmlzaXRlZCA9IFtdO1xuXG4gICAgZm9yIChsZXQgaT0xOyBpPHRoaXMudmVydGljZXMubGVuZ3RoOyBpKyspXG4gICAgICBkaXN0W2ldID0gTnVtYmVyLk1BWF9WQUxVRTtcblxuICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnZlcnRpY2VzLmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgIHVudmlzaXRlZFtpXSA9IGk7XG4gICAgICBwcmV2W2ldID0gbnVsbDtcbiAgICB9XG5cbiAgICB3aGlsZSggKGN1cnJlbnRfbm9kZSA9IHVudmlzaXRlZC5zaGlmdCgpKSAhPSBudWxsIClcbiAgICB7XG4gICAgICBmb3IgKGxldCB0PTA7IHQ8dGhpcy5lZGdlc1tjdXJyZW50X25vZGVdLmxlbmd0aDsgdCsrKVxuICAgICAge1xuICAgICAgICAvLyB2ZXJ0ZXgvbm9kZSBJRFxuICAgICAgICBsZXQgbmVpZ2hib3VyID0gdGhpcy5lZGdlc1tjdXJyZW50X25vZGVdW3RdLmRlc3Q7XG5cbiAgICAgICAgLy8gRGlzdGFuY2UgZnJvbSBjdXJyZW50X25vZGUgdG8gbmVpZ2hib3VyXG4gICAgICAgIGxldCBjb3N0ID0gdGhpcy5lZGdlc1tjdXJyZW50X25vZGVdW3RdLmNvc3Q7XG5cbiAgICAgICAgLy8gRGlzdGFuY2UgdGh1cyBmYXIgb24gdGhpcyByb3V0ZSAodXAgdG8gY3VycmVudF9ub2RlKSArIGRpc3RhbmNlIHRvIG5laWdoYm91clxuICAgICAgICBsZXQgdGVudGF0aXZlX2Rpc3QgPSBkaXN0W2N1cnJlbnRfbm9kZV0gKyBjb3N0O1xuXG4gICAgICAgIC8vIEhhdmUgd2UgZm91bmQgYSBzaG9ydGVyIHBhdGg/XG4gICAgICAgIGlmICh0ZW50YXRpdmVfZGlzdCA8IGRpc3RbbmVpZ2hib3VyXSlcbiAgICAgICAge1xuICAgICAgICAgIGRpc3RbbmVpZ2hib3VyXSA9IHRlbnRhdGl2ZV9kaXN0OyAvLyBOZXcgZGlzdGFuY2UgdG8gdGhpcyBub2RlXG4gICAgICAgICAgcHJldltuZWlnaGJvdXJdID0gY3VycmVudF9ub2RlOyAgIC8vIFVwZGF0ZSB0aGUgcm91dGVcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBsZXQgZG9uZSA9IGZhbHNlO1xuICAgIGxldCBjID0gZW5kO1xuICAgIGxldCBzZXEgPVtlbmRdO1xuXG4gICAgLy8gY29uc29sZS5sb2coYyk7XG5cbiAgICBkbyB7XG5cbiAgICAgIGMgPSBwcmV2W2NdO1xuXG4gICAgICAvL2NvbnNvbGUubG9nKGMpO1xuICAgICAgc2VxLnB1c2goYyk7XG5cbiAgICB9IHdoaWxlKGMgIT0gc3RhcnQpO1xuXG5cbiAgICByZXR1cm4gc2VxLnJldmVyc2UoKTtcblxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9HcmFwaC5qcyIsIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlclxue1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KVxuICB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCk7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gIH1cblxuICByZW5kZXIob2JqZWN0cywgY29sb3VyID0gJyMwMDAnLCB3aWR0aCA9IDIpXG4gIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob2JqZWN0cykpIHJldHVybjtcblxuICAgIC8vIHBvaW50IHR5cGVcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob2JqZWN0c1swXSkpXG4gICAge1xuICAgICAgY29uc3QgcCA9IG9iamVjdHM7XG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQuYXJjKHBbMF0sIHBbMV0sIHdpZHRoLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG91cjtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgfSBlbHNlIHtcblxuICAgICAgZm9yIChsZXQgbyBvZiBvYmplY3RzKVxuICAgICAge1xuICAgICAgICBmb3IgKGxldCBlPTA7IGU8by5sZW5ndGgtMTsgZSsrKVxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5fbGluZShvW2VdLCBvW2UrMV0sIGNvbG91ciwgd2lkdGgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIF9saW5lKGEsIGIsIGMsIHcpXG4gIHtcbiAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdztcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjIHx8ICdibGFjayc7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oYVswXSxhWzFdKTtcbiAgICB0aGlzLmNvbnRleHQubGluZVRvKGJbMF0sYlsxXSk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=