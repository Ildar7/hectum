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
import { TableFieldsType } from 'features/TableFields';
import { fetchStudents } from '../model/services/fetchStudents/fetchStudents';
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
                <Text>По вашему запросу ничего не найдено</Text>
            ) : (
                <CTable className={cls.table} striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">ID студента</CTableHeaderCell>
                            <CTableHeaderCell scope="col">ФИО</CTableHeaderCell>
                            <CTableHeaderCell scope="col">ИИН</CTableHeaderCell>
                            {visibleCells?.student_gender && (<CTableHeaderCell scope="col">Пол</CTableHeaderCell>)}
                            {visibleCells?.student_nationality && (<CTableHeaderCell scope="col">Национальность</CTableHeaderCell>)}
                            {visibleCells?.student_edu_speciality && (<CTableHeaderCell scope="col">Специальность</CTableHeaderCell>)}
                            {visibleCells?.student_edu_classifier && (<CTableHeaderCell scope="col">Классификатор</CTableHeaderCell>)}
                            {visibleCells?.student_edu_lang && (<CTableHeaderCell scope="col">Язык обучения</CTableHeaderCell>)}
                            {visibleCells?.student_edu_form && (<CTableHeaderCell scope="col">Форма обучения</CTableHeaderCell>)}
                            {visibleCells?.student_is_has_access_to_exams && (
                                <CTableHeaderCell scope="col">Доступ к экзаменам</CTableHeaderCell>
                            )}
                            {visibleCells?.student_phone_number && (<CTableHeaderCell scope="col">Телефон</CTableHeaderCell>)}
                            {visibleCells?.student_birth_date && (<CTableHeaderCell scope="col">Дата рождения</CTableHeaderCell>)}
                            {visibleCells?.student_arrival_date && (<CTableHeaderCell scope="col">Дата поступления</CTableHeaderCell>)}
                            {visibleCells?.student_study_duration && (
                                <CTableHeaderCell scope="col">Продолжительность обучения</CTableHeaderCell>
                            )}
                            {visibleCells?.student_study_course && (<CTableHeaderCell scope="col">Курс обучения</CTableHeaderCell>)}
                            {visibleCells?.student_is_live_at_hostel && (
                                <CTableHeaderCell scope="col">Проживает в хостеле</CTableHeaderCell>
                            )}

                            {visibleCells?.student_citizenship && (
                                <CTableHeaderCell scope="col">Гражданство</CTableHeaderCell>
                            )}
                            {visibleCells?.student_enrollment_type && (
                                <CTableHeaderCell scope="col">Причина поступления</CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_arrival_from && (
                                <CTableHeaderCell scope="col">Откуда прибыл</CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_finished_edu_type && (
                                <CTableHeaderCell scope="col">Законченное учебное заведение</CTableHeaderCell>
                            )}
                            {visibleCells?.student_residence_type && (
                                <CTableHeaderCell scope="col">Тип проживания</CTableHeaderCell>
                            )}
                            {visibleCells?.student_residential_address && (
                                <CTableHeaderCell scope="col">Адрес фактического проживания</CTableHeaderCell>
                            )}
                            {visibleCells?.student_temporary_residence_add && (
                                <CTableHeaderCell scope="col">Адрес временного проживания</CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_need_hostel_type && (
                                <CTableHeaderCell scope="col">Потребность в хостеле</CTableHeaderCell>
                            )}
                            {visibleCells?.student_financing_source_type && (
                                <CTableHeaderCell scope="col">Источник финансирования студента</CTableHeaderCell>
                            )}
                            {visibleCells?.student_quota && (
                                <CTableHeaderCell scope="col">Квота обучения</CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_orphan && (
                                <CTableHeaderCell scope="col">Является сиротой</CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_without_parental_care && (
                                <CTableHeaderCell scope="col">Отсутствует попечитель</CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_disabled_person && (
                                <CTableHeaderCell scope="col">Является ли инвалидом</CTableHeaderCell>
                            )}
                            {visibleCells?.student_material_assistance_type && (
                                <CTableHeaderCell scope="col">Мат. и фин. поддержка</CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_from_young_family && (
                                <CTableHeaderCell scope="col">Из молодой семьи</CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_study_in_dual_system && (
                                <CTableHeaderCell scope="col">Обучается по дуальной системе</CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_study_in_serpin && (
                                <CTableHeaderCell scope="col">Обучался в Серпын</CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_study_in_productive_employment && (
                                <CTableHeaderCell scope="col">Проходил курсы продуктивной занятости</CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_completed_training_at_competence_center && (
                                <CTableHeaderCell scope="col">Прошел обучение в центре компетенции</CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_study_in_worldskills && (
                                <CTableHeaderCell scope="col">Участвовал в WorldSkills</CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_involved_in_social_activities && (
                                <CTableHeaderCell scope="col">Вовлечен в обществуенную деятельность</CTableHeaderCell>
                            )}
                            {visibleCells?.student_is_in_youth_affairs_committee && (
                                <CTableHeaderCell scope="col">Состоит в комитете молодежи</CTableHeaderCell>
                            )}
                            {visibleCells?.student_in_student_parliament && (
                                <CTableHeaderCell scope="col">Состоит в студенческом парламенте</CTableHeaderCell>
                            )}
                            {visibleCells?.student_in_jas_sarbaz && (
                                <CTableHeaderCell scope="col">Участвует в “Жас Сарбаз”</CTableHeaderCell>
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
                                                format(new Date(student.student_birth_date), 'dd.MM.yyyy')
                                            }
                                        </CTableDataCell>
                                    )}
                                    {visibleCells?.student_arrival_date && (
                                        <CTableDataCell>
                                            {
                                                format(new Date(student.student_arrival_date), 'dd.MM.yyyy')
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
