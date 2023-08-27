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
import { EditStudyDirection } from 'features/StudyDirections/EditStudyDirection';
import { ViewStudyDirection } from 'features/StudyDirections/ViewStudyDirection';
import { DeleteStudyDirection } from 'features/StudyDirections/DeleteStudyDirection/ui/DeleteStudyDirection';
import cls from './StudyDirections.module.scss';
import { StudyDirectionsType } from '../model/types/studyDirections';
import { getStudyDirectionsIsLoading } from '../model/selectors/getStudyDirectionsIsLoading/getStudyDirectionsIsLoading';
import { getStudyDirectionsError } from '../model/selectors/getStudyDirectionsError/getStudyDirectionsError';
import { fetchStudyDirections } from '../model/services/fetchStudyDirections/fetchStudyDirections';

interface StudyDirectionsProps {
    className?: string;
    data: StudyDirectionsType[];
}
export const StudyDirections = (props: StudyDirectionsProps) => {
    const {
        className,
        data,
    } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getStudyDirectionsIsLoading);
    const error = useSelector(getStudyDirectionsError);

    const sortByField = useSelector(getTableSortField);
    const sortOrderField = useSelector(getTableSortOrderField);

    const [deleteStudyDirections, setDeleteStudyDirections] = useState<StudyDirectionsType>();
    const [visibleViewStudyDirections, setVisibleViewStudyDirections] = useState(false);
    const [visibleEditStudyDirections, setVisibleEditStudyDirections] = useState(false);
    const [visibleDeleteStudyDirections, setVisibleDeleteStudyDirections] = useState(false);
    const [studyDirectionsDetailId, setStudyDirectionsDetailId] = useState<string>();

    const onShowEditStudyDirectionsModal = (id: string) => {
        setVisibleEditStudyDirections(true);
        setStudyDirectionsDetailId(id);
    };

    const onShowDeleteStudyDirectionsModal = useCallback((studyDirections: StudyDirectionsType) => {
        setVisibleDeleteStudyDirections(true);
        setDeleteStudyDirections(studyDirections);
    }, []);

    const onShowViewStudyDirectionsModal = (id: string) => {
        setVisibleViewStudyDirections(true);
        setStudyDirectionsDetailId(id);
    };

    useEffect(() => {
        dispatch(tableSortActions.setSort('id_typeofdirection'));
    }, [dispatch]);

    const onClickSortCell = useCallback((cellName: string) => {
        dispatch(tableSortActions.setSort(cellName));
        dispatch(fetchStudyDirections());
    }, [dispatch]);

    let studyDirectionsTable;

    if (isLoading) {
        studyDirectionsTable = (
            <Skeleton height={250} />
        );
    } else if (error) {
        studyDirectionsTable = (
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
        studyDirectionsTable = (
            !data.length ? (
                <Text>Ничего не найдено...</Text>
            ) : (
                <CTable className={cls.table} striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('id_typeofdirection'); }}
                            >
                                ID студенческого направления
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'id_typeofdirection' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('typeofdirection'); }}
                            >
                                Наименование
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'typeofdirection' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            data?.map((studyDirections) => (
                                <CTableRow key={studyDirections.id_typeofdirection}>
                                    <CTableDataCell>{studyDirections.id_typeofdirection}</CTableDataCell>
                                    <CTableDataCell>{studyDirections.typeofdirection}</CTableDataCell>

                                    <CTableDataCell>
                                        <CButton
                                            color="primary"
                                            variant="outline"
                                            title="Просмотр"
                                            className={cls.editBtn}
                                            onClick={() => {
                                                onShowViewStudyDirectionsModal(studyDirections.id_typeofdirection.toString());
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
                                                onShowEditStudyDirectionsModal(studyDirections.id_typeofdirection.toString());
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
                                            onClick={() => { onShowDeleteStudyDirectionsModal(studyDirections); }}
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
            {studyDirectionsTable}

            <ViewStudyDirection
                visible={visibleViewStudyDirections}
                setVisible={setVisibleViewStudyDirections}
                studyDirectionId={studyDirectionsDetailId!}
                onDeleteStudyDirection={onShowDeleteStudyDirectionsModal}
                onEditStudyDirection={onShowEditStudyDirectionsModal}
            />

            <EditStudyDirection
                visible={visibleEditStudyDirections}
                setVisible={setVisibleEditStudyDirections}
                studyDirectionId={studyDirectionsDetailId!}
                onDeleteStudyDirection={onShowDeleteStudyDirectionsModal}
            />

            <DeleteStudyDirection
                studyDirection={deleteStudyDirections}
                visible={visibleDeleteStudyDirections}
                setVisible={setVisibleDeleteStudyDirections}
            />
        </div>
    );
};
