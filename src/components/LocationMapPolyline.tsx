import { useContext } from "react";
import { NodeContext, type NodeContextType } from "../util/NodeContext";
import {
	LocationContext,
	type LocationContextType,
} from "../util/LocationContext";
import { usePostRoutes } from "../api/usePostRoutes";
import { Polyline } from "react-leaflet";
import { decodeValhallaShape } from "../util/decodeValhallaShape";

const decodeShape = (encodedShape: string) => {
	return decodeValhallaShape(encodedShape);
};

const getRouteFromValhallaResponse = (
	valhallaResponse: ReturnType<typeof usePostRoutes>["data"],
) => {
	if (!valhallaResponse) {
		return undefined;
	}

	const decodedShapes = valhallaResponse.trip.legs.flatMap((leg) =>
		decodeShape(leg.shape),
	);

	return decodedShapes.map((leg) => ({
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

	return <Polyline color="blue" positions={route} />;
};
