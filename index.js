const renderMovies = document.getElementById('render-movies')
const moviesData = []
const moviesHtml = []
let savedMoviesData = getSavedMoviesData()
let savedMoviesHtml = getSavedMoviesHtml()
let watchListMoviesIds = getSavedWatchlistIds()

// localStorage.clear()

document.addEventListener('click',function(e){
    if(e.target.classList.contains('addedToWatchlist')){
        removeFromWatchlist(e.target.dataset.id)
    }

    if (e.target.classList.contains('addToWatchlist')){
        pushDistinctWatchlistMovieIds(e.target.dataset.id)
        changeWatchlistBtnImg(e.target.dataset.id)
    }
    if(e.target.id==='searchBtn'){
        getMovieSearch()
    }
})

function removeFromWatchlist(id){
    watchListMoviesIds = watchListMoviesIds.filter(
        (watchlistId)=>{
            console.log("removed the id")
            watchlistId!=id
        }
    )
    let removeMovieIndex
    console.log(savedMoviesData) 
    savedMoviesData = savedMoviesData.filter(
        (movie) => {
            console.log(movie)
            removeMovieIndex = savedMoviesData.indexOf(movie)
            console.log(`removed the id ${id}`)
            return movie.imdbId!=id
        }
    )
    console.log(savedMoviesData)
    console.log(removeMovieIndex)
}

function isPresentInWatchlist(id){
    if (watchListMoviesIds.includes(id)){
        return true
    }
    return false
}

function pushDistinctWatchlistMovieIds(id){
    console.log(id)
    if(!watchListMoviesIds.includes(id)){
        watchListMoviesIds.push(id)
        pushSelectedMovieDetails(id)
        storeMovieIdLocally(id)
    }
}

// function addClassToWatchlistBtnImg(id){
//     if (!isPresentInWatchlist(id)){
//         imgEl.classList.toggle("addedToWatchlist")
//     }
// }

function changeWatchlistBtnImg(id){
    if (isPresentInWatchlist(id)){
        const imgEl = document.getElementById(`img-${id}`)
        imgEl.classList.add("addedToWatchlist")
        imgEl.src = "images/remove-icon.png"
    }
}

function pushSelectedMovieDetails(movieId){
    console.log("inside push function")
    let movieIndex
    for (let movie of moviesData){
        if (movie.imdbId===movieId){
            savedMoviesData.push(movie)
            movieIndex = moviesData.indexOf(movie)
        }
    }
    savedMoviesHtml.push(moviesHtml[movieIndex])
    storeMoviesArraysLocally()
}

function getSavedMoviesHtml(){
    console.log("inside the saved movies html fn")
    if (localStorage.getItem("moviesHtml")){
        return JSON.parse(localStorage.getItem("moviesHtml"))
    }else{
        return []
    }
}

function getSavedMoviesData(){
    console.log("inside the saved movies data fn")
    if (localStorage.getItem("moviesData")){
        return JSON.parse(localStorage.getItem("moviesData"))
    }else{
        return []
    }
}

function getSavedWatchlistIds(){
    console.log("inside the function saved ids")
    if (localStorage.getItem("watchlist-movie-ids")){
        return localStorage.getItem("watchlist-movie-ids").split(",")
    }else{
        return []
    }
}

function storeMovieIdLocally(id){
    console.log(watchListMoviesIds)
    localStorage.setItem("watchlist-movie-ids",watchListMoviesIds)
}

async function getMovieSearch(){
    const searchInpt = document.getElementById('search-input')
    const response = await fetch(`http://www.omdbapi.com/?apikey=621c5661&s=${searchInpt.value}`)
    const data = await response.json()
    const moviesHtml = []
    searchInpt.value=''
    renderMovies.innerHTML = ''
    const movies = []
    for (let movie of data.Search){
        await renderMovieDetails(movie)
    }
}

function storeMoviesArraysLocally(){
    localStorage.setItem("moviesData",JSON.stringify(savedMoviesData))
    localStorage.setItem("moviesHtml",JSON.stringify(savedMoviesHtml))
}

async function renderMovieDetails(movie){
    const response = await fetch(`http://www.omdbapi.com/?apikey=621c5661&t=${movie.Title}`)
    const data = await response.json()
    console.log(data)
    const movieHtml =`
        <div class='separate-movie'>
            <img class='movie-poster' src=${data.Poster}>
            <div class='movie-details'>
                <div class='movie-name-rating'>
                    <p class='movie-title'>
                        ${data.Title}
                    </p>
                    <img 
                    class='star-icon'
                    alt='yellow color star icon'
                    src=${"images/star-icon.png"}
                    >
                    <p class='rating'>${data.imdbRating}</p>
                </div>
                <div class='movie-runtime-genre-addToWatchlist'>
                    <p class='movie-runtime'>
                        ${data.Runtime}
                    </p>
                    <p class='movie-genre'>
                        ${data.Genre}
                    </p>
                    <div class='watchlistBtn-container'>
                        <img 
                        class='watchlist-btn-img addToWatchlist' 
                        src='images/add-icon.png'
                        id='img-${data.imdbID}'
                        data-id=${data.imdbID}>
                        <button 
                        class='addToWatchlist watchlistStyles'
                        id='btn-${data.imdbID}'
                        data-id=${data.imdbID}>
                        Watchlist</button>
                    </div>
                </div>
                <p class='movie-plot'>${data.Plot}</p>
            </div>
        </div>
    ` 
    const searchpageBackgroundEl = document.getElementById('searchpage-background')
    searchpageBackgroundEl.style.display = 'none'
    renderMovies.innerHTML+= movieHtml
    moviesData.push({
        poster : data.Poster,
        title : data.Title,
        genre : data.Genre,
        runtime : data.Runtime,
        addedToWatchlist : false,
        plot : data.Plot,
        imdbId : data.imdbID
    })
    moviesHtml.push(movieHtml)
}
