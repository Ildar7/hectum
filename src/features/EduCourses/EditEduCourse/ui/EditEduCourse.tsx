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
import { EduCoursesType } from 'entities/EduCourses';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Toast } from 'shared/ui/Toast/Toast';
import { CFormInputWithMask } from 'shared/ui/InputMask/InputMask';
import { editEduCourseActions } from 'features/EduCourses/EditEduCourse';
import {
    fetchEduCourseDetail,
    getEduCourseDetailData,
    getEduCourseDetailError,
    getEduCourseDetailIsLoading,
} from 'entities/EduCourseDetail';
import {
    editEduCourse,
} from 'features/EduCourses/EditEduCourse/model/services/editEduCourse/editEduCourse';
import {
    getEditEduCourseIsLoading,
} from '../model/selectors/getEditEduCourseIsLoading/getEditEduCourseIsLoading';
import { getEditEduCourseError } from '../model/selectors/getEditEduCourseError/getEditEduCourseError';
import cls from './EditEduCourse.module.scss';
import {
    getEditEduCourseNewFieldsData,
} from '../model/selectors/getEditEduCourseNewFieldsData/getEditEduCourseNewFieldsData';

interface EditEduCourseProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    eduCourseId: string;
    onDeleteEduCourse: (eduCourse: EduCoursesType) => void;
}
export const EditEduCourse = (props: EditEduCourseProps) => {
    const {
        className,
        visible,
        setVisible,
        eduCourseId,
        onDeleteEduCourse,
    } = props;
    const dispatch = useAppDispatch();
    const [toast, addToast] = useState<ReactElement>();
    const toaster = useRef<HTMLDivElement | null>(null);
    const [validated, setValidated] = useState<boolean>(false);
    const [formWithErrors, setFormWithErrors] = useState<boolean>(false);

    const eduCourseDetailData = useSelector(getEduCourseDetailData);
    const isLoadingEduCourseDetail = useSelector(getEduCourseDetailIsLoading);
    const errorEduCourseDetail = useSelector(getEduCourseDetailError);

    const isLoadingEditEduCourse = useSelector(getEditEduCourseIsLoading);
    const editEduCourseNewFieldsData = useSelector(getEditEduCourseNewFieldsData);
    const errorsEditEduCourse = useSelector(getEditEduCourseError);

    useEffect(() => {
        if (eduCourseId) {
            dispatch(fetchEduCourseDetail(eduCourseId));
        }
    }, [dispatch, eduCourseId]);

    const onCloseModal = () => {
        setVisible(false);
        setValidated(false);
        setFormWithErrors(false);
    };

    const onCancelHandler = () => {
        onCloseModal();
        dispatch(editEduCourseActions.clearNewFields());
    };

    const onDeleteHandler = (eduCourse: EduCoursesType) => {
        onDeleteEduCourse(eduCourse);
        onCloseModal();
    };

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editEduCourseActions.setTitle(event.target.value));
    };

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editEduCourseActions.setValue(event.target.value));
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
            if (eduCourseDetailData?.courseoftraining === editEduCourseNewFieldsData?.title
            && eduCourseDetailData?.coursevalue.toString() === editEduCourseNewFieldsData?.value) {
                addToast(Toast.error('Для сохранения вы должны внести изменения!'));
            } else {
                const result = await dispatch(editEduCourse(eduCourseId));

                if (result.meta.requestStatus === 'fulfilled') {
                    addToast(Toast.success('Информация о номере учебного курса успешно обновлена'));
                    onCancelHandler();
                }

                if (result.meta.requestStatus === 'rejected') {
                    setFormWithErrors(true);
                }
            }
        }
    };

    let content;

    if (isLoadingEditEduCourse || isLoadingEduCourseDetail) {
        content = (
            <Skeleton width="100%" height={80} />
        );
    } else if (errorEduCourseDetail) {
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
                                placeholder="1 курс"
                                // @ts-ignore
                                feedbackValid={errorsEditEduCourse ? '' : 'Здорово!'}
                                invalid={!!errorsEditEduCourse}
                                feedbackInvalid="Введите корректные данные"
                                value={editEduCourseNewFieldsData?.title || ''}
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.newAddField}>
                            <h6 className={cls.newAddFieldTitle}>Номер учебного курса</h6>
                            <CFormInputWithMask
                                type="number"
                                placeholder="1"
                                // @ts-ignore
                                feedbackValid={errorsEditEduCourse ? '' : 'Здорово!'}
                                invalid={!!errorsEditEduCourse}
                                feedbackInvalid="Введите корректные данные"
                                value={editEduCourseNewFieldsData?.value || ''}
                                onChange={onChangeValue}
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
                className={classNames(cls.EditEduCourse, {}, [className])}
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
                            isLoadingEditEduCourse || isLoadingEduCourseDetail
                                ? <Skeleton width={200} height={30} />
                                : (
                                    <CModalTitle>
                                        Изменение номера учебного курса №
                                        {eduCourseDetailData?.id_courseoftraining}
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
                                onClick={() => { onDeleteHandler(eduCourseDetailData!); }}
                                disabled={isLoadingEduCourseDetail
                                    || isLoadingEditEduCourse
                                    || !!errorEduCourseDetail}
                            >
                                <CIcon icon={cilTrash} className={cls.btnIcon} />
                                Удалить
                            </CButton>
                            <CButton
                                color="success"
                                type="submit"
                                className={classNames(cls.footerBtn, {}, [cls.greenBtn])}
                                disabled={isLoadingEduCourseDetail
                                    || isLoadingEditEduCourse
                                    || !!errorEduCourseDetail}
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
