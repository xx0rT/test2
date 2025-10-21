"use client";
import Link from "next/link";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { navbarItems } from "@/constants";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { useSeason } from "@/context/SeasonContext";

export default function MobileNav() {
	const [toggle, setToggle] = useState(false);
	const { season, toggleSeason } = useSeason();
	return (
		<>
			<div className="w-full hidden justify-between items-center h-[8vh] padding-x sm:flex xm:flex md:flex">
				<Link href="/" className="text-xl font-FoundersGrotesk font-semibold text-black">
					Vila Adalbert
				</Link>
				<HiOutlineMenuAlt4
					onClick={() => setToggle(true)}
					className="text-3xl cursor-pointer text-black"
				/>
			</div>
			<AnimatePresence mode="wait">
				{toggle && (
					<motion.div
						initial={{ y: "-100%" }}
						animate={{ y: 0 }}
						exit={{ y: "-100%" }}
						transition={{ duration: 1, ease: [0.3, 0.86, 0.36, 0.95] }}
						className="fixed top-0 bottom-0 right-0 z-50 w-full min-h-screen flex justify-end items-end flex-col bg-secondry">
						<div className="w-full flex justify-between items-center h-[8vh] border-b border-[#f1f1f155] padding-x">
							<Link href="/" className="text-xl font-FoundersGrotesk font-semibold text-background">
								Vila Adalbert
							</Link>
							<IoMdClose
								onClick={() => setToggle(false)}
								className="text-3xl cursor-pointer text-background"
							/>
						</div>
						<ul className="h-full w-full flex justify-center text-left flex-col gap-[10px] padding-x">
							{navbarItems.map((item) => (
								<Link
									href={item.href}
									key={item.id}
									onClick={(toggle) => setToggle(!toggle)}
									className="text-[60px] leading-[55px] md:text-[50px] md:leading-[45px] sm:text-[40px] sm:leading-[36px] font-FoundersGrotesk uppercase font-bold tracking-[-.9] text-background">
									{item.title}
								</Link>
							))}
							<button
								onClick={() => {
									toggleSeason();
									setToggle(false);
								}}
								className="mt-8 px-6 py-3 rounded-full bg-background text-secondry font-NeueMontreal text-lg hover:bg-background/90 transition-colors w-fit">
								{season === 'winter' ? '\u2744\ufe0f Winter' : '\u2600\ufe0f Summer'}
							</button>
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
