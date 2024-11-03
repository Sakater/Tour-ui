import { Box, Button, Typography } from "@mui/material";
import { LocationList } from "./LocationList";
import { useState } from "react";
import { LocationModal } from "./LocationModal";
import { EdgesResults } from "./EdgesResults";

export const LocationOverview = () => {
	const [locationModalOpen, setLocationModalOpen] = useState(false);

	const handleShowLocationModal = () => setLocationModalOpen(true);
	const handleLocationModalClose = () => setLocationModalOpen(false);

	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "8px",
					backgroundColor: "rgb(248, 249, 254)",
					padding: 2,
				}}
			>
				<Typography variant="h4" mb="16px" textAlign="center">
					Knoten Liste
				</Typography>
				<Button
					variant="contained"
					size="small"
					style={{ textTransform: "none", width: "150px" }}
				>
					<Typography
						variant="body2"
						component="span"
						onClick={handleShowLocationModal}
					>
						Knoten hinzufügen
					</Typography>
				</Button>
				<LocationList />
				<EdgesResults />
			</Box>
			<LocationModal
				open={locationModalOpen}
				onClose={handleLocationModalClose}
			/>
		</>
	);
};
