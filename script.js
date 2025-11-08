const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let score = 0;

// Jump function
function jump() {
  if (isJumping) return;
  isJumping = true;
  let up = 0;
  const jumpInterval = setInterval(() => {
    if (up >= 100) { // jump height
      clearInterval(jumpInterval);
      const downInterval = setInterval(() => {
        if (up <= 0) {
          clearInterval(downInterval);
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
let obstacleLeft = 600;
function moveObstacle() {
  obstacleLeft -= 5;
  if (obstacleLeft < -30) {
    obstacleLeft = 600;
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  }
  obstacle.style.left = obstacleLeft + 'px';

  // Collision detection
  const playerBottom = parseInt(player.style.bottom);
  if (obstacleLeft < 100 && obstacleLeft > 50 && playerBottom < 50) {
    alert(`Game Over! Your score: ${score}`);
    obstacleLeft = 600;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
  }
  requestAnimationFrame(moveObstacle);
}

moveObstacle();
