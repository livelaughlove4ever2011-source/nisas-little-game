//board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

//dog
let dogWidth = 88;
let dogHeight = 94;
let dogX = 50;
let dogY = boardHeight - dogHeight;
let dogImg;

let dog = {
    x: dogX,
    y: dogY,
    width: dogWidth,
    height: dogHeight
};

//obstacles (cactus)
let obstacleArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;
let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img, cactus2Img, cactus3Img;

//physics
let velocityX = -8; // obstacles moving left
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //dog image
    dogImg = new Image();
    dogImg.src = "./img/dog.png"; // <-- replace with your dog image path
    dogImg.onload = function() {
        context.drawImage(dogImg, dog.x, dog.y, dog.width, dog.height);
    };

    //cactus images
    cactus1Img = new Image();
    cactus1Img.src = "./img/cactus1.png";

    cactus2Img = new Image();
    cactus2Img.src = "./img/cactus2.png";

    cactus3Img = new Image();
    cactus3Img.src = "./img/cactus3.png";

    requestAnimationFrame(update);
    setInterval(placeObstacle, 1000);
    document.addEventListener("keydown", moveDog);
};

function update() {
    requestAnimationFrame(update);
    if (gameOver) return;

    context.clearRect(0, 0, board.width, board.height);

    //dog physics
    velocityY += gravity;
    dog.y = Math.min(dog.y + velocityY, dogY);
    context.drawImage(dogImg, dog.x, dog.y, dog.width, dog.height);

    //obstacles
    for (let i = 0; i < obstacleArray.length; i++) {
        let obs = obstacleArray[i];
        obs.x += velocityX;
        context.drawImage(obs.img, obs.x, obs.y, obs.width, obs.height);

        if (detectCollision(dog, obs)) {
            gameOver = true;
            dogImg.src = "./img/dog-dead.png"; // optional dead dog image
            dogImg.onload = function() {
                context.drawImage(dogImg, dog.x, dog.y, dog.width, dog.height);
            };
        }
    }

    //score
    context.fillStyle = "black";
    context.font = "20px courier";
    score++;
    context.fillText(score, 5, 20);
}

function moveDog(e) {
    if (gameOver) return;

    if ((e.code === "Space" || e.code === "ArrowUp") && dog.y === dogY) {
        velocityY = -10; // jump
    } else if (e.code === "ArrowDown" && dog.y === dogY) {
        // duck (optional)
    }
}

function placeObstacle() {
    if (gameOver) return;

    let obstacle = {
        img: null,
        x: cactusX,
        y: cactusY,
        width: null,
        height: cactusHeight
    };

    let chance = Math.random();

    if (chance > 0.9) {
        obstacle.img = cactus3Img;
        obstacle.width = cactus3Width;
    } else if (chance > 0.7) {
        obstacle.img = cactus2Img;
        obstacle.width = cactus2Width;
    } else if (chance > 0.5) {
        obstacle.img = cactus1Img;
        obstacle.width = cactus1Width;
    } else return; // no obstacle this time

    obstacleArray.push(obstacle);

    if (obstacleArray.length > 5) obstacleArray.shift();
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}
