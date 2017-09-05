

function gen_square(x, y, size)
{
  let hsize = size>>1;
  let sq = [];
  // or just make a unit square and scale it up duh :|
  // top left
  sq.push( [x - hsize, y - hsize] );
  // top right
  sq.push( [x + hsize, y - hsize] );
  // bottom right
  sq.push( [x + hsize, y + hsize] );
  // bottom left
  sq.push( [x - hsize, y + hsize] );
  // top left again
  sq.push( [x - hsize, y - hsize] );

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

function intersects(ap, ap2, aq, aq2)
{
  // AM: Note to developers, using named properties for vectors is retarded. thanks.
  return doLineSegmentsIntersect( {x: ap[0], y: ap[1]}, {x: ap2[0], y: ap2[1]},
                                  {x: aq[0], y: aq[1]}, {x: aq2[0], y: aq2[1]} );
}

function is_one_bbox_contained_by_the_other_questionmark(p, p2, q, q2)
{
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

function bbox_contained(a, b)
{
  // Is Box B completely inside box A ?
  return (b.xmin >= a.xmin && b.xmax <= a.xmax) && (b.ymin >= a.ymin && b.ymax <= a.ymax);
}


function doLineSegmentsIntersect(p, p2, q, q2)
{
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
      intersect:
            !allEqual(
      				(q.x - p.x < 0),
      				(q.x - p2.x < 0),
      				(q2.x - p.x < 0),
      				(q2.x - p2.x < 0)) ||
      			!allEqual(
      				(q.y - p.y < 0),
      				(q.y - p2.y < 0),
      				(q2.y - p.y < 0),
      				(q2.y - p2.y < 0)),
        kiss: false
      };

	}

	if (denominator == 0) {
		// lines are paralell
		return {intersect: false, kiss: false};
	}

	var u = uNumerator / denominator;
	var t = crossProduct(subtractPoints(q, p), s) / denominator;

  // console.log(`t=${t}, u=${u}`);
  var kiss = false;

  if (equalPoints(p, q) || equalPoints(p, q2) || equalPoints(p2, q) || equalPoints(p2, q2))
    kiss = true;

  // let res =
  //return
  return {
    intersect: (t >= 0) && (t <= 1) && (u >= 0) && (u <= 1),
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
	return (point1.x == point2.x) && (point1.y == point2.y)
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



export {gen_square, intersects} ;
