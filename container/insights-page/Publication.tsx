"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Marquee } from "@/components";
import { supabase, BlogPost } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

export default function Publication() {
	const { language } = useLanguage();
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchPosts();
	}, []);

	async function fetchPosts() {
		try {
			const { data, error } = await supabase
				.from('blog_posts')
				.select('*')
				.eq('published', true)
				.order('created_at', { ascending: false })
				.limit(3);

			if (error) throw error;
			setPosts(data || []);
		} catch (error) {
			console.error('Error fetching posts:', error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<section className="w-full bg-marquee padding-y rounded-t-[20px]">
			<div className="w-full bg-marquee z-10 relative rounded-t-[20px]">
				<Marquee
					title="instagram"
					className="pb-[50px] lg:pb-[40px] md:pb-[30px] sm:pb-[20px] xm:pb-[15px] text-[540px] leading-[330px] lg:text-[380px] lg:leading-[240px] md:text-[300px] md:leading-[160px] sm:text-[230px] sm:leading-[140px] xm:text-[130px] xm:leading-[80px]"
				/>
			</div>
			<div className="w-full padding-x py-[30px]">
				<div className="w-full flex justify-between gap-[20px] flex-wrap sm:flex-col xm:flex-col">
					<div>
						<h3 className="paragraph font-medium text-white font-NeueMontreal">
							{language === 'cs' ? 'Nejnovější články' : 'Latest Articles'}
						</h3>
					</div>
					<div className="w-[70%] flex gap-y-[20px] sm:flex-col xm:flex-col sm:w-full xm:w-full gap-[10px]">
						{loading ? (
							<div className="w-full text-center py-[40px]">
								<p className="paragraph font-NeueMontreal text-white">
									{language === 'cs' ? 'Načítání...' : 'Loading...'}
								</p>
							</div>
						) : posts.length === 0 ? (
							<div className="w-full text-center py-[40px]">
								<p className="paragraph font-NeueMontreal text-white">
									{language === 'cs' ? 'Žádné články zatím nebyly publikovány' : 'No articles published yet'}
								</p>
							</div>
						) : (
							posts.map((post) => (
								<Link
									href={`/insights/${post.slug}`}
									className="w-full flex justify-between gap-[20px] sm:flex-col xm:flex-col hover:opacity-80 transition-opacity"
									key={post.id}>
									<div className="w-full flex gap-[20px] rounded-[20px] flex-col">
										<div className="group overflow-hidden rounded-[20px]">
											{post.image_url ? (
												<Image
													src={post.image_url}
													alt={language === 'cs' ? post.title_cs : post.title_en}
													width={600}
													height={400}
													className="w-full h-full object-cover group-hover:scale-[1.09] transform duration-[1s] ease-[.4,0,.2,1]"
												/>
											) : (
												<div className="w-full h-[300px] bg-gray-700 flex items-center justify-center">
													<span className="paragraph font-NeueMontreal text-white">
														{language === 'cs' ? 'Bez obrázku' : 'No image'}
													</span>
												</div>
											)}
										</div>
										<div className="flex flex-col gap-[10px]">
											<div className="flex gap-[10px] items-center">
												<span className="w-[10px] h-[10px] rounded-full bg-white" />
												<h4 className="paragraph font-medium font-NeueMontreal text-white">
													{language === 'cs' ? post.title_cs : post.title_en}
												</h4>
											</div>
											<p className="small-text font-NeueMontreal text-gray-300 line-clamp-2">
												{language === 'cs' ? post.excerpt_cs : post.excerpt_en}
											</p>
										</div>
									</div>
								</Link>
							))
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
