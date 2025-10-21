import Link from "next/link";
import Image from "next/image";
import { logo } from "@/public";
import { useState } from "react";
import { navVariants } from "@/motion";
import { TextHover } from "@/animation";
import { navbarItems } from "@/constants";
import { useSeason } from "@/context/SeasonContext";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import MobileNav from "./MobileNav";

export default function Navbar() {
	const [hidden, setHidden] = useState(false);
	const { scrollY } = useScroll();
	const { season, toggleSeason } = useSeason();

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
					<Link href={"/"} className="text-xl font-FoundersGrotesk font-semibold">
						<span className="text-white">Vila Adalbert</span>
					</Link>
				</div>
				<div className="flex gap-x-[20px] w-[50%] items-center">
					{navbarItems.map((item) => (
						<Link
							key={item.id}
							className={`w-fit paragraph font-medium font-NeueMontreal text-secondry capitalize flex flex-col hover`}
							href={item.href}>
							<TextHover
								titile1={item.title}
								titile2={item.title}
							/>
						</Link>
					))}
					<button
						onClick={toggleSeason}
						className="ml-auto px-4 py-2 rounded-full bg-white/10 text-white font-NeueMontreal text-sm hover:bg-white/20 transition-colors">
						{season === 'winter' ? '❄️ Winter' : '☀️ Summer'}
					</button>
				</div>
			</motion.nav>
			<MobileNav />
		</>
	);
}
