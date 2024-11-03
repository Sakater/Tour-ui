import { Box, Button, Typography } from "@mui/material";
import { LocationList } from "./LocationList";
import { useState } from "react";
import { LocationModal } from "./LocationModal";

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
				<Box
					sx={{ marginTop: "8px", display: "flex", justifyContent: "center" }}
				>
					<Button
						variant="contained"
						size="small"
						style={{ textTransform: "none", width: "150px" }}
						color="secondary"
					>
						<Typography variant="body2" component="span">
							Routen berechnen
						</Typography>
					</Button>
				</Box>
			</Box>
			<LocationModal
				open={locationModalOpen}
				onClose={handleLocationModalClose}
			/>
		</>
	);
};
