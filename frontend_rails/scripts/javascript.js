content = document.getElementById("content")
contentContainer = document.createElement('div')
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

contentContainer.className = 'container'
contentContainer.id = 'main-container'

let statContainer = document.createElement('div')
    statContainer.className = 'row'
    statContainer.id = "stat-container"

let carouselContainer = document.createElement('div')
    carouselContainer.className = 'row'
    carouselContainer.id = "carousel-container"

let leadContainer = document.createElement('div')
    leadContainer.className = 'row'
    leadContainer.id = 'lead-container'

    let personalStats = document.createElement('div')
        personalStats.className = "col-4"
        let personalStatCard = document.createElement('div')
            personalStatCard.className = 'card'
            personalStatCard.style = 'width: 350px'
            // based on logged in User - when data is created insert function to interpolate through here **********************
            personalStatCard.innerHTML = `
            <h5>Ed Hernandez</h5>
            <h6> President of Sales</h6>
            <p> $435365436 / $500000000 </p>
            `
            let progress = document.createElement('div')
                progress.className = 'progress'
                    // interpolate results to adjust the bar based on performance ***********************
                progress.innerHTML = `
                <div class="progress-bar" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div>
                `
            
    let leaderBoardContainer = document.createElement('div')
        leaderBoardContainer.className = "col-8"
        let leaderStatCard = document.createElement('div')
            leaderStatCard.className = "card"
            leaderStatCard.id = 'leaderBoardCard'
    
            let leaderBoard = document.createElement('table')
                leaderBoard.id = 'leaderboard'
                leaderBoard.className = "table-wrapper-scroll-y my-custom-scrollbar"
                leaderBoard.cellSpacing = '0'
                leaderBoard.innerHTML = `
                <thead>
                <tr>
                    <th style="width: 20%"> <button style="width: 100%;"> Daily </button> </th>
                    <th style="width: 20%"> <button style="width: 100%;"> Weekly </button> </th>
                    <th style="width: 20%"> <button style="width: 100%;">  Monthly </button> </th>
                    <th style="width: 20%"> <button style="width: 100%;"> Yearly </button> </th>
                    <th style="width: 20%"> <button style="width: 100%;"> Total </button> </th>
                </tr>
                </thead>`

                function displayUsers(users){
                    users.forEach(user => leaderBoard.innerHTML += 
                        `<tr>
                        <td align="center"> ${user.name} </td>
                        <td align="center"> ${user.position} </td>
                        <td align="center"> ${user.cars_sold} </td>
                        <td align="center"> $${user.total_sales} </td>
                        <td align="center"> ${user.team_name} </td>
                        </tr>` )
                    }
                    
    let theCarousel = document.createElement('div')
        theCarousel.className = "scrolling-wrapper"
        theCarousel.id = 'carousel'
        function displayvehicles(vehicles){
            vehicles.forEach(car => theCarousel.innerHTML +=
               `<div class="card car-card">
                <img src="${car.img_url}" height="120px" width="170px"></img>
                <p align="center"> <br>  ${car.year} ${car.make} ${car.model} <br> 
                Delivered: ${car.purchase_date} <br>
                Purchase Price: $${car.purchase_price} <br>
                Mileage: ${car.mileage}
                </p>
                <i class="fa fa-info-circle fa-1x view-vehicle-info-icon"  data-vehicle-id = "${car.id}"></i>
                </div>`
                )
        }
        
        let leadTable = document.createElement('table')
            leadTable.className = "table table-striped"
            leadTable.id = 'lead-table'
            leadTable.innerHTML = `
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>`
            function displayClients(clients){
                clients.forEach(client => leadTable.innerHTML +=
                    `<tr>
                        <td>${client.fullname}</td>
                        <td>${client.phone_number}</td>
                        <td>${client.email}</td>
                        <td>${client.address}</td>
                    </tr>`)
            }
            
content.append(contentContainer)
contentContainer.append(statContainer, carouselContainer,leadContainer)
statContainer.append(personalStats,leaderBoardContainer)
carouselContainer.append(theCarousel)
leaderBoardContainer.append(leaderStatCard)
leaderStatCard.append(leaderBoard)
personalStats.append(personalStatCard)
personalStatCard.append(progress)
leadContainer.append(leadTable)

document.addEventListener("DOMContentLoaded", function(){
    fetch('http://localhost:3000/users')
        .then(resp => resp.json()).then(users => displayUsers(users))

    fetch('http://localhost:3000/clients')
        .then(resp => resp.json()).then(clients => displayClients(clients))

    fetch('http://localhost:3000/vehicles')
        .then(resp => resp.json()).then(vehicles => displayvehicles(vehicles))
})



//going to need code for an add vehicle form
//going to need a show page for our vehicles

//vehicle show page


theCarousel.addEventListener("click", vehicleViewPage)

function vehicleViewPage(e){
    if (e.target.classList.contains("view-vehicle-info-icon")){
        console.log("worked")
        statContainer.hidden = true
        leadContainer.hidden = true

        renderShowPage(e.target.dataset.vehicleId)

        //hidden show page = false
    }
}


function renderShowPage(vehicleId){

    if (document.getElementById("vehicle-show-div")){
        document.getElementById("vehicle-show-div").remove()
    }
    //check if show page is already there and clear it 

    let bootstrapRow = document.createElement("div")
    bootstrapRow.className = "row"
    bootstrapRow.innerHTML = `<div class="col-md-4></div`

    let vehicleShowDiv = document.createElement("div")
    vehicleShowDiv.className = "vehicle-show"
    vehicleShowDiv.id = "vehicle-show-div"

    let vehicleImage = document.createElement("img")
    vehicleImage.className = "vehicle-show-image"
    let vehicleInfo = document.createElement("div")
    

    fetch(`http://localhost:3000/vehicles/${vehicleId}`)
        .then(response => response.json())
        .then(body => {
            vehicleImage.src = `${body.img_url}`;
            vehicleInfo.innerHTML = `<h2>${body.year} ${body.make} ${body.model}</h2>`
        })

    
    vehicleShowDiv.append(vehicleImage)
    vehicleShowDiv.append(vehicleInfo)
    contentContainer.append(vehicleShowDiv)
        // append to main div
}


let dashboardMenuItem = document.getElementById("dashboard-menu-item")

dashboardMenuItem.addEventListener("click", refreshDashboard)

function refreshDashboard(){

    //check for any other elements we want to remove or hide here
    if (document.getElementById("vehicle-show-div")) {
        document.getElementById("vehicle-show-div").remove()
    }

    //unhide
    statContainer.hidden = false
    leadContainer.hidden = false
}
