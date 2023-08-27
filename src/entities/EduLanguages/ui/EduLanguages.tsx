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
import { EditEduLanguage } from 'features/EduLanguages/EditEduLanguage';
import { ViewEduLanguage } from 'features/EduLanguages/ViewEduLanguage';
import { DeleteEduLanguage } from 'features/EduLanguages/DeleteEduLanguage/ui/DeleteEduLanguage';
import cls from './EduLanguages.module.scss';
import { EduLanguagesType } from '../model/types/eduLanguages';
import { getEduLanguagesIsLoading } from '../model/selectors/getEduLanguagesIsLoading/getEduLanguagesIsLoading';
import { getEduLanguagesError } from '../model/selectors/getEduLanguagesError/getEduLanguagesError';
import { fetchEduLanguages } from '../model/services/fetchEduLanguages/fetchEduLanguages';

interface EduLanguagesProps {
    className?: string;
    data: EduLanguagesType[];
}
export const EduLanguages = (props: EduLanguagesProps) => {
    const {
        className,
        data,
    } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getEduLanguagesIsLoading);
    const error = useSelector(getEduLanguagesError);

    const sortByField = useSelector(getTableSortField);
    const sortOrderField = useSelector(getTableSortOrderField);

    const [deleteEduLanguages, setDeleteEduLanguages] = useState<EduLanguagesType>();
    const [visibleViewEduLanguages, setVisibleViewEduLanguages] = useState(false);
    const [visibleEditEduLanguages, setVisibleEditEduLanguages] = useState(false);
    const [visibleDeleteEduLanguages, setVisibleDeleteEduLanguages] = useState(false);
    const [eduLanguagesDetailId, setEduLanguagesDetailId] = useState<string>();

    const onShowEditEduLanguagesModal = (id: string) => {
        setVisibleEditEduLanguages(true);
        setEduLanguagesDetailId(id);
    };

    const onShowDeleteEduLanguagesModal = useCallback((eduLanguages: EduLanguagesType) => {
        setVisibleDeleteEduLanguages(true);
        setDeleteEduLanguages(eduLanguages);
    }, []);

    const onShowViewEduLanguagesModal = (id: string) => {
        setVisibleViewEduLanguages(true);
        setEduLanguagesDetailId(id);
    };

    useEffect(() => {
        dispatch(tableSortActions.setSort('id_languageofedu'));
    }, [dispatch]);

    const onClickSortCell = useCallback((cellName: string) => {
        dispatch(tableSortActions.setSort(cellName));
        dispatch(fetchEduLanguages());
    }, [dispatch]);

    let eduLanguagesTable;

    if (isLoading) {
        eduLanguagesTable = (
            <Skeleton height={250} />
        );
    } else if (error) {
        eduLanguagesTable = (
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
        eduLanguagesTable = (
            !data.length ? (
                <Text>Ничего не найдено...</Text>
            ) : (
                <CTable className={cls.table} striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('id_languageofedu'); }}
                            >
                                ID языка обучения
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'id_languageofedu' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('languageofedu'); }}
                            >
                                Наименование
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'languageofedu' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            data?.map((eduLanguages) => (
                                <CTableRow key={eduLanguages.id_languageofedu}>
                                    <CTableDataCell>{eduLanguages.id_languageofedu}</CTableDataCell>
                                    <CTableDataCell>{eduLanguages.languageofedu}</CTableDataCell>

                                    <CTableDataCell>
                                        <CButton
                                            color="primary"
                                            variant="outline"
                                            title="Просмотр"
                                            className={cls.editBtn}
                                            onClick={() => { onShowViewEduLanguagesModal(eduLanguages.id_languageofedu.toString()); }}
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
                                            onClick={() => { onShowEditEduLanguagesModal(eduLanguages.id_languageofedu.toString()); }}
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
                                            onClick={() => { onShowDeleteEduLanguagesModal(eduLanguages); }}
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
            {eduLanguagesTable}

            <ViewEduLanguage
                visible={visibleViewEduLanguages}
                setVisible={setVisibleViewEduLanguages}
                eduLanguageId={eduLanguagesDetailId!}
                onDeleteEduLanguage={onShowDeleteEduLanguagesModal}
                onEditEduLanguage={onShowEditEduLanguagesModal}
            />

            <EditEduLanguage
                visible={visibleEditEduLanguages}
                setVisible={setVisibleEditEduLanguages}
                eduLanguageId={eduLanguagesDetailId!}
                onDeleteEduLanguage={onShowDeleteEduLanguagesModal}
            />

            <DeleteEduLanguage
                eduLanguage={deleteEduLanguages}
                visible={visibleDeleteEduLanguages}
                setVisible={setVisibleDeleteEduLanguages}
            />
        </div>
    );
};
