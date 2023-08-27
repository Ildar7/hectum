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
import { StudyDurationsType } from 'entities/StudyDurations';
import cls from './DeleteStudyDuration.module.scss';
import { deleteStudyDuration } from '../model/services/deleteStudyDuration/deleteStudyDuration';

interface DeleteStudyDurationProps {
    className?: string;
    studyDuration: StudyDurationsType | undefined;
    visible: boolean;
    setVisible: (value: boolean) => void;
}
export const DeleteStudyDuration = (props: DeleteStudyDurationProps) => {
    const {
        className,
        studyDuration,
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
        dispatch(deleteStudyDuration(id))
            .then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    addToast(Toast.success(`Продолжительность обучения №${studyDuration?.id_durationoftraining} удалена`));
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
                className={classNames(cls.DeleteStudyDuration, {}, [className])}
                visible={visible}
                onClose={onCloseModal}
                size="lg"
                alignment="center"
            >
                <CModalHeader>
                    <CModalTitle>
                        Удаление продолжительности обучения №
                        {studyDuration?.id_durationoftraining}
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Text
                        size={TextSize.XM}
                        className={cls.deleteText}
                    >
                        Вы действительно хотите
                        удалить продолжительность обучения
                        {' '}
                        <span>
                            №
                            {studyDuration?.id_durationoftraining}
                            {' '}
                            -
                            {' '}
                            {`"${studyDuration?.durationoftraining}"`}
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
                            onClick={() => { onDeleteUser(studyDuration!.id_durationoftraining.toString()); }}
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
