import { rusBelConversion } from './accesories/langBase';
export default class Model {
    constructor() {
        this.data = {
            header: {
                search: {
                    input: {
                        en: "Search city or ZIP",
                        ru: "Поиск города или ZIP",
                        be: "Пошук горада цi ZIP"
                    },
                    submit: { en: "SEARCH", ru: "ПОИСК", be: "ПОШУК" }
                }
            },
            main: {
                city: {
                    en: "Minsk",
                    ru: "Минск",
                    be: "Мiнск"
                },
                country: {
                    en: "Belarus",
                    ru: "Беларусь",
                    be: "Беларусь"
                },
                date: {
                    day: {
                        en: "Mon",
                        ru: "Пон",
                        be: "Пан"
                    },
                    figure: 28,
                    month: {
                        en: "October",
                        ru: "Октябрь",
                        be: "Кастрычник"
                    },
                    time: "15:02"
                },
                forecast: {
                    today: {
                        degrees: 10,
                        icon: "partly-cloudy-night",
                        summary: {
                            clouds: {
                                en: "overcast",
                                ru: "облачно",
                                be: "воблачна"
                            },
                            sensation: {
                                title: {
                                    en: "Feels like",
                                    ru: "Ощущается как:",
                                    be: "Адчуваецца як:"
                                },
                                value: 7
                            },
                            wind: {
                                title: {
                                    en: "Wind",
                                    ru: "Ветер",
                                    be: "Вецер"
                                },
                                value: 4,
                                speed: {
                                    en: "m/s",
                                    ru: "м/с",
                                    be: "м/с"
                                }
                            },
                            humidity: {
                                title: {
                                    en: "Humidity",
                                    ru: "Влажность",
                                    be: "Вiльгаць"
                                },
                                value: 78
                            }
                        }
                    },
                    week: {
                        tomorrow: {
                            title: {
                                en: "tuesday",
                                ru: "вторник",
                                be: "ауторак"
                            },
                            value: 7,
                            icon: "snow"
                        },
                        aftertomorrow: {
                            title: {
                                en: "wednesday",
                                ru: "среда",
                                be: "серада"
                            },
                            value: 5,
                            icon: "tornado"
                        },
                        aftertomorrows: {
                            title: {
                                en: "thursday",
                                ru: "четверг",
                                be: "чацвер"
                            },
                            value: 2,
                            icon: "hail"
                        }
                    },
                    coordinates: {
                        longitude: {
                            value: 53.54,
                            title: { en: "longitude", ru: "долгота", be: "даугата" }
                        },
                        latitude: {
                            value: 27.34,
                            title: { en: "latitude", ru: "широта", be: "шырата" }
                        }
                    }
                }
            }
        };
    }

    appChangesBind(callback) {
        this.appChangesRespond = callback
    }

    changeLang() {
        this.appChangesRespond(this.data)
    }

    async getCoordinates(query, lang) {
        const response = await fetch("https://cors-anywhere.herokuapp.com/" + `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=f5f57c660c53410989934259fcbc9f22&language=${lang}&pretty=1`);
        const locationData = await response.json();
        return locationData;
      }

    async getAllLangCoords (query) {
        const result = await Promise.all([this.getCoordinates(query, 'en'), this.getCoordinates(query, 'ru'), this.getCoordinates(query, 'be')]);
        return result;
    }  

    async getWeather (latitude, longitude, lang) {
        const response = await fetch("https://cors-anywhere.herokuapp.com/" + `https://api.darksky.net/forecast/2bf27985f5a6844febcdc43c99cc81ce/${latitude},${longitude}?lang=${lang}`);
        const weatherRespond = await response.json();
        return weatherRespond;
    }

    async getAllLangWeather (latitude, longitude) {
        const result = await Promise.all([this.getWeather (latitude, longitude, 'en'), this.getWeather (latitude, longitude, 'ru'), this.getWeather (latitude, longitude, 'be')]);
		return result;
    }

    async getCurrentUserCoords () {
        const response = await fetch("https://cors-anywhere.herokuapp.com/" + `https://ipinfo.io/json?token=48ad9dbb1ad5a6`);
        const locationData = await response.json();
        return locationData;
    }

    degreesExchangeToC (value) {
        return Math.round((value - 32) / 1.8)
    }

    degreesExchangeToF (value) {
       return Math.round((value * 1.8) + 32)
    }

    convertToC () {
        this.data.main.forecast.today.degrees = this.degreesExchangeToC(this.data.main.forecast.today.degrees);
        this.data.main.forecast.today.summary.sensation.value = this.degreesExchangeToC(this.data.main.forecast.today.summary.sensation.value);
        this.data.main.forecast.week.tomorrow.value = this.degreesExchangeToC(this.data.main.forecast.week.tomorrow.value);
        this.data.main.forecast.week.aftertomorrow.value = this.degreesExchangeToC(this.data.main.forecast.week.aftertomorrow.value);
        this.data.main.forecast.week.aftertomorrows.value = this.degreesExchangeToC(this.data.main.forecast.week.aftertomorrows.value);

        this.appChangesRespond(this.data)
    }

    convertToF () {
        this.data.main.forecast.today.degrees = this.degreesExchangeToF(this.data.main.forecast.today.degrees);
        this.data.main.forecast.today.summary.sensation.value = this.degreesExchangeToF(this.data.main.forecast.today.summary.sensation.value);
        this.data.main.forecast.week.tomorrow.value = this.degreesExchangeToF(this.data.main.forecast.week.tomorrow.value);
        this.data.main.forecast.week.aftertomorrow.value = this.degreesExchangeToF(this.data.main.forecast.week.aftertomorrow.value);
        this.data.main.forecast.week.aftertomorrows.value = this.degreesExchangeToF(this.data.main.forecast.week.aftertomorrows.value);

        this.appChangesRespond(this.data)
    }

    getNewBackground () {
        
    }

    async initApp () {
        var userData = await this.getCurrentUserCoords();
        var userCoords = userData.loc.split(',');

        this.data.main.forecast.coordinates.latitude.value = userCoords[0];
        this.data.main.forecast.coordinates.longitude.value = userCoords[1];

        this.data.main.city.en = userData.city;
        this.inputNewLocation(this.data.main.city.en)

        // this.data.main.country.en = userData.country;
        // var weatherData = await this.getWeather(this.data.main.forecast.coordinates.latitude.value, this.data.main.forecast.coordinates.longitude.value, 'en');
       
        // var timeObject = new Date();

        // this.data.main.date.figure = timeObject.toLocaleString('en', {timeZone: weatherData.timezone, day: 'numeric'});
        // this.data.main.date.day.en = timeObject.toLocaleString('en', {timeZone: weatherData.timezone, weekday: 'short'});
        // this.data.main.date.month.en = timeObject.toLocaleString('en', {timeZone: weatherData.timezone, month: 'long'});
        // this.data.main.date.time = timeObject.toLocaleString('ru', {timeZone: weatherData.timezone, hour: '2-digit'}) + ':' + timeObject.toLocaleString('ru', {timeZone: weatherData.timezone, minute: '2-digit'});

        // this.data.main.forecast.today.degrees = weatherData.currently.temperature;
        // this.data.main.forecast.today.icon = weatherData.currently.icon;
        // this.data.main.forecast.today.summary.wind.value = weatherData.currently.windSpeed;
        // this.data.main.forecast.today.summary.sensation.value = weatherData.currently.apparentTemperature;
        // this.data.main.forecast.today.summary.humidity.value = weatherData.currently.humidity * 100;
        // this.data.main.forecast.today.summary.clouds.en = weatherData.currently.summary;

        // timeObject.setDate(timeObject.getDate() + 1);
        // this.data.main.forecast.week.tomorrow.title.en = timeObject.toLocaleString('en', {timeZone: weatherData.timezone, weekday: 'long'});
        // this.data.main.forecast.week.tomorrow.value = Math.round((weatherData.daily.data[2].temperatureHigh + weatherData.daily.data[2].temperatureLow) / 2);
        // this.data.main.forecast.week.tomorrow.icon = weatherData.daily.data[2].icon

        // timeObject.setDate(timeObject.getDate() + 1);
        // this.data.main.forecast.week.aftertomorrow.title.en = timeObject.toLocaleString('en', {timeZone: weatherData.timezone, weekday: 'long'});
        // this.data.main.forecast.week.aftertomorrow.value = Math.round((weatherData.daily.data[3].temperatureHigh + weatherData.daily.data[3].temperatureLow) / 2);
        // this.data.main.forecast.week.aftertomorrow.icon = weatherData.daily.data[3].icon

        // timeObject.setDate(timeObject.getDate() + 1);
        // this.data.main.forecast.week.aftertomorrows.title.en = timeObject.toLocaleString('en', {timeZone: weatherData.timezone, weekday: 'long'});
        // this.data.main.forecast.week.aftertomorrows.value = Math.round((weatherData.daily.data[4].temperatureHigh + weatherData.daily.data[4].temperatureLow) / 2);
        // this.data.main.forecast.week.aftertomorrows.icon = weatherData.daily.data[4].icon;
        
        // this.appChangesRespond(this.data)
    }


    async inputNewLocation (inputValue) { 
    
        var inputCoordinates =  await this.getAllLangCoords(inputValue);
       
        this.data.main.forecast.coordinates.longitude.value = inputCoordinates[0].results[0].geometry.lng;
        this.data.main.forecast.coordinates.latitude.value = inputCoordinates[0].results[0].geometry.lat;
        
        this.data.main.country.en = inputCoordinates[0].results[0].components.country;
        this.data.main.country.ru = inputCoordinates[1].results[0].components.country;
        this.data.main.country.be = inputCoordinates[2].results[0].components.country;

        this.data.main.city.en = inputCoordinates[0].results[0].components.city !== undefined ? inputCoordinates[0].results[0].components.city : 
            inputCoordinates[0].results[0].formatted.split(',')[0];

        this.data.main.city.ru = inputCoordinates[1].results[0].components.city !== undefined ? inputCoordinates[1].results[0].components.city : 
            inputCoordinates[1].results[0].formatted.split(',')[0];
            console.log(inputCoordinates[2].results[0])
        this.data.main.city.be = inputCoordinates[2].results[0].components.city !== undefined ? inputCoordinates[2].results[0].components.city : 
            inputCoordinates[2].results[0].formatted.split(',')[0];

        var weatherData = await this.getAllLangWeather(this.data.main.forecast.coordinates.latitude.value, this.data.main.forecast.coordinates.longitude.value) /*.then(a => weatherData = a);*/
       
        var timeObject = new Date();

        this.data.main.date.figure = timeObject.toLocaleString('en', {timeZone: weatherData[0].timezone, day: 'numeric'});
        this.data.main.date.day.en = timeObject.toLocaleString('en', {timeZone: weatherData[0].timezone, weekday: 'short'});
        this.data.main.date.day.ru = timeObject.toLocaleString('ru', {timeZone: weatherData[0].timezone, weekday: 'short'});
       
        this.data.main.date.day.be = rusBelConversion.weekdays.short[this.data.main.date.day.ru];

        this.data.main.date.month.en = timeObject.toLocaleString('en', {timeZone: weatherData[0].timezone, month: 'long'});
        this.data.main.date.month.ru = timeObject.toLocaleString('ru', {timeZone: weatherData[0].timezone, month: 'long'});
        
        this.data.main.date.month.be = rusBelConversion.months[this.data.main.date.month.ru];

        const minutes = timeObject.toLocaleString('ru', {timeZone: weatherData[0].timezone, minute: '2-digit'}).length < 2 ? '0' + timeObject.toLocaleString('ru', {timeZone: weatherData[0].timezone, minute: '2-digit'}) : timeObject.toLocaleString('ru', {timeZone: weatherData[0].timezone, minute: '2-digit'})
        this.data.main.date.time = timeObject.toLocaleString('ru', {timeZone: weatherData[0].timezone, hour: '2-digit'}) + ':' + minutes;

        this.data.main.forecast.today.degrees = Math.round(weatherData[0].currently.temperature);
        this.data.main.forecast.today.icon = weatherData[0].currently.icon;
        this.data.main.forecast.today.summary.wind.value = weatherData[0].currently.windSpeed;
        this.data.main.forecast.today.summary.sensation.value = Math.round(weatherData[0].currently.apparentTemperature);
        this.data.main.forecast.today.summary.humidity.value = weatherData[0].currently.humidity * 100;
        
        this.data.main.forecast.today.summary.clouds.en = weatherData[0].currently.summary;
        this.data.main.forecast.today.summary.clouds.ru = weatherData[1].currently.summary;
        this.data.main.forecast.today.summary.clouds.be = weatherData[2].currently.summary;

        timeObject.setDate(timeObject.getDate() + 1);
        this.data.main.forecast.week.tomorrow.title.en = timeObject.toLocaleString('en', {timeZone: weatherData[0].timezone, weekday: 'long'});
        this.data.main.forecast.week.tomorrow.title.ru = timeObject.toLocaleString('ru', {timeZone: weatherData[0].timezone, weekday: 'long'});
       
        this.data.main.forecast.week.tomorrow.title.be = rusBelConversion.weekdays.long[this.data.main.forecast.week.tomorrow.title.ru];

        this.data.main.forecast.week.tomorrow.value = Math.round((weatherData[0].daily.data[2].temperatureHigh + weatherData[0].daily.data[2].temperatureLow) / 2);
        this.data.main.forecast.week.tomorrow.icon = weatherData[0].daily.data[2].icon

        timeObject.setDate(timeObject.getDate() + 1);
        this.data.main.forecast.week.aftertomorrow.title.en = timeObject.toLocaleString('en', {timeZone: weatherData[0].timezone, weekday: 'long'});
        this.data.main.forecast.week.aftertomorrow.title.ru = timeObject.toLocaleString('ru', {timeZone: weatherData[0].timezone, weekday: 'long'});
       
        this.data.main.forecast.week.aftertomorrow.title.be = rusBelConversion.weekdays.long[this.data.main.forecast.week.aftertomorrow.title.ru];

        this.data.main.forecast.week.aftertomorrow.value = Math.round((weatherData[0].daily.data[3].temperatureHigh + weatherData[0].daily.data[3].temperatureLow) / 2);
        this.data.main.forecast.week.aftertomorrow.icon = weatherData[0].daily.data[3].icon

        timeObject.setDate(timeObject.getDate() + 1);
        this.data.main.forecast.week.aftertomorrows.title.en = timeObject.toLocaleString('en', {timeZone: weatherData[0].timezone, weekday: 'long'});
        this.data.main.forecast.week.aftertomorrows.title.ru = timeObject.toLocaleString('ru', {timeZone: weatherData[0].timezone, weekday: 'long'});
       
        this.data.main.forecast.week.aftertomorrows.title.be = rusBelConversion.weekdays.long[this.data.main.forecast.week.aftertomorrows.title.ru];

        this.data.main.forecast.week.aftertomorrows.value = Math.round((weatherData[0].daily.data[4].temperatureHigh + weatherData[0].daily.data[4].temperatureLow) / 2);
        this.data.main.forecast.week.aftertomorrows.icon = weatherData[0].daily.data[4].icon;
        this.appChangesRespond(this.data)
    }



    

    


}