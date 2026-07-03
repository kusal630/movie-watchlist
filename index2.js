import {changeWatchlistBtnImg} from "./index.js"
import { removeFromWatchlist } from "./index.js"

// document.addEventListener("click",function(e){
//     if (e.target.classList.contains("addedToWatchlist")){
//         window.location.reload()
//     }
// })


const savedMoviesData = getMoviesData()
const savedMoviesHtml = getMoviesHtml()
const savedWatchlistIdsArr=getMoviesData()

const emptyWatchlistEl = document.querySelector("#empty-watchlist")

renderToWatchlist()

function checkWatchlistIsEmpty(){
    if (savedWatchlistIdsArr.length){
        emptyWatchlistEl.style.display="none"
    }else{
        emptyWatchlistEl.style.display="flex"
    }   
}

function renderToWatchlist(){
    const watchListEl = document.getElementById('watchlist-movies')
    if (localStorage.getItem('watchlist-movie-ids'))
    {
        const watchListMoviesHtml = []
        for (let id of savedWatchlistIdsArr){
            watchListMoviesHtml.push(
                savedMoviesHtml[savedWatchlistIdsArr.indexOf(id)]
            )
        }
        checkWatchlistIsEmpty()
        watchListEl.innerHTML = watchListMoviesHtml.join('')
        savedWatchlistIdsArr.forEach(function(id){
            changeWatchlistBtnImg(id)
        })
    }else{
        window.location.reload()
        checkWatchlistIsEmpty()
    }
}

function getMoviesHtml(){
    return JSON.parse(localStorage.getItem("moviesHtml"))
}

function getMoviesData(){
    return JSON.parse(localStorage.getItem("moviesData"))
}

function getMoviesIds(){
    return localStorage.getItem('watchlist-movie-ids').split(',')
}