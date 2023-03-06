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
let cityTemperature = '';

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

searchListEl.addEventListener("click", function(event){
    event.preventDefault();
    console.log("button click");
    console.log(this);
    console.log(event.target.textContent);
    cityValueFromButtonClick = event.target.textContent;
    
    // calling getAPI method to check for city
    getAPI(event);
    // displaySearchInfo(event);
});


createCityButtons();

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
            cityTemperature = data.main.temp;
            console.log("TempInfo",cityTemperature);

        });
       
       
}

searchButtonEl.addEventListener('click', getAPI);

function displaySearchInfo(event)
{
    //var tempature = 'http://api.openweathermap.org/data/2.5/weather?q='+`${cityValueFromButtonClick}`+'&APPID=4b5773176d3e07e22f05a4f149585fee&units=imperial';
    //console.log("tempature",tempature);
    var parCityInfo = document.createElement('p');
    parCityInfo.textContent = cityValueFromButtonClick;
    searchCityEl.append(parCityInfo);

    var parTempInfo = document.createElement('p');
    parTempInfo.textContent = cityTemperature;
    console.log("TempInfo2",parTempInfo.textContent);
    searchCityTempEl.append(parTempInfo);
}


