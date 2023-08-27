export interface EditEduCourseType {
    id_courseoftraining: number;
    courseoftraining: string;
    coursevalue: number;
}

export interface NewFieldsType {
    title?: string | null;
    value?: string | null;
}

export interface EditEduCourseErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface EditEduCourseErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface EditEduCourseErrorDataBaseGeneral {
    'message': string,
}

export interface EditEduCourseErrorDataBase {
    'validation': EditEduCourseErrorDataBaseValidation[];
    'general': EditEduCourseErrorDataBaseGeneral[];
}

export interface EditEduCourseErrors {
    errors?: EditEduCourseErrorApi[] | EditEduCourseErrorDataBase;
    status: number;
}

export interface EditEduCourseSchema {
    data?: EditEduCourseType;
    newFields?: NewFieldsType;
    isLoading: boolean;
    errors?: EditEduCourseErrors;
}
