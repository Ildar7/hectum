export interface QualificationsType {
    id_qual: number;
    shifr_qual: string;
    qualification: string;
    specialty_id: number;
}

export interface QualificationsPagination {
    total_records: number;
    current_page: number;
    total_pages: number;
    next_page: number | null;
    prev_page: number | null;
}
export interface QualificationsData {
    data: QualificationsType[];
    pagination: QualificationsPagination | null;
}

export interface QualificationsError {
    status: number;
    error: string;
}
export interface QualificationsSchema {
    data?: QualificationsData;
    isLoading: boolean;
    error?: QualificationsError;
    page: string;
    limit: string;
}
