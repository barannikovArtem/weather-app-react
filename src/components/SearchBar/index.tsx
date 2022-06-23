import React from 'react';

import PlacesAutocomplete from 'react-places-autocomplete';

interface Props {
  query: string;
  setQuery: (e: string) => void;
  handleSelect: (e: string) => void;
}

const SearchBar: React.FC<Props> = ({ query, setQuery, handleSelect }) => {
  return (
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
                placeholder: "Find a city.",
              })} />

            <div>
              {loading ? <div>...Loading</div> : null}

              {suggestions.map((suggestion) => {
                return (
                  <div className='app__search-item' {...getSuggestionItemProps(suggestion)} key={suggestion.placeId}>
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
  );
};

export default SearchBar;