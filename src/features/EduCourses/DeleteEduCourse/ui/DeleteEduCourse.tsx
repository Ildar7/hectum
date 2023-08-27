import { classNames } from 'shared/lib/classNames/classNames';
import {
    CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CToaster,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import React, { ReactElement, useRef, useState } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Toast } from 'shared/ui/Toast/Toast';
import { EduCoursesType } from 'entities/EduCourses';
import cls from './DeleteEduCourse.module.scss';
import { deleteEduCourse } from '../model/services/deleteEduCourse/deleteEduCourse';

interface DeleteEduCourseProps {
    className?: string;
    eduCourse: EduCoursesType | undefined;
    visible: boolean;
    setVisible: (value: boolean) => void;
}
export const DeleteEduCourse = (props: DeleteEduCourseProps) => {
    const {
        className,
        eduCourse,
        visible,
        setVisible,
    } = props;
    const dispatch = useAppDispatch();
    const [toast, addToast] = useState<ReactElement>();
    const toaster = useRef<HTMLDivElement | null>(null);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const onCloseModal = () => {
        setVisible(false);
    };

    const onDeleteUser = (id: string) => {
        setLoadingDelete(true);
        dispatch(deleteEduCourse(id))
            .then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    addToast(Toast.success(`Номер учебного курса №${eduCourse?.id_courseoftraining} удален`));
                    onCloseModal();
                    setLoadingDelete(false);
                } else if (res.meta.requestStatus === 'rejected') {
                    addToast(Toast.error('Произошла ошибка при удалении, попробуйте снова'));
                    setLoadingDelete(false);
                }
            });
    };

    return (
        <>
            <CModal
                className={classNames(cls.DeleteEduCourse, {}, [className])}
                visible={visible}
                onClose={onCloseModal}
                size="lg"
                alignment="center"
            >
                <CModalHeader>
                    <CModalTitle>
                        Удаление номера учебного курса №
                        {eduCourse?.id_courseoftraining}
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Text
                        size={TextSize.XM}
                        className={cls.deleteText}
                    >
                        Вы действительно хотите
                        удалить номер учебного курса
                        {' '}
                        <span>
                            №
                            {eduCourse?.id_courseoftraining}
                            {' '}
                            -
                            {' '}
                            {`"${eduCourse?.courseoftraining}"`}
                        </span>
                        {' '}
                        и все связанные с ним данные?
                    </Text>
                </CModalBody>
                <CModalFooter
                    className={cls.footer}
                >
                    <div className={cls.footerBtns}>
                        <CButton
                            color="primary"
                            variant="outline"
                            className={cls.footerBtn}
                            onClick={onCloseModal}
                        >
                            Отмена
                        </CButton>
                        <CButton
                            color="danger"
                            className={classNames(cls.footerBtn, {}, [cls.redBtn])}
                            onClick={() => { onDeleteUser(eduCourse!.id_courseoftraining.toString()); }}
                            disabled={loadingDelete}
                        >
                            <CIcon icon={cilTrash} className={cls.btnIcon} />
                            Удалить
                        </CButton>
                    </div>
                </CModalFooter>
            </CModal>

            <CToaster
                ref={toaster}
                push={toast}
                placement="top-end"
            />
        </>
    );
};
