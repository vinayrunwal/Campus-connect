import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">C1</span>
          </div>
          <span className="text-lg font-semibold text-foreground">Campus One</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {["Features", "Notes", "Events", "Internships"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/dashboard">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-border bg-background px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {["Features", "Notes", "Events", "Internships"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-muted-foreground py-2">
                {item}
              </a>
            ))}
            <Link to="/login"><Button variant="ghost" size="sm" className="w-full">Log in</Button></Link>
            <Link to="/dashboard"><Button size="sm" className="w-full">Get Started</Button></Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
