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

// const todayData = transformer.toJSON(fetcher.getTodayWeather(city));
// const fiveDaysData = transformer.toJSON(fetcher.getFiveDaysWeather(city));
// const pollutionLevel = transformer.toJSON(fetcher.getPollutionInfo(todayData.coord['lon'], todayData.coord['lat']));

// console.log(todayData);

// todayRenderer.renderFooter(document.querySelector('footer'));

// todayRenderer.renderCurrCityInfo(todayData);
// todayRenderer.renderPollutionInfo(pollutionLevel);
// todayRenderer.renderMainInfo(todayData);
// todayRenderer.renderSubInfo(todayData);

// todayRenderer.renderFiveDaysInfo(fiveDaysData);
// todayRenderer.renderTemperatureChart(fiveDaysData);
// todayRenderer.renderPrecipChart(fiveDaysData);
// todayRenderer.renderWindChart(fiveDaysData);

// fiveDaysRenderer.renderFiveDaysTable(fiveDaysData);
// fiveDaysRenderer.renderTodayDate(todayData);

// spinner.hideSpinner(spinner);

function renderAll(city) {
    fetcher.getTodayWeather(city) // Promise for five days info
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
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

    fetcher.getFiveDaysWeather(city) // Promise for today info
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
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
