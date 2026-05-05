import Navbar from "@/components/Navbar";
import PhotoBanner from "@/components/PhotoBanner";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutBio from "@/components/about/AboutBio";
import AboutSkills from "@/components/about/AboutSkills";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <AboutBio />
        <AboutSkills />
        <PhotoBanner />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
