export interface EditStudentType {
    'login': string | null;
    'email': string | null;
    'first_name': string | null;
    'last_name': string | null;
    'patronymic': string | null;
    'govid': string | null;
    'govid_serial': string | null;
    'govid_issue_date': string | null;
    'birth_date': string | null;
    'reason_for_missing_govid_id': null;
    'gender_id': string | null;
    'citizenship_id': string | null;
    'nationality_id': string | null;
    'residential_address': string | null;
    'temporary_residence_address': string | null;
    'enrollment_type_id': string | null;
    'arrival_date': string | null;
    'is_arrival_from_id': string | null;
    'phone_number': string | null;
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

export interface NewFieldsType {
    'login'?: string | null;
    'email'?: string | null;
    'first_name'?: string | null;
    'last_name'?: string | null;
    'patronymic'?: string | null;
    'govid'?: string | null;
    'govid_serial'?: string | null;
    'govid_issue_date'?: string | null;
    'birth_date'?: string | null;
    'reason_for_missing_govid_id'?: null;
    'gender_id'?: string | null;
    'citizenship_id'?: string | null;
    'nationality_id'?: string | null;
    'residential_address'?: string | null;
    'temporary_residence_address'?: string | null;
    'enrollment_type_id'?: string | null;
    'arrival_date'?: string | null;
    'is_arrival_from_id'?: string | null;
    'phone_number'?: string | null;
    'is_finished_edu_type_id'?: string | null;
    'residence_type_id'?: string | null;
    'study_duration_id'?: string | null;
    'study_course_id'?: string | null;
    'edu_lang_id'?: string | null;
    'edu_form_id'?: string | null;
    'edu_speciality_id'?: string | null;
    'edu_classifier_id'?: string | null;
    'is_study_in_dual_system'?: boolean;
    'is_study_in_serpin'?: boolean;
    'is_study_in_productive_employment'?: boolean;
    'is_completed_training_at_competence_center'?: boolean;
    'is_study_in_worldskills'?: boolean;
    'is_need_hostel_type_id'?: string | null;
    'is_live_at_hostel'?: boolean;
    'financing_source_type_id'?: string | null;
    'quota_id'?: string | null;
    'is_involved_in_social_activities'?: boolean;
    'is_in_youth_affairs_committee'?: boolean;
    'in_student_parliament'?: boolean;
    'in_jas_sarbaz'?: boolean;
    'is_orphan'?: boolean;
    'is_without_parental_care'?: boolean;
    'is_disabled_person'?: boolean;
    'material_assistance_type_id'?: string | null;
    'is_from_young_family'?: boolean;
}

export interface EditStudentErrorApi {
    'type': string;
    'value': string;
    'msg': string;
    'path': string;
    'location': string;
}

export interface EditStudentErrorDataBaseValidation {
    'message': string,
    'field': string,
    'type': string,
    'value': string
}

interface EditStudentErrorDataBaseGeneral {
    'message': string,
}

export interface EditStudentErrorDataBase {
    'validation': EditStudentErrorDataBaseValidation[];
    'general': EditStudentErrorDataBaseGeneral[];
}

export interface EditStudentErrors {
    errors?: EditStudentErrorApi[] | EditStudentErrorDataBase;
    status: number;
}

export interface EditStudentSchema {
    data?: EditStudentType;
    newFields?: NewFieldsType;
    isLoading: boolean;
    errors?: EditStudentErrors;
}
