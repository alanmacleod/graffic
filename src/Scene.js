

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

  journey(start, end)
  {
    this.start = start;
    this.end = end;
  }

  // Calculate a continuous graph from our euclidean geometry
  graph()
  {

  }

}
