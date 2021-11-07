import React from 'react';
import styles from './Toolbar.module.scss'

const Toolbar = () => {
    return (
        <div className={styles.toolbar}>
            <div className={styles.btn__container}>
                <div className={styles.btn_tools}>
                    <button className={`${styles.btn} ${styles.btn__brush}`}/>
                    <button className={`${styles.btn} ${styles.btn__rect}`}/>
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