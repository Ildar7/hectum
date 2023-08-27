import { classNames } from 'shared/lib/classNames/classNames';
import {
    CButton,
    CForm,
    CFormSelect,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CToaster,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilWarning } from '@coreui/icons';
import { Text, TextSize, TextWeight } from 'shared/ui/Text/Text';
import React, {
    ReactElement, useCallback, useRef, useState,
} from 'react';
import { CFormInputWithMask } from 'shared/ui/InputMask/InputMask';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Toast } from 'shared/ui/Toast/Toast';
import { detectInvalidInput } from 'shared/lib/errors/detectInvalidInput/detectInvalidInput';
import { setInvalidInputMessage } from 'shared/lib/errors/setInvalidInputMessage/setInvalidInputMessage';
import { getCitizenshipData } from 'entities/Citizenship';
import cls from './AddCitizenship.module.scss';
import { getAddCitizenshipCountryId } from '../model/selectors/getAddCitizenshipCountryId/getAddCitizenshipCountryId';
import { getAddCitizenshipName } from '../model/selectors/getAddCitizenshipName/getAddCitizenshipName';
import { getAddCitizenshipError } from '../model/selectors/getAddCitizenshipError/getAddCitizenshipError';
import { addCitizenshipActions } from '../model/slice/addCitizenshipSlice';
import { addCitizenship } from '../model/services/addCitizenship/addCitizenship';

interface AddCitizenshipProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
}
export const AddCitizenship = (props: AddCitizenshipProps) => {
    const {
        className,
        visible,
        setVisible,
    } = props;
    const dispatch = useAppDispatch();
    const [validated, setValidated] = useState<boolean>(false);
    const [formWithErrors, setFormWithErrors] = useState<boolean>(false);
    const [toast, addToast] = useState<ReactElement>();
    const toaster = useRef<HTMLDivElement | null>(null);
    const citizenships = useSelector(getCitizenshipData);
    const addCitizenshipName = useSelector(getAddCitizenshipName);
    const addCitizenshipCountryId = useSelector(getAddCitizenshipCountryId);
    const addCitizenshipValidationErrors = useSelector(getAddCitizenshipError);

    const onCloseModal = useCallback(() => {
        setVisible(false);
    }, [setVisible]);

    const onCancelAdding = () => {
        onCloseModal();
        setValidated(false);
        setFormWithErrors(false);
    };

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(addCitizenshipActions.setName(event.target.value));
    };

    const onChangeCountryId = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(addCitizenshipActions.setCountryId(event.target.value));
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
            if (addCitizenshipName && addCitizenshipCountryId) {
                const result = await dispatch(addCitizenship());

                if (result.meta.requestStatus === 'fulfilled') {
                    addToast(Toast.success('Гражданство успешно добавлено'));
                    onCancelAdding();
                }

                if (result.meta.requestStatus === 'rejected') {
                    setFormWithErrors(true);
                }
            } else {
                setFormWithErrors(true);
            }
        }
    };

    return (
        <>
            <CModal
                className={classNames(cls.AddCitizenship, {}, [className])}
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
                        <CModalTitle>Добавление гражданства</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <div className={cls.tab}>
                            <div className={cls.tabBlock}>
                                <div className={cls.settings}>
                                    <div className={cls.newAddField}>
                                        <h6 className={cls.newAddFieldTitle}>ID страны*</h6>
                                        <CFormSelect
                                            className={cls.selectFilter}
                                            value={addCitizenshipCountryId || ''}
                                            onChange={onChangeCountryId}
                                            feedbackValid={
                                                detectInvalidInput(addCitizenshipValidationErrors, 'country_id')
                                                    ? ''
                                                    : 'Отлично!'
                                            }
                                            feedbackInvalid={setInvalidInputMessage(
                                                detectInvalidInput(addCitizenshipValidationErrors, 'country_id'),
                                                addCitizenshipValidationErrors,
                                                'country_id',
                                            )}
                                            required
                                        >
                                            <option value="">Не выбрано</option>
                                            {
                                                citizenships?.data.map((citizenship) => (
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
                                        <h6 className={cls.newAddFieldTitle}>Наименование*</h6>
                                        <CFormInputWithMask
                                            type="text"
                                            placeholder="Казахстан"
                                            // @ts-ignore
                                            feedbackValid={addCitizenshipValidationErrors ? '' : 'Здорово!'}
                                            invalid={!!addCitizenshipValidationErrors}
                                            feedbackInvalid="Введите корректные данные!"
                                            value={addCitizenshipName || ''}
                                            onChange={onChangeName}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                onClick={onCancelAdding}
                            >
                                Отмена
                            </CButton>
                            <CButton
                                color="success"
                                type="submit"
                                className={classNames(cls.footerBtn, {}, [cls.greenBtn])}
                            >
                                <CIcon icon={cilPlus} className={cls.btnIcon} />
                                Добавить
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
