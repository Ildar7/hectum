export interface NationalitiesType {
    id_nationality: number;
    nationality: string;
}

export interface NationalitiesPagination {
    total_records: number;
    current_page: number;
    total_pages: number;
    next_page: number | null;
    prev_page: number | null;
}
export interface NationalitiesData {
    data: NationalitiesType[];
    pagination: NationalitiesPagination | null;
}

export interface NationalitiesError {
    status: number;
    error: string;
}
export interface NationalitiesSchema {
    data?: NationalitiesData;
    isLoading: boolean;
    error?: NationalitiesError;
    page: string;
    limit: string;
}
