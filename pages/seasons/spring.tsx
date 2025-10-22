import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Curve from "@/components/Curve/Curve";
import { useLanguage } from "@/context/LanguageContext";

export default function Spring() {
  const { t } = useLanguage();

  return (
    <Curve backgroundColor="#f0fdf4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full min-h-screen relative z-20">

        <div className="relative w-full h-[70vh] mb-20">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 via-green-800/30 to-transparent z-10" />
          <Image
            src="/showcase5.jpeg"
            alt="Jarní krajina"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-center px-6">
              <h1 className="text-[15vw] sm:text-[20vw] lg:text-[180px] font-FoundersGrotesk font-bold uppercase leading-none text-white mb-6 drop-shadow-2xl">
                JARO
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 font-NeueMontreal max-w-2xl mx-auto drop-shadow-lg">
                Probuďte se spolu s přírodou v našem horském ráji
              </p>
            </motion.div>
          </div>
        </div>

        <div className="w-full padding-x padding-y relative z-20 bg-gradient-to-b from-transparent via-green-50 to-white">
          <div className="max-w-7xl mx-auto">

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <div className="inline-block px-4 py-2 bg-green-100 rounded-full mb-4">
                    <span className="text-green-800 font-semibold text-sm uppercase tracking-wide">Březen - Květen</span>
                  </div>
                  <h2 className="text-5xl lg:text-6xl font-FoundersGrotesk font-bold text-green-900 leading-tight">
                    Jarní probuzení v Jeseníkách
                  </h2>
                  <p className="text-xl text-gray-700 leading-relaxed font-NeueMontreal">
                    Sledujte, jak se příroda probouzí k životu. Rozkvetlé louky, zpívající ptáci
                    a svěží horský vzduch plný vůně jarních květů.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed font-NeueMontreal">
                    Jaro je ideální čas pro objevování horských stezek, fotografování přírody
                    a načerpání nové energie v klidném prostředí naší vily.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="relative h-64 rounded-2xl overflow-hidden shadow-xl col-span-2 cursor-pointer group">
                    <Image
                      src="/image copy copy.png"
                      alt="Vila na jaře"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
                      <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="w-0 h-0 border-l-[20px] border-l-green-900 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/image.png"
                      alt="Jarní příroda"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/image copy.png"
                      alt="Horské panorama"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mb-20">
              <h3 className="text-4xl lg:text-5xl font-FoundersGrotesk font-bold text-green-900 mb-12 text-center">
                Jarní aktivity a zážitky
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: "🚶", title: "Jarní túry", desc: "Objevujte probouzející se přírodu" },
                  { icon: "🚴", title: "Cykloturistika", desc: "Nové trasy v čerstvé zeleni" },
                  { icon: "📸", title: "Fotografování", desc: "Zachyťte krásu jarní přírody" },
                  { icon: "🌸", title: "Bylinkové procházky", desc: "Poznávejte léčivé rostliny" },
                  { icon: "🐦", title: "Pozorování ptáků", desc: "Návrat tažných ptáků" },
                  { icon: "🧘", title: "Jóga v přírodě", desc: "Harmonizace těla i mysli" }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-700/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="text-5xl mb-4">{activity.icon}</div>
                      <h4 className="text-2xl font-FoundersGrotesk font-bold text-green-900 mb-3">
                        {activity.title}
                      </h4>
                      <p className="text-gray-600 font-NeueMontreal leading-relaxed">
                        {activity.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="bg-gradient-to-br from-green-900 to-green-700 rounded-3xl p-12 lg:p-16 text-center mb-20 shadow-2xl">
              <h3 className="text-4xl lg:text-5xl font-FoundersGrotesk font-bold text-white mb-6">
                Prožijte jaro v horách
              </h3>
              <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto font-NeueMontreal">
                Rezervujte si pobyt a staňte se součástí jarního probuzení přírody
              </p>
              <Link
                href="/contact"
                className="inline-block px-12 py-5 bg-white text-green-900 rounded-full font-NeueMontreal font-bold text-lg hover:bg-green-50 transition-all duration-300 hover:scale-105 shadow-xl">
                Kontaktovat nás
              </Link>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </Curve>
  );
}
