import React, { memo } from 'react';
import { CContainer } from '@coreui/react';

// routes config
import { AppRouter } from 'app/providers/router';
import { useLocation } from 'react-router-dom';
import { getRouteLogin } from 'shared/const/router';

export const Content = memo(() => {
    const location = useLocation();

    if (location.pathname === getRouteLogin()) {
        return (
            <AppRouter />
        );
    }

    return (
        <CContainer lg>
            <AppRouter />
        </CContainer>
    );
});
