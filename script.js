onst player = document.getElementById('player');
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
  const upInterval = setInterval(() => {
    if (up >= 100) {
      clearInterval(upInterval);
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

// Spacebar to jump
document.addEventListener('keydown', e => {
  if (e.code === 'Space') jump();
});

// Move obstacle
function moveObstacle() {
  obstaclePos -= 5;
  if (obstaclePos < -30) { // when off screen
    obstaclePos = 600;      // reset positiononst player = document.getElementById('player');
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
  const upInterval = setInterval(() => {
    if (up >= 100) {
      clearInterval(upInterval);
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

// Spacebar to jump
document.addEventListener('keydown', e => {
  if (e.code === 'Space') jump();
});

// Move obstacle
function moveObstacle() {
  obstaclePos -= 5;
  if (obstaclePos < -30) { // when off screen
    obstaclePos = 600;      // reset position
    score++;
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

moveObstacle();
    score++;
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

moveObstacle();
