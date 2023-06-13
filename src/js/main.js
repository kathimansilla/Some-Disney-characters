'use strict';

// ---> SECCIÓN QUERYSELECTOR
const ulMainElement = document.querySelector('.js__listMain');
let ulFavoritesElement = document.querySelector('.js__listFavorite');
const inputElement = document.querySelector('.js__inputElement');
const searchBntElement = document.querySelector('.js__searchBnt');

// ---> ELEMENTOS CREADOS EN EL DOM
  const newIconHeartCrack = document.createElement('i');
  newIconHeartCrack.classList.add('fa-solid');
  newIconHeartCrack.classList.add('fa-heart-crack');

  const resetFavBtn = document.createElement('button');
  const resetFavBtnContent = document.createTextNode('Borrar favoritos');
  resetFavBtn.appendChild(resetFavBtnContent);
  resetFavBtn.classList.add('js__resetFavBtn');
  console.log(resetFavBtn);


// ---> SECCIÓN VARIABLES GLOBALES
//const urlAPI = 'https://api.disneyapi.dev/character?pageSize=50';
const urlAPI = 'https://dev.adalab.es/api/disney?pageSize=15';
const imgEmpty = 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';
let isFavorite = '';
let backGroundFav = '';
let colorFav = '';

// ---> SECCIÓN OBJETOS Y ARRAYS VACÍOS
let cardListApi = [];
let cardListFavorites = [];

// ---> SECCIÓN FETCH
fetch(urlAPI)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    cardListApi = data.data;
    renderCardList(cardListApi);
  });

// ---> SECCIÓN FUNCIONES
const renderOneCard = (card) => {
  fillEmptyImgURL(card);
  getFavoriteBackground(card);
  getFavoriteColor(card);

  const htmlCard = `<li class="card ${backGroundFav} js__cardElement" id="${card._id}">
    <div class="card__imgContainer">
        <img
            src="${card.imageUrl}"
            alt="${card.name}"
            class="characterImg"
        />
    </div>
    <div class="card__nameContainer js__nameContainer">
      <p class="${colorFav} js__name">${card.name}</p>
      <i class="fa-solid fa-heart ${colorFav} js__heartIcon"></i>
    </div>
  </li>`;
  return htmlCard;
};

const fillEmptyImgURL = (card) => {
  if (card.imageUrl === '' || card.imageUrl === undefined || card.imageUrl === null) {
    card.imageUrl = 'imgEmpty';
  };
};

const getFavoriteBackground = (card) => {
  isFavorite = cardListFavorites.find((favCard) => favCard._id === card._id);
  backGroundFav = isFavorite;

  if (isFavorite) {
    backGroundFav = 'card__favorite';
  }
  else {
    backGroundFav = '';
  };
  return backGroundFav;
};

const getFavoriteColor = (card) => {
  isFavorite = cardListFavorites.find((favCard) => favCard._id === card._id);
  colorFav = isFavorite;

  if (isFavorite) {
    colorFav = 'white';
  }
  else {
    colorFav = '';
  };
  return colorFav;
};

const renderCardList = (dataList) => {
  ulMainElement.innerHTML = '';
  for (const card of dataList) {
    ulMainElement.innerHTML += renderOneCard(card);  
  };
  addEventCard();
};

const handleClickCard = (event) => {
  const clickedCardId = parseInt(event.currentTarget.id);
  const selectedCard = cardListApi.find((card) => card._id === clickedCardId);
  const selectedCardIndex = cardListFavorites.findIndex((card) => card._id === clickedCardId);
  
  if (selectedCardIndex === -1) {
    cardListFavorites.push(selectedCard);
  }
  else {
    heartBackgroundDelete(clickedCardId);
    cardListFavorites.splice(selectedCardIndex, 1);
  }
  localStorage.setItem("favoriteCard", JSON.stringify(cardListFavorites));
  renderFavoriteList();
  renderCardList(cardListApi);
};

const renderFavoriteList = () => {
  ulFavoritesElement.innerHTML = '';
  for (const favoriteCard of cardListFavorites) {
    ulFavoritesElement.innerHTML += renderOneCard(favoriteCard);
    const idCard = favoriteCard._id;
    heartBackgroundAdd(idCard);
  }
  if (cardListFavorites) {
    ulFavoritesElement.appendChild(resetFavBtn);
  }
};

const heartBackgroundAdd = (idCard) => {
  const favoriteCard = document.getElementById(idCard);
  const nameContainer = favoriteCard.querySelector('.js__nameContainer');
  const iconHeart = nameContainer.querySelector('.js__heartIcon');
  const name = nameContainer.querySelector('.js__name');
  newIconHeartCrack.style.color = 'white'; 
  favoriteCard.style.backgroundColor = '#000000';
  name.style.color = 'white';
  nameContainer.appendChild(newIconHeartCrack);
  nameContainer.removeChild(iconHeart);
};

const heartBackgroundDelete = (idCard) => {
  renderCardList(cardListApi);
};

const handleClickSearch = (event) => {
  event.preventDefault();
  const inputValue = inputElement.value;
  const filterList = cardListApi.filter((card) => card.name.toLowerCase().includes(inputValue.toLowerCase()));
  renderCardList(filterList);
};

const handleKeyupEmptySearch = (event) => {
  if (inputElement.value === '') {
    renderCardList(cardListApi);
  };
};

const handelClickResetFav = (event) => {
  cardListFavorites = [];
  renderFavoriteList();
  renderCardList(cardListApi);
  localStorage.setItem("favoriteCard", JSON.stringify(cardListFavorites));
};
// ---> EVENTOS

const addEventCard = () => {
  const cardElement = document.querySelectorAll('.js__cardElement');
  for (const card of cardElement) {
    card.addEventListener('click', handleClickCard);
  };
};

searchBntElement.addEventListener('click', handleClickSearch);
inputElement.addEventListener('keyup', handleKeyupEmptySearch);
resetFavBtn.addEventListener('click', handelClickResetFav);

// ---> LOCAL STORAGE DATA

const cardFavoritesLS = localStorage.getItem('favoriteCard');
const init = () => {
  if (cardFavoritesLS) {
    cardListFavorites = JSON.parse(cardFavoritesLS);
    renderFavoriteList(cardListFavorites);
  };
};
init();