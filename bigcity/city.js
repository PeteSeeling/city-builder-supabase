import { checkAuth, createDefaultCity, getCity, logout, updateName, updateSkylineId, updateSlogans, updateCastleId, updateWaterfrontId } from '../fetch-utils.js';

// checkAuth();

const logoutButton = document.getElementById('logout');
const waterfrontImgEl = document.querySelector('.water-img');
const skylineImgEl = document.querySelector('.skyline-img');
const castleImgEl = document.querySelector('.castle-img');
const slogansForm = document.querySelector('.slogan-form');
const nameForm = document.querySelector('.name-form');
const waterfrontDropdown = document.querySelector('#water-dropdown');
const skylineDropdown = document.querySelector('#skyline-dropdown');
const castleDropdown = document.querySelector('#castle-dropdown');
const sloganListEl = document.querySelector('.slogan-list');
const cityNameEl = document.querySelector('.city-name');

checkAuth();


logoutButton.addEventListener('click', () => {
    logout();
});


window.addEventListener('load', async() =>{
    const city = await getCity();

    if (!city) {
        const newCity = await createDefaultCity();
        displayCity(newCity);
    }
    else {
        displayCity(city);
    }
});


nameForm.addEventListener('submit', async(e) =>{
    e.preventDefault();

    const data = new FormData(nameForm);
    const name = data.get('name');

    const newCity = await updateName(name);
  
    displayCity(newCity);
});

slogansForm.addEventListener('submit', async(e) =>{
    e.preventDefault();

    sloganListEl.textContent = '';

    const data = new FormData(slogansForm);
    const newSlogan = data.get('slogan');
    const city = await getCity();

    slogansForm.reset();

    city.slogans.push(newSlogan);
    const newCity = await updateSlogans(city.slogans);

    displayCity(newCity);
});

skylineDropdown.addEventListener('change', async() =>{
    const newCity = await updateSkylineId(skylineDropdown.value);

    displayCity(newCity);
});

castleDropdown.addEventListener('change', async() =>{
    const newCity = await updateCastleId(castleDropdown.value);

    displayCity(newCity);
});

waterfrontDropdown.addEventListener('change', async() =>{
    const newCity = await updateWaterfrontId(waterfrontDropdown.value);

    displayCity(newCity);
});

function displayCity(city){
    sloganListEl.textContent = '';

    cityNameEl.textContent = city.name;
    waterfrontImgEl.src = `../assets/waterfront-${city.waterfront_id}.jpg`;

    skylineImgEl.src = `../assets/skyline-${city.skyline_id}.jpg`;

    castleImgEl.src = `../assets/castle-${city.castle_id}.jpg`;

    for (let slogan of city.slogans){
        const sloganEl = document.createElement('p');

        sloganEl.classList.add('slogan');
        sloganEl.textContent = slogan;
        sloganListEl.append(sloganEl);
    }
}