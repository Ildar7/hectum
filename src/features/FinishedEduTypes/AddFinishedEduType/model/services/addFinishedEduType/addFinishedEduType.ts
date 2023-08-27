import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AddFinishedEduTypeErrors, AddFinishedEduTypeType } from 'features/FinishedEduTypes/AddFinishedEduType';
import { fetchFinishedEduTypes } from 'entities/FinishedEduTypes/model/services/fetchFinishedEduTypes/fetchFinishedEduTypes';
import { getAddFinishedEduTypeTitle } from '../../selectors/getAddFinishedEduTypeTitle/getAddFinishedEduTypeTitle';
import { addFinishedEduTypeActions } from '../../slice/addFinishedEduTypeSlice';

export const addFinishedEduType = createAsyncThunk<AddFinishedEduTypeType, void, ThunkConfig<AddFinishedEduTypeErrors>>(
    'finishedEduTypes/addFinishedEduType',
    async (_, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const addFinishedEduTypeTitle = getAddFinishedEduTypeTitle(getState() as any);

        const data = {
            name: addFinishedEduTypeTitle,
        };

        try {
            const response = await extra.api.post<AddFinishedEduTypeType>('/college/finished-education-types/', data);

            dispatch(fetchFinishedEduTypes());
            dispatch(addFinishedEduTypeActions.clearData());

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
