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
import { EnrollmentTypesType } from 'entities/EnrollmentTypes';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Toast } from 'shared/ui/Toast/Toast';
import { CFormInputWithMask } from 'shared/ui/InputMask/InputMask';
import { editEnrollmentTypeActions } from 'features/EnrollmentTypes/EditEnrollmentType';
import {
    fetchEnrollmentTypeDetail,
    getEnrollmentTypeDetailData,
    getEnrollmentTypeDetailError,
    getEnrollmentTypeDetailIsLoading,
} from 'entities/EnrollmentTypeDetail';
import {
    editEnrollmentType,
} from 'features/EnrollmentTypes/EditEnrollmentType/model/services/editEnrollmentType/editEnrollmentType';
import {
    getEditEnrollmentTypeIsLoading,
} from '../model/selectors/getEditEnrollmentTypeIsLoading/getEditEnrollmentTypeIsLoading';
import { getEditEnrollmentTypeError } from '../model/selectors/getEditEnrollmentTypeError/getEditEnrollmentTypeError';
import cls from './EditEnrollmentType.module.scss';
import {
    getEditEnrollmentTypeNewFieldsData,
} from '../model/selectors/getEditEnrollmentTypeNewFieldsData/getEditEnrollmentTypeNewFieldsData';

interface EditEnrollmentTypeProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    enrollmentTypeId: string;
    onDeleteEnrollmentType: (enrollmentType: EnrollmentTypesType) => void;
}
export const EditEnrollmentType = (props: EditEnrollmentTypeProps) => {
    const {
        className,
        visible,
        setVisible,
        enrollmentTypeId,
        onDeleteEnrollmentType,
    } = props;
    const dispatch = useAppDispatch();
    const [toast, addToast] = useState<ReactElement>();
    const toaster = useRef<HTMLDivElement | null>(null);
    const [validated, setValidated] = useState<boolean>(false);
    const [formWithErrors, setFormWithErrors] = useState<boolean>(false);

    const enrollmentTypeDetailData = useSelector(getEnrollmentTypeDetailData);
    const isLoadingEnrollmentTypeDetail = useSelector(getEnrollmentTypeDetailIsLoading);
    const errorEnrollmentTypeDetail = useSelector(getEnrollmentTypeDetailError);

    const isLoadingEditEnrollmentType = useSelector(getEditEnrollmentTypeIsLoading);
    const editEnrollmentTypeNewFieldsData = useSelector(getEditEnrollmentTypeNewFieldsData);
    const errorsEditEnrollmentType = useSelector(getEditEnrollmentTypeError);

    useEffect(() => {
        if (enrollmentTypeId) {
            dispatch(fetchEnrollmentTypeDetail(enrollmentTypeId));
        }
    }, [dispatch, enrollmentTypeId]);

    const onCloseModal = () => {
        setVisible(false);
        setValidated(false);
        setFormWithErrors(false);
    };

    const onCancelHandler = () => {
        onCloseModal();
        dispatch(editEnrollmentTypeActions.clearNewFields());
    };

    const onDeleteHandler = (enrollmentType: EnrollmentTypesType) => {
        onDeleteEnrollmentType(enrollmentType);
        onCloseModal();
    };

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editEnrollmentTypeActions.setTitle(event.target.value));
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
            if (enrollmentTypeDetailData?.typeenrollment === editEnrollmentTypeNewFieldsData) {
                addToast(Toast.error('Для сохранения вы должны внести изменения!'));
            } else {
                const result = await dispatch(editEnrollmentType(enrollmentTypeId));

                if (result.meta.requestStatus === 'fulfilled') {
                    addToast(Toast.success('Информация о виде зачисления успешно обновлена'));
                    onCancelHandler();
                }

                if (result.meta.requestStatus === 'rejected') {
                    setFormWithErrors(true);
                }
            }
        }
    };

    let content;

    if (isLoadingEditEnrollmentType || isLoadingEnrollmentTypeDetail) {
        content = (
            <Skeleton width="100%" height={80} />
        );
    } else if (errorEnrollmentTypeDetail) {
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
                                placeholder="на общих основаниях"
                                // @ts-ignore
                                feedbackValid={errorsEditEnrollmentType ? '' : 'Здорово!'}
                                invalid={!!errorsEditEnrollmentType}
                                feedbackInvalid="Введите корректные данные"
                                value={editEnrollmentTypeNewFieldsData || ''}
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
                className={classNames(cls.EditEnrollmentType, {}, [className])}
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
                            isLoadingEditEnrollmentType || isLoadingEnrollmentTypeDetail
                                ? <Skeleton width={200} height={30} />
                                : (
                                    <CModalTitle>
                                        Изменение типа зачисления №
                                        {enrollmentTypeDetailData?.id_typeenrollment}
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
                                onClick={() => { onDeleteHandler(enrollmentTypeDetailData!); }}
                                disabled={isLoadingEnrollmentTypeDetail
                                    || isLoadingEditEnrollmentType
                                    || !!errorEnrollmentTypeDetail}
                            >
                                <CIcon icon={cilTrash} className={cls.btnIcon} />
                                Удалить
                            </CButton>
                            <CButton
                                color="success"
                                type="submit"
                                className={classNames(cls.footerBtn, {}, [cls.greenBtn])}
                                disabled={isLoadingEnrollmentTypeDetail
                                    || isLoadingEditEnrollmentType
                                    || !!errorEnrollmentTypeDetail}
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
