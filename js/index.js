const defaultCity = 'Izhevsk';

const renderer = new FiveDaysRenderer();
const fetcher = new Fetcher();
const transformer = new Transformer();

const spinner = new Spinner(
    document.querySelector('.overlay'),
    document.querySelector('.spinner')
);

spinner.showSpinner();

const todayData = transformer.toJSON(fetcher.getTodayWeather(defaultCity));
const fiveDaysData = transformer.toJSON(fetcher.getFiveDaysWeather(defaultCity));

renderer.renderFiveDaysTable(fiveDaysData);

setTimeout(spinner.hideSpinner.bind(spinner), 2000);

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const city = event.target.firstElementChild.value;
    
    event.target.firstElementChild.value = '';
    
    spinner.showSpinner();

    const todayData = transformer.toJSON(fetcher.getTodayWeather(city));
    const fiveDaysData = transformer.toJSON(fetcher.getFiveDaysWeather(city));

    renderer.renderFiveDaysTable(fiveDaysData);

    setTimeout(spinner.hideSpinner.bind(spinner), 1000);
});