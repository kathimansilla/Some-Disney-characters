'use strict';
/*El ejercicio consiste en desarrollar una aplicación web que contiene un listado de personajes de Disney todo el planeta, que nos permite marcar y desmarcar los personajes como favoritos y guardarlos en localStorage.*/
// QUERYSELECTOR
//const  = document.querySelector('.');
const ulMainElement = document.querySelector('.js__listMain');

// VARIABLES GLOBALES
const urlAPI = 'https://api.disneyapi.dev/character?pageSize=50';
// urlAPI = 'api.disneyapi.dev/character?pageSize=50'
//urlAPIDeLasProfes = //dev.adalab.es/api/disney?pageSize=15

// FETCH
/*fetch()
.then()
.then()*/

fetch(urlAPI)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    ulMainElement.innerHTML = renderOneCard(data.data[0]);
  });

// FUNCIONES
const renderOneCard = (card) => {
  const htmlCard = 
  `<li class="card">
    <img
      src="${card.imageUrl}"
      alt="${card.name}"
      class="characterImg"
    />
    <div class="nameContainer">
      <i class="fa-solid fa-heart hidden"></i>
      <i class="fa-solid fa-heart-crack hidden"></i>
      <i class="fa-regular fa-heart"></i>
      <p>${card.name}</p>
    </div>
  </li>`;
  return htmlCard;
};
// EVENTOS

//# sourceMappingURL=main.js.map
