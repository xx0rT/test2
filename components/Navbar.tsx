import Link from "next/link";
import Image from "next/image";
import { logo } from "@/public";
import { useState } from "react";
import { navVariants } from "@/motion";
import { TextHover } from "@/animation";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import MobileNav from "./MobileNav";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
	const [hidden, setHidden] = useState(false);
	const [langOpen, setLangOpen] = useState(false);
	const { scrollY } = useScroll();
	const { language, setLanguage, t } = useLanguage();

	const languages = [
		{ code: 'cs' as const, label: 'Čeština', display: 'CS' },
		{ code: 'en' as const, label: 'English', display: 'EN' },
		{ code: 'de' as const, label: 'Deutsch', display: 'DE' },
		{ code: 'sk' as const, label: 'Slovenčina', display: 'SK' }
	];

	const navItems = [
		{ id: 1, title: t.nav.home, href: "/" },
		{ id: 2, title: t.nav.equipment, href: "/services" },
		{ id: 3, title: t.nav.gallery, href: "/presentation" },
		{ id: 4, title: t.nav.pricing, href: "/pricing" },
		{ id: 5, title: t.nav.activities, href: "/insights" },
		{ id: 6, title: t.nav.contact, href: "/contact" }
	];

	const currentLangObj = languages.find(l => l.code === language);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious();
		if (previous && latest > previous) {
			setHidden(true);
		} else {
			setHidden(false);
		}
	});

	return (
		<>
			<motion.nav
				variants={navVariants}
				className="w-full h-[8vh] padding-x fixed top-0 left-0 z-50 backdrop-blur-[7px] flex items-center justify-between sm:hidden xm:hidden md:hidden"
				animate={hidden ? "hidden" : "vissible"}>
				<div className="w-[50%]">
					<Link href={"/"}>
						<Image
							src={logo}
							alt="Vila Adalbert logo"
							width={70}
							height={70}
						/>
					</Link>
				</div>
				<div className="flex gap-x-[20px] w-[50%] items-center">
					{navItems.map((item) => (
						<Link
							key={item.id}
							className={`w-fit paragraph font-medium font-NeueMontreal text-secondry capitalize flex flex-col hover ${
								item.id === 5 && "ml-auto"
							}`}
							href={item.href}>
							<TextHover
								titile1={item.title}
								titile2={item.title}
							/>
						</Link>
					))}
					<div className="relative ml-4">
						<button
							onClick={() => setLangOpen(!langOpen)}
							className="flex items-center gap-1 paragraph font-medium font-NeueMontreal text-secondry hover:text-black transition-colors">
							{currentLangObj?.display}
							<ChevronDown size={16} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
						</button>
						{langOpen && (
							<div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[140px] z-50">
								{languages.map((lang) => (
									<button
										key={lang.code}
										onClick={() => {
											setLanguage(lang.code);
											setLangOpen(false);
										}}
										className={`w-full text-left px-4 py-2 text-sm font-NeueMontreal hover:bg-gray-100 transition-colors ${
											language === lang.code ? 'bg-gray-50 font-medium' : ''
										}`}>
										{lang.label}
									</button>
								))}
							</div>
						)}
					</div>
				</div>
			</motion.nav>
			<MobileNav />
		</>
	);
}
