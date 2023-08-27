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
    student_phone_number: string;
    student_residential_address: string;
    student_temporary_residence_address: string;
    student_is_has_access_to_exams: boolean;
    student_is_live_at_hostel: boolean;
    student_is_orphan: boolean;
    student_is_without_parental_care: boolean;
    student_is_disabled_person: boolean;
    student_is_from_young_family: boolean;
    student_is_study_in_dual_system: boolean;
    student_is_study_in_serpin: boolean;
    student_is_study_in_productive_employment: boolean;
    student_is_completed_training_at_competence_center: boolean;
    student_is_study_in_worldskills: boolean;
    student_is_involved_in_social_activities: boolean;
    student_is_in_youth_affairs_committee: boolean;
    student_in_student_parliament: boolean;
    student_in_jas_sarbaz: boolean;
    student_gender: number | null;
    student_nationality: number | null;
    student_edu_speciality: number | null;
    student_citizenship: number | null;
    student_edu_classifier: number | null;
    student_study_duration: string[];
    student_study_course: string[];
    student_edu_form: number | null;
    student_enrollment_type: number | null;
    student_is_arrival_from: number | null;
    student_is_finished_edu_type: number | null;
    student_edu_lang: number | null;
    student_residence_type: number | null;
    student_is_need_hostel_type: string[];
    student_financing_source_type: string[];
    student_quota: string[];
    student_material_assistance_type: string[];
}

export interface ClearedFiltersType {
    student_birth_date_from?: string | null;
    student_birth_date_to?: string | null;
    student_arrival_date_from?: string | null;
    student_arrival_date_to?: string | null;
    student_phone_number?: string;
    student_residential_address?: string;
    student_temporary_residence_address?: string;
    student_is_has_access_to_exams?: boolean;
    student_is_live_at_hostel?: boolean;
    student_is_orphan?: boolean;
    student_is_without_parental_care?: boolean;
    student_is_disabled_person?: boolean;
    student_is_from_young_family?: boolean;
    student_is_study_in_dual_system?: boolean;
    student_is_study_in_serpin?: boolean;
    student_is_study_in_productive_employment?: boolean;
    student_is_completed_training_at_competence_center?: boolean;
    student_is_study_in_worldskills?: boolean;
    student_is_involved_in_social_activities?: boolean;
    student_is_in_youth_affairs_committee?: boolean;
    student_in_student_parliament?: boolean;
    student_in_jas_sarbaz?: boolean;
    student_gender?: number | null;
    student_nationality?: number | null;
    student_edu_speciality?: number | null;
    student_citizenship?: number | null;
    student_edu_classifier?: number | null;
    student_study_duration?: number[] | string[];
    student_study_course?: number[] | string[];
    student_edu_form?: number | null;
    student_enrollment_type?: number | null;
    student_is_arrival_from?: number | null;
    student_is_finished_edu_type?: number | null;
    student_edu_lang?: number | null;
    student_residence_type?: number | null;
    student_is_need_hostel_type?: number[] | string[];
    student_financing_source_type?: number[] | string[];
    student_quota?: number[] | string[];
    student_material_assistance_type?: number[] | string[];
}

export interface TableFiltersSelectedSchema {
    data: TableFiltersSelectedType;
}
