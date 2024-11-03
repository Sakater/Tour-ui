import React, {ChangeEvent, useState} from "react";
import {MapContainer, Marker, Polyline, Popup, TileLayer} from 'react-leaflet'
import {Location, Result} from "./Types";
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {DeleteForever} from "@mui/icons-material";
import {Results} from "./Results";
import polyline from '@mapbox/polyline';
import { LocationsModal } from "./components/LocationsModal";


export const App = () => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const [data, setData] = useState([]);
    const [locations, setLocations] = useState<Location[]>([])
    const [inputValues, setInputValues] = useState<any>([])
    const [showResults, setShowResults] = useState(false)
    const [results, setResults] = useState<Result>();
    const [routes, setRoutes] = useState<{ lat: number, lon: number }[]>([])
    const [orderedLocations, setOrderedLocations] = useState([])
    const [showPolyline, setShowPolyline] = useState(false)

    const postResults = async () => {
        setShowResults(false)
        return axios.post('http://127.0.0.1:8000/nodes', locations)
            .then(response => {
                setResults(() => {
                    return response.data
                });
            })
            .then(async () => {
                setShowResults(true)
                await fetchRoutes()
            })
            .catch(error => {
                console.error(error);
            });
    }
    const decodeShape = (encodedShape) => {
        return polyline.decode(encodedShape);
    };
    const fetchRoutes = async () => {
        if (results === undefined) {
            return
        }
        console.log("Ordered Locations:", orderedLocations); // Log orderedLocations to check its content

        if (orderedLocations.length === 0) {
            console.error("Ordered locations are empty.");
            return;
        }
        const json = JSON.stringify({
            "locations": orderedLocations,
            'costing': 'auto',
            "directions_options": {"units": "kilometers"}
        })

        return axios.post('https://valhalla1.openstreetmap.de/route?json=' + json)
            .then(response => {
                const data = response.data
                const legs = decodeShape(data.trip.legs[0].shape)
                const  routes = legs.map((leg) => {
                    return {
                        lat: leg[0],
                        lon: leg[1]
                    }
                })
                console.log(routes)
                console.log(showPolyline)
                setRoutes(() => {
                    return routes
                });
            })
            .then(() => setShowPolyline(true))
            .then(() => console.log(showPolyline))
            .catch(error => {
                console.error(error);
            });
    }
    const updateRoutes = (edge: { lat: number, lon: number }[]) => {
        setOrderedLocations(edge)
    }

    function addLocation() {
        const newLocation: Location = {
            display_name: '',
            lat: 0,
            lon: 0
        };

        setLocations(prevData => [
            ...prevData, newLocation
        ]);
        setInputValues(prevData => [
            ...prevData, ''
        ]);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        setInputValues(prevData => {
            return prevData.map((prevLocation, mapIndex) => {
                if (mapIndex === index) {
                    return e.target.value
                }
                return prevLocation
            })
        })
    }

    const deleteLocation = (index) => {
        setLocations(prevData => {
            return prevData.filter((_, mapIndex) => mapIndex !== index)
        })
        setInputValues(prevData => {
            return prevData.filter((_, mapIndex) => mapIndex !== index)
        })
    }
    const searchForLocation = async (name: string, index: number) => {
        /*return axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=` + name)
            .then(response => {
                setData(() => {
                    return response.data
                });
            })
            .catch(error => {
                console.error(error);
            });*/
    }

    const choose = (location, index) => {
        setLocations(prevData => {
            return prevData.map((prevLocation, mapIndex) => {
                if (mapIndex === index) {
                    return {
                        ...prevLocation,
                        display_name: location.display_name,
                        lat: location.lat,
                        lon: location.lon
                    }
                }
                return prevLocation
            })
        })
        setInputValues(prevData => {
            return prevData.map((prevLocation, mapIndex) => {
                if (mapIndex === index) {
                    return location.display_name
                }
                return prevLocation
            })
        })
        handleModalClose()
    }

    return (
        <div className={"grid-container"}>
            <div className={"grid-item"} id={"controller"}>
                <form>
                    <div>
                        {locations.map((location, index) => (
                            <label className={"labels"}>
                                {index + 1}. Standort
                                <input type="text" name={"Standort-" + (index + 1)} value={inputValues[index]}
                                       onChange={(e) => handleChange(e, index)}
                                       onKeyDown={(e) => {
                                           if (e.key === "Enter") {
                                               e.preventDefault()
                                               searchForLocation(e.currentTarget.value, index)
                                               handleModalOpen()
                                           }
                                       }}
                                />
                                <LocationsModal open={modalOpen} onClose={handleModalClose} searchString={inputValues[index]} />
                                {/*<FlyToButton coordinates={[location.lat, location.lon]} zoom={16}/>*/}
                                <DeleteForever onClick={() => deleteLocation(index)}/>
                            </label>

                        ))}
                    </div>
                    <button type={"button"} onClick={addLocation}>Add Location</button>
                    <button type={"button"} onClick={postResults}>Calculate</button>

                </form>
                <div>
                    {showResults && <Results results={results as Result} onUpdate={updateRoutes}/>}
                </div>
            </div>
            <div className={"grid-item"} style={{padding: "2%"}}>
                <MapContainer style={{height: "100%", width: "100%"}}
                              zoomAnimation={true} center={[52.510942, 13.399040]}
                              zoom={10} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {showPolyline && routes > 1 && <Polyline color='blue' positions={routes}/>}

                    {locations.map((location, index) => (
                        location.lat !== 0 &&
                        <Marker key={index} position={[location.lat, location.lon]}>
                            <Popup>
                                {location.display_name}
                            </Popup>
                        </Marker>))}

                </MapContainer>
            </div>
        </div>);
};
