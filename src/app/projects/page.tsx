import Navbar from "@/components/Navbar";
import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProjectsHero />
        <ProjectsGrid />
      </main>
      <Footer />
    </>
  );
}
