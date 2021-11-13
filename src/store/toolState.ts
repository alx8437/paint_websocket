import { makeAutoObservable } from "mobx";
import Brush from "../tools/Brush";

class ToolState {
  tool: Brush | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Brush) {
    this.tool = tool;
  }
}

export default new ToolState();
