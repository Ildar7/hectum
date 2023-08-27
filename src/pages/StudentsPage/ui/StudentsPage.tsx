import { Search } from 'widgets/Search';
import React, { useCallback, useEffect, useState } from 'react';
import { TableConfig } from 'widgets/TableConfig';
import {
    fetchStudents,
    getStudentsData,
    getStudentsError,
    getStudentsIsLoading,
    getStudentsLimit,
    getStudentsPage,
    Students,
    studentsActions,
    StudentsType,
} from 'entities/Students';
import { LimitShow, Pagintaion } from 'widgets/Pagination';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { studentSearchFilter } from 'shared/lib/searchFilter/searchFilter';
import { tableFiltersReducer } from 'features/TableFilters';
import {
    getTableFieldsData, tableFieldsActions, tableFieldsReducer, TableFieldsType,
} from 'features/TableFields';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddStudent, addStudentReducer } from 'features/Students/AddStudent';
import { studentDetailReducer } from 'entities/StudentDetail';
import { editStudentReducer } from 'features/Students/EditStudent';
import { HelmetProvider } from 'app/providers/HelmetProvider';
import cls from './StudentsPage.module.scss';

const reducers: ReducersList = {
    tableFields: tableFieldsReducer,
    tableFilters: tableFiltersReducer,
    studentDetail: studentDetailReducer,
    addNewStudent: addStudentReducer,
    editStudent: editStudentReducer,
};
const StudentsPage = () => {
    const dispatch = useAppDispatch();
    const studentsData = useSelector(getStudentsData);
    const isLoadingStudentsData = useSelector(getStudentsIsLoading);
    const errorStudentsData = useSelector(getStudentsError);
    const tableFieldsData = useSelector(getTableFieldsData);
    const studentsLimit = useSelector(getStudentsLimit);
    const studentsPage = useSelector(getStudentsPage);
    const [searchValue, setSearchValue] = useState('');
    const [searchedData, setSearchedData] = useState<StudentsType[]>();
    const [visibleCells, setVisibleCells] = useState<TableFieldsType>();
    const [visibleAddNewStudent, setVisibleAddNewStudent] = useState(false);

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

    const onChangePaginationLimit = useCallback((limit: string) => {
        dispatch(studentsActions.setLimit(limit));
        dispatch(fetchStudents());
    }, [dispatch]);

    const onChangePaginationPage = useCallback((page: string) => {
        dispatch(studentsActions.setPage(page));
        dispatch(fetchStudents());
    }, [dispatch]);

    useEffect(() => {
        setSearchedData(studentsData?.data || []);
    }, [studentsData]);

    useEffect(() => {
        const filteredData = studentSearchFilter(searchValue, studentsData?.data || []);
        setSearchedData(filteredData || []);
    }, [studentsData, searchValue]);

    useEffect(() => {
        setVisibleCells(tableFieldsData);
    }, [tableFieldsData]);

    useEffect(() => {
        dispatch(tableFieldsActions.initFieldsData());
    }, [dispatch]);

    return (
        <HelmetProvider
            title="Hectum LMS - Студенты"
        >
            <DynamicModuleLoader reducers={reducers}>
                <div>
                    <Search
                        value={searchValue}
                        onChange={onSearch}
                        searchText="Поиск по ФИО"
                        error={errorStudentsData}
                        isLoading={isLoadingStudentsData}
                    />
                    <TableConfig
                        onSaveFields={onSaveFields}
                        onClearFields={onClearFields}
                        setVisibleAddNewField={setVisibleAddNewStudent}
                        addingModalText="Добавить студента"
                        error={errorStudentsData}
                        isLoading={isLoadingStudentsData}
                    >
                        <AddStudent
                            visible={visibleAddNewStudent}
                            setVisible={setVisibleAddNewStudent}
                        />
                    </TableConfig>
                    <Students
                        data={searchedData || []}
                        visibleCells={visibleCells}
                    />
                    <div className={cls.studentsSettings}>
                        <LimitShow
                            data={searchedData || []}
                            onChange={onChangePaginationLimit}
                            onChangePage={onChangePaginationPage}
                            paginationData={studentsData?.pagination}
                            itemsLimit={studentsLimit}
                            withRecords
                            isLoading={isLoadingStudentsData}
                            error={errorStudentsData}
                        />
                        <Pagintaion
                            data={searchedData || []}
                            onChange={onChangePaginationPage}
                            itemsPage={studentsPage}
                            isLoading={isLoadingStudentsData}
                            error={errorStudentsData}
                            paginationData={studentsData?.pagination}
                        />
                    </div>
                </div>
            </DynamicModuleLoader>
        </HelmetProvider>
    );
};

export default StudentsPage;
