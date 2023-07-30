import React, { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { PageLoader } from 'widgets/PageLoader';
import DefaultLayout from 'shared/ui/DefaultLayout/DefaultLayout';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { tableFieldsActions } from 'features/TableFields';
import { TABLE_FIELDS_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

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
