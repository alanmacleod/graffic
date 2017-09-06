
import Graph          from './Graph';
import {intersects}   from './Util';

export default class Scene
{
  constructor()
  {
    this.objects = [];
  }

  add(object)
  {
    this.objects.push(object);
  }

  solve(start, end)
  {
    let g = this._graph(start, end);
    return g.shortest(0, 1); // [0] start, [1] end (see .graph())
  }

  // Extract a scenegraph from our continuous euclidean geometry
  _graph(start, end)
  {
    let nodes = [];
    let edges = [];

    // This is just a temp value used to make sure shapes don't perform
    // intersection tests on themselves (across their own vertices)
    let shape_id = 1;

    nodes.push( {vertex: start,  shape: shape_id++} ); // [0] start (see .solve())
    nodes.push( {vertex: end,    shape: shape_id++} ); // [1] end

    for (let o of this.objects)
    {
      // extract each obstacle's edges and nodes
      shape_id++;

      let e;
      for (e=0; e<o.length-1; e++)
      {
        edges.push([o[e], o[e+1]]);

        nodes.push({
          vertex: o[e],
          shape: shape_id
        });

      }

      // this isn't a closed ring (matching start and endp)
      if (!equals(o[0], o[e]))
        nodes.push({
          vertex: o[e],
          shape: shape_id
        });
    }

    let g = new Graph();

    // Add `nodes` indices to graph

    for (let i in nodes)
      g.addvertex(Number(i));

    // g.addedge(): perimeter of all obstacles

    let ne=0;

    for (let x=0; x<nodes.length-1; x++)
      for (let y=x+1; y<nodes.length; y++)
      {
          let A = nodes[x];
          let B = nodes[y];

          // We're testing the shape's vertices against itself
          // which leads to internal paths inside the shape (invalid!)
          if (A.shape == B.shape) continue;

          let testedge = [A.vertex, B.vertex];

          if (edgevisibilty(testedge, edges))
          {
            g.addedge(x, y, cost(A.vertex, B.vertex));
          }

      }

    return g;
  }

}

function cost(a, b)
{
  let dx = b[0] - a[0] // x2 - x1
  let dy = b[1] - a[1];
  return Math.sqrt( dx*dx + dy*dy );

}

function edgevisibilty(testedge, edges)
{
  // console.log(`Testing edge: ${testedge[0]}, ${testedge[1]}`);

  for (let t=0; t<edges.length; t++)
  {
    let e = edges[t];

    let res = intersects(testedge[0], testedge[1], e[0], e[1]);

    // If intersection, check it's not just the endpoints kissing which is ok
    // in fact, it's more than 'ok' - it's exactly what we're looking for
    if (res.intersect && !res.kiss)
      return false;

  }

  return true;
}


function equals(a, b)
{
  return (a[0] == b[0] && a[1] == b[1]);
}
