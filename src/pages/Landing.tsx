import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import ScrollStory from "@/components/scrollytelling";

const Landing = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <>
      <Hero />
      <ScrollStory />
    </>
    <Features />
    <CTA />
    <Footer />
  </div>
);

export default Landing;
