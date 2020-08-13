import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import "./Map.scss";

// These are libraries that come with GoogleMap package
const libraries = ["places"];

// Must set map container, otherwise we won't see it
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
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

const Map = ({ allLibraries }) => {
  console.log("alllibraries props", allLibraries);
  // Load our map and handle errors
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
        options={options}
      >
        {allLibraries.map((library) => (
          <Marker
            key={library.id}
            position={{
              lat: parseFloat(library.lat),
              lng: parseFloat(library.lng),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};
export default Map;
