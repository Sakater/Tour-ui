import {ChangeEvent, useEffect, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {gridLayer} from "leaflet";
import {Location} from "./Types";


export const App = () => {
    const initLocations = {
        locations: [
            {
                name: 'Standort-1',
                lat: 52.510942,
                lon: 13.399040
            }
        ]
    }
    const [locations, setLocations] = useState<Location[]>(initLocations.locations)

    function addLocation() {
        const newLocation: Location = {
            name: '',
            lat: 0,
            lon: 0,
        };

        setLocations(prevData => [
            ...prevData, newLocation
        ]);
    }

    const deleteLocation = (index) => {
        setLocations(prevData => {
            return prevData.filter((_, mapIndex) => mapIndex !== index)
        })
    }

    function handleChange({target: {name, value}}: ChangeEvent<HTMLInputElement>, index: number) {
        setLocations(prevData => {
            return prevData.map((prevLocation, mapIndex) => {
                if (mapIndex === index) {
                    return {
                        ...prevLocation,
                        name: value
                    }
                }
                return prevLocation
            })
        })
    }


    return (
        <div className={"grid-container"}>
            <div className={"grid-item"} id={"controller"}>
                <form>
                    <div>
                        {locations.map((location, index) => (
                            <label className={"labels"}>
                                {index + 1}. Standort
                                <input type="text" name="Standort" value={location.name}
                                       onChange={(e) => handleChange(e, index)}/>
                                <button type={"button"} onClick={() => deleteLocation(index)}>Delete</button>
                            </label>

                        ))}
                    </div>
                    <button type={"button"} onClick={addLocation}>Add Location</button>
                    <input type="submit" value="Submit"/>

                </form>
            </div>
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
