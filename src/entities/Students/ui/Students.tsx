import { classNames, Mods } from 'shared/lib/classNames/classNames';
import {
    CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,
} from '@coreui/react';
import {
    cilPencil, cilSortAscending, cilSortDescending, cilTrash, cilUser,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import {
    Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import { format } from 'date-fns';
import { TableFieldsType } from 'features/TableFields';
import { DeleteStudent } from 'features/Students/DeleteStudent';
import { EditStudent } from 'features/Students/EditStudent';
import { ViewStudent } from 'features/Students/ViewStudent';
import { getTableSortField, getTableSortOrderField, tableSortActions } from 'features/TableSort';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchStudents } from 'entities/Students';
import { getStudentsIsLoading } from '../model/selectors/getStudentsIsLoading/getStudentsIsLoading';
import { getStudentsError } from '../model/selectors/getStudentsError/getStudentsError';
import cls from './Students.module.scss';
import { StudentsType } from '../model/types/students';

interface StudentsProps {
    className?: string;
    data: StudentsType[];
    visibleCells: TableFieldsType | undefined;
}

export const Students = (props: StudentsProps) => {
    const {
        className,
        data,
        visibleCells,
    } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getStudentsIsLoading);
    const error = useSelector(getStudentsError);
    const [deleteUser, setDeleteUser] = useState<StudentsType>();
    const [studentDetailId, setStudentDetailId] = useState<string>();

    const [visibleDeleteStudent, setVisibleDeleteStudent] = useState(false);
    const [visibleEditStudent, setVisibleEditStudent] = useState(false);
    const [visibleViewStudent, setVisibleViewStudent] = useState(false);

    const sortByField = useSelector(getTableSortField);
    const sortOrderField = useSelector(getTableSortOrderField);

    const onShowDeleteStudentModal = useCallback((student: StudentsType) => {
        setVisibleDeleteStudent(true);
        setDeleteUser(student);
    }, []);

    const onShowEditStudentModal = (id: string) => {
        setVisibleEditStudent(true);
        setStudentDetailId(id);
    };

    const onShowViewStudentModal = (id: string) => {
        setVisibleViewStudent(true);
        setStudentDetailId(id);
    };

    const onClickSortCell = useCallback((cellName: string) => {
        dispatch(tableSortActions.setSort(cellName));
        dispatch(fetchStudents());
    }, [dispatch]);

    let studentsTable;

    if (isLoading) {
        studentsTable = (
            <Skeleton height={400} />
        );
    } else if (error) {
        studentsTable = (
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
        studentsTable = (
            !data.length ? (
                <Text>Ничего не найдено...</Text>
            ) : (
                <CTable className={cls.table} striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('students_id'); }}
                            >
                                ID студента
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'students_id' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">ФИО</CTableHeaderCell>
                            <CTableHeaderCell
                                scope="col"
                                className={cls.tableCell}
                                onClick={() => { onClickSortCell('student_govid'); }}
                            >
                                ИИН
                                <CIcon
                                    icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                    className={
                                        classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'student_govid' }, [])
                                    }
                                />
                            </CTableHeaderCell>
                            {visibleCells?.student_gender && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_gender'); }}
                                >
                                    Пол
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'student_gender' }, [])
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_nationality && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_nationality'); }}
                                >
                                    Национальность
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'student_nationality' }, [])
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_edu_speciality && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_edu_speciality'); }}
                                >
                                    Специальность
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'student_edu_speciality' }, [])
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_edu_classifier && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_edu_classifier'); }}
                                >
                                    Классификатор
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'student_edu_classifier' }, [])
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_edu_lang && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_edu_lang'); }}
                                >
                                    Язык обучения
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'student_edu_lang' }, [])
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_edu_form && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_edu_form'); }}
                                >
                                    Форма обучения
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(cls.tableSortIcon, { [cls.active]: sortByField === 'student_edu_form' }, [])
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_has_access_to_exams && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_is_has_access_to_exams'); }}
                                >
                                    Доступ к экзаменам
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_is_has_access_to_exams' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_phone_number && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_phone_number'); }}
                                >
                                    Телефон
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_phone_number' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_birth_date && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_birth_date'); }}
                                >
                                    Дата рождения
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_birth_date' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_arrival_date && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_arrival_date'); }}
                                >
                                    Дата поступления
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_arrival_date' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_study_duration && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_study_duration'); }}
                                >
                                    Продолжительность обучения
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_study_duration' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_study_course && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_study_course'); }}
                                >
                                    Курс обучения
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_study_course' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_live_at_hostel && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_is_live_at_hostel'); }}
                                >
                                    Проживает в хостеле
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_is_live_at_hostel' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}

                            {visibleCells?.student_citizenship && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_citizenship'); }}
                                >
                                    Гражданство
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_citizenship' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_enrollment_type && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_enrollment_type'); }}
                                >
                                    Причина поступления
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_enrollment_type' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_arrival_from && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_is_arrival_from'); }}
                                >
                                    Откуда прибыл
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_is_arrival_from' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_finished_edu_type && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_is_finished_edu_type'); }}
                                >
                                    Законченное учебное заведение
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_is_finished_edu_type' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_residence_type && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_residence_type'); }}
                                >
                                    Тип проживания
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_residence_type' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_residential_address && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_residential_address'); }}
                                >
                                    Адрес фактического проживания
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_residential_address' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_temporary_residence_add && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_temporary_residence_add'); }}
                                >
                                    Адрес временного проживания
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_temporary_residence_add' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_need_hostel_type && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_is_need_hostel_type'); }}
                                >
                                    Потребность в хостеле
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_is_need_hostel_type' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_financing_source_type && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_financing_source_type'); }}
                                >
                                    Источник финансирования студента
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_financing_source_type' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_quota && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_quota'); }}
                                >
                                    Квота обучения
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_quota' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_orphan && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_is_orphan'); }}
                                >
                                    Является сиротой
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_is_orphan' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_without_parental_care && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_is_without_parental_care'); }}
                                >
                                    Отсутствует попечитель
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_is_without_parental_care' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_disabled_person && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_is_disabled_person'); }}
                                >
                                    Является ли инвалидом
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_is_disabled_person' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_material_assistance_type && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_material_assistance_type'); }}
                                >
                                    Мат. и фин. поддержка
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_material_assistance_type' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_from_young_family && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_is_from_young_family'); }}
                                >
                                    Из молодой семьи
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_is_from_young_family' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_study_in_dual_system && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_is_study_in_dual_system'); }}
                                >
                                    Обучается по дуальной системе
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_is_study_in_dual_system' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_study_in_serpin && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_is_study_in_serpin'); }}
                                >
                                    Обучался в Серпын
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_is_study_in_serpin' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_study_in_productive_employment && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_is_study_in_productive_employment'); }}
                                >
                                    Проходил курсы продуктивной занятости
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_is_study_in_productive_employment' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_completed_training_at_competence_center && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_is_completed_training_at_competence_center'); }}
                                >
                                    Прошел обучение в центре компетенции
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_is_completed_training_at_competence_center' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_study_in_worldskills && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_is_study_in_worldskills'); }}
                                >
                                    Участвовал в WorldSkills
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_is_study_in_worldskills' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_involved_in_social_activities && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_is_involved_in_social_activities'); }}
                                >
                                    Вовлечен в обществуенную деятельность
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_is_involved_in_social_activities' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_in_youth_affairs_committee && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_is_in_youth_affairs_committee'); }}
                                >
                                    Состоит в комитете молодежи
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_is_in_youth_affairs_committee' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_in_student_parliament && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_in_student_parliament'); }}
                                >
                                    Состоит в студенческом парламенте
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_in_student_parliament' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                            {visibleCells?.student_in_jas_sarbaz && (
                                <CTableHeaderCell
                                    scope="col"
                                    className={cls.tableCell}
                                    onClick={() => { onClickSortCell('student_in_jas_sarbaz'); }}
                                >
                                    Участвует в “Жас Сарбаз”
                                    <CIcon
                                        icon={sortOrderField === 'asc' ? cilSortAscending : cilSortDescending}
                                        className={
                                            classNames(
                                                cls.tableSortIcon,
                                                { [cls.active]: sortByField === 'student_in_jas_sarbaz' },
                                                [],
                                            )
                                        }
                                    />
                                </CTableHeaderCell>
                            )}
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            data?.map((student) => (
                                <CTableRow key={student.students_id}>
                                    <CTableHeaderCell scope="row">{student.students_id}</CTableHeaderCell>
                                    <CTableDataCell>{student.fio}</CTableDataCell>
                                    <CTableDataCell>{student.student_govid}</CTableDataCell>
                                    {visibleCells?.student_gender && (
                                        <CTableDataCell>{student.gender && (student.gender.gender)}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_nationality && (
                                        <CTableDataCell>{student.nationality && (student.nationality.nationality)}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_edu_speciality && (
                                        <CTableDataCell>
                                            {student.specialty && (student.specialty.speciality)}
                                        </CTableDataCell>
                                    )}
                                    {visibleCells?.student_edu_classifier && (
                                        <CTableDataCell>
                                            {student.qualification && (student.qualification.qualification)}
                                        </CTableDataCell>
                                    )}
                                    {visibleCells?.student_edu_lang && (
                                        <CTableDataCell>
                                            {student.languageofedu && (student.languageofedu.languageofedu)}
                                        </CTableDataCell>
                                    )}
                                    {visibleCells?.student_edu_form && (
                                        <CTableDataCell>
                                            {student.typeoftraining && (student.typeoftraining.typeoftraining)}
                                        </CTableDataCell>
                                    )}
                                    {visibleCells?.student_is_has_access_to_exams && (
                                        <CTableDataCell>
                                            {
                                                student.student_is_has_access_to_exams ? 'да' : 'нет'
                                            }
                                        </CTableDataCell>
                                    )}
                                    {visibleCells?.student_phone_number && (
                                        <CTableDataCell>{student.student_phone_number}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_birth_date && (
                                        <CTableDataCell>
                                            {
                                                student.student_birth_date
                                                    ? format(new Date(student.student_birth_date), 'dd.MM.yyyy')
                                                    : ''
                                            }
                                        </CTableDataCell>
                                    )}
                                    {visibleCells?.student_arrival_date && (
                                        <CTableDataCell>
                                            {
                                                student.student_arrival_date
                                                    ? format(new Date(student.student_arrival_date), 'dd.MM.yyyy')
                                                    : ''
                                            }
                                        </CTableDataCell>
                                    )}
                                    {visibleCells?.student_study_duration && (
                                        <CTableDataCell>
                                            {student.durationoftraining && (student.durationoftraining.durationoftraining)}
                                        </CTableDataCell>
                                    )}
                                    {visibleCells?.student_study_course && (
                                        <CTableDataCell>
                                            {student.courseoftraining && (student.courseoftraining.courseoftraining)}
                                        </CTableDataCell>
                                    )}
                                    {visibleCells?.student_is_live_at_hostel && (
                                        <CTableDataCell>
                                            {
                                                student.student_is_live_at_hostel ? 'да' : 'нет'
                                            }
                                        </CTableDataCell>
                                    )}

                                    {visibleCells?.student_citizenship && (
                                        <CTableDataCell>{student.citizenship && (student.citizenship.citizenship)}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_enrollment_type && (
                                        <CTableDataCell>{student.typeenrollment && (student.typeenrollment.typeenrollment)}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_is_arrival_from && (
                                        <CTableDataCell>{student.citizenship && (student.citizenship.citizenship)}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_is_finished_edu_type && (
                                        <CTableDataCell>
                                            {student.fromacceptedfinished && (student.fromacceptedfinished.fromacceptedfinished)}
                                        </CTableDataCell>
                                    )}
                                    {visibleCells?.student_residence_type && (
                                        <CTableDataCell>
                                            {student.typeofareaofresidence && (student.typeofareaofresidence.typeofareaofresidence)}
                                        </CTableDataCell>
                                    )}
                                    {visibleCells?.student_residential_address && (
                                        <CTableDataCell>{student.student_residential_address}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_temporary_residence_add && (
                                        <CTableDataCell>{student.student_temporary_residence_address}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_is_need_hostel_type && (
                                        <CTableDataCell>{student.needhostel && (student.needhostel.needhostel)}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_financing_source_type && (
                                        <CTableDataCell>{student.whopaying && (student.whopaying.whopaying)}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_quota && (
                                        <CTableDataCell>{student.kvotum && (student.kvotum.kvota)}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_is_orphan && (
                                        <CTableDataCell>{student.student_is_orphan ? 'да' : 'нет'}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_is_without_parental_care && (
                                        <CTableDataCell>{student.student_is_without_parental_care ? 'да' : 'нет'}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_is_disabled_person && (
                                        <CTableDataCell>{student.student_is_disabled_person ? 'да' : 'нет'}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_material_assistance_type && (
                                        <CTableDataCell>{student.finimatpomosh && (student.finimatpomosh.finimatpomosh)}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_is_from_young_family && (
                                        <CTableDataCell>{student.student_is_from_young_family ? 'да' : 'нет'}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_is_study_in_dual_system && (
                                        <CTableDataCell>{student.student_is_study_in_dual_system ? 'да' : 'нет'}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_is_study_in_serpin && (
                                        <CTableDataCell>{student.student_is_study_in_serpin ? 'да' : 'нет'}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_is_study_in_productive_employment && (
                                        <CTableDataCell>{student.student_is_study_in_productive_employment ? 'да' : 'нет'}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_is_completed_training_at_competence_center && (
                                        <CTableDataCell>
                                            {student.student_is_completed_training_at_competence_center ? 'да' : 'нет'}
                                        </CTableDataCell>
                                    )}
                                    {visibleCells?.student_is_study_in_worldskills && (
                                        <CTableDataCell>{student.student_is_study_in_worldskills ? 'да' : 'нет'}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_is_involved_in_social_activities && (
                                        <CTableDataCell>
                                            {student.student_is_involved_in_social_activities ? 'да' : 'нет'}
                                        </CTableDataCell>
                                    )}
                                    {visibleCells?.student_is_in_youth_affairs_committee && (
                                        <CTableDataCell>{student.student_is_in_youth_affairs_committee ? 'да' : 'нет'}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_in_student_parliament && (
                                        <CTableDataCell>{student.student_in_student_parliament ? 'да' : 'нет'}</CTableDataCell>
                                    )}
                                    {visibleCells?.student_in_jas_sarbaz && (
                                        <CTableDataCell>{student.student_in_jas_sarbaz ? 'да' : 'нет'}</CTableDataCell>
                                    )}

                                    <CTableDataCell>
                                        <CButton
                                            color="primary"
                                            variant="outline"
                                            title="Просмотр"
                                            className={cls.editBtn}
                                            onClick={() => { onShowViewStudentModal(student!.students_id!.toString()); }}
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
                                            onClick={() => { onShowEditStudentModal(student!.students_id!.toString()); }}
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
                                            onClick={() => { onShowDeleteStudentModal(student); }}
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
            {studentsTable}

            <ViewStudent
                visible={visibleViewStudent}
                setVisible={setVisibleViewStudent}
                studentId={studentDetailId!}
                onDeleteStudent={onShowDeleteStudentModal}
                onEditStudent={onShowEditStudentModal}
            />

            <EditStudent
                visible={visibleEditStudent}
                setVisible={setVisibleEditStudent}
                studentId={studentDetailId!}
                onDeleteStudent={onShowDeleteStudentModal}
            />

            <DeleteStudent
                visible={visibleDeleteStudent}
                setVisible={setVisibleDeleteStudent}
                student={deleteUser}
            />
        </div>
    );
};
