export interface GenderType {
    id_gender: number;
    gender: string;
}

export interface NationalityType {
    id_nationality: number;
    nationality: string;
}

export interface SpecialitiesType {
    id_spec: number;
    shifr_spec: string;
    speciality: string;
}

export interface QualificationsType {
    'id_qual': number,
    'shifr_qual': string,
    'qualification': string,
    'specialty_id': number
}

export interface StudyDurationsType {
    'id_durationoftraining': number,
    'durationoftraining': string
}

export interface EducationsCoursesType {
    'id_courseoftraining': number,
    'courseoftraining': string,
    'coursevalue': number
}

export interface EducationsFormsType {
    'id_typeoftraining': number,
    'typeoftraining': string
}

export interface EnrollmentTypesType {
    'id_typeenrollment': number,
    'typeenrollment': string
}

export interface StudentArrivalSourcesType {
    'id_comesfrom': number,
    'comesfrom': string
}

export interface FinishedEducationTypesType {
    'id_fromacceptedfinished': number,
    'fromacceptedfinished': string
}

export interface StudyLanguagesType {
    'id_languageofedu': number,
    'languageofedu': string
}

export interface ResidenceTypesType {
    'id_typeofareaofresidence': number,
    'typeofareaofresidence': string
}

export interface NeedHostelTypesType {
    'id_needhostel': number,
    'needhostel': string
}

export interface FinancingSourcesType {
    'id_whopaying': number,
    'whopaying': string
}

export interface AdmissionQuotasTypesType {
    'id_kvota': number,
    'kvota': string
}

export interface MaterialAssistanceTypesType {
    'id_finimatpomosh': number,
    'finimatpomosh': string
}

export interface CitizenshipTypesType {
    'id_citizenship': number,
    'citizenship': string,
    'country_id': number
}

export interface TableFiltersType {

    gender: GenderType[];
    nationality: NationalityType[];
    speciality: SpecialitiesType[];
    qualifications: QualificationsType[];
    studyDurations: StudyDurationsType[];
    educationsCourses: EducationsCoursesType[];
    educationsForms: EducationsFormsType[];
    enrollmentTypes: EnrollmentTypesType[];
    studentArrivalSources: StudentArrivalSourcesType[];
    finishedEducationTypes: FinishedEducationTypesType[];
    studyLanguages: StudyLanguagesType[];
    residenceTypes: ResidenceTypesType[];
    needHostelTypes: NeedHostelTypesType[];
    financingSources: FinancingSourcesType[];
    admissionQuotasTypes: AdmissionQuotasTypesType[];
    materialAssistanceTypes: MaterialAssistanceTypesType[];
    citizenshipTypes: CitizenshipTypesType[];
}

export interface TableFiltersSchema {
    data?: TableFiltersType;
    isLoading: boolean;
    error?: string;
}
