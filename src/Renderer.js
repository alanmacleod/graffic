

export default class Renderer
{
  constructor(element)
  {
    this.element = document.getElementById(element);
    this.context = this.element.getContext('2d');
  }

  render(objects, colour = '#000')
  {
    if (!Array.isArray(objects)) return;

    // point type
    if (!Array.isArray(objects[0]))
    {
      const p = objects;
      this.context.beginPath();
      this.context.arc(p[0], p[1], 5, 0, 2 * Math.PI, false);
      this.context.fillStyle = colour;
      this.context.fill();
    } else {

      for (let o of objects)
      {
        for (let e=0; e<o.length-1; e++)
        {
          this._line(o[e], o[e+1], colour);
        }
      }

    }

  }

  _line(a, b, c)
  {
    this.context.lineWidth = 2;
    this.context.strokeStyle = c || 'black';
    this.context.beginPath();
    this.context.moveTo(a[0],a[1]);
    this.context.lineTo(b[0],b[1]);
    this.context.stroke();
  }

}
