import Link from "next/link";
import { useState } from "react";
import { navVariants } from "@/motion";
import { TextHover } from "@/animation";
import { useSeason } from "@/context/SeasonContext";
import { useLanguage } from "@/context/LanguageContext";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import MobileNav from "./MobileNav";

export default function Navbar() {
	const [hidden, setHidden] = useState(false);
	const { scrollY } = useScroll();
	const { season, toggleSeason } = useSeason();
	const { language, setLanguage, t } = useLanguage();
	const [showLangMenu, setShowLangMenu] = useState(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious();
		if (previous && latest > previous) {
			setHidden(true);
		} else {
			setHidden(false);
		}
	});

	const languages = [
		{ code: 'cs', label: 'CZ' },
		{ code: 'sk', label: 'SK' },
		{ code: 'de', label: 'DE' },
		{ code: 'en', label: 'EN' }
	];

	const navItems = [
		{ id: 1, title: t('nav.about'), href: '#about' },
		{ id: 2, title: t('nav.gallery'), href: '#gallery' },
		{ id: 3, title: t('nav.equipment'), href: '#equipment' },
		{ id: 4, title: t('nav.prices'), href: '#prices' },
		{ id: 5, title: t('nav.activities'), href: '#activities' }
	];

	return (
		<>
			<motion.nav
				variants={navVariants}
				className="w-full h-[8vh] padding-x fixed top-0 left-0 z-50 backdrop-blur-[7px] flex items-center justify-between sm:hidden xm:hidden md:hidden"
				animate={hidden ? "hidden" : "vissible"}>
				<div className="w-[30%]">
					<Link href={"/"} className="text-xl font-FoundersGrotesk font-semibold">
						<span className="text-white">Vila Adalbert</span>
					</Link>
				</div>
				<div className="flex gap-x-[20px] w-[70%] items-center justify-end">
					{navItems.map((item) => (
						<Link
							key={item.id}
							className={`w-fit paragraph font-medium font-NeueMontreal text-white capitalize flex flex-col hover`}
							href={item.href}>
							<TextHover
								titile1={item.title}
								titile2={item.title}
							/>
						</Link>
					))}
					<div className="relative">
						<button
							onClick={() => setShowLangMenu(!showLangMenu)}
							className="px-4 py-2 rounded-full bg-white/10 text-white font-NeueMontreal text-sm hover:bg-white/20 transition-colors">
							{language.toUpperCase()}
						</button>
						{showLangMenu && (
							<div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden">
								{languages.map((lang) => (
									<button
										key={lang.code}
										onClick={() => {
											setLanguage(lang.code as any);
											setShowLangMenu(false);
										}}
										className={`block w-full px-4 py-2 text-left font-NeueMontreal text-sm hover:bg-gray-100 transition-colors ${
											language === lang.code ? 'bg-gray-100 font-semibold' : ''
										}`}>
										{lang.label}
									</button>
								))}
							</div>
						)}
					</div>
					<button
						onClick={toggleSeason}
						className="px-4 py-2 rounded-full bg-white/10 text-white font-NeueMontreal text-sm hover:bg-white/20 transition-colors">
						{t(`season.${season}`)}
					</button>
				</div>
			</motion.nav>
			<MobileNav />
		</>
	);
}
