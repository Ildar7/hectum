import { classNames } from 'shared/lib/classNames/classNames';
import {
    CButton, CForm, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CToaster,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilWarning } from '@coreui/icons';
import { Text, TextSize, TextWeight } from 'shared/ui/Text/Text';
import React, {
    ReactElement, useCallback, useRef, useState,
} from 'react';
import { CFormInputWithMask } from 'shared/ui/InputMask/InputMask';
import { useSelector } from 'react-redux';
import {
    getAddStudyDurationTitle,
} from 'features/StudyDurations/AddStudyDuration/model/selectors/getAddStudyDurationTitle/getAddStudyDurationTitle';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addStudyDurationActions } from 'features/StudyDurations/AddStudyDuration';
import { Toast } from 'shared/ui/Toast/Toast';
import { getAddStudyDurationError } from '../model/selectors/getAddStudyDurationError/getAddStudyDurationError';
import cls from './AddStudyDuration.module.scss';
import { addStudyDuration } from '../model/services/addStudyDuration/addStudyDuration';

interface AddStudyDurationProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
}
export const AddStudyDuration = (props: AddStudyDurationProps) => {
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
    const addStudyDurationTitle = useSelector(getAddStudyDurationTitle);
    const addStudyDurationValidationErrors = useSelector(getAddStudyDurationError);

    const onCloseModal = useCallback(() => {
        setVisible(false);
    }, [setVisible]);

    const onCancelAdding = () => {
        onCloseModal();
        setValidated(false);
        setFormWithErrors(false);
    };

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(addStudyDurationActions.setTitle(event.target.value));
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
            if (addStudyDurationTitle) {
                const result = await dispatch(addStudyDuration());

                if (result.meta.requestStatus === 'fulfilled') {
                    addToast(Toast.success('Продолжительность обучения добавлена'));
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
                className={classNames(cls.AddStudyDuration, {}, [className])}
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
                        <CModalTitle>Добавление продолжительности обучения</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <div className={cls.tab}>
                            <div className={cls.tabBlock}>
                                <div className={cls.settings}>
                                    <div className={cls.newAddField}>
                                        <h6 className={cls.newAddFieldTitle}>Наименование*</h6>
                                        <CFormInputWithMask
                                            type="text"
                                            placeholder="2 года"
                                            // @ts-ignore
                                            feedbackValid={addStudyDurationValidationErrors ? '' : 'Здорово!'}
                                            invalid={!!addStudyDurationValidationErrors}
                                            feedbackInvalid="Введите корректные данные!"
                                            value={addStudyDurationTitle || ''}
                                            onChange={onChangeInput}
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
