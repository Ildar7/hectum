import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { FinishedEduTypeDetailType } from 'entities/FinishedEduTypeDetail/model/types/finishedEduTypeDetail';
import { editFinishedEduTypeActions } from 'features/FinishedEduTypes/EditFinishedEduType';

export const fetchFinishedEduTypeDetail = createAsyncThunk<FinishedEduTypeDetailType, string, ThunkConfig<string>>(
    'finishedEduTypes/fetchFinishedEduTypeDetail',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get<FinishedEduTypeDetailType>(`/college/finished-education-types/${id}`);

            dispatch(editFinishedEduTypeActions.setFinishedEduTypeData(response.data));

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
