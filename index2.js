// import { removeFromWatchlist } from "./index.js"
// import { changeWatchlistBtnImg } from "./index.js"
import {
    removeFromWatchlist,
    changeWatchlistBtnImg,
    showFullMoviePlot
} from "./index.js"

let savedMoviesData = getMoviesData()
let savedMoviesHtml = getMoviesHtml()
let savedWatchlistIdsArr=getMoviesIds()

const emptyWatchlistEl = document.querySelector("#empty-watchlist")


document.addEventListener("click",function(e){
    console.log(e.target)
    if (e.target.classList.contains("addToWatchlist")){
        console.log("inside the event listener")
        removeFromWatchlist(e.target.dataset.id)
        // removeFromWatchlist(e.target.dataset.id)
        window.location.reload()
    }
    if(e.target.classList.contains("read-more-btn")){
        console.log(e.target)
        // showFullMoviePlot(e.target.dataset.id)
    }
})

// function changeLocalStorage(){
//     localStorage.setItem("moviesData",JSON.stringify(savedMoviesData))
//     localStorage.setItem("watchlist-movie-ids",savedWatchlistIdsArr)
// }

// function removeMovieFromWatchlist(id){
//     console.log(savedWatchlistIdsArr)
//     savedWatchlistIdsArr = savedWatchlistIdsArr.filter(
//         (watchlistId)=>{
//             console.log(watchlistId)
//             return watchlistId!=id
//         }
//     )
//     console.log(savedWatchlistIdsArr)
//     let removeMovieIndex
//     console.log(savedMoviesData)
//     savedMoviesData = savedMoviesData.filter(
//         (movie) => {
//             removeMovieIndex = savedMoviesData.indexOf(movie)
//             return movie.imdbId!=id
//         }
//     )
//     console.log(savedMoviesData)
//     savedMoviesHtml = getMoviesHtml()
//     console.log(savedMoviesHtml)
//     changeLocalStorage()
// }

// function changeWatchlistBtnIcon(imgDom){
//     imgDom.src = "images/remove-icon.png"
// }

renderToWatchlist()

// function changeWatchlistClass(id){
//     console.log(id)

//     const imgEl = getWatchlistIconDom(id)
//     const btnEl = getWatchlistBtnDom(id)
//     removeAddToWatchlistClass(imgEl,btnEl)
//     addAddedToWatchlistClass(imgEl,btnEl)
//     // imgEl.classList.remove("addToWatchlist")
//     // btnEl.classList.remove("addToWatchlist")
//     // imgEl.classList.add("addedToWatchlist")
//     // btnEl.classList.add("addedToWatchlist")
//     // changeWatchlistBtnImg(id)
// }

function checkWatchlistIsEmpty(){
    if (savedMoviesHtml.length){
        emptyWatchlistEl.style.display="none"
    }else{
        console.log("inside else of empty watchlist")
        emptyWatchlistEl.style.display="flex"
    }   
}

function renderToWatchlist(){
    const watchListEl = document.getElementById('watchlist-movies')
    console.log(Boolean(localStorage.getItem('watchlist-movie-ids')))
    if (savedMoviesHtml)
    {
        // watchListMoviesHtml.push(savedMoviesHtml.join(''))
        checkWatchlistIsEmpty()
        watchListEl.innerHTML = savedMoviesHtml.join("")
        // changeWatchlistClass()

        // for (let id of savedWatchlistIdsArr){
        //     watchListMoviesHtml.push(
        //         savedMoviesHtml[savedWatchlistIdsArr.indexOf(id)]
        //     )
        // }
        // // checkWatchlistIsEmpty()
        // console.log(savedWatchlistIdsArr)
        savedWatchlistIdsArr.forEach(function(id){
            console.log("changing class")
            changeWatchlistBtnImg(id) 
        })
    }else{
        console.log("inside the else of render function")
        checkWatchlistIsEmpty()
        // watchListEl.innerHTML = null
    }

}

function getMoviesHtml(){
    if (savedMoviesData){
        const moviesHtml = []
        savedMoviesData.forEach(function(movie){
            moviesHtml.push(movie.html)
        })
        return moviesHtml
    }else{
        return []
    }
}

function getMoviesData(){
    if (localStorage.getItem("moviesData")){
        return JSON.parse(localStorage.getItem("moviesData"))
    }else{
        return []
    }
}

function getMoviesIds(){
    if (localStorage.getItem('watchlist-movie-ids')){
        return localStorage.getItem('watchlist-movie-ids').split(',')
    }else{
        return []
    }
}