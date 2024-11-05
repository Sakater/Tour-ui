import { useContext, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { LocationContext } from "../util/LocationContext";
import type { LocationContextType } from "../util/LocationContext";
import { LocationMapPolyline } from "./LocationMapPolyline";

const LocationMarkers = () => {
	const { locations } = useContext(LocationContext) as LocationContextType;

	const map = useMap();

	useEffect(() => {
		if (locations.length !== 0) {
			map.fitBounds(
				locations.map(({ lat, lon }) => [lat, lon]),
				{ padding: [0.5, 0.5] },
			);
		}
	}, [locations, map]);

	return (
		<>
			{locations.map(
				(location) =>
					location.lat !== 0 && (
						<Marker key={location.id} position={[location.lat, location.lon]}>
							<Popup>{location.display_name}</Popup>
						</Marker>
					),
			)}
		</>
	);
};

export const LocationMap = () => {
	return (
		<MapContainer
			zoomAnimation={true}
			center={[52.510942, 13.39904]}
			zoom={10}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<LocationMarkers />
			<LocationMapPolyline />
		</MapContainer>
	);
};
