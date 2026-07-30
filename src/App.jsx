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
import CustomSection from './components/CustomSection.jsx'
import Footer from './components/Footer.jsx'
import { useReveal } from './hooks/useReveal.js'
import { useScrollSpy } from './hooks/useScrollSpy.js'
import { useScrollProgress } from './hooks/useScrollProgress.js'
import { useVisitNotification } from './hooks/useVisitNotification.js'
import { useSections } from './hooks/useSections.js'
import { useLang } from './i18n/LanguageContext.jsx'

const SECTION_COMPONENTS = {
  about: About,
  competencies: Competencies,
  education: Education,
  experience: Experience,
  projects: Projects,
  skills: Skills,
  certifications: Certifications,
  contact: Contact,
}

export default function App() {
  const { lang } = useLang()
  const sections = useSections()
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections])

  // Re-runs whenever the section list changes so newly added sections animate.
  useReveal([sectionIds.join('|')])
  const activeId = useScrollSpy(sectionIds)
  const progress = useScrollProgress()
  useVisitNotification(lang)

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-paper">
      <Sidebar sections={sections} activeId={activeId} progress={progress} />
      <main className="md:pl-[240px]">
        <Hero />
        {sections.map((section) => {
          if (section.isCustom) {
            return <CustomSection key={section.id} id={section.id} num={section.num} />
          }
          const Component = SECTION_COMPONENTS[section.id]
          return Component ? <Component key={section.id} num={section.num} /> : null
        })}
        <Footer />
      </main>
    </div>
  )
}
