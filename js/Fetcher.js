class Fetcher {
    constructor() {
        this.url = 'https://api.openweathermap.org/';
        this.appid = 'e2c078e26648e8e09b6e90e982007c80';
    }
    getTodayWeather(city) {
        const url = `${this.url}data/2.5/weather?units=metric&APPID=${this.appid}&q=${city}`;

        return this.sendXHR(url);
    }
    getFiveDaysWeather(city) {
        const url = `${this.url}data/2.5/forecast?units=metric&APPID=${this.appid}&q=${city}`;

        return this.sendXHR(url);
    }
    getPollutionInfo(lon, lat) {
        const url = `${this.url}pollution/v1/co/${Math.round(lat)},${Math.round(lon)}/current.json?appid=${this.appid}`;

        return this.sendXHR(url);
    }
    sendXHR(url) {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.send();
            if (xhr.status != 200) {
                console.log(`${xhr.status}: ${xhr.statusText}`);
            }
            else {
                return xhr.responseText;
            }
        }
        catch (error) {
            alert('Ошибка получения данных!');
            
            return null;
        }
    }
}
