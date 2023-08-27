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
import { FinishedEduTypesType } from 'entities/FinishedEduTypes';
import cls from './DeleteFinishedEduType.module.scss';
import { deleteFinishedEduType } from '../model/services/deleteFinishedEduType/deleteFinishedEduType';

interface DeleteFinishedEduTypeProps {
    className?: string;
    finishedEduType: FinishedEduTypesType | undefined;
    visible: boolean;
    setVisible: (value: boolean) => void;
}
export const DeleteFinishedEduType = (props: DeleteFinishedEduTypeProps) => {
    const {
        className,
        finishedEduType,
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
        dispatch(deleteFinishedEduType(id))
            .then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    addToast(Toast.success(`Тип окончания обучения №${finishedEduType?.id_fromacceptedfinished} удален`));
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
                className={classNames(cls.DeleteFinishedEduType, {}, [className])}
                visible={visible}
                onClose={onCloseModal}
                size="lg"
                alignment="center"
            >
                <CModalHeader>
                    <CModalTitle>
                        Удаление типа окончания обучения №
                        {finishedEduType?.id_fromacceptedfinished}
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Text
                        size={TextSize.XM}
                        className={cls.deleteText}
                    >
                        Вы действительно хотите
                        удалить тип окончания обучения
                        {' '}
                        <span>
                            №
                            {finishedEduType?.id_fromacceptedfinished}
                            {' '}
                            -
                            {' '}
                            {`"${finishedEduType?.fromacceptedfinished}"`}
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
                            onClick={() => { onDeleteUser(finishedEduType!.id_fromacceptedfinished.toString()); }}
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
