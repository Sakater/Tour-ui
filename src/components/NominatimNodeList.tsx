import {
	Backdrop,
	CircularProgress,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import type { NomatimLocation } from "../api/useGetLocations";
import { useContext } from "react";
import { LocationContext } from "../util/LocationContext";
import type { LocationContextType } from "../util/LocationContext";

type NominatimNodeListProps = {
	locations: NomatimLocation[];
	isLoading: boolean;
	onLocationClick: () => void;
};

export const NominatimNodeList = ({
	isLoading,
	locations,
	onLocationClick,
}: NominatimNodeListProps) => {
	const { addLocation } = useContext(LocationContext) as LocationContextType;

	const handleNominatimNodeClick = ({
		place_id,
		lat,
		lon,
		display_name,
	}: NomatimLocation) => {
		const numericLat = Number(lat);
		const numericLon = Number(lon);

		if (!Number.isNaN(numericLat) && !Number.isNaN(numericLon)) {
			addLocation({
				lat: numericLat,
				lon: numericLon,
				display_name,
				id: place_id,
			});
		}

		onLocationClick();
	};

	return (
		<List
			sx={{
				padding: 3,
				paddingTop: 0,
				display: "flex",
				flexDirection: "column",
				gap: 1,
				overflow: "auto",
			}}
		>
			{!isLoading && locations.length === 0 ? (
				<Typography variant="body2" fontStyle="italic">
					Keine Ergebnisse gefunden
				</Typography>
			) : undefined}
			{locations.map((location) => (
				<ListItem key={location.place_id} disablePadding>
					<ListItemButton onClick={() => handleNominatimNodeClick(location)}>
						<ListItemText>{location.display_name}</ListItemText>
					</ListItemButton>
				</ListItem>
			))}
			<Backdrop open={isLoading} color="#ffffff">
				<CircularProgress color="inherit" />
			</Backdrop>
		</List>
	);
};
