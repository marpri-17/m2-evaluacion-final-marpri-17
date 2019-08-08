'use strict';
// Elementos DOM
const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-search');
const seriesList = document.querySelector('.js-list');


let searchResult = [];
let favorites = [];

const getInputValue = () => input.value;
const clearListResult = () => seriesList.innerHTML = "";

const arrConstructor = (data) => {
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
    newItem.dataset.index = 123;
    let newImage = document.createElement('img');
    let newShow = document.createElement('h2');
    newItem.appendChild(newImage);
    newItem.appendChild(newShow);
    seriesList.appendChild(newItem);
    let newShowName = document.createTextNode(`${data[i].name}`);
    newShow.appendChild(newShowName);
    newImage.style = `background-image: url(${data[i].image}`;
    newItem.classList.add('series__item', 'js-item');
    newImage.classList.add('series__image');
    newShow.classList.add('series__show');
    }
}

const addListeners = ()=> {
    debugger;
    const seriesItem = document.querySelectorAll('.js-item');
    for (let item of seriesItem){
        item.addEventListener("click", handlerFavorites);
    }
} 
// Favorites
const saveFavorite = (ev) =>{
    ev.stopPropagation;
    let selectedFavorite = ev.currentTarget;
    favorites.push(searchResult[2]);
    favorites.push({
        name: selectedFavorite.name,
        image: selectedFavorite.image,
        id: selectedFavorite.id
    });
    return favorites;
}
/* const setFavorite = (favorites) =>{
    for (let i=0; i<favorites.length;i++){
        favorites[i].classList.remove('series__item');
        favorites[i].classList.add('favorite__item');
        const applyFavoriteClass = favorites[i].children;
        applyFavoriteClass[1].classList.remove('series__show');
        applyFavoriteClass[1].classList.add('favorite__txt');
    }
}
const saveLocalStorage = (favorites) =>{
    debugger;
    const jsonfavorite = JSON.stringify(favorites);
    localStorage.removeItem ('favorite');
    localStorage.setItem('favorite',jsonfavorite);
} */

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
    saveFavorite(event);
   /*  setFavorite(favorites);
    saveLocalStorage(favorites); */

}