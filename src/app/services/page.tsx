import Navbar from "@/components/Navbar";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesDetail from "@/components/services/ServicesDetail";
import ServicesCTA from "@/components/services/ServicesCTA";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        <ServicesDetail />
        <ServicesCTA />
      </main>
      <Footer />
    </>
  );
}
