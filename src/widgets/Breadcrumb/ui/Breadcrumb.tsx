import React, { memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react';
import routes from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { students } from '../const/students';
import cls from './Breadcrumb.module.scss';

interface BreadcrumbProps {
    studentsMenu?: boolean;
    className?: string;
}
export const Breadcrumb = memo((props: BreadcrumbProps) => {
    const {
        studentsMenu,
        className,
    } = props;
    const currentLocation = useLocation().pathname;

    const getRouteName = (pathname: string, routes: any[]) => {
        const currentRoute = routes.find((route) => route.path === pathname);
        return currentRoute ? currentRoute.name : false;
    };

    const getBreadcrumbs = (location: string) => {
        const breadcrumbs: any[] = [];
        location.split('/').reduce((prev, curr, index, array) => {
            const currentPathname = `${prev}/${curr}`;
            const routeName = getRouteName(currentPathname, routes);
            // eslint-disable-next-line no-unused-expressions
            routeName
            && breadcrumbs.push({
                pathname: currentPathname,
                name: routeName,
                active: index + 1 === array.length,
            });
            return currentPathname;
        });
        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs(currentLocation);

    // eslint-disable-next-line implicit-arrow-linebreak

    return (
        (
            <CBreadcrumb className={classNames(cls.Breadcrumbs, { [cls.students]: !!studentsMenu }, ['m-0 ms-2', className])}>
                {!studentsMenu && (
                    breadcrumbs.map((breadcrumb) => (
                        <CBreadcrumbItem
                            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
                            key={breadcrumb.name}
                        >
                            {breadcrumb.name}
                        </CBreadcrumbItem>
                    ))
                )}

                {studentsMenu && (
                    students.map((breadcrumb) => (
                        <CBreadcrumbItem
                            {...(currentLocation === breadcrumb.pathname ? { active: true } : { href: breadcrumb.pathname })}
                            key={breadcrumb.name}
                            className="students-page-breadcrumb"
                        >
                            {breadcrumb.name}
                        </CBreadcrumbItem>
                    ))
                )}
            </CBreadcrumb>
        )
    );
});
