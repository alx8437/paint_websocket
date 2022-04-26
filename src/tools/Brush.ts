import Tool from "./Tool";
import {TSessionMessageType} from "../components/Canvas/Canvas";

// Наследуется от класса Tool
export default class Brush extends Tool {
  mouseDown: boolean | null = null;
  constructor(canvas: HTMLCanvasElement | null, socket: WebSocket, sessionId: string) {
    // Функция super будет вызывать конструктор родительского класса, в нее передаем canvas
    super(canvas, socket, sessionId);
    this.listen();
  }

  // After create object canvas will be listened all these functions - run in constructor
  listen() {
    this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false;
    this.socket?.send(JSON.stringify({
      id: this.sessionId,
      method: 'draw',
      figure: {
        type: "finish",
      },
    } as TSessionMessageType))
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
      this.socket?.send(JSON.stringify({
        id: this.sessionId,
        method: 'draw',
        figure: {
          type: "brush",
          x: event.pageX - event.target.offsetLeft,
          y: event.pageY - event.target.offsetTop
        },
      } as TSessionMessageType))
    }
  }

  // Static method called without instantiating class
  static draw(context: CanvasRenderingContext2D, x: number, y: number) {
    context.lineTo(x, y);
    context.stroke();
  }
}
