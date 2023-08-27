import React, {
    ReactElement, Suspense, useEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { PageLoader } from 'widgets/PageLoader';
import DefaultLayout from 'shared/ui/DefaultLayout/DefaultLayout';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { userActions } from 'entities/User';
import { fetchStudents, getStudentsError } from 'entities/Students';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRouteLogin } from 'shared/const/router';
import { USER_JWT_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { CToaster } from '@coreui/react';
import { Toast } from 'shared/ui/Toast/Toast';
import { translateErrors } from 'shared/lib/errors/translateErrors/translateErrors';

function App() {
    const dispatch = useAppDispatch();
    const error = useSelector(getStudentsError);
    const navigate = useNavigate();
    const location = useLocation();
    const [toast, addToast] = useState<ReactElement>();
    const toaster = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(userActions.initAuthToken());
        if (location.pathname !== getRouteLogin()) {
            dispatch(fetchStudents());
        }
    }, [dispatch, location.pathname]);

    useEffect(() => {
        if (location.pathname !== getRouteLogin() && error?.status === 401) {
            localStorage.removeItem(USER_JWT_LOCALSTORAGE_KEY);
            addToast(Toast.error(translateErrors(error.error)));
            navigate(getRouteLogin());
        }
    }, [error?.error, error?.status, location.pathname, navigate]);

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback={<PageLoader />}>
                <DefaultLayout />
            </Suspense>

            <CToaster
                ref={toaster}
                push={toast}
                placement="top-center"
            />
        </div>
    );
}

export default App;
