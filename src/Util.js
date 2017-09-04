

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


export default gen_square ;
