import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchStudyDirections } from 'entities/StudyDirections';
import {
    fetchStudyDirectionDetail,
} from 'entities/StudyDirectionDetail/model/services/fetchStudyDirectionDetail/fetchStudyDirectionDetail';
import { EditStudyDirectionErrors } from '../../types/editStudyDirection';
import {
    getEditStudyDirectionNewFieldsData,
} from '../../selectors/getEditStudyDirectionNewFieldsData/getEditStudyDirectionNewFieldsData';

export const editStudyDirection = createAsyncThunk<void, string, ThunkConfig<EditStudyDirectionErrors>>(
    'studyDirections/editStudyDirection',
    async (id, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const studyDirectionNewData = getEditStudyDirectionNewFieldsData(getState() as any);

        const data = {
            name: studyDirectionNewData,
        };

        try {
            const response = await extra.api.put<void>(`/college/study-directions/${id}`, data);

            dispatch(fetchStudyDirections());
            dispatch(fetchStudyDirectionDetail(id));

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
