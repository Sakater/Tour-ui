import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { LocationContext } from "./LocationContext";
import type { LocationContextType } from "./LocationContext";

export const LocationList = () => {
	const { locations } = useContext(LocationContext) as LocationContextType;

	const getLocationListContent = () => {
		if (locations.length === 0) {
			return (
				<Typography variant="body2">
					Es sind noch keine Knoten vorhanden. Bitte fügen Sie welche hinzu
				</Typography>
			);
		}
	};

	return (
		<Box
			sx={{
				width: "100%",
				padding: "8px",
				backgroundColor: "rgb(236, 237, 245)",
			}}
		>
			{getLocationListContent()}
		</Box>
	);
};
