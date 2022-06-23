import React, { useState } from 'react';
import { api } from './api';
import classNames from 'classnames';

import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

interface CoordinatesType {
  lat: number,
  lng: number,
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [weather, setWeather] = useState<any>({});

  const dateBuilder = (d: Date) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const handleSelect = async (value: string) => {
    setQuery(value.split(' ')[0]);
    const resp = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result);
    })
  }

  return (
    <div className={classNames(
      'app',
      {sun: typeof weather.main !== "undefined" && weather.weather[0].main === "Sun"},
      {clouds: typeof weather.main !== "undefined" && weather.weather[0].main === "Clouds"},
      {clear: typeof weather.main !== "undefined" && weather.weather[0].main === "Clear"},
      {snow: typeof weather.main !== "undefined" && weather.weather[0].main === "Snow"},
      {rain: typeof weather.main !== "undefined" && weather.weather[0].main === "Rain"},
    )}>
      <main>
        <div className="app__search-box">
          <PlacesAutocomplete
            value={query} 
            onChange={setQuery} 
            onSelect={handleSelect}
          >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input {...getInputProps(
                    {
                      className: "app__search-bar",
                      placeholder: "Type ",
                    })} />

                  <div>
                    {loading ? <div>...Loading</div> : null}

                    {suggestions.map((suggestion) => {
                      console.log(suggestion, suggestions)
                      return (
                        <div className='app__search-list' {...getSuggestionItemProps(suggestion)} key={suggestion.placeId}>
                          {suggestion.description}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            }
          </PlacesAutocomplete>
        </div>
        {(typeof weather.main !== "undefined") ? (
          <>
            <div className="app__location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="app__weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}℃
              </div>
              <div className="weather">
                  {weather.weather[0].main}
              </div>
            </div>
          </>
        ) : (
          <div className="app__find-page">
            <p>&#9757;</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
