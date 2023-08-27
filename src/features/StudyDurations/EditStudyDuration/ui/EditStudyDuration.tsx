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
import { StudyDurationsType } from 'entities/StudyDurations';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Toast } from 'shared/ui/Toast/Toast';
import { CFormInputWithMask } from 'shared/ui/InputMask/InputMask';
import { editStudyDurationActions } from 'features/StudyDurations/EditStudyDuration';
import {
    fetchStudyDurationDetail,
    getStudyDurationDetailData,
    getStudyDurationDetailError,
    getStudyDurationDetailIsLoading,
} from 'entities/StudyDurationDetail';
import {
    editStudyDuration,
} from 'features/StudyDurations/EditStudyDuration/model/services/editStudyDuration/editStudyDuration';
import {
    getEditStudyDurationIsLoading,
} from '../model/selectors/getEditStudyDurationIsLoading/getEditStudyDurationIsLoading';
import { getEditStudyDurationError } from '../model/selectors/getEditStudyDurationError/getEditStudyDurationError';
import cls from './EditStudyDuration.module.scss';
import {
    getEditStudyDurationNewFieldsData,
} from '../model/selectors/getEditStudyDurationNewFieldsData/getEditStudyDurationNewFieldsData';

interface EditStudyDurationProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    studyDurationId: string;
    onDeleteStudyDuration: (studyDuration: StudyDurationsType) => void;
}
export const EditStudyDuration = (props: EditStudyDurationProps) => {
    const {
        className,
        visible,
        setVisible,
        studyDurationId,
        onDeleteStudyDuration,
    } = props;
    const dispatch = useAppDispatch();
    const [toast, addToast] = useState<ReactElement>();
    const toaster = useRef<HTMLDivElement | null>(null);
    const [validated, setValidated] = useState<boolean>(false);
    const [formWithErrors, setFormWithErrors] = useState<boolean>(false);

    const studyDurationDetailData = useSelector(getStudyDurationDetailData);
    const isLoadingStudyDurationDetail = useSelector(getStudyDurationDetailIsLoading);
    const errorStudyDurationDetail = useSelector(getStudyDurationDetailError);

    const isLoadingEditStudyDuration = useSelector(getEditStudyDurationIsLoading);
    const editStudyDurationNewFieldsData = useSelector(getEditStudyDurationNewFieldsData);
    const errorsEditStudyDuration = useSelector(getEditStudyDurationError);

    useEffect(() => {
        if (studyDurationId) {
            dispatch(fetchStudyDurationDetail(studyDurationId));
        }
    }, [dispatch, studyDurationId]);

    const onCloseModal = () => {
        setVisible(false);
        setValidated(false);
        setFormWithErrors(false);
    };

    const onCancelHandler = () => {
        onCloseModal();
        dispatch(editStudyDurationActions.clearNewFields());
    };

    const onDeleteHandler = (studyDuration: StudyDurationsType) => {
        onDeleteStudyDuration(studyDuration);
        onCloseModal();
    };

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editStudyDurationActions.setTitle(event.target.value));
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
            if (studyDurationDetailData?.durationoftraining === editStudyDurationNewFieldsData) {
                addToast(Toast.error('Для сохранения вы должны внести изменения!'));
            } else {
                const result = await dispatch(editStudyDuration(studyDurationId));

                if (result.meta.requestStatus === 'fulfilled') {
                    addToast(Toast.success('Информация о продолжительности обучения успешно обновлена'));
                    onCancelHandler();
                }

                if (result.meta.requestStatus === 'rejected') {
                    setFormWithErrors(true);
                }
            }
        }
    };

    let content;

    if (isLoadingEditStudyDuration || isLoadingStudyDurationDetail) {
        content = (
            <Skeleton width="100%" height={80} />
        );
    } else if (errorStudyDurationDetail) {
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
                                placeholder="2 года"
                                // @ts-ignore
                                feedbackValid={errorsEditStudyDuration ? '' : 'Здорово!'}
                                invalid={!!errorsEditStudyDuration}
                                feedbackInvalid="Введите корректные данные"
                                value={editStudyDurationNewFieldsData || ''}
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
                className={classNames(cls.EditStudyDuration, {}, [className])}
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
                            isLoadingEditStudyDuration || isLoadingStudyDurationDetail
                                ? <Skeleton width={200} height={30} />
                                : (
                                    <CModalTitle>
                                        Изменение продолжительности обучения №
                                        {studyDurationDetailData?.id_durationoftraining}
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
                                onClick={() => { onDeleteHandler(studyDurationDetailData!); }}
                                disabled={isLoadingStudyDurationDetail
                                    || isLoadingEditStudyDuration
                                    || !!errorStudyDurationDetail}
                            >
                                <CIcon icon={cilTrash} className={cls.btnIcon} />
                                Удалить
                            </CButton>
                            <CButton
                                color="success"
                                type="submit"
                                className={classNames(cls.footerBtn, {}, [cls.greenBtn])}
                                disabled={isLoadingStudyDurationDetail
                                    || isLoadingEditStudyDuration
                                    || !!errorStudyDurationDetail}
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
