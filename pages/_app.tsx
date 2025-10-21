import "@/styles/globals.css";
import { Footer, Navbar } from "@/components";
import { AnimatePresence } from "framer-motion";
import { SeasonProvider } from "@/context/SeasonContext";
import { LanguageProvider } from "@/context/LanguageContext";

export default function App({
	Component,
	pageProps,
	router,
}: {
	Component: any;
	pageProps: any;
	router: any;
}) {
	return (
		<LanguageProvider>
			<SeasonProvider>
				<Navbar />
				<AnimatePresence mode="wait">
					<Component
						key={router.route}
						{...pageProps}
					/>
				</AnimatePresence>
				<Footer />
			</SeasonProvider>
		</LanguageProvider>
	);
}
