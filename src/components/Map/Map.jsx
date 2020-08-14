import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import PopUpDetails from "../PopUpDetails/PopUpDetails";
import "./Map.scss";

// These are libraries that come with GoogleMap package
const libraries = ["places"];

// Must set map container, otherwise we won't see it
const mapContainerStyle = {
  width: "100vw",
  height: "60vh",
};

// This gives us a default location when we load map for the first time
const center = {
  lat: 38.438132,
  lng: -122.711508,
};

// Options can be found on Google Map API Docs
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ allLibraries, getAllLibraries }) => {
  const [markers, setMarkers] = useState([...allLibraries]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Load our map and handle errors
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  let needsLabel = allLibraries.filter((libInfo) => libInfo.name === null);
  let label;
  // Conditional statement is so that any libraries without names will have a label for info to be added
  // Label does not persist upon re-render!!!
  if (!selectedMarker && needsLabel) {
    label = {
      text: "Click to Add Info",
      fontSize: "15px",
      fontWeight: "bold",
      zIndex: "3",
    };
  }

  // let displayLibrary;
  // if (allLibraries && selectedMarker) {
  //   let foundLibrary = allLibraries.filter(
  //     (library) => parseFloat(library.lat) === parseFloat(selectedMarker.lat)
  //   );

  // When user clicks on a marker, it creates lat/lng
  // How do we tie in a click event to enter into a database?
  // Tie the onclick event to another function that does an axios.post call

  const clickAddLocation = async (location) => {
    console.log("added location", location);
    try {
      await axios.post(`http://localhost:3000/libraries`, {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      });
      getAllLibraries();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkerClick = (event) => {
    console.log("selected marker", event);
    setSelectedMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };
  // console.log("all libraries props", allLibraries);
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        options={options}
        // create onclick event to set map markers down
        onClick={(event) => {
          // console.log(event);
          clickAddLocation(event);
          setMarkers((currentMarkers) => [
            ...currentMarkers,
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              id: event.id,
            },
          ]);
          // console.log(event);
          // console.log("all markers", markers);
        }}
      >
        {/* Create markers for libraries in our database */}
        {allLibraries.map((library) => (
          <Marker
            key={library.id}
            position={{
              lat: parseFloat(library.lat),
              lng: parseFloat(library.lng),
            }}
            icon={{
              url:
                "https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597258764/LibreLibro%20Assets/birdhouse_fbdbw6.png",
              // This sizes our icon to 30x30px
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            onClick={handleMarkerClick}
          />
        ))}

        {/* Create a new marker upon clicking on map */}
        {console.log("markers", markers)}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            clickable={true}
            icon={{
              url:
                "https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597258764/LibreLibro%20Assets/birdhouse_fbdbw6.png",
              // This sizes our icon to 30x30px
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            // Clicking on marker will allow the info window to pop up in ternary
            onClick={handleMarkerClick}
            label={label}
          />
        ))}
        {/* If marker is clicked on, then show info window */}
        {selectedMarker ? (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            // When you press the x button on info window, it will reset the window so it can appear again later.
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
          >
            <div>
              <PopUpDetails
                selectedMarker={selectedMarker}
                allLibraries={allLibraries}
                getAllLibraries={getAllLibraries}
              />
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};
export default Map;
