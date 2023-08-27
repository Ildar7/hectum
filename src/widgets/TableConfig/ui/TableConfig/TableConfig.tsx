import { classNames } from 'shared/lib/classNames/classNames';
import { CButton } from '@coreui/react';
import {
    cilDataTransferDown, cilDataTransferUp, cilFilter, cilPlus, cilPrint, cilSettings,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React, { ReactNode, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { TableFilters } from 'features/TableFilters';
import { TableFields } from 'features/TableFields';
import { getStudentsError, getStudentsIsLoading, StudentsError } from 'entities/Students';
import { AddStudent } from 'features/Students/AddStudent';
import { getRouteImportStudents } from 'shared/const/router';
import { useNavigate } from 'react-router-dom';
import { EnrollmentTypesError } from 'entities/EnrollmentTypes';
import cls from './TableConfig.module.scss';

interface TableConfigProps {
    className?: string;
    onSaveFields?: () => void;
    onClearFields?: () => void;
    onlyAdding?: boolean;
    addingModalText: string;
    children: ReactNode;
    setVisibleAddNewField: (value: boolean) => void;
    isLoading?: boolean;
    error?: StudentsError | EnrollmentTypesError;
}
export const TableConfig = (props: TableConfigProps) => {
    const {
        children,
        className,
        onSaveFields,
        onClearFields,
        onlyAdding = false,
        setVisibleAddNewField,
        addingModalText,
        isLoading,
        error,
    } = props;

    const [visibleFiltersModal, setVisibleFiltersModal] = useState(false);
    const [visibleFieldsModal, setVisibleFieldsModal] = useState(false);
    const navigate = useNavigate();

    const onShowFiltersModal = useCallback(() => {
        setVisibleFiltersModal(true);
    }, []);

    const onShowFieldsModal = useCallback(() => {
        setVisibleFieldsModal(true);
    }, []);

    const onShowAddNewFieldModal = useCallback(() => {
        setVisibleAddNewField(true);
    }, [setVisibleAddNewField]);

    const routeToImportStudentsPage = useCallback(() => {
        navigate(getRouteImportStudents());
    }, [navigate]);

    return (
        <div className={classNames(cls.TableConfig, {}, [className])}>
            <div className={cls.leftConfig}>
                {!onlyAdding && (
                    <>
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
                    </>
                )}
            </div>
            <div className={cls.rightConfig}>
                {!onlyAdding && (
                    <>
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
                            onClick={routeToImportStudentsPage}
                        >
                            <CIcon icon={cilDataTransferUp} className={cls.btnIcon} />
                            Импорт
                        </CButton>
                    </>
                )}
                <CButton
                    color="success"
                    className={classNames(cls.btn, {}, [cls.btnGreen])}
                    onClick={onShowAddNewFieldModal}
                    disabled={!!error || isLoading}
                >
                    <CIcon icon={cilPlus} className={classNames(cls.btnIcon, {}, [cls.addUserIcon])} />
                    {addingModalText}
                </CButton>
            </div>

            {!onlyAdding && (
                <>
                    <TableFilters
                        visible={visibleFiltersModal}
                        setVisible={setVisibleFiltersModal}
                    />

                    <TableFields
                        visible={visibleFieldsModal}
                        setVisible={setVisibleFieldsModal}
                        onSaveFields={onSaveFields!}
                        onClearFields={onClearFields!}
                    />
                </>
            )}

            {children}

        </div>
    );
};
