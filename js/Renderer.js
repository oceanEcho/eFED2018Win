class Renderer {
    constructor() {
    }
    renderCurrCityInfo(data) {
        const currCityBlock = document.getElementById('currCityInfo');

        currCityBlock.innerHTML = `${Math.round(data.main.temp)}° ${data.name}, ${data.sys.country}`;
    }
    renderPollutionInfo(data) {
        const currPollutionBlock = document.getElementById('airPollution');

        currPollutionBlock.innerHTML = `Загрязнение воздуха: ${data[0].value}`;
    }
    renderFooter(footer) {
        const date = new Date();

        footer.innerHTML = `2018 - ${date.getFullYear()} © Copyright`;
    }
}
