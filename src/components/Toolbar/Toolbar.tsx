import React from 'react';
import styles from './Toolbar.module.scss'
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";
import canvasState from "../../store/canvasState";
import Rect from "../../tools/Rect";

const Toolbar = () => {
    return (
        <div className={styles.toolbar}>
            <div className={styles.btn__container}>
                <div className={styles.btn_tools}>
                    <button className={`${styles.btn} ${styles.btn__brush}`} onClick={() => toolState.setTool(new Brush(canvasState.canvas))}/>
                    <button className={`${styles.btn} ${styles.btn__rect}`} onClick={() => toolState.setTool(new Rect(canvasState.canvas))}/>
                    <button className={`${styles.btn} ${styles.btn__line}`}/>
                    <button className={`${styles.btn} ${styles.btn__eraser}`}/>
                    <button className={`${styles.btn} ${styles.btn__circle}`}/>
                    <input style={{marginLeft: 5}} type="color"/>
                </div>
                <div className={styles.btn__nav}>
                    <button className={`${styles.btn} ${styles.btn__undo}`}/>
                    <button className={`${styles.btn} ${styles.btn__redo}`}/>
                    <button className={`${styles.btn} ${styles.btn__save}`}/>
                </div>
            </div>

        </div>
    );
};

export default Toolbar;