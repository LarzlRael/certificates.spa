export interface CourseEnrollInterface {
  id:                 number;
  courseName:         string;
  courseDescription:  string;
  coursePrice:        number;
  startDate:          Date;
  endDate:            Date;
  duration:           number;
  durationUnit:       string;
  modality:           null | string;
  imageUrl:           null | string;
  material:           null | string
  informationContact: null | string;
  notes:              string | string;
  virtualPlatform:    string;
  professors:         Professor[];
}

interface Professor {
  id:                number;
  professionalTitle: string;
  expertise:         string;
  user:              User;
}

interface User {
  firstName:       string;
  lastName:        string;
  profileImageUrl: null | string;
}
