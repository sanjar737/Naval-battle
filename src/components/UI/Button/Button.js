import React from 'react';
import cssClasses from './Button.module.css';

function Button({children, onClick, type, disabled}) {
    return (
            <button 
                disabled={disabled}
                type={type} 
                className={cssClasses.Button} 
                onClick={onClick}
            >
                {children}
            </button>
    )
}

export default Button