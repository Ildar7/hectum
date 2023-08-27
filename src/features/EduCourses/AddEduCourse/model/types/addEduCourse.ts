export interface AddEduCourseType {
    title: string | null;
    value: string | null;
}

export interface AddEduCourseErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface AddEduCourseErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface AddEduCourseErrorDataBaseGeneral {
    'message': string,
}

export interface AddEduCourseErrorDataBase {
    'validation': AddEduCourseErrorDataBaseValidation[];
    'general': AddEduCourseErrorDataBaseGeneral[];
}

export interface AddEduCourseErrors {
    errors?: AddEduCourseErrorApi[] | AddEduCourseErrorDataBase;
    status: number;
}

export interface AddEduCourseSchema {
    data: AddEduCourseType;
    isLoading: boolean;
    errors?: AddEduCourseErrors;
}
