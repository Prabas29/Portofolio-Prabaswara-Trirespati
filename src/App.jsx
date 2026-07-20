import { useMemo } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Competencies from './components/Competencies.jsx'
import Education from './components/Education.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Certifications from './components/Certifications.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { NAV_SECTIONS } from './data/nav.js'
import { useReveal } from './hooks/useReveal.js'
import { useScrollSpy } from './hooks/useScrollSpy.js'
import { useScrollProgress } from './hooks/useScrollProgress.js'

export default function App() {
  const sectionIds = useMemo(() => NAV_SECTIONS.map((s) => s.id), [])
  useReveal()
  const activeId = useScrollSpy(sectionIds)
  const progress = useScrollProgress()

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-paper">
      <Sidebar activeId={activeId} progress={progress} />
      <main className="md:pl-[240px]">
        <Hero />
        <About />
        <Competencies />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
