import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import {
    Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import {
    CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
    cilPencil, cilSortAscending, cilSortDescending, cilTrash, cilUser,
} from '@coreui/icons';
import { getTableSortField, getTableSortOrderField, tableSortActions } from 'features/TableSort';
import { fetchEnrollmentTypes } from 'entities/EnrollmentTypes/model/services/fetchEnrollmentTypes/fetchEnrollmentTypes';
import { EditEnrollmentType } from 'features/EnrollmentTypes/EditEnrollmentType';
import { DeleteEnrollmentType } from 'features/EnrollmentTypes/DeleteEnrollmentType';
import { ViewEnrollmentType } from 'features/EnrollmentTypes/ViewEnrollmentType';
import { EnrollmentTypesType } from '../model/types/enrollmentTypes';
import { getEnrollmentTypesError } from '../model/selectors/getEnrollmentTypesError/getEnrollmentTypesError';
import { getEnrollmentTypesIsLoading } from '../model/selectors/getEnrollmentTypesIsLoading/getEnrollmentTypesIsLoading';
import cls from './EnrollmentTypes.module.scss';

interface EnrollmentTypesProps {
    className?: string;
    data: EnrollmentTypesType[];
}
export const EnrollmentTypes = (props: EnrollmentTypesProps) => {
    const {
        className,
        data,
    } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getEnrollmentTypesIsLoading);
    const error = useSelector(getEnrollmentTypesError);

    const sortByField = useSelector(getTableSortField);
    const sortOrderField = useSelector(getTableSortOrderField);

    const [deleteEnrollmentType, setDeleteEnrollmentType] = useState<EnrollmentTypesType>();
    const [visibleViewEnrollmentType, setVisibleViewEnrollmentType] = useState(false);
    const [visibleEditEnrollmentType, setVisibleEditEnrollmentType] = useState(false);
    const [visibleDeleteEnrollmentType, setVisibleDeleteEnrollmentType] = useState(false);
    const [enrollmentTypeDetailId, setEnrollmentTypeDetailId] = useState<string>();

    const onShowEditEnrollmentTypeModal = (id: string) => {
        setVisibleEditEnrollmentType(true);
        setEnrollmentTypeDetailId(id);
    };

    const onShowDeleteEnrollmentTypeModal = useCallback((enrollmentType: EnrollmentTypesType) => {
        setVisibleDeleteEnrollmentType(true);
        setDeleteEnrollmentType(enrollmentType);
    }, []);

    const onShowViewEnrollmentTypeModal = (id: string) => {
        setVisibleViewEnrollmentType(true);
        setEnrollmentTypeDetailId(id);
    };

    useEffect(() => {
        dispatch(tableSortActions.setSort('id_typeenrollment'));
    }, [dispatch]);

    const onClickSortCell = useCallback((cellName: string) => {
        dispatch(tableSortActions.setSort(cellName));
        dispatch(fetchEnrollmentTypes());
    }, [dispatch]);

    let enrollmentTypesTable;

    if (isLoading) {
        enrollmentTypesTable = (
            <Skeleton height={250} />
        );
    } else if (error) {
        enrollmentTypesTable = (
            <Text
                theme={TextTheme.ERROR}
                size={TextSize.M}
                weight={TextWeight.SEMIBOLD}
                className={cls.error}
            >
                Произошла ошибка при загрузке данных, попробуйте перезагрузить страницу
            </Text>
        );
    } else {
        enrollmentTypesTable = (
            !data.length ? (
                <Text>Ничего не найдено...</Text>
            ) : (
                <CTable className={cls.table} striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('id_typeenrollment'); }}
                            >
                                ID типа зачисления
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'id_typeenrollment' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('typeenrollment'); }}
                            >
                                Наименование
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'typeenrollment' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            data?.map((enrollmentType) => (
                                <CTableRow key={enrollmentType.id_typeenrollment}>
                                    <CTableDataCell>{enrollmentType.id_typeenrollment}</CTableDataCell>
                                    <CTableDataCell>{enrollmentType.typeenrollment}</CTableDataCell>

                                    <CTableDataCell>
                                        <CButton
                                            color="primary"
                                            variant="outline"
                                            title="Просмотр"
                                            className={cls.editBtn}
                                            onClick={() => { onShowViewEnrollmentTypeModal(enrollmentType.id_typeenrollment.toString()); }}
                                        >
                                            <CIcon
                                                icon={cilUser}
                                                customClassName={cls.btnIcon}
                                            />
                                        </CButton>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CButton
                                            color="primary"
                                            variant="outline"
                                            title="Редактировать"
                                            className={cls.editBtn}
                                            onClick={() => { onShowEditEnrollmentTypeModal(enrollmentType.id_typeenrollment.toString()); }}
                                        >
                                            <CIcon
                                                icon={cilPencil}
                                                customClassName={cls.btnIcon}
                                            />
                                        </CButton>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CButton
                                            color="primary"
                                            variant="outline"
                                            title="Удалить"
                                            className={cls.editBtn}
                                            onClick={() => { onShowDeleteEnrollmentTypeModal(enrollmentType); }}
                                        >
                                            <CIcon
                                                icon={cilTrash}
                                                customClassName={cls.btnIcon}
                                            />
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))
                        }
                    </CTableBody>
                </CTable>
            )
        );
    }

    const mods: Mods = {
        [cls.error]: !!error,
    };

    return (
        <div className={classNames(cls.TableBlock, mods, [className])}>
            {enrollmentTypesTable}

            <ViewEnrollmentType
                visible={visibleViewEnrollmentType}
                setVisible={setVisibleViewEnrollmentType}
                enrollmentTypeId={enrollmentTypeDetailId!}
                onDeleteEnrollmentType={onShowDeleteEnrollmentTypeModal}
                onEditEnrollmentType={onShowEditEnrollmentTypeModal}
            />

            <EditEnrollmentType
                visible={visibleEditEnrollmentType}
                setVisible={setVisibleEditEnrollmentType}
                enrollmentTypeId={enrollmentTypeDetailId!}
                onDeleteEnrollmentType={onShowDeleteEnrollmentTypeModal}
            />

            <DeleteEnrollmentType
                enrollmentType={deleteEnrollmentType}
                visible={visibleDeleteEnrollmentType}
                setVisible={setVisibleDeleteEnrollmentType}
            />
        </div>
    );
};
