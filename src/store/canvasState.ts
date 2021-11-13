import { makeAutoObservable } from "mobx";
import { RefObject } from "react";

class CanvasState {
  canvas: RefObject<HTMLCanvasElement> | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas: RefObject<HTMLCanvasElement>) {
    this.canvas = canvas;
  }
}

export default new CanvasState();
