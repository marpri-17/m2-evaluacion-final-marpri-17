'use strict';
// Elementos DOM
const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-search');
const seriesList = document.querySelector('.js-list');

let searchResult = [];

const getInputValue = () => input.value;

const arrConstructor = (data) => {
    debugger;
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
    debugger;
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
    newImage.classList.add('series__image');
    newItem.classList.add('series__item');
    newShow.classList.add('series__show');
    }
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
    });
}


btnSearch.addEventListener('click', getDatafromServer);