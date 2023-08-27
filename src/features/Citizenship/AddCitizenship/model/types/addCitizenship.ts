export interface AddCitizenshipType {
    name: string | null;
    country_id: number | null;
}

export interface AddCitizenshipErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface AddCitizenshipErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface AddCitizenshipErrorDataBaseGeneral {
    'message': string,
}

export interface AddCitizenshipErrorDataBase {
    'validation': AddCitizenshipErrorDataBaseValidation[];
    'general': AddCitizenshipErrorDataBaseGeneral[];
}

export interface AddCitizenshipErrors {
    errors?: AddCitizenshipErrorApi[] | AddCitizenshipErrorDataBase;
    status: number;
}

export interface AddCitizenshipSchema {
    data: AddCitizenshipType;
    isLoading: boolean;
    errors?: AddCitizenshipErrors;
}
