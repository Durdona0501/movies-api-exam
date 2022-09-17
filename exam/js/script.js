let elMoviesForm = $(".js-movies-form");
let elMoviesSearch = $(".js-movies-search");
let elMoviesList = $(".js-movies-list");
let elMoviesPage = $(".js-movie-page");
let elPaginationList = $(".js-pagination-list");
let elPaginationNumbers = $(".js-page-numbers");
let elModalContent = $(".js-modal-content");
let elMoviesTemplate = $("#js-movies-template").content;

let page = 1;
let movieTitle = "harry";

async function fetchMovies (movie = "hulk") {
  const response = await fetch(`https://omdbapi.com/?apikey=a75504ec&s=${movie}&page=${page}`)
  const data = await response.json()
  
  elMoviesList.innerHTML = null;
  let elMoviesFragment = document.createDocumentFragment();

  data.Search.forEach(movie => {
    let elMovieItem = elMoviesTemplate.cloneNode(true);

    $(".card-img", elMovieItem).src = movie.Poster;
    $(".card-img", elMovieItem).alt = movie.Title;
    $(".card-title", elMovieItem).textContent = movie.Title;
    $(".card-text-year", elMovieItem).textContent = movie.Year;

    elMoviesFragment.appendChild(elMovieItem);
  })

  elMoviesList.appendChild(elMoviesFragment);

  elPaginationNumbers.innerHTML = "";
  for(i = 1; i < data.Search.length; i++) {
    let pageNumberItem = createElement("li", "page-item page-sub-item btn btn-info", i );
    pageNumberItem.dataset.moveID = i;

    elPaginationNumbers.appendChild(pageNumberItem);
  }
}
fetchMovies(movieTitle);
elPaginationList.addEventListener("click", evt => {
  if(evt.target.matches(".page-next-item")) {
    if(elMoviesSearch.value == "") {
      elMoviesSearch.value ="harry";
    }
    page++;
    fetchMovies(elMoviesSearch.value);
    elMoviesPage.textContent = `Page : ${page}`
  }

  if(evt.target.matches(".page-prev-item")) {
    if(page > 1) {
      page--;
      fetchMovies(elMoviesSearch.value);
      elMoviesPage.textContent = `Page : ${page}`
    }
  }

  if(evt.target.matches(".page-sub-item")) {
    let clickID = evt.target.dataset.moveID;
    page = clickID;
    fetchMovies(elMoviesSearch.value);
    elMoviesPage.textContent = `Page : ${page}`
  }
})

elMoviesForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    fetchMovies(elMoviesSearch.value.trim().toLowerCase());
})

// modal
let updateModalContent = function (movie) {
  $(".modal_film_img").src = movie.Poster;
  $(".js_film_title", elModalContent).textContent = movie.Title;
  $(".js_film_rating", elModalContent).textContent = movie.Year;
  $(".js_film_runtime", elModalContent).textContent = movie.Runtime
  $(".js_film_language", elModalContent).textContent = movie.Language;
  $(".js_film_categories", elModalContent).textContent = movie.Genre;
  $(".js_film_summary", elModalContent).textContent = movie.Plot;
}


elMoviesList.addEventListener("click", function (e) {
  if (e.target.matches(".modal-open")) {
    let movieImdbid = e.target.closest(".js-card-item").dataset.imdbID;

    let foundMovi = data.find(function (movie) {
      return movie.imdbID === movieImdbid
    })

    updateModalContent(foundMovi)
  }
})
  

