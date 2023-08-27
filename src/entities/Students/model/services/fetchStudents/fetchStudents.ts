import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema, ThunkConfig } from 'app/providers/StoreProvider';
import { ClearedFiltersType } from 'features/TableFilters/model/types/tableFiltersSelected';
import { format } from 'date-fns';
import {
    getTableFiltersSelectedData,
} from 'features/TableFilters/model/selectors/getTableFiltersSelectedData/getTableFiltersSelectedData';
import { getTableSortField, getTableSortOrderField } from 'features/TableSort';
import { getStudentsLimit, getStudentsPage } from 'entities/Students';
import { StudentsData, StudentsError } from '../../types/students';

export const fetchStudents = createAsyncThunk<StudentsData, void, ThunkConfig<StudentsError>>(
    'students/fetchStudents',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        const clearedFilters: ClearedFiltersType = {};

        const selectedFilters = getTableFiltersSelectedData(getState() as StateSchema);
        const selectedSortField = getTableSortField(getState() as StateSchema);
        const selectedSortOrderField = getTableSortOrderField(getState() as StateSchema);

        const page = getStudentsPage(getState() as StateSchema);
        const limit = getStudentsLimit(getState() as StateSchema);

        const selectedSort = {
            sort: selectedSortField!,
            order: selectedSortOrderField!,
        };

        // eslint-disable-next-line
        for (const key of Object.keys(selectedFilters!)) {
            if (
                // @ts-ignore
                selectedFilters[key]
                // @ts-ignore
                && selectedFilters[key] !== null
                && key !== 'birthDate'
                && key !== 'arrivalDate'
            ) {
                // @ts-ignore
                clearedFilters[key] = selectedFilters[key];
            }
        }

        // eslint-disable-next-line
        for (const key of Object.keys(clearedFilters)) {
            if (
                key === 'student_financing_source_type'
                || key === 'student_study_duration'
                || key === 'student_study_course'
                || key === 'student_is_need_hostel_type'
                || key === 'student_quota'
                || key === 'student_material_assistance_type'
            ) {
                if (clearedFilters[key]![0] === 'null') {
                    delete clearedFilters[key];
                } else {
                    clearedFilters[key] = clearedFilters[key]!.map((filter) => +filter);
                }
            }
        }

        if (selectedFilters?.birthDate.from) {
            clearedFilters.student_birth_date_from = format(new Date(selectedFilters.birthDate.from), 'yyyy-MM-dd');
        }

        if (selectedFilters?.birthDate.to) {
            clearedFilters.student_birth_date_to = format(new Date(selectedFilters.birthDate.to), 'yyyy-MM-dd');
        }

        if (selectedFilters?.arrivalDate.from) {
            clearedFilters.student_arrival_date_from = format(new Date(selectedFilters.arrivalDate.from), 'yyyy-MM-dd');
        }

        if (selectedFilters?.arrivalDate.to) {
            clearedFilters.student_arrival_date_to = format(new Date(selectedFilters.arrivalDate.to), 'yyyy-MM-dd');
        }

        if (selectedFilters?.student_phone_number) {
            clearedFilters.student_phone_number = selectedFilters.student_phone_number.replace(/\s+/g, '');
        }

        const filters = encodeURIComponent(JSON.stringify(clearedFilters));
        const sort = new URLSearchParams(selectedSort).toString();

        let requestUrl = `/college/students?page=${page}&limit=${limit}&${sort}`;

        if (filters !== '%7B%7D') {
            requestUrl = `/college/students?page=${page}&limit=${limit}&filter=${filters}&${sort}`;
        }

        try {
            const response = await extra.api.get<StudentsData>(requestUrl);

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.response.status,
                error: err.response.data.message,
            });
        }
    },
);
