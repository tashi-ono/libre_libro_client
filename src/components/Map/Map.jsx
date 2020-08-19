import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import apiUrl from "../../apiConfig";
import axios from "axios";
import LocationSearch from "../LocationSearch/LocationSearch";
import PopUpDetails from "../PopUpDetails/PopUpDetails";

// These are libraries that come with GoogleMap package
const libraries = ["places"];

// Must set map container, otherwise we won't see it
const mapContainerStyle = {
  width: "100vw",
  height: "60vh",
};

// Options can be found on Google Map API Docs
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const defaultCenter = {
  lat: 38.43808,
  lng: -122.711508,
};

const Map = ({ allLibraries, getAllLibraries, panToLibrary }) => {
  // Load our map and handle errors
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = useState([...allLibraries]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({});

  // useEffect sets current location to user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const currentPosition = {
        lat: latitude,
        lng: longitude,
      };
      setCurrentPosition(currentPosition);
    });
  }, []);
  // create onclick event to set map markers down

  const onMapClick = async (event) => {
    try {
      await axios.post(`${apiUrl}/libraries`, {
        lat: parseFloat(event.latLng.lat()),
        lng: parseFloat(event.latLng.lng()),
      });
      getAllLibraries();
    } catch (err) {
      console.error(err);
    }

    setMarkers((currentMarkers) => [
      ...currentMarkers,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        id: event.id,
      },
    ]);
  };

  // Ref retains map instance without causing re-renders and resetting the map position
  // useCallback will allow me to create a map instance, which will retain its value and only re-render itself
  // if its dependancies are updated to a new value
  const mapRef = useRef();
  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  const panToSearch = ({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  };

  if (panToLibrary) {
    panToSearch(panToLibrary);
  }
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  // This allows you to get the location of a marker that you've added
  const handleMarkerClick = (event) => {
    setSelectedMarker({
      lat: parseFloat(event.latLng.lat()),
      lng: parseFloat(event.latLng.lng()),
    });
  };

  return (
    <div className="map">
      <LocationSearch panToSearch={panToSearch} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        draggable={true}
        // set default position to user's location if location services allowed
        center={currentPosition.lat ? currentPosition : defaultCenter}
        zoom={14}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
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

        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(marker.lat),
              lng: parseFloat(marker.lng),
            }}
            draggable={true}
            clickable={true}
            icon={{
              url:
                "https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597258764/LibreLibro%20Assets/birdhouse_fbdbw6.png",
              // This sizes our icon to 30x30px
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            // Clicking on marker will allow the info window to pop up in ternary
            onClick={handleMarkerClick}
          />
        ))}
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
