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

function start(login){
    if (login){

off()
    
fetch('http://localhost:3000/users')
    .then(resp => resp.json()).then(users => {
        allUsers = users
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

    function displayUsers(users){
        sortedUsers = users.sort((a,b) => (a.total_sales < b.total_sales) ? 1 : -1 )
        sortedUsers.forEach(user => leaderBoard.innerHTML += 
            `<tr>
            <td align="center" style="width: 20%"> ${user.name} </td>
            <td align="center" style="width: 20%"> ${user.position} </td>
            <td align="center" style="width: 20%"> ${user.cars_sold} </td>
            <td align="center" style="width: 20%"> $${user.total_sales} </td>
            <td align="center" style="width: 20%"> ${user.team_name} </td>
            </tr>` )
    }

    function displayClients(clients){
        clients.forEach(client => leadTable.innerHTML +=
            `<tr>
                <td>${client.fullname}</td>
                <td>${client.phone_number}</td>
                <td>${client.email}</td>
                <td>${client.address}</td>
            </tr>`)
    }

    personalStatCard.append(progress)

// overlay login page if user is not logged in

    } else if (login === false){
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
        form.addEventListener('submit', function(e){
            e.preventDefault()
            if (allUsers.find(user => user.name === e.target.elements[0].value)){
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
        function displayvehicles(vehicles){
            sorted_vehicles = vehicles.sort((a,b) => (a.purchase_date > b.purchase_date) ? 1 : -1 )
            sorted_vehicles.forEach(car => theCarousel.innerHTML +=
                `<div class="card car-card">
                <img src="${car.img_url}" height="120px" width="170px"></img>
                <p align="center"> <br>  ${car.year} ${car.make} ${car.model} <br> 
                Delivered: ${car.purchase_date} <br>
                Purchase Price: $${car.purchase_price} <br>
                Mileage: ${car.mileage}
                </p>
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
contentContainer.append(statContainer, carouselContainer,leadContainer)
statContainer.append(personalStats,leaderBoardContainer)
leadContainer.append(leadTable)
carouselContainer.append(theCarousel)
leaderBoardContainer.append(leaderStatCard)
leaderStatCard.append(leaderBoard)
personalStats.append(personalStatCard)