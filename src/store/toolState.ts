import { makeAutoObservable } from "mobx";
import Brush from "../tools/Brush";
import Eraser from "../tools/Eraser";
import Rect from "../tools/Rect";

class ToolState {
  tool: Brush | Rect | Eraser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Brush | Rect) {
    this.tool = tool;
  }
}

export default new ToolState();
