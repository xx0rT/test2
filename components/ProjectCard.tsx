"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ProjectCard({ item }: { item: any }) {
	const [hovered, setHovered] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleImageClick = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	return (
		<>
			<div>
				<div className="relative w-full group">
					<div
						onClick={handleImageClick}
						className="rounded-[10px] overflow-hidden hover:scale-[0.95] transition cursor-pointer transform duration-[1s] ease-[.4,0,.2,1] block"
						onMouseEnter={() => setHovered(true)}
						onMouseLeave={() => setHovered(false)}>
						<Image
							src={item.src}
							alt={`${item.title}Img`}
							className="w-full object-cover rounded-[10px] group-hover:scale-[1.09] transform duration-[1s] ease-[.4,0,.2,1]"
						/>
					</div>
					<div
						style={{ left: item.id % 2 == 0 ? "-15%" : "90%" }}
						className="absolute w-fit flex top-[50%] sm:hidden -translate-x-[30%] -translate-y-1/2 overflow-hidden z-10 group-hover:opacity-100 opacity-0 transition duration-500 ease-[.4,0,.2,1] xm:hidden pointer-events-none">
						{item.title.split("").map((letter: any, i: any) => (
							<motion.span
								initial={{ y: "100%" }}
								animate={hovered ? { y: 0 } : { y: "100%" }}
								transition={{
									delay: i * 0.02,
									duration: 0.5,
									ease: [0.4, 0, 0.2, 1],
								}}
								className="text-[165px] leading-none inline-block uppercase font-FoundersGrotesk text-about font-bold text-center"
								key={i}>
								{letter}
							</motion.span>
						))}
					</div>
				</div>
			</div>

			<AnimatePresence>
				{isModalOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setIsModalOpen(false)}
						className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 cursor-zoom-out"
						style={{ backdropFilter: 'blur(8px)' }}>
						<button
							onClick={() => setIsModalOpen(false)}
							className="absolute top-6 right-6 text-white hover:text-gray-300 transition z-[10000]"
							aria-label="Close modal">
							<X size={40} strokeWidth={1.5} />
						</button>
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							transition={{ type: "spring", damping: 25, stiffness: 200 }}
							onClick={(e) => e.stopPropagation()}
							className="relative max-w-7xl max-h-[90vh] w-full cursor-default">
							<Image
								src={item.src}
								alt={`${item.title}Img`}
								className="w-full h-full object-contain rounded-lg"
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
