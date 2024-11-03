import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./NewApp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = createRoot(document.getElementById("root") as HTMLElement);
const queryClient = new QueryClient();
root.render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</StrictMode>,
);
