import React from 'react';
import cssClasses from './Player.module.css';
import Battlefield from './Battlefield/Battlefield';
import Health from './Health/Health';
import Ships from './Ships/Ships'

export default function Player({ battlefield, ships, name, onShot, player, hp, maxHp }) {
    return (
        <div className={cssClasses.Player}>
            <h1>{name}</h1>
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