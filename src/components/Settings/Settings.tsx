import React from 'react';
import styles from './Setting.module.scss'
import toolState from "../../store/toolState";

const Settings = () => {
    return (
        <div className={styles.settingBar}>
            <label htmlFor="lineWidth">Width line</label>
            <input className={styles.width_input} id="lineWidth" type="number" min={1} max={50} defaultValue={1} onChange={(e) => toolState.setLineWidth(Number(e.target.value))}/>
            <label htmlFor="strokeColor">Width line</label>
            <input className={styles.width_input} id="strokeColor" type="color" onChange={(e) => toolState.setStrokeColor(e.currentTarget.value)}/>
        </div>
    );
};

export default Settings;