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
        className="w-full min-h-screen bg-gradient-to-b from-green-50 to-white relative z-10">
      <div className="w-full padding-x padding-y pt-32">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-[8vw] sm:text-[12vw] font-FoundersGrotesk font-semibold uppercase leading-none text-green-900 mb-8">
            Jaro
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-4xl font-FoundersGrotesk font-medium text-green-800">
                Jarní probuzení přírody
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed font-NeueMontreal">
                Zažijte krásu jarního probouzení přírody v Jeseníkách. Rozkvetlé louky, zpívající ptáci
                a svěží horský vzduch vytvoří dokonalou atmosféru pro odpočinek.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-NeueMontreal">
                Jaro je ideální čas pro objevování nových turistických tras, pozorování probouzející se
                přírody a užívání si delších dnů venku v příjemném počasí.
              </p>
            </div>

            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/capybilities1.jpeg"
                alt="Jarní vila"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h3 className="text-3xl font-FoundersGrotesk font-medium text-green-900 mb-6">
              Jarní aktivity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-green-50 rounded-xl">
                <h4 className="text-xl font-semibold mb-3 text-green-800">🌸 Turistika</h4>
                <p className="text-gray-700 font-NeueMontreal">
                  Objevujte rozkvetlé horské louky a trasy
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-xl">
                <h4 className="text-xl font-semibold mb-3 text-green-800">🚴 Cyklovýlety</h4>
                <p className="text-gray-700 font-NeueMontreal">
                  Perfektní počasí pro cyklistické výlety
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-xl">
                <h4 className="text-xl font-semibold mb-3 text-green-800">🦋 Příroda</h4>
                <p className="text-gray-700 font-NeueMontreal">
                  Pozorování probouzející se fauny a flóry
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-xl">
                <h4 className="text-xl font-semibold mb-3 text-green-800">📸 Fotografie</h4>
                <p className="text-gray-700 font-NeueMontreal">
                  Zachyťte krásu jarních květů a krajiny
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-xl">
                <h4 className="text-xl font-semibold mb-3 text-green-800">🏃 Sport</h4>
                <p className="text-gray-700 font-NeueMontreal">
                  Ideální podmínky pro outdoorové sporty
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-xl">
                <h4 className="text-xl font-semibold mb-3 text-green-800">🍃 Relaxace</h4>
                <p className="text-gray-700 font-NeueMontreal">
                  Odpočinek v čerstvém jarním vzduchu
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pb-16">
            <Link
              href="/contact"
              className="inline-block px-12 py-4 bg-green-900 text-white rounded-full font-NeueMontreal font-medium text-lg hover:bg-green-800 transition-colors">
              Rezervovat jarní pobyt
            </Link>
          </div>
        </motion.div>
      </div>
      </motion.div>
    </Curve>
  );
}
