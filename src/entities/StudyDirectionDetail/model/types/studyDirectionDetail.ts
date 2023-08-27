import { StudyDirectionsType } from 'entities/StudyDirections';

export interface StudyDirectionDetailType extends StudyDirectionsType {
    id_typeofdirection: number;
}

export interface StudyDirectionDetailSchema {
    data?: StudyDirectionDetailType;
    isLoading: boolean;
    error?: string;
}
