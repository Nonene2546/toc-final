document.addEventListener('DOMContentLoaded', function(){
    // document.body.style.backgroundImage = 'url(\'images/bg101.png\')'
  })
  
  function redirectToResultPage() {
    document.getElementById('transition-container').style.animation = 'sliding-left-in 1s forwards'
    setTimeout(function(){
      window.location.href = '../drinks/drinks.html';
    }, 1000)
  }
  
  // Used to calculate the catch range for falling sauces
  function range(num1,num2){
    arr = []
    if(num1>num2){
        return "First argument must be less than second.";
    }
    else {
        for (i=num1; i<=num2-1; i++){
            arr.push(i);
        }
    }
    return arr;
  }
  
  // Used to compare the array for the player's sauces layer and the construction required to win
  function areEqual(array1, array2) {
    if (array1.length === array2.length) {
        return array1.every((element, index) => {
            elementClass = element.getAttribute("class");
            arr2Class = array2[index].getAttribute("class")
            if (elementClass === arr2Class) {
                return true;
        }
        return false;
      });
    } 
    return false;
  }
  
  // Element selectors
  var sauces = document.getElementById("sauces");
  var bowl = document.querySelector("#bowl");
  var startButton = document.querySelector("#stButton");
  var gameArea = document.querySelector("#gameWindow");
  var titleDiv = document.getElementById("title");
  var titleText = document.getElementById("textTitle");
  
  // Stores the distance from the left edge of the screen for each drop-pipe
  pipe1Left = document.getElementById("pipe-1").offsetLeft
  pipe2Left = document.getElementById("pipe-2").offsetLeft
  pipe3Left = document.getElementById("pipe-3").offsetLeft
  pipe4Left = document.getElementById("pipe-4").offsetLeft
  
  allPipesLeft = [pipe1Left, pipe2Left, pipe3Left, pipe4Left]
  
  // Used in calculating the starting position of the bowl
  var startPos = 0
  
  sauces.style.left = allPipesLeft[startPos] + "px";
  
  // Creating and styling the falling sauces
  const tomato = document.createElement("div");
  const tomato2 = document.createElement("div");
  const tomato3 = document.createElement("div");
  let tomatoArray = [tomato, tomato2, tomato3];
  tomato.setAttribute("id", "sauce-tomato");
  tomatoArray.forEach(element => {
    element.setAttribute("class", "sauce-tomato");
    element.style.position = "absolute";
    element.style.left = tomatoArray[0] + "px";
    element.style.top = "50px";
    element.style.height = "10px";
    element.style.width = "50px";
    element.style.marginLeft = "37px";
    element.style.backgroundColor = "rgb(239,35,60)";
  });
  
  const chili = document.createElement("div");
  const chili2 = document.createElement("div");
  const chili3 = document.createElement("div");
  let chiliArray = [chili, chili2, chili3];
  chili.setAttribute("id", "sauce-chili");
  chiliArray.forEach(element => {
    element.setAttribute("class", "sauce-chili");
    element.style.position = "absolute";
    element.style.left = chiliArray[0] + "px";
    element.style.top = "50px";
    element.style.height = "5px";
    element.style.width = "80px";
    element.style.marginLeft = "20px";
    element.style.backgroundColor = "rgb(251,133,0)";
  });
  
  const cheese = document.createElement("div");
  const cheese2 = document.createElement("div");
  const cheese3 = document.createElement("div");
  let cheeseArray = [cheese, cheese2, cheese3];
  cheese.setAttribute("id", "sauce-cheese");
  cheeseArray.forEach(element => {
    element.setAttribute("class", "sauce-cheese");
    element.style.position = "absolute";
    element.style.left = cheeseArray[0] + "px";
    element.style.top = "50px";
    element.style.height = "5px";
    element.style.width = "75px";
    element.style.marginLeft = "23px";
    element.style.backgroundColor = "rgb(255,209,102)";
  });
  
  const pepper = document.createElement("div");
  const pepper2 = document.createElement("div");
  const pepper3 = document.createElement("div");
  let pepperArray = [pepper, pepper2, pepper3];
  pepper.setAttribute("id", "sauce-pepper");
  pepperArray.forEach(element => {
    element.setAttribute("class", "sauce-pepper");
    element.style.position = "absolute";
    element.style.left = pepperArray[0] + "px";
    element.style.top = "50px";
    element.style.height = "5px";
    element.style.width = "66px";
    element.style.marginLeft = "28px";
    element.style.backgroundColor = "rgb(153,88,42)";
  });
  
  let levelSauces = {
    level1: [tomato, tomato2, tomato3, chili, chili2, chili3, cheese, cheese2, cheese3, pepper, pepper2, pepper3]
  }
  
  function restock(){
    levelSauces.level1 = [tomato, tomato2, tomato3, chili, chili2, chili3, cheese, cheese2, cheese3, pepper, pepper2, pepper3]
  }
  
  const target = {
    level1: [bowl, cheese, chili, pepper, tomato]
  }
  
  let saucesArray = [bowl]
  
  // Enables the player to use the L+R keyboard arrows to move their bowl
  document.onkeydown = moveBowl;
  function moveBowl(e) {
    if (e.keyCode == "37") {
      if (startPos > 0) {
        startPos -= 1;
        sauces.style.left = allPipesLeft[startPos] + "px";
      }
    } else if (e.keyCode == "39") {
      if (startPos < 3) {
        startPos += 1;
        sauces.style.left = allPipesLeft[startPos] + "px";
      }
    }
  }
  
  var speed = 3.5;
  var currentLevel = 0;
  
  // This is where the fun begins
  function startGame() {
    startButton.style.display = "none";
    titleDiv.style.display = "none";
    // titleText.style.display = "none";
    gameArea.style.display = "flex"; 
  
    // Sets the ingredients array for the level
    var currentSauces = levelSauces.level1;
  
    // Function for rolling a new, random sauce each time one is caught or missed
    function randomSauce() {
      return currentSauces[Math.floor(Math.random() * (currentSauces.length))];
    }
  
    // Function for rolling a random pipe for each sauce to fall from
    function randomPipe() {
      return allPipesLeft[Math.floor(Math.random() * (allPipesLeft.length))];
    }
  
    // Stores the randomly selected sauce
    var sauce = randomSauce();
  
    // Sets the vertical starting position of the sauce
    var yPos = 50;
  
    // Sets the horizontal starting position of the sauce
    var pipeLoc = randomPipe();
  
    // Establishes the starting position as a pixel value for style assignment
    var xPos = pipeLoc + "px";
  
    // Variables for calculating the top and bottom of the player's catch range
    var catchCap = gameArea.offsetHeight - 100;
    var catchZone = range(catchCap, gameArea.offsetHeight);
  
    // creates the interval at which the game loop refreshes -- 5ms
    var id = setInterval(drop, 5);
  
    // The game loop
    function drop() {
      gameArea.appendChild(sauce);
      yPos+=speed;
      sauce.style.top = yPos + "px";
      sauce.style.left = xPos;
  
      // If the sauce reaches the bottom of the screen and hasn't been caught
      if (yPos-150 >= gameArea.offsetHeight && sauces.offsetLeft-10 != pipeLoc) {
        yPos = 50;
        sauce = randomSauce();
        pipeLoc = randomPipe();
        xPos = pipeLoc + "px";
      }
      // Else if the player catches the sauce
      else if (catchZone.includes(yPos) && sauces.offsetLeft-10 === pipeLoc) {
        saucesArray.push(sauce);
  
        let sr = "";
        let sHeight = 0;
  
        // for each sauce in the constructed sauces array
        saucesArray.forEach(element => {
          sr = element.style.height.replace("px", "");
          if (sr == "") {
            sr = 0;
          }
  
          sHeight += parseInt(sr);
        });
  
        var posTop = 90 - parseInt(sHeight);
        var srWidth = sauce.style.width.replace("px", "");
        var posWidth = (100 - parseInt(srWidth)) / 2;
  
        clearInterval(id);
  
        yPos = 50;
        sauces.appendChild(sauce);
        sauce.style.position = "absolute";
        sauce.style.left = "0px";
        sauce.style.marginLeft = posWidth + "px";
        sauce.style.top = posTop + "px";
  
        let removeIndex = currentSauces.indexOf(sauce);
        currentSauces.splice(removeIndex, 1);
  
        if (areEqual(target.level1, saucesArray)===true) {
          clearInterval(id);

          // Display the start button and title,
          startButton.style.display = "inline-block";
          titleDiv.style.display = "block";
  
          // Alter the start button and title text to be congratulatory
          titleText.innerHTML = "A perfect order!";
          startButton.innerHTML = "Next, state";
          
          // if click start button, call function to redirect to result page
          startButton.addEventListener('click', redirectToResultPage)
        } else if (sauces.childElementCount > target.level1.length) {
            clearInterval(id);
            // Display the start button and title,
            startButton.style.display = "inline-block";
            titleDiv.style.display = "block";
  
            // Alter the start button and title text to be congratulatory
            titleText.innerHTML = "You should more practice!";
            startButton.innerHTML = "Try again";
  
            speed += .5;
            saucesArray = [bowl];
            restock();
            let sauceLength = sauces.childElementCount;
            for (i=sauceLength; i>1; i--) {
              sauces.removeChild(sauces.children[1]);
            }
            sauceLength = sauces.childElementCount;
          } else {
            startGame();
          }
      }
    }
  }
  
  startButton.addEventListener("click", startGame); 