import React from 'react';
import cssClasses from './Game.module.css';
import Player from '../../components/Player/Player';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Alert from '../../components/UI//Alert/Alert';



function Game({player, enemy, onShotHandler, winner, newGameHandler}) {
        return (
            <div className={cssClasses.Game}>
                <Player
                    maxHp={player.maxHp}
                    hp={player.hp}
                    battlefield={player.battlefield}
                    ships={player.ships}
                    name={player.name}
                    player={player.isPlayer}
                />
                <Player
                    maxHp={enemy.maxHp}
                    hp={enemy.hp}
                    battlefield={enemy.battlefield}
                    ships={enemy.ships}
                    name={enemy.name}
                    player={enemy.isPlayer}
                    onShot={onShotHandler}
                />
                {
                    winner ?
                        <Backdrop>
                            <Alert
                                text={`${winner} win!`}
                                onClick={newGameHandler}
                            />
                        </Backdrop> :
                        null
                }

            </div>
        )
}

export default Game