
const renderMovies = document.getElementById('render-movies')
const searchpageBackgroundEl = document.getElementById('searchpage-background')

const moviesData = []
let savedMoviesData = getSavedMoviesData()
let watchListMoviesIds = getSavedWatchlistIds()
console.log(savedMoviesData)

// localStorage.clear()

document.addEventListener('click',function(e){
    if (e.target.classList.contains('addToWatchlist')){
        pushDistinctWatchlistMovieIds(e.target.dataset.id)
        changeWatchlistBtnImg(e.target.dataset.id)
    }else if(e.target.classList.contains('addedToWatchlist')){
        console.log("running the remove function")
        removeFromWatchlist(e.target.dataset.id)
    }
    if(e.target.id==='searchBtn'){
        getMovieSearch()
    }
    if(e.target.classList.contains("read-more-btn")){
        showFullMoviePlot()
    }
})

export function addAddToWatchlistClass(imgDom,btnDom){
    imgDom.classList.add("addToWatchlist")
    btnDom.classList.add("addToWatchlist")
}

export function removeAddToWatchlistClass(imgDom,btnDom){
    imgDom.classList.remove("addToWatchlist")
    btnDom.classList.remove("addToWatchlist")
}

export function addAddedToWatchlistClass(imgDom,btnDom){
    imgDom.classList.add("addedToWatchlist")
    btnDom.classList.add("addedToWatchlist")
}

export function removeAddedToWatchlistClass(imgDom,btnDom){
    imgDom.classList.remove("addedToWatchlist")
    btnDom.classList.remove("addedToWatchlist")
}

function getWatchlistIconDom(id){
    return document.getElementById(`img-${id}`)
}

function getWatchlistBtnDom(id){
    return document.getElementById(`btn-${id}`)
}

export function removeFromWatchlist(id){
    watchListMoviesIds = watchListMoviesIds.filter(
        (watchlistId)=>{
            return watchlistId!=id
        }
    )
    let removeMovieIndex
    savedMoviesData = savedMoviesData.filter(
        (movie) => {
            removeMovieIndex = savedMoviesData.indexOf(movie)
            return movie.imdbId!=id
        }
    )
    changeWatchlistBtnImg(id)
    // storeMovieArraysLocally()
    storeMoviesArraysLocally()
}

function isPresentInWatchlist(id){
    if (watchListMoviesIds.includes(id)){
        return true
    }
    return false
}

function pushDistinctWatchlistMovieIds(id){
    console.log(id)
    console.log(watchListMoviesIds.includes(id))
    if(!watchListMoviesIds.includes(id)){
        console.log("pushing into watchlist ids")
        watchListMoviesIds.push(id)
        console.log("calling push function")
        pushSelectedMovieDetails(id)
        storeMoviesArraysLocally()
    }
}

export function changeWatchlistBtnImg(id){
    const imgEl = getWatchlistIconDom(id)
    const btnEl = getWatchlistBtnDom(id)
    if (isPresentInWatchlist(id)){
        removeAddToWatchlistClass(imgEl,btnEl)
        addAddedToWatchlistClass(imgEl,btnEl)
        imgEl.src = "images/remove-icon.png"
    }else{
        addAddToWatchlistClass(imgEl,btnEl)
        removeAddedToWatchlistClass(imgEl,btnEl)
        imgEl.src = "images/add-icon.png"
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
    console.log(`pushing movie with index`)
    storeMoviesArraysLocally()
}

function getSavedMoviesData(){
    console.log("inside the saved movies data fn")
    if (localStorage.getItem("moviesData")){
        console.log(JSON.parse(localStorage.getItem("moviesData")))
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

// function storeMovieArraysLocally(){
//     console.log(watchListMoviesIds)
//     localStorage.setItem("moviesData",JSON.stringify(savedMoviesData))
//     localStorage.setItem("watchlist-movie-ids",watchListMoviesIds)
// }

async function getMovieSearch(){
    const searchInpt = document.getElementById('search-input')
    renderMovies.innerHTML = ''
    const response = await fetch(`http://www.omdbapi.com/?apikey=621c5661&s=${searchInpt.value}`)
    const data = await response.json()
    console.log(Boolean(data.Search))
    searchInpt.value=''
    if (data.Search){
        const moviesHtml = []
        const movies = []
        for (let movie of data.Search){
            await renderMovieDetails(movie)
        }
    }else{
        console.log("inside else of search function")
        const emptySearchHtml = `
        <div class="search-fail-container">
            <p id='search-fail-message'>
                Unable to find what you're looking for.
                Please try another search.
            </p>
        </div>`
        chnageDomStylesHtml(emptySearchHtml)
        // searchpageBackgroundEl.style.display = "none"
        // renderMovies.innerHTML=`
        // <div class="search-fail-container">
        //     <p id='search-fail-message'>
        //         Unable to find what you're looking for.
        //         Please try another search.
        //     </p>
        // </div>`
    }
}

function storeMoviesArraysLocally(){
    localStorage.setItem("watchlist-movie-ids",watchListMoviesIds)
    localStorage.setItem("moviesData",JSON.stringify(savedMoviesData))
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
                <div class="movie-plot-read-more-btn">
                    <p class='movie-plot'>${data.Plot}</p>
                    <button class='read-more-btn'>Read More</button>
                </div>
            </div>
        </div>
    ` 
    // searchpageBackgroundEl.style.display = 'none'
    // renderMovies.style.display = "block"
    // renderMovies.innerHTML+= movieHtml
    chnageDomStylesHtml(movieHtml)
    changeWatchlistBtnImg(data.imdbID)
    moviesData.push({
        poster : data.Poster,
        title : data.Title,
        genre : data.Genre,
        runtime : data.Runtime,
        addedToWatchlist : false,
        plot : data.Plot,
        imdbId : data.imdbID,
        html : movieHtml
    })
}

function chnageDomStylesHtml(html){
    searchpageBackgroundEl.style.display = 'none'
    renderMovies.style.display = "block"
    renderMovies.innerHTML+= html
}
