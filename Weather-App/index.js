
let city = 'dhaka'

const searchBox = document.querySelector('.search input')
const searchButton = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')
const errorMessage = document.querySelector('.error')



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
            console.log()
            document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C'
            document.querySelector('.city').innerHTML = data.name
            document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
            document.querySelector('.wind').innerHTML = data.wind.speed + 'Km/h'
            
            if(data.weather[0].main == 'Rain'){
                weatherIcon.src = './img/rain.png'
            }
            else if(data.weather[0].main == 'Clear'){
                weatherIcon.src = './img/clear-sun.png'
            }
            else if(data.weather[0].main == 'Cloudy'){
                weatherIcon.src = './img/cloudy.png'
            }
            else if(data.weather[0].main == 'Drizzle'){
                weatherIcon.src = './img/drizzle.png'
            }
            else if(data.weather[0].main == 'Mist'){
                weatherIcon.src = './img/mist.png'
            }
            else if(data.weather[0].main == 'Snow'){
                weatherIcon.src = './img/snow.png'
            }
            else if(data.weather[0].main == 'Haze'){
                weatherIcon.src = './img/haze.png'
            }
            
        }
        }catch(error){
            console.error(error.message)
        }
        

}

weatherCheck()

searchButton.addEventListener('click', () => {
    city = ''
    city = searchBox.value
    weatherCheck()
})