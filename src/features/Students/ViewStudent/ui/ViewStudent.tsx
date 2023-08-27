import { classNames } from 'shared/lib/classNames/classNames';
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CNav,
    CNavItem,
    CToaster,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPen, cilTrash } from '@coreui/icons';
import {
    Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import React, {
    ReactElement, useEffect, useRef, useState,
} from 'react';
import { TabsType } from 'features/Students/AddStudent/model/types/addStudent';
import { tabsButtonsItems } from 'features/Students/AddStudent';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { useSelector } from 'react-redux';
import { getStudentDetailData, getStudentDetailError, getStudentDetailIsLoading } from 'entities/StudentDetail';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchStudentDetail } from 'entities/StudentDetail/model/services/fetchStudentDetail/fetchStudentDetail';
import { StudentsType } from 'entities/Students';
import { format } from 'date-fns';
import { capitalizeFirstLetter } from 'shared/lib/capitalizeFirstLetter/capitalizeFirstLetter';
import cls from './ViewStudent.module.scss';

interface ViewStudentProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    studentId: string;
    onDeleteStudent: (student: StudentsType) => void;
    onEditStudent: (id: string) => void;
}
export const ViewStudent = (props: ViewStudentProps) => {
    const {
        className,
        visible,
        setVisible,
        studentId,
        onDeleteStudent,
        onEditStudent,
    } = props;
    const dispatch = useAppDispatch();
    const [tabsButtons] = useState<TabsType[]>(tabsButtonsItems);
    const [activeTab, setActiveTab] = useState(1);

    const studentDetailData = useSelector(getStudentDetailData);
    const isLoadingStudentDetail = useSelector(getStudentDetailIsLoading);
    const errorStudentDetail = useSelector(getStudentDetailError);

    useEffect(() => {
        if (studentId) {
            dispatch(fetchStudentDetail(studentId));
        }
    }, [dispatch, studentId]);

    const onChangeTabHandler = (tabId: number) => {
        setActiveTab(tabId);
        const activeTab = tabsButtons.filter((tab) => tab.active)[0].id;
        tabsButtons[activeTab - 1] = { ...tabsButtons[activeTab - 1], active: false, color: 'light' };
        tabsButtons[tabId - 1] = { ...tabsButtons[tabId - 1], active: true, color: 'primary' };
    };

    const onCloseModal = () => {
        setVisible(false);
        onChangeTabHandler(1);
    };

    const onDeleteHandler = (student: StudentsType) => {
        onDeleteStudent(student);
        onCloseModal();
    };

    const onEditHandler = (id: string) => {
        onEditStudent(id);
        onCloseModal();
    };

    const returnYesOrNo = (value: boolean | undefined) => {
        if (value === true) {
            return 'Да';
        }
        if (value === false) {
            return 'Нет';
        }
        return 'Не указано';
    };

    let tabsContent;

    if (isLoadingStudentDetail) {
        tabsContent = (
            <Skeleton width="100%" height={500} />
        );
    } else if (errorStudentDetail) {
        tabsContent = (
            <Text
                theme={TextTheme.ERROR}
                size={TextSize.M}
                weight={TextWeight.BOLD}
            >
                Произошла ошибка при загрузке данных, попробуйте перезагрузить страницу
            </Text>
        );
    } else {
        tabsContent = (
            <>
                <CNav variant="pills" layout="fill" className={cls.tabsButtonsBlock}>
                    {
                        tabsButtons.map(({ id, title, color }) => (
                            <CNavItem
                                key={id}
                            >
                                <CButton
                                    color={color}
                                    className={cls.tabBtn}
                                    onClick={() => { onChangeTabHandler(id); }}
                                >
                                    {title}
                                </CButton>
                            </CNavItem>
                        ))
                    }
                </CNav>
                {activeTab === 1 && (
                    <div className={cls.tab}>
                        <div className={cls.tabBlock}>
                            <h5 className={cls.title}>Личные данные</h5>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Фамилия</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.user.last_name
                                                ? capitalizeFirstLetter(studentDetailData?.user.last_name)
                                                : 'Не указана'
                                        }
                                    </Text>
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Имя</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.user.first_name
                                                ? capitalizeFirstLetter(studentDetailData?.user.first_name)
                                                : 'Не указано'
                                        }
                                    </Text>
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Отчество</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.user.patronymic
                                                ? capitalizeFirstLetter(studentDetailData?.user.patronymic)
                                                : 'Не указано'
                                        }
                                    </Text>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Логин</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {studentDetailData?.user.login}
                                    </Text>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Дата рождения</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {format(new Date(studentDetailData?.student_birth_date || new Date()), 'dd.MM.yyyy')}
                                    </Text>
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Пол</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.gender.gender
                                                ? capitalizeFirstLetter(studentDetailData?.gender.gender)
                                                : 'Не указан'
                                        }
                                    </Text>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Национальность</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.nationality.nationality
                                                ? capitalizeFirstLetter(studentDetailData?.nationality.nationality)
                                                : 'Не указана'
                                        }
                                    </Text>
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Гражданство</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.citizenship.citizenship
                                                ? capitalizeFirstLetter(studentDetailData?.citizenship.citizenship)
                                                : 'Не указана'
                                        }
                                    </Text>
                                </div>
                            </div>
                        </div>
                        <div className={cls.tabBlock}>
                            <h5 className={cls.title}>Контактные данные</h5>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Номер телефона</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.student_phone_number
                                                ? studentDetailData?.student_phone_number
                                                : 'Не указан'
                                        }
                                    </Text>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>E-mail</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {studentDetailData?.user.Email}
                                    </Text>
                                </div>
                            </div>
                        </div>
                        <div className={cls.tabBlock}>
                            <h5 className={cls.title}>Удостоверение личности</h5>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>ИИН</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.student_govid
                                                ? studentDetailData?.student_govid
                                                : 'Не указан'
                                        }
                                    </Text>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Номер удостоверения личности</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.student_govid_serial
                                                ? studentDetailData?.student_govid_serial
                                                : 'Не указан'
                                        }
                                    </Text>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Дата выпуска удостоверения личности</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.student_govid_issue_date
                                                ? format(new Date(studentDetailData?.student_govid_issue_date), 'dd.MM.yyyy')
                                                : 'Не указана'
                                        }
                                    </Text>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Причина отсутствия ИИН</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.student_reason_for_missing_govid_type
                                                ? studentDetailData?.student_reason_for_missing_govid_type
                                                : 'Не указана'
                                        }
                                    </Text>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 2 && (
                    <div className={cls.tab}>
                        <div className={cls.tabBlock}>
                            <h5 className={cls.title}>Поступление</h5>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Причина поступления</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.typeenrollment
                                                ? capitalizeFirstLetter(studentDetailData?.typeenrollment.typeenrollment)
                                                : 'Не указана'
                                        }
                                    </Text>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Дата поступления</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.student_arrival_date
                                                ? format(new Date(studentDetailData?.student_arrival_date), 'dd.MM.yyyy')
                                                : 'Не указана'
                                        }
                                    </Text>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Откуда прибыл</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.comesfrom
                                                ? capitalizeFirstLetter(studentDetailData?.comesfrom.comesfrom)
                                                : 'Не указано'
                                        }
                                    </Text>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Тип законченного учебного заведения</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.fromacceptedfinished
                                                ? capitalizeFirstLetter(studentDetailData?.fromacceptedfinished.fromacceptedfinished)
                                                : 'Не указан'
                                        }
                                    </Text>
                                </div>
                            </div>
                        </div>
                        <div className={cls.tabBlock}>
                            <h5 className={cls.title}>Прохождение обучения</h5>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Специальность</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.specialty
                                                ? capitalizeFirstLetter(studentDetailData?.specialty.speciality)
                                                : 'Не указана'
                                        }
                                    </Text>
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Классификатор</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.qualification
                                                ? capitalizeFirstLetter(studentDetailData?.qualification.qualification)
                                                : 'Не указан'
                                        }
                                    </Text>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Продолжительность обучения</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.durationoftraining
                                                ? studentDetailData?.durationoftraining.durationoftraining
                                                : 'Не указана'
                                        }
                                    </Text>
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Текущий курс обучения</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.courseoftraining
                                                ? studentDetailData?.courseoftraining.courseoftraining
                                                : 'Не указан'
                                        }
                                    </Text>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Язык обучения</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.languageofedu
                                                ? capitalizeFirstLetter(studentDetailData?.languageofedu.languageofedu)
                                                : 'Не указан'
                                        }
                                    </Text>
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Форма обучения</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.typeoftraining
                                                ? capitalizeFirstLetter(studentDetailData?.typeoftraining.typeoftraining)
                                                : 'Не указана'
                                        }
                                    </Text>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 3 && (
                    <div className={cls.tab}>
                        <div className={cls.tabBlock}>
                            <h5 className={cls.title}>Адрес и условия проживания</h5>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Адрес фактического проживания</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.student_residential_address
                                                ? capitalizeFirstLetter(studentDetailData?.student_residential_address)
                                                : 'Не указан'
                                        }
                                    </Text>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Адрес временного проживания</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.student_temporary_residence_address
                                                ? capitalizeFirstLetter(studentDetailData?.student_temporary_residence_address)
                                                : 'Не указан'
                                        }
                                    </Text>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Тип проживания</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.typeofareaofresidence
                                                ? capitalizeFirstLetter(studentDetailData?.typeofareaofresidence.typeofareaofresidence)
                                                : 'Не указан'
                                        }
                                    </Text>
                                </div>
                            </div>
                        </div>
                        <div className={cls.tabBlock}>
                            <h5 className={cls.title}>Хостел</h5>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>
                                        Потребность в хостеле:
                                        {' '}
                                        <span
                                            className={cls.checkboxText}
                                        >
                                            {
                                                studentDetailData?.needhostel
                                                    ? capitalizeFirstLetter(studentDetailData?.needhostel.needhostel)
                                                    : 'Не указана'
                                            }
                                        </span>
                                    </h6>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>
                                        Проживает в хостеле:
                                        {' '}
                                        <span className={cls.checkboxText}>
                                            {returnYesOrNo(studentDetailData?.student_is_live_at_hostel)}
                                        </span>

                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 4 && (
                    <div className={cls.tab}>
                        <div className={cls.tabBlock}>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Источник финансирования студента</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.whopaying
                                                ? capitalizeFirstLetter(studentDetailData?.whopaying.whopaying)
                                                : 'Не указан'
                                        }
                                    </Text>
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Тип материальной и фин. поддержки</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.finimatpomosh
                                                ? capitalizeFirstLetter(studentDetailData?.finimatpomosh.finimatpomosh)
                                                : 'Не указан'
                                        }
                                    </Text>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Квота обучения</h6>
                                    <Text
                                        size={TextSize.S}
                                        weight={TextWeight.BOLD}
                                    >
                                        {
                                            studentDetailData?.kvotum
                                                ? capitalizeFirstLetter(studentDetailData?.kvotum.kvota)
                                                : 'Не указана'
                                        }
                                    </Text>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>
                                        Является сиротой:
                                        {' '}
                                        <span className={cls.checkboxText}>
                                            {returnYesOrNo(studentDetailData?.student_is_orphan)}
                                        </span>
                                    </h6>
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>
                                        Отсутствует попечитель:
                                        {' '}

                                        <span className={cls.checkboxText}>
                                            {returnYesOrNo(studentDetailData?.student_is_without_parental_care)}
                                        </span>
                                    </h6>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>
                                        Является инвалидом:
                                        {' '}

                                        <span className={cls.checkboxText}>
                                            {returnYesOrNo(studentDetailData?.student_is_disabled_person)}
                                        </span>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 5 && (
                    <div className={cls.tab}>
                        <div className={cls.tabBlock}>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>
                                        Обучается по дуальной системе:
                                        {' '}
                                        <span className={cls.checkboxText}>
                                            {returnYesOrNo(studentDetailData?.student_is_study_in_dual_system)}
                                        </span>

                                    </h6>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>
                                        Обучался в Серпын:
                                        {' '}
                                        <span className={cls.checkboxText}>
                                            {returnYesOrNo(studentDetailData?.student_is_study_in_serpin)}
                                        </span>

                                    </h6>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>
                                        Проходил курсы продуктивной занятости:
                                        {' '}
                                        <span className={cls.checkboxText}>
                                            {returnYesOrNo(studentDetailData?.student_is_study_in_productive_employment)}
                                        </span>

                                    </h6>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>
                                        Прошел обучение в центре компетенции:
                                        {' '}
                                        <span className={cls.checkboxText}>
                                            {returnYesOrNo(studentDetailData?.student_is_completed_training_at_competence_center)}
                                        </span>

                                    </h6>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>
                                        Учавствовал в WorldSkills:
                                        {' '}
                                        <span className={cls.checkboxText}>
                                            {returnYesOrNo(studentDetailData?.student_is_study_in_worldskills)}
                                        </span>

                                    </h6>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>
                                        Вовлечен в обществуенную деятельность:
                                        {' '}
                                        <span className={cls.checkboxText}>
                                            {returnYesOrNo(studentDetailData?.student_is_involved_in_social_activities)}
                                        </span>

                                    </h6>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>
                                        Состоит в комитете молодежи:
                                        {' '}
                                        <span className={cls.checkboxText}>
                                            {returnYesOrNo(studentDetailData?.student_is_in_youth_affairs_committee)}
                                        </span>

                                    </h6>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>
                                        Состоит в студенческом парламенте:
                                        {' '}
                                        <span className={cls.checkboxText}>
                                            {returnYesOrNo(studentDetailData?.student_in_student_parliament)}
                                        </span>

                                    </h6>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>
                                        Участвует в “Жас Сарбаз”:
                                        {' '}
                                        <span className={cls.checkboxText}>
                                            {returnYesOrNo(studentDetailData?.student_in_jas_sarbaz)}
                                        </span>

                                    </h6>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>
                                        Из молодой семьи:
                                        {' '}
                                        <span className={cls.checkboxText}>
                                            {returnYesOrNo(studentDetailData?.student_is_from_young_family)}
                                        </span>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <CModal
            className={classNames(cls.ViewStudent, {}, [className, 'view-student-modal'])}
            visible={visible}
            onClose={onCloseModal}
            scrollable
        >
            <CModalHeader>
                {
                    isLoadingStudentDetail
                        ? <Skeleton width={200} height={30} />
                        : (
                            <CModalTitle>
                                Студент №
                                {studentDetailData?.students_id}
                                {' '}
                                -
                                {' '}
                                {studentDetailData?.user.last_name}
                                {' '}
                                {studentDetailData?.user.first_name}
                                {' '}
                                {studentDetailData?.user.patronymic}
                            </CModalTitle>
                        )
                }
            </CModalHeader>
            <CModalBody>
                {tabsContent}
            </CModalBody>
            <CModalFooter
                className={cls.footer}
            >
                <div />
                <div className={cls.footerBtns}>
                    <CButton
                        color="primary"
                        variant="outline"
                        className={cls.footerBtn}
                        onClick={onCloseModal}
                    >
                        Закрыть
                    </CButton>
                    <CButton
                        color="danger"
                        className={classNames(cls.footerBtn, {}, [cls.redBtn])}
                        onClick={() => { onDeleteHandler(studentDetailData!); }}
                        disabled={
                            isLoadingStudentDetail
                            || !!errorStudentDetail
                        }
                    >
                        <CIcon icon={cilTrash} className={cls.btnIcon} />
                        Удалить
                    </CButton>
                    <CButton
                        color="primary"
                        className={cls.footerBtn}
                        onClick={() => { onEditHandler(studentId); }}
                        disabled={
                            isLoadingStudentDetail
                            || !!errorStudentDetail
                        }
                    >
                        <CIcon icon={cilPen} className={cls.btnIcon} />
                        Редактировать
                    </CButton>
                </div>
            </CModalFooter>
        </CModal>
    );
};
