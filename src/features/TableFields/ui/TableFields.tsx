import { classNames } from 'shared/lib/classNames/classNames';
import {
    CButton, CFormCheck, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
} from '@coreui/react';
import React, { useState } from 'react';
import { cilSearch } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import cls from './TableFields.module.scss';

interface TableFieldsProps {
    className?: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
}
export const TableFields = ({ className, visible, setVisible }: TableFieldsProps) => {
    const onCloseModal = () => {
        setVisible(false);
    };

    return (
        <CModal
            className={classNames(cls.Filters, {}, [className])}
            visible={visible}
            onClose={onCloseModal}
            size="lg"
            scrollable
        >
            <CModalHeader>
                <CModalTitle>Поля таблицы</CModalTitle>
            </CModalHeader>
            <CModalBody className={cls.modalBody}>
                <div className={cls.fieldsBlock}>
                    <h5 className={cls.title}>Общие</h5>
                    <div className={cls.settings}>
                        <div className={cls.field}>
                            <CFormCheck
                                defaultChecked
                                label={(
                                    <h6>Дата рождения</h6>
                                )}
                                className={cls.checkbox}
                                id="birthDate"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                defaultChecked
                                label={(
                                    <h6>Пол</h6>
                                )}
                                className={cls.checkbox}
                                id="gender"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                defaultChecked
                                label={(
                                    <h6>Национальность</h6>
                                )}
                                className={cls.checkbox}
                                id="nationality"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Гражданство</h6>
                                )}
                                className={cls.checkbox}
                                id="citizenship"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                defaultChecked
                                label={(
                                    <h6>Номер телефона</h6>
                                )}
                                className={cls.checkbox}
                                id="phoneNum"
                            />
                        </div>
                    </div>
                </div>
                <div className={cls.fieldsBlock}>
                    <h5 className={cls.title}>Обучение</h5>
                    <div className={cls.settings}>
                        <div className={cls.field}>
                            <CFormCheck
                                defaultChecked
                                label={(
                                    <h6>Специальность</h6>
                                )}
                                className={cls.checkbox}
                                id="speciality"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                defaultChecked
                                label={(
                                    <h6>Классификатор</h6>
                                )}
                                className={cls.checkbox}
                                id="classifier"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                defaultChecked
                                label={(
                                    <h6>Продолжительность обучения</h6>
                                )}
                                className={cls.checkbox}
                                id="studyDuration"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                defaultChecked
                                label={(
                                    <h6>Текущий курс</h6>
                                )}
                                className={cls.checkbox}
                                id="studyCourse"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                defaultChecked
                                label={(
                                    <h6>Форма обучения</h6>
                                )}
                                className={cls.checkbox}
                                id="eduForm"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                defaultChecked
                                label={(
                                    <h6>Дата поступления</h6>
                                )}
                                className={cls.checkbox}
                                id="arrivalDate"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Причина поступления</h6>
                                )}
                                className={cls.checkbox}
                                id="enrollmentType"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Откуда прибыл</h6>
                                )}
                                className={cls.checkbox}
                                id="isArrivalFrom"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Законченное учебное заведение</h6>
                                )}
                                className={cls.checkbox}
                                id="finishedEduType"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                defaultChecked
                                label={(
                                    <h6>Язык обучения</h6>
                                )}
                                className={cls.checkbox}
                                id="eduLang"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                defaultChecked
                                label={(
                                    <h6>Доступ к экзаменам</h6>
                                )}
                                className={cls.checkbox}
                                id="hasAccessToExams"
                            />
                        </div>
                    </div>
                </div>
                <div className={cls.fieldsBlock}>
                    <h5 className={cls.title}>Проживание</h5>
                    <div className={cls.settings}>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Тип проживания</h6>
                                )}
                                className={cls.checkbox}
                                id="residenceType"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Адрес фактического проживания</h6>
                                )}
                                className={cls.checkbox}
                                id="residentialAddress"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Адрес временного проживания</h6>
                                )}
                                className={cls.checkbox}
                                id="temporaryResidenceAddress"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Потребность в хостеле</h6>
                                )}
                                className={cls.checkbox}
                                id="isNeedHostelType"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                defaultChecked
                                label={(
                                    <h6>Проживает в хостеле</h6>
                                )}
                                className={cls.checkbox}
                                id="isLiveAtHostel"
                            />
                        </div>
                    </div>
                </div>
                <div className={cls.fieldsBlock}>
                    <h5 className={cls.title}>Финансирование и обеспечение</h5>
                    <div className={cls.settings}>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Источник финансирования студента</h6>
                                )}
                                className={cls.checkbox}
                                id="financingSourceType"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Квота обучения</h6>
                                )}
                                className={cls.checkbox}
                                id="quota"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Является сиротой</h6>
                                )}
                                className={cls.checkbox}
                                id="isOrphan"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Отсутствует попечитель</h6>
                                )}
                                className={cls.checkbox}
                                id="isWithoutParentalCare"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Является ли инвалидом</h6>
                                )}
                                className={cls.checkbox}
                                id="isDisabledPerson"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Мат. и фин. поддержка</h6>
                                )}
                                className={cls.checkbox}
                                id="materialAssistanceType"
                            />
                        </div>
                        <div className={cls.field}>
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
                <div className={cls.fieldsBlock}>
                    <h5 className={cls.title}>Особенности и достижения</h5>
                    <div className={cls.settings}>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Обучается по дуальной системе</h6>
                                )}
                                className={cls.checkbox}
                                id="isStudyInDualSystem"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Обучался в Серпын</h6>
                                )}
                                className={cls.checkbox}
                                id="isStudyInSerpin"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Проходил курсы продуктивной занятости</h6>
                                )}
                                className={cls.checkbox}
                                id="isStudyInProductiveEmployment"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Прошел обучение в центре компетенции</h6>
                                )}
                                className={cls.checkbox}
                                id="isCompletedTrainingAtCompetenceCenter"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Участвовал в WorldSkills</h6>
                                )}
                                className={cls.checkbox}
                                id="isStudyInWorldskills"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Вовлечен в обществуенную деятельность</h6>
                                )}
                                className={cls.checkbox}
                                id="isInvolvedInSocialActivities"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Состоит в комитете молодежи</h6>
                                )}
                                className={cls.checkbox}
                                id="isInYouthAffairsCommittee"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Состоит в студенческом парламенте</h6>
                                )}
                                className={cls.checkbox}
                                id="inStudentParliament"
                            />
                        </div>
                        <div className={cls.field}>
                            <CFormCheck
                                label={(
                                    <h6>Участвует в “Жас Сарбаз”</h6>
                                )}
                                className={cls.checkbox}
                                id="inJasSarbaz"
                            />
                        </div>
                    </div>
                </div>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary">
                    Сохранить
                </CButton>
                <CButton color="primary" variant="outline" onClick={() => setVisible(false)}>
                    Сбросить
                </CButton>
            </CModalFooter>
        </CModal>
    );
};
