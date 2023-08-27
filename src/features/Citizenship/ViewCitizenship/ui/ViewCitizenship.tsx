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
import { CitizenshipType } from 'entities/Citizenship';
import {
    fetchCitizenshipDetail,
    getCitizenshipDetailData,
    getCitizenshipDetailError,
    getCitizenshipDetailIsLoading,
} from 'entities/CitizenshipDetail';
import cls from './ViewCitizenship.module.scss';

interface ViewCitizenshipProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    citizenshipId: string;
    onDeleteCitizenship: (citizenship: CitizenshipType) => void;
    onEditCitizenship: (id: string) => void;
}
export const ViewCitizenship = (props: ViewCitizenshipProps) => {
    const {
        className,
        visible,
        setVisible,
        citizenshipId,
        onDeleteCitizenship,
        onEditCitizenship,
    } = props;
    const dispatch = useAppDispatch();

    const citizenshipDetailData = useSelector(getCitizenshipDetailData);
    const isLoadingCitizenshipDetail = useSelector(getCitizenshipDetailIsLoading);
    const errorCitizenshipDetail = useSelector(getCitizenshipDetailError);

    useEffect(() => {
        if (citizenshipId) {
            dispatch(fetchCitizenshipDetail(citizenshipId));
        }
    }, [dispatch, citizenshipId]);

    const onCloseModal = () => {
        setVisible(false);
    };

    const onDeleteHandler = (citizenship: CitizenshipType) => {
        onDeleteCitizenship(citizenship);
        onCloseModal();
    };

    const onEditHandler = (id: string) => {
        onEditCitizenship(id);
        onCloseModal();
    };

    let content;

    if (isLoadingCitizenshipDetail) {
        content = (
            <Skeleton width="100%" height={120} />
        );
    } else if (errorCitizenshipDetail) {
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
                            <h6 className={cls.newAddFieldTitle}>ID гражданства</h6>
                            <Text
                                size={TextSize.S}
                                weight={TextWeight.BOLD}
                            >
                                {citizenshipDetailData?.id_citizenship}
                            </Text>
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.newAddField}>
                            <h6 className={cls.newAddFieldTitle}>ID связанной страны</h6>
                            <Text
                                size={TextSize.S}
                                weight={TextWeight.BOLD}
                            >
                                {citizenshipDetailData?.country_id}
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
                                {citizenshipDetailData?.citizenship}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <CModal
            className={classNames(cls.ViewCitizenship, {}, [className, 'view-student-modal'])}
            visible={visible}
            onClose={onCloseModal}
            alignment="center"
        >
            <CModalHeader>
                {
                    isLoadingCitizenshipDetail
                        ? <Skeleton width={300} height={30} />
                        : (
                            <CModalTitle>
                                Гражданство №
                                {citizenshipDetailData?.id_citizenship}
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
                        onClick={() => { onDeleteHandler(citizenshipDetailData!); }}
                        disabled={
                            isLoadingCitizenshipDetail
                            || !!errorCitizenshipDetail
                        }
                    >
                        <CIcon icon={cilTrash} className={cls.btnIcon} />
                        Удалить
                    </CButton>
                    <CButton
                        color="primary"
                        className={cls.footerBtn}
                        onClick={() => { onEditHandler(citizenshipId); }}
                        disabled={
                            isLoadingCitizenshipDetail
                            || !!errorCitizenshipDetail
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
