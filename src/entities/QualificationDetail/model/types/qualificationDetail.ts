import { QualificationsType } from 'entities/Qualifications';

export interface QualificationDetailType extends QualificationsType {
    id_qual: number;
}

export interface QualificationDetailSchema {
    data?: QualificationDetailType;
    isLoading: boolean;
    error?: string;
}
