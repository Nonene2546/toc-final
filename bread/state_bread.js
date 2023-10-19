document.getElementById('wholeWheatButton').addEventListener('click', function() {
    // Handle the selection of whole wheat bread
    // alert('You chose Whole Wheat Bread');
    document.getElementById('wholeWheatButton').style = "background:green"
    document.getElementById('whiteBreadButton').style = "background:#0074d9"
    showSubmitButton();
});

document.getElementById('whiteBreadButton').addEventListener('click', function() {
    // Handle the selection of white bread
    // alert('You chose White Bread');
    document.getElementById('wholeWheatButton').style = "background:#0074d9"
    document.getElementById('whiteBreadButton').style = "background:green"
    showSubmitButton();
});

function showSubmitButton() {
    // Show the submit button when a choice is made
    document.getElementById('submitButton').style.display = 'block';
}
function redirectToResultPage() {
    document.getElementById('transition-container').style.animation = 'sliding-left-in 1s forwards'
    setTimeout(function(){
        window.location.href = 'minigame_bread.html';
    }, 1000)
}