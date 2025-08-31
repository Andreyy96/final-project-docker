import { CourseEnum } from "../enums/course.enum";
import { CourseFormatEnum } from "../enums/course-format.enum";
import { CourseTypeEnum } from "../enums/course-type.enum";
import { StatusEnum } from "../enums/status.enum";

export interface IQuery {
  age?: string;
  course?: CourseEnum;
  course_format?: CourseFormatEnum;
  course_type?: CourseTypeEnum;
  email?: string;
  end_date?: string;
  group?: string;
  manager?: string;
  name?: string;
  order?: string;
  page?: string;
  phone?: string;
  start_date?: string;
  status?: StatusEnum;
  surname?: string;
}
