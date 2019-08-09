'use strict';
// Elementos DOM
const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-search');
const seriesList = document.querySelector('.js-list');
const favoritesList = document.querySelector('.js-favorite-list');



let searchResult = [];
let favorites = [];

const getInputValue = () => input.value;
const clearListResult = (seriesList) => seriesList.innerHTML = "";

const arrConstructor = (data) => {
    clearListResult(seriesList);
    searchResult = [];
    for (let i=0; i<data.length; i++){
        if (data[i].show.image){
        searchResult.push({
            name: data[i].show.name,
            image: data[i].show.image.original,
            id: data[i].show.id,
        })
    } else { 
        const insertShowName = (data[i].show.name).replace(" ","+");
            searchResult.push({
            name: data[i].show.name,
            image: "https://via.placeholder.com/300?text="+insertShowName,
            id: data[i].show.id,
        })
        }
    }
return searchResult;
}

const showData = (data) => {
    for (let i=0; i < data.length; i++){
    const newItem = document.createElement('li');
    let newImage = document.createElement('img');
    let newShow = document.createElement('h2');
    newItem.appendChild(newImage);
    newItem.appendChild(newShow);
    seriesList.appendChild(newItem);
    let newShowName = document.createTextNode(`${data[i].name}`);
    newShow.appendChild(newShowName);
    newImage.style = `background-image: url(${data[i].image}`;
    newItem.dataset.adaPos = [i];
    newItem.classList.add('series__item', 'js-item');
    newImage.classList.add('series__image');
    newShow.classList.add('series__show');

    }
}

const addListeners = ()=> {
    const seriesItem = document.querySelectorAll('.js-item');
    for (let item of seriesItem){
        item.addEventListener("click", handlerFavorites);
    }
} 
// Favorites
const saveFavorite = (ev) =>{
    ev.preventDefault();
    const savedFavorite = localStorage.getItem('favorite')
    let json = JSON.parse(savedFavorite);
    favorites = json;
    const selectedFavorite = ev.currentTarget;
    const foundFavorite =parseInt(selectedFavorite.getAttribute("data-ada-pos"));
    favorites.push(searchResult[foundFavorite]);
    return favorites;
}

const showDataFavorites = (favoritesData) => {
    for (let i=0; i < favoritesData.length; i++){
    const newItem = document.createElement('li');
    let newImage = document.createElement('img');
    let newShow = document.createElement('h2');
    newItem.appendChild(newImage);
    newItem.appendChild(newShow);
    favoritesList.appendChild(newItem);
    let newShowName = document.createTextNode(`${favoritesData[i].name}`);
    newShow.appendChild(newShowName);
    newImage.style = `background-image: url(${favoritesData[i].image}`;
    newItem.classList.add('series__item--favorite', 'js-item-favorite');
    newImage.classList.add('series__image--favorite');
    newShow.classList.add('series__show--favorite');

    }
}
// Check if id is in the list
// Necesito guardar favorites en local storage y despues
// comprobar si la ID esta en la búsqueda (searchResult),
// y aplicar las clases para visualizarlo

const saveLocalStorage = (favorites) =>{
    debugger;
    localStorage.removeItem ('favorite');
    localStorage.setItem('favorite',JSON.stringify(favorites));
}

// Handler
const getDatafromServer = (ev) =>{
    ev.preventDefault();
    const url = 'http://api.tvmaze.com/search/shows?q=';
    fetch (url + getInputValue())
    .then (Response => Response.json())
    .then (data => {
        data = arrConstructor(data);
        showData(data);
        addListeners();
    });
}


btnSearch.addEventListener('click', getDatafromServer);

//Handler favorites
const handlerFavorites =(event) =>{
    debugger;
    saveFavorite(event);
    debugger;
    saveLocalStorage(favorites);
    clearListResult(favoritesList);
    showDataFavorites(favorites);
}
function getLocalStorage () {
    const savedFavorite = localStorage.getItem('favorite')
    let json = JSON.parse(savedFavorite);
    return json;
}
function starApp () {
    const savedFavorite = localStorage.getItem('favorite')
    let json = JSON.parse(savedFavorite);
    showDataFavorites(json);
}

starApp();