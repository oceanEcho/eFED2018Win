class FiveDaysRenderer extends Renderer {
    constructor() {
        super();
    }

    parseDaysData(data) {
        function setDayInfo(day, object, field) {
            object[field] = {
                temp: Math.round(day.main.temp),
                windSpeed: Math.round(day.wind.speed),
                icon: day.weather[0].icon,

            };
            if ((day.rain) && (day.rain['3h'])) {
                object[field].precip = day.rain['3h'].toFixed(3);
            }
            else if ((day.snow) && (day.snow['3h'])) {
                object[field].precip = day.snow['3h'].toFixed(3);
            }
            else {
                object[field].precip = 0;
            }
        }

        let daysObject = {};
        for (let day of data.list) {
            const date = new Date(day.dt * 1000);
            const weekday = date.toLocaleString('ru', { weekday: 'short' });

            if (!daysObject[weekday]) {
                daysObject[weekday] = {};
            }

            daysObject[weekday].dt = date.toLocaleString('ru', { weekday: 'long', day: 'numeric', month: 'long', });

            if (date.getHours() >= 0 && date.getHours() <= 3) {
                setDayInfo(day, daysObject[weekday], 'night');
            }
            if (date.getHours() >= 4 && date.getHours() <= 11) {
                setDayInfo(day, daysObject[weekday], 'morning');
            }
            if (date.getHours() >= 12 && date.getHours() <= 16) {
                setDayInfo(day, daysObject[weekday], 'day');
            }
            if (date.getHours() >= 17 && date.getHours() <= 23) {
                setDayInfo(day, daysObject[weekday], 'evening');
            }
        }

        return daysObject;
    }
    renderFiveDaysTable(data) {
        const titlesList = document.querySelectorAll('.tbl-weekday');
        const nightList = document.querySelectorAll('.tbl-night');
        const morningList = document.querySelectorAll('.tbl-mrng');
        const dayList = document.querySelectorAll('.tbl-day');
        const eveningList = document.querySelectorAll('.tbl-evng');
        const daysMarkers = document.querySelectorAll('.day-marker');
        const windSpeedList = document.querySelectorAll('.daily-wind-speed');
        const precipList = document.querySelectorAll('.daily-precipitation');

        const daysData = this.parseDaysData(data);

        let blockIndex = 0;
        for (let day in daysData) {
            if (titlesList[blockIndex]) {
                const morningBlock = morningList[blockIndex].children;
                const nightBlock = nightList[blockIndex].children;
                const dayBlock = dayList[blockIndex].children;
                const eveningBlock = eveningList[blockIndex].children;
                const windBlock = windSpeedList[blockIndex].children;
                const precipBlock = precipList[blockIndex].children;

                titlesList[blockIndex].innerHTML = daysData[day].dt;
                daysMarkers[blockIndex].innerHTML = day;
                
                if (daysData[day].night) {
                    nightBlock[1].src = `https://openweathermap.org/img/w/${daysData[day].night.icon}.png`;
                    nightBlock[2].innerHTML = daysData[day].night.temp;
                    windBlock[0].innerHTML = daysData[day].night.windSpeed;
                    precipBlock[0].innerHTML = daysData[day].night.precip;
                }
                if (daysData[day].morning) {
                    morningBlock[1].src = `https://openweathermap.org/img/w/${daysData[day].morning.icon}.png`;
                    morningBlock[2].innerHTML = daysData[day].morning.temp;
                    windBlock[1].innerHTML = daysData[day].morning.windSpeed;
                    precipBlock[1].innerHTML = daysData[day].morning.precip;
                }
                if (daysData[day].day) {
                    dayBlock[1].src = `https://openweathermap.org/img/w/${daysData[day].day.icon}.png`;
                    dayBlock[2].innerHTML = daysData[day].day.temp;
                    windBlock[2].innerHTML = daysData[day].day.windSpeed;
                    precipBlock[2].innerHTML = daysData[day].day.precip;
                }
                if (daysData[day].evening) {
                    eveningBlock[1].src = `https://openweathermap.org/img/w/${daysData[day].evening.icon}.png`;
                    eveningBlock[2].innerHTML = daysData[day].evening.temp;
                    windBlock[3].innerHTML = daysData[day].evening.windSpeed;
                    precipBlock[3].innerHTML = daysData[day].evening.precip;
                }

                blockIndex++;
            }
        }
    }
    renderTodayDate(data) {
        const todayDate = document.querySelector('#todayDate');
        const date = new Date(data.dt * 1000).toLocaleString('ru', { weekday: 'long', day: 'numeric', month: 'long' });

        todayDate.innerHTML = `Сегодня ${date}`;
    }
    renderSunInfo(data) {
        const dayDurationValue = new Date((data.sys.sunset - data.sys.sunrise) * 1000);
        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);

        document.querySelector('#dayDuration').innerHTML = `Продолжительность дня - ${dayDurationValue.getHours()} ч ${dayDurationValue.getMinutes()} мин`;
        document.querySelector('#sunrise').innerHTML = `Восход - ${sunrise.getHours()}:${sunrise.getMinutes()}`;
        document.querySelector('#sunset').innerHTML = `Закат - ${sunset.getHours()}:${sunset.getMinutes()}`;

    }
    renderMoonInfo(data) {
        //code
    }
}
