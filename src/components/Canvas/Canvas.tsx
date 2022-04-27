import React, {useEffect, useRef, useState} from "react";
import styles from "./Canvas.module.scss";
import {observer} from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";
import Rect from "../../tools/Rect"
import {Button, Modal} from "react-bootstrap";
import {useInput} from "../../hooks/useInput";
import {Params, useParams} from "react-router-dom";

type TFigure = {
    type: 'brush' | 'finish' | 'rect',
    x: number,
    y: number,
    width?: number,
    height?: number,
}

export type TSessionMessageType = {
    id: string,
    username?: string,
    method: 'draw' | 'connection'
    figure: TFigure
}

const Canvas = observer(() => {
    // Также через ref взаимодействуют с неконтролируемыми компонентами
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isModal, setIsModal] = useState(true);
    const username = useInput('')
    const params: Readonly<Params<string>> = useParams();

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
    }, []);

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket('ws://localhost:5005')
            canvasState.setSocket(socket);
            if (params.id) {
                toolState.setTool(new Brush(canvasRef.current, socket, params.id));
            }

            if (params!.id) {
                canvasState.setSessionId(params.id);
            }
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: "connection"
                } as TSessionMessageType))
            }
            socket.onmessage = (e) => {
                const msg: TSessionMessageType = JSON.parse(e.data)
                switch (msg.method) {
                    case "connection": {
                        console.log(`User ${msg.username} was connected successfully`)
                        break
                    }
                    case "draw": {
                        drawHandler(msg)
                        break
                    }
                }
            }
        }
    }, [canvasState.username, params.id])

    const drawHandler = (msg: TSessionMessageType) => {
        const {figure} = msg;
        const context = canvasRef!.current!.getContext('2d');
        switch (figure.type) {
            case "brush": {
                Brush.draw(context as CanvasRenderingContext2D, figure.x, figure.y)
                break
            }
            case "rect": {
                Rect.staticDraw(context as CanvasRenderingContext2D, figure.x, figure.y, figure.width as number, figure.height as number)
                break
            }
            case "finish": {
                context!.beginPath()
                break
            }
        }

    }

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
            <Modal show={isModal} onHide={() => {
                setIsModal(false)
            }}>
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
                <canvas onMouseDown={onMouseDownHandler} ref={canvasRef} width={600} height={400}/>
            </div>
        </>
    );
});

export default Canvas;
