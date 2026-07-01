const moviesData = getMoviesData()
const moviesHtml = getMoviesHtml()

renderToWatchlist()

function renderToWatchlist(){
    const watchListEl = document.getElementById('watchlist-movies')
    if (localStorage.getItem('watchlist-movie-ids'))
    {
        const getWatchlistIds=localStorage.getItem('watchlist-movie-ids').split(',')
        const changeIdsArrayToObject = new Set(getWatchlistIds)
        const savedWatchlistIdsArr = [...changeIdsArrayToObject]
        const watchListMoviesHtml = []
        for (let id of savedWatchlistIdsArr){
            let movieIndex
            for (let movie of moviesData){
                if (movie.imdbId === id){
                    movieIndex = moviesData.indexOf(movie)
                }
            }
            watchListMoviesHtml.push(moviesHtml[movieIndex])
        }
        const emptyWatchlistEl = document.querySelector(".empty-watchlist")
        emptyWatchlistEl.style.display="none"
        watchListEl.innerHTML = watchListMoviesHtml.join('')
    }
}

function getMoviesHtml(){
    return JSON.parse(localStorage.getItem("moviesHtml"))
}

function getMoviesData(){
    return JSON.parse(localStorage.getItem("moviesData"))
}