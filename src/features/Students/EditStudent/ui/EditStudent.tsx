import { classNames } from 'shared/lib/classNames/classNames';
import {
    CButton,
    CForm,
    CFormCheck,
    CFormInput,
    CFormSelect,
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
import { cilSave, cilTrash, cilWarning } from '@coreui/icons';
import {
    Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import React, {
    ReactElement, useEffect, useRef, useState,
} from 'react';
import { TabsType } from 'features/Students/AddStudent/model/types/addStudent';
import { tabsButtonsItems } from 'features/Students/AddStudent';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { CFormInputWithMask } from 'shared/ui/InputMask/InputMask';
import { detectYear } from 'shared/lib/detectYear/detectYear';
import { useSelector } from 'react-redux';
import { getTableFiltersData, getTableFiltersError, getTableFiltersIsLoading } from 'features/TableFilters';
import { getStudentDetailData, getStudentDetailError, getStudentDetailIsLoading } from 'entities/StudentDetail';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchStudentDetail } from 'entities/StudentDetail/model/services/fetchStudentDetail/fetchStudentDetail';
import {
    getEditStudentNewFieldsData,
} from 'features/Students/EditStudent/model/selectors/getEditStudentNewFieldsData/getEditStudentNewFieldsData';
import { getEditStudentData } from 'features/Students/EditStudent/model/selectors/getEditStudentData/getEditStudentData';
import { clearObject } from 'shared/lib/clearObject/clearObject';
import { isEmptyObject } from 'shared/lib/isEmptyObject/isEmptyObject';
import { Toast } from 'shared/ui/Toast/Toast';
import { detectInvalidInput } from 'shared/lib/errors/detectInvalidInput/detectInvalidInput';
import { StudentsType } from 'entities/Students';
import { translateErrors } from 'shared/lib/errors/translateErrors/translateErrors';
import { setInvalidInputMessage } from 'shared/lib/errors/setInvalidInputMessage/setInvalidInputMessage';
import { getEditStudentIsLoading } from '../model/selectors/getEditStudentIsLoading/getEditStudentIsLoading';
import { editStudent } from '../model/services/editStudent/editStudent';
import { editStudentActions } from '../model/slice/editStudentSlice';
import cls from './EditStudent.module.scss';
import { getEditStudentErrors } from '../model/selectors/getEditStudentErrors/getEditStudentErrors';

interface EditStudentProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
    studentId: string;
    onDeleteStudent: (student: StudentsType) => void;
}
export const EditStudent = (props: EditStudentProps) => {
    const {
        className,
        visible,
        setVisible,
        studentId,
        onDeleteStudent,
    } = props;
    const dispatch = useAppDispatch();
    const [tabsButtons] = useState<TabsType[]>(tabsButtonsItems);
    const [activeTab, setActiveTab] = useState(1);
    const [toast, addToast] = useState<ReactElement>();
    const toaster = useRef<HTMLDivElement | null>(null);
    const [validated, setValidated] = useState<boolean>(false);
    const [formWithErrors, setFormWithErrors] = useState<boolean>(false);

    const filtersData = useSelector(getTableFiltersData);
    const isLoadingFiltersData = useSelector(getTableFiltersIsLoading);
    const errorFiltersData = useSelector(getTableFiltersError);

    const studentDetailData = useSelector(getStudentDetailData);
    const isLoadingStudentDetail = useSelector(getStudentDetailIsLoading);
    const errorStudentDetail = useSelector(getStudentDetailError);

    const editStudentData = useSelector(getEditStudentData);
    const isLoadingEditStudent = useSelector(getEditStudentIsLoading);
    const editStudentNewFieldsData = useSelector(getEditStudentNewFieldsData);
    const errorsEditStudent = useSelector(getEditStudentErrors);

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
        setValidated(false);
        setFormWithErrors(false);
        onChangeTabHandler(1);
    };

    const onCancelHandler = () => {
        onCloseModal();
        dispatch(editStudentActions.clearNewFields());
    };

    const onDeleteHandler = (student: StudentsType) => {
        onDeleteStudent(student);
        onCloseModal();
    };

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, filterName: string) => {
        dispatch(editStudentActions.setInputData([filterName, event.target.value]));
    };

    const onCheckHandler = (event: React.ChangeEvent<HTMLInputElement>, filterName: string) => {
        dispatch(editStudentActions.setInputData([filterName, event.target.checked]));
    };

    const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>, filterName: string) => {
        dispatch(editStudentActions.setInputData([filterName, event.target.value]));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        setFormWithErrors(!form.checkValidity());
        if (!form.checkValidity()) {
            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity()) {
            const data = clearObject(editStudentData, editStudentNewFieldsData);

            if (isEmptyObject(data)) {
                addToast(Toast.error('Для сохранения вы должны внести изменения!'));
            } else {
                const result = await dispatch(editStudent(studentId));

                if (result.meta.requestStatus === 'fulfilled') {
                    addToast(Toast.success('Информация о студенте успешно обновлена'));
                    onCancelHandler();
                }

                if (result.meta.requestStatus === 'rejected') {
                    // @ts-ignore
                    if (result.payload.status === 500) {
                        // @ts-ignore
                        if (result.payload.errors.general) {
                            // @ts-ignore
                            result.payload.errors.general.forEach((error: string) => {
                                addToast(Toast.error(translateErrors(error)));
                            });
                        }
                    }
                    setFormWithErrors(true);
                }
            }
        }
    };

    let tabsContent;

    if (isLoadingFiltersData || isLoadingStudentDetail) {
        tabsContent = (
            <Skeleton width="100%" height={500} />
        );
    } else if (errorFiltersData || errorStudentDetail) {
        tabsContent = (
            <Text
                theme={TextTheme.ERROR}
                size={TextSize.M}
                weight={TextWeight.SEMIBOLD}
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
                                    <CFormInputWithMask
                                        type="text"
                                        placeholder="Иванов"
                                        // @ts-ignore
                                        feedbackValid={detectInvalidInput(errorsEditStudent, 'last_name') ? '' : 'Это поле необязательно'}
                                        invalid={
                                            editStudentNewFieldsData?.last_name && formWithErrors
                                                ? detectInvalidInput(errorsEditStudent, 'last_name')
                                                : false
                                        }
                                        feedbackInvalid={setInvalidInputMessage(
                                            detectInvalidInput(errorsEditStudent, 'last_name'),
                                            errorsEditStudent,
                                            'last_name',
                                        )}
                                        value={editStudentNewFieldsData?.last_name || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onChangeInput(event, 'last_name');
                                            }
                                        }
                                    />
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Имя*</h6>
                                    <CFormInputWithMask
                                        type="text"
                                        placeholder="Иван"
                                        // @ts-ignore
                                        feedbackValid={detectInvalidInput(errorsEditStudent, 'first_name') ? '' : 'Отлично!'}
                                        feedbackInvalid={setInvalidInputMessage(
                                            detectInvalidInput(errorsEditStudent, 'first_name'),
                                            errorsEditStudent,
                                            'first_name',
                                        )}
                                        required
                                        invalid={
                                            editStudentNewFieldsData?.first_name && formWithErrors
                                                ? detectInvalidInput(errorsEditStudent, 'first_name')
                                                : false
                                        }
                                        value={editStudentNewFieldsData?.first_name || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onChangeInput(event, 'first_name');
                                            }
                                        }
                                    />
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Отчество</h6>
                                    <CFormInputWithMask
                                        type="text"
                                        placeholder="Иванович"
                                        // @ts-ignore
                                        feedbackValid={detectInvalidInput(errorsEditStudent, 'patronymic') ? '' : 'Это поле необязательно!'}
                                        invalid={
                                            editStudentNewFieldsData?.patronymic && formWithErrors
                                                ? detectInvalidInput(errorsEditStudent, 'patronymic')
                                                : false
                                        }
                                        feedbackInvalid={setInvalidInputMessage(
                                            detectInvalidInput(errorsEditStudent, 'patronymic'),
                                            errorsEditStudent,
                                            'patronymic',
                                        )}
                                        value={editStudentNewFieldsData?.patronymic || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onChangeInput(event, 'patronymic');
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Логин*</h6>
                                    <CFormInput
                                        type="text"
                                        minLength={4}
                                        maxLength={64}
                                        placeholder="IvanovIvan7"
                                        invalid={
                                            editStudentNewFieldsData?.login && formWithErrors
                                                ? detectInvalidInput(errorsEditStudent, 'login')
                                                : false
                                        }
                                        value={editStudentNewFieldsData?.login || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onChangeInput(event, 'login');
                                            }
                                        }
                                        feedbackValid={detectInvalidInput(errorsEditStudent, 'login') ? '' : 'Отлично!'}
                                        feedbackInvalid={setInvalidInputMessage(
                                            detectInvalidInput(errorsEditStudent, 'login'),
                                            errorsEditStudent,
                                            'login',
                                        )}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Дата рождения*</h6>
                                    <CFormInputWithMask
                                        mask={Date}
                                        // @ts-ignore
                                        min={new Date(detectYear(100), 0, 1)}
                                        // @ts-ignore
                                        max={new Date(detectYear(14), 0, 1)}
                                        invalid={
                                            editStudentNewFieldsData?.birth_date && formWithErrors
                                                ? detectInvalidInput(errorsEditStudent, 'birth_date')
                                                : false
                                        }
                                        placeholder="17.07.2001"
                                        value={editStudentNewFieldsData?.birth_date || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onChangeInput(event, 'birth_date');
                                            }
                                        }
                                        // @ts-ignore
                                        feedbackValid={detectInvalidInput(errorsEditStudent, 'birth_date') ? '' : 'Отлично!'}
                                        feedbackInvalid={setInvalidInputMessage(
                                            detectInvalidInput(errorsEditStudent, 'birth_date'),
                                            errorsEditStudent,
                                            'birth_date',
                                        )}
                                        required
                                    />
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Пол*</h6>
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.gender_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'gender_id');
                                            }
                                        }
                                        feedbackValid={detectInvalidInput(errorsEditStudent, 'gender_id') ? '' : 'Отлично!'}
                                        feedbackInvalid={setInvalidInputMessage(
                                            detectInvalidInput(errorsEditStudent, 'gender_id'),
                                            errorsEditStudent,
                                            'gender_id',
                                        )}
                                        required
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.gender.map((genderItem) => (
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
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Национальность*</h6>
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.nationality_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'nationality_id');
                                            }
                                        }
                                        feedbackValid={detectInvalidInput(errorsEditStudent, 'nationality_id') ? '' : 'Отлично!'}
                                        feedbackInvalid={setInvalidInputMessage(
                                            detectInvalidInput(errorsEditStudent, 'nationality_id'),
                                            errorsEditStudent,
                                            'nationality_id',
                                        )}
                                        required
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.nationality.data.map((nationItem) => (
                                                <option
                                                    key={nationItem.id_nationality}
                                                    value={nationItem.id_nationality}
                                                >
                                                    {nationItem.nationality}
                                                </option>
                                            ))
                                        }
                                    </CFormSelect>
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Гражданство*</h6>
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.citizenship_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'citizenship_id');
                                            }
                                        }
                                        feedbackValid={detectInvalidInput(errorsEditStudent, 'citizenship_id') ? '' : 'Отлично!'}
                                        feedbackInvalid={setInvalidInputMessage(
                                            detectInvalidInput(errorsEditStudent, 'citizenship_id'),
                                            errorsEditStudent,
                                            'citizenship_id',
                                        )}
                                        required
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.citizenshipTypes.data.map((citizenship) => (
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
                        </div>
                        <div className={cls.tabBlock}>
                            <h5 className={cls.title}>Контактные данные</h5>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Номер телефона</h6>
                                    <CFormInputWithMask
                                        minLength={18}
                                        mask="+7 (0000) 00-00-00"
                                        type="text"
                                        placeholder="+7 (9999) 11-22-33"
                                        // @ts-ignore
                                        invalid={
                                            editStudentNewFieldsData?.phone_number && formWithErrors
                                                ? detectInvalidInput(errorsEditStudent, 'phone_number')
                                                : false
                                        }
                                        feedbackInvalid={setInvalidInputMessage(
                                            detectInvalidInput(errorsEditStudent, 'phone_number'),
                                            errorsEditStudent,
                                            'phone_number',
                                        )}
                                        value={editStudentNewFieldsData?.phone_number || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onChangeInput(event, 'phone_number');
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>E-mail*</h6>
                                    <CFormInput
                                        type="email"
                                        placeholder="ivanovivan@mail.ru"
                                        invalid={
                                            editStudentNewFieldsData?.email && formWithErrors
                                                ? detectInvalidInput(errorsEditStudent, 'email')
                                                : false
                                        }
                                        value={editStudentNewFieldsData?.email || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onChangeInput(event, 'email');
                                            }
                                        }
                                        feedbackValid={detectInvalidInput(errorsEditStudent, 'email') ? '' : 'Отлично!'}
                                        feedbackInvalid={setInvalidInputMessage(
                                            detectInvalidInput(errorsEditStudent, 'email'),
                                            errorsEditStudent,
                                            'email',
                                        )}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cls.tabBlock}>
                            <h5 className={cls.title}>Удостоверение личности</h5>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>ИИН</h6>
                                    <CFormInputWithMask
                                        mask="000000000000"
                                        type="text"
                                        placeholder="123456789123"
                                        // @ts-ignore
                                        invalid={
                                            editStudentNewFieldsData?.govid && formWithErrors
                                                ? detectInvalidInput(errorsEditStudent, 'govid')
                                                : false
                                        }
                                        feedbackInvalid={setInvalidInputMessage(
                                            detectInvalidInput(errorsEditStudent, 'govid'),
                                            errorsEditStudent,
                                            'govid',
                                        )}
                                        value={editStudentNewFieldsData?.govid || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onChangeInput(event, 'govid');
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Номер удостоверения личности</h6>
                                    <CFormInputWithMask
                                        mask="000000000"
                                        type="text"
                                        placeholder="444555666"
                                        // @ts-ignore
                                        invalid={
                                            editStudentNewFieldsData?.govid_serial && formWithErrors
                                                ? detectInvalidInput(errorsEditStudent, 'govid_serial')
                                                : false
                                        }
                                        feedbackInvalid={setInvalidInputMessage(
                                            detectInvalidInput(errorsEditStudent, 'govid_serial'),
                                            errorsEditStudent,
                                            'govid_serial',
                                        )}
                                        value={editStudentNewFieldsData?.govid_serial || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onChangeInput(event, 'govid_serial');
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Дата выпуска удостоверения личности</h6>
                                    <CFormInputWithMask
                                        mask={Date}
                                        // @ts-ignore
                                        min={new Date(detectYear(100), 0, 1)}
                                        // @ts-ignore
                                        max={new Date(detectYear(-1), 0, 1)}
                                        placeholder="22.03.2022"
                                        // @ts-ignore
                                        invalid={
                                            editStudentNewFieldsData?.govid_issue_date && formWithErrors
                                                ? detectInvalidInput(errorsEditStudent, 'govid_issue_date')
                                                : false
                                        }
                                        feedbackInvalid={setInvalidInputMessage(
                                            detectInvalidInput(errorsEditStudent, 'govid_issue_date'),
                                            errorsEditStudent,
                                            'govid_issue_date',
                                        )}
                                        value={editStudentNewFieldsData?.govid_issue_date || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onChangeInput(event, 'govid_issue_date');
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Причина отсутствия ИИН</h6>
                                    <CFormInput
                                        type="text"
                                        disabled
                                    />
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
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.enrollment_type_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'enrollment_type_id');
                                            }
                                        }
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.enrollmentTypes.data.map((type) => (
                                                <option
                                                    key={type.id_typeenrollment}
                                                    value={type.id_typeenrollment}
                                                >
                                                    {type.typeenrollment}
                                                </option>
                                            ))
                                        }
                                    </CFormSelect>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Дата поступления</h6>
                                    <CFormInputWithMask
                                        mask={Date}
                                        // @ts-ignore
                                        min={new Date(detectYear(100), 0, 1)}
                                        // @ts-ignore
                                        max={new Date(detectYear(-1), 0, 1)}
                                        placeholder="17.07.2001"
                                        value={editStudentNewFieldsData?.arrival_date || ''}
                                        invalid={
                                            editStudentNewFieldsData?.arrival_date && formWithErrors
                                                ? detectInvalidInput(errorsEditStudent, 'arrival_date')
                                                : false
                                        }
                                        feedbackInvalid={setInvalidInputMessage(
                                            detectInvalidInput(errorsEditStudent, 'arrival_date'),
                                            errorsEditStudent,
                                            'arrival_date',
                                        )}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onChangeInput(event, 'arrival_date');
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Откуда прибыл</h6>
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.is_arrival_from_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'is_arrival_from_id');
                                            }
                                        }
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.studentArrivalSources.map((place) => (
                                                <option
                                                    key={place.id_comesfrom}
                                                    value={place.id_comesfrom}
                                                >
                                                    {place.comesfrom}
                                                </option>
                                            ))
                                        }
                                    </CFormSelect>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Тип законченного учебного заведения</h6>
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.is_finished_edu_type_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'is_finished_edu_type_id');
                                            }
                                        }
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.finishedEducationTypes.data.map((educationType) => (
                                                <option
                                                    key={educationType.id_fromacceptedfinished}
                                                    value={educationType.id_fromacceptedfinished}
                                                >
                                                    {educationType.fromacceptedfinished}
                                                </option>
                                            ))
                                        }
                                    </CFormSelect>
                                </div>
                            </div>
                        </div>
                        <div className={cls.tabBlock}>
                            <h5 className={cls.title}>Прохождение обучения</h5>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Специальность</h6>
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.edu_speciality_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'edu_speciality_id');
                                            }
                                        }
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.speciality.map((speciality) => (
                                                <option
                                                    key={speciality.id_spec}
                                                    value={speciality.id_spec}
                                                >
                                                    {speciality.speciality}
                                                </option>
                                            ))
                                        }
                                    </CFormSelect>
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Классификатор</h6>
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.edu_classifier_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'edu_classifier_id');
                                            }
                                        }
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.qualifications.data.map((qualification) => (
                                                <option
                                                    key={qualification.id_qual}
                                                    value={qualification.id_qual}
                                                >
                                                    {qualification.qualification}
                                                </option>
                                            ))
                                        }
                                    </CFormSelect>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Продолжительность обучения</h6>
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.study_duration_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'study_duration_id');
                                            }
                                        }
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.studyDurations.data.map((duration) => (
                                                <option
                                                    key={duration.id_durationoftraining}
                                                    value={duration.id_durationoftraining}
                                                >
                                                    {duration.durationoftraining}
                                                </option>
                                            ))
                                        }
                                    </CFormSelect>
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Текущий курс обучения</h6>
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.study_course_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'study_course_id');
                                            }
                                        }
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.educationsCourses.data.map((course) => (
                                                <option
                                                    key={course.id_courseoftraining}
                                                    value={course.id_courseoftraining}
                                                >
                                                    {course.courseoftraining}
                                                </option>
                                            ))
                                        }
                                    </CFormSelect>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Язык обучения</h6>
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.edu_lang_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'edu_lang_id');
                                            }
                                        }
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.studyLanguages.data.map((lang) => (
                                                <option
                                                    key={lang.id_languageofedu}
                                                    value={lang.id_languageofedu}
                                                >
                                                    {lang.languageofedu}
                                                </option>
                                            ))
                                        }
                                    </CFormSelect>
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Форма обучения</h6>
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.edu_form_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'edu_form_id');
                                            }
                                        }
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.educationsForms.map((form) => (
                                                <option
                                                    key={form.id_typeoftraining}
                                                    value={form.id_typeoftraining}
                                                >
                                                    {form.typeoftraining}
                                                </option>
                                            ))
                                        }
                                    </CFormSelect>
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
                                    <CFormInput
                                        type="text"
                                        placeholder="Астана 34, кв 19"
                                        invalid={
                                            editStudentNewFieldsData?.residential_address && formWithErrors
                                                ? detectInvalidInput(errorsEditStudent, 'residential_address')
                                                : false
                                        }
                                        feedbackInvalid={setInvalidInputMessage(
                                            detectInvalidInput(errorsEditStudent, 'residential_address'),
                                            errorsEditStudent,
                                            'residential_address',
                                        )}
                                        value={editStudentNewFieldsData?.residential_address || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onChangeInput(event, 'residential_address');
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Адрес временного проживания</h6>
                                    <CFormInput
                                        type="text"
                                        placeholder="Маяковского 45, кв 79"
                                        invalid={
                                            editStudentNewFieldsData?.temporary_residence_address && formWithErrors
                                                ? detectInvalidInput(errorsEditStudent, 'temporary_residence_address')
                                                : false
                                        }
                                        feedbackInvalid={setInvalidInputMessage(
                                            detectInvalidInput(errorsEditStudent, 'temporary_residence_address'),
                                            errorsEditStudent,
                                            'temporary_residence_address',
                                        )}
                                        value={editStudentNewFieldsData?.temporary_residence_address || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onChangeInput(event, 'temporary_residence_address');
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Тип проживания</h6>
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.residence_type_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'residence_type_id');
                                            }
                                        }
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.residenceTypes.map((type) => (
                                                <option
                                                    key={type.id_typeofareaofresidence}
                                                    value={type.id_typeofareaofresidence}
                                                >
                                                    {type.typeofareaofresidence}
                                                </option>
                                            ))
                                        }
                                    </CFormSelect>
                                </div>
                            </div>
                        </div>
                        <div className={cls.tabBlock}>
                            <h5 className={cls.title}>Хостел</h5>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Потребность в хостеле</h6>
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.is_need_hostel_type_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'is_need_hostel_type_id');
                                            }
                                        }
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.needHostelTypes.map((type) => (
                                                <option
                                                    key={type.id_needhostel}
                                                    value={type.id_needhostel}
                                                >
                                                    {type.needhostel}
                                                </option>
                                            ))
                                        }
                                    </CFormSelect>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <CFormCheck
                                        label={(
                                            <h6>Проживает в хостеле</h6>
                                        )}
                                        className={cls.checkbox}
                                        checked={editStudentNewFieldsData?.is_live_at_hostel}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onCheckHandler(event, 'is_live_at_hostel');
                                            }
                                        }
                                        id="isLiveAtHostel"
                                    />
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
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.financing_source_type_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'financing_source_type_id');
                                            }
                                        }
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.financingSources.map((source) => (
                                                <option
                                                    key={source.id_whopaying}
                                                    value={source.id_whopaying}
                                                >
                                                    {source.whopaying}
                                                </option>
                                            ))
                                        }
                                    </CFormSelect>
                                </div>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Тип материальной и фин. поддержки</h6>
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.material_assistance_type_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'material_assistance_type_id');
                                            }
                                        }
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.materialAssistanceTypes.map((type) => (
                                                <option
                                                    key={type.id_finimatpomosh}
                                                    value={type.id_finimatpomosh}
                                                >
                                                    {type.finimatpomosh}
                                                </option>
                                            ))
                                        }
                                    </CFormSelect>
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <h6 className={cls.newAddFieldTitle}>Квота обучения</h6>
                                    <CFormSelect
                                        className={cls.selectFilter}
                                        value={editStudentNewFieldsData?.quota_id || ''}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                onChangeSelect(event, 'quota_id');
                                            }
                                        }
                                    >
                                        <option value="">Не выбрано</option>
                                        {
                                            filtersData?.admissionQuotasTypes.map((quota) => (
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
                                <div className={cls.newAddField}>
                                    <CFormCheck
                                        label={(
                                            <h6>Является сиротой</h6>
                                        )}
                                        className={cls.checkbox}
                                        checked={editStudentNewFieldsData?.is_orphan}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onCheckHandler(event, 'is_orphan');
                                            }
                                        }
                                        id="isOrphan"
                                    />
                                </div>
                                <div className={cls.newAddField}>
                                    <CFormCheck
                                        label={(
                                            <h6>Отсутствует попечитель</h6>
                                        )}
                                        className={cls.checkbox}
                                        checked={editStudentNewFieldsData?.is_without_parental_care}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onCheckHandler(event, 'is_without_parental_care');
                                            }
                                        }
                                        id="isWithoutParentalCare"
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <CFormCheck
                                        label={(
                                            <h6>Является инвалидом</h6>
                                        )}
                                        className={cls.checkbox}
                                        checked={editStudentNewFieldsData?.is_disabled_person}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onCheckHandler(event, 'is_disabled_person');
                                            }
                                        }
                                        id="isDisabledPerson"
                                    />
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
                                    <CFormCheck
                                        label={(
                                            <h6>Обучается по дуальной системе</h6>
                                        )}
                                        className={cls.checkbox}
                                        checked={editStudentNewFieldsData?.is_study_in_dual_system}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onCheckHandler(event, 'is_study_in_dual_system');
                                            }
                                        }
                                        id="isStudyInDualSystem"
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <CFormCheck
                                        label={(
                                            <h6>Обучался в Серпын</h6>
                                        )}
                                        className={cls.checkbox}
                                        checked={editStudentNewFieldsData?.is_study_in_serpin}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onCheckHandler(event, 'is_study_in_serpin');
                                            }
                                        }
                                        id="isStudyInSerpin"
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <CFormCheck
                                        label={(
                                            <h6>Проходил курсы продуктивной занятости</h6>
                                        )}
                                        className={cls.checkbox}
                                        checked={editStudentNewFieldsData?.is_study_in_productive_employment}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onCheckHandler(event, 'is_study_in_productive_employment');
                                            }
                                        }
                                        id="isStudyInProductiveEmployment"
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <CFormCheck
                                        label={(
                                            <h6>Прошел обучение в центре компетенции</h6>
                                        )}
                                        className={cls.checkbox}
                                        checked={editStudentNewFieldsData?.is_completed_training_at_competence_center}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onCheckHandler(event, 'is_completed_training_at_competence_center');
                                            }
                                        }
                                        id="isCompletedTrainingAtCompetenceCenter"
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <CFormCheck
                                        label={(
                                            <h6>Учавствовал в WorldSkills</h6>
                                        )}
                                        className={cls.checkbox}
                                        checked={editStudentNewFieldsData?.is_study_in_worldskills}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onCheckHandler(event, 'is_study_in_worldskills');
                                            }
                                        }
                                        id="isStudyInWorldskills"
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <CFormCheck
                                        label={(
                                            <h6>Вовлечен в обществуенную деятельность</h6>
                                        )}
                                        className={cls.checkbox}
                                        checked={editStudentNewFieldsData?.is_involved_in_social_activities}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onCheckHandler(event, 'is_involved_in_social_activities');
                                            }
                                        }
                                        id="isInvolvedInSocialActivities"
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <CFormCheck
                                        label={(
                                            <h6>Состоит в комитете молодежи</h6>
                                        )}
                                        className={cls.checkbox}
                                        checked={editStudentNewFieldsData?.is_in_youth_affairs_committee}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onCheckHandler(event, 'is_in_youth_affairs_committee');
                                            }
                                        }
                                        id="isInYouthAffairsCommittee"
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <CFormCheck
                                        label={(
                                            <h6>Состоит в студенческом парламенте</h6>
                                        )}
                                        className={cls.checkbox}
                                        checked={editStudentNewFieldsData?.in_student_parliament}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onCheckHandler(event, 'in_student_parliament');
                                            }
                                        }
                                        id="inStudentParliament"
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <CFormCheck
                                        label={(
                                            <h6>Участвует в “Жас Сарбаз”</h6>
                                        )}
                                        className={cls.checkbox}
                                        checked={editStudentNewFieldsData?.in_jas_sarbaz}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onCheckHandler(event, 'in_jas_sarbaz');
                                            }
                                        }
                                        id="inJasSarbaz"
                                    />
                                </div>
                            </div>
                            <div className={cls.settings}>
                                <div className={cls.newAddField}>
                                    <CFormCheck
                                        label={(
                                            <h6>Из молодой семьи</h6>
                                        )}
                                        className={cls.checkbox}
                                        checked={editStudentNewFieldsData?.is_from_young_family}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                onCheckHandler(event, 'is_from_young_family');
                                            }
                                        }
                                        id="isFromYoungFamily"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <>
            <CModal
                className={classNames(cls.EditStudent, {}, [className])}
                visible={visible}
                onClose={onCloseModal}
                size="xl"
                scrollable
            >
                <CForm
                    className={classNames(cls.form, {}, ['needs-validation'])}
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <CModalHeader>
                        {
                            isLoadingFiltersData || isLoadingStudentDetail
                                ? <Skeleton width={200} height={30} />
                                : (
                                    <CModalTitle>
                                        Изменение студента №
                                        {studentDetailData?.students_id}
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
                        <div className={cls.message}>
                            {(formWithErrors) && (
                                <>
                                    <CIcon icon={cilWarning} customClassName={cls.messageIcon} />
                                    <Text
                                        size={TextSize.M}
                                        weight={TextWeight.SEMIBOLD}
                                    >
                                        Форма заполнена некорректно
                                    </Text>
                                </>
                            )}
                        </div>
                        <div className={cls.footerBtns}>
                            <CButton
                                color="primary"
                                variant="outline"
                                className={cls.footerBtn}
                                onClick={onCancelHandler}
                            >
                                Отмена
                            </CButton>
                            <CButton
                                color="danger"
                                className={classNames(cls.footerBtn, {}, [cls.redBtn])}
                                onClick={() => { onDeleteHandler(studentDetailData!); }}
                                disabled={isLoadingFiltersData
                                    || isLoadingStudentDetail
                                    || isLoadingEditStudent
                                    || !!errorStudentDetail
                                    || !!errorFiltersData}
                            >
                                <CIcon icon={cilTrash} className={cls.btnIcon} />
                                Удалить
                            </CButton>
                            <CButton
                                color="success"
                                type="submit"
                                className={classNames(cls.footerBtn, {}, [cls.greenBtn])}
                                disabled={isLoadingFiltersData
                                    || isLoadingStudentDetail
                                    || isLoadingEditStudent
                                    || !!errorStudentDetail
                                    || !!errorFiltersData}
                            >
                                <CIcon icon={cilSave} className={cls.btnIcon} />
                                Сохранить
                            </CButton>
                        </div>
                    </CModalFooter>
                </CForm>
            </CModal>

            <CToaster
                ref={toaster}
                push={toast}
                placement="top-end"
            />
        </>
    );
};
