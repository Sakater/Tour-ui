import { Close, Search } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Input, Paper } from "@mui/material";
import type { InputProps } from "@mui/material";

const inputIconStyle = { fontSize: "1.125rem" };

type SearchInputProps = {
	searchValue: string;
	onSearchValueChange: (newSearchValue: string) => void;
	loading?: boolean;
};

export const SearchInput = ({
	searchValue,
	onSearchValueChange,
	loading,
}: SearchInputProps) => {
	const handleInputChange: InputProps["onChange"] = (event) => {
		onSearchValueChange(event.target.value);
	};
	const handleClearInput = () => {
		onSearchValueChange("");
	};

	return (
		<Paper>
			<Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
				<Input
					value={searchValue}
					onChange={handleInputChange}
					disableUnderline
					sx={{ flexGrow: 1, padding: "0px 8px" }}
					placeholder="Suchen Sie nach Adressen"
				/>
				{loading ? <CircularProgress size="1rem" /> : undefined}
				{searchValue !== "" ? (
					<IconButton size="small" onClick={handleClearInput}>
						<Close style={inputIconStyle} />
					</IconButton>
				) : (
					<Search style={{ ...inputIconStyle, padding: "5px" }} />
				)}
			</Box>
		</Paper>
	);
};
