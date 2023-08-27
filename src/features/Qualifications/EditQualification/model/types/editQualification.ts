export interface EditQualificationType {
    id_qual: number;
    shifr_qual: string;
    qualification: string;
    specialty_id: number;
}

export interface NewFieldsType {
    title?: string | null;
    code?: string | null;
    speciality_id?: string | null;
}

export interface EditQualificationErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface EditQualificationErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface EditQualificationErrorDataBaseGeneral {
    'message': string,
}

export interface EditQualificationErrorDataBase {
    'validation': EditQualificationErrorDataBaseValidation[];
    'general': EditQualificationErrorDataBaseGeneral[];
}

export interface EditQualificationErrors {
    errors?: EditQualificationErrorApi[] | EditQualificationErrorDataBase;
    status: number;
}

export interface EditQualificationSchema {
    data?: EditQualificationType;
    newFields?: NewFieldsType;
    isLoading: boolean;
    errors?: EditQualificationErrors;
}
