export interface StudyDirectionsType {
    id_typeofdirection: number;
    typeofdirection: string;
}

export interface StudyDirectionsPagination {
    total_records: number;
    current_page: number;
    total_pages: number;
    next_page: number | null;
    prev_page: number | null;
}
export interface StudyDirectionsData {
    data: StudyDirectionsType[];
    pagination: StudyDirectionsPagination | null;
}

export interface StudyDirectionsError {
    status: number;
    error: string;
}
export interface StudyDirectionsSchema {
    data?: StudyDirectionsData;
    isLoading: boolean;
    error?: StudyDirectionsError;
    page: string;
    limit: string;
}
