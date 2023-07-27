import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CBadge } from '@coreui/react';

// @ts-ignore
export const SidebarNav = ({ items }) => {
    const location = useLocation();
    // @ts-ignore
    const navLink = (name, icon, badge?) => (
        <>
            {icon && icon}
            {name && name}
            {badge && (
                <CBadge color={badge.color} className="ms-auto">
                    {badge.text}
                </CBadge>
            )}
        </>
    );

    // @ts-ignore
    const navItem = (item, index) => {
        const {
            component, name, badge, icon, ...rest
        } = item;
        const Component = component;
        return (
            <Component
                {...(rest.to
                    && !rest.items && !rest.disabled && {
                    component: NavLink,
                })}
                key={index}
                {...rest}
            >
                {navLink(name, icon, badge)}
            </Component>
        );
    };
    // @ts-ignore
    const navGroup = (item, index) => {
        const {
            component, name, icon, to, ...rest
        } = item;
        const Component = component;

        return (
            <Component
                idx={String(index)}
                key={index}
                toggler={navLink(name, icon)}
                visible={location.pathname.startsWith(to)}
                {...rest}
            >

                {// @ts-ignore
                    item.items?.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))
                }
            </Component>
        );
    };

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {
                items
                // @ts-ignore
                && items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))
            }
        </>
    );
};

SidebarNav.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
