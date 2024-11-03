import {
	Button,
	CircularProgress,
	Tooltip,
	Typography,
	type ButtonProps,
} from "@mui/material";

type CalculateButtonProps = {
	isLoading: boolean;
} & Pick<ButtonProps, "disabled" | "onClick">;

export const CalculateButton = ({
	disabled,
	isLoading,
	onClick,
}: CalculateButtonProps) => {
	if (disabled) {
		return (
			<Tooltip
				title="Bitte fügen Sie mindestens zwei Knoten hinzu"
				placement="bottom"
			>
				<span style={{ width: "150px" }}>
					<Button
						variant="contained"
						size="small"
						style={{ textTransform: "none", width: "150px" }}
						color="secondary"
						disabled
					>
						<Typography variant="body2" component="span">
							Routen berechnen
						</Typography>
					</Button>
				</span>
			</Tooltip>
		);
	}

	return (
		<Button
			variant="contained"
			size="small"
			style={{ textTransform: "none", width: "150px" }}
			color="secondary"
			onClick={onClick}
			{...(isLoading
				? {
						disabled: true,
						startIcon: <CircularProgress size="small" />,
					}
				: {})}
		>
			<Typography variant="body2" component="span">
				Routen berechnen
			</Typography>
		</Button>
	);
};
