import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage'
import { CourseEnrollment } from '../pages/CourseEnrollment'

/* Make the router  */
export const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/inscripcion/:idCourse" element={<CourseEnrollment />} />
      </Routes>
    </Router>
  )
}
