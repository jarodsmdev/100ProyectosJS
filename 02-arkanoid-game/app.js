const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); // 2D rendering context

const $sprite = document.querySelector("#sprite");
const $bricks = document.querySelector("#bricks");

/** Tamaño de la Pantalla */
canvas.width = 448;
canvas.height = 512;

/** Variables del nuestro juego */
let counter = 0;

/** VARIABLES DE LA PELOTA */
const ballRadius = 3;

/** VARIABLES DE LA PALETA */
const paddleHeight = 10;
const paddleWidht = 160; //50

let paddleX = (canvas.width - paddleWidht) / 2;
let paddleY = canvas.height - paddleHeight - 10;

let x = canvas.width / 2;
let y = canvas.height - 30;

let rightPressed = false;
let leftPressed = false;

const PADDLE_SENSITIVITY = 5;

/** VARIABLES DE LOS LADRILLOS */
const brickRowCount = 6;
const brickColumnCount = 13;
const brickWidth = 32;
const brickHeight = 16;
const brickPadding = 0;
const brickOffsetTop = 80;
const brickOffsetLeft = 16;
const bricks = [];

const BRICK_STATUS = {
    ACTIVE: 1,
    DESTROYED: 0
}

// Posicionar los ladrillos
for (let c = 0; c < brickColumnCount; c++){
    bricks[c] = [] // inicializamos con un array vacío
    for (let r = 0; r < brickRowCount; r++){
        // calculamos la posicion del ladrillo en la pantalla
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

        //asignar un color aleatorio a cada ladrillo
        const random = Math.floor(Math.random() * 8);

        // guardamos la informacion de cada ladrillo
        bricks[c][r] = {
            x: brickX,
            y: brickY,
            status: BRICK_STATUS.ACTIVE,
            color: random
        };
    }
}



/** Velocidad de la pelota */
let dx = 3;
let dy = -3;

function drawBall(){
    /** Dibujamos el círculo de la pelota */
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
};

function drawPaddle(){
   /*
    ctx.fillStyle = 'red';
    ctx.fillRect(
        paddleX,
        paddleY,
        paddleWidht,
        paddleHeight
    );
   */

    ctx.drawImage(
        $sprite, //imagen
        29, //clipx: coordenadas de recorte
        174, // clipY: coordenadas del recorte
        paddleWidht, // tamaño del recorte
        paddleHeight, // tamaño del recorte
        paddleX, // posicion X del dibujo
        paddleY, // posicion Y del dibujo
        paddleWidht, // ancho del dibujo
        paddleHeight // alto del dibujo
    );
};

function drawBricks(){
    for(let c = 0; c < brickColumnCount; c++){
        for(let r = 0; r < brickRowCount; r++){
            const currentBrick = bricks[c][r];
            if (currentBrick.status === BRICK_STATUS.DESTROYED)
                continue;

            /*
            ctx.fillStyle = 'yellow';
            ctx.rect(
                currentBrick.x,
                currentBrick.y,
                brickWidth,
                brickHeight
            );
            ctx.strokeStyle = '#000';
            ctx.stroke;
            ctx.fill();
            */

            const clipX = currentBrick.color * 32;

            ctx.drawImage(
                $bricks,
                clipX,
                0,
                brickWidth, //31
                brickHeight, //14
                currentBrick.x,
                currentBrick.y,
                brickWidth,
                brickHeight
            );
        }
    }
};

function collisionDetection(){
    for(let c = 0; c < brickColumnCount; c++){
        for(let r = 0; r < brickRowCount; r++){
            const currentBrick = bricks[c][r];
            if(currentBrick.status === BRICK_STATUS.DESTROYED){
                continue;
            }

            const isBallSameXAsBrick =
                x > currentBrick.x &&
                x < currentBrick.x + brickWidth;

            const isBallSameYAsBrick =
                y > currentBrick.y &&
                y < currentBrick.y + brickHeight;

            if (isBallSameXAsBrick && isBallSameYAsBrick){
                dy = -dy;
                currentBrick.status = BRICK_STATUS.DESTROYED;
            }
        }
    }
};

function ballMovement(){
    // rebotar la pelota en los laterales
    if(
        x + dx > canvas.width - ballRadius || // pared derecha
        x + dx < ballRadius // pared izquierda
    ){
        dx = -dx;
    }

    // rebotar en la pared superior
    if(y + dy < ballRadius){
        dy = -dy;
    }

    // Pelota toca la pala

    const isBallSameXAsPaddle =
        x > paddleX &&
        x < (paddleX + paddleWidht);

    const isBallTouchingPaddle =
        y + dy > paddleY; 
    
    if (isBallSameXAsPaddle && isBallTouchingPaddle){
         // cambiamos la dirección de la pelota
        dy = -dy
    } else if ( 
        // la pelota toca el suelo
        y + dy > canvas.height - ballRadius
    ){
        document.location.reload();
    }

    // Mover la pelota
    x += dx;
    y += dy;
};

function paddleMovement(){
    if (rightPressed && paddleX < canvas.width - paddleWidht){
        paddleX += PADDLE_SENSITIVITY;
    }else if (leftPressed && paddleX > 0){
        paddleX -= PADDLE_SENSITIVITY;
    }
};

function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function initEvents(){
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    function keyDownHandler(event){
        const { key } = event;
        if (key === 'Right' || key === 'ArrowRight'){
            rightPressed = true;
        }else if (key == 'Left' || key === 'ArrowLeft'){
            leftPressed = true;
        }
    };

    function keyUpHandler(event){
        const { key } = event;
        if (key === 'Right' || key === 'ArrowRight'){
            rightPressed = false;
        }else if (key == 'Left' || key === 'ArrowLeft'){
            leftPressed = false;
        }
    };

}

function draw(){
    cleanCanvas();
    drawBall();
    drawPaddle();
    drawBricks();
    //drawScore();

    // colsiones y movimientos
    collisionDetection();
    ballMovement();
    paddleMovement();
    window.requestAnimationFrame(draw);
}

draw();
initEvents();