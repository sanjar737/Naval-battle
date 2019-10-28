export function getRandomInt(n) {
    return Math.floor(Math.random() * (n + 1));
}

export function getRandomDirection() {
    if (Math.round(Math.random()) === 1) {
        return 'vertical'
    } else {
        return 'horizontal'
    }
}