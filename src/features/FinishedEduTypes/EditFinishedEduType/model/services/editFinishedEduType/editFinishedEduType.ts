import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchFinishedEduTypes } from 'entities/FinishedEduTypes';
import {
    fetchFinishedEduTypeDetail,
} from 'entities/FinishedEduTypeDetail/model/services/fetchFinishedEduTypeDetail/fetchFinishedEduTypeDetail';
import { EditFinishedEduTypeErrors } from '../../types/editFinishedEduType';
import {
    getEditFinishedEduTypeNewFieldsData,
} from '../../selectors/getEditFinishedEduTypeNewFieldsData/getEditFinishedEduTypeNewFieldsData';

export const editFinishedEduType = createAsyncThunk<void, string, ThunkConfig<EditFinishedEduTypeErrors>>(
    'finishedEduTypes/editFinishedEduType',
    async (id, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const finishedEduTypeNewData = getEditFinishedEduTypeNewFieldsData(getState() as any);

        const data = {
            name: finishedEduTypeNewData,
        };

        try {
            const response = await extra.api.put<void>(`/college/finished-education-types/${id}`, data);

            dispatch(fetchFinishedEduTypes());
            dispatch(fetchFinishedEduTypeDetail(id));

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
