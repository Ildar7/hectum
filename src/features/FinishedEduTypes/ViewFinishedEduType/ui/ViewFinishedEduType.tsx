import { classNames } from 'shared/lib/classNames/classNames';
import {
    CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPen, cilTrash } from '@coreui/icons';
import {
    Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import React, { useEffect } from 'react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    fetchFinishedEduTypeDetail,
    getFinishedEduTypeDetailData,
    getFinishedEduTypeDetailError,
    getFinishedEduTypeDetailIsLoading,
} from 'entities/FinishedEduTypeDetail';
import { FinishedEduTypesType } from 'entities/FinishedEduTypes';
import cls from './ViewFinishedEduType.module.scss';

interface ViewFinishedEduTypeProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    finishedEduTypeId: string;
    onDeleteFinishedEduType: (finishedEduType: FinishedEduTypesType) => void;
    onEditFinishedEduType: (id: string) => void;
}
export const ViewFinishedEduType = (props: ViewFinishedEduTypeProps) => {
    const {
        className,
        visible,
        setVisible,
        finishedEduTypeId,
        onDeleteFinishedEduType,
        onEditFinishedEduType,
    } = props;
    const dispatch = useAppDispatch();

    const finishedEduTypeDetailData = useSelector(getFinishedEduTypeDetailData);
    const isLoadingFinishedEduTypeDetail = useSelector(getFinishedEduTypeDetailIsLoading);
    const errorFinishedEduTypeDetail = useSelector(getFinishedEduTypeDetailError);

    useEffect(() => {
        if (finishedEduTypeId) {
            dispatch(fetchFinishedEduTypeDetail(finishedEduTypeId));
        }
    }, [dispatch, finishedEduTypeId]);

    const onCloseModal = () => {
        setVisible(false);
    };

    const onDeleteHandler = (finishedEduType: FinishedEduTypesType) => {
        onDeleteFinishedEduType(finishedEduType);
        onCloseModal();
    };

    const onEditHandler = (id: string) => {
        onEditFinishedEduType(id);
        onCloseModal();
    };

    let content;

    if (isLoadingFinishedEduTypeDetail) {
        content = (
            <Skeleton width="100%" height={120} />
        );
    } else if (errorFinishedEduTypeDetail) {
        content = (
            <Text
                theme={TextTheme.ERROR}
                size={TextSize.M}
                weight={TextWeight.BOLD}
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
                            <h6 className={cls.newAddFieldTitle}>ID типа окончания обучения</h6>
                            <Text
                                size={TextSize.S}
                                weight={TextWeight.BOLD}
                            >
                                {finishedEduTypeDetailData?.id_fromacceptedfinished}
                            </Text>
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.newAddField}>
                            <h6 className={cls.newAddFieldTitle}>Наименование</h6>
                            <Text
                                size={TextSize.S}
                                weight={TextWeight.BOLD}
                            >
                                {finishedEduTypeDetailData?.fromacceptedfinished}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <CModal
            className={classNames(cls.ViewFinishedEduType, {}, [className, 'view-student-modal'])}
            visible={visible}
            onClose={onCloseModal}
            alignment="center"
        >
            <CModalHeader>
                {
                    isLoadingFinishedEduTypeDetail
                        ? <Skeleton width={200} height={30} />
                        : (
                            <CModalTitle>
                                Тип окончания обучения №
                                {finishedEduTypeDetailData?.id_fromacceptedfinished}
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
                <div />
                <div className={cls.footerBtns}>
                    <CButton
                        color="primary"
                        variant="outline"
                        className={cls.footerBtn}
                        onClick={onCloseModal}
                    >
                        Закрыть
                    </CButton>
                    <CButton
                        color="danger"
                        className={classNames(cls.footerBtn, {}, [cls.redBtn])}
                        onClick={() => { onDeleteHandler(finishedEduTypeDetailData!); }}
                        disabled={
                            isLoadingFinishedEduTypeDetail
                            || !!errorFinishedEduTypeDetail
                        }
                    >
                        <CIcon icon={cilTrash} className={cls.btnIcon} />
                        Удалить
                    </CButton>
                    <CButton
                        color="primary"
                        className={cls.footerBtn}
                        onClick={() => { onEditHandler(finishedEduTypeId); }}
                        disabled={
                            isLoadingFinishedEduTypeDetail
                            || !!errorFinishedEduTypeDetail
                        }
                    >
                        <CIcon icon={cilPen} className={cls.btnIcon} />
                        Редактировать
                    </CButton>
                </div>
            </CModalFooter>
        </CModal>
    );
};
