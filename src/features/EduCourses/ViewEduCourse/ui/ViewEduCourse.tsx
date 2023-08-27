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
    fetchEduCourseDetail,
    getEduCourseDetailData,
    getEduCourseDetailError,
    getEduCourseDetailIsLoading,
} from 'entities/EduCourseDetail';
import { EduCoursesType } from 'entities/EduCourses';
import cls from './ViewEduCourse.module.scss';

interface ViewEduCourseProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    eduCourseId: string;
    onDeleteEduCourse: (eduCourse: EduCoursesType) => void;
    onEditEduCourse: (id: string) => void;
}
export const ViewEduCourse = (props: ViewEduCourseProps) => {
    const {
        className,
        visible,
        setVisible,
        eduCourseId,
        onDeleteEduCourse,
        onEditEduCourse,
    } = props;
    const dispatch = useAppDispatch();

    const eduCourseDetailData = useSelector(getEduCourseDetailData);
    const isLoadingEduCourseDetail = useSelector(getEduCourseDetailIsLoading);
    const errorEduCourseDetail = useSelector(getEduCourseDetailError);

    useEffect(() => {
        if (eduCourseId) {
            dispatch(fetchEduCourseDetail(eduCourseId));
        }
    }, [dispatch, eduCourseId]);

    const onCloseModal = () => {
        setVisible(false);
    };

    const onDeleteHandler = (eduCourse: EduCoursesType) => {
        onDeleteEduCourse(eduCourse);
        onCloseModal();
    };

    const onEditHandler = (id: string) => {
        onEditEduCourse(id);
        onCloseModal();
    };

    let content;

    if (isLoadingEduCourseDetail) {
        content = (
            <Skeleton width="100%" height={120} />
        );
    } else if (errorEduCourseDetail) {
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
                            <h6 className={cls.newAddFieldTitle}>ID номера учебного курса</h6>
                            <Text
                                size={TextSize.S}
                                weight={TextWeight.BOLD}
                            >
                                {eduCourseDetailData?.id_courseoftraining}
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
                                {eduCourseDetailData?.courseoftraining}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <CModal
            className={classNames(cls.ViewEduCourse, {}, [className, 'view-student-modal'])}
            visible={visible}
            onClose={onCloseModal}
            alignment="center"
        >
            <CModalHeader>
                {
                    isLoadingEduCourseDetail
                        ? <Skeleton width={200} height={30} />
                        : (
                            <CModalTitle>
                                Номер учебного курса №
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
                        onClick={() => { onDeleteHandler(eduCourseDetailData!); }}
                        disabled={
                            isLoadingEduCourseDetail
                            || !!errorEduCourseDetail
                        }
                    >
                        <CIcon icon={cilTrash} className={cls.btnIcon} />
                        Удалить
                    </CButton>
                    <CButton
                        color="primary"
                        className={cls.footerBtn}
                        onClick={() => { onEditHandler(eduCourseId); }}
                        disabled={
                            isLoadingEduCourseDetail
                            || !!errorEduCourseDetail
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
