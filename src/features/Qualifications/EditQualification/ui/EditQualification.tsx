import { classNames } from 'shared/lib/classNames/classNames';
import {
    CButton, CForm, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CToaster,
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
import { getQualificationsData, QualificationsType } from 'entities/Qualifications';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Toast } from 'shared/ui/Toast/Toast';
import { CFormInputWithMask } from 'shared/ui/InputMask/InputMask';
import { editQualificationActions } from 'features/Qualifications/EditQualification';
import {
    fetchQualificationDetail,
    getQualificationDetailData,
    getQualificationDetailError,
    getQualificationDetailIsLoading,
} from 'entities/QualificationDetail';
import {
    editQualification,
} from 'features/Qualifications/EditQualification/model/services/editQualification/editQualification';
import { detectInvalidInput } from 'shared/lib/errors/detectInvalidInput/detectInvalidInput';
import { setInvalidInputMessage } from 'shared/lib/errors/setInvalidInputMessage/setInvalidInputMessage';
import {
    getEditQualificationIsLoading,
} from '../model/selectors/getEditQualificationIsLoading/getEditQualificationIsLoading';
import { getEditQualificationError } from '../model/selectors/getEditQualificationError/getEditQualificationError';
import cls from './EditQualification.module.scss';
import {
    getEditQualificationNewFieldsData,
} from '../model/selectors/getEditQualificationNewFieldsData/getEditQualificationNewFieldsData';

interface EditQualificationProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    qualificationId: string;
    onDeleteQualification: (qualification: QualificationsType) => void;
}
export const EditQualification = (props: EditQualificationProps) => {
    const {
        className,
        visible,
        setVisible,
        qualificationId,
        onDeleteQualification,
    } = props;
    const dispatch = useAppDispatch();
    const [toast, addToast] = useState<ReactElement>();
    const toaster = useRef<HTMLDivElement | null>(null);
    const [validated, setValidated] = useState<boolean>(false);
    const [formWithErrors, setFormWithErrors] = useState<boolean>(false);

    const qualificationDetailData = useSelector(getQualificationDetailData);
    const isLoadingQualificationDetail = useSelector(getQualificationDetailIsLoading);
    const errorQualificationDetail = useSelector(getQualificationDetailError);

    const isLoadingEditQualification = useSelector(getEditQualificationIsLoading);
    const editQualificationNewFieldsData = useSelector(getEditQualificationNewFieldsData);
    const errorsEditQualification = useSelector(getEditQualificationError);
    const qualifData = useSelector(getQualificationsData);

    useEffect(() => {
        if (qualificationId) {
            dispatch(fetchQualificationDetail(qualificationId));
        }
    }, [dispatch, qualificationId]);

    const onCloseModal = () => {
        setVisible(false);
        setValidated(false);
        setFormWithErrors(false);
    };

    const onCancelHandler = () => {
        onCloseModal();
        dispatch(editQualificationActions.clearNewFields());
    };

    const onDeleteHandler = (qualification: QualificationsType) => {
        onDeleteQualification(qualification);
        onCloseModal();
    };

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editQualificationActions.setTitle(event.target.value));
    };

    const onChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editQualificationActions.setCode(event.target.value));
    };

    const onChangeId = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(editQualificationActions.setId(event.target.value));
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
            if (
                qualificationDetailData?.qualification === editQualificationNewFieldsData?.title
                && qualificationDetailData?.shifr_qual === editQualificationNewFieldsData?.code
                && qualificationDetailData?.specialty_id.toString() === editQualificationNewFieldsData?.speciality_id
            ) {
                addToast(Toast.error('Для сохранения вы должны внести изменения!'));
            } else {
                const result = await dispatch(editQualification(qualificationId));

                if (result.meta.requestStatus === 'fulfilled') {
                    addToast(Toast.success('Информация о квалификации успешно обновлена'));
                    onCancelHandler();
                }

                if (result.meta.requestStatus === 'rejected') {
                    setFormWithErrors(true);
                }
            }
        }
    };

    let content;

    if (isLoadingEditQualification || isLoadingQualificationDetail) {
        content = (
            <Skeleton width="100%" height={80} />
        );
    } else if (errorQualificationDetail) {
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
                                placeholder="маркетолог"
                                // @ts-ignore
                                feedbackValid={errorsEditQualification ? '' : 'Здорово!'}
                                invalid={!!errorsEditQualification}
                                feedbackInvalid="Введите корректные данные"
                                value={editQualificationNewFieldsData?.title || ''}
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.newAddField}>
                            <h6 className={cls.newAddFieldTitle}>Код квалификации</h6>
                            <CFormInputWithMask
                                type="text"
                                placeholder="05200"
                                // @ts-ignore
                                feedbackValid={errorsEditQualification ? '' : 'Здорово!'}
                                invalid={!!errorsEditQualification}
                                feedbackInvalid="Введите корректные данные"
                                value={editQualificationNewFieldsData?.code || ''}
                                onChange={onChangeCode}
                            />
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.newAddField}>
                            <h6 className={cls.newAddFieldTitle}>Код квалификации</h6>
                            <CFormSelect
                                className={cls.selectFilter}
                                value={editQualificationNewFieldsData?.speciality_id || ''}
                                onChange={onChangeId}
                                feedbackValid={
                                    detectInvalidInput(errorsEditQualification, 'specialtiesId')
                                        ? ''
                                        : 'Отлично!'
                                }
                                feedbackInvalid={setInvalidInputMessage(
                                    detectInvalidInput(errorsEditQualification, 'specialtiesId'),
                                    errorsEditQualification,
                                    'specialtiesId',
                                )}
                                required
                            >
                                <option value="">Не выбрано</option>
                                {
                                    qualifData?.data.map((qual) => (
                                        <option
                                            key={qual.id_qual}
                                            value={qual.specialty_id}
                                        >
                                            {qual.specialty_id}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <CModal
                className={classNames(cls.EditQualification, {}, [className])}
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
                            isLoadingEditQualification || isLoadingQualificationDetail
                                ? <Skeleton width={200} height={30} />
                                : (
                                    <CModalTitle>
                                        Изменение квалификации №
                                        {qualificationDetailData?.id_qual}
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
                                onClick={() => { onDeleteHandler(qualificationDetailData!); }}
                                disabled={isLoadingQualificationDetail
                                    || isLoadingEditQualification
                                    || !!errorQualificationDetail}
                            >
                                <CIcon icon={cilTrash} className={cls.btnIcon} />
                                Удалить
                            </CButton>
                            <CButton
                                color="success"
                                type="submit"
                                className={classNames(cls.footerBtn, {}, [cls.greenBtn])}
                                disabled={isLoadingQualificationDetail
                                    || isLoadingEditQualification
                                    || !!errorQualificationDetail}
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
