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
import { StudyDirectionsType } from 'entities/StudyDirections';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Toast } from 'shared/ui/Toast/Toast';
import { CFormInputWithMask } from 'shared/ui/InputMask/InputMask';
import { editStudyDirectionActions } from 'features/StudyDirections/EditStudyDirection';
import {
    fetchStudyDirectionDetail,
    getStudyDirectionDetailData,
    getStudyDirectionDetailError,
    getStudyDirectionDetailIsLoading,
} from 'entities/StudyDirectionDetail';
import {
    editStudyDirection,
} from 'features/StudyDirections/EditStudyDirection/model/services/editStudyDirection/editStudyDirection';
import {
    getEditStudyDirectionIsLoading,
} from '../model/selectors/getEditStudyDirectionIsLoading/getEditStudyDirectionIsLoading';
import { getEditStudyDirectionError } from '../model/selectors/getEditStudyDirectionError/getEditStudyDirectionError';
import cls from './EditStudyDirection.module.scss';
import {
    getEditStudyDirectionNewFieldsData,
} from '../model/selectors/getEditStudyDirectionNewFieldsData/getEditStudyDirectionNewFieldsData';

interface EditStudyDirectionProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    studyDirectionId: string;
    onDeleteStudyDirection: (studyDirection: StudyDirectionsType) => void;
}
export const EditStudyDirection = (props: EditStudyDirectionProps) => {
    const {
        className,
        visible,
        setVisible,
        studyDirectionId,
        onDeleteStudyDirection,
    } = props;
    const dispatch = useAppDispatch();
    const [toast, addToast] = useState<ReactElement>();
    const toaster = useRef<HTMLDivElement | null>(null);
    const [validated, setValidated] = useState<boolean>(false);
    const [formWithErrors, setFormWithErrors] = useState<boolean>(false);

    const studyDirectionDetailData = useSelector(getStudyDirectionDetailData);
    const isLoadingStudyDirectionDetail = useSelector(getStudyDirectionDetailIsLoading);
    const errorStudyDirectionDetail = useSelector(getStudyDirectionDetailError);

    const isLoadingEditStudyDirection = useSelector(getEditStudyDirectionIsLoading);
    const editStudyDirectionNewFieldsData = useSelector(getEditStudyDirectionNewFieldsData);
    const errorsEditStudyDirection = useSelector(getEditStudyDirectionError);

    useEffect(() => {
        if (studyDirectionId) {
            dispatch(fetchStudyDirectionDetail(studyDirectionId));
        }
    }, [dispatch, studyDirectionId]);

    const onCloseModal = () => {
        setVisible(false);
        setValidated(false);
        setFormWithErrors(false);
    };

    const onCancelHandler = () => {
        onCloseModal();
        dispatch(editStudyDirectionActions.clearNewFields());
    };

    const onDeleteHandler = (studyDirection: StudyDirectionsType) => {
        onDeleteStudyDirection(studyDirection);
        onCloseModal();
    };

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editStudyDirectionActions.setTitle(event.target.value));
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
            if (studyDirectionDetailData?.typeofdirection === editStudyDirectionNewFieldsData) {
                addToast(Toast.error('Для сохранения вы должны внести изменения!'));
            } else {
                const result = await dispatch(editStudyDirection(studyDirectionId));

                if (result.meta.requestStatus === 'fulfilled') {
                    addToast(Toast.success('Информация о студенческом направлении успешно обновлена'));
                    onCancelHandler();
                }

                if (result.meta.requestStatus === 'rejected') {
                    setFormWithErrors(true);
                }
            }
        }
    };

    let content;

    if (isLoadingEditStudyDirection || isLoadingStudyDirectionDetail) {
        content = (
            <Skeleton width="100%" height={80} />
        );
    } else if (errorStudyDirectionDetail) {
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
                                placeholder="научное"
                                // @ts-ignore
                                feedbackValid={errorsEditStudyDirection ? '' : 'Здорово!'}
                                invalid={!!errorsEditStudyDirection}
                                feedbackInvalid="Введите корректные данные"
                                value={editStudyDirectionNewFieldsData || ''}
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
                className={classNames(cls.EditStudyDirection, {}, [className])}
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
                            isLoadingEditStudyDirection || isLoadingStudyDirectionDetail
                                ? <Skeleton width={200} height={30} />
                                : (
                                    <CModalTitle>
                                        Изменение студенческого направления №
                                        {studyDirectionDetailData?.id_typeofdirection}
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
                                onClick={() => { onDeleteHandler(studyDirectionDetailData!); }}
                                disabled={isLoadingStudyDirectionDetail
                                    || isLoadingEditStudyDirection
                                    || !!errorStudyDirectionDetail}
                            >
                                <CIcon icon={cilTrash} className={cls.btnIcon} />
                                Удалить
                            </CButton>
                            <CButton
                                color="success"
                                type="submit"
                                className={classNames(cls.footerBtn, {}, [cls.greenBtn])}
                                disabled={isLoadingStudyDirectionDetail
                                    || isLoadingEditStudyDirection
                                    || !!errorStudyDirectionDetail}
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
