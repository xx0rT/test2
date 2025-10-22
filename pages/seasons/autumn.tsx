import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import FallingLeaves from "@/components/animations/FallingLeaves";
import Curve from "@/components/Curve/Curve";
import { useLanguage } from "@/context/LanguageContext";

export default function Autumn() {
  const { t } = useLanguage();

  return (
    <Curve backgroundColor="#ffedd5">
      <FallingLeaves />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full min-h-screen bg-gradient-to-b from-orange-50 to-white relative z-20">
        <div className="w-full padding-x padding-y pt-32 relative z-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto relative z-20">
            <h1 className="text-[8vw] sm:text-[12vw] font-FoundersGrotesk font-semibold uppercase leading-none text-orange-900 mb-8">
              Podzim
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="space-y-6">
                <h2 className="text-4xl font-FoundersGrotesk font-medium text-orange-800">
                  Podzimní kouzlo Jeseníků
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed font-NeueMontreal">
                  Objevte krásu podzimu v našich horách. Barevné lesy, křupavé listy pod nohama
                  a čerstvý horský vzduch vytvoří nezapomenutelnou atmosféru.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed font-NeueMontreal">
                  Podzim je ideální čas pro houbaření, pozorování přírody v proměnách barev
                  a dlouhé procházky krajinou v teplých odstínech zlata a mědi.
                </p>
              </div>

              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/background-about.jpeg"
                  alt="Podzimní vila"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
              <h3 className="text-3xl font-FoundersGrotesk font-medium text-orange-900 mb-6">
                Podzimní aktivity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-orange-50 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3 text-orange-800">🍄 Houbaření</h4>
                  <p className="text-gray-700 font-NeueMontreal">
                    Bohaté houbařské oblasti v okolí vily
                  </p>
                </div>
                <div className="p-6 bg-orange-50 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3 text-orange-800">🚶 Turistika</h4>
                  <p className="text-gray-700 font-NeueMontreal">
                    Procházky barevnými podzimními lesy
                  </p>
                </div>
                <div className="p-6 bg-orange-50 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3 text-orange-800">📸 Fotografie</h4>
                  <p className="text-gray-700 font-NeueMontreal">
                    Úžasné výhledy a podzimní krajina
                  </p>
                </div>
                <div className="p-6 bg-orange-50 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3 text-orange-800">🚴 Cyklistika</h4>
                  <p className="text-gray-700 font-NeueMontreal">
                    Cyklotrasy s podzimními scenériemi
                  </p>
                </div>
                <div className="p-6 bg-orange-50 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3 text-orange-800">🏛️ Památky</h4>
                  <p className="text-gray-700 font-NeueMontreal">
                    Návštěva místních kulturních památek
                  </p>
                </div>
                <div className="p-6 bg-orange-50 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3 text-orange-800">🍷 Degustace</h4>
                  <p className="text-gray-700 font-NeueMontreal">
                    Místní speciality a podzimní dobroty
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pb-16">
              <Link
                href="/contact"
                className="inline-block px-12 py-4 bg-orange-900 text-white rounded-full font-NeueMontreal font-medium text-lg hover:bg-orange-800 transition-colors">
                Rezervovat podzimní pobyt
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Curve>
  );
}
