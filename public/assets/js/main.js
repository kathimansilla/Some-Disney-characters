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

// ---> SECCIÓN VARIABLES GLOBALES
//const urlAPI = 'https://api.disneyapi.dev/character?pageSize=50';
const urlAPI = 'https://dev.adalab.es/api/disney?pageSize=15';
const imgEmpty = 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';
let favorite = false;

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
  if (card.imageUrl === '' || card.imageUrl === undefined) {
    card.imageUrl = 'imgEmpty';
  };
  const htmlCard = `<li class="card js__cardElement" id="${card._id}">
    <div class="card__imgContainer">
        <img
            src="${card.imageUrl}"
            alt="${card.name}"
            class="characterImg"
        />
    </div>
    <div class="card__nameContainer js__nameContainer">
      <p class="js__name">${card.name}</p>
      <i class="fa-solid fa-heart js__heartIcon"></i>
    </div>
  </li>`;
  return htmlCard;
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
    heartBackgroundAdd(clickedCardId, true);
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
    heartBackgroundAdd(idCard, true);
  }
}

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
// ---> EVENTOS

const addEventCard = () => {
  const cardElement = document.querySelectorAll('.js__cardElement');
  for (const card of cardElement) {
    card.addEventListener('click', handleClickCard);
  };
};

searchBntElement.addEventListener('click', handleClickSearch);

// ---> LOCAL STORAGE DATA

const cardFavoritesLS = localStorage.getItem('favoriteCard');
const init = () => {
  if (cardFavoritesLS) {
    cardListFavorites = JSON.parse(cardFavoritesLS);
    renderFavoriteList(cardListFavorites);
  };
};
init();
//# sourceMappingURL=main.js.map
