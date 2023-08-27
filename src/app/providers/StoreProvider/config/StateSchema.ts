import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { To } from '@remix-run/router';
import { NavigateOptions } from 'react-router/dist/lib/context';
import { SidebarSchema } from 'widgets/Sidebar';
import { TableFiltersSchema, TableFiltersSelectedSchema } from 'features/TableFilters';
import { TableFieldsSchema } from 'features/TableFields';
import { AddStudentSchema } from 'features/Students/AddStudent';
import { EditStudentSchema } from 'features/Students/EditStudent';
import { StudentDetailSchema } from 'entities/StudentDetail';
import { LoginSchema } from 'features/Login';
import { UserSchema } from 'entities/User';
import { TableSortSchema } from 'features/TableSort';
import { StudentsSchema } from 'entities/Students';
import { ImportStudentsSchema } from 'features/Students/ImportStudents';
import { EnrollmentTypesSchema } from 'entities/EnrollmentTypes';
import { AddEnrollmentTypeSchema } from 'features/EnrollmentTypes/AddEnrollmentType';
import { EnrollmentTypeDetailSchema } from 'entities/EnrollmentTypeDetail';
import { EditEnrollmentTypeSchema } from 'features/EnrollmentTypes/EditEnrollmentType';
import { CitizenshipSchema } from 'entities/Citizenship';
import { CitizenshipDetailSchema } from 'entities/CitizenshipDetail';
import { AddCitizenshipSchema } from 'features/Citizenship/AddCitizenship';
import { EditCitizenshipSchema } from 'features/Citizenship/EditCitizenship';
import { NationalitiesSchema } from 'entities/Nationalities';
import { NationalityDetailSchema } from 'entities/NationalityDetail';
import { EditNationalitySchema } from 'features/Nationalities/EditNationality';
import { AddNationalitySchema } from 'features/Nationalities/AddNationality';
import { EduLanguagesSchema } from 'entities/EduLanguages';
import { EduLanguageDetailSchema } from 'entities/EduLanguageDetail';
import { EditEduLanguageSchema } from 'features/EduLanguages/EditEduLanguage';
import { AddEduLanguageSchema } from 'features/EduLanguages/AddEduLanguage';
import { FinishedEduTypesSchema } from 'entities/FinishedEduTypes';
import { FinishedEduTypeDetailSchema } from 'entities/FinishedEduTypeDetail/model/types/finishedEduTypeDetail';
import { AddFinishedEduTypeSchema } from 'features/FinishedEduTypes/AddFinishedEduType';
import { EditFinishedEduTypeSchema } from 'features/FinishedEduTypes/EditFinishedEduType';
import { EduCoursesSchema } from 'entities/EduCourses';
import { EduCourseDetailSchema } from 'entities/EduCourseDetail/model/types/eduCourseDetail';
import { AddEduCourseSchema } from 'features/EduCourses/AddEduCourse';
import { EditEduCourseSchema } from 'features/EduCourses/EditEduCourse';
import { StudyDirectionsSchema } from 'entities/StudyDirections';
import { StudyDirectionDetailSchema } from 'entities/StudyDirectionDetail';
import { AddStudyDirectionSchema } from 'features/StudyDirections/AddStudyDirection';
import { EditStudyDirectionSchema } from 'features/StudyDirections/EditStudyDirection';
import { StudyDurationsSchema } from 'entities/StudyDurations';
import { StudyDurationDetailSchema } from 'entities/StudyDurationDetail/model/types/studyDurationDetail';
import { AddStudyDurationSchema } from 'features/StudyDurations/AddStudyDuration';
import { EditStudyDurationSchema } from 'features/StudyDurations/EditStudyDuration';
import { QualificationsSchema } from 'entities/Qualifications';
import { QualificationDetailSchema } from 'entities/QualificationDetail';
import { AddQualificationSchema } from 'features/Qualifications/AddQualification';
import { EditQualificationSchema } from 'features/Qualifications/EditQualification';

export interface StateSchema {
    sidebar: SidebarSchema;
    user: UserSchema;
    students: StudentsSchema;
    tableSort: TableSortSchema;
    tableFiltersSelected: TableFiltersSelectedSchema;

    // async-reducers
    tableFilters?: TableFiltersSchema;
    tableFields?: TableFieldsSchema;
    addNewStudent?: AddStudentSchema;
    editStudent?: EditStudentSchema;
    studentDetail?: StudentDetailSchema;
    login?: LoginSchema;
    importStudents?: ImportStudentsSchema;
    enrollmentTypes?: EnrollmentTypesSchema;
    addEnrollmentType?: AddEnrollmentTypeSchema;
    enrollmentTypeDetail?: EnrollmentTypeDetailSchema;
    editEnrollmentType?: EditEnrollmentTypeSchema;
    citizenship?: CitizenshipSchema;
    citizenshipDetail?: CitizenshipDetailSchema;
    addCitizenship?: AddCitizenshipSchema;
    editCitizenship?: EditCitizenshipSchema;
    nationalities?: NationalitiesSchema;
    nationalityDetail?: NationalityDetailSchema;
    addNationality?: AddNationalitySchema;
    editNationality?: EditNationalitySchema;
    eduLanguages?: EduLanguagesSchema;
    eduLanguagesDetail?: EduLanguageDetailSchema;
    editEduLanguage?: EditEduLanguageSchema;
    addEduLanguage?: AddEduLanguageSchema;
    finishedEduTypes?: FinishedEduTypesSchema;
    finishedEduTypesDetail?: FinishedEduTypeDetailSchema;
    addFinishedEduType?: AddFinishedEduTypeSchema;
    editFinishedEduType?: EditFinishedEduTypeSchema;
    eduCourses?: EduCoursesSchema;
    eduCourseDetail?: EduCourseDetailSchema;
    addEduCourse?: AddEduCourseSchema;
    editEduCourse?: EditEduCourseSchema;
    studyDirections?: StudyDirectionsSchema;
    studyDirectionDetail?: StudyDirectionDetailSchema;
    addStudyDirection?: AddStudyDirectionSchema;
    editStudyDirection?: EditStudyDirectionSchema;
    studyDurations?: StudyDurationsSchema;
    studyDurationDetail?: StudyDurationDetailSchema;
    addStudyDuration?: AddStudyDurationSchema;
    editStudyDuration?: EditStudyDurationSchema;
    qualifications?: QualificationsSchema;
    qualificationDetail?: QualificationDetailSchema;
    addQualification?: AddQualificationSchema;
    editQualification?: EditQualificationSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
}
