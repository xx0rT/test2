import { Eyes } from "@/components";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
	const { t } = useLanguage();

	return (
		<section className="w-full padding-x bg-about sticky top-0 min-h-[65vh]">
			<div className="w-full pt-[170px] pb-[40px]">
				<div className="w-full max-w-[1200px] mx-auto">
					<div className="w-fit relative mb-[30px]">
						<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
							{t.gallery.title}
						</h1>
					</div>
					<div className="w-full max-w-[800px]">
						<p className="sub-heading font-normal font-NeueMontreal text-secondry leading-relaxed">
							{t.gallery.subtitle}
						</p>
					</div>
				</div>
			</div>
			<Eyes className="w-[300px] h-[300px] md:w-[200px] md:h-[200px] sm:w-[150px] sm:h-[150px] xm:w-[150px] xm:h-[150px] sm:flex-col xm:flex-col" />
		</section>
	);
}
