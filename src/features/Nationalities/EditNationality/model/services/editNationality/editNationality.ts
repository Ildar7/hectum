import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchNationalities } from 'entities/Nationalities';
import {
    fetchNationalityDetail,
} from 'entities/NationalityDetail/model/services/fetchNationalityDetail/fetchNationalityDetail';
import { EditNationalityErrors } from '../../types/editNationality';
import {
    getEditNationalityNewFieldsData,
} from '../../selectors/getEditNationalityNewFieldsData/getEditNationalityNewFieldsData';

export const editNationality = createAsyncThunk<void, string, ThunkConfig<EditNationalityErrors>>(
    'nationalities/editNationality',
    async (id, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const nationalityNewData = getEditNationalityNewFieldsData(getState() as any);

        const data = {
            title: nationalityNewData,
        };

        try {
            const response = await extra.api.put<void>(`/college/nationalities/${id}`, data);

            dispatch(fetchNationalities());
            dispatch(fetchNationalityDetail(id));

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
