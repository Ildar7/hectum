import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    AdmissionQuotasTypesType,
    EducationsCoursesType,
    EducationsFormsType,
    EnrollmentTypesType, FinancingSourcesType, FinishedEducationTypesType,
    GenderType, MaterialAssistanceTypesType,
    NationalityType, NeedHostelTypesType,
    QualificationsType, ResidenceTypesType,
    SpecialitiesType,
    StudentArrivalSourcesType,
    StudyDurationsType, StudyLanguagesType,
    TableFiltersType,
} from '../../types/TableFilters';

export const fetchTableFilters = createAsyncThunk<TableFiltersType, void, ThunkConfig<string>>(
    'filters/fetchTableFilters',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;

        try {
            const responseGender = await extra.api.get<GenderType[]>('/college/genders/');
            const responseNationality = await extra.api.get<NationalityType[]>('/college/nationalities/');
            const responseSpecialities = await extra.api.get<SpecialitiesType[]>('/college/specialties/');
            const responseQualifications = await extra.api.get<QualificationsType[]>('/college/qualifications/');
            const responseStudyDurations = await extra.api.get<StudyDurationsType[]>('/college/study-durations/');
            const responseEducationsCourses = await extra.api.get<EducationsCoursesType[]>('/college/educations-courses/');
            const responseEducationsForms = await extra.api.get<EducationsFormsType[]>('/college/education-forms/');
            const responseEnrollmentTypes = await extra.api.get<EnrollmentTypesType[]>('/college/enrollment-types/');
            const
                responseStudentArrivalSources = await extra.api.get<
                        StudentArrivalSourcesType[]
                    >('/college/student-arrival-sources/');
            const
                responseFinishedEducationTypes = await extra.api.get<
                    FinishedEducationTypesType[]
                >('/college/finished-education-types/');
            const
                responseStudyLanguages = await extra.api.get<
                    StudyLanguagesType[]
                >('/college/study-languages/');
            const
                responseResidenceTypes = await extra.api.get<
                    ResidenceTypesType[]
                >('/college/residence-types');
            const
                responseNeedHostelTypes = await extra.api.get<
                    NeedHostelTypesType[]
                >('/college/need-hostel-types');
            const
                responseFinancingSources = await extra.api.get<
                    FinancingSourcesType[]
                >('/college/students/financing-sources/');
            const
                responseAdmissionQuotasTypes = await extra.api.get<
                    AdmissionQuotasTypesType[]
                >('/college/admission-quotas-types/');
            const
                responseMaterialAssistanceTypes = await extra.api.get<
                    MaterialAssistanceTypesType[]
                >('/college/material-assistance-types/');

            const data: TableFiltersType = {
                gender: responseGender.data,
                nationality: responseNationality.data,
                speciality: responseSpecialities.data,
                qualifications: responseQualifications.data,
                studyDurations: responseStudyDurations.data,
                educationsCourses: responseEducationsCourses.data,
                educationsForms: responseEducationsForms.data,
                enrollmentTypes: responseEnrollmentTypes.data,
                studentArrivalSources: responseStudentArrivalSources.data,
                finishedEducationTypes: responseFinishedEducationTypes.data,
                studyLanguages: responseStudyLanguages.data,
                residenceTypes: responseResidenceTypes.data,
                needHostelTypes: responseNeedHostelTypes.data,
                financingSources: responseFinancingSources.data,
                admissionQuotasTypes: responseAdmissionQuotasTypes.data,
                materialAssistanceTypes: responseMaterialAssistanceTypes.data,
            };

            return data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
