import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Search } from 'widgets/Search';
import { TableConfig } from 'widgets/TableConfig';
import { HelmetProvider } from 'app/providers/HelmetProvider';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { LimitShow, Pagintaion } from 'widgets/Pagination';
import {
    fetchStudyDurations,
    getStudyDurationsData,
    getStudyDurationsError,
    getStudyDurationsIsLoading,
    getStudyDurationsLimit,
    getStudyDurationsPage,
    StudyDurations,
    studyDurationsActions,
    studyDurationsReducer,
    StudyDurationsType,
} from 'entities/StudyDurations';
import { studyDurationsSearchFilter } from 'shared/lib/searchFilter/searchFilter';
import { AddStudyDuration, addStudyDurationReducer } from 'features/StudyDurations/AddStudyDuration';
import { classNames } from 'shared/lib/classNames/classNames';
import { studyDurationDetailReducer } from 'entities/StudyDurationDetail';
import { editStudyDurationReducer } from 'features/StudyDurations/EditStudyDuration';
import cls from './StudyDurationsPage.module.scss';

interface StudyDurationsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    studyDurations: studyDurationsReducer,
    studyDurationDetail: studyDurationDetailReducer,
    addStudyDuration: addStudyDurationReducer,
    editStudyDuration: editStudyDurationReducer,
};
const StudyDurationsPage = (props: StudyDurationsPageProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const [visibleAddNewStudyDuration, setVisibleAddNewStudyDuration] = useState(false);
    const studyDurationsData = useSelector(getStudyDurationsData);
    const isLoadingStudyDurations = useSelector(getStudyDurationsIsLoading);
    const errorStudyDurations = useSelector(getStudyDurationsError);
    const studyDurationsLimit = useSelector(getStudyDurationsLimit);
    const studyDurationsPage = useSelector(getStudyDurationsPage);
    const [searchValue, setSearchValue] = useState('');
    const [searchedData, setSearchedData] = useState<StudyDurationsType[]>();

    const onSearch = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    const onChangePaginationLimit = useCallback((limit: string) => {
        dispatch(studyDurationsActions.setLimit(limit));
        dispatch(fetchStudyDurations());
    }, [dispatch]);

    const onChangePaginationPage = useCallback((page: string) => {
        dispatch(studyDurationsActions.setPage(page));
        dispatch(fetchStudyDurations());
    }, [dispatch]);

    useEffect(() => {
        setSearchedData(studyDurationsData?.data || []);
    }, [studyDurationsData]);

    useEffect(() => {
        const filteredData = studyDurationsSearchFilter(searchValue, studyDurationsData?.data || []);
        setSearchedData(filteredData || []);
    }, [studyDurationsData, searchValue]);

    useEffect(() => {
        dispatch(fetchStudyDurations());
    }, [dispatch]);

    return (
        <HelmetProvider
            title="Hectum LMS - Продолжительность обучения"
        >
            <DynamicModuleLoader reducers={reducers}>
                <div className={classNames(cls.StudyDurationsPage, {}, [className])}>
                    <Search
                        value={searchValue}
                        onChange={onSearch}
                        searchText="Поиск по наименованию"
                        error={errorStudyDurations}
                        isLoading={isLoadingStudyDurations}
                    />
                    <TableConfig
                        onlyAdding
                        setVisibleAddNewField={setVisibleAddNewStudyDuration}
                        addingModalText="Добавить продолжительность обучения"
                        error={errorStudyDurations}
                        isLoading={isLoadingStudyDurations}
                    >
                        <AddStudyDuration
                            visible={visibleAddNewStudyDuration}
                            setVisible={setVisibleAddNewStudyDuration}
                        />
                    </TableConfig>
                    <StudyDurations
                        data={searchedData || []}
                    />
                    <div className={cls.studyDurationsSettings}>
                        <LimitShow
                            data={searchedData || []}
                            onChange={onChangePaginationLimit}
                            onChangePage={onChangePaginationPage}
                            paginationData={studyDurationsData?.pagination}
                            itemsLimit={studyDurationsLimit!}
                            withRecords
                            isLoading={isLoadingStudyDurations!}
                            error={errorStudyDurations}
                        />
                        <Pagintaion
                            data={searchedData || []}
                            onChange={onChangePaginationPage}
                            itemsPage={studyDurationsPage!}
                            isLoading={isLoadingStudyDurations!}
                            error={errorStudyDurations}
                            paginationData={studyDurationsData?.pagination}
                        />
                    </div>
                </div>
            </DynamicModuleLoader>
        </HelmetProvider>
    );
};

export default StudyDurationsPage;
