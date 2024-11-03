import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Location } from "../util/LocationContext";
import nodes from "../../nodes.json";

type UsePostNodesParameters = {
	locations: Location[];
	enabled: boolean;
};

type Edge = {
	distance: number;
	originNode: Location;
	targetNode: Location;
	time: number;
};

export type Node = {
	distances: Array<Array<Edge>>;
	routes: number[][];
};

export const usePostNodes = ({
	locations,
	enabled,
}: UsePostNodesParameters) => {
	const url = "http://127.0.0.1:8000/nodes";

	return useQuery({
		queryKey: ["nodes"],
		queryFn: async () => {
			try {
				const { data } = await axios.post<Node>(url, locations);
				return data;
			} catch (error) {
				throw new Error(
					`An error occurred during call of following url: ${url}`,
				);
			}

			/*
			 * use this as mock, when local backend is not available	
			return new Promise<Node>((resolver) =>
				setTimeout(() => resolver(nodes as Node), 1000),
			);*/
		},
		enabled,
	});
};
