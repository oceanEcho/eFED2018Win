class FiveDaysRenderer extends Renderer {
    constructor() {
        super();
    }
    parseDaysData(data) {
        let daysObject = [];
        let index = 0;
        for(let day of data.list) {
            const date = new Date(day.dt * 1000);
            if(!daysObject[index]) {
                daysObject[index] = {};
            }
            daysObject[index].dt = date.toLocaleString('ru', { weekday: 'short', day: 'numeric', month: 'long',});
            if(date.getHours() >= 0 && date.getHours() <= 3) {
                daysObject[index].night = {};
                daysObject[index].night.temp = Math.round(day.main.temp);
                daysObject[index].night.wnd_speed = Math.round(day.wind.speed);
                daysObject[index].night.icon = day.weather[0].icon;
            }
            if(date.getHours() >= 4 && date.getHours() <= 11) {
                daysObject[index].morning = {};
                daysObject[index].morning.temp = Math.round(day.main.temp);
                daysObject[index].morning.wnd_speed = Math.round(day.wind.speed);
                daysObject[index].morning.icon = day.weather[0].icon;
            }
            if(date.getHours() >= 12 && date.getHours() <= 16) {
                daysObject[index].day= {};
                daysObject[index].day.temp = Math.round(day.main.temp);
                daysObject[index].day.wnd_speed = Math.round(day.wind.speed);
                daysObject[index].day.icon = day.weather[0].icon;
            }
            if(date.getHours() >= 17 && date.getHours() <= 23) {
                daysObject[index].evening = {};
                daysObject[index].evening.temp = Math.round(day.main.temp);
                daysObject[index].evening.wnd_speed = Math.round(day.wind.speed);
                daysObject[index].evening.icon = day.weather[0].icon;
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
        const daysData = this.parseDaysData(data);

        console.log(nightList);

        for (let i = 0; i < 5; i++) {
            titlesList[i].innerHTML = daysData[i].dt;
            if (daysData[i].night) {
                let block = nightList[i].children;
                block[1].src = `http://openweathermap.org/img/w/${daysData[i].night.icon}.png`;
                block[2].innerHTML = daysData[i].night.temp;
            }
        }

        console.log(data);
        console.log(this.parseDaysData(data));
    }
}
