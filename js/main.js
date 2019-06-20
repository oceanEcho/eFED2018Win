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

const fetchingErrorMsg = document.querySelector('.data-fetching-error');
const lastdDataMsg = document.querySelector('.loaded-stored-data');

let showFetchingError = () => {
    fetchingErrorMsg.style.display = 'block';
};

let hideFetchingError = () => {
    fetchingErrorMsg.style.display = 'none';
};

let showlastdDataMsg = () => {
    lastdDataMsg.style.display = 'block';
};

let hidelastdDataMsg = () => {
    lastdDataMsg.style.display = 'none';
};

todayRenderer.renderFooter(document.querySelector('footer'));

function renderAll(city) {
    let cityData = {};
    let storedData = JSON.parse(localStorage.getItem('lastData'));

    fetcher.getTodayWeather(city)
        .then(function (response) {
            hideFetchingError();
            hidelastdDataMsg();

            return response.json();
        })
        .then(response => {
            cityData.today = response;
            localStorage.setItem('lastData', JSON.stringify(cityData));

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
                    cityData.pollution = response;
                    localStorage.setItem('lastData', JSON.stringify(cityData));

                    todayRenderer.renderPollutionInfo(response);
                });
        })
        .catch(() => {
            showFetchingError();

            if (storedData.today) {
                showlastdDataMsg();
                todayRenderer.renderCurrCityInfo(storedData.today);
                todayRenderer.renderMainInfo(storedData.today);
                todayRenderer.renderSubInfo(storedData.today);

                fiveDaysRenderer.renderTodayDate(storedData.today);
                fiveDaysRenderer.renderSunInfo(storedData.today);
            }
            if (storedData.pollution) {
                showlastdDataMsg();
                todayRenderer.renderPollutionInfo(storedData.pollution);
            }
        });

    fetcher.getFiveDaysWeather(city)
        .then(response => {
            hideFetchingError();
            hidelastdDataMsg();

            return response.json();
        })
        .then(response => {
            cityData.fiveDays = response;
            localStorage.setItem('lastData', JSON.stringify(cityData));

            todayRenderer.renderPrecipValue(response);
            todayRenderer.renderFiveDaysInfo(response);
            todayRenderer.renderTemperatureChart(response);
            todayRenderer.renderPrecipChart(response);
            todayRenderer.renderWindChart(response);

            fiveDaysRenderer.renderFiveDaysTable(response);
        })
        .catch(() => {
            if (storedData.fiveDays) {
                showlastdDataMsg();
                todayRenderer.renderPrecipValue(storedData.fiveDays);
                todayRenderer.renderFiveDaysInfo(storedData.fiveDays);
                todayRenderer.renderTemperatureChart(storedData.fiveDays);
                todayRenderer.renderPrecipChart(storedData.fiveDays);
                todayRenderer.renderWindChart(storedData.fiveDays);

                fiveDaysRenderer.renderFiveDaysTable(storedData.fiveDays);
            }
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
