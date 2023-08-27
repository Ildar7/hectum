import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchCitizenship } from 'entities/Citizenship';
import { fetchCitizenshipDetail } from 'entities/CitizenshipDetail';
import { EditCitizenshipErrors } from '../../types/editCitizenship';
import {
    getEditCitizenshipNewFieldsData,
} from '../../selectors/getEditCitizenshipNewFieldsData/getEditCitizenshipNewFieldsData';

export const editCitizenship = createAsyncThunk<void, string, ThunkConfig<EditCitizenshipErrors>>(
    'citizenship/editCitizenship',
    async (id, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const citizenshipNewData = getEditCitizenshipNewFieldsData(getState() as any);

        const data = {
            name: citizenshipNewData?.name,
            country_id: citizenshipNewData?.country_id,
        };

        try {
            const response = await extra.api.put<void>(`/college/citizenship/${id}`, data);

            dispatch(fetchCitizenship());
            dispatch(fetchCitizenshipDetail(id));

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
