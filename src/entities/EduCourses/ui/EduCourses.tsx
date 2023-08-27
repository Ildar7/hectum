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
import { EditEduCourse } from 'features/EduCourses/EditEduCourse';
import { ViewEduCourse } from 'features/EduCourses/ViewEduCourse';
import { DeleteEduCourse } from 'features/EduCourses/DeleteEduCourse/ui/DeleteEduCourse';
import cls from './EduCourses.module.scss';
import { EduCoursesType } from '../model/types/eduCourses';
import { getEduCoursesIsLoading } from '../model/selectors/getEduCoursesIsLoading/getEduCoursesIsLoading';
import { getEduCoursesError } from '../model/selectors/getEduCoursesError/getEduCoursesError';
import { fetchEduCourses } from '../model/services/fetchEduCourses/fetchEduCourses';

interface EduCoursesProps {
    className?: string;
    data: EduCoursesType[];
}
export const EduCourses = (props: EduCoursesProps) => {
    const {
        className,
        data,
    } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getEduCoursesIsLoading);
    const error = useSelector(getEduCoursesError);

    const sortByField = useSelector(getTableSortField);
    const sortOrderField = useSelector(getTableSortOrderField);

    const [deleteEduCourses, setDeleteEduCourses] = useState<EduCoursesType>();
    const [visibleViewEduCourses, setVisibleViewEduCourses] = useState(false);
    const [visibleEditEduCourses, setVisibleEditEduCourses] = useState(false);
    const [visibleDeleteEduCourses, setVisibleDeleteEduCourses] = useState(false);
    const [eduCoursesDetailId, setEduCoursesDetailId] = useState<string>();

    const onShowEditEduCoursesModal = (id: string) => {
        setVisibleEditEduCourses(true);
        setEduCoursesDetailId(id);
    };

    const onShowDeleteEduCoursesModal = useCallback((eduCourses: EduCoursesType) => {
        setVisibleDeleteEduCourses(true);
        setDeleteEduCourses(eduCourses);
    }, []);

    const onShowViewEduCoursesModal = (id: string) => {
        setVisibleViewEduCourses(true);
        setEduCoursesDetailId(id);
    };

    useEffect(() => {
        dispatch(tableSortActions.setSort('id_courseoftraining'));
    }, [dispatch]);

    const onClickSortCell = useCallback((cellName: string) => {
        dispatch(tableSortActions.setSort(cellName));
        dispatch(fetchEduCourses());
    }, [dispatch]);

    let eduCoursesTable;

    if (isLoading) {
        eduCoursesTable = (
            <Skeleton height={250} />
        );
    } else if (error) {
        eduCoursesTable = (
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
        eduCoursesTable = (
            !data.length ? (
                <Text>Ничего не найдено...</Text>
            ) : (
                <CTable className={cls.table} striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('id_courseoftraining'); }}
                            >
                                ID номера учебного курса
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'id_courseoftraining' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('courseoftraining'); }}
                            >
                                Наименование
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'courseoftraining' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            data?.map((eduCourses) => (
                                <CTableRow key={eduCourses.id_courseoftraining}>
                                    <CTableDataCell>{eduCourses.id_courseoftraining}</CTableDataCell>
                                    <CTableDataCell>{eduCourses.courseoftraining}</CTableDataCell>

                                    <CTableDataCell>
                                        <CButton
                                            color="primary"
                                            variant="outline"
                                            title="Просмотр"
                                            className={cls.editBtn}
                                            onClick={() => { onShowViewEduCoursesModal(eduCourses.id_courseoftraining.toString()); }}
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
                                            onClick={() => { onShowEditEduCoursesModal(eduCourses.id_courseoftraining.toString()); }}
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
                                            onClick={() => { onShowDeleteEduCoursesModal(eduCourses); }}
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
            {eduCoursesTable}

            <ViewEduCourse
                visible={visibleViewEduCourses}
                setVisible={setVisibleViewEduCourses}
                eduCourseId={eduCoursesDetailId!}
                onDeleteEduCourse={onShowDeleteEduCoursesModal}
                onEditEduCourse={onShowEditEduCoursesModal}
            />

            <EditEduCourse
                visible={visibleEditEduCourses}
                setVisible={setVisibleEditEduCourses}
                eduCourseId={eduCoursesDetailId!}
                onDeleteEduCourse={onShowDeleteEduCoursesModal}
            />

            <DeleteEduCourse
                eduCourse={deleteEduCourses}
                visible={visibleDeleteEduCourses}
                setVisible={setVisibleDeleteEduCourses}
            />
        </div>
    );
};
