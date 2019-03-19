class WeatherDetailsRenderer extends Renderer {
    constructor() {
        super();
    }
    getDayBlocks(data) {
        const daysObject = {};
        for (let i = 0; i < data.list.length; i++) {
            const date = new Date(data.list[i].dt * 1000);
            const day = date.toLocaleString('ru', { weekday: 'short' });
            if (day in daysObject) {
                daysObject[day].push(data.list[i]);
            }
            else {
                daysObject[day] = [];
                daysObject[day].push(data.list[i]);
            }
        }
        return daysObject;
    }
    renderMainInfo(data) {
        const city = data.name;
        const country = data.sys.country;
        const currentTemperature = Math.round(data.main.temp);
        const date = new Date(data.dt * 1000);
        const icon = data.weather[0].icon;
        const alt = data.weather[0].description;
        const condition = data.weather[0].main;

        document.querySelector('#location').innerHTML = `${city}, ${country}`;
        document.querySelector('#current-temp').innerHTML = `${currentTemperature}°С`;
        document.querySelector('#day-of-week').innerHTML = `${date.toLocaleString('ru-RU', { weekday: 'long' })}`;
        document.querySelector('#curr-cond-img').src = `https://openweathermap.org/img/w/${icon}.png`;
        document.querySelector('#curr-cond-img').alt = alt;
        document.querySelector('#condition').innerHTML = condition;
    }
    renderSubInfo(data) {
        const humidity = Math.round(data.main.humidity);
        const windSpeed = Math.round(data.wind.speed);

        document.querySelector('#humidity').innerHTML = `Влажность: ${humidity}%`;
        document.querySelector('#windspeed').innerHTML = `Скорость ветра: ${windSpeed} м/с`;
    }
    renderPrecipValue(data) {
        let probOfPrecip = 0;

        if ((data.list[0].rain) && (data.list[0].rain['3h'])) {
            probOfPrecip = data.list[0].rain['3h'].toFixed(3);
        }
        else if ((data.list[0].snow) && (data.list[0].snow['3h'])) {
            probOfPrecip = data.list[0].snow['3h'].toFixed(3);
        }

        document.querySelector('#precip').innerHTML = `Осадки: ${probOfPrecip} мм`;
    }
    renderFiveDaysInfo(data) {
        const fiveDaysList = this.getDayBlocks(data);
        const daysElementList = document.querySelectorAll('.weekday');
        let blockIndex = 0;
        for (let day in fiveDaysList) {
            let minTemperature = Math.round(fiveDaysList[day][0].main.temp_min);
            let maxTemperature = Math.round(fiveDaysList[day][0].main.temp_max);
            for (let i = 0; i < fiveDaysList[day].length; i++) {
                if (minTemperature > Math.round(fiveDaysList[day][i].main.temp_min)) {
                    minTemperature = Math.round(fiveDaysList[day][i].main.temp_min);
                }
                if (maxTemperature < Math.round(fiveDaysList[day][i].main.temp_max)) {
                    maxTemperature = Math.round(fiveDaysList[day][i].main.temp_max);
                }
            }
            let icon = fiveDaysList[day][0].weather[0].icon.replace('n', 'd');
            let dayBlock = daysElementList[blockIndex].children;
            dayBlock[0].innerHTML = day;
            dayBlock[1].src = `https://openweathermap.org/img/w/${icon}.png`;
            dayBlock[2].innerHTML = `${maxTemperature}° ${minTemperature}°`;
            blockIndex++;
        }
    }
    renderTemperatureChart(data) {
        const chartBlocks = document.querySelectorAll('.temp-chart-block');
        const timeSteps = document.querySelector('.temp-timepoints').children;
        const tempValues = document.querySelectorAll('.temp-value');
        let minTemp = Math.round(data.list[0].main.temp_min);
        let maxTemp = Math.round(data.list[0].main.temp_max);
        for (let i = 0; i < timeSteps.length; i++) {
            if (minTemp > Math.round(data.list[i].main.temp_min)) {
                minTemp = Math.round(data.list[i].main.temp_min);
            }
            if (maxTemp < Math.round(data.list[i].main.temp_max)) {
                maxTemp = Math.round(data.list[i].main.temp_max);
            }
        }
        let absMax;
        if (Math.abs(minTemp) > Math.abs(maxTemp)) {
            absMax = Math.abs(minTemp);
        }
        else {
            absMax = Math.abs(maxTemp);
        }
        for (let i = 0; i < timeSteps.length; i++) {
            let date = new Date(data.list[i].dt * 1000);
            timeSteps[i].innerHTML = date.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric' });
            tempValues[i].innerHTML = Math.round(data.list[i].main.temp);
            chartBlocks[i].style.height = `${absMax * 2 + Math.round(data.list[i].main.temp) * 2}px`;
        }
    }
    renderPrecipChart(data) {
        const chartBlocks = document.querySelectorAll('.precip-chart-block');
        const timeSteps = document.querySelector('.precip-timepoints').children;
        const precipValues = document.querySelectorAll('.precip-value');
        for (let i = 0; i < timeSteps.length; i++) {
            let date = new Date(data.list[i].dt * 1000);
            timeSteps[i].innerHTML = date.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric' });
            if ((data.list[i].rain) && (data.list[i].rain['3h'])) {
                precipValues[i].innerHTML = `${data.list[i].rain['3h']} мм`;
                chartBlocks[i].style.height = `${data.list[i].rain['3h'] * 20}px`;
            }
            else if ((data.list[i].snow) && (data.list[i].snow['3h'])) {
                precipValues[i].innerHTML = `${data.list[i].snow['3h'].toFixed(3)} мм`;
                chartBlocks[i].style.height = `${data.list[i].snow['3h'] * 20}px`;
            }
        }
    }
    renderWindChart(data) {
        const timeSteps = document.querySelector('.wind-timepoints').children;
        const windValues = document.querySelector('.wind-values').children;
        const windArrows = document.querySelectorAll('.wind-image > img');
        for (let i = 0; i < timeSteps.length; i++) {
            let date = new Date(data.list[i].dt * 1000);
            timeSteps[i].innerHTML = date.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric' });
            windValues[i].innerHTML = `${Math.round(data.list[i].wind.speed)} м/c`;
            windArrows[i].style.transform = `rotate(${Math.round(data.list[i].wind.deg)}deg)`;
            if (data.list[i].wind.speed < 1) {
                windArrows[i].style.width = '10px';
            }
            else if (data.list[i].wind.speed < 1.5) {
                windArrows[i].style.width = '20px';
            }
            else if (data.list[i].wind.speed < 3) {
                windArrows[i].style.width = '30px';
            }
            else {
                windArrows[i].style.width = '40px';
            }
        }
    }
}
