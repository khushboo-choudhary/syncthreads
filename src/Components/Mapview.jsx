import { TileLayer, MapContainer, Marker } from "react-leaflet";
import "./Map.css";
import { useLocation, useNavigate } from "react-router-dom";
export const Mapview = () => {
  
  const navigate = useNavigate();
  const Zoom = 13;
  const { lat, lon } = useLocation().state;
  const coo = {
    lat: lat,
    lon: lon,
  };

  const Token = sessionStorage.getItem("Token");

  const logout = () => {
    alert("Are you sure want to logout this page");
    sessionStorage.removeItem("Token");
    navigate("/");
  };

  if (!Token) {
    return (
      <>
        <div className="error">
          <h1>User not logged in </h1>
          <p>Create a account or login </p>
        </div>
      </>
    );
  }
  return (
    <>
      <div>
        <div className="nav">
        <h2 className="heading" onClick={() => navigate("/home")}>OpenStreetMap</h2>
          <button onClick={() => logout()}>Logout</button>
        </div>

        <MapContainer center={coo} zoom={Zoom} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}@2x.jpg?key=Hvb7CnXxkbxYLSfA1pq6"
          />
          <Marker position={coo}>{/* <Popup>Info goes here</Popup> */}</Marker>
        </MapContainer>
      </div>
    </>
  );
};