import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl bg-foreground px-8 py-16 text-center md:px-16"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-background md:text-4xl">
              Ready to simplify your campus life?
            </h2>
            <p className="mx-auto mt-4 max-w-md font-serif text-background/60">
              Join thousands of students already using Campus One to stay organized and never miss what matters.
            </p>
            <div className="mt-8">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 px-8">
                  Start Now <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
