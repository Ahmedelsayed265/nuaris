import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import pin from "../assets/images/icons/pin.svg";
import mapPin from "../assets/images/icons/mapPin.svg";

export default function MapCard({ title, location, lat, lng }) {
  const position = {
    lat: Number(lat) || 24.7136,
    lng: Number(lng || 46.6753)
  };

  return (
    <div className="map-card">
      <div className="content">
        <img src={pin} alt="pin icon" />
        <div className="text">
          <span>{title}</span>
          <p>{location}</p>
        </div>
      </div>
      <div className="map">
        {
          <LoadScript googleMapsApiKey="AIzaSyD_N1k4WKCdiZqCIjjgO0aaKz1Y19JqYqw">
            <GoogleMap
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                disableDefaultUI: true,
                clickableIcons: false
              }}
              zoom={8}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={position}
            >
              <Marker icon={mapPin} position={position}></Marker>
            </GoogleMap>
          </LoadScript>
        }
      </div>
    </div>
  );
}
