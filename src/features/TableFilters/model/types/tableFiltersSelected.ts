export interface TableFiltersSelectedType {
    gender: string;
    nationality: string;
    speciality: string;
    qualifications: string;
    studyDurations: string[];
    educationsCourses: string[];
    educationsForms: string;
    enrollmentTypes: string;
    studentArrivalSources: string;
    finishedEducationTypes: string;
    studyLanguages: string;
    residenceTypes: string;
    needHostelTypes: string[];
    financingSources: string[];
    admissionQuotasTypes: string[];
    materialAssistanceTypes: string[];
}

export interface TableFiltersSelectedSchema {
    data: TableFiltersSelectedType;
}
