import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { NationalityDetailType } from 'entities/NationalityDetail/model/types/nationalityDetail';
import { editNationalityActions } from 'features/Nationalities/EditNationality';

export const fetchNationalityDetail = createAsyncThunk<NationalityDetailType, string, ThunkConfig<string>>(
    'nationalities/fetchNationalityDetail',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get<NationalityDetailType>(`/college/nationalities/${id}`);

            dispatch(editNationalityActions.setNationalityData(response.data));

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
