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

// Show/hide the scene graph
var debug = true;

// Start point and our goal
var start = [10, 10];
var end = [380, 420];

// For the shape animations
var rotx = 500,
    roty = 150;
var motion = 0,
    rota = 0;

// Create some simple obstacles (accepts simple n-sided polygons)
var sq_small = (0, _Util.Square)(120, 100, 100);
var sq_med = (0, _Util.Square)(200, 310, 150);
var sq_large = (0, _Util.Square)(rotx, roty, 200);

// Add them to the scene
scene.add(sq_small);
scene.add(sq_med);
scene.add(sq_large);

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
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = vis.nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var n = _step.value;

        renderer.render(n, '#ddd', 5);
      } // Draw the graph edges
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWQyYmZkZDIzYTAxMWMxY2ExZWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiU3F1YXJlIiwieCIsInkiLCJzaXplIiwiaHNpemUiLCJzcSIsInB1c2giLCJyb3RhdGUiLCJzaGFwZSIsInJ4IiwicnkiLCJkYSIsInBhaXIiLCJyb3RhdGVfcG9pbnQiLCJ0cmFuc2xhdGUiLCJkeCIsImR5IiwiY3giLCJjeSIsImFuZ2xlIiwicCIsInMiLCJNYXRoIiwic2luIiwiYyIsImNvcyIsInhuZXciLCJ5bmV3IiwiaW50ZXJzZWN0cyIsImFwIiwiYXAyIiwiYXEiLCJhcTIiLCJkb0xpbmVTZWdtZW50c0ludGVyc2VjdCIsImlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrIiwicDIiLCJxIiwicTIiLCJib3gxIiwieG1pbiIsIm1pbiIsInltaW4iLCJ4bWF4IiwibWF4IiwieW1heCIsImJveDIiLCJiYm94X2NvbnRhaW5lZCIsImEiLCJiIiwiciIsInN1YnRyYWN0UG9pbnRzIiwidU51bWVyYXRvciIsImNyb3NzUHJvZHVjdCIsImRlbm9taW5hdG9yIiwiZXF1YWxQb2ludHMiLCJpbnRlcnNlY3QiLCJraXNzIiwiYWxsRXF1YWwiLCJ1IiwidCIsInBvaW50MSIsInBvaW50MiIsInJlc3VsdCIsImFyZ3MiLCJmaXJzdFZhbHVlIiwiYXJndW1lbnRzIiwiaSIsImxlbmd0aCIsImVsZW1lbnQiLCJyZW5kZXJlciIsInNjZW5lIiwiZGVidWciLCJzdGFydCIsImVuZCIsInJvdHgiLCJyb3R5IiwibW90aW9uIiwicm90YSIsInNxX3NtYWxsIiwic3FfbWVkIiwic3FfbGFyZ2UiLCJhZGQiLCJmcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInJvdXRlIiwic29sdmUiLCJ2aXMiLCJjbGVhciIsIm5vZGVzIiwibiIsInJlbmRlciIsImVkZ2VzIiwib2JqZWN0cyIsIlBJIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm9uY2xpY2siLCJlIiwic3JjRWxlbWVudCIsImNoZWNrZWQiLCJvbm1vdXNlbW92ZSIsImNsaWVudFgiLCJjbGllbnRZIiwiU2NlbmUiLCJncmFwaCIsIl92aXMiLCJvYmplY3QiLCJfZ3JhcGgiLCJzaG9ydGVzdCIsInNoYXBlX2lkIiwidmVydGV4IiwibyIsImVxdWFscyIsImciLCJhZGR2ZXJ0ZXgiLCJOdW1iZXIiLCJuZSIsIkEiLCJCIiwidGVzdGVkZ2UiLCJlZGdldmlzaWJpbHR5IiwiYWRkZWRnZSIsImNvc3QiLCJzcXJ0IiwicmVzIiwiR3JhcGgiLCJ2ZXJ0aWNlcyIsIm51bWVkZ2VzIiwidjEiLCJ2MiIsImRlc3QiLCJjdXJyZW50X25vZGUiLCJkaXN0IiwicHJldiIsInVudmlzaXRlZCIsIk1BWF9WQUxVRSIsInNoaWZ0IiwibmVpZ2hib3VyIiwidGVudGF0aXZlX2Rpc3QiLCJzZXEiLCJyZXZlcnNlIiwiUmVuZGVyZXIiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiY29sb3VyIiwiQXJyYXkiLCJpc0FycmF5IiwiYmVnaW5QYXRoIiwiYXJjIiwiZmlsbFN0eWxlIiwiZmlsbCIsIl9saW5lIiwidyIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFF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bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1ZDJiZmRkMjNhMDExYzFjYTFlZSIsIlxuXG5mdW5jdGlvbiBTcXVhcmUoeCwgeSwgc2l6ZSlcbntcbiAgbGV0IGhzaXplID0gc2l6ZT4+MTtcbiAgbGV0IHNxID0gW107XG4gIC8vIG9yIGp1c3QgbWFrZSBhIHVuaXQgc3F1YXJlIGFuZCBzY2FsZSBpdCB1cCBkdWggOnxcbiAgLy8gdG9wIGxlZnRcbiAgc3EucHVzaCggW3ggLSBoc2l6ZSwgeSAtIGhzaXplXSApO1xuICAvLyB0b3AgcmlnaHRcbiAgc3EucHVzaCggW3ggKyBoc2l6ZSwgeSAtIGhzaXplXSApO1xuICAvLyBib3R0b20gcmlnaHRcbiAgc3EucHVzaCggW3ggKyBoc2l6ZSwgeSArIGhzaXplXSApO1xuICAvLyBib3R0b20gbGVmdFxuICBzcS5wdXNoKCBbeCAtIGhzaXplLCB5ICsgaHNpemVdICk7XG4gIC8vIHRvcCBsZWZ0IGFnYWluXG4gIHNxLnB1c2goIFt4IC0gaHNpemUsIHkgLSBoc2l6ZV0gKTtcblxuICByZXR1cm4gc3E7XG59XG5cbmZ1bmN0aW9uIHJvdGF0ZShzaGFwZSwgcngsIHJ5LCBkYSlcbntcbiAgZm9yIChsZXQgcGFpciBvZiBzaGFwZSlcbiAge1xuICAgIHBhaXIgPSByb3RhdGVfcG9pbnQocngsIHJ5LCBkYSwgcGFpcik7XG4gIH1cblxufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGUoc2hhcGUsIGR4LCBkeSlcbntcbiAgZm9yIChsZXQgcGFpciBvZiBzaGFwZSlcbiAge1xuICAgIHBhaXJbMF0gKz0gZHg7XG4gICAgcGFpclsxXSArPSBkeTtcbiAgfVxufVxuXG5mdW5jdGlvbiByb3RhdGVfcG9pbnQoY3gsIGN5LCBhbmdsZSwgcClcbntcbiAgbGV0IHMgPSBNYXRoLnNpbihhbmdsZSk7XG4gIGxldCBjID0gTWF0aC5jb3MoYW5nbGUpO1xuXG4gIC8vIHRyYW5zbGF0ZSBwb2ludCBiYWNrIHRvIG9yaWdpbjpcbiAgcFswXSAtPSBjeDtcbiAgcFsxXSAtPSBjeTtcblxuICAvLyByb3RhdGUgcG9pbnRcbiAgbGV0IHhuZXcgPSBwWzBdICogYyAtIHBbMV0gKiBzO1xuICBsZXQgeW5ldyA9IHBbMF0gKiBzICsgcFsxXSAqIGM7XG5cbiAgLy8gdHJhbnNsYXRlIHBvaW50IGJhY2s6XG4gIHBbMF0gPSB4bmV3ICsgY3g7XG4gIHBbMV0gPSB5bmV3ICsgY3k7XG5cbiAgcmV0dXJuIHA7XG59XG5cbi8qKlxuICogQGF1dGhvciBQZXRlciBLZWxsZXlcbiAqIEBhdXRob3IgcGdrZWxsZXk0QGdtYWlsLmNvbVxuICovXG4vKipcbiAqIFNlZSBpZiB0d28gbGluZSBzZWdtZW50cyBpbnRlcnNlY3QuIFRoaXMgdXNlcyB0aGVcbiAqIHZlY3RvciBjcm9zcyBwcm9kdWN0IGFwcHJvYWNoIGRlc2NyaWJlZCBiZWxvdzpcbiAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzU2NTI4Mi83ODYzMzlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcCBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBzdGFydCBvZiB0aGUgMXN0IGxpbmUuXG4gKiBAcGFyYW0ge09iamVjdH0gcDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogIHJlcHJlc2VudGluZyB0aGUgZW5kIG9mIHRoZSAxc3QgbGluZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqICByZXByZXNlbnRpbmcgdGhlIHN0YXJ0IG9mIHRoZSAybmQgbGluZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBxMiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiAgcmVwcmVzZW50aW5nIHRoZSBlbmQgb2YgdGhlIDJuZCBsaW5lLlxuICovXG5cbmZ1bmN0aW9uIGludGVyc2VjdHMoYXAsIGFwMiwgYXEsIGFxMilcbntcbiAgLy8gQU06IE5vdGUgdG8gZGV2ZWxvcGVycywgdXNpbmcgbmFtZWQgcHJvcGVydGllcyBmb3IgdmVjdG9ycyBpcyByZXRhcmRlZC4gdGhhbmtzLlxuICByZXR1cm4gZG9MaW5lU2VnbWVudHNJbnRlcnNlY3QoIHt4OiBhcFswXSwgeTogYXBbMV19LCB7eDogYXAyWzBdLCB5OiBhcDJbMV19LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt4OiBhcVswXSwgeTogYXFbMV19LCB7eDogYXEyWzBdLCB5OiBhcTJbMV19ICk7XG59XG5cbmZ1bmN0aW9uIGlzX29uZV9iYm94X2NvbnRhaW5lZF9ieV90aGVfb3RoZXJfcXVlc3Rpb25tYXJrKHAsIHAyLCBxLCBxMilcbntcbiAgdmFyIGJveDEgPSB7XG4gICAgeG1pbjogTWF0aC5taW4ocC54LCBwMi54KSxcbiAgICB5bWluOiBNYXRoLm1pbihwLnksIHAyLnkpLFxuICAgIHhtYXg6IE1hdGgubWF4KHAueCwgcDIueCksXG4gICAgeW1heDogTWF0aC5tYXgocC55LCBwMi55KVxuICB9O1xuXG4gIHZhciBib3gyID0ge1xuICAgIHhtaW46IE1hdGgubWluKHEueCwgcTIueCksXG4gICAgeW1pbjogTWF0aC5taW4ocS55LCBxMi55KSxcbiAgICB4bWF4OiBNYXRoLm1heChxLngsIHEyLngpLFxuICAgIHltYXg6IE1hdGgubWF4KHEueSwgcTIueSlcbiAgfTtcblxuICByZXR1cm4gYmJveF9jb250YWluZWQoYm94MSwgYm94MikgfHwgYmJveF9jb250YWluZWQoYm94MiwgYm94MSk7XG59XG5cbmZ1bmN0aW9uIGJib3hfY29udGFpbmVkKGEsIGIpXG57XG4gIC8vIElzIEJveCBCIGNvbXBsZXRlbHkgaW5zaWRlIGJveCBBID9cbiAgcmV0dXJuIChiLnhtaW4gPj0gYS54bWluICYmIGIueG1heCA8PSBhLnhtYXgpICYmIChiLnltaW4gPj0gYS55bWluICYmIGIueW1heCA8PSBhLnltYXgpO1xufVxuXG5cbmZ1bmN0aW9uIGRvTGluZVNlZ21lbnRzSW50ZXJzZWN0KHAsIHAyLCBxLCBxMilcbntcbiAgLy8gdmFyIGRlYnVnX3N0cmluZyA9IGBkb0xpbmVTZWdtZW50c0ludGVyc2VjdDogKCR7cC54fSwgJHtwLnl9KS0oJHtwMi54fSwgJHtwMi55fSkgIHdpdGggICgke3EueH0sICR7cS55fSktKCR7cTIueH0sICR7cTIueX0pYDtcblxuXHR2YXIgciA9IHN1YnRyYWN0UG9pbnRzKHAyLCBwKTtcblx0dmFyIHMgPSBzdWJ0cmFjdFBvaW50cyhxMiwgcSk7XG5cblx0dmFyIHVOdW1lcmF0b3IgPSBjcm9zc1Byb2R1Y3Qoc3VidHJhY3RQb2ludHMocSwgcCksIHIpO1xuXHR2YXIgZGVub21pbmF0b3IgPSBjcm9zc1Byb2R1Y3Qociwgcyk7XG5cblx0aWYgKHVOdW1lcmF0b3IgPT0gMCAmJiBkZW5vbWluYXRvciA9PSAwKSB7XG5cdFx0Ly8gVGhleSBhcmUgY29MbGluZWFyXG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvcGxhbmFyXCIpO1xuXG5cdFx0Ly8gRG8gdGhleSB0b3VjaD8gKEFyZSBhbnkgb2YgdGhlIHBvaW50cyBlcXVhbD8pXG5cdFx0aWYgKGVxdWFsUG9pbnRzKHAsIHEpIHx8IGVxdWFsUG9pbnRzKHAsIHEyKSB8fCBlcXVhbFBvaW50cyhwMiwgcSkgfHwgZXF1YWxQb2ludHMocDIsIHEyKSkge1xuXHRcdFx0cmV0dXJuIHtcbiAgICAgICAgaW50ZXJzZWN0OiB0cnVlLFxuICAgICAgICBraXNzOiAhaXNfb25lX2Jib3hfY29udGFpbmVkX2J5X3RoZV9vdGhlcl9xdWVzdGlvbm1hcmsocCwgcDIsIHEsIHEyKVxuICAgICAgfTtcblxuXHRcdH1cblx0XHQvLyBEbyB0aGV5IG92ZXJsYXA/IChBcmUgYWxsIHRoZSBwb2ludCBkaWZmZXJlbmNlcyBpbiBlaXRoZXIgZGlyZWN0aW9uIHRoZSBzYW1lIHNpZ24pXG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIlBvaW50cyBET05UIHRvdWNoXCIpO1xuXG5cdFx0cmV0dXJuIHtcbiAgICAgIGludGVyc2VjdDpcbiAgICAgICAgICAgICFhbGxFcXVhbChcbiAgICAgIFx0XHRcdFx0KHEueCAtIHAueCA8IDApLFxuICAgICAgXHRcdFx0XHQocS54IC0gcDIueCA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueCAtIHAueCA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueCAtIHAyLnggPCAwKSkgfHxcbiAgICAgIFx0XHRcdCFhbGxFcXVhbChcbiAgICAgIFx0XHRcdFx0KHEueSAtIHAueSA8IDApLFxuICAgICAgXHRcdFx0XHQocS55IC0gcDIueSA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueSAtIHAueSA8IDApLFxuICAgICAgXHRcdFx0XHQocTIueSAtIHAyLnkgPCAwKSksXG4gICAgICAgIGtpc3M6IGZhbHNlXG4gICAgICB9O1xuXG5cdH1cblxuXHRpZiAoZGVub21pbmF0b3IgPT0gMCkge1xuXHRcdC8vIGxpbmVzIGFyZSBwYXJhbGVsbFxuXHRcdHJldHVybiB7aW50ZXJzZWN0OiBmYWxzZSwga2lzczogZmFsc2V9O1xuXHR9XG5cblx0dmFyIHUgPSB1TnVtZXJhdG9yIC8gZGVub21pbmF0b3I7XG5cdHZhciB0ID0gY3Jvc3NQcm9kdWN0KHN1YnRyYWN0UG9pbnRzKHEsIHApLCBzKSAvIGRlbm9taW5hdG9yO1xuXG4gIC8vIGNvbnNvbGUubG9nKGB0PSR7dH0sIHU9JHt1fWApO1xuICB2YXIga2lzcyA9IGZhbHNlO1xuXG4gIGlmIChlcXVhbFBvaW50cyhwLCBxKSB8fCBlcXVhbFBvaW50cyhwLCBxMikgfHwgZXF1YWxQb2ludHMocDIsIHEpIHx8IGVxdWFsUG9pbnRzKHAyLCBxMikpXG4gICAga2lzcyA9IHRydWU7XG5cbiAgLy8gbGV0IHJlcyA9XG4gIC8vcmV0dXJuXG4gIHJldHVybiB7XG4gICAgaW50ZXJzZWN0OiAodCA+PSAwKSAmJiAodCA8PSAxKSAmJiAodSA+PSAwKSAmJiAodSA8PSAxKSxcbiAgICBraXNzOiBraXNzXG4gIH07XG5cbiAgLy8gY29uc29sZS5sb2coYCR7ZGVidWdfc3RyaW5nfSA9ICR7cmVzfWApO1xuXG5cdC8vIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHRoZSB0d28gcG9pbnRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDEgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MiBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKlxuICogQHJldHVybiB0aGUgY3Jvc3MgcHJvZHVjdCByZXN1bHQgYXMgYSBmbG9hdFxuICovXG5mdW5jdGlvbiBjcm9zc1Byb2R1Y3QocG9pbnQxLCBwb2ludDIpIHtcblx0cmV0dXJuIHBvaW50MS54ICogcG9pbnQyLnkgLSBwb2ludDEueSAqIHBvaW50Mi54O1xufVxuXG4vKipcbiAqIFN1YnRyYWN0IHRoZSBzZWNvbmQgcG9pbnQgZnJvbSB0aGUgZmlyc3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50MSBwb2ludCBvYmplY3Qgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQyIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcmV0dXJuIHRoZSBzdWJ0cmFjdGlvbiByZXN1bHQgYXMgYSBwb2ludCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gc3VidHJhY3RQb2ludHMocG9pbnQxLCBwb2ludDIpIHtcblx0dmFyIHJlc3VsdCA9IHt9O1xuXHRyZXN1bHQueCA9IHBvaW50MS54IC0gcG9pbnQyLng7XG5cdHJlc3VsdC55ID0gcG9pbnQxLnkgLSBwb2ludDIueTtcblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFNlZSBpZiB0aGUgcG9pbnRzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnQxIHBvaW50IG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludDIgcG9pbnQgb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlc1xuICpcbiAqIEByZXR1cm4gaWYgdGhlIHBvaW50cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gZXF1YWxQb2ludHMocG9pbnQxLCBwb2ludDIpIHtcblx0cmV0dXJuIChwb2ludDEueCA9PSBwb2ludDIueCkgJiYgKHBvaW50MS55ID09IHBvaW50Mi55KVxufVxuXG4vKipcbiAqIFNlZSBpZiBhbGwgYXJndW1lbnRzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0gey4uLn0gYXJncyBhcmd1bWVudHMgdGhhdCB3aWxsIGJlIGNvbXBhcmVkIGJ5ICc9PScuXG4gKlxuICogQHJldHVybiBpZiBhbGwgYXJndW1lbnRzIGFyZSBlcXVhbFxuICovXG5mdW5jdGlvbiBhbGxFcXVhbChhcmdzKSB7XG5cdHZhciBmaXJzdFZhbHVlID0gYXJndW1lbnRzWzBdLFxuXHRcdGk7XG5cdGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRpZiAoYXJndW1lbnRzW2ldICE9IGZpcnN0VmFsdWUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5cblxuXG5leHBvcnQge1NxdWFyZSwgaW50ZXJzZWN0cywgcm90YXRlLCB0cmFuc2xhdGV9IDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9VdGlsLmpzIiwiXG5pbXBvcnQgU2NlbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9TY2VuZSc7XG5pbXBvcnQgUmVuZGVyZXIgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQge1NxdWFyZSwgcm90YXRlLCB0cmFuc2xhdGV9ICAgICAgZnJvbSAnLi9VdGlsJztcblxuY29uc3QgZWxlbWVudCA9ICdkaXNwbGF5JztcblxubGV0IHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKGVsZW1lbnQpO1xubGV0IHNjZW5lID0gbmV3IFNjZW5lKCk7XG5cbi8vIFNob3cvaGlkZSB0aGUgc2NlbmUgZ3JhcGhcbmxldCBkZWJ1ZyA9IHRydWU7XG5cbi8vIFN0YXJ0IHBvaW50IGFuZCBvdXIgZ29hbFxubGV0IHN0YXJ0ID0gWzEwLCAxMF07XG5sZXQgZW5kID0gWzM4MCwgNDIwXTtcblxuLy8gRm9yIHRoZSBzaGFwZSBhbmltYXRpb25zXG5sZXQgcm90eCA9IDUwMCwgcm90eSA9IDE1MDtcbmxldCBtb3Rpb24gPSAwLCByb3RhID0gMDtcblxuLy8gQ3JlYXRlIHNvbWUgc2ltcGxlIG9ic3RhY2xlcyAoYWNjZXB0cyBzaW1wbGUgbi1zaWRlZCBwb2x5Z29ucylcbmxldCBzcV9zbWFsbCA9IFNxdWFyZSgxMjAsIDEwMCwgMTAwKTtcbmxldCBzcV9tZWQgICA9IFNxdWFyZSgyMDAsIDMxMCwgMTUwKTtcbmxldCBzcV9sYXJnZSA9IFNxdWFyZShyb3R4LCByb3R5LCAyMDApO1xuXG4vLyBBZGQgdGhlbSB0byB0aGUgc2NlbmVcbnNjZW5lLmFkZCggc3Ffc21hbGwgKTtcbnNjZW5lLmFkZCggc3FfbWVkICk7XG5zY2VuZS5hZGQoIHNxX2xhcmdlICk7XG5cbmZyYW1lKCk7XG5cbmZ1bmN0aW9uIGZyYW1lKClcbntcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBmcmFtZSApO1xuXG4gIC8vIEZpbmQgdGhlIHNob3J0ZXN0IHBhdGguIFR3byB0aGluZ3MgaGFwcGVuIGhlcmU6XG4gIC8vICAgIDEuIEEgU2NlbmUgZ3JhcGggaXMgZXh0cmFjdGVkIGZyb20gb3VyIHNjZW5lIGdlb21ldHJ5XG4gIC8vICAgIDIuIERpamtzdHJhJ3MgbWV0aG9kIGlzIHVzZWQgdG8gZmluZCB0aGUgb3B0aW1hbCByb3V0ZSBhY3Jvc3MgdGhlIGdyYXBoXG4gIGxldCByb3V0ZSA9IHNjZW5lLnNvbHZlKCBzdGFydCwgZW5kICk7XG5cbiAgLy8gR2V0IGEgdmlzdWFsaXNhdGlvbiBvZiB0aGUgYWN0dWFsIHNjZW5lZ3JhcGhcbiAgbGV0IHZpcyA9IHNjZW5lLnZpcygpO1xuXG4gIHJlbmRlcmVyLmNsZWFyKCk7XG5cbiAgaWYgKGRlYnVnKVxuICB7XG4gICAgLy8gRHJhdyB0aGUgc2NlbmUgZ3JhcGggbm9kZXNcbiAgICBmb3IgKGxldCBuIG9mIHZpcy5ub2RlcylcbiAgICAgIHJlbmRlcmVyLnJlbmRlciggbiwgJyNkZGQnLCA1ICk7XG5cbiAgICAvLyBEcmF3IHRoZSBncmFwaCBlZGdlc1xuICAgIHJlbmRlcmVyLnJlbmRlciggdmlzLmVkZ2VzLCAnI2RkZCcgKTtcbiAgfVxuXG4gIC8vIFJlbmRlciB0aGUgb3JpZ2luYWwgc2NlbmUgZ2VvbWV0cnkgb24gdG9wIG9mIHRoZSBncmFwaFxuICByZW5kZXJlci5yZW5kZXIoIHN0YXJ0LCAnIzBhMCcsIDYgKTtcbiAgcmVuZGVyZXIucmVuZGVyKCBlbmQsICcjMDhmJywgNiApO1xuICByZW5kZXJlci5yZW5kZXIoIHNjZW5lLm9iamVjdHMsICcjMzMzJyApO1xuXG4gIC8vIE5vdyBkaXNwbGF5IHRoZSBmb3VuZCByb3V0ZSFcbiAgcmVuZGVyZXIucmVuZGVyKCBbcm91dGVdLCAnI2YwMCcsIDMgKTtcblxuICAvLyBBbmltYXRpb25cbiAgbW90aW9uICs9IDAuMDU7IC8vIFNpbnVzb2lkYWxcbiAgdHJhbnNsYXRlKHNxX3NtYWxsLCAzICogTWF0aC5zaW4obW90aW9uICogMC4yNSAqIE1hdGguUEkpLCAwKTtcblxuICAvLyByb3RhdGUgdGhlIGJpZyBzcXVhcmVcbiAgcm90YXRlKHNxX2xhcmdlLCByb3R4LCByb3R5LCAwLjAwNSk7XG5cbn1cblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NiX2RlYnVnJykub25jbGljayA9IChlLCBjKSA9PiB7XG4gIGRlYnVnID0gZS5zcmNFbGVtZW50LmNoZWNrZWQ7XG59XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpLm9ubW91c2Vtb3ZlID0gZSA9PiB7XG4gIGVuZCA9IFtlLmNsaWVudFgsIGUuY2xpZW50WV07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuaW1wb3J0IEdyYXBoICAgICAgICAgIGZyb20gJy4vR3JhcGgnO1xuaW1wb3J0IHtpbnRlcnNlY3RzfSAgIGZyb20gJy4vVXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHRoaXMub2JqZWN0cyA9IFtdO1xuICAgIHRoaXMuZ3JhcGggPSBudWxsO1xuXG4gICAgLy8gVGhpcyBpcyBqdXN0IGZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICB0aGlzLl92aXMgPSBudWxsO1xuICB9XG5cbiAgYWRkKG9iamVjdClcbiAge1xuICAgIHRoaXMub2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gIH1cblxuICBzb2x2ZShzdGFydCwgZW5kKVxuICB7XG4gICAgdGhpcy5ncmFwaCA9IHRoaXMuX2dyYXBoKHN0YXJ0LCBlbmQpO1xuICAgIGxldCBub2RlcyA9IHRoaXMuZ3JhcGguc2hvcnRlc3QoMCwgMSk7IC8vIFswXSBzdGFydCwgWzFdIGVuZCAoc2VlIC5ncmFwaCgpKVxuXG4gICAgbGV0IHJvdXRlID0gW107XG4gICAgZm9yIChsZXQgbiBvZiBub2RlcylcbiAgICB7XG4gICAgICByb3V0ZS5wdXNoKHRoaXMuX3Zpcy5ub2Rlc1sgbiBdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm91dGU7XG4gIH1cblxuICB2aXMoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpcztcbiAgfVxuXG4gIC8vIEV4dHJhY3QgYSBzY2VuZWdyYXBoIGZyb20gb3VyIGNvbnRpbnVvdXMgZXVjbGlkZWFuIGdlb21ldHJ5XG4gIF9ncmFwaChzdGFydCwgZW5kKVxuICB7XG4gICAgbGV0IG5vZGVzID0gW107XG4gICAgbGV0IGVkZ2VzID0gW107XG5cbiAgICAvLyBGb3IgdmlzdWFsaXNpbmcgdGhlIGdyYXBoXG4gICAgdGhpcy5fdmlzID0geyBub2RlczogW10sIGVkZ2VzOiBbXSB9O1xuXG4gICAgLy8gVGhpcyBpcyBqdXN0IGEgdGVtcCB2YWx1ZSB1c2VkIHRvIG1ha2Ugc3VyZSBzaGFwZXMgZG9uJ3QgcGVyZm9ybVxuICAgIC8vIGludGVyc2VjdGlvbiB0ZXN0cyBvbiB0aGVtc2VsdmVzIChhY3Jvc3MgdGhlaXIgb3duIHZlcnRpY2VzKVxuICAgIGxldCBzaGFwZV9pZCA9IDE7XG5cbiAgICAvLyBUaGVzZSBmaXJzdCB0d28gbm9kZXMgaW4gdGhlIGdyYXBoIGFyZSBhIHNwZWNpYWwgY2FzZVxuICAgIG5vZGVzLnB1c2goIHt2ZXJ0ZXg6IHN0YXJ0LCAgc2hhcGU6IHNoYXBlX2lkKyt9ICk7IC8vIFswXSBzdGFydCAoc2VlIC5zb2x2ZSgpKVxuICAgIG5vZGVzLnB1c2goIHt2ZXJ0ZXg6IGVuZCwgICAgc2hhcGU6IHNoYXBlX2lkKyt9ICk7IC8vIFsxXSBlbmRcblxuICAgIC8vIGV4dHJhY3QgZWFjaCBvYnN0YWNsZSdzIGVkZ2VzIGFuZCBub2Rlc1xuICAgIGZvciAobGV0IG8gb2YgdGhpcy5vYmplY3RzKVxuICAgIHtcbiAgICAgIHNoYXBlX2lkKys7XG5cbiAgICAgIGxldCBlO1xuICAgICAgZm9yIChlPTA7IGU8by5sZW5ndGgtMTsgZSsrKVxuICAgICAge1xuICAgICAgICBlZGdlcy5wdXNoKFtvW2VdLCBvW2UrMV1dKTtcblxuICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB2ZXJ0ZXg6IG9bZV0sXG4gICAgICAgICAgc2hhcGU6IHNoYXBlX2lkXG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgICAvLyB0aGlzIGlzbid0IGEgY2xvc2VkIHJpbmcgKG1hdGNoaW5nIHN0YXJ0IGFuZCBlbmRwKVxuICAgICAgaWYgKCFlcXVhbHMob1swXSwgb1tlXSkpXG4gICAgICAgIG5vZGVzLnB1c2goe1xuICAgICAgICAgIHZlcnRleDogb1tlXSxcbiAgICAgICAgICBzaGFwZTogc2hhcGVfaWRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGV0IGcgPSBuZXcgR3JhcGgoKTtcblxuICAgIC8vIEFkZCBgbm9kZXNgIGluZGljZXMgdG8gZ3JhcGhcbiAgICBmb3IgKGxldCBpIGluIG5vZGVzKVxuICAgIHtcbiAgICAgIGcuYWRkdmVydGV4KE51bWJlcihpKSk7XG5cbiAgICAgIC8vIEZvciB2aXN1YWxpc2luZyB0aGUgZ3JhcGhcbiAgICAgIHRoaXMuX3Zpcy5ub2Rlcy5wdXNoKG5vZGVzW051bWJlcihpKV0udmVydGV4KTtcbiAgICB9XG5cbiAgICAvLyBnLmFkZGVkZ2UoKTogcGVyaW1ldGVyIG9mIGFsbCBvYnN0YWNsZXNcblxuICAgIGxldCBuZT0wO1xuXG4gICAgZm9yIChsZXQgeD0wOyB4PG5vZGVzLmxlbmd0aC0xOyB4KyspXG4gICAgICBmb3IgKGxldCB5PXgrMTsgeTxub2Rlcy5sZW5ndGg7IHkrKylcbiAgICAgIHtcbiAgICAgICAgICBsZXQgQSA9IG5vZGVzW3hdO1xuICAgICAgICAgIGxldCBCID0gbm9kZXNbeV07XG5cbiAgICAgICAgICAvLyBXZSdyZSB0ZXN0aW5nIHRoZSBzaGFwZSdzIHZlcnRpY2VzIGFnYWluc3QgaXRzZWxmXG4gICAgICAgICAgLy8gd2hpY2ggbGVhZHMgdG8gaW50ZXJuYWwgcGF0aHMgaW5zaWRlIHRoZSBzaGFwZSAoaW52YWxpZCEpXG4gICAgICAgICAgaWYgKEEuc2hhcGUgPT0gQi5zaGFwZSkgY29udGludWU7XG5cbiAgICAgICAgICBsZXQgdGVzdGVkZ2UgPSBbQS52ZXJ0ZXgsIEIudmVydGV4XTtcblxuICAgICAgICAgIGlmIChlZGdldmlzaWJpbHR5KHRlc3RlZGdlLCBlZGdlcykpXG4gICAgICAgICAge1xuICAgICAgICAgICAgZy5hZGRlZGdlKHgsIHksIGNvc3QoQS52ZXJ0ZXgsIEIudmVydGV4KSk7XG5cbiAgICAgICAgICAgIC8vIEp1c3QgZm9yIHZpc3VhbGlzaW5nIHRoZSBncmFwaCwgbm9uLWVzc2VudGlhbDpcbiAgICAgICAgICAgIHRoaXMuX3Zpcy5lZGdlcy5wdXNoKFtBLnZlcnRleCwgQi52ZXJ0ZXhdKTtcbiAgICAgICAgICB9XG5cbiAgICAgIH1cblxuXG4gICAgcmV0dXJuIGc7XG4gIH1cblxufVxuXG5cblxuZnVuY3Rpb24gY29zdChhLCBiKVxue1xuICBsZXQgZHggPSBiWzBdIC0gYVswXSAvLyB4MiAtIHgxXG4gIGxldCBkeSA9IGJbMV0gLSBhWzFdO1xuICByZXR1cm4gTWF0aC5zcXJ0KCBkeCpkeCArIGR5KmR5ICk7XG5cbn1cblxuZnVuY3Rpb24gZWRnZXZpc2liaWx0eSh0ZXN0ZWRnZSwgZWRnZXMpXG57XG4gIC8vIGNvbnNvbGUubG9nKGBUZXN0aW5nIGVkZ2U6ICR7dGVzdGVkZ2VbMF19LCAke3Rlc3RlZGdlWzFdfWApO1xuXG4gIGZvciAobGV0IHQ9MDsgdDxlZGdlcy5sZW5ndGg7IHQrKylcbiAge1xuICAgIGxldCBlID0gZWRnZXNbdF07XG5cbiAgICBsZXQgcmVzID0gaW50ZXJzZWN0cyh0ZXN0ZWRnZVswXSwgdGVzdGVkZ2VbMV0sIGVbMF0sIGVbMV0pO1xuXG4gICAgLy8gSWYgaW50ZXJzZWN0aW9uLCBjaGVjayBpdCdzIG5vdCBqdXN0IHRoZSBlbmRwb2ludHMga2lzc2luZyB3aGljaCBpcyBva1xuICAgIC8vIGluIGZhY3QsIGl0J3MgbW9yZSB0aGFuICdvaycgLSBpdCdzIGV4YWN0bHkgd2hhdCB3ZSdyZSBsb29raW5nIGZvclxuICAgIGlmIChyZXMuaW50ZXJzZWN0ICYmICFyZXMua2lzcylcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cblxuZnVuY3Rpb24gZXF1YWxzKGEsIGIpXG57XG4gIHJldHVybiAoYVswXSA9PSBiWzBdICYmIGFbMV0gPT0gYlsxXSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU2NlbmUuanMiLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHRoaXMudmVydGljZXMgPSBbXTtcbiAgICB0aGlzLmVkZ2VzID0gW107XG4gICAgdGhpcy5udW1lZGdlcyA9IDA7XG4gIH1cblxuICBhZGR2ZXJ0ZXgobilcbiAge1xuICAgIHRoaXMudmVydGljZXMucHVzaChuKTtcbiAgICB0aGlzLmVkZ2VzW25dID0gW107XG4gIH1cblxuICBhZGRlZGdlKHYxLCB2MiwgY29zdClcbiAge1xuICAgIHRoaXMuZWRnZXNbdjFdLnB1c2goe2Rlc3Q6djIsIGNvc3R9KTtcbiAgICB0aGlzLmVkZ2VzW3YyXS5wdXNoKHtkZXN0OnYxLCBjb3N0fSk7XG5cbiAgICB0aGlzLm51bWVkZ2VzKys7XG4gIH1cblxuICAvLyBTdXBlciBiYXNpYyBpbXBsZW1lbnRhdGlvbiBvZiBEaWprc3RyYSdzIGFsZ29yaXRobVxuICAvLyBEaXJlY3RseSBmcm9tIHRoaXMgcmVjaXBlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EaWprc3RyYSUyN3NfYWxnb3JpdGhtI0FsZ29yaXRobVxuICBzaG9ydGVzdChzdGFydCwgZW5kKVxuICB7XG4gICAgbGV0IGN1cnJlbnRfbm9kZTtcbiAgICBsZXQgZGlzdCA9IFswXTtcbiAgICBsZXQgcHJldiA9IFtdO1xuICAgIGxldCB1bnZpc2l0ZWQgPSBbXTtcblxuICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnZlcnRpY2VzLmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgIGlmIChpKSBkaXN0W2ldID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgIHVudmlzaXRlZFtpXSA9IGk7XG4gICAgICBwcmV2W2ldID0gbnVsbDtcbiAgICB9XG5cbiAgICB3aGlsZSggKGN1cnJlbnRfbm9kZSA9IHVudmlzaXRlZC5zaGlmdCgpKSAhPSBudWxsIClcbiAgICB7XG4gICAgICBmb3IgKGxldCB0PTA7IHQ8dGhpcy5lZGdlc1tjdXJyZW50X25vZGVdLmxlbmd0aDsgdCsrKVxuICAgICAge1xuICAgICAgICAvLyB2ZXJ0ZXgvbm9kZSBJRFxuICAgICAgICBsZXQgbmVpZ2hib3VyID0gdGhpcy5lZGdlc1tjdXJyZW50X25vZGVdW3RdLmRlc3Q7XG5cbiAgICAgICAgLy8gRGlzdGFuY2UgZnJvbSBjdXJyZW50X25vZGUgdG8gbmVpZ2hib3VyXG4gICAgICAgIGxldCBjb3N0ID0gdGhpcy5lZGdlc1tjdXJyZW50X25vZGVdW3RdLmNvc3Q7XG5cbiAgICAgICAgLy8gRGlzdGFuY2UgdGh1cyBmYXIgb24gdGhpcyByb3V0ZSAodXAgdG8gY3VycmVudF9ub2RlKSArIGRpc3RhbmNlIHRvIG5laWdoYm91clxuICAgICAgICBsZXQgdGVudGF0aXZlX2Rpc3QgPSBkaXN0W2N1cnJlbnRfbm9kZV0gKyBjb3N0O1xuXG4gICAgICAgIC8vIEhhdmUgd2UgZm91bmQgYSBzaG9ydGVyIHBhdGg/XG4gICAgICAgIGlmICh0ZW50YXRpdmVfZGlzdCA8IGRpc3RbbmVpZ2hib3VyXSlcbiAgICAgICAge1xuICAgICAgICAgIGRpc3RbbmVpZ2hib3VyXSA9IHRlbnRhdGl2ZV9kaXN0OyAvLyBOZXcgZGlzdGFuY2UgdG8gdGhpcyBub2RlXG4gICAgICAgICAgcHJldltuZWlnaGJvdXJdID0gY3VycmVudF9ub2RlOyAgIC8vIFVwZGF0ZSB0aGUgcm91dGVcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGMgPSBlbmQsIHNlcSA9W2VuZF07XG5cbiAgICAvLyBmYWlsZWQgZm9yIHNvbWUgcmVhc29uLCBlLmcuIGltcG9zc2libGUgcG9pbnQgaW5zaWRlIG51bGxzcGFjZSBldGNcbiAgICBpZiAocHJldltjXSA9PSBudWxsKVxuICAgICAgcmV0dXJuIFtdO1xuXG4gICAgZG8ge1xuICAgICAgYyA9IHByZXZbY107XG4gICAgICBzZXEucHVzaChjKTtcbiAgICB9IHdoaWxlKGMgIT0gc3RhcnQpO1xuXG4gICAgcmV0dXJuIHNlcS5yZXZlcnNlKCk7XG5cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvR3JhcGguanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXJcbntcbiAgY29uc3RydWN0b3IoZWxlbWVudClcbiAge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICB9XG5cbiAgY2xlYXIoKVxuICB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgcmVuZGVyKG9iamVjdHMsIGNvbG91ciA9ICcjMDAwJywgd2lkdGggPSAyKVxuICB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdHMpKSByZXR1cm47XG5cbiAgICAvLyBwb2ludCB0eXBlXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdHNbMF0pKVxuICAgIHtcbiAgICAgIGNvbnN0IHAgPSBvYmplY3RzO1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LmFyYyhwWzBdPj4wLCBwWzFdPj4wLCB3aWR0aCwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvdXI7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgLy8gbGlzdCBvZiBzaGFwZXMgdHlwZVxuXG4gICAgICBmb3IgKGxldCBvIG9mIG9iamVjdHMpXG4gICAgICB7XG4gICAgICAgIGZvciAobGV0IGU9MDsgZTxvLmxlbmd0aC0xOyBlKyspXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLl9saW5lKG9bZV0sIG9bZSsxXSwgY29sb3VyLCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgX2xpbmUoYSwgYiwgYywgdylcbiAge1xuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB3O1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGMgfHwgJ2JsYWNrJztcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhhWzBdPj4wLGFbMV0+PjApO1xuICAgIHRoaXMuY29udGV4dC5saW5lVG8oYlswXT4+MCxiWzFdPj4wKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlcmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==