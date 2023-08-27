import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchQualifications } from 'entities/Qualifications';
import {
    fetchQualificationDetail,
} from 'entities/QualificationDetail/model/services/fetchQualificationDetail/fetchQualificationDetail';
import { EditQualificationErrors } from '../../types/editQualification';
import {
    getEditQualificationNewFieldsData,
} from '../../selectors/getEditQualificationNewFieldsData/getEditQualificationNewFieldsData';

export const editQualification = createAsyncThunk<void, string, ThunkConfig<EditQualificationErrors>>(
    'qualifications/editQualification',
    async (id, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const qualificationNewData = getEditQualificationNewFieldsData(getState() as any);

        const data = {
            name: qualificationNewData?.title,
            code: qualificationNewData?.code,
            specialtiesId: qualificationNewData?.speciality_id,
        };

        try {
            const response = await extra.api.put<void>(`/college/qualifications/${id}`, data);

            dispatch(fetchQualifications());
            dispatch(fetchQualificationDetail(id));

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
