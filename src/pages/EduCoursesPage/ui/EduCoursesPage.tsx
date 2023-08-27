import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Search } from 'widgets/Search';
import { TableConfig } from 'widgets/TableConfig';
import { HelmetProvider } from 'app/providers/HelmetProvider';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { LimitShow, Pagintaion } from 'widgets/Pagination';
import {
    fetchEduCourses,
    getEduCoursesData,
    getEduCoursesError,
    getEduCoursesIsLoading,
    getEduCoursesLimit,
    getEduCoursesPage,
    EduCourses,
    eduCoursesActions,
    eduCoursesReducer,
    EduCoursesType,
} from 'entities/EduCourses';
import { eduCoursesSearchFilter } from 'shared/lib/searchFilter/searchFilter';
import { AddEduCourse, addEduCourseReducer } from 'features/EduCourses/AddEduCourse';
import { classNames } from 'shared/lib/classNames/classNames';
import { eduCourseDetailReducer } from 'entities/EduCourseDetail';
import { editEduCourseReducer } from 'features/EduCourses/EditEduCourse';
import cls from './EduCoursesPage.module.scss';

interface EduCoursesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    eduCourses: eduCoursesReducer,
    eduCourseDetail: eduCourseDetailReducer,
    addEduCourse: addEduCourseReducer,
    editEduCourse: editEduCourseReducer,
};
const EduCoursesPage = (props: EduCoursesPageProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const [visibleAddNewEduCourse, setVisibleAddNewEduCourse] = useState(false);
    const eduCoursesData = useSelector(getEduCoursesData);
    const isLoadingEduCourses = useSelector(getEduCoursesIsLoading);
    const errorEduCourses = useSelector(getEduCoursesError);
    const eduCoursesLimit = useSelector(getEduCoursesLimit);
    const eduCoursesPage = useSelector(getEduCoursesPage);
    const [searchValue, setSearchValue] = useState('');
    const [searchedData, setSearchedData] = useState<EduCoursesType[]>();

    const onSearch = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    const onChangePaginationLimit = useCallback((limit: string) => {
        dispatch(eduCoursesActions.setLimit(limit));
        dispatch(fetchEduCourses());
    }, [dispatch]);

    const onChangePaginationPage = useCallback((page: string) => {
        dispatch(eduCoursesActions.setPage(page));
        dispatch(fetchEduCourses());
    }, [dispatch]);

    useEffect(() => {
        setSearchedData(eduCoursesData?.data || []);
    }, [eduCoursesData]);

    useEffect(() => {
        const filteredData = eduCoursesSearchFilter(searchValue, eduCoursesData?.data || []);
        setSearchedData(filteredData || []);
    }, [eduCoursesData, searchValue]);

    useEffect(() => {
        dispatch(fetchEduCourses());
    }, [dispatch]);

    return (
        <HelmetProvider
            title="Hectum LMS - Номер учебного курса"
        >
            <DynamicModuleLoader reducers={reducers}>
                <div className={classNames(cls.EduCoursesPage, {}, [className])}>
                    <Search
                        value={searchValue}
                        onChange={onSearch}
                        searchText="Поиск по наименованию"
                        error={errorEduCourses}
                        isLoading={isLoadingEduCourses}
                    />
                    <TableConfig
                        onlyAdding
                        setVisibleAddNewField={setVisibleAddNewEduCourse}
                        addingModalText="Добавить номер учебного курса"
                        error={errorEduCourses}
                        isLoading={isLoadingEduCourses}
                    >
                        <AddEduCourse
                            visible={visibleAddNewEduCourse}
                            setVisible={setVisibleAddNewEduCourse}
                        />
                    </TableConfig>
                    <EduCourses
                        data={searchedData || []}
                    />
                    <div className={cls.eduCoursesSettings}>
                        <LimitShow
                            data={searchedData || []}
                            onChange={onChangePaginationLimit}
                            onChangePage={onChangePaginationPage}
                            paginationData={eduCoursesData?.pagination}
                            itemsLimit={eduCoursesLimit!}
                            withRecords
                            isLoading={isLoadingEduCourses!}
                            error={errorEduCourses}
                        />
                        <Pagintaion
                            data={searchedData || []}
                            onChange={onChangePaginationPage}
                            itemsPage={eduCoursesPage!}
                            isLoading={isLoadingEduCourses!}
                            error={errorEduCourses}
                            paginationData={eduCoursesData?.pagination}
                        />
                    </div>
                </div>
            </DynamicModuleLoader>
        </HelmetProvider>
    );
};

export default EduCoursesPage;
