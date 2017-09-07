
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

  // Super basic implementation of Dijkstra's algorithm
  // Directly from this recipe: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Algorithm
  shortest(start, end)
  {
    let current_node;
    let dist = [0];
    let prev = [];
    let unvisited = [];

    for (let i=0; i<this.vertices.length; i++)
    {
      if (i) dist[i] = Number.MAX_VALUE;
      unvisited[i] = i;
      prev[i] = null;
    }

    while( (current_node = unvisited.shift()) != null )
    {
      for (let t=0; t<this.edges[current_node].length; t++)
      {
        // vertex/node ID
        let neighbour = this.edges[current_node][t].dest;

        // Distance from current_node to neighbour
        let cost = this.edges[current_node][t].cost;

        // Distance thus far on this route (up to current_node) + distance to neighbour
        let tentative_dist = dist[current_node] + cost;

        // Have we found a shorter path?
        if (tentative_dist < dist[neighbour])
        {
          dist[neighbour] = tentative_dist; // New distance to this node
          prev[neighbour] = current_node;   // Update the route
        }

      }
    }

    let c = end, seq =[end];

    // failed for some reason, e.g. impossible point inside nullspace etc
    if (prev[c] == null)
      return [];

    do {
      c = prev[c];
      seq.push(c);
    } while(c != start);

    return seq.reverse();

  }

}
