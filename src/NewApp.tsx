import { Box } from "@mui/material";
import { LocationOverview } from "./LocationOverview";
import { LocationProvider } from "./LocationContext";
import { LocationMap } from "./LocationMap";
import { NodeProvider } from "./NodeContext";

export const App = () => {
	return (
		<LocationProvider>
			<NodeProvider>
				<Box
					sx={{
						display: "grid",
						gridAutoFlow: "column",
						gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
						height: "100%",
					}}
				>
					<LocationOverview />
					<LocationMap />
				</Box>
			</NodeProvider>
		</LocationProvider>
	);
};
