// board
const board = document.getElementById("board");
const context = board.getContext("2d");
const boardWidth = 750;
const boardHeight = 250;
board.width = boardWidth;
board.height = boardHeight;

// doggie
const dogWidth = 88;
const dogHeight = 94;
const dogX = 50;
const dogY = boardHeight - dogHeight;
let velocityY = 0;
const gravity = 0.4;
let dog = { x: dogX, y: dogY, width: dogWidth, height: dogHeight };
let dogImg = new Image();
dogImg.src = "52617617-vector-pixel-art-white-background-pixel-dog-for-8-bit-video-games-removebg-preview.png"; 
let gameOver = false;
let score = 0;

// Obstacles
let obstacles = [];
const obstacleY = boardHeight - 70;

const bone1Width = 34;
const bone2Width = 69;
const bone3Width = 102;

let bone1Img = new Image();
bone1Img.src = "line-icon-bone-isolated-on-white-background-vector-removebg-preview.png;
let bone2Img = new Image();
bone2Img.src = "line-icon-bone-isolated-on-white-background-vector-removebg-preview.png";
let bone3Img = new Image();
bone3Img.src = "line-icon-bone-isolated-on-white-background-vector-removebg-preview.png";

const velocityX = -8;

// Controls
document.addEventListener("keydown", e => {
  if (gameOver) return;
  if ((e.code === "Space" || e.code === "ArrowUp") && dog.y === dogY) {
    velocityY = -10; // jump
  }
});

function update() {
  if (gameOver) return;
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  // Dog
  velocityY += gravity;
  dog.y = Math.min(dog.y + velocityY, dogY);
  context.drawImage(dogImg, dog.x, dog.y, dog.width, dog.height);

  // Obstacles
  for (let i = 0; i < obstacles.length; i++) {
    let obs = obstacles[i];
    obs.x += velocityX;
    context.drawImage(obs.img, obs.x, obs.y, obs.width, obs.height);

    if (detectCollision(dog, obs)) {
      gameOver = true;
      alert(`Game Over! Score: ${score}`);
    }
  }

  // Score
  score++;
  context.fillStyle = "#8b5cf6";
  context.font = "20px Comic Sans MS";
  context.fillText(`Score: ${score}`, 10, 25);
}

// Random obstacle
function placeObstacle() {
  if (gameOver) return;

  let obs = { img: null, x: boardWidth, y: obstacleY, width: null, height: 70 };
  const chance = Math.random();

  if (chance > 0.9) {
    obs.img = bone3Img;
    obs.width = bone3Width;
  } else if (chance > 0.7) {
    obs.img = bone2Img;
    obs.width = bone2Width;
  } else if (chance > 0.5) {
    obs.img = bone1Img;
    obs.width = bone1Width;
  } else return;

  obstacles.push(obs);

  if (obstacles.length > 5) obstacles.shift();
}

// Collision detection
function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// Start game
requestAnimationFrame(update);
setInterval(placeObstacle, 1000);
