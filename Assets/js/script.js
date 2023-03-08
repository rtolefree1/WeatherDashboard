var ulQuerySelEl = document.querySelector('ul');
var searchButtonEl = document.getElementById('searchButton');
var searchListEl = document.getElementById('searchList_API');
var searchCityEl = document.getElementById('displayCityName');
var searchCityTempEl = document.getElementById('displayCityTemp');
var searchCityWindEl = document.getElementById('displayCityWind');
var searchCityHumidityEl = document.getElementById('displayCityHumidity');

// creating my array of cities
arrOfCities = ['Atlanta', 'Denver', 'Seattle', 'San Francisco', 'Orlando', 'New York', 'Chicago', 'Austin'];

// empty button
let cityButton = '';
let cityValueFromButtonClick = '';
let requestURL = '';
let requestURL2 = '';
let cityTemperature = '';
let cityWind = '';
let cityHumidity = '';

let cityTemperature_5day = '';
let cityWind_5day = '';
let cityHumidity_5day = '';

let longitude = '';
let latitude = '';


//run method to create buttons
createCityButtons();

// Dynamically creating buttons
function createCityButtons()
{
    for(let i = 0; i<arrOfCities.length; i++)
    {
        console.log(arrOfCities[i]);
        cityButton = document.createElement('button');
        cityButton.textContent = arrOfCities[i];
        ulQuerySelEl.append(cityButton);
    }
}

//searchListEl.addEventListener("click", function(event){
function getCity(event){
    event.preventDefault();
    console.log("button click");
    console.log(this);
    console.log(event.target.textContent);
    cityValueFromButtonClick = event.target.textContent;
    
    // calling getAPI method to check for city
    getAPI(event);
    // displaySearchInfo(event);
};

searchListEl.addEventListener("click", getCity);


function searchCity()
{
    for(let i = 0; i < arrOfCities.length; i++){
        cityButton[i].addEventListener('click', getAPI);
    }
}


function getAPI(event){
    event.preventDefault();
    cityValueFromButtonClick = event.target.textContent;
    console.log("city",cityValueFromButtonClick);
    requestURL = 'http://api.openweathermap.org/data/2.5/weather?q='+`${cityValueFromButtonClick}`+'&APPID=4b5773176d3e07e22f05a4f149585fee&units=imperial';
    // requestURL = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=4b5773176d3e07e22f05a4f149585fee';
    console.log("getAPI method");
    cityValueFromButtonClick = event.target.textContent;
    fetch(requestURL)
        .then(function(response){
            if(response.status == 200){
                console.log(response.status);
            }else if(response.status >= 400){
                console.log("Error, you received a: "+ response.status);
            }
            return response.json();
        })
        .then(function(data){
            //var weatherValue = data.main.temp;
            console.log("Tempature: "+data.main.temp);
            cityTemperature = "City: " + data.main.temp;
            console.log("TempInfo",cityTemperature);
            cityWind = data.wind.speed;
            cityHumidity = data.main.humidity;
            displaySearchInfo(event);
            add_Attributes(event);

        });
       
       
}

searchButtonEl.addEventListener('click', getAPI);

function add_Attributes(event)
{
    searchCityEl.setAttribute("style","font-size: 22px; font-weight: bold");
}

function displaySearchInfo(event)
{
   
    searchCityEl.append(cityValueFromButtonClick);
    searchCityTempEl.append("Temperature: " + cityTemperature);
    searchCityWindEl.append("Wind Speed: " + cityWind);
    searchCityHumidityEl.append("Humidity: " + cityHumidity);
}


function getAPI_5DayForecast(event){
    requestURL2 = 'http://api.openweathermap.org/data/2.5/forecast?lat=51.5085&lon=-0.1257&appid=4b5773176d3e07e22f05a4f149585fee&units=imperial';

    fetch(requestURL2)
        .then(function(response){
            if(response.status == 200){
                console.log(response.status);
            }else if(response.status >= 400){
                console.log("Error, you received a: "+ response.status);
            }
            return response.json();
        })
        .then(function(data){
          

            for(let i = 0; i < data.list.length; i++)
            {
              
                 
                    var dateValue = data.list[i].dt_txt.split(' ')[0];
                    var timeValue = data.list[i].dt_txt.split(' ')[1];
         
                    var hourValue = timeValue.split(':')[0];


                    if(hourValue == '09')
                    {
                        console.log('hour value',hourValue + ' '+i);
                        console.log('Temperature at 9am',data.list[i].main.temp);
                        cityTemperature_5day = data.list[i].main.temp;
                        cityWind_5day = data.list[i].wind.speed;
                        cityHumidity_5day = data.list[i].main.humidity;
                        console.log('Wind', cityWind_5day);
                        console.log('Humidity', cityHumidity_5day);
                    }
            
            }
        

        });
}

// just want to see the data - testng
getAPI_5DayForecast();

function displaySearchInfo2(event)
{
  
    searchCityEl.append(cityValueFromButtonClick);

    let cityTemperature_5day = '';
    let cityWind_5day = '';
    let cityHumidity_5day = '';

    searchCityTempEl.append("Temperature: " + cityTemperature);
    searchCityWindEl.append("Wind Speed: " + cityWind);
    searchCityHumidityEl.append("Humidity: " + cityHumidity);
}

