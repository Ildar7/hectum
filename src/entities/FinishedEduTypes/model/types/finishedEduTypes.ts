export interface FinishedEduTypesType {
    id_fromacceptedfinished: number;
    fromacceptedfinished: string;
}

export interface FinishedEduTypesPagination {
    total_records: number;
    current_page: number;
    total_pages: number;
    next_page: number | null;
    prev_page: number | null;
}
export interface FinishedEduTypesData {
    data: FinishedEduTypesType[];
    pagination: FinishedEduTypesPagination | null;
}

export interface FinishedEduTypesError {
    status: number;
    error: string;
}
export interface FinishedEduTypesSchema {
    data?: FinishedEduTypesData;
    isLoading: boolean;
    error?: FinishedEduTypesError;
    page: string;
    limit: string;
}
