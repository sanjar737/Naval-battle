import React from 'react';
import cssClasses from './Health.module.css';

export default function Health({ hp, maxHp }) {

    function tdList() {
        const tdList = []
        for (let index = 0; index < hp; index++) {
            tdList.push(<td key={index+'hp'} className={cssClasses.hp}></td>)
        }
        for (let index = 0; index < maxHp-hp; index++) {
            tdList.push(<td key={index+'hit'} className={cssClasses.hit}></td>)
        }
        return tdList
    }

    return (
        <table className={cssClasses.Health}>
            <tbody>
                <tr>
                    {tdList()}
                </tr>
            </tbody>
        </table>
    )
}