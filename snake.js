
let snakelen;
let food_x;
let food_y;

let left = false;
let right = true;
let up = false;
let down = false;
let Gameon = true;

const DOT_SIZE = 10;
const ALL_DOTS = 900;
const MAX_RAND = 29;
const DELAY = 140;
const C_HEIGHT = 500;
const C_WIDTH = 500;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

let x = new Array(ALL_DOTS);
let y = new Array(ALL_DOTS);



    document.addEventListener("keydown", keyDownEvent);
    function keyDownEvent(e) {

        let key = e.keyCode;

        if ((key == LEFT_KEY) && (!right)) {

            left = true;
            up = false;
            down = false;
        }

        if ((key == RIGHT_KEY) && (!left)) {

            right = true;
            up = false;
            down = false;
        }

        if ((key == UP_KEY) && (!down)) {

            up = true;
            right = false;
            left = false;
        }

        if ((key == DOWN_KEY) && (!up)) {

            down = true;
            right = false;
            left = false;
        }
    };

    createSnake();
    locateApple();
    setTimeout("gameCycle()", DELAY);

  function createSnake() {

    snakelen = 3;

    for (let z = 0; z < snakelen; z++) {
        x[z] = 50 - (z*10) ;
        y[z] = 50;

    }
};
function locateApple() {

    let r = Math.floor(Math.random() * MAX_RAND);
    food_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    food_y = r * DOT_SIZE;


};
var sx;
var sy;

function gameCycle() {

    if (Gameon) {
          setTimeout("gameCycle()", DELAY);

        checkFood();
        checkCollision();
        move();

         doDrawing();

    }
};

function checkFood() {

    if ((x[0] == food_x) && (y[0] == food_y)) {

        snakelen++;
        locateApple();
    }
};

function checkCollision() {

    for (let z = snakelen-1; z > 0; z--) {

        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            Gameon = false;
        }
    }

    if (y[0] >= C_HEIGHT) {

        Gameon = false;
    }

    if (y[0] < 0) {

       Gameon = false;
    }

    if (x[0] >= C_WIDTH) {

      Gameon = false;
    }

    if (x[0] < 0) {

      Gameon = false;
    }
};

function doDrawing() {

    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    if (Gameon) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(food_x,food_y,10,10);
      ctx.fillStyle="red";
      ctx.fillRect(food_x,food_y,10,10);

        for (let z = 0; z < snakelen; z++) {
            ctx.fillStyle="green";
          ctx.fillRect(x[z],y[z],DOT_SIZE,DOT_SIZE);
          ctx.strokeStyle = "black";
          ctx.strokeRect(x[z],y[z],DOT_SIZE,DOT_SIZE);

        }
    }
    else {

        gameOver();
    }
};

function gameOver() {

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'normal bold 18px serif';

    ctx.fillText('Game over', C_WIDTH/2, C_HEIGHT/2);
};


function move() {
  console.log(x[0]);

    for (let z = snakelen-1; z > 0; z--) {

        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    if (left) {

        x[0] -= DOT_SIZE;
    }

    if (right) {

        x[0] += DOT_SIZE;
    }

    if (up) {

        y[0] -= DOT_SIZE;
    }

    if (down) {

        y[0] += DOT_SIZE;
    }
    console.log(x[0]);
};
