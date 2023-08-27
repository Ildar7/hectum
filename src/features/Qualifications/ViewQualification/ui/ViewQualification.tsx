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
    fetchQualificationDetail,
    getQualificationDetailData,
    getQualificationDetailError,
    getQualificationDetailIsLoading,
} from 'entities/QualificationDetail';
import { QualificationsType } from 'entities/Qualifications';
import cls from './ViewQualification.module.scss';

interface ViewQualificationProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    qualificationId: string;
    onDeleteQualification: (qualification: QualificationsType) => void;
    onEditQualification: (id: string) => void;
}
export const ViewQualification = (props: ViewQualificationProps) => {
    const {
        className,
        visible,
        setVisible,
        qualificationId,
        onDeleteQualification,
        onEditQualification,
    } = props;
    const dispatch = useAppDispatch();

    const qualificationDetailData = useSelector(getQualificationDetailData);
    const isLoadingQualificationDetail = useSelector(getQualificationDetailIsLoading);
    const errorQualificationDetail = useSelector(getQualificationDetailError);

    useEffect(() => {
        if (qualificationId) {
            dispatch(fetchQualificationDetail(qualificationId));
        }
    }, [dispatch, qualificationId]);

    const onCloseModal = () => {
        setVisible(false);
    };

    const onDeleteHandler = (qualification: QualificationsType) => {
        onDeleteQualification(qualification);
        onCloseModal();
    };

    const onEditHandler = (id: string) => {
        onEditQualification(id);
        onCloseModal();
    };

    let content;

    if (isLoadingQualificationDetail) {
        content = (
            <Skeleton width="100%" height={120} />
        );
    } else if (errorQualificationDetail) {
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
                            <h6 className={cls.newAddFieldTitle}>ID квалификации</h6>
                            <Text
                                size={TextSize.S}
                                weight={TextWeight.BOLD}
                            >
                                {qualificationDetailData?.id_qual}
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
                                {qualificationDetailData?.qualification}
                            </Text>
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.newAddField}>
                            <h6 className={cls.newAddFieldTitle}>Код квалификации</h6>
                            <Text
                                size={TextSize.S}
                                weight={TextWeight.BOLD}
                            >
                                {qualificationDetailData?.shifr_qual}
                            </Text>
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.newAddField}>
                            <h6 className={cls.newAddFieldTitle}>ID специализации</h6>
                            <Text
                                size={TextSize.S}
                                weight={TextWeight.BOLD}
                            >
                                {qualificationDetailData?.specialty_id}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <CModal
            className={classNames(cls.ViewQualification, {}, [className, 'view-student-modal'])}
            visible={visible}
            onClose={onCloseModal}
            alignment="center"
        >
            <CModalHeader>
                {
                    isLoadingQualificationDetail
                        ? <Skeleton width={200} height={30} />
                        : (
                            <CModalTitle>
                                Квалификация №
                                {qualificationDetailData?.id_qual}
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
                        onClick={() => { onDeleteHandler(qualificationDetailData!); }}
                        disabled={
                            isLoadingQualificationDetail
                            || !!errorQualificationDetail
                        }
                    >
                        <CIcon icon={cilTrash} className={cls.btnIcon} />
                        Удалить
                    </CButton>
                    <CButton
                        color="primary"
                        className={cls.footerBtn}
                        onClick={() => { onEditHandler(qualificationId); }}
                        disabled={
                            isLoadingQualificationDetail
                            || !!errorQualificationDetail
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
