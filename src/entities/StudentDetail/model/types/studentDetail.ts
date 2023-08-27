import { StudentsType } from 'entities/Students';

export interface StudentDetailType extends StudentsType {
    students_id: number;
}

export interface StudentDetailSchema {
    data?: StudentDetailType;
    isLoading: boolean;
    error?: string;
}
