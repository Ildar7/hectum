import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AddQualificationErrors, AddQualificationType } from 'features/Qualifications/AddQualification';
import { fetchQualifications } from 'entities/Qualifications/model/services/fetchQualifications/fetchQualifications';
import { getAddQualificationTitle } from '../../selectors/getAddQualificationTitle/getAddQualificationTitle';
import { addQualificationActions } from '../../slice/addQualificationSlice';
import {
    getAddQualificationCode,
} from '../../selectors/getAddQualificationCode/getAddQualificationCode';
import {
    getAddQualificationId,
} from '../../selectors/getAddQualificationId/getAddQualificationId';

export const addQualification = createAsyncThunk<AddQualificationType, void, ThunkConfig<AddQualificationErrors>>(
    'qualifications/addQualification',
    async (_, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const addQualificationTitle = getAddQualificationTitle(getState() as any);
        const addQualificationCode = getAddQualificationCode(getState() as any);
        const addQualificationId = getAddQualificationId(getState() as any);

        const data = {
            name: addQualificationTitle,
            code: addQualificationCode,
            specialtiesId: addQualificationId,
        };

        try {
            const response = await extra.api.post<AddQualificationType>('/college/qualifications/', data);

            dispatch(fetchQualifications());
            dispatch(addQualificationActions.clearData());

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
