export interface EditFinishedEduTypeType {
    id_fromacceptedfinished: number;
    fromacceptedfinished: string;
}

export interface NewFieldsType {
    title?: string | null;
}

export interface EditFinishedEduTypeErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface EditFinishedEduTypeErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface EditFinishedEduTypeErrorDataBaseGeneral {
    'message': string,
}

export interface EditFinishedEduTypeErrorDataBase {
    'validation': EditFinishedEduTypeErrorDataBaseValidation[];
    'general': EditFinishedEduTypeErrorDataBaseGeneral[];
}

export interface EditFinishedEduTypeErrors {
    errors?: EditFinishedEduTypeErrorApi[] | EditFinishedEduTypeErrorDataBase;
    status: number;
}

export interface EditFinishedEduTypeSchema {
    data?: EditFinishedEduTypeType;
    newFields?: NewFieldsType;
    isLoading: boolean;
    errors?: EditFinishedEduTypeErrors;
}
