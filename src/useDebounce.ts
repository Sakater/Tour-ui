import { useEffect, useState } from "react";

type UseDebounceProps<InputType> = {
	value: InputType;
	delay?: number;
};

export const useDebounce = <InputType>({
	value,
	delay = 600,
}: UseDebounceProps<InputType>) => {
	const [debouncedValue, setDebouncedValue] = useState<InputType>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return { debouncedValue };
};
