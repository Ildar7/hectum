import { EduLanguagesType } from 'entities/EduLanguages';

export interface EduLanguageDetailType extends EduLanguagesType {
    id_languageofedu: number;
}

export interface EduLanguageDetailSchema {
    data?: EduLanguageDetailType;
    isLoading: boolean;
    error?: string;
}
