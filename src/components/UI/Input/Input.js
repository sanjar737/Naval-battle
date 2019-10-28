import React from 'react';
import cssClasses from './Input.module.css';

function Input({label, name, onChange, error}) {
    return (
        <div className={cssClasses.Input}>
            <label htmlFor={name}>{label}</label>
            <input 
                autoComplete="off"
                onChange={onChange}
                id={name} 
                name={name}
            />
            <div className={cssClasses.error}>{error}</div>
        </div>
    )
}

export default Input