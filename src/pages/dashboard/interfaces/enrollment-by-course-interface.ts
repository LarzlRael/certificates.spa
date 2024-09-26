// To parse this data:
//
//   import { Convert, EnrollmentsByCourse } from "./file";
//
//   const enrollmentsByCourse = Convert.toEnrollmentsByCourse(json);

export interface EnrollmentsByCourse {
  id: number
  courseName: string
  forms: Form[]
}

export interface Form {
  id: number
  student: Student
}

export interface Student {
  id: number
  user: User
}

export interface User {
  id: number
  username: string
  email: string
  firstName: null | string
  lastName: null | string
  phone: null | string
  profileImageUrl: null | string
  location: null | string
}

export const extractOnlyStudents = (
  enrollment: EnrollmentsByCourse,
): User[] => {
  return enrollment.forms.map((form) => form.student.user)
}

// Converts JSON strings to/from your types
export class Convert {
  public static toEnrollmentsByCourse(json: string): EnrollmentsByCourse {
    return JSON.parse(json)
  }

  public static enrollmentsByCourseToJson(value: EnrollmentsByCourse): string {
    return JSON.stringify(value)
  }
}
