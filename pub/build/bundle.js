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

var element = 'display';

var renderer = new _Renderer2.default(element);
var scene = new _Scene2.default();

var debug = true;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmFkODg1NmIwODE3NjI5ZDMyMjkiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJyb3RhdGUiLCJzaGFwZSIsInJ4IiwicnkiLCJkYSIsInBhaXIiLCJyb3RhdGVfcG9pbnQiLCJ0cmFuc2xhdGUiLCJkeCIsImR5IiwiY3giLCJjeSIsImFuZ2xlIiwicCIsInMiLCJNYXRoIiwic2luIiwiYyIsImNvcyIsInhuZXciLCJ5bmV3IiwiaW50ZXJzZWN0cyIsImFwIiwiYXAyIiwiYXEiLCJhcTIiLCJkb0xpbmVTZWdtZW50c0ludGVyc2VjdCIsImlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrIiwicDIiLCJxIiwicTIiLCJib3gxIiwieG1pbiIsIm1pbiIsInltaW4iLCJ4bWF4IiwibWF4IiwieW1heCIsImJveDIiLCJiYm94X2NvbnRhaW5lZCIsImEiLCJiIiwiciIsInN1YnRyYWN0UG9pbnRzIiwidU51bWVyYXRvciIsImNyb3NzUHJvZHVjdCIsImRlbm9taW5hdG9yIiwiZXF1YWxQb2ludHMiLCJpbnRlcnNlY3QiLCJraXNzIiwiYWxsRXF1YWwiLCJ1IiwidCIsInBvaW50MSIsInBvaW50MiIsInJlc3VsdCIsImFyZ3MiLCJmaXJzdFZhbHVlIiwiYXJndW1lbnRzIiwiaSIsImxlbmd0aCIsImVsZW1lbnQiLCJyZW5kZXJlciIsInNjZW5lIiwiZGVidWciLCJzdGFydCIsImVuZCIsInJvdHgiLCJyb3R5IiwibW90aW9uIiwicm90YSIsInNxX3NtYWxsIiwic3FfbWVkIiwic3FfbGFyZ2UiLCJvYnN0YWNsZXMiLCJvIiwiYWRkIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZnJhbWUiLCJyb3V0ZSIsInNvbHZlIiwidmlzIiwiY2xlYXIiLCJub2RlcyIsIm4iLCJyZW5kZXIiLCJlZGdlcyIsIm9iamVjdHMiLCJQSSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvbmNsaWNrIiwiZSIsInNyY0VsZW1lbnQiLCJjaGVja2VkIiwib25tb3VzZW1vdmUiLCJjbGllbnRYIiwiY2xpZW50WSIsIlNjZW5lIiwiZ3JhcGgiLCJfdmlzIiwib2JqZWN0IiwiX2dyYXBoIiwic2hvcnRlc3QiLCJzaGFwZV9pZCIsInZlcnRleCIsImVxdWFscyIsImciLCJhZGR2ZXJ0ZXgiLCJOdW1iZXIiLCJuZSIsIkEiLCJCIiwidGVzdGVkZ2UiLCJlZGdldmlzaWJpbHR5IiwiYWRkZWRnZSIsImNvc3QiLCJzcXJ0IiwicmVzIiwiR3JhcGgiLCJ2ZXJ0aWNlcyIsIm51bWVkZ2VzIiwidjEiLCJ2MiIsImRlc3QiLCJjdXJyZW50X25vZGUiLCJkaXN0IiwicHJldiIsInVudmlzaXRlZCIsIk1BWF9WQUxVRSIsInNoaWZ0IiwibmVpZ2hib3VyIiwidGVudGF0aXZlX2Rpc3QiLCJzZXEiLCJyZXZlcnNlIiwiUmVuZGVyZXIiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiY29sb3VyIiwiQXJyYXkiLCJpc0FycmF5IiwiYmVnaW5QYXRoIiwiYXJjIiwiZmlsbFN0eWxlIiwiZmlsbCIsIl9saW5lIiwidyIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FB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QixFQUE0QkEsRUFBRSxDQUFGLEtBQU0sQ0FBbEM7QUFDQSxXQUFLK0YsT0FBTCxDQUFha0IsTUFBYjtBQUNEOzs7Ozs7a0JBaERrQm5CLFEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYmFkODg1NmIwODE3NjI5ZDMyMjkiLCJcblxuZnVuY3Rpb24gU3F1YXJlKHgsIHksIHNpemUpXG57XG4gIGxldCBoc2l6ZSA9IHNpemU+PjE7XG4gIGxldCBzcSA9IFtdO1xuICAvLyBvciBqdXN0IG1ha2UgYSB1bml0IHNxdWFyZSBhbmQgc2NhbGUgaXQgdXAgZHVoIDp8XG4gIC8vIHRvcCBsZWZ0XG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgLSBoc2l6ZV0gKTtcbiAgLy8gdG9wIHJpZ2h0XG4gIHNxLnB1c2goIFt4ICsgaHNpemUsIHkgLSBoc2l6ZV0gKTtcbiAgLy8gYm90dG9tIHJpZ2h0XG4gIHNxLnB1c2goIFt4ICsgaHNpemUsIHkgKyBoc2l6ZV0gKTtcbiAgLy8gYm90dG9tIGxlZnRcbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSArIGhzaXplXSApO1xuICAvLyB0b3AgbGVmdCBhZ2FpblxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5IC0gaHNpemVdICk7XG5cbiAgcmV0dXJuIHNxO1xufVxuXG5mdW5jdGlvbiByb3RhdGUoc2hhcGUsIHJ4LCByeSwgZGEpXG57XG4gIGZvciAobGV0IHBhaXIgb2Ygc2hhcGUpXG4gIHtcbiAgICBwYWlyID0gcm90YXRlX3BvaW50KHJ4LCByeSwgZGEsIHBhaXIpO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gdHJhbnNsYXRlKHNoYXBlLCBkeCwgZHkpXG57XG4gIGZvciAobGV0IHBhaXIgb2Ygc2hhcGUpXG4gIHtcbiAgICBwYWlyWzBdICs9IGR4O1xuICAgIHBhaXJbMV0gKz0gZHk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm90YXRlX3BvaW50KGN4LCBjeSwgYW5nbGUsIHApXG57XG4gIGxldCBzID0gTWF0aC5zaW4oYW5nbGUpO1xuICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlKTtcblxuICAvLyB0cmFuc2xhdGUgcG9pbnQgYmFjayB0byBvcmlnaW46XG4gIHBbMF0gLT0gY3g7XG4gIHBbMV0gLT0gY3k7XG5cbiAgLy8gcm90YXRlIHBvaW50XG4gIGxldCB4bmV3ID0gcFswXSAqIGMgLSBwWzFdICogcztcbiAgbGV0IHluZXcgPSBwWzBdICogcyArIHBbMV0gKiBjO1xuXG4gIC8vIHRyYW5zbGF0ZSBwb2ludCBiYWNrOlxuICBwWzBdID0geG5ldyArIGN4O1xuICBwWzFdID0geW5ldyArIGN5O1xuXG4gIHJldHVybiBwO1xufVxuXG4vKipcbiAqIEBhdXRob3IgUGV0ZXIgS2VsbGV5XG4gKiBAYXV0aG9yIHBna2VsbGV5NEBnbWFpbC5jb21cbiAqL1xuLyoqXG4gKiBTZWUgaWYgdHdvIGxpbmUgc2VnbWVudHMgaW50ZXJzZWN0LiBUaGlzIHVzZXMgdGhlXG4gKiB2ZWN0b3IgY3Jvc3MgcHJvZHVjdCBhcHByb2FjaCBkZXNjcmliZWQgYmVsb3c6XG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NjUyODIvNzg2MzM5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHAgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgc3RhcnQgb2YgdGhlIDFzdCBsaW5lLlxuICogQHBhcmFtIHtPYmplY3R9IHAyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIGVuZCBvZiB0aGUgMXN0IGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBzdGFydCBvZiB0aGUgMm5kIGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcTIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgZW5kIG9mIHRoZSAybmQgbGluZS5cbiAqL1xuXG5mdW5jdGlvbiBpbnRlcnNlY3RzKGFwLCBhcDIsIGFxLCBhcTIpXG57XG4gIC8vIEFNOiBOb3RlIHRvIGRldmVsb3BlcnMsIHVzaW5nIG5hbWVkIHByb3BlcnRpZXMgZm9yIHZlY3RvcnMgaXMgcmV0YXJkZWQuIHRoYW5rcy5cbiAgcmV0dXJuIGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0KCB7eDogYXBbMF0sIHk6IGFwWzFdfSwge3g6IGFwMlswXSwgeTogYXAyWzFdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eDogYXFbMF0sIHk6IGFxWzFdfSwge3g6IGFxMlswXSwgeTogYXEyWzFdfSApO1xufVxuXG5mdW5jdGlvbiBpc19vbmVfYmJveF9jb250YWluZWRfYnlfdGhlX290aGVyX3F1ZXN0aW9ubWFyayhwLCBwMiwgcSwgcTIpXG57XG4gIHZhciBib3gxID0ge1xuICAgIHhtaW46IE1hdGgubWluKHAueCwgcDIueCksXG4gICAgeW1pbjogTWF0aC5taW4ocC55LCBwMi55KSxcbiAgICB4bWF4OiBNYXRoLm1heChwLngsIHAyLngpLFxuICAgIHltYXg6IE1hdGgubWF4KHAueSwgcDIueSlcbiAgfTtcblxuICB2YXIgYm94MiA9IHtcbiAgICB4bWluOiBNYXRoLm1pbihxLngsIHEyLngpLFxuICAgIHltaW46IE1hdGgubWluKHEueSwgcTIueSksXG4gICAgeG1heDogTWF0aC5tYXgocS54LCBxMi54KSxcbiAgICB5bWF4OiBNYXRoLm1heChxLnksIHEyLnkpXG4gIH07XG5cbiAgcmV0dXJuIGJib3hfY29udGFpbmVkKGJveDEsIGJveDIpIHx8IGJib3hfY29udGFpbmVkKGJveDIsIGJveDEpO1xufVxuXG5mdW5jdGlvbiBiYm94X2NvbnRhaW5lZChhLCBiKVxue1xuICAvLyBJcyBCb3ggQiBjb21wbGV0ZWx5IGluc2lkZSBib3ggQSA/XG4gIHJldHVybiAoYi54bWluID49IGEueG1pbiAmJiBiLnhtYXggPD0gYS54bWF4KSAmJiAoYi55bWluID49IGEueW1pbiAmJiBiLnltYXggPD0gYS55bWF4KTtcbn1cblxuXG5mdW5jdGlvbiBkb0xpbmVTZWdtZW50c0ludGVyc2VjdChwLCBwMiwgcSwgcTIpXG57XG4gIC8vIHZhciBkZWJ1Z19zdHJpbmcgPSBgZG9MaW5lU2VnbWVudHNJbnRlcnNlY3Q6ICgke3AueH0sICR7cC55fSktKCR7cDIueH0sICR7cDIueX0pICB3aXRoICAoJHtxLnh9LCAke3EueX0pLSgke3EyLnh9LCAke3EyLnl9KWA7XG5cblx0dmFyIHIgPSBzdWJ0cmFjdFBvaW50cyhwMiwgcCk7XG5cdHZhciBzID0gc3VidHJhY3RQb2ludHMocTIsIHEpO1xuXG5cdHZhciB1TnVtZXJhdG9yID0gY3Jvc3NQcm9kdWN0KHN1YnRyYWN0UG9pbnRzKHEsIHApLCByKTtcblx0dmFyIGRlbm9taW5hdG9yID0gY3Jvc3NQcm9kdWN0KHIsIHMpO1xuXG5cdGlmICh1TnVtZXJhdG9yID09IDAgJiYgZGVub21pbmF0b3IgPT0gMCkge1xuXHRcdC8vIFRoZXkgYXJlIGNvTGxpbmVhclxuXG4gICAgLy8gY29uc29sZS5sb2coXCJDb3BsYW5hclwiKTtcblxuXHRcdC8vIERvIHRoZXkgdG91Y2g/IChBcmUgYW55IG9mIHRoZSBwb2ludHMgZXF1YWw/KVxuXHRcdGlmIChlcXVhbFBvaW50cyhwLCBxKSB8fCBlcXVhbFBvaW50cyhwLCBxMikgfHwgZXF1YWxQb2ludHMocDIsIHEpIHx8IGVxdWFsUG9pbnRzKHAyLCBxMikpIHtcblx0XHRcdHJldHVybiB7XG4gICAgICAgIGludGVyc2VjdDogdHJ1ZSxcbiAgICAgICAga2lzczogIWlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrKHAsIHAyLCBxLCBxMilcbiAgICAgIH07XG5cblx0XHR9XG5cdFx0Ly8gRG8gdGhleSBvdmVybGFwPyAoQXJlIGFsbCB0aGUgcG9pbnQgZGlmZmVyZW5jZXMgaW4gZWl0aGVyIGRpcmVjdGlvbiB0aGUgc2FtZSBzaWduKVxuXG4gICAgLy8gY29uc29sZS5sb2coXCJQb2ludHMgRE9OVCB0b3VjaFwiKTtcblxuXHRcdHJldHVybiB7XG4gICAgICBpbnRlcnNlY3Q6XG4gICAgICAgICAgICAhYWxsRXF1YWwoXG4gICAgICBcdFx0XHRcdChxLnggLSBwLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEueCAtIHAyLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnggLSBwLnggPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnggLSBwMi54IDwgMCkpIHx8XG4gICAgICBcdFx0XHQhYWxsRXF1YWwoXG4gICAgICBcdFx0XHRcdChxLnkgLSBwLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEueSAtIHAyLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnkgLSBwLnkgPCAwKSxcbiAgICAgIFx0XHRcdFx0KHEyLnkgLSBwMi55IDwgMCkpLFxuICAgICAgICBraXNzOiBmYWxzZVxuICAgICAgfTtcblxuXHR9XG5cblx0aWYgKGRlbm9taW5hdG9yID09IDApIHtcblx0XHQvLyBsaW5lcyBhcmUgcGFyYWxlbGxcblx0XHRyZXR1cm4ge2ludGVyc2VjdDogZmFsc2UsIGtpc3M6IGZhbHNlfTtcblx0fVxuXG5cdHZhciB1ID0gdU51bWVyYXRvciAvIGRlbm9taW5hdG9yO1xuXHR2YXIgdCA9IGNyb3NzUHJvZHVjdChzdWJ0cmFjdFBvaW50cyhxLCBwKSwgcykgLyBkZW5vbWluYXRvcjtcblxuICAvLyBjb25zb2xlLmxvZyhgdD0ke3R9LCB1PSR7dX1gKTtcbiAgdmFyIGtpc3MgPSBmYWxzZTtcblxuICBpZiAoZXF1YWxQb2ludHMocCwgcSkgfHwgZXF1YWxQb2ludHMocCwgcTIpIHx8IGVxdWFsUG9pbnRzKHAyLCBxKSB8fCBlcXVhbFBvaW50cyhwMiwgcTIpKVxuICAgIGtpc3MgPSB0cnVlO1xuXG4gIC8vIGxldCByZXMgPVxuICAvL3JldHVyblxuICByZXR1cm4ge1xuICAgIGludGVyc2VjdDogKHQgPj0gMCkgJiYgKHQgPD0gMSkgJiYgKHUgPj0gMCkgJiYgKHUgPD0gMSksXG4gICAga2lzczoga2lzc1xuICB9O1xuXG4gIC8vIGNvbnNvbGUubG9nKGAke2RlYnVnX3N0cmluZ30gPSAke3Jlc31gKTtcblxuXHQvLyByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZSB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0aGUgdHdvIHBvaW50cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICpcbiAqIEByZXR1cm4gdGhlIGNyb3NzIHByb2R1Y3QgcmVzdWx0IGFzIGEgZmxvYXRcbiAqL1xuZnVuY3Rpb24gY3Jvc3NQcm9kdWN0KHBvaW50MSwgcG9pbnQyKSB7XG5cdHJldHVybiBwb2ludDEueCAqIHBvaW50Mi55IC0gcG9pbnQxLnkgKiBwb2ludDIueDtcbn1cblxuLyoqXG4gKiBTdWJ0cmFjdCB0aGUgc2Vjb25kIHBvaW50IGZyb20gdGhlIGZpcnN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiB0aGUgc3VidHJhY3Rpb24gcmVzdWx0IGFzIGEgcG9pbnQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIHN1YnRyYWN0UG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XG5cdHZhciByZXN1bHQgPSB7fTtcblx0cmVzdWx0LnggPSBwb2ludDEueCAtIHBvaW50Mi54O1xuXHRyZXN1bHQueSA9IHBvaW50MS55IC0gcG9pbnQyLnk7XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBTZWUgaWYgdGhlIHBvaW50cyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIGlmIHRoZSBwb2ludHMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGVxdWFsUG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XG5cdHJldHVybiAocG9pbnQxLnggPT0gcG9pbnQyLngpICYmIChwb2ludDEueSA9PSBwb2ludDIueSlcbn1cblxuLyoqXG4gKiBTZWUgaWYgYWxsIGFyZ3VtZW50cyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHsuLi59IGFyZ3MgYXJndW1lbnRzIHRoYXQgd2lsbCBiZSBjb21wYXJlZCBieSAnPT0nLlxuICpcbiAqIEByZXR1cm4gaWYgYWxsIGFyZ3VtZW50cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gYWxsRXF1YWwoYXJncykge1xuXHR2YXIgZmlyc3RWYWx1ZSA9IGFyZ3VtZW50c1swXSxcblx0XHRpO1xuXHRmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKGFyZ3VtZW50c1tpXSAhPSBmaXJzdFZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0cnVlO1xufVxuXG5cblxuZXhwb3J0IHtTcXVhcmUsIGludGVyc2VjdHMsIHJvdGF0ZSwgdHJhbnNsYXRlfSA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvVXRpbC5qcyIsIlxuaW1wb3J0IFNjZW5lICAgICAgICBmcm9tICcuL1NjZW5lJztcbmltcG9ydCBSZW5kZXJlciAgICAgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQge1NxdWFyZSwgcm90YXRlLCB0cmFuc2xhdGV9ICAgICBmcm9tICcuL1V0aWwnO1xuXG5jb25zdCBlbGVtZW50ID0gJ2Rpc3BsYXknO1xuXG5sZXQgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoZWxlbWVudCk7XG5sZXQgc2NlbmUgPSBuZXcgU2NlbmUoKTtcblxubGV0IGRlYnVnID0gdHJ1ZTtcblxuLy8gU3RhcnQgcG9pbnQgYW5kIG91ciBnb2FsXG5sZXQgc3RhcnQgPSBbMTAsIDEwXTtcbmxldCBlbmQgPSBbMzgwLCA0MjBdO1xuXG4vLyBGb3IgdGhlIHNoYXBlIGFuaW1hdGlvbnNcbmxldCByb3R4ID0gNTAwLCByb3R5ID0gMTUwO1xubGV0IG1vdGlvbiA9IDAsIHJvdGEgPSAwO1xuXG4vLyBBZGQgc29tZSBvYnN0YWNsZXMgdG8gdGhlIHNjZW5lXG5sZXQgc3Ffc21hbGwgPSBTcXVhcmUoMTIwLCAxMDAsIDEwMCk7XG5sZXQgc3FfbWVkICAgPSBTcXVhcmUoMjAwLCAzMTAsIDE1MCk7XG5sZXQgc3FfbGFyZ2UgPSBTcXVhcmUocm90eCwgcm90eSwgMjAwKTtcblxubGV0IG9ic3RhY2xlcyA9IFtzcV9zbWFsbCwgc3FfbWVkLCBzcV9sYXJnZV07XG5cbmZvciAobGV0IG8gb2Ygb2JzdGFjbGVzKVxuICBzY2VuZS5hZGQoIG8gKTtcblxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBmcmFtZSApO1xuXG5mdW5jdGlvbiBmcmFtZSgpXG57XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSggZnJhbWUgKTtcblxuICAvLyBGaW5kIHRoZSBzaG9ydGVzdCBwYXRoLiBUd28gdGhpbmdzIGhhcHBlbiBoZXJlOlxuICAvLyAgICAxLiBBIFNjZW5lIGdyYXBoIGlzIGV4dHJhY3RlZCBmcm9tIG91ciBzY2VuZSBnZW9tZXRyeVxuICAvLyAgICAyLiBEaWprc3RyYSdzIG1ldGhvZCBpcyB1c2VkIHRvIGZpbmQgdGhlIG9wdGltYWwgcm91dGUgYWNyb3NzIHRoZSBncmFwaFxuICBsZXQgcm91dGUgPSBzY2VuZS5zb2x2ZSggc3RhcnQsIGVuZCApO1xuXG4gIC8vIEdldCBhIHZpc3VhbGlzYXRpb24gb2YgdGhlIGFjdHVhbCBzY2VuZWdyYXBoXG4gIGxldCB2aXMgPSBzY2VuZS52aXMoKTtcblxuICByZW5kZXJlci5jbGVhcigpO1xuXG4gIGlmIChkZWJ1ZylcbiAge1xuICAgIC8vIERyYXcgdGhlIHNjZW5lIGdyYXBoIG5vZGVzXG4gICAgZm9yIChsZXQgbiBvZiB2aXMubm9kZXMpXG4gICAgICByZW5kZXJlci5yZW5kZXIoIG4sICcjZGRkJywgNSApO1xuXG4gICAgLy8gRHJhdyB0aGUgZ3JhcGggZWRnZXNcbiAgICByZW5kZXJlci5yZW5kZXIoIHZpcy5lZGdlcywgJyNkZGQnICk7XG4gIH1cblxuICAvLyBSZW5kZXIgdGhlIG9yaWdpbmFsIHNjZW5lIGdlb21ldHJ5IG9uIHRvcCBvZiB0aGUgZ3JhcGhcbiAgcmVuZGVyZXIucmVuZGVyKCBzdGFydCwgJyMwYTAnLCA2ICk7XG4gIHJlbmRlcmVyLnJlbmRlciggZW5kLCAnIzA4ZicsIDYgKTtcbiAgcmVuZGVyZXIucmVuZGVyKCBzY2VuZS5vYmplY3RzLCAnIzMzMycgKTtcblxuICAvLyBOb3cgZGlzcGxheSB0aGUgZm91bmQgcm91dGUhXG4gIHJlbmRlcmVyLnJlbmRlciggW3JvdXRlXSwgJyNmMDAnLCAzICk7XG5cbiAgLy8gQW5pbWF0aW9uXG4gIG1vdGlvbiArPSAwLjA1OyAvLyBTaW51c29pZGFsXG4gIHRyYW5zbGF0ZShzcV9zbWFsbCwgMyAqIE1hdGguc2luKG1vdGlvbiAqIDAuMjUgKiBNYXRoLlBJKSwgMCk7XG5cbiAgLy8gcm90YXRlIHRoZSBiaWcgc3F1YXJlXG4gIHJvdGF0ZShzcV9sYXJnZSwgcm90eCwgcm90eSwgMC4wMDUpO1xuXG59XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYl9kZWJ1ZycpLm9uY2xpY2sgPSAoZSwgYykgPT4ge1xuICBkZWJ1ZyA9IGUuc3JjRWxlbWVudC5jaGVja2VkO1xufVxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KS5vbm1vdXNlbW92ZSA9IGUgPT4ge1xuXG4gIGVuZCA9IFtlLmNsaWVudFgsIGUuY2xpZW50WV07XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWluLmpzIiwiXG5pbXBvcnQgR3JhcGggICAgICAgICAgZnJvbSAnLi9HcmFwaCc7XG5pbXBvcnQge2ludGVyc2VjdHN9ICAgZnJvbSAnLi9VdGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmVcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgdGhpcy5vYmplY3RzID0gW107XG4gICAgdGhpcy5ncmFwaCA9IG51bGw7XG5cbiAgICAvLyBUaGlzIGlzIGp1c3QgZm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaFxuICAgIHRoaXMuX3ZpcyA9IG51bGw7XG4gIH1cblxuICBhZGQob2JqZWN0KVxuICB7XG4gICAgdGhpcy5vYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgfVxuXG4gIHNvbHZlKHN0YXJ0LCBlbmQpXG4gIHtcbiAgICB0aGlzLmdyYXBoID0gdGhpcy5fZ3JhcGgoc3RhcnQsIGVuZCk7XG4gICAgbGV0IG5vZGVzID0gdGhpcy5ncmFwaC5zaG9ydGVzdCgwLCAxKTsgLy8gWzBdIHN0YXJ0LCBbMV0gZW5kIChzZWUgLmdyYXBoKCkpXG5cbiAgICBsZXQgcm91dGUgPSBbXTtcbiAgICBmb3IgKGxldCBuIG9mIG5vZGVzKVxuICAgIHtcbiAgICAgIHJvdXRlLnB1c2godGhpcy5fdmlzLm5vZGVzWyBuIF0pO1xuICAgIH1cblxuICAgIHJldHVybiByb3V0ZTtcbiAgfVxuXG4gIHZpcygpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5fdmlzO1xuICB9XG5cbiAgLy8gRXh0cmFjdCBhIHNjZW5lZ3JhcGggZnJvbSBvdXIgY29udGludW91cyBldWNsaWRlYW4gZ2VvbWV0cnlcbiAgX2dyYXBoKHN0YXJ0LCBlbmQpXG4gIHtcbiAgICBsZXQgbm9kZXMgPSBbXTtcbiAgICBsZXQgZWRnZXMgPSBbXTtcblxuICAgIC8vIEZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICB0aGlzLl92aXMgPSB7IG5vZGVzOiBbXSwgZWRnZXM6IFtdIH07XG5cbiAgICAvLyBUaGlzIGlzIGp1c3QgYSB0ZW1wIHZhbHVlIHVzZWQgdG8gbWFrZSBzdXJlIHNoYXBlcyBkb24ndCBwZXJmb3JtXG4gICAgLy8gaW50ZXJzZWN0aW9uIHRlc3RzIG9uIHRoZW1zZWx2ZXMgKGFjcm9zcyB0aGVpciBvd24gdmVydGljZXMpXG4gICAgbGV0IHNoYXBlX2lkID0gMTtcblxuICAgIC8vIFRoZXNlIGZpcnN0IHR3byBub2RlcyBpbiB0aGUgZ3JhcGggYXJlIGEgc3BlY2lhbCBjYXNlXG4gICAgbm9kZXMucHVzaCgge3ZlcnRleDogc3RhcnQsICBzaGFwZTogc2hhcGVfaWQrK30gKTsgLy8gWzBdIHN0YXJ0IChzZWUgLnNvbHZlKCkpXG4gICAgbm9kZXMucHVzaCgge3ZlcnRleDogZW5kLCAgICBzaGFwZTogc2hhcGVfaWQrK30gKTsgLy8gWzFdIGVuZFxuXG4gICAgLy8gZXh0cmFjdCBlYWNoIG9ic3RhY2xlJ3MgZWRnZXMgYW5kIG5vZGVzXG4gICAgZm9yIChsZXQgbyBvZiB0aGlzLm9iamVjdHMpXG4gICAge1xuICAgICAgc2hhcGVfaWQrKztcblxuICAgICAgbGV0IGU7XG4gICAgICBmb3IgKGU9MDsgZTxvLmxlbmd0aC0xOyBlKyspXG4gICAgICB7XG4gICAgICAgIGVkZ2VzLnB1c2goW29bZV0sIG9bZSsxXV0pO1xuXG4gICAgICAgIG5vZGVzLnB1c2goe1xuICAgICAgICAgIHZlcnRleDogb1tlXSxcbiAgICAgICAgICBzaGFwZTogc2hhcGVfaWRcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICAgIC8vIHRoaXMgaXNuJ3QgYSBjbG9zZWQgcmluZyAobWF0Y2hpbmcgc3RhcnQgYW5kIGVuZHApXG4gICAgICBpZiAoIWVxdWFscyhvWzBdLCBvW2VdKSlcbiAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgdmVydGV4OiBvW2VdLFxuICAgICAgICAgIHNoYXBlOiBzaGFwZV9pZFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsZXQgZyA9IG5ldyBHcmFwaCgpO1xuXG4gICAgLy8gQWRkIGBub2Rlc2AgaW5kaWNlcyB0byBncmFwaFxuICAgIGZvciAobGV0IGkgaW4gbm9kZXMpXG4gICAge1xuICAgICAgZy5hZGR2ZXJ0ZXgoTnVtYmVyKGkpKTtcblxuICAgICAgLy8gRm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaFxuICAgICAgdGhpcy5fdmlzLm5vZGVzLnB1c2gobm9kZXNbTnVtYmVyKGkpXS52ZXJ0ZXgpO1xuICAgIH1cblxuICAgIC8vIGcuYWRkZWRnZSgpOiBwZXJpbWV0ZXIgb2YgYWxsIG9ic3RhY2xlc1xuXG4gICAgbGV0IG5lPTA7XG5cbiAgICBmb3IgKGxldCB4PTA7IHg8bm9kZXMubGVuZ3RoLTE7IHgrKylcbiAgICAgIGZvciAobGV0IHk9eCsxOyB5PG5vZGVzLmxlbmd0aDsgeSsrKVxuICAgICAge1xuICAgICAgICAgIGxldCBBID0gbm9kZXNbeF07XG4gICAgICAgICAgbGV0IEIgPSBub2Rlc1t5XTtcblxuICAgICAgICAgIC8vIFdlJ3JlIHRlc3RpbmcgdGhlIHNoYXBlJ3MgdmVydGljZXMgYWdhaW5zdCBpdHNlbGZcbiAgICAgICAgICAvLyB3aGljaCBsZWFkcyB0byBpbnRlcm5hbCBwYXRocyBpbnNpZGUgdGhlIHNoYXBlIChpbnZhbGlkISlcbiAgICAgICAgICBpZiAoQS5zaGFwZSA9PSBCLnNoYXBlKSBjb250aW51ZTtcblxuICAgICAgICAgIGxldCB0ZXN0ZWRnZSA9IFtBLnZlcnRleCwgQi52ZXJ0ZXhdO1xuXG4gICAgICAgICAgaWYgKGVkZ2V2aXNpYmlsdHkodGVzdGVkZ2UsIGVkZ2VzKSlcbiAgICAgICAgICB7XG4gICAgICAgICAgICBnLmFkZGVkZ2UoeCwgeSwgY29zdChBLnZlcnRleCwgQi52ZXJ0ZXgpKTtcblxuICAgICAgICAgICAgLy8gSnVzdCBmb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoLCBub24tZXNzZW50aWFsOlxuICAgICAgICAgICAgdGhpcy5fdmlzLmVkZ2VzLnB1c2goW0EudmVydGV4LCBCLnZlcnRleF0pO1xuICAgICAgICAgIH1cblxuICAgICAgfVxuXG5cbiAgICByZXR1cm4gZztcbiAgfVxuXG59XG5cblxuXG5mdW5jdGlvbiBjb3N0KGEsIGIpXG57XG4gIGxldCBkeCA9IGJbMF0gLSBhWzBdIC8vIHgyIC0geDFcbiAgbGV0IGR5ID0gYlsxXSAtIGFbMV07XG4gIHJldHVybiBNYXRoLnNxcnQoIGR4KmR4ICsgZHkqZHkgKTtcblxufVxuXG5mdW5jdGlvbiBlZGdldmlzaWJpbHR5KHRlc3RlZGdlLCBlZGdlcylcbntcbiAgLy8gY29uc29sZS5sb2coYFRlc3RpbmcgZWRnZTogJHt0ZXN0ZWRnZVswXX0sICR7dGVzdGVkZ2VbMV19YCk7XG5cbiAgZm9yIChsZXQgdD0wOyB0PGVkZ2VzLmxlbmd0aDsgdCsrKVxuICB7XG4gICAgbGV0IGUgPSBlZGdlc1t0XTtcblxuICAgIGxldCByZXMgPSBpbnRlcnNlY3RzKHRlc3RlZGdlWzBdLCB0ZXN0ZWRnZVsxXSwgZVswXSwgZVsxXSk7XG5cbiAgICAvLyBJZiBpbnRlcnNlY3Rpb24sIGNoZWNrIGl0J3Mgbm90IGp1c3QgdGhlIGVuZHBvaW50cyBraXNzaW5nIHdoaWNoIGlzIG9rXG4gICAgLy8gaW4gZmFjdCwgaXQncyBtb3JlIHRoYW4gJ29rJyAtIGl0J3MgZXhhY3RseSB3aGF0IHdlJ3JlIGxvb2tpbmcgZm9yXG4gICAgaWYgKHJlcy5pbnRlcnNlY3QgJiYgIXJlcy5raXNzKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5mdW5jdGlvbiBlcXVhbHMoYSwgYilcbntcbiAgcmV0dXJuIChhWzBdID09IGJbMF0gJiYgYVsxXSA9PSBiWzFdKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TY2VuZS5qcyIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcyA9IFtdO1xuICAgIHRoaXMuZWRnZXMgPSBbXTtcbiAgICB0aGlzLm51bWVkZ2VzID0gMDtcbiAgfVxuXG4gIGFkZHZlcnRleChuKVxuICB7XG4gICAgdGhpcy52ZXJ0aWNlcy5wdXNoKG4pO1xuICAgIHRoaXMuZWRnZXNbbl0gPSBbXTtcbiAgfVxuXG4gIGFkZGVkZ2UodjEsIHYyLCBjb3N0KVxuICB7XG4gICAgdGhpcy5lZGdlc1t2MV0ucHVzaCh7ZGVzdDp2MiwgY29zdH0pO1xuICAgIHRoaXMuZWRnZXNbdjJdLnB1c2goe2Rlc3Q6djEsIGNvc3R9KTtcblxuICAgIHRoaXMubnVtZWRnZXMrKztcbiAgfVxuXG4gIC8vIFN1cGVyIGJhc2ljIGltcGxlbWVudGF0aW9uIG9mIERpamtzdHJhJ3MgYWxnb3JpdGhtXG4gIC8vIERpcmVjdGx5IGZyb20gdGhpcyByZWNpcGU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0RpamtzdHJhJTI3c19hbGdvcml0aG0jQWxnb3JpdGhtXG4gIHNob3J0ZXN0KHN0YXJ0LCBlbmQpXG4gIHtcbiAgICBsZXQgY3VycmVudF9ub2RlO1xuICAgIGxldCBkaXN0ID0gWzBdO1xuICAgIGxldCBwcmV2ID0gW107XG4gICAgbGV0IHVudmlzaXRlZCA9IFtdO1xuXG4gICAgZm9yIChsZXQgaT0wOyBpPHRoaXMudmVydGljZXMubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgaWYgKGkpIGRpc3RbaV0gPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgdW52aXNpdGVkW2ldID0gaTtcbiAgICAgIHByZXZbaV0gPSBudWxsO1xuICAgIH1cblxuICAgIHdoaWxlKCAoY3VycmVudF9ub2RlID0gdW52aXNpdGVkLnNoaWZ0KCkpICE9IG51bGwgKVxuICAgIHtcbiAgICAgIGZvciAobGV0IHQ9MDsgdDx0aGlzLmVkZ2VzW2N1cnJlbnRfbm9kZV0ubGVuZ3RoOyB0KyspXG4gICAgICB7XG4gICAgICAgIC8vIHZlcnRleC9ub2RlIElEXG4gICAgICAgIGxldCBuZWlnaGJvdXIgPSB0aGlzLmVkZ2VzW2N1cnJlbnRfbm9kZV1bdF0uZGVzdDtcblxuICAgICAgICAvLyBEaXN0YW5jZSBmcm9tIGN1cnJlbnRfbm9kZSB0byBuZWlnaGJvdXJcbiAgICAgICAgbGV0IGNvc3QgPSB0aGlzLmVkZ2VzW2N1cnJlbnRfbm9kZV1bdF0uY29zdDtcblxuICAgICAgICAvLyBEaXN0YW5jZSB0aHVzIGZhciBvbiB0aGlzIHJvdXRlICh1cCB0byBjdXJyZW50X25vZGUpICsgZGlzdGFuY2UgdG8gbmVpZ2hib3VyXG4gICAgICAgIGxldCB0ZW50YXRpdmVfZGlzdCA9IGRpc3RbY3VycmVudF9ub2RlXSArIGNvc3Q7XG5cbiAgICAgICAgLy8gSGF2ZSB3ZSBmb3VuZCBhIHNob3J0ZXIgcGF0aD9cbiAgICAgICAgaWYgKHRlbnRhdGl2ZV9kaXN0IDwgZGlzdFtuZWlnaGJvdXJdKVxuICAgICAgICB7XG4gICAgICAgICAgZGlzdFtuZWlnaGJvdXJdID0gdGVudGF0aXZlX2Rpc3Q7IC8vIE5ldyBkaXN0YW5jZSB0byB0aGlzIG5vZGVcbiAgICAgICAgICBwcmV2W25laWdoYm91cl0gPSBjdXJyZW50X25vZGU7ICAgLy8gVXBkYXRlIHRoZSByb3V0ZVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYyA9IGVuZCwgc2VxID1bZW5kXTtcblxuICAgIC8vIGZhaWxlZCBmb3Igc29tZSByZWFzb24sIGUuZy4gaW1wb3NzaWJsZSBwb2ludCBpbnNpZGUgbnVsbHNwYWNlIGV0Y1xuICAgIGlmIChwcmV2W2NdID09IG51bGwpXG4gICAgICByZXR1cm4gW107XG5cbiAgICBkbyB7XG4gICAgICBjID0gcHJldltjXTtcbiAgICAgIHNlcS5wdXNoKGMpO1xuICAgIH0gd2hpbGUoYyAhPSBzdGFydCk7XG5cbiAgICByZXR1cm4gc2VxLnJldmVyc2UoKTtcblxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9HcmFwaC5qcyIsIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlclxue1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KVxuICB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCk7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gIH1cblxuICBjbGVhcigpXG4gIHtcbiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gIH1cblxuICByZW5kZXIob2JqZWN0cywgY29sb3VyID0gJyMwMDAnLCB3aWR0aCA9IDIpXG4gIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob2JqZWN0cykpIHJldHVybjtcblxuICAgIC8vIHBvaW50IHR5cGVcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob2JqZWN0c1swXSkpXG4gICAge1xuICAgICAgY29uc3QgcCA9IG9iamVjdHM7XG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQuYXJjKHBbMF0+PjAsIHBbMV0+PjAsIHdpZHRoLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG91cjtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAvLyBsaXN0IG9mIHNoYXBlcyB0eXBlXG5cbiAgICAgIGZvciAobGV0IG8gb2Ygb2JqZWN0cylcbiAgICAgIHtcbiAgICAgICAgZm9yIChsZXQgZT0wOyBlPG8ubGVuZ3RoLTE7IGUrKylcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuX2xpbmUob1tlXSwgb1tlKzFdLCBjb2xvdXIsIHdpZHRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICBfbGluZShhLCBiLCBjLCB3KVxuICB7XG4gICAgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9IHc7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gYyB8fCAnYmxhY2snO1xuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQubW92ZVRvKGFbMF0+PjAsYVsxXT4+MCk7XG4gICAgdGhpcy5jb250ZXh0LmxpbmVUbyhiWzBdPj4wLGJbMV0+PjApO1xuICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyZXIuanMiXSwic291cmNlUm9vdCI6IiJ9