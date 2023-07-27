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
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { cilSearch } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { Datepicker } from 'widgets/Datepicker';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import {
    Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import {
    getTableFiltersSelectedData,
} from 'features/TableFilters/model/selectors/getTableFiltersSelectedData/getTableFiltersSelectedData';
import { tableFiltersSelectedActions } from 'features/TableFilters';
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

    const [startBirthDate, setStartBirthDate] = useState<Date | null>(null);
    const [endBirthDate, setEndBirthDate] = useState<Date | null>(null);

    const [startArrivalDate, setStartArrivalDate] = useState<Date | null>(null);
    const [endArrivalDate, setEndArrivalDate] = useState<Date | null>(null);
    const onCloseModal = () => {
        setVisible(false);
    };

    const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>, filterName: string) => {
        dispatch(tableFiltersSelectedActions.setFilter([filterName, event.target.value]));
    };

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
                weight={TextWeight.BOLD}
            >
                Произошла ошибка при загрузке фильтров, попробуйте перезагрузить страницу
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
                                startDate={startBirthDate}
                                endDate={endBirthDate}
                                setStartDate={setStartBirthDate}
                                setEndDate={setEndBirthDate}
                            />
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Пол</h6>
                            <CFormSelect
                                className={cls.selectFilter}
                                value={selectedFilters?.gender}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => { onChangeSelect(event, 'gender'); }
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
                                value={selectedFilters?.nationality}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => { onChangeSelect(event, 'nationality'); }
                                }
                            >
                                <option>Не выбрано</option>
                                {
                                    data?.nationality.map((nationalityItem) => (
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
                            >
                                <option>Не выбрано</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </CFormSelect>
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Номер телефона</h6>
                            <CFormInput type="phone" placeholder="+7 (111) 122 77-71" />
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
                                value={selectedFilters?.speciality}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => { onChangeSelect(event, 'speciality'); }
                                }
                            >
                                <option>Не выбрано</option>
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
                                value={selectedFilters?.qualifications}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => { onChangeSelect(event, 'qualifications'); }
                                }
                            >
                                <option>Не выбрано</option>
                                {
                                    data?.qualifications.map((qualificationsItem) => (
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
                                value={selectedFilters?.studyDurations}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => { onChangeSelect(event, 'studyDurations'); }
                                }
                            >
                                <option>Не выбрано</option>
                                {
                                    data?.studyDurations.map((studyDurationItem) => (
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
                                value={selectedFilters?.educationsCourses}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'educationsCourses');
                                    }
                                }
                            >
                                <option>Не выбрано</option>
                                {
                                    data?.educationsCourses.map((educationCourseItem) => (
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
                                value={selectedFilters?.educationsForms}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'educationsForms');
                                    }
                                }
                            >
                                <option>Не выбрано</option>
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
                                startDate={startArrivalDate}
                                endDate={endArrivalDate}
                                setStartDate={setStartArrivalDate}
                                setEndDate={setEndArrivalDate}
                            />
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Причина поступления</h6>
                            <CFormSelect
                                className={cls.selectFilter}
                                value={selectedFilters?.enrollmentTypes}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'enrollmentTypes');
                                    }
                                }
                            >
                                <option>Не выбрано</option>
                                {
                                    data?.enrollmentTypes.map((enrollmentItem) => (
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
                                value={selectedFilters?.studentArrivalSources}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'studentArrivalSources');
                                    }
                                }
                            >
                                <option>Не выбрано</option>
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
                                value={selectedFilters?.finishedEducationTypes}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'finishedEducationTypes');
                                    }
                                }
                            >
                                <option>Не выбрано</option>
                                {
                                    data?.finishedEducationTypes.map((finishedEducationItem) => (
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
                                value={selectedFilters?.studyLanguages}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'studyLanguages');
                                    }
                                }
                            >
                                <option>Не выбрано</option>
                                {
                                    data?.studyLanguages.map((language) => (
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
                                value={selectedFilters?.residenceTypes}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'residenceTypes');
                                    }
                                }
                            >
                                <option>Не выбрано</option>
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
                            <CFormInput type="text" placeholder="ул. Пушкина, д. 22" />
                        </div>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Адрес временного проживания</h6>
                            <CFormInput type="text" placeholder="ул. Пушкина, д. 22" />
                        </div>
                    </div>
                    <div className={cls.settings}>
                        <div className={cls.filter}>
                            <h6 className={cls.filterTitle}>Тип потребности в хостеле</h6>
                            <CFormSelect
                                multiple
                                className={classNames(cls.selectFilter, {}, [cls.selectFilterMultiple])}
                                value={selectedFilters?.needHostelTypes}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'needHostelTypes');
                                    }
                                }
                            >
                                <option>Не выбрано</option>
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
                                value={selectedFilters?.financingSources}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'financingSources');
                                    }
                                }
                            >
                                <option>Не выбрано</option>
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
                                value={selectedFilters?.admissionQuotasTypes}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'admissionQuotasTypes');
                                    }
                                }
                            >
                                <option>Не выбрано</option>
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
                                id="isOrphan"
                            />
                        </div>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Отсутствует попечитель</h6>
                                )}
                                className={cls.checkbox}
                                id="isWithoutParentalCare"
                            />
                        </div>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Является инвалидом</h6>
                                )}
                                className={cls.checkbox}
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
                                value={selectedFilters?.materialAssistanceTypes}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, 'materialAssistanceTypes');
                                    }
                                }
                            >
                                <option>Не выбрано</option>
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
                                id="isStudyInDualSystem"
                            />
                        </div>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Обучался в Серпын</h6>
                                )}
                                className={cls.checkbox}
                                id="isStudyInSerpin"
                            />
                        </div>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Проходил курсы продуктивной занятости</h6>
                                )}
                                className={cls.checkbox}
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
                                id="isCompletedTrainingAtCompetenceCenter"
                            />
                        </div>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Учавствовал в WorldSkills</h6>
                                )}
                                className={cls.checkbox}
                                id="isStudyInWorldskills"
                            />
                        </div>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Вовлечен в обществуенную деятельность</h6>
                                )}
                                className={cls.checkbox}
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
                                id="isInYouthAffairsCommittee"
                            />
                        </div>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Состоит в студенческом парламенте</h6>
                                )}
                                className={cls.checkbox}
                                id="isInStudentParliament"
                            />
                        </div>
                        <div className={cls.filter}>
                            <CFormCheck
                                label={(
                                    <h6>Участвует в “Жас Сарбаз”</h6>
                                )}
                                className={cls.checkbox}
                                id="isInJasSarbaz"
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
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
                <CButton color="primary">
                    <CIcon icon={cilSearch} className={cls.btnIcon} />
                    Найти
                </CButton>
                <CButton color="primary" variant="outline" onClick={() => setVisible(false)}>
                    Сбросить
                </CButton>
            </CModalFooter>
        </CModal>
    );
};
