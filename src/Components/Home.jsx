import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Home.css";
import SearchBox from "./SearchBox";
import Maps from "./Map";


export const Home = () => {
  const token = sessionStorage.getItem("Token");
  const navigate = useNavigate();
  const [selectPosition, setSelectPosition] = useState(null);

  const logout = () => {
    alert("Are you sure want to logout this page");
    sessionStorage.removeItem("Token");
    navigate("/");
  };
  if (!token) {
    return (
      <div className="error">
        <h1>User not logged in</h1>
        <p>Create a account or login </p>
      </div>
    );
  }
  let Coordinates = [
    { id: 1, City: "Bangaluru", lat: 12.9716, lon: 77.5946, images: "https://imgs.search.brave.com/GmXK-5ZqVT8EVLUHSd6QWCmL4migc7qXz4x3ojVBC-w/rs:fit:844:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5P/d0o1WFRfSjk3ZDQ2/QTBUTXpDMWxBSGFF/SyZwaWQ9QXBp" },
    { id: 2, City: "Chennai", lat: 13.0827, lon: 80.2707, images: "https://image.shutterstock.com/image-photo/chennai-text-on-marina-beach-260nw-1765681589.jpg" },
    { id: 3, City: "Pune", lat: 18.5204, lon: 73.8567, images: "https://imgs.search.brave.com/Tx6Aqje_7BPGKNDoSZrUrJoyxWGDOxH__WX1oM3D3IY/rs:fit:844:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5G/WjdPOXNxZVNBSExC/bWJRSDBEak1BSGFF/SyZwaWQ9QXBp" },
    { id: 4, City: "Goa", lat: 15.2993, lon: 74.124, images: "https://i0.wp.com/onedayitinerary.com/wp-content/uploads/2019/01/One-day-in-Goa-Itinerary.jpg?resize=723%2C542" },
    { id: 5, City: "Kerala", lat: 10.8505, lon: 76.2711, images: "https://res.cloudinary.com/thrillophilia/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_center,h_230,q_auto,w_305/v1/filestore/znunwbprpwd3atb0e9pas8gswyaj_Romantic%20Getaway%20to%20Kerala%20%281%29.png" },
    { id: 6, City: "Mumbai", lat: 19.076, lon: 72.8777, images: "https://i.ytimg.com/vi/Dxkn7GtucRA/maxresdefault.jpg" },
    { id: 7, City: "Hyderabad", lat: 17.385, lon: 78.4867, images: "https://i.cdn.newsbytesapp.com/images/l17220211215130448.jpeg" },
    { id: 8, City: "Kolkata", lat: 22.5726, lon: 88.3639, images: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWMplGIENnFjltpd_zjsgdxKFBKfyvXyFzQQ&usqp=CAU" },
    { id: 9, City: "Mangalore", lat: 12.9141, lon: 74.856, images: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAq_1GMdiF3mGOXcesP1Vj33KvJlh-ewd3Rw&usqp=CAU" },
    { id: 10, City: "Delhi", lat: 28.7041, lon: 77.1025, images: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVuSdkGROG_Syi2ARoZiYXls8AT3M5u8xrxw&usqp=CAU" },

  ];
  return (
    <>
      <div>
        <div className="nav">
          <h2 className="heading" onClick={() => navigate("/home")}>OpenStreetMap</h2>
          <button className="btn" onClick={() => logout()}>
            Logout
          </button>
        </div>
        {/* searchbox */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "95vw",
            height: "90vh",
            gap: "50px",
            marginLeft: "20px",

          }}
        >
          <div style={{ width: "50vw", height: "100%" }}>
            <Maps selectPosition={selectPosition} />
          </div>
          <div style={{ width: "40vw" }}>
            <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
          </div>
        </div>

        {/* card container */}
        <h1 style={{ textAlign: "center" }}>Favourite City Map View</h1>
        <div className="container">
        
          {Coordinates.map((el) => (
            
            <div
              key={el.id}
              onClick={() =>
                navigate("/mapview/parameter", {
                  state: { lat: el.lat, lon: el.lon },
                })
              }
            >
              <img width="300px" height="200px" src={el.images} alt="" />
              <p>{el.City}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
