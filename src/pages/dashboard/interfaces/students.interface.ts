// To parse this data:
//
//   import { Convert } from "./file";
//
//   const student = Convert.toStudent(json);

export interface Student {
  id:   number;
  user: UserStudent;
}

export interface UserStudent {
  id:              number;
  username:        string;
  firstName:       null | string;
  lastName:        null | string;
  profileImageUrl: null | string;
  email:           null | string;
  address:         null | string;
  phone:           null | string;
  createdAt:       string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toStudent(json: string): Student[] {
      return JSON.parse(json);
  }

  public static studentToJson(value: Student[]): string {
      return JSON.stringify(value);
  }
}

export interface UserStudentDetail {
  id:              number;
  idStudent:       number;
  username:        string;
  firstName:       string;
  lastName:        string;
  email:           string;
  phone:           string;
  createdAt:       Date;
  profileImageUrl: string;
  address:         null;
  roles:           Role[];
}

export interface Role {
  id:   number;
  name: string;
}
