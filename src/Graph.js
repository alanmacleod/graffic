

export default class Graph
{
  constructor()
  {
    this.vertices = [];
    this.edges = [];
    this.numedges = 0;
  }

  addvertex(n)
  {
    this.vertices.push(n);
    this.edges[n] = [];
  }

  addedge(v1, v2, cost)
  {
    this.edges[v1].push({dest:v2, cost});
    this.edges[v2].push({dest:v1, cost});

    this.numedges++;
  }

  shortest(start, end)
  {

  }

}
