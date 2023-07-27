import { classNames, Mods } from 'shared/lib/classNames/classNames';
import {
    CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,
} from '@coreui/react';
import { cilPencil, cilTrash, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import {
    Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import { format } from 'date-fns';
import { fetchStudents } from '../model/services/fetchStudents/fetchStudents';
import { getStudentsIsLoading } from '../model/selectors/getStudentsIsLoading/getStudentsIsLoading';
import { getStudentsError } from '../model/selectors/getStudentsError/getStudentsError';
import cls from './Students.module.scss';
import { StudentsType } from '../model/types/students';

interface StudentsProps {
  className?: string;
  data: StudentsType[];
}

export const Students = (props: StudentsProps) => {
    const {
        className,
        data,
    } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getStudentsIsLoading);
    const error = useSelector(getStudentsError);

    useEffect(() => {
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
                weight={TextWeight.BOLD}
                size={TextSize.L}
                className={cls.error}
            >
                Произошла ошибка при загрузке данных, пожалуйста, попробуйте перезагрузить страницу
            </Text>
        );
    } else {
        studentsTable = (
            !data.length ? (
                <Text>По вашему запросу ничего не найдено</Text>
            ) : (
                <CTable className={cls.table} striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">ID студента</CTableHeaderCell>
                            <CTableHeaderCell scope="col">ФИО</CTableHeaderCell>
                            <CTableHeaderCell scope="col">ИИН</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Пол</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Национальность</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Специальность</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Классификатор</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Язык обучения</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Форма обучения</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Доступ к экзаменам</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Телефон</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Дата рождения</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Дата поступления</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Продолжительность обучения</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Курс обучения</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Проживает в хостеле</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            data?.map((student) => (
                                <CTableRow key={student.students_id}>
                                    <CTableHeaderCell scope="row">{student.students_id}</CTableHeaderCell>
                                    <CTableDataCell>{student.fio}</CTableDataCell>
                                    <CTableDataCell>{student.student_govid}</CTableDataCell>
                                    <CTableDataCell>{student.gender.gender}</CTableDataCell>
                                    <CTableDataCell>{student.nationality.nationality}</CTableDataCell>
                                    <CTableDataCell>{student.specialty.speciality}</CTableDataCell>
                                    <CTableDataCell>{student.qualification.qualification}</CTableDataCell>
                                    <CTableDataCell>{student.languageofedu.languageofedu}</CTableDataCell>
                                    <CTableDataCell>{student.typeoftraining.typeoftraining}</CTableDataCell>
                                    <CTableDataCell>
                                        {
                                            student.student_is_has_access_to_exams ? 'да' : 'нет'
                                        }
                                    </CTableDataCell>
                                    <CTableDataCell>{student.student_phone_number}</CTableDataCell>
                                    <CTableDataCell>
                                        {
                                            format(new Date(student.student_birth_date), 'dd.MM.yyyy')
                                        }
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {
                                            format(new Date(student.student_arrival_date), 'dd.MM.yyyy')
                                        }
                                    </CTableDataCell>
                                    <CTableDataCell>{student.durationoftraining.durationoftraining}</CTableDataCell>
                                    <CTableDataCell>{student.courseoftraining.courseoftraining}</CTableDataCell>
                                    <CTableDataCell>
                                        {
                                            student.student_is_live_at_hostel ? 'да' : 'нет'
                                        }
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CButton
                                            color="primary"
                                            variant="outline"
                                            title="Просмотр"
                                            className={cls.editBtn}
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
        </div>
    );
};
