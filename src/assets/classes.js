import { getRandomInt, getRandomDirection } from './functions';

export class Ship {
    constructor(id, size, type) {
        this.id = id
        this.hp = size;
        this.size = size
        this.type = type
        this.position = this.createPosition()
        this.randomizeLocation()
    }

    //инициализация расположения корабля
    createPosition() {
        let position = []

        for (let i = 0; i < 10; i++) {
            position[i] = [];
            for (let j = 0; j < 10; j++) {
                position[i][j] = 0;
            }
        }

        return position
    }

    //рандомизация точки начала координат и направления корабля
    randomizeLocation() {
        this.direction = getRandomDirection()
        //если направление корабля по вертикали, 
        //то значение y (абсцисса) генерируется от 0 до 9,
        //a значеие x (ордината) генерируется от 0 до 10 минус размер корабля,
        //что бы корабль не выходил за нижнию границу поля боя

        //инче направление корабля считается по горизонтали и
        //значеие x (ордината) генерируется от 0 до 9,
        //a значеие y (абсцисса) генерируется от 0 до 10 минус размер корабля,
        //что бы корабль не выходил за правую границу поля боя
        this.coordinates = (this.direction === 'vertical') ? {
            x: getRandomInt(10 - this.size),
            y: getRandomInt(9)
        } : {
                x: getRandomInt(9),
                y: getRandomInt(10 - this.size)
            }
    }
}

export class Battlefield {
    constructor(shipsData) {
        this.battlefield = this.createBattlefield()
        this.shipsData = shipsData
        this.setShipsOnBattlefield()
    }

    //инициализация поля
    createBattlefield() {
        let battlefield = []

        for (let i = 0; i < 10; i++) {
            battlefield[i] = [];
            for (let j = 0; j < 10; j++) {
                battlefield[i][j] = 0;
            }
        }

        return battlefield
    }

    checkLocation({ coordinates, size, direction }) {
        let x = coordinates.x
        let y = coordinates.y
        // формируем индексы начала и конца цикла для строк

        // если координата 'x' равна нулю, то это значит, что палуба расположена в самой верхней строке,
        // т. е. примыкает к верхней границе и началом цикла будет строка с индексом 0
        // в противном случае, нужно начать проверку со строки с индексом на единицу меньшим, чем у
        // исходной, т.е. находящейся выше исходной строки
        let fromX = (x === 0) ? x : x - 1;
        // если координата 'y' равна нулю, то это значит, что палуба расположена в самой левой колоне,
        // т. е. примыкает к левой границе и началом цикла будет колона с индексом 0
        // в противном случае, нужно начать проверку с колоны с индексом на единицу меньшим, чем у
        // исходной, т.е. находящейся левее исходной колоны
        let fromY = (y === 0) ? y : y - 1;
        let toX
        let toY

        //корабль расположен вертикально и его последняя палуба примыкает
        // к нижней границе игрового поля
        // поэтому координата 'x' последней палубы будет индексом конца цикла
        if (x + size === 10 && direction === 'vertical') toX = x + size;
        // корабль расположен вертикально и между ним и нижней границей игрового поля есть, как минимум, ещё
        // одна строка, координата этой строки и будет индексом конца цикла
        else if (x + size < 10 && direction === 'vertical') toX = x + size + 1;
        // корабль расположен горизонтально вдоль нижней границы игрового поля
        else if (x === 9 && direction === 'horizontal') toX = x + 1;
        // корабль расположен горизонтально где-то по середине игрового поля
        else if (x < 9 && direction === 'horizontal') toX = x + 2;

        //корабль расположен горизонтально и его последняя палуба примыкает
        // к правой границе игрового поля
        // поэтому координата 'y' последней палубы будет индексом конца цикла
        if (y + size === 10 && direction === 'horizontal') toY = y + size;
        // корабль расположен горизонтально и между ним и правой границей игрового поля есть, как минимум, ещё
        // одна колона, координата этой колоны и будет индексом конца цикла
        else if (y + size < 10 && direction === 'horizontal') toY = y + size + 1;
        // корабль расположен вертикально вдоль правой границы игрового поля
        else if (y === 9 && direction === 'vertical') toY = y + 1;
        // корабль расположен вертикально где-то по середине игрового поля
        else if (y < 9 && direction === 'vertical') toY = y + 2;

        //проверяем наличие палуб в указаном диапозоне
        //если значение ячейки поля боя равно 1, тогда там уже имеется палуба
        for (let i = fromX; i < toX; i++) {
            for (let j = fromY; j < toY; j++) {
                if (this.battlefield[i][j] === 1) {
                    return false
                }
            }
        }
        return true
    }

    setShipsOnBattlefield() {
        const shipsData = this.shipsData
        let battlefield = this.battlefield
        let ships = []

        //цикл для каждого типа корабля
        for (let i = 0; i < shipsData.length; i++) {
            //цикл для всех кораблей указанного типа
            for (let j = 0; j < shipsData[i].amount; j++) {
                const id = shipsData[i].type + j
                const size = shipsData[i].size
                const type = shipsData[i].type

                //создаем обьект корабля
                const ship = new Ship(id, size, type)

                //пока координаты не удовлетворяют условию (не уникальны)
                while (!this.checkLocation(ship)) {
                    //запустить рандомизацию (перезапись) координат и направления для текущего обьекта корабля
                    ship.randomizeLocation()
                }

                //размещения корабля на поле боя                
                for (let index = 0; index < ship.size; index++) {
                    const x = (ship.direction === 'vertical') ? ship.coordinates.x + index : ship.coordinates.x
                    const y = (ship.direction === 'horizontal') ? ship.coordinates.y + index : ship.coordinates.y
                    battlefield[x][y] = 1
                    ship.position[x][y] = 1
                }
                ships.push(ship)
            }
        }
        this.battlefield = battlefield
        this.ships = ships
    }
}

export class Player {
    constructor(name, player, ships, battlefield) {
        this.isWinner = false
        this.move = false
        this.name = name
        this.isPlayer = player
        this.ships = ships
        this.maxHp = this.healthCalculation()
        this.hp = this.maxHp
        this.battlefield = battlefield
    }

    //вычисление здоровья (количество здоровья равно количеству всех вместе взятых палуб кораблей игрока)
    healthCalculation() {
        let hp = 0
        this.ships.forEach(ship => {
            hp += ship.hp
        });
        return hp
    }

    //выстрел (изменение состояния обьекта цели)
    shot(target, i, j) {
        //0 = пусто(вода)
        //1 = густо(палуба)
        //2 = попадание
        //3 = промах
        //4 = выстрел по данным координатам уже был совершен (ошибка)

        //проверка точки координат на одно из значений указаных выше 
        switch (target.battlefield[i][j]) {
            case 1://если по координатам есть палуба то попадание
                //назначить обьекту стрелку еще один ход
                this.move=true
                target.move=false

                //у обьекта цели меняем значение ячейки поля боя на 'попал'
                target.battlefield[i][j] = 2

                //проверяем все коробли обьекта цели на наличе попадания
                for (let index = 0; index < target.ships.length; index++) {
                    let ship = target.ships[index]
                    let position = ship.position

                    //если по указанным координатам имеется палуба корабля
                    if (position[i][j] === 1) {
                        //поменять значение на попадание (пробитие палубы)
                        position[i][j] = 2
                        //отнять одно очко здоровья у корабля
                        ship.hp -= 1
                        //отнять одно очко здоровья у обьекта цели
                        target.hp -= 1
                    }
                    //если у корабля не осталось очков здоровья, то удалить этот корабль из эскадрильи (массива кораблей)
                    if (ship.hp === 0) {
                        target.ships.splice(index, 1)
                    }
                    //есди у обьекта цели не осталось очков здоровья, то назначить данный обьект (обьект стрелка) победителем
                    if (target.hp === 0) {
                        this.isWinner = true
                    }

                }
                return 2
            case 0://если по координатам пусто то промах
                //передать ход цели
                this.move=false
                target.move=true

                target.battlefield[i][j] = 3
                return 3
            case 2://если по координатам был выстрел с попаданием 
            case 3://или если по координатам был выстрел с промахом
                //назначить обьекту стрелку еще один ход
                this.move=true
                target.move=false
                return 4
            default:
                break;
        }
    }

    //случайный выстрел
    //(таймаут - псевдо размышление компьютера)
    randomShoot(target, timeout = 1000) {
        return new Promise((resolve) => {
            //отметить начало ведения огня
            let i = getRandomInt(9)
            let j = getRandomInt(9)
            let timerId = setTimeout(() => {
                const resultShot = this.shot(target, i, j)
                //если стрелок ходит, то повторить случайный выстрел иначе вернуть результат
                if(this.move) {
                    this.randomShoot(target, 0).then(result => {
                        resolve(result)
                    })
                } else {
                    resolve(resultShot)
                }
                clearTimeout(timerId);
            }, timeout)
        });
    }

    coordinateShoot(target, i, j, timeout = 0) {
        return new Promise((resolve) => {
            let timerId = setTimeout(() => {
                
                const resultShot = this.shot(target, i, j)
                resolve(resultShot)
                
                clearTimeout(timerId);
            }, timeout)
        });
    }

}