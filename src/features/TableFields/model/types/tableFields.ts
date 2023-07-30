export interface TableFieldsType {
    student_birth_date: boolean;
    student_gender: boolean;
    student_nationality: boolean;
    student_citizenship: boolean;
    student_phone_number: boolean;
    student_edu_speciality: boolean;
    student_edu_classifier: boolean;
    student_study_duration: boolean;
    student_study_course: boolean;
    student_edu_form: boolean;
    student_arrival_date: boolean;
    student_enrollment_type: boolean;
    student_is_arrival_from: boolean;
    student_is_finished_edu_type: boolean;
    student_edu_lang: boolean;
    student_is_has_access_to_exams: boolean;
    student_residence_type: boolean;
    student_residential_address: boolean;
    student_temporary_residence_add: boolean;
    student_is_need_hostel_type: boolean;
    student_is_live_at_hostel: boolean;
    student_financing_source_type: boolean;
    student_quota: boolean;
    student_is_orphan: boolean;
    student_is_without_parental_care: boolean;
    student_is_disabled_person: boolean;
    student_material_assistance_type: boolean;
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
}

export interface TableFieldsSchema {
    data?: TableFieldsType;
}
