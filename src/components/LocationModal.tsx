import { Close } from "@mui/icons-material";
import {
	Box,
	IconButton,
	Modal,
	Typography,
	type ModalProps,
} from "@mui/material";
import { SearchInput } from "./SearchInput";
import { useContext, useEffect, useState } from "react";
import { useDebounce } from "../util/useDebounce";
import { useGetLocations } from "../api/useGetLocations";
import { NominatimNodeList } from "./NominatimNodeList";
import { LocationContext } from "../util/LocationContext";
import type { LocationContextType } from "../util/LocationContext";

type LocationModalProps = Pick<ModalProps, "open"> & {
	onClose: () => void;
};

export const LocationModal = ({ onClose, open }: LocationModalProps) => {
	const [searchValue, setSearchValue] = useState("");

	const handleSearchValueChange = (newSearchValue: string) => {
		setSearchValue(newSearchValue);
	};

	const handleModalClose = () => {
		setSearchValue("");
		onClose();
	};

	const { locations } = useContext(LocationContext) as LocationContextType;

	const { debouncedValue } = useDebounce({ value: searchValue });

	const {
		isFetching,
		data: foundNominatimLocations = [],
		refetch,
	} = useGetLocations({
		search: searchValue,
		enabled: false,
		excludePlaceIds: locations.map(({ id }) => id),
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies(debouncedValue): need to execute on debouncedValue change
	useEffect(() => {
		refetch();
	}, [debouncedValue, refetch]);

	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					position: "absolute",
					top: "25%",
					left: "50%",
					transform: "translate(-50%, -25%)",
					bgcolor: "background.paper",
					boxShadow: 24,
					width: "60%",
					maxHeight: "80%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: "32px",
						padding: 1,
						borderBottom: "1px solid lightgray",
					}}
				>
					<Typography variant="h6">Knoten hinzufügen</Typography>
					<IconButton aria-label="Modal schließen" onClick={onClose}>
						<Close />
					</IconButton>
				</Box>

				<Box sx={{ padding: 3 }}>
					<SearchInput
						searchValue={searchValue}
						onSearchValueChange={handleSearchValueChange}
						loading={isFetching}
					/>
				</Box>

				<NominatimNodeList
					locations={foundNominatimLocations}
					isLoading={isFetching}
					onLocationClick={handleModalClose}
				/>
			</Box>
		</Modal>
	);
};
