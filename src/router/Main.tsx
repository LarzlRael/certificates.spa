import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'

import { LoginPage, RegisterPage, ForgotPasswordPage } from '@/pages/auth/'

import {
  CoursePage,
  NotificationsPage,
  StudentsPage,
  CourseEnrollment,
  EnrollmentByCourse,
} from '@/pages/dashboard'
import DashboardLayout from '@/custom_components/layout'
import { PrivateRoutes } from './PrivateRoutes'

/* Make the router  */
export const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingreso" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/olvide-mi-contraseña" element={<ForgotPasswordPage />} />
        <Route path="/inscripcion/:idCourse" element={<CourseEnrollment />} />

        <Route
          path="dashboard"
          element={
            <PrivateRoutes>
              <DashboardLayout />
            </PrivateRoutes>
          }
        >
          <Route path="cursos" element={<CoursePage />} />
          <Route path="cursos/:idCourse" element={<EnrollmentByCourse />} />
          <Route path="notificaciones" element={<NotificationsPage />} />
          <Route path="estudiantes" element={<StudentsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
