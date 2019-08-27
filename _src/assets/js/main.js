'use strict';
// Elementos DOM
const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-search');
const seriesList = document.querySelector('.js-list');
const favoritesList = document.querySelector('.js-favorite-list');
const favoritesSection = document.querySelector('.series__section');

let searchResult = [];
let favorites = [];

const getInputValue = () => input.value;

const clearListResult = (seriesList) => seriesList.innerHTML = "";

const pickedItem = (ev,arr) =>{
    ev.preventDefault();
    let selectedShow = ev.currentTarget;
    const foundFavoriteIndex =parseInt(selectedShow.getAttribute("data-ada-pos"));
    const item = arr[foundFavoriteIndex];
    return item;
}

const isFavorite = (item) =>{
 const itemId = item.id;
    for (let i=0; i<favorites.length; i++){
        let id = favorites[i].id;
        if (itemId ===id){
            return true;
        } 
    }
    return false;
}

const arrConstructor = (data) => {
    clearListResult(seriesList);
    searchResult = [];
    for (let i=0; i<data.length; i++){
        if (data[i].show.image){
        searchResult.push({
            name: data[i].show.name,
            image: data[i].show.image.original,
            id: data[i].show.id,
            genre: data[i].show.genres,
        })
    } else { 
        const insertShowName = (data[i].show.name).replace(" ","+");
            searchResult.push({
            name: data[i].show.name,
            image: "https://via.placeholder.com/300?text="+insertShowName,
            id: data[i].show.id,
            genre: data[i].show.genres,
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
        let newInfoList = document.createElement('ul');
        newItem.appendChild(newInfoList);
        debugger;
        for (let genre of data[i].genre){
            let newInfoItem = document.createElement('li');
            let newInfoContent = document.createTextNode (genre);
            newInfoItem.appendChild(newInfoContent);
            newInfoList.appendChild(newInfoItem);
        }   
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

const addListeners = (list,handler)=> {
    const seriesItem = document.querySelectorAll(list);
        for (let item of seriesItem){
            item.addEventListener("click", handler);
        }
} 
// Favorites


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
        newItem.dataset.adaPos = [i];
    }
}

const addFavorites = (element)=> favorites.push (element);

const saveLocalStorage = () =>{
    //localStorage.removeItem ('favorite');
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
        addListeners(".js-item", handlerFavorites);
    });
}


btnSearch.addEventListener('click', getDatafromServer);

// Delete favorite item
/* const deleteItem =(item)=>{
for (let i=0;i<favorites.length;i++)
    if(item.id ===favorites[i].id){
      favorites.splice(i,1);
       return favorites
    }
} */

const deleteFavorite = (ev) =>{
    const deletedItem = pickedItem(ev, JSON.parse(localStorage.getItem('favorite')));
    console.log (deletedItem.name);
    /* deleteItem(deletedItem);
    saveLocalStorage();
    clearListResult(favoritesList);
    showDataFavorites(favorites);
    addListeners('.js-item-favorite', deleteFavorite); */
}
//Handler favorites
const handlerFavorites =(event) =>{
    const seriesItem = pickedItem(event,searchResult);
    if (isFavorite(seriesItem)===false){
        addFavorites(seriesItem)
    }
    saveLocalStorage(favorites);
    clearListResult(favoritesList);
    showDataFavorites(favorites);
    debugger;
    addListeners('.js-item-favorite', deleteFavorite);
}

function starApp () {
    const savedFavorite = localStorage.getItem('favorite')
        if (savedFavorite !== null) {
            favorites = JSON.parse(savedFavorite);
            showDataFavorites(favorites);
        }
    addListeners('.js-item-favorite', deleteFavorite);
}

starApp();