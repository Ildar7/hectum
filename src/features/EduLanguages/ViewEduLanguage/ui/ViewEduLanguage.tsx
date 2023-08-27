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
    fetchEduLanguageDetail,
    getEduLanguageDetailData,
    getEduLanguageDetailError,
    getEduLanguageDetailIsLoading,
} from 'entities/EduLanguageDetail';
import { EduLanguagesType } from 'entities/EduLanguages';
import cls from './ViewEduLanguage.module.scss';

interface ViewEduLanguageProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    eduLanguageId: string;
    onDeleteEduLanguage: (eduLanguage: EduLanguagesType) => void;
    onEditEduLanguage: (id: string) => void;
}
export const ViewEduLanguage = (props: ViewEduLanguageProps) => {
    const {
        className,
        visible,
        setVisible,
        eduLanguageId,
        onDeleteEduLanguage,
        onEditEduLanguage,
    } = props;
    const dispatch = useAppDispatch();

    const eduLanguageDetailData = useSelector(getEduLanguageDetailData);
    const isLoadingEduLanguageDetail = useSelector(getEduLanguageDetailIsLoading);
    const errorEduLanguageDetail = useSelector(getEduLanguageDetailError);

    useEffect(() => {
        if (eduLanguageId) {
            dispatch(fetchEduLanguageDetail(eduLanguageId));
        }
    }, [dispatch, eduLanguageId]);

    const onCloseModal = () => {
        setVisible(false);
    };

    const onDeleteHandler = (eduLanguage: EduLanguagesType) => {
        onDeleteEduLanguage(eduLanguage);
        onCloseModal();
    };

    const onEditHandler = (id: string) => {
        onEditEduLanguage(id);
        onCloseModal();
    };

    let content;

    if (isLoadingEduLanguageDetail) {
        content = (
            <Skeleton width="100%" height={120} />
        );
    } else if (errorEduLanguageDetail) {
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
                            <h6 className={cls.newAddFieldTitle}>ID языка обучения</h6>
                            <Text
                                size={TextSize.S}
                                weight={TextWeight.BOLD}
                            >
                                {eduLanguageDetailData?.id_languageofedu}
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
                                {eduLanguageDetailData?.languageofedu}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <CModal
            className={classNames(cls.ViewEduLanguage, {}, [className, 'view-student-modal'])}
            visible={visible}
            onClose={onCloseModal}
            alignment="center"
        >
            <CModalHeader>
                {
                    isLoadingEduLanguageDetail
                        ? <Skeleton width={200} height={30} />
                        : (
                            <CModalTitle>
                                Язык обучения №
                                {eduLanguageDetailData?.id_languageofedu}
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
                        onClick={() => { onDeleteHandler(eduLanguageDetailData!); }}
                        disabled={
                            isLoadingEduLanguageDetail
                            || !!errorEduLanguageDetail
                        }
                    >
                        <CIcon icon={cilTrash} className={cls.btnIcon} />
                        Удалить
                    </CButton>
                    <CButton
                        color="primary"
                        className={cls.footerBtn}
                        onClick={() => { onEditHandler(eduLanguageId); }}
                        disabled={
                            isLoadingEduLanguageDetail
                            || !!errorEduLanguageDetail
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
