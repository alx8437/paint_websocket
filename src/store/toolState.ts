import { makeAutoObservable } from "mobx";
import Brush from "../tools/Brush";
import Eraser from "../tools/Eraser";
import Rect from "../tools/Rect";
import Line from "../tools/Line";

class ToolState {
  tool: Brush | Rect | Eraser | Line | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Brush | Rect | Eraser | Line) {
    this.tool = tool;
  }
}

export default new ToolState();
