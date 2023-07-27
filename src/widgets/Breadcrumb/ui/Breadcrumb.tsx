import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react';
import routes from 'shared/config/routeConfig/routeConfig';

export const Breadcrumb = memo(() => {
    const currentLocation = useLocation().pathname;

    // @ts-ignore
    const getRouteName = (pathname, routes) => {
        // @ts-ignore
        const currentRoute = routes.find((route) => route.path === pathname);
        return currentRoute ? currentRoute.name : false;
    };

    // @ts-ignore
    const getBreadcrumbs = (location) => {
        // @ts-ignore
        const breadcrumbs = [];
        // @ts-ignore
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
        // @ts-ignore
        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs(currentLocation);

    // eslint-disable-next-line implicit-arrow-linebreak

    return (
        (
            <CBreadcrumb className="m-0 ms-2">
                {breadcrumbs.map((breadcrumb) => (
                    <CBreadcrumbItem
                        {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
                        key={breadcrumb.name}
                    >
                        {breadcrumb.name}
                    </CBreadcrumbItem>
                ))}
            </CBreadcrumb>
        )
    );
});
