import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    ReactElement, useCallback, useRef, useState,
} from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CToaster,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { loginActions, loginReducer } from 'features/Login';
import { useSelector } from 'react-redux';
import { getLoginPassword } from 'features/Login/model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from 'features/Login/model/selectors/getLoginIsLoading/getLoginIsLoading';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { loginByUsername } from 'features/Login/model/services/loginByUsername/loginByUsername';
import { Toast } from 'shared/ui/Toast/Toast';
import { translateErrors } from 'shared/lib/errors/translateErrors/translateErrors';
import { useNavigate } from 'react-router-dom';
import { getRouteMain } from 'shared/const/router';
import { getUserAuthToken } from 'entities/User/model/selectors/getUserAuthToken/getUserAuthToken';
import EyeIcon from 'shared/assets/icons/eye.svg';
import EyeSlashIcon from 'shared/assets/icons/eye-slash.svg';
import { getLoginUsername } from '../model/selectors/getLoginUsername/getLoginUsername';
import cls from './Login.module.scss';

interface LoginProps {
  className?: string;
}

const reducers: ReducersList = {
    login: loginReducer,
};
export const Login = (props: LoginProps) => {
    const {
        className,
    } = props;
    const [validated, setValidated] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [toast, addToast] = useState<ReactElement>();
    const toaster = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);

    const userAuthToken = useSelector(getUserAuthToken);

    const onChangeUsername = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setLogin(event.target.value));
    }, [dispatch]);

    const onChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setPassword(event.target.value));
    }, [dispatch]);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity()) {
            const result = await dispatch(loginByUsername({ login: username, password }));

            if (result.meta.requestStatus === 'fulfilled') {
                window.location.replace(getRouteMain());
            }

            if (result.meta.requestStatus === 'rejected') {
                // @ts-ignore
                addToast(Toast.error(translateErrors(result.payload.message ? result.payload.message : result.payload)));
            }
        }
    };

    const navigateToMainPage = useCallback(() => {
        navigate(getRouteMain());
    }, [navigate]);

    const onChangeShowPassHandler = () => {
        setShowPass((prev) => !prev);
    };

    let showContent;

    if (userAuthToken && !isLoading) {
        showContent = (
            <CCol md={5}>
                <CCardGroup>
                    <CCard className="p-4">
                        <CCardBody>
                            <h2 className={cls.title}>Вы уже выполнили вход</h2>
                            <CRow className={cls.btnRow}>
                                <div className={cls.btnBlock}>
                                    <CButton
                                        color="primary"
                                        className={classNames(cls.btnLogin, {}, ['px-4'])}
                                        size="lg"
                                        onClick={navigateToMainPage}
                                    >
                                        Перейти к плафторме
                                    </CButton>
                                </div>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCardGroup>
            </CCol>
        );
    } else {
        showContent = (
            <CCol md={5}>
                <CCardGroup>
                    <CCard className="p-4">
                        <CCardBody>
                            <CForm
                                noValidate
                                validated={validated}
                                onSubmit={handleSubmit}
                            >
                                <h1>Войти</h1>
                                <p className="text-medium-emphasis">Войти в Hectum LMS</p>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>
                                        <CIcon icon={cilUser} />
                                    </CInputGroupText>
                                    <CFormInput
                                        placeholder="Логин"
                                        autoComplete="login"
                                        minLength={4}
                                        maxLength={64}
                                        onChange={onChangeUsername}
                                        feedbackValid="Отлично"
                                        feedbackInvalid="Введите корректный логин (мин. 4 символа)"
                                        className={classNames(cls.loginInput, {}, ['login-input'])}
                                        required
                                    />
                                </CInputGroup>
                                <CInputGroup className="mb-4">
                                    <CInputGroupText>
                                        <CIcon icon={cilLockLocked} />
                                    </CInputGroupText>
                                    <CFormInput
                                        type={showPass ? 'text' : 'password'}
                                        placeholder="Пароль"
                                        autoComplete="current-password"
                                        minLength={8}
                                        onChange={onChangePassword}
                                        feedbackValid="Отлично"
                                        feedbackInvalid="Введите корректный пароль (мин. 8 символов)"
                                        className={classNames(cls.loginInput, {}, ['login-input'])}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className={cls.showPassBtn}
                                        onClick={onChangeShowPassHandler}
                                    >
                                        {showPass && (
                                            <EyeIcon
                                                className={cls.eyeIcon}
                                            />
                                        )}
                                        {!showPass && (
                                            <EyeSlashIcon
                                                className={classNames(cls.eyeIcon, {}, [cls.eyeShowIcon])}
                                            />
                                        )}
                                    </button>
                                </CInputGroup>
                                <CRow>
                                    <div className={cls.btnBlock}>
                                        <CButton
                                            color="primary"
                                            className="px-4"
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            Войти
                                        </CButton>
                                    </div>
                                    <div className={classNames(cls.forgotBlock, {}, ['text-right'])}>
                                        <CButton disabled color="link" className="px-0">
                                            Забыли пароль?
                                        </CButton>
                                    </div>
                                </CRow>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCardGroup>
            </CCol>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.Login, {}, [className, 'bg-light min-vh-100 d-flex flex-row align-items-center'])}>
                <CContainer>
                    <CRow className="justify-content-center">
                        {showContent}
                    </CRow>
                </CContainer>
            </div>

            <CToaster
                ref={toaster}
                push={toast}
                placement="top-center"
            />
        </DynamicModuleLoader>
    );
};
