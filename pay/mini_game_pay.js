let n1 = Math.floor(Math.random()*1000+1)
let n2 = Math.floor(Math.random()*1000+1)
let n3 = Math.floor(Math.random()*1000+1)
let n4 = Math.floor(Math.random()*1000+1)
let n5 = Math.floor(Math.random()*1000+1)

document.getElementById("minipay_intext").innerHTML = n1;
document.getElementById("minipay_intext1").innerHTML = n2;
document.getElementById("minipay_intext3").innerHTML = n3;
document.getElementById("minipay_intext4").innerHTML = n4;
document.getElementById("minipay_intext5").innerHTML = n5;

let adds = n1 + n2 + n3 + n4 + n5;
function Game(){
    var user = document.getElementById("minipay_intext2").value;

    if( user == adds){
        document.getElementById("minipay_ans").innerHTML = "Well Done! It is Correct";
        redirectToResultPage();
    }else{
        document.getElementById("minipay_ans").innerHTML = "Correct Answer" + adds + " . Try Again";
    }

    user = document.getElementById("minipay_intext2").value = "";
    
    n1 = Math.floor(Math.random()*1000+1)
    n2 = Math.floor(Math.random()*1000+1)
    n3 = Math.floor(Math.random()*1000+1)
    n4 = Math.floor(Math.random()*1000+1)
    n5 = Math.floor(Math.random()*1000+1)

    document.getElementById("minipay_intext").value = n1;
    document.getElementById("minipay_intext1").value = n2;
    document.getElementById("minipay_intext3").value = n3;
    document.getElementById("minipay_intext4").value = n4;
    document.getElementById("minipay_intext5").value = n5;

    adds = n1 + n2 + n3 + n4 + n5;
}

function redirectToResultPage() {
    document.getElementById('transition-container').style.animation = 'sliding-left-in 1s forwards'
    setTimeout(function(){
      window.location.href = '../index.html';
    }, 1000)
}

document.addEventListener('DOMContentLoaded', function(){
    document.body.style.backgroundImage = 'url(\'state_bread_background.png\')'
})

