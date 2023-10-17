// document.addEventListener('DOMContentLoaded', function () {
//     // Add an event listener to the button
//     document.getElementById('flip-button').addEventListener('click', function () {
        
//         if (progress===80) {
//             resetProgress();
//         } else {
//             toggleGauge();
//         }
        
//     });
// });


document.addEventListener('DOMContentLoaded', function () {
    var progress = 0;
    const progressBar = document.getElementById('meat_progress');
    let isIncreasing = false; // Flag to track whether the gauge is increasing
    var gasSound = document.getElementById('meat_gas-sound');

    // Function to increase the gauge progress over time
    function increaseProgress() {
        
        if (progress < 100 && isIncreasing) {
            progress += 0.5; // Increase the progress by 1% (adjust as needed) <============== *** Adjust difficulty ***
            progressBar.style.height = progress + '%';
            
            requestAnimationFrame(increaseProgress);
        }
        else if (progress < 100 && !isIncreasing && progress >= 0) {
            progress -= 0.5; // Increase the progress by 1% (adjust as needed)
            progressBar.style.height = progress + '%';
            console.log(progress)
            requestAnimationFrame(increaseProgress);
        }
        else{
            resetProgress()
        }
        
    }

    // Function to toggle the gauge increase
    function toggleGauge() {
        
        console.log('p',progress)
        isIncreasing = !isIncreasing;
        
        if (isIncreasing) {
            increaseProgress();
            gasSound.play();
            // document.getElementById('flip-button').addEventListener('click', function () {
            //     if (progress <= 45 && progress >= 40) {
            //         resetProgress();
            //     }
                
            // });
        }
        else if(!isIncreasing) {
            gasSound.pause()

        }
    }

    function resetProgress() {
        progress = 0;
        progressBar.style.height = '0%';
        isIncreasing = false; // Stop the gauge increase
        gasSound.pause()
    }

    // Add a click event to the "Flip" button to toggle the gauge increase
    document.getElementById('meat_gas-button').addEventListener('click', function () {
        
        toggleGauge();
    });

    // the game end here
    document.getElementById('meat_flip-button').addEventListener('click', function () {
        
        if (progress >= 70 && progress <= 80) {
            // alert('redirect')
            redirectToResultPage()
            resetProgress()
        }
        
    });
});




// ===============================================================================================================
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

document.addEventListener('DOMContentLoaded', function(){
    document.body.style.backgroundImage = 'url(\'state_bread_background.png\')'
  })

function redirectToResultPage() {
    document.getElementById('transition-container').style.animation = 'sliding-left-in 1s forwards'
    setTimeout(function(){
      window.location.href = '../tomato/index.html';
    }, 1000)
}