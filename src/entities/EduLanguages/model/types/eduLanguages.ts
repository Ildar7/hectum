export interface EduLanguagesType {
    id_languageofedu: number;
    languageofedu: string;
}

export interface EduLanguagesPagination {
    total_records: number;
    current_page: number;
    total_pages: number;
    next_page: number | null;
    prev_page: number | null;
}
export interface EduLanguagesData {
    data: EduLanguagesType[];
    pagination: EduLanguagesPagination | null;
}

export interface EduLanguagesError {
    status: number;
    error: string;
}
export interface EduLanguagesSchema {
    data?: EduLanguagesData;
    isLoading: boolean;
    error?: EduLanguagesError;
    page: string;
    limit: string;
}
