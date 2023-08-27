import { classNames } from 'shared/lib/classNames/classNames';
import {
    CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CToaster,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import React, { ReactElement, useRef, useState } from 'react';
import { Text, TextSize, TextWeight } from 'shared/ui/Text/Text';
import { StudentsType } from 'entities/Students';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteStudent } from 'features/Students/DeleteStudent/model/services/deleteStudent/deleteStudent';
import { Toast } from 'shared/ui/Toast/Toast';
import { useSelector } from 'react-redux';
import cls from './DeleteStudent.module.scss';

interface DeleteStudentProps {
    className?: string;
    student: StudentsType | undefined;
    visible: boolean;
    setVisible: (value: boolean) => void;
}
export const DeleteStudent = (props: DeleteStudentProps) => {
    const {
        className,
        student,
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
        dispatch(deleteStudent(id))
            .then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    addToast(Toast.success(`Студент №${student?.students_id} удален`));
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
                className={classNames(cls.DeleteStudent, {}, [className])}
                visible={visible}
                onClose={onCloseModal}
                size="lg"
                alignment="center"
            >
                <CModalHeader>
                    <CModalTitle>
                        Удаление студента №
                        {student?.students_id}
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Text
                        size={TextSize.XM}
                        className={cls.deleteText}
                    >
                        Вы действительно хотите
                        удалить студента
                        {' '}
                        <span>
                            №
                            {student?.students_id}
                            {' '}
                            -
                            {' '}
                            {student?.fio}
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
                            onClick={() => { onDeleteUser(student!.students_id!.toString()); }}
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
