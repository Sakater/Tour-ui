import { baseURL } from "../shared/constants";
import { usePostQuery } from "./usePostQuery";

export type Location = {
	lat: number;
	lon: number;
	display_name: string;
};

type Edge = {
	distance: number;
	originNode: Location;
	targetNode: Location;
	time: number;
};

export type Node = {
	distances: Array<Array<Edge>>;
	routes: Array<Array<number>>;
};

export const usePostNodes = (locations: Location[]) =>
	usePostQuery<Node>(`${baseURL}/nodes`, locations);
