"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { logo, mobileLogo } from "@/public";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MobileNav() {
	const [toggle, setToggle] = useState(false);
	const [langOpen, setLangOpen] = useState(false);
	const { language, setLanguage, t } = useLanguage();

	const languages = [
		{ code: 'cs' as const, label: 'Čeština', display: 'CS' },
		{ code: 'en' as const, label: 'English', display: 'EN' },
		{ code: 'de' as const, label: 'Deutsch', display: 'DE' },
		{ code: 'sk' as const, label: 'Slovenčina', display: 'SK' }
	];

	const currentLangObj = languages.find(l => l.code === language);

	const navItems = [
		{ id: 1, title: t.nav.home, href: "/" },
		{ id: 2, title: t.nav.equipment, href: "/services" },
		{ id: 3, title: t.nav.gallery, href: "/presentation" },
		{ id: 4, title: t.nav.pricing, href: "/pricing" },
		{ id: 5, title: t.nav.activities, href: "/insights" },
		{ id: 6, title: t.nav.contact, href: "/contact" }
	];
	return (
		<>
			<div className="w-full hidden justify-between items-center h-[8vh] padding-x sm:flex xm:flex md:flex">
				<Link href={"/"}>
					<Image
						src={logo}
						alt="ochi logo"
						width={70}
						height={70}
					/>
				</Link>
				<div className="flex items-center gap-4">
					<div className="relative">
						<button
							onClick={() => setLangOpen(!langOpen)}
							className="flex items-center gap-1 text-sm font-medium font-NeueMontreal text-secondry">
							{currentLangObj?.display}
							<ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
						</button>
						{langOpen && (
							<div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[120px] z-50">
								{languages.map((lang) => (
									<button
										key={lang.code}
										onClick={() => {
											setLanguage(lang.code);
											setLangOpen(false);
										}}
										className={`w-full text-left px-3 py-2 text-sm font-NeueMontreal hover:bg-gray-100 transition-colors ${
											language === lang.code ? 'bg-gray-50 font-medium' : ''
										}`}>
										{lang.label}
									</button>
								))}
							</div>
						)}
					</div>
					<HiOutlineMenuAlt4
						onClick={() => setToggle(true)}
						className="text-3xl cursor-pointer text-black"
					/>
				</div>
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
							<Link href={"/"}>
								<Image
									src={mobileLogo}
									alt="ochi logo"
									width={70}
									height={70}
								/>
							</Link>
							<IoMdClose
								onClick={() => setToggle(false)}
								className="text-3xl cursor-pointer text-background"
							/>
						</div>
						<ul className="h-full w-full flex justify-center text-left flex-col gap-[10px] padding-x">
							{navItems.map((item) => (
								<Link
									href={item.href}
									key={item.id}
									onClick={() => setToggle(false)}
									className="text-[80px] leading-[67px] font-FoundersGrotesk uppercase font-bold tracking-[-.9] text-background">
									{item.title}
								</Link>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
