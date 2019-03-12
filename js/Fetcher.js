function Fetcher() {
    this.url = 'http://api.openweathermap.org/data/2.5/';
    this.appid = 'e2c078e26648e8e09b6e90e982007c80';
}

Fetcher.prototype.getTodayWeather = function(city) {
    let url = `${this.url}weather?units=metric&APPID=${this.appid}&q=${city}`;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, false);
    xhr.send();
    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        return xhr.responseText;
    }
};

Fetcher.prototype.getFiveDaysWeather = function(city) {
    let url = `${this.url}forecast?units=metric&APPID=${this.appid}&q=${city}`;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, false);
    xhr.send();
    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        return xhr.responseText;
    }
};
