import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { CitizenshipDetailType } from 'entities/CitizenshipDetail/model/types/citizenshipDetail';
import { editCitizenshipActions } from 'features/Citizenship/EditCitizenship';

export const fetchCitizenshipDetail = createAsyncThunk<CitizenshipDetailType, string, ThunkConfig<string>>(
    'citizenship/fetchCitizenshipDetail',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get<CitizenshipDetailType>(`/college/citizenship/${id}`);

            dispatch(editCitizenshipActions.setCitizenshipData(response.data));

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
