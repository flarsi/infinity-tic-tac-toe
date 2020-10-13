const getField = (size) => {
    const field = new Array(parseInt(size))

    for (let i = 0; i < field.length; i++) {
        field[i] = new Array(parseInt(size))
        for (let j = 0; j < field[i].length; j++) {
            field[i][j] = ''
        }
    }
    return field
}

export const getRules = (size) => {

    let combo = null;

    if (size === '3') {
        combo = 3
    } else if (size === '50') {
        combo = 5
    }

    return {
        size: size,
        combo: combo,
        field: getField(size),
        turn: setTurn()
    }
}

export const setTurn = () => {
    if (0 + Math.floor((2 - 0) * Math.random()) === 1) {
        return 'cross'
    } else {
        return 'circle'
    }
}

const getIndexes = (arr, i) => {
    let prev = i - 1;
    let next = i + 1;

    return {
        prev: prev,
        curr: i,
        next: next
    };
}

const hasIndex = (arr, x, y) => {
    if (arr.hasOwnProperty(x) && arr[x].hasOwnProperty(y)) {
        return {value: arr[x][y], x, y}
    } else return undefined
}

const getElementsArr = (arr, x, y) => {
    let yIndexes = getIndexes(arr, x);
    let xIndexes = getIndexes(arr[x], y);
    let deltaArr = {
        topLeft: hasIndex(arr, yIndexes.prev, xIndexes.prev),
        top: hasIndex(arr, yIndexes.prev, xIndexes.curr),
        topRight: hasIndex(arr, yIndexes.prev, xIndexes.next),
        centerLeft: hasIndex(arr, yIndexes.curr, xIndexes.prev),
        center: hasIndex(arr, yIndexes.curr, xIndexes.curr),
        centerRight: hasIndex(arr, yIndexes.curr, xIndexes.next),
        bottomLeft: hasIndex(arr, yIndexes.next, xIndexes.prev),
        bottom: hasIndex(arr, yIndexes.next, xIndexes.curr),
        bottomRight: hasIndex(arr, yIndexes.next, xIndexes.next),
    }

    return deltaArr;
}

const rowCheck = (arr, combo, x, y) => {
    let endDot = {};
    for (let i = 0; i < combo && i + y < arr.length; i++) {
        if (arr[x][y] === arr[x][y + i]) {
            endDot = {x: x, y: y + i}
        } else break
    }

    for (let i = 0; i < combo && endDot.y - i >= 0; i++) {
        if (arr[endDot.x][endDot.y] === arr[endDot.x][endDot.y - i]) {
            if (i === combo - 1) {
                return arr[x][y]
            }
        } else break
    }
}

const colCheck = (arr, combo, x, y) => {
    let endDot = {};
    for (let i = 0; i < combo && i + x < arr.length; i++) {
        if (arr[x][y] === arr[x + i][y]) {
            endDot = {x: x + i, y: y}
        } else break
    }

    for (let i = 0; i < combo && endDot.x - i >= 0; i++) {
        if (arr[endDot.x][endDot.y] === arr[endDot.x - i][endDot.y]) {
            if (i === combo - 1) {
                return arr[x][y]
            }
        } else break
    }
}

const diagonalCheck = (arr, combo, x, y, dx, dy) => {
    let endDot = {};
    for (let i = 0; i < combo && i + x < arr.length && i + y < arr.length; i++) {
        if (arr[x][y] === arr[x + i][y + i]) {
            endDot = {x: x + i, y: y + i}
        } else break
    }

    if ((x - dx === 1 && y - dy === 1) || (x - dx === -1 && y - dy === -1)) {
        for (let i = 0; i < combo && endDot.x - i >= 0 && endDot.y - i >= 0; i++) {
            if (arr[endDot.x][endDot.y] === arr[endDot.x - i][endDot.y - i]) {
                if (i === combo - 1) {
                    return arr[x][y]
                }
            } else break
        }
    } else if ((x - dx === 1 && y - dy === -1) || (x - dx === -1 && y - dy === 1)) {
        for (let i = 0; i < combo && endDot.x - i >= 0 && endDot.y + i >= 0; i++) {
            if (arr[endDot.x][endDot.y] === arr[endDot.x - i][endDot.y + i]) {
                if (i === combo - 1) {
                    return arr[x][y]
                }
            } else break
        }
    }


}

const checkAlgorithm = (arr, combo, {x, y}, {dx, dy}) => {

    if ((x - dx === 1 || x - dx === -1) && y - dy === 0) {
        return colCheck(arr, combo, x, y)
    } else if (x - dx === 0 && (y - dy === 1 || y - dy === -1)) {
        return rowCheck(arr, combo, x, y)
    } else if ((x - dx === 1 || x - dx === -1) && (y - dy === 1 || y - dy === -1)) {
        return diagonalCheck(arr, combo, x, y, dx, dy)
    }

}

function checkDeltaArr(deltaArr, callback, callbackProps) {
    if (deltaArr.topLeft && deltaArr.center.value === deltaArr.topLeft.value) {
        return callback(...callbackProps, {dx: deltaArr.topLeft.x, dy: deltaArr.topLeft.y})
    }
    if (deltaArr.top && deltaArr.center.value === deltaArr.top.value) {
        return callback(...callbackProps, {dx: deltaArr.top.x, dy: deltaArr.top.y})
    }
    if (deltaArr.topRight && deltaArr.center.value === deltaArr.topRight.value) {
        return callback(...callbackProps, {dx: deltaArr.topRight.x, dy: deltaArr.topRight.y})
    }
    if (deltaArr.centerLeft && deltaArr.center.value === deltaArr.centerLeft.value) {
        return callback(...callbackProps, {dx: deltaArr.centerLeft.x, dy: deltaArr.centerLeft.y})
    }
    if (deltaArr.centerRight && deltaArr.center.value === deltaArr.centerRight.value) {
        return callback(...callbackProps, {dx: deltaArr.centerRight.x, dy: deltaArr.centerRight.y})
    }
    if (deltaArr.bottomLeft && deltaArr.center.value === deltaArr.bottomLeft.value) {
        return callback(...callbackProps, {dx: deltaArr.bottomLeft.x, dy: deltaArr.bottomLeft.y})
    }
    if (deltaArr.bottom && deltaArr.center.value === deltaArr.bottom.value) {
        return callback(...callbackProps, {dx: deltaArr.bottom.x, dy: deltaArr.bottom.y})
    }
    if (deltaArr.bottomRight && deltaArr.center.value === deltaArr.bottomRight.value) {
        return callback(...callbackProps, {dx: deltaArr.bottomRight.x, dy: deltaArr.bottomRight.y})
    }
}

export const checkToWin = (arr, combo, {x, y}) => {
    const deltaArr = getElementsArr(arr, x, y)
    return checkDeltaArr(deltaArr, checkAlgorithm, [arr, combo, {x, y}])
}