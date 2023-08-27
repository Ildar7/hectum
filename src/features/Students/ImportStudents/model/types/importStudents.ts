export interface ImportStudentColumns {
    birthdate: string;
    citizenship: string;
    edu_lang: string;
    email: string;
    first_name: string;
    gender: string;
    govid: string;
    last_name: string;
    nationality: string;
    patronymic: string;
}

export interface ImportStudentsMatchingFieldsType {
    customCsvField: string;
    databaseField: string;
    databaseFieldValue: string;
}

export interface ImportStudentsMatchingFieldsKeys {
    [key: string]: ImportStudentsMatchingFieldsType;
}

export interface ImportStudentsImportedInfo {
    message: string;
    count: number;
}

export interface ImportStudentsSendData {
    columns: string;
    file: File;
}

export interface ImportStudentsSchema {
    databaseFields?: ImportStudentColumns;
    columnsFromFile?: string[];
    matchingFields?: ImportStudentsMatchingFieldsKeys;
    isLoadingFetchFields: boolean;
    errorFetchFields?: string;
    data?: ImportStudentsImportedInfo;
    isLoading: boolean;
    error?: string;
}
