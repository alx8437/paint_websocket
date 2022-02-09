export default class Tool {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null | undefined = null;
  constructor(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
    this.context = canvas!.getContext("2d");
    this.destroyEvents();
  }

  set fillColor(color: string) {
    this.context!.fillStyle = color
  }

  set strokeColor(color: string) {
    this.context!.strokeStyle = color
  }

  set lineWidth(width: number) {
    this.context!.lineWidth = width
  }

  // Если объект поменяется, слушатели в дочернем классе остануться, создаем очистку событий
  destroyEvents() {
    this.canvas!.onmousemove = null;
    this.canvas!.onmousedown = null;
    this.canvas!.onmouseup = null;
  }
}
