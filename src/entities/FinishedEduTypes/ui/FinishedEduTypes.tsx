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
import { DeleteFinishedEduType } from 'features/FinishedEduTypes/DeleteFinishedEduType';
import { EditFinishedEduType } from 'features/FinishedEduTypes/EditFinishedEduType';
import { ViewFinishedEduType } from 'features/FinishedEduTypes/ViewFinishedEduType';
import cls from './FinishedEduTypes.module.scss';
import { getFinishedEduTypesIsLoading } from '../model/selectors/getFinishedEduTypesIsLoading/getFinishedEduTypesIsLoading';
import { getFinishedEduTypesError } from '../model/selectors/getFinishedEduTypesError/getFinishedEduTypesError';
import { FinishedEduTypesType } from '../model/types/finishedEduTypes';
import { fetchFinishedEduTypes } from '../model/services/fetchFinishedEduTypes/fetchFinishedEduTypes';

interface FinishedEduTypesProps {
    className?: string;
    data: FinishedEduTypesType[];
}
export const FinishedEduTypes = (props: FinishedEduTypesProps) => {
    const {
        className,
        data,
    } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getFinishedEduTypesIsLoading);
    const error = useSelector(getFinishedEduTypesError);

    const sortByField = useSelector(getTableSortField);
    const sortOrderField = useSelector(getTableSortOrderField);

    const [deleteFinishedEduTypes, setDeleteFinishedEduTypes] = useState<FinishedEduTypesType>();
    const [visibleViewFinishedEduTypes, setVisibleViewFinishedEduTypes] = useState(false);
    const [visibleEditFinishedEduTypes, setVisibleEditFinishedEduTypes] = useState(false);
    const [visibleDeleteFinishedEduTypes, setVisibleDeleteFinishedEduTypes] = useState(false);
    const [finishedEduTypesDetailId, setFinishedEduTypesDetailId] = useState<string>();

    const onShowEditFinishedEduTypesModal = (id: string) => {
        setVisibleEditFinishedEduTypes(true);
        setFinishedEduTypesDetailId(id);
    };

    const onShowDeleteFinishedEduTypesModal = useCallback((finishedEduTypes: FinishedEduTypesType) => {
        setVisibleDeleteFinishedEduTypes(true);
        setDeleteFinishedEduTypes(finishedEduTypes);
    }, []);

    const onShowViewFinishedEduTypesModal = (id: string) => {
        setVisibleViewFinishedEduTypes(true);
        setFinishedEduTypesDetailId(id);
    };

    useEffect(() => {
        dispatch(tableSortActions.setSort('id_fromacceptedfinished'));
    }, [dispatch]);

    const onClickSortCell = useCallback((cellName: string) => {
        dispatch(tableSortActions.setSort(cellName));
        dispatch(fetchFinishedEduTypes());
    }, [dispatch]);

    let finishedEduTypesTable;

    if (isLoading) {
        finishedEduTypesTable = (
            <Skeleton height={250} />
        );
    } else if (error) {
        finishedEduTypesTable = (
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
        finishedEduTypesTable = (
            !data.length ? (
                <Text>Ничего не найдено...</Text>
            ) : (
                <CTable className={cls.table} striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('id_fromacceptedfinished'); }}
                            >
                                ID типа окончания обучения
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'id_fromacceptedfinished' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('fromacceptedfinished'); }}
                            >
                                Наименование
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'fromacceptedfinished' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            data?.map((finishedEduTypes) => (
                                <CTableRow key={finishedEduTypes.id_fromacceptedfinished}>
                                    <CTableDataCell>{finishedEduTypes.id_fromacceptedfinished}</CTableDataCell>
                                    <CTableDataCell>{finishedEduTypes.fromacceptedfinished}</CTableDataCell>

                                    <CTableDataCell>
                                        <CButton
                                            color="primary"
                                            variant="outline"
                                            title="Просмотр"
                                            className={cls.editBtn}
                                            onClick={() => {
                                                onShowViewFinishedEduTypesModal(finishedEduTypes.id_fromacceptedfinished.toString());
                                            }}
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
                                            onClick={() => {
                                                onShowEditFinishedEduTypesModal(finishedEduTypes.id_fromacceptedfinished.toString());
                                            }}
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
                                            onClick={() => { onShowDeleteFinishedEduTypesModal(finishedEduTypes); }}
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
            {finishedEduTypesTable}

            <ViewFinishedEduType
                visible={visibleViewFinishedEduTypes}
                setVisible={setVisibleViewFinishedEduTypes}
                finishedEduTypeId={finishedEduTypesDetailId!}
                onDeleteFinishedEduType={onShowDeleteFinishedEduTypesModal}
                onEditFinishedEduType={onShowEditFinishedEduTypesModal}
            />

            <EditFinishedEduType
                visible={visibleEditFinishedEduTypes}
                setVisible={setVisibleEditFinishedEduTypes}
                finishedEduTypeId={finishedEduTypesDetailId!}
                onDeleteFinishedEduType={onShowDeleteFinishedEduTypesModal}
            />

            <DeleteFinishedEduType
                finishedEduType={deleteFinishedEduTypes}
                visible={visibleDeleteFinishedEduTypes}
                setVisible={setVisibleDeleteFinishedEduTypes}
            />
        </div>
    );
};
