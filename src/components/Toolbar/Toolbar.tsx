import React from 'react';
import styles from './Toolbar.module.scss'

const Toolbar = () => {
    return (
        <div className={styles.toolbar}>
            <div className={styles.btn__container}></div>
            <button className={`${styles.btn} ${styles.btn__brush}`}></button>
        </div>
    );
};

export default Toolbar;