function Fetcher(basicURL, appid) {
    this.url = basicURL;
    this.appid = appid;
}

Fetcher.prototype.fetch = function(endpoint, city) {
    this.url = `${this.url}${endpoint}&APPID=${this.appid}&q=${city}`;

    fetch(this.url)
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        });
};
