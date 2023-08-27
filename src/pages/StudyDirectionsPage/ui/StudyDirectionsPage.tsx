import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Search } from 'widgets/Search';
import { TableConfig } from 'widgets/TableConfig';
import { HelmetProvider } from 'app/providers/HelmetProvider';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { LimitShow, Pagintaion } from 'widgets/Pagination';
import {
    fetchStudyDirections,
    getStudyDirectionsData,
    getStudyDirectionsError,
    getStudyDirectionsIsLoading,
    getStudyDirectionsLimit,
    getStudyDirectionsPage,
    StudyDirections,
    studyDirectionsActions,
    studyDirectionsReducer,
    StudyDirectionsType,
} from 'entities/StudyDirections';
import { studyDirectionsSearchFilter } from 'shared/lib/searchFilter/searchFilter';
import { AddStudyDirection, addStudyDirectionReducer } from 'features/StudyDirections/AddStudyDirection';
import { classNames } from 'shared/lib/classNames/classNames';
import { studyDirectionDetailReducer } from 'entities/StudyDirectionDetail';
import { editStudyDirectionReducer } from 'features/StudyDirections/EditStudyDirection';
import cls from './StudyDirectionsPage.module.scss';

interface StudyDirectionsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    studyDirections: studyDirectionsReducer,
    studyDirectionDetail: studyDirectionDetailReducer,
    addStudyDirection: addStudyDirectionReducer,
    editStudyDirection: editStudyDirectionReducer,
};
const StudyDirectionsPage = (props: StudyDirectionsPageProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const [visibleAddNewStudyDirection, setVisibleAddNewStudyDirection] = useState(false);
    const studyDirectionsData = useSelector(getStudyDirectionsData);
    const isLoadingStudyDirections = useSelector(getStudyDirectionsIsLoading);
    const errorStudyDirections = useSelector(getStudyDirectionsError);
    const studyDirectionsLimit = useSelector(getStudyDirectionsLimit);
    const studyDirectionsPage = useSelector(getStudyDirectionsPage);
    const [searchValue, setSearchValue] = useState('');
    const [searchedData, setSearchedData] = useState<StudyDirectionsType[]>();

    const onSearch = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    const onChangePaginationLimit = useCallback((limit: string) => {
        dispatch(studyDirectionsActions.setLimit(limit));
        dispatch(fetchStudyDirections());
    }, [dispatch]);

    const onChangePaginationPage = useCallback((page: string) => {
        dispatch(studyDirectionsActions.setPage(page));
        dispatch(fetchStudyDirections());
    }, [dispatch]);

    useEffect(() => {
        setSearchedData(studyDirectionsData?.data || []);
    }, [studyDirectionsData]);

    useEffect(() => {
        const filteredData = studyDirectionsSearchFilter(searchValue, studyDirectionsData?.data || []);
        setSearchedData(filteredData || []);
    }, [studyDirectionsData, searchValue]);

    useEffect(() => {
        dispatch(fetchStudyDirections());
    }, [dispatch]);

    return (
        <HelmetProvider
            title="Hectum LMS - Студенческое направление"
        >
            <DynamicModuleLoader reducers={reducers}>
                <div className={classNames(cls.StudyDirectionsPage, {}, [className])}>
                    <Search
                        value={searchValue}
                        onChange={onSearch}
                        searchText="Поиск по наименованию"
                        error={errorStudyDirections}
                        isLoading={isLoadingStudyDirections}
                    />
                    <TableConfig
                        onlyAdding
                        setVisibleAddNewField={setVisibleAddNewStudyDirection}
                        addingModalText="Добавить студенческое направление"
                        error={errorStudyDirections}
                        isLoading={isLoadingStudyDirections}
                    >
                        <AddStudyDirection
                            visible={visibleAddNewStudyDirection}
                            setVisible={setVisibleAddNewStudyDirection}
                        />
                    </TableConfig>
                    <StudyDirections
                        data={searchedData || []}
                    />
                    <div className={cls.studyDirectionsSettings}>
                        <LimitShow
                            data={searchedData || []}
                            onChange={onChangePaginationLimit}
                            onChangePage={onChangePaginationPage}
                            paginationData={studyDirectionsData?.pagination}
                            itemsLimit={studyDirectionsLimit!}
                            withRecords
                            isLoading={isLoadingStudyDirections!}
                            error={errorStudyDirections}
                        />
                        <Pagintaion
                            data={searchedData || []}
                            onChange={onChangePaginationPage}
                            itemsPage={studyDirectionsPage!}
                            isLoading={isLoadingStudyDirections!}
                            error={errorStudyDirections}
                            paginationData={studyDirectionsData?.pagination}
                        />
                    </div>
                </div>
            </DynamicModuleLoader>
        </HelmetProvider>
    );
};

export default StudyDirectionsPage;
