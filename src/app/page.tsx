import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import Experience from '@/components/sections/experience';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import EfficiencyTool from '@/components/sections/efficiency-tool';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <EfficiencyTool />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
