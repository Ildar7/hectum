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
import { EditNationality } from 'features/Nationalities/EditNationality';
import { ViewNationality } from 'features/Nationalities/ViewNationality';
import { DeleteNationality } from 'features/Nationalities/DeleteNationality/ui/DeleteNationality';
import cls from './Nationalities.module.scss';
import { NationalitiesType } from '../model/types/nationalities';
import { getNationalitiesIsLoading } from '../model/selectors/getNationalitiesIsLoading/getNationalitiesIsLoading';
import { getNationalitiesError } from '../model/selectors/getNationalitiesError/getNationalitiesError';
import { fetchNationalities } from '../model/services/fetchNationalities/fetchNationalities';

interface NationalitiesProps {
    className?: string;
    data: NationalitiesType[];
}
export const Nationalities = (props: NationalitiesProps) => {
    const {
        className,
        data,
    } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getNationalitiesIsLoading);
    const error = useSelector(getNationalitiesError);

    const sortByField = useSelector(getTableSortField);
    const sortOrderField = useSelector(getTableSortOrderField);

    const [deleteNationalities, setDeleteNationalities] = useState<NationalitiesType>();
    const [visibleViewNationalities, setVisibleViewNationalities] = useState(false);
    const [visibleEditNationalities, setVisibleEditNationalities] = useState(false);
    const [visibleDeleteNationalities, setVisibleDeleteNationalities] = useState(false);
    const [nationalitiesDetailId, setNationalitiesDetailId] = useState<string>();

    const onShowEditNationalitiesModal = (id: string) => {
        setVisibleEditNationalities(true);
        setNationalitiesDetailId(id);
    };

    const onShowDeleteNationalitiesModal = useCallback((nationalities: NationalitiesType) => {
        setVisibleDeleteNationalities(true);
        setDeleteNationalities(nationalities);
    }, []);

    const onShowViewNationalitiesModal = (id: string) => {
        setVisibleViewNationalities(true);
        setNationalitiesDetailId(id);
    };

    useEffect(() => {
        dispatch(tableSortActions.setSort('id_nationality'));
    }, [dispatch]);

    const onClickSortCell = useCallback((cellName: string) => {
        dispatch(tableSortActions.setSort(cellName));
        dispatch(fetchNationalities());
    }, [dispatch]);

    let nationalitiesTable;

    if (isLoading) {
        nationalitiesTable = (
            <Skeleton height={250} />
        );
    } else if (error) {
        nationalitiesTable = (
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
        nationalitiesTable = (
            !data.length ? (
                <Text>Ничего не найдено...</Text>
            ) : (
                <CTable className={cls.table} striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('id_nationality'); }}
                            >
                                ID национальности
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'id_nationality' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('nationality'); }}
                            >
                                Наименование
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'nationality' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            data?.map((nationalities) => (
                                <CTableRow key={nationalities.id_nationality}>
                                    <CTableDataCell>{nationalities.id_nationality}</CTableDataCell>
                                    <CTableDataCell>{nationalities.nationality}</CTableDataCell>

                                    <CTableDataCell>
                                        <CButton
                                            color="primary"
                                            variant="outline"
                                            title="Просмотр"
                                            className={cls.editBtn}
                                            onClick={() => { onShowViewNationalitiesModal(nationalities.id_nationality.toString()); }}
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
                                            onClick={() => { onShowEditNationalitiesModal(nationalities.id_nationality.toString()); }}
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
                                            onClick={() => { onShowDeleteNationalitiesModal(nationalities); }}
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
            {nationalitiesTable}

            <ViewNationality
                visible={visibleViewNationalities}
                setVisible={setVisibleViewNationalities}
                nationalityId={nationalitiesDetailId!}
                onDeleteNationality={onShowDeleteNationalitiesModal}
                onEditNationality={onShowEditNationalitiesModal}
            />

            <EditNationality
                visible={visibleEditNationalities}
                setVisible={setVisibleEditNationalities}
                nationalityId={nationalitiesDetailId!}
                onDeleteNationality={onShowDeleteNationalitiesModal}
            />

            <DeleteNationality
                nationality={deleteNationalities}
                visible={visibleDeleteNationalities}
                setVisible={setVisibleDeleteNationalities}
            />
        </div>
    );
};
