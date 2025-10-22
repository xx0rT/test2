import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Video() {
	const container = useRef(null);

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

	return (
		<div
			className="w-full relative overflow-hidden"
			ref={container}>
			<motion.div
				className="w-full h-full"
				style={{ y }}
				data-scroll
				data-scroll-speed="-.8"
				data-scroll-section>
				<Image
					src="/image.png"
					alt="Vila Adalbert"
					width={1920}
					height={1080}
					className="w-full h-full object-cover"
					priority
				/>
			</motion.div>
		</div>
	);
}
