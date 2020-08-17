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

import "./Map.scss";

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

const Map = ({ allLibraries, getAllLibraries, panToLibrary }) => {
  // Load our map and handle errors
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = useState([...allLibraries]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({});

  //   const markerRef = useRef(null);
  const defaultCenter = {
    lat: 38.43808,
    lng: -122.711508,
  };

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
      //   console.log("useEffect", currentPosition);
    });
  }, []);
  // create onclick event to set map markers down

  const onMapClick = async (event) => {
    // console.log(event);

    // console.log("added location", location);
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
  const mapRef = useRef();
  const onMapLoad = (map) => {
    // getAllLibraries();
    // console.log("mapRef", map);
    mapRef.current = map;
  };

  // useCallback will allow me to use the setMarker function, which will retain its value and only re-render itself
  // if its dependancies are updated to a new value
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
    // console.log("selected marker", event);
    setSelectedMarker({
      lat: parseFloat(event.latLng.lat()),
      lng: parseFloat(event.latLng.lng()),
    });
  };

  // const updateDeletedMarker = () => {
  //   console.log("handle marker delete");
  //   // getAllLibraries();
  // };

  return (
    <div className="map">
      <LocationSearch panToSearch={panToSearch} />
      {/* <UserLocation panTo={panToSearch} /> */}
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
        {/* {console.log("markers", markers)} */}
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
            // label={needsLabel ? label : null}
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
