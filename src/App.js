import React, { Component } from 'react';
import './App.css';
import Auth from './containers/Auth/Auth';
import Game from './containers/Game/Game';
import { Battlefield, Player } from './assets/classes';
import { SHIPSDATA } from './assets/consts';

class App extends Component {
  state = {
    form: {
      controls: {
        player: {
          error: null,
          valid: false,
          validation: true,
          label: 'Enter your name',
          name: 'enemy',
          value: ''
        },
        enemy: {
          error: null,
          valid: false,
          validation: true,
          label: 'Enter enemy name',
          name: 'player',
          value: ''
        }
      },
      valid: false
    },
    players: null
  }

  //функция валидации контролера
  validationForm(form) {
    return Object.keys(form.controls).every((control) => {
      return form.controls[control].valid === true
    })
  }

  //функция валидации контрола
  validationControl(control) {
    return control.value.replace(/\s/g, '').length > 0
  }

  //обработчик изменений для контролеров(input)
  onChangeInputHandler = (e, control) => {
    const form = this.state.form
    const controls = form.controls
    const value = e.target.value

    controls[control].value = value

    controls[control].valid = this.validationControl(controls[control])
    if(controls[control].valid) {
      form.controls[control].error = null
    }else{
      form.controls[control].error = 'Заполните поля'
    }

    form.valid = this.validationForm(form)

    this.setState({
      form
    })
  }

  //обработчик подтверждения формы
  onSubmitHandler = (e) => {
    e.preventDefault()
    const form = this.state.form
    const playerName = form.controls.player.value
    const enemyName = form.controls.enemy.value

    //если форма не валидна, то остановить выполнение обработчика
    if (!form.valid) {
      return
    }

    //создание обьектов класса "поле боя" для будущих обьектов ('игрок', 'компьютер')
    const battlefieldForPlayer = new Battlefield(SHIPSDATA)
    const battlefieldForEnemy = new Battlefield(SHIPSDATA)

    //создание обьектов ('игрок', 'компьютер') класса "игрок" для будущих обьектов 
    const player = new Player(playerName, true, battlefieldForPlayer.ships, battlefieldForPlayer.battlefield)
    const enemy = new Player(enemyName, false, battlefieldForEnemy.ships, battlefieldForEnemy.battlefield)

    //добавление обьектов ('игрок', 'компьютер') в состояние приложения
    this.setState({
      players: {
        player,
        enemy
      }
    })

  }

  //проверка победителя
  checkWinner() {
    const player = this.state.players.player
    const enemy = this.state.players.enemy

    let winner = null
    //если какой либо игрок является победителем, тогда считать что игра закончена, иначе не закончена
    let gameOver = player.isWinner || enemy.isWinner ? true : false
    if (gameOver) {
      //если игрок является победителем, тогда вернуть его имя, иначе вернуть имя врага
      winner = player.isWinner ? player.name : enemy.name
      return winner
    }
    return false
  }

  //обработчик выстрела (клик по ячейке таблицы)
  onShotHandler = (e) => {
    let players = this.state.players
    let player = players.player
    let enemy = players.enemy

    //если элемент по которому был совершен клик не является селектором "TD",
    //или игрок ведет огонь, или враг ведет огонь тогда остановить выполнение обработчика
    if (e.target.tagName !== 'TD' || player.firing === true || enemy.firing === true) {
      return
    }

    let i = e.target.parentElement.rowIndex - 1
    let j = e.target.cellIndex - 1

    //игрок совершает выстрел по противнику по указанным координатам
    player.coordinateShoot(enemy, i, j)
      .then(result => {
        this.setState({
          players
        })
        if (result === 3) {
          //противник стреляет в ответ по случайным координатам
          enemy.randomShoot(player)
          .then(result => {
            this.setState({
              players
            })
          })
        }
      })
  }

  //обработчик начала новой игры (сброс всего состояния приложения на значение по умолчанию)
  newGameHandler = () => {
    this.setState({
      form: {
        controls: {
          player: {
            valid: false,
            validation: true,
            label: 'Enter your name',
            name: 'enemy',
            value: ''
          },
          enemy: {
            valid: false,
            validation: true,
            label: 'Enter enemy name',
            name: 'player',
            value: ''
          }
        },
        valid: false
      },
      players: null
    })
  }

  render() {
    return (
      <div className='App'>
        {
          this.state.players ?
            <Game
              player={this.state.players.player}
              enemy={this.state.players.enemy}
              onShotHandler={this.onShotHandler}
              winner={this.checkWinner()}
              newGameHandler={this.newGameHandler}
            /> :
            <Auth
              form={this.state.form}
              onChangeInputHandler={this.onChangeInputHandler}
              onSubmitHandler={this.onSubmitHandler}
            />
        }
      </div>
    )
  }
}

export default App;
