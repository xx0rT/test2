import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSeason } from "@/context/SeasonContext";
import { Snowflake, Sun, Bike, Mountain as MountainIcon, Camera, Coffee } from "lucide-react";

const winterActivities = [
  { icon: Snowflake, title: "Skiing & Snowboarding", description: "Access to nearby ski resorts within 20 minutes" },
  { icon: MountainIcon, title: "Winter Hiking", description: "Scenic trails perfect for snowshoeing" },
  { icon: Coffee, title: "Cozy Mountain Cafes", description: "Warm up in local restaurants and cafes" },
  { icon: Camera, title: "Winter Photography", description: "Capture stunning snowy landscapes" },
];

const summerActivities = [
  { icon: Bike, title: "Mountain Biking", description: "Extensive trail network for all skill levels" },
  { icon: MountainIcon, title: "Hiking & Trekking", description: "Breathtaking routes with panoramic views" },
  { icon: Sun, title: "Nature Walks", description: "Explore local flora and fauna" },
  { icon: Camera, title: "Photography Tours", description: "Discover hidden gems and scenic viewpoints" },
];

export default function ActivitiesVila() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { season } = useSeason();
  const activities = season === 'winter' ? winterActivities : summerActivities;

  return (
    <section id="activities" className="w-full padding-x padding-y bg-[#f1f1f1]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="font-FoundersGrotesk font-semibold text-[80px] leading-[75px] lg:text-[60px] lg:leading-[58px] md:text-[48px] md:leading-[45px] sm:text-[36px] sm:leading-[34px] xm:text-[28px] xm:leading-[26px] mb-12 text-primary">
          Activities in the Area
        </h2>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-1">
          {activities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-start space-x-6 p-8 rounded-2xl bg-white hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-FoundersGrotesk font-semibold text-2xl mb-3 text-primary">
                  {item.title}
                </h3>
                <p className="font-NeueMontreal text-lg text-primary/70">
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
