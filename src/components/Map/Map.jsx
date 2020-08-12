import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./Map.scss";

// These are libraries that come with GoogleMap package
const libraries = ["places"];

// Must set map container, otherwise we won't see it
const mapContainerStyle = {
  width: "50vw",
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

const Map = () => {
  const [markers, setMarkers] = useState([]);
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
        // create onclick event to set map markers down
        onClick={(event) => {
          console.log(event);
          setMarkers((currentMarkers) => [
            ...currentMarkers,
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              placeId: event.placeId,
            },
          ]);
          console.log(markers);
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.placeId}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url:
                "https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597258764/LibreLibro%20Assets/birdhouse_fbdbw6.png",
              // This sizes our icon to 30x30px
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};
export default Map;
