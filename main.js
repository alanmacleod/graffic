
// Add geometry to scene

// Add start point node

// Add endpoint node

// Line of sight test endpoint -> other endpoints (optimise! otherwise O(N2))

function intersects(a,b,c,d,  p,q,r,s)
{
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
}


// Create scene graph from vis endpoints

// Use Dijkstra or A* to find shortest route
