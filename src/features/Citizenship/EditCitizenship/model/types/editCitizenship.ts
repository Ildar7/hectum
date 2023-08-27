export interface EditCitizenshipType {
    id_citizenship: number;
    citizenship: string;
    country_id: number;
}

export interface NewFieldsType {
    name?: string | null;
    country_id?: number | null;
}

export interface EditCitizenshipErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface EditCitizenshipErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface EditCitizenshipErrorDataBaseGeneral {
    'message': string,
}

export interface EditCitizenshipErrorDataBase {
    'validation': EditCitizenshipErrorDataBaseValidation[];
    'general': EditCitizenshipErrorDataBaseGeneral[];
}

export interface EditCitizenshipErrors {
    errors?: EditCitizenshipErrorApi[] | EditCitizenshipErrorDataBase;
    status: number;
}

export interface EditCitizenshipSchema {
    data?: EditCitizenshipType;
    newFields?: NewFieldsType;
    isLoading: boolean;
    errors?: EditCitizenshipErrors;
}
