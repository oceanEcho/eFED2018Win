class FiveDaysRenderer extends Renderer {
    constructor() {
        super();
    }
    parseDaysData(data) {
        let daysObject = {};
        for(let day of data.list) {
            const date = new Date(day.dt * 1000);
            const weekday = date.toLocaleString('ru', { weekday: 'short'});

            if(!daysObject[weekday]) {
                daysObject[weekday] = {};
            }

            daysObject[weekday].dt = date.toLocaleString('ru', { weekday: 'long', day: 'numeric', month: 'long',});

            if(date.getHours() >= 0 && date.getHours() <= 3) {
                daysObject[weekday].night = {};
                daysObject[weekday].night.temp = Math.round(day.main.temp);
                daysObject[weekday].night.windSpeed = Math.round(day.wind.speed);
                daysObject[weekday].night.icon = day.weather[0].icon;
            }
            if(date.getHours() >= 4 && date.getHours() <= 11) {
                daysObject[weekday].morning = {};
                daysObject[weekday].morning.temp = Math.round(day.main.temp);
                daysObject[weekday].morning.windSpeed = Math.round(day.wind.speed);
                daysObject[weekday].morning.icon = day.weather[0].icon;
            }
            if(date.getHours() >= 12 && date.getHours() <= 16) {
                daysObject[weekday].day= {};
                daysObject[weekday].day.temp = Math.round(day.main.temp);
                daysObject[weekday].day.windSpeed = Math.round(day.wind.speed);
                daysObject[weekday].day.icon = day.weather[0].icon;
            }
            if(date.getHours() >= 17 && date.getHours() <= 23) {
                daysObject[weekday].evening = {};
                daysObject[weekday].evening.temp = Math.round(day.main.temp);
                daysObject[weekday].evening.windSpeed = Math.round(day.wind.speed);
                daysObject[weekday].evening.icon = day.weather[0].icon;
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
                
                console.log(daysData[day]);

                titlesList[blockIndex].innerHTML = daysData[day].dt;
                daysMarkers[blockIndex].innerHTML = day;
                if (daysData[day].night) {
                    nightBlock[1].src = `https://openweathermap.org/img/w/${daysData[day].night.icon}.png`;
                    nightBlock[2].innerHTML = daysData[day].night.temp;
                    windBlock[0].innerHTML = daysData[day].night.windSpeed;
                }
                if (daysData[day].morning) {
                    morningBlock[1].src = `https://openweathermap.org/img/w/${daysData[day].morning.icon}.png`;
                    morningBlock[2].innerHTML = daysData[day].morning.temp;
                    windBlock[1].innerHTML = daysData[day].morning.windSpeed;
                }
                if (daysData[day].day) {
                    dayBlock[1].src = `https://openweathermap.org/img/w/${daysData[day].day.icon}.png`;
                    dayBlock[2].innerHTML = daysData[day].day.temp;
                    windBlock[2].innerHTML = daysData[day].day.windSpeed;
                }
                if (daysData[day].evening) {
                    eveningBlock[1].src = `https://openweathermap.org/img/w/${daysData[day].evening.icon}.png`;
                    eveningBlock[2].innerHTML = daysData[day].evening.temp;
                    windBlock[3].innerHTML = daysData[day].evening.windSpeed;
                }
                
                blockIndex++;
            }
        }
    }
}
