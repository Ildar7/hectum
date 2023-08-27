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
import { DeleteCitizenship } from 'features/Citizenship/DeleteCitizenship';
import { EditCitizenship } from 'features/Citizenship/EditCitizenship';
import { ViewCitizenship } from 'features/Citizenship/ViewCitizenship';
import cls from './Citizenship.module.scss';
import { getCitizenshipIsLoading } from '../model/selectors/getCitizenshipIsLoading/getCitizenshipIsLoading';
import { getCitizenshipError } from '../model/selectors/getCitizenshipError/getCitizenshipError';
import { CitizenshipType } from '../model/types/citizenship';
import { fetchCitizenship } from '../model/services/fetchCitizenship/fetchCitizenship';

interface CitizenshipProps {
    className?: string;
    data: CitizenshipType[];
}
export const Citizenship = (props: CitizenshipProps) => {
    const {
        className,
        data,
    } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getCitizenshipIsLoading);
    const error = useSelector(getCitizenshipError);

    const sortByField = useSelector(getTableSortField);
    const sortOrderField = useSelector(getTableSortOrderField);

    const [deleteCitizenship, setDeleteCitizenship] = useState<CitizenshipType>();
    const [visibleViewCitizenship, setVisibleViewCitizenship] = useState(false);
    const [visibleEditCitizenship, setVisibleEditCitizenship] = useState(false);
    const [visibleDeleteCitizenship, setVisibleDeleteCitizenship] = useState(false);
    const [citizenshipDetailId, setCitizenshipDetailId] = useState<string>();

    const onShowEditCitizenshipModal = (id: string) => {
        setVisibleEditCitizenship(true);
        setCitizenshipDetailId(id);
    };

    const onShowDeleteCitizenshipModal = useCallback((citizenship: CitizenshipType) => {
        setVisibleDeleteCitizenship(true);
        setDeleteCitizenship(citizenship);
    }, []);

    const onShowViewCitizenshipModal = (id: string) => {
        setVisibleViewCitizenship(true);
        setCitizenshipDetailId(id);
    };

    useEffect(() => {
        dispatch(tableSortActions.setSort('country_id'));
    }, [dispatch]);

    const onClickSortCell = useCallback((cellName: string) => {
        dispatch(tableSortActions.setSort(cellName));
        dispatch(fetchCitizenship());
    }, [dispatch]);

    let citizenshipTable;

    if (isLoading) {
        citizenshipTable = (
            <Skeleton height={250} />
        );
    } else if (error) {
        citizenshipTable = (
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
        citizenshipTable = (
            !data.length ? (
                <Text>Ничего не найдено...</Text>
            ) : (
                <CTable className={cls.table} striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('country_id'); }}
                            >
                                ID страны
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'country_id' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('citizenship'); }}
                            >
                                Наименование
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'citizenship' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            data?.map((citizenship) => (
                                <CTableRow key={citizenship.id_citizenship}>
                                    <CTableDataCell>{citizenship.country_id}</CTableDataCell>
                                    <CTableDataCell>{citizenship.citizenship}</CTableDataCell>

                                    <CTableDataCell>
                                        <CButton
                                            color="primary"
                                            variant="outline"
                                            title="Просмотр"
                                            className={cls.editBtn}
                                            onClick={() => { onShowViewCitizenshipModal(citizenship.id_citizenship.toString()); }}
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
                                            onClick={() => { onShowEditCitizenshipModal(citizenship.id_citizenship.toString()); }}
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
                                            onClick={() => { onShowDeleteCitizenshipModal(citizenship); }}
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
            {citizenshipTable}

            <ViewCitizenship
                visible={visibleViewCitizenship}
                setVisible={setVisibleViewCitizenship}
                citizenshipId={citizenshipDetailId!}
                onDeleteCitizenship={onShowDeleteCitizenshipModal}
                onEditCitizenship={onShowEditCitizenshipModal}
            />

            <EditCitizenship
                visible={visibleEditCitizenship}
                setVisible={setVisibleEditCitizenship}
                citizenshipId={citizenshipDetailId!}
                onDeleteCitizenship={onShowDeleteCitizenshipModal}
            />

            <DeleteCitizenship
                citizenship={deleteCitizenship}
                visible={visibleDeleteCitizenship}
                setVisible={setVisibleDeleteCitizenship}
            />
        </div>
    );
};
