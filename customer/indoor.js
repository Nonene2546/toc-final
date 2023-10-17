document.addEventListener('DOMContentLoaded', function(){
  document.body.style.backgroundImage = 'url(\'indoor.png\')'
})

function nextState(){
  setTimeout(function(){
    window.location.href = '../order_food/order-food.html'
  }, 1000)
  document.getElementById('transition-container').style.animation = 'sliding-left-in 1s linear'
}

let clickCount = 0;

function getRandomPosition(container) {
  const maxX = screen.width * 0.8
  const minX = screen.width * 0.1
  const maxY = screen.height * 0.8
  const minY = screen.height * 0.1

  const randomX = Math.random() * (maxX - minX) + minX;
  const randomY = Math.random() * (maxY - minY) + minY;

  return { x: randomX, y: randomY };
}

function createRandomCircle(container) {
  const circle = document.createElement('div');
  circle.className = 'circle';

  const position = getRandomPosition(container);
  circle.style.left = position.x + 'px';
  circle.style.top = position.y + 'px';

  circle.addEventListener('click', () => {
    circle.style.display = 'none';
    clickCount++;

    if (clickCount <= 5) {
      updateText(clickCount);
      if (clickCount === 5) {
        updateTextToWelcome();
        changeImageToCustomer()
        setTimeout(() => {
          nextState()
        }, 1000);
      }
    }

    if (clickCount < 5) {
      createRandomCircle(container);
    }
  });

  container.appendChild(circle);
}

function updateText(count) {
  const textContainer = document.getElementById('indoor-text-container');
  textContainer.textContent = `Click circle ${5 - count} time${count === 4 ? '' : 's'}`;
}

function updateTextToWelcome() {
  const textContainer = document.getElementById('indoor-text-container');
  textContainer.textContent = 'Welcome customer';
}

function changeImageToCustomer() {
  const doorImage = document.getElementById('door-img');
  doorImage.src = 'customer.png';
}

const indoorContainer = document.getElementById('indoor-container');
const circleContainer = document.getElementById('indoor-circle-container');

// Create the initial circle
createRandomCircle(circleContainer);