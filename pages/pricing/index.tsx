import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Ready, Footer } from "@/components";
import Curve from "@/components/Curve/Curve";
import { supabase, Pricing as PricingType } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function Pricing() {
  const { language, t } = useLanguage();
  const [pricingData, setPricingData] = useState<PricingType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPricing();
  }, []);

  async function fetchPricing() {
    try {
      const { data, error } = await supabase
        .from('pricing')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setPricingData(data || []);
    } catch (error) {
      console.error('Error fetching pricing:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Curve backgroundColor="#F1F1F1">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full min-h-screen bg-background relative z-20">
      <section className="w-full min-h-screen pt-[15vh] padding-x pb-[100px]">
        <div className="w-full margin">
          <div className="w-full flex flex-col">
            <div className="w-full">
              <h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
                {t.pricing.title}
              </h1>
            </div>
            <div className="w-full border-t border-[#21212155] pt-[20px] mt-[20px]">
              <p className="w-[80%] sm:w-full xm:w-full sub-heading font-normal font-NeueMontreal text-secondry">
                {t.pricing.subtitle}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="w-full flex justify-center items-center py-[100px]">
              <p className="paragraph font-NeueMontreal text-secondry">
                {t.common.loading}
              </p>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mt-[60px]">
              {pricingData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#21212155] rounded-[20px] p-[40px] hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-[20px]">
                      <span className="small-text uppercase font-NeueMontreal text-gray-500">
                        {t.pricing.season}
                      </span>
                      <span className="w-[12px] h-[12px] rounded-full bg-[#145B52]" />
                    </div>

                    <h2 className="sub-heading font-medium font-NeueMontreal text-secondry mb-[10px]">
                      {language === 'cs' ? item.title_cs : item.title_en}
                    </h2>

                    <p className="paragraph font-NeueMontreal text-gray-600 mb-[30px]">
                      {language === 'cs' ? item.description_cs : item.description_en}
                    </p>

                    <div className="border-t border-[#21212155] pt-[30px] mb-[30px]">
                      <div className="flex items-baseline gap-[10px] mb-[20px]">
                        <span className="text-[48px] leading-none font-semibold font-NeueMontreal text-secondry">
                          {item.price_per_night.toLocaleString('cs-CZ')}
                        </span>
                        <span className="paragraph font-NeueMontreal text-gray-600">
                          Kč {t.pricing.perNight}
                        </span>
                      </div>

                      <div className="flex flex-col gap-[10px]">
                        <div className="flex items-center gap-[10px]">
                          <span className="w-[6px] h-[6px] rounded-full bg-[#145B52]" />
                          <p className="paragraph font-NeueMontreal text-secondry">
                            {t.pricing.minNights} {item.min_nights} {t.pricing.nights}
                          </p>
                        </div>
                        <div className="flex items-center gap-[10px]">
                          <span className="w-[6px] h-[6px] rounded-full bg-[#145B52]" />
                          <p className="paragraph font-NeueMontreal text-secondry">
                            {t.pricing.maxGuests} {item.max_guests} {t.pricing.guests}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full bg-secondry text-white text-center py-[15px] rounded-[50px] paragraph font-NeueMontreal uppercase hover:bg-[#0F1F1C] transition-colors duration-300">
                    {t.pricing.bookNow}
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="w-full border-t border-[#21212155] pt-[40px] mt-[80px]">
            <p className="paragraph font-NeueMontreal text-secondry text-center">
              {t.pricing.contact}
            </p>
          </div>
        </div>
      </section>
      <Ready />
      </motion.main>
    </Curve>
  );
}
