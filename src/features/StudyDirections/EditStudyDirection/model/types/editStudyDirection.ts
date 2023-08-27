export interface EditStudyDirectionType {
    id_typeofdirection: number;
    typeofdirection: string;
}

export interface NewFieldsType {
    title?: string | null;
}

export interface EditStudyDirectionErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface EditStudyDirectionErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface EditStudyDirectionErrorDataBaseGeneral {
    'message': string,
}

export interface EditStudyDirectionErrorDataBase {
    'validation': EditStudyDirectionErrorDataBaseValidation[];
    'general': EditStudyDirectionErrorDataBaseGeneral[];
}

export interface EditStudyDirectionErrors {
    errors?: EditStudyDirectionErrorApi[] | EditStudyDirectionErrorDataBase;
    status: number;
}

export interface EditStudyDirectionSchema {
    data?: EditStudyDirectionType;
    newFields?: NewFieldsType;
    isLoading: boolean;
    errors?: EditStudyDirectionErrors;
}
