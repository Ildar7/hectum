import { classNames } from 'shared/lib/classNames/classNames';
import { Search } from 'widgets/Search';
import { useCallback, useEffect, useState } from 'react';
import { TableConfig } from 'widgets/TableConfig';
import {
    getStudentsData, Students, studentsReducer, StudentsType,
} from 'entities/Students';
import { Pagintaion } from 'widgets/Pagination';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { searchFilter } from 'shared/lib/searchFilter/searchFilter';
import { tableFiltersReducer, tableFiltersSelectedReducer } from 'features/TableFilters';

interface StudentsPageProps {
  className?: string;
}

const reducers: ReducersList = {
    students: studentsReducer,
    tableFilters: tableFiltersReducer,
    tableFiltersSelected: tableFiltersSelectedReducer,
};
const StudentsPage = (props: StudentsPageProps) => {
    const {
        className,
    } = props;
    const data = useSelector(getStudentsData);
    const [searchValue, setSearchValue] = useState('');
    const [searchedData, setSearchedData] = useState<StudentsType[]>();

    const onSearch = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    useEffect(() => {
        setSearchedData(data || []);
    }, [data]);

    useEffect(() => {
        const filteredData = searchFilter(searchValue, data || []);
        setSearchedData(filteredData || []);
    }, [data, searchValue]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div>
                <Search
                    value={searchValue}
                    onChange={onSearch}
                />
                <TableConfig />
                <Students
                    data={searchedData || []}
                />
                <Pagintaion
                    data={searchedData || []}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default StudentsPage;
