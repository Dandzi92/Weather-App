const config = {
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
        timezone: '',
        time: {daytime: '', season: ''},
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
                degrees:  {c: '', f: ''},
                icon: "partly-cloudy-night",
                summary: {
                    clouds: {
                        en: "overcast",
                        ru: "облачно",
                        be: "воблачна"
                    },
                    sensation: {
                        title: {
                            en: "Feels like:",
                            ru: "Ощущается как:",
                            be: "Адчуваецца як:"
                        },
                        value:  {c: '', f: ''},
                    },
                    wind: {
                        title: {
                            en: "Wind:",
                            ru: "Ветер:",
                            be: "Вецер:"
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
                            en: "Humidity:",
                            ru: "Влажность:",
                            be: "Вiльгаць:"
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
                    value: {c: '', f: ''},
                    icon: "snow"
                },
                aftertomorrow: {
                    title: {
                        en: "wednesday",
                        ru: "среда",
                        be: "серада"
                    },
                    value:  {c: '', f: ''},
                    icon: "tornado"
                },
                aftertomorrows: {
                    title: {
                        en: "thursday",
                        ru: "четверг",
                        be: "чацвер"
                    },
                    value:  {c: '', f: ''},
                    icon: "hail"
                }
            },
            coordinates: {
                longitude: {
                    value: 53.54,
                    title: { en: "longitude:", ru: "долгота:", be: "даўжыня:" },
                    separation: {degrees: '', minutes: ''}

                },
                latitude: {
                    value: 27.34,
                    title: { en: "latitude:", ru: "широта:", be: "шырыня:" },
                    separation: {degrees: '', minutes: ''}
                }
            }
        }
    },
    background: '',
};

export {config};