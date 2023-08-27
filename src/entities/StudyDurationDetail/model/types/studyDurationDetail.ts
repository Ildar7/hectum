import { StudyDurationsType } from 'entities/StudyDurations';

export interface StudyDurationDetailType extends StudyDurationsType {
    id_durationoftraining: number;
}

export interface StudyDurationDetailSchema {
    data?: StudyDurationDetailType;
    isLoading: boolean;
    error?: string;
}
