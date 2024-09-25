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
  username:        null | string;
  firstName:       null | string;
  lastName:        null | string;
  profileImageUrl: null | string;
  email:           null | string;
  address:         null | string;
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
