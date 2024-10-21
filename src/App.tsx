import React, {ChangeEvent, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {Location} from "./Types";
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {DeleteForever} from "@mui/icons-material";
import {Results} from "./Results";


export const App = () => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const [data, setData] = useState([]);

    const initLocations = {
        locations: [
            {
                name: '',
                lat: 0,
                lon: 0
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
    const searchForLocation = async (name: string, index: number) => {
        return axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=` + name)
            .then(response => {
                setData(() => {
                    return response.data
                });
            })
            .catch(error => {
                console.error(error);
            });
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

    const choose = (location, index) => {
        setLocations(prevData => {
            return prevData.map((prevLocation, mapIndex) => {
                if (mapIndex === index) {
                    return {
                        ...prevLocation,
                        name: location.display_name,
                        lat: location.lat,
                        lon: location.lon
                    }
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
                                <input type="text" name={"Standort-" + (index + 1)} value={location.name}
                                       onChange={(e) => handleChange(e, index)}
                                       onKeyDown={(e) => {
                                           if (e.key === "Enter") {
                                               e.preventDefault()
                                               searchForLocation(location.name, index)
                                               handleModalOpen()
                                           }
                                       }}
                                />
                                <Modal
                                    open={modalOpen}
                                    onClose={handleModalClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box className={"modal"}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Gefundene Standorte
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                                            {data.map((location: any) => (
                                                <div className={"modalStandorte dataList"}>
                                                    <p className={"dataList"} onClick={() => {
                                                        if (data.length > 0) {
                                                            choose(location, index)
                                                        }
                                                    }}>{location.display_name}</p>
                                                </div>
                                            ))}
                                        </Typography>
                                    </Box>
                                </Modal>
                                {/*<FlyToButton coordinates={[location.lat, location.lon]} zoom={16}/>*/}
                                <DeleteForever onClick={() => deleteLocation(index)}/>
                            </label>

                        ))}
                    </div>
                    <button type={"button"} onClick={addLocation}>Add Location</button>
                    {/*<input type="submit" value="Submit"/>*/}

                </form>
                <Results locations={locations}/>
            </div>
            <div className={"grid-item"} style={{padding: "2%"}}>
                <MapContainer style={{height: "100%", width: "100%"}}
                              zoomAnimation={true} center={[52.510942, 13.399040]}
                              zoom={15} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locations.map((location, index) => (
                        location.lat !== 0 &&
                        <Marker key={index} position={[location.lat, location.lon]}>
                            <Popup>
                                {location.name}
                            </Popup>
                        </Marker>))}

                </MapContainer>
            </div>
        </div>);
};
