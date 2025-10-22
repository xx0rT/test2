import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Summer() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="w-full padding-x padding-y pt-32">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto">
          <h1 className="text-[8vw] sm:text-[12vw] font-FoundersGrotesk font-semibold uppercase leading-none text-yellow-900 mb-8">
            Léto
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-4xl font-FoundersGrotesk font-medium text-yellow-800">
                Letní dobrodružství v horách
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed font-NeueMontreal">
                Prožijte nezapomenutelné léto v našich horách. Slunečné dny, dlouhé procházky přírodou
                a čerstvý horský vzduch jsou zárukou skvělého odpočinku.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-NeueMontreal">
                Léto nabízí neomezené možnosti pro outdoorové aktivity, koupání v přírodních koupalištích,
                grilování na terase a pozorování hvězd za teplých letních nocí.
              </p>
            </div>

            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/capybilities2.jpeg"
                alt="Letní vila"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h3 className="text-3xl font-FoundersGrotesk font-medium text-yellow-900 mb-6">
              Letní aktivity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-yellow-50 rounded-xl">
                <h4 className="text-xl font-semibold mb-3 text-yellow-800">⛰️ Horská turistika</h4>
                <p className="text-gray-700 font-NeueMontreal">
                  Výstupy na vrcholy s úžasnými výhledy
                </p>
              </div>
              <div className="p-6 bg-yellow-50 rounded-xl">
                <h4 className="text-xl font-semibold mb-3 text-yellow-800">🚵 MTB</h4>
                <p className="text-gray-700 font-NeueMontreal">
                  Horské cyklotrasy pro všechny úrovně
                </p>
              </div>
              <div className="p-6 bg-yellow-50 rounded-xl">
                <h4 className="text-xl font-semibold mb-3 text-yellow-800">🏊 Koupání</h4>
                <p className="text-gray-700 font-NeueMontreal">
                  Přírodní koupaliště v okolí
                </p>
              </div>
              <div className="p-6 bg-yellow-50 rounded-xl">
                <h4 className="text-xl font-semibold mb-3 text-yellow-800">🍖 Grilování</h4>
                <p className="text-gray-700 font-NeueMontreal">
                  Venkovní posezení s grilem
                </p>
              </div>
              <div className="p-6 bg-yellow-50 rounded-xl">
                <h4 className="text-xl font-semibold mb-3 text-yellow-800">⭐ Astronomie</h4>
                <p className="text-gray-700 font-NeueMontreal">
                  Pozorování hvězd v čistém horském vzduchu
                </p>
              </div>
              <div className="p-6 bg-yellow-50 rounded-xl">
                <h4 className="text-xl font-semibold mb-3 text-yellow-800">🌲 Výlety</h4>
                <p className="text-gray-700 font-NeueMontreal">
                  Rodinné výlety do přírody
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pb-16">
            <Link
              href="/contact"
              className="inline-block px-12 py-4 bg-yellow-900 text-white rounded-full font-NeueMontreal font-medium text-lg hover:bg-yellow-800 transition-colors">
              Rezervovat letní pobyt
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
