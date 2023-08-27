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
import { EditQualification } from 'features/Qualifications/EditQualification';
import { ViewQualification } from 'features/Qualifications/ViewQualification';
import { DeleteQualification } from 'features/Qualifications/DeleteQualification/ui/DeleteQualification';
import cls from './Qualifications.module.scss';
import { QualificationsType } from '../model/types/qualifications';
import { getQualificationsIsLoading } from '../model/selectors/getQualificationsIsLoading/getQualificationsIsLoading';
import { getQualificationsError } from '../model/selectors/getQualificationsError/getQualificationsError';
import { fetchQualifications } from '../model/services/fetchQualifications/fetchQualifications';

interface QualificationsProps {
    className?: string;
    data: QualificationsType[];
}
export const Qualifications = (props: QualificationsProps) => {
    const {
        className,
        data,
    } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getQualificationsIsLoading);
    const error = useSelector(getQualificationsError);

    const sortByField = useSelector(getTableSortField);
    const sortOrderField = useSelector(getTableSortOrderField);

    const [deleteQualifications, setDeleteQualifications] = useState<QualificationsType>();
    const [visibleViewQualifications, setVisibleViewQualifications] = useState(false);
    const [visibleEditQualifications, setVisibleEditQualifications] = useState(false);
    const [visibleDeleteQualifications, setVisibleDeleteQualifications] = useState(false);
    const [qualificationsDetailId, setQualificationsDetailId] = useState<string>();

    const onShowEditQualificationsModal = (id: string) => {
        setVisibleEditQualifications(true);
        setQualificationsDetailId(id);
    };

    const onShowDeleteQualificationsModal = useCallback((qualifications: QualificationsType) => {
        setVisibleDeleteQualifications(true);
        setDeleteQualifications(qualifications);
    }, []);

    const onShowViewQualificationsModal = (id: string) => {
        setVisibleViewQualifications(true);
        setQualificationsDetailId(id);
    };

    useEffect(() => {
        dispatch(tableSortActions.setSort('id_qual'));
    }, [dispatch]);

    const onClickSortCell = useCallback((cellName: string) => {
        dispatch(tableSortActions.setSort(cellName));
        dispatch(fetchQualifications());
    }, [dispatch]);

    let qualificationsTable;

    if (isLoading) {
        qualificationsTable = (
            <Skeleton height={250} />
        );
    } else if (error) {
        qualificationsTable = (
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
        qualificationsTable = (
            !data.length ? (
                <Text>Ничего не найдено...</Text>
            ) : (
                <CTable className={cls.table} striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('id_qual'); }}
                            >
                                ID квалификации
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'id_qual' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('qualification'); }}
                            >
                                Наименование
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'qualification' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            data?.map((qualifications) => (
                                <CTableRow key={qualifications.id_qual}>
                                    <CTableDataCell>{qualifications.id_qual}</CTableDataCell>
                                    <CTableDataCell>{qualifications.qualification}</CTableDataCell>

                                    <CTableDataCell>
                                        <CButton
                                            color="primary"
                                            variant="outline"
                                            title="Просмотр"
                                            className={cls.editBtn}
                                            onClick={() => { onShowViewQualificationsModal(qualifications.id_qual.toString()); }}
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
                                            onClick={() => { onShowEditQualificationsModal(qualifications.id_qual.toString()); }}
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
                                            onClick={() => { onShowDeleteQualificationsModal(qualifications); }}
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
            {qualificationsTable}

            <ViewQualification
                visible={visibleViewQualifications}
                setVisible={setVisibleViewQualifications}
                qualificationId={qualificationsDetailId!}
                onDeleteQualification={onShowDeleteQualificationsModal}
                onEditQualification={onShowEditQualificationsModal}
            />

            <EditQualification
                visible={visibleEditQualifications}
                setVisible={setVisibleEditQualifications}
                qualificationId={qualificationsDetailId!}
                onDeleteQualification={onShowDeleteQualificationsModal}
            />

            <DeleteQualification
                qualification={deleteQualifications}
                visible={visibleDeleteQualifications}
                setVisible={setVisibleDeleteQualifications}
            />
        </div>
    );
};
