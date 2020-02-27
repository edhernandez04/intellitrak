
document.addEventListener("DOMContentLoaded", function(){

testButton = document.getElementById("test-button")
vehiclesUl = document.getElementById("vehicles")

testButton.addEventListener("click", function(e){

    fetch("http://localhost:3000/index")
    .then(response => response.json())
    .then(body=> renderVehicles(body))

    function renderVehicles(body){
        console.log(body)
    }
})








})