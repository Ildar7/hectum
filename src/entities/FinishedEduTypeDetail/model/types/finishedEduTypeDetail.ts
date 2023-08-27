import { FinishedEduTypesType } from 'entities/FinishedEduTypes';

export interface FinishedEduTypeDetailType extends FinishedEduTypesType {
    id_fromacceptedfinished: number;
}

export interface FinishedEduTypeDetailSchema {
    data?: FinishedEduTypeDetailType;
    isLoading: boolean;
    error?: string;
}
