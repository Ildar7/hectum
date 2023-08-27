import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { QualificationDetailType } from 'entities/QualificationDetail/model/types/qualificationDetail';
import { editQualificationActions } from 'features/Qualifications/EditQualification';

export const fetchQualificationDetail = createAsyncThunk<QualificationDetailType, string, ThunkConfig<string>>(
    'qualifications/fetchQualificationDetail',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get<QualificationDetailType>(`/college/qualifications/${id}`);

            dispatch(editQualificationActions.setQualificationData(response.data));

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
