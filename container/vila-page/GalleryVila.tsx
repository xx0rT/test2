import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSeason } from "@/context/SeasonContext";

const winterGallery = [
  { id: 1, label: "Winter view 1" },
  { id: 2, label: "Winter view 2" },
  { id: 3, label: "Winter view 3" },
  { id: 4, label: "Winter view 4" },
  { id: 5, label: "Winter view 5" },
  { id: 6, label: "Winter view 6" },
];

const summerGallery = [
  { id: 1, label: "Summer view 1" },
  { id: 2, label: "Summer view 2" },
  { id: 3, label: "Summer view 3" },
  { id: 4, label: "Summer view 4" },
  { id: 5, label: "Summer view 5" },
  { id: 6, label: "Summer view 6" },
];

export default function GalleryVila() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { season } = useSeason();
  const gallery = season === 'winter' ? winterGallery : summerGallery;

  return (
    <section id="gallery" className="w-full padding-x padding-y bg-[#f1f1f1]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="font-FoundersGrotesk font-semibold text-[80px] leading-[75px] lg:text-[60px] lg:leading-[58px] md:text-[48px] md:leading-[45px] sm:text-[36px] sm:leading-[34px] xm:text-[28px] xm:leading-[26px] mb-12 text-primary">
          Photo Gallery
        </h2>

        <div className="grid grid-cols-3 gap-6 lg:grid-cols-2 md:grid-cols-1">
          {gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-[350px] md:h-[300px] rounded-xl overflow-hidden group cursor-pointer bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"
            >
              <p className="text-slate-500 font-NeueMontreal text-lg text-center px-4">
                {item.label}
              </p>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
