
const OMDB_API_KEY = " 1cf2cc67";

// Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("searchResults");

let currentMovie = null;

// Search Button

searchBtn.addEventListener("click", () => {

    const movieName = searchInput.value.trim();

    if(movieName === ""){
        alert("Please enter a movie name.");
        return;
    }

    searchMovie(movieName);

});


// Press Enter to Search

searchInput.addEventListener("keydown", (e)=>{

    if(e.key === "Enter"){
        searchBtn.click();
    }

});


// Search Movie

async function searchMovie(movie){

    results.innerHTML = `
        <h2 style="text-align:center;">
            Loading Movie...
        </h2>
    `;

    try{

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(movie)}`
        );

        const data = await response.json();

        if(data.Response === "False"){

            results.innerHTML = `
                <h2 style="text-align:center;color:red;">
                    Movie Not Found
                </h2>
            `;

            return;

        }

        currentMovie = data;

        displayMovie(data);

        document.getElementById("resultsSection").scrollIntoView({
        behavior: "smooth" ,
        block: "start"
});

    }

    catch(error){

        console.error(error);

        results.innerHTML = `
            <h2 style="text-align:center;color:red;">
                Something went wrong.
            </h2>
        `;

    }

}


// Display Movie

function displayMovie(movie){

    results.innerHTML = `

    <div class="movie-card">

        <img src="${movie.Poster}" alt="${movie.Title}">

        <h2>${movie.Title}</h2>

        <p><strong>Year:</strong> ${movie.Year}</p>

        <p><strong>Released:</strong> ${movie.Released}</p>

        <p><strong>Genre:</strong> ${movie.Genre}</p>

        <p><strong>Runtime:</strong> ${movie.Runtime}</p>

        <p><strong>Language:</strong> ${movie.Language}</p>

        <p><strong>Country:</strong> ${movie.Country}</p>

        <p><strong>Director:</strong> ${movie.Director}</p>

        <p><strong>Writer:</strong> ${movie.Writer}</p>

        <p><strong>Actors:</strong> ${movie.Actors}</p>

        <p><strong>Awards:</strong> 🏆 ${movie.Awards}</p>

        <p><strong>IMDb Rating:</strong> ⭐ ${movie.imdbRating}</p>

        <p><strong>IMDb Votes:</strong> ${movie.imdbVotes}</p>

        <p><strong>Box Office:</strong> ${movie.BoxOffice}</p>

        <p style="margin-top:15px;">
            ${movie.Plot}
        </p>

        <div style="margin-top:20px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">

            <button id="trailerBtn">
                🎬 Watch Trailer
            </button>

            <button id="favoriteBtn">
                ❤️ Add Favorite
            </button>

        </div>

    </div>

    `;

    // Events after card is created

    document
    .getElementById("trailerBtn")
    .addEventListener("click", ()=>{

        watchTrailer(movie.Title);

    });

    document
    .getElementById("favoriteBtn")
    .addEventListener("click", ()=>{

        addFavorite();

    });

}

// Open Trailer (YouTube Search)

function watchTrailer(movieTitle){

    const url =
    `https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle+" Trailer")}`;

    window.open(url, "_blank");

}



// Add Favorite

function addFavorite(){

    if(currentMovie == null){
        return;
    }

    let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

    // Prevent duplicates
    const exists = favorites.some(movie => movie.imdbID === currentMovie.imdbID);

    if(exists){

        alert("Movie already in Favorites!");
        return;

    }

    favorites.push(currentMovie);

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    alert("❤️ Added to Favorites!");

}




// Show Favorites

function showFavorites(){

    let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

    if(favorites.length===0){

        results.innerHTML=`
        <h2 style="text-align:center;">
        No Favorite Movies Yet ❤️
        </h2>
        `;

        return;

    }

    let html="";

    favorites.forEach(movie=>{

        html += `

        <div class="movie-card">

            <img src="${movie.Poster}">

            <h2>${movie.Title}</h2>

            <p><strong>Year:</strong> ${movie.Year}</p>

            <p><strong>Genre:</strong> ${movie.Genre}</p>

            <p><strong>IMDb:</strong> ⭐ ${movie.imdbRating}</p>

            <button onclick="removeFavorite('${movie.imdbID}')">
                ❌ Remove
            </button>

        </div>

        `;

    });

    results.innerHTML = html;

}




// Remove Favorite

function removeFavorite(id){

    let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

    favorites =
    favorites.filter(movie=>movie.imdbID !== id);

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    showFavorites();

}




// Header Favorite Icon

document
.querySelector(".fa-heart")
.addEventListener("click",showFavorites);





// Search Icon

document
.querySelector(".fa-magnifying-glass")
.addEventListener("click",()=>{

    searchBtn.click();

});





// Category Buttons

document
.querySelectorAll(".category-buttons button")
.forEach(button=>{

    button.addEventListener("click",()=>{

        searchInput.value = button.innerText;

        searchBtn.click();

    });

});










// Clear Search

searchInput.addEventListener("focus",()=>{

    searchInput.select();

});





// Search Empty Alert

searchInput.addEventListener("input",()=>{

    if(searchInput.value.length===0){

        results.innerHTML="";

    }

});




// Escape Key Clears Search

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        searchInput.value="";
        results.innerHTML="";

    }

});





// Console Welcome

console.log("🎬 Filmy Verse Loaded Successfully");


window.addEventListener("load", () => {

    searchInput.focus();

});

