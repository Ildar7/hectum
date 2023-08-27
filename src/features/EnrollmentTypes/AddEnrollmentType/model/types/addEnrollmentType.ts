export interface AddEnrollmentTypeType {
    title: string | null;
}

export interface AddEnrollmentTypeErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface AddEnrollmentTypeErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface AddEnrollmentTypeErrorDataBaseGeneral {
    'message': string,
}

export interface AddEnrollmentTypeErrorDataBase {
    'validation': AddEnrollmentTypeErrorDataBaseValidation[];
    'general': AddEnrollmentTypeErrorDataBaseGeneral[];
}

export interface AddEnrollmentTypeErrors {
    errors?: AddEnrollmentTypeErrorApi[] | AddEnrollmentTypeErrorDataBase;
    status: number;
}

export interface AddEnrollmentTypeSchema {
    data: AddEnrollmentTypeType;
    isLoading: boolean;
    errors?: AddEnrollmentTypeErrors;
}
