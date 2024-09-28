import { UserStudent } from "./students.interface";

export interface ProfessorInterface {
  id:                number;
  professionalTitle: string;
  expertise:         string;
  user:              UserStudent;
}

