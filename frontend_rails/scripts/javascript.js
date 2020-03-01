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

let statContainer = document.createElement('div')
    statContainer.className = 'row'
    statContainer.id = "stat-container"

let carouselContainer = document.createElement('div')
    carouselContainer.className = 'row'
    carouselContainer.id = "carousel-container"
        let theCarousel = document.createElement('div')
            theCarousel.className = "scrolling-wrapper"
            theCarousel.id = 'carousel'
            // iterate through cars when data available
            theCarousel.innerHTML = `
                <div class="card car-card"><h2>card</h2></div>
                <div class="card car-card"><h2>card </h2></div>
                <div class="card car-card"><h2>card </h2></div>
                <div class="card car-card"><h2>card </h2></div>
                <div class="card car-card"><h2>card </h2></div>
                <div class="card car-card"><h2>card </h2></div>
                <div class="card car-card"><h2>card </h2></div>
                <div class="card car-card"><h2>card </h2></div>
                <div class="card car-card"><h2>card </h2></div>`

    let personalStats = document.createElement('div')
        personalStats.className = "col-4"
        let personalStatCard = document.createElement('div')
            personalStatCard.className = 'card'
            personalStatCard.style = 'width: 350px'
            // when data is created insert function to iterate through here **********************
            personalStatCard.innerHTML = `
            <h5>Ed Hernandez</h5>
            <h6> President of Sales</h6>
            <p> $435365436 / $500000000 </p>
            `
            let progress = document.createElement('div')
                progress.className = 'progress'
                    // interpolate results to adjust the bar based on performance
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
                // WILL ITERATE WHEN DATA IS AVAILABLE!!! ******************************************
                    leaderBoard.innerHTML = `
                    <thead>
                    <tr>
                        <th style="width: 20%"> <button style="width: 100%;"> Daily </button> </th>
                        <th style="width: 20%"> <button style="width: 100%;"> Weekly </button> </th>
                        <th style="width: 20%"> <button style="width: 100%;">  Monthly </button> </th>
                        <th style="width: 20%"> <button style="width: 100%;"> Yearly </button> </th>
                        <th style="width: 20%"> <button style="width: 100%;"> Total </button> </th>
                    </tr>
                    </thead
                    <tr>
                        <td align="center"> Ed Hernandez </td>
                        <td align="center"> President of Sales </td>
                        <td align="center"> Monstars </td>
                        <td align="center"> $435365436 </td>
                        <td align="center"> 455 </td>
                    </tr>
                    <tr>
                        <td align="center"> Cheif Andrews </td>
                        <td align="center"> Cheif of Operations </td>
                        <td align="center"> Outlaws </td>
                        <td align="center"> $3985607 </td>
                        <td align="center"> 277 </td>
                    </tr>
                    <tr>
                        <td align="center"> Mles Higby </td>
                        <td align="center"> Senior Account Executive </td>
                        <td align="center"> Giants </td>
                        <td align="center"> $2384629 </td>
                        <td align="center"> 345 </td>
                    </tr>
                    <tr>
                        <td align="center"> Nathaniel </td>
                        <td align="center"> Account Executive </td>
                        <td align="center"> Giants </td>
                        <td align="center"> $34541 </td>
                        <td align="center"> 232 </td>
                    </tr>
                    <tr>
                        <td align="center"> Anthony </td>
                        <td align="center"> Sales Manager </td>
                        <td align="center"> Brooklyn Lakers </td>
                        <td align="center"> $234234345 </td>
                        <td align="center"> 2324 </td>
                    </tr>
                    <tr>
                        <td align="center"> Natalia Wit </td>
                        <td align="center"> Account Executive </td>
                        <td align="center"> Brooklyn Lakers </td>
                        <td align="center"> $2342235 </td>
                        <td align="center"> 321 </td>
                    </tr>
                    <tr>
                        <td align="center"> Jerry Jones </td>
                        <td align="center"> Owner </td>
                        <td align="center"> Cowboys </td>
                        <td align="center"> $3545643 </td>
                        <td align="center"> 3 </td>
                    </tr>
                    `

content.append(contentContainer)
contentContainer.append(statContainer, carouselContainer)
statContainer.append(personalStats,leaderBoardContainer)
carouselContainer.append(theCarousel)
leaderBoardContainer.append(leaderStatCard)
leaderStatCard.append(leaderBoard)
personalStats.append(personalStatCard)
personalStatCard.append(progress)

document.addEventListener("DOMContentLoaded", function(){

})
