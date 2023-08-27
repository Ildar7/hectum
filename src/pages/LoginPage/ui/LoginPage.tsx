import React from 'react';
import { Login } from 'features/Login';
import { HelmetProvider } from 'app/providers/HelmetProvider';

const LoginPage = () => (
    <HelmetProvider
        title="Hectum LMS - Авторизация"
    >
        <Login />
    </HelmetProvider>
);
export default LoginPage;
