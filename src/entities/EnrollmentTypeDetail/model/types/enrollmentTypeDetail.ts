import { EnrollmentTypesType } from 'entities/EnrollmentTypes';

export interface EnrollmentTypeDetailType extends EnrollmentTypesType {
    id_typeenrollment: number;
}

export interface EnrollmentTypeDetailSchema {
    data?: EnrollmentTypeDetailType;
    isLoading: boolean;
    error?: string;
}
