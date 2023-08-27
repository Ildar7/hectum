import { HelmetProvider } from 'app/providers/HelmetProvider';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Search } from 'widgets/Search';
import { TableConfig } from 'widgets/TableConfig';
import { LimitShow, Pagintaion } from 'widgets/Pagination';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { citizenshipSearchFilter } from 'shared/lib/searchFilter/searchFilter';
import {
    Citizenship,
    citizenshipActions,
    citizenshipReducer,
    CitizenshipType,
    fetchCitizenship,
    getCitizenshipData,
    getCitizenshipError,
    getCitizenshipIsLoading,
    getCitizenshipLimit,
    getCitizenshipPage,
} from 'entities/Citizenship';
import { classNames } from 'shared/lib/classNames/classNames';
import { AddCitizenship, addCitizenshipReducer } from 'features/Citizenship/AddCitizenship';
import { editCitizenshipReducer } from 'features/Citizenship/EditCitizenship';
import { citizenshipDetailReducer } from 'entities/CitizenshipDetail';
import cls from './CitizenshipPage.module.scss';

interface CitizenshipPageProps {
  className?: string;
}

const reducers: ReducersList = {
    citizenship: citizenshipReducer,
    citizenshipDetail: citizenshipDetailReducer,
    addCitizenship: addCitizenshipReducer,
    editCitizenship: editCitizenshipReducer,
};
const CitizenshipPage = (props: CitizenshipPageProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();
    const [visibleAddNewCitizenship, setVisibleAddNewCitizenship] = useState(false);
    const citizenshipData = useSelector(getCitizenshipData);
    const isLoadingCitizenship = useSelector(getCitizenshipIsLoading);
    const errorCitizenship = useSelector(getCitizenshipError);
    const citizenshipLimit = useSelector(getCitizenshipLimit);
    const citizenshipPage = useSelector(getCitizenshipPage);
    const [searchValue, setSearchValue] = useState('');
    const [searchedData, setSearchedData] = useState<CitizenshipType[]>();

    const onSearch = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    const onChangePaginationLimit = useCallback((limit: string) => {
        dispatch(citizenshipActions.setLimit(limit));
        dispatch(fetchCitizenship());
    }, [dispatch]);

    const onChangePaginationPage = useCallback((page: string) => {
        dispatch(citizenshipActions.setPage(page));
        dispatch(fetchCitizenship());
    }, [dispatch]);

    useEffect(() => {
        setSearchedData(citizenshipData?.data || []);
    }, [citizenshipData]);

    useEffect(() => {
        const filteredData = citizenshipSearchFilter(searchValue, citizenshipData?.data || []);
        setSearchedData(filteredData || []);
    }, [citizenshipData, searchValue]);

    useEffect(() => {
        dispatch(fetchCitizenship());
    }, [dispatch]);

    return (
        <HelmetProvider
            title="Hectum LMS - Гражданство"
        >
            <DynamicModuleLoader reducers={reducers}>
                <div className={classNames(cls.CitizenshipPage, {}, [className])}>
                    <Search
                        value={searchValue}
                        onChange={onSearch}
                        searchText="Поиск по наименованию"
                        error={errorCitizenship}
                        isLoading={isLoadingCitizenship}
                    />
                    <TableConfig
                        onlyAdding
                        setVisibleAddNewField={setVisibleAddNewCitizenship}
                        addingModalText="Добавить гражданство"
                        error={errorCitizenship}
                        isLoading={isLoadingCitizenship}
                    >
                        <AddCitizenship
                            visible={visibleAddNewCitizenship}
                            setVisible={setVisibleAddNewCitizenship}
                        />
                    </TableConfig>
                    <Citizenship
                        data={searchedData || []}
                    />
                    <div className={cls.citizenshipTypesSettings}>
                        <LimitShow
                            data={searchedData || []}
                            onChange={onChangePaginationLimit}
                            onChangePage={onChangePaginationPage}
                            paginationData={citizenshipData?.pagination}
                            itemsLimit={citizenshipLimit!}
                            withRecords
                            isLoading={isLoadingCitizenship!}
                            error={errorCitizenship}
                        />
                        <Pagintaion
                            data={searchedData || []}
                            onChange={onChangePaginationPage}
                            itemsPage={citizenshipPage!}
                            isLoading={isLoadingCitizenship!}
                            error={errorCitizenship}
                            paginationData={citizenshipData?.pagination}
                        />
                    </div>
                </div>
            </DynamicModuleLoader>
        </HelmetProvider>
    );
};

export default CitizenshipPage;
