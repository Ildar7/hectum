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
import { EnrollmentTypesType } from 'entities/EnrollmentTypes';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Toast } from 'shared/ui/Toast/Toast';
import { CFormInputWithMask } from 'shared/ui/InputMask/InputMask';
import {
    CitizenshipType, getCitizenshipData, getCitizenshipError, getCitizenshipIsLoading,
} from 'entities/Citizenship';
import {
    fetchCitizenshipDetail,
    getCitizenshipDetailData,
    getCitizenshipDetailError,
    getCitizenshipDetailIsLoading,
} from 'entities/CitizenshipDetail';
import { editCitizenship, editCitizenshipActions } from 'features/Citizenship/EditCitizenship';
import { addCitizenshipActions } from 'features/Citizenship/AddCitizenship';
import { detectInvalidInput } from 'shared/lib/errors/detectInvalidInput/detectInvalidInput';
import { setInvalidInputMessage } from 'shared/lib/errors/setInvalidInputMessage/setInvalidInputMessage';
import cls from './EditCitizenship.module.scss';
import {
    getEditCitizenshipIsLoading,
} from '../model/selectors/getEditCitizenshipIsLoading/getEditCitizenshipIsLoading';
import {
    getEditCitizenshipNewFieldsData,
} from '../model/selectors/getEditCitizenshipNewFieldsData/getEditCitizenshipNewFieldsData';
import {
    getEditCitizenshipError,
} from '../model/selectors/getEditCitizenshipError/getEditCitizenshipError';

interface EditCitizenshipProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    citizenshipId: string;
    onDeleteCitizenship: (citizenship: CitizenshipType) => void;
}
export const EditCitizenship = (props: EditCitizenshipProps) => {
    const {
        className,
        visible,
        setVisible,
        citizenshipId,
        onDeleteCitizenship,
    } = props;
    const dispatch = useAppDispatch();
    const [toast, addToast] = useState<ReactElement>();
    const toaster = useRef<HTMLDivElement | null>(null);
    const [validated, setValidated] = useState<boolean>(false);
    const [formWithErrors, setFormWithErrors] = useState<boolean>(false);

    const citizenshipDetailData = useSelector(getCitizenshipDetailData);
    const isLoadingCitizenshipDetail = useSelector(getCitizenshipDetailIsLoading);
    const errorCitizenshipDetail = useSelector(getCitizenshipDetailError);

    const isLoadingEditCitizenship = useSelector(getEditCitizenshipIsLoading);
    const editCitizenshipNewFieldsData = useSelector(getEditCitizenshipNewFieldsData);
    const errorsEditCitizenship = useSelector(getEditCitizenshipError);

    const citizenshipData = useSelector(getCitizenshipData);
    const isLoadingCitizenship = useSelector(getCitizenshipIsLoading);
    const errorCitizenship = useSelector(getCitizenshipError);

    useEffect(() => {
        if (citizenshipId) {
            dispatch(fetchCitizenshipDetail(citizenshipId));
        }
    }, [dispatch, citizenshipId]);

    const onCloseModal = () => {
        setVisible(false);
        setValidated(false);
        setFormWithErrors(false);
    };

    const onCancelHandler = () => {
        onCloseModal();
        dispatch(editCitizenshipActions.clearNewFields());
    };

    const onDeleteHandler = (citizenship: CitizenshipType) => {
        onDeleteCitizenship(citizenship);
        onCloseModal();
    };

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editCitizenshipActions.setName(event.target.value));
    };

    const onChangeCountryId = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(editCitizenshipActions.setCountryId(event.target.value));
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
            if (citizenshipDetailData?.citizenship === editCitizenshipNewFieldsData?.name
            && citizenshipDetailData?.country_id === editCitizenshipNewFieldsData?.country_id) {
                addToast(Toast.error('Для сохранения вы должны внести изменения!'));
            } else {
                const result = await dispatch(editCitizenship(citizenshipId));

                if (result.meta.requestStatus === 'fulfilled') {
                    addToast(Toast.success('Информация о гражданстве успешно обновлена'));
                    onCancelHandler();
                }

                if (result.meta.requestStatus === 'rejected') {
                    setFormWithErrors(true);
                }
            }
        }
    };

    let content;

    if (isLoadingEditCitizenship || isLoadingCitizenshipDetail || isLoadingCitizenship) {
        content = (
            <Skeleton width="100%" height={80} />
        );
    } else if (errorCitizenshipDetail || errorCitizenship) {
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
                            <h6 className={cls.newAddFieldTitle}>ID страны</h6>
                            <CFormSelect
                                className={cls.selectFilter}
                                value={editCitizenshipNewFieldsData?.country_id || ''}
                                onChange={onChangeCountryId}
                                feedbackValid={
                                    detectInvalidInput(errorsEditCitizenship, 'country_id')
                                        ? ''
                                        : 'Отлично!'
                                }
                                feedbackInvalid={setInvalidInputMessage(
                                    detectInvalidInput(errorsEditCitizenship, 'country_id'),
                                    errorsEditCitizenship,
                                    'country_id',
                                )}
                                required
                            >
                                <option value="">Не выбрано</option>
                                {
                                    citizenshipData?.data.map((citizenship) => (
                                        <option
                                            key={citizenship.id_citizenship}
                                            value={citizenship.country_id}
                                        >
                                            {citizenship.country_id}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.newAddField}>
                            <h6 className={cls.newAddFieldTitle}>Наименование</h6>
                            <CFormInputWithMask
                                type="text"
                                placeholder="Казахстан"
                                // @ts-ignore
                                feedbackValid={errorsEditCitizenship ? '' : 'Здорово!'}
                                invalid={!!errorsEditCitizenship}
                                feedbackInvalid="Введите корректные данные"
                                value={editCitizenshipNewFieldsData?.name || ''}
                                onChange={onChangeName}
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
                            isLoadingEditCitizenship || isLoadingCitizenshipDetail
                                ? <Skeleton width={300} height={30} />
                                : (
                                    <CModalTitle>
                                        Изменение гражданства №
                                        {citizenshipDetailData?.id_citizenship}
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
                                onClick={() => { onDeleteHandler(citizenshipDetailData!); }}
                                disabled={isLoadingCitizenshipDetail
                                    || isLoadingEditCitizenship
                                    || isLoadingCitizenship
                                    || !!errorCitizenshipDetail
                                    || !!errorCitizenship}
                            >
                                <CIcon icon={cilTrash} className={cls.btnIcon} />
                                Удалить
                            </CButton>
                            <CButton
                                color="success"
                                type="submit"
                                className={classNames(cls.footerBtn, {}, [cls.greenBtn])}
                                disabled={isLoadingCitizenshipDetail
                                    || isLoadingEditCitizenship
                                    || isLoadingCitizenship
                                    || !!errorCitizenshipDetail
                                    || !!errorCitizenship}
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
