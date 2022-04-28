import React, {ChangeEvent} from 'react';
import styles from './Toolbar.module.scss'
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";
import canvasState from "../../store/canvasState";
import Rect from "../../tools/Rect";
import Circle from "../../tools/Circle";
import Eraser from "../../tools/Eraser";
import Line from "../../tools/Line";


const Toolbar = () => {
    const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
        toolState.setFillColor(e.currentTarget.value)
        toolState.setStrokeColor(e.currentTarget.value)
    }

    const download = () => {
        // take canvas image
        const dataUrl = canvasState.canvas?.toDataURL();
        console.log(dataUrl);
        const a = document.createElement('a');
        a.href = dataUrl as string;
        a.download = canvasState.sessionId + '.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <div className={styles.toolbar}>
            <div className={styles.btn__container}>
                <div className={styles.btn_tools}>
                    <button className={`${styles.btn} ${styles.btn__brush}`} onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket as WebSocket, canvasState.sessionId as string))}/>
                    <button className={`${styles.btn} ${styles.btn__rect}`} onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket as WebSocket, canvasState.sessionId as string))}/>
                    <button className={`${styles.btn} ${styles.btn__line}`} onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket as WebSocket, canvasState.sessionId))}/>
                    <button className={`${styles.btn} ${styles.btn__eraser}`} onClick={() => (toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket as WebSocket, canvasState.sessionId as string)))}/>
                    <button className={`${styles.btn} ${styles.btn__circle}`} onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket as WebSocket, canvasState.sessionId))}/>
                    <input style={{marginLeft: 5}} type="color" onChange={(e) => {
                        changeColor(e)
                    }}/>
                </div>
                <div className={styles.btn__nav}>
                    <button className={`${styles.btn} ${styles.btn__undo}`} onClick={() => canvasState.undo()}/>
                    <button className={`${styles.btn} ${styles.btn__redo}`} onClick={() => canvasState.redo()}/>
                    <button className={`${styles.btn} ${styles.btn__save}`} onClick={download}/>
                </div>
            </div>

        </div>
    );
};

export default Toolbar;