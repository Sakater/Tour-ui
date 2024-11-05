import { Box } from "@mui/material";
import { LocationOverview } from "./components/LocationOverview";
import { LocationProvider } from "./util/LocationContext";
import { LocationMap } from "./components/LocationMap";
import { NodeProvider } from "./util/NodeContext";

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
