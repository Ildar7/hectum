export interface EditEnrollmentTypeType {
    id_typeenrollment: number;
    typeenrollment: string;
}

export interface NewFieldsType {
    title?: string | null;
}

export interface EditEnrollmentTypeErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface EditEnrollmentTypeErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface EditEnrollmentTypeErrorDataBaseGeneral {
    'message': string,
}

export interface EditEnrollmentTypeErrorDataBase {
    'validation': EditEnrollmentTypeErrorDataBaseValidation[];
    'general': EditEnrollmentTypeErrorDataBaseGeneral[];
}

export interface EditEnrollmentTypeErrors {
    errors?: EditEnrollmentTypeErrorApi[] | EditEnrollmentTypeErrorDataBase;
    status: number;
}

export interface EditEnrollmentTypeSchema {
    data?: EditEnrollmentTypeType;
    newFields?: NewFieldsType;
    isLoading: boolean;
    errors?: EditEnrollmentTypeErrors;
}
