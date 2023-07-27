import React from 'react';
import CIcon from '@coreui/icons-react';
import {
    cilSpeedometer, cilEducation, cilUser,
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
];

export default _nav;
