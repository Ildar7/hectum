import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Search } from 'widgets/Search';
import { TableConfig } from 'widgets/TableConfig';
import { HelmetProvider } from 'app/providers/HelmetProvider';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { LimitShow, Pagintaion } from 'widgets/Pagination';
import {
    fetchFinishedEduTypes,
    getFinishedEduTypesData,
    getFinishedEduTypesError,
    getFinishedEduTypesIsLoading,
    getFinishedEduTypesLimit,
    getFinishedEduTypesPage,
    FinishedEduTypes,
    finishedEduTypesActions,
    finishedEduTypesReducer,
    FinishedEduTypesType,
} from 'entities/FinishedEduTypes';
import { finishedEduTypesSearchFilter } from 'shared/lib/searchFilter/searchFilter';
import { AddFinishedEduType, addFinishedEduTypeReducer } from 'features/FinishedEduTypes/AddFinishedEduType';
import { classNames } from 'shared/lib/classNames/classNames';
import { finishedEduTypeDetailReducer } from 'entities/FinishedEduTypeDetail';
import { editFinishedEduTypeReducer } from 'features/FinishedEduTypes/EditFinishedEduType';
import cls from './FinishedEduTypesPage.module.scss';

interface FinishedEduTypesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    finishedEduTypes: finishedEduTypesReducer,
    finishedEduTypesDetail: finishedEduTypeDetailReducer,
    addFinishedEduType: addFinishedEduTypeReducer,
    editFinishedEduType: editFinishedEduTypeReducer,
};
const FinishedEduTypesPage = (props: FinishedEduTypesPageProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const [visibleAddNewFinishedEduType, setVisibleAddNewFinishedEduType] = useState(false);
    const finishedEduTypesData = useSelector(getFinishedEduTypesData);
    const isLoadingFinishedEduTypes = useSelector(getFinishedEduTypesIsLoading);
    const errorFinishedEduTypes = useSelector(getFinishedEduTypesError);
    const finishedEduTypesLimit = useSelector(getFinishedEduTypesLimit);
    const finishedEduTypesPage = useSelector(getFinishedEduTypesPage);
    const [searchValue, setSearchValue] = useState('');
    const [searchedData, setSearchedData] = useState<FinishedEduTypesType[]>();

    const onSearch = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    const onChangePaginationLimit = useCallback((limit: string) => {
        dispatch(finishedEduTypesActions.setLimit(limit));
        dispatch(fetchFinishedEduTypes());
    }, [dispatch]);

    const onChangePaginationPage = useCallback((page: string) => {
        dispatch(finishedEduTypesActions.setPage(page));
        dispatch(fetchFinishedEduTypes());
    }, [dispatch]);

    useEffect(() => {
        setSearchedData(finishedEduTypesData?.data || []);
    }, [finishedEduTypesData]);

    useEffect(() => {
        const filteredData = finishedEduTypesSearchFilter(searchValue, finishedEduTypesData?.data || []);
        setSearchedData(filteredData || []);
    }, [finishedEduTypesData, searchValue]);

    useEffect(() => {
        dispatch(fetchFinishedEduTypes());
    }, [dispatch]);

    return (
        <HelmetProvider
            title="Hectum LMS - Типы окончания обучения"
        >
            <DynamicModuleLoader reducers={reducers}>
                <div className={classNames(cls.FinishedEduTypesPage, {}, [className])}>
                    <Search
                        value={searchValue}
                        onChange={onSearch}
                        searchText="Поиск по наименованию"
                        error={errorFinishedEduTypes}
                        isLoading={isLoadingFinishedEduTypes}
                    />
                    <TableConfig
                        onlyAdding
                        setVisibleAddNewField={setVisibleAddNewFinishedEduType}
                        addingModalText="Добавить тип окончания обучения"
                        error={errorFinishedEduTypes}
                        isLoading={isLoadingFinishedEduTypes}
                    >
                        <AddFinishedEduType
                            visible={visibleAddNewFinishedEduType}
                            setVisible={setVisibleAddNewFinishedEduType}
                        />
                    </TableConfig>
                    <FinishedEduTypes
                        data={searchedData || []}
                    />
                    <div className={cls.finishedEduTypesSettings}>
                        <LimitShow
                            data={searchedData || []}
                            onChange={onChangePaginationLimit}
                            onChangePage={onChangePaginationPage}
                            paginationData={finishedEduTypesData?.pagination}
                            itemsLimit={finishedEduTypesLimit!}
                            withRecords
                            isLoading={isLoadingFinishedEduTypes!}
                            error={errorFinishedEduTypes}
                        />
                        <Pagintaion
                            data={searchedData || []}
                            onChange={onChangePaginationPage}
                            itemsPage={finishedEduTypesPage!}
                            isLoading={isLoadingFinishedEduTypes!}
                            error={errorFinishedEduTypes}
                            paginationData={finishedEduTypesData?.pagination}
                        />
                    </div>
                </div>
            </DynamicModuleLoader>
        </HelmetProvider>
    );
};

export default FinishedEduTypesPage;
