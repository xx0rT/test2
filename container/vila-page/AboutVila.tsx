import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutVila() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { t } = useLanguage();

  return (
    <section id="about" className="w-full padding-x padding-y bg-white">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="font-FoundersGrotesk font-semibold text-[80px] leading-[75px] lg:text-[60px] lg:leading-[58px] md:text-[48px] md:leading-[45px] sm:text-[36px] sm:leading-[34px] xm:text-[28px] xm:leading-[26px] mb-12 text-primary">
          {t('about.title')}
        </h2>

        <div className="grid grid-cols-2 gap-12 lg:gap-8 md:grid-cols-1">
          <div className="space-y-6">
            <p className="font-NeueMontreal text-xl lg:text-lg md:text-base text-primary/80 leading-relaxed">
              {t('about.p1')}
            </p>
            <p className="font-NeueMontreal text-xl lg:text-lg md:text-base text-primary/80 leading-relaxed">
              {t('about.p2')}
            </p>
            <p className="font-NeueMontreal text-xl lg:text-lg md:text-base text-primary/80 leading-relaxed">
              {t('about.p3')}
            </p>
          </div>

          <div className="relative h-[500px] md:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            <p className="text-slate-500 font-NeueMontreal text-lg text-center px-8">
              Add your beautiful interior photos here
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
