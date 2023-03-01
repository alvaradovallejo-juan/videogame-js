/* Global variables */
/* ================================================================ */
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');
const btnReset = document.querySelector('#reset');

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined
}
const giftPosition = {
    x: undefined,
    y: undefined
}
let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
btnReset.addEventListener('click', playAgain);

/* ----------------------------------------------------------------- */

function setCanvasSize() {
    /* Reading of the inherit property of height and width of the window 
    and convertion to find the measures of the canvas */
    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = canvasSize / 10;

    startGame();
}

function startGame() {
    /* Canvas drawing */
    /* -------------------------------------- */
    game.font = elementSize + 'px Verdana';
    
    /* The map strings are transformed into a bidimensional array */
    const map = maps[level];
    if(!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    showLives();

    enemyPositions = [];
    game.clearRect(0,0,canvasSize,canvasSize);

    /* Map drawing using the bidimensional array */
    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            console.log(emoji);
            const posX = colIndex;
            const posY = rowIndex + 1;

            if(col == 'O' && (!playerPosition.x && !playerPosition.y)) {
                playerPosition.x = posX;
                playerPosition.y = posY;
            } else if(col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if(col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY
                })
            }
            // game.fillText(emoji, posX * elementSize, posY * elementSize);
            game.drawImage(emoji, posX * elementSize, (posY-1) * elementSize, elementSize, elementSize);
        });
    });

    /* Placing the character */
    movePlayer();

    // for (let row = 0; row < 10; row++) {
    //     for (let col = 0; col < 10; col++) {
    //         game.fillText(emojis[mapRowCols[row][col]],elementSize * col, elementSize * (row + 1));
    //     }
    // }

    // game.fillRect(0,50,100,100);
    // game.clearRect(0,0,50,50);
    // game.font = '25px Verdana';
    // game.fillStyle = 'purple';
    // game.textAlign = 'center';
    // game.fillText('Platzi', 100,25);
}

function movePlayer() {
    const giftCollisionX = playerPosition.x == giftPosition.x;
    const giftCollisionY = playerPosition.y == giftPosition.y;
    if(giftCollisionX && giftCollisionY) {
        levelWin();
    }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x == playerPosition.x;
        const enemyCollisionY = enemy.y == playerPosition.y;
        return enemyCollisionX && enemyCollisionY;
    });
    if(enemyCollision) {
        levelFail();
    }
    game.drawImage(emojis['PLAYER'], playerPosition.x * elementSize, ((playerPosition.y - 1) * elementSize) + 5, elementSize, elementSize);
    // game.fillText(emojis['PLAYER'], (playerPosition.x * elementSize), (playerPosition.y * elementSize));
}

function levelWin() {
    console.log('Subiste de nivel');
    level++;
    startGame();
}

function levelFail() {
    if (lives < 1) {
        console.log('GAME OVER!!!');
        lives = 3;
        level = 0;
        timeStart = undefined;
    } else {
        console.log('EXPLOSIOOOOOON!!');
        lives--;
    }
    console.log('Vidas: ' + lives);
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    console.log('Terminaste el juego!!');
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;

    if (recordTime) {
        if (recordTime > playerTime) {
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'NUEVO RECORD!!';
        } else {
            pResult.innerHTML = 'No superaste el record 🥲';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'PRIMER RECORD!!';
    }
}

function playAgain() {
    location.reload();
}

function showLives() {
    const heartsArray =  Array(lives).fill(" 🤍 ");
    spanLives.innerHTML = "";
    heartsArray.forEach(heart => spanLives.append(heart));
}

function showTime() {
    spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time');
}

/* Reading and reacting to keys and clicks of motion */
/* ----------------------------------------------------------------- */

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if(event.key == 'ArrowLeft') moveLeft();
    else if(event.key == 'ArrowRight') moveRight();
    else if(event.key == 'ArrowDown') moveDown();
}
function moveUp() {
    console.log('Arriba');
    if(playerPosition.y > 1) {
        playerPosition.y -= 1;
        startGame();
    }
}
function moveLeft() {
    console.log('Izquierda');
    if(playerPosition.x > 0) {
        playerPosition.x -= 1;
        startGame();
        
    }
}
function moveRight() {
    console.log('Derecha');
    if(playerPosition.x < 9) {
        playerPosition.x += 1;
        startGame();
    }
}
function moveDown() {
    console.log('Abajo');
    if(playerPosition.y < 10) {
        playerPosition.y += 1;
        startGame();
    }
}