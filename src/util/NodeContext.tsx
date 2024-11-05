import { createContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { Node } from "../api/usePostNodes";

export type NodeContextType = {
	node: Node | undefined;
	setNode: (newNode: Node | undefined) => void;
};

export const NodeContext = createContext<NodeContextType | null>(null);

export const NodeProvider = ({ children }: PropsWithChildren) => {
	const [node, setNode] = useState<Node | undefined>(undefined);

	return (
		<NodeContext.Provider value={{ node, setNode }}>
			{children}
		</NodeContext.Provider>
	);
};
