import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas: HTMLCanvasElement | null = null;
  socket: WebSocket | undefined;
  sessionId: string = ''
  undoList: Array<string> = []
  redoList: Array<string> = []
  username: string = ''

  constructor() {
    makeAutoObservable(this);
  }

  setSocket (socket: WebSocket) {
    this.socket = socket;
  }

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  setCanvas(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
  }

  pushToUndo(data: any) {
    this.undoList.push(data);
  }

  pushToRedo(data: any) {
    this.redoList.push(data);
  }

  setUserName(username: string) {
    this.username = username;
  }

  undo() {
    const context =  this.canvas?.getContext('2d')
    if (this.undoList.length) {
        const dataUrl = this.undoList.pop()
        this.redoList.push(this.canvas!.toDataURL())
        const img: HTMLImageElement = new Image()
        img.src = dataUrl as string
        // Handler, which start when img download
        img.onload = () => {
          context!.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
          context!.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height)
        }
    } else {
      context!.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
    }
  }

  redo() {
    const context =  this.canvas?.getContext('2d')
    if (this.redoList.length > 0) {
      const dataUrl = this.redoList.pop()
      this.undoList.push(this.canvas!.toDataURL())
      const img = new Image()
      img.src = dataUrl as string
      img.onload = () => {
        context!.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
        context!.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height)
      }
    }
  }
}

export default new CanvasState();
