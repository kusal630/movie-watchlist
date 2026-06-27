const moviesData = getMoviesData()
const moviesHtml = getMoviesHtml()

renderToWatchlist()

function renderToWatchlist(){
    const watchListEl = document.getElementById('watchlist-movies')
    let savedWatchlistIds
    if (localStorage.getItem('watchlist-movie-ids'))
    {
        savedWatchlistIds=localStorage.getItem('watchlist-movie-ids').split(',')
        const watchListMoviesHtml = []
        for (let id of savedWatchlistIds){
            let movieIndex
            for (let movie of moviesData){
                if (movie.imdbId === id){
                    movieIndex = moviesData.indexOf(movie)
                }
            }
            watchListMoviesHtml.push(moviesHtml[movieIndex])
        }
        watchListEl.innerHTML = watchListMoviesHtml.join('')
    }
}

function getMoviesHtml(){
    return JSON.parse(localStorage.getItem("moviesHtml"))
}

function getMoviesData(){
    return JSON.parse(localStorage.getItem("moviesData"))
}