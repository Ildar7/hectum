import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudentDetailType } from 'entities/StudentDetail';
import { format } from 'date-fns';
import { EditStudentSchema } from '../types/editStudent';
import { editStudent } from '../services/editStudent/editStudent';

const initialState: EditStudentSchema = {
    data: undefined,
    newFields: undefined,
    isLoading: false,
    errors: undefined,
};

const editStudentSlice = createSlice({
    name: 'editStudentSlice',
    initialState,
    reducers: {
        setStudentData: (state, action: PayloadAction<StudentDetailType | undefined>) => {
            if (action.payload) {
                state.data = {
                    login: action.payload.user.login,
                    email: action.payload.user.Email,
                    first_name: action.payload.user.first_name,
                    last_name: action.payload.user.last_name,
                    patronymic: action.payload.user.patronymic,
                    govid: action.payload.student_govid,
                    govid_serial: action.payload.student_govid_serial,
                    govid_issue_date: action.payload.student_govid_issue_date
                        ? format(new Date(action.payload.student_govid_issue_date), 'dd.MM.yyyy')
                        : '',
                    birth_date: action.payload.student_birth_date
                        ? format(new Date(action.payload.student_birth_date), 'dd.MM.yyyy') : '',
                    reason_for_missing_govid_id: null,
                    gender_id: action.payload.student_gender ? action.payload.student_gender.toString() : null,
                    citizenship_id: action.payload.student_citizenship ? action.payload.student_citizenship.toString() : null,
                    nationality_id: action.payload.student_nationality ? action.payload.student_nationality.toString() : null,
                    residential_address: action.payload.student_residential_address,
                    temporary_residence_address: action.payload.student_temporary_residence_address,
                    enrollment_type_id: action.payload.student_enrollment_type ? action.payload.student_enrollment_type.toString() : null,
                    arrival_date: action.payload.student_arrival_date
                        ? format(new Date(action.payload.student_arrival_date), 'dd.MM.yyyy') : '',
                    is_arrival_from_id: action.payload.student_is_arrival_from ? action.payload.student_is_arrival_from.toString() : null,
                    phone_number: action.payload.student_phone_number,
                    is_finished_edu_type_id:
                        action.payload.student_is_finished_edu_type ? action.payload.student_is_finished_edu_type.toString() : null,
                    residence_type_id: action.payload.student_residence_type ? action.payload.student_residence_type.toString() : null,
                    study_duration_id: action.payload.student_study_duration ? action.payload.student_study_duration.toString() : null,
                    study_course_id: action.payload.student_study_course ? action.payload.student_study_course.toString() : null,
                    edu_lang_id: action.payload.student_edu_lang ? action.payload.student_edu_lang.toString() : null,
                    edu_form_id: action.payload.student_edu_form ? action.payload.student_edu_form.toString() : null,
                    edu_speciality_id: action.payload.student_edu_speciality ? action.payload.student_edu_speciality.toString() : null,
                    edu_classifier_id: action.payload.student_edu_classifier ? action.payload.student_edu_classifier.toString() : null,
                    is_study_in_dual_system: action.payload.student_is_study_in_dual_system,
                    is_study_in_serpin: action.payload.student_is_study_in_serpin,
                    is_study_in_productive_employment: action.payload.student_is_study_in_productive_employment,
                    is_completed_training_at_competence_center: action.payload.student_is_completed_training_at_competence_center,
                    is_study_in_worldskills: action.payload.student_is_study_in_worldskills,
                    is_need_hostel_type_id:
                        action.payload.student_is_need_hostel_type ? action.payload.student_is_need_hostel_type.toString() : null,
                    is_live_at_hostel: action.payload.student_is_live_at_hostel,
                    financing_source_type_id:
                        action.payload.student_financing_source_type ? action.payload.student_financing_source_type.toString() : null,
                    quota_id: action.payload.student_quota ? action.payload.student_quota.toString() : null,
                    is_involved_in_social_activities: action.payload.student_is_involved_in_social_activities,
                    is_in_youth_affairs_committee: action.payload.student_is_in_youth_affairs_committee,
                    in_student_parliament: action.payload.student_in_student_parliament,
                    in_jas_sarbaz: action.payload.student_in_jas_sarbaz,
                    is_orphan: action.payload.student_is_orphan,
                    is_without_parental_care: action.payload.student_is_without_parental_care,
                    is_disabled_person: action.payload.student_is_disabled_person,
                    material_assistance_type_id:
                        action.payload.student_material_assistance_type ? action.payload.student_material_assistance_type.toString() : null,
                    is_from_young_family: action.payload.student_is_from_young_family,
                };
                state.newFields = state.data;
            }
        },
        setInputData: (state, action) => {
            if (!action.payload[1]) {
                state.newFields = {
                    ...state.newFields,
                    [action.payload[0]]: null,
                };
            } else {
                state.newFields = {
                    ...state.newFields,
                    [action.payload[0]]: action.payload[1],
                };
            }
        },
        clearNewFields: (state) => {
            state.newFields = state.data;
            state.errors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editStudent.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(editStudent.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(editStudent.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: editStudentActions } = editStudentSlice;
export const { reducer: editStudentReducer } = editStudentSlice;
