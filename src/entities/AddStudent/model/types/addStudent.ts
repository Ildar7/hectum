export interface TabsType {
    id: number;
    title: string;
    color: string;
    active: boolean;
}

export interface AddStudentType {
    'login': string;
    'password': string;
    'email': string;
    'first_name': string;
    'last_name': string;
    'patronymic': string;
    'govid': string;
    'govid_serial': string;
    'govid_issue_date': string;
    'birth_date': string;
    'reason_for_missing_govid_id': null;
    'gender_id': string;
    'citizenship_id': string;
    'nationality_id': string;
    'residential_address': string;
    'temporary_residence_address': string;
    'enrollment_type_id': string | null;
    'arrival_date': string;
    'is_arrival_from_id': string | null;
    'phone_number': string;
    'is_finished_edu_type_id': string | null;
    'residence_type_id': string | null;
    'study_duration_id': string | null;
    'study_course_id': string | null;
    'edu_lang_id': string | null;
    'edu_form_id': string | null;
    'edu_speciality_id': string | null;
    'edu_classifier_id': string | null;
    'is_study_in_dual_system': boolean;
    'is_study_in_serpin': boolean;
    'is_study_in_productive_employment': boolean;
    'is_completed_training_at_competence_center': boolean;
    'is_study_in_worldskills': boolean;
    'is_need_hostel_type_id': string | null;
    'is_live_at_hostel': boolean;
    'financing_source_type_id': string | null;
    'quota_id': string | null;
    'is_involved_in_social_activities': boolean;
    'is_in_youth_affairs_committee': boolean;
    'in_student_parliament': boolean;
    'in_jas_sarbaz': boolean;
    'is_orphan': boolean;
    'is_without_parental_care': boolean;
    'is_disabled_person': boolean;
    'material_assistance_type_id': string | null;
    'is_from_young_family': boolean;
}

export interface AddStudentSchema {
    data: AddStudentType;
}
