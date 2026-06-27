const renderMovies = document.getElementById('render-movies')
const moviesData = []
const moviesHtml = []
const watchListMoviesIds = []

document.addEventListener('click',function(e){
    if (e.target.classList.contains('addToWatchlist')){
        watchListMoviesIds.push(e.target.id)
        storeMovieIdLocally()
    }
    if(e.target.id==='searchBtn'){
        getMovieSearch()
    }
})

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
    storeMovieArraysLocally()
}

function storeMovieArraysLocally(){
    localStorage.setItem("moviesData",JSON.stringify(moviesData))
    localStorage.setItem("moviesHtml",JSON.stringify(moviesHtml))
}

async function renderMovieDetails(movie){
    const response = await fetch(`http://www.omdbapi.com/?apikey=621c5661&t=${movie.Title}`)
    const data = await response.json()
    const movieHtml =`
        <img class='movie-poster' src=${data.Poster}>
        <div class='movie-details'>
            <div class='movie-name-rating'>
                <p class='movie-title'>
                    ${data.Title}
                </p>
            </div>
            <div class='movie-runtime-genre-addToWatchlist'>
                <p class='movie-runtime'>
                    ${data.Runtime}
                </p>
                <p class='movie-genre'>
                    ${data.Genre}
                </p>
                <div class='WatchlistBtn-container'>
                    <img class='add-icon' src='images/add-icon.png'>
                    <button 
                    class='addToWatchlist'
                    id=${data.imdbID}>
                    Watchlist</button>
                </div>
                <p class='movie-plot'>
                    ${data.Plot}
                </p>
            </div>
        </div>
    ` 
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
