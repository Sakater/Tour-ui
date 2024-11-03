import { useContext } from "react";
import { NodeContext, type NodeContextType } from "./NodeContext";
import { LocationContext, type LocationContextType } from "./LocationContext";
import { usePostRoutes } from "./api/usePostRoutes";
import { Polyline } from "react-leaflet";
import { decodeValhallaShape } from "./util/decodeValhallaShape";

const decodeShape = (encodedShape: string) => {
	return decodeValhallaShape(encodedShape);
};

const getRouteFromValhallaResponse = (
	valhallaResponse: ReturnType<typeof usePostRoutes>["data"],
) => {
	if (!valhallaResponse) {
		return undefined;
	}

	const decodedShape = decodeShape(valhallaResponse.trip.legs[0].shape);
	return decodedShape.map((leg) => ({
		lat: leg[0],
		lng: leg[1],
	}));
};

export const LocationMapPolyline = () => {
	const { locations } = useContext(LocationContext) as LocationContextType;
	const { node } = useContext(NodeContext) as NodeContextType;

	const { data } = usePostRoutes({
		nodes: !node
			? []
			: node.routes[0].map((nodeNumber) => ({
					lat: locations[nodeNumber].lat,
					lon: locations[nodeNumber].lon,
				})),
		enabled: node !== undefined,
	});

	const route = getRouteFromValhallaResponse(data);

	if (!route) {
		return undefined;
	}

	console.log(route);

	return <Polyline color="blue" positions={route} />;
};
