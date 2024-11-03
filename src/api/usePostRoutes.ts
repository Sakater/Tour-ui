import { useQuery } from "@tanstack/react-query";
import type { Location } from "../util/LocationContext";
import axios from "axios";

type UsePostRoutesParameters = {
	enabled: boolean;
	nodes: Array<Pick<Location, "lat" | "lon">>;
};

type ValhallaLocation = {
	type: string;
	lat: number;
	lon: number;
	side_of_street?: string;
	original_index: number;
};

type ValhallaManeuver = {
	type: number;
	instruction: string;
	begin_street_names?: string[];
	street_names: string[];
	time: number;
	length: number;
	cost: number;
	begin_shape_index: number;
	end_shape_index: number;
	// NOTE: not all properties added here
};

type ValhallaSummary = {
	has_time_restrictions: boolean;
	has_toll: boolean;
	has_highway: boolean;
	has_ferry: boolean;
	min_lat: number;
	min_lon: number;
	max_lat: number;
	max_lon: number;
	time: number;
	length: number;
	cost: number;
};

type ValhallaLeg = {
	maneuvers: ValhallaManeuver[];
	summary: ValhallaSummary;
	shape: string;
};

type ValhallaResponse = {
	trip: {
		locations: ValhallaLocation[];
		legs: ValhallaLeg[];
	};
};

export const usePostRoutes = ({ nodes, enabled }: UsePostRoutesParameters) => {
	const url = "https://valhalla1.openstreetmap.de/route";

	const payload = {
		locations: nodes,
		costing: "auto",
		directions_options: { units: "kilometers" },
	};

	return useQuery({
		queryKey: ["routes"],
		queryFn: async () => {
			try {
				const { data } = await axios.post<ValhallaResponse>(url, payload);
				return data;
			} catch (error) {
				throw new Error(
					`An error occurred during call of following url: ${url}`,
				);
			}
		},
		enabled,
	});
};
