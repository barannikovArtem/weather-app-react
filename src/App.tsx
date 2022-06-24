import React, { useState, useEffect } from 'react';
import { request } from './api';
import classNames from 'classnames';

import SearchBar from './components/SearchBar';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [weather, setWeather] = useState<any>({});
  const [isError, setIsError] = useState<boolean>(false)

  const dateBuilder = (d: Date) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month}, ${year}`
  }

  const handleSelect = async (value: string) => {
    setQuery(value);
    const response = await request(value);
    console.log(response)
    if (response.cod !== 200) {
      setIsError(true)
      setWeather(response)
      setQuery('')
    } else {
      setWeather(response);
      setIsError(false)
      setQuery('')
    }
  }

  useEffect(() => {
  }, [isError])

  return (
      <div className={classNames(
        'app',
        {sun: typeof weather.main !== "undefined" && weather.weather[0].main === "Sun"},
        {clouds: typeof weather.main !== "undefined" && weather.weather[0].main === "Clouds"},
        {clear: typeof weather.main !== "undefined" && weather.weather[0].main === "Clear"},
        {snow: typeof weather.main !== "undefined" && weather.weather[0].main === "Snow"},
        {rain: typeof weather.main !== "undefined" && weather.weather[0].main === "Rain"},
        {dark: isError === true},
      )}>
        <div className="container">
          <main>
            <SearchBar query={query} setQuery={setQuery} handleSelect={handleSelect} />
            {(typeof weather.main !== "undefined") ? (
              <>
                <div className="app__location-box">
                  <div className="location">{weather.name}, {weather.sys.country}</div>
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
                {isError ? 'Somewhere?' : ''}
              </div>
            )}
          </main>
          <footer className='footer'>
            <div className="footer__date">{dateBuilder(new Date())}</div>
          </footer>
        </div>
      </div>
  );
}

export default App;
