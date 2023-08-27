export interface AddNationalityType {
    title: string | null;
}

export interface AddNationalityErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface AddNationalityErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface AddNationalityErrorDataBaseGeneral {
    'message': string,
}

export interface AddNationalityErrorDataBase {
    'validation': AddNationalityErrorDataBaseValidation[];
    'general': AddNationalityErrorDataBaseGeneral[];
}

export interface AddNationalityErrors {
    errors?: AddNationalityErrorApi[] | AddNationalityErrorDataBase;
    status: number;
}

export interface AddNationalitySchema {
    data: AddNationalityType;
    isLoading: boolean;
    errors?: AddNationalityErrors;
}
