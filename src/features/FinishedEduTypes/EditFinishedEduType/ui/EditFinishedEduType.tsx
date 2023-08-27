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
import { FinishedEduTypesType } from 'entities/FinishedEduTypes';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Toast } from 'shared/ui/Toast/Toast';
import { CFormInputWithMask } from 'shared/ui/InputMask/InputMask';
import { editFinishedEduTypeActions } from 'features/FinishedEduTypes/EditFinishedEduType';
import {
    fetchFinishedEduTypeDetail,
    getFinishedEduTypeDetailData,
    getFinishedEduTypeDetailError,
    getFinishedEduTypeDetailIsLoading,
} from 'entities/FinishedEduTypeDetail';
import {
    editFinishedEduType,
} from 'features/FinishedEduTypes/EditFinishedEduType/model/services/editFinishedEduType/editFinishedEduType';
import {
    getEditFinishedEduTypeIsLoading,
} from '../model/selectors/getEditFinishedEduTypeIsLoading/getEditFinishedEduTypeIsLoading';
import { getEditFinishedEduTypeError } from '../model/selectors/getEditFinishedEduTypeError/getEditFinishedEduTypeError';
import cls from './EditFinishedEduType.module.scss';
import {
    getEditFinishedEduTypeNewFieldsData,
} from '../model/selectors/getEditFinishedEduTypeNewFieldsData/getEditFinishedEduTypeNewFieldsData';

interface EditFinishedEduTypeProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    finishedEduTypeId: string;
    onDeleteFinishedEduType: (finishedEduType: FinishedEduTypesType) => void;
}
export const EditFinishedEduType = (props: EditFinishedEduTypeProps) => {
    const {
        className,
        visible,
        setVisible,
        finishedEduTypeId,
        onDeleteFinishedEduType,
    } = props;
    const dispatch = useAppDispatch();
    const [toast, addToast] = useState<ReactElement>();
    const toaster = useRef<HTMLDivElement | null>(null);
    const [validated, setValidated] = useState<boolean>(false);
    const [formWithErrors, setFormWithErrors] = useState<boolean>(false);

    const finishedEduTypeDetailData = useSelector(getFinishedEduTypeDetailData);
    const isLoadingFinishedEduTypeDetail = useSelector(getFinishedEduTypeDetailIsLoading);
    const errorFinishedEduTypeDetail = useSelector(getFinishedEduTypeDetailError);

    const isLoadingEditFinishedEduType = useSelector(getEditFinishedEduTypeIsLoading);
    const editFinishedEduTypeNewFieldsData = useSelector(getEditFinishedEduTypeNewFieldsData);
    const errorsEditFinishedEduType = useSelector(getEditFinishedEduTypeError);

    useEffect(() => {
        if (finishedEduTypeId) {
            dispatch(fetchFinishedEduTypeDetail(finishedEduTypeId));
        }
    }, [dispatch, finishedEduTypeId]);

    const onCloseModal = () => {
        setVisible(false);
        setValidated(false);
        setFormWithErrors(false);
    };

    const onCancelHandler = () => {
        onCloseModal();
        dispatch(editFinishedEduTypeActions.clearNewFields());
    };

    const onDeleteHandler = (finishedEduType: FinishedEduTypesType) => {
        onDeleteFinishedEduType(finishedEduType);
        onCloseModal();
    };

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editFinishedEduTypeActions.setTitle(event.target.value));
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
            if (finishedEduTypeDetailData?.id_fromacceptedfinished === editFinishedEduTypeNewFieldsData) {
                addToast(Toast.error('Для сохранения вы должны внести изменения!'));
            } else {
                const result = await dispatch(editFinishedEduType(finishedEduTypeId));

                if (result.meta.requestStatus === 'fulfilled') {
                    addToast(Toast.success('Информация о типе окончания обучения успешно обновлена'));
                    onCancelHandler();
                }

                if (result.meta.requestStatus === 'rejected') {
                    setFormWithErrors(true);
                }
            }
        }
    };

    let content;

    if (isLoadingEditFinishedEduType || isLoadingFinishedEduTypeDetail) {
        content = (
            <Skeleton width="100%" height={80} />
        );
    } else if (errorFinishedEduTypeDetail) {
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
                                placeholder="основную школу"
                                // @ts-ignore
                                feedbackValid={errorsEditFinishedEduType ? '' : 'Здорово!'}
                                invalid={!!errorsEditFinishedEduType}
                                feedbackInvalid="Введите корректные данные"
                                value={editFinishedEduTypeNewFieldsData || ''}
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
                className={classNames(cls.EditFinishedEduType, {}, [className])}
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
                            isLoadingEditFinishedEduType || isLoadingFinishedEduTypeDetail
                                ? <Skeleton width={200} height={30} />
                                : (
                                    <CModalTitle>
                                        Изменение типа окончания обучения №
                                        {finishedEduTypeDetailData?.id_fromacceptedfinished}
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
                                onClick={() => { onDeleteHandler(finishedEduTypeDetailData!); }}
                                disabled={isLoadingFinishedEduTypeDetail
                                    || isLoadingEditFinishedEduType
                                    || !!errorFinishedEduTypeDetail}
                            >
                                <CIcon icon={cilTrash} className={cls.btnIcon} />
                                Удалить
                            </CButton>
                            <CButton
                                color="success"
                                type="submit"
                                className={classNames(cls.footerBtn, {}, [cls.greenBtn])}
                                disabled={isLoadingFinishedEduTypeDetail
                                    || isLoadingEditFinishedEduType
                                    || !!errorFinishedEduTypeDetail}
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
