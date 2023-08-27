export interface AddFinishedEduTypeType {
    title: string | null;
}

export interface AddFinishedEduTypeErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface AddFinishedEduTypeErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface AddFinishedEduTypeErrorDataBaseGeneral {
    'message': string,
}

export interface AddFinishedEduTypeErrorDataBase {
    'validation': AddFinishedEduTypeErrorDataBaseValidation[];
    'general': AddFinishedEduTypeErrorDataBaseGeneral[];
}

export interface AddFinishedEduTypeErrors {
    errors?: AddFinishedEduTypeErrorApi[] | AddFinishedEduTypeErrorDataBase;
    status: number;
}

export interface AddFinishedEduTypeSchema {
    data: AddFinishedEduTypeType;
    isLoading: boolean;
    errors?: AddFinishedEduTypeErrors;
}
