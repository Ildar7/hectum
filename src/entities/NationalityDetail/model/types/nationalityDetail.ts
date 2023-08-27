import { NationalitiesType } from 'entities/Nationalities';

export interface NationalityDetailType extends NationalitiesType {
    id_nationality: number;
}

export interface NationalityDetailSchema {
    data?: NationalityDetailType;
    isLoading: boolean;
    error?: string;
}
