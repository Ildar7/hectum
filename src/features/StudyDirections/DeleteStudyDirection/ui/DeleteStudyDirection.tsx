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
import { StudyDirectionsType } from 'entities/StudyDirections';
import cls from './DeleteStudyDirection.module.scss';
import { deleteStudyDirection } from '../model/services/deleteStudyDirection/deleteStudyDirection';

interface DeleteStudyDirectionProps {
    className?: string;
    studyDirection: StudyDirectionsType | undefined;
    visible: boolean;
    setVisible: (value: boolean) => void;
}
export const DeleteStudyDirection = (props: DeleteStudyDirectionProps) => {
    const {
        className,
        studyDirection,
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
        dispatch(deleteStudyDirection(id))
            .then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    addToast(Toast.success(`Студенческое направление №${studyDirection?.id_typeofdirection} удалено`));
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
                className={classNames(cls.DeleteStudyDirection, {}, [className])}
                visible={visible}
                onClose={onCloseModal}
                size="lg"
                alignment="center"
            >
                <CModalHeader>
                    <CModalTitle>
                        Удаление студенческого направления №
                        {studyDirection?.id_typeofdirection}
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Text
                        size={TextSize.XM}
                        className={cls.deleteText}
                    >
                        Вы действительно хотите
                        удалить студенческое направление
                        {' '}
                        <span>
                            №
                            {studyDirection?.id_typeofdirection}
                            {' '}
                            -
                            {' '}
                            {`"${studyDirection?.typeofdirection}"`}
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
                            onClick={() => { onDeleteUser(studyDirection!.id_typeofdirection.toString()); }}
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
