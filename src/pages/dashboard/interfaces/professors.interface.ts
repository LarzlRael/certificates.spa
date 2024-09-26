export interface ProfessorInterface {
  id:                number;
  professionalTitle: string;
  expertise:         string;
  user:              User;
}

interface User {
  id:        number;
  username:  string;
  email:     string;
  firstName: null | string;
  lastName:  null | string;
  profileImageUrl:  null | string;
}
