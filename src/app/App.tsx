import React, { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { PageLoader } from 'widgets/PageLoader';
import { AppRouter } from 'app/providers/router';
import DefaultLayout from 'shared/ui/DefaultLayout/DefaultLayout';

function App() {
    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback={<PageLoader />}>
                <DefaultLayout />
            </Suspense>
        </div>
    );
}

export default App;
