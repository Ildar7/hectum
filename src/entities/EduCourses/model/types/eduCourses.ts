export interface EduCoursesType {
    id_courseoftraining: number;
    courseoftraining: string;
    coursevalue: number;
}

export interface EduCoursesPagination {
    total_records: number;
    current_page: number;
    total_pages: number;
    next_page: number | null;
    prev_page: number | null;
}
export interface EduCoursesData {
    data: EduCoursesType[];
    pagination: EduCoursesPagination | null;
}

export interface EduCoursesError {
    status: number;
    error: string;
}
export interface EduCoursesSchema {
    data?: EduCoursesData;
    isLoading: boolean;
    error?: EduCoursesError;
    page: string;
    limit: string;
}
