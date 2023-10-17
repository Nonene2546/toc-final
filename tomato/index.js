document.addEventListener('DOMContentLoaded', function(){
  document.body.style.backgroundColor = 'white' // change this to your background
})

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const dashLength = 10;
const gapLength = 5;
const clickTolerance = 30;
let mouseX = 0;
let mouseY = 0;
let isTracking = false;
let hasStartedTracking = false;
let hasCompleted = false;
var textButton = document.getElementById('textBtn');
var imageRef = document.getElementById("tomato-image");

function redirectToResultPage() {
  document.getElementById('transition-container').style.animation = 'sliding-left-in 1s forwards'
  setTimeout(function(){
  window.location.href = '../sauces/sauce_index.html';
  }, 1000)
}

function drawDashedLine() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setLineDash([dashLength, gapLength]);
  ctx.lineDashOffset = -Date.now() / 10;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
}

function updateMousePosition(event) {
  const rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
}

function isWithinTolerance() {
  return mouseY >= canvas.height / 2 - clickTolerance &&
      mouseY <= canvas.height / 2 + clickTolerance;
}

function showCompletedImages() {
  if (hasCompleted) {
      const leftImage = document.createElement('img');
      leftImage.src = 'tomato_slice.jpg';
      leftImage.alt = 'Tomato Slice';
      leftImage.className = 'completed-image left';
      document.body.appendChild(leftImage);

      const rightImage = document.createElement('img');
      rightImage.src = 'tomato_slice.jpg';
      rightImage.alt = 'Tomato Slice';
      rightImage.className = 'completed-image right';
      document.body.appendChild(rightImage);
  }
}

canvas.addEventListener('mousemove', (event) => {
  if (isTracking) {
      updateMousePosition(event);
      checkCompletion();
  }
});

canvas.addEventListener('mousedown', (event) => {
  if (event.button == 0) {
        updateMousePosition(event);
        if (mouseX >= 0 && mouseX <= canvas.width && isWithinTolerance()) {
            isTracking = true;
            hasStartedTracking = true;
        }
      }
  }
);

canvas.addEventListener('mouseup', (event) => {
  if (isTracking) {
      isTracking = false;
      releaseLeftClick();
      checkCompletion();
      showCompletedImages();
  }
});

textButton.addEventListener('click', () => {
  hasStartedTracking = false;
  hasCompleted = false;
  releaseLeftClick();
  document.getElementById('status').textContent = 'Slice a tomato';
  canvas.style.pointerEvents = 'auto';
});

function releaseLeftClick() {
  const mouseUpEvent = new MouseEvent('mouseup', { button: 0 });
  canvas.dispatchEvent(mouseUpEvent);
}

function resetGame() {
  hasStartedTracking = false;
  hasCompleted = false;
  document.getElementById('status').textContent = 'Slice a tomato';
  textButton.classList.add("hide");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  showCompletedImages();
}

function checkCompletion() {
  const dashlineLength = canvas.width; // Length of the dashline
  const completionThreshold = 0.95; // 95% completion threshold

  if (hasStartedTracking && isTracking && mouseX >= dashlineLength * completionThreshold) {
      hasCompleted = true;
      document.getElementById('status').textContent = 'Completed';
      textButton.classList.remove("hide");
      canvas.style.pointerEvents = 'none';
      showCompletedImages();
      if (hasCompleted == true) {
        textButton.addEventListener("click", redirectToResultPage());
      }
     
  } else if (!isWithinTolerance()) {
    document.getElementById('status').textContent = 'Failed';
    textButton.classList.remove("hide");
    textButton.innerHTML = "Try Again!";
    resetGame(); // Call the resetGame function to restart the game.
  }
}

function gameLoop() {
  drawDashedLine();
  if (hasStartedTracking && !hasCompleted && isTracking && mouseX >= 0 && mouseX <= canvas.width) {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(mouseX, canvas.height / 2, 5, 0, 2 * Math.PI);
      ctx.fill();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();