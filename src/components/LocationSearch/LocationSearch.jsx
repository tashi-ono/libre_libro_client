import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "./LocationSearch.scss";
import "@reach/combobox/styles.css";

const LocationSearch = ({ panToSearch }) => {
  const {
    ready, // checks google search scripts and 'places' google library
    value, // value user types into search box
    suggestions: { status, data }, // from Google API
    setValue, // function to set user value
    clearSuggestions, // function to clear out all suggestions
  } = usePlacesAutocomplete({
    // This will prefer searches near this location
    requestOptions: {
      location: { lat: () => 38.438132, lng: () => -122.711508 },
      // radius must be in meters ( x miles * 32187 meters)
      radius: 20 * 32187,
    },
  });
  // user's selected search...will be a string that needs to be converted to lat/lng through
  // use-places-autocomplete functions
  return (
    <div className="search-box">
      <Combobox
        onSelect={async (address) => {
          // sets user input as our Google Search data
          // "false", is to NOT fetch that input from the Google Map API just yet
          setValue(address, false);
          // Once user selects an address, the list of suggestions disappear
          clearSuggestions();
          // console.log("user selected location", address);
          try {
            const res = await getGeocode({ address });
            console.log("geocode result", res[0]);
            const { lat, lng } = await getLatLng(res[0]);
            // console.log("search lat & lng", lat, lng);
            panToSearch({ lat, lng });
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          // disabled if usePlacesAutocomplete is not ready
          disabled={!ready}
          placeholder="Search"
        />
        {/* This receives Google Places suggestions */}

        <ComboboxPopover className="combobox-popover">
          {status === "OK" &&
            data.map(({ description }, index) => {
              {
                /* console.log("search data", data); */
              }
              return <ComboboxOption key={index} value={description} />;
            })}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default LocationSearch;
