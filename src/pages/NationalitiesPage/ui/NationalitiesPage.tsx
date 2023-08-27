import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Search } from 'widgets/Search';
import { TableConfig } from 'widgets/TableConfig';
import { HelmetProvider } from 'app/providers/HelmetProvider';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { LimitShow, Pagintaion } from 'widgets/Pagination';
import {
    fetchNationalities,
    getNationalitiesData,
    getNationalitiesError,
    getNationalitiesIsLoading,
    getNationalitiesLimit,
    getNationalitiesPage,
    Nationalities,
    nationalitiesActions,
    nationalitiesReducer,
    NationalitiesType,
} from 'entities/Nationalities';
import { nationalitiesSearchFilter } from 'shared/lib/searchFilter/searchFilter';
import { AddNationality, addNationalityReducer } from 'features/Nationalities/AddNationality';
import { classNames } from 'shared/lib/classNames/classNames';
import { nationalityDetailReducer } from 'entities/NationalityDetail';
import { editNationalityReducer } from 'features/Nationalities/EditNationality';
import cls from './NationalitiesPage.module.scss';

interface NationalitiesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    nationalities: nationalitiesReducer,
    nationalityDetail: nationalityDetailReducer,
    addNationality: addNationalityReducer,
    editNationality: editNationalityReducer,
};
const NationalitiesPage = (props: NationalitiesPageProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const [visibleAddNewNationality, setVisibleAddNewNationality] = useState(false);
    const nationalitiesData = useSelector(getNationalitiesData);
    const isLoadingNationalities = useSelector(getNationalitiesIsLoading);
    const errorNationalities = useSelector(getNationalitiesError);
    const nationalitiesLimit = useSelector(getNationalitiesLimit);
    const nationalitiesPage = useSelector(getNationalitiesPage);
    const [searchValue, setSearchValue] = useState('');
    const [searchedData, setSearchedData] = useState<NationalitiesType[]>();

    const onSearch = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    const onChangePaginationLimit = useCallback((limit: string) => {
        dispatch(nationalitiesActions.setLimit(limit));
        dispatch(fetchNationalities());
    }, [dispatch]);

    const onChangePaginationPage = useCallback((page: string) => {
        dispatch(nationalitiesActions.setPage(page));
        dispatch(fetchNationalities());
    }, [dispatch]);

    useEffect(() => {
        setSearchedData(nationalitiesData?.data || []);
    }, [nationalitiesData]);

    useEffect(() => {
        const filteredData = nationalitiesSearchFilter(searchValue, nationalitiesData?.data || []);
        setSearchedData(filteredData || []);
    }, [nationalitiesData, searchValue]);

    useEffect(() => {
        dispatch(fetchNationalities());
    }, [dispatch]);

    return (
        <HelmetProvider
            title="Hectum LMS - Национальности"
        >
            <DynamicModuleLoader reducers={reducers}>
                <div className={classNames(cls.NationalitiesPage, {}, [className])}>
                    <Search
                        value={searchValue}
                        onChange={onSearch}
                        searchText="Поиск по наименованию"
                        error={errorNationalities}
                        isLoading={isLoadingNationalities}
                    />
                    <TableConfig
                        onlyAdding
                        setVisibleAddNewField={setVisibleAddNewNationality}
                        addingModalText="Добавить национальность"
                        error={errorNationalities}
                        isLoading={isLoadingNationalities}
                    >
                        <AddNationality
                            visible={visibleAddNewNationality}
                            setVisible={setVisibleAddNewNationality}
                        />
                    </TableConfig>
                    <Nationalities
                        data={searchedData || []}
                    />
                    <div className={cls.nationalitiesSettings}>
                        <LimitShow
                            data={searchedData || []}
                            onChange={onChangePaginationLimit}
                            onChangePage={onChangePaginationPage}
                            paginationData={nationalitiesData?.pagination}
                            itemsLimit={nationalitiesLimit!}
                            withRecords
                            isLoading={isLoadingNationalities!}
                            error={errorNationalities}
                        />
                        <Pagintaion
                            data={searchedData || []}
                            onChange={onChangePaginationPage}
                            itemsPage={nationalitiesPage!}
                            isLoading={isLoadingNationalities!}
                            error={errorNationalities}
                            paginationData={nationalitiesData?.pagination}
                        />
                    </div>
                </div>
            </DynamicModuleLoader>
        </HelmetProvider>
    );
};

export default NationalitiesPage;
