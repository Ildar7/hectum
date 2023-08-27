import React, { memo } from 'react';
import {
    CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { logoNegative } from 'shared/assets/icons/brand/logo-negative';
import { sygnet } from 'shared/assets/icons/brand/sygnet';

import SimpleBar from 'simplebar-react';
import './Sidebar.module.scss';

// sidebar nav config
import { SidebarNav } from 'widgets/SidebarNav';
import _nav from 'shared/config/navbarConfig/navbarConfig';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getSidebarShow, getSidebarUnfoldable, sidebarActions } from 'widgets/Sidebar';
import { Text } from 'shared/ui/Text/Text';

export const Sidebar = memo(() => {
    const dispatch = useAppDispatch();
    const unfoldable = useSelector(getSidebarUnfoldable);
    const sidebarShow = useSelector(getSidebarShow);

    return (
        <CSidebar
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch(sidebarActions.setShow(visible));
            }}
        >
            <CSidebarBrand className="d-none d-md-flex">
                <span className="sidebar-logotype">
                    Hectum LMS
                </span>
            </CSidebarBrand>
            <CSidebarNav>
                <SimpleBar>
                    <SidebarNav items={_nav} />
                </SimpleBar>
            </CSidebarNav>
            <CSidebarToggler
                className="d-none d-lg-flex"
                onClick={() => dispatch(sidebarActions.toggleUnfoldable())}
            />
        </CSidebar>
    );
});
