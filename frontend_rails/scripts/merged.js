let login = false
allUsers = []
allLeads = []
allVehicles = []
allClients = []
body = document.getElementsByTagName('body')[0]

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}
start(login)

function start(login) {
    if (login) {
        off()

        fetch('http://localhost:3000/users')
        .then(resp => resp.json()).then(users => {
            allUsers = users;
            displayUsers(users)})

        fetch('http://localhost:3000/vehicles')
            .then(resp => resp.json()).then(vehicles => {
                allVehicles = vehicles; 
                displayVehicles(vehicles)})

        fetch('http://localhost:3000/clients')
            .then(resp => resp.json()).then(clients => {
                allClients = clients})
        
        fetch('http://localhost:3000/leads')
            .then(resp => resp.json()).then(leads => {
                displayLeads(leads)})

        personalStatCard.innerHTML = `
        <h5>${loggedInUser.name}</h5>
        <h6>${loggedInUser.position}</h6>
        <p> $${loggedInUser.total_sales} / Quarterly Target: $250000 </p>`
        let progress = document.createElement('div')
        progress.className = 'progress'
        progress.innerHTML = `
            <div class="progress-bar" role="progressbar" style="width: ${(loggedInUser.total_sales/250000)*100}%;" aria-valuenow="${(loggedInUser.total_sales/250000)*100}" aria-valuemin="0" aria-valuemax="100">${(loggedInUser.total_sales/250000)*100}%</div>`

        function displayUsers(users) {
            sortedUsers = users.sort((a, b) => (a.total_sales < b.total_sales) ? 1 : -1)
            sortedUsers.forEach(user => leaderBoard.innerHTML +=
                `<tr>
            <td align="center" style="width: 20%"> ${user.name} </td>
            <td align="center" style="width: 20%"> ${user.position} </td>
            <td align="center" style="width: 20%"> ${user.cars_sold} </td>
            <td align="center" style="width: 20%"> $${user.total_sales} </td>
            <td align="center" style="width: 20%"> ${user.team_name} </td>
            </tr>`)
        }

        function displayLeads(leads) {
            
            allLeads = leads
            leads.forEach(lead => {
                if (lead.user_id === loggedInUser.id){
                let foundClient = allClients.find(client => (client.id === lead.client_id))
                let foundCar = allVehicles.find(car => (car.id === lead.vehicle_id))
                leadTable.innerHTML +=
                    `<tr>
                        <td>${foundClient.fullname}</td>
                        <td>${foundCar.year} ${foundCar.make} ${foundCar.model}</td>
                        <td>${lead.note}</td>
                        <td>Closed: ${lead.closed}</td>
                    </tr>` 
                }
            })
        }

        personalStatCard.append(progress)
        leadContainer.append(leadTable)
        carouselContainer.append(theCarousel)
        leaderBoardContainer.append(leaderStatCard)
        leaderStatCard.append(leaderBoard)
        personalStats.append(personalStatCard)
        
// overlay login page if user is not logged in *******************************************************************   
    } else if (login === false) {
        fetch('http://localhost:3000/users')
            .then(resp => resp.json()).then(users => {
                allUsers = users
            })
        let signInPage = document.createElement('div')
        signInPage.id = "overlay"
        body.append(signInPage)
        on()
        signInPage.innerHTML = `
        <div class="container">
            <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5">
                <div class="card-body">
                    <h5 class="card-title text-center">IntelliTrak© </h5>
                    <form class="form-signin" id="sign-form">
                    <div class="form-label-group">
                        <input type="userName" id="userName" class="form-control" placeholder="enter name" required autofocus>
                    </div>
                    <br>
                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                    <hr class="my-4">
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>`
        let form = document.getElementById('sign-form')
        form.addEventListener('submit', function (e) {
            e.preventDefault()
            if (allUsers.find(user => user.name === e.target.elements[0].value)) {
                loggedInUser = allUsers.find(user => user.name === e.target.elements[0].value)
                login = true
                return start(login)
            } else {
                alert("No user by that Name")
                login = false
            }
        })
    }
}

// THE ACTUAL PAGE FRAMEWORKS - Preloaded prior to Login
content = document.getElementById("content")
contentContainer = document.createElement('div')
testButton = document.getElementById("test-button")
vehiclesUl = document.getElementById("vehicles")
collapseIcon = document.getElementById("bars-icon")
activate = document.getElementById("sidebar")
collapseIcon.addEventListener("click", function (e) {
    if (activate.classList.contains("active")) {
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
let personalStats = document.createElement('div')
    personalStats.className = "col-4"
let personalStatCard = document.createElement('div')
    personalStatCard.className = 'card'
    personalStatCard.style = 'width: 350px'
let leaderBoardContainer = document.createElement('div')
    leaderBoardContainer.className = "col-8"
let leaderStatCard = document.createElement('div')
    leaderStatCard.className = "card"
    leaderStatCard.id = 'leaderBoardCard'
let leaderBoard = document.createElement('table')
    leaderBoard.id = 'leaderboard'
    leaderBoard.className = "table-wrapper-scroll-y my-custom-scrollbar table table-hover"
    leaderBoard.cellSpacing = '0'
    leaderBoard.innerHTML = `
        <style="width: 100%"> <center><h6>TOP SALES REPS</h6></center>`
let carouselContainer = document.createElement('div')
    carouselContainer.className = 'row'
    carouselContainer.id = "carousel-container"
let theCarousel = document.createElement('div')
    theCarousel.className = "scrolling-wrapper"
    theCarousel.id = 'carousel'

function displayVehicles(vehicles) {
    sorted_vehicles = vehicles.sort((a, b) => (a.purchase_date > b.purchase_date) ? 1 : -1)
    sorted_vehicles.forEach(car => theCarousel.innerHTML +=
        `<div class="card car-card">
                <img src="${car.img_url}" height="120px" width="170px"></img>
                <p align="center" style="margin:0 ; font-weight: bold" > <br> ${car.year} ${car.make} ${car.model} </p>
                    <div class=“car-card-info” style=“margin:0; padding:0">
                    Delivered: ${car.purchase_date} <br>
                    Purchase Price: $${car.purchase_price} <br>
                    Mileage: ${car.mileage}
                    </div>
                <i class='fa fa-info-circle fa-1x view-vehicle-info-icon'  data-vehicle-id = '${car.id}'></i>
                <i class='fa fa-th fa-1x vehicle-grip-icon' id='draggable'  data-vehicle-id = '${car.id}'></i>
                </div>`
    )
}

let leadContainer = document.createElement('div')
    leadContainer.className = 'row'
    leadContainer.id = 'lead-container'
let leadTable = document.createElement('table')
    leadTable.className = "table table-striped"
    leadTable.id = 'lead-table'
    leadTable.innerHTML = `
                <thead>
                    <tr>
                        <th scope="col">Client Name</th>
                        <th scope="col">Vehicle</th>
                        <th scope="col">Note</th>
                        <th scope="col">Purchase?</th>
                    </tr>
                </thead>`

content.append(contentContainer)
contentContainer.append(statContainer, carouselContainer, leadContainer)
statContainer.append(personalStats, leaderBoardContainer)

//clientTracker page ********
let clientTrackerButton = document.getElementById("clientTracker-menu-item")
let mainContainer = document.getElementById("main-container")
    clientTrackerButton.addEventListener("click", openClientTracker)

function openClientTracker() {
    if (document.getElementById("client-table")) {
        document.getElementById("client-table").remove()
    }

    hideAll()

    let clientTracker = document.createElement('table')
    clientTracker.className = "table table-hover"
    clientTracker.id = 'client-table'
    clientTracker.innerHTML = `
                <thead align="center">
                    <tr>
                        <th scope="col" width="20">Name</th>
                        <th scope="col" width="20">Number</th>
                        <th scope="col" width="20">Email</th>
                        <th scope="col" width="20">Address</th>
                        <th scope="col" width="20"> </th>
                    </tr>
                </thead>`

    fetch('http://localhost:3000/clients')
    .then(resp => resp.json()).then(clients => displayClients(clients))

    function displayClients(clients) {
        clients.forEach(client => clientTracker.innerHTML +=
            `<tr id="client-row-${client.id}">
            <td>${client.fullname}</td>
            <td>${client.phone_number}</td>
            <td>${client.email}</td>
            <td>${client.address}</td>
            <td><button width="20%" id="add-client-${client.id}" class="btn-success"> Add Lead </button></td>
        </tr>`)
        }
    mainContainer.append(clientTracker)

    clientTracker.addEventListener("click", function(e){
        if (document.getElementById("add-lead-panel")) {
            document.getElementById("add-lead-panel").remove()
        }
        hideAll()

        let vehicleSelect = document.createElement('select')
        fetch('http://localhost:3000/vehicles')
            .then(resp => resp.json()).then(vehicles => {
                vehicles.forEach(car => {
                    let newCar = document.createElement('option')
                    newCar.value = car.id
                    newCar.innerHTML = `${car.year} ${car.make} ${car.model}`
                    vehicleSelect.append(newCar)
                })


        let leadForm = document.createElement('div')
        leadForm.id = 'add-lead-panel'
        leadForm.innerHTML = `
            <h2> <i class="fa fa-car" style="margin-right: 10px; margin-top: 20px"></i>Add Lead </h2>
            
            <form style="" id="add-lead-form">
            <div class="row">
                <div class="form-group col-md-6">
                    <div class="form-group">
                        <label for="client_id">Client:</label>
                        <input type="text" class="form-control" value='${e.target.parentNode.parentNode.children[0].textContent}'>
                     </div>
                     <div class="form-group">
                        <label for='vehicle_id'>Vehicle:</label>`
                            leadForm.append(vehicleSelect)
                            leadForm.innerHTML += 
                            `<div class="form-group">
                                <label for="note">Note:</label>
                                <input type="text" class="form-control" id="note">
                            </div>
                            <button type="submit" class="btn btn-info">Add Lead</button>
                        </div> 
                    </form>`

    contentContainer.append(leadForm)
})

    let addLeadForm = document.getElementById('add-lead-form')
    addLeadForm.addEventListener("submit", function(e) {
        e.preventDefault()

        let input = {
            client_id: e.target[0].value,
            vehicle_id: e.target[1].value,
            note: e.target[2].value
        }

        fetch('http://localhost:3000/leads'), {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(input)
        }.then(document.getElementById(`client-row-${client.id}`).remove())
    })

}
    )}






let carCardInfo = document.getElementsByClassName("car-card-info")

theCarousel.addEventListener("click", vehicleViewPage)

function vehicleViewPage(e) {
    if (e.target.classList.contains("view-vehicle-info-icon")) {

        statContainer.hidden = true
        leadContainer.hidden = true

        renderShowPage(e.target.dataset.vehicleId)

        //hidden show page = false
    }
}

function renderShowPage(vehicleId) {

    //check if show page is already there and clear it 
    if (document.getElementById("view-show-row")) {
        document.getElementById("view-show-row").remove()
    }

    //create a row that the vehicle and info will be appended into
    let bootstrapRow = document.createElement("div")
    bootstrapRow.className = "row"
    bootstrapRow.id = "view-show-row"
    bootstrapRow.innerHTML = ``

    //create a container for the image
    let pictureContainer = document.createElement("div")
    pictureContainer.display = "block"
    pictureContainer.innerHTML = `
    <div class="col-md-3" id="pic-container"></div>`

    bootstrapRow.append(pictureContainer)

    //here is the image
    let vehicleImage = document.createElement("img")
    vehicleImage.className = "vehicle-show-image"

    //create a new div for the vehicle info
    let vehicleInfo = document.createElement("div")
    vehicleInfo.className = "col-md-6"

    bootstrapRow.append(vehicleInfo)

    fetch(`http://localhost:3000/vehicles/${vehicleId}`)
        .then(response => response.json())
        .then(body => {
            vehicleImage.src = `${body.img_url}`;
            vehicleInfo.innerHTML = `<h2>${body.year} ${body.make} ${body.model}</h2>
            <p>Vin: ${body.vin} </p><p>Mileage: ${body.mileage} </p>
            <p>Color: ${body.color} </p><p>Purchase Date: ${body.purchase_date} </p>
            <p>Purchase Price: $${body.purchase_price} </p>
            <p>Description: ${body.description} </p>
            `
        })

    contentContainer.append(bootstrapRow)
    let picContainer = document.getElementById("pic-container")
    picContainer.append(vehicleImage)

}


//click dashboard menu item to clear everything out
//and open the dashboard

let dashboardMenuItem = document.getElementById("dashboard-menu-item")
dashboardMenuItem.addEventListener("click", refreshDashboard)

function refreshDashboard() {
    //check for any other elements we want to remove or hide here

    if (document.getElementById("view-show-row")) {
        document.getElementById("view-show-row").remove()
    }
    if (document.getElementById("client-table")) {
        document.getElementById("client-table").remove()
    }

    unhideDashboard()
}

//
//open add vehicle panel
//
let plusDiv = document.getElementById("plus-div")
let addVehicleMenuItem = document.getElementById("add-vehicle-menu-item")
plusDiv.addEventListener("click", openAddVehicle)
addVehicleMenuItem.addEventListener("click", openAddVehicle)

function openAddVehicle() {
    if (document.getElementById("add-vehicle-panel")) {
        document.getElementById("add-vehicle-panel").remove()
    }
    hideAll()

    console.log(contentContainer)
    let addVehiclePanel = document.createElement("div")
    addVehiclePanel.id = "add-vehicle-panel"
    addVehiclePanel.innerHTML = `
        
            <h2> <i class="fa fa-car" style="margin-right: 10px; margin-top: 20px"></i>Add Vehicle </h2>
            
            <form style="" id="add-vehicle-form">
            <div class="row">
                <div class="form-group col-md-6">
                    <div class="form-group">
                        <label for="year">Year:</label>
                        <input type="text" class="form-control" id="year">
                     </div>
                    <div class="form-group">
                        <label for="make">Make:</label>
                        <input type="text" class="form-control" id="make">
                    </div>
                    <div class="form-group">
                        <label for="model">Model:</label>
                        <input type="text" class="form-control" id="model">
                    </div>
                    <div class="form-group">
                        <label for="trim">Trim:</label>
                        <input type="text" class="form-control" id="trim">
                    </div>
                    <div class="form-group">
                        <label for="color">Color:</label>
                        <input type="text" class="form-control" id="color">
                    </div>
                    <div class="form-group">
                        <label for="vin">Vin:</label>
                        <input type="text" class="form-control" id="vin">
                    </div>
                </div>    
                 <div class="form-group col-md-6">    
                     <div class="form-group">
                        <label for="mileage">Mileage:</label>
                        <input type="text" class="form-control" id="mileage">
                    </div>
                    <div class="form-group">
                        <label for="purchaseDate">Purchase Date:</label>
                        <input type="date" class="form-control" id="purchaseDate">
                    </div>
                     <div class="form-group">
                        <label for="purchasePrice">Purchase Price:</label>
                        <input type="text" class="form-control" id="purchasePrice">
                    </div>
                    <div class="form-group">
                        <label for="description">Description:</label>
                        <input type="text" class="form-control" id="description">
                    </div>
                    <div class="form-group">
                        <label for="img_url">Image URl:</label>
                        <input type="text" class="form-control" id="img_url">
                    </div>
                </div>
               
            <button type="submit" class="btn btn-info">Add Vehicle</button>
              </div> 
            </form>`

    contentContainer.append(addVehiclePanel)

    let addVehicleForm = document.getElementById("add-vehicle-form")
    addVehicleForm.addEventListener("submit", function (e) {
        e.preventDefault()
        console.log(e.target[9].value)
        console.log(e.target[10].value)

        let data = {
            year: e.target[0].value,
            make: e.target[1].value,
            model: e.target[2].value,
            trim: e.target[3].value,
            color: e.target[4].value,
            vin: e.target[5].value,
            mileage: e.target[6].value,
            purchase_date: e.target[7].value,
            purchase_price: e.target[8].value,
            description: e.target[9].value,
            img_url: e.target[10].value
        }

        fetch('http://localhost:3000/vehicles', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(hideAll)
            .then(refreshDashboard)
            .then(() => {
                theCarousel.innerHTML = ""
            })
            .then(() => {
                fetch('http://localhost:3000/vehicles')
                    .then(resp => resp.json()).then(vehicles => displayvehicles(vehicles))
            })
        //need to rerender the vehicles carousel 
    })
}

//
// render add lead page
//

// hide dashboard
function hideAll() {

    let viewShowRow = document.getElementById("view-show-row")
    let addVehiclePanel = document.getElementById("add-vehicle-panel")
    let clientTracker = document.getElementById('client-table')
    statContainer.hidden = true
    leadContainer.hidden = true
    carouselContainer.hidden = true
    if (viewShowRow) {
        viewShowRow.hidden = true
    }
    if (addVehiclePanel) {
        addVehiclePanel.hidden = true
    }
    if (clientTracker) {
        clientTracker.hidden = true
    }
}

// unhide dashboard
function unhideDashboard() {
    let addVehiclePanel = document.getElementById("add-vehicle-panel")
    statContainer.hidden = false
    leadContainer.hidden = false
    carouselContainer.hidden = false
    if (addVehiclePanel) {
        addVehiclePanel.hidden = true
    }
}



//////////////////////////////////////
//////EXPERIMENTAL DRAG AND DROP//////
//////////////////////////////////////

var dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function (event) {

}, false);

document.addEventListener("dragstart", function (event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function (event) {
    // reset the transparency
    event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function (event) {
    // prevent default to allow drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function (event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.className == "dropzone") {
        event.target.style.background = "purple";
    }

}, false);

document.addEventListener("dragleave", function (event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className == "dropzone") {
        event.target.style.background = "";
    }

}, false);

document.addEventListener("drop", function (event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.className == "dropzone") {
        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
    }

}, false);