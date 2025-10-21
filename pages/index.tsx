"use client";
import { useEffect } from "react";
import { Curve } from "@/components";
import { HeroVila, AboutVila, GalleryVila, EquipmentVila, ActivitiesVila, PossibilitiesVila, PricesVila } from "@/container/vila-page";

export default function Home() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);

	return (
		<>
			<Curve backgroundColor={"#f1f1f1"}>
				<HeroVila />
				<AboutVila />
				<GalleryVila />
				<EquipmentVila />
				<PossibilitiesVila />
				<ActivitiesVila />
				<PricesVila />
			</Curve>
		</>
	);
}
