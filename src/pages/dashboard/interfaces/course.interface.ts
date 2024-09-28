// To parse this data:
//
//   import { Convert } from "./file";
//
//   const coursesDetailModel = Convert.toCoursesDetailModel(json);

export interface CoursesDetailModel {
  id:                number;
  courseName:        string;
  courseDescription: string;
  coursePrice:       number;
  duration:          number;
  durationUnit:      string;
  modality:          string;
  imageUrl:          null | string;
  professors:        Professor[];
}

export interface Professor {
  id:                number;
  professionalTitle: string;
  user:              null|User;
}

export interface User {
  firstName: string|null;
  lastName:  string|null;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCoursesDetailModel(json: string): CoursesDetailModel[] {
      return JSON.parse(json);
  }

  public static coursesDetailModelToJson(value: CoursesDetailModel[]): string {
      return JSON.stringify(value);
  }
}

export interface DashBoardInitialInterface {
  users:      string;
  professors: string;
  courses:    string;
}


export interface CourseInfoInterface {
  id:              number;
  courseName:      string;
  duration:        number;
  imageUrl:        null | string;
  virtualPlatform: null | string;
  professors:      ProfessorCourseInfo[];
  formCount:       number;
}

export interface ProfessorCourseInfo {
  id:                number;
  professionalTitle: string;
  expertise:         string;
  user:              UserProf;
}

export interface UserProf {
  firstName:       string;
  lastName:        string;
  profileImageUrl: null | string;
}
