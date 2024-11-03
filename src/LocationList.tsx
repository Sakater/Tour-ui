import {
	Box,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import { useContext } from "react";
import { LocationContext } from "./LocationContext";
import type { LocationContextType } from "./LocationContext";
import { Delete } from "@mui/icons-material";

export const LocationList = () => {
	const { locations, removeLocation } = useContext(
		LocationContext,
	) as LocationContextType;

	const getLocationListContent = () => {
		if (locations.length === 0) {
			return (
				<Typography variant="body2">
					Es sind noch keine Knoten vorhanden. Bitte fügen Sie welche hinzu
				</Typography>
			);
		}

		return (
			<List
				sx={{
					padding: 0.5,
					paddingTop: 0,
					paddingBottom: 0,
					display: "flex",
					flexDirection: "column",
					gap: 1,
					overflow: "auto",
					maxHeight: "450px",
				}}
			>
				{locations.map((location) => (
					<ListItem
						key={location.id}
						disablePadding
						sx={{
							backgroundColor: "#FFFFFF",
							padding: 1,
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							gap: 2,
						}}
					>
						<ListItemText>{location.display_name}</ListItemText>
						<IconButton size="small" onClick={() => removeLocation(location)}>
							<Delete />
						</IconButton>
					</ListItem>
				))}
			</List>
		);
	};

	return (
		<Box
			sx={{
				padding: "8px",
				backgroundColor: "rgb(236, 237, 245)",
			}}
		>
			{getLocationListContent()}
		</Box>
	);
};
