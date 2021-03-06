
import Graph          from './Graph';
import {intersects}   from './Util';

export default class Scene
{
  constructor()
  {
    this.objects = [];
    this.graph = null;

    // This is just for visualising the graph
    this._vis = null;
  }

  add(object)
  {
    this.objects.push(object);
  }

  solve(start, end)
  {
    if (start == end) return;

    this.graph = this._graph(start, end);
    let nodes = this.graph.shortest(0, 1); // [0] start, [1] end (see .graph())

    let route = [];

    for (let n of nodes)
      route.push(this._vis.nodes[ n ]);

    return route;
  }

  vis()
  {
    return this._vis;
  }

  // Extract a scenegraph from our continuous euclidean geometry
  _graph(start, end)
  {
    let nodes = [];
    let edges = [];

    let g = new Graph();

    // For visualising the graph
    this._vis = { nodes: [], edges: [] };

    // This is just a temp value used to make sure shapes don't perform
    // intersection tests on themselves (their own vertices, crossing internally)
    let shape_id = 1;

    // These first two nodes in the graph are a special case
    nodes.push( {vertex: start,  shape: shape_id++} ); // [0] start (see .solve())
    nodes.push( {vertex: end,    shape: shape_id++} ); // [1] end

    let gedges = [];

    // extract each obstacle's edges and nodes
    for (let o of this.objects)
    {
      shape_id++;

      let e;
      let base = nodes.length;
      for (e=0; e<o.length-1; e++)
      {

        let v1 = base + e;
        // Ffs alan what a mess (n.b. it took 30 mins of debugging to get this line below correct)
        // it was originally (base + e + 1) % (o.length-1)) which is quite different.
        // I thought this was going to be such a difficult bug to fix, I nearly didn't bother trying.
        // tbh, these node/edge structures need a serious refactoring if ever this program is expanded!!!
        let v2 = base + ((e + 1) % (o.length-1));

        gedges.push({
          index:[v1, v2],
          vertex: [o[e], o[e+1]]
        });

        edges.push([o[e], o[e+1]]);

        nodes.push({
          vertex: o[e],
          shape: shape_id
        });

      }

      // this isn't a closed ring (matching start and endp)
      // i.e. a straight line.
      // Later: In hindsight, I shouldn't have bothered trying to
      // support essentially dimensionless entities like a two-sided straight line in 2d space.
      // everything should be a closed ring, even if it's ininitely small.
      if (!equals(o[0], o[e]))
        nodes.push({
          vertex: o[e],
          shape: shape_id
        });
    }

    // Add `nodes` indices to graph
    for (let i in nodes)
    {
      g.addvertex(Number(i));

      // For visualising the graph
      this._vis.nodes.push(nodes[Number(i)].vertex);
    }

    //TODO: refactor the node/edge data struct mess
    for (let ge of gedges)
    {
      g.addedge(ge.index[0], ge.index[1], cost(ge.vertex[0], ge.vertex[1]));
      this._vis.edges.push([ge.vertex[0], ge.vertex[1]]);
    }

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

            // Just for visualising the graph, non-essential:
            this._vis.edges.push([A.vertex, B.vertex]);
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
