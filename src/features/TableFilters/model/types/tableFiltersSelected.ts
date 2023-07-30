interface BirthDateType {
    from: string | null;
    to: string | null;
}

interface ArrivalDateType {
    from: string | null;
    to: string | null;
}

export interface TableFiltersSelectedType {
    birthDate: BirthDateType;
    arrivalDate: ArrivalDateType;
    phoneNumber: string;
    residentialAddress: string;
    temporaryAddress: string;
    hasAccessToExams: boolean;
    liveAtHostel: boolean;
    isOrphan: boolean;
    withoutParentalCare: boolean;
    isDisabledPerson: boolean;
    fromYoungFamily: boolean;
    studyInDualSystem: boolean;
    studyInSerpin: boolean;
    studyInProductiveEmployment: boolean;
    completedTrainingAtCompetenceCenter: boolean;
    studyInWorldskills: boolean;
    involvedInSocialActivities: boolean;
    inYouthAffairsCommittee: boolean;
    inStudentParliament: boolean;
    inJasSarbaz: boolean;
    gender: string;
    nationality: string;
    speciality: string;
    citizenship: string;
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
