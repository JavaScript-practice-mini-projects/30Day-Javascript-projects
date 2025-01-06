
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
}

function fakeWeatherUpdate(temp){

    let fakeTmpIcon = Math.floor(Math.random() * 8);

    document.getElementById('fakeTemp1').textContent = `${fakeTempGenerator(temp)} ${'°C'}`
    document.getElementById('fakeTemp2').textContent = `${fakeTempGenerator(temp)} ${'°C'}`
    document.getElementById('fakeTemp3').textContent = `${fakeTempGenerator(temp)} ${'°C'}`
    document.getElementById('fakeTemp4').textContent = `${fakeTempGenerator(temp)} ${'°C'}`
    document.getElementById('fakeTemp5').textContent = `${fakeTempGenerator(temp)} ${'°C'}`


    document.getElementById('fakeTempIcon1').src = weatherIcon[getRandomKey(weatherIcon)];
    document.getElementById('fakeTempIcon2').src = weatherIcon[getRandomKey(weatherIcon)];
    document.getElementById('fakeTempIcon3').src = weatherIcon[getRandomKey(weatherIcon)];
    document.getElementById('fakeTempIcon4').src = weatherIcon[getRandomKey(weatherIcon)];
    document.getElementById('fakeTempIcon5').src = weatherIcon[getRandomKey(weatherIcon)];
}

// units function

async function getWeatherData(){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

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

    const {main, wind, weather, sys, name, coord} = data;
    const temp = `${Math.round(main.temp)} ${'°C'} `;
    const humidity = `Humidity: ${main.humidity}${'%'}`;
    const windSpeed = `Wind: ${wind.speed} ${'Km/h'}`;
    const names = `${name}, ${sys.country}`;
    const weatherConditions = weather[0].description.toLowerCase();
    weatherUpdate(temp,humidity, windSpeed, names, weatherConditions);
    fakeWeatherUpdate(temp)
}


/**
 * time and date generator
 */
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

    let hours = timeFormat(currentTime.getHours())
    let minutes = timeFormat(currentTime.getMinutes())
    let seconds = timeFormat(currentTime.getSeconds())
    



    document.getElementById('weatherDate').textContent = `${day} ${month} ${year}`
    document.getElementById('realTimeDisplay').textContent = `${hours}:${minutes}:${seconds}`
    
}
setInterval(timeGenerator, 1000) // call timeGenerator function every 1 second.


/**
 * this will be time format
 * @param {String} unit 
 * @returns String
 */
function timeFormat(unit){
    return unit < 10 ? '0' + unit : unit;
}


/**
 * generate fake temperature
 * @returns fake temp 
 */
function fakeTempGenerator(temp){
    const temps = Number(temp.slice(0, 2));
    return Math.floor(Math.random() * (5 - (-5) + 1) - 5 + temps);
}

/**
 * 
 * @returns String
 */
function getRandomKey(obj) {
    let keys = Object.keys(obj);
    let randomIndexForWetherIcon = Math.floor(Math.random() * keys.length)
    return keys[randomIndexForWetherIcon]
}
