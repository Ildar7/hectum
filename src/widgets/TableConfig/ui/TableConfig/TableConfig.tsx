import { classNames } from 'shared/lib/classNames/classNames';
import { CButton } from '@coreui/react';
import {
    cilFilter, cilSettings, cilPrint, cilDataTransferDown, cilDataTransferUp, cilPlus,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TableFilters } from 'features/TableFilters';
import { TableFields } from 'features/TableFields';
import { getStudentsError, getStudentsIsLoading } from 'entities/Students';
import cls from './TableConfig.module.scss';

interface TableConfigProps {
  className?: string;
}
export const TableConfig = ({ className }: TableConfigProps) => {
    const [visibleFiltersModal, setVisibleFiltersModal] = useState(false);
    const [visibleFieldsModal, setVisibleFieldsModal] = useState(false);
    const isLoading = useSelector(getStudentsIsLoading);
    const error = useSelector(getStudentsError);
    const onShowFiltersModal = () => {
        setVisibleFiltersModal(true);
    };

    const onShowFieldsModal = () => {
        setVisibleFieldsModal(true);
    };

    return (
        <div className={classNames(cls.TableConfig, {}, [className])}>
            <div className={cls.leftConfig}>
                <CButton
                    color="primary"
                    variant="outline"
                    className={cls.btn}
                    disabled={!!error || isLoading}
                    onClick={onShowFiltersModal}
                >
                    <CIcon icon={cilFilter} className={cls.btnIcon} />
                    Фильтры
                </CButton>
                <CButton
                    color="primary"
                    variant="outline"
                    className={cls.btn}
                    disabled={!!error || isLoading}
                    onClick={onShowFieldsModal}
                >
                    <CIcon icon={cilSettings} className={cls.btnIcon} />
                    Поля таблицы
                </CButton>
            </div>
            <div className={cls.rightConfig}>
                <CButton
                    color="primary"
                    variant="outline"
                    className={cls.btn}
                    disabled
                >
                    <CIcon icon={cilPrint} className={cls.btnIcon} />
                    Печать
                </CButton>
                <CButton
                    color="primary"
                    variant="outline"
                    className={cls.btn}
                    disabled
                >
                    <CIcon icon={cilDataTransferDown} className={cls.btnIcon} />
                    Экспорт
                </CButton>
                <CButton
                    color="primary"
                    variant="outline"
                    className={cls.btn}
                    disabled
                >
                    <CIcon icon={cilDataTransferUp} className={cls.btnIcon} />
                    Импорт
                </CButton>
                <CButton
                    color="success"
                    className={classNames(cls.btn, {}, [cls.btnGreen])}
                    disabled
                >
                    <CIcon icon={cilPlus} className={classNames(cls.btnIcon, {}, [cls.addUserIcon])} />
                    Добавить студента
                </CButton>
            </div>

            <TableFilters
                visible={visibleFiltersModal}
                setVisible={setVisibleFiltersModal}
            />

            <TableFields
                visible={visibleFieldsModal}
                setVisible={setVisibleFieldsModal}
            />
        </div>
    );
};
