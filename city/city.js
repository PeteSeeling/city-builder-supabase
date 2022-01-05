import { checkAuth, createDefaultCity, getCity, logout } from '../fetch-utils.js';

// checkAuth();

const logoutButton = document.getElementById('logout');
const waterfrontImgEl = document.querySelector('.water-img');
const skylineImgEl = document.querySelector('.skyline-img');
const castleImgEl = document.querySelector('.castle-img');
const sloganForm = document.querySelector('.slogan-form');
const nameForm = document.querySelector('.name-form');
const waterfrontDropdown = document.querySelector('#water-dropdown');
const skylineDropdown = document.querySelector('#skyline-dropdown');
const castleDropdown = document.querySelector('#castle-dropdown');
const sloganListEl = document.querySelector('.slogan-list');



logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() =>{
    const city = await getCity();

    if (!city) {
        const newCity = await createDefaultCity();

    }
    else{
        displayCity();
    }



})

function displayCity(city){
    waterfrontImgEl.src = `../assets/waterfront=${city.waterfront_id}.jpg`;

    skylineImgEl.src = `../assets/skyline=${city.skyline_id}.jpg`;

    castleImgEl.src = `../assets/castle=${city.castle_id}.jpg`;
}