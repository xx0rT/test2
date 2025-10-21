export default function Hero() {
	return (
		<section className="w-full min-h-screen">
			<div className="w-full flex flex-col justify-between">
				<div className="w-full flex flex-col">
					<div className="w-full margin padding-x">
						<div>
							<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
								vybavení
							</h1>
						</div>
					</div>
					<div className="w-full border-t border-[#21212155]">
						<p className="w-[80%] sm:w-full xm:w-full sub-heading font-normal padding-x font-NeueMontreal text-secondry padding-y">
							Nabízíme&nbsp;
							<span className="xl:link-flash lg:link-flash md:link-flash cursor-pointer">
								kompletně vybavenou&nbsp;
							</span>
							a&nbsp;
							<span className="xl:link-flash lg:link-flash md:link-flash cursor-pointer">
								luxusní&nbsp;
							</span>
							vilu, která zajistí váš pohodlný a nezapomenutelný pobyt.
						</p>
					</div>
					<div className="w-full flex border-t border-[#21212155] py-[20px] flex-col">
						<div className="w-full flex justify-between sm:flex-col xm:flex-col padding-x sm:gap-[20px] xm:gap-[20px]">
							<div className="w-[50%] sm:w-full xm:w-full">
								<p className="paragraph font-NeueMontreal text-secondry">
									Co vám nabízíme <br /> v naší vile:
								</p>
							</div>
							<div className="w-[50%] sm:w-full xm:w-full flex justify-between sm:flex-col xm:flex-col gap-[20px]	">
								<div className="w-[50%] sm:w-full xm:w-full flex flex-col gap-[20px]">
									<div className="flex flex-col gap-[20px]">
										<p className="paragraph font-NeueMontreal text-secondry underline">
											Komfort na prvním místě
										</p>
										<p className="paragraph font-NeueMontreal text-secondry">
											Co potřebujete pro dokonalý odpočinek?
											<br className="sm:hidden xm:hidden" /> Moderní vybavení,
											pohodlné <br className="sm:hidden xm:hidden" />
											prostory a vše potřebné pro váš
											<br className="sm:hidden xm:hidden" /> pobyt najdete v naší
											vile.
										</p>
									</div>
									<div className="flex flex-col gap-[20px]">
										<p className="paragraph font-NeueMontreal text-secondry underline">
											Pro každého hosta
										</p>
										<p className="paragraph font-NeueMontreal text-secondry">
											Rodiny, páry nebo přátelé? Vila je
											<br className="sm:hidden xm:hidden" /> dostatečně prostorná
											a flexibilní
											<br className="sm:hidden xm:hidden" /> pro různé skupiny
											hostů a jejich <br className="sm:hidden xm:hidden" />
											individuální potřeby a přání.
										</p>
									</div>
								</div>
								<div className="w-[50%] sm:w-full xm:w-full">
									<div className="flex flex-col gap-[20px]">
										<p className="paragraph font-NeueMontreal text-secondry underline">
											Lokalita a prostředí
										</p>
										<p className="paragraph font-NeueMontreal text-secondry">
											Chcete klid v přírodě nebo blízkost
											<br className="sm:hidden xm:hidden" />
											turistických cílů? Naše vila nabízí
											<br className="sm:hidden xm:hidden" /> to nejlepší z obou
											světů - klidné
											<br className="sm:hidden xm:hidden" /> prostředí a
											dostupnost aktivit v okolí.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
