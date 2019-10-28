import React from 'react';
import cssClasses from './Battlefield.module.css';

export default function Battlefield({ battlefield, onShot, player }) {

    const trList = battlefield.map((row, indexRow) => {
        const tdList = row.map((element, indexCol) => {
            let tdClass = ''
            switch (element) {
                case 1:
                    if(player){
                        tdClass = cssClasses.ship
                    }
                    break;
                case 2:
                    tdClass = cssClasses.hit
                    break;
                case 3:
                    tdClass = cssClasses.miss
                    break;
                default:
                    tdClass = ''
                    break;
            }

            return (
                <td className={tdClass} key={indexCol}></td>
            )
        })
        return (
            <tr key={indexRow}>
                <th>{indexRow + 1}</th>
                {tdList}
            </tr>
        )
    })

    const tableClasses =  player ? cssClasses.Battlefield : `${cssClasses.Battlefield} ${cssClasses.enemy}`

    return (
        <table className={tableClasses}>
            <thead>
                <tr>
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                    <th>E</th>
                    <th>F</th>
                    <th>G</th>
                    <th>H</th>
                    <th>I</th>
                    <th>J</th>
                </tr>
            </thead>
            <tbody onClick={onShot}>
                {trList}
            </tbody>
        </table>
    )
}