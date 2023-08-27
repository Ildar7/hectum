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
    fetchNationalityDetail,
    getNationalityDetailData,
    getNationalityDetailError,
    getNationalityDetailIsLoading,
} from 'entities/NationalityDetail';
import { NationalitiesType } from 'entities/Nationalities';
import cls from './ViewNationality.module.scss';

interface ViewNationalityProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    nationalityId: string;
    onDeleteNationality: (nationality: NationalitiesType) => void;
    onEditNationality: (id: string) => void;
}
export const ViewNationality = (props: ViewNationalityProps) => {
    const {
        className,
        visible,
        setVisible,
        nationalityId,
        onDeleteNationality,
        onEditNationality,
    } = props;
    const dispatch = useAppDispatch();

    const nationalityDetailData = useSelector(getNationalityDetailData);
    const isLoadingNationalityDetail = useSelector(getNationalityDetailIsLoading);
    const errorNationalityDetail = useSelector(getNationalityDetailError);

    useEffect(() => {
        if (nationalityId) {
            dispatch(fetchNationalityDetail(nationalityId));
        }
    }, [dispatch, nationalityId]);

    const onCloseModal = () => {
        setVisible(false);
    };

    const onDeleteHandler = (nationality: NationalitiesType) => {
        onDeleteNationality(nationality);
        onCloseModal();
    };

    const onEditHandler = (id: string) => {
        onEditNationality(id);
        onCloseModal();
    };

    let content;

    if (isLoadingNationalityDetail) {
        content = (
            <Skeleton width="100%" height={120} />
        );
    } else if (errorNationalityDetail) {
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
                            <h6 className={cls.newAddFieldTitle}>ID национальности</h6>
                            <Text
                                size={TextSize.S}
                                weight={TextWeight.BOLD}
                            >
                                {nationalityDetailData?.id_nationality}
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
                                {nationalityDetailData?.nationality}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <CModal
            className={classNames(cls.ViewNationality, {}, [className, 'view-student-modal'])}
            visible={visible}
            onClose={onCloseModal}
            alignment="center"
        >
            <CModalHeader>
                {
                    isLoadingNationalityDetail
                        ? <Skeleton width={200} height={30} />
                        : (
                            <CModalTitle>
                                Национальность №
                                {nationalityDetailData?.id_nationality}
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
                        onClick={() => { onDeleteHandler(nationalityDetailData!); }}
                        disabled={
                            isLoadingNationalityDetail
                            || !!errorNationalityDetail
                        }
                    >
                        <CIcon icon={cilTrash} className={cls.btnIcon} />
                        Удалить
                    </CButton>
                    <CButton
                        color="primary"
                        className={cls.footerBtn}
                        onClick={() => { onEditHandler(nationalityId); }}
                        disabled={
                            isLoadingNationalityDetail
                            || !!errorNationalityDetail
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
