import React, { useState, useEffect } from 'react';
import { request } from '../../api';
import classNames from 'classnames';

import SearchBar from '../../components/SearchBar';

import './index.scss';

const WeatherPage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [weather, setWeather] = useState<any>({});
  const [isError, setIsError] = useState<boolean>(false)

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
        'weather-page',
        {sun: typeof weather.main !== "undefined" && weather.weather[0].main === "Sun"},
        {clouds: typeof weather.main !== "undefined" && weather.weather[0].main === "Clouds"},
        {clear: typeof weather.main !== "undefined" && weather.weather[0].main === "Clear"},
        {snow: typeof weather.main !== "undefined" && weather.weather[0].main === "Snow"},
        {rain: typeof weather.main !== "undefined" && weather.weather[0].main === "Rain"},
        {dark: isError === true},
      )}>
        <div className="container">
          <main className='weather-page__main'>
            <SearchBar query={query} setQuery={setQuery} handleSelect={handleSelect} />
            {(typeof weather.main !== "undefined") ? (
              <>
                <div className="weather-page__location-box">
                  <div className="location">{weather.name}, {weather.sys.country}</div>
                </div>
                <div className="weather-page__weather-box">
                  <div className="weather-page__weather-box__temp">
                    {Math.round(weather.main.temp)}℃
                  </div>
                  <div className='weather-page__weather-box__type'>
                      {weather.weather[0].main}
                  </div>
                </div>
              </>
            ) : (
              <div className="weather-page__find-page">
                {isError ? 'Somewhere?' : ''}
              </div>
            )}
          </main>
        </div>
      </div>
  );
}

export default WeatherPage;
