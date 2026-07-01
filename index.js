const renderMovies = document.getElementById('render-movies')
const moviesData = []
const moviesHtml = []
const savedMoviesData = []
const savedMoviesHtml = []
const watchListMoviesIds = []

localStorage.clear()

document.addEventListener('click',function(e){
    if (e.target.classList.contains('addToWatchlist')){
        watchListMoviesIds.push(e.target.id)
        storeMovieIdLocally(e.target.id)
        pushSelectedMovieDetails(e.target.id)
        storeMoviesArraysLocally()
    }
    if(e.target.id==='searchBtn'){
        getMovieSearch()
    }
})

function addClassToWatchlistBtnImg(){
    const watchlistBtnImg = document.querySelector(".watchlist-btn-img")
    watchlistBtnImg.classList.add("addedToWatchlist")
    changeWatchlistBtnImg()
}

function changeWatchlistBtnImg(){
    const addedToWatchlistEl = document.querySelector(".addedToWatchlist")
    addedToWatchlistEl.src = "images/remove-icon.png"
    console.log("changed logo img")
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
    addClassToWatchlistBtnImg()
}

function getSavedMoviesHtml(){
    if (localStorage.getItem("moviesHtml")){
        return localStorage.getItem("moviesHtml")
    }
}

function getSavedMoviesData(){
    if (localStorage.getItem("moviesData")){
        return localStorage.getItem("moviesdata")
    }
}

function getSavedWatchlistIds(){
    if (localStorage.getItem("watchlist-movie-ids")){
        return localStorage.getItem("watchlist-movie-ids").split(",")
    }else{
        return []
    }
}

function storeMovieIdLocally(){
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
                        <img class='watchlist-btn-img addToWatchlist' src='images/add-icon.png'>
                        <button 
                        class='addToWatchlist watchlistStyles'
                        id=${data.imdbID}>
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
