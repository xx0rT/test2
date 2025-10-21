import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Home, Wifi, Mountain, Utensils, Tv, Wind, Car, Trees } from "lucide-react";

const equipment = [
  { icon: Home, title: "Spacious Living", description: "3 bedrooms, 2 bathrooms, sleeps up to 8 guests" },
  { icon: Wifi, title: "High-Speed WiFi", description: "Perfect for remote work and streaming" },
  { icon: Utensils, title: "Full Kitchen", description: "Modern appliances and cookware" },
  { icon: Tv, title: "Entertainment", description: "Smart TV and board games" },
  { icon: Wind, title: "Climate Control", description: "Heating and air conditioning" },
  { icon: Car, title: "Parking", description: "Free on-site parking for 2 vehicles" },
  { icon: Trees, title: "Outdoor Space", description: "Private garden and terrace" },
  { icon: Mountain, title: "Mountain Views", description: "Breathtaking panoramic vistas" },
];

export default function EquipmentVila() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="equipment" className="w-full padding-x padding-y bg-white">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="font-FoundersGrotesk font-semibold text-[80px] leading-[75px] lg:text-[60px] lg:leading-[58px] md:text-[48px] md:leading-[45px] sm:text-[36px] sm:leading-[34px] xm:text-[28px] xm:leading-[26px] mb-12 text-primary">
          Equipment & Amenities
        </h2>

        <div className="grid grid-cols-4 gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {equipment.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-start space-y-4 p-6 rounded-xl hover:bg-[#f1f1f1] transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-FoundersGrotesk font-semibold text-xl mb-2 text-primary">
                  {item.title}
                </h3>
                <p className="font-NeueMontreal text-base text-primary/70">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
