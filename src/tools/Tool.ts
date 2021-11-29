export default class Tool {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null | undefined = null;
  constructor(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
    this.context = canvas!.getContext("2d");
    this.destroyEvents();
  }

  // Если объект поменяется, слушатели в дочернем классе остануться, создаем очистку событий
  destroyEvents() {
    this.canvas!.onmousemove = null;
    this.canvas!.onmousedown = null;
    this.canvas!.onmouseup = null;
  }
}
