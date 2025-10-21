import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSeason } from "@/context/SeasonContext";
import contentData from "@/data/content.json";
import { Calendar, Clock, Info } from "lucide-react";

export default function PricesVila() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { season } = useSeason();
  const prices = season === 'winter' ? contentData.priceList.winter : contentData.priceList.summer;

  return (
    <section id="prices" className="w-full padding-x padding-y bg-primary text-white">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="font-FoundersGrotesk font-semibold text-[80px] leading-[75px] lg:text-[60px] lg:leading-[58px] md:text-[48px] md:leading-[45px] sm:text-[36px] sm:leading-[34px] xm:text-[28px] xm:leading-[26px] mb-12">
          Price List & Availability
        </h2>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-1 mb-12">
          {prices.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-6 h-6" />
                <h3 className="font-FoundersGrotesk font-semibold text-2xl">
                  {item.period}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline space-x-2">
                  <span className="font-FoundersGrotesk text-5xl font-bold">
                    {item.price}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-white/80">
                  <Clock className="w-5 h-5" />
                  <span className="font-NeueMontreal text-lg">{item.minStay}</span>
                </div>

                {item.notes && (
                  <div className="flex items-start space-x-2 text-white/70 pt-4 border-t border-white/20">
                    <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="font-NeueMontreal text-base">{item.notes}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p className="font-NeueMontreal text-xl mb-8 text-white/80">
            Ready to book your stay at Vila Adalbert?
          </p>
          <motion.a
            href="mailto:contact@vilaadalbert.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 bg-white text-primary font-NeueMontreal font-semibold text-lg rounded-full hover:bg-white/90 transition-colors"
          >
            Contact Us
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
