import React, { memo, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';

// routes config
import { AppRouter } from 'app/providers/router';

export const Content = memo(() => (
    <CContainer lg>
        <AppRouter />
    </CContainer>
));
