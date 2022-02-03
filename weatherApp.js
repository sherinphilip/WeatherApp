/*window.addEventListener('load',()=>{
   let lat;
   let long;
   let temperatureDescription = document.querySelector('.temperature-description');
   let degreeSection = document.querySelector('.degree-section');
   let temperatureDegree = document.querySelector(".temperature-degree");
   let locationTimezone = document.querySelector('.location-timezone');
   let weathericon = document.querySelector('.weather-icon');
   const  temperatureSpan =document.querySelector(".temperature span");
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{
          lat = position.coords.latitude;
          long = position.coords.longitude;
          
          const api =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=000bb7e5cc6fb3c0720149dd1cb37c22`;
          
          fetch(api)
          .then(response =>{
            return response.json();
          })
          .then(data =>{
            
            const {temp} = data.current;
            const {description} = data.current.weather[0];
            const {icon} = data.current.weather[0];
            temperatureDegree.textContent = temp;               //DOM elements from the API
            temperatureDescription.textContent = description;
            locationTimezone.textContent = "Weather in " + data.timezone;
            weathericon.innerHTML = "<img src=\'https://openweathermap.org/img/wn/"+ icon + ".png\'>";
            //convert C to F
            let celsius = (temp - 30)/1.8;
            degreeSection.addEventListener("click", ()=>{
              if(temperatureSpan.textContent === "F")
              {
                 temperatureSpan.textContent = "C";
                 temperatureDegree.textContent = celsius;

              }
              else {  temperatureSpan.textContent ="F";
              temperatureDegree.textContent = temp; 
            }
                 
            });     
          })
      });
    
  } 
    });*/

    let temperatureDescription = document.querySelector('.temperature-description');
    let degreeSection = document.querySelector('.degree-section');
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector('.location-timezone');
    let weathericon = document.querySelector('.weather-icon');
    let humidity = document.querySelector('.humidity');
    let wind = document.querySelector('.wind');
    let searchIcon = document.querySelector('.search-icon');
    let searchBar = document.querySelector('.search-bar');
    const  temperatureSpan = document.querySelector(".temperature span");
    function getWeather(city){
  
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=000bb7e5cc6fb3c0720149dd1cb37c22`;
     fetch(api).then((response) => {
    if(!response.ok){
      alert("Enter a valid city name");
      throw new Error("Enter a valid city name");
    }
    return response.json();
  }).then(data =>{
    displayWeather(data);
  })
}
function displayWeather(data){
  const {temp, humidity} = data.main;
  const {description} = data.weather[0];
  const {icon} = data.weather[0];
  const {speed} = data.wind;
  temperatureDegree.textContent = temp;               //DOM elements from the API
  temperatureDescription.textContent = description;
  locationTimezone.textContent = "Weather in " + data.name;
  humidity.textContent = "Humidity: " + humidity +"%";  
  wind.textContent = "Wind speed:  " + speed + " km/h";  
  weathericon.innerHTML = "<img src=\'https://openweathermap.org/img/wn/"+ icon + ".png\'>";
  let celsius = (temp - 30)/1.8;       //convert C to F
 degreeSection.addEventListener("click", ()=>{
  if(temperatureSpan.textContent === "F")
  {
     temperatureSpan.textContent = "C";
     temperatureDegree.textContent = Math.floor(celsius);
     
  }
  else {  temperatureSpan.textContent ="F";
  temperatureDegree.textContent = temp; 
}
});
}
searchIcon.addEventListener('click', ()=>{
   getWeather(searchBar.value);
   searchBar.value ="";

})

