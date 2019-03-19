const defaultCity = 'Izhevsk';

const todayRenderer = new WeatherDetailsRenderer();
const fiveDaysRenderer = new FiveDaysRenderer();
const historyRenderer = new HistoryRenderer();
const fetcher = new Fetcher();
const transformer = new Transformer();

const spinner = new Spinner(
    document.querySelector('.overlay'),
    document.querySelector('.spinner')
);

todayRenderer.renderFooter(document.querySelector('footer'));

function renderAll(city) {
    fetcher.getTodayWeather(city) // Promise for five days request
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            todayRenderer.renderCurrCityInfo(response);
            todayRenderer.renderMainInfo(response);
            todayRenderer.renderSubInfo(response);

            fiveDaysRenderer.renderTodayDate(response);
            fiveDaysRenderer.renderSunInfo(response);

            fetcher.getPollutionInfo(response.coord['lon'], response.coord['lat'])
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    todayRenderer.renderPollutionInfo(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
        .catch(function (error) {
            console.log(error);
        });

    fetcher.getFiveDaysWeather(city) // Promise for todayrequest
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            todayRenderer.renderPrecipValue(response);
            todayRenderer.renderFiveDaysInfo(response);
            todayRenderer.renderTemperatureChart(response);
            todayRenderer.renderPrecipChart(response);
            todayRenderer.renderWindChart(response);

            fiveDaysRenderer.renderFiveDaysTable(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

spinner.showSpinner();
renderAll(defaultCity);
setTimeout(spinner.hideSpinner.bind(spinner), 1000);

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const city = event.target.firstElementChild.value;
    event.target.firstElementChild.value = '';

    spinner.showSpinner();
    renderAll(city);
    setTimeout(spinner.hideSpinner.bind(spinner), 1000);
});
