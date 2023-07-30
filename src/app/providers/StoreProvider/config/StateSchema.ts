import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { To } from '@remix-run/router';
import { NavigateOptions } from 'react-router/dist/lib/context';
import { SidebarSchema } from 'widgets/Sidebar';
import { StudentsSchema } from 'entities/Students/model/types/students';
import { TableFiltersSchema, TableFiltersSelectedSchema } from 'features/TableFilters';
import { TableFieldsSchema } from 'features/TableFields';
import { AddStudentSchema } from 'entities/AddStudent';

export interface StateSchema {
    sidebar: SidebarSchema;

    // async-reducers

    students?: StudentsSchema;
    tableFilters?: TableFiltersSchema;
    tableFiltersSelected?: TableFiltersSelectedSchema;
    tableFields?: TableFieldsSchema;
    addNewStudent?: AddStudentSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
}
