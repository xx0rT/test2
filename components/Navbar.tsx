import Link from "next/link";
import Image from "next/image";
import { logo } from "@/public";
import { useState } from "react";
import { navVariants } from "@/motion";
import { TextHover } from "@/animation";
import { navbarItems } from "@/constants";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import MobileNav from "./MobileNav";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
	const [hidden, setHidden] = useState(false);
	const [langOpen, setLangOpen] = useState(false);
	const [currentLang, setCurrentLang] = useState('CS');
	const { scrollY } = useScroll();

	const languages = [
		{ code: 'CS', label: 'Čeština' },
		{ code: 'EN', label: 'English' },
		{ code: 'DE', label: 'Deutsch' },
		{ code: 'SK', label: 'Slovenčina' }
	];

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
							alt="ochi logo"
							width={70}
							height={70}
						/>
					</Link>
				</div>
				<div className="flex gap-x-[20px] w-[50%] items-center">
					{navbarItems.map((item) => (
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
							{currentLang}
							<ChevronDown size={16} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
						</button>
						{langOpen && (
							<div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[140px]">
								{languages.map((lang) => (
									<button
										key={lang.code}
										onClick={() => {
											setCurrentLang(lang.code);
											setLangOpen(false);
										}}
										className={`w-full text-left px-4 py-2 text-sm font-NeueMontreal hover:bg-gray-100 transition-colors ${
											currentLang === lang.code ? 'bg-gray-50 font-medium' : ''
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
