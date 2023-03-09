let ulQuerySelEl = document.querySelector('ul');
let formControlEl = document.getElementsByClassName('form-control');
let searchButtonEl = document.getElementById('searchButton'); // put a submit form element; type of submit
let searchListEl = document.getElementById('searchList_API');
let searchCityEl = document.getElementById('displayCityName');
let searchCityTempEl = document.getElementById('displayCityTemp');
let searchCityWindEl = document.getElementById('displayCityWind');
let searchCityHumidityEl = document.getElementById('displayCityHumidity');

// creating my array of cities
let arrOfCities = [];// = ['Atlanta', 'Denver', 'Seattle', 'San Francisco', 'Orlando', 'New York', 'Chicago', 'Austin'];

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

//Creating array of object(s) to store weather information to save in local storage
// create object that local storage info or empty array
let cityObj = JSON.parse(localStorage.getItem("Day-Weather")) || [];

//calling the setting of local storage
//setLocalStorage();

//Display onpage load


//run method to create buttons
createCityButtons();

// Dynamically creating buttons
// use .includes to avoid duplicates in array
function createCityButtons()
{   cityButton.innerHTML='';
    
    console.log('Number of cities:', cityObj.length);
    for(let i = 0; i<cityObj.length; i++)
    {
        console.log(cityObj[i]);
        cityButton = document.createElement('button');
        cityButton.textContent = cityObj[i];
        ulQuerySelEl.append(cityButton);
    }  ///add eventlistener on each button...check it is in local storage 
}

//searchListEl.addEventListener("click", function(event){
function getCity(event){
    event.preventDefault();
    console.log("get city button click");
    // console.log(this);
    // console.log(event.target.textContent);
    cityValueFromButtonClick = event.target.textContent;
    
    // calling getAPI method to check for city
     getAPI(cityValueFromButtonClick);

    //displaySearchInfo(event)
   
};

searchListEl.addEventListener("click", getCity);


function searchCity()
{
    for(let i = 0; i < cityObj.length; i++){
        cityButton[i].addEventListener('click', getAPI);
    }
}


function getAPI(cityValue){ // pass cityname value instead of event
    event.preventDefault();
    clearSearchInfo();
    
    //cityValueFromButtonClick = event.target.textContent;
    // console.log("city",cityValue);
    requestURL = 'https://api.openweathermap.org/data/2.5/weather?q='+`${cityValue}`+'&APPID=4b5773176d3e07e22f05a4f149585fee&units=imperial';

    console.log("getAPI method");
    //cityValueFromButtonClick = event.target.textContent;
    fetch(requestURL)
        .then(function(response){
            if(response.status == 200){
                console.log(response.status);
                if(!cityObj.includes(cityValue)){
                    cityObj.push(cityValue)
                    localStorage.setItem("Day-Weather", JSON.stringify(cityObj));
                    createCityButtons();
                }
                // localStorage.setItem("Day-Weather", JSON.stringify(cityObj));
                // createCityButtons();
            }else if(response.status >= 400){
                console.log("Error, you received a: "+ response.status);
            }
            return response.json();
        })
        .then(function(data){
            //var weatherValue = data.main.temp;
         //   console.log("Tempature: "+data.main.temp);
            cityTemperature = data.main.temp;
            console.log("TempInfo",cityTemperature);
            cityWind = data.wind.speed;
            cityHumidity = data.main.humidity;
            //clearSearchInfo(event)
            displaySearchInfo(event);
            add_Attributes(event);
            // localStorage.setItem("Day-Weather", JSON.stringify(cityObj));

        });
       
       
}

// might be better to do anomous function
// perform local storage to set
// getAPI to get data

//searchButtonEl.addEventListener('click', getAPI); 

//search cities button; will store the "city" that user search for
searchButtonEl.addEventListener("click", function(event){
    event.preventDefault();
    console.log("Search for city");
    cityValueFromButtonClick = formControlEl[0].value;
    //localStorage.setItem("Day-Weather", JSON.stringify(cityObj));
    //console.log("Search city value:",cityValueFromButtonClick);
    getAPI(cityValueFromButtonClick)
    
    //console.log("Search city value:",document.getElementsByClassName('form-control')[0].value)
});



function add_Attributes(event)
{
    searchCityEl.setAttribute("style","font-size: 22px; font-weight: bold");
}

// displaying data to website
function displaySearchInfo(event)
{  
    //let cityName = event.target.content;
    //getAPI(cityName);
    searchCityEl.append(cityValueFromButtonClick);
    searchCityTempEl.append("Temperature: " + cityTemperature);
    searchCityWindEl.append("Wind Speed: " + cityWind);
    searchCityHumidityEl.append("Humidity: " + cityHumidity);

    
    console.log('city object', cityObj);

}

function setLocalStorage()
{
    // localStorage.setItem("Day-Weather", JSON.stringify(cityObj));
    // searchCityEl.append(localStorage.getItem("Day-Weather"));//       .append(cityObj[0]);
    // searchCityTempEl.append("Temperature: " + cityTemperature);
    // searchCityWindEl.append("Wind Speed: " + cityWind);
    // searchCityHumidityEl.append("Humidity: " + cityHumidity);
}

// clearing data in website
function clearSearchInfo(event)
{
   
    searchCityEl.innerHTML='';
    searchCityTempEl.innerHTML='';
    searchCityWindEl.innerHTML='';
    searchCityHumidityEl.innerHTML='';
}

//****************************************************************************************************************************** */
//NOT USED YET****************************************************************************************************** */
//****************************************************************************************************************************** */
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
          

            for(let i = 0; i < data.list.length; i++) // try to use the value 8
            {
              
                 
                    var dateValue = data.list[i].dt_txt.split(' ')[0];
                    var timeValue = data.list[i].dt_txt.split(' ')[1];
         
                    var hourValue = timeValue.split(':')[0];


                    if(hourValue == '09')
                    {
                      //  console.log('hour value',hourValue + ' '+i);
                     //   console.log('Temperature at 9am',data.list[i].main.temp);
                        cityTemperature_5day = data.list[i].main.temp;
                        cityWind_5day = data.list[i].wind.speed;
                        cityHumidity_5day = data.list[i].main.humidity;
                     //   console.log('Wind', cityWind_5day);
                     //   console.log('Humidity', cityHumidity_5day);
                    }
            
            }
        

        });
}

// just want to see the data - testng
// getAPI_5DayForecast();

function displaySearchInfo2(event)
{
  
    searchCityEl.append(cityValueFromButtonClick);

    // let cityTemperature_5day = '';
    // let cityWind_5day = '';
    // let cityHumidity_5day = '';

    searchCityTempEl.append("Temperature: " + cityTemperature);
    searchCityWindEl.append("Wind Speed: " + cityWind);
    searchCityHumidityEl.append("Humidity: " + cityHumidity);
}

