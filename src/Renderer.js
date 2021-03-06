

export default class Renderer
{
  constructor(element)
  {
    this.element = document.getElementById(element);
    this.context = this.element.getContext('2d');
  }

  clear()
  {
    this.context.clearRect(0, 0, this.element.width, this.element.height);
  }

  render(objects, colour = '#000', width = 2)
  {
    if (!Array.isArray(objects)) return;

    // point type
    if (!Array.isArray(objects[0]))
    {
      const p = objects;
      this.context.beginPath();
      this.context.arc(p[0]>>0, p[1]>>0, width, 0, 2 * Math.PI, false);
      this.context.fillStyle = colour;
      this.context.fill();
    } else {
    // list of shapes type

      for (let o of objects)
      {
        for (let e=0; e<o.length-1; e++)
        {
          this._line(o[e], o[e+1], colour, width);
        }
      }

    }

  }

  _line(a, b, c, w)
  {
    this.context.lineWidth = w;
    this.context.strokeStyle = c || 'black';
    this.context.beginPath();
    this.context.moveTo(a[0]>>0,a[1]>>0);
    this.context.lineTo(b[0]>>0,b[1]>>0);
    this.context.stroke();
  }

}
