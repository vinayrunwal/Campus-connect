import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollStory from "@/components/scrollytelling";

const Hero = () => {
  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://mituniversity.ac.in/assets_web/images/FES/IT_Building2.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Your entire campus, unified
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
          >
            One platform for <span className="text-primary">everything</span> campus
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-lg md:text-xl"
          >
            Notes, events, internships, and announcements — stop juggling platforms.
            Campus One brings clarity to student life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 px-8">
                Get Started <ArrowRight size={16} />
              </Button>
            </Link>

            <a href="#features">
              <Button variant="outline" size="lg" className="px-8">
                See Features
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Floating indicators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-4"
        >
          {[
            { icon: BookOpen, label: "Notes", count: "2.4k+" },
            { icon: Calendar, label: "Events", count: "120+" },
            { icon: Briefcase, label: "Internships", count: "85+" },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur p-6 text-center"
            >
              <item.icon size={24} className="text-primary" />
              <span className="text-2xl font-bold">{item.count}</span>
              <span className="text-sm">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;