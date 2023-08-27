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
    fetchStudyDirectionDetail,
    getStudyDirectionDetailData,
    getStudyDirectionDetailError,
    getStudyDirectionDetailIsLoading,
} from 'entities/StudyDirectionDetail';
import { StudyDirectionsType } from 'entities/StudyDirections';
import cls from './ViewStudyDirection.module.scss';

interface ViewStudyDirectionProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    studyDirectionId: string;
    onDeleteStudyDirection: (studyDirection: StudyDirectionsType) => void;
    onEditStudyDirection: (id: string) => void;
}
export const ViewStudyDirection = (props: ViewStudyDirectionProps) => {
    const {
        className,
        visible,
        setVisible,
        studyDirectionId,
        onDeleteStudyDirection,
        onEditStudyDirection,
    } = props;
    const dispatch = useAppDispatch();

    const studyDirectionDetailData = useSelector(getStudyDirectionDetailData);
    const isLoadingStudyDirectionDetail = useSelector(getStudyDirectionDetailIsLoading);
    const errorStudyDirectionDetail = useSelector(getStudyDirectionDetailError);

    useEffect(() => {
        if (studyDirectionId) {
            dispatch(fetchStudyDirectionDetail(studyDirectionId));
        }
    }, [dispatch, studyDirectionId]);

    const onCloseModal = () => {
        setVisible(false);
    };

    const onDeleteHandler = (studyDirection: StudyDirectionsType) => {
        onDeleteStudyDirection(studyDirection);
        onCloseModal();
    };

    const onEditHandler = (id: string) => {
        onEditStudyDirection(id);
        onCloseModal();
    };

    let content;

    if (isLoadingStudyDirectionDetail) {
        content = (
            <Skeleton width="100%" height={120} />
        );
    } else if (errorStudyDirectionDetail) {
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
                            <h6 className={cls.newAddFieldTitle}>ID студенческого направления</h6>
                            <Text
                                size={TextSize.S}
                                weight={TextWeight.BOLD}
                            >
                                {studyDirectionDetailData?.id_typeofdirection}
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
                                {studyDirectionDetailData?.typeofdirection}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <CModal
            className={classNames(cls.ViewStudyDirection, {}, [className, 'view-student-modal'])}
            visible={visible}
            onClose={onCloseModal}
            alignment="center"
        >
            <CModalHeader>
                {
                    isLoadingStudyDirectionDetail
                        ? <Skeleton width={200} height={30} />
                        : (
                            <CModalTitle>
                                Студенческое направление №
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
                        onClick={() => { onDeleteHandler(studyDirectionDetailData!); }}
                        disabled={
                            isLoadingStudyDirectionDetail
                            || !!errorStudyDirectionDetail
                        }
                    >
                        <CIcon icon={cilTrash} className={cls.btnIcon} />
                        Удалить
                    </CButton>
                    <CButton
                        color="primary"
                        className={cls.footerBtn}
                        onClick={() => { onEditHandler(studyDirectionId); }}
                        disabled={
                            isLoadingStudyDirectionDetail
                            || !!errorStudyDirectionDetail
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
