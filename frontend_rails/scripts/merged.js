let login = false
allUsers = []
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
                displayUsers(users)
            })
        fetch('http://localhost:3000/clients')
            .then(resp => resp.json()).then(clients => displayClients(clients))
        fetch('http://localhost:3000/vehicles')
            .then(resp => resp.json()).then(vehicles => displayvehicles(vehicles))
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
            sortedUsers.forEach(user => {
                if (user.id === loggedInUser.id){
                    leaderBoard.innerHTML +=
                        `<tr style="background-color:cyan">
                        <td align="center" style="width: 20%;"> ${user.name} </td>
                        <td align="center" style="width: 20%;"> ${user.position} </td>
                        <td align="center" style="width: 20%;"> ${user.cars_sold} </td>
                        <td align="center" style="width: 20%;"> $${user.total_sales} </td>
                        <td align="center" style="width: 20%;"> ${user.team_name} </td>
                        </tr>`
                    } else {
                        console.log(user.id, loggedInUser.id)
                leaderBoard.innerHTML +=
                `<tr>
            <td align="center" style="width: 20%"> ${user.name} </td>
            <td align="center" style="width: 20%"> ${user.position} </td>
            <td align="center" style="width: 20%"> ${user.cars_sold} </td>
            <td align="center" style="width: 20%"> $${user.total_sales} </td>
            <td align="center" style="width: 20%"> ${user.team_name} </td>
            </tr>`}})
        }

        function displayClients(clients) {
            clients.forEach(client => leadTable.innerHTML +=
                `<tr>
                <td>${client.fullname}</td>
                <td>${client.phone_number}</td>
                <td>${client.email}</td>
                <td>${client.address}</td>
            </tr>`)
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

function displayvehicles(vehicles) {
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
                    <th scope="col">Name</th>
                    <th scope="col">Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                </tr>
            </thead>`
content.append(contentContainer)
contentContainer.append(statContainer, carouselContainer, leadContainer)
statContainer.append(personalStats, leaderBoardContainer)


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
    bootstrapRow.style = "margin-top:20px"

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
    vehicleInfo.className = "col-md-5"

    let vehicleToolbar = document.createElement("div")
    vehicleToolbar.className = "col-md-1"
    vehicleToolbar.innerHTML = `
    <button class="btn btn-warning vehicle-toolbar" style="margin: 3px">Notes</button>
    <button class="btn btn-info vehicle-toolbar" id="edit-button" style="margin: 3px">Edit</button>
    <button class="btn btn-success vehicle-toolbar" id="sell-button" style="margin: 3px"> Sell </button>`


    // Add event listeners for these buttons
    // let editButton = document.getElementById("edit-button")

    //CHECK HERE THE USER TYPE

    bootstrapRow.append(vehicleInfo)
    bootstrapRow.append(vehicleToolbar)

    fetch(`http://localhost:3000/vehicles/${vehicleId}`)
        .then(response => response.json())
        .then(body => {
            vehicleImage.src = `${body.img_url}`;
            let suggestedSalePrice = body.purchase_price * 1.2
            vehicleInfo.innerHTML = `<h2>${body.year} ${body.make} ${body.model}</h2>
            <p>Vin: ${body.vin} </p><p>Mileage: ${body.mileage} </p>
            <p>Color: ${body.color} </p><p>Purchase Date: ${body.purchase_date} </p>
            <p>Purchase Price: $${body.purchase_price} </p>
            <p>Suggested Sale Price: $${suggestedSalePrice} </p>
            <p>Description: ${body.description} </p>
            `
            
            let editButton = document.getElementById("edit-button")
            editButton.dataset["id"] = body.id
            editButton.addEventListener("click", renderEditPage)
           
            let sellButton = document.getElementById("sell-button")
            sellButton.dataset["id"] = body.id
            sellButton.addEventListener("click", renderSellPage)
           
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
    if (document.getElementById("edit-vehicle-form")) {
        document.getElementById("edit-vehicle-form").remove()
    }
    if (document.getElementById("sell-vehicle-form")) {
        document.getElementById("sell-vehicle-form").remove()
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
            </form>
          
    `

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
    statContainer.hidden = true
    leadContainer.hidden = true
    carouselContainer.hidden = true
    if (viewShowRow) {
        viewShowRow.hidden = true
    }
    if (addVehiclePanel) {
        addVehiclePanel.hidden = true
    }
    if (document.getElementById("edit-vehicle-form")) {
        document.getElementById("edit-vehicle-form").remove()
    }
    if (document.getElementById("sell-vehicle-form")) {
        document.getElementById("sell-vehicle-form").remove()
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



/////
//render edit page
/////
function renderEditPage(e){
    console.log(e.target.dataset.id)
    hideAll()


    fetch(`http://localhost:3000/vehicles/${e.target.dataset.id}`)
        .then(response => response.json())
            .then(body => {
                let editDiv = document.createElement("div")
                editDiv.innerHTML = `
                   
            
            <form style="" id="edit-vehicle-form" data-id="${body.id}">
             <h2> <i class="fa fa-car" style="margin-right: 10px; margin-top: 20px"></i>Edit Vehicle </h2>
            <div class="row">
                <div class="form-group col-md-6">
                    <div class="form-group">
                        <label for="year">Year:</label>
                        <input type="text" class="form-control" id="year" value="${body.year}">
                     </div>
                    <div class="form-group">
                        <label for="make">Make:</label>
                        <input type="text" class="form-control" id="make" value="${body.make}">
                    </div>
                    <div class="form-group">
                        <label for="model">Model:</label>
                        <input type="text" class="form-control" id="model" value="${body.model}">
                    </div>
                    <div class="form-group">
                        <label for="trim">Trim:</label>
                        <input type="text" class="form-control" id="trim" value="${body.trim}">
                    </div>
                    <div class="form-group">
                        <label for="color">Color:</label>
                        <input type="text" class="form-control" id="color" value="${body.color}">
                    </div>
                    <div class="form-group">
                        <label for="vin">Vin:</label>
                        <input type="text" class="form-control" id="vin" value="${body.vin}">
                    </div>
                </div>    
                 <div class="form-group col-md-6">    
                     <div class="form-group">
                        <label for="mileage">Mileage:</label>
                        <input type="text" class="form-control" id="mileage" value="${body.mileage}">
                    </div>
                    <div class="form-group">
                        <label for="purchaseDate">Purchase Date:</label>
                        <input type="date" class="form-control" id="purchaseDate" value="${body.purchase_date}">
                    </div>
                     <div class="form-group">
                        <label for="purchasePrice">Purchase Price:</label>
                        <input type="text" class="form-control" id="purchasePrice" value="${body.purchase_price}">
                    </div>
                    <div class="form-group">
                        <label for="description">Description:</label>
                        <input type="text" class="form-control" id="description" value="${body.description}">
                    </div>
                    <div class="form-group">
                        <label for="img_url">Image URl:</label>
                        <input type="text" class="form-control" id="img_url" value="${body.img_url}">
                    </div>
                </div>
               
            <button type="submit" class="btn btn-info">Update Vehicle</button>
              </div> 
            </form>

                `
                
                contentContainer.append(editDiv)

                let editVehicleForm = document.getElementById("edit-vehicle-form")
                editVehicleForm.addEventListener("submit", function(e){

                    e.preventDefault()

                    let data = {
                        id: e.target.dataset.id,
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


                    fetch(`http://localhost:3000/vehicles/${e.target.dataset.id}`, {
                        method: "PATCH",
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

                })

            })



    // append to the main element
}




/////
//render sale page
/////

function renderSellPage(e){

    hideAll()
    renderShowPage(e.target.dataset.id) 


    let clientSelect = document.createElement("select")
        console.log(clientSelect)
    
    fetch('http://localhost:3000/clients')
       .then(resp => resp.json())
        .then(clients => {
            clients.forEach(client => {

                let newOption = document.createElement("option")
                newOption.value = client.id
                newOption.innerHTML = client.fullname
                clientSelect.append(newOption)
            })

            let sellInfoDiv = document.createElement("div")
            sellInfoDiv.id = "sell-info-div"
            sellInfoDiv.innerHTML = `
                <form style="" id="sell-vehicle-form" data-id="${e.target.dataset.id}">
                <div class="form-group">
                    <label for="sale_price">Sale Price:</label>
                    <input type="number" class="form-control" id="sale_price">
                </div>`
            sellInfoDiv.children[0].append(clientSelect)
            sellInfoDiv.children[0].innerHTML += `<button type="submit" class="btn btn-success">Sell</button>
         </form>`

    document.getElementById("edit-button").remove()
    document.getElementById("sell-button").remove()
            
        contentContainer.append(sellInfoDiv)
        let sellVehicleForm = document.getElementById("sell-vehicle-form")
        sellVehicleForm.addEventListener("submit", function (e) {
            e.preventDefault()
            console.log(e.target[1].value)

            
                    let data = {
                        id: parseInt(e.target.dataset.id),
                        sale_price: e.target[0].value,
                        sold: true
                    }
                    console.log(data)


                    fetch(`http://localhost:3000/vehicles/${e.target.dataset.id}`, {
                        method: "PATCH",
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


                        let dataNewSale = {
                            vehicle_id: e.target.dataset.id,
                            client_id: e.target[1].value,
                            user_id: loggedInUser.id
                        }
                    
                    fetch(`http://localhost:3000/sales`, {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(dataNewSale)
                    })

                    //
                    dataUserSales = {
                        id: loggedInUser.id,
                        sale_price_to_add: e.target[0].value,
                        total_sales: e.target[0].value
                    }

                    fetch(`http://localhost:3000/users/${loggedInUser.id}`, {
                            method: "PATCH",
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(dataUserSales)
                        })


            })
        })

        let sellInfoDiv = document.getElementById("sell-info-div")

    //need all clients 

    
}


/////
//inventory page
/////