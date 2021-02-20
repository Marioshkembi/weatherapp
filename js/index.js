const key = "fa6572981d02089e5f2433e439e9b22a";

let weatherData = document.querySelector('.weather-data-wrapper');
const input = document.querySelector('.input');
const inputForm = document.querySelector('.inputForm');
let body = document.querySelector('.content-wrapper');



// FUNCTIONS
function replaceString(string) {
   return string.replace(/['"]+/g, '');
}

function generateDate() {
    let generateCurrentDate = new Date();
    
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let currentDate = generateCurrentDate.getDate() + ' ' + months[generateCurrentDate.getMonth()] + ' ' + generateCurrentDate.getFullYear();
    return currentDate
}

function changeBackground(weather) {
    switch (weather) {
        case 'Clear':
            body.style.backgroundImage = 'url("./assets/images/clear.jpg")'
            break;
         
        case 'Clouds':
            body.style.backgroundImage = 'url("./assets/images/cloudy.jpg")'
            break;   
            
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            body.style.backgroundImage = 'url("./assets/images/rain.jpg")'
            break;

        case 'Snow':
            body.style.backgroundImage = 'url("./assets/images/snow.jpg")'
            break;

        case 'Thunderstorm':
            body.style.backgroundImage = 'url("./assets/images/storm.jpg")'
            break;
    
        default:
            break;
    }
}

// GEOLOCATION
window.addEventListener("load", () => {
    if(navigator.geolocation) {
        let long;
        let lat;
        navigator.geolocation.getCurrentPosition(position => {
            
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${key}`;

            fetch(api) 
                .then(response => {
                    return response.json();
                }).then(data => {
                    // console.log(data);
                    weatherData.innerHTML = 
                    `<h2 class="location">${replaceString(JSON.stringify(data.name))}, ${replaceString(JSON.stringify(data.sys.country))}</h2>
                    <p class="date">${generateDate()}</p>
                    <h3 class="temp">${Math.round(JSON.stringify(data.main.temp))}°C</h3>
                    <div class="weather-wrapper">
                    <img src="${`https://api.openweathermap.org/data/2.5/img/w/${data.weather[0].icon}`}">
                    <p>${data.weather[0].description}</p>
                    </div>`;
                    changeBackground(data.weather[0].main);

                })
        })   
    } 
});



// SEARCH BY CITY
function getByCity(e) {
    e.preventDefault();
    const inputVal = input.value;
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=metric&appid=${key}`;
    fetch(api) 
        .then(response => {
            return response.json();
        }).then(data => {
            weatherData.innerHTML = 
            `<h2 class="location">${replaceString(JSON.stringify(data.name))}, ${replaceString(JSON.stringify(data.sys.country))}</h2>
            <p class="date">${generateDate()}</p>
            <h3 class="temp">${Math.round(JSON.stringify(data.main.temp))}°C</h3>
            <div class="weather-wrapper">
            <img src="${`https://api.openweathermap.org/data/2.5/img/w/${data.weather[0].icon}`}">
            <p>${data.weather[0].description}</p>
            </div>`;
            changeBackground(data.weather[0].main);
            // console.log(data);
            
            // if (data.weather.main === 'Snow') {
            //     body.classList.replace('rainy','sunny');
            // }else if(data.weather.main === 'Haze'){
            //     body.classList.replace('sunny','rainy');
            // }
    })
    input.value = '';
}


// EVENT LISTENERS
inputForm.addEventListener('submit',getByCity);
// inputForm.addEventListener('submit',fivedayForecast);