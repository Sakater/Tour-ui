import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type NomatimLocation = {
	addresstype: string;
	boundingbox: string[];
	class: string;
	display_name: string;
	importance: number;
	lat: string;
	licence: string;
	lon: string;
	name: string;
	place_id: number;
	place_rank: number;
	type: string;
};

type UseGetLocationsParams = {
	search: string;
	excludePlaceIds: Array<NomatimLocation["place_id"]>;
	enabled: boolean;
};

export const useGetLocations = ({
	search,
	enabled,
	excludePlaceIds,
}: UseGetLocationsParams) => {
	const searchParams = new URLSearchParams([
		["format", "json"],
		["q", search],
		...excludePlaceIds.map((excludePlaceId) => [
			"exclude_place_ids",
			excludePlaceId.toString(),
		]),
	]);

	const url = `https://nominatim.openstreetmap.org/search?${searchParams.toString()}`;

	return useQuery({
		queryKey: ["locations"],
		queryFn: async (): Promise<NomatimLocation[]> => {
			try {
				const response = await axios.get<NomatimLocation[]>(url);
				const data = await response.data;
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
