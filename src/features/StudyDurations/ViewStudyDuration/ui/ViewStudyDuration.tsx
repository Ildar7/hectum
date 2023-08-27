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
    fetchStudyDurationDetail,
    getStudyDurationDetailData,
    getStudyDurationDetailError,
    getStudyDurationDetailIsLoading,
} from 'entities/StudyDurationDetail';
import { StudyDurationsType } from 'entities/StudyDurations';
import cls from './ViewStudyDuration.module.scss';

interface ViewStudyDurationProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    studyDurationId: string;
    onDeleteStudyDuration: (studyDuration: StudyDurationsType) => void;
    onEditStudyDuration: (id: string) => void;
}
export const ViewStudyDuration = (props: ViewStudyDurationProps) => {
    const {
        className,
        visible,
        setVisible,
        studyDurationId,
        onDeleteStudyDuration,
        onEditStudyDuration,
    } = props;
    const dispatch = useAppDispatch();

    const studyDurationDetailData = useSelector(getStudyDurationDetailData);
    const isLoadingStudyDurationDetail = useSelector(getStudyDurationDetailIsLoading);
    const errorStudyDurationDetail = useSelector(getStudyDurationDetailError);

    useEffect(() => {
        if (studyDurationId) {
            dispatch(fetchStudyDurationDetail(studyDurationId));
        }
    }, [dispatch, studyDurationId]);

    const onCloseModal = () => {
        setVisible(false);
    };

    const onDeleteHandler = (studyDuration: StudyDurationsType) => {
        onDeleteStudyDuration(studyDuration);
        onCloseModal();
    };

    const onEditHandler = (id: string) => {
        onEditStudyDuration(id);
        onCloseModal();
    };

    let content;

    if (isLoadingStudyDurationDetail) {
        content = (
            <Skeleton width="100%" height={120} />
        );
    } else if (errorStudyDurationDetail) {
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
                            <h6 className={cls.newAddFieldTitle}>ID продолжительности обучения</h6>
                            <Text
                                size={TextSize.S}
                                weight={TextWeight.BOLD}
                            >
                                {studyDurationDetailData?.id_durationoftraining}
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
                                {studyDurationDetailData?.durationoftraining}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <CModal
            className={classNames(cls.ViewStudyDuration, {}, [className, 'view-student-modal'])}
            visible={visible}
            onClose={onCloseModal}
            alignment="center"
        >
            <CModalHeader>
                {
                    isLoadingStudyDurationDetail
                        ? <Skeleton width={200} height={30} />
                        : (
                            <CModalTitle>
                                Продолжительность обучения №
                                {studyDurationDetailData?.id_durationoftraining}
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
                        onClick={() => { onDeleteHandler(studyDurationDetailData!); }}
                        disabled={
                            isLoadingStudyDurationDetail
                            || !!errorStudyDurationDetail
                        }
                    >
                        <CIcon icon={cilTrash} className={cls.btnIcon} />
                        Удалить
                    </CButton>
                    <CButton
                        color="primary"
                        className={cls.footerBtn}
                        onClick={() => { onEditHandler(studyDurationId); }}
                        disabled={
                            isLoadingStudyDurationDetail
                            || !!errorStudyDurationDetail
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
