import { classNames } from 'shared/lib/classNames/classNames';
import {
    CButton, CForm, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CToaster,
} from '@coreui/react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import CIcon from '@coreui/icons-react';
import { cilSave, cilTrash, cilWarning } from '@coreui/icons';
import {
    Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import React, {
    ReactElement, useEffect, useRef, useState,
} from 'react';
import { EduLanguagesType } from 'entities/EduLanguages';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Toast } from 'shared/ui/Toast/Toast';
import { CFormInputWithMask } from 'shared/ui/InputMask/InputMask';
import { editEduLanguageActions } from 'features/EduLanguages/EditEduLanguage';
import {
    fetchEduLanguageDetail,
    getEduLanguageDetailData,
    getEduLanguageDetailError,
    getEduLanguageDetailIsLoading,
} from 'entities/EduLanguageDetail';
import {
    editEduLanguage,
} from 'features/EduLanguages/EditEduLanguage/model/services/editEduLanguage/editEduLanguage';
import {
    getEditEduLanguageIsLoading,
} from '../model/selectors/getEditEduLanguageIsLoading/getEditEduLanguageIsLoading';
import { getEditEduLanguageError } from '../model/selectors/getEditEduLanguageError/getEditEduLanguageError';
import cls from './EditEduLanguage.module.scss';
import {
    getEditEduLanguageNewFieldsData,
} from '../model/selectors/getEditEduLanguageNewFieldsData/getEditEduLanguageNewFieldsData';

interface EditEduLanguageProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    eduLanguageId: string;
    onDeleteEduLanguage: (eduLanguage: EduLanguagesType) => void;
}
export const EditEduLanguage = (props: EditEduLanguageProps) => {
    const {
        className,
        visible,
        setVisible,
        eduLanguageId,
        onDeleteEduLanguage,
    } = props;
    const dispatch = useAppDispatch();
    const [toast, addToast] = useState<ReactElement>();
    const toaster = useRef<HTMLDivElement | null>(null);
    const [validated, setValidated] = useState<boolean>(false);
    const [formWithErrors, setFormWithErrors] = useState<boolean>(false);

    const eduLanguageDetailData = useSelector(getEduLanguageDetailData);
    const isLoadingEduLanguageDetail = useSelector(getEduLanguageDetailIsLoading);
    const errorEduLanguageDetail = useSelector(getEduLanguageDetailError);

    const isLoadingEditEduLanguage = useSelector(getEditEduLanguageIsLoading);
    const editEduLanguageNewFieldsData = useSelector(getEditEduLanguageNewFieldsData);
    const errorsEditEduLanguage = useSelector(getEditEduLanguageError);

    useEffect(() => {
        if (eduLanguageId) {
            dispatch(fetchEduLanguageDetail(eduLanguageId));
        }
    }, [dispatch, eduLanguageId]);

    const onCloseModal = () => {
        setVisible(false);
        setValidated(false);
        setFormWithErrors(false);
    };

    const onCancelHandler = () => {
        onCloseModal();
        dispatch(editEduLanguageActions.clearNewFields());
    };

    const onDeleteHandler = (eduLanguage: EduLanguagesType) => {
        onDeleteEduLanguage(eduLanguage);
        onCloseModal();
    };

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editEduLanguageActions.setTitle(event.target.value));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        setFormWithErrors(!form.checkValidity());
        if (!form.checkValidity()) {
            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity()) {
            if (eduLanguageDetailData?.languageofedu === editEduLanguageNewFieldsData) {
                addToast(Toast.error('Для сохранения вы должны внести изменения!'));
            } else {
                const result = await dispatch(editEduLanguage(eduLanguageId));

                if (result.meta.requestStatus === 'fulfilled') {
                    addToast(Toast.success('Информация о языке обучения успешно обновлена'));
                    onCancelHandler();
                }

                if (result.meta.requestStatus === 'rejected') {
                    setFormWithErrors(true);
                }
            }
        }
    };

    let content;

    if (isLoadingEditEduLanguage || isLoadingEduLanguageDetail) {
        content = (
            <Skeleton width="100%" height={80} />
        );
    } else if (errorEduLanguageDetail) {
        content = (
            <Text
                theme={TextTheme.ERROR}
                size={TextSize.M}
                weight={TextWeight.SEMIBOLD}
            >
                Произошла ошибка при загрузке данных, попробуйте перезагрузить страницу
            </Text>
        );
    } else {
        content = (
            <div className={cls.tab}>
                <div className={cls.tabBlock}>
                    <div className={cls.settings}>
                        <div className={cls.newAddField}>
                            <h6 className={cls.newAddFieldTitle}>Наименование</h6>
                            <CFormInputWithMask
                                type="text"
                                placeholder="русский"
                                // @ts-ignore
                                feedbackValid={errorsEditEduLanguage ? '' : 'Здорово!'}
                                invalid={!!errorsEditEduLanguage}
                                feedbackInvalid="Введите корректные данные"
                                value={editEduLanguageNewFieldsData || ''}
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <CModal
                className={classNames(cls.EditEduLanguage, {}, [className])}
                visible={visible}
                onClose={onCloseModal}
                size="lg"
                alignment="center"
            >
                <CForm
                    className={classNames(cls.form, {}, ['needs-validation'])}
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <CModalHeader>
                        {
                            isLoadingEditEduLanguage || isLoadingEduLanguageDetail
                                ? <Skeleton width={200} height={30} />
                                : (
                                    <CModalTitle>
                                        Изменение языка обучения №
                                        {eduLanguageDetailData?.id_languageofedu}
                                    </CModalTitle>
                                )
                        }
                    </CModalHeader>
                    <CModalBody>
                        {content}
                    </CModalBody>
                    <CModalFooter
                        className={cls.footer}
                    >
                        <div className={cls.message}>
                            {(formWithErrors) && (
                                <>
                                    <CIcon icon={cilWarning} customClassName={cls.messageIcon} />
                                    <Text
                                        size={TextSize.M}
                                        weight={TextWeight.SEMIBOLD}
                                    >
                                        Форма заполнена некорректно
                                    </Text>
                                </>
                            )}
                        </div>
                        <div className={cls.footerBtns}>
                            <CButton
                                color="primary"
                                variant="outline"
                                className={cls.footerBtn}
                                onClick={onCancelHandler}
                            >
                                Отмена
                            </CButton>
                            <CButton
                                color="danger"
                                className={classNames(cls.footerBtn, {}, [cls.redBtn])}
                                onClick={() => { onDeleteHandler(eduLanguageDetailData!); }}
                                disabled={isLoadingEduLanguageDetail
                                    || isLoadingEditEduLanguage
                                    || !!errorEduLanguageDetail}
                            >
                                <CIcon icon={cilTrash} className={cls.btnIcon} />
                                Удалить
                            </CButton>
                            <CButton
                                color="success"
                                type="submit"
                                className={classNames(cls.footerBtn, {}, [cls.greenBtn])}
                                disabled={isLoadingEduLanguageDetail
                                    || isLoadingEditEduLanguage
                                    || !!errorEduLanguageDetail}
                            >
                                <CIcon icon={cilSave} className={cls.btnIcon} />
                                Сохранить
                            </CButton>
                        </div>
                    </CModalFooter>
                </CForm>
            </CModal>

            <CToaster
                ref={toaster}
                push={toast}
                placement="top-end"
            />
        </>
    );
};
