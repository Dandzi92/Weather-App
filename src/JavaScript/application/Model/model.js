import { rusBelConversion } from './accesories/langBase';
import { config } from './accesories/configuration';

export default class Model {
  constructor() {
    this.data = config;
  }

  appChangesBind(callback) {
    this.appChangesRespond = callback;
  }

  changeLang() {
    this.appChangesRespond(this.data);
  }

  async getCoordinates(query, lang) {
    const response = await fetch('https://sheltered-woodland-51519.herokuapp.com/' + `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=f5f57c660c53410989934259fcbc9f22&language=${lang}&pretty=1`);
    const locationData = await response.json();
    return locationData;
  }

  async getAllLangCoords(query) {
    const result = await Promise.all([this.getCoordinates(query, 'en'), this.getCoordinates(query, 'ru'), this.getCoordinates(query, 'be')]);
    return result;
  }

  async getWeather(latitude, longitude, lang) {
    const response = await fetch('https://sheltered-woodland-51519.herokuapp.com/' + `https://api.darksky.net/forecast/2bf27985f5a6844febcdc43c99cc81ce/${latitude},${longitude}?lang=${lang}`);
    const weatherRespond = await response.json();
    return weatherRespond;
  }

  async getAllLangWeather(latitude, longitude) {
    const result = await Promise.all([this.getWeather(latitude, longitude, 'en'), this.getWeather(latitude, longitude, 'ru'), this.getWeather(latitude, longitude, 'be')]);
    return result;
  }

  async getCurrentUserCoords() {
    const response = await fetch('https://sheltered-woodland-51519.herokuapp.com/' + 'https://ipinfo.io/json?token=48ad9dbb1ad5a6');
    const locationData = await response.json();
    return locationData;
  }

  degreesExchangeToC(value) {
    return Math.round((value - 32) / 1.8);
  }

  degreesExchangeToF(value) {
    return Math.round((value * 1.8) + 32);
  }

  convertDegreeToMinute(degree) {
    return Math.round(degree * 60);
  }


  async getNewBackground(country, season, weather, daytime) {
    try {
      const response = await fetch('https://sheltered-woodland-51519.herokuapp.com/' + `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${season}+${daytime}+${weather}+weather+${country}&client_id=9d3fa57b4a20b2dae667e7018978315b46962e882095e9db58254e05bb08160c`);
      const data = await response.json();
      const path = data.urls.regular;
      return path;
    } catch (error) {
      return 'https://images.unsplash.com/photo-1489864983806-4d0d07e2d37d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMjE5OH0';
    }
  }

  async refreshApp() {
    const weatherData = await this.getAllLangWeather(this.data.main.forecast.coordinates.latitude.value, this.data.main.forecast.coordinates.longitude.value); /* .then(a => weatherData = a); */
    this.data.main.timezone = weatherData[0].timezone;
    this.setAppDateInfo(this.data.main.timezone);
    this.setAppWeatherInfo(weatherData);
    this.data.background = await this.getNewBackground(this.data.main.country.en, this.data.main.time.season, this.data.main.forecast.today.summary.clouds.en, this.data.main.time.daytime);
    this.appChangesRespond(this.data);
  }

  setAppDateInfo(timezone) {
    const timeObject = new Date();
    this.data.main.date.figure = timeObject.toLocaleString('en', { timeZone: timezone, day: 'numeric' });
    this.data.main.date.day.en = timeObject.toLocaleString('en', { timeZone: timezone, weekday: 'short' });
    this.data.main.date.day.ru = timeObject.toLocaleString('ru', { timeZone: timezone, weekday: 'short' });
    this.data.main.date.day.be = rusBelConversion.weekdays.short[this.data.main.date.day.ru];
    this.data.main.date.month.en = timeObject.toLocaleString('en', { timeZone: timezone, month: 'long' });
    this.data.main.date.month.ru = timeObject.toLocaleString('ru', { timeZone: timezone, month: 'long' });
    this.data.main.date.month.be = rusBelConversion.months[this.data.main.date.month.ru];
    switch ((this.data.main.date.month.en).toLowerCase()) {
      case 'december':
      case 'january':
      case 'february':
        this.data.main.time.season = 'winter';
        break;
      case 'march':
      case 'april':
      case 'may':
        this.data.main.time.season = 'spring';
        break;
      case 'june':
      case 'july':
      case 'august':
        this.data.main.time.season = 'summer';
        break;
      case 'september':
      case 'october':
      case 'november':
        this.data.main.time.season = 'autumn';
        break;
    }

    const minutes = timeObject.toLocaleString('ru', { timeZone: timezone, minute: '2-digit' }).length < 2 ? `0${timeObject.toLocaleString('ru', { timeZone: timezone, minute: '2-digit' })}` : timeObject.toLocaleString('ru', { timeZone: timezone, minute: '2-digit' });
    const hours = timeObject.toLocaleString('ru', { timeZone: timezone, hour: '2-digit' });

    if (Number(hours) >= 0 && Number(hours) <= 4) { this.data.main.time.daytime = 'night'; } else if (Number(hours) > 4 && Number(hours) <= 12) { this.data.main.time.daytime = 'morning'; } else if (Number(hours) > 12 && Number(hours) <= 16) { this.data.main.time.daytime = 'noon'; } else if (Number(hours) > 16 && Number(hours) < 24) { this.data.main.time.daytime = 'evening'; }


    this.data.main.date.time = `${timeObject.toLocaleString('ru', { timeZone: timezone, hour: '2-digit' })}:${minutes}`;
    timeObject.setDate(timeObject.getDate() + 1);
    this.data.main.forecast.week.tomorrow.title.en = timeObject.toLocaleString('en', { timeZone: timezone, weekday: 'long' });
    this.data.main.forecast.week.tomorrow.title.ru = timeObject.toLocaleString('ru', { timeZone: timezone, weekday: 'long' });
    this.data.main.forecast.week.tomorrow.title.be = rusBelConversion.weekdays.long[this.data.main.forecast.week.tomorrow.title.ru];
    timeObject.setDate(timeObject.getDate() + 1);
    this.data.main.forecast.week.aftertomorrow.title.en = timeObject.toLocaleString('en', { timeZone: timezone, weekday: 'long' });
    this.data.main.forecast.week.aftertomorrow.title.ru = timeObject.toLocaleString('ru', { timeZone: timezone, weekday: 'long' });
    this.data.main.forecast.week.aftertomorrow.title.be = rusBelConversion.weekdays.long[this.data.main.forecast.week.aftertomorrow.title.ru];
    timeObject.setDate(timeObject.getDate() + 1);
    this.data.main.forecast.week.aftertomorrows.title.en = timeObject.toLocaleString('en', { timeZone: timezone, weekday: 'long' });
    this.data.main.forecast.week.aftertomorrows.title.ru = timeObject.toLocaleString('ru', { timeZone: timezone, weekday: 'long' });
    this.data.main.forecast.week.aftertomorrows.title.be = rusBelConversion.weekdays.long[this.data.main.forecast.week.aftertomorrows.title.ru];
  }

  timeRefresh() {
    this.setAppDateInfo(this.data.main.timezone);
    this.appChangesRespond(this.data);
  }

  setAppWeatherInfo(currentWeather) {
    this.data.main.forecast.today.degrees.f = Math.round(currentWeather[0].currently.temperature);
    this.data.main.forecast.today.degrees.c = this.degreesExchangeToC(this.data.main.forecast.today.degrees.f);
    this.data.main.forecast.today.icon = currentWeather[0].currently.icon;
    this.data.main.forecast.today.summary.wind.value = currentWeather[0].currently.windSpeed;
    this.data.main.forecast.today.summary.sensation.value.f = Math.round(currentWeather[0].currently.apparentTemperature);
    this.data.main.forecast.today.summary.sensation.value.c = this.degreesExchangeToC(this.data.main.forecast.today.summary.sensation.value.f);
    this.data.main.forecast.today.summary.humidity.value = Math.round(currentWeather[0].currently.humidity * 100);
    this.data.main.forecast.today.summary.clouds.en = currentWeather[0].currently.summary;
    this.data.main.forecast.today.summary.clouds.ru = currentWeather[1].currently.summary;
    this.data.main.forecast.today.summary.clouds.be = currentWeather[2].currently.summary;
    this.data.main.forecast.week.tomorrow.value.f = Math.round((currentWeather[0].daily.data[2].temperatureHigh + currentWeather[0].daily.data[2].temperatureLow) / 2);
    this.data.main.forecast.week.tomorrow.value.c = this.degreesExchangeToC(this.data.main.forecast.week.tomorrow.value.f);
    this.data.main.forecast.week.tomorrow.icon = currentWeather[0].daily.data[2].icon;
    this.data.main.forecast.week.aftertomorrow.value.f = Math.round((currentWeather[0].daily.data[3].temperatureHigh + currentWeather[0].daily.data[3].temperatureLow) / 2);
    this.data.main.forecast.week.aftertomorrow.value.c = this.degreesExchangeToC(this.data.main.forecast.week.aftertomorrow.value.f);
    this.data.main.forecast.week.aftertomorrow.icon = currentWeather[0].daily.data[3].icon;
    this.data.main.forecast.week.aftertomorrows.value.f = Math.round((currentWeather[0].daily.data[4].temperatureHigh + currentWeather[0].daily.data[4].temperatureLow) / 2);
    this.data.main.forecast.week.aftertomorrows.value.c = this.degreesExchangeToC(this.data.main.forecast.week.aftertomorrows.value.f);
    this.data.main.forecast.week.aftertomorrows.icon = currentWeather[0].daily.data[4].icon;
  }

  setAppLocationInfo(currentLocation) {
    const longDegree = currentLocation[0].results[0].geometry.lng;
    this.data.main.forecast.coordinates.longitude.value = longDegree;
    const degreeLongWhole = (this.data.main.forecast.coordinates.longitude.value).toFixed(2).split('.')[0];
    this.data.main.forecast.coordinates.longitude.separation.degrees = degreeLongWhole;
    this.data.main.forecast.coordinates.longitude.separation.minutes = this.convertDegreeToMinute(Number(longDegree) - Number(degreeLongWhole));

    const latDegree = currentLocation[0].results[0].geometry.lat;
    this.data.main.forecast.coordinates.latitude.value = latDegree;
    const degreeLatWhole = (this.data.main.forecast.coordinates.latitude.value).toFixed(2).split('.')[0];
    this.data.main.forecast.coordinates.latitude.separation.degrees = degreeLatWhole;
    this.data.main.forecast.coordinates.latitude.separation.minutes = this.convertDegreeToMinute(Number(latDegree) - Number(degreeLatWhole));

    this.data.main.country.en = currentLocation[0].results[0].components.country;
    this.data.main.country.ru = currentLocation[1].results[0].components.country;
    this.data.main.country.be = currentLocation[2].results[0].components.country;
    this.data.main.city.en = currentLocation[0].results[0].components.city !== undefined ? currentLocation[0].results[0].components.city
      : currentLocation[0].results[0].formatted.split(',')[0];
    this.data.main.city.ru = currentLocation[1].results[0].components.city !== undefined ? currentLocation[1].results[0].components.city
      : currentLocation[1].results[0].formatted.split(',')[0];
    this.data.main.city.be = currentLocation[2].results[0].components.city !== undefined ? currentLocation[2].results[0].components.city
      : currentLocation[2].results[0].formatted.split(',')[0];
  }

  async initApp() {
    const userData = await this.getCurrentUserCoords();
    const userCoords = userData.loc.split(',');
    this.data.main.forecast.coordinates.latitude.value = userCoords[0];
    this.data.main.forecast.coordinates.longitude.value = userCoords[1];
    const userLocationInfo = await this.getAllLangCoords(`${this.data.main.forecast.coordinates.latitude.value}+${this.data.main.forecast.coordinates.longitude.value}`);
    this.setAppLocationInfo(userLocationInfo);
    const weatherData = await this.getAllLangWeather(this.data.main.forecast.coordinates.latitude.value, this.data.main.forecast.coordinates.longitude.value); /* .then(a => weatherData = a); */
    this.data.main.timezone = weatherData[0].timezone;
    this.setAppDateInfo(this.data.main.timezone);
    this.setAppWeatherInfo(weatherData);
    this.data.background = await this.getNewBackground(this.data.main.country.en, this.data.main.time.season, this.data.main.forecast.today.summary.clouds.en, this.data.main.time.daytime);
    this.appChangesRespond(this.data);
  }


  async inputNewLocation(inputValue) {
    const inputCoordinates = await this.getAllLangCoords(inputValue);
    this.setAppLocationInfo(inputCoordinates);
    const weatherData = await this.getAllLangWeather(this.data.main.forecast.coordinates.latitude.value, this.data.main.forecast.coordinates.longitude.value); /* .then(a => weatherData = a); */
    this.data.main.timezone = weatherData[0].timezone;
    this.setAppDateInfo(this.data.main.timezone);
    this.setAppWeatherInfo(weatherData);
    this.data.background = await this.getNewBackground(this.data.main.country.en, this.data.main.time.season, this.data.main.forecast.today.summary.clouds.en, this.data.main.time.daytime);
    this.appChangesRespond(this.data);
  }
}
