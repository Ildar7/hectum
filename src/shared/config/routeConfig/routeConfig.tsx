import { RouteProps } from 'react-router-dom';
import { NotFoundPage } from 'pages/NotFoundPage';
import { MainPage } from 'pages/MainPage';
import React from 'react';
import { StudentsPage } from 'pages/StudentsPage';
import { AppRoutes, getRouteMain, getRouteStudents } from '../../const/router';

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.STUDENTS]: {
        path: getRouteStudents(),
        element: <StudentsPage />,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};

const routes = [
    { path: getRouteMain(), exact: true, name: 'Главная' },
    { path: getRouteStudents(), name: 'Студенты' },
];

export default routes;
