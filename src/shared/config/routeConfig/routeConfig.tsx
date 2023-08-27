import { RouteProps } from 'react-router-dom';
import { NotFoundPage } from 'pages/NotFoundPage';
import { MainPage } from 'pages/MainPage';
import React from 'react';
import { StudentsPage } from 'pages/StudentsPage';
import { LoginPage } from 'pages/LoginPage';
import { ImportStudentsPage } from 'pages/ImportStudentsPage';
import { EnrollmentTypesPage } from 'pages/EnrollmentTypesPage';
import { CitizenshipPage } from 'pages/CitizenshipPage';
import { NationalitiesPage } from 'pages/NationalitiesPage';
import { EduLanguagesPage } from 'pages/EduLanguagesPage';
import { FinishedEduTypesPage } from 'pages/FinishedEduTypesPage';
import { EduCoursesPage } from 'pages/EduCoursesPage';
import { StudyDirectionsPage } from 'pages/StudyDirectionsPage';
import { StudyDurationsPage } from 'pages/StudyDurationsPage';
import { QualificationsPage } from 'pages/QualificationsPage';
import {
    AppRoutes,
    getRouteCitizenship, getRouteEduCourses, getRouteEduLanguages,
    getRouteEnrollmentTypes, getRouteFinishedEduTypes,
    getRouteImportStudents,
    getRouteLogin,
    getRouteMain, getRouteNationalities, getRouteQualifications,
    getRouteStudents, getRouteStudyDirections, getRouteStudyDurations,
} from '../../const/router';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
        authOnly: true,
    },
    [AppRoutes.STUDENTS]: {
        path: getRouteStudents(),
        element: <StudentsPage />,
        authOnly: true,
    },
    [AppRoutes.IMPORT_STUDENTS]: {
        path: getRouteImportStudents(),
        element: <ImportStudentsPage />,
        authOnly: true,
    },
    [AppRoutes.ENROLLMENT_TYPES]: {
        path: getRouteEnrollmentTypes(),
        element: <EnrollmentTypesPage />,
        authOnly: true,
    },
    [AppRoutes.CITIZENSHIP]: {
        path: getRouteCitizenship(),
        element: <CitizenshipPage />,
        authOnly: true,
    },
    [AppRoutes.NATIONALITIES]: {
        path: getRouteNationalities(),
        element: <NationalitiesPage />,
        authOnly: true,
    },
    [AppRoutes.EDU_LANGUAGES]: {
        path: getRouteEduLanguages(),
        element: <EduLanguagesPage />,
        authOnly: true,
    },
    [AppRoutes.FINISHED_EDU_TYPES]: {
        path: getRouteFinishedEduTypes(),
        element: <FinishedEduTypesPage />,
        authOnly: true,
    },
    [AppRoutes.EDU_COURSES]: {
        path: getRouteEduCourses(),
        element: <EduCoursesPage />,
        authOnly: true,
    },
    [AppRoutes.STUDY_DIRECTIONS]: {
        path: getRouteStudyDirections(),
        element: <StudyDirectionsPage />,
        authOnly: true,
    },
    [AppRoutes.STUDY_DURATIONS]: {
        path: getRouteStudyDurations(),
        element: <StudyDurationsPage />,
        authOnly: true,
    },
    [AppRoutes.QUALIFICATIONS]: {
        path: getRouteQualifications(),
        element: <QualificationsPage />,
        authOnly: true,
    },
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage />,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
        authOnly: true,
    },
};

const routes = [
    { path: getRouteMain(), exact: true, name: 'Главная' },
    { path: getRouteStudents(), name: 'Студенты' },
    { path: getRouteImportStudents(), name: 'Импорт студентов' },
    { path: getRouteLogin(), name: 'Вход' },
];

export default routes;
