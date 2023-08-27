import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchEduLanguages } from 'entities/EduLanguages';
import {
    fetchEduLanguageDetail,
} from 'entities/EduLanguageDetail/model/services/fetchEduLanguageDetail/fetchEduLanguageDetail';
import { EditEduLanguageErrors } from '../../types/editEduLanguage';
import {
    getEditEduLanguageNewFieldsData,
} from '../../selectors/getEditEduLanguageNewFieldsData/getEditEduLanguageNewFieldsData';

export const editEduLanguage = createAsyncThunk<void, string, ThunkConfig<EditEduLanguageErrors>>(
    'eduLanguages/editEduLanguage',
    async (id, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const eduLanguageNewData = getEditEduLanguageNewFieldsData(getState() as any);

        const data = {
            name: eduLanguageNewData,
        };

        try {
            const response = await extra.api.put<void>(`/college/study-languages/${id}`, data);

            dispatch(fetchEduLanguages());
            dispatch(fetchEduLanguageDetail(id));

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
