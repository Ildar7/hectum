export interface AddStudyDirectionType {
    title: string | null;
}

export interface AddStudyDirectionErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface AddStudyDirectionErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface AddStudyDirectionErrorDataBaseGeneral {
    'message': string,
}

export interface AddStudyDirectionErrorDataBase {
    'validation': AddStudyDirectionErrorDataBaseValidation[];
    'general': AddStudyDirectionErrorDataBaseGeneral[];
}

export interface AddStudyDirectionErrors {
    errors?: AddStudyDirectionErrorApi[] | AddStudyDirectionErrorDataBase;
    status: number;
}

export interface AddStudyDirectionSchema {
    data: AddStudyDirectionType;
    isLoading: boolean;
    errors?: AddStudyDirectionErrors;
}
