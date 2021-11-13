import Tool from "./Tool";
import { RefObject } from "react";

// Наследуется от класса Tool
export default class Brush extends Tool {
  mouseDown: boolean | null = null;
  constructor(canvas: RefObject<HTMLCanvasElement>) {
    // Функция super будет вызывать конструктор родительского класса, в нее передаем canvas
    super(canvas);
    this.listen();
  }

  // После создания объекта, canvas будет слушать все эти функции - запускаем в конструкторе
  listen() {
    this.canvas!.current!.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas!.current!.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas!.current!.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(event: MouseEvent) {
    this.mouseDown = false;
  }

  mouseDownHandler(event: any) {
    this.mouseDown = true;
    this.context!.beginPath();
    this.context!.moveTo(
      event.pageX - event.target.offsetLeft,
      event.pageY - event.target.offsetLeft
    );
  }

  mouseMoveHandler(event: any) {
    console.log(event.target.offsetLeft);
    console.log(event.target.offsetTop);

    if (this.mouseDown) {
      this.draw(
        event.pageX - event.target.offsetLeft,
        event.pageY - event.pageY - event.target.offsetTop
      );
    }
  }

  draw(x: number, y: number) {
    this.context!.lineTo(x, y);
    this.context!.stroke();
  }
}
