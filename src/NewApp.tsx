import { Box } from "@mui/material";
import { LocationOverview } from "./LocationOverview";
import { LocationProvider } from "./LocationContext";
import { LocationMap } from "./LocationMap";

export const App = () => {
	return (
		<LocationProvider>
			<Box
				sx={{
					display: "grid",
					gridAutoFlow: "column",
					gridAutoColumns: "1fr",
					height: "100%",
				}}
			>
				<Box
					sx={{
						backgroundColor: "rgb(248, 249, 254)",
						padding: "64px",
					}}
				>
					<LocationOverview />
				</Box>
				<LocationMap />
			</Box>
		</LocationProvider>
	);
};
