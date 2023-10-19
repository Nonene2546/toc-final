document.addEventListener('DOMContentLoaded', function(){
  document.body.style.backgroundImage = 'url(\'memory-game-img/counter_desk.jpg\')' // change this to your background
})

function nextState(){
  setTimeout(function(){
    window.location.href = '../rps/rock-paper-scissors.html' // change this to next state url
  }, 1000)
  document.getElementById('transition-container').style.animation = 'sliding-left-in 1s linear'
}

const startBTN = document.querySelector('.memory-start-btn');
const moves = document.querySelector('#memory-moves-count');
const gameContainer = document.querySelector('.memory-game-container');
const result = document.querySelector('.memory-result-container');
const resultV = document.querySelector('#memory-result');
const wrapper = document.querySelector('.memory-wrapper');  
const selectDrinks = document.querySelector('.memory-select-drinks-container');
const drinksTitle = document.querySelector('#memory-drinks-title');
const sdrinks = document.querySelector('.memory-drinks');
const confirmBTN = document.querySelector('.memory-drinks-btn');
const items = [
    { name: "pic1", image: "pic1.png" },
    { name: "pic2", image: "pic2.png" },
    { name: "pic3", image: "pic3.png" },
    { name: "pic4", image: "pic4.png" },
    { name: "pic5", image: "pic5.png" },
    { name: "pic6", image: "pic6.png" },
    { name: "pic7", image: "pic7.png" },
    { name: "pic8", image: "pic8.png" },
  ];
const drinks = [
    { name: "drinks1", image: "drinks1.jpg" },
    { name: "drinks2", image: "drinks2.jpg" },
    { name: "drinks3", image: "drinks3.jpg" },
    { name: "drinks4", image: "drinks4.jpg" },
]
var dict_data = {"drinks1": "Lemon","drinks2": "Peach","drinks3":"Grape","drinks4":"Water Melon" }
let firstCard = false;
let secondCard = false;
let size = 4;
var moveCount = 0;
var cardValues;
var winCount = 0;
var drinksValues = undefined;
var clicked = false;
var drink_animation = 0
startBTN.addEventListener('click', () => {
    drinksValues = undefined;
    moveCount = 0;
    firstCard = false;
    secondCard = false;
    startBTN.classList.add('hide');
    wrapper.classList.remove('hide');
    
    moves.innerHTML = `<span>Moves:</span> ${moveCount}`;
    initializer();
});

const movesCounter = () => {
  moveCount += 1;
  moves.innerHTML = `<span>Moves:</span>${moveCount}`;
};

const generateRandom = () => {
    tmpItems = JSON.parse(JSON.stringify(items));
    tmpItems = tmpItems.concat(items);
    let tmpCardValues = [];
    for(let i=1;i<=size*size;i++){
        let random = Math.floor(Math.random() * tmpItems.length);
        tmpCardValues.push(tmpItems[random]);
        tmpItems.splice(random, 1);
    }
    return tmpCardValues;
};

const matrixGenerator = (cardValues) => {
    gameContainer.innerHTML = ""
    for (let i = 0; i < size * size; i++) {
        gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}" id= ${i}>
          <div class="card-before">?</div>
          <div class="card-after">
          <img src="memory-game-img/${cardValues[i].image}" class="image"/></div>
        </div>
        `;
    }

    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
    var first = ""
    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
          if (!card.classList.contains("matched") && drink_animation==0) {
            card.classList.add("flipped");
            if (!firstCard) {

              firstCard = card;
              first_id =  card.getAttribute("id")
              firstCardValue = card.getAttribute("data-card-value");
            } else {
              secondCard = card;
              let secondCardValue = card.getAttribute("data-card-value");
              if (first_id == secondCard.getAttribute("id") )
              {
                
              }
              else if (firstCardValue == secondCardValue) {
                movesCounter();
                firstCard.classList.add("matched");
                secondCard.classList.add("matched");

                firstCard = false;

                winCount += 1;
                if (winCount == Math.floor(cardValues.length / 2)) {
                  result.innerHTML = `<h2 id="memory-result">You WON!!!</h2>`;
                    setTimeout(() => {
                        resultV.innerText = "";
                        wrapper.classList.add('hide');
                        selectDrinks.classList.remove('hide');
                        drinksTitle.innerText = "Select Drinks";
                        sdrinks.innerHTML = "";
                        for(let i=0;i<drinks.length;i++){
                            sdrinks.innerHTML += `
                            <div class="memory-drinks" data-drinks-value="${drinks[i].name}">
                                <img src="memory-game-img/${drinks[i].image}" class="image"></div>
                            </div>
                            `;
                        }
                        var drink = document.querySelectorAll(".memory-drinks");
                        drink.forEach((drink) => {
                            drink.addEventListener("click", () => {
                              if (!clicked) {
                                drinksValues = drink.getAttribute("data-drinks-value");
                                // alert("You selected " + drinksValues + " drinks");
                              }
                                drinksTitle.innerHTML = dict_data[drinksValues]
                                clicked = true;
                              }
                            );

                        });
                        confirmBTN.addEventListener("click", () => {
                          if(drinksValues!=undefined){
                            // alert(`You selected ${drinksValues} drinks\nYou will be redirected to the next game`)
                            // redirect here!!!
                            nextState()
                          }
                        });
                        
                    }, 1000);
                }
              } else {
                movesCounter();
                let [tempFirst, tempSecond] = [firstCard, secondCard];
                firstCard = false;
                secondCard = false;
                drink_animation = 1;
                let delay = setTimeout(() => {
                  tempFirst.classList.remove("flipped");
                  tempSecond.classList.remove("flipped");
                  setTimeout(() => {
                    drink_animation = 0
                  }, 700);
                }, 900);
              }
            }
          }
        });
    });
};
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  cardValues = generateRandom();
  matrixGenerator(cardValues);
};

setInterval(function() {
  if(clicked) {
    clicked = false;
  }
}, 1000);
