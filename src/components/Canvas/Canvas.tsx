import React, { useEffect, useRef } from "react";
import styles from "./Canvas.module.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";

const Canvas = observer(() => {
  // Также через ref взаимодействуют с неконтролируемыми компонентами
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    canvasState.setCanvas(canvasRef);
    toolState.setTool(new Brush(canvasRef));
  }, []);

  return (
    <div className={styles.canvas}>
      <canvas ref={canvasRef} width={600} height={400} />
    </div>
  );
});

export default Canvas;
