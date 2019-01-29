var tempBtn = document.querySelector("#temp-btn");
var probOfPrecBtn = document.querySelector("#prob-of-precip-btn");
var windBtn = document.querySelector("#wind-btn");

var tempChart = document.querySelector("#tempChart");
var precipChart = document.querySelector("#precipChart");
var windChart = document.querySelector("#windChart");

var chartList = document.querySelectorAll(".chart");
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
        this.getWeatherDetails(FIVE_DAYS_ENDPOINT, defaultCity, this.renderTemperatureChart);
        this.getWeatherDetails(FIVE_DAYS_ENDPOINT, defaultCity, this.renderPrecipChart);
        this.getWeatherDetails(FIVE_DAYS_ENDPOINT, defaultCity, this.renderWindChart);

        const searchForm = document.querySelector(".search-form");

        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const city = event.target.firstElementChild.value;

            event.target.firstElementChild.value = "";

            this.getWeatherDetails(TODAY_ENDPOINT, city, this.renderMainInfo);
            this.getWeatherDetails(TODAY_ENDPOINT, city, this.renderSubInfo);
            this.getWeatherDetails(FIVE_DAYS_ENDPOINT, city, this.renderFiveDaysInfo);
            this.getWeatherDetails(FIVE_DAYS_ENDPOINT, city, this.renderTemperatureChart);
            this.getWeatherDetails(FIVE_DAYS_ENDPOINT, city, this.renderPrecipChart);
            this.getWeatherDetails(FIVE_DAYS_ENDPOINT, city, this.renderWindChart);
        });
    },

    getWeatherDetails(endpoint, city, callback) {
        const url = `${endpoint}${city}`;
        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
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
        const date = new Date(data.dt * 1000);
        const icon = data.weather[0].icon;
        const alt = data.weather[0].description;
        const condition = data.weather[0].main;

        document.querySelector("#location").innerHTML = `${city}, ${country}`;
        document.querySelector("#current-temp").innerHTML = `${currentTemperature}℃`;
        document.querySelector("#day-of-week").innerHTML = `${date.toLocaleString("ru-RU", { weekday: "long" })}`;
        document.querySelector("#curr-cond-img").src = `http://openweathermap.org/img/w/${icon}.png`;
        document.querySelector("#curr-cond-img").alt = alt;
        document.querySelector("#condition").innerHTML = condition;
    },

    renderSubInfo(data) {
        const probOfPrecip = 0;
        const humidity = Math.round(data.main.humidity);
        const windSpeed = Math.round(data.wind.speed);

        document.querySelector("#prob-of-precip").innerHTML = `Вероятность осадков: ${probOfPrecip}%`;
        document.querySelector("#humidity").innerHTML = `Влажность: ${humidity}%`;
        document.querySelector("#windspeed").innerHTML = `Скорость ветра: ${windSpeed} м/с`;
    },

    renderFiveDaysInfo(data) {
        function getDayBlock(data) {
            const daysObject = {};

            for (let i = 0; i < data.list.length; i++) {
                const date = new Date(data.list[i].dt * 1000);
                console.log(date.toLocaleString("ru", { weekday: 'short' }));
                const day = date.toLocaleString("ru", { weekday: 'short' });

                if (day in daysObject) {
                    daysObject[day].push(data.list[i]);
                }
                else {
                    daysObject[day] = [];
                    daysObject[day].push(data.list[i]);
                }
            }

            console.log(daysObject);

            return daysObject;
        }

        const fiveDaysList = getDayBlock(data);
        const daysElementList = document.querySelectorAll(".day");

        console.log(data);

        let blockIndex = 0;
        for (day in fiveDaysList) {
            console.log(day);
            let minTemperature = Math.round(fiveDaysList[day][0].main.temp_min);
            let maxTemperature = Math.round(fiveDaysList[day][0].main.temp_max);

            for (let i = 0; i < fiveDaysList[day].length; i++) {
                if (minTemperature > Math.round(fiveDaysList[day][i].main.temp_min)) {
                    console.log(Math.round(fiveDaysList[day][i].main.temp_min));
                    minTemperature = Math.round(fiveDaysList[day][i].main.temp_min);
                }
                if (maxTemperature < Math.round(fiveDaysList[day][i].main.temp_max)) {
                    maxTemperature = Math.round(fiveDaysList[day][i].main.temp_max);
                }
            }

            let icon = fiveDaysList[day][0].weather[0].icon.replace("n", "d");

            let dayBlock = daysElementList[blockIndex].children;

            dayBlock[0].innerHTML = day;
            dayBlock[1].src = `http://openweathermap.org/img/w/${icon}.png`;
            dayBlock[2].innerHTML = `${minTemperature}° ${maxTemperature}°`;
            blockIndex++;
        }


    },

    renderTemperatureChart(data) {
        const chartBlocks = document.querySelectorAll(".temp-chart-block");
        const timeSteps = document.querySelector(".temp-timepoints").children;
        const tempValues = document.querySelector(".temp-values").children;

        console.log(timeSteps);

        let minTemp = Math.round(data.list[0].main.temp_min);
        let maxTemp = Math.round(data.list[0].main.temp_max);
        for (let i = 0; i < timeSteps.length; i++) {
            console.log(i);
            if (minTemp > Math.round(data.list[i].main.temp_min)) {
                minTemp = Math.round(data.list[i].main.temp_min);
            }
            if (maxTemp < Math.round(data.list[i].main.temp_max)) {
                maxTemp = Math.round(data.list[i].main.temp_max);
            }
        }

        console.log(minTemp);
        console.log(maxTemp);

        let absMax;
        if (Math.abs(minTemp) > Math.abs(maxTemp)) {
            absMax = Math.abs(minTemp);
        }
        else {
            absMax = Math.abs(maxTemp);
        }

        console.log(absMax);

        for (let i = 0; i < timeSteps.length; i++) {
            let date = new Date(data.list[i].dt * 1000);
            timeSteps[i].innerHTML = date.toLocaleString("en-GB", { hour: 'numeric', minute: 'numeric' });
            tempValues[i].innerHTML = Math.round(data.list[i].main.temp);
            chartBlocks[i].style.height = `${absMax + Math.round(data.list[i].main.temp)}px`;

        }
    },

    renderPrecipChart(data) {
        const chartBlocks = document.querySelectorAll(".precip-chart-block");
        const timeSteps = document.querySelector(".precip-timepoints").children;
        const precipValues = document.querySelector(".precip-values").children;

        for (let i = 0; i < timeSteps.length; i++) {
            let date = new Date(data.list[i].dt * 1000);
            timeSteps[i].innerHTML = date.toLocaleString("en-GB", { hour: 'numeric', minute: 'numeric' });
            chartBlocks[i].style.height = 0;
        }
    },

    renderWindChart(data) {
        const timeSteps = document.querySelector(".wind-timepoints").children;
        const windValues = document.querySelector(".wind-values").children;
        const windArrows = document.querySelectorAll(".wind-image > img");

        for (let i = 0; i < timeSteps.length; i++) {
            let date = new Date(data.list[i].dt * 1000);

            timeSteps[i].innerHTML = date.toLocaleString("en-GB", { hour: 'numeric', minute: 'numeric' });
            windValues[i].innerHTML = `${Math.round(data.list[i].wind.speed)} м/c`;

            windArrows[i].style.transform = `rotate(${Math.round(data.list[i].wind.deg)}deg)`;
            if (data.list[i].wind.speed < 1) {
                windArrows[i].style.width = `10%`;
            }
            else if (data.list[i].wind.speed < 1.5) {
                windArrows[i].style.width = `15%`;
            }
            else if (data.list[i].wind.speed < 3) {
                windArrows[i].style.width = `30%`;
            }
            else {
                windArrows[i].style.width = `50%`;
            }
        }
    }
}

weatherDetails.init();

console.log(new Date(1548622800 * 1000).toUTCString("ru", { weekday: 'short' }));