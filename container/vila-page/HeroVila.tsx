import { motion } from "framer-motion";
import { useSeason } from "@/context/SeasonContext";

export default function HeroVila() {
  const { season } = useSeason();

  return (
    <section className="w-full h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 z-10" />

      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 transition-all duration-1000"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-20 text-center padding-x max-w-4xl"
      >
        <h1 className="text-white font-FoundersGrotesk font-bold text-[120px] leading-[110px] lg:text-[90px] lg:leading-[85px] md:text-[70px] md:leading-[65px] sm:text-[50px] sm:leading-[48px] xm:text-[40px] xm:leading-[38px] mb-6">
          Vila Adalbert
        </h1>
        <p className="text-white/90 font-NeueMontreal text-2xl lg:text-xl md:text-lg sm:text-base xm:text-sm mb-8">
          Your Mountain Retreat for Every Season
        </p>
        <motion.a
          href="#about"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 bg-white text-black font-NeueMontreal font-medium rounded-full hover:bg-white/90 transition-colors"
        >
          Explore the House
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-[30px] h-[50px] border-2 border-white/50 rounded-full p-2">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
