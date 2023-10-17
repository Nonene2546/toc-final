document.addEventListener('DOMContentLoaded', function(){
  document.body.style.backgroundImage = 'url(\'main-menu.jpg\')' // change this to your background
})

document.getElementById("play-button").addEventListener('click', function() {
  const container = document.getElementById('transition-container')

  container.style.animation = 'sliding-left-in 1s forwards'

  nextState()
})

function nextState(){
  setTimeout(function(){
    window.location.href = '../customer/indoor.html' // change this to next state url
  }, 1000)
  document.getElementById('transition-container').style.animation = 'sliding-left-in 1s linear'
}