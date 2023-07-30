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
import {
    getTableFieldsData, tableFieldsActions, tableFieldsReducer, TableFieldsType,
} from 'features/TableFields';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addStudentReducer } from 'entities/AddStudent';

const reducers: ReducersList = {
    tableFields: tableFieldsReducer,
    students: studentsReducer,
    tableFilters: tableFiltersReducer,
    tableFiltersSelected: tableFiltersSelectedReducer,
    addNewStudent: addStudentReducer,
};
const StudentsPage = () => {
    const dispatch = useAppDispatch();
    const studentsData = useSelector(getStudentsData);
    const tableFieldsData = useSelector(getTableFieldsData);
    const [searchValue, setSearchValue] = useState('');
    const [searchedData, setSearchedData] = useState<StudentsType[]>();
    const [visibleCells, setVisibleCells] = useState<TableFieldsType>();

    const onSearch = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    const onSaveFields = useCallback(() => {
        dispatch(tableFieldsActions.saveCheckedFields());
        setVisibleCells(tableFieldsData);
    }, [dispatch, tableFieldsData]);

    const onClearFields = useCallback(() => {
        dispatch(tableFieldsActions.clearCheckedFields());
        setVisibleCells(tableFieldsData);
    }, [dispatch, tableFieldsData]);

    useEffect(() => {
        setSearchedData(studentsData || []);
    }, [studentsData]);

    useEffect(() => {
        const filteredData = searchFilter(searchValue, studentsData || []);
        setSearchedData(filteredData || []);
    }, [studentsData, searchValue]);

    useEffect(() => {
        setVisibleCells(tableFieldsData);
    }, [tableFieldsData]);

    useEffect(() => {
        dispatch(tableFieldsActions.initFieldsData());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div>
                <Search
                    value={searchValue}
                    onChange={onSearch}
                />
                <TableConfig
                    onSaveFields={onSaveFields}
                    onClearFields={onClearFields}
                />
                <Students
                    data={searchedData || []}
                    visibleCells={visibleCells}
                />
                <Pagintaion
                    data={searchedData || []}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default StudentsPage;
