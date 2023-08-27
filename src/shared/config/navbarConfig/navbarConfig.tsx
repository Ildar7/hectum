import React from 'react';
import CIcon from '@coreui/icons-react';
import {
    cilSpeedometer, cilEducation, cilUser, cilInput,
} from '@coreui/icons';
import { CNavItem, CNavTitle } from '@coreui/react';

const _nav = [
    {
        component: CNavItem,
        name: 'Главная',
        to: '/',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
        component: CNavTitle,
        name: 'Контингент',
    },
    {
        component: CNavItem,
        name: 'Студенты',
        to: '/students',
        icon: <CIcon icon={cilEducation} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Сотрудники',
        to: '/',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        disabled: true,
    },
    // {
    //     component: CNavTitle,
    //     name: 'Личный кабинет',
    // },
    // {
    //     component: CNavItem,
    //     name: 'Вход',
    //     to: '/login',
    //     icon: <CIcon icon={cilInput} customClassName="nav-icon" />,
    // },
];

export default _nav;
