export interface EditEduLanguageType {
    id_languageofedu: number;
    languageofedu: string;
}

export interface NewFieldsType {
    title?: string | null;
}

export interface EditEduLanguageErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface EditEduLanguageErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface EditEduLanguageErrorDataBaseGeneral {
    'message': string,
}

export interface EditEduLanguageErrorDataBase {
    'validation': EditEduLanguageErrorDataBaseValidation[];
    'general': EditEduLanguageErrorDataBaseGeneral[];
}

export interface EditEduLanguageErrors {
    errors?: EditEduLanguageErrorApi[] | EditEduLanguageErrorDataBase;
    status: number;
}

export interface EditEduLanguageSchema {
    data?: EditEduLanguageType;
    newFields?: NewFieldsType;
    isLoading: boolean;
    errors?: EditEduLanguageErrors;
}
