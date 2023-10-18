
function redirectToResultPage() {
    document.getElementById('transition-container').style.animation = 'sliding-left-in 1s forwards'
    setTimeout(function(){
      window.location.href = link[selected];
    }, 1000)
}

var choose = []
var selected = ""
var link = {"burger": '../bread/choose_bread.html','sushi': '../sushi/sushi.html','pizza': '../pizza/pizza.html','rice': '../chicken_rice/chicken_rice.html'}
$(".image").click(function () {
  selected = $(this).attr("id")
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
