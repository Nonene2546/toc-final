document.addEventListener('DOMContentLoaded', function(){
  create_transition_block()
  document.getElementById('container').style.display = 'flex'
  document.getElementById('transition-container').style.animation = 'sliding-left-out 1s forwards'

  function create_transition_block(){
    const container = document.getElementById('transition-container')
    let height = 30
    let curWidth = window.innerWidth * 1.2
    let sumHeight = 0
  
    while(sumHeight < window.innerHeight){
      const randomHeight = height
      const randomWidth = curWidth
      curWidth += 50
  
      // Create the animated block
      const animatedBlock = document.createElement('div')
      animatedBlock.id = 'animatedBlock'
      animatedBlock.classList.add('transition-block')
      animatedBlock.style.height = randomHeight + 'px'
      animatedBlock.style.width = randomWidth + 'px'
  
      // Add the block to the container
      container.appendChild(animatedBlock);
      sumHeight += randomHeight
    }
  }
})

