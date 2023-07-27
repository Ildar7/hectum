export interface StudentsType {
    'user_id': number,
    'fio': string,
    'students_id': number,
    'student_govid': string,
    'student_birth_date': Date | string,
    'student_reason_for_missing_govid_type': number | null,
    'student_gender': number,
    'student_citizenship': number,
    'student_nationality': number,
    'student_govid_serial': string,
    'student_govid_issue_date': Date | string,
    'student_residential_address': string,
    'student_temporary_residence_address': string,
    'student_enrollment_type': number | null,
    'student_arrival_date': Date | string,
    'student_is_arrival_from': number | null,
    'student_phone_number': string,
    'student_is_finished_edu_type': number | null,
    'student_residence_type': number | null,
    'student_study_duration': number | null,
    'student_study_course': number | null,
    'student_edu_lang': number | null,
    'student_edu_form': number | null,
    'student_edu_speciality': number | null,
    'student_edu_classifier': number | null,
    'student_is_study_in_dual_system': boolean,
    'student_is_study_in_serpin': boolean,
    'student_is_study_in_productive_employment': boolean,
    'student_is_completed_training_at_competence_center': boolean,
    'student_is_study_in_worldskills': boolean,
    'student_is_need_hostel_type': number | null,
    'student_is_live_at_hostel': boolean,
    'student_financing_source_type': number | null,
    'student_quota': number | null,
    'student_is_involved_in_social_activities': boolean,
    'student_is_in_youth_affairs_committee': boolean,
    'student_in_student_parliament': boolean,
    'student_in_jas_sarbaz': boolean,
    'student_is_orphan': boolean,
    'student_is_without_parental_care': boolean,
    'student_is_disabled_person': boolean,
    'student_material_assistance_type': number | null,
    'student_is_from_young_family': boolean,
    'student_is_has_access_to_exams': boolean,
    'user': {
        'user_id': number,
        'login': string,
        'Email': string,
        'first_name': string,
        'last_name': string | null,
        'patronymic': string | null,
        'group': string,
        'createdAt': string,
        'updatedAt': string
    },
    'gender': {
        'id_gender': number,
        'gender': string
    },
    'nationality': {
        'id_nationality': number,
        'nationality': string
    },
    'typeenrollment': {
        'id_typeenrollment': number,
        'typeenrollment': string
    },
    'comesfrom': {
        'id_comesfrom': number,
        'comesfrom': string
    },
    'fromacceptedfinished': {
        'id_fromacceptedfinished': number,
        'fromacceptedfinished': string
    },
    'typeofareaofresidence': {
        'id_typeofareaofresidence': number,
        'typeofareaofresidence': string
    },
    'durationoftraining': {
        'id_durationoftraining': number,
        'durationoftraining': string
    },
    'courseoftraining': {
        'id_courseoftraining': number,
        'courseoftraining': string,
        'coursevalue': number
    },
    'languageofedu': {
        'id_languageofedu': number,
        'languageofedu': string
    },
    'typeoftraining': {
        'id_typeoftraining': number,
        'typeoftraining': string
    },
    'specialty': {
        'id_spec': number,
        'shifr_spec': string,
        'speciality': string
    },
    'qualification': {
        'id_qual': number,
        'shifr_qual': string,
        'qualification': string,
        'specialty_id': number
    },
    'needhostel': {
        'id_needhostel': number,
        'needhostel': string
    },
    'whopaying': {
        'id_whopaying': number,
        'whopaying': string
    },
    'kvotum': {
        'id_kvota': number,
        'kvota': string
    },
    'finimatpomosh': {
        'id_finimatpomosh': number,
        'finimatpomosh': string
    }
}

export interface StudentsSchema {
    data?: StudentsType[];
    isLoading: boolean;
    error?: string;
}
