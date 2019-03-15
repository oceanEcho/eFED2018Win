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

spinner.showSpinner();

const todayData = transformer.toJSON(fetcher.getTodayWeather(defaultCity));
const fiveDaysData = transformer.toJSON(fetcher.getFiveDaysWeather(defaultCity));
const pollutionLevel = transformer.toJSON(fetcher.getPollutionInfo(todayData.coord['lon'], todayData.coord['lat']));

todayRenderer.renderFooter(document.querySelector('footer'));

todayRenderer.renderCurrCityInfo(todayData);
todayRenderer.renderPollutionInfo(pollutionLevel.data);
todayRenderer.renderMainInfo(todayData);
todayRenderer.renderSubInfo(todayData);

todayRenderer.renderFiveDaysInfo(fiveDaysData);
todayRenderer.renderTemperatureChart(fiveDaysData);
todayRenderer.renderPrecipChart(fiveDaysData);
todayRenderer.renderWindChart(fiveDaysData);

fiveDaysRenderer.renderFiveDaysTable(fiveDaysData);

setTimeout(spinner.hideSpinner.bind(spinner), 2000);

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const city = event.target.firstElementChild.value;
    
    event.target.firstElementChild.value = '';
    
    spinner.showSpinner();

    const todayData = transformer.toJSON(fetcher.getTodayWeather(city));
    const fiveDaysData = transformer.toJSON(fetcher.getFiveDaysWeather(city));
    const pollutionLevel = transformer.toJSON(fetcher.getPollutionInfo(todayData.coord['lon'], todayData.coord['lat']));

    todayRenderer.renderCurrCityInfo(todayData);
    todayRenderer.renderPollutionInfo(pollutionLevel.data);
    todayRenderer.renderMainInfo(todayData);
    todayRenderer.renderSubInfo(todayData);

    todayRenderer.renderFiveDaysInfo(fiveDaysData);
    todayRenderer.renderTemperatureChart(fiveDaysData);
    todayRenderer.renderPrecipChart(fiveDaysData);
    todayRenderer.renderWindChart(fiveDaysData);

    fiveDaysRenderer.renderFiveDaysTable(fiveDaysData);

    setTimeout(spinner.hideSpinner.bind(spinner), 1000);
});
