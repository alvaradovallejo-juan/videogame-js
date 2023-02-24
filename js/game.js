const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize)

function setCanvasSize() {
    
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
    game.font = elementSize + 'px Verdana';
    
    const map = maps[1];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log(map);

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            game.fillText(emojis[mapRowCols[row][col]],elementSize * col, elementSize * (row + 1));
        }
    }

    // game.fillRect(0,50,100,100);
    // game.clearRect(0,0,50,50);
    // game.font = '25px Verdana';
    // game.fillStyle = 'purple';
    // game.textAlign = 'center';
    // game.fillText('Platzi', 100,25);
}