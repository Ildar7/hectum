export interface EditStudyDurationType {
    id_durationoftraining: number;
    durationoftraining: string;
}

export interface NewFieldsType {
    title?: string | null;
}

export interface EditStudyDurationErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface EditStudyDurationErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface EditStudyDurationErrorDataBaseGeneral {
    'message': string,
}

export interface EditStudyDurationErrorDataBase {
    'validation': EditStudyDurationErrorDataBaseValidation[];
    'general': EditStudyDurationErrorDataBaseGeneral[];
}

export interface EditStudyDurationErrors {
    errors?: EditStudyDurationErrorApi[] | EditStudyDurationErrorDataBase;
    status: number;
}

export interface EditStudyDurationSchema {
    data?: EditStudyDurationType;
    newFields?: NewFieldsType;
    isLoading: boolean;
    errors?: EditStudyDurationErrors;
}
