import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Search } from 'widgets/Search';
import { TableConfig } from 'widgets/TableConfig';
import { HelmetProvider } from 'app/providers/HelmetProvider';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { LimitShow, Pagintaion } from 'widgets/Pagination';
import {
    fetchEduLanguages,
    getEduLanguagesData,
    getEduLanguagesError,
    getEduLanguagesIsLoading,
    getEduLanguagesLimit,
    getEduLanguagesPage,
    EduLanguages,
    eduLanguagesActions,
    eduLanguagesReducer,
    EduLanguagesType,
} from 'entities/EduLanguages';
import { eduLanguagesSearchFilter } from 'shared/lib/searchFilter/searchFilter';
import { AddEduLanguage, addEduLanguageReducer } from 'features/EduLanguages/AddEduLanguage';
import { classNames } from 'shared/lib/classNames/classNames';
import { eduLanguageDetailReducer } from 'entities/EduLanguageDetail';
import { editEduLanguageReducer } from 'features/EduLanguages/EditEduLanguage';
import cls from './EduLanguagesPage.module.scss';

interface EduLanguagesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    eduLanguages: eduLanguagesReducer,
    eduLanguagesDetail: eduLanguageDetailReducer,
    addEduLanguage: addEduLanguageReducer,
    editEduLanguage: editEduLanguageReducer,
};
const EduLanguagesPage = (props: EduLanguagesPageProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const [visibleAddNewEduLanguage, setVisibleAddNewEduLanguage] = useState(false);
    const eduLanguagesData = useSelector(getEduLanguagesData);
    const isLoadingEduLanguages = useSelector(getEduLanguagesIsLoading);
    const errorEduLanguages = useSelector(getEduLanguagesError);
    const eduLanguagesLimit = useSelector(getEduLanguagesLimit);
    const eduLanguagesPage = useSelector(getEduLanguagesPage);
    const [searchValue, setSearchValue] = useState('');
    const [searchedData, setSearchedData] = useState<EduLanguagesType[]>();

    const onSearch = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    const onChangePaginationLimit = useCallback((limit: string) => {
        dispatch(eduLanguagesActions.setLimit(limit));
        dispatch(fetchEduLanguages());
    }, [dispatch]);

    const onChangePaginationPage = useCallback((page: string) => {
        dispatch(eduLanguagesActions.setPage(page));
        dispatch(fetchEduLanguages());
    }, [dispatch]);

    useEffect(() => {
        setSearchedData(eduLanguagesData?.data || []);
    }, [eduLanguagesData]);

    useEffect(() => {
        const filteredData = eduLanguagesSearchFilter(searchValue, eduLanguagesData?.data || []);
        setSearchedData(filteredData || []);
    }, [eduLanguagesData, searchValue]);

    useEffect(() => {
        dispatch(fetchEduLanguages());
    }, [dispatch]);

    return (
        <HelmetProvider
            title="Hectum LMS - Язык обучения"
        >
            <DynamicModuleLoader reducers={reducers}>
                <div className={classNames(cls.EduLanguagesPage, {}, [className])}>
                    <Search
                        value={searchValue}
                        onChange={onSearch}
                        searchText="Поиск по наименованию"
                        error={errorEduLanguages}
                        isLoading={isLoadingEduLanguages}
                    />
                    <TableConfig
                        onlyAdding
                        setVisibleAddNewField={setVisibleAddNewEduLanguage}
                        addingModalText="Добавить язык обучения"
                        error={errorEduLanguages}
                        isLoading={isLoadingEduLanguages}
                    >
                        <AddEduLanguage
                            visible={visibleAddNewEduLanguage}
                            setVisible={setVisibleAddNewEduLanguage}
                        />
                    </TableConfig>
                    <EduLanguages
                        data={searchedData || []}
                    />
                    <div className={cls.eduLanguagesSettings}>
                        <LimitShow
                            data={searchedData || []}
                            onChange={onChangePaginationLimit}
                            onChangePage={onChangePaginationPage}
                            paginationData={eduLanguagesData?.pagination}
                            itemsLimit={eduLanguagesLimit!}
                            withRecords
                            isLoading={isLoadingEduLanguages!}
                            error={errorEduLanguages}
                        />
                        <Pagintaion
                            data={searchedData || []}
                            onChange={onChangePaginationPage}
                            itemsPage={eduLanguagesPage!}
                            isLoading={isLoadingEduLanguages!}
                            error={errorEduLanguages}
                            paginationData={eduLanguagesData?.pagination}
                        />
                    </div>
                </div>
            </DynamicModuleLoader>
        </HelmetProvider>
    );
};

export default EduLanguagesPage;
