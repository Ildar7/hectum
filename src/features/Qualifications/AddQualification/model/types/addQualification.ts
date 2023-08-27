export interface AddQualificationType {
    title: string | null;
    code: string | null;
    speciality_id: string | null;
}

export interface AddQualificationErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface AddQualificationErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface AddQualificationErrorDataBaseGeneral {
    'message': string,
}

export interface AddQualificationErrorDataBase {
    'validation': AddQualificationErrorDataBaseValidation[];
    'general': AddQualificationErrorDataBaseGeneral[];
}

export interface AddQualificationErrors {
    errors?: AddQualificationErrorApi[] | AddQualificationErrorDataBase;
    status: number;
}

export interface AddQualificationSchema {
    data: AddQualificationType;
    isLoading: boolean;
    errors?: AddQualificationErrors;
}
