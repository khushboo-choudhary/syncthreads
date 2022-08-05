import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";


const position = [51.505, -0.09];

function ResetCenterView(props) {

    const { selectPosition } = props;
    const map = useMap();

    useEffect(() => {
        if (selectPosition) {
            map.setView(
                L.latLng(selectPosition?.lat, selectPosition?.lon),
                map.getZoom(),
                {
                    animate: true
                }
            )
        }
    }, [map, selectPosition]);

    return null;
}

function LocationMarker() {
    const [position, setPosition] = useState(null)
    
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
export default function Maps(props) {

    const { selectPosition } = props;
    const locationSelection = [selectPosition?.lat, selectPosition?.lon];

    console.log("location name", selectPosition)
    return (

        <MapContainer
            center={position}
            zoom={8}
            style={{ width: "100%", height: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=FaGDTEesebNtVUL1fuo3"
            />
            {selectPosition && (
                <Marker position={locationSelection}>
                    <Popup>

                        <p><b>City:</b> {selectPosition.address.city}</p>
                        <p><b>Country:</b> {selectPosition.address.country}</p>
                        <p><b>Country Code:</b> {selectPosition.address.country_code}</p>
                        <p><b>State:</b> {selectPosition.address.state}</p>
                        <p><b>Display Name:</b> {selectPosition.display_name}</p>
                        <p><b>Type:</b> {selectPosition.type}</p>

                    </Popup>
                </Marker>
            )}
            <ResetCenterView selectPosition={selectPosition} />
            <LocationMarker />
        </MapContainer>

    );
}