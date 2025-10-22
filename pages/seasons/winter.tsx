import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import FallingSnow from "@/components/animations/FallingSnow";
import { useLanguage } from "@/context/LanguageContext";

export default function Winter() {
  const { t } = useLanguage();

  return (
    <>
      <FallingSnow />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <div className="w-full padding-x padding-y pt-32">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto">
            <h1 className="text-[8vw] sm:text-[12vw] font-FoundersGrotesk font-semibold uppercase leading-none text-blue-900 mb-8">
              Zima
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="space-y-6">
                <h2 className="text-4xl font-FoundersGrotesk font-medium text-blue-800">
                  Zimní pohoda v Jeseníkách
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed font-NeueMontreal">
                  Užijte si kouzlo zimy v naší útulné vile. Zasněžené hory, čerstvý vzduch a teplý krb
                  vytvoří dokonalou atmosféru pro odpočinek a relaxaci.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed font-NeueMontreal">
                  V zimním období nabízíme blízkost lyžařských areálů, krásné procházky zasněženou krajinou
                  a po náročném dni vás čeká pohoda u krbu s horkým nápojem.
                </p>
              </div>

              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/background.png"
                  alt="Zimní vila"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
              <h3 className="text-3xl font-FoundersGrotesk font-medium text-blue-900 mb-6">
                Zimní aktivity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-50 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3 text-blue-800">❄️ Lyžování</h4>
                  <p className="text-gray-700 font-NeueMontreal">
                    Nejbližší lyžařské areály ve vzdálenosti 5-15 km
                  </p>
                </div>
                <div className="p-6 bg-blue-50 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3 text-blue-800">🎿 Běžkování</h4>
                  <p className="text-gray-700 font-NeueMontreal">
                    Upravené běžecké trasy v okolí vily
                  </p>
                </div>
                <div className="p-6 bg-blue-50 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3 text-blue-800">🚶 Zimní túry</h4>
                  <p className="text-gray-700 font-NeueMontreal">
                    Turistické trasy v zasněžených horách
                  </p>
                </div>
                <div className="p-6 bg-blue-50 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3 text-blue-800">🔥 Krb</h4>
                  <p className="text-gray-700 font-NeueMontreal">
                    Útulný krb pro večerní relaxaci
                  </p>
                </div>
                <div className="p-6 bg-blue-50 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3 text-blue-800">🛷 Sáňkování</h4>
                  <p className="text-gray-700 font-NeueMontreal">
                    Skvělé kopce pro rodinnou zábavu
                  </p>
                </div>
                <div className="p-6 bg-blue-50 rounded-xl">
                  <h4 className="text-xl font-semibold mb-3 text-blue-800">♨️ Wellness</h4>
                  <p className="text-gray-700 font-NeueMontreal">
                    Sauna a vířivka po zimních aktivitách
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pb-16">
              <Link
                href="/contact"
                className="inline-block px-12 py-4 bg-blue-900 text-white rounded-full font-NeueMontreal font-medium text-lg hover:bg-blue-800 transition-colors">
                Rezervovat zimní pobyt
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
