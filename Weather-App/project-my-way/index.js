
const weatherIcon = {
    "clear sky": "./img/clear-sky.png",
    "partly cloudy": "./img/partly-cloudy.png",
    "cloudy": "./img/cloudy.png",
    "rainy": "./img/rain.png",
    "haze": "./img/haze.png",
    "foggy": "./img/foggy.png",
    "thunderstorm": "./img/thunderstorm.png",
    "few clouds": "./img/few-clouds-512.png"
}




const citySearch = document.getElementById('citySearch');

let cityName = 'dhaka';
let apiKey = '4141d67a67254dd7fac44aa883b116a8';




window.onload = () => {
    main()

    // first load display default weather
    getWeatherData()
}

function main(){
    
    //DOM References
    const searchButton = document.getElementById('searchButton')
    
    // Event listener 
    searchButton.addEventListener('click', handleSearchButton )
    citySearch.addEventListener('keydown', handleCitySearch)
    
    
}

//Event handler 

function handleSearchButton(){
    
    if(citySearch.value === '') return alert('Please Enter city name') 
        cityName = citySearch.value
        getWeatherData()
}
function handleCitySearch(event){
    if(event.key === 'Enter'){
        handleSearchButton()
    }
}

// DOM function


/**
 * dom update with weather 
 * @param {String} temp 
 * @param {String} humidity 
 * @param {String} windSpeed 
 * @param {String} name 
 */
function weatherUpdate(temp,humidity, windSpeed, name, weatherConditions){
    document.getElementById('cityName').textContent = name
    document.getElementById('temperatureCelsius').textContent = temp
    document.getElementById('humidity').textContent = humidity
    document.getElementById('windSpeed').textContent = windSpeed

    if(weatherIcon[weatherConditions]){
        document.getElementById('weatherImg').src = weatherIcon[weatherConditions]

    }else{
        document.getElementById('weatherImg').src = weatherIcon['cloudy']
    }

    console.log(weatherConditions)
}



// units function

async function getWeatherData(){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    try{
        const response = await fetch(url)
        if(!response.ok) throw new Error(`HTTP error ${response.status}`)
        
        const data = await response.json()
        weatherConverting(data)
    }catch(error){
        console.error(error.message)
    }
}


/**
 * weather converting multiple units
 * @param {object} data 
 */
function weatherConverting(data){

    const {main, wind, weather, sys, name} = data
    const temp = `${Math.round(main.temp)} ${'°C'} `
    const humidity = `Humidity: ${main.humidity}${'%'}`
    const windSpeed = `Wind: ${wind.speed} ${'Km/h'}`
    const names = `${name}, ${sys.country}`
    const weatherConditions = weather[0].description.toLowerCase()

    weatherUpdate(temp,humidity, windSpeed, names, weatherConditions)
}

function timeGenerator(){
    const months = [
        "Jan", "Feb", "Mar", "Apr", 
        "May", "Jun", "Jul", "Aug", 
        "Sep", "Oct", "Nov", "Dec"
    ];
    
    const days = [
        "Sun", "Mon", "Tue", "Wed", 
        "Thu", "Fri", "Sat"
    ];
    

    let currentTime = new Date();
    let year = String(currentTime.getFullYear());
    let month = months[currentTime.getMonth()];
    let day = days[currentTime.getDay()];

    let hours = String(currentTime.getHours())
    let minutes = String(currentTime.getMinutes())
    let seconds = String(currentTime.getSeconds())
    
    const hour = hours < 10 ? '0' + hours : hours;
    const minute = minutes < 10 ? '0' + minutes : minutes;
    const second = seconds < 10 ?  '0' + seconds  : seconds;



    document.getElementById('weatherDate').textContent = `${day} ${month} ${year}`
    document.getElementById('realTimeDisplay').textContent = `${hour} ${minute} ${second}`
    
}
timeGenerator()
setInterval(timeGenerator, 1000)