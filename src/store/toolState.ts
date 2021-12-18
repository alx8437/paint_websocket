import { makeAutoObservable } from "mobx";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";

class ToolState {
  tool: Brush | Rect | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Brush | Rect) {
    this.tool = tool;
  }
}

export default new ToolState();
