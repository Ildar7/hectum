export interface StudyDurationsType {
    id_durationoftraining: number;
    durationoftraining: string;
}

export interface StudyDurationsPagination {
    total_records: number;
    current_page: number;
    total_pages: number;
    next_page: number | null;
    prev_page: number | null;
}
export interface StudyDurationsData {
    data: StudyDurationsType[];
    pagination: StudyDurationsPagination | null;
}

export interface StudyDurationsError {
    status: number;
    error: string;
}
export interface StudyDurationsSchema {
    data?: StudyDurationsData;
    isLoading: boolean;
    error?: StudyDurationsError;
    page: string;
    limit: string;
}
