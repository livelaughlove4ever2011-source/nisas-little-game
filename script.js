const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let score = 0;
let obstaclePos = 600;

// Jump function
function jump() {
  if (isJumping) return;
  isJumping = true;
  let up = 0;
  const jumpUp = setInterval(() => {
    if (up >= 100) {
      clearInterval(jumpUp);
      const jumpDown = setInterval(() => {
        if (up <= 0) {
          clearInterval(jumpDown);
          isJumping = false;
        }
        up -= 5;
        player.style.bottom = up + 'px';
      }, 20);
    }
    up += 5;
    player.style.bottom = up + 'px';
  }, 20);
}

// Listen for spacebar
document.addEventListener('keydown', e => {
  if (e.code === 'Space') jump();
});

// Move obstacle
function moveObstacle() {
  obstaclePos -= 5;
  if (obstaclePos < -30) {
    obstaclePos = 600; // reset to right
    score++;           // increment score
    scoreDisplay.textContent = `Score: ${score}`;
  }
  obstacle.style.left = obstaclePos + 'px';

  // Collision detection
  const playerBottom = parseInt(player.style.bottom) || 0;
  if (obstaclePos < 100 && obstaclePos > 50 && playerBottom < 50) {
    alert(`Game Over! Your score: ${score}`);
    obstaclePos = 600;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
  }

  requestAnimationFrame(moveObstacle);
}

// Start game loop
moveObstacle();

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤️";

  // Random horizontal position
  heart.style.left = Math.random() * 580 + "px"; // game width ~600px
  heart.style.bottom = "0px";

  document.body.appendChild(heart);

  // Remove heart after animation
  setTimeout(() => {
    heart.remove();
  }, 2000);
}

// Make a few hearts every second
setInterval(createHeart, 1000);
