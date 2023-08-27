import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AddNationalityErrors, AddNationalityType } from 'features/Nationalities/AddNationality';
import { fetchNationalities } from 'entities/Nationalities/model/services/fetchNationalities/fetchNationalities';
import { getAddNationalityTitle } from '../../selectors/getAddNationalityTitle/getAddNationalityTitle';
import { addNationalityActions } from '../../slice/addNationalitySlice';

export const addNationality = createAsyncThunk<AddNationalityType, void, ThunkConfig<AddNationalityErrors>>(
    'nationalities/addNationality',
    async (_, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const addNationalityTitle = getAddNationalityTitle(getState() as any);

        const data = {
            title: addNationalityTitle,
        };

        try {
            const response = await extra.api.post<AddNationalityType>('/college/nationalities/', data);

            dispatch(fetchNationalities());
            dispatch(addNationalityActions.clearData());

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
