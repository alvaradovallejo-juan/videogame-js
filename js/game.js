/* Global variables */
/* ================================================================ */
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementSize;
const playerPosition = {
    x: undefined,
    y: undefined
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

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
    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    game.clearRect(0,0,canvasSize,canvasSize);

    /* Map drawing using the bidimensional array */
    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementSize * colIndex;
            const posY = elementSize * (rowIndex + 1);

            if(col == 'O' && (!playerPosition.x && !playerPosition.y)) {
                playerPosition.x = posX / elementSize;
                playerPosition.y = posY / elementSize;
            }

            game.fillText(emoji, posX, posY);
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
    game.fillText(emojis['PLAYER'], (playerPosition.x * elementSize), (playerPosition.y * elementSize));
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