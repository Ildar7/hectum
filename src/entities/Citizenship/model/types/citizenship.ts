export interface CitizenshipType {
    id_citizenship: number;
    citizenship: string;
    country_id: number;
}

export interface CitizenshipPagination {
    total_records: number;
    current_page: number;
    total_pages: number;
    next_page: number | null;
    prev_page: number | null;
}
export interface CitizenshipData {
    data: CitizenshipType[];
    pagination: CitizenshipPagination | null;
}

export interface CitizenshipError {
    status: number;
    error: string;
}
export interface CitizenshipSchema {
    data?: CitizenshipData;
    isLoading: boolean;
    error?: CitizenshipError;
    page: string;
    limit: string;
}
