import React, {useEffect, useRef, useState} from "react";
import styles from "./Canvas.module.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";
import {Button, Modal} from "react-bootstrap";
import { useInput } from "../../hooks/useInput";
import {useParams} from "react-router-dom";

const Canvas = observer(() => {
  // Также через ref взаимодействуют с неконтролируемыми компонентами
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModal, setIsModal] = useState(true);
  const username = useInput('')
  const params = useParams();
  const {id} = params;

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket('ws://localhost:5005')
      socket.onopen = () => {
        console.log('Connection was success')
        socket.send(JSON.stringify({
          id,
          username: canvasState.username,
          method: 'connection',
        }))
      }
      socket.onmessage = (e) => {
        console.log(e.data)
      }
    }
  }, [canvasState.username, id])

  const onMouseDownHandler = () => {
    // Do screenshot canvas and send it to store
    canvasState.pushToUndo(canvasRef!.current!.toDataURL())
  }

  const connectionHandler = () => {
    canvasState.setUserName(username.value)
    if (username.value.length) {
      setIsModal(false);
    }
  }

  return (
      <>
        <Modal show={isModal} onHide={() => {setIsModal(false)}}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input {...username}></input>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={connectionHandler}>
              log in
            </Button>
          </Modal.Footer>
        </Modal>
        <div className={styles.canvas}>
          <canvas onMouseDown={onMouseDownHandler} ref={canvasRef} width={600} height={400} />
        </div></>
  );
});

export default Canvas;
