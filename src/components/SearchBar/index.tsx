import React from 'react';

import PlacesAutocomplete from 'react-places-autocomplete';

import './index.scss';

interface Props {
  query: string;
  setQuery: (e: string) => void;
  handleSelect: (e: string) => void;
}

const SearchBar: React.FC<Props> = ({ query, setQuery, handleSelect }) => {
  return (
    <div className="weather__search-box">
    <PlacesAutocomplete
      value={query}
      onChange={setQuery} 
      onSelect={handleSelect}
    >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps(
              {
                className: "weather__search-bar",
                placeholder: "Find a city.",
              })} />

            <div className="autocomplete__list">
              {loading ? <div className="autocomplete__loading">...Loading</div> : null}
              {query.length > 0 ? (<ul className="weather__search-list">
                {suggestions.map((suggestion) => {
                  return (
                    <li className='weather__search-item' {...getSuggestionItemProps(suggestion)} key={suggestion.placeId}>
                      {suggestion.description}
                    </li>
                  )
                })}
              </ul>) : (
                ''
              )}
            </div>
          </div>
        )
      }
    </PlacesAutocomplete>
  </div>
  );
};

export default SearchBar;