import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FlagshipProjects } from "@/components/sections/FlagshipProjects";
import { Certifications } from "@/components/sections/Certifications";
import { Experience } from "@/components/sections/Experience";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#09090b] text-[#fafafa] selection:bg-blue-500/20 selection:text-blue-200">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FlagshipProjects />
        <Certifications />
        <Experience />
        <SkillsGrid />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
