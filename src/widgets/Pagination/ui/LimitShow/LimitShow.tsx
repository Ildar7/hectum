import { classNames } from 'shared/lib/classNames/classNames';
import React from 'react';
import { CFormSelect } from '@coreui/react';
import { paginationLimits } from 'shared/const/pagination';
import { StudentsError, StudentsType } from 'entities/Students';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import {
    Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import { EnrollmentTypesError, EnrollmentTypesType } from 'entities/EnrollmentTypes';
import { CitizenshipError, CitizenshipType } from 'entities/Citizenship';
import { NationalitiesError, NationalitiesType } from 'entities/Nationalities';
import { EduLanguagesError, EduLanguagesType } from 'entities/EduLanguages';
import { FinishedEduTypesError, FinishedEduTypesType } from 'entities/FinishedEduTypes';
import { EduCoursesError, EduCoursesType } from 'entities/EduCourses';
import { StudyDirectionsError, StudyDirectionsType } from 'entities/StudyDirections';
import { StudyDurationsError, StudyDurationsType } from 'entities/StudyDurations';
import { QualificationsError, QualificationsType } from 'entities/Qualifications';
import cls from './LimitShow.module.scss';

interface PaginationData {
    total_records: number;
    current_page: number;
    total_pages: number;
    next_page: number | null;
    prev_page: number | null;
}
interface LimitShowProps {
    className?: string;
    data:
        StudentsType[]
        | EnrollmentTypesType[]
        | CitizenshipType[]
        | NationalitiesType[]
        | EduLanguagesType[]
        | FinishedEduTypesType[]
        | EduCoursesType[]
        | StudyDirectionsType[]
        | StudyDurationsType[]
        | QualificationsType[]
    ;
    onChange: (value: string) => void;
    itemsLimit: string;
    paginationData?: PaginationData | null;
    withRecords?: boolean;
    isLoading: boolean;
    error?:
        StudentsError
        | EnrollmentTypesError
        | CitizenshipError
        | NationalitiesError
        | EduLanguagesError
        | FinishedEduTypesError
        | EduCoursesError
        | StudyDirectionsError
        | StudyDurationsError
        | QualificationsError
    ;
    onChangePage: (value: string) => void;
}
export const LimitShow = (props: LimitShowProps) => {
    const {
        className,
        onChange,
        itemsLimit,
        withRecords,
        paginationData,
        isLoading,
        error,
        data,
        onChangePage,
    } = props;

    const onChangeLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
        onChangePage('1');
    };

    const firstRecord = paginationData?.current_page ? ((paginationData.current_page - 1) * Number(itemsLimit) + 1) : 0;
    const lastRecord = paginationData?.current_page ? (paginationData.current_page * Number(itemsLimit)) : 0;

    let content;

    if (isLoading) {
        content = (
            <Skeleton width={250} height={40} border="6px" className={cls.skeleton} />
        );
    } else if (error) {
        content = (
            <div />
        );
    } else {
        content = (
            !data.length ? (
                <div />
            ) : (
                <div className={classNames(cls.LimitShow, {}, [className])}>
                    <CFormSelect
                        className={cls.selectLimit}
                        value={itemsLimit}
                        onChange={onChangeLimit}
                    >
                        {
                            paginationLimits.map((limit) => (
                                <option
                                    key={limit}
                                    value={limit}
                                >
                                    {limit}
                                </option>
                            ))
                        }
                    </CFormSelect>
                    {withRecords && firstRecord && lastRecord && (
                        <Text
                            size={TextSize.XM}
                            weight={TextWeight.MEDIUM}
                            theme={TextTheme.LIGHT}
                        >
                            Записи с
                            {' '}
                            {firstRecord}
                            {' '}
                            - по
                            {' '}
                            {lastRecord}
                            . Всего:
                            {' '}
                            {paginationData?.total_records}
                            {' '}
                            записей.
                        </Text>
                    )}
                </div>
            )
        );
    }

    return content;
};
