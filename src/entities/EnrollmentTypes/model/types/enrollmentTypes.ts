export interface EnrollmentTypesType {
    id_typeenrollment: number;
    typeenrollment: string;
}

export interface EnrollmentTypesPagination {
    total_records: number;
    current_page: number;
    total_pages: number;
    next_page: number | null;
    prev_page: number | null;
}
export interface EnrollmentTypesData {
    data: EnrollmentTypesType[];
    pagination: EnrollmentTypesPagination | null;
}

export interface EnrollmentTypesError {
    status: number;
    error: string;
}
export interface EnrollmentTypesSchema {
    data?: EnrollmentTypesData;
    isLoading: boolean;
    error?: EnrollmentTypesError;
    page: string;
    limit: string;
}
