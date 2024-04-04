// Fungsi untuk menampilkan loading 
function showLoading() {
  const loadingOverlay = document.querySelector(".loading-overlay");
  loadingOverlay.style.display = "block";
}

// Fungsi untuk menyembunyikan loading
function hideLoading() {
  const loadingOverlay = document.querySelector(".loading-overlay");
  loadingOverlay.style.display = "none";
}

// Fungsi untuk menangani peristiwa tombol pada elemen input
document.getElementById("search").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleUserInput();
  }
});

// Fungsi untuk menangani icon search
document.querySelector(".ri-search-line").addEventListener("click", () => handleUserInput());

// Fungsi untuk menangkap input dari user
function getUserInput() {
  const inputValue = document.getElementById("search").value.trim();
  return inputValue;
}

// Fungsi untuk menghandle input dari user
function handleUserInput() {
  const userInput = getUserInput();

  if (userInput) {
    showLoading();
    searchMovies(userInput);
  } else {
    error();
  }
}

// Fungsi untuk melakukan request ke API (by search)
async function searchMovies(userInput) {
  const apiUrl = `https://www.omdbapi.com/?apikey=c4f9d0ed&s=${userInput}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    hideLoading();

    // Memeriksa apakah response memiliki status ok (200)
    if (response.ok) {

      // Memeriksa apakah request berhasil (True) 
      if (data.Response === "True") {
        const movies = data.Search;

        // Variable Awal
        let posters = [];
        let titles = [];
        let years = [];
        let imdbId = [];

        for (let i = 0; i < movies.length; i++) {
          // Poster
          posters.push(movies[i].Poster);

          // Title
          titles.push(movies[i].Title);

          // Year
          years.push(movies[i].Year);

          // imdbID
          imdbId.push(movies[i].imdbID);
        }

        updateSearchUi(posters, titles, years, imdbId);
        clearInput();
      } else {
        const errorMessage = data.Error;
        displayErrorMessage(errorMessage)
        clearInput();
      }
    } else {
      throw new Error(`HTTP error! Status: ${response.status} Message : ${data.Error}`);
    }
  }
  catch (error) {
    console.error('Error:', error.message);
    hideLoading();
  }
}

// Fungsi untuk memperbarui search ui
function updateSearchUi(posters, titles, years, imdbId) {
  // Seleksi DOM
  const mainContent = document.querySelector(".main-content");

  // Manipulasi DOM
  mainContent.innerHTML = "";

  posters.forEach((poster, i) => {
    // Membuat element card container
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    // Membuat element card
    let card = document.createElement("div");
    card.classList.add("card");
    card.style.backgroundImage = `url(${poster})`;

    // Membuat element title
    let titleEl = document.createElement("div");
    titleEl.classList.add("title");
    titleEl.innerHTML = titles[i];

    // Membuat element year
    let yearEl = document.createElement("div");
    yearEl.classList.add("year");
    yearEl.innerHTML = years[i];

    // Membuat tombol detail
    let seeDetail = document.createElement("div")
    seeDetail.classList.add("see-detail");
    seeDetail.innerHTML = "See Detail";

    // Masukkan element
    cardContainer.appendChild(card);
    cardContainer.appendChild(titleEl);
    cardContainer.appendChild(yearEl);
    cardContainer.appendChild(seeDetail);
    mainContent.appendChild(cardContainer);

    // Menambahkan event click pada tombol detail
    seeDetail.addEventListener("click", () => {
      detailMovies(imdbId[i])
    });
  });
}

// Fungsi untuk mendapatkan detail film dari API
async function detailMovies(imdbId) {
  showLoading();
  const apiUrl = `https://www.omdbapi.com/?apikey=c4f9d0ed&i=${imdbId}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    hideLoading();

    // Memeriksa apakah response memiliki status ok (200)
    if (response.ok) {

      // Memeriksa apakah request berhasil (true)
      if (data.Response === "True") {
        updateDetailUi(data);
      } else {
        const errorMessage = data.Error;
        displayErrorMessage(errorMessage);
      }
    } else {
      throw new Error(`HTTP error! Status: ${response.status} Message : ${data.Error}`);
    }
  }
  catch (error) {
    console.error("Error:", error.message);
    hideLoading();
  }
}

// Fungsi untuk memperbarui detail ui
function updateDetailUi(data) {
  // Seleksi DOM
  const main = document.querySelector("main");

  // Membuat element aside 
  const aside = document.createElement("aside");

  // Manipulasi element aside
  detailEl(aside, data);

  // Masukkan element
  main.appendChild(aside);

  // Tutup aside 
  document.querySelector(".aside-close").addEventListener("click", () => {
    aside.remove();
  });

  return console.log(data);
}

// Fungsi untuk menyimpan detail element
function detailEl(aside, data) {
  return aside.innerHTML = `
  <div class="aside-container">
    <div class="aside-header">
      <div class="text-container">
        <div class="text-title">${data.Title}</div>
        <div class="text-released"><span>${data.Type}</span> ${data.Released}</div>
      </div>
      <div class="rating-container">
        <div class="rating-icon">
          <i class="ri-star-fill"></i>
        </div>
        <div class="rating">
          <div class="imdb-rating">${data.imdbRating}/10</div>
          <div class="imdb-votes">${data.imdbVotes}</div>
        </div>
      </div>
    </div>
    <table>
      <tr>
        <td rowspan="9" class="image"><img src= "${data.Poster}"></td>
      </tr>
      <tr>
        <td>Country: ${data.Country}</td>
      </tr>
      <tr>
        <td>Language: ${data.Language}</td>
      </tr>
      <tr>
        <td>Runtime: ${data.Runtime}</td>
      </tr>
      <tr>
        <td>Box Office: ${data.BoxOffice}</td>
      </tr>
      <tr>
        <td>Director: ${data.Director}</td>
      </tr>
      <tr>
        <td>Actors: ${data.Actors}</td>
      </tr>
      <tr>
        <td>Writer: ${data.Writer}</td>
      </tr>
      <tr>
        <td>Awards: ${data.Awards}</td>
      </tr>
      <tr>
        <td colspan="2" class="genre">${data.Genre}</td>
      </tr>
      <tr>
        <td colspan="2">${data.Plot}</td>
      </tr>
    </table>
    <div class="aside-close">X close</div>
  </div>
  `
}

// Fungsi untuk menutup aside
function close(element) {
  element.classList.add("hide");
}

// Fungsi untuk membersihkan nilai input
function clearInput() {
  document.getElementById("search").value = "";
}

// Fungsi untuk menampilkan pesan error
function displayErrorMessage(message) {
  const result = document.querySelector(".main-content");
  result.innerHTML = message;
}
