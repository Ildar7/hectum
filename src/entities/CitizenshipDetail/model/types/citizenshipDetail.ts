import { CitizenshipType } from 'entities/Citizenship';

export interface CitizenshipDetailType extends CitizenshipType {
    id_citizenship: number;
}

export interface CitizenshipDetailSchema {
    data?: CitizenshipDetailType;
    isLoading: boolean;
    error?: string;
}
