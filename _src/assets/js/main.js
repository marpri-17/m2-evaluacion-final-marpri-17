'use strict';
// Elementos DOM
const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-search');
const seriesList = document.querySelector('.js-list');

let searchResult = [];

const getInputValue = () => input.value;

const arrConstructor = (data) => {
    for (let i=0; i<data.length; i++){
        if (data[i].show.image){
        searchResult.push({
            name: data[i].show.name,
            image: data[i].show.image.original,
        })
    } else { 
        const insertShowName = (data[i].show.name).replace(" ","+");
            searchResult.push({
            name: data[i].show.name,
            image: "https://via.placeholder.com/300?text="+insertShowName,
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
    newItem.classList.add('series__item', 'js-item');
    newImage.classList.add('series__image');
    newShow.classList.add('series__show');
    }
}
const addListeners = ()=>{
    debugger;
    const seriesItem = document.querySelectorAll('.js-item');
    for (let item of seriesItem){
        item.addEventListener('click',setFavorite);
    }
} 

const setFavorite = (ev) =>{
    debugger;
    ev.stopPropagation;
    let selectedItem = ev.target;
    selectedItem.classList.remove('series__item');
    selectedItem.classList.add('favorite__item');
    const applyFavoriteClass = selectedItem.children;
    applyFavoriteClass[1].classList.remove('series__show');
    applyFavoriteClass[1].classList.add('favorite__txt');
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
const handlerFavorites (event) =>{
    setFavorite(event);
}