
let city = 'dhaka'

const searchBox = document.querySelector('.search input')
const searchButton = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')
const errorMessage = document.querySelector('.error')
const temperature = document.querySelector('.temp')
const cityName = document.querySelector('.city')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')

const weatherIcons = {
    rain: './img/rain.png',
    clear: './img/clear-sun.png',
    cloud: './img/cloudy.png',
    drizzle: './img/drizzle.png',
    mist: './img/mist.png',
    snow: './img/snow.png',
    haze: './img/haze.png',
    'clear sky': './img/clear-sky.png'
}

weatherCheck()

searchButton.addEventListener('click', () => {
    city = searchBox.value
    weatherCheck()
})


async function weatherCheck() {
    
    const apiKey = '4141d67a67254dd7fac44aa883b116a8';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    try{
    const response = await fetch(apiUrl)

    if(response.status == 404){
        errorMessage.style.opacity = '1'
    }else{
        errorMessage.style.opacity = '0'
    
        if(!response.ok){
            throw new Error(`HTTP error ${response.status}`)
        }    
        const data = await response.json()
        updateWeatherUi(data)
    }
    }catch(error){
        console.error(error.message)
        }
}

function updateWeatherUi(data){
    temperature.innerHTML = Math.round(data.main.temp) + '°C'
    cityName.innerHTML = data.name
    humidity.innerHTML = data.main.humidity + '%'
    wind.innerHTML = data.wind.speed + 'Km/h'
    
    const weatherType = data.weather[0].description
    weatherIcon.src = weatherIcons[weatherType]
}

