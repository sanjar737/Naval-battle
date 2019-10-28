import React from 'react';
import cssClasses from './Ship.module.css';


export default function Ship({ ship }) {

    function tdList() {
        const tdList = []

        const y = ship.coordinates.y
        const x = ship.coordinates.x
        const from = ship.direction === 'horizontal' ? ship.coordinates.y : ship.coordinates.x
        const to = from + ship.size
        let tdClass = ''
        for (let i = from; i < to; i++) {
            let check = ship.direction === 'horizontal' ? ship.position[x][i] : ship.position[i][y]
            switch (check) {
                case 1:
                    tdClass = cssClasses.ship
                    break;
                case 2:
                    tdClass = cssClasses.hit
                    break
                default:
                    tdClass = ''
                    break;
            }
            tdList.push(<td className={tdClass} key={i}></td>)
        }

        return tdList
    }

    return (
        <table className={cssClasses.Ship}>
            <tbody>
                <tr>
                    {tdList()}
                </tr>
            </tbody>
        </table>
    )
}