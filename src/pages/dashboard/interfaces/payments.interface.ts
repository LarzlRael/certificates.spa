
 export interface PaymentTableInterface {
  id:           number;
  amount:       string;
  createdAt:    Date;
  status:       string;
  enrollmentId: number;
  formId:       number;
  studentId:    number;
  fullName:     string;
  courseId:     number;
  courseName:   string;
}
