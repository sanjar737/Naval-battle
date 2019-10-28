import React from 'react';
import cssClasses from './Ships.module.css';
import Ship from './Ship/Ship';


export default function Ships({ ships }) {
    const shipsList = ships.map( (ship, index) => {
        return (
            <Ship key={index} ship={ship}/>
        )
    })

    return (
        <div className={cssClasses.Ships}>
            <h1>Squadron</h1>
            {shipsList}
        </div>
    )
}