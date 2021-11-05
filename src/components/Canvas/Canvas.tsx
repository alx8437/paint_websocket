import React from 'react';
import styles from './Canvas.module.scss'

const Canvas = () => {
    return (
        <div className={styles.canvas}>
            <canvas width={600} height={400} />

        </div>
    );
};

export default Canvas;