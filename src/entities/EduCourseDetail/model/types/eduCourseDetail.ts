import { EduCoursesType } from 'entities/EduCourses';

export interface EduCourseDetailType extends EduCoursesType {
    id_courseoftraining: number;
}

export interface EduCourseDetailSchema {
    data?: EduCourseDetailType;
    isLoading: boolean;
    error?: string;
}
