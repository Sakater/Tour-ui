import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { LocationContext, type LocationContextType } from "./LocationContext";
import { usePostNodes } from "./api/usePostNodes";
import { CalculateButton } from "./CalculateButton";
import { usePostRoutes } from "./api/usePostRoutes";
import { NodeContext, type NodeContextType } from "./NodeContext";

type RowType = {
	targetDisplayName: string;
	originDisplayName: string;
	distance: number;
	index: number;
};

export const EdgesResults = () => {
	const { locations } = useContext(LocationContext) as LocationContextType;
	const { setNode } = useContext(NodeContext) as NodeContextType;
	const calculateButtonDisabled = locations.length < 2;

	const { isFetching, data, refetch } = usePostNodes({
		locations,
		enabled: false,
	});

	useEffect(() => {
		setNode(data);
	}, [data, setNode]);

	const onCalculateClick = () => {
		refetch();
	};

	const rows = !data
		? []
		: data.routes[0].reduce<RowType[]>((accumulator, currentNode, index) => {
				if (index === data.routes[0].length - 1) {
					return accumulator;
				}

				const distance = data.distances[currentNode][data.routes[0][index + 1]];
				accumulator.push({
					targetDisplayName: distance.targetNode.display_name,
					originDisplayName: distance.originNode.display_name,
					distance: distance.distance,
					index: index + 1,
				});
				return accumulator;
			}, []);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 1,
				marginTop: 3,
			}}
		>
			<CalculateButton
				onClick={onCalculateClick}
				isLoading={isFetching}
				disabled={calculateButtonDisabled}
			/>
			{data ? (
				<TableContainer component={Paper}>
					<Table aria-label="Ergebnisse der Berechnung der Entfernungen">
						<TableHead>
							<TableRow>
								<TableCell>Start (von)</TableCell>
								<TableCell>Ziel (nach)</TableCell>
								<TableCell>Entfernung</TableCell>
								<TableCell>Reihenfolge</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.index}>
									<TableCell>{row.originDisplayName}</TableCell>
									<TableCell>{row.targetDisplayName}</TableCell>
									<TableCell>{row.distance}</TableCell>
									<TableCell>{row.index}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : undefined}
		</Box>
	);
};
