import React from 'react';
import { Sidebar } from 'widgets/Sidebar';
import { Header } from 'widgets/Header';
import { Content } from 'widgets/Content';
import { Footer } from 'widgets/Footer';
import { useLocation } from 'react-router-dom';
import { getRouteLogin } from 'shared/const/router';

const DefaultLayout = () => {
    const location = useLocation();

    if (location.pathname === getRouteLogin()) {
        return (
            <Content />
        );
    }

    return (
        <div>
            <Sidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <Header />
                <div className="body flex-grow-1 px-3">
                    <Content />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default DefaultLayout;
