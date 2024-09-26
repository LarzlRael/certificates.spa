import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'

import { LoginPage, RegisterPage, ForgotPasswordPage } from '@/pages/auth/'

import {
  CoursePage,
  NotificationsPage,
  StudentsPage,
  CourseEnrollment,
  EnrollmentByCourse,
  CreateCoursePage
} from '@/pages/dashboard'
import DashboardLayout from '@/custom_components/layout/DashboardLayout'
import { PrivateRoutes } from './PrivateRoutes'
import DashboardConSidebars from '@/custom_components/layout/DashboardLayout2'
import AdminDashboardEducativo, { AdminDashboardEducativo2 } from '@/custom_components/layout/DashboardLayout3'

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
        <Route path="/inscripcion/:courseName/:idCourse" element={<CourseEnrollment />} />
        <Route path="/dash2" element={<DashboardConSidebars />} />
        <Route path="/dash3" element={<AdminDashboardEducativo />} />


        <Route
          path="panel-administrativo"
          element={
            <PrivateRoutes>
              <AdminDashboardEducativo2 />
            </PrivateRoutes>
          }
        >
          <Route path="cursos" element={<CoursePage />} />
          <Route path="cursos/:idCourse" element={<EnrollmentByCourse />} />
          <Route path="cursos/crear-curso" element={<CreateCoursePage />} />
          <Route path="cursos/modificar-curso/:idCourse" element={<CreateCoursePage />} />
          <Route path="cursos/:idCourse" element={<EnrollmentByCourse />} />
          <Route path="notificaciones" element={<NotificationsPage />} />
          <Route path="estudiantes" element={<StudentsPage />} />
        </Route>

        {/* <Route
          path="dashboard"
          element={
            <PrivateRoutes>
              <DashboardLayout />
            </PrivateRoutes>
          }
        >
          <Route path="cursos" element={<CoursePage />} />
          <Route path="cursos/:idCourse" element={<EnrollmentByCourse />} />
          <Route path="cursos/crear-curso" element={<CreateCoursePage />} />
          <Route path="cursos/modificar-curso/:idCourse" element={<CreateCoursePage />} />
          <Route path="cursos/:idCourse" element={<EnrollmentByCourse />} />
          <Route path="notificaciones" element={<NotificationsPage />} />
          <Route path="estudiantes" element={<StudentsPage />} />
        </Route> */}
      </Routes>
    </Router>
  )
}
