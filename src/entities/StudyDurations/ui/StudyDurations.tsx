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
import { EditStudyDuration } from 'features/StudyDurations/EditStudyDuration';
import { ViewStudyDuration } from 'features/StudyDurations/ViewStudyDuration';
import { DeleteStudyDuration } from 'features/StudyDurations/DeleteStudyDuration/ui/DeleteStudyDuration';
import cls from './StudyDurations.module.scss';
import { StudyDurationsType } from '../model/types/studyDurations';
import { getStudyDurationsIsLoading } from '../model/selectors/getStudyDurationsIsLoading/getStudyDurationsIsLoading';
import { getStudyDurationsError } from '../model/selectors/getStudyDurationsError/getStudyDurationsError';
import { fetchStudyDurations } from '../model/services/fetchStudyDurations/fetchStudyDurations';

interface StudyDurationsProps {
    className?: string;
    data: StudyDurationsType[];
}
export const StudyDurations = (props: StudyDurationsProps) => {
    const {
        className,
        data,
    } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getStudyDurationsIsLoading);
    const error = useSelector(getStudyDurationsError);

    const sortByField = useSelector(getTableSortField);
    const sortOrderField = useSelector(getTableSortOrderField);

    const [deleteStudyDurations, setDeleteStudyDurations] = useState<StudyDurationsType>();
    const [visibleViewStudyDurations, setVisibleViewStudyDurations] = useState(false);
    const [visibleEditStudyDurations, setVisibleEditStudyDurations] = useState(false);
    const [visibleDeleteStudyDurations, setVisibleDeleteStudyDurations] = useState(false);
    const [studyDurationsDetailId, setStudyDurationsDetailId] = useState<string>();

    const onShowEditStudyDurationsModal = (id: string) => {
        setVisibleEditStudyDurations(true);
        setStudyDurationsDetailId(id);
    };

    const onShowDeleteStudyDurationsModal = useCallback((studyDurations: StudyDurationsType) => {
        setVisibleDeleteStudyDurations(true);
        setDeleteStudyDurations(studyDurations);
    }, []);

    const onShowViewStudyDurationsModal = (id: string) => {
        setVisibleViewStudyDurations(true);
        setStudyDurationsDetailId(id);
    };

    useEffect(() => {
        dispatch(tableSortActions.setSort('id_durationoftraining'));
    }, [dispatch]);

    const onClickSortCell = useCallback((cellName: string) => {
        dispatch(tableSortActions.setSort(cellName));
        dispatch(fetchStudyDurations());
    }, [dispatch]);

    let studyDurationsTable;

    if (isLoading) {
        studyDurationsTable = (
            <Skeleton height={250} />
        );
    } else if (error) {
        studyDurationsTable = (
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
        studyDurationsTable = (
            !data.length ? (
                <Text>Ничего не найдено...</Text>
            ) : (
                <CTable className={cls.table} striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('id_durationoftraining'); }}
                            >
                                ID продолжительности обучения
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'id_durationoftraining' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('durationoftraining'); }}
                            >
                                Наименование
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'durationoftraining' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            data?.map((studyDurations) => (
                                <CTableRow key={studyDurations.id_durationoftraining}>
                                    <CTableDataCell>{studyDurations.id_durationoftraining}</CTableDataCell>
                                    <CTableDataCell>{studyDurations.durationoftraining}</CTableDataCell>

                                    <CTableDataCell>
                                        <CButton
                                            color="primary"
                                            variant="outline"
                                            title="Просмотр"
                                            className={cls.editBtn}
                                            onClick={() => {
                                                onShowViewStudyDurationsModal(studyDurations.id_durationoftraining.toString());
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
                                                onShowEditStudyDurationsModal(studyDurations.id_durationoftraining.toString());
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
                                            onClick={() => { onShowDeleteStudyDurationsModal(studyDurations); }}
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
            {studyDurationsTable}

            <ViewStudyDuration
                visible={visibleViewStudyDurations}
                setVisible={setVisibleViewStudyDurations}
                studyDurationId={studyDurationsDetailId!}
                onDeleteStudyDuration={onShowDeleteStudyDurationsModal}
                onEditStudyDuration={onShowEditStudyDurationsModal}
            />

            <EditStudyDuration
                visible={visibleEditStudyDurations}
                setVisible={setVisibleEditStudyDurations}
                studyDurationId={studyDurationsDetailId!}
                onDeleteStudyDuration={onShowDeleteStudyDurationsModal}
            />

            <DeleteStudyDuration
                studyDuration={deleteStudyDurations}
                visible={visibleDeleteStudyDurations}
                setVisible={setVisibleDeleteStudyDurations}
            />
        </div>
    );
};
