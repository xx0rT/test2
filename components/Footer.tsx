import Link from "next/link";
import Image from "next/image";
import { logo } from "@/public";
import { LinkHover } from "@/animation";
import { footerItems, footernavbarItems } from "@/constants";

export default function Footer() {
	return (
		<footer className="w-full z-30 relative bg-[#0a0a0a] text-white">
			<div className="w-full padding-x padding-y">
				<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
					<div className="lg:col-span-1">
						<Link href={"/"}>
							<Image
								src={logo}
								alt="Vila Adalbert logo"
								width={80}
								height={80}
								className="mb-6"
							/>
						</Link>
						<p className="text-sm text-white/60 leading-relaxed">
							Váš dokonalý útočiště v srdci přírody. Luxusní vila pro nezapomenutelné chvíle.
						</p>
					</div>

					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
							Navigace
						</h3>
						<ul className="space-y-3">
							{footernavbarItems.map((item) => (
								<li key={item.id}>
									<Link
										href={item.href}
										className="text-sm text-white/70 hover:text-white transition-colors duration-200">
										{item.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
							Kontakt
						</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="mailto:info@vilaadalbert.cz"
									className="text-sm text-white/70 hover:text-white transition-colors duration-200">
									info@vilaadalbert.cz
								</a>
							</li>
							<li>
								<a
									href="tel:+420123456789"
									className="text-sm text-white/70 hover:text-white transition-colors duration-200">
									+420 123 456 789
								</a>
							</li>
							<li className="pt-2">
								<p className="text-sm text-white/70">Vila Adalbert</p>
								<p className="text-sm text-white/70">Horní Lipová 123</p>
								<p className="text-sm text-white/70">788 61 Horní Lipová</p>
								<p className="text-sm text-white/70">Česká Republika</p>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
							Sledujte nás
						</h3>
						<ul className="space-y-3">
							{footerItems.map((item) => (
								<li key={item.id}>
									<a
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm text-white/70 hover:text-white transition-colors duration-200">
										{item.title}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-sm text-white/50">
						© {new Date().getFullYear()} Vila Adalbert. Všechna práva vyhrazena.
					</p>
					<div className="flex gap-6">
						<Link
							href="/privacy"
							className="text-sm text-white/50 hover:text-white transition-colors duration-200">
							Ochrana osobních údajů
						</Link>
						<Link
							href="/terms"
							className="text-sm text-white/50 hover:text-white transition-colors duration-200">
							Obchodní podmínky
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
