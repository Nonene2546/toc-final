
function redirectToResultPage() {
    document.getElementById('transition-container').style.animation = 'sliding-left-in 1s forwards'
    setTimeout(function(){
      window.location.href = 'minigame_order-food.html';
    }, 1000)
}

var choose = []

$(".image").click(function () {
  let selected = $(this).attr("id")
  choose.push(selected)
  $(".selected").text(`You select : ${selected}`)
})

$("#btn-selected").click(function () {
  if (choose.length != 0) {
    redirectToResultPage()
    // $(".selected").text(`You select : ${choose}`)
    // alert("Your order is being processed")
  } else {
    alert("Please select your food")
  }
})