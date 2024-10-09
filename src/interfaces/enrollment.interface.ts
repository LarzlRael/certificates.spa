export interface EnrollmentByUser {
  id:             number;
  enrollmentDate: Date;
  form:           Form;
  payments:       Payment[];
}

export interface Form {
  id:              number;
  educationalCore: string | null;
  district:        string | null;
  role:            string | null;
  department:      string | null;
  typeRole:        string | null;
  federation:      string | null;
  defaultField1:   null;
  defaultField2:   null;
  course:          Course;
}

export interface Course {
  id:                number;
  courseName:        string;
  courseDescription: string | null;
  imageUrl:          string | null;
}

export interface EnrollmentMapped {
  id: number;
  enrollmentDate: Date;
  educationalCore: string | null;
  district: string | null;
  role: string | null;
  department: string | null;
  typeRole: string | null;
  federation: string | null;
  courseId: number;
  courseName: string;
  courseDescription: string | null;
  imageUrl: string | null;
  payments: Payment[];
}

// Función para realizar el mapeo
export const mapEnrollment = (enrollment: EnrollmentByUser): EnrollmentMapped => {
  const { id, enrollmentDate, form } = enrollment;
  const { educationalCore, district, role, department, typeRole, federation, course } = form;
  
  return {
    id,
    enrollmentDate,
    educationalCore,
    district,
    role,
    department,
    typeRole,
    federation,
    courseId: course.id,
    courseName: course.courseName,
    courseDescription: course.courseDescription,
    imageUrl: course.imageUrl,
    payments: enrollment.payments,
  };
};



export interface Payment {
  id:     number;
  amount: null | string;
}
