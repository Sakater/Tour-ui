import { Box, CircularProgress, Modal } from "@mui/material";
import type { ModalProps } from "@mui/material";
import { useGetLocations } from "../api/useGetLocations";

type LocationsModalProps = {
	searchString: string;
} & Pick<ModalProps, "open" | "onClose">;

export const LocationsModal = ({
	searchString,
	...modalProps
}: LocationsModalProps) => {
	const queryData = useGetLocations(searchString);
	console.log(queryData);

	const getModalContent = () => {
		if (queryData.isLoading) {
			return (
				<Box
					width="100%"
					height="250"
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<CircularProgress color="inherit" />
				</Box>
			);
		}

		if ("data" in queryData) {
			return <span>Hey</span>;
		}

		return <span>An error occurred :(</span>;
	};

	return (
		<Modal {...modalProps}>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 400,
					bgcolor: "background.paper",
					border: "2px solid #000",
					boxShadow: 24,
					p: 4,
				}}
			>
				{getModalContent()}
			</Box>
		</Modal>
	);
};
