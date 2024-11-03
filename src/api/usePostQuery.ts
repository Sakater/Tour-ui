import axios from "axios";
import { useEffect, useState } from "react";

type UsePostQueryParameters = Parameters<(typeof axios)["post"]>;

type UsePostQueryReturn<DataType, ErrorType = Error> =
	| {
			isLoading: true;
	  }
	| {
			isLoading: false;
			data: DataType;
			success: true;
	  }
	| {
			isLoading: false;
			success: false;
			error: ErrorType;
	  };

export const usePostQuery = <DataType, ErrorType = Error>(
	...args: UsePostQueryParameters
): UsePostQueryReturn<DataType, ErrorType> => {
	const [data, setData] = useState<DataType | null>(null);
	const [error, setError] = useState<ErrorType | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data: response } = await axios.post<DataType>(...args);
				setData(response);
			} catch (error) {
				console.error(
					`an error occurred during call of following url: ${args[0]}`,
				);
				setError(error as ErrorType);
			}
		};

		fetchData();
	}, [args]);

	if (error) {
		return {
			isLoading: false,
			error,
			success: false,
		};
	}

	if (data) {
		return {
			isLoading: false,
			data,
			success: true,
		};
	}

	return {
		isLoading: true,
	};
};
