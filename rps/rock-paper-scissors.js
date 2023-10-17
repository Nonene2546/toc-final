document.addEventListener('DOMContentLoaded', function(){
  document.body.style.backgroundImage = 'url(\'main-menu.jpg\')' // change this to your background
})

function nextState(){
  setTimeout(function(){
    window.location.href = '../pay/mini_game_pay.html' // change this to next state url
  }, 1000)
  document.getElementById('transition-container').style.animation = 'sliding-left-in 1s linear'
}

// script.js
var rps_animation = 0;
var win_cont = 0;
function rps_moveImageUp(img) {
    img.style.tra = '+100px'; // Move the image up by 100 pixels
    setTimeout(null, 3000); // 5000 milliseconds = 5 seconds
  }
  function rps_random_bot(img) {
    return Math.floor(Math.random() * (2 - 0+ 1)) + 0;
  }
  
  function rps_check_winner(player, bot) {
    document.getElementById('rps_win_lose_alert').style.display = "block";
    if (player == bot) {
        document.getElementById('rps_win_lose_alert').src = "assest/draw.png";
      return "draw";
    } else if ((player == 0 && bot == 1) || (player == 1 && bot == 2) || (player == 2 && bot == 0)) {
        win_cont = 0;
        document.getElementById('rps_win_lose_alert').src = "assest/lose.png";
        document.getElementById('rps_description').innerHTML = "<div>You have to win streak 3 time</div>"
      return "bot";
    } else {
        win_cont++;
        document.getElementById('rps_win_lose_alert').src = "assest/win.png";
        document.getElementById('rps_description').innerHTML += "<img src='assest/fire.png' alt='' style='display:inline;width:50px;height:50px'>"
      return "player";
    }
  }
  const images = document.querySelectorAll(".rps_movable-img");
  dict = {0:"bot_rock", 1:"bot_paper", 2:"bot_scissors"}
  image_dict = {0:"assest/rock.png", 1:"assest/paper.png", 2:"assest/scissors.png"}
  images.forEach(image => {
      image.addEventListener("click", () => {
        player = image.getAttribute("data")
          if (rps_animation == 0 && player != "-1")  {
            num = rps_random_bot(image);
            rps_check_winner(player, num);
            rps_animation = 1;
            document.getElementById(dict[num]).classList.add("movedown");
            document.getElementById(dict[num]).src = image_dict[num];
            image.classList.add("clicked");
            setTimeout(() => {
              image.classList.remove("clicked");
              document.getElementById(dict[num]).src = "assest/back_card.png";
              document.getElementById(dict[num]).classList.remove("movedown");
              rps_animation = 0;
              document.getElementById('rps_win_lose_alert').style.display = "none";
              if (win_cont == 2)
              {
                nextState();
              }
          }, 2000);
        }
      });
  });