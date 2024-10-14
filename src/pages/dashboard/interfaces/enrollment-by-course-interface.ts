import { UserStudentDetail } from "./students.interface";

export interface EnrollmentByCourses {
  courseId: number;
  courseName: string;
  students: UserStudentDetail[];
}
export const extractOnlyStudents = (
  enrollmentByCourses: EnrollmentByCourses
): UserStudentDetail[] => {
  return enrollmentByCourses.students;
};
/* export interface Student {
  id:              number;
  idStudent:       number;
  username:        string;
  firstName:       string;
  lastName:        string;
  email:           string;
  phone:           string;
  dateBirth:       Date;
  dni:             string;
  createdAt:       Date;
  profileImageUrl: null | string;
  address:         string;
}
 */
