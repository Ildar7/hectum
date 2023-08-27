export interface AddEduLanguageType {
    title: string | null;
}

export interface AddEduLanguageErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface AddEduLanguageErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface AddEduLanguageErrorDataBaseGeneral {
    'message': string,
}

export interface AddEduLanguageErrorDataBase {
    'validation': AddEduLanguageErrorDataBaseValidation[];
    'general': AddEduLanguageErrorDataBaseGeneral[];
}

export interface AddEduLanguageErrors {
    errors?: AddEduLanguageErrorApi[] | AddEduLanguageErrorDataBase;
    status: number;
}

export interface AddEduLanguageSchema {
    data: AddEduLanguageType;
    isLoading: boolean;
    errors?: AddEduLanguageErrors;
}
