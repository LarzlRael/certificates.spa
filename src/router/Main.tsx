import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { HomePage } from '../pages/HomePage'

import {
  LoginPageWithAuth,
  RegisterPage,
  ForgotPasswordPage,
} from '@/pages/auth/'

import {
  DashBoardHomePage,
  CoursePage,
  NotificationsPage,
  StudentsPage,
  CourseEnrollmentPage,
  EnrollmentByCourse,
  CreateCoursePage,
  ProfessorsPage,
  PaymentsPage,
  SettingsPage,
  ProfileStudentPage,
  PaymentsDetailPage,
} from '@/pages/dashboard'
import DashboardLayout from '@/custom_components/layout/DashboardLayout'
import { PrivateRoutes } from './PrivateRoutes'
import DashboardConSidebars from '@/custom_components/layout/DashboardLayout2'
import { MainAdminDashboardWithAuth } from '@/custom_components/layout/MainDashboard'
import Template from '@/custom_components/layout/Template'

/* import { PublicRoutes } from './PublicRoute' */

/* Make the router  */
export const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/template-test" element={<Template />} />
        <Route path="/ingreso" element={<LoginPageWithAuth />} />
        {/* <Route path="/ingreso" element={<LoginPageWithAuth />} /> */}
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/olvide-mi-contraseña" element={<ForgotPasswordPage />} />
        <Route
          path="/inscripcion/:idCourse"
          element={<CourseEnrollmentPage />}
        />
        <Route
          path="/inscripcion/:courseName/:idCourse"
          element={<CourseEnrollmentPage />}
        />
        <Route path="/dash2" element={<DashboardConSidebars />} />
        {/* <Route path="/dash3" element={<AdminDashboardEducativo />} /> */}

        <Route
          path="panel-administrativo"
          element={
            <PrivateRoutes>
              <MainAdminDashboardWithAuth />
            </PrivateRoutes>
          }
        >
          {/* Redirige la raíz de "panel-administrativo" a "inicio" */}
          <Route index element={<Navigate to="inicio" />} />
          <Route path="inicio" element={<DashBoardHomePage />} />
          <Route path="cursos" element={<CoursePage />} />
          <Route path="cursos/:idCourse" element={<EnrollmentByCourse />} />
          <Route path="cursos/crear-curso" element={<CreateCoursePage />} />
          <Route
            path="cursos/modificar-curso/:idCourse"
            element={<CreateCoursePage />}
          />
          <Route path="cursos/:idCourse" element={<EnrollmentByCourse />} />
          <Route path="notificaciones" element={<NotificationsPage />} />
          <Route path="estudiantes" element={<StudentsPage />} />
          <Route path="profesores" element={<ProfessorsPage />} />
          <Route path="pagos" element={<PaymentsPage />} />
          <Route path="pagos/:idPayment" element={<PaymentsDetailPage />} />
          <Route path="configuraciones" element={<SettingsPage />} />
          <Route path="notificaciones" element={<NotificationsPage />} />
          <Route
            path="perfil-estudiante/:idStudent"
            element={<ProfileStudentPage />}
          />

          <Route path="*" element={<Navigate to="inicio" />} />
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
