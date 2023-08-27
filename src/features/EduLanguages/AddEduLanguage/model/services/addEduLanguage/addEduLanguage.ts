import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AddEduLanguageErrors, AddEduLanguageType } from 'features/EduLanguages/AddEduLanguage';
import { fetchEduLanguages } from 'entities/EduLanguages/model/services/fetchEduLanguages/fetchEduLanguages';
import { getAddEduLanguageTitle } from '../../selectors/getAddEduLanguageTitle/getAddEduLanguageTitle';
import { addEduLanguageActions } from '../../slice/addEduLanguageSlice';

export const addEduLanguage = createAsyncThunk<AddEduLanguageType, void, ThunkConfig<AddEduLanguageErrors>>(
    'eduLanguages/addEduLanguage',
    async (_, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const addEduLanguageTitle = getAddEduLanguageTitle(getState() as any);

        const data = {
            name: addEduLanguageTitle,
        };

        try {
            const response = await extra.api.post<AddEduLanguageType>('/college/study-languages/', data);

            dispatch(fetchEduLanguages());
            dispatch(addEduLanguageActions.clearData());

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
