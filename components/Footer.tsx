import Link from "next/link";
import Image from "next/image";
import { logo } from "@/public";
import { useLanguage } from "@/context/LanguageContext";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
	const { t } = useLanguage();

	const navItems = [
		{ title: t.nav.home, href: "/" },
		{ title: t.nav.equipment, href: "/services" },
		{ title: t.nav.gallery, href: "/presentation" },
		{ title: t.nav.pricing, href: "/pricing" },
		{ title: t.nav.activities, href: "/insights" },
		{ title: t.nav.contact, href: "/contact" }
	];

	return (
		<footer className="w-full z-30 relative bg-[#145B52] text-white">
			<div className="w-full padding-x py-[80px]">
				<div className="w-full max-w-[1400px] mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 mb-12 border-b border-white/20">
						<div className="lg:col-span-5">
							<h3 className="sub-heading font-medium font-NeueMontreal text-white mb-4">
								Vila Adalbert
							</h3>
							<p className="paragraph font-NeueMontreal text-white/80 leading-relaxed mb-6 max-w-[400px]">
								{t.footer.description}
							</p>
							<div className="flex gap-4 mt-6">
								<a
									href="https://instagram.com"
									target="_blank"
									rel="noopener noreferrer"
									className="w-[45px] h-[45px] rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
									<Instagram size={20} />
								</a>
								<a
									href="https://facebook.com"
									target="_blank"
									rel="noopener noreferrer"
									className="w-[45px] h-[45px] rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
									<Facebook size={20} />
								</a>
							</div>
						</div>

						<div className="lg:col-span-3">
							<h3 className="paragraph font-medium font-NeueMontreal uppercase tracking-wider mb-6 text-white">
								{t.footer.navigation}
							</h3>
							<ul className="space-y-3">
								{navItems.map((item, index) => (
									<li key={index}>
										<Link
											href={item.href}
											className="small-text font-NeueMontreal text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
											{item.title}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div className="lg:col-span-4">
							<h3 className="paragraph font-medium font-NeueMontreal uppercase tracking-wider mb-6 text-white">
								{t.footer.contact}
							</h3>
							<ul className="space-y-4">
								<li>
									<a
										href="mailto:info@vilaadalbert.cz"
										className="small-text font-NeueMontreal text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-3 group">
										<div className="w-[40px] h-[40px] rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
											<Mail size={18} />
										</div>
										<span>info@vilaadalbert.cz</span>
									</a>
								</li>
								<li>
									<a
										href="tel:+420123456789"
										className="small-text font-NeueMontreal text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-3 group">
										<div className="w-[40px] h-[40px] rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
											<Phone size={18} />
										</div>
										<span>+420 123 456 789</span>
									</a>
								</li>
								<li className="pt-2">
									<div className="flex items-start gap-3">
										<div className="w-[40px] h-[40px] rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
											<MapPin size={18} />
										</div>
										<div className="small-text font-NeueMontreal text-white/70">
											<p>Vila Adalbert</p>
											<p>Horní Lipová 123</p>
											<p>788 61 Horní Lipová</p>
											<p>Česká Republika</p>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>

					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="small-text font-NeueMontreal text-white/50">
							© {new Date().getFullYear()} Vila Adalbert. {t.footer.copyright || 'Všechna práva vyhrazena.'}
						</p>
						<div className="flex gap-6">
							<Link
								href="/privacy"
								className="small-text font-NeueMontreal text-white/50 hover:text-white transition-colors duration-200">
								{t.footer.privacy || 'Ochrana osobních údajů'}
							</Link>
							<Link
								href="/terms"
								className="small-text font-NeueMontreal text-white/50 hover:text-white transition-colors duration-200">
								{t.footer.terms || 'Obchodní podmínky'}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
