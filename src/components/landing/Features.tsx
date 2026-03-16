import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Calendar, Briefcase, MessageSquare, Bell, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Notes Sharing",
    description: "Upload, search, and download notes filtered by subject and semester. Support for PDF, DOC, and PPT.",
  },
  {
    icon: Calendar,
    title: "Events & Clubs",
    description: "Discover hackathons, workshops, and club activities. Register with one click and never miss a campus event.",
  },
  {
    icon: Briefcase,
    title: "Internship Portal",
    description: "Browse opportunities posted by companies and your TPO. Apply and track your application status in real time.",
  },
  {
    icon: MessageSquare,
    title: "Complaint System",
    description: "Report hostel, WiFi, or facility issues. Track resolution status and get updates from administration.",
  },
  {
    icon: Bell,
    title: "Announcements",
    description: "Stay informed with official announcements from your institution, delivered straight to your dashboard.",
  },
  {
    icon: Users,
    title: "Club Activities",
    description: "Explore clubs, join communities, and stay updated on meetings, drives, and collaborative projects.",
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
    >
      <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
        <feature.icon size={22} className="text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
      <p className="font-serif text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-xl text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Everything you need, one place
          </h2>
          <p className="mt-4 font-serif text-muted-foreground">
            Six core modules designed to simplify every aspect of campus life.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
