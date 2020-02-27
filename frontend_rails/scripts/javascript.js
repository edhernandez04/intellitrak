
document.addEventListener("DOMContentLoaded", function(){

testButton = document.getElementById("test-button")
vehiclesUl = document.getElementById("vehicles")



collapseIcon = document.getElementById("bars-icon")

activate = document.getElementById("sidebar")

collapseIcon.addEventListener("click", function(e){
    if (activate.classList.contains("active")){
        activate.classList.remove("active")
    } else {
        activate.classList.add("active")
    }
    
})





})