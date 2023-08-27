import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderDivider,
    CHeaderNav,
    CHeaderToggler,
    CNavItem,
    CNavLink,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
    cilBell, cilEnvelopeOpen, cilList, cilMenu,
} from '@coreui/icons';
import { Breadcrumb } from 'widgets/Breadcrumb';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { sidebarActions } from 'widgets/Sidebar';
import HeaderDropdown from '../HeaderDropdown/HeaderDropdown';
import cls from './Header.module.scss';

export const Header = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    return (
        <CHeader position="sticky" className="mb-4">
            <CContainer fluid>
                <CHeaderToggler
                    className="ps-1"
                    onClick={() => dispatch(sidebarActions.toggleShow())}
                >
                    <CIcon icon={cilMenu} size="lg" />
                </CHeaderToggler>
                <CHeaderBrand
                    className="mx-auto d-md-none"
                    // @ts-ignore
                    to="/"
                >
                    <span className="header-mobile-logo">Hectum LMS</span>
                </CHeaderBrand>
                <CHeaderNav className="d-none d-md-flex me-auto">
                    <CNavItem>
                        <CNavLink to="/" component={NavLink}>
                            Главная
                        </CNavLink>
                    </CNavItem>
                </CHeaderNav>
                <CHeaderNav>
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilBell} size="lg" />
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilList} size="lg" />
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilEnvelopeOpen} size="lg" />
                        </CNavLink>
                    </CNavItem>
                </CHeaderNav>
                <CHeaderNav className="ms-3">
                    <HeaderDropdown />
                </CHeaderNav>
            </CContainer>
            <CHeaderDivider />
            <CContainer fluid className={cls.breadcrumbs}>
                {location.pathname.includes('/students') && (
                    <Breadcrumb
                        studentsMenu
                    />
                )}
                {!location.pathname.includes('/students') && (
                    <Breadcrumb />
                )}
            </CContainer>
        </CHeader>
    );
};
