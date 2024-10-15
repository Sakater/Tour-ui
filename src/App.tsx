import {useEffect, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {gridLayer} from "leaflet";

export const App = () => {
    return (
        <div className={"grid-container"}>
            <div className={"grid-item"}>ff</div>
            <div className={"grid-item"} style={{padding: "2%"}}>
                <MapContainer style={{height: "100%", width: "100%"}}
                              zoomAnimation={true} center={[52.510942, 13.399040]}
                              zoom={15} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[52.510942, 13.399040]}>
                        <Popup>
                            A pretty CSS3 popup. <br/> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>);
};
