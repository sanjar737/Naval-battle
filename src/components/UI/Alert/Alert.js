import React from 'react';
import cssClasses from './Alert.module.css';
import Button from '../Button/Button';

export default function Alert({ text, onClick }) {
    return (
        <div className={cssClasses.Alert}>
            <h1>{text}</h1>
            <div className={cssClasses.button}>
                <Button onClick={onClick}>Play new game</Button>
            </div>
        </div>
    )
}