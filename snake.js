const NUM_SEGMENTS = 25;
const SEGMENT_SIZE = 32;
const snake = [];
const snakeContainer = document.getElementById('snake');

// Initialize snake segments
for (let i = 0; i < NUM_SEGMENTS; i++) {
  const seg = document.createElement('div');
  seg.className = 'snake-segment' + (i === 0 ? ' snake-head' : '');
  if (i === 0) {
    // Add glowing red eyes to the head
    const leftEye = document.createElement('div');
    leftEye.className = 'snake-eye left';
    const rightEye = document.createElement('div');
    rightEye.className = 'snake-eye right';
    seg.appendChild(leftEye);
    seg.appendChild(rightEye);
  }
  snakeContainer.appendChild(seg);
  snake.push({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    el: seg
  });
}

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

// Update mouse position
document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Animate snake
function animate() {
  // Move head towards mouse
  snake[0].x += (mouse.x - snake[0].x) * 0.18;
  snake[0].y += (mouse.y - snake[0].y) * 0.18;
  snake[0].el.style.left = (snake[0].x - SEGMENT_SIZE / 2) + 'px';
  snake[0].el.style.top = (snake[0].y - SEGMENT_SIZE / 2) + 'px';

  // Move each segment towards the previous one (creates the slither)
  for (let i = 1; i < NUM_SEGMENTS; i++) {
    const prev = snake[i - 1];
    const seg = snake[i];
    const dx = prev.x - seg.x;
    const dy = prev.y - seg.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const targetDist = SEGMENT_SIZE * 0.82 + Math.sin(Date.now() / 100 + i * 0.5) * 2;
    if (dist > targetDist) {
      seg.x += Math.cos(angle) * (dist - targetDist);
      seg.y += Math.sin(angle) * (dist - targetDist);
    }
    seg.el.style.left = (seg.x - SEGMENT_SIZE / 2) + 'px';
    seg.el.style.top = (seg.y - SEGMENT_SIZE / 2) + 'px';
    // Add a subtle rotation for a more organic look
    seg.el.style.transform = `rotate(${angle + Math.PI / 2}rad) scale(${1 - i * 0.015})`;
  }

  requestAnimationFrame(animate);
}

animate();
