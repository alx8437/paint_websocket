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
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  const onMouseDownHandler = () => {
    // Do screenshot canvas and send it to store
    canvasState.pushToUndo(canvasRef!.current!.toDataURL())
  }

  return (
    <div className={styles.canvas}>
      <canvas onMouseDown={onMouseDownHandler} ref={canvasRef} width={600} height={400} />
    </div>
  );
});

export default Canvas;
