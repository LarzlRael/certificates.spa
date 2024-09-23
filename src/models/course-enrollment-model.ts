// To parse this data:
//
//   import { Convert, CourseEnrollmentModel } from "./file";
//
//   const courseEnrollmentModel = Convert.toCourseEnrollmentModel(json);

export interface CourseEnrollmentModel {
  id:                 number;
  courseName:         string;
  courseDescription:  string;
  coursePrice:        number;
  startDate:          Date;
  endDate:            Date;
  duration:           number;
  durationUnit:       string;
  modality:           string;
  imageUrl:           string;
  publicImageId:      string;
  requirements:       string;
  material:           null;
  informationContact: string;
  notes:              string;
  status:             string;
  professors:         Professor[];
  form:               Form;
}

export interface Form {
  id:     number;
  name:   string;
  fields: Field[];
}

export interface Field {
  id:          number;
  name:        string;
  type:        string;
  placeholder: null;
  label:       string;
  value:       null;
}

export interface Professor {
  id:                number;
  professionalTitle: string;
  expertise:         string;
  user:              User;
}

export interface User {
  id:              number;
  username:        string;
  email:           string;
  firstName:       null | string;
  lastName:        null;
  location:        null;
  password:        string;
  createdAt:       Date;
  authStrategy:    string;
  phone:           null;
  profileImageUrl: null;
  profileImageId:  null;
  shippingAddress: null;
  address:         null;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCourseEnrollmentModel(json: string): CourseEnrollmentModel {
      return JSON.parse(json);
  }

  public static courseEnrollmentModelToJson(value: CourseEnrollmentModel): string {
      return JSON.stringify(value);
  }
}
