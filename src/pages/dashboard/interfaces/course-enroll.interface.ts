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
  requirements:       null | string
  informationContact: null | string;
  notes:              string | string;
  virtualPlatform:    string;
  professors:         Professor[];
}

interface Professor {
  id:                number;
  professionalTitle: string;
  fullName:          string;
  description:       string;
  profileImageUrl:   null | string;
}

