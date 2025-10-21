import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Home as HomeIcon, Laptop, Mountain, PartyPopper } from "lucide-react";
import contentData from "@/data/content.json";

const iconMap: { [key: string]: any } = {
  home: HomeIcon,
  laptop: Laptop,
  mountain: Mountain,
  party: PartyPopper,
};

export default function PossibilitiesVila() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className="w-full padding-x padding-y bg-white">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="font-FoundersGrotesk font-semibold text-[80px] leading-[75px] lg:text-[60px] lg:leading-[58px] md:text-[48px] md:leading-[45px] sm:text-[36px] sm:leading-[34px] xm:text-[28px] xm:leading-[26px] mb-6 text-primary">
          House Full of Possibilities
        </h2>
        <p className="font-NeueMontreal text-xl lg:text-lg text-primary/70 mb-12 max-w-3xl">
          Vila Adalbert adapts to your needs, whatever they may be. From peaceful retreats to productive workations, from family gatherings to adventure basecamp.
        </p>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-1">
          {contentData.possibilities.map((item, index) => {
            const Icon = iconMap[item.icon] || HomeIcon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl border-2 border-primary/10 hover:border-primary/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-FoundersGrotesk font-semibold text-3xl mb-4 text-primary">
                  {item.title}
                </h3>
                <p className="font-NeueMontreal text-lg text-primary/70 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
