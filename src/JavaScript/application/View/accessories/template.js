const template = `<header class="header">
<div class="header--operations">
  <button class="header--operations_refresh"><img src="./assets/images/refresh-icon.svg" alt=""></button>
  <div class="header--wrapper">
    <select class="language_select">
      <option class="language_select--option" value="en">en</option>
      <option class="language_select--option" value="ru">ru</option>
      <option class="language_select--option" value="be">be</option>
    </select>
  </div>
  <div class="header--temperature">
    <button class="header--temperature_celsius" value='c'>&deg;C</button>
    <button class="header--temperature_fahrenheit" value='f'>&deg;F</button>
  </div>
</div>
<div class="header--search">
  <input class="header--search_input" type="text" placeholder="" required>
  <button class='header--search_submit'></button>
</div>
</header>
<div class="main">
<div class="destination_date">
  <div class="destination">
    <span class="destination--town"></span>, <span class="destination--country"></span>
  </div>
  <div class="date">
    <span class="date--weekday"></span>, <span class="date--number"></span> <span class="date--month"></span> <span class="date--time"></span>
  </div>
</div>
<div class="primary_data">
  <div class="primary_data--forecast">
    <div class="forecast_today">
      <div class="forecast_today--degrees">
        <span class="forecast_today--degrees_amount"></span> <span class="forecast_today--degrees_icon">&deg;</span> <img src="" alt="" class="forecast_today--weather_image">
      </div>
      <div class="forecast_today--details">
        <span class="forecast_today--sky"></span>
        <div class="forecast_today--sensation">
            <span class="forecast_today--sensation_title"></span> <span class="forecast_today--sensation_intensity"></span> <span class="forecast_today--sensation_icon">&deg;</span>
          </div>
          <div class="forecast_today--wind">
              <span class="forecast_today--wind_title"></span> <span class="forecast_today--wind_intensity"></span> <span class="forecast_today--wind_icon"></span>
            </div>
            <div class="forecast_today--humidity">
                <span class="forecast_today--humidity_title"></span> <span class="forecast_today--humidity_intensity"></span> <span class="forecast_today--humidity_icon">%</span>
            </div>
      </div>
    </div>
    <div class="forecast_week">
      <div class="forecast_week--days tomorrow">
        <span class="tomorrow--title forecast_week--title"></span>
        <div class="forecast_week--weather_indication">
          <span class="tomorrow--temperature"></span> <span class="tomorrow--icon">&deg;</span> <img class="tomorrow--image" src="" alt="">
        </div>
      </div>
      <div class="forecast_week--days over_one">
          <span class="over_one--title forecast_week--title"></span>
          <div class="forecast_week--weather_indication">
            <span class="over_one--temperature"></span> <span class="over_one--icon">&deg;</span> <img class="over_one--image" src="" alt="">
          </div>
      </div>
      <div class="forecast_week--days over_two">
          <span class="over_two--title forecast_week--title"></span>
          <div class="forecast_week--weather_indication">
            <span class="over_two--temperature"></span> <span class="over_two--icon">&deg;</span> <img class="over_two--image" src="" alt="">
          </div>
      </div>
    </div>
  </div>
  <div class="primary_data--map">
    <div class="map_wrapper">
    <div id="map">
    </div>
    </div>
    
    <div class="coordinates_data">
      <div class="coordinates_data--latitude">
        <span class="latitude_title"></span> <span class="latitude--value"><span class='latitude--value-degrees'></span>&#176;<span class='latitude--value-minutes'></span>&#8242;</span>
      </div>
      <div class="coordinates_data--longitude">
        <span class="longitude_title"></span> <span class="longitude--value"><span class='longitude--value-degrees'></span>&#176;<span class='longitude--value-minutes'></span>&#8242;</span>
      </div>
    </div>
  </div>
</div>
</div>`

export {template};