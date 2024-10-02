
 export interface PaymentTableInterface {
  id:                   number;
  amount:               string;
  createdAt:            Date;
  enrollmentId:         number;
  status:               string;
  transactionReference: string | null;
  voucherImageUrl:      string | null;
  paymentMethod:        string | null;
  description:          string | null;
  formId:               number;
  studentId:            number;
  fullName:             string;
  courseId:             number;
  courseName:           string;
}


