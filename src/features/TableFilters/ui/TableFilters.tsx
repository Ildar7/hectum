import { classNames } from 'shared/lib/classNames/classNames';
import {
    CButton,
    CFormCheck,
    CFormInput,
    CFormSelect,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CToaster,
} from '@coreui/react';
import React, {
    ReactElement, useCallback, useEffect, useRef, useState,
} from 'react';
import { cilSearch } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { Datepicker } from 'widgets/Datepicker';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import {
    Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import { Toast } from 'shared/ui/Toast/Toast';
import { ClearedFiltersType, TableFiltersSelectedType } from 'features/TableFilters/model/types/tableFiltersSelected';
import { format } from 'date-fns';
import { fetchStudents } from 'entities/Students';
import { tableFiltersSelectedActions } from '../model/slice/tableFiltersSelectedSlice';
import {
    getTableFiltersSelectedData,
} from '../model/selectors/getTableFiltersSelectedData/getTableFiltersSelectedData';
import { getTableFiltersError } from '../model/selectors/getTableFiltersError/getTableFiltersError';
import { getTableFiltersIsLoading } from '../model/selectors/getTableFiltersIsLoading/getTableFiltersIsLoading';
import { getTableFiltersData } from '../model/selectors/getTableFiltersData/getTableFiltersData';
import { fetchTableFilters } from '../model/services/fetchTableFilters/fetchTableFilters';
import cls from './TableFilters.module.scss';

interface TableFiltersProps {
  className?: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
}
export const TableFilters = ({ className, visible, setVisible }: TableFiltersProps) => {
    const dispatch = useAppDispatch();
    const data = useSelector(getTableFiltersData);
    const isLoading = useSelector(getTableFiltersIsLoading);
    const error = useSelector(getTableFiltersError);

    const selectedFilters = useSelector(getTableFiltersSelectedData);
    const [toast, addToast] = useState<ReactElement>();
    const toaster = useRef<HTMLDivElement | null>(null);
    const onCloseModal = () => {
        setVisible(false);
    };

    const onChangeDate = (date: Date | null, filterName: string, when: string) => {
        dispatch(tableFiltersSelectedActions.setBirthDateFilter(
            [date?.toString(), filterName, when],
        ));
    };

    const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>, filterName: string) => {
        dispatch(tableFiltersSelectedActions.setSelectFilter([filterName, event.target.value]));
    };

    const onChangeMultipleSelect = (event: React.ChangeEvent<HTMLSelectElement>, filterName: string) => {
        const selectedOptionsValue = Array.from(event.target.selectedOptions).map((item) => item.value);
        dispatch(tableFiltersSelectedActions.setSelectMultipleFilter([filterName, selectedOptionsValue]));
    };

    const validatePhoneNum = (phone: string): boolean => {
        if (phone.length > 12) {
            addToast(Toast.error('Вы можете ввести не более 12 цифр!'));
            return false;
        }

        return true;
    };

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, filterName: string) => {
        if (filterName === 'phoneNumber') {
            if (validatePhoneNum(event.target.value.replace(/\D/g, ''))) {
                dispatch(tableFiltersSelectedActions.setInputFilter([filterName, event.target.value.replace(/\D/g, '')]));
            }
        } else {
            dispatch(tableFiltersSelectedActions.setInputFilter([filterName, event.target.value]));
        }
    };

    const onCheckHandler = (e: React.ChangeEvent<HTMLInputElement>, filterName: string) => {
        dispatch(tableFiltersSelectedActions.setCheckboxFilter([e.target.checked, filterName]));
    };

    const onFindHandler = useCallback(() => {
        dispatch(fetchStudents());
        setVisible(false);
    }, [dispatch, setVisible]);

    useEffect(() => {
        dispatch(fetchTableFilters());
    }, [dispatch]);

    let filtersModal;

    if (isLoading) {
        filtersModal = (
            <Skeleton width="100%" height={500} />
        );
    } else if (error) {
        filtersModal = (
            <Text
                theme={TextTheme.ERROR}
                size={TextSize.M}
                weight={TextWeight.SEMIBOLD}
            >
                Произошла ошибка при загрузке данных, попробуйте перезагрузить страницу
            </Text>
        );
    } else {
        filtersModal = (
            <>
                <div className={cls.filtersBlock}>
                    <h5 className={cls.title}>Общие</h5>
                    <div className={cls.settings}>
                        <div className={classNames(cls.filter, {}, [cls.full])}>
                            <h6 className={cls.filterTitle}>Дата рождения</h6>
                            <Datepicker
                                startDate={(selectedFilters?.birthDate.from ? new Date(selectedFilters?.birthDate.from) : null) || null}
                                endDate={selectedFilters?.birthDate.to ? new Date(selectedFilters?.birthDate.to) : null || null}
                                onChange={(date, filterName, when) => {
                                    onChangeDate(date, 'birthDate', when);
                                }}
                            />
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Пол</h6>
                            <CFormSelect
                                className={cls.selectFilter}
                                value={selectedFilters?.student_gender ? selectedFilters?.student_gender : 'null'}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => { onChangeSelect(event, 'student_gender'); }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.gender.map((genderItem) => (
                                        <option
                                            key={genderItem.id_gender}
                                            value={genderItem.id_gender}
                                        >
                                            {genderItem.gender}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Национальность</h6>
                            <CFormSelect
                                className={cls.selectFilter}
                                value={selectedFilters?.student_nationality ? selectedFilters?.student_nationality : 'null'}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => { onChangeSelect(event, 'student_nationality'); }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.nationality.data.map((nationalityItem) => (
                                        <option
                                            key={nationalityItem.id_nationality}
                                            value={nationalityItem.id_nationality}
                                        >
                                            {nationalityItem.nationality}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Гражданство</h6>
                            <CFormSelect
                                className={cls.selectFilter}
                                value={selectedFilters?.student_citizenship ? selectedFilters?.student_citizenship : 'null'}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => { onChangeSelect(event, 'student_citizenship'); }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.citizenshipTypes.data.map((citizenship) => (
                                        <option
                                            key={citizenship.id_citizenship}
                                            value={citizenship.id_citizenship}
                                        >
                                            {citizenship.citizenship}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Номер телефона</h6>
                            <CFormInput
                                type="text"
                                placeholder="+7 7172 112-12-12"
                                value={selectedFilters?.student_phone_number}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onChangeInput(event, 'student_phone_number');
                                    }
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className={cls.filtersBlock}>
                    <h5 className={cls.title}>Обучение</h5>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Специальность</h6>
                            <CFormSelect
                                className={cls.selectFilter}
                                value={selectedFilters?.student_edu_speciality ? selectedFilters?.student_edu_speciality : 'null'}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => { onChangeSelect(event, 'student_edu_speciality'); }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.speciality.map((specialityItem) => (
                                        <option
                                            key={specialityItem.id_spec}
                                            value={specialityItem.id_spec}
                                        >
                                            {specialityItem.speciality}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Классификатор</h6>
                            <CFormSelect
                                className={cls.selectFilter}
                                value={selectedFilters?.student_edu_classifier ? selectedFilters?.student_edu_classifier : 'null'}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => { onChangeSelect(event, 'student_edu_classifier'); }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.qualifications.data.map((qualificationsItem) => (
                                        <option
                                            key={qualificationsItem.id_qual}
                                            value={qualificationsItem.id_qual}
                                        >
                                            {qualificationsItem.qualification}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Продолжительность обучения</h6>
                            <CFormSelect
                                multiple
                                className={classNames(cls.selectFilter, {}, [cls.selectFilterMultiple])}
                                value={selectedFilters?.student_study_duration}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeMultipleSelect(event, 'student_study_duration');
                                    }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.studyDurations.data.map((studyDurationItem) => (
                                        <option
                                            key={studyDurationItem.id_durationoftraining}
                                            value={studyDurationItem.id_durationoftraining}
                                        >
                                            {studyDurationItem.durationoftraining}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Текущий курс обучения</h6>
                            <CFormSelect
                                multiple
                                className={classNames(cls.selectFilter, {}, [cls.selectFilterMultiple])}
                                value={selectedFilters?.student_study_course}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeMultipleSelect(event, 'student_study_course');
                                    }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.educationsCourses.data.map((educationCourseItem) => (
                                        <option
                                            key={educationCourseItem.id_courseoftraining}
                                            value={educationCourseItem.id_courseoftraining}
                                        >
                                            {educationCourseItem.courseoftraining}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Форма обучения</h6>
                            <CFormSelect
                                className={cls.selectFilter}
                                value={selectedFilters?.student_edu_form ? selectedFilters?.student_edu_form : 'null'}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'student_edu_form');
                                    }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.educationsForms.map((educationFormItem) => (
                                        <option
                                            key={educationFormItem.id_typeoftraining}
                                            value={educationFormItem.id_typeoftraining}
                                        >
                                            {educationFormItem.typeoftraining}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={classNames(cls.filter, {}, [cls.full])}>
                            <h6 className={cls.filterTitle}>Дата поступления</h6>
                            <Datepicker
                                startDate={(selectedFilters?.arrivalDate.from ? new Date(selectedFilters?.arrivalDate.from) : null) || null}
                                endDate={(selectedFilters?.arrivalDate.to ? new Date(selectedFilters?.arrivalDate.to) : null) || null}
                                onChange={(date, filterName, when) => {
                                    onChangeDate(date, 'arrivalDate', when);
                                }}
                            />
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Причина поступления</h6>
                            <CFormSelect
                                className={cls.selectFilter}
                                value={selectedFilters?.student_enrollment_type ? selectedFilters?.student_enrollment_type : 'null'}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'student_enrollment_type');
                                    }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.enrollmentTypes.data.map((enrollmentItem) => (
                                        <option
                                            key={enrollmentItem.id_typeenrollment}
                                            value={enrollmentItem.id_typeenrollment}
                                        >
                                            {enrollmentItem.typeenrollment}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Откуда прибыл</h6>
                            <CFormSelect
                                className={cls.selectFilter}
                                value={selectedFilters?.student_is_arrival_from ? selectedFilters?.student_is_arrival_from : 'null'}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'student_is_arrival_from');
                                    }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.studentArrivalSources.map((country) => (
                                        <option
                                            key={country.id_comesfrom}
                                            value={country.id_comesfrom}
                                        >
                                            {country.comesfrom}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Тип законченного учебного заведения</h6>
                            <CFormSelect
                                className={cls.selectFilter}
                                value={
                                    selectedFilters?.student_is_finished_edu_type ? selectedFilters?.student_is_finished_edu_type : 'null'
                                }
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'student_is_finished_edu_type');
                                    }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.finishedEducationTypes.data.map((finishedEducationItem) => (
                                        <option
                                            key={finishedEducationItem.id_fromacceptedfinished}
                                            value={finishedEducationItem.id_fromacceptedfinished}
                                        >
                                            {finishedEducationItem.fromacceptedfinished}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Язык обучения</h6>
                            <CFormSelect
                                className={cls.selectFilter}
                                value={selectedFilters?.student_edu_lang ? selectedFilters?.student_edu_lang : 'null'}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'student_edu_lang');
                                    }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.studyLanguages.data.map((language) => (
                                        <option
                                            key={language.id_languageofedu}
                                            value={language.id_languageofedu}
                                        >
                                            {language.languageofedu}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Имеет доступ к экзаменам</h6>
                                )}
                                className={cls.checkbox}
                                checked={selectedFilters?.student_is_has_access_to_exams}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onCheckHandler(event, 'student_is_has_access_to_exams');
                                    }
                                }
                                id="accessToExams"
                            />
                        </div>
                    </div>
                </div>
                <div className={cls.filtersBlock}>
                    <h5 className={cls.title}>Проживание</h5>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Тип проживания</h6>
                            <CFormSelect
                                className={cls.selectFilter}
                                value={selectedFilters?.student_residence_type ? selectedFilters?.student_residence_type : 'null'}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'student_residence_type');
                                    }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.residenceTypes.map((residence) => (
                                        <option
                                            key={residence.id_typeofareaofresidence}
                                            value={residence.id_typeofareaofresidence}
                                        >
                                            {residence.typeofareaofresidence}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Адрес фактического проживания</h6>
                            <CFormInput
                                type="text"
                                placeholder="ул. Пушкина, д. 22"
                                value={selectedFilters?.student_residential_address}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onChangeInput(event, 'student_residential_address');
                                    }
                                }
                            />
                        </div>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Адрес временного проживания</h6>
                            <CFormInput
                                type="text"
                                placeholder="ул. Пушкина, д. 22"
                                value={selectedFilters?.student_temporary_residence_address}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onChangeInput(event, 'student_temporary_residence_address');
                                    }
                                }
                            />
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Тип потребности в хостеле</h6>
                            <CFormSelect
                                multiple
                                className={classNames(cls.selectFilter, {}, [cls.selectFilterMultiple])}
                                value={selectedFilters?.student_is_need_hostel_type}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeMultipleSelect(event, 'student_is_need_hostel_type');
                                    }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.needHostelTypes.map((needHostelItem) => (
                                        <option
                                            key={needHostelItem.id_needhostel}
                                            value={needHostelItem.id_needhostel}
                                        >
                                            {needHostelItem.needhostel}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Проживает в хостеле</h6>
                                )}
                                className={cls.checkbox}
                                checked={selectedFilters?.student_is_live_at_hostel}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onCheckHandler(event, 'student_is_live_at_hostel');
                                    }
                                }
                                id="liveInHostel"
                            />
                        </div>
                    </div>
                </div>
                <div className={cls.filtersBlock}>
                    <h5 className={cls.title}>Финансирование и обеспечение</h5>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Источник финансирования студентов</h6>
                            <CFormSelect
                                multiple
                                className={classNames(cls.selectFilter, {}, [cls.selectFilterMultiple])}
                                value={selectedFilters?.student_financing_source_type}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeMultipleSelect(event, 'student_financing_source_type');
                                    }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.financingSources.map((financingSourceItem) => (
                                        <option
                                            key={financingSourceItem.id_whopaying}
                                            value={financingSourceItem.id_whopaying}
                                        >
                                            {financingSourceItem.whopaying}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Квота обучения</h6>
                            <CFormSelect
                                multiple
                                className={classNames(cls.selectFilter, {}, [cls.selectFilterMultiple])}
                                value={selectedFilters?.student_quota}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeMultipleSelect(event, 'student_quota');
                                    }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.admissionQuotasTypes.map((quota) => (
                                        <option
                                            key={quota.id_kvota}
                                            value={quota.id_kvota}
                                        >
                                            {quota.kvota}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Является сиротой</h6>
                                )}
                                className={cls.checkbox}
                                checked={selectedFilters?.student_is_orphan}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onCheckHandler(event, 'student_is_orphan');
                                    }
                                }
                                id="isOrphan"
                            />
                        </div>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Отсутствует попечитель</h6>
                                )}
                                className={cls.checkbox}
                                checked={selectedFilters?.student_is_without_parental_care}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onCheckHandler(event, 'student_is_without_parental_care');
                                    }
                                }
                                id="isWithoutParentalCare"
                            />
                        </div>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Является инвалидом</h6>
                                )}
                                className={cls.checkbox}
                                checked={selectedFilters?.student_is_disabled_person}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onCheckHandler(event, 'student_is_disabled_person');
                                    }
                                }
                                id="studentIsDisabledPerson"
                            />
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Тип материальной и фин. поддержки</h6>
                            <CFormSelect
                                multiple
                                className={classNames(cls.selectFilter, {}, [cls.selectFilterMultiple])}
                                value={selectedFilters?.student_material_assistance_type}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeMultipleSelect(event, 'student_material_assistance_type');
                                    }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    data?.materialAssistanceTypes.map((helpItem) => (
                                        <option
                                            key={helpItem.id_finimatpomosh}
                                            value={helpItem.id_finimatpomosh}
                                        >
                                            {helpItem.finimatpomosh}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Из молодой семьи</h6>
                                )}
                                className={cls.checkbox}
                                checked={selectedFilters?.student_is_from_young_family}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onCheckHandler(event, 'student_is_from_young_family');
                                    }
                                }
                                id="isFromYoungFamily"
                            />
                        </div>
                    </div>
                </div>
                <div className={cls.filtersBlock}>
                    <h5 className={cls.title}>Особенности и достижения</h5>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Обучается по дуальной системе</h6>
                                )}
                                className={cls.checkbox}
                                checked={selectedFilters?.student_is_study_in_dual_system}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onCheckHandler(event, 'student_is_study_in_dual_system');
                                    }
                                }
                                id="isStudyInDualSystem"
                            />
                        </div>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Обучался в Серпын</h6>
                                )}
                                className={cls.checkbox}
                                checked={selectedFilters?.student_is_study_in_serpin}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onCheckHandler(event, 'student_is_study_in_serpin');
                                    }
                                }
                                id="isStudyInSerpin"
                            />
                        </div>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Проходил курсы продуктивной занятости</h6>
                                )}
                                className={cls.checkbox}
                                checked={selectedFilters?.student_is_study_in_productive_employment}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onCheckHandler(event, 'student_is_study_in_productive_employment');
                                    }
                                }
                                id="isStudyInProductiveEmployment"
                            />
                        </div>

                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Прошел обучение в центре компетенции</h6>
                                )}
                                className={cls.checkbox}
                                checked={selectedFilters?.student_is_completed_training_at_competence_center}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onCheckHandler(event, 'student_is_completed_training_at_competence_center');
                                    }
                                }
                                id="isCompletedTrainingAtCompetenceCenter"
                            />
                        </div>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Учавствовал в WorldSkills</h6>
                                )}
                                className={cls.checkbox}
                                checked={selectedFilters?.student_is_study_in_worldskills}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onCheckHandler(event, 'student_is_study_in_worldskills');
                                    }
                                }
                                id="isStudyInWorldskills"
                            />
                        </div>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Вовлечен в обществуенную деятельность</h6>
                                )}
                                className={cls.checkbox}
                                checked={selectedFilters?.student_is_involved_in_social_activities}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onCheckHandler(event, 'student_is_involved_in_social_activities');
                                    }
                                }
                                id="isInvolvedInSocialActivities"
                            />
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Состоит в комитете молодежи</h6>
                                )}
                                className={cls.checkbox}
                                checked={selectedFilters?.student_is_in_youth_affairs_committee}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onCheckHandler(event, 'student_is_in_youth_affairs_committee');
                                    }
                                }
                                id="isInYouthAffairsCommittee"
                            />
                        </div>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Состоит в студенческом парламенте</h6>
                                )}
                                className={cls.checkbox}
                                checked={selectedFilters?.student_in_student_parliament}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onCheckHandler(event, 'student_in_student_parliament');
                                    }
                                }
                                id="isInStudentParliament"
                            />
                        </div>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Участвует в “Жас Сарбаз”</h6>
                                )}
                                className={cls.checkbox}
                                checked={selectedFilters?.student_in_jas_sarbaz}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        onCheckHandler(event, 'student_in_jas_sarbaz');
                                    }
                                }
                                id="isInJasSarbaz"
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <CModal
                className={classNames(cls.Filters, {}, [className])}
                visible={visible}
                onClose={onCloseModal}
                size="xl"
                scrollable
            >
                <CModalHeader>
                    <CModalTitle>Фильтры</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {filtersModal}
                </CModalBody>
                <CModalFooter>
                    <CButton
                        color="primary"
                        onClick={onFindHandler}
                    >
                        <CIcon icon={cilSearch} className={cls.btnIcon} />
                        Найти
                    </CButton>
                    <CButton
                        color="primary"
                        variant="outline"
                        onClick={() => { dispatch(tableFiltersSelectedActions.clearFilters()); }}
                    >
                        Сбросить
                    </CButton>
                </CModalFooter>
            </CModal>

            <CToaster
                ref={toaster}
                push={toast}
                placement="top-end"
            />
        </>
    );
};
