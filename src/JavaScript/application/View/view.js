import { template } from './accessories/template';

export default class View {
    constructor() {
        this.wrapper = document.querySelector(".wrapper");
        this.wrapper.insertAdjacentHTML("beforeend", template)
    }
    get _Language() {
        return document.querySelector('.language_select').value
    }

    get _Query() {
        return document.querySelector('.header--search_input').value
    }

    initializeMap(lng, lat) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZG9kaW5zYSIsImEiOiJjazRiZ2dweDcwZGdlM2tuem9tYmQ1c2xxIn0.__iIMqnKXIpRND_TeBOlJw';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11', 
            center: [lng, lat], 
            zoom: 9 
        });
    }

    displayApp(data) {
        document.querySelector('.header--search_input').placeholder = data.header.search.input[this._Language];
        document.querySelector('.header--search_submit').textContent = data.header.search.submit[this._Language];
        document.querySelector('.destination--town').textContent = data.main.city[this._Language];
        document.querySelector('.destination--country').textContent = data.main.country[this._Language];
        document.querySelector('.date--weekday').textContent = data.main.date.day[this._Language];
        document.querySelector('.date--number').textContent = data.main.date.figure;
        document.querySelector('.date--month').textContent = data.main.date.month[this._Language];
        document.querySelector('.date--time').textContent = data.main.date.time;
        document.querySelector('.forecast_today--degrees_amount').textContent = data.main.forecast.today.degrees;
        document.querySelector('.forecast_today--weather_image').src = `./assets/images/weather/big/${data.main.forecast.today.icon}.png`;
        document.querySelector('.forecast_today--sky').textContent = data.main.forecast.today.summary.clouds[this._Language];
        document.querySelector('.forecast_today--sensation_title').textContent = data.main.forecast.today.summary.sensation.title[this._Language];
        document.querySelector('.forecast_today--sensation_intensity').textContent = data.main.forecast.today.summary.sensation.value;
        document.querySelector('.forecast_today--wind_title').textContent = data.main.forecast.today.summary.wind.title[this._Language];
        document.querySelector('.forecast_today--wind_icon').textContent = data.main.forecast.today.summary.wind.speed[this._Language];
        document.querySelector('.forecast_today--wind_intensity').textContent = data.main.forecast.today.summary.wind.value;
        document.querySelector('.forecast_today--humidity_title').textContent = data.main.forecast.today.summary.humidity.title[this._Language];
        document.querySelector('.forecast_today--humidity_intensity').textContent = data.main.forecast.today.summary.humidity.value;
        document.querySelector('.tomorrow--title').textContent = data.main.forecast.week.tomorrow.title[this._Language];
        document.querySelector('.tomorrow--temperature').textContent = data.main.forecast.week.tomorrow.value;
        document.querySelector('.tomorrow--image').src = `./assets/images/weather/${data.main.forecast.week.tomorrow.icon}.png`;
        document.querySelector('.over_one--title').textContent = data.main.forecast.week.aftertomorrow.title[this._Language];
        document.querySelector('.over_one--temperature').textContent = data.main.forecast.week.aftertomorrow.value;
        document.querySelector('.over_one--image').src = `./assets/images/weather/${data.main.forecast.week.aftertomorrow.icon}.png`;
        document.querySelector('.over_two--title').textContent = data.main.forecast.week.aftertomorrows.title[this._Language];
        document.querySelector('.over_two--temperature').textContent = data.main.forecast.week.aftertomorrows.value;
        document.querySelector('.over_two--image').src = `./assets/images/weather/${data.main.forecast.week.aftertomorrows.icon}.png`;
        document.querySelector('.latitude_title').textContent = data.main.forecast.coordinates.latitude.title[this._Language];
        document.querySelector('.latitude--value').textContent = data.main.forecast.coordinates.latitude.value;
        document.querySelector('.longitude_title').textContent = data.main.forecast.coordinates.longitude.title[this._Language];
        document.querySelector('.longitude--value').textContent = data.main.forecast.coordinates.longitude.value;
        this.initializeMap(data.main.forecast.coordinates.longitude.value, data.main.forecast.coordinates.latitude.value)
    }

    langChangeBind(handler) {
        document.querySelector('.language_select').addEventListener('change', event => {
            handler()
        })
    }

    searchInputBind(handler) {
        document.querySelector('.header--search_submit').addEventListener('click', event => {
            handler(this._Query)
        })
    }

    buttonFarBind (handler) {
        document.querySelector('.header--temperature_fahrenheit').addEventListener('click', event => {
            handler()
        })
    }

    buttonCelBind (handler) {
        document.querySelector('.header--temperature_celsius').addEventListener('click', event => {
            handler()
        })
    }
}