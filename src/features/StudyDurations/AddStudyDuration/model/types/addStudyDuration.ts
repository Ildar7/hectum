export interface AddStudyDurationType {
    title: string | null;
}

export interface AddStudyDurationErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface AddStudyDurationErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface AddStudyDurationErrorDataBaseGeneral {
    'message': string,
}

export interface AddStudyDurationErrorDataBase {
    'validation': AddStudyDurationErrorDataBaseValidation[];
    'general': AddStudyDurationErrorDataBaseGeneral[];
}

export interface AddStudyDurationErrors {
    errors?: AddStudyDurationErrorApi[] | AddStudyDurationErrorDataBase;
    status: number;
}

export interface AddStudyDurationSchema {
    data: AddStudyDurationType;
    isLoading: boolean;
    errors?: AddStudyDurationErrors;
}
