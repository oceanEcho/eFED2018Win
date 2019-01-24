var tempBtn = document.querySelector("#temp-btn");
var probOfPrecBtn = document.querySelector("#prob-of-precip-btn");
var windBtn = document.querySelector("#wind-btn");

var tempChart = document.querySelector("#tempChart");
var precipChart = document.querySelector("#precipChart");
var windChart = document.querySelector("#windChart");

var chartList = document.querySelectorAll(".chart-img");
var innerNavBtns = document.querySelectorAll(".inner.nav-btn");

function changeChart(chart) {
    if (chartList.length == innerNavBtns.length) {
        for (var i = 0; i < chartList.length; i++) {
            chartList[i].classList.remove("visible");
            innerNavBtns[i].classList.remove("active");
        }
    }

    chart.classList.add("visible");
    event.target.classList.add("active");
}

tempBtn.addEventListener("click", function (x) {
    return function () { changeChart(x) }
}(tempChart));

probOfPrecBtn.addEventListener("click", function (x) {
    return function () { changeChart(x) }
}(precipChart));

windBtn.addEventListener("click", function (x) {
    return function () { changeChart(x) }
}(windChart));

const APPID = "e2c078e26648e8e09b6e90e982007c80";
const TODAY_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=${APPID}&q=`;
const FIVE_DAYS_ENDPOINT = `http://api.openweathermap.org/data/2.5/forecast?units=metric&APPID=${APPID}&q=`;
const defaultCity = "Izhevsk";

const weatherDetails = {
    init() {
        this.getWeatherDetails(TODAY_ENDPOINT, defaultCity, this.renderMainInfo);
        this.getWeatherDetails(TODAY_ENDPOINT, defaultCity, this.renderSubInfo);
        this.getWeatherDetails(FIVE_DAYS_ENDPOINT, defaultCity, this.renderFiveDaysInfo);

        const searchField = document.querySelector("#search");

        document.querySelector(".search-form").addEventListener("submit", (event) => {
            event.preventDefault();
        });

        searchField.addEventListener("change", (event) => {
            const city = event.target.value;
            this.getWeatherDetails(TODAY_ENDPOINT, city, this.renderMainInfo);
            this.getWeatherDetails(TODAY_ENDPOINT, city, this.renderSubInfo);
        });
    },

    getWeatherDetails(endpoint, city, callback) {
        const url = `${endpoint}${city}`;
        const xhr = new XMLHttpRequest();

        xhr.onload = function() {
            if (this.readyState === 4 && this.status === 200) {
                callback(JSON.parse(xhr.responseText));
            }
        }
        
        xhr.open("GET", url, true);
        xhr.send();
    },

    renderMainInfo(data) {
        const city = data.name;
        const country = data.sys.country;
        const currentTemperature = Math.round(data.main.temp);
        const date = new Date();
        const icon = data.weather[0].icon;
        const alt = data.weather[0].description;

        document.querySelector("#location").innerHTML = `${city}, ${country}`;
        document.querySelector("#current-temp").innerHTML = `${currentTemperature}℃`;
        document.querySelector("#day-of-week").innerHTML = `${date.toLocaleString("ru-RU", {weekday: "long"}) }`;
        document.querySelector("#curr-cond-img").src = `http://openweathermap.org/img/w/${icon}.png`;
        document.querySelector("#curr-cond-img").alt = alt;
    },

    renderSubInfo(data) {
        const probOfPrecip = 15;
        const humidity = Math.round(data.main.humidity);
        const windSpeed = Math.round(data.wind.speed);

        document.querySelector("#prob-of-precip").innerHTML = `Вероятность осадков: ${probOfPrecip}%`;
        document.querySelector("#humidity").innerHTML = `Влажность: ${humidity}%`;
        document.querySelector("#windspeed").innerHTML = `Скорость ветра: ${windSpeed} м/с`;
    },

    renderFiveDaysInfo(data) {
        console.log(data);
    }
}

weatherDetails.init();