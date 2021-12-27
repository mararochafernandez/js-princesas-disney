'use strict';

/*** VERSION WITH LOCAL API ***/

const API_URL = '../api/users.json';

let users = [];
let favorites = [];

/* Do your magic! 🦄🦄🦄 */


// update favorite
function updateFavorite(user) {
  let favIndex = favorites.findIndex(fav => fav.id === user.dataset.id);
  if (favIndex === -1) {
    const length = favorites.push({ id: user.dataset.id, fav: true });
    favIndex = length - 1;
  } else {
    favorites[favIndex].fav = !favorites[favIndex].fav;
  }

  // set fav css style
  if (favorites[favIndex].fav) {
    user.classList.add('fav');
  } else {
    user.classList.remove('fav');
  }

  // save favorites in local storage
  localStorage.setItem('favorites', JSON.stringify(favorites));
}


// handle click event
function handleClickItem(event) {
  updateFavorite(event.currentTarget);
}


// render list of users
function renderList() {
  for (const user of users) {

    // image element <img>
    const newImage = document.createElement('img');
    newImage.className = 'list__image';
    newImage.src = user.picture;
    newImage.alt = user.name;

    // name element <h2>
    const newName = document.createElement('h2');
    newName.className = 'list__name';
    newName.textContent = user.name;

    // email element <p>
    const newEmail = document.createElement('p');
    newEmail.className = 'list__email';
    newEmail.textContent = `E-mail: ${user.email}`;

    // phone element <p>
    const newPhone = document.createElement('p');
    newPhone.className = 'list__phone';
    newPhone.textContent = `Teléfono: ${user.phone}`;

    // comment element <p>
    const newComment = document.createElement('p');
    newComment.className = 'list__comment';
    newComment.textContent = user.comment;

    // container element <div>
    const newContainer = document.createElement('div');
    newContainer.className = 'list__container';

    newContainer.appendChild(newName);
    newContainer.appendChild(newEmail);
    newContainer.appendChild(newPhone);
    newContainer.appendChild(newComment);

    // item element <li>
    const newItem = document.createElement('li');
    newItem.dataset.id = user.id;

    // set fav css style
    const favIndex = favorites.findIndex(fav => fav.id === user.id);
    newItem.className = favIndex !== -1 && favorites[favIndex].fav ? 'list__item fav' : 'list__item';

    // listen click event
    newItem.addEventListener('click', handleClickItem);

    newItem.appendChild(newImage);
    newItem.appendChild(newContainer);
    document.querySelector('.js-list').appendChild(newItem);
  }
}


// get users from api
function getUsersFromApi() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      users = data;
      renderList();
    });
}


// get favorites from local storage
function getFavoritesFromLocalStorage() {
  const favoritesFromLocalStorage = JSON.parse(localStorage.getItem('favorites'));
  if (favoritesFromLocalStorage) {
    favorites = favoritesFromLocalStorage;
  }
}


// start app
getFavoritesFromLocalStorage();
getUsersFromApi();