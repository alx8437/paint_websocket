import { RefObject } from "react";

export default class Tool {
  canvas: RefObject<HTMLCanvasElement> | null = null;
  context: CanvasRenderingContext2D | null | undefined = null;
  constructor(canvas: RefObject<HTMLCanvasElement>) {
    this.canvas = canvas;
    this.context = canvas.current!.getContext("2d");
    this.destroyEvents();
  }

  // Если объект поменяется, слушатели в дочернем классе остануться, создаем очистку событий
  destroyEvents() {
    this.canvas!.current!.onmousemove = null;
    this.canvas!.current!.onmousedown = null;
    this.canvas!.current!.onmouseup = null;
  }
}
