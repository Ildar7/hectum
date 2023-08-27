import { classNames } from 'shared/lib/classNames/classNames';
import { CPagination, CPaginationItem } from '@coreui/react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { StudentsError, StudentsType } from 'entities/Students';
import React from 'react';
import { EnrollmentTypesError, EnrollmentTypesType } from 'entities/EnrollmentTypes';
import { CitizenshipError, CitizenshipType } from 'entities/Citizenship';
import { NationalitiesError, NationalitiesType } from 'entities/Nationalities';
import { EduLanguagesError, EduLanguagesType } from 'entities/EduLanguages';
import { FinishedEduTypesError, FinishedEduTypesType } from 'entities/FinishedEduTypes';
import { EduCoursesError, EduCoursesType } from 'entities/EduCourses';
import { StudyDirectionsError, StudyDirectionsType } from 'entities/StudyDirections';
import { StudyDurationsError, StudyDurationsType } from 'entities/StudyDurations';
import { QualificationsError, QualificationsType } from 'entities/Qualifications';
import cls from './Pagintaion.module.scss';

interface PaginationData {
    total_records: number;
    current_page: number;
    total_pages: number;
    next_page: number | null;
    prev_page: number | null;
}
interface PagintaionProps {
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
    paginationData?: PaginationData | null;
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
    onChange: (value: string) => void;
    itemsPage: string;
}
export const Pagintaion = (props: PagintaionProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        paginationData,
        onChange,
        itemsPage,
    } = props;

    let paginationContent;

    if (isLoading) {
        paginationContent = (
            <Skeleton width={250} height={40} border="6px" className={cls.skeleton} />
        );
    } else if (error) {
        paginationContent = (
            <div />
        );
    } else {
        paginationContent = (
            !data.length ? (
                <div />
            ) : (
                <div className={classNames(cls.Pagintaion, {}, [className])}>
                    <CPagination aria-label="Students pagination" align="end">
                        {paginationData?.prev_page && (
                            <CPaginationItem
                                onClick={() => { onChange(`${+itemsPage - 1}`); }}
                                className={cls.paginationItem}
                            >
                                Предыдующая
                            </CPaginationItem>
                        )}
                        {
                            paginationData?.total_pages
                                ? (
                                    <>
                                        {paginationData.total_pages <= 7 && (
                                            [...Array(paginationData.total_pages)].map((_, index) => (
                                                <CPaginationItem
                                                    className={cls.paginationItem}
                                                    active={+itemsPage === (index + 1)}
                                                    onClick={() => { onChange(`${index + 1}`); }}
                                                    key={index}
                                                >
                                                    {index + 1}
                                                </CPaginationItem>
                                            ))
                                        )}

                                        {paginationData.total_pages > 7 && (
                                            <>
                                                {
                                                    [...Array(paginationData.total_pages)].map((_, index) => {
                                                        if (
                                                            (+itemsPage === index + 1
                                                            || +itemsPage + 1 === index + 1
                                                            || +itemsPage + 2 === index + 1)
                                                            && (
                                                                +itemsPage !== paginationData!.total_pages
                                                                && index + 1 !== paginationData!.total_pages
                                                                && index + 2 !== paginationData!.total_pages
                                                                && index + 3 !== paginationData!.total_pages
                                                            )
                                                        ) {
                                                            return (
                                                                <CPaginationItem
                                                                    className={cls.paginationItem}
                                                                    active={+itemsPage === (index + 1)}
                                                                    onClick={() => { onChange(`${index + 1}`); }}
                                                                    key={index}
                                                                >
                                                                    {index + 1}
                                                                </CPaginationItem>
                                                            );
                                                        }
                                                    })
                                                }
                                                {
                                                    (
                                                        (paginationData!.total_pages === +itemsPage
                                                        || paginationData!.total_pages - 1 === +itemsPage
                                                        || paginationData!.total_pages - 2 === +itemsPage)
                                                        || paginationData!.total_pages - 2 - +itemsPage === 3
                                                        || paginationData!.total_pages - 2 - +itemsPage === 2
                                                        || paginationData!.total_pages - 2 - +itemsPage === 1
                                                    )
                                                        ? (
                                                            ''
                                                        )
                                                        : (
                                                            <CPaginationItem
                                                                className={cls.paginationItem}
                                                                onClick={() => { onChange(`${+itemsPage + 1}`); }}
                                                            >
                                                                ...
                                                            </CPaginationItem>
                                                        )
                                                }
                                                {
                                                    [...Array(paginationData.total_pages)].map((_, index) => {
                                                        if (
                                                            paginationData!.total_pages - index + 1 === 4
                                                            || paginationData!.total_pages - index + 1 === 3
                                                            || paginationData!.total_pages - index + 1 === 2
                                                            || paginationData!.total_pages - index + 1 === 1
                                                        ) {
                                                            return (
                                                                <CPaginationItem
                                                                    className={cls.paginationItem}
                                                                    active={+itemsPage === (index + 1)}
                                                                    onClick={() => { onChange(`${index + 1}`); }}
                                                                    key={index}
                                                                >
                                                                    {index + 1}
                                                                </CPaginationItem>
                                                            );
                                                        }
                                                    })
                                                }
                                            </>
                                        )}
                                    </>
                                )
                                : <div />
                        }

                        {paginationData?.next_page && (
                            <CPaginationItem
                                onClick={() => { onChange(`${+itemsPage + 1}`); }}
                                className={cls.paginationItem}
                            >
                                Следующая
                            </CPaginationItem>
                        )}
                    </CPagination>
                </div>
            )
        );
    }

    return paginationContent;
};
