import { createContext, useState } from "react";
import type { PropsWithChildren } from "react";

export type Location = {
	id: number;
	lat: number;
	lon: number;
	display_name: string;
};

export type LocationContextType = {
	locations: Array<Location>;
	addLocation: (newLocation: Location) => void;
	removeLocation: (locationToRemove: Location) => void;
};

export const LocationContext = createContext<LocationContextType | null>(null);

export const LocationProvider = ({ children }: PropsWithChildren) => {
	const [locations, setLocations] = useState<Array<Location>>([]);

	const addLocation: LocationContextType["addLocation"] = (newLocation) => {
		setLocations((currentLocations) => [...currentLocations, newLocation]);
	};

	const removeLocation: LocationContextType["removeLocation"] = (
		locationToRemove,
	) => {
		setLocations((currentLocations) =>
			currentLocations.filter(
				(currentLocation) => currentLocation !== locationToRemove,
			),
		);
	};

	return (
		<LocationContext.Provider
			value={{ locations, addLocation, removeLocation }}
		>
			{children}
		</LocationContext.Provider>
	);
};
