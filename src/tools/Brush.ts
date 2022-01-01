import Tool from "./Tool";

// Наследуется от класса Tool
export default class Brush extends Tool {
  mouseDown: boolean | null = null;
  constructor(canvas: HTMLCanvasElement | null) {
    // Функция super будет вызывать конструктор родительского класса, в нее передаем canvas
    super(canvas);
    this.listen();
  }

  // После создания объекта, canvas будет слушать все эти функции - запускаем в конструкторе
  listen() {
    this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(event: MouseEvent) {
    this.mouseDown = false;
  }

  mouseDownHandler(event: any) {
    this.mouseDown = true;
    this.context!.beginPath();
    this.context!.moveTo(
      event.pageX - event.target.offsetLeft,
      event.pageY - event.target.offsetTop,
    );
  }

  mouseMoveHandler(event: any) {
    if (this.mouseDown) {
      this.draw(
        event.pageX - event.target.offsetLeft,
        event.pageY - event.target.offsetTop
      );
    }
  }

  draw(x: number, y: number) {
    this.context!.lineTo(x, y);
    this.context!.stroke();
  }
}
