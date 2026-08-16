const apiKey = "";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if(city !== ""){
        getWeather(city);
    }
});

async function getWeather(city){

    try{

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

        const data = await response.json();

        if(response.status !== 200){
            alert(data.message);
            return;
        }

        document.getElementById("temperature").textContent =
        Math.round(data.main.temp) + "°C";

        document.getElementById("city-name").textContent =
        data.name;

        document.getElementById("description").textContent =
        data.weather[0].description;

        document.getElementById("humidity").textContent =
        data.main.humidity + "%";

        document.getElementById("wind").textContent =
        data.wind.speed + " m/s";

        document.getElementById("visibility").textContent =
        (data.visibility/1000) + " km";

        document.getElementById("feels-like").textContent =
        Math.round(data.main.feels_like) + "°C";

        document.getElementById("sunrise").textContent =
        new Date(data.sys.sunrise*1000).toLocaleTimeString();

        document.getElementById("sunset").textContent =
        new Date(data.sys.sunset*1000).toLocaleTimeString();

        document.getElementById("weather-icon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        getForecast(city);

    }
    catch(error){
        console.log(error);
        alert("Unable to fetch weather.");
    }

}

async function getForecast(city){

    try{

        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);

        const data = await response.json();

        const forecastContainer =
        document.querySelector(".forecast-container");

        forecastContainer.innerHTML = "";

        for(let i=0;i<data.list.length;i+=8){

            const item=data.list[i];

            const day=new Date(item.dt*1000);

            forecastContainer.innerHTML +=`

            <div class="forecast-card">

                <h4>${day.toLocaleDateString("en-US",{weekday:"short"})}</h4>

                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">

                <span>${Math.round(item.main.temp)}°C</span>

            </div>

            `;

        }

    }
    catch(error){

        console.log(error);

    }

}

cityInput.addEventListener("keyup",function(event){

    if(event.key==="Enter"){
        searchBtn.click();
    }

});

getWeather("Dehradun");