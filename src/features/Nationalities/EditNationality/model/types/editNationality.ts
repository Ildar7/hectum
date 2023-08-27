export interface EditNationalityType {
    id_nationality: number;
    nationality: string;
}

export interface NewFieldsType {
    title?: string | null;
}

export interface EditNationalityErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface EditNationalityErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface EditNationalityErrorDataBaseGeneral {
    'message': string,
}

export interface EditNationalityErrorDataBase {
    'validation': EditNationalityErrorDataBaseValidation[];
    'general': EditNationalityErrorDataBaseGeneral[];
}

export interface EditNationalityErrors {
    errors?: EditNationalityErrorApi[] | EditNationalityErrorDataBase;
    status: number;
}

export interface EditNationalitySchema {
    data?: EditNationalityType;
    newFields?: NewFieldsType;
    isLoading: boolean;
    errors?: EditNationalityErrors;
}
