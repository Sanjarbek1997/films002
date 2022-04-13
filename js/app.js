const elInput = document.querySelector(".search__input");
const elList = document.querySelector(".list");
const elPaginationList = document.querySelector(".pagination");

const elPrevBtn = document.querySelector(".prev");
const elNextBtn = document.querySelector(".next");

const elSortBtnLetter = document.querySelector(".sort-btn-letter");
const elSortBtnNumber = document.querySelector(".sort-btn-number");

const elFilmTemplate = document.querySelector(".film-template").content;
const elPaginationTemplate = document.querySelector(
  ".pagination-template"
).content;

const elModal = document.querySelector(".modal");
const elModalBtn = document.querySelector(".modal-btn");

const API_KEY = "9a8113ca";

let search = "terminator";

let page = 1;

// fetch("http://www.omdbapi.com/?i=tt3896198&apikey=" + API_KEY + "&s=spider")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     renderFilms(data.Search, elList);
//   });

async function getMovie(sort = false, num = 0) {
  console.log(sort);
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`
  );
  const data = await res.json();
  console.log(data);

  if (data.Response || data.Search.length) {
    console.log(data.Response);
    if (num) {
      renderFilms(data.Search, elList, sort, num);
    }
    if (sort) {
      renderFilms(data.Search, elList, sort);
    }
    if (true) {
      renderFilms(data.Search, elList);
    }
  }

  const totalPage = Math.ceil(data.totalResults / 10);

  elPaginationList.innerHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    const clonedItem = elPaginationTemplate.cloneNode(true);

    clonedItem.querySelector(".page-link").textContent = i;
    clonedItem.querySelector(".page-link").dataset.pageId = i;

    elPaginationList.appendChild(clonedItem);
  }

  if (page == 1) {
    elPrevBtn.classList.add("disabled");
  } else {
    elPrevBtn.classList.remove("disabled");
  }
  if (page == totalPage) {
    elNextBtn.classList.add("disabled");
  } else {
    elNextBtn.classList.remove("disabled");
  }
}

const renderFilms = (arr, elem, sort = false, num = 0) => {
  elem.innerHTML = "";

  const filmFragment = document.createDocumentFragment();
  if (sort) {
    arr.sort((a, b) => {
      if (a.Title > b.Title) {
        return 1;
      }
      if (a.Title < b.Title) {
        return -1;
      }

      return 0;
    });
  }
  if (num) {
    arr.sort((a, b) => {
      if (a.Year > b.Year) {
        return 1;
      }
      if (a.Year < b.Year) {
        return -1;
      }
      return 0;
    });
  }
  arr.forEach((element) => {
    const clonedTemplate = elFilmTemplate.cloneNode(true);

    clonedTemplate.querySelector(".film-item").dataset.itemId = element.imdbID;
    clonedTemplate.querySelector(".film-img").src = element.Poster;
    clonedTemplate.querySelector(".film-title").textContent = element.Title;
    clonedTemplate.querySelector(".film-year").textContent = element.Year;

    filmFragment.appendChild(clonedTemplate);
  });
  elem.appendChild(filmFragment);
};

elInput.addEventListener("change", (e) => {
  search = e.target.value;
  page = 1;
  elInput.value = ""
  getMovie();
});

elPrevBtn.addEventListener("click", () => {
  page--;
  getMovie();
});
elNextBtn.addEventListener("click", () => {
  page++;
  getMovie();
});

elPaginationList.addEventListener("click", (e) => {
  if (e.target.matches(".page-link")) {
    page = e.target.dataset.pageId;
    getMovie();
  }
});
elSortBtnLetter.addEventListener("click", () => getMovie(true));
elSortBtnNumber.addEventListener("click", () => getMovie(false, 1));

// elModal.addEventListener("click", () => {
//   elModal.classList.remove("d-flex");
// });
// elModalBtn.addEventListener("click", () => {
//   elModal.classList.remove("d-flex");
// });

getMovie();
