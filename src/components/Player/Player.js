import React from 'react';
import cssClasses from './Player.module.css';
import Battlefield from './Battlefield/Battlefield';
import Health from './Health/Health';
import Ships from './Ships/Ships'

export default function Player({ battlefield, ships, name, onShot, player, hp, maxHp, move }) {
    return (
        <div className={cssClasses.Player}>
            <h1>{name}</h1>
            <div className={cssClasses.move}>{move ? 'Your move' : 'Enemy move'}</div>
            <Health
                maxHp={maxHp}
                hp={hp}
            />
            <Battlefield
                battlefield={battlefield}
                onShot={onShot}
                player={player}
            />
            <Ships
                ships={ships}
            />
        </div>
    )
}