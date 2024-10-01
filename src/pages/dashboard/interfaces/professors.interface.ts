import { UserStudent } from "./students.interface";

export interface ProfessorInterface extends UserStudent {
  idProfessor:        number;
  professionalTitle:  string;
  expertise:          string;
}
