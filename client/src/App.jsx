import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import RecruiterLayout from './layouts/RecruiterLayout'
import VisitorLayout from './layouts/VisitorLayout'

// Recruiter pages
import RecruiterHome from './pages/recruiter/Home'
import RecruiterSkills from './pages/recruiter/Skills'
import RecruiterExperience from './pages/recruiter/Experience'
import RecruiterContact from './pages/recruiter/Contact'

// Visitor pages
import VisitorHome from './pages/visitor/Home'
import VisitorProjects from './pages/visitor/Projects'
import VisitorLab from './pages/visitor/Lab'

// 404 page
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      {/* Landing - Choix du parcours */}
      <Route path="/" element={<Landing />} />

      {/* Parcours Recruteur */}
      <Route path="/recruiter" element={<RecruiterLayout />}>
        <Route index element={<RecruiterHome />} />
        <Route path="skills" element={<RecruiterSkills />} />
        <Route path="experience" element={<RecruiterExperience />} />
        <Route path="contact" element={<RecruiterContact />} />
      </Route>

      {/* Parcours Visiteur */}
      <Route path="/visitor" element={<VisitorLayout />}>
        <Route index element={<VisitorHome />} />
        <Route path="projects" element={<VisitorProjects />} />
        <Route path="lab" element={<VisitorLab />} />
      </Route>

      {/* 404 - Page non trouvée */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
