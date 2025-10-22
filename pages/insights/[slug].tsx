import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { supabase, BlogPost } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';
import { Curve, Ready } from '@/components';

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { language } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost(slug as string);
    }
  }, [slug]);

  async function fetchPost(postSlug: string) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', postSlug)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="paragraph font-NeueMontreal text-secondry">Načítání...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-[20px]">
        <p className="paragraph font-NeueMontreal text-secondry">Blog nebyl nalezen</p>
        <Link
          href="/insights"
          className="paragraph font-NeueMontreal text-[#145B52] hover:underline">
          Zpět na články
        </Link>
      </div>
    );
  }

  const title = language === 'cs' ? post.title_cs : post.title_en;
  const content = language === 'cs' ? post.content_cs : post.content_en;
  const excerpt = language === 'cs' ? post.excerpt_cs : post.excerpt_en;

  return (
    <Curve backgroundColor="#f1f1f1">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full min-h-screen bg-background">
        <section className="w-full pt-[15vh] pb-[100px] padding-x">
          <div className="max-w-[900px] mx-auto">
            <Link
              href="/insights"
              className="flex items-center gap-[10px] paragraph font-NeueMontreal text-secondry hover:text-[#145B52] mb-[40px] transition-colors">
              <ArrowLeft size={20} />
              Zpět na články
            </Link>

            {post.image_url && (
              <div className="w-full h-[400px] rounded-[20px] overflow-hidden mb-[40px]">
                <Image
                  src={post.image_url}
                  alt={title}
                  width={900}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-[20px] mb-[20px] flex-wrap">
              <div className="flex items-center gap-[8px]">
                <Tag size={16} className="text-gray-500" />
                <span className="small-text font-NeueMontreal text-gray-600 capitalize">
                  {post.category}
                </span>
              </div>
              <div className="flex items-center gap-[8px]">
                <Calendar size={16} className="text-gray-500" />
                <span className="small-text font-NeueMontreal text-gray-600">
                  {new Date(post.created_at).toLocaleDateString('cs-CZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            <h1 className="heading font-semibold font-FoundersGrotesk text-secondry mb-[30px] tracking-[-1.3px]">
              {title}
            </h1>

            <p className="sub-heading font-normal font-NeueMontreal text-gray-700 mb-[40px] leading-relaxed">
              {excerpt}
            </p>

            <div className="w-full border-t border-[#21212155] pt-[40px]">
              <div className="paragraph font-NeueMontreal text-secondry leading-[1.8] whitespace-pre-line">
                {content}
              </div>
            </div>

            <div className="w-full border-t border-[#21212155] mt-[60px] pt-[40px]">
              <Link
                href="/contact"
                className="inline-block bg-secondry text-white px-[40px] py-[15px] rounded-[50px] paragraph font-NeueMontreal uppercase hover:bg-[#0F1F1C] transition-colors">
                Kontaktujte nás
              </Link>
            </div>
          </div>
        </section>
        <Ready />
      </motion.main>
    </Curve>
  );
}
